document.body.insertAdjacentHTML('afterbegin',`
<section class="game-screen games-home" id="homeScreen" hidden>
  <main class="games-hub" aria-labelledby="homeTitle">
    <h1 id="homeTitle">Daily Games</h1>
    <p>Pick a puzzle and play it in the shared game suite.</p>
    <div class="game-list">
      <a class="game-launch under-construction" data-game="wend" href="wend.html" aria-disabled="true">
        <span class="game-copy"><span class="game-kicker">Words</span><span class="game-name">Wend</span><span class="construction-badge">Under construction</span></span>
        <span class="game-art art-wend" aria-hidden="true"><span class="hub-icon wend-icon"><span>W</span><span>E</span><span>N</span><span>D</span></span></span>
      </a>
      <a class="game-launch" data-game="patches" href="patches.html">
        <span class="game-copy"><span class="game-kicker">Logic</span><span class="game-name">Patches</span></span>
        <span class="game-art art-patches" aria-hidden="true"><span class="hub-icon patches-icon"><span class="patch-card one"><b>4</b></span><span class="patch-card two"></span><span class="patch-card three"></span></span></span>
      </a>
      <a class="game-launch" data-game="sudoku" href="minisudoku.html">
        <span class="game-copy"><span class="game-kicker">Numbers</span><span class="game-name">Mini Sudoku</span></span>
        <span class="game-art art-sudoku" aria-hidden="true"><span class="hub-icon sudoku-icon"><span>1</span><span></span><span>4</span><span></span><span>3</span><span></span><span>2</span><span></span><span></span></span></span>
      </a>
      <a class="game-launch under-construction" data-game="zip" href="zip.html" aria-disabled="true">
        <span class="game-copy"><span class="game-kicker">Path</span><span class="game-name">Zip</span><span class="construction-badge">Under construction</span></span>
        <span class="game-art art-zip" aria-hidden="true"><span class="hub-icon zip-icon"><span class="zip-track"><i></i></span></span></span>
      </a>
      <a class="game-launch under-construction" data-game="tango" href="tango.html" aria-disabled="true">
        <span class="game-copy"><span class="game-kicker">Grid</span><span class="game-name">Tango</span><span class="construction-badge">Under construction</span></span>
        <span class="game-art art-tango" aria-hidden="true"><span class="hub-icon tango-icon"></span></span>
      </a>
      <a class="game-launch" data-game="queens" href="queens.html">
        <span class="game-copy"><span class="game-kicker">Regions</span><span class="game-name">Queens</span></span>
        <span class="game-art art-queens" aria-hidden="true"><span class="hub-icon queens-icon"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></span>
      </a>
      <a class="game-launch under-construction" data-game="pinpoint" href="pinpoint.html" aria-disabled="true">
        <span class="game-copy"><span class="game-kicker">Clues</span><span class="game-name">Pinpoint</span><span class="construction-badge">Under construction</span></span>
        <span class="game-art art-pinpoint" aria-hidden="true"><span class="hub-icon pinpoint-icon"></span></span>
      </a>
      <a class="game-launch under-construction" data-game="crossclimb" href="crossclimb.html" aria-disabled="true">
        <span class="game-copy"><span class="game-kicker">Words</span><span class="game-name">Crossclimb</span><span class="construction-badge">Under construction</span></span>
        <span class="game-art art-crossclimb" aria-hidden="true"><span class="hub-icon cross-icon"></span></span>
      </a>
    </div>
  </main>
</section>
<section class="game-screen" id="queensScreen" hidden><button class="suite-back" data-home type="button">‹ All games</button>
<div class="app">
  <main class="card main">
    <div class="topbar"><div class="title"><div class="logo">♛</div><div><h1>Queens</h1><div class="subtitle">Choose any board size; larger boards use more varied layouts</div></div></div><div class="timer" id="timer">00:00</div></div>
    <div class="size-control queens-controls"><label for="boardSize">Board size</label><input id="boardSize" type="number" min="4" max="25" step="1" value="5" inputmode="numeric"><button id="applySize">Start</button><span class="size-help" id="sizeHelp">Every generated board is verified to have exactly one solution.</span></div>
    <div class="board-shell"><div class="col-labels" id="colLabels" aria-hidden="true"></div><div class="row-labels" id="rowLabels" aria-hidden="true"></div><div class="board-wrap"><div class="board" id="board" role="grid" aria-label="Queens board"></div><div class="generating" id="generating"><div><div class="spinner"></div>Generating a unique logic puzzle…</div></div></div></div>
    <div class="status" id="status" aria-live="polite">Click: empty → × → queen. Drag across cells to paint X marks.</div>
    <div class="mock-tools"><button class="mock-toggle" id="mockMode" type="button" aria-pressed="false">Mock mode: Off</button><button id="clearMocks" type="button" disabled>Clear mocks</button><div class="mock-help" id="mockHelp">Turn on Mock mode: tap cycles mock × → mock queen; drag paints mock X's.</div></div>
    <div class="actions"><button id="undo">Undo</button><button id="clear">Clear</button><button id="mistakes">Show mistakes</button><button id="hint">Rule out tile (3)</button><button class="primary" id="newGame">New game</button></div>
  </main>
  <aside class="card side"><h2>Rules</h2><ol class="rules"><li>Place exactly one queen in every row.</li><li>Place exactly one queen in every column.</li><li>Place exactly one queen in every colored region.</li><li>Queens cannot touch, including diagonally.</li></ol><div class="legend"><span><b>×</b> impossible</span><span><b>♛</b> queen</span><span><b class="mock-legend">×/♛</b> mock</span></div><div class="settings"><h2>Settings</h2><div class="setting"><label for="autoCheck">Auto-check<small>Highlight rule violations</small></label><input class="switch" id="autoCheck" type="checkbox" checked></div><div class="setting"><label for="autoXs">Auto-place X's<small>Mark cells blocked by queens</small></label><input class="switch" id="autoXs" type="checkbox" checked></div></div><div class="meta"><span class="badge">No guessing required</span></div></aside>
</div>

</section>
<section class="game-screen mini-game-screen" id="wendScreen" hidden>
  <button class="suite-back" data-home type="button">‹ All games</button>
  <div class="mini-game-layout"><main class="mini-main"><div class="mini-head"><div class="mini-title"><div class="mini-emblem" style="background:#fff2c6">WE</div><div><h1>Wend</h1><p>Use every letter exactly once</p></div></div><div class="mini-controls"><div class="mini-size-control"><label for="wendSize">Grid size</label><select id="wendSize"><option value="3">3 × 3</option><option value="4" selected>4 × 4</option><option value="5">5 × 5</option></select></div><div class="mini-size-control"><label for="wendDifficulty">Difficulty</label><select id="wendDifficulty"><option value="easy">Easy</option><option value="medium" selected>Medium</option><option value="hard">Hard</option><option value="expert">Expert</option><option value="master">Master</option></select></div></div></div><div class="wend-word-line"><span>Current word</span><strong id="wendCurrent">—</strong></div><div class="wend-board" id="wendGrid"></div><div class="wend-found" id="wendFound"></div><div class="mini-status" id="wendStatus">Connect adjacent letters horizontally or vertically, then submit the word.</div><div class="mini-actions"><button id="wendUndo" type="button">Undo letter</button><button id="wendSubmit" class="mini-primary" type="button">Submit word</button><button id="wendReset" type="button">New puzzle</button></div></main><aside class="mini-side"><h2>Rules</h2><ol><li>Connect adjacent letters horizontally or vertically.</li><li>Every letter must be used exactly once.</li><li>Words cannot overlap.</li></ol></aside></div>
</section>
<section class="game-screen mini-game-screen" id="patchesScreen" hidden>
  <button class="suite-back" data-home type="button">‹ All games</button>
  <div class="mini-game-layout"><main class="mini-main"><div class="mini-head"><div class="mini-title"><div class="mini-emblem" style="background:#ffdede">▦</div><div><h1>Patches</h1><p>Complete every colorful shape</p></div></div><div class="mini-timer" id="patchTimer" aria-label="Elapsed time">00:00</div><div class="mini-controls"><div class="mini-size-control"><label for="patchSize">Board</label><select id="patchSize"><option value="4">4 × 4</option><option value="5" selected>5 × 5</option><option value="6">6 × 6</option><option value="7">7 × 7</option><option value="8">8 × 8</option></select></div><div class="mini-size-control"><label for="patchDifficulty">Difficulty</label><select id="patchDifficulty"><option value="easy">Easy</option><option value="medium" selected>Medium</option><option value="hard">Hard</option><option value="expert">Expert</option><option value="master">Master</option></select></div></div></div><div class="patch-board" id="patchGrid"></div><div class="mini-status" id="patchStatus">Press a colored clue and drag out the full patch you want to place.</div><div class="mini-actions four"><button id="patchUndo" type="button">Undo</button><button id="patchReset" type="button">Clear</button><button id="patchHint" class="mini-primary" type="button">Hint</button><button id="patchNew" type="button">New puzzle</button></div></main><aside class="mini-side"><h2>Rules</h2><ol><li>Fill the entire grid with non-overlapping rectangles and squares.</li><li>Each patch contains exactly one colored clue.</li><li>The clue shape specifies square, wide, or tall.</li><li>A displayed number is the patch's exact area; a blank clue may use any matching area.</li></ol></aside></div>
</section>
<section class="game-screen mini-game-screen" id="sudokuScreen" hidden>
  <button class="suite-back" data-home type="button">‹ All games</button>
  <div class="mini-game-layout"><main class="mini-main"><div class="mini-head"><div class="mini-title"><div class="mini-emblem" style="background:#cff6e8">123</div><div><h1>Mini Sudoku</h1><p>The classic game, made flexible</p></div></div><div class="mini-timer" id="sudokuTimer" aria-label="Elapsed time">00:00</div><div class="mini-controls"><div class="mini-size-control"><label for="sudokuSize">Puzzle</label><select id="sudokuSize"><option value="4" selected>4 × 4</option><option value="6">6 × 6</option><option value="9">9 × 9</option></select></div><div class="mini-size-control"><label for="sudokuDifficulty">Difficulty</label><select id="sudokuDifficulty"><option value="easy">Easy</option><option value="medium" selected>Medium</option><option value="hard">Hard</option><option value="expert">Expert</option><option value="master">Master</option></select></div></div></div><div class="sudoku-board" id="sudokuGrid"></div><div class="sudoku-keypad" id="sudokuKeypad" role="group" aria-label="Sudoku number pad"></div><div class="mini-status" id="sudokuStatus">Choose a number below, then tap the cell where it belongs.</div><div class="mini-actions"><button id="sudokuReset" type="button">Reset</button><button id="sudokuHint" class="mini-primary" type="button">Hint</button><button id="sudokuNew" type="button">New puzzle</button></div></main><aside class="mini-side"><h2>Rules</h2><ol><li>Every row contains each number exactly once.</li><li>Every column contains each number exactly once.</li><li>Every outlined box contains each number exactly once.</li></ol></aside></div>
</section>
<section class="game-screen mini-game-screen" id="zipScreen" hidden>
  <button class="suite-back" data-home type="button">‹ All games</button>
  <div class="mini-game-layout"><main class="mini-main"><div class="mini-head"><div class="mini-title"><div class="mini-emblem" style="background:#ffd9ca">↝</div><div><h1>Zip</h1><p>Complete the path</p></div></div><div class="mini-controls"><div class="mini-size-control"><label for="zipSize">Board</label><select id="zipSize"><option value="4">4 × 4</option><option value="5" selected>5 × 5</option><option value="6">6 × 6</option><option value="7">7 × 7</option><option value="8">8 × 8</option></select></div><div class="mini-size-control"><label for="zipDifficulty">Difficulty</label><select id="zipDifficulty"><option value="easy">Easy</option><option value="medium" selected>Medium</option><option value="hard">Hard</option><option value="expert">Expert</option><option value="master">Master</option></select></div></div></div><div class="zip-board" id="zipGrid"></div><div class="mini-status" id="zipStatus">Start at 1, pass through the numbers in order, and fill every cell.</div><div class="mini-actions four"><button id="zipUndo" type="button">Undo</button><button id="zipReset" type="button">Clear</button><button id="zipHint" class="mini-primary" type="button">Hint</button><button id="zipNew" type="button">New path</button></div></main><aside class="mini-side"><h2>Rules</h2><ol><li>Draw one continuous path through every cell.</li><li>Move only horizontally or vertically.</li><li>Pass through numbered cells in order.</li><li>Dark walls cannot be crossed.</li></ol></aside></div>
</section>
<section class="game-screen mini-game-screen" id="tangoScreen" hidden>
  <button class="suite-back" data-home type="button">‹ All games</button>
  <div class="mini-game-layout"><main class="mini-main"><div class="mini-head"><div class="mini-title"><div class="mini-emblem" style="background:linear-gradient(#8ab9ff 50%,#ffbd36 50%)">◐</div><div><h1>Tango</h1><p>Harmonize the grid</p></div></div><div class="mini-controls"><div class="mini-size-control"><label for="tangoSize">Board</label><select id="tangoSize"><option value="4">4 × 4</option><option value="6" selected>6 × 6</option><option value="8">8 × 8</option></select></div><div class="mini-size-control"><label for="tangoDifficulty">Difficulty</label><select id="tangoDifficulty"><option value="easy">Easy</option><option value="medium" selected>Medium</option><option value="hard">Hard</option><option value="expert">Expert</option><option value="master">Master</option></select></div></div></div><div class="tango-wrap" id="tangoWrap"><div class="tango-board" id="tangoGrid"></div><div id="tangoRelations"></div></div><div class="mini-status" id="tangoStatus">Tap a cell to cycle between sun and moon.</div><div class="mini-actions four"><button id="tangoUndo" type="button">Undo</button><button id="tangoReset" type="button">Clear</button><button id="tangoHint" class="mini-primary" type="button">Hint</button><button id="tangoNew" type="button">New puzzle</button></div></main><aside class="mini-side"><h2>Rules</h2><ol><li>Each row and column contains equal numbers of suns and moons.</li><li>No more than two identical symbols may touch in a row.</li><li>= means the cells match; × means they differ.</li></ol></aside></div>
</section>
<section class="game-screen mini-game-screen" id="pinpointScreen" hidden>
  <button class="suite-back" data-home type="button">‹ All games</button>
  <div class="mini-game-layout"><main class="mini-main"><div class="mini-head"><div class="mini-title"><div class="mini-emblem" style="background:#d8eaff">⌖</div><div><h1>Pinpoint</h1><p>Guess the category</p></div></div><div class="mini-controls"><div class="mini-size-control"><label for="pinpointSize">Clues</label><select id="pinpointSize"><option value="4">4 clues</option><option value="5" selected>5 clues</option><option value="6">6 clues</option></select></div><div class="mini-size-control"><label for="pinpointDifficulty">Difficulty</label><select id="pinpointDifficulty"><option value="easy">Easy</option><option value="medium" selected>Medium</option><option value="hard">Hard</option><option value="expert">Expert</option><option value="master">Master</option></select></div></div></div><div class="pinpoint-clues" id="pinpointClues"></div><form class="pin-form" id="pinpointForm"><input id="pinpointGuess" autocomplete="off" placeholder="Guess the category" aria-label="Guess the category"><button class="mini-primary" type="submit">Guess</button></form><div class="mini-status" id="pinpointStatus">Use as few clues as possible.</div><div class="mini-actions"><button id="pinpointReveal" type="button">Reveal clue</button><button id="pinpointNew" class="mini-primary wide" type="button">New puzzle</button></div></main><aside class="mini-side"><h2>How to play</h2><ol><li>Study the revealed clue.</li><li>Guess the category linking every clue.</li><li>Each incorrect guess reveals another clue.</li></ol></aside></div>
</section>
<section class="game-screen mini-game-screen" id="crossclimbScreen" hidden>
  <button class="suite-back" data-home type="button">‹ All games</button>
  <div class="mini-game-layout"><main class="mini-main cross-main"><div class="mini-head"><div class="mini-title"><div class="mini-emblem" style="background:#d3f4f7">≋</div><div><h1>Crossclimb</h1><p>Solve and order a one-letter word ladder</p></div></div><div class="mini-controls"><div class="mini-size-control"><label for="crossWordLength">Word length</label><select id="crossWordLength"><option value="4" selected>4 letters</option><option value="5">5 letters</option><option value="6">6 letters</option></select></div><div class="mini-size-control"><label for="crossDifficulty">Difficulty</label><select id="crossDifficulty"><option value="easy">Easy</option><option value="medium" selected>Medium</option><option value="hard">Hard</option><option value="expert">Expert</option><option value="master">Master</option></select></div></div></div><div class="cross-ladder" id="crossLadder" aria-label="Crossclimb word ladder"></div><div class="cross-row-actions"><button id="crossReveal" type="button">Reveal row</button><button id="crossHint" type="button">Hint</button></div><div class="cross-clue-bar" id="crossClue">Select a movable row to see its clue.</div><div class="mini-status" id="crossStatus">Complete the five middle words and drag them into the only valid order.</div><div class="mini-actions"><button id="crossCheck" class="mini-primary wide" type="button">Check ladder</button><button id="crossNew" type="button">New puzzle</button></div></main><aside class="mini-side"><h2>Rules</h2><ol><li>The top and bottom words are locked.</li><li>Solve each middle row from its clue.</li><li>Drag middle rows to reorder them.</li><li>Neighboring words must differ by exactly one letter.</li></ol></aside></div>
</section>

<div class="win" id="win"><div class="win-card"><div class="win-crown">♛</div><h2>Puzzle solved</h2><p id="winText"></p><div class="row"><button id="closeWin">View board</button><button class="primary" id="winNew">New game</button></div></div></div>
<div class="win suite-win" id="suiteWin"><div class="win-card"><div class="win-crown" id="suiteWinIcon">✓</div><h2 id="suiteWinTitle">Puzzle solved</h2><p id="suiteWinText"></p><div class="row"><button id="suiteWinHome" type="button">All games</button><button class="primary" id="suiteWinAgain" type="button">Play again</button></div></div></div>
`);

