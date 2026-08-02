import assert from 'node:assert/strict';

const port=Number(process.argv[2]||9333);
const deadline=Date.now()+15000;
let targets;
while(Date.now()<deadline){
  try{targets=await fetch(`http://127.0.0.1:${port}/json/list`).then(response=>response.json());break}catch{await new Promise(resolve=>setTimeout(resolve,150))}
}
assert.ok(targets?.length,'Chrome DevTools target was not available');
const target=targets.find(item=>item.type==='page')||targets[0];
const socket=new WebSocket(target.webSocketDebuggerUrl),pending=new Map(),runtimeErrors=[];
let nextId=1;
await new Promise((resolve,reject)=>{socket.addEventListener('open',resolve,{once:true});socket.addEventListener('error',reject,{once:true})});
socket.addEventListener('message',event=>{
  const message=JSON.parse(event.data);
  if(message.id&&pending.has(message.id)){const {resolve,reject}=pending.get(message.id);pending.delete(message.id);message.error?reject(new Error(message.error.message)):resolve(message.result);return}
  if(message.method==='Runtime.exceptionThrown')runtimeErrors.push(message.params.exceptionDetails.text||'Runtime exception');
  if(message.method==='Runtime.consoleAPICalled'&&message.params.type==='error')runtimeErrors.push(message.params.args.map(arg=>arg.value||arg.description).join(' '));
});
function call(method,params={}){return new Promise((resolve,reject)=>{const id=nextId++;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}))})}
async function evaluate(expression){
  const response=await call('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true,userGesture:true});
  if(response.exceptionDetails)throw new Error(response.exceptionDetails.text);
  return response.result.value;
}
async function waitFor(expression,timeout=30000){
  const until=Date.now()+timeout;
  while(Date.now()<until){const value=await evaluate(expression);if(value)return value;await new Promise(resolve=>setTimeout(resolve,80))}
  throw new Error(`Timed out waiting for: ${expression}`);
}

await call('Runtime.enable');
await call('Page.enable');
await call('Page.reload',{ignoreCache:true});
await new Promise(resolve=>setTimeout(resolve,200));
runtimeErrors.length=0;
try{
  await waitFor(`window.__starsDebug && window.__starsDebug.getState().regions.length===64`,30000);
}catch(error){
  const diagnostics=await evaluate(`({debug:typeof window.__starsDebug,core:typeof window.StarsCore,start:document.body.dataset.startGame,scripts:Array.from(document.scripts).map(script=>script.src),generating:document.querySelector('#starsGenerating')?.className,status:document.querySelector('#starsStatus')?.textContent})`);
  throw new Error(`${error.message}\n${JSON.stringify({diagnostics,runtimeErrors})}`);
}

const homeEntry=await evaluate(`({href:document.querySelector('[data-game="stars"]')?.getAttribute('href'),name:document.querySelector('[data-game="stars"] .game-name')?.textContent})`);
assert.deepEqual(homeEntry,{href:'stars.html',name:'Stars'});

const sizes=[];
for(const size of [8,9,10,11,12,13,14,15]){
  const before=await evaluate(`window.__starsDebug.getGenerationStats()?.attempts||0`);
  await evaluate(`document.querySelector('#starsBoardSize').value='${size}';document.querySelector('#starsStart').click();true`);
  await waitFor(`window.__starsDebug.getGenerationStats()?.size===${size} && !document.querySelector('#starsGenerating').classList.contains('show')`,60000);
  const audit=await evaluate(`(()=>{const state=window.__starsDebug.getState(),verified=window.__starsDebug.verify(),stats=window.__starsDebug.getGenerationStats();return{size:state.size,cells:document.querySelectorAll('#starsBoard .cell').length,regions:new Set(state.regions).size,solutions:verified.count,truncated:verified.truncated,stats,before:${before}}})()`);
  assert.equal(audit.size,size);assert.equal(audit.cells,size*size);assert.equal(audit.regions,size);assert.equal(audit.solutions,1);assert.equal(audit.truncated,false);sizes.push(audit.stats);
}

await evaluate(`document.querySelector('#starsDifficulty').value='master';document.querySelector('#starsDifficulty').dispatchEvent(new Event('change',{bubbles:true}));true`);
await waitFor(`window.__starsDebug.getGenerationStats()?.difficulty==='master' && !document.querySelector('#starsGenerating').classList.contains('show')`,60000);

await evaluate(`document.querySelector('#starsHint').click();true`);
await waitFor(`!document.querySelector('#starsHintPanel').hidden && document.querySelectorAll('#starsHintSteps button').length>=3`);
let hint=await evaluate(`({steps:document.querySelectorAll('#starsHintSteps button').length,active:document.querySelectorAll('#starsHintSteps button.active').length,targets:window.__starsDebug.getState().visual?.targets?.length||0,disabled:document.querySelector('#starsHint').disabled,label:document.querySelector('#starsHint').textContent})`);
assert.ok(hint.steps>=3);assert.equal(hint.active,1);assert.ok(hint.targets>0);assert.equal(hint.disabled,false);assert.equal(hint.label,'Hint');
await evaluate(`document.querySelector('#starsHintSteps button:last-child').click();true`);
hint=await evaluate(`({lastActive:document.querySelector('#starsHintSteps button:last-child').classList.contains('active'),targets:window.__starsDebug.getState().visual?.targets?.length||0})`);
assert.equal(hint.lastActive,true);assert.ok(hint.targets>0);

for(let i=0;i<12;i++)await evaluate(`document.querySelector('#starsHint').click();true`);
const unlimited=await evaluate(`({disabled:document.querySelector('#starsHint').disabled,label:document.querySelector('#starsHint').textContent,steps:document.querySelectorAll('#starsHintSteps button').length})`);
assert.equal(unlimited.disabled,false);assert.equal(unlimited.label,'Hint');assert.ok(unlimited.steps>=3);

const mock=await evaluate(`(()=>{document.querySelector('#starsMockMode').click();document.querySelector('#starsBoard .cell[data-i="0"]').click();document.querySelector('#starsBoard .cell[data-i="0"]').click();const state=window.__starsDebug.getState();return{mode:state.mockMode,mockStars:state.mockStars.length,mockXs:state.mockXs.length,realMarks:state.cells.filter(Boolean).length,pressed:document.querySelector('#starsMockMode').getAttribute('aria-pressed')}})()`);
assert.deepEqual(mock,{mode:true,mockStars:1,mockXs:0,realMarks:0,pressed:'true'});
await evaluate(`document.querySelector('#starsMockMode').click();document.querySelector('#starsClearMocks').click();true`);
assert.deepEqual(await evaluate(`({stars:window.__starsDebug.getState().mockStars.length,xs:window.__starsDebug.getState().mockXs.length})`),{stars:0,xs:0});

const mistakeHint=await evaluate(`(()=>{const state=window.__starsDebug.getState(),wrong=state.solution.findIndex(value=>value===1);window.__starsDebug.setCell(wrong,2);document.querySelector('#starsHint').click();return{wrong,summary:document.querySelector('#starsHintSummary').textContent,steps:document.querySelectorAll('#starsHintSteps button').length}})()`);
assert.match(mistakeHint.summary,/prevents every valid completion/i);assert.ok(mistakeHint.steps>=4);
await evaluate(`document.querySelector('#starsClear').click();true`);

await evaluate(`document.querySelector('#starsHint').click();true`);
await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
const mobile=await evaluate(`(()=>{const board=document.querySelector('#starsScreen .board-shell').getBoundingClientRect(),panel=document.querySelector('#starsHintPanel').getBoundingClientRect();return{scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth,boardWidth:board.width,panelWidth:panel.width}})()`);
assert.ok(mobile.scrollWidth<=mobile.viewport+1);assert.ok(mobile.boardWidth<=mobile.viewport);assert.ok(mobile.panelWidth<=mobile.viewport);

await evaluate(`(()=>{const state=window.__starsDebug.getState();state.solution.forEach((value,index)=>{if(value===2){document.querySelector('#starsBoard .cell[data-i="'+index+'"]').click();document.querySelector('#starsBoard .cell[data-i="'+index+'"]').click()}});return true})()`);
await waitFor(`document.querySelector('#starsWin').getAttribute('aria-hidden')==='false'`);
const win=await evaluate(`({title:document.querySelector('#starsWinTitle').textContent,text:document.querySelector('#starsWinText').textContent,status:document.querySelector('#starsStatus').textContent})`);
assert.equal(win.title,'Puzzle solved');assert.match(win.text,/15×15/);assert.match(win.status,/Solved/);
await evaluate(`document.querySelector('#starsCloseWin').click();true`);

assert.deepEqual(runtimeErrors,[]);
socket.close();
console.log(JSON.stringify({sizes,hint,unlimited,mock,mistakeHint,mobile,win,runtimeErrors},null,2));
