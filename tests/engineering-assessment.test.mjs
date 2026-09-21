import test from 'node:test'
import assert from 'node:assert/strict'
import { assess, candidateLevel, copyResults } from '../docs/.vitepress/theme/components/engineering-assessment/scoring.mjs'
import { questions } from '../docs/.vitepress/theme/components/engineering-assessment/data.mjs'
const answers = (base, changes = {}) => Object.fromEntries(questions.map(q => [q.id, changes[q.number] ?? base]))
const run = (base, changes) => assess(answers(base, changes), 'team')
for (const [name, base, changes, total, profile] of [
  ['all A', 'A', {}, 0, 1], ['all B', 'B', {}, 10, 2], ['all C', 'C', {}, 20, 3], ['all D', 'D', {}, 30, 4],
  ['weak verification and controls', 'D', {5:'A',8:'A'},24,2], ['weak ownership','D',{7:'B'},28,2],
  ['localized adoption','D',{1:'B'},28,2], ['missing context','D',{4:'A'},27,3], ['workflow not default','D',{3:'C'},29,3],
  ['top threshold','C',{1:'D',2:'D',3:'D',4:'D'},24,4], ['below threshold','C',{1:'D',2:'D',3:'D'},23,3],
]) test(name, () => { const r=run(base,changes); assert.equal(r.total,total); assert.equal(r.profile,profile); assert.ok(r.recommendationIds.length<=2); assert.equal(new Set(r.recommendationIds).size,r.recommendationIds.length) })
test('raw band boundaries', () => { for (const [total, level] of [[7,1],[8,2],[15,2],[16,3],[23,3],[24,4]]) assert.equal(candidateLevel(total),level) })
test('incomplete and invalid input cannot create results', () => {
 for (const [a,s,count] of [[{},'',0],[answers('D'),'',10],[{...answers('D'),q10_impact:undefined},'team',9],[answers('D'),'invalid',10],[answers('X'),'team',0]]) {
 const r=assess(a,s); assert.equal(r.status,'incomplete'); assert.equal(r.answeredCount,count); assert.equal(r.total,undefined)
 }
})
test('unknown is complete but suppresses score and affected dimensions', () => {
 const r=run('D',{10:'U'}); assert.equal(r.status,'visibility_gaps'); assert.equal(r.answeredCount,10); assert.equal(r.total,undefined); assert.equal(r.profile,undefined)
 assert.deepEqual(r.dimensions.map(d=>d.score),[9,9,9,null]); assert.deepEqual(r.unknownIds,['q10_impact'])
 const all=run('U'); assert.ok(all.dimensions.every(d=>d.score===null)); assert.equal(all.unknownIds.length,10)
})
test('requirements and recommendation priorities are deterministic', () => {
 const r=run('D',{5:'A',8:'A'}); assert.deepEqual(r.limitingQuestionIds,['q5_verification','q8_controls']); assert.deepEqual(r.recommendationIds,r.limitingQuestionIds)
 assert.deepEqual(run('A').recommendationIds,['q5_verification','q8_controls']); assert.deepEqual(run('D').recommendationIds,[])
 assert.deepEqual(assess(Object.fromEntries(Object.entries(answers('C')).reverse()),'team'),run('C'))
 const gate=run('D',{7:'B',10:'A'}); assert.equal(gate.recommendationIds[0],'q7_ownership')
})
test('copy uses final profile, unknown labels, all selected answers and optional text', () => {
 const a=answers('D',{7:'B'}), result=assess(a,'team')
 const text=copyResults({result,answers:a,scope:'team',scopeName:'<Payments>',priority:'Custom priority',workflow:'Test a change',date:'21/09/2026'})
 assert.match(text,/Profile: Local acceleration/); assert.match(text,/28 \/ 30/); assert.match(text,/Assessment version: 2.0/); assert.match(text,/<Payments>/); assert.match(text,/Custom priority/); assert.match(text,/Q10\./); assert.match(text,/Unmet profile requirements/)
 const unknown=copyResults({result:run('U'),answers:answers('U'),scope:'team',date:'today'})
 assert.match(unknown,/visibility gaps/); assert.match(unknown,/Not enough information/); assert.doesNotMatch(unknown,/Self-assessment score:|Profile:/)
})