(function(){
'use strict';
var MIN_SIZE=4,MAX_SIZE=25,MAX_GENERATED_BASE=9;
var $=function(s){return document.querySelector(s)};
var boardEl=$('#board'),colLabelsEl=$('#colLabels'),rowLabelsEl=$('#rowLabels'),statusEl=$('#status'),genEl=$('#generating'),timerEl=$('#timer'),sizeInput=$('#boardSize');
var n=5,regions=[],solution=[],regionColors=[],cells=[],history=[],moves=0,startedAt=0,timerId=null,solved=false,generationToken=0,dragState=null,hintsLeft=3,hintHistory=[],hintFocus=null,hintVisual=null,recentSolutionFamilies={},recentQueenSetups={},DIVERSITY_MEMORY=1500,IDLE_HINT_MS=30000,idleHintTimer=null,idleFlashTimer=null,idleForcedTiles=[],lastValidMarkAt=0,hintPlaybackTimer=null,hintPlaybackToken=0,mockMode=false,mockQueens=new Set(),mockXs=new Set(),xAnimationTiles=new Set(),queenAnimationTiles=new Set(),mockXAnimationTiles=new Set(),mockQueenAnimationTiles=new Set(),mockClearOnNextPress=false,mockClearTimer=null;
function randInt(max){return Math.floor(Math.random()*max)}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=randInt(i+1),t=a[i];a[i]=a[j];a[j]=t}return a}
function fmtTime(ms){var s=Math.max(0,Math.floor(ms/1000)),m=Math.floor(s/60);return String(m).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
function startTimer(){clearInterval(timerId);startedAt=Date.now();timerEl.textContent='00:00';timerId=setInterval(function(){if(!solved)timerEl.textContent=fmtTime(Date.now()-startedAt)},500)}
function setStatus(text,type){statusEl.textContent=text;statusEl.className='status'+(type?' '+type:'')}
function baseConfig(size){return{maxAttempts:size<=5?70:size===6?95:size===7?125:size===8?165:220,preferSingleton:size<=5&&Math.random()<.45,minRegion:size>=8&&Math.random()<.7?2:1,regionBias:.8+Math.random()*2.4}}
var COLORS=[[5,85,72],[215,88,72],[125,66,67],[48,96,68],[282,76,75],[185,82,65],[330,84,75],[90,74,68],[25,94,70],[245,80,78],[160,74,64],[60,94,72],[350,76,62],[205,80,60],[110,56,78],[40,86,82],[295,64,62],[175,66,80],[320,66,65],[80,66,80],[15,78,82],[230,66,62],[145,60,80],[55,78,58],[270,60,82],[195,70,78],[340,66,84],[100,58,58],[30,70,58],[255,58,62]];
function colorDistance(a,b){var dh=Math.abs(a[0]-b[0]);dh=Math.min(dh,360-dh)/180;return dh*3+Math.abs(a[1]-b[1])/34+Math.abs(a[2]-b[2])/18}
function makePalette(count,map,size){var adjacency=Array.from({length:count},function(){return new Set()});for(var r=0;r<size;r++)for(var c=0;c<size;c++){var i=r*size+c,id=map[i];if(c+1<size&&map[i+1]!==id){adjacency[id].add(map[i+1]);adjacency[map[i+1]].add(id)}if(r+1<size&&map[i+size]!==id){adjacency[id].add(map[i+size]);adjacency[map[i+size]].add(id)}}var order=Array.from({length:count},function(_,i){return i}).sort(function(a,b){return adjacency[b].size-adjacency[a].size||a-b}),assigned=Array(count).fill(-1),used=new Set(),limit=size>11?COLORS.length:Math.min(12,COLORS.length);for(var oi=0;oi<order.length;oi++){var rid=order[oi],best=-1,bestScore=-Infinity;for(var ci=0;ci<limit;ci++){if(used.has(ci))continue;var ns=Array.from(adjacency[rid]).map(function(x){return assigned[x]}).filter(function(x){return x>=0});var sep=ns.length?Math.min.apply(null,ns.map(function(x){return colorDistance(COLORS[ci],COLORS[x])})):5;var all=assigned.filter(function(x){return x>=0});var spread=all.length?Math.min.apply(null,all.map(function(x){return colorDistance(COLORS[ci],COLORS[x])})):2;var score=sep*4+spread;if(score>bestScore){bestScore=score;best=ci}}if(best<0){for(ci=0;ci<COLORS.length;ci++)if(!used.has(ci)){best=ci;break}}assigned[rid]=best;used.add(best)}return assigned.map(function(ci){var c=COLORS[ci];return 'hsl('+c[0]+', '+c[1]+'%, '+c[2]+'%)'})}
function makeSolution(size){var used=Array(size).fill(false),out=[];function dfs(r){var opts=shuffle(Array.from({length:size},function(_,i){return i}));for(var k=0;k<opts.length;k++){var c=opts[k];if(used[c]||(r>0&&Math.abs(c-out[r-1])===1))continue;used[c]=true;out[r]=c;if(r===size-1||dfs(r+1))return true;used[c]=false}return false}return dfs(0)?out.slice():null}
function solvePuzzle(map,size,limit){
  limit=limit||2;
  if(!Array.isArray(map)||map.length!==size*size)return{count:0,solution:null};
  var count=0,first=null,assigned=Array(size).fill(-1),regionTiles=Array.from({length:size},function(){return[]});
  for(var r=0;r<size;r++)for(var c=0;c<size;c++){var rid=map[r*size+c];if(!Number.isInteger(rid)||rid<0||rid>=size)return{count:0,solution:null};regionTiles[rid].push([r,c])}
  for(r=0;r<size;r++)if(!regionTiles[r].length)return{count:0,solution:null};
  function legal(r,c,usedCols,usedRegions){var rid=map[r*size+c],cb=1<<c,rb=1<<rid;if(assigned[r]>=0||(usedCols&cb)||(usedRegions&rb))return false;if(r>0&&assigned[r-1]>=0&&Math.abs(c-assigned[r-1])<=1)return false;if(r<size-1&&assigned[r+1]>=0&&Math.abs(c-assigned[r+1])<=1)return false;return true}
  function dfs(depth,usedCols,usedRegions){
    if(count>=limit)return;
    if(depth===size){count++;if(!first)first=assigned.slice();return}
    var best=null,list,i,p,r,c,rid;
    function consider(candidate){if(!candidate.length)return false;if(best===null||candidate.length<best.length)best=candidate;return true}
    for(r=0;r<size;r++)if(assigned[r]<0){list=[];for(c=0;c<size;c++)if(legal(r,c,usedCols,usedRegions))list.push([r,c]);if(!consider(list))return;if(best.length===1)break}
    if(best.length!==1)for(c=0;c<size;c++)if(!(usedCols&(1<<c))){list=[];for(r=0;r<size;r++)if(legal(r,c,usedCols,usedRegions))list.push([r,c]);if(!consider(list))return;if(best.length===1)break}
    if(best.length!==1)for(rid=0;rid<size;rid++)if(!(usedRegions&(1<<rid))){list=[];for(i=0;i<regionTiles[rid].length;i++){p=regionTiles[rid][i];if(legal(p[0],p[1],usedCols,usedRegions))list.push(p)}if(!consider(list))return;if(best.length===1)break}
    for(i=0;i<best.length;i++){r=best[i][0];c=best[i][1];rid=map[r*size+c];assigned[r]=c;dfs(depth+1,usedCols|(1<<c),usedRegions|(1<<rid));assigned[r]=-1;if(count>=limit)return}
  }
  dfs(0,0,0);return{count:count,solution:first}
}
function solveCount(map,size,limit){return solvePuzzle(map,size,limit).count}
function growUnique(size,sol,conf){var map=Array(size*size).fill(-1),sizes=Array(size).fill(1);for(var r=0;r<size;r++)map[r*size+sol[r]]=r;var frozen=conf.preferSingleton?randInt(size):-1,remaining=size*size-size;while(remaining){var options=[];for(r=0;r<size;r++)for(var c=0;c<size;c++){var i=r*size+c;if(map[i]>=0)continue;var near=new Set();if(r>0&&map[i-size]>=0)near.add(map[i-size]);if(r<size-1&&map[i+size]>=0)near.add(map[i+size]);if(c>0&&map[i-1]>=0)near.add(map[i-1]);if(c<size-1&&map[i+1]>=0)near.add(map[i+1]);Array.from(near).forEach(function(rid){if(rid!==frozen)options.push([i,rid,sizes[rid]])})}if(!options.length)return null;shuffle(options);options.sort(function(a,b){return a[2]-b[2]+(Math.random()-.5)*(conf.regionBias||2.2)});var placed=false;for(var o=0;o<options.length;o++){i=options[o][0];var rid=options[o][1];map[i]=rid;if(solveCount(map,size,2)===1){sizes[rid]++;remaining--;placed=true;break}map[i]=-1}if(!placed)return null}if(Math.min.apply(null,sizes)<conf.minRegion)return null;return map}
var FALLBACK={4:{sol:[1,3,0,2],map:[0,0,0,1,0,1,1,1,2,2,3,3,2,3,3,3]},5:{sol:[4,2,0,3,1],map:[1,1,0,0,0,2,1,1,3,0,2,1,1,3,0,2,4,4,3,0,4,4,3,3,3]},6:{sol:[2,4,0,3,1,5],map:[0,0,0,1,5,5,2,2,0,1,1,5,2,2,3,3,3,5,2,4,4,3,5,5,2,4,4,3,5,5,2,2,5,5,5,5]},7:{sol:[6,2,0,4,1,5,3],map:[1,1,3,3,0,0,0,2,1,1,3,0,0,0,2,1,3,3,0,3,0,2,2,3,3,3,3,0,4,4,3,3,3,5,0,4,4,4,5,5,5,0,6,6,6,6,5,5,5]},8:{sol:[6,0,3,7,5,2,4,1],map:[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,2,2,0,0,0,1,1,2,2,2,3,3,3,1,5,2,2,2,4,4,3,7,5,5,5,6,4,4,3,7,7,5,5,6,6,4,3,7,7,5,6,6,6,4,4]},9:{sol:[5,2,4,7,0,8,3,1,6],map:[1,1,1,1,1,0,0,0,0,4,4,1,1,1,0,3,0,0,4,4,1,1,2,2,3,3,3,4,4,6,1,1,2,2,3,3,4,4,6,6,6,2,2,5,5,4,4,6,6,6,2,2,8,5,4,4,6,6,6,2,2,8,8,4,7,7,7,7,7,2,8,8,7,7,7,7,7,7,8,8,8]}};
function transformPuzzle(data,size){var turns=randInt(4),mirror=Math.random()<.5,newMap=Array(size*size),newSol=Array(size);function tx(r,c){if(mirror)c=size-1-c;for(var k=0;k<turns;k++){var t=r;r=c;c=size-1-t}return[r,c]}for(var r=0;r<size;r++)for(var c=0;c<size;c++){var p=tx(r,c);newMap[p[0]*size+p[1]]=data.map[r*size+c]}for(r=0;r<size;r++){p=tx(r,data.sol[r]);newSol[p[0]]=p[1]}return{map:newMap,sol:newSol,unique:data.unique===true}}
function insertionCandidates(data,size){var out=[];for(var row=0;row<=size;row++)for(var col=0;col<=size;col++){var up=row>0?(data.sol[row-1]>=col?data.sol[row-1]+1:data.sol[row-1]):-99,down=row<size?(data.sol[row]>=col?data.sol[row]+1:data.sol[row]):-99;if(row>0&&Math.abs(up-col)<=1)continue;if(row<size&&Math.abs(down-col)<=1)continue;out.push({row:row,col:col,edge:(row===0||row===size?1:0)+(col===0||col===size?1:0)})}shuffle(out);out.sort(function(a,b){return a.edge-b.edge+(Math.random()-.5)*.7});return out}
function buildInsertedPuzzle(data,size,row,col,arms){var next=size+1,map=Array(next*next).fill(-1),sol=Array(next);for(var r=0;r<size;r++)for(var c=0;c<size;c++){var nr=r>=row?r+1:r,nc=c>=col?c+1:c;map[nr*next+nc]=data.map[r*size+c]}for(r=0;r<size;r++){nr=r>=row?r+1:r;sol[nr]=data.sol[r]>=col?data.sol[r]+1:data.sol[r]}sol[row]=col;var lower=Math.random()<.5,run=1+randInt(3);for(c=0;c<next;c++)if(c!==col){if(--run<=0){lower=!lower;run=1+randInt(4)}var oc=c<col?c:c-1,orow=row===0?0:row===size?size-1:(lower?row:row-1);map[row*next+c]=data.map[orow*size+oc]}var right=Math.random()<.5;run=1+randInt(3);for(r=0;r<next;r++)if(r!==row){if(--run<=0){right=!right;run=1+randInt(4)}orow=r<row?r:r-1;oc=col===0?0:col===size?size-1:(right?col:col-1);map[r*next+col]=data.map[orow*size+oc]}map[row*next+col]=size;var around=shuffle([[row-1,col],[row+1,col],[row,col-1],[row,col+1]]).filter(function(p){return p[0]>=0&&p[0]<next&&p[1]>=0&&p[1]<next});for(var a=0;a<arms&&a<around.length;a++)map[around[a][0]*next+around[a][1]]=size;return{map:map,sol:sol}}
function verifiedInsertedPuzzle(data,size,pick,arms){var expanded=buildInsertedPuzzle(data,size,pick.row,pick.col,arms);return finalUniqueValidation(expanded,size+1)?expanded:null}
function guaranteedUniqueExtension(data,size){
  var picks=insertionCandidates(data,size);
  for(var round=0;round<6;round++)for(var i=0;i<picks.length;i++){var expanded=verifiedInsertedPuzzle(data,size,picks[i],0);if(expanded)return expanded}
  return null
}
function extendPuzzle(data,size){
  var picks=insertionCandidates(data,size),tries=Math.min(picks.length,size<10?12:size<14?8:4);
  for(var i=0;i<tries;i++){var pick=picks[i],maxArms=size>=14?1:size>=11?2:4,arms=1+randInt(maxArms),expanded=verifiedInsertedPuzzle(data,size,pick,arms);if(expanded)return expanded}
  return guaranteedUniqueExtension(data,size)
}
function relabelRegions(map,size){var ids=shuffle(Array.from({length:size},function(_,i){return i}));return map.map(function(id){return ids[id]})}
function solutionFamilySignature(sol,size){var signatures=[];for(var mirror=0;mirror<2;mirror++)for(var turns=0;turns<4;turns++){var transformed=Array(size);for(var r=0;r<size;r++){var rr=r,c=sol[r];if(mirror)c=size-1-c;for(var k=0;k<turns;k++){var t=rr;rr=c;c=size-1-t}transformed[rr]=c}signatures.push(transformed.join(','))}signatures.sort();return signatures[0]}
function isRecentSolution(size,sol){var list=recentSolutionFamilies[size]||[];return list.indexOf(solutionFamilySignature(sol,size))>=0}
function rememberSolution(size,sol){var key=solutionFamilySignature(sol,size),list=recentSolutionFamilies[size]||(recentSolutionFamilies[size]=[]);if(list.indexOf(key)<0)list.push(key);if(list.length>DIVERSITY_MEMORY)list.shift()}
function queenSetupRecord(candidate,size){return{sol:candidate.sol.slice(),map:candidate.map.slice(),sig:solutionFamilySignature(candidate.sol,size)+'|'+candidate.map.join(',')}}
function hammingArray(a,b){var diff=0,len=Math.min(a.length,b.length);for(var i=0;i<len;i++)if(a[i]!==b[i])diff++;return diff+Math.abs(a.length-b.length)}
function queenSetupDistance(a,b,size){return hammingArray(a.sol,b.sol)*size+hammingArray(a.map,b.map)}
function queenMinDistance(size){return Math.max(size*2,Math.round(size*size*.22))}
function isExactRecentQueenSetup(size,candidate){var record=queenSetupRecord(candidate,size),list=recentQueenSetups[size]||[];return list.some(function(item){return item.sig===record.sig})}
function isDiverseQueenSetup(size,candidate){var record=queenSetupRecord(candidate,size),list=recentQueenSetups[size]||[],min=queenMinDistance(size);return list.every(function(item){return item.sig!==record.sig&&queenSetupDistance(item,record,size)>=min})}
function rememberQueenSetup(size,candidate){var record=queenSetupRecord(candidate,size),list=recentQueenSetups[size]||(recentQueenSetups[size]=[]);if(!list.some(function(item){return item.sig===record.sig}))list.push(record);if(list.length>DIVERSITY_MEMORY)list.shift();rememberSolution(size,candidate.sol)}
function validSolvedLayout(map,sol,size){if(!sol||sol.length!==size)return false;var cols=new Set(),usedRegions=new Set();for(var r=0;r<size;r++){var c=sol[r];if(!Number.isInteger(c)||c<0||c>=size||cols.has(c))return false;var rid=map[r*size+c];if(rid<0||rid>=size||usedRegions.has(rid))return false;if(r>0&&Math.abs(c-sol[r-1])<=1)return false;cols.add(c);usedRegions.add(rid)}return cols.size===size&&usedRegions.size===size}
function validRegionMap(map,size){
  if(!Array.isArray(map)||map.length!==size*size)return false;
  var counts=Array(size).fill(0),starts=Array(size).fill(-1);
  for(var i=0;i<map.length;i++){var rid=map[i];if(!Number.isInteger(rid)||rid<0||rid>=size)return false;counts[rid]++;if(starts[rid]<0)starts[rid]=i}
  for(rid=0;rid<size;rid++){
    if(!counts[rid])return false;
    var seen=new Set([starts[rid]]),stack=[starts[rid]];
    while(stack.length){var at=stack.pop(),r=Math.floor(at/size),c=at%size,near=[];if(r>0)near.push(at-size);if(r<size-1)near.push(at+size);if(c>0)near.push(at-1);if(c<size-1)near.push(at+1);for(var k=0;k<near.length;k++)if(map[near[k]]===rid&&!seen.has(near[k])){seen.add(near[k]);stack.push(near[k])}}
    if(seen.size!==counts[rid])return false
  }
  return true
}
function finalUniqueValidation(candidate,size){
  if(!candidate||!validRegionMap(candidate.map,size))return false;
  var checked=solvePuzzle(candidate.map,size,2);
  if(checked.count!==1||!validSolvedLayout(candidate.map,checked.solution,size))return false;
  candidate.sol=checked.solution;candidate.unique=true;return true
}
function sameSolution(a,b){return Array.isArray(a)&&Array.isArray(b)&&a.length===b.length&&a.every(function(x,i){return x===b[i]})}
function adjacentRegionIds(map,size,i){
  var r=Math.floor(i/size),c=i%size,id=map[i],out=[],seen=new Set(),near=[];
  if(r>0)near.push(i-size);if(r<size-1)near.push(i+size);if(c>0)near.push(i-1);if(c<size-1)near.push(i+1);
  near.forEach(function(nb){var rid=map[nb];if(rid!==id&&!seen.has(rid)){seen.add(rid);out.push(rid)}});
  return shuffle(out)
}
function boundaryCells(map,size,sol){
  var protectedCells=new Set(sol.map(function(c,r){return r*size+c})),out=[];
  for(var i=0;i<size*size;i++){
    if(protectedCells.has(i))continue;
    if(adjacentRegionIds(map,size,i).length)out.push(i)
  }
  return shuffle(out)
}
function randomizeRegionBoundaries(candidate,size){
  if(size>14)return candidate;
  var map=candidate.map.slice(),targetMoves=Math.max(4,Math.min(size*3,Math.round(size*size*.18))),attempts=targetMoves*(size<=9?18:8),moves=0;
  for(var a=0;a<attempts&&moves<targetMoves;a++){
    var cellsToTry=boundaryCells(map,size,candidate.sol);if(!cellsToTry.length)break;
    var i=cellsToTry[randInt(cellsToTry.length)],from=map[i],ids=adjacentRegionIds(map,size,i);
    for(var j=0;j<ids.length;j++){
      var next=map.slice();next[i]=ids[j];
      if(next[i]===from||!validRegionMap(next,size))continue;
      var checked=solvePuzzle(next,size,2);
      if(checked.count===1&&sameSolution(checked.solution,candidate.sol)){map=next;moves++;break}
    }
  }
  candidate.map=map;finalUniqueValidation(candidate,size);return candidate
}
function buildBasePuzzle(size,conf){for(var attempt=0;attempt<conf.maxAttempts;attempt++){var sol=makeSolution(size);if(!sol)continue;var map=growUnique(size,sol,conf);if(map){var checked=solvePuzzle(map,size,2);if(checked.count===1)return{map:map,sol:checked.solution,unique:true}}}var fallback=FALLBACK[size],candidate=transformPuzzle({map:fallback.map.slice(),sol:fallback.sol.slice()},size),verified=solvePuzzle(candidate.map,size,2);return verified.count===1?{map:candidate.map,sol:verified.solution,unique:true}:null}
async function generateGame(){
  stopHintPlayback();cancelIdleHint();clearTimeout(mockClearTimer);mockClearTimer=null;
  var token=++generationToken,target=n,base=Math.min(target,MAX_GENERATED_BASE),conf=baseConfig(base);solved=false;genEl.classList.add('show');setControls(false);setStatus('Creating and verifying a puzzle with exactly one solution…');await new Promise(function(r){setTimeout(r,30)});
  var best=null,firstValid=null,firstFresh=null,firstDiverse=null,boardAttempts=target<=6?28:target<=9?18:10;
  for(var boardTry=0;boardTry<boardAttempts&&token===generationToken;boardTry++){
    var candidate=buildBasePuzzle(base,conf);if(!candidate)continue;var current=base,failed=false;
    while(current<target){candidate=extendPuzzle(candidate,current);if(!candidate){failed=true;break}current++}
    if(failed)continue;candidate=transformPuzzle(candidate,target);candidate.map=relabelRegions(candidate.map,target);if(!finalUniqueValidation(candidate,target))continue;candidate=randomizeRegionBoundaries(candidate,target);if(!finalUniqueValidation(candidate,target))continue;
    if(!firstValid)firstValid=candidate;if(!isExactRecentQueenSetup(target,candidate)&&!firstFresh)firstFresh=candidate;if(!isRecentSolution(target,candidate.sol)&&!firstDiverse)firstDiverse=candidate;if(isDiverseQueenSetup(target,candidate)){best=candidate;break}if(boardTry%2===1)await new Promise(function(r){setTimeout(r,0)})
  }
  if(token!==generationToken)return;best=best||firstDiverse||firstFresh||firstValid;
  if(!best){
    var fb=FALLBACK[base],emergency=transformPuzzle({map:fb.map.slice(),sol:fb.sol.slice(),unique:true},base),emergencySize=base;
    if(!finalUniqueValidation(emergency,base))emergency=null;
    while(emergency&&emergencySize<target){emergency=guaranteedUniqueExtension(emergency,emergencySize);emergencySize++}
    if(emergency){emergency=transformPuzzle(emergency,target);emergency.map=relabelRegions(emergency.map,target);if(finalUniqueValidation(emergency,target)){emergency=randomizeRegionBoundaries(emergency,target);if(finalUniqueValidation(emergency,target))best=emergency}}
  }
  if(best&&!finalUniqueValidation(best,target))best=null;
  if(!best){setStatus('Verification failed before display. Retrying automatically; no unverified board will be shown.');setTimeout(function(){if(token===generationToken)generateGame()},80);return}
  rememberQueenSetup(target,best);regions=best.map;solution=best.sol;regionColors=makePalette(target,regions,target);cells=Array(target*target).fill(0);history=[];moves=0;hintsLeft=3;$('#autoCheck').checked=true;$('#autoXs').checked=true;hintHistory=[];hintFocus=null;hintVisual=null;mockQueens.clear();mockXs.clear();xAnimationTiles.clear();queenAnimationTiles.clear();mockXAnimationTiles.clear();mockClearOnNextPress=false;renderBoard();genEl.classList.remove('show');setControls(true);setStatus('Verified: this board has exactly one valid queen arrangement.');startTimer();resetIdleHint()
}
function borderStyle(i){var r=Math.floor(i/n),c=i%n,id=regions[i];return{top:r===0?2.5:(regions[i-n]!==id?2.5:.4),right:c===n-1?2.5:(regions[i+1]!==id?2.5:.4),bottom:r===n-1?2.5:(regions[i+n]!==id?2.5:.4),left:c===0?2.5:(regions[i-1]!==id?2.5:.4)}}
function autoBlockedSet(){var out=new Set(),queens=[];cells.forEach(function(v,i){if(v===2)queens.push(i)});for(var q=0;q<queens.length;q++){var qi=queens[q],qr=Math.floor(qi/n),qc=qi%n,rid=regions[qi];for(var i=0;i<n*n;i++){if(i===qi||cells[i]===2)continue;var r=Math.floor(i/n),c=i%n;if(r===qr||c===qc||regions[i]===rid||(Math.abs(r-qr)<=1&&Math.abs(c-qc)<=1))out.add(i)}}return out}
function conflictSet(force){var bad=new Set();if(!force&&!$('#autoCheck').checked)return bad;var qs=[];cells.forEach(function(v,i){if(v===2)qs.push(i)});for(var a=0;a<qs.length;a++)for(var b=a+1;b<qs.length;b++){var i=qs[a],j=qs[b],r1=Math.floor(i/n),c1=i%n,r2=Math.floor(j/n),c2=j%n;if(r1===r2||c1===c2||regions[i]===regions[j]||(Math.abs(r1-r2)<=1&&Math.abs(c1-c2)<=1)){bad.add(i);bad.add(j)}}return bad}
function columnName(c){return String.fromCharCode(65+c)}
function rowNumber(r){return n-r}
function mockAffectedTiles(q){
  var out=[],qr=Math.floor(q/n),qc=q%n,rid=regions[q];
  for(var i=0;i<n*n;i++)if(i!==q){var r=Math.floor(i/n),c=i%n;if(r===qr||c===qc||regions[i]===rid||(Math.abs(r-qr)<=1&&Math.abs(c-qc)<=1))out.push(i)}
  return out
}
function mockInfluenceData(){
  var sources=Array.from({length:n*n},function(){return new Set()});
  mockQueens.forEach(function(q){mockAffectedTiles(q).forEach(function(tile){sources[tile].add(q)})});
  return{counts:sources.map(function(set){return set.size})}
}
function mockMarkCount(){return mockQueens.size+mockXs.size}
function updateMockControls(){
  var button=$('#mockMode'),help=$('#mockHelp'),count=mockMarkCount();button.textContent='Mock mode: '+(mockMode?'On':'Off');button.classList.toggle('active',mockMode);button.setAttribute('aria-pressed',String(mockMode));$('#clearMocks').disabled=!count||solved;help.classList.toggle('active',mockMode);help.textContent=mockMode?'Mock mode is on: tap cycles mock × → mock queen → empty. Drag paints mock X marks. Blue mock X marks show mock-queen blocking.':mockClearOnNextPress?'Mock queens and X marks are frozen for inspection and will disappear on your next press.':'Turn on Mock mode: tap cycles mock × → mock queen; drag paints mock X marks.'
}
function setMockMode(on){
  mockMode=!!on;mockClearOnNextPress=!mockMode&&mockMarkCount()>0;clearHintVisual();updateMockControls();renderBoard();setStatus(mockMode?'Mock mode on. Tap: empty → mock × → mock queen. Drag to paint mock X marks.':mockClearOnNextPress?'Mock mode off. All mock marks remain visible until your next press.':'Mock mode off.')
}
function cycleMockCell(i,reverse){
  if(solved)return;clearHintVisual();var hasQ=mockQueens.has(i),hasX=mockXs.has(i);
  if(reverse){if(hasX){mockXs.delete(i)}else if(hasQ){mockQueens.delete(i);mockXs.add(i);mockXAnimationTiles.add(i)}else if(cells[i]!==2){mockQueens.add(i);mockQueenAnimationTiles.add(i)}}
  else{if(hasQ){mockQueens.delete(i)}else if(hasX){mockXs.delete(i);if(cells[i]!==2){mockQueens.add(i);mockQueenAnimationTiles.add(i)}}else{mockXs.add(i);mockXAnimationTiles.add(i)}}
  renderBoard();setStatus(mockQueens.size+' mock queen'+(mockQueens.size===1?'':'s')+' and '+mockXs.size+' mock X'+(mockXs.size===1?'':'s')+'. Blue mock X marks show tiles blocked by mock queens.')
}
function toggleMockQueen(i){if(mockQueens.has(i)){mockQueens.delete(i)}else if(cells[i]!==2){mockXs.delete(i);mockQueens.add(i);mockQueenAnimationTiles.add(i)}renderBoard();updateMockControls()}
function paintMockXs(indices){
  var changed=false;indices.forEach(function(i){if(i>=0&&!mockXs.has(i)){mockQueens.delete(i);mockXs.add(i);mockXAnimationTiles.add(i);changed=true}});if(changed)renderBoard();return changed
}
function clearMockQueens(showStatus){
  clearTimeout(mockClearTimer);mockClearTimer=null;mockClearOnNextPress=false;if(!mockMarkCount()){updateMockControls();return}mockQueens.clear();mockXs.clear();renderBoard();if(showStatus!==false)setStatus('Mock queens and X marks cleared.')
}
function clearHeldMocksOnPress(){
  if(mockMode||!mockClearOnNextPress)return false;mockClearOnNextPress=false;updateMockControls();clearTimeout(mockClearTimer);mockClearTimer=setTimeout(function(){mockClearTimer=null;if(!mockMarkCount()){updateMockControls();return}mockQueens.clear();mockXs.clear();renderBoard();setStatus('Mock queens and X marks cleared.')},0);return true
}
function renderBoard(){
  boardEl.style.gridTemplateColumns='repeat('+n+',minmax(0,1fr))';boardEl.style.gridTemplateRows='repeat('+n+',minmax(0,1fr))';boardEl.style.setProperty('--n',n);colLabelsEl.style.gridTemplateColumns='repeat('+n+',minmax(0,1fr))';rowLabelsEl.style.gridTemplateRows='repeat('+n+',minmax(0,1fr))';colLabelsEl.innerHTML='';rowLabelsEl.innerHTML='';
  for(var label=0;label<n;label++){var col=document.createElement('span');col.className='coord-label';col.textContent=columnName(label);colLabelsEl.appendChild(col);var row=document.createElement('span');row.className='coord-label';row.textContent=String(rowNumber(label));rowLabelsEl.appendChild(row)}
  boardEl.innerHTML='';
  var auto=autoBlockedSet(),bad=conflictSet(false),hintArea=new Set(hintVisual&&hintVisual.area||[]),hintTargets=new Set(hintVisual&&hintVisual.targets||[]),hintProblem=!!(hintVisual&&hintVisual.problem),problemTiles=new Set(hintVisual&&hintVisual.problemTiles||[]),simQueens=new Set(hintVisual&&hintVisual.simQueens||[]),simXs=new Set(hintVisual&&hintVisual.simXs||[]),idleForced=new Set(idleForcedTiles),mockData=mockInfluenceData();
  for(var i=0;i<n*n;i++){
    var b=borderStyle(i),base=cells[i],simQueen=base!==2&&simQueens.has(i),simX=base===0&&!simQueen&&simXs.has(i),effective=base===0&&$('#autoXs').checked&&auto.has(i)?1:base,xShown=!simQueen&&(effective===1||simX),isProblem=problemTiles.has(i)||(hintProblem&&hintTargets.has(i)),mockXVisible=mockData.counts[i]>0||mockXs.has(i),btn=document.createElement('button');
    btn.className='cell'+(xShown?' x':'')+(simX?' simulated-x':'')+(base===2?' queen':'')+(simQueen?' queen simulated-queen':'')+(bad.has(i)?' conflict':'')+(hintArea.has(i)?' hint-area':'')+((hintTargets.has(i)||problemTiles.has(i))?' hint-target':'')+(isProblem?' hint-problem':'')+(idleForced.has(i)&&base===0?' idle-forced':'')+(xAnimationTiles.has(i)?' x-enter':'')+(queenAnimationTiles.has(i)?' queen-enter':'')+(mockQueens.has(i)?' mock-queen':'')+(mockQueenAnimationTiles.has(i)?' mock-queen-enter':'')+(mockXVisible?' mock-x':'')+(mockXAnimationTiles.has(i)?' mock-x-enter':'');
    btn.style.setProperty('--cell',regionColors[regions[i]]);btn.style.borderTopWidth=b.top+'px';btn.style.borderRightWidth=b.right+'px';btn.style.borderBottomWidth=b.bottom+'px';btn.style.borderLeftWidth=b.left+'px';btn.dataset.i=i;btn.setAttribute('aria-label',squareName(i));btn.innerHTML='<span class="mark">'+(base===2||simQueen?'♛':'')+'</span>'+(mockXVisible?'<span class="mock-x-mark"></span>':'')+(mockQueens.has(i)?'<span class="mock-mark">♛</span>':'');boardEl.appendChild(btn)
  }
  xAnimationTiles.clear();queenAnimationTiles.clear();mockXAnimationTiles.clear();mockQueenAnimationTiles.clear();updateButtons();updateMockControls()
}
function pushHistory(){history.push(cells.slice());if(history.length>200)history.shift()}
function stopHintPlayback(){hintPlaybackToken++;clearTimeout(hintPlaybackTimer);hintPlaybackTimer=null}
function clearHintVisual(){stopHintPlayback();hintVisual=null}
function placedMarkIsValid(i){var r=Math.floor(i/n),isSolutionTile=solution[r]===i%n;if(cells[i]===1)return!isSolutionTile;if(cells[i]===2)return isSolutionTile;return false}
function cycleCell(i,isAuto,reverse){if(solved)return;clearHintVisual();pushHistory();var before=cells[i],effective=before===0&&isAuto?1:before,next=reverse?(effective===0?2:effective===2?1:0):(effective===0?1:effective===1?2:0);cells[i]=next;if(next===1&&before!==1)xAnimationTiles.add(i);if(next===2&&before!==2)queenAnimationTiles.add(i);moves++;if(placedMarkIsValid(i))resetIdleHint();else resumeIdleHint();renderBoard();checkProgress()}
function checkProgress(){var bad=conflictSet(false);if(bad.size){setStatus('Two or more queens break a rule.','bad');return}var queens=cells.filter(function(v){return v===2}).length;if(queens===n){var valid=solution.every(function(c,r){return cells[r*n+c]===2});if(valid){solved=true;clearHintVisual();cancelIdleHint();clearInterval(timerId);setStatus('Solved without guessing.','ok');renderBoard();$('#winText').textContent=n+'×'+n+' · '+timerEl.textContent+' · '+moves+' moves';$('#win').classList.add('show')}else setStatus('The board is full, but at least one queen is misplaced.','bad')}else setStatus(queens+' of '+n+' queens placed.')}
function updateButtons(){var hasMarks=cells.some(function(v){return v!==0});$('#undo').disabled=!history.length||solved;$('#clear').disabled=(!hasMarks&&!mockMarkCount())||solved;$('#mistakes').disabled=!hasMarks||solved;$('#hint').disabled=solved||hintsLeft<=0;$('#hint').textContent='Rule out tile ('+hintsLeft+')'}
function setControls(on){document.querySelectorAll('.actions button,.mock-tools button,.size-control button,.size-control input,.size-control select').forEach(function(el){el.disabled=!on})}
function undo(){if(!history.length||solved)return;clearHintVisual();cells=history.pop();moves++;resetIdleHint();renderBoard();checkProgress()}
function clearBoard(){var hasReal=cells.some(function(v){return v!==0});if((!hasReal&&!mockMarkCount())||solved)return;clearHintVisual();if(hasReal){pushHistory();cells.fill(0);moves++;resetIdleHint()}mockQueens.clear();mockXs.clear();xAnimationTiles.clear();queenAnimationTiles.clear();mockXAnimationTiles.clear();mockQueenAnimationTiles.clear();mockClearOnNextPress=false;renderBoard();setStatus('Board cleared.')}
function playableCells(){var blocked=autoBlockedSet(),out=[];for(var i=0;i<n*n;i++)if(cells[i]===0&&!blocked.has(i))out.push(i);return out}
function unitHasQueen(type,index){for(var i=0;i<n*n;i++)if(cells[i]===2){var r=Math.floor(i/n),c=i%n;if(type==='row'&&r===index||type==='col'&&c===index||type==='region'&&regions[i]===index)return true}return false}
function unitCandidates(type,index,playable){return playable.filter(function(i){var r=Math.floor(i/n),c=i%n;return type==='row'?r===index:type==='col'?c===index:regions[i]===index})}
function coordinate(i){return{row:rowNumber(Math.floor(i/n)),col:columnName(i%n)}}
function unitText(u,stage){
  var ref=coordinate(u.cells[Math.floor((u.cells.length-1)/2)]);
  if(stage===0){
    if(u.type==='row')return'Focus on row '+rowNumber(u.index)+'. Compare its open cells with their colored regions.';
    if(u.type==='col')return'Focus on column '+columnName(u.index)+'. Compare its open cells with the rows they affect.';
    return'Focus on the colored region containing the available cell at row '+ref.row+', column '+ref.col+'. Compare its open rows and columns.';
  }
  if(stage===1){
    if(u.count===1){
      if(u.type==='row')return'Row '+rowNumber(u.index)+' now has one playable cell left. Verify it using both the column and region rules.';
      if(u.type==='col')return'Column '+columnName(u.index)+' now has one playable cell left. Verify it using both the row and region rules.';
      return'The colored region containing the available cell at row '+ref.row+', column '+ref.col+' has one playable cell left. Verify its row and column.';
    }
    if(u.type==='row')return'Row '+rowNumber(u.index)+' has '+u.count+' playable cells left. Check which colored region creates the tightest restriction.';
    if(u.type==='col')return'Column '+columnName(u.index)+' has '+u.count+' playable cells left. Check which row loses an option first.';
    return'The colored region containing the available cell at row '+ref.row+', column '+ref.col+' has '+u.count+' playable cells left. Compare their rows and columns.';
  }
  if(u.count===1){
    if(u.type==='row')return'Row '+rowNumber(u.index)+' is forced, but the exact square still follows from its column and colored region.';
    if(u.type==='col')return'Column '+columnName(u.index)+' is forced, but the exact square still follows from its row and colored region.';
    return'The colored region containing the available cell at row '+ref.row+', column '+ref.col+' is forced. Confirm the square from its row and column.';
  }
  if(u.count===2){
    if(u.type==='row')return'Row '+rowNumber(u.index)+' has two playable cells. Test which one would leave another column without a place.';
    if(u.type==='col')return'Column '+columnName(u.index)+' has two playable cells. Test which one would leave another row without a place.';
    return'The colored region containing the available cell at row '+ref.row+', column '+ref.col+' has two playable cells. One makes another unit impossible.';
  }
  if(u.type==='row')return'Row '+rowNumber(u.index)+' is down to '+u.count+' playable cells. Eliminate the choice that creates a dead end in another column.';
  if(u.type==='col')return'Column '+columnName(u.index)+' is down to '+u.count+' playable cells. Eliminate the choice that creates a dead end in another row.';
  return'The colored region containing the available cell at row '+ref.row+', column '+ref.col+' is down to '+u.count+' playable cells. Eliminate the choice that blocks another unit.';
}
function unitBoardCells(type,index){var out=[];for(var i=0;i<n*n;i++){var r=Math.floor(i/n),c=i%n;if(type==='row'&&r===index||type==='col'&&c===index||type==='region'&&regions[i]===index)out.push(i)}return out}
function hintVisualFor(key){
  var m,type,index,area=[],targets=[],problem=false,playable=playableCells();
  if((m=/^(row|col|region)-(\d+)$/.exec(key))){
    type=m[1];index=Number(m[2]);area=unitBoardCells(type,index);targets=unitCandidates(type,index,playable);return{area:area,targets:targets,problem:false};
  }
  if((m=/^conflict-(\d+)$/.exec(key))){index=Number(m[1])-1;area=unitBoardCells('row',index);targets=Array.from(conflictSet(true));problem=true;return{area:area,targets:targets,problem:problem}}
  if((m=/^wrongq-(\d+)$/.exec(key))){index=Number(m[1])-1;area=unitBoardCells('row',index);targets=area.filter(function(i){return cells[i]===2});problem=true;return{area:area,targets:targets,problem:problem}}
  if((m=/^wrongx-(\d+)$/.exec(key))){index=Number(m[1]);area=unitBoardCells('row',index);targets=area.filter(function(i){return cells[i]===1});problem=true;return{area:area,targets:targets.length?targets:area,problem:problem}}
  return{area:[],targets:[],problem:false};
}
function problemHint(kind,row,stage){
  if(kind==='conflict'){
    if(stage===0)return'Recheck the queens involving row '+row+'; one of the four rules is broken.';
    if(stage===1)return'A queen involving row '+row+' shares a row, column, colored region, or neighboring square with another queen.';
    return'Move or remove a conflicting queen involving row '+row+' before continuing elsewhere.';
  }
  if(kind==='wrongq'){
    if(stage===0)return'Reconsider the queen in row '+row+'.';
    if(stage===1)return'Keeping the queen in row '+row+' prevents all remaining rows from being completed.';
    return'Move the queen in row '+row+' before working on another area.';
  }
  if(stage===0)return'Recheck the X marks in row '+row+'.';
  if(stage===1)return'One X in row '+row+' removes every complete solution.';
  return'Restore one possible square in row '+row+' before continuing.';
}
function buildHint(){
  var stage=3-hintsLeft,bad=Array.from(conflictSet(true));
  if(bad.length){var rr=Math.floor(bad[0]/n)+1;hintFocus='conflict-'+rr;return{key:hintFocus,text:problemHint('conflict',rowNumber(rr-1),stage)}}
  var wrongQ=[];for(var i=0;i<n*n;i++)if(cells[i]===2&&solution[Math.floor(i/n)]!==i%n)wrongQ.push(i);
  if(wrongQ.length){rr=Math.floor(wrongQ[0]/n)+1;hintFocus='wrongq-'+rr;return{key:hintFocus,text:problemHint('wrongq',rowNumber(rr-1),stage)}}
  var wrongX=[];for(var r=0;r<n;r++){i=r*n+solution[r];if(cells[i]===1)wrongX.push(r)}
  if(wrongX.length){r=wrongX[0];hintFocus='wrongx-'+r;return{key:hintFocus,text:problemHint('wrongx',rowNumber(r),stage)}}
  var playable=playableCells(),units=[],contradictions=[];
  for(r=0;r<n;r++)if(!unitHasQueen('row',r)){var list=unitCandidates('row',r,playable),u={key:'row-'+r,type:'row',index:r,count:list.length,cells:list};(list.length?units:contradictions).push(u)}
  for(var c=0;c<n;c++)if(!unitHasQueen('col',c)){list=unitCandidates('col',c,playable);u={key:'col-'+c,type:'col',index:c,count:list.length,cells:list};(list.length?units:contradictions).push(u)}
  for(var rid=0;rid<n;rid++)if(!unitHasQueen('region',rid)){list=unitCandidates('region',rid,playable);u={key:'region-'+rid,type:'region',index:rid,count:list.length,cells:list};(list.length?units:contradictions).push(u)}
  if(contradictions.length){
    u=contradictions.find(function(x){return x.key===hintFocus})||contradictions.find(function(x){return hintHistory.indexOf(x.key)<0})||contradictions[0];hintFocus=u.key;
    if(u.type==='row')return{key:u.key,text:'Row '+rowNumber(u.index)+' has no playable cell left. Recheck nearby X marks.'};
    if(u.type==='col')return{key:u.key,text:'Column '+columnName(u.index)+' has no playable cell left. Recheck nearby X marks.'};
    return{key:u.key,text:'A colored region has no playable cell left. Recheck the X marks around its boundary.'};
  }
  var focused=stage>0&&hintFocus?units.find(function(x){return x.key===hintFocus}):null;
  if(focused)return{key:focused.key,text:unitText(focused,stage)};
  var fresh=units.filter(function(x){return hintHistory.indexOf(x.key)<0}),pool=fresh.length?fresh:units,preferred;
  if(stage===0){preferred=pool.filter(function(x){return x.count>=2&&x.count<=5});if(!preferred.length)preferred=pool.filter(function(x){return x.count<=6})}
  else if(stage===1){preferred=pool.filter(function(x){return x.count>=1&&x.count<=4});if(!preferred.length)preferred=pool.filter(function(x){return x.count<=5})}
  else preferred=pool.filter(function(x){return x.count<=3});
  if(!preferred||!preferred.length)preferred=pool;
  if(!preferred.length)return{key:'general',text:'Compare two unresolved neighboring rows; their queens cannot use adjacent columns.'};
  preferred.sort(function(a,b){var pa=a.type==='region'?-0.2:0,pb=b.type==='region'?-0.2:0;return a.count+pa-(b.count+pb)});
  u=preferred[0];hintFocus=u.key;return{key:u.key,text:unitText(u,stage)};
}
function queenConflictReason(a,b){
  var ar=Math.floor(a/n),ac=a%n,br=Math.floor(b/n),bc=b%n;
  if(ar===br)return'same row';
  if(ac===bc)return'same column';
  if(regions[a]===regions[b])return'same colored region';
  if(Math.abs(ar-br)<=1&&Math.abs(ac-bc)<=1)return'queens cannot touch';
  return'';
}
function currentQueens(){var out=[];for(var i=0;i<n*n;i++)if(cells[i]===2)out.push(i);return out}
function directBlock(i,queens){
  for(var q=0;q<queens.length;q++){var why=queenConflictReason(i,queens[q]);if(why)return{queen:queens[q],why:why}}
  return null;
}
function openCandidates(){
  var queens=currentQueens(),out=[];
  for(var i=0;i<n*n;i++)if(cells[i]===0&&!directBlock(i,queens))out.push(i);
  return out;
}
function squareName(i){return columnName(i%n)+rowNumber(Math.floor(i/n))}
function forcedQueenDeductions(open){
  var forced=[],seen=new Set();
  function add(type,index,list){if(list.length===1&&!seen.has(list[0])){seen.add(list[0]);forced.push({tile:list[0],type:type,index:index})}}
  for(var r=0;r<n;r++)if(!unitHasQueen('row',r))add('row',r,unitCandidates('row',r,open));
  for(var c=0;c<n;c++)if(!unitHasQueen('col',c))add('col',c,unitCandidates('col',c,open));
  for(var rid=0;rid<n;rid++)if(!unitHasQueen('region',rid))add('region',rid,unitCandidates('region',rid,open));
  return forced;
}
function cancelIdleHint(){clearTimeout(idleHintTimer);clearTimeout(idleFlashTimer);idleHintTimer=null;idleFlashTimer=null;idleForcedTiles=[]}
function armIdleHint(resetClock){
  cancelIdleHint();if(solved||!cells.length)return;
  if(resetClock||!lastValidMarkAt)lastValidMarkAt=Date.now();
  var delay=Math.max(0,IDLE_HINT_MS-(Date.now()-lastValidMarkAt));
  idleHintTimer=setTimeout(showIdleForcedFlash,delay)
}
function resetIdleHint(){armIdleHint(true)}
function resumeIdleHint(){armIdleHint(false)}
function retryIdleForcedCheck(){clearTimeout(idleHintTimer);if(!solved)idleHintTimer=setTimeout(showIdleForcedFlash,1000)}
function showIdleForcedFlash(){
  idleHintTimer=null;
  if(solved)return;
  if(hintPlaybackTimer||hintVisual||conflictSet(true).size){retryIdleForcedCheck();return}
  var forced=forcedQueenDeductions(openCandidates());
  if(!forced.length){retryIdleForcedCheck();return}
  idleForcedTiles=forced.map(function(f){return f.tile});renderBoard()
}
function forcedReason(f){
  var where=squareName(f.tile);
  if(f.type==='row')return'Row '+rowNumber(f.index)+' has only one possible queen tile ('+where+')';
  if(f.type==='col')return'Column '+columnName(f.index)+' has only one possible queen tile ('+where+')';
  return'The colored region has only one possible queen tile ('+where+')';
}
function blockReasonText(block){
  var where=squareName(block.queen);
  if(block.why==='same row')return'A queen at '+where+' already uses this row.';
  if(block.why==='same column')return'A queen at '+where+' already uses this column.';
  if(block.why==='same colored region')return'A queen at '+where+' already uses this colored region.';
  return'A queen at '+where+' would touch this tile.';
}
function unitLabel(type,index,reference){
  if(type==='row')return'Row '+rowNumber(index);
  if(type==='col')return'Column '+columnName(index);
  return'The colored region containing '+squareName(reference!=null?reference:unitBoardCells('region',index)[0]);
}
function ruleText(why,a,b){
  if(why==='same row')return squareName(a)+' and '+squareName(b)+' would place two queens in row '+rowNumber(Math.floor(a/n))+'.';
  if(why==='same column')return squareName(a)+' and '+squareName(b)+' would place two queens in column '+columnName(a%n)+'.';
  if(why==='same colored region')return squareName(a)+' and '+squareName(b)+' would place two queens in the same colored region.';
  return squareName(a)+' would touch '+squareName(b)+'.';
}
function logicalProofForTile(extraQueen){
  var queens=new Set(),eliminated=new Set(),reasons=new Map(),steps=[],events=[],baseQueens=new Set(),baseXs=new Set(),maxSteps=Math.max(12,n*2);
  for(var seed=0;seed<n*n;seed++){if(cells[seed]===2)baseQueens.add(seed);if(cells[seed]===1)baseXs.add(seed)}
  function recordElimination(i,text){if(!queens.has(i)&&!eliminated.has(i)){eliminated.add(i);reasons.set(i,text);return true}return false}
  function unique(list){return Array.from(new Set(list||[]))}
  function snapshot(text,opt){
    opt=opt||{};steps.push(text);
    var simulated=Array.from(queens).filter(function(q){return!baseQueens.has(q)}).concat(opt.extraQueens||[]),shownXs=Array.from(eliminated).filter(function(x){return!baseXs.has(x)&&!queens.has(x)});
    events.push({text:text,simQueens:unique(simulated),simXs:unique(shownXs),targets:unique(opt.targets||[]),problemTiles:unique(opt.problemTiles||[]),area:unique(opt.area||[])})
  }
  function addQueen(i){
    if(queens.has(i))return null;
    var existing=Array.from(queens).sort(function(a,b){return a-b});
    for(var q=0;q<existing.length;q++){var why=queenConflictReason(i,existing[q]);if(why)return{contradiction:ruleText(why,i,existing[q]),problemTiles:[i,existing[q]]}}
    if(eliminated.has(i))return{contradiction:squareName(i)+' is unavailable: '+reasons.get(i)+'.',problemTiles:[i]};
    queens.add(i);
    for(var t=0;t<n*n;t++)if(t!==i){var why2=queenConflictReason(t,i);if(why2)recordElimination(t,'blocked by queen at '+squareName(i)+' ('+why2+')')}
    return null
  }
  for(var i=0;i<n*n;i++)if(cells[i]===1)recordElimination(i,'marked X');
  for(i=0;i<n*n;i++)if(cells[i]===2){var seeded=addQueen(i);if(seeded)return{baselineInvalid:true,text:'The current board already contains a contradiction: '+seeded.contradiction}}
  if(extraQueen>=0){
    var assumed=addQueen(extraQueen);snapshot('Assume a queen at '+squareName(extraQueen)+'.',{targets:[extraQueen],extraQueens:assumed?[extraQueen]:[]});
    if(assumed){snapshot('Contradiction: '+assumed.contradiction,{problemTiles:assumed.problemTiles,extraQueens:[extraQueen]});return{tile:extraQueen,steps:steps,events:events}}
  }
  function candidateList(type,index){return unitBoardCells(type,index).filter(function(x){return!queens.has(x)&&!eliminated.has(x)})}
  function queenInUnit(type,index){var found=-1;queens.forEach(function(q){var r=Math.floor(q/n),c=q%n;if(type==='row'&&r===index||type==='col'&&c===index||type==='region'&&regions[q]===index)found=q});return found}
  function contradictionFor(type,index,reference){var tiles=unitBoardCells(type,index).map(squareName);return unitLabel(type,index,reference)+' has no legal tile'+(tiles.length<=8?' ('+tiles.join(', ')+')':'')+'.'}
  function forcedStep(type,index,tile){if(type==='row')return'Row '+rowNumber(index)+': only '+squareName(tile)+' remains, so a queen is forced there.';if(type==='col')return'Column '+columnName(index)+': only '+squareName(tile)+' remains, so a queen is forced there.';return'Only '+squareName(tile)+' remains in its colored region, so a queen is forced there.'}
  function ruledOutText(list){return list.map(squareName).join(', ')+' '+(list.length===1?'is':'are')+' ruled out.'}
  function forcePass(){
    var types=['row','col','region'];
    for(var ti=0;ti<types.length;ti++)for(var index=0;index<n;index++){
      var type=types[ti];if(queenInUnit(type,index)>=0)continue;var list=candidateList(type,index),unit=unitBoardCells(type,index),reference=list[0]!=null?list[0]:unit[0];
      if(!list.length)return{contradiction:contradictionFor(type,index,reference),area:unit,problemTiles:unit};
      if(list.length===1){var tile=list[0],result=addQueen(tile),text=forcedStep(type,index,tile);if(result)return{contradiction:result.contradiction,area:unit,problemTiles:result.problemTiles,extraQueens:[tile]};snapshot(text,{targets:[tile],area:unit});return{changed:true}}
    }
    return{changed:false}
  }
  function lockedPass(){
    var source,target,newTiles,desc,reference;
    for(var r=0;r<n;r++)if(queenInUnit('row',r)<0){source=candidateList('row',r);if(source.length>1){var regs=Array.from(new Set(source.map(function(x){return regions[x]})));if(regs.length===1){target=unitBoardCells('region',regs[0]).filter(function(x){return Math.floor(x/n)!==r});newTiles=target.filter(function(x){return recordElimination(x,'row '+rowNumber(r)+' must place its queen inside this colored region')});if(newTiles.length){reference=source[0];desc='Row '+rowNumber(r)+' is confined to the region at '+squareName(reference)+', so '+ruledOutText(newTiles);snapshot(desc,{area:source.concat(newTiles),targets:newTiles});return true}}}}
    for(var c=0;c<n;c++)if(queenInUnit('col',c)<0){source=candidateList('col',c);if(source.length>1){regs=Array.from(new Set(source.map(function(x){return regions[x]})));if(regs.length===1){target=unitBoardCells('region',regs[0]).filter(function(x){return x%n!==c});newTiles=target.filter(function(x){return recordElimination(x,'column '+columnName(c)+' must place its queen inside this colored region')});if(newTiles.length){reference=source[0];desc='Column '+columnName(c)+' is confined to the region at '+squareName(reference)+', so '+ruledOutText(newTiles);snapshot(desc,{area:source.concat(newTiles),targets:newTiles});return true}}}}
    for(var rid=0;rid<n;rid++)if(queenInUnit('region',rid)<0){source=candidateList('region',rid);if(source.length>1){var rows=Array.from(new Set(source.map(function(x){return Math.floor(x/n)})));if(rows.length===1){target=unitBoardCells('row',rows[0]).filter(function(x){return regions[x]!==rid});newTiles=target.filter(function(x){return recordElimination(x,'this colored region must place its queen in row '+rowNumber(rows[0]))});if(newTiles.length){reference=source[0];snapshot('The region at '+squareName(reference)+' is confined to row '+rowNumber(rows[0])+', so '+ruledOutText(newTiles),{area:source.concat(newTiles),targets:newTiles});return true}}var cols=Array.from(new Set(source.map(function(x){return x%n})));if(cols.length===1){target=unitBoardCells('col',cols[0]).filter(function(x){return regions[x]!==rid});newTiles=target.filter(function(x){return recordElimination(x,'this colored region must place its queen in column '+columnName(cols[0]))});if(newTiles.length){reference=source[0];snapshot('The region at '+squareName(reference)+' is confined to column '+columnName(cols[0])+', so '+ruledOutText(newTiles),{area:source.concat(newTiles),targets:newTiles});return true}}}}
    return false
  }
  for(var pass=0;pass<maxSteps;pass++){
    var forced=forcePass();
    if(forced.contradiction){snapshot('Contradiction: '+forced.contradiction,{area:forced.area,problemTiles:forced.problemTiles,extraQueens:forced.extraQueens});return{tile:extraQueen,steps:steps,events:events}}
    if(forced.changed)continue;
    if(lockedPass())continue;
    break
  }
  return null
}
function formatProof(steps){var seen=new Set(),clean=[];steps.forEach(function(step){var key=step.replace(/\s+/g,' ').trim();if(key&&!seen.has(key)){seen.add(key);clean.push(key)}});return clean.map(function(step,index){return(index+1)+'. '+step}).join('\n')}
function findImpossibleTile(){
  var baseline=logicalProofForTile(-1);if(baseline){if(baseline.baselineInvalid)return{tile:-1,text:baseline.text};if(baseline.steps)return{tile:-1,text:'The current queens or X marks already cause a contradiction:\n'+formatProof(baseline.steps)}};
  var shownBlocked=$('#autoXs').checked?autoBlockedSet():new Set(),candidates=[];
  for(var i=0;i<n*n;i++)if(cells[i]===0&&!shownBlocked.has(i)&&hintHistory.indexOf(i)<0)candidates.push(i);
  var proofs=[];
  for(var k=0;k<candidates.length;k++){var proof=logicalProofForTile(candidates[k]);if(proof&&proof.steps)proofs.push(proof)}
  proofs.sort(function(a,b){return a.steps.length-b.steps.length||a.tile-b.tile});
  return proofs.length?proofs[0]:null;
}
function setHintProofStatus(events,activeIndex,remaining,finished){
  statusEl.textContent='';statusEl.className='status hint';var list=document.createElement('ol');
  events.forEach(function(event,index){var item=document.createElement('li');item.textContent=event.text;if(index<activeIndex||finished)item.className='done';if(index===activeIndex&&!finished)item.className='active';list.appendChild(item)});statusEl.appendChild(list);
  var footer=document.createElement('div');footer.className='hint-footer';footer.textContent=remaining+' check'+(remaining===1?'':'s')+' left.';statusEl.appendChild(footer)
}
function hintVisualFromEvent(event){return{area:event.area||[],targets:event.targets||[],problem:false,problemTiles:event.problemTiles||[],simQueens:event.simQueens||[],simXs:event.simXs||[]}}
function playHintProof(result){
  stopHintPlayback();cancelIdleHint();
  var events=(result.events||[]).slice(),last=events.length?events[events.length-1]:{area:[],targets:[],problemTiles:[],simQueens:[],simXs:[]};
  function merged(a,b){return Array.from(new Set((a||[]).concat(b||[])))}
  var finalEvent={
    text:'Therefore '+squareName(result.tile)+' cannot contain a queen.',
    area:last.area||[],
    targets:merged(last.targets,[result.tile]),
    problemTiles:last.problemTiles||[],
    simQueens:last.simQueens||[],
    simXs:merged(last.simXs,[result.tile])
  };
  events.push(finalEvent);
  hintVisual=hintVisualFromEvent(finalEvent);
  renderBoard();
  setHintProofStatus(events,-1,hintsLeft,true)
}
function hint(){
  if(solved||hintsLeft<=0)return;
  clearHintVisual();var result=findImpossibleTile();
  if(!result||result.tile<0){renderBoard();setStatus(result&&result.text||'No empty, unmarked tile can currently be ruled out by a direct logical contradiction. Add more queens or X marks first.','hint');resetIdleHint();return}
  hintsLeft--;hintHistory.push(result.tile);playHintProof(result)
}
function showMistakes(){if(solved)return;var wrong=[];for(var i=0;i<n*n;i++){var r=Math.floor(i/n),correct=solution[r]===i%n;if(cells[i]===2&&!correct||cells[i]===1&&correct)wrong.push(i)}hintVisual={area:[],targets:wrong,problem:true};renderBoard();if(wrong.length)setStatus(wrong.length+' incorrectly marked tile'+(wrong.length===1?' is':'s are')+' highlighted.','bad');else setStatus('No incorrectly placed marks found.','ok')}
function cellFromTarget(target){var cell=target&&target.closest?target.closest('.cell'):null;return cell&&boardEl.contains(cell)?Number(cell.dataset.i):-1}
function cellFromPoint(x,y){return cellFromTarget(document.elementFromPoint(x,y))}
function lineCells(from,to){var r1=Math.floor(from/n),c1=from%n,r2=Math.floor(to/n),c2=to%n,steps=Math.max(Math.abs(r2-r1),Math.abs(c2-c1)),out=[];if(!steps)return[from];for(var k=0;k<=steps;k++){var r=Math.round(r1+(r2-r1)*k/steps),c=Math.round(c1+(c2-c1)*k/steps),i=r*n+c;if(out[out.length-1]!==i)out.push(i)}return out}
function paintXs(indices){var changed=indices.filter(function(i){return i>=0&&cells[i]!==1&&cells[i]!==2});if(!changed.length)return false;clearHintVisual();if(!dragState.historySaved){pushHistory();dragState.historySaved=true}changed.forEach(function(i){cells[i]=1;xAnimationTiles.add(i);if(solution[Math.floor(i/n)]!==i%n)dragState.validPlaced=true});dragState.changed=true;renderBoard();return true}
function finishDrag(click){var state=dragState;if(!state)return;dragState=null;if(state.mock){if(state.active){setStatus(mockQueens.size+' mock queen'+(mockQueens.size===1?'':'s')+' and '+mockXs.size+' mock X'+(mockXs.size===1?'':'s')+'.')}else if(click)cycleMockCell(state.start,false);return}if(state.active){if(state.changed){moves++;if(state.validPlaced)resetIdleHint();else resumeIdleHint();renderBoard();checkProgress()}else setStatus('No cells changed.')}else if(click)cycleCell(state.start,autoBlockedSet().has(state.start),false)}
function beginDrag(id,i){dragState={pointerId:id,start:i,last:i,active:false,historySaved:false,changed:false,validPlaced:false,mock:mockMode}}
function moveDrag(id,x,y){if(!dragState||dragState.pointerId!==id)return;var i=cellFromPoint(x,y);if(i<0||i===dragState.last)return;var prev=dragState.last;dragState.last=i;dragState.active=true;if(dragState.mock){paintMockXs(lineCells(prev,i).concat([dragState.start]));return}paintXs(lineCells(prev,i).concat(dragState.historySaved?[]:[dragState.start]))}
if(window.PointerEvent){boardEl.addEventListener('pointerdown',function(e){if(solved||e.button!==0)return;var i=cellFromTarget(e.target);if(i<0)return;e.preventDefault();beginDrag(e.pointerId,i);try{boardEl.setPointerCapture(e.pointerId)}catch(err){}});boardEl.addEventListener('pointermove',function(e){if(!dragState||dragState.pointerId!==e.pointerId)return;e.preventDefault();moveDrag(e.pointerId,e.clientX,e.clientY)});boardEl.addEventListener('pointerup',function(e){if(dragState&&dragState.pointerId===e.pointerId){e.preventDefault();finishDrag(true)}});boardEl.addEventListener('pointercancel',function(e){if(dragState&&dragState.pointerId===e.pointerId)finishDrag(false)})}else{boardEl.addEventListener('touchstart',function(e){if(!e.touches.length)return;var t=e.touches[0],i=cellFromPoint(t.clientX,t.clientY);if(i<0)return;e.preventDefault();beginDrag('touch',i)},{passive:false});boardEl.addEventListener('touchmove',function(e){if(!dragState||!e.touches.length)return;var t=e.touches[0];e.preventDefault();moveDrag('touch',t.clientX,t.clientY)},{passive:false});boardEl.addEventListener('touchend',function(e){if(dragState){e.preventDefault();finishDrag(true)}},{passive:false});boardEl.addEventListener('mousedown',function(e){var i=cellFromTarget(e.target);if(i>=0){e.preventDefault();beginDrag('mouse',i)}});window.addEventListener('mousemove',function(e){if(dragState&&dragState.pointerId==='mouse')moveDrag('mouse',e.clientX,e.clientY)});window.addEventListener('mouseup',function(){if(dragState&&dragState.pointerId==='mouse')finishDrag(true)})}
boardEl.addEventListener('click',function(e){if(e.detail!==0)return;var i=cellFromTarget(e.target);if(i>=0){if(mockMode)cycleMockCell(i,false);else cycleCell(i,autoBlockedSet().has(i),false)}});boardEl.addEventListener('contextmenu',function(e){var i=cellFromTarget(e.target);if(i>=0){e.preventDefault();if(mockMode)cycleMockCell(i,true);else cycleCell(i,autoBlockedSet().has(i),true)}});
function applySize(){var value=Number(sizeInput.value);if(!Number.isInteger(value)||value<MIN_SIZE||value>MAX_SIZE){setStatus('Enter a whole board size from 4 to 25.','bad');return}n=value;generateGame()}
['pointerdown','mousedown','touchstart'].forEach(function(type){document.addEventListener(type,function(){clearHeldMocksOnPress()},true)});document.addEventListener('keydown',function(){clearHeldMocksOnPress()},true);
$('#mockMode').addEventListener('click',function(){setMockMode(!mockMode)});$('#clearMocks').addEventListener('click',function(){clearHintVisual();clearMockQueens(true)});document.addEventListener('keydown',function(e){if((e.key==='m'||e.key==='M')&&!/INPUT|TEXTAREA|SELECT/.test((e.target&&e.target.tagName)||'')){e.preventDefault();setMockMode(!mockMode)}});$('#applySize').addEventListener('click',applySize);sizeInput.addEventListener('keydown',function(e){if(e.key==='Enter')applySize()});$('#newGame').addEventListener('click',generateGame);$('#undo').addEventListener('click',undo);$('#clear').addEventListener('click',clearBoard);$('#mistakes').addEventListener('click',showMistakes);$('#hint').addEventListener('click',hint);$('#autoCheck').addEventListener('change',function(){clearHintVisual();resetIdleHint();renderBoard();checkProgress()});$('#autoXs').addEventListener('change',function(){clearHintVisual();resetIdleHint();renderBoard()});$('#closeWin').addEventListener('click',function(){$('#win').classList.remove('show')});$('#winNew').addEventListener('click',function(){$('#win').classList.remove('show');generateGame()});
window.__queensDebug={playableCells:playableCells,findImpossibleTile:findImpossibleTile,getCells:function(){return cells.slice()},getN:function(){return n},forcedQueenDeductions:function(){return forcedQueenDeductions(openCandidates())},showIdleForcedFlash:showIdleForcedFlash,getHintVisual:function(){return hintVisual},getMockQueens:function(){return Array.from(mockQueens)},getMockXs:function(){return Array.from(mockXs)},setMockMode:setMockMode,toggleMockQueen:toggleMockQueen,cycleMockCell:cycleMockCell,mockInfluenceData:mockInfluenceData,clearHeldMocksOnPress:clearHeldMocksOnPress,isMockClearArmed:function(){return mockClearOnNextPress},verifyCurrentBoard:function(){var checked=solvePuzzle(regions,n,2);return{count:checked.count,solution:checked.solution,regionsValid:validRegionMap(regions,n)}}};
generateGame();
})();


