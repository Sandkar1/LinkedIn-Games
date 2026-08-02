import {createRequire} from 'node:module';
import assert from 'node:assert/strict';

const require=createRequire(import.meta.url);
const core=require('../assets/stars-core.js');
const report=[];

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
    const candidate=core.makeCandidate(size,Math.random,.72,size-1);
    if(!candidate)continue;
    const record=core.record(candidate,size);
    if(signatures.has(record.signature))continue;
    assert.equal(core.validRegionMap(candidate.map,size),true,'regions must be connected');
    const solved=core.solve(candidate.map,size,2,null,500000);
    assert.equal(solved.truncated,false,'uniqueness check was truncated');
    assert.equal(solved.count,1,'candidate is not unique');
    validateSolution(candidate,size);
    signatures.add(record.signature);
    solutionSignatures.add(record.stars.join(''));
    candidates.push(candidate);
  }
  assert.equal(candidates.length,6,`not enough verified ${size}x${size} candidates`);
  assert.ok(solutionSignatures.size>=2,`solutions for ${size}x${size} were too similar`);
  report.push({size,candidates:candidates.length,solutionVariants:solutionSignatures.size,minSolverNodes:Math.min(...candidates.map(x=>x.stats.nodes)),maxSolverNodes:Math.max(...candidates.map(x=>x.stats.nodes)),milliseconds:Date.now()-started});
}

console.log(JSON.stringify(report,null,2));
