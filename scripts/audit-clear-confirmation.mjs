import assert from 'node:assert/strict';

const port=Number(process.argv[2]||9333),deadline=Date.now()+15000;
let targets;
while(Date.now()<deadline){try{targets=await fetch(`http://127.0.0.1:${port}/json/list`).then(response=>response.json());break}catch{await new Promise(resolve=>setTimeout(resolve,150))}}
assert.ok(targets?.length,'Chrome DevTools target was not available');
const target=targets.find(item=>item.type==='page')||targets[0],socket=new WebSocket(target.webSocketDebuggerUrl),pending=new Map(),runtimeErrors=[];
let nextId=1;
await new Promise((resolve,reject)=>{socket.addEventListener('open',resolve,{once:true});socket.addEventListener('error',reject,{once:true})});
socket.addEventListener('message',event=>{const message=JSON.parse(event.data);if(message.id&&pending.has(message.id)){const item=pending.get(message.id);pending.delete(message.id);message.error?item.reject(new Error(message.error.message)):item.resolve(message.result);return}if(message.method==='Runtime.exceptionThrown')runtimeErrors.push(message.params.exceptionDetails.text||'Runtime exception');if(message.method==='Runtime.consoleAPICalled'&&message.params.type==='error')runtimeErrors.push(message.params.args.map(arg=>arg.value||arg.description).join(' '))});
function call(method,params={}){return new Promise((resolve,reject)=>{const id=nextId++;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}))})}
async function evaluate(expression){const response=await call('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true,userGesture:true});if(response.exceptionDetails)throw new Error(response.result?.description||response.exceptionDetails.exception?.description||response.exceptionDetails.text);return response.result.value}
async function waitFor(expression,timeout=60000){const until=Date.now()+timeout;while(Date.now()<until){const value=await evaluate(expression);if(value)return value;await new Promise(resolve=>setTimeout(resolve,60))}throw new Error(`Timed out waiting for: ${expression}`)}

await call('Runtime.enable');await call('Page.enable');await call('Network.enable');await call('Network.setBypassServiceWorker',{bypass:true});await call('Network.setCacheDisabled',{cacheDisabled:true});

const scenarios=[
  {name:'Queens',url:'queens.html',ready:`window.__queensDebug&&document.querySelectorAll('#board .cell').length>0&&!document.querySelector('#generating').classList.contains('show')`,mark:`document.querySelector('#board .cell').click()`,count:`window.__queensDebug.getCells().filter(Boolean).length`,clear:'#clear'},
  {name:'Stars',url:'stars.html',ready:`window.__starsDebug&&document.querySelectorAll('#starsBoard .cell').length>0&&!document.querySelector('#starsGenerating').classList.contains('show')`,mark:`document.querySelector('#starsBoard .cell').click()`,count:`window.__starsDebug.getState().cells.filter(Boolean).length`,clear:'#starsClear'},
  {name:'Patches',url:'patches.html',ready:`document.querySelectorAll('#patchGrid .patch-cell').length>0`,mark:`document.querySelector('#patchHint').click()`,count:`document.querySelectorAll('#patchGrid .patch-cell.filled').length`,clear:'#patchReset'},
  {name:'Mini Sudoku',url:'minisudoku.html',ready:`document.querySelectorAll('#sudokuGrid .sudoku-cell').length>0`,mark:`document.querySelector('#sudokuHint').click()`,count:`Array.from(document.querySelectorAll('#sudokuGrid .sudoku-cell:not(.given)')).filter(cell=>cell.textContent).length`,clear:'#sudokuReset'},
  {name:'Zip',url:'zip.html',ready:`document.querySelectorAll('#zipGrid .zip-cell').length>0`,mark:`document.querySelector('#zipHint').click()`,count:`document.querySelectorAll('#zipGrid .zip-cell.path').length`,clear:'#zipReset'},
  {name:'Tango',url:'tango.html',ready:`document.querySelectorAll('#tangoGrid .tango-cell').length>0`,mark:`document.querySelector('#tangoHint').click()`,count:`document.querySelectorAll('#tangoGrid .tango-cell:not(.given).sun,#tangoGrid .tango-cell:not(.given).moon').length`,clear:'#tangoReset'}
];

const report=[];
for(const scenario of scenarios){
  runtimeErrors.length=0;await call('Page.navigate',{url:`http://127.0.0.1:8765/${scenario.url}`});await new Promise(resolve=>setTimeout(resolve,220));await waitFor(`location.pathname.endsWith('/${scenario.url}')&&(${scenario.ready})`);await evaluate(`(()=>{${scenario.mark};return true})()`);const before=await evaluate(scenario.count);assert.ok(before>0,`${scenario.name} did not receive a test mark`);
  await evaluate(`document.querySelector('${scenario.clear}').click()`);await waitFor(`document.querySelector('#clearConfirm').getAttribute('aria-hidden')==='false'`);await new Promise(resolve=>setTimeout(resolve,120));
  const opened=await evaluate(`({title:document.querySelector('#clearConfirmTitle').textContent,text:document.querySelector('#clearConfirmText').textContent,role:document.querySelector('#clearConfirm').getAttribute('role'),focus:document.activeElement?.id,count:${scenario.count}})`);
  assert.match(opened.title,new RegExp(scenario.name.replace('Mini ',''),'i'));assert.match(opened.text,/will be removed/i);assert.equal(opened.role,'alertdialog');assert.equal(opened.focus,'clearConfirmCancel');assert.equal(opened.count,before,'opening confirmation changed the board');
  await evaluate(`document.querySelector('#clearConfirmCancel').click()`);await waitFor(`document.querySelector('#clearConfirm').getAttribute('aria-hidden')==='true'`);assert.equal(await evaluate(scenario.count),before,'Cancel changed the board');
  await evaluate(`document.querySelector('${scenario.clear}').click()`);await waitFor(`document.querySelector('#clearConfirm').getAttribute('aria-hidden')==='false'`);await evaluate(`document.querySelector('#clearConfirmAccept').click()`);await waitFor(`document.querySelector('#clearConfirm').getAttribute('aria-hidden')==='true'`);assert.equal(await evaluate(scenario.count),0,'Confirm did not clear the board');
  const closed=await evaluate(`({locked:document.documentElement.classList.contains('win-open'),hiddenFocus:document.activeElement?.closest?.('#clearConfirm')!==null})`);assert.equal(closed.locked,false);assert.equal(closed.hiddenFocus,false);assert.deepEqual(runtimeErrors,[]);report.push({game:scenario.name,before,after:0,title:opened.title})
}

await call('Page.navigate',{url:'http://127.0.0.1:8765/patches.html'});await new Promise(resolve=>setTimeout(resolve,220));await waitFor(`location.pathname.endsWith('/patches.html')&&document.querySelectorAll('#patchGrid .patch-cell').length>0`);await evaluate(`document.querySelector('#patchReset').click()`);await waitFor(`document.querySelector('#clearConfirm').getAttribute('aria-hidden')==='false'`);await evaluate(`document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}))`);await waitFor(`document.querySelector('#clearConfirm').getAttribute('aria-hidden')==='true'`);

socket.close();console.log(JSON.stringify({report,escapeCloses:true,runtimeErrors},null,2));