(function(){
'use strict';
var q=function(s,r){return(r||document).querySelector(s)},qa=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
function fmtTime(ms){var s=Math.max(0,Math.floor(ms/1000)),m=Math.floor(s/60);return String(m).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
function randInt(max){return Math.floor(Math.random()*max)}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=randInt(i+1),t=a[i];a[i]=a[j];a[j]=t}return a}
function range(n){return Array.from({length:n},function(_,i){return i})}
function sameSet(a,b){if(a.length!==b.length)return false;var s=new Set(a);return b.every(function(x){return s.has(x)})}
function hammingArray(a,b){var diff=0,len=Math.min(a.length,b.length);for(var i=0;i<len;i++)if(a[i]!==b[i])diff++;return diff+Math.abs(a.length-b.length)}
function difficulty(id){var el=q(id);return el?el.value:'medium'}
function difficultyRank(level){return{easy:0,medium:1,hard:2,expert:3,master:4}[level]??1}
function signatureListPush(list,value,max){if(list.indexOf(value)<0)list.push(value);while(list.length>max)list.shift()}
function gridNeighbors(i,n){var r=Math.floor(i/n),c=i%n,out=[];if(r>0)out.push(i-n);if(r<n-1)out.push(i+n);if(c>0)out.push(i-1);if(c<n-1)out.push(i+1);return out}
var activeGame='home',restartCurrent=function(){};
function setMiniStatus(id,text,type){var el=q(id);el.textContent=text;el.className='mini-status'+(type?' '+type:'')}
var mobileBackGuardArmed=false,mobileBackGuardLeaving=false;
function mobileBackGuardApplies(){
  if(activeGame==='home'||mobileBackGuardLeaving)return false;
  if(!window.history||!window.history.pushState||!window.matchMedia)return false;
  return window.matchMedia('(max-width: 760px), (pointer: coarse)').matches;
}
function armMobileBackGuard(){
  if(mobileBackGuardArmed||!mobileBackGuardApplies())return;
  window.history.pushState({dailyGamesBackGuard:true},'',window.location.href);
  mobileBackGuardArmed=true;
}
window.addEventListener('popstate',function(){
  if(!mobileBackGuardArmed||mobileBackGuardLeaving)return;
  mobileBackGuardArmed=false;
  if(!mobileBackGuardApplies())return;
  if(window.confirm('Leave Daily Games? Your current puzzle progress may be lost.')){
    mobileBackGuardLeaving=true;
    window.setTimeout(function(){window.history.back()},0);
  }else{
    window.setTimeout(armMobileBackGuard,0);
  }
});
function showScreen(name){qa('.game-screen').forEach(function(el){el.hidden=true});var id=name==='home'?'homeScreen':name+'Screen',screen=q('#'+id);if(!screen&&name!=='home'){screen=q('#homeScreen');name='home'}if(!screen)return;screen.hidden=false;activeGame=name;window.scrollTo(0,0);armMobileBackGuard()}
qa('[data-game]').forEach(function(btn){btn.addEventListener('click',function(e){if(btn.classList.contains('under-construction')){e.preventDefault();return}if(btn.getAttribute('href'))return;showScreen(btn.dataset.game)})});
qa('[data-home]').forEach(function(btn){btn.addEventListener('click',function(){window.location.assign('index.html')})});
function showSuiteWin(title,text,again){q('#suiteWinTitle').textContent=title;q('#suiteWinText').textContent=text;q('#suiteWin').classList.add('show');restartCurrent=again||function(){}}
q('#suiteWinHome').addEventListener('click',function(){q('#suiteWin').classList.remove('show');window.location.assign('index.html')});
q('#suiteWinAgain').addEventListener('click',function(){q('#suiteWin').classList.remove('show');restartCurrent()});

/* Wend: each generated letter grid is checked and only its single verified word partition is accepted. */
var WEND_PACKS={
  3:[['CAT','DOG','SUN'],['MAP','INK','BOX'],['RED','FOX','OWL'],['PEN','RUG','SKY']],
  4:[['WEND','PLAY','MIND','TASK'],['CODE','GAME','WORD','PATH'],['LINK','IDEA','TEAM','WORK'],['FIND','MAKE','GROW','PLAN']],
  5:[['STONE','CLOUD','BRAVE','QUICK','FLAME'],['LIGHT','WATER','MUSIC','GREEN','DREAM'],['SHARE','BUILD','FOCUS','LEARN','THINK'],['POINT','CRAFT','SMILE','TRACK','BLEND']]
};
var wendSize=4,wendWords=[],wendLetters=[],wendUsed=new Set(),wendPath=[],wendSolved=[],wendSolutionPaths={},wendRecent=[];
function snakePath(n,vertical){var out=[];if(!vertical){for(var r=0;r<n;r++){var cols=range(n);if(r%2)cols.reverse();cols.forEach(function(c){out.push(r*n+c)})}}else{for(var c=0;c<n;c++){var rows=range(n);if(c%2)rows.reverse();rows.forEach(function(r){out.push(r*n+c)})}}return out}
function spiralPath(n,reverse){var top=0,left=0,bottom=n-1,right=n-1,out=[];while(top<=bottom&&left<=right){for(var c=left;c<=right;c++)out.push(top*n+c);top++;for(var r=top;r<=bottom;r++)out.push(r*n+right);right--;if(top<=bottom){for(c=right;c>=left;c--)out.push(bottom*n+c);bottom--}if(left<=right){for(r=bottom;r>=top;r--)out.push(r*n+left);left++}}return reverse?out.reverse():out}
function randomHamiltonianPath(n){var total=n*n;for(var attempt=0;attempt<30;attempt++){var start=randInt(total),path=[start],used=Array(total).fill(false);used[start]=true;function connected(){var first=-1,count=0;for(var i=0;i<total;i++)if(!used[i]){first=i;count++}if(count<=1)return true;var seen=new Set([first]),stack=[first];while(stack.length){var at=stack.pop();gridNeighbors(at,n).forEach(function(nb){if(!used[nb]&&!seen.has(nb)){seen.add(nb);stack.push(nb)}})}return seen.size===count}function dfs(){if(path.length===total)return true;var at=path[path.length-1],opts=shuffle(gridNeighbors(at,n).filter(function(x){return!used[x]}));opts.sort(function(a,b){var da=gridNeighbors(a,n).filter(function(x){return!used[x]}).length,db=gridNeighbors(b,n).filter(function(x){return!used[x]}).length;return da-db});for(var k=0;k<opts.length;k++){var next=opts[k];used[next]=true;path.push(next);if(connected()&&dfs())return true;path.pop();used[next]=false}return false}if(dfs())return path}return snakePath(n,Math.random()<.5)}
function transformPath(path,n){var turns=randInt(4),mirror=Math.random()<.5;return path.map(function(i){var r=Math.floor(i/n),c=i%n;if(mirror)c=n-1-c;for(var k=0;k<turns;k++){var t=r;r=c;c=n-1-t}return r*n+c})}
function enumerateWordPaths(word,letters,n,cap){var out=[],used=Array(n*n).fill(false);function dfs(i,pos,path){if(out.length>=cap)return;if(letters[i]!==word[pos])return;if(pos===word.length-1){out.push(path.concat(i));return}used[i]=true;var nexts=gridNeighbors(i,n);for(var k=0;k<nexts.length;k++)if(!used[nexts[k]])dfs(nexts[k],pos+1,path.concat(i));used[i]=false}for(var i=0;i<letters.length;i++)if(letters[i]===word[0])dfs(i,0,[]);return out}
function countWendSolutions(words,letters,n,limit){var candidates=words.map(function(w){return enumerateWordPaths(w,letters,n,2500)}),used=Array(n*n).fill(false),assigned=Array(words.length).fill(false),count=0;function dfs(depth){if(count>=limit)return;if(depth===words.length){if(used.every(Boolean))count++;return}var best=-1,bestList=null;for(var wi=0;wi<words.length;wi++)if(!assigned[wi]){var list=candidates[wi].filter(function(path){return path.every(function(i){return!used[i]})});if(!list.length)return;if(bestList===null||list.length<bestList.length){best=wi;bestList=list;if(list.length===1)break}}assigned[best]=true;for(var p=0;p<bestList.length;p++){bestList[p].forEach(function(i){used[i]=true});dfs(depth+1);bestList[p].forEach(function(i){used[i]=false});if(count>=limit)break}assigned[best]=false}dfs(0);return count}
function pathTurnScore(path,n){var score=0;for(var i=2;i<path.length;i++){var a=path[i-2],b=path[i-1],c=path[i],d1=[Math.floor(b/n)-Math.floor(a/n),b%n-a%n],d2=[Math.floor(c/n)-Math.floor(b/n),c%n-b%n];if(d1[0]!==d2[0]||d1[1]!==d2[1])score++}return score}
function challengingPath(n,tries){var best=null,bestScore=-1;for(var i=0;i<tries;i++){var p=randomHamiltonianPath(n),score=pathTurnScore(p,n);if(score>bestScore){best=p;bestScore=score}}return transformPath(best||randomHamiltonianPath(n),n)}
function pathsForDifficulty(n,level){if(level==='easy')return transformPath(snakePath(n,false),n);if(level==='medium'){var options=[snakePath(n,false),snakePath(n,true),spiralPath(n,false),spiralPath(n,true)];return transformPath(options[randInt(options.length)],n)}if(level==='hard')return transformPath(randomHamiltonianPath(n),n);return challengingPath(n,level==='expert'?7:16)}
function buildWendCandidate(){var packs=WEND_PACKS[wendSize],pack=packs[randInt(packs.length)].slice(),path=pathsForDifficulty(wendSize,difficulty('#wendDifficulty')),wordOrder=shuffle(pack.slice()),letters=Array(wendSize*wendSize),paths={};for(var w=0;w<wendSize;w++){var segment=path.slice(w*wendSize,(w+1)*wendSize),word=wordOrder[w];paths[word]=segment.slice();for(var j=0;j<wendSize;j++)letters[segment[j]]=word[j]}return{words:pack,letters:letters,paths:paths,signature:letters.join('')}}
function newWend(){wendSize=Number(q('#wendSize').value);var chosen=null;for(var attempt=0;attempt<120;attempt++){var candidate=buildWendCandidate();if(wendRecent.indexOf(candidate.signature)>=0)continue;if(countWendSolutions(candidate.words,candidate.letters,wendSize,2)===1){chosen=candidate;break}}if(!chosen){chosen=buildWendCandidate()}wendWords=chosen.words;wendLetters=chosen.letters;wendSolutionPaths=chosen.paths;signatureListPush(wendRecent,chosen.signature,12);wendUsed=new Set();wendPath=[];wendSolved=[];renderWend();setMiniStatus('#wendStatus','Unique word layout verified. Connect adjacent letters and use every cell exactly once.','good')}
function renderWend(){var grid=q('#wendGrid');grid.innerHTML='';grid.style.setProperty('--wend-size',wendSize);grid.dataset.size=wendSize;wendLetters.forEach(function(letter,i){var b=document.createElement('button');b.type='button';b.className='wend-cell'+(wendUsed.has(i)?' used':'')+(wendPath.indexOf(i)>=0?' selected':'');b.textContent=letter;b.dataset.i=i;grid.appendChild(b)});q('#wendCurrent').textContent=wendPath.length?wendPath.map(function(i){return wendLetters[i]}).join(''):'—';q('#wendFound').innerHTML=wendSolved.map(function(w){return'<span class="wend-chip">'+w+'</span>'}).join('')}
q('#wendGrid').addEventListener('click',function(e){var cell=e.target.closest('.wend-cell');if(!cell)return;var i=Number(cell.dataset.i);if(wendUsed.has(i))return;if(wendPath.indexOf(i)>=0){if(wendPath[wendPath.length-1]===i)wendPath.pop();renderWend();return}if(wendPath.length){var prev=wendPath[wendPath.length-1],r1=Math.floor(prev/wendSize),c1=prev%wendSize,r2=Math.floor(i/wendSize),c2=i%wendSize;if(Math.abs(r1-r2)+Math.abs(c1-c2)!==1){setMiniStatus('#wendStatus','Letters must touch horizontally or vertically.','bad');return}}wendPath.push(i);renderWend()});
q('#wendUndo').addEventListener('click',function(){wendPath.pop();renderWend()});
q('#wendSubmit').addEventListener('click',function(){var word=wendPath.map(function(i){return wendLetters[i]}).join(''),solutionPath=wendSolutionPaths[word];if(!solutionPath||wendSolved.indexOf(word)>=0||wendPath.join(',')!==solutionPath.join(',')){setMiniStatus('#wendStatus','That path is not one of this puzzle’s verified hidden words.','bad');return}wendPath.forEach(function(i){wendUsed.add(i)});wendSolved.push(word);wendPath=[];renderWend();if(wendUsed.size===wendSize*wendSize)showSuiteWin('Wend solved','You found the single verified word partition.',newWend);else setMiniStatus('#wendStatus',word+' found. Keep weaving.','good')});
q('#wendReset').addEventListener('click',newWend);q('#wendSize').addEventListener('change',newWend);q('#wendDifficulty').addEventListener('change',newWend);newWend();

/* Patches: drag outward from a colored clue; exact-cover verification guarantees one partition. */
var PATCH_COLORS=['#63c8ff','#ff6e78','#9adf72','#ffd35d','#b89bf2','#72d8c6','#ffad69','#80aef7','#e999d8','#8ad49a','#efbd7a','#71c6dd'];
var DIVERSITY_MEMORY=1500;
var patchSize=5,patchClues={},patchClueIndices=[],patchSolutionRects=[],patchShapes=[],patchStart=null,patchDragCurrent=null,patchResizeStart=null,patchDragging=false,patchDragMoved=false,patchPointerId=null,patchEditingShape=-1,patchHistory=[],patchRecent={},patchStartedAt=0,patchTimerId=null;
function rectCells(rect,size){var out=[];for(var r=rect.r;r<rect.r+rect.h;r++)for(var c=rect.c;c<rect.c+rect.w;c++)out.push(r*size+c);return out}
function rectType(h,w){return h===w?'square':w>h?'wide':'tall'}
function patchSplitOptions(rect){var out=[],minArea=2;for(var cut=1;cut<rect.h;cut++)if(cut*rect.w>=minArea&&(rect.h-cut)*rect.w>=minArea)out.push([{r:rect.r,c:rect.c,h:cut,w:rect.w},{r:rect.r+cut,c:rect.c,h:rect.h-cut,w:rect.w}]);for(cut=1;cut<rect.w;cut++)if(cut*rect.h>=minArea&&(rect.w-cut)*rect.h>=minArea)out.push([{r:rect.r,c:rect.c,h:rect.h,w:cut},{r:rect.r,c:rect.c+cut,h:rect.h,w:rect.w-cut}]);return out}
function generatePatchPartition(){var level=difficulty('#patchDifficulty'),factor={easy:1.22,medium:1.42,hard:1.62,expert:1.82,master:2.02}[level]||1.42,jitter=(Math.random()-.5)*patchSize*.55,target=Math.max(4,Math.min(Math.floor(patchSize*patchSize/2),Math.round(patchSize*factor+jitter))),rects=[{r:0,c:0,h:patchSize,w:patchSize}],guard=0;while(rects.length<target&&guard++<600){var candidates=[];rects.forEach(function(rect,index){var opts=patchSplitOptions(rect);if(opts.length)candidates.push({index:index,area:rect.h*rect.w,skinny:Math.abs(rect.h-rect.w),opts:opts})});if(!candidates.length)break;shuffle(candidates);candidates.sort(function(a,b){return b.area-a.area+(Math.random()-.5)*5+(Math.random()<.35?b.skinny-a.skinny:0)});var windowSize=Math.min(candidates.length,3+randInt(Math.min(7,candidates.length))),chosen=candidates[randInt(windowSize)],split=chosen.opts[randInt(chosen.opts.length)];if(Math.random()<.5)split.reverse();rects.splice(chosen.index,1,split[0],split[1])}return shuffle(rects)}
function buildPatchClues(rects){var colorOrder=shuffle(Array.from({length:PATCH_COLORS.length},function(_,i){return i}));patchSolutionRects=rects.map(function(rect){return rectCells(rect,patchSize)});patchClues={};patchClueIndices=[];patchSolutionRects.forEach(function(cells,index){var rect=rects[index],clue=cells[randInt(cells.length)];patchClues[clue]={number:cells.length,type:rectType(rect.h,rect.w),color:colorOrder[index%PATCH_COLORS.length],region:index};patchClueIndices.push(clue)})}
function patchRectCandidatesForClue(clueIndex){var clue=patchClues[clueIndex],cr=Math.floor(clueIndex/patchSize),cc=clueIndex%patchSize,out=[];for(var h=1;h<=patchSize;h++)for(var w=1;w<=patchSize;w++){if(rectType(h,w)!==clue.type)continue;if(clue.number!=null&&h*w!==clue.number)continue;if(clue.number==null&&h*w<2)continue;for(var top=cr-h+1;top<=cr;top++)for(var left=cc-w+1;left<=cc;left++){if(top<0||left<0||top+h>patchSize||left+w>patchSize)continue;var cells=[];for(var r=top;r<top+h;r++)for(var c=left;c<left+w;c++)cells.push(r*patchSize+c);var contained=patchClueIndices.filter(function(i){return cells.indexOf(i)>=0});if(contained.length===1&&contained[0]===clueIndex&&!out.some(function(existing){return sameSet(existing,cells)}))out.push(cells)}}return out}
function patchSolutionSearch(limit,fixedShapes){var clueCount=patchClueIndices.length,cellCount=patchSize*patchSize,fullClues=(1n<<BigInt(clueCount))-1n,fullCells=(1n<<BigInt(cellCount))-1n,rows=[],byClue=Array.from({length:clueCount},function(){return[]}),byCell=Array.from({length:cellCount},function(){return[]});for(var ci=0;ci<clueCount;ci++){var clue=patchClueIndices[ci],candidates=patchRectCandidatesForClue(clue);if(!candidates.length)return{count:0,solution:null};for(var k=0;k<candidates.length;k++){var mask=0n;for(var z=0;z<candidates[k].length;z++)mask|=1n<<BigInt(candidates[k][z]);var row={clue:ci,clueBit:1n<<BigInt(ci),mask:mask,cells:candidates[k].slice()},ri=rows.length;rows.push(row);byClue[ci].push(ri);for(z=0;z<candidates[k].length;z++)byCell[candidates[k][z]].push(ri)}}var fixedAssigned=0n,fixedUsed=0n,fixedRows=[];(fixedShapes||[]).forEach(function(shape){if(fixedAssigned<0n)return;var clue=shape.find(function(i){return patchClues[i]}),ci=patchClueIndices.indexOf(clue),bit=ci>=0?1n<<BigInt(ci):0n;if(clue==null||ci<0||(fixedAssigned&bit)){fixedAssigned=-1n;return}var match=byClue[ci].find(function(ri){return sameSet(rows[ri].cells,shape)});if(match==null||fixedUsed&rows[match].mask){fixedAssigned=-1n;return}fixedAssigned|=bit;fixedUsed|=rows[match].mask;fixedRows.push(match)});if(fixedAssigned<0n)return{count:0,solution:null};var memo=new Map(),visits=0,budget=patchSize>=8?90000:45000,overflow=false,first=null;function validRows(list,assigned,used){var out=[];for(var i=0;i<list.length;i++){var row=rows[list[i]];if(!(assigned&row.clueBit)&&!(used&row.mask))out.push(list[i])}return out}function dfs(assigned,used,path){if(++visits>budget){overflow=true;return limit}if(assigned===fullClues){if(used!==fullCells)return 0;if(!first)first=path.map(function(ri){return rows[ri].cells.slice()});return 1}var key=assigned.toString(36)+'|'+used.toString(36),cached=memo.get(key);if(cached!=null)return cached;var best=null,options=null;for(var ci=0;ci<clueCount;ci++)if(!(assigned&(1n<<BigInt(ci)))){options=validRows(byClue[ci],assigned,used);if(!options.length){memo.set(key,0);return 0}if(best===null||options.length<best.length)best=options}for(var cell=0;cell<cellCount;cell++)if(!(used&(1n<<BigInt(cell)))){options=validRows(byCell[cell],assigned,used);if(!options.length){memo.set(key,0);return 0}if(best===null||options.length<best.length)best=options}var total=0;for(var b=0;b<best.length;b++){var row=rows[best[b]];total+=dfs(assigned|row.clueBit,used|row.mask,path.concat(best[b]));if(total>=limit){total=limit;break}}memo.set(key,total);return total}var count=dfs(fixedAssigned,fixedUsed,fixedRows.slice());return{count:overflow?limit:count,solution:first}}
function countPatchSolutions(limit){return patchSolutionSearch(limit).count}
function verifyPatchPuzzle(){var result=patchSolutionSearch(2);return result.count===1&&result.solution&&result.solution.length===patchClueIndices.length?result.solution:null}
function patchSignature(){return patchSize+'|'+patchClueIndices.slice().sort(function(a,b){return a-b}).map(function(i){var c=patchClues[i];return i+':'+(c.number==null?'_':c.number)+':'+c.type}).join('|')}
function patchRecentKey(){return patchSize+'|'+difficulty('#patchDifficulty')}
function patchSetupRecord(){var cells=Array(patchSize*patchSize).fill('');patchClueIndices.forEach(function(i){var c=patchClues[i];cells[i]=(c.number==null?'_':c.number)+c.type[0]});return{sig:patchSignature(),cells:cells}}
function patchSetupDistance(a,b){return hammingArray(a.cells,b.cells)}
function patchMinDistance(){return Math.max(3,Math.round(patchSize*patchSize*.16))}
function isDiversePatchSetup(record,list){var min=patchMinDistance();return list.every(function(item){return item.sig!==record.sig&&patchSetupDistance(item,record)>=min})}
function rememberPatchSetup(record,list){if(!list.some(function(item){return item.sig===record.sig}))list.push(record);if(list.length>DIVERSITY_MEMORY)list.shift()}
function startPatchTimer(){clearInterval(patchTimerId);var timer=q('#patchTimer');if(!timer)return;patchStartedAt=Date.now();function tick(){timer.textContent=fmtTime(Date.now()-patchStartedAt)}tick();patchTimerId=setInterval(tick,500)}
function stopPatchTimer(){clearInterval(patchTimerId);patchTimerId=null}
function buildPatchPuzzle(){var recent=patchRecent[patchRecentKey()]||(patchRecent[patchRecentKey()]=[]),fallback=null;for(var attempt=0;attempt<95;attempt++){var rects=generatePatchPartition();buildPatchClues(rects);var verified=verifyPatchPuzzle();if(!verified)continue;patchSolutionRects=verified;var level=difficulty('#patchDifficulty'),baseRatio={easy:.04,medium:.14,hard:.27,expert:.42,master:.58}[level]||.14,ratio=Math.max(0,Math.min(.72,baseRatio+(Math.random()-.5)*.16)),hideTarget=Math.floor(patchClueIndices.length*ratio),order=shuffle(patchClueIndices.slice()),hidden=0;for(var k=0;k<order.length&&hidden<hideTarget;k++){var clue=order[k],old=patchClues[clue].number;patchClues[clue].number=null;verified=verifyPatchPuzzle();if(verified){patchSolutionRects=verified;hidden++}else patchClues[clue].number=old}verified=verifyPatchPuzzle();if(!verified)continue;patchSolutionRects=verified;var record=patchSetupRecord(),exact=recent.some(function(item){return item.sig===record.sig});if(!exact&&!fallback)fallback={clues:Object.assign({},patchClues),indices:patchClueIndices.slice(),solutions:patchSolutionRects.map(function(s){return s.slice()}),record:record};if(!exact&&isDiversePatchSetup(record,recent)){rememberPatchSetup(record,recent);return}}if(fallback){patchClues=fallback.clues;patchClueIndices=fallback.indices;patchSolutionRects=fallback.solutions;rememberPatchSetup(fallback.record,recent);return}throw new Error('Unable to generate a unique Patches puzzle')}
function patchCellsInRect(a,b){var ar=Math.floor(a/patchSize),ac=a%patchSize,br=Math.floor(b/patchSize),bc=b%patchSize,minr=Math.min(ar,br),maxr=Math.max(ar,br),minc=Math.min(ac,bc),maxc=Math.max(ac,bc),out=[];for(var r=minr;r<=maxr;r++)for(var c=minc;c<=maxc;c++)out.push(r*patchSize+c);return out}
function patchBounds(cells){var rs=cells.map(function(i){return Math.floor(i/patchSize)}),cs=cells.map(function(i){return i%patchSize});return{minr:Math.min.apply(null,rs),maxr:Math.max.apply(null,rs),minc:Math.min.apply(null,cs),maxc:Math.max.apply(null,cs)}}
function patchCellsFromBounds(bounds){var out=[];for(var r=bounds.minr;r<=bounds.maxr;r++)for(var c=bounds.minc;c<=bounds.maxc;c++)out.push(r*patchSize+c);return out}
function patchDragCells(start,end){if(patchEditingShape>=0&&patchShapes[patchEditingShape]){var old=patchBounds(patchShapes[patchEditingShape]),handle=patchResizeStart==null?start:patchResizeStart,sr=Math.floor(handle/patchSize),sc=handle%patchSize,er=Math.floor(end/patchSize),ec=end%patchSize,b={minr:old.minr,maxr:old.maxr,minc:old.minc,maxc:old.maxc},top=sr===old.minr,bottom=sr===old.maxr,left=sc===old.minc,right=sc===old.maxc;if(er<old.minr)top=true;if(er>old.maxr)bottom=true;if(ec<old.minc)left=true;if(ec>old.maxc)right=true;if(top){b.minr=Math.min(er,old.maxr);b.maxr=Math.max(er,old.maxr)}if(bottom){b.minr=Math.min(old.minr,er);b.maxr=Math.max(old.minr,er)}if(left){b.minc=Math.min(ec,old.maxc);b.maxc=Math.max(ec,old.maxc)}if(right){b.minc=Math.min(old.minc,ec);b.maxc=Math.max(old.minc,ec)}if(!top&&!bottom&&!left&&!right){b.minr=Math.min(old.minr,er);b.maxr=Math.max(old.maxr,er);b.minc=Math.min(old.minc,ec);b.maxc=Math.max(old.maxc,ec)}return patchCellsFromBounds(b)}return patchCellsInRect(start,end)}
function patchRegionForShape(shape){var clue=shape.find(function(i){return patchClues[i]});return clue==null?0:patchClues[clue].region}
function patchColorForShape(shape){var clue=shape.find(function(i){return patchClues[i]});return clue==null?PATCH_COLORS[0]:PATCH_COLORS[patchClues[clue].color]}
function patchShapeIsLocallyValid(shape){var clue=shape.find(function(i){return patchClues[i]});return clue!=null&&patchRectCandidatesForClue(clue).some(function(cells){return sameSet(cells,shape)})}
function patchShapeIsValid(shape){return patchSolutionRects.some(function(sol){return sameSet(sol,shape)})}
function patchShapesCanComplete(shapes){return patchSolutionSearch(1,shapes).count>0}
function patchShapeCanGrowToValid(clue,shape){return patchRectCandidatesForClue(clue).some(function(cells){return shape.every(function(i){return cells.indexOf(i)>=0})})}
function patchPartialShapeAllowed(clue,shape,type){var c=patchClues[clue];if(!c||c.number==null||shape.length>=c.number)return false;if(c.type==='wide'&&type==='tall')return false;if(c.type==='tall'&&type==='wide')return false;return patchShapeCanGrowToValid(clue,shape)}
function patchShapeRespectsVisibleRules(shape){var clue=shape.find(function(i){return patchClues[i]});if(clue==null)return false;var c=patchClues[clue],bounds=patchBounds(shape),type=rectType(bounds.maxr-bounds.minr+1,bounds.maxc-bounds.minc+1);if(c.number!=null&&shape.length>c.number)return false;return patchShapeIsLocallyValid(shape)||patchPartialShapeAllowed(clue,shape,type)}
function patchCandidateInfo(start,end){
  if(start==null||end==null||!patchClues[start])return{cells:[],valid:false,reason:'Start on a colored clue.'};
  var raw=patchDragCells(start,end);
  var occupied=raw.some(function(x){return patchShapes.some(function(s,si){return si!==patchEditingShape&&s.indexOf(x)>=0})});
  if(occupied)return{cells:raw,valid:false,placeable:false,reason:'Patches cannot overlap.'};
  var contained=patchClueIndices.filter(function(i){return raw.indexOf(i)>=0});
  if(contained.length!==1||contained[0]!==start)return{cells:raw,valid:false,placeable:false,reason:'A patch must contain exactly its one colored clue.'};
  var clue=patchClues[start],bounds=patchBounds(raw),height=bounds.maxr-bounds.minr+1,width=bounds.maxc-bounds.minc+1,type=rectType(height,width);
  if(clue.number!=null&&raw.length>clue.number)return{cells:raw,valid:false,placeable:false,reason:'A patch with area '+clue.number+' cannot be larger than '+clue.number+' boxes.'};
  if(clue.number!=null&&raw.length<clue.number){if(patchPartialShapeAllowed(start,raw,type))return{cells:raw,valid:true,placeable:true,reason:'Patch held. Drag an edge to continue sizing it.'};return{cells:raw,valid:false,placeable:false,reason:'Match the direction shown by the clue shape.'}}
  if(type!==clue.type)return{cells:raw,valid:false,placeable:false,reason:'Match the direction shown by the clue shape.'};
  var matches=patchRectCandidatesForClue(start).some(function(cells){return sameSet(cells,raw)});
  if(matches)return{cells:raw,valid:true,placeable:true,reason:''};
  return{cells:raw,valid:false,placeable:true,reason:'Placed, but it is not a valid '+clue.type+' patch yet.'}
}
function renderPatches(){var grid=q('#patchGrid');grid.innerHTML='';grid.style.setProperty('--patch-size',patchSize);grid.style.gridTemplateColumns='repeat('+patchSize+',1fr)';grid.dataset.size=patchSize;var preview=patchDragging&&patchDragMoved?patchCandidateInfo(patchStart,patchDragCurrent):null,previewSet=new Set(preview?preview.cells:[]),previewColor=patchStart!=null&&patchClues[patchStart]?PATCH_COLORS[patchClues[patchStart].color]:PATCH_COLORS[0];for(var i=0;i<patchSize*patchSize;i++){var b=document.createElement('button');b.type='button';var si=patchShapes.findIndex(function(s){return s.indexOf(i)>=0}),classes=['patch-cell'],rr=Math.floor(i/patchSize),cc=i%patchSize;if(patchStart===i)classes.push('drag-origin');if(previewSet.has(i)){classes.push('patch-preview',preview.valid?'patch-preview-valid':'patch-preview-invalid','patch-preview-edge');b.style.setProperty('--patch-fill',previewColor);b.style.backgroundColor=previewColor;b.style.color=previewColor}if(si>=0){var shape=patchShapes[si],bounds=patchBounds(shape),region=patchRegionForShape(shape);classes.push('filled','shape-'+(region%12));if(!patchShapeRespectsVisibleRules(shape))classes.push('patch-misfit');if(!previewSet.has(i))b.style.setProperty('--patch-fill',patchColorForShape(shape));b.style.borderTopWidth=rr===bounds.minr?'3px':'1px';b.style.borderBottomWidth=rr===bounds.maxr?'3px':'1px';b.style.borderLeftWidth=cc===bounds.minc?'3px':'1px';b.style.borderRightWidth=cc===bounds.maxc?'3px':'1px';b.style.borderColor='#34414d';b.style.borderStyle='solid'}else{b.style.borderTopWidth='0';b.style.borderLeftWidth='0';b.style.borderRightWidth=cc===patchSize-1?'0':'1px';b.style.borderBottomWidth=rr===patchSize-1?'0':'1px';b.style.borderColor='#cbd2d9';b.style.borderStyle='solid'}var clue=patchClues[i];if(clue){classes.push('clue-cell');var label=clue.number==null?'':String(clue.number);b.innerHTML='<span class="clue patch-'+clue.type+'" style="--patch-clue:'+PATCH_COLORS[clue.color]+'" aria-label="'+clue.type+' patch'+(clue.number==null?', any matching area':', area '+clue.number)+'">'+label+'</span>'}b.className=classes.join(' ');b.dataset.i=i;grid.appendChild(b)}}
function patchComplete(){var used=new Set();patchShapes.forEach(function(s){s.forEach(function(i){used.add(i)})});return used.size===patchSize*patchSize&&patchShapes.length===patchClueIndices.length&&patchShapes.every(patchShapeIsLocallyValid)&&patchShapesCanComplete(patchShapes)}
function clearPatchDrag(){patchStart=null;patchDragCurrent=null;patchResizeStart=null;patchDragging=false;patchDragMoved=false;patchPointerId=null;patchEditingShape=-1}
function clearPatches(){patchShapes=[];clearPatchDrag();patchHistory=[];renderPatches();setMiniStatus('#patchStatus','Press a colored clue and drag out its patch.')}
function newPatches(){patchSize=Number(q('#patchSize').value);buildPatchPuzzle();clearPatches();startPatchTimer();setMiniStatus('#patchStatus','Unique partition verified. Blank clues allow any area with the shown shape.','good')}
function patchCellFromPoint(x,y){
  var grid=q('#patchGrid'),rect=grid.getBoundingClientRect();
  if(x<rect.left||x>rect.right||y<rect.top||y>rect.bottom)return-1;
  var col=Math.min(patchSize-1,Math.max(0,Math.floor((x-rect.left)/rect.width*patchSize)));
  var row=Math.min(patchSize-1,Math.max(0,Math.floor((y-rect.top)/rect.height*patchSize)));
  return row*patchSize+col
}
function removePatchShape(index){if(index<0)return;patchHistory.push(patchShapes.map(function(s){return s.slice()}));patchShapes.splice(index,1);clearPatchDrag();renderPatches();setMiniStatus('#patchStatus','Patch removed. Drag the colored clue to place it again.','good')}
function finishPatchDrag(end){if(!patchDragging)return;var editing=patchEditingShape,oldShapes=patchShapes.map(function(s){return s.slice()});if(!patchDragMoved){clearPatchDrag();if(editing>=0)removePatchShape(editing);else{renderPatches();setMiniStatus('#patchStatus','Drag from the colored clue to size its patch.','good')}return}var info=patchCandidateInfo(patchStart,end);if(info.placeable){patchHistory.push(oldShapes);if(editing>=0)patchShapes.splice(editing,1);patchShapes.push(info.cells);clearPatchDrag();renderPatches();if(patchComplete()){stopPatchTimer();showSuiteWin('Patches solved','The grid has one verified colorful partition.',newPatches)}else setMiniStatus('#patchStatus',info.valid?(info.reason||'Patch placed. Drag another colored clue.'):(info.reason||'Patch placed, but it is not correct yet.'),info.valid?'good':'bad');return}clearPatchDrag();renderPatches();setMiniStatus('#patchStatus',(info.reason||'That patch cannot be placed.')+' It snapped back.','bad')}
q('#patchGrid').addEventListener('pointerdown',function(e){var cell=e.target.closest('.patch-cell');if(!cell||patchDragging)return;var i=Number(cell.dataset.i),shapeIndex=patchShapes.findIndex(function(s){return s.indexOf(i)>=0}),clue=patchClues[i]?i:null;if(clue==null&&shapeIndex>=0)clue=patchShapes[shapeIndex].find(function(x){return patchClues[x]});if(clue==null)return;e.preventDefault();patchEditingShape=shapeIndex>=0?shapeIndex:patchShapes.findIndex(function(s){return s.indexOf(clue)>=0});patchStart=clue;patchResizeStart=i;patchDragCurrent=i;patchDragging=true;patchDragMoved=false;patchPointerId=e.pointerId;try{q('#patchGrid').setPointerCapture(e.pointerId)}catch(err){}})
q('#patchGrid').addEventListener('pointermove',function(e){if(!patchDragging||e.pointerId!==patchPointerId)return;e.preventDefault();var i=patchCellFromPoint(e.clientX,e.clientY);if(i>=0&&i!==patchDragCurrent){patchDragCurrent=i;patchDragMoved=true;renderPatches()}})
q('#patchGrid').addEventListener('pointerup',function(e){if(!patchDragging||e.pointerId!==patchPointerId)return;e.preventDefault();var i=patchCellFromPoint(e.clientX,e.clientY);finishPatchDrag(i>=0?i:patchDragCurrent)})
q('#patchGrid').addEventListener('pointercancel',function(e){if(!patchDragging||e.pointerId!==patchPointerId)return;clearPatchDrag();renderPatches()})
q('#patchUndo').addEventListener('click',function(){if(!patchHistory.length)return;patchShapes=patchHistory.pop();clearPatchDrag();renderPatches()});q('#patchReset').addEventListener('click',clearPatches);q('#patchNew').addEventListener('click',newPatches);q('#patchSize').addEventListener('change',newPatches);q('#patchDifficulty').addEventListener('change',newPatches)
q('#patchHint').addEventListener('click',function(){var next=patchSolutionRects.find(function(sol){return !patchShapes.some(function(s){return sameSet(s,sol)})});if(!next)return;patchHistory.push(patchShapes.map(function(s){return s.slice()}));patchShapes=patchShapes.filter(function(s){return !s.some(function(x){return next.indexOf(x)>=0})});patchShapes.push(next.slice());clearPatchDrag();renderPatches();if(patchComplete()){stopPatchTimer();showSuiteWin('Patches solved','The grid has one verified colorful partition.',newPatches)}else setMiniStatus('#patchStatus','One correct patch was filled.','good')});newPatches();

/* Mini Sudoku: every clue-removal step is checked with a two-solution cutoff. */
var sudokuSize=4,sudokuBoxRows=2,sudokuBoxCols=2,sudokuSolution=[],sudokuPuzzle=[],sudokuValues=[],sudokuRecent={},sudokuPendingValue=null,sudokuStartedAt=0,sudokuTimerId=null;
function sudokuBoxIndex(r,c){return Math.floor(r/sudokuBoxRows)*(sudokuSize/sudokuBoxCols)+Math.floor(c/sudokuBoxCols)}
function makeSudokuSolution(){sudokuBoxRows=sudokuSize===6?2:Math.sqrt(sudokuSize);sudokuBoxCols=sudokuSize===6?3:Math.sqrt(sudokuSize);function pattern(r,c){return(sudokuBoxCols*(r%sudokuBoxRows)+Math.floor(r/sudokuBoxRows)+c)%sudokuSize}var rowGroups=shuffle(range(sudokuSize/sudokuBoxRows)),colGroups=shuffle(range(sudokuSize/sudokuBoxCols)),rows=[],cols=[],nums=shuffle(range(sudokuSize).map(function(i){return i+1}));rowGroups.forEach(function(g){shuffle(range(sudokuBoxRows)).forEach(function(x){rows.push(g*sudokuBoxRows+x)})});colGroups.forEach(function(g){shuffle(range(sudokuBoxCols)).forEach(function(x){cols.push(g*sudokuBoxCols+x)})});return rows.flatMap(function(r){return cols.map(function(c){return nums[pattern(r,c)]})})}
function bitCount(x){var n=0;while(x){x&=x-1;n++}return n}
function countSudokuSolutions(board,limit){var n=sudokuSize,full=(1<<n)-1,row=Array(n).fill(0),col=Array(n).fill(0),box=Array(n).fill(0),work=board.slice(),count=0;for(var i=0;i<work.length;i++)if(work[i]){var r=Math.floor(i/n),c=i%n,b=sudokuBoxIndex(r,c),bit=1<<(work[i]-1);if(row[r]&bit||col[c]&bit||box[b]&bit)return 0;row[r]|=bit;col[c]|=bit;box[b]|=bit}function dfs(){if(count>=limit)return;var best=-1,bestMask=0,bestCount=99;for(var i=0;i<work.length;i++)if(!work[i]){var r=Math.floor(i/n),c=i%n,b=sudokuBoxIndex(r,c),mask=full&~(row[r]|col[c]|box[b]),bc=bitCount(mask);if(!bc)return;if(bc<bestCount){best=i;bestMask=mask;bestCount=bc;if(bc===1)break}}if(best<0){count++;return}var rr=Math.floor(best/n),cc=best%n,bb=sudokuBoxIndex(rr,cc);while(bestMask){var bit=bestMask&-bestMask;bestMask-=bit;var val=1+Math.round(Math.log(bit)/Math.LN2);work[best]=val;row[rr]|=bit;col[cc]|=bit;box[bb]|=bit;dfs();row[rr]^=bit;col[cc]^=bit;box[bb]^=bit;work[best]=0;if(count>=limit)return}}dfs();return count}
function sudokuTarget(){
  var rank=difficultyRank(difficulty('#sudokuDifficulty')),
      range={4:{easy:7,master:3},6:{easy:20,master:6},9:{easy:38,master:16}}[sudokuSize],
      curve=(Math.pow(1.35,rank)-1)/(Math.pow(1.35,4)-1);
  return Math.floor(range.easy-(range.easy-range.master)*curve)
}
function sudokuRecentKey(){return sudokuSize+'|'+difficulty('#sudokuDifficulty')}
function sudokuSetupRecord(){return{sig:sudokuSolution.join(',')+'|'+sudokuPuzzle.join(','),solution:sudokuSolution.slice(),puzzle:sudokuPuzzle.slice()}}
function sudokuMinPuzzleDistance(){return Math.max(4,Math.round(sudokuSize*sudokuSize*.18))}
function sudokuMinSolutionDistance(){return Math.max(sudokuSize,Math.round(sudokuSize*sudokuSize*.22))}
function isDiverseSudokuSetup(record,recent){return recent.every(function(item){return item.sig!==record.sig&&hammingArray(item.puzzle,record.puzzle)>=sudokuMinPuzzleDistance()&&hammingArray(item.solution,record.solution)>=sudokuMinSolutionDistance()})}
function rememberSudokuSetup(record,recent){if(!recent.some(function(item){return item.sig===record.sig}))recent.push(record);if(recent.length>DIVERSITY_MEMORY)recent.shift()}
function startSudokuTimer(){clearInterval(sudokuTimerId);var timer=q('#sudokuTimer');if(!timer)return;sudokuStartedAt=Date.now();function tick(){timer.textContent=fmtTime(Date.now()-sudokuStartedAt)}tick();sudokuTimerId=setInterval(tick,500)}
function stopSudokuTimer(){clearInterval(sudokuTimerId);sudokuTimerId=null}
function generateSudokuPuzzle(){var key=sudokuRecentKey(),recent=sudokuRecent[key]||(sudokuRecent[key]=[]),fallback=null;for(var attempt=0;attempt<240;attempt++){sudokuSolution=makeSudokuSolution();sudokuPuzzle=sudokuSolution.slice();var target=sudokuTarget(),positions=shuffle(range(sudokuSize*sudokuSize)),givens=sudokuPuzzle.length;for(var k=0;k<positions.length&&givens>target;k++){var i=positions[k],old=sudokuPuzzle[i];sudokuPuzzle[i]=0;if(countSudokuSolutions(sudokuPuzzle,2)!==1)sudokuPuzzle[i]=old;else givens--}if(countSudokuSolutions(sudokuPuzzle,2)!==1)continue;var record=sudokuSetupRecord(),exact=recent.some(function(item){return item.sig===record.sig});if(!exact&&!fallback)fallback=record;if(!exact&&isDiverseSudokuSetup(record,recent)){rememberSudokuSetup(record,recent);sudokuValues=sudokuPuzzle.slice();return}}sudokuSolution=fallback?fallback.solution:sudokuSolution;sudokuPuzzle=fallback?fallback.puzzle:sudokuPuzzle;if(fallback)rememberSudokuSetup(fallback,recent);sudokuValues=sudokuPuzzle.slice()}
function sudokuConflicts(){var bad=new Set();function check(ids){var seen={};ids.forEach(function(i){var v=sudokuValues[i];if(!v)return;(seen[v]||(seen[v]=[])).push(i)});Object.keys(seen).forEach(function(k){if(seen[k].length>1)seen[k].forEach(function(i){bad.add(i)})})}for(var r=0;r<sudokuSize;r++)check(range(sudokuSize).map(function(c){return r*sudokuSize+c}));for(var c=0;c<sudokuSize;c++)check(range(sudokuSize).map(function(r){return r*sudokuSize+c}));for(var br=0;br<sudokuSize;br+=sudokuBoxRows)for(var bc=0;bc<sudokuSize;bc+=sudokuBoxCols){var ids=[];for(r=0;r<sudokuBoxRows;r++)for(c=0;c<sudokuBoxCols;c++)ids.push((br+r)*sudokuSize+bc+c);check(ids)}return bad}
function renderSudoku(){var grid=q('#sudokuGrid'),bad=sudokuConflicts();grid.innerHTML='';grid.style.setProperty('--sudoku-size',sudokuSize);grid.dataset.size=sudokuSize;sudokuValues.forEach(function(v,i){var r=Math.floor(i/sudokuSize),c=i%sudokuSize,b=document.createElement('button'),rightSection=(c+1)%sudokuBoxCols===0&&c!==sudokuSize-1,bottomSection=(r+1)%sudokuBoxRows===0&&r!==sudokuSize-1;b.type='button';b.dataset.i=i;b.className='sudoku-cell'+(sudokuPuzzle[i]?' given':'')+(bad.has(i)?' conflict':'');b.textContent=v||'';b.disabled=!!sudokuPuzzle[i];b.style.borderTopWidth='0';b.style.borderLeftWidth='0';b.style.borderRightWidth=c===sudokuSize-1?'0':(rightSection?'3px':'1px');b.style.borderBottomWidth=r===sudokuSize-1?'0':(bottomSection?'3px':'1px');b.style.setProperty('border-right-color',rightSection?'#7f613d':'#d7c3a2','important');b.style.setProperty('border-bottom-color',bottomSection?'#7f613d':'#d7c3a2','important');b.style.borderStyle='solid';grid.appendChild(b)});renderSudokuKeypad()}
function renderSudokuKeypad(){var pad=q('#sudokuKeypad');if(!pad)return;pad.innerHTML='';pad.style.setProperty('--sudoku-size',sudokuSize);for(var value=1;value<=sudokuSize;value++){var button=document.createElement('button');button.type='button';button.className='sudoku-key'+(sudokuPendingValue===value?' selected':'');button.textContent=value;button.dataset.value=value;button.setAttribute('aria-label','Select '+value);button.setAttribute('aria-pressed',String(sudokuPendingValue===value));pad.appendChild(button)}var clear=document.createElement('button');clear.type='button';clear.className='sudoku-key sudoku-key-clear'+(sudokuPendingValue===0?' selected':'');clear.textContent='Clear';clear.dataset.value='0';clear.setAttribute('aria-pressed',String(sudokuPendingValue===0));pad.appendChild(clear)}
function sudokuRuleText(){return'Unique puzzle verified. Fill every '+sudokuBoxRows+'×'+sudokuBoxCols+' box with 1–'+sudokuSize+'.'}
function resetSudoku(){sudokuPendingValue=null;sudokuValues=sudokuPuzzle.slice();renderSudoku();setMiniStatus('#sudokuStatus','Choose a number below, then tap the cell where it belongs.','good')}
function newSudoku(){sudokuSize=Number(q('#sudokuSize').value);generateSudokuPuzzle();resetSudoku();startSudokuTimer()}
function selectSudokuCell(i){if(sudokuPuzzle[i])return;if(sudokuPendingValue===null){setMiniStatus('#sudokuStatus','Choose a number below first.','bad');return}sudokuValues[i]=sudokuPendingValue;sudokuPendingValue=null;renderSudoku();if(sudokuValues.every(function(v,j){return v===sudokuSolution[j]})){stopSudokuTimer();showSuiteWin('Mini Sudoku solved','The unique grid is complete.',newSudoku)}}
function placeSudokuValue(value){sudokuPendingValue=value;renderSudoku();setMiniStatus('#sudokuStatus',value?'Now tap the cell for '+value+'.':'Now tap a cell to clear it.','good')}
q('#sudokuGrid').addEventListener('click',function(e){var cell=e.target.closest('.sudoku-cell');if(!cell||cell.disabled)return;e.preventDefault();selectSudokuCell(Number(cell.dataset.i));cell.blur()});q('#sudokuKeypad').addEventListener('click',function(e){var key=e.target.closest('.sudoku-key');if(!key)return;placeSudokuValue(Number(key.dataset.value))});document.addEventListener('keydown',function(e){if(/INPUT|TEXTAREA|SELECT/.test((e.target&&e.target.tagName)||''))return;var value=Number(e.key);if(value>=1&&value<=sudokuSize){e.preventDefault();placeSudokuValue(value)}else if(e.key==='Backspace'||e.key==='Delete'||e.key==='0'){e.preventDefault();placeSudokuValue(0)}});
q('#sudokuReset').addEventListener('click',resetSudoku);q('#sudokuNew').addEventListener('click',newSudoku);q('#sudokuSize').addEventListener('change',newSudoku);q('#sudokuDifficulty').addEventListener('change',newSudoku);q('#sudokuHint').addEventListener('click',function(){var i=sudokuValues.findIndex(function(v,j){return v!==sudokuSolution[j]});if(i<0)return;sudokuValues[i]=sudokuSolution[i];renderSudoku();setMiniStatus('#sudokuStatus','One correct number was filled.','good');if(sudokuValues.every(function(v,j){return v===sudokuSolution[j]}))showSuiteWin('Mini Sudoku solved','The unique grid is complete.',newSudoku)});newSudoku();

/* Zip: walls expose a graph that is exactly one Hamiltonian path; checkpoints vary by difficulty. */
var zipSize=5,zipSolution=[],zipNumbers={},zipPath=[],zipDragging=false,zipEdges=new Set(),zipRecent=[];
function edgeKey(a,b){return a<b?a+'-'+b:b+'-'+a}
function transformGridIndex(index,size,turns,mirror){var r=Math.floor(index/size),c=index%size;if(mirror)c=size-1-c;for(var k=0;k<turns;k++){var t=r;r=c;c=size-1-t}return r*size+c}
function zipPathCandidate(){var level=difficulty('#zipDifficulty'),base;if(level==='easy')base=snakePath(zipSize,Math.random()<.5);else if(level==='medium'){var opts=[snakePath(zipSize,false),snakePath(zipSize,true),spiralPath(zipSize,false),spiralPath(zipSize,true)];base=opts[randInt(opts.length)]}else if(level==='hard')base=randomHamiltonianPath(zipSize);else base=challengingPath(zipSize,level==='expert'?7:16);return transformPath(base,zipSize)}
function verifyZipUnique(){if(zipSolution.length!==zipSize*zipSize||new Set(zipSolution).size!==zipSolution.length)return 0;var degrees=Array(zipSize*zipSize).fill(0);zipEdges.forEach(function(key){var parts=key.split('-').map(Number);degrees[parts[0]]++;degrees[parts[1]]++});if(degrees.filter(function(d){return d===1}).length!==2||degrees.some(function(d){return d<1||d>2}))return 0;var seen=new Set([zipSolution[0]]),at=zipSolution[0],prev=-1;while(true){var next=gridNeighbors(at,zipSize).filter(function(x){return zipEdges.has(edgeKey(at,x))&&x!==prev});if(!next.length)break;prev=at;at=next[0];if(seen.has(at))return 0;seen.add(at)}return seen.size===zipSize*zipSize?1:0}
function newZip(){zipSize=Number(q('#zipSize').value);var chosen=null;for(var attempt=0;attempt<80;attempt++){var path=zipPathCandidate(),sig=path.join(',');if(zipRecent.indexOf(sig)<0){chosen=path;signatureListPush(zipRecent,sig,12);break}}zipSolution=chosen||zipPathCandidate();zipEdges=new Set();for(var i=1;i<zipSolution.length;i++)zipEdges.add(edgeKey(zipSolution[i-1],zipSolution[i]));if(verifyZipUnique()!==1)throw new Error('Zip path verification failed');zipNumbers={};var level=difficulty('#zipDifficulty'),checkpoints={easy:Math.min(zipSolution.length,zipSize+4),medium:zipSize,hard:Math.max(3,Math.ceil(zipSize/2)),expert:Math.max(3,Math.ceil(zipSize/2)-1),master:3}[level];for(var k=0;k<checkpoints;k++){var pos=Math.round(k*(zipSolution.length-1)/(checkpoints-1));zipNumbers[zipSolution[pos]]=k+1}clearZip()}
function zipEdgeOpen(a,b){return zipEdges.has(edgeKey(a,b))}
function renderZip(){var grid=q('#zipGrid');grid.innerHTML='';grid.style.setProperty('--zip-size',zipSize);grid.style.gridTemplateColumns='repeat('+zipSize+',1fr)';grid.dataset.size=zipSize;for(var i=0;i<zipSize*zipSize;i++){var r=Math.floor(i/zipSize),c=i%zipSize,b=document.createElement('button');b.type='button';b.className='zip-cell'+(zipPath.indexOf(i)>=0?' path':'')+(zipPath[zipPath.length-1]===i?' current':'')+(c<zipSize-1&&!zipEdgeOpen(i,i+1)?' wall-right':'')+(r<zipSize-1&&!zipEdgeOpen(i,i+zipSize)?' wall-bottom':'');b.dataset.i=i;b.style.borderTopWidth='0';b.style.borderLeftWidth='0';b.style.borderRightWidth=c===zipSize-1?'0':'1px';b.style.borderBottomWidth=r===zipSize-1?'0':'1px';b.style.borderStyle='solid';if(zipNumbers[i])b.innerHTML='<span class="num">'+zipNumbers[i]+'</span>';var pos=zipPath.indexOf(i);if(pos>=0)b.innerHTML+='<span class="step">'+(pos+1)+'</span>';grid.appendChild(b)}}
function nextZipNumber(){var seen=0;zipPath.forEach(function(i){if(zipNumbers[i])seen=Math.max(seen,zipNumbers[i])});return seen+1}
function addZipCell(i){if(!zipPath.length){if(i!==zipSolution[0]){setMiniStatus('#zipStatus','The path must start at 1.','bad');return}zipPath=[i];renderZip();return}var old=zipPath.indexOf(i);if(old>=0){zipPath=zipPath.slice(0,old+1);renderZip();return}var prev=zipPath[zipPath.length-1];if(!zipEdgeOpen(prev,i))return;if(zipNumbers[i]&&zipNumbers[i]!==nextZipNumber()){setMiniStatus('#zipStatus','Visit the numbered cells in order.','bad');return}zipPath.push(i);renderZip();if(zipPath.length===zipSize*zipSize)showSuiteWin('Zip solved','The board’s single verified path is complete.',newZip)}
function clearZip(){zipPath=[];renderZip();setMiniStatus('#zipStatus','Unique path verified. Start at 1, follow open passages, and fill every cell.','good')}
q('#zipGrid').addEventListener('pointerdown',function(e){var cell=e.target.closest('.zip-cell');if(!cell)return;e.preventDefault();zipDragging=true;addZipCell(Number(cell.dataset.i));try{q('#zipGrid').setPointerCapture(e.pointerId)}catch(err){}});q('#zipGrid').addEventListener('pointermove',function(e){if(!zipDragging)return;var el=document.elementFromPoint(e.clientX,e.clientY),cell=el&&el.closest('.zip-cell');if(cell&&q('#zipGrid').contains(cell))addZipCell(Number(cell.dataset.i))});q('#zipGrid').addEventListener('pointerup',function(){zipDragging=false});q('#zipGrid').addEventListener('pointercancel',function(){zipDragging=false});
q('#zipUndo').addEventListener('click',function(){zipPath.pop();renderZip()});q('#zipReset').addEventListener('click',clearZip);q('#zipNew').addEventListener('click',newZip);q('#zipSize').addEventListener('change',newZip);q('#zipDifficulty').addEventListener('change',newZip);q('#zipHint').addEventListener('click',function(){var next=zipSolution[zipPath.length];if(next==null)return;if(!zipPath.length||zipPath.every(function(x,j){return x===zipSolution[j]})){addZipCell(next);setMiniStatus('#zipStatus','The next correct step was added.','good')}else{var good=0;while(good<zipPath.length&&zipPath[good]===zipSolution[good])good++;zipPath=zipPath.slice(0,good);renderZip();setMiniStatus('#zipStatus','The path was trimmed back to the first mistake.','good')}});newZip();

/* Tango: every generated clue set is counted to exactly one completion. */
var tangoSize=6,tangoSolution=[],tangoGivens=new Set(),tangoRelations=[],tangoValues=[],tangoHistory=[],tangoRecent=[];
function tangoValidPatterns(n){var half=n/2,out=[];for(var mask=0;mask<(1<<n);mask++){var row=[],ones=0,ok=true;for(var c=0;c<n;c++){var v=(mask>>c&1)?1:2;row.push(v);if(v===1)ones++;if(c>=2&&row[c]===row[c-1]&&row[c]===row[c-2])ok=false}if(ok&&ones===half)out.push(row)}return out}
function generateTangoSolution(n){var patterns=tangoValidPatterns(n),half=n/2;for(var attempt=0;attempt<48;attempt++){shuffle(patterns);var rows=[],colOnes=Array(n).fill(0);function dfs(r){if(r===n)return true;for(var pi=0;pi<patterns.length;pi++){var candidate=patterns[(pi+attempt)%patterns.length],valid=true,remaining=n-r-1;for(var c=0;c<n;c++){var ones=colOnes[c]+(candidate[c]===1?1:0);if(ones>half||ones+remaining<half){valid=false;break}if(r>=2&&rows[r-1][c]===candidate[c]&&rows[r-2][c]===candidate[c]){valid=false;break}}if(!valid)continue;rows.push(candidate.slice());for(c=0;c<n;c++)if(candidate[c]===1)colOnes[c]++;if(dfs(r+1))return true;for(c=0;c<n;c++)if(candidate[c]===1)colOnes[c]--;rows.pop()}return false}if(dfs(0))return rows.flat()}return null}
function countTangoSolutions(givens,relations,limit){var n=tangoSize,half=n/2,patterns=tangoValidPatterns(n),rows=[],colOnes=Array(n).fill(0),count=0,horizontal=relations.filter(function(rel){return Math.floor(rel.a/n)===Math.floor(rel.b/n)}),vertical=relations.filter(function(rel){return Math.abs(rel.a-rel.b)===n}),rowCandidates=range(n).map(function(r){return patterns.filter(function(p){for(var c=0;c<n;c++){var i=r*n+c;if(givens.has(i)&&p[c]!==tangoSolution[i])return false}for(var k=0;k<horizontal.length;k++){var rel=horizontal[k];if(Math.floor(rel.a/n)!==r)continue;var a=p[rel.a%n],b=p[rel.b%n];if((rel.s==='='&&a!==b)||(rel.s==='×'&&a===b))return false}return true})});function dfs(r){if(count>=limit)return;if(r===n){if(colOnes.every(function(x){return x===half}))count++;return}var remaining=n-r-1,cands=rowCandidates[r];for(var pi=0;pi<cands.length;pi++){var candidate=cands[pi],valid=true;for(var c=0;c<n;c++){var ones=colOnes[c]+(candidate[c]===1?1:0);if(ones>half||ones+remaining<half){valid=false;break}if(r>=2&&rows[r-1][c]===candidate[c]&&rows[r-2][c]===candidate[c]){valid=false;break}}if(!valid)continue;for(var k=0;k<vertical.length;k++){var rel=vertical[k],lower=Math.max(rel.a,rel.b),rr=Math.floor(lower/n);if(rr!==r)continue;var upper=lower-n,a=rows[r-1][upper%n],b=candidate[lower%n];if((rel.s==='='&&a!==b)||(rel.s==='×'&&a===b)){valid=false;break}}if(!valid)continue;rows.push(candidate);for(c=0;c<n;c++)if(candidate[c]===1)colOnes[c]++;dfs(r+1);for(c=0;c<n;c++)if(candidate[c]===1)colOnes[c]--;rows.pop();if(count>=limit)return}}dfs(0);return count}
function buildTangoPuzzle(){for(var attempt=0;attempt<25;attempt++){tangoSolution=generateTangoSolution(tangoSize);if(!tangoSolution)continue;var level=difficulty('#tangoDifficulty'),pairs=[];for(var r=0;r<tangoSize;r++)for(var c=0;c<tangoSize;c++){var i=r*tangoSize+c;if(c+1<tangoSize)pairs.push([i,i+1]);if(r+1<tangoSize)pairs.push([i,i+tangoSize])}shuffle(pairs);var relFactor={easy:2.2,medium:1.5,hard:.9,expert:.62,master:.42}[level],relCount=Math.round(tangoSize*relFactor);tangoRelations=pairs.slice(0,relCount).map(function(p){return{a:p[0],b:p[1],s:tangoSolution[p[0]]===tangoSolution[p[1]]?'=':'×'}});tangoGivens=new Set(range(tangoSize*tangoSize));var target=Math.round(tangoSize*tangoSize*({easy:.34,medium:.22,hard:.12,expert:.08,master:.05}[level])),order=shuffle(range(tangoSize*tangoSize));for(var k=0;k<order.length&&tangoGivens.size>target;k++){var cell=order[k];tangoGivens.delete(cell);if(countTangoSolutions(tangoGivens,tangoRelations,2)!==1)tangoGivens.add(cell)}if(countTangoSolutions(tangoGivens,tangoRelations,2)!==1)continue;var sig=tangoSolution.join('')+'|'+Array.from(tangoGivens).sort(function(a,b){return a-b}).join(',')+'|'+tangoRelations.map(function(x){return x.a+x.s+x.b}).sort().join(',');if(tangoRecent.indexOf(sig)>=0)continue;signatureListPush(tangoRecent,sig,10);return}throw new Error('Unable to generate a unique Tango puzzle')}
function tangoBad(){var bad=new Set(),half=tangoSize/2;function mark(ids){var vals=ids.map(function(i){return tangoValues[i]});[1,2].forEach(function(v){if(vals.filter(function(x){return x===v}).length>half)ids.forEach(function(i){if(tangoValues[i]===v)bad.add(i)})});for(var k=0;k<vals.length-2;k++)if(vals[k]&&vals[k]===vals[k+1]&&vals[k]===vals[k+2]){bad.add(ids[k]);bad.add(ids[k+1]);bad.add(ids[k+2])}}for(var r=0;r<tangoSize;r++)mark(range(tangoSize).map(function(c){return r*tangoSize+c}));for(var c=0;c<tangoSize;c++)mark(range(tangoSize).map(function(r){return r*tangoSize+c}));tangoRelations.forEach(function(rel){var a=tangoValues[rel.a],b=tangoValues[rel.b];if(a&&b&&((rel.s==='='&&a!==b)||(rel.s==='×'&&a===b))){bad.add(rel.a);bad.add(rel.b)}});return bad}
function tangoComplete(){return tangoValues.every(Boolean)&&tangoBad().size===0&&tangoValues.every(function(v,i){return v===tangoSolution[i]})}
function renderTango(){var grid=q('#tangoGrid'),bad=tangoBad();grid.innerHTML='';grid.style.setProperty('--tango-size',tangoSize);grid.style.gridTemplateColumns='repeat('+tangoSize+',1fr)';q('#tangoWrap').dataset.size=tangoSize;for(var i=0;i<tangoSize*tangoSize;i++){var r=Math.floor(i/tangoSize),c=i%tangoSize,b=document.createElement('button');b.type='button';b.dataset.i=i;b.disabled=tangoGivens.has(i);b.className='tango-cell'+(tangoValues[i]===1?' sun':tangoValues[i]===2?' moon':'')+(tangoGivens.has(i)?' given':'')+(bad.has(i)?' conflict':'');b.textContent=tangoValues[i]===1?'☀':tangoValues[i]===2?'●':'';b.style.borderTopWidth='0';b.style.borderLeftWidth='0';b.style.borderRightWidth=c===tangoSize-1?'0':'1px';b.style.borderBottomWidth=r===tangoSize-1?'0':'1px';b.style.borderStyle='solid';grid.appendChild(b)}var layer=q('#tangoRelations');layer.innerHTML='';tangoRelations.forEach(function(rel){var ar=Math.floor(rel.a/tangoSize),ac=rel.a%tangoSize,br=Math.floor(rel.b/tangoSize),bc=rel.b%tangoSize,x=((ac+bc+1)/2)/tangoSize*100,y=((ar+br+1)/2)/tangoSize*100,d=document.createElement('span');d.className='tango-relation';d.textContent=rel.s;d.style.left=x+'%';d.style.top=y+'%';if(tangoSize===8){d.style.width='17px';d.style.height='17px';d.style.fontSize='.58rem'}layer.appendChild(d)})}
function clearTango(){tangoValues=Array(tangoSize*tangoSize).fill(0);tangoGivens.forEach(function(i){tangoValues[i]=tangoSolution[i]});tangoHistory=[];renderTango();setMiniStatus('#tangoStatus','Unique completion verified. Tap a cell to cycle between sun and moon.','good')}
function newTango(){tangoSize=Number(q('#tangoSize').value);buildTangoPuzzle();clearTango()}
q('#tangoGrid').addEventListener('click',function(e){var cell=e.target.closest('.tango-cell');if(!cell||cell.disabled)return;var i=Number(cell.dataset.i);tangoHistory.push(tangoValues.slice());tangoValues[i]=(tangoValues[i]+1)%3;renderTango();if(tangoComplete())showSuiteWin('Tango solved','The single verified grid is complete.',newTango)});q('#tangoUndo').addEventListener('click',function(){if(!tangoHistory.length)return;tangoValues=tangoHistory.pop();renderTango()});q('#tangoReset').addEventListener('click',clearTango);q('#tangoNew').addEventListener('click',newTango);q('#tangoSize').addEventListener('change',newTango);q('#tangoDifficulty').addEventListener('change',newTango);q('#tangoHint').addEventListener('click',function(){var i=tangoValues.findIndex(function(v,j){return v!==tangoSolution[j]});if(i<0)return;tangoHistory.push(tangoValues.slice());tangoValues[i]=tangoSolution[i];renderTango();setMiniStatus('#tangoStatus','One correct symbol was filled.','good');if(tangoComplete())showSuiteWin('Tango solved','The single verified grid is complete.',newTango)});newTango();

/* Pinpoint: curated clue sets have one canonical accepted category; difficulty changes initial reveal count. */
var pinpointSets=[
  {answer:'planets',aliases:['planet'],clues:['Mercury','Venus','Earth','Mars','Jupiter','Saturn']},
  {answer:'things with keys',aliases:['keyed things','things that have keys'],clues:['Piano','Keyboard','Map legend','Car ignition','Florida islands','Typewriter']},
  {answer:'types of cloud',aliases:['clouds','cloud types'],clues:['Cirrus','Cumulus','Stratus','Nimbus','Lenticular','Mammatus']},
  {answer:'things with rings',aliases:['rings'],clues:['Saturn','Tree trunk','Telephone','Boxing match','Doorbell','Wedding']},
  {answer:'things with roots',aliases:['roots'],clues:['Tree','Equation','Tooth','Family history','Hair','Word origin']},
  {answer:'things with scales',aliases:['scales'],clues:['Fish','Map','Piano practice','Justice','Bathroom','Mountain map']}
],pinpointIndex=-1,pinpointClueCount=5,pinpointActiveClues=[],pinpointRevealed=1,pinpointDone=false;
function norm(s){return String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()}
function preparePinpoint(){pinpointClueCount=Number(q('#pinpointSize').value);pinpointActiveClues=shuffle(pinpointSets[pinpointIndex].clues.slice()).slice(0,pinpointClueCount);var level=difficulty('#pinpointDifficulty'),shown={easy:3,medium:2,hard:1,expert:1,master:1}[level];pinpointRevealed=Math.min(pinpointClueCount,shown)}
function renderPinpoint(){var box=q('#pinpointClues');box.innerHTML='';box.dataset.count=pinpointClueCount;pinpointActiveClues.forEach(function(clue,i){var d=document.createElement('div');d.className='pin-clue'+(i>=pinpointRevealed?' hidden':'');d.textContent=i<pinpointRevealed?clue:'Hidden clue';box.appendChild(d)});q('#pinpointGuess').disabled=pinpointDone}
function resetPinpoint(next){if(next||pinpointIndex<0){var old=pinpointIndex;do{pinpointIndex=randInt(pinpointSets.length)}while(pinpointSets.length>1&&pinpointIndex===old)}preparePinpoint();pinpointDone=false;q('#pinpointGuess').value='';renderPinpoint();setMiniStatus('#pinpointStatus','This curated clue set has one canonical category. Use as few clues as possible.','good')}
q('#pinpointForm').addEventListener('submit',function(e){e.preventDefault();if(pinpointDone)return;var data=pinpointSets[pinpointIndex],guess=norm(q('#pinpointGuess').value),level=difficulty('#pinpointDifficulty'),answers=(level==='master'?[data.answer]:[data.answer].concat(data.aliases||[])).map(norm);if(answers.indexOf(guess)>=0){pinpointDone=true;renderPinpoint();showSuiteWin('Pinpoint solved','You found “'+data.answer+'” with '+pinpointRevealed+' clue'+(pinpointRevealed===1?'':'s')+'.',function(){resetPinpoint(true)});return}q('#pinpointGuess').value='';if(level!=='expert'&&level!=='master'&&pinpointRevealed<pinpointClueCount){pinpointRevealed++;renderPinpoint();setMiniStatus('#pinpointStatus','Not quite. Another clue has been revealed.','bad')}else if(pinpointRevealed<pinpointClueCount){setMiniStatus('#pinpointStatus','Not quite. Use Reveal clue when you need more information.','bad')}else{pinpointDone=true;renderPinpoint();setMiniStatus('#pinpointStatus','The category was “'+data.answer+'”.','bad')}});q('#pinpointReveal').addEventListener('click',function(){if(pinpointDone)return;if(pinpointRevealed<pinpointClueCount){pinpointRevealed++;renderPinpoint()}else{pinpointDone=true;renderPinpoint();setMiniStatus('#pinpointStatus','The category was “'+pinpointSets[pinpointIndex].answer+'”.','bad')}});q('#pinpointNew').addEventListener('click',function(){resetPinpoint(true)});q('#pinpointSize').addEventListener('change',function(){resetPinpoint(false)});q('#pinpointDifficulty').addEventListener('change',function(){resetPinpoint(false)});resetPinpoint(true);

/* Crossclimb: curated seven-word chains have one endpoint-fixed Hamiltonian order. */
var crossSets={
  4:[
    {words:['MIND','MINE','PINE','PINS','PANS','FANS','FANG'],clues:['Thought or intellect','A place where ore is extracted','An evergreen tree','Fastening pegs','Cooking vessels','Enthusiastic supporters','A sharp animal tooth']},
    {words:['COLD','CORD','CARD','CARE','CURE','CUBE','TUBE'],clues:['Low in temperature','A length of rope','A greeting sent by mail','Attention and concern','A remedy','A six-faced solid','A hollow cylinder']},
    {words:['HEAD','HEAL','TEAL','TELL','TALL','TAIL','MAIL'],clues:['Top part of the body','Become healthy again','A blue-green color','Inform someone','High in height','An animal appendage','Letters and parcels']}
  ],
  5:[
    {words:['BREAD','BROAD','BROOD','BLOOD','BLOOM','GLOOM','GROOM'],clues:['A baked loaf','Wide rather than narrow','A group of young birds','Fluid carried by veins','A flower opening','Deep sadness or darkness','Prepare neatly for an event']},
    {words:['PLACE','PLATE','SLATE','STATE','STARE','SHARE','SHARK'],clues:['A location','A flat dish','A stone writing tablet','A condition or nation','Look fixedly','Divide with another','A large predatory fish']},
    {words:['TRAIN','BRAIN','BRAID','BRAND','BLAND','BLEND','BLEED'],clues:['Rail transport','The thinking organ','Interwoven strands','A product identity','Lacking strong flavor','Mix smoothly','Lose blood']}
  ],
  6:[
    {words:['MARKET','MARKED','MASKED','MASHED','BASHED','BUSHED','PUSHED'],clues:['A place for buying and selling','Carried a visible sign','Covered the face','Crushed into a soft mass','Struck hard','Exhausted after effort','Moved by applying force']},
    {words:['FINDER','FINGER','SINGER','SINGED','WINGED','WINKED','LINKED'],clues:['One who discovers','A digit of the hand','A vocal performer','Lightly burned','Having wings','Closed one eye briefly','Joined together']},
    {words:['PLAYER','SLAYER','STAYER','STAGER','STAGED','STARED','SHARED'],clues:['A participant in a game','One who defeats or kills','One who remains','One who presents an event','Presented for an audience','Looked fixedly','Used or enjoyed together']}
  ]
},crossIndex=-1,crossWordLength=4,crossItems=[],crossActiveId=null,crossDrag=null,crossRecent=[];
function diffOne(a,b){if(a.length!==b.length)return false;var d=0;for(var i=0;i<a.length;i++)if(a[i]!==b[i]&&++d>1)return false;return d===1}
function countCrossOrders(words){var count=0,used=new Set([0]);function dfs(index,depth){if(count>=2)return;if(depth===words.length){if(index===words.length-1)count++;return}for(var i=0;i<words.length;i++){if(used.has(i)||!diffOne(words[index],words[i]))continue;used.add(i);dfs(i,depth+1);used.delete(i)}}dfs(0,1);return count}
function activeCrossData(){return crossSets[crossWordLength][crossIndex]}
function crossMasked(value){return value?value.toUpperCase():''}
function crossSelected(){return crossItems.find(function(item){return item.id===crossActiveId})||crossItems[0]}
function crossRelationAt(index){var data=activeCrossData(),a=index===0?data.words[0]:crossMasked(crossItems[index-1].value),b=index===crossItems.length?data.words[data.words.length-1]:crossMasked(crossItems[index].value);return a&&b&&a.length===crossWordLength&&b.length===crossWordLength&&diffOne(a,b)?'=':'≠'}
function renderCross(){var data=activeCrossData(),box=q('#crossLadder');box.innerHTML='';function row(content,locked,index){var wrap=document.createElement('div');wrap.className='cross-ladder-row'+(locked?' locked':'')+(!locked&&crossItems[index].id===crossActiveId?' active':'')+(!locked&&crossDrag&&crossDrag.id===crossItems[index].id?' dragging':'');var left=document.createElement('div'),right=document.createElement('div'),card=document.createElement('div');left.className=right.className='cross-rail';left.innerHTML=right.innerHTML='<span class="cross-rel">'+(locked&&index===0?'':locked?crossRelationAt(crossItems.length):crossRelationAt(index))+'</span>';card.className='cross-card';if(locked){card.innerHTML='<span class="cross-word-fixed">'+content+'</span><span class="cross-lock" aria-hidden="true">🔒</span>'}else{var item=crossItems[index],placeholder=Array(crossWordLength+1).join('_ ');card.innerHTML='<input class="cross-row-input" data-id="'+item.id+'" maxlength="'+crossWordLength+'" autocomplete="off" autocapitalize="characters" spellcheck="false" value="'+item.value+'" placeholder="'+placeholder.trim()+'" aria-label="Answer for '+item.clue+'"><button class="cross-grip" type="button" data-drag-id="'+item.id+'" aria-label="Drag row">≡</button>'}wrap.append(left,card,right);box.appendChild(wrap)}row(data.words[0],true,0);crossItems.forEach(function(_,i){row('',false,i)});row(data.words[data.words.length-1],true,crossItems.length+1);var selected=crossSelected();q('#crossClue').textContent=selected?selected.clue:'Select a movable row to see its clue.';qa('.cross-row-input',box).forEach(function(inp){inp.addEventListener('focus',function(){crossActiveId=Number(inp.dataset.id);qa('.cross-ladder-row',box).forEach(function(row){row.classList.remove('active')});inp.closest('.cross-ladder-row').classList.add('active');q('#crossClue').textContent=crossSelected().clue});inp.addEventListener('input',function(){var item=crossItems.find(function(x){return x.id===Number(inp.dataset.id)});if(item)item.value=inp.value.toUpperCase().replace(/[^A-Z]/g,'').slice(0,crossWordLength);inp.value=item?item.value:''})})}
function applyCrossDifficulty(){var data=activeCrossData(),level=difficulty('#crossDifficulty'),rank=difficultyRank(level),middle=data.words.slice(1,-1);crossItems=shuffle(middle.map(function(word,i){return{id:i,word:word,clue:data.clues[i+1],value:''}}));if(rank===0){crossItems.slice(0,2).forEach(function(item){item.value=item.word})}else if(rank===1&&crossItems[0])crossItems[0].value=crossItems[0].word;else if(rank===2)crossItems.forEach(function(item){item.value=item.word[0]});else if(rank===3&&crossItems[0])crossItems[0].value=crossItems[0].word[0];crossActiveId=crossItems[0]?crossItems[0].id:null}
function resetCross(next){crossWordLength=Number(q('#crossWordLength').value);var pool=crossSets[crossWordLength],old=crossIndex;if(next||crossIndex<0||crossIndex>=pool.length){var tries=0;do{crossIndex=randInt(pool.length);tries++}while(pool.length>1&&crossIndex===old&&tries<20)}var data=activeCrossData();if(countCrossOrders(data.words)!==1)throw new Error('Crossclimb set is not uniquely ordered');var sig=crossWordLength+'|'+data.words.join(',');if(next&&crossRecent.indexOf(sig)>=0&&pool.length>1){crossIndex=(crossIndex+1)%pool.length;data=activeCrossData();if(countCrossOrders(data.words)!==1)throw new Error('Crossclimb set is not uniquely ordered')}signatureListPush(crossRecent,crossWordLength+'|'+data.words.join(','),8);applyCrossDifficulty();renderCross();setMiniStatus('#crossStatus','One endpoint-fixed ladder is verified. Solve the rows and drag them into order.','good')}
function crossCheck(){var data=activeCrossData(),wrong=crossItems.filter(function(item){return item.value!==item.word});if(wrong.length){setMiniStatus('#crossStatus',wrong.length+' row'+(wrong.length===1?' is':'s are')+' not solved correctly yet.','bad');return}var order=[data.words[0]].concat(crossItems.map(function(x){return x.value}),data.words[data.words.length-1]),valid=order.every(function(word,i){return i===0||diffOne(order[i-1],word)});if(valid&&order.join('|')===data.words.join('|'))showSuiteWin('Crossclimb solved','The only valid word ladder is complete.',function(){resetCross(true)});else setMiniStatus('#crossStatus','All words are solved, but the middle rows are not in the unique order yet. Drag them again.','bad')}
function crossMoveItem(id,to){var from=crossItems.findIndex(function(x){return x.id===id});if(from<0)return;to=Math.max(0,Math.min(crossItems.length-1,to));if(from===to)return;var item=crossItems.splice(from,1)[0];crossItems.splice(to,0,item);renderCross()}
q('#crossLadder').addEventListener('click',function(e){var inp=e.target.closest('.cross-row-input');if(inp){crossActiveId=Number(inp.dataset.id);q('#crossClue').textContent=crossSelected().clue}})
q('#crossLadder').addEventListener('pointerdown',function(e){var grip=e.target.closest('.cross-grip');if(!grip)return;e.preventDefault();var id=Number(grip.dataset.dragId),row=grip.closest('.cross-ladder-row');crossDrag={id:id,startY:e.clientY,rowHeight:row.getBoundingClientRect().height+10,startIndex:crossItems.findIndex(function(x){return x.id===id})};try{q('#crossLadder').setPointerCapture(e.pointerId)}catch(err){}})
q('#crossLadder').addEventListener('pointermove',function(e){if(!crossDrag)return;e.preventDefault();var delta=Math.round((e.clientY-crossDrag.startY)/crossDrag.rowHeight);if(delta){var target=crossDrag.startIndex+delta;crossMoveItem(crossDrag.id,target);crossDrag.startIndex=crossItems.findIndex(function(x){return x.id===crossDrag.id});crossDrag.startY=e.clientY}})
q('#crossLadder').addEventListener('pointerup',function(){crossDrag=null;renderCross()});q('#crossLadder').addEventListener('pointercancel',function(){crossDrag=null;renderCross()})
q('#crossReveal').addEventListener('click',function(){var item=crossSelected();if(!item)return;item.value=item.word;renderCross();setMiniStatus('#crossStatus','The selected row was revealed.','good')})
q('#crossHint').addEventListener('click',function(){var item=crossSelected();if(!item)return;var at=0;while(at<item.word.length&&item.value[at]===item.word[at])at++;if(at>=item.word.length){setMiniStatus('#crossStatus','That row is already correct.','good');return}var chars=Array(crossWordLength).fill('');for(var i=0;i<item.value.length;i++)chars[i]=item.value[i];chars[at]=item.word[at];item.value=chars.join('').replace(/\s+$/,'');renderCross();setMiniStatus('#crossStatus','One correct letter was added to the selected row.','good')})
q('#crossCheck').addEventListener('click',crossCheck);q('#crossNew').addEventListener('click',function(){resetCross(true)});q('#crossWordLength').addEventListener('change',function(){crossIndex=-1;resetCross(true)});q('#crossDifficulty').addEventListener('change',function(){applyCrossDifficulty();renderCross()});resetCross(true);

window.__dailyGamesDebug={
  newWend:newWend,newPatches:newPatches,newSudoku:newSudoku,newZip:newZip,newTango:newTango,resetPinpoint:resetPinpoint,resetCross:resetCross,
  countWendSolutions:function(){return countWendSolutions(wendWords,wendLetters,wendSize,2)},
  countPatchSolutions:function(){return countPatchSolutions(2)},
  countSudokuSolutions:function(){return countSudokuSolutions(sudokuPuzzle,2)},
  countZipSolutions:verifyZipUnique,
  countTangoSolutions:function(){return countTangoSolutions(tangoGivens,tangoRelations,2)},
  countCrossOrders:function(){return countCrossOrders(activeCrossData().words)},
  getPatchSolution:function(){return patchSolutionRects.map(function(x){return x.slice()})},
  getSudoku:function(){return{size:sudokuSize,puzzle:sudokuPuzzle.slice(),solution:sudokuSolution.slice()}},
  getTango:function(){return{size:tangoSize,solution:tangoSolution.slice(),givens:Array.from(tangoGivens),relations:tangoRelations.slice()}}
};
showScreen((document.body&&document.body.dataset.startGame)||'home');
})();
