(function(){
  'use strict';
  var core=window.StarsCore,screen=document.querySelector('#starsScreen');if(!core||!screen)return;
  var q=function(selector){return screen.querySelector(selector)},board=q('#starsBoard'),statusEl=q('#starsStatus'),timerEl=q('#starsTimer'),generatingEl=q('#starsGenerating'),sizeEl=q('#starsBoardSize');
  var n=8,regions=[],solution=[],regionColors=[],context=null,cells=[],history=[],moves=0,startedAt=0,timerId=null,solved=false,generationToken=0,dragState=null,hintData=null,hintVisual=null,hintSeen=new Set(),animationXs=new Set(),animationStars=new Set(),mockMode=false,mockStars=new Set(),mockXs=new Set(),lastGenerationStats=null;
  var COLORS=[[5,85,72],[215,88,72],[125,66,67],[48,96,68],[282,76,75],[185,82,65],[330,84,75],[90,74,68],[25,94,70],[245,80,78],[160,74,64],[60,94,72],[350,76,62],[205,80,60],[110,56,78],[40,86,82],[295,64,62],[175,66,80],[320,66,65],[80,66,80],[15,78,82],[230,66,62],[145,60,80],[55,78,58],[270,60,82],[195,70,78],[340,66,84],[100,58,58],[30,70,58],[255,58,62]];
  function randInt(max){return Math.floor(Math.random()*max)}
  function fmtTime(ms){var seconds=Math.max(0,Math.floor(ms/1000)),minutes=Math.floor(seconds/60);return String(minutes).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0')}
  function startTimer(){clearInterval(timerId);startedAt=Date.now();timerEl.textContent='00:00';timerId=setInterval(function(){if(!solved)timerEl.textContent=fmtTime(Date.now()-startedAt)},500)}
  function difficulty(){return q('#starsDifficulty').value}
  function difficultyRank(){return{easy:0,medium:1,hard:2,expert:3,master:4}[difficulty()]||0}
  function setStatus(text,type){statusEl.textContent=text;statusEl.className='status'+(type?' '+type:'')}
  function columnName(c){return String.fromCharCode(65+c)}
  function rowNumber(r){return n-r}
  function squareName(i){return columnName(i%n)+rowNumber(Math.floor(i/n))}
  function colorDistance(a,b){var hue=Math.abs(a[0]-b[0]);hue=Math.min(hue,360-hue)/180;return hue*3+Math.abs(a[1]-b[1])/34+Math.abs(a[2]-b[2])/18}
  function makePalette(count,map,size){
    var adjacency=Array.from({length:count},function(){return new Set()});
    for(var r=0;r<size;r++)for(var c=0;c<size;c++){var i=r*size+c,id=map[i];if(c+1<size&&map[i+1]!==id){adjacency[id].add(map[i+1]);adjacency[map[i+1]].add(id)}if(r+1<size&&map[i+size]!==id){adjacency[id].add(map[i+size]);adjacency[map[i+size]].add(id)}}
    var order=Array.from({length:count},function(_,i){return i}).sort(function(a,b){return adjacency[b].size-adjacency[a].size}),assigned=Array(count).fill(-1),used=new Set();
    order.forEach(function(rid){var best=-1,bestScore=-Infinity;for(var ci=0;ci<COLORS.length;ci++){if(used.has(ci))continue;var neighbors=Array.from(adjacency[rid]).map(function(x){return assigned[x]}).filter(function(x){return x>=0}),separation=neighbors.length?Math.min.apply(null,neighbors.map(function(x){return colorDistance(COLORS[ci],COLORS[x])})):5,score=separation*4+Math.random();if(score>bestScore){best=ci;bestScore=score}}assigned[rid]=best;used.add(best)});
    return assigned.map(function(index){var color=COLORS[index];return'hsl('+color[0]+', '+color[1]+'%, '+color[2]+'%)'})
  }
  function boundaryStyle(i){var r=Math.floor(i/n),c=i%n,id=regions[i];return{top:r===0?2.5:(regions[i-n]!==id?2.5:.4),right:c===n-1?2.5:(regions[i+1]!==id?2.5:.4),bottom:r===n-1?2.5:(regions[i+n]!==id?2.5:.4),left:c===0?2.5:(regions[i-1]!==id?2.5:.4)}}
  function unitStars(unit,state){state=state||cells;return unit.filter(function(i){return state[i]===2})}
  function autoBlockedSet(source){
    source=source||cells;var blocked=new Set();
    for(var i=0;i<n*n;i++)if(source[i]===2)core.touchingNeighbors(i,n).forEach(function(next){if(source[next]!==2)blocked.add(next)});
    if(context)context.units.forEach(function(unit){if(unitStars(unit,source).length===2)unit.forEach(function(i){if(source[i]!==2)blocked.add(i)})});return blocked
  }
  function conflictSet(force){
    var bad=new Set();if(!force&&!q('#starsAutoCheck').checked)return bad;var stars=[];for(var i=0;i<n*n;i++)if(cells[i]===2)stars.push(i);
    for(var a=0;a<stars.length;a++)for(var b=a+1;b<stars.length;b++)if(core.touches(stars[a],stars[b],n)){bad.add(stars[a]);bad.add(stars[b])}
    if(context)context.units.forEach(function(unit){var placed=unitStars(unit);if(placed.length>2)placed.forEach(function(i){bad.add(i)})});return bad
  }
  function effectiveState(){var state=cells.slice();if(q('#starsAutoXs').checked)autoBlockedSet().forEach(function(i){if(!state[i])state[i]=1});return state}
  function mockBlockedSet(){
    var blocked=new Set();
    mockStars.forEach(function(star){core.touchingNeighbors(star,n).forEach(function(next){if(cells[next]!==2&&!mockStars.has(next))blocked.add(next)})});
    if(context)context.units.forEach(function(unit){var realCount=unit.filter(function(i){return cells[i]===2}).length,mockCount=unit.filter(function(i){return mockStars.has(i)}).length;if(mockCount&&realCount+mockCount>=2&&realCount<2)unit.forEach(function(i){if(cells[i]!==2&&!mockStars.has(i))blocked.add(i)})});mockXs.forEach(function(i){blocked.add(i)});return blocked
  }
  function updateMockControls(){var toggle=q('#starsMockMode'),count=mockStars.size+mockXs.size;toggle.textContent='Mock mode: '+(mockMode?'On':'Off');toggle.classList.toggle('active',mockMode);toggle.setAttribute('aria-pressed',String(mockMode));q('#starsClearMocks').disabled=!count||solved||generatingEl.classList.contains('show');q('#starsMockHelp').classList.toggle('active',mockMode);q('#starsMockHelp').textContent=mockMode?'Mock mode is on: tap cycles mock × → mock star → empty. Drag paints mock X marks. Blue marks never change the real board.':'Turn on Mock mode to test stars and X marks without changing your real board.'}
  function updateButtons(){
    var generating=generatingEl.classList.contains('show'),hasMarks=cells.some(Boolean),hasMocks=mockStars.size||mockXs.size;q('#starsUndo').disabled=generating||solved||!history.length;q('#starsClear').disabled=generating||solved||(!hasMarks&&!hasMocks);q('#starsMistakes').disabled=generating||solved||!hasMarks;q('#starsHint').disabled=generating||solved;q('#starsNewGame').disabled=generating;q('#starsMockMode').disabled=generating||solved;updateMockControls()
  }
  function renderBoard(){
    board.style.gridTemplateColumns='repeat('+n+',minmax(0,1fr))';board.style.gridTemplateRows='repeat('+n+',minmax(0,1fr))';board.style.setProperty('--n',n);
    var colLabels=q('#starsColLabels'),rowLabels=q('#starsRowLabels');colLabels.style.gridTemplateColumns='repeat('+n+',minmax(0,1fr))';rowLabels.style.gridTemplateRows='repeat('+n+',minmax(0,1fr))';colLabels.innerHTML='';rowLabels.innerHTML='';
    for(var label=0;label<n;label++){var col=document.createElement('span');col.className='coord-label';col.textContent=columnName(label);colLabels.appendChild(col);var row=document.createElement('span');row.className='coord-label';row.textContent=String(rowNumber(label));rowLabels.appendChild(row)}
    board.innerHTML='';var autoSource=hintVisual&&hintVisual.autoState||cells,auto=q('#starsAutoXs').checked?autoBlockedSet(autoSource):new Set(),mockBlocked=mockMode?mockBlockedSet():new Set(),bad=conflictSet(false),area=new Set(hintVisual&&hintVisual.area||[]),targets=new Set(hintVisual&&hintVisual.targets||[]),problems=new Set(hintVisual&&hintVisual.problemTiles||[]),simStars=new Set(hintVisual&&hintVisual.simStars||[]),simXs=new Set(hintVisual&&hintVisual.simXs||[]),hiddenMarks=new Set(hintVisual&&hintVisual.hiddenMarks||[]);
    for(var i=0;i<n*n;i++){
      var base=hiddenMarks.has(i)?0:cells[i],simStar=base!==2&&simStars.has(i),simX=base===0&&!simStar&&simXs.has(i),shown=base===0&&auto.has(i)?1:base,xShown=!simStar&&(shown===1||simX),b=boundaryStyle(i),button=document.createElement('button'),classes=['cell','stars-cell'];
      if(xShown)classes.push('x');if(simX)classes.push('simulated-x');if(base===2||simStar)classes.push('queen','star');if(simStar)classes.push('simulated-queen');if(mockStars.has(i))classes.push('mock-queen');if(mockBlocked.has(i))classes.push('mock-x');if(bad.has(i))classes.push('conflict');if(area.has(i))classes.push('hint-area');if(targets.has(i)||problems.has(i))classes.push('hint-target');if(problems.has(i))classes.push('hint-problem');if(animationXs.has(i))classes.push('x-enter');if(animationStars.has(i))classes.push('queen-enter');
      button.type='button';button.className=classes.join(' ');button.style.setProperty('--cell',regionColors[regions[i]]);button.style.borderTopWidth=b.top+'px';button.style.borderRightWidth=b.right+'px';button.style.borderBottomWidth=b.bottom+'px';button.style.borderLeftWidth=b.left+'px';button.dataset.i=i;button.setAttribute('role','gridcell');button.setAttribute('aria-label',squareName(i)+', '+(base===2?'star':base===1?'X mark':'empty')+(mockStars.has(i)?', mock star':mockXs.has(i)?', mock X':''));button.innerHTML='<span class="mark">'+(base===2||simStar?'★':'')+'</span>'+(mockBlocked.has(i)?'<span class="mock-x-mark"></span>':'')+(mockStars.has(i)?'<span class="mock-mark">★</span>':'');board.appendChild(button)
    }
    animationXs.clear();animationStars.clear();updateButtons()
  }
  function pushHistory(){history.push(cells.slice());if(history.length>250)history.shift()}
  function closeHint(render){hintData=null;hintVisual=null;q('#starsHintPanel').hidden=true;if(render!==false)renderBoard()}
  function cycleCell(i,reverse){
    if(solved)return;closeHint(false);pushHistory();var before=cells[i],shown=before===0&&autoBlockedSet().has(i)?1:before,next=reverse?(shown===0?2:shown===2?1:0):(shown===0?1:shown===1?2:0);cells[i]=next;if(next===1&&before!==1)animationXs.add(i);if(next===2&&before!==2)animationStars.add(i);moves++;renderBoard();checkProgress()
  }
  function cycleMockCell(i,reverse){
    if(solved||cells[i]===2)return;closeHint(false);var hasStar=mockStars.has(i),hasX=mockXs.has(i);
    if(reverse){if(hasX)mockXs.delete(i);else if(hasStar){mockStars.delete(i);mockXs.add(i)}else mockStars.add(i)}
    else{if(hasStar)mockStars.delete(i);else if(hasX){mockXs.delete(i);mockStars.add(i)}else mockXs.add(i)}
    renderBoard();setStatus(mockStars.size+' mock star'+(mockStars.size===1?'':'s')+' and '+mockXs.size+' mock X mark'+(mockXs.size===1?'':'s')+'.')
  }
  function clearMocks(showStatus){if(!mockStars.size&&!mockXs.size)return;mockStars.clear();mockXs.clear();renderBoard();if(showStatus!==false)setStatus('Mock stars and X marks cleared.')}
  function checkProgress(){
    var conflicts=conflictSet(true);if(conflicts.size){setStatus('At least one star breaks the two-per-unit or no-touch rule.','bad');return}
    var stars=cells.filter(function(value){return value===2}).length;
    if(stars===2*n){var valid=solution.every(function(value,i){return value!==2||cells[i]===2});if(valid){solved=true;closeHint(false);clearInterval(timerId);setStatus('Solved without guessing.','ok');renderBoard();document.querySelector('#starsWinText').textContent=n+'×'+n+' · '+difficulty()+' · '+timerEl.textContent+' · '+moves+' moves';openWinPopup(document.querySelector('#starsWin'),document.querySelector('#starsWinNew'));return}setStatus('All stars are placed, but at least one is in the wrong cell.','bad');return}
    setStatus(stars+' of '+(2*n)+' stars placed.')
  }
  function undo(){if(!history.length||solved)return;closeHint(false);cells=history.pop();moves++;renderBoard();checkProgress()}
  function clearBoard(){if(solved||(!cells.some(Boolean)&&!mockStars.size&&!mockXs.size))return;closeHint(false);if(cells.some(Boolean)){pushHistory();cells.fill(0);moves++}mockStars.clear();mockXs.clear();renderBoard();setStatus('Board cleared.')}
  function showMistakes(){
    if(solved)return;var wrong=[];for(var i=0;i<n*n;i++)if(cells[i]&&cells[i]!==solution[i])wrong.push(i);hintVisual={area:[],targets:wrong,problemTiles:wrong};renderBoard();if(wrong.length)setStatus(wrong.length+' incorrectly marked tile'+(wrong.length===1?' is':'s are')+' highlighted.','bad');else setStatus('No incorrectly placed marks found.','ok')
  }
  function unitLabel(unitIndex,reference){var meta=context.unitMeta[unitIndex];if(meta.type==='row')return'row '+rowNumber(meta.index);if(meta.type==='col')return'column '+columnName(meta.index);return'the outlined region containing '+squareName(reference==null?context.units[unitIndex][0]:reference)}
  function unSeen(list){var fresh=list.filter(function(i){return!hintSeen.has(i)});return fresh.length?fresh:list}
  function directDeduction(){
    var state=effectiveState(),units=context.units;
    for(var star=0;star<n*n;star++)if(cells[star]===2){var near=unSeen(core.touchingNeighbors(star,n).filter(function(i){return state[i]===0}));if(near.length){var target=near[0];return{target:target,value:1,summary:'A placed star immediately rules out a neighboring tile.',steps:[
      {title:'Start with the star',text:'Select the star at '+squareName(star)+'. Every surrounding tile is affected.',visual:{area:[star],targets:[star]}},
      {title:'Apply the no-touch rule',text:squareName(target)+' touches '+squareName(star)+', so another star there would break the rule.',visual:{area:[star,target],targets:[target]}},
      {title:'Mark the result',text:'Mark '+squareName(target)+' with an X.',visual:{area:[star],targets:[target],simXs:[target]}}
    ]}}
    }
    for(var u=0;u<units.length;u++){
      var unit=units[u],stars=unit.filter(function(i){return state[i]===2}),open=unit.filter(function(i){return state[i]===0});
      if(stars.length===2&&open.length){var x=unSeen(open)[0];return{target:x,value:1,summary:'A row, column, or region already has both of its stars.',steps:[
        {title:'Count the unit',text:'Focus on '+unitLabel(u,x)+'. It already contains two stars.',visual:{area:unit,targets:stars}},
        {title:'Use the exact quota',text:'Every unit must contain exactly two stars, never more.',visual:{area:unit,targets:stars.concat([x])}},
        {title:'Mark the result',text:'No additional star can go at '+squareName(x)+'. Mark it with an X.',visual:{area:unit,targets:[x],simXs:[x]}}
      ]}}
      var need=2-stars.length;if(need>0&&open.length===need){var forced=unSeen(open)[0];return{target:forced,value:2,summary:'A unit has exactly enough open tiles left for its missing stars.',steps:[
        {title:'Count what remains',text:'Focus on '+unitLabel(u,forced)+'. It needs '+need+' more star'+(need===1?'':'s')+'.',visual:{area:unit,targets:stars}},
        {title:'Find the only spaces',text:'Exactly '+open.length+' open tile'+(open.length===1?' remains':'s remain')+': '+open.map(squareName).join(', ')+'.',visual:{area:unit,targets:open}},
        {title:'Place the forced star',text:squareName(forced)+' must be a star.',visual:{area:unit,targets:[forced],simStars:[forced]}}
      ]}}
    }
    var local=[];
    for(u=0;u<units.length;u++){
      unit=units[u];stars=unit.filter(function(i){return state[i]===2});need=2-stars.length;if(need<=0)continue;var data=core.legalUnitCombinations(unit,state,need,n);if(!data.combinations.length)continue;
      data.open.forEach(function(tile){var appearances=data.combinations.filter(function(combo){return combo.indexOf(tile)>=0}).length;if(appearances===0||appearances===data.combinations.length)local.push({unitIndex:u,tile:tile,value:appearances?2:1,data:data,need:need,appearances:appearances})})
    }
    if(local.length){var choices=unSeen(local.map(function(item){return item.tile})),chosen=local.find(function(item){return item.tile===choices[0]})||local[0],comboText=chosen.data.combinations.length<=5?chosen.data.combinations.map(function(combo){return combo.map(squareName).join(' + ')}).join('; '):chosen.data.combinations.length+' legal combinations',isStar=chosen.value===2;return{target:chosen.tile,value:chosen.value,summary:'Compare every non-touching placement allowed inside one unit.',steps:[
      {title:'Focus the unit',text:'In '+unitLabel(chosen.unitIndex,chosen.tile)+', place '+chosen.need+' remaining star'+(chosen.need===1?'':'s')+'.',visual:{area:units[chosen.unitIndex],targets:chosen.data.open}},
      {title:'Compare legal placements',text:'After the no-touch rule, the possibilities are: '+comboText+'.',visual:{area:units[chosen.unitIndex],targets:Array.from(new Set(chosen.data.combinations.flat()))}},
      {title:isStar?'Spot the shared tile':'Spot the excluded tile',text:isStar?squareName(chosen.tile)+' appears in every legal placement.':squareName(chosen.tile)+' appears in none of the legal placements.',visual:{area:units[chosen.unitIndex],targets:[chosen.tile]}},
      {title:'Mark the result',text:isStar?'Place a star at '+squareName(chosen.tile)+'.':'Mark '+squareName(chosen.tile)+' with an X.',visual:{area:units[chosen.unitIndex],targets:[chosen.tile],simStars:isStar?[chosen.tile]:[],simXs:isStar?[]:[chosen.tile]}}
    ]}}
    return null
  }
  function squareList(list,limit){list=Array.from(new Set(list||[]));limit=limit||8;if(!list.length)return'none';var shown=list.slice(0,limit).map(squareName),more=list.length-shown.length;return shown.join(', ')+(more?' and '+more+' more':'')}
  function proofVisual(visual,options){options=options||{};if(options.hiddenMarks&&options.hiddenMarks.length)visual.hiddenMarks=Array.from(new Set((visual.hiddenMarks||[]).concat(options.hiddenMarks)));if(options.autoState)visual.autoState=options.autoState;return visual}
  function tracedVisual(event,options){options=options||{};var state=event.state||[],base=options.baseState||cells,simStars=[],simXs=[];for(var i=0;i<state.length;i++){if(state[i]===2&&base[i]!==2)simStars.push(i);else if(state[i]===1&&base[i]===0)simXs.push(i)}return proofVisual({area:(event.area||[]).slice(),targets:(event.targets||event.assigned||event.cells||[]).slice(),problemTiles:event.kind==='conflict'?(event.targets||event.cells||[]).slice():[],simStars:simStars,simXs:simXs},options)}
  function traceStep(event,prefix,options){
    prefix=prefix?prefix+': ':'';var reference=(event.targets||event.assigned||event.cells||event.chosen||[])[0],label=event.unitIndex==null?'':unitLabel(event.unitIndex,reference),title='Follow the consequence',text='';
    if(event.rule==='no-touch'){title='Apply the no-touch rule';text='The star at '+squareName(event.source[0])+' touches '+squareList(event.assigned)+', so '+(event.assigned.length===1?'that tile must be an X.':'those tiles must be X marks.')}
    else if(event.rule==='unit-full'){title='Close the completed unit';text=label+' already has its two stars at '+squareList(event.source)+'. Every other open tile shown must be an X.'}
    else if(event.rule==='unit-fill'){title='Fill the only spaces left';text=label+' still needs '+event.assigned.length+' star'+(event.assigned.length===1?'':'s')+' and has exactly that many open tiles: '+squareList(event.assigned)+'. They must all be stars.'}
    else if(event.rule==='branch'){title='Test the next legal placement';text='In '+label+', test stars at '+squareList(event.chosen)+'. The other open tiles in this unit become X marks for this test.'}
    else if(event.rule==='touching'){title='The contradiction appears';text='The consequence chain puts stars at '+squareList(event.cells)+'. Those stars touch, which is forbidden.'}
    else if(event.rule==='too-many'){title='The contradiction appears';text=label+' now contains '+event.stars+' stars, but every unit must contain exactly two.'}
    else if(event.rule==='too-few'){title='The contradiction appears';text=label+' has '+event.stars+' placed star'+(event.stars===1?'':'s')+' and only '+event.open+' open tile'+(event.open===1?'':'s')+'. It can no longer reach the required total of two.'}
    else if(event.rule==='no-placement'){title='The contradiction appears';text=label+' still needs '+event.need+' star'+(event.need===1?'':'s')+', but its remaining open tiles cannot hold that many non-touching stars.'}
    else{title='The contradiction appears';text='This tested path breaks one of the puzzle rules.'}
    return{title:prefix+title,text:text,visual:tracedVisual(event,options)}
  }
  function appendTraceSteps(steps,events,prefix,max,options){
    max=max||28;if(events.length<=max){events.forEach(function(event){steps.push(traceStep(event,prefix,options))});return}var first=Math.ceil(max*.65),last=max-first;events.slice(0,first).forEach(function(event){steps.push(traceStep(event,prefix,options))});var bridge=events[events.length-last-1],skipped=events.length-max;steps.push({title:(prefix?prefix+': ':'')+'Continue the repeated deductions',text:skipped+' additional quota and no-touch deductions repeat the same rules. The board shows their combined result.',visual:tracedVisual(bridge,options)});events.slice(-last).forEach(function(event){steps.push(traceStep(event,prefix,options))})
  }
  function concreteConflict(events){return!!(events&&events.length&&events[events.length-1].kind==='conflict')}
  function completeContradiction(analysis){if(!analysis||!analysis.contradiction)return false;if(analysis.direct)return!!(analysis.root&&analysis.root.contradiction&&concreteConflict(analysis.root.events));return!analysis.truncated&&analysis.allBranches===analysis.branches.length&&analysis.branches.every(function(branch){return branch.proof&&!branch.proof.truncated&&branch.proof.count===0&&concreteConflict(branch.path)})}
  function directContradiction(state){var traced=core.traceContradiction(regions,n,state,n*n*3);return traced.contradiction&&concreteConflict(traced.events)?{contradiction:true,direct:true,root:traced,branches:[],allBranches:0}:null}
  function expandedContradiction(state){var analysis=core.analyzeContradiction(regions,n,state,400000,32);return completeContradiction(analysis)?analysis:null}
  function appendContradictionExplanation(steps,analysis,options){
    appendTraceSteps(steps,analysis.root&&analysis.root.events||[],'Forced consequence',30,options);if(analysis.direct)return;
    var unit=context.units[analysis.unitIndex],combos=analysis.branches.map(function(branch){return squareList(branch.chosen,5)});steps.push({title:'List every remaining option',text:unitLabel(analysis.unitIndex,analysis.open[0])+' has '+analysis.allBranches+' legal placement'+(analysis.allBranches===1?'':'s')+' left: '+combos.join('; ')+'. Each option must be tested.',visual:proofVisual({area:unit,targets:analysis.open,simStars:[],simXs:[]},options)});
    analysis.branches.forEach(function(branch,index){steps.push({title:'Option '+(index+1)+' of '+analysis.allBranches,text:'The verifier exhausts every continuation after testing stars at '+squareList(branch.chosen)+' and X marks at '+squareList(branch.rejected)+'. The following steps show a concrete rule failure reached in that check.',visual:tracedVisual({state:branch.state,area:unit,targets:analysis.open},options)});appendTraceSteps(steps,branch.path,'Option '+(index+1),18,options)});
    steps.push({title:'All placements fail',text:'These options exhaust every legal way to place the missing stars in '+unitLabel(analysis.unitIndex,analysis.open[0])+'. Every option was completely checked and reaches a rule violation, so the original assumption is impossible.',visual:proofVisual({area:unit,targets:analysis.open,problemTiles:analysis.open},options)})
  }
  function problemHint(){
    var wrong=[];for(var i=0;i<n*n;i++)if(cells[i]&&cells[i]!==solution[i])wrong.push(i);if(!wrong.length)return null;var compatible=cells.map(function(value,index){return value===solution[index]?value:0}),target=null,state=null,analysis=null;
    for(var pass=0;pass<2&&!analysis;pass++)for(var w=0;w<wrong.length;w++){var testTarget=wrong[w],testState=compatible.slice();testState[testTarget]=cells[testTarget];var proof=pass===0?directContradiction(testState):expandedContradiction(testState);if(proof){target=testTarget;state=testState;analysis=proof;break}}
    if(!analysis)return null;var ignored=wrong.filter(function(i){return i!==target}),wasStar=cells[target]===2,options={baseState:state,autoState:state,hiddenMarks:ignored},steps=[{title:'Review this mark',text:'Start at '+squareName(target)+'. It is currently marked as '+(wasStar?'a star':'an X')+'. We will isolate it and follow everything it forces.',visual:{area:[target],targets:[target]}}];
    if(ignored.length)steps.push({title:'Isolate this mark',text:'Temporarily set aside the other '+ignored.length+' incorrect mark'+(ignored.length===1?'':'s')+'. They are hidden only inside this explanation, so the contradiction shown next is caused by '+squareName(target)+'.',visual:proofVisual({area:[target],targets:[target]},options)});
    appendContradictionExplanation(steps,analysis,options);var correctedState=compatible.slice();correctedState[target]=solution[target];steps.push({title:'Correct the original mark',text:solution[target]===2?'The contradiction began with the X at '+squareName(target)+'. Replace it with a star.':'The contradiction began with the star at '+squareName(target)+'. Replace it with an X.',visual:proofVisual({area:[target],targets:[target],hiddenMarks:ignored.concat([target]),simStars:solution[target]===2?[target]:[],simXs:solution[target]===1?[target]:[]},{baseState:compatible,autoState:correctedState,hiddenMarks:ignored})});return{kind:'mistake',proven:true,target:target,value:solution[target],summary:'Follow this mark’s isolated consequences to the exact rule that breaks.',steps:steps}
  }
  function fallbackHint(){
    var baseState=effectiveState(),open=[];for(var i=0;i<n*n;i++)if(baseState[i]===0)open.push(i);if(!open.length)return null;var fresh=open.filter(function(i){return!hintSeen.has(i)}),seen=open.filter(function(i){return hintSeen.has(i)}),proofSort=function(a,b){return(solution[a]===1?0:1)-(solution[b]===1?0:1)},ordered=fresh.length?fresh.sort(proofSort).concat(seen.sort(proofSort)):open.slice().sort(proofSort),target=null,value=null,state=null,analysis=null;
    for(var pass=0;pass<2&&!analysis;pass++)for(var candidate=0;candidate<ordered.length;candidate++){var testTarget=ordered[candidate],testValue=solution[testTarget],testState=baseState.slice();testState[testTarget]=testValue===2?1:2;var proof=pass===0?directContradiction(testState):expandedContradiction(testState);if(proof){target=testTarget;value=testValue;state=testState;analysis=proof;break}}
    if(!analysis)return null;var assumption=value===2?'an X':'a star',result=value===2?'a star':'an X',unitIndex=context.cellUnits[target][0],area=context.units[unitIndex],options={baseState:baseState,autoState:baseState},steps=[
      {title:'Choose a constrained tile',text:'Focus on '+squareName(target)+' inside '+unitLabel(unitIndex,target)+'. We will test the mark opposite to the correct one.',visual:{area:area,targets:[target]}},
      {title:'Make the temporary assumption',text:'Assume '+squareName(target)+' is '+assumption+'. Blue marks on later steps are consequences of this test, not changes to your board.',visual:{area:area,targets:[target],simStars:value===1?[target]:[],simXs:value===2?[target]:[]}}
    ];steps[0].visual=proofVisual(steps[0].visual,options);steps[1].visual=proofVisual(steps[1].visual,options);appendContradictionExplanation(steps,analysis,options);steps.push({title:'Reverse the impossible assumption',text:'The fully checked assumption reaches a concrete rule violation in every legal continuation. Therefore '+squareName(target)+' must be '+result+'.',visual:proofVisual({area:area,targets:[target],simStars:value===2?[target]:[],simXs:value===1?[target]:[]},options)});return{kind:'contradiction',proven:true,target:target,value:value,summary:'Test the opposite mark and trace exactly why every continuation fails.',steps:steps}
  }
  function selectHintStep(index){
    if(!hintData||!hintData.steps[index])return;hintData.active=index;hintVisual=hintData.steps[index].visual||{};Array.from(q('#starsHintSteps').querySelectorAll('button')).forEach(function(button,i){button.classList.toggle('active',i===index);button.setAttribute('aria-pressed',String(i===index))});renderBoard()
  }
  function renderHint(data){
    hintData=data;hintSeen.add(data.target);q('#starsHintSummary').textContent=data.summary;var list=q('#starsHintSteps');list.innerHTML='';data.steps.forEach(function(step,index){var item=document.createElement('li'),button=document.createElement('button');button.type='button';button.dataset.step=index;button.setAttribute('aria-pressed','false');button.innerHTML='<span class="stars-hint-number">'+(index+1)+'</span><span><strong>'+step.title+'</strong><small>'+step.text+'</small></span>';item.appendChild(button);list.appendChild(item)});q('#starsHintPanel').hidden=false;selectHintStep(0)
  }
  function validHint(data,expectsMistake){
    if(!data||!Number.isInteger(data.target)||data.target<0||data.target>=n*n||(data.value!==1&&data.value!==2)||data.value!==solution[data.target])return false;
    if(expectsMistake){if(!cells[data.target]||cells[data.target]===solution[data.target]||data.kind!=='mistake'||!data.proven)return false}else if(effectiveState()[data.target]!==0)return false;
    if(!Array.isArray(data.steps)||data.steps.length<3||data.steps.some(function(step){return!step||!String(step.title||'').trim()||!String(step.text||'').trim()}))return false;
    var keys=['area','targets','problemTiles','simStars','simXs','hiddenMarks'];for(var s=0;s<data.steps.length;s++){var visual=data.steps[s].visual||{};for(var k=0;k<keys.length;k++){var list=visual[keys[k]];if(list!=null&&(!Array.isArray(list)||list.some(function(i){return!Number.isInteger(i)||i<0||i>=n*n})))return false}}
    return true
  }
  function hint(){
    if(solved)return;closeHint(false);var hasWrong=cells.some(function(value,index){return value&&value!==solution[index]}),data=null;
    if(hasWrong)data=problemHint();else{data=directDeduction();if(data){data.kind='direct';data.proven=true}if(!validHint(data,false))data=fallbackHint()}
    if(!validHint(data,hasWrong)){setStatus(hasWrong?'A proof-safe hint could not isolate the current incorrect marks. Undo or clear one mark and try again.':'No fully verified hint is available for this position.','bad');renderBoard();return}
    renderHint(data);setStatus('Hint opened. Select any numbered step to light up its explanation on the board.','hint')
  }
  function cellFromTarget(target){var cell=target&&target.closest?target.closest('.cell'):null;return cell&&board.contains(cell)?Number(cell.dataset.i):-1}
  function cellFromPoint(x,y){return cellFromTarget(document.elementFromPoint(x,y))}
  function lineCells(from,to){var r1=Math.floor(from/n),c1=from%n,r2=Math.floor(to/n),c2=to%n,steps=Math.max(Math.abs(r2-r1),Math.abs(c2-c1)),out=[];if(!steps)return[from];for(var k=0;k<=steps;k++){var r=Math.round(r1+(r2-r1)*k/steps),c=Math.round(c1+(c2-c1)*k/steps),i=r*n+c;if(out[out.length-1]!==i)out.push(i)}return out}
  function paintXs(indices){var changed=indices.filter(function(i){return i>=0&&cells[i]!==1&&cells[i]!==2});if(!changed.length)return false;closeHint(false);if(!dragState.saved){pushHistory();dragState.saved=true}changed.forEach(function(i){cells[i]=1;animationXs.add(i)});dragState.changed=true;renderBoard();return true}
  function paintMockXs(indices){var changed=false;indices.forEach(function(i){if(i>=0&&cells[i]!==2&&!mockXs.has(i)){mockStars.delete(i);mockXs.add(i);changed=true}});if(changed){dragState.changed=true;renderBoard()}return changed}
  function finishDrag(click){var state=dragState;if(!state)return;dragState=null;if(state.mock){if(!state.active&&click)cycleMockCell(state.start,false);else if(state.changed)setStatus(mockStars.size+' mock star'+(mockStars.size===1?'':'s')+' and '+mockXs.size+' mock X mark'+(mockXs.size===1?'':'s')+'.');return}if(state.active){if(state.changed){moves++;renderBoard();checkProgress()}}else if(click)cycleCell(state.start,false)}
  function moveDrag(id,x,y){if(!dragState||dragState.id!==id)return;var i=cellFromPoint(x,y);if(i<0||i===dragState.last)return;var previous=dragState.last;dragState.last=i;dragState.active=true;var line=lineCells(previous,i).concat(dragState.saved?[]:[dragState.start]);if(dragState.mock)paintMockXs(line);else paintXs(line)}
  board.addEventListener('pointerdown',function(event){if(solved||event.button!==0)return;var i=cellFromTarget(event.target);if(i<0)return;event.preventDefault();dragState={id:event.pointerId,start:i,last:i,active:false,saved:false,changed:false,mock:mockMode};try{board.setPointerCapture(event.pointerId)}catch(error){}});
  board.addEventListener('pointermove',function(event){if(dragState&&dragState.id===event.pointerId){event.preventDefault();moveDrag(event.pointerId,event.clientX,event.clientY)}});board.addEventListener('pointerup',function(event){if(dragState&&dragState.id===event.pointerId){event.preventDefault();finishDrag(true)}});board.addEventListener('pointercancel',function(){finishDrag(false)});
  board.addEventListener('click',function(event){if(event.detail!==0)return;var i=cellFromTarget(event.target);if(i>=0){if(mockMode)cycleMockCell(i,false);else cycleCell(i,false)}});board.addEventListener('contextmenu',function(event){var i=cellFromTarget(event.target);if(i>=0){event.preventDefault();if(mockMode)cycleMockCell(i,true);else cycleCell(i,true)}});
  function loadRecent(){try{var value=JSON.parse(localStorage.getItem('starsRecentV2')||'{}');return value&&typeof value==='object'?value:{}}catch(error){return{}}}
  function saveRecent(data){try{localStorage.setItem('starsRecentV2',JSON.stringify(data))}catch(error){}}
  function diverseRecord(record,recent){
    var minBoundary=Math.max(n,Math.ceil(2*n*(n-1)*(.11+(n-8)*.008))),minStars=4;return recent.every(function(old){var d=core.distance(record,old);return record.signature!==old.signature&&d.boundary>=minBoundary&&d.stars>=minStars})
  }
  function chooseCandidate(entries){entries.sort(function(a,b){return a.candidate.score-b.candidate.score});var rank=difficultyRank(),positions=[.06,.31,.56,.79,.96],center=positions[rank],spread=rank===0||rank===4 ? .08 : .13,low=Math.max(0,Math.floor((entries.length-1)*(center-spread))),high=Math.min(entries.length-1,Math.ceil((entries.length-1)*(center+spread))),band=entries.slice(low,high+1);return band[randInt(band.length)]||entries[0]}
  async function generateGame(){
    var token=++generationToken;solved=false;closeHint(false);generatingEl.classList.add('show');updateButtons();setStatus('Creating varied candidates and proving each one has exactly one solution…');await new Promise(function(resolve){setTimeout(resolve,30)});
    var rank=difficultyRank(),target=2,maxAttempts=32,generationBudget=n>=13?1800:1400,generationStarted=performance.now(),anchorTarget=Math.max(n===15?11:3,n-1-rank),entries=[],diverse=[],seen=new Set(),store=loadRecent(),key=String(n),recent=(store[key]||[]).slice(-1),attempt=0;
    for(;attempt<maxAttempts&&token===generationToken&&diverse.length<target&&!(entries.length>=2&&performance.now()-generationStarted>generationBudget);attempt++){
      var candidate=core.makeCandidate(n,Math.random,.55+rank*.08,anchorTarget,rank);if(candidate){var record=core.record(candidate,n);if(!seen.has(record.signature)){seen.add(record.signature);var entry={candidate:candidate,record:record};entries.push(entry);if(diverseRecord(record,recent))diverse.push(entry)}}
      if(attempt%2===1)await new Promise(function(resolve){setTimeout(resolve,0)})
    }
    if(token!==generationToken)return;var pool=diverse.length?diverse:entries;if(!pool.length){setStatus('No verified candidate was accepted. Retrying automatically…','bad');setTimeout(function(){if(token===generationToken)generateGame()},80);return}
    var chosen=chooseCandidate(pool),candidate=chosen.candidate;regions=candidate.map.slice();solution=candidate.solution.slice();regionColors=makePalette(n,regions,n);context=core.buildContext(regions,n);cells=Array(n*n).fill(0);history=[];moves=0;hintSeen.clear();hintData=null;hintVisual=null;animationXs.clear();animationStars.clear();mockMode=false;mockStars.clear();mockXs.clear();recent.push(chosen.record);store[key]=recent.slice(-3);saveRecent(store);lastGenerationStats={size:n,difficulty:difficulty(),generationMs:Math.round(performance.now()-generationStarted),anchorsRequested:anchorTarget,attempts:attempt,verified:entries.length,diverse:diverse.length,target:target,solverNodes:candidate.stats.nodes,solverDepth:candidate.stats.maxDepth,forcedRegions:candidate.profile.forcedRegions,tightRegions:candidate.profile.tightRegions,evolutionAccepted:candidate.stats.evolutionAccepted,evolutionTrials:candidate.stats.evolutionTrials,score:candidate.score};generatingEl.classList.remove('show');renderBoard();setStatus('Verified: this '+n+'×'+n+' '+difficulty()+' board has exactly one solution.','ok');startTimer()
  }
  function applySize(){var value=Number(sizeEl.value);if(!Number.isInteger(value)||value<core.MIN_SIZE||value>core.MAX_SIZE){setStatus('A true two-star board requires a size from 8 to 15.','bad');return}n=value;generateGame()}
  q('#starsStart').addEventListener('click',applySize);sizeEl.addEventListener('change',applySize);q('#starsDifficulty').addEventListener('change',generateGame);q('#starsNewGame').addEventListener('click',generateGame);q('#starsUndo').addEventListener('click',undo);q('#starsClear').addEventListener('click',function(event){window.confirmBoardClear(clearBoard,'Stars',event.currentTarget)});q('#starsMistakes').addEventListener('click',showMistakes);q('#starsHint').addEventListener('click',hint);q('#starsCloseHint').addEventListener('click',function(){closeHint(true);setStatus('Hint closed. Continue when you are ready.')});q('#starsHintSteps').addEventListener('click',function(event){var button=event.target.closest('button[data-step]');if(button)selectHintStep(Number(button.dataset.step))});q('#starsMockMode').addEventListener('click',function(){mockMode=!mockMode;if(!mockMode){mockStars.clear();mockXs.clear()}closeHint(false);renderBoard();setStatus(mockMode?'Mock mode on. Test stars and X marks freely.':'Mock mode off. Mock marks cleared.')});q('#starsClearMocks').addEventListener('click',function(){clearMocks(true)});q('#starsAutoCheck').addEventListener('change',function(){closeHint(false);renderBoard();checkProgress()});q('#starsAutoXs').addEventListener('change',function(){closeHint(false);renderBoard()});
  document.querySelector('#starsCloseWin').addEventListener('click',function(){closeWinPopup(document.querySelector('#starsWin'))});document.querySelector('#starsWinNew').addEventListener('click',function(){closeWinPopup(document.querySelector('#starsWin'));generateGame()});
  window.__starsDebug={generate:generateGame,getState:function(){return{size:n,regions:regions.slice(),solution:solution.slice(),cells:cells.slice(),effective:effectiveState(),hint:hintData,visual:hintVisual,mockMode:mockMode,mockStars:Array.from(mockStars),mockXs:Array.from(mockXs)}},setCell:function(i,value){cells[i]=value;renderBoard()},setCells:function(values){if(!Array.isArray(values)||values.length!==n*n)throw new Error('Invalid Stars debug state');cells=values.slice();closeHint(false);renderBoard()},verify:function(){return core.solve(regions,n,2,null,500000)},getGenerationStats:function(){return lastGenerationStats&&Object.assign({},lastGenerationStats)},showHint:hint,selectHintStep:selectHintStep};
  if(window.START_GAME==='stars'||document.body.dataset.startGame==='stars')generateGame()
})();
