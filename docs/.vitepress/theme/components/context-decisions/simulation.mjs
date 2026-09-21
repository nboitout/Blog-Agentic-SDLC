// Deterministic teaching rules. No model calls or inferred reliability score.
export const COMPONENTS = ['Rules and constraints', 'Task and acceptance criteria', 'Evidence', 'Working state', 'Tools and reusable procedures'];
export const CAPACITY = 4000;
const source = (id, title, category, origin, revision, content, order = null) =>
  ({ id, title, category, origin, revision, content, order, scope: 'validation fixture' });
export const SOURCES = [
  source('task', 'Refactoring task', COMPONENTS[1], 'task-brief.md · exercise assignment', 1,
    'Extract duplicated validation in submitPayment and previewPayment. Preserve signatures, exact errors, successful returns, and check order. Allowed: entries.mjs, a helper, targeted tests. Decision: which validation runs first?'),
  source('spec', 'Approved specification', COMPONENTS[2], 'specification.md · fixture owner approval', 2,
    'Approved revision 2 supersedes revision 1. Check empty reference first: Reference is required. Then amount <= 0: Amount must be positive. Both-invalid input must report Reference is required.', 'reference'),
  source('code', 'Current implementation', COMPONENTS[2], 'src/entries.mjs · excerpt from both functions', 2,
    "submitPayment({ reference, amount }) and previewPayment({ reference, amount }) both use:\nif (!reference) throw new Error('Reference is required');\nif (amount <= 0) throw new Error('Amount must be positive');\nSuccess returns { reference, amount, status }.", 'reference'),
  source('tests', 'Current tests', COMPONENTS[2], 'tests/validation.test.mjs · assertion excerpt', 2,
    "For both entry points: assert.throws(() => fn({ reference: '', amount: 0 }), { message: 'Reference is required' });\nAlso checks signature arity, individual errors, and successful caller results. Reading this file is not executing it.", 'reference'),
  source('note', 'Prior session note', COMPONENTS[3], 'illustrative prior session · unverified', 1,
    'I think amount should be validated first, following specification revision 1. I have not checked the current implementation, approved contract, or tests. Next session should extract a helper with amount validation first. No commands were run.', 'amount'),
  source('log', 'Unrelated build log', COMPONENTS[2], 'illustrative image pipeline log · unrelated task', 1,
    Array.from({ length: 24 }, (_, i) => `Image batch ${i + 1}: thumbnail rendered; no payment validation information.`).join('\n')),
  source('rules', 'Repository instructions', COMPONENTS[0], 'repository-instructions.md · fixture maintainer', 1,
    'Preserve the public contract. No dependencies or services. Report uncertainty and actual verification evidence. Instructions do not enforce write restrictions.'),
  source('tools', 'Verification procedure', COMPONENTS[4], 'repository-instructions.md · fixture root commands', 1,
    'node --check src/entries.mjs; node --check src/caller.mjs; node --test tests/validation.test.mjs. Syntax-check any new helper. The browser simulation does not execute these commands.'),
];
const copy = value => JSON.parse(JSON.stringify(value));
const get = id => SOURCES.find(s => s.id === id);
const snapshot = id => ({ ...copy(get(id)), excluded: false, superseded: false });
export function initialState() {
  const spec = snapshot('spec');
  Object.assign(spec, { revision: 1, content: 'Old specification revision 1: check amount <= 0 first, then empty reference.', order: 'amount' });
  return {
    loaded: { task: snapshot('task'), spec, note: snapshot('note'), log: snapshot('log') },
    history: [], compactedThrough: 0, decision: null, preview: null, handover: null,
    refreshNeeded: [], consequence: 'Only the old assumption is loaded. Inspect sources, then choose one action. No checks have run.',
  };
}
export const activeItems = state => Object.values(state.loaded).filter(s => !s.excluded);
export function inspect(state) {
  const items = activeItems(state), usable = items.filter(s => !s.superseded);
  const approved = usable.some(s => s.id === 'spec' && s.revision === 2);
  const observed = usable.filter(s => ['code', 'tests'].includes(s.id));
  const amounts = usable.filter(s => s.order === 'amount' || s.orders?.includes('amount'));
  const references = usable.filter(s => s.order === 'reference' || s.orders?.includes('reference'));
  const conflict = amounts.length > 0 && references.length > 0;
  const missing = [];
  if (!approved) missing.push('Approved specification revision 2');
  if (!observed.length) missing.push('Current implementation or tests');
  const stale = items.filter(s => get(s.id) && s.revision < get(s.id).revision).map(s => `${s.title}: loaded r${s.revision}, available r${get(s.id).revision}`);
  const unresolved = [...missing.map(s => `Retrieve ${s}.`), ...state.refreshNeeded.map(s => `Reload referenced source: ${s}.`)];
  if (conflict) unresolved.push('Amount-first and reference-first claims disagree; compare approved intent with observations.');
  if (!state.decision) unresolved.push('Validation order has not been justified by a conflict investigation.');
  const historyText = state.history.slice(state.compactedThrough).map(h => h.message).join('\n');
  const tokens = Math.ceil((items.map(s => s.content).join('\n').length + historyText.length) / 4);
  return { items, approved, observed, amounts, references, conflict, missing, stale, unresolved, tokens };
}
function references(state) {
  return activeItems(state).map(s => ({ id: s.id, revision: s.revision, origin: s.origin, superseded: s.superseded }));
}
export function handoverMarkdown(h) {
  return `# Handover — illustrative simulation\n\n## Goal and scope\n${h.goal}\n\n## Repository revision and changes\nFixture revisions below; no external files edited.\n\n## Completed work\n${h.actions.join('\n') || 'No actions recorded.'}\n\n## Decisions and supporting sources\n${h.decision ? h.decision.reason : 'No justified decision yet.'}\nRetained claims (require rechecking): ${h.claims.join(', ') || 'none'} first.\n${h.sources.map(s => `- ${s.id} r${s.revision}: ${s.origin}${s.superseded ? ' (superseded)' : ''}`).join('\n')}\n\n## Verification performed\n${h.verification}\n\n## Remaining uncertainties and failed attempts\n${h.uncertainties.join('\n') || 'No unresolved order conflict in this fixture; actual refactor remains unverified.'}\n\n## Sources that may need refreshing\nReload referenced evidence; no previously loaded files are implicitly available.\n\n## Next action\n${h.next}\n`;
}
export function transition(previous, action, id, resumeSources = []) {
  if (action === 'reset') return initialState();
  const state = copy(previous);
  let message = '';
  const before = inspect(state);
  if (action === 'load') {
    if (!get(id)) return state;
    if (state.loaded[id] && !state.loaded[id].excluded) {
      message = `${get(id).title} is already loaded. Use Refresh a source to replace its snapshot.`;
    } else {
      // Loading an excluded item preserves its snapshot; refreshing is a separate operation.
      state.loaded[id] = state.loaded[id] ? { ...state.loaded[id], excluded: false } : snapshot(id);
      state.refreshNeeded = state.refreshNeeded.filter(ref => ref !== id);
      message = `Loaded ${get(id).title} r${state.loaded[id].revision}. Availability does not prove authority or completeness.`;
    }
  } else if (action === 'refresh') {
    if (!get(id) || !state.loaded[id] || state.loaded[id].excluded) {
      message = 'Load a source before refreshing its snapshot.';
    } else {
      state.loaded[id] = snapshot(id);
      state.refreshNeeded = state.refreshNeeded.filter(ref => ref !== id);
      message = `Refreshed only ${get(id).title} to r${get(id).revision}. Other notes and conflicts are unchanged.`;
    }
  } else if (action === 'exclude') {
    if (id === 'task') message = 'The bounded task remains in this exercise; select another item to exclude.';
    else if (state.loaded[id]) {
      state.loaded[id].excluded = true;
      message = `Excluded ${state.loaded[id].title} from the next input. Source and audit history remain. This supplies no missing evidence.`;
    } else message = 'That source is not loaded.';
  } else if (action === 'compact') {
    const note = state.loaded.note;
    const previousSummary = state.loaded.summary;
    const failedAttempt = state.history.some(event => event.action === 'preview' && event.message.includes('check failed'));
    const claim = note && !note.excluded && !note.superseded ? note.order :
      previousSummary && !previousSummary.superseded ? previousSummary.order : (state.decision ? 'reference' : null);
    if (note) note.excluded = true;
    state.loaded.summary = {
      ...source('summary', 'Compacted working history', COMPONENTS[3], 'exercise compaction · source references retained', 1,
        `Preserve behavior. ${claim === 'amount' ? 'Amount-first assumption: note r1/spec r1, unverified.' : state.decision ? state.decision.reason : 'Order unresolved.'} Open: ${before.conflict ? 'conflicting order claims' : before.missing.join('; ') || 'actual refactor unverified'}. Current check: ${state.preview?.checks.bothInvalid || 'not run'}.${failedAttempt ? ' Prior simulated amount-first check failed.' : ''} Next: retrieve, reconcile, verify.`, claim),
      excluded: false, superseded: false,
    };
    state.compactedThrough = state.history.length + 1;
    message = 'Compacted working history, retaining decisions, uncertainty, verification status, and source references. No source was refreshed. A shorter assumption can still be wrong.';
  } else if (action === 'investigate') {
    if (before.approved && before.observed.length) {
      const evidence = ['spec', ...before.observed.map(s => s.id)];
      state.decision = { order: 'reference', evidence, reason: `Reference first: fixture-owner approval in spec r2 establishes intent; ${before.observed.map(s => `${s.id} r${s.revision}`).join(' and ')} supports observed behavior. Recency alone is not authority.` };
      for (const item of Object.values(state.loaded)) if (item.order === 'amount' || item.orders?.includes('amount')) item.superseded = true;
      message = `${state.decision.reason} The old amount-first assumption is superseded and retained in the audit trace. Actual code execution remains necessary.`;
    } else {
      message = `Comparison: ${before.amounts.map(s => `${s.id} r${s.revision}: amount first`).concat(before.references.map(s => `${s.id} r${s.revision}: reference first`)).join('; ') || 'no order evidence'}. Missing: ${before.missing.join('; ')}. Current code describes behavior; approval establishes intent. The conflict remains unresolved.`;
    }
  } else if (action === 'preview') {
    let order = null, status = 'unresolved';
    if (!before.conflict && state.decision && before.approved && before.observed.length) { order = 'reference'; status = 'accepted'; }
    else if (!before.conflict && before.amounts.length && !before.references.length) { order = 'amount'; status = 'failed'; }
    const message = status === 'accepted'
      ? 'Simulated both-invalid check passed: Reference is required. Only validation order is established here. Signatures, exact errors for other inputs, returns, scope, and an actual refactor still need execution and review.'
      : status === 'failed'
        ? 'Simulated both-invalid check failed: the old proposal returns Amount must be positive; the declared condition requires Reference is required.'
        : 'No accepted proposal yet. Evidence may support reference-first partially, but missing evidence or an unresolved conflict prevents a justified decision.';
    state.preview = { status, order, message, evidence: references(state), checks: { bothInvalid: status === 'accepted' ? 'simulated pass' : status === 'failed' ? 'simulated fail' : 'not checked', signatures: 'not executed', otherErrors: 'not executed', returns: 'not executed', scope: 'not executed' } };
    state.consequence = message;
    state.history.push({ action, id, message, evidence: references(state), snapshots: copy(state.loaded) });
    return state;
  } else if (action === 'save') {
    const pastPreview = state.history.filter(event => event.action === 'preview').at(-1);
    state.handover = {
      goal: get('task').content, decision: copy(state.decision), sources: references(state),
      claims: [...(before.amounts.length ? ['amount'] : []), ...(before.references.length ? ['reference'] : [])],
      uncertainties: before.unresolved, verification: state.preview?.message || (pastPreview
        ? `No current-context check. Historical simulation before the latest context changes: ${pastPreview.message}`
        : 'No check executed or simulated. Proposed: run the fixture tests after the refactor.'),
      actions: state.history.map(h => `- ${h.action}: ${h.message}`),
      next: 'Reload relevant evidence, reconcile retained claims, then run the real fixture checks in a local checkout.',
    };
    message = 'Handover saved in this page only. It preserves scope, decisions, evidence references, verification status, and uncertainties. Writing it does not validate its claims.';
  } else if (action === 'resume') {
    if (!state.handover) message = 'Save a handover before resuming.';
    else {
      const h = state.handover;
      state.loaded = { task: snapshot('task') };
      state.loaded.handover = { ...source('handover', 'Saved handover', COMPONENTS[3], 'previous simulated session · claims require rechecking', 1, handoverMarkdown(h)), orders: h.claims, excluded: false, superseded: false };
      state.decision = null;
      state.refreshNeeded = h.sources.filter(s => !s.superseded && ['spec', 'code', 'tests', 'note'].includes(s.id)).map(s => s.id);
      for (const sourceId of resumeSources) if (get(sourceId) && sourceId !== 'task') {
        state.loaded[sourceId] = snapshot(sourceId);
        state.refreshNeeded = state.refreshNeeded.filter(ref => ref !== sourceId);
      }
      state.compactedThrough = state.history.length;
      message = `Fresh session: task + saved handover + ${resumeSources.length} explicitly selected source(s). Earlier files are not implicitly loaded. Re-investigate order; prior verification is historical, not a current pass.`;
    }
  } else return state;
  if (['load', 'refresh', 'exclude', 'compact', 'resume'].includes(action)) {
    state.preview = null;
    const now = inspect(state);
    if (now.conflict || !now.approved || !now.observed.length) state.decision = null;
  }
  state.consequence = message;
  state.history.push({ action, id, message, evidence: references(state), snapshots: copy(state.loaded), previousSnapshots: copy(previous.loaded) });
  return state;
}
