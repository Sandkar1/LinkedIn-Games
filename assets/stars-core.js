(function(root,factory){
  var api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.StarsCore=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  var BASE_SOLUTIONS={
    8:[[1,3],[5,7],[1,3],[5,7],[0,2],[4,6],[0,2],[4,6]],
    9:[[0,2],[4,6],[0,8],[2,4],[6,8],[1,3],[5,7],[1,3],[5,7]],
    10:[[0,2],[4,6],[0,2],[4,8],[1,6],[3,8],[1,5],[7,9],[3,5],[7,9]],
    11:[[0,2],[4,6],[0,2],[4,6],[8,10],[1,3],[7,9],[1,5],[7,9],[3,5],[8,10]],
    12:[[0,2],[4,6],[0,2],[4,6],[1,8],[3,10],[1,7],[9,11],[5,7],[9,11],[3,5],[8,10]],
    13:[[0,2],[4,6],[0,2],[4,6],[1,8],[3,5],[9,11],[1,7],[9,11],[3,7],[10,12],[5,8],[10,12]],
    14:[[0,2],[4,6],[0,2],[4,6],[1,8],[3,5],[1,9],[11,13],[7,9],[11,13],[3,7],[10,12],[5,8],[10,12]],
    15:[[0,2],[4,6],[0,2],[4,6],[1,8],[3,5],[1,7],[3,10],[12,14],[8,10],[12,14],[5,9],[11,13],[7,9],[11,13]]
  };
  var VERIFIED_START_SEEDS={
    8:{7:1,6:2,5:3,4:2,3:1},
    9:{8:1,7:1,6:1,5:1,4:1},
    10:{9:1,8:1,7:1,6:4,5:8},
    11:{10:4,9:2,8:6,7:6,6:17},
    12:{11:1,10:1,9:1,8:26,7:10},
    13:{12:3,11:3,10:3,9:187,8:3},
    14:{13:1,12:1,11:4,10:1,9:76},
    15:{14:239,13:239,12:239,11:558}
  };

  function randomInt(max,rng){return Math.floor((rng||Math.random)()*max)}
  function seededRandom(seed){var value=seed>>>0;return function(){value=(Math.imul(value,1664525)+1013904223)>>>0;return value/4294967296}}
  function shuffle(list,rng){rng=rng||Math.random;for(var i=list.length-1;i>0;i--){var j=randomInt(i+1,rng),v=list[i];list[i]=list[j];list[j]=v}return list}
  function range(n){return Array.from({length:n},function(_,i){return i})}
  function orthogonalNeighbors(i,n){var r=Math.floor(i/n),c=i%n,out=[];if(r>0)out.push(i-n);if(r<n-1)out.push(i+n);if(c>0)out.push(i-1);if(c<n-1)out.push(i+1);return out}
  function touchingNeighbors(i,n){var r=Math.floor(i/n),c=i%n,out=[];for(var rr=Math.max(0,r-1);rr<=Math.min(n-1,r+1);rr++)for(var cc=Math.max(0,c-1);cc<=Math.min(n-1,c+1);cc++){var j=rr*n+cc;if(j!==i)out.push(j)}return out}
  function touches(a,b,n){var ar=Math.floor(a/n),ac=a%n,br=Math.floor(b/n),bc=b%n;return Math.abs(ar-br)<=1&&Math.abs(ac-bc)<=1}

  function validSolution(pairs,n){
    if(!Array.isArray(pairs)||pairs.length!==n)return false;
    var columns=Array(n).fill(0),previous=[];
    for(var r=0;r<n;r++){
      var pair=pairs[r];if(!pair||pair.length!==2||pair[0]<0||pair[1]>=n||pair[0]>=pair[1]||pair[1]-pair[0]<=1)return false;
      for(var k=0;k<2;k++){var c=pair[k];columns[c]++;for(var p=0;p<previous.length;p++)if(Math.abs(c-previous[p])<=1)return false}
      previous=pair;
    }
    return columns.every(function(count){return count===2})
  }

  function transformSolution(pairs,n,rng){
    rng=rng||Math.random;var mirror=rng()<.5,turns=randomInt(4,rng),rowShift=randomInt(n,rng),colShift=randomInt(n,rng),original=[];
    for(var r=0;r<n;r++)for(var k=0;k<2;k++)original.push([r,pairs[r][k]]);
    function transform(useShift){
      var out=Array.from({length:n},function(){return[]});
      original.forEach(function(point){var rr=point[0],cc=point[1];if(mirror)cc=n-1-cc;for(var t=0;t<turns;t++){var old=rr;rr=cc;cc=n-1-old}if(useShift){rr=(rr+rowShift)%n;cc=(cc+colShift)%n}out[rr].push(cc)});
      out.forEach(function(pair){pair.sort(function(a,b){return a-b})});return out
    }
    var shifted=transform(true);return validSolution(shifted,n)?shifted:transform(false)
  }

  function searchSolution(n,rng,nodeLimit){
    rng=rng||Math.random;nodeLimit=nodeLimit||60000;var pairs=[];
    for(var a=0;a<n;a++)for(var b=a+2;b<n;b++)pairs.push([a,b,(1<<a)|(1<<b)]);
    var rows=[],columns=Array(n).fill(0),nodes=0;
    function dfs(row,previousMask){
      if(++nodes>nodeLimit)return false;
      if(row===n)return columns.every(function(count){return count===2});
      var options=shuffle(pairs.slice(),rng),remaining=n-row-1;
      options.sort(function(x,y){return(columns[y[0]]+columns[y[1]]+rng()*.7)-(columns[x[0]]+columns[x[1]]+rng()*.7)});
      for(var i=0;i<options.length;i++){
        var item=options[i],c1=item[0],c2=item[1],mask=item[2],expanded=mask|(mask<<1)|(mask>>1);
        if(previousMask&expanded||columns[c1]>=2||columns[c2]>=2)continue;
        columns[c1]++;columns[c2]++;rows.push([c1,c2]);
        var viable=columns.every(function(count){return count<=2&&count+remaining>=2});
        if(viable&&dfs(row+1,mask))return true;
        rows.pop();columns[c1]--;columns[c2]--
      }
      return false
    }
    return dfs(0,0)?rows:null
  }

  function makeSolution(n,rng){
    if(n<8||n>15)throw new Error('Two-star boards require a size from 8 to 15.');
    rng=rng||Math.random;var found=null;
    for(var attempt=0;attempt<4&&!found;attempt++)found=searchSolution(n,rng,45000+attempt*20000);
    return transformSolution(found||BASE_SOLUTIONS[n],n,rng)
  }

  function validRegionMap(map,n){
    if(!Array.isArray(map)||map.length!==n*n)return false;
    for(var rid=0;rid<n;rid++){
      var region=[];for(var i=0;i<map.length;i++){if(!Number.isInteger(map[i])||map[i]<0||map[i]>=n)return false;if(map[i]===rid)region.push(i)}
      if(region.length<2)return false;
      var seen=new Set([region[0]]),stack=[region[0]];
      while(stack.length){var at=stack.pop();orthogonalNeighbors(at,n).forEach(function(next){if(map[next]===rid&&!seen.has(next)){seen.add(next);stack.push(next)}})}
      if(seen.size!==region.length)return false
    }
    return true
  }

  function relabelRegions(map,n,rng){var labels=shuffle(range(n),rng);return map.map(function(id){return labels[id]})}

  function makeRandomLayout(n,rng,irregularity){
    rng=rng||Math.random;irregularity=irregularity==null ? .55 : Math.max(0,Math.min(1,irregularity));
    var seeds=[randomInt(n*n,rng)];
    while(seeds.length<n){
      var available=range(n*n).filter(function(i){return seeds.indexOf(i)<0}),sample=shuffle(available,rng).slice(0,Math.min(available.length,Math.max(28,n*4))),best=sample[0],bestScore=-Infinity;
      sample.forEach(function(i){var distance=Math.min.apply(null,seeds.map(function(seed){return Math.abs(Math.floor(i/n)-Math.floor(seed/n))+Math.abs(i%n-seed%n)})),score=distance+rng()*2.2;if(score>bestScore){best=i;bestScore=score}});seeds.push(best)
    }
    var map=Array(n*n).fill(-1),sizes=Array(n).fill(1),frontiers=Array.from({length:n},function(){return new Set()});
    seeds.forEach(function(seed,rid){map[seed]=rid});seeds.forEach(function(seed,rid){orthogonalNeighbors(seed,n).forEach(function(next){if(map[next]<0)frontiers[rid].add(next)})});
    var left=n*n-n;
    while(left){
      var ids=range(n).filter(function(rid){return frontiers[rid].size});if(!ids.length)return null;
      var smallest=Math.min.apply(null,ids.map(function(rid){return sizes[rid]})),allowance=1+Math.floor(irregularity*Math.max(2,n/2));ids=ids.filter(function(rid){return sizes[rid]<=smallest+allowance});
      var weights=ids.map(function(rid){return 1/Math.pow(sizes[rid],1.15-irregularity*.45)}),total=weights.reduce(function(a,b){return a+b},0),pick=rng()*total,rid=ids[0];for(var wi=0;wi<ids.length;wi++){pick-=weights[wi];if(pick<=0){rid=ids[wi];break}}
      var candidates=Array.from(frontiers[rid]),chosen=candidates[0],chosenScore=-Infinity;
      candidates.forEach(function(cell){var contacts=orthogonalNeighbors(cell,n).filter(function(next){return map[next]===rid}).length,score=contacts*(2.8-irregularity*2)+rng()*(2+irregularity*7);if(score>chosenScore){chosen=cell;chosenScore=score}});
      map[chosen]=rid;sizes[rid]++;left--;frontiers.forEach(function(front){front.delete(chosen)});orthogonalNeighbors(chosen,n).forEach(function(next){if(map[next]<0)frontiers[rid].add(next)})
    }
    return validRegionMap(map,n)?relabelRegions(map,n,rng):null
  }

  function makeAnchoredLayout(n,rng,anchorTarget){
    rng=rng||Math.random;var solution=BASE_SOLUTIONS[n].map(function(pair){return pair.slice()}),allStars=[];
    for(var r=0;r<n;r++)solution[r].forEach(function(c){allStars.push(r*n+c)});
    var edges=[];
    for(var a=0;a<allStars.length;a++)for(var b=a+1;b<allStars.length;b++){
      var first=allStars[a],second=allStars[b],r1=Math.floor(first/n),c1=first%n,r2=Math.floor(second/n),c2=second%n;
      if(r1===r2&&Math.abs(c1-c2)===2||c1===c2&&Math.abs(r1-r2)===2)edges.push({stars:[first,second],middle:((first+second)/2)|0})
    }
    var eligible=[];
    for(var matchingTry=0;matchingTry<80;matchingTry++){
      var usedStars=new Set(),usedMiddles=new Set(),matching=[];shuffle(edges.slice(),rng).forEach(function(edge){if(!usedStars.has(edge.stars[0])&&!usedStars.has(edge.stars[1])&&!usedMiddles.has(edge.middle)){matching.push(edge);usedStars.add(edge.stars[0]);usedStars.add(edge.stars[1]);usedMiddles.add(edge.middle)}});if(matching.length>eligible.length)eligible=matching
    }
    shuffle(eligible,rng);anchorTarget=Math.max(1,Math.min(eligible.length,n-1,anchorTarget==null?eligible.length:anchorTarget));var anchors=eligible.slice(0,anchorTarget),map=Array(n*n).fill(-1);
    var anchoredStars=new Set();anchors.forEach(function(anchor,rid){anchor.stars.forEach(function(i){map[i]=rid;anchoredStars.add(i)});map[anchor.middle]=rid});
    var remainingStars=allStars.filter(function(i){return!anchoredStars.has(i)}),remainingRegions=n-anchorTarget,starSet=new Set(remainingStars),seeds=shuffle(remainingStars.slice(),rng).slice(0,remainingRegions),sizes=Array(n).fill(3),starCounts=Array(n).fill(2),frontiers=Array.from({length:n},function(){return new Set()});
    for(var rid=anchorTarget;rid<n;rid++){var seed=seeds[rid-anchorTarget];map[seed]=rid;sizes[rid]=1;starCounts[rid]=1}
    for(rid=anchorTarget;rid<n;rid++){seed=seeds[rid-anchorTarget];orthogonalNeighbors(seed,n).forEach(function(next){if(map[next]<0)frontiers[rid].add(next)})}
    var left=map.filter(function(id){return id<0}).length,guard=n*n*n*4;
    while(left&&guard--){
      var available=[];
      for(rid=anchorTarget;rid<n;rid++){
        var valid=Array.from(frontiers[rid]).filter(function(cell){return!starSet.has(cell)||starCounts[rid]<2});if(valid.length)available.push({rid:rid,cells:valid})
      }
      if(!available.length)break;
      var smallest=Math.min.apply(null,available.map(function(item){return sizes[item.rid]})),allowance=2+randomInt(Math.max(2,Math.ceil(n/3)),rng);available=available.filter(function(item){return sizes[item.rid]<=smallest+allowance});
      var choice=available[randomInt(available.length,rng)];rid=choice.rid;var best=choice.cells[0],bestScore=-Infinity;
      choice.cells.forEach(function(cell){var contacts=orthogonalNeighbors(cell,n).filter(function(next){return map[next]===rid}).length,starDelay=starSet.has(cell)&&sizes[rid]<4?5:0,score=contacts*1.6+rng()*6-starDelay;if(score>bestScore){best=cell;bestScore=score}});
      map[best]=rid;sizes[rid]++;if(starSet.has(best))starCounts[rid]++;left--;frontiers.forEach(function(front){front.delete(best)});orthogonalNeighbors(best,n).forEach(function(next){if(map[next]<0)frontiers[rid].add(next)})
    }
    if(left||!starCounts.slice(anchorTarget).every(function(count){return count===2})||!validRegionMap(map,n))return null;
    var labels=shuffle(range(n),rng),labeled=map.map(function(id){return labels[id]});return{map:labeled,solution:solution}
  }

  function makeRegions(n,solution,rng,attemptLimit){
    rng=rng||Math.random;attemptLimit=attemptLimit||220;var stars=[];
    for(var r=0;r<n;r++)for(var k=0;k<2;k++)stars.push(r*n+solution[r][k]);
    for(var attempt=0;attempt<attemptLimit;attempt++){
      var starSet=new Set(stars),seeds=shuffle(stars.slice(),rng).slice(0,n),map=Array(n*n).fill(-1),sizes=Array(n).fill(1),starCounts=Array(n).fill(1),frontiers=Array.from({length:n},function(){return new Set()});
      seeds.forEach(function(seed,rid){map[seed]=rid});
      seeds.forEach(function(seed,rid){orthogonalNeighbors(seed,n).forEach(function(next){if(map[next]<0)frontiers[rid].add(next)})});
      var left=n*n-n;
      while(left){
        var available=[];
        for(var rid=0;rid<n;rid++){
          var valid=Array.from(frontiers[rid]).filter(function(cell){return!starSet.has(cell)||starCounts[rid]<2});
          if(valid.length)available.push({rid:rid,cells:valid})
        }
        if(!available.length)break;
        var smallest=Math.min.apply(null,available.map(function(item){return sizes[item.rid]})),allowance=randomInt(3,rng);available=available.filter(function(item){return sizes[item.rid]<=smallest+allowance});
        var choice=available[randomInt(available.length,rng)];rid=choice.rid;var cells=choice.cells,best=cells[0],bestScore=-Infinity;
        cells.forEach(function(cell){var touchCount=orthogonalNeighbors(cell,n).filter(function(next){return map[next]===rid}).length,starDelay=starSet.has(cell)&&sizes[rid]<3?4:0,score=touchCount*2+rng()*4-starDelay;if(score>bestScore){best=cell;bestScore=score}});
        map[best]=rid;sizes[rid]++;if(starSet.has(best))starCounts[rid]++;left--;frontiers.forEach(function(front){front.delete(best)});orthogonalNeighbors(best,n).forEach(function(next){if(map[next]<0)frontiers[rid].add(next)})
      }
      if(!left&&starCounts.every(function(count){return count===2})&&validRegionMap(map,n))return relabelRegions(map,n,rng)
    }
    return null
  }

  function buildContext(map,n){
    if(!validRegionMap(map,n))return null;var units=[],unitMeta=[];
    for(var r=0;r<n;r++){units.push(range(n).map(function(c){return r*n+c}));unitMeta.push({type:'row',index:r})}
    for(var c=0;c<n;c++){units.push(range(n).map(function(r){return r*n+c}));unitMeta.push({type:'col',index:c})}
    for(var rid=0;rid<n;rid++){var cells=[];for(var i=0;i<n*n;i++)if(map[i]===rid)cells.push(i);units.push(cells);unitMeta.push({type:'region',index:rid})}
    var cellUnits=Array.from({length:n*n},function(){return[]});units.forEach(function(unit,unitIndex){unit.forEach(function(i){cellUnits[i].push(unitIndex)})});
    return{units:units,unitMeta:unitMeta,cellUnits:cellUnits,neighbors:range(n*n).map(function(i){return touchingNeighbors(i,n)})}
  }

  function propagate(state,context,stats){
    while(true){
      var assignments=new Map(),conflict=false;
      function queue(i,value){if(state[i]&&state[i]!==value){conflict=true;return}if(assignments.has(i)&&assignments.get(i)!==value){conflict=true;return}if(!state[i])assignments.set(i,value)}
      for(var i=0;i<state.length;i++)if(state[i]===2){var near=context.neighbors[i];for(var p=0;p<near.length;p++){if(state[near[p]]===2)return false;queue(near[p],1)}}
      for(var u=0;u<context.units.length;u++){
        var unit=context.units[u],stars=0,open=[];for(var j=0;j<unit.length;j++){var value=state[unit[j]];if(value===2)stars++;else if(value===0)open.push(unit[j])}
        if(stars>2||stars+open.length<2)return false;
        if(stars===2)open.forEach(function(cell){queue(cell,1)});else if(stars+open.length===2)open.forEach(function(cell){queue(cell,2)});
        if(conflict)return false
      }
      if(!assignments.size)return true;assignments.forEach(function(value,cell){state[cell]=value;if(stats)stats.forced++})
    }
  }

  function traceContradiction(map,n,initial,maxEvents){
    var context=buildContext(map,n),state=Array.isArray(initial)&&initial.length===n*n?initial.slice():Array(n*n).fill(0),events=[],limit=maxEvents||160;if(!context)return{contradiction:true,events:events,state:state,conflict:{rule:'invalid-board',state:state.slice()}};
    function finish(event){event.state=state.slice();events.push(event);return{contradiction:true,events:events,state:state,conflict:event}}
    while(events.length<limit){
      var stars=[];for(var i=0;i<state.length;i++)if(state[i]===2)stars.push(i);
      for(var a=0;a<stars.length;a++)for(var b=a+1;b<stars.length;b++)if(touches(stars[a],stars[b],n))return finish({kind:'conflict',rule:'touching',cells:[stars[a],stars[b]],area:[stars[a],stars[b]],targets:[stars[a],stars[b]]});
      for(var u=0;u<context.units.length;u++){
        var unit=context.units[u],unitStars=unit.filter(function(cell){return state[cell]===2}),open=unit.filter(function(cell){return state[cell]===0});
        if(unitStars.length>2)return finish({kind:'conflict',rule:'too-many',unitIndex:u,cells:unitStars.slice(),area:unit.slice(),targets:unitStars.slice(),stars:unitStars.length,open:open.length});
        if(unitStars.length+open.length<2)return finish({kind:'conflict',rule:'too-few',unitIndex:u,cells:unitStars.concat(open),area:unit.slice(),targets:unitStars.concat(open),stars:unitStars.length,open:open.length});
        if(unitStars.length<2&&unitStars.length+open.length>=2){var placements=legalUnitCombinations(unit,state,2-unitStars.length,n);if(!placements.combinations.length)return finish({kind:'conflict',rule:'no-placement',unitIndex:u,cells:open.slice(),area:unit.slice(),targets:open.slice(),stars:unitStars.length,open:open.length,need:2-unitStars.length})}
      }
      var changed=false;
      for(i=0;i<stars.length&&!changed;i++){
        var star=stars[i],near=context.neighbors[star].filter(function(cell){return state[cell]===0});if(!near.length)continue;near.forEach(function(cell){state[cell]=1});events.push({kind:'deduction',rule:'no-touch',source:[star],assigned:near.slice(),value:1,area:[star].concat(context.neighbors[star]),targets:[star].concat(near),state:state.slice()});changed=true
      }
      if(changed)continue;
      for(u=0;u<context.units.length&&!changed;u++){
        unit=context.units[u];unitStars=unit.filter(function(cell){return state[cell]===2});open=unit.filter(function(cell){return state[cell]===0});
        if(unitStars.length===2&&open.length){open.forEach(function(cell){state[cell]=1});events.push({kind:'deduction',rule:'unit-full',unitIndex:u,source:unitStars.slice(),assigned:open.slice(),value:1,area:unit.slice(),targets:unitStars.concat(open),state:state.slice()});changed=true}
        else if(unitStars.length<2&&unitStars.length+open.length===2&&open.length){open.forEach(function(cell){state[cell]=2});events.push({kind:'deduction',rule:'unit-fill',unitIndex:u,source:unitStars.slice(),assigned:open.slice(),value:2,area:unit.slice(),targets:unitStars.concat(open),state:state.slice()});changed=true}
      }
      if(!changed)return{contradiction:false,events:events,state:state,stalled:true}
    }
    return{contradiction:false,events:events,state:state,truncated:true}
  }

  function branchChoice(state,context,n){
    var best=null;for(var u=0;u<context.units.length;u++){var unit=context.units[u],stars=unit.reduce(function(total,i){return total+(state[i]===2?1:0)},0),need=2-stars;if(need<=0)continue;var data=legalUnitCombinations(unit,state,need,n);if(!data.combinations.length)return null;if(!best||data.combinations.length<best.combinations.length)best={unitIndex:u,open:data.open,combinations:data.combinations}}
    return best
  }

  function contradictionPath(map,n,initial,nodeLimit){
    var context=buildContext(map,n),nodes=0,limit=nodeLimit||12000;
    function walk(input,depth){
      if(++nodes>limit)return null;var traced=traceContradiction(map,n,input,160);if(traced.contradiction)return traced.events;if(traced.truncated||traced.state.every(Boolean))return null;var branch=branchChoice(traced.state,context,n);if(!branch)return null;
      for(var c=0;c<branch.combinations.length;c++){
        var chosen=branch.combinations[c],chosenSet=new Set(chosen),next=traced.state.slice();branch.open.forEach(function(cell){next[cell]=chosenSet.has(cell)?2:1});var event={kind:'branch',rule:'branch',unitIndex:branch.unitIndex,chosen:chosen.slice(),rejected:branch.open.filter(function(cell){return!chosenSet.has(cell)}),area:context.units[branch.unitIndex].slice(),targets:branch.open.slice(),state:next.slice(),depth:depth},tail=walk(next,depth+1);if(tail)return traced.events.concat([event],tail)
      }
      return null
    }
    return{events:walk(initial,0)||[],nodes:nodes,truncated:nodes>limit}
  }

  function analyzeContradiction(map,n,initial,nodeLimit,maxBranches){
    nodeLimit=nodeLimit||160000;maxBranches=maxBranches||8;var context=buildContext(map,n),root=traceContradiction(map,n,initial,160);if(root.contradiction)return{contradiction:true,direct:true,root:root,branches:[],allBranches:0};if(root.truncated||!context)return{contradiction:false,root:root,branches:[],truncated:true};var branch=branchChoice(root.state,context,n);if(!branch)return{contradiction:false,root:root,branches:[]};
    var branches=[],allFail=true,shown=Math.min(branch.combinations.length,maxBranches);for(var c=0;c<branch.combinations.length;c++){
      var chosen=branch.combinations[c],chosenSet=new Set(chosen),next=root.state.slice();branch.open.forEach(function(cell){next[cell]=chosenSet.has(cell)?2:1});var proof=solve(map,n,1,next,nodeLimit);if(proof.truncated||proof.count){allFail=false;if(c<shown)branches.push({chosen:chosen.slice(),rejected:branch.open.filter(function(cell){return!chosenSet.has(cell)}),state:next.slice(),proof:proof,path:[]});continue}if(c<shown){var path=contradictionPath(map,n,next,Math.min(nodeLimit,18000));branches.push({chosen:chosen.slice(),rejected:branch.open.filter(function(cell){return!chosenSet.has(cell)}),state:next.slice(),proof:proof,path:path.events})}
    }
    return{contradiction:allFail,direct:false,root:root,unitIndex:branch.unitIndex,open:branch.open.slice(),allBranches:branch.combinations.length,branches:branches,truncated:branch.combinations.length>maxBranches}
  }

  function combinations(list,count,callback,start,picked){
    start=start||0;picked=picked||[];
    if(picked.length===count){callback(picked.slice());return}
    for(var i=start;i<=list.length-(count-picked.length);i++){picked.push(list[i]);combinations(list,count,callback,i+1,picked);picked.pop()}
  }

  function legalUnitCombinations(unit,state,need,n){
    var open=unit.filter(function(i){return state[i]===0}),out=[];
    combinations(open,need,function(chosen){for(var a=0;a<chosen.length;a++)for(var b=a+1;b<chosen.length;b++)if(touches(chosen[a],chosen[b],n))return;out.push(chosen)});
    return{open:open,combinations:out}
  }

  function solve(map,n,limit,initial,nodeLimit){
    limit=limit||2;nodeLimit=nodeLimit||400000;var context=buildContext(map,n);
    if(!context)return{count:0,solution:null,nodes:0,branches:0,maxDepth:0,forced:0,truncated:false};
    var count=0,first=null,stats={nodes:0,branches:0,maxDepth:0,forced:0,truncated:false};
    function dfs(input,depth){
      if(count>=limit||stats.truncated)return;if(++stats.nodes>nodeLimit){stats.truncated=true;return}stats.maxDepth=Math.max(stats.maxDepth,depth);
      var state=input.slice();if(!propagate(state,context,stats))return;
      if(state.every(Boolean)){count++;if(!first)first=state.slice();return}
      var best=null;
      for(var u=0;u<context.units.length;u++){
        var unit=context.units[u],stars=unit.reduce(function(total,i){return total+(state[i]===2?1:0)},0),need=2-stars;if(need<=0)continue;
        var data=legalUnitCombinations(unit,state,need,n);if(!data.combinations.length)return;
        if(!best||data.combinations.length<best.combinations.length)best={unit:unit,open:data.open,combinations:data.combinations};
      }
      if(!best)return;stats.branches++;
      for(var k=0;k<best.combinations.length;k++){
        var chosen=new Set(best.combinations[k]),next=state.slice();best.open.forEach(function(i){next[i]=chosen.has(i)?2:1});dfs(next,depth+1);if(count>=limit||stats.truncated)return
      }
    }
    var start=Array.isArray(initial)&&initial.length===n*n?initial.slice():Array(n*n).fill(0);dfs(start,0);
    return{count:count,solution:first,nodes:stats.nodes,branches:stats.branches,maxDepth:stats.maxDepth,forced:stats.forced,truncated:stats.truncated}
  }

  function solutionState(solution,n){var state=Array(n*n).fill(1);for(var r=0;r<n;r++)solution[r].forEach(function(c){state[r*n+c]=2});return state}
  function regionProfile(map,n){
    var sizes=Array(n).fill(0),options=Array(n).fill(0),cells=Array.from({length:n},function(){return[]});
    map.forEach(function(rid,i){sizes[rid]++;cells[rid].push(i)});
    for(var rid=0;rid<n;rid++)for(var a=0;a<cells[rid].length;a++)for(var b=a+1;b<cells[rid].length;b++)if(!touches(cells[rid][a],cells[rid][b],n))options[rid]++;
    var forcedIds=[],tightIds=[];for(rid=0;rid<n;rid++){if(options[rid]===1)forcedIds.push(rid);if(options[rid]<=3)tightIds.push(rid)}
    return{sizes:sizes,options:options,forcedIds:forcedIds,tightIds:tightIds,forcedRegions:forcedIds.length,tightRegions:tightIds.length,tinyRegions:sizes.filter(function(size){return size<=3}).length,averageOptions:options.reduce(function(a,b){return a+b},0)/n}
  }
  function solverEffort(result){return Math.log2(result.nodes+1)*18+result.maxDepth*13+Math.log2(result.branches+1)*9}
  function candidateScore(result,map,n){var boundary=boundarySignature(map,n).reduce(function(a,b){return a+b},0),profile=regionProfile(map,n);return solverEffort(result)+profile.averageOptions*1.5+boundary/(n*n)-profile.forcedRegions*110-profile.tightRegions*12}
  function evolutionValue(result,profile,n,rank){
    var forcedAllowance=[Math.max(2,Math.ceil(n/4)),0,0,0,0][rank],tightAllowance=[Math.ceil(n*.75),Math.ceil(n*.42),Math.ceil(n*.22),Math.ceil(n*.1),0][rank],forcedExcess=Math.max(0,profile.forcedRegions-forcedAllowance),tightExcess=Math.max(0,profile.tightRegions-tightAllowance),weights=[.12,.36,.72,1.12,1.65];
    return solverEffort(result)*weights[rank]+profile.averageOptions*(2+rank)-forcedExcess*2200-tightExcess*180-profile.tinyRegions*90
  }
  function connectedAfterMove(map,n,cell,from,to){
    var trial=map.slice();trial[cell]=to;var first=trial.indexOf(from);if(first<0)return null;var seen=new Set([first]),stack=[first];while(stack.length){var at=stack.pop();orthogonalNeighbors(at,n).forEach(function(next){if(trial[next]===from&&!seen.has(next)){seen.add(next);stack.push(next)}})}
    return seen.size===trial.filter(function(rid){return rid===from}).length?trial:null
  }
  function mutationMoves(map,state,n,profile,rng){
    var moves=[],forced=new Set(profile.forcedIds),tight=new Set(profile.tightIds),seen=new Set();
    for(var cell=0;cell<map.length;cell++){
      if(state[cell]===2)continue;var from=map[cell];if(profile.sizes[from]<=3)continue;
      var destinations=Array.from(new Set(orthogonalNeighbors(cell,n).map(function(next){return map[next]}).filter(function(rid){return rid!==from})));
      for(var d=0;d<destinations.length;d++){
        var to=destinations[d],key=cell+':'+to;if(seen.has(key))continue;seen.add(key);var trial=connectedAfterMove(map,n,cell,from,to);if(!trial)continue;
        var priority=(forced.has(to)?5000:0)+(tight.has(to)?700:0)-(forced.has(from)?1400:0)+(profile.sizes[from]-profile.sizes[to])*16+rng()*90;moves.push({map:trial,priority:priority})
      }
    }
    moves.sort(function(a,b){return b.priority-a.priority});return moves
  }
  function evolveLayout(map,state,n,rng,rank,initialResult){
    rank=Math.max(0,Math.min(4,rank|0));var current={map:map.slice(),result:initialResult,profile:regionProfile(map,n)},accepted=0,trials=0,rounds=(n>=13?[7,16,20,22,24]:[Math.max(5,Math.ceil(n*.65)),n+4,Math.min(18,n+7),Math.min(21,n+9),Math.min(24,n+12)])[rank],probeLimit=(n>=13?[2,2,2,3,3]:[2,3,3,3,3])[rank],mutationNodeLimit=(n>=13?[500,800,1200,1800,2600]:[350,550,800,1100,1600])[rank];current.value=evolutionValue(current.result,current.profile,n,rank);var best=current;
    for(var round=0;round<rounds;round++){
      var moves=mutationMoves(current.map,state,n,current.profile,rng);if(!moves.length)break;var roundBest=null,probes=Math.min(probeLimit,moves.length);
      for(var p=0;p<probes;p++){
        var choice=p<Math.ceil(probes*.7)?p:randomInt(Math.min(moves.length,Math.max(probes,18)),rng),nextMap=moves[choice].map,nextProfile=regionProfile(nextMap,n),nextResult=solve(nextMap,n,2,null,mutationNodeLimit);trials++;
        if(nextResult.truncated||nextResult.count!==1)continue;var value=evolutionValue(nextResult,nextProfile,n,rank),entry={map:nextMap,result:nextResult,profile:nextProfile,value:value};if(!roundBest||entry.value>roundBest.value)roundBest=entry
      }
      if(!roundBest)continue;
      var plateau=roundBest.value>=current.value-.01,explore=rank>=2&&rng()<.035;if(plateau||explore){current=roundBest;accepted++;if(current.value>best.value)best=current}
    }
    return{map:best.map,result:best.result,profile:best.profile,accepted:accepted,trials:trials}
  }
  function transformBoard(map,state,n,rng){
    rng=rng||Math.random;var mirror=rng()<.5,turns=randomInt(4,rng),nextMap=Array(n*n),nextState=Array(n*n);
    function point(r,c){if(mirror)c=n-1-c;for(var t=0;t<turns;t++){var old=r;r=c;c=n-1-old}return[r,c]}
    for(var r=0;r<n;r++)for(var c=0;c<n;c++){var p=point(r,c),to=p[0]*n+p[1],from=r*n+c;nextMap[to]=map[from];nextState[to]=state[from]}
    return{map:relabelRegions(nextMap,n,rng),state:nextState}
  }
  function makeCandidate(n,rng,irregularity,anchorTarget,difficultyRank){
    rng=rng||Math.random;var verifiedSeed=VERIFIED_START_SEEDS[n]&&VERIFIED_START_SEEDS[n][anchorTarget],startRng=verifiedSeed==null?rng:seededRandom(verifiedSeed),anchored=anchorTarget?makeAnchoredLayout(n,startRng,anchorTarget):null,map=anchorTarget?(anchored&&anchored.map):makeRandomLayout(n,rng,irregularity);if(!map)return null;
    var result=solve(map,n,2,null,500000);if(result.truncated||result.count!==1)return null;
    var rank=difficultyRank==null?2:Math.max(0,Math.min(4,difficultyRank|0)),evolved=evolveLayout(map,result.solution,n,rng,rank,result),tightCaps=[n,n,Math.ceil(n*.45),Math.ceil(n*.3),Math.ceil(n*.22)];if(rank>0&&evolved.profile.forcedRegions||rank>=2&&evolved.profile.tightRegions>tightCaps[rank])return null;map=evolved.map;result=evolved.result;
    var transformed=transformBoard(map,result.solution,n,rng),verified=Object.assign({},result,{solution:transformed.state,evolutionAccepted:evolved.accepted,evolutionTrials:evolved.trials}),profile=regionProfile(transformed.map,n);return{map:transformed.map,solution:transformed.state,solutionPairs:stateToPairs(transformed.state,n),score:candidateScore(verified,transformed.map,n),stats:verified,profile:profile}
  }
  function stateToPairs(state,n){var out=[];for(var r=0;r<n;r++){var pair=[];for(var c=0;c<n;c++)if(state[r*n+c]===2)pair.push(c);out.push(pair)}return out}
  function boundarySignature(map,n){var out=[];for(var r=0;r<n;r++)for(var c=0;c<n-1;c++){var i=r*n+c;out.push(map[i]===map[i+1]?0:1)}for(c=0;c<n;c++)for(r=0;r<n-1;r++){i=r*n+c;out.push(map[i]===map[i+n]?0:1)}return out}
  function hamming(a,b){var length=Math.min(a.length,b.length),difference=Math.abs(a.length-b.length);for(var i=0;i<length;i++)if(a[i]!==b[i])difference++;return difference}
  function record(candidate,n){var boundary=boundarySignature(candidate.map,n),stars=candidate.solution.map(function(v){return v===2?1:0});return{boundary:boundary,stars:stars,signature:boundary.join('')+'|'+stars.join('')}}
  function distance(a,b){return{boundary:hamming(a.boundary,b.boundary),stars:hamming(a.stars,b.stars)}}

  return{
    MIN_SIZE:8,MAX_SIZE:15,BASE_SOLUTIONS:BASE_SOLUTIONS,VERIFIED_START_SEEDS:VERIFIED_START_SEEDS,seededRandom:seededRandom,shuffle:shuffle,orthogonalNeighbors:orthogonalNeighbors,touchingNeighbors:touchingNeighbors,touches:touches,
    validSolution:validSolution,makeSolution:makeSolution,validRegionMap:validRegionMap,makeRegions:makeRegions,makeRandomLayout:makeRandomLayout,makeAnchoredLayout:makeAnchoredLayout,buildContext:buildContext,propagate:propagate,
    legalUnitCombinations:legalUnitCombinations,solve:solve,traceContradiction:traceContradiction,contradictionPath:contradictionPath,analyzeContradiction:analyzeContradiction,makeCandidate:makeCandidate,stateToPairs:stateToPairs,solutionState:solutionState,regionProfile:regionProfile,evolveLayout:evolveLayout,
    boundarySignature:boundarySignature,record:record,distance:distance,hamming:hamming
  };
});
