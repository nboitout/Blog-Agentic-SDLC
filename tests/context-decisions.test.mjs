import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { initialState, inspect, transition as act, handoverMarkdown } from '../docs/.vitepress/theme/components/context-decisions/simulation.mjs';
import { questions } from '../docs/.vitepress/theme/components/context-decisions/quiz.mjs';

test('smaller context can still be wrong; neither exclusion nor compaction refreshes', () => {
  const start = initialState();
  const excluded = act(start, 'exclude', 'log');
  assert.ok(inspect(excluded).tokens < inspect(start).tokens);
  assert.deepEqual(inspect(excluded).stale, inspect(start).stale);
  const compacted = act(excluded, 'compact');
  assert.ok(inspect(compacted).tokens < inspect(excluded).tokens);
  assert.equal(compacted.loaded.spec.revision, 1);
  assert.equal(compacted.loaded.summary.order, 'amount');
  assert.equal(act(compacted, 'preview').preview.status, 'failed');
  assert.equal(start.history.length, 0, 'transitions do not mutate the previous state');
  assert.equal(compacted.loaded.log.content, start.loaded.log.content, 'exclusion retains source');
});

test('partial current evidence exposes conflict without silently choosing a winner', () => {
  let state = act(initialState(), 'load', 'code');
  assert.equal(inspect(state).conflict, true);
  state = act(state, 'investigate');
  assert.equal(state.decision, null);
  assert.equal(act(state, 'preview').preview.status, 'unresolved');
  state = act(state, 'refresh', 'spec');
  assert.equal(inspect(state).conflict, true, 'refresh does not fix the old note');
  state = act(state, 'investigate');
  assert.deepEqual(state.decision.evidence, ['spec', 'code']);
  assert.equal(state.loaded.note.superseded, true);
  assert.equal(act(state, 'preview').preview.status, 'accepted');
  assert.equal(state.history[2].previousSnapshots.spec.revision, 1, 'old snapshot retained in audit');
});

test('tests can support the decision too; action order is not a secret solution', () => {
  let state = act(initialState(), 'compact');
  state = act(state, 'refresh', 'spec');
  state = act(state, 'load', 'tests');
  state = act(state, 'investigate');
  assert.equal(state.loaded.summary.superseded, true);
  state = act(state, 'preview');
  assert.equal(state.preview.checks.bothInvalid, 'simulated pass');
  assert.equal(state.preview.checks.signatures, 'not executed');
  assert.equal(state.preview.checks.returns, 'not executed');
  state = act(state, 'compact');
  assert.equal(inspect(state).conflict, false, 'compaction must not resurrect a superseded claim');
  assert.equal(act(state, 'preview').preview.status, 'accepted');
});

test('a handover preserves uncertainty and simulated status, not implicit loaded files', () => {
  let state = act(initialState(), 'preview');
  state = act(state, 'save');
  assert.match(handoverMarkdown(state.handover), /Simulated both-invalid check failed/);
  state = act(state, 'resume');
  assert.deepEqual(Object.keys(state.loaded), ['task', 'handover']);
  assert.ok(state.refreshNeeded.includes('spec'));
  assert.equal(state.preview, null);
  assert.equal(state.decision, null);
  assert.ok(state.handover.uncertainties.length);
  state = act(state, 'load', 'code');
  assert.equal(inspect(state).conflict, true, 'retained old claim still conflicts');
  state = act(state, 'load', 'spec');
  state = act(state, 'investigate');
  assert.equal(act(state, 'preview').preview.status, 'accepted');
});

test('resuming a justified handover still needs explicit evidence and renewed investigation', () => {
  let state = act(act(initialState(), 'refresh', 'spec'), 'load', 'tests');
  state = act(act(act(state, 'investigate'), 'preview'), 'save');
  const bare = act(state, 'resume');
  assert.equal(act(bare, 'preview').preview.status, 'unresolved');
  const explicit = act(state, 'resume', null, ['spec', 'code']);
  assert.equal(explicit.loaded.code.revision, 2);
  assert.equal(act(explicit, 'preview').preview.status, 'unresolved');
  assert.equal(act(act(explicit, 'investigate'), 'preview').preview.status, 'accepted');
});

test('compaction and handover retain failed attempts without calling them current verification', () => {
  let state = act(initialState(), 'preview');
  state = act(state, 'load', 'code');
  state = act(state, 'compact');
  assert.match(state.loaded.summary.content, /Prior simulated amount-first check failed/);
  state = act(state, 'save');
  assert.match(state.handover.verification, /No current-context check/);
  assert.match(state.handover.verification, /Historical simulation/);
  assert.match(state.handover.verification, /check failed/);
});

test('repeat actions, excluded evidence, and reset remain coherent', () => {
  let state = initialState();
  state = act(act(state, 'refresh', 'spec'), 'load', 'code');
  state = act(act(state, 'investigate'), 'preview');
  state = act(state, 'exclude', 'spec');
  assert.equal(state.preview, null);
  assert.equal(state.decision, null);
  assert.equal(act(state, 'preview').preview.status, 'unresolved');
  state = act(act(state, 'load', 'spec'), 'load', 'spec');
  state = act(act(state, 'compact'), 'compact');
  assert.equal(act(act(state, 'investigate'), 'preview').preview.status, 'accepted');
  assert.deepEqual(act(state, 'reset'), initialState());
  assert.equal(act(initialState(), 'resume').handover, null);
});

test('quiz has the required answers and feedback for every selectable choice', () => {
  assert.deepEqual(questions.map(q => q.correct), ['B', 'C', 'D', 'A', 'B']);
  for (const q of questions) {
    assert.deepEqual(Object.keys(q.options), ['A', 'B', 'C', 'D']);
    for (const key of Object.keys(q.options)) assert.ok(q.feedback[key].length > 20);
  }
});

test('fixture contract and tests contain the simulation counterexample', () => {
  const root = new URL('../docs/public/downloads/context-engineering/', import.meta.url);
  const implementation = readFileSync(new URL('src/entries.mjs', root), 'utf8');
  assert.ok(implementation.indexOf('Reference is required') < implementation.indexOf('Amount must be positive'));
  const tests = readFileSync(new URL('tests/validation.test.mjs', root), 'utf8');
  assert.match(tests, /reference: '', amount/);
  assert.match(tests, /Reference is required/);
});
