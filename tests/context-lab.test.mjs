import test from 'node:test';
import assert from 'node:assert/strict';
import { MODELS } from '../docs/.vitepress/theme/components/context-lab/models.mjs';
import { simulate, DEFAULTS, priceRequest, normalize, STRATEGIES } from '../docs/.vitepress/theme/components/context-lab/simulation.mjs';
const m = MODELS.find(m => m.id === 'claude-sonnet-5');
const close = (a,b) => assert.ok(Math.abs(a-b) < 1e-9, `${a} != ${b}`);
test('uncached session agrees with the independent closed-form cost', () => {
  const c = DEFAULTS, n = c.turns;
  const input = n * (c.system + c.user + c.tools) + (c.user + c.tools + c.answer) * n * (n-1) / 2;
  const expected = (input * m.input + n * (c.answer + c.reasoning) * m.output) / 1e6;
  const r = simulate(m,c,'full');
  close(r.rows.at(-1).cumulative, expected);
  assert.equal(r.rows[0].input,9500);
  assert.equal(r.rows[1].input,13800);
});
test('cache writes are billed on the first call; reuse keeps identical context', () => {
  const a=simulate(m,{...DEFAULTS, hit:1},'full'), b=simulate(m,{...DEFAULTS,hit:1},'cache');
  assert.deepEqual(a.rows.map(r=>r.input),b.rows.map(r=>r.input));
  assert.equal(b.rows[0].cached,0);
  close(b.rows[0].inputCost,9500*2.5/1e6);
  assert.equal(b.rows[1].cached,9500);
  close(b.rows[1].inputCost,4300*2.5/1e6);
  assert.ok(b.rows.at(-1).cumulative < a.rows.at(-1).cumulative);
});
test('trimming loses the first constraint at call five and preserves only the system cache', () => {
  const r=simulate(m,{...DEFAULTS,hit:1},'trim').rows;
  assert.equal(r[3].retained,true); assert.equal(r[4].retained,false);
  assert.equal(r[4].cached,6000); assert.equal(r[4].input,r[10].input);
});
test('summary overhead is paid at calls 10, 16, 22 and bounded context continues', () => {
  const r=simulate(m,DEFAULTS,'summary').rows;
  assert.deepEqual(r.filter(r=>r.summaryCost>0).map(r=>r.n),[10,16,22]);
  const expected = (6000+6*4300)*2/1e6 + 1000*10/1e6;
  close(r[9].summaryCost,expected);
  assert.equal(r[9].input,23400); assert.equal(r[9].retained,true);
  assert.deepEqual(r[9].history,[7,8,9]);
  close(r.at(-1).cumulative,r.reduce((sum,r)=>sum+r.inputCost+r.cacheCost+r.outputCost+r.summaryCost,0));
});
test('an empty summary cannot preserve the requirement', () => {
  const r=simulate(m,{...DEFAULTS,summary:0},'summary').rows;
  assert.equal(r[9].retained,false);
});
test('long-context pricing applies to all categories only above the threshold', () => {
  const open=MODELS[0], a=priceRequest(open,272000,100000,1000,true), b=priceRequest(open,272001,100000,1000,true);
  assert.equal(a.long,false); assert.equal(b.long,true);
  close(b.inputCost,172001*25/1e6); close(b.cacheCost,.2); close(b.outputCost,.075);
  const google=MODELS.find(m=>m.id==='gemini-3.1-pro-preview');
  assert.equal(priceRequest(google,200000,0,100).long,false);
  assert.equal(priceRequest(google,200001,0,100).long,true);
});
test('overflow stops a run without charging a failed request', () => {
  const r=simulate({...m,limit:14000},DEFAULTS,'full');
  assert.equal(r.rows.length,1); assert.equal(r.blockedAt,2);
  const google=simulate({...m,limitKind:'input',limit:14000},DEFAULTS,'full');
  assert.equal(google.rows.length,2); assert.equal(google.blockedAt,3);
});
test('zero rates, invalid inputs, and a one-call horizon stay finite', () => {
  const free={...m,input:0,cached:0,write:0,output:0};
  assert.equal(simulate(free,DEFAULTS,'summary').rows.at(-1).cumulative,0);
  assert.equal(normalize({turns:NaN,hit:2,tools:-100}).turns,24);
  assert.equal(normalize({turns:NaN,hit:2,tools:-100}).hit,1);
  for(const s of STRATEGIES) assert.equal(simulate(m,{...DEFAULTS,turns:1},s.id).rows.length,1);
});
test('all presets and strategies have nonnegative charges and bounded cache reads', () => {
  for(const model of MODELS) for(const strategy of STRATEGIES) for(const hit of [0,.9,1]) {
    const run=simulate(model,{...DEFAULTS,turns:80,tools:20000,hit},strategy.id);
    let prev=0;
    for(const r of run.rows){assert.ok(r.cached>=0 && r.cached<=r.input);assert.ok(Number.isFinite(r.cost));assert.ok(r.cumulative>=prev);prev=r.cumulative;}
  }
});
