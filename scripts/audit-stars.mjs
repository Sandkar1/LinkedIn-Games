import {createRequire} from 'node:module';
import assert from 'node:assert/strict';

const require=createRequire(import.meta.url);
const core=require('../assets/stars-core.js');
const report=[];

for(const [size,seeds] of Object.entries(core.VERIFIED_START_SEEDS))for(const [anchor,seed] of Object.entries(seeds)){
  const start=core.makeAnchoredLayout(Number(size),core.seededRandom(seed),Number(anchor));
  assert.ok(start,`missing verified ${size}×${size} start for ${anchor} anchors`);
  const proof=core.solve(start.map,Number(size),2,null,500000);
  assert.equal(proof.truncated,false,'verified start proof was truncated');
  assert.equal(proof.count,1,`verified ${size}×${size} start was not unique`);
}

function validateSolution(candidate,size){
  const stars=[];
  candidate.solution.forEach((value,index)=>{if(value===2)stars.push(index)});
  assert.equal(stars.length,size*2,'wrong total star count');
  for(let row=0;row<size;row++)assert.equal(stars.filter(i=>Math.floor(i/size)===row).length,2,'wrong row quota');
  for(let col=0;col<size;col++)assert.equal(stars.filter(i=>i%size===col).length,2,'wrong column quota');
  for(let region=0;region<size;region++)assert.equal(stars.filter(i=>candidate.map[i]===region).length,2,'wrong region quota');
  for(let a=0;a<stars.length;a++)for(let b=a+1;b<stars.length;b++)assert.equal(core.touches(stars[a],stars[b],size),false,'two stars touch');
}

for(let size=core.MIN_SIZE;size<=core.MAX_SIZE;size++){
  const started=Date.now(),candidates=[],signatures=new Set(),solutionSignatures=new Set();
  for(let attempt=0;attempt<8000&&candidates.length<6;attempt++){
    const candidate=core.makeCandidate(size,Math.random,.72,size-1,2);
    if(!candidate)continue;
    const record=core.record(candidate,size);
    if(signatures.has(record.signature))continue;
    assert.equal(core.validRegionMap(candidate.map,size),true,'regions must be connected');
    const solved=core.solve(candidate.map,size,2,null,500000);
    assert.equal(solved.truncated,false,'uniqueness check was truncated');
    assert.equal(solved.count,1,'candidate is not unique');
    assert.equal(candidate.profile.forcedRegions,0,'hard board contains a giveaway region');
    assert.ok(candidate.profile.tightRegions<=Math.ceil(size*.45),'hard board contains too many nearly forced regions');
    validateSolution(candidate,size);
    signatures.add(record.signature);
    solutionSignatures.add(record.stars.join(''));
    candidates.push(candidate);
  }
  assert.equal(candidates.length,6,`not enough verified ${size}x${size} candidates`);
  assert.ok(solutionSignatures.size>=2,`solutions for ${size}x${size} were too similar`);
  const probe=candidates[0],assumption=Array(size*size).fill(0);assumption[0]=probe.solution[0]===2?1:2;const explanation=core.analyzeContradiction(probe.map,size,assumption,140000,12);
  assert.equal(explanation.contradiction,true,'opposite-mark hint did not prove a contradiction');
  if(!explanation.direct)explanation.branches.forEach(branch=>{assert.ok(branch.path.length,'contradiction branch has no reasoning path');assert.equal(branch.path.at(-1).kind,'conflict','reasoning path does not end at a concrete conflict')});
  report.push({size,candidates:candidates.length,solutionVariants:solutionSignatures.size,contradictionBranches:explanation.allBranches,maxForcedRegions:Math.max(...candidates.map(x=>x.profile.forcedRegions)),maxTightRegions:Math.max(...candidates.map(x=>x.profile.tightRegions)),minSolverNodes:Math.min(...candidates.map(x=>x.stats.nodes)),maxSolverNodes:Math.max(...candidates.map(x=>x.stats.nodes)),milliseconds:Date.now()-started});
}

console.log(JSON.stringify(report,null,2));
