import assert from 'node:assert/strict';
import {createRequire} from 'node:module';

const require=createRequire(import.meta.url);
const core=require('../assets/stars-core.js');
const random=core.seededRandom(0x51a7f00d);
const report=[];

function shuffled(list){
  list=list.slice();
  for(let i=list.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[list[i],list[j]]=[list[j],list[i]]}
  return list;
}

function autoBlocked(state,context,size){
  const blocked=new Set();
  for(let i=0;i<state.length;i++)if(state[i]===2)core.touchingNeighbors(i,size).forEach(next=>{if(state[next]!==2)blocked.add(next)});
  context.units.forEach(unit=>{if(unit.filter(i=>state[i]===2).length===2)unit.forEach(i=>{if(state[i]!==2)blocked.add(i)})});
  return blocked;
}

function effectiveState(raw,context,size,autoXs){
  const state=raw.slice();
  if(autoXs)autoBlocked(raw,context,size).forEach(i=>{if(!state[i])state[i]=1});
  return state;
}

function concreteConflict(events){return events.length>0&&events.at(-1).kind==='conflict'}

function completeAnalysis(analysis){
  if(!analysis?.contradiction)return false;
  if(analysis.direct)return analysis.root?.contradiction===true&&concreteConflict(analysis.root.events||[]);
  return !analysis.truncated&&analysis.allBranches===analysis.branches.length&&analysis.branches.every(branch=>branch.proof&&!branch.proof.truncated&&branch.proof.count===0&&concreteConflict(branch.path||[]));
}

function findProof(map,size,base,solution,targets){
  for(const target of targets){
    const state=base.slice();state[target]=solution[target]===2?1:2;
    const traced=core.traceContradiction(map,size,state,size*size*3);
    if(traced.contradiction&&concreteConflict(traced.events))return{target,direct:true};
  }
  for(const target of targets){
    const state=base.slice();state[target]=solution[target]===2?1:2;
    const analysis=core.analyzeContradiction(map,size,state,400000,32);
    if(completeAnalysis(analysis))return{target,direct:false,branches:analysis.allBranches};
  }
  return null;
}

for(let size=core.MIN_SIZE;size<=core.MAX_SIZE;size++){
  let states=0,direct=0,branched=0,wrongDirect=0,wrongBranched=0,maxBranches=0;
  for(let rank=0;rank<=4;rank++){
    let candidate=null;const anchorTarget=Math.max(size===15?11:3,size-1-rank);
    for(let attempt=0;attempt<300&&!candidate;attempt++)candidate=core.makeCandidate(size,random,.55+rank*.08,anchorTarget,rank);
    assert.ok(candidate,`Could not generate ${size}x${size} difficulty ${rank} hint audit board`);
    const context=core.buildContext(candidate.map,size),solution=candidate.solution;
    for(const autoXs of [false,true])for(const fill of [0,.04,.12,.25,.45,.7,.9])for(let sample=0;sample<2;sample++){
      const raw=Array(size*size).fill(0);
      for(let i=0;i<raw.length;i++)if(random()<fill)raw[i]=solution[i];
      const base=effectiveState(raw,context,size,autoXs),targets=shuffled(base.map((value,index)=>value===0?index:-1).filter(index=>index>=0));
      if(targets.length){
        const proof=findProof(candidate.map,size,base,solution,targets);
        assert.ok(proof,`${size}x${size} difficulty ${rank} had no complete proof at fill ${fill}, autoXs=${autoXs}`);
        assert.equal(base[proof.target],0,'proof targeted a resolved tile');
        proof.direct?direct++:branched++;maxBranches=Math.max(maxBranches,proof.branches||0);
      }
      const wrongTargets=shuffled(solution.map((value,index)=>({value,index}))).slice(0,Math.min(3,size));
      const wrongRaw=raw.slice();wrongTargets.forEach(({value,index})=>{wrongRaw[index]=value===2?1:2});
      const wrong=wrongTargets[0].index,isolated=wrongRaw.map((value,index)=>value===solution[index]?value:0);isolated[wrong]=wrongRaw[wrong];
      const wrongProof=findProof(candidate.map,size,isolated,solution,[wrong]);
      assert.ok(wrongProof,`${size}x${size} difficulty ${rank} could not isolate and prove a wrong mark`);
      wrongProof.direct?wrongDirect++:wrongBranched++;maxBranches=Math.max(maxBranches,wrongProof.branches||0);
      states++;
    }
  }
  report.push({size,difficulties:5,states,direct,branched,wrongDirect,wrongBranched,maxBranches});
}

console.log(JSON.stringify(report,null,2));
