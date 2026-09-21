export const STRATEGIES = [
  { id: 'full', name: 'Full history', short: 'Full history', color: '#b05b25', description: 'Keep every exchange. No caching.' },
  { id: 'cache', name: 'Full history + cache', short: 'With cache', color: '#6059bc', description: 'Same context. Reuse an unchanged prefix.' },
  { id: 'trim', name: 'Keep recent turns', short: 'Recent only', color: '#7d8593', description: 'Keep 3 previous exchanges. Cache the prefix that survives.' },
  { id: 'summary', name: 'Summary + recent turns', short: 'With a summary', color: '#087d70', description: 'Summarize 6 older exchanges at a time; retain at least 3 recent ones.' },
];
export const DEFAULTS = { turns: 24, system: 6000, user: 500, tools: 3000, answer: 800, reasoning: 1200, hit: .9, summary: 1000, keep: 3, every: 6 };
export const PRESETS = {
  chat: { name: 'A short conversation', description: 'Small messages, little tool output. Watch the fixed prompt dominate early calls.', values: { ...DEFAULTS, turns: 12, tools: 0, user: 200, answer: 400, reasoning: 0 } },
  debug: { name: 'Debug a failing test', description: 'The agent reads files and test logs. Each model call adds more history to the next.', values: { ...DEFAULTS } },
  logs: { name: 'An agent drowning in logs', description: 'Large tool results make context selection matter. Watch for a pricing tier change or a context limit.', values: { ...DEFAULTS, turns: 48, tools: 12000 } },
};
export function normalize(raw) {
  const out = { ...DEFAULTS };
  for (const k of Object.keys(out)) {
    const n = Number(raw[k]);
    if (raw[k] !== '' && Number.isFinite(n)) out[k] = Math.max(0, n);
  }
  for (const k of ['turns', 'keep', 'every']) out[k] = Math.max(1, Math.floor(out[k]));
  out.turns = Math.min(80, out.turns);
  out.hit = Math.min(1, out.hit);
  return out;
}
export function priceRequest(model, input, cached, output, caching = false) {
  const long = !!model.threshold && input > model.threshold;
  const im = long ? model.inputMultiplier : 1;
  const om = long ? model.outputMultiplier : 1;
  const fresh = input - cached;
  const freshRate = caching && input >= (model.minimumCache || 0) ? model.write : model.input;
  return { fresh, cached, inputCost: fresh * freshRate * im / 1e6, cacheCost: cached * model.cached * im / 1e6, outputCost: output * model.output * om / 1e6, long };
}
function fits(model, input, output) { return input + (model.limitKind === 'combined' ? output : 0) <= model.limit; }
function commonPrefix(previous, current) {
  let total = 0;
  for (let i = 0; i < Math.min(previous.length, current.length); i++) {
    if (previous[i].id !== current[i].id) break;
    total += current[i].tokens;
  }
  return total;
}
export function simulate(model, raw, strategy) {
  const c = normalize(raw), rows = [];
  let history = [], summaryVersion = 0, previous = [], cumulative = 0;
  const incoming = c.user + c.tools, output = c.answer + c.reasoning;
  for (let n = 1; n <= c.turns; n++) {
    let summaryCost = 0, summaryInput = 0;
    if (strategy === 'trim') history = history.slice(-c.keep);
    if (strategy === 'summary' && history.length >= c.keep + c.every) {
      // An explicit, separate uncached summary call, using this model and no extra reasoning.
      summaryInput = c.system + (summaryVersion ? c.summary : 0) + c.every * (incoming + c.answer);
      if (!fits(model, summaryInput, c.summary)) return { rows, blockedAt: n, reason: 'The summary call exceeds the model limit.' };
      const p = priceRequest(model, summaryInput, 0, c.summary);
      summaryCost = p.inputCost + p.outputCost;
      history = history.slice(c.every);
      summaryVersion++;
    }
    const chunks = [{ id: 'system', tokens: c.system }];
    if (summaryVersion) chunks.push({ id: `summary-${summaryVersion}`, tokens: c.summary });
    for (const turn of history) chunks.push({ id: `in-${turn}`, tokens: incoming }, { id: `out-${turn}`, tokens: c.answer });
    chunks.push({ id: `in-${n}`, tokens: incoming });
    const input = chunks.reduce((sum, item) => sum + item.tokens, 0);
    if (!fits(model, input, output)) return { rows, blockedAt: n, reason: 'The next model call exceeds the model limit.' };
    const caching = strategy !== 'full';
    const prefix = caching ? commonPrefix(previous, chunks) : 0;
    const cached = prefix >= (model.minimumCache || 0) ? Math.floor(prefix * c.hit) : 0;
    const p = priceRequest(model, input, cached, output, caching);
    const cost = p.inputCost + p.cacheCost + p.outputCost + summaryCost;
    cumulative += cost;
    rows.push({ n, input, output, ...p, summaryCost, summaryInput, cost, cumulative, history: [...history], summarized: summaryVersion > 0, summaryVersion, retained: n === 1 || history.includes(1) || (summaryVersion > 0 && c.summary > 0) });
    previous = chunks;
    history.push(n);
  }
  return { rows, blockedAt: null, reason: '' };
}
