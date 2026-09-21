import { MODELS, VERIFIED } from './models.mjs';
import { STRATEGIES, DEFAULTS, PRESETS, simulate, normalize } from './simulation.mjs';

// Keep state and DOM queries local to this mounted lesson.
export function mountContextLab(root) {
const $ = id => root.querySelector(`#${id}`);
const money = (n, digits = 3) => '$' + n.toFixed(digits);
const integer = n => Math.round(n).toLocaleString('en-US');
const token = n => n >= 1000000 ? (n / 1e6).toFixed(2) + 'M' : n >= 1000 ? (n / 1000).toFixed(n % 1000 ? 1 : 0) + 'k' : String(n);
let config = { ...DEFAULTS }, selected = 'summary', metric = 'cumulative', inspect = 12, runs;
const fields = ['turns', 'tools', 'system', 'user', 'answer', 'reasoning', 'summary'];
const model = () => MODELS.find(m => m.id === $('model').value);
const details = () => STRATEGIES.find(s => s.id === selected);
const row = id => runs[id].rows.find(r => r.n === inspect);
const last = id => runs[id].rows.at(-1);
for (const provider of ['OpenAI', 'Anthropic', 'Google']) {
  const group = document.createElement('optgroup'); group.label = provider;
  MODELS.filter(m => m.provider === provider).forEach(m => { const option = document.createElement('option'); option.value = m.id; option.textContent = m.name + (m.status === 'Earlier generation' ? ' · earlier' : m.status === 'Preview' ? ' · preview' : ''); group.append(option); });
  $('model').append(group);
}
$('model').value = 'claude-sonnet-5';
$('verified').textContent = `Verified ${VERIFIED}`;
const stale = (Date.now() - new Date(VERIFIED + 'T00:00:00Z').getTime()) / 86400000 > 30;
if (stale) { $('verified').classList.add('stale'); $('verified').textContent += ' · recheck rates'; }
$('catalog-body').innerHTML = MODELS.map(m => `<tr><td><a href="${m.source}" target="_blank" rel="noreferrer">${m.name} ↗</a></td><td>${money(m.input, 2)}</td><td>${money(m.cached, 3)}</td><td>${m.write === m.input ? '—' : money(m.write, 2)}</td><td>${money(m.output, 2)}</td><td><span class="tag">${m.status}</span></td></tr>`).join('');
function chart() {
  const mobile = window.matchMedia('(max-width: 760px)').matches;
  const W = mobile ? 360 : 720, H = mobile ? 260 : 292, left = mobile ? 49 : 58, right = mobile ? 16 : 24, top = 21, bottom = 34;
  const all = STRATEGIES.flatMap(s => runs[s.id].rows.map(r => r[metric]));
  const maximum = Math.max(0.001, ...all) * 1.08;
  const x = n => left + (n - 1) / Math.max(1, config.turns - 1) * (W - left - right);
  const y = n => H - bottom - n / maximum * (H - top - bottom);
  const fmt = n => metric === 'input' ? token(n) : money(n, maximum < .1 ? 3 : 2);
  let content = `<title>${$('chart-title').textContent} for four strategies</title><desc>Use the model-call slider and the accessible data table to inspect exact values. All four curves use the same model and workload. A curve stops when its context limit is reached.</desc>`;
  for (let t = 0; t <= 4; t++) {
    const v = maximum * t / 4;
    content += `<line x1="${left}" y1="${y(v)}" x2="${W - right}" y2="${y(v)}" stroke="#e9eeea"/><text x="${left - 10}" y="${y(v) + 4}" text-anchor="end">${fmt(v)}</text>`;
  }
  const labels = [...new Set([1, Math.round(config.turns / 4), Math.round(config.turns / 2), Math.round(config.turns * .75), config.turns])];
  for (const n of labels) content += `<text x="${x(n)}" y="${H - 13}" text-anchor="middle">${n}</text>`;
  content += `<text x="${W - right}" y="${H - 1}" text-anchor="end" class="axis-label">model calls</text><line x1="${x(inspect)}" x2="${x(inspect)}" y1="${top}" y2="${H-bottom}" stroke="#9dafa4" stroke-dasharray="4 4"/>`;
  for (const s of STRATEGIES) {
    const data = runs[s.id].rows;
    content += `<polyline points="${data.map(r => `${x(r.n)},${y(r[metric])}`).join(' ')}" stroke="${s.color}" fill="none" stroke-width="${s.id === selected ? 3.2 : 2}" ${s.id === 'trim' ? 'stroke-dasharray="5 4"' : ''} stroke-linejoin="round"/>`;
    const current = row(s.id);
    if (current) content += `<circle cx="${x(inspect)}" cy="${y(current[metric])}" r="${s.id === selected ? 5 : 3.5}" fill="${s.color}" stroke="white" stroke-width="2"><title>${s.name}, call ${inspect}: ${fmt(current[metric])}</title></circle>`;
    if (runs[s.id].blockedAt && data.length) { const r = data.at(-1); content += `<rect x="${x(r.n)-4}" y="${y(r[metric])-4}" width="8" height="8" fill="${s.color}"><title>Stopped before call ${runs[s.id].blockedAt}: context limit.</title></rect>`; }
  }
  $('chart').innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${$('chart-title').textContent}; four context strategies">${content}</svg>`;
  $('legend').innerHTML = STRATEGIES.map(s => `<span><i style="background:${s.color}"></i>${s.short}${runs[s.id].blockedAt ? ' · stopped' : ''}</span>`).join('');
}
function cards() {
  $('strategy-cards').innerHTML = STRATEGIES.map(s => { const run = runs[s.id]; return `<button class="strategy-card ${selected === s.id ? 'active' : ''}" data-strategy="${s.id}" aria-pressed="${selected === s.id}" style="--strategy:${s.color}"><span class="card-label">${s.name}</span><strong>${money(last(s.id)?.cumulative || 0)}</strong><small>${run.blockedAt ? `${run.rows.length}/${config.turns} calls · stopped` : `Total for ${config.turns} calls`}</small></button>`; }).join('');
  $('strategy-cards').querySelectorAll('button').forEach(b => b.addEventListener('click', () => { selected = b.dataset.strategy; render(); }));
}
function memory() {
  const s = details(), r = row(selected), c = config;
  $('memory-title').textContent = s.name;
  $('memory-call').textContent = `Call ${inspect}`;
  if (!r) {
    $('memory-blocks').innerHTML = `<p class="blocked">This strategy stopped before call ${runs[selected].blockedAt}. ${runs[selected].reason}</p>`;
    $('memory-status').innerHTML = '<span class="status missing">CONTEXT LIMIT REACHED</span><h3>The request cannot continue as configured.</h3><p>Shorten the workload, change the context policy, or select a model with sufficient capacity.</p>';
    $('flow-input').textContent = 'No request'; $('flow-output').textContent = 'No output'; $('bill-breakdown').innerHTML = ''; return;
  }
  const block = (title, body, size, type = '') => `<div class="memory-block ${type}"><div><b>${title}</b><p>${body}</p></div><span>${integer(size)} tk</span></div>`;
  $('memory-blocks').innerHTML = block('Stable instructions & tool definitions', 'The prefix at the start of each request.', c.system) + (r.summarized ? block('Task state summary', c.summary > 0 ? 'Includes: keep Python 3.10 compatibility. Earlier raw detail is gone.' : 'Empty summary: the earlier requirement is lost.', c.summary, 'summary') : '') + (r.history.length ? block(`Previous exchanges · ${r.history.length}`, `Calls ${r.history[0]}–${r.history.at(-1)}${r.history.includes(1) ? ' · original compatibility requirement still present' : ' · first-call requirement absent from raw history'}`, r.history.length * (c.user + c.tools + c.answer)) : '') + block('New input for this call', inspect === 1 ? 'The user states the Python 3.10 requirement.' : 'The current instruction and fresh tool results.', c.user + c.tools, 'new');
  $('flow-input').textContent = `${integer(r.input)} input tk`;
  $('flow-output').textContent = `${integer(r.output)} billed output tk`;
  $('memory-status').innerHTML = `<span class="status ${r.retained ? '' : 'missing'}">${r.retained ? 'REQUIREMENT PRESENT' : 'REQUIREMENT DROPPED'}</span><h3>${r.retained ? r.summarized ? 'The summary carries the constraint.' : 'The original requirement is still available.' : 'The agent no longer sees Python 3.10.'}</h3><p>${r.retained ? r.summarized ? 'This example deliberately preserves the requirement in the summary. Real summary quality needs testing.' : 'Keeping the source text makes the requirement available to this call.' : 'Discarding old exchanges lowered token use, but also removed a fact needed for the task. Retain it in task state or retrieve it when needed.'}</p>`;
  $('bill-breakdown').innerHTML = `<div><span>Fresh input / cache writes</span><strong>${money(r.inputCost,4)}</strong></div><div><span>Cached reads · ${integer(r.cached)} tk</span><strong>${money(r.cacheCost,4)}</strong></div><div><span>Output, including reasoning</span><strong>${money(r.outputCost,4)}</strong></div><div><span>Summary call</span><strong>${money(r.summaryCost,4)}</strong></div><div><b>This call, including overhead</b><strong>${money(r.cost,4)}</strong></div>${r.long ? '<p>Long-context rates apply to this full request.</p>' : ''}`;
}
function insight() {
  const r = row(selected), base = row('full'), run = runs[selected];
  if (!r || runs.full.blockedAt || run.blockedAt) { $('insight').innerHTML = `<b>Compare completion before comparing price.</b> ${STRATEGIES.filter(s => runs[s.id].blockedAt).map(s => `${s.name} stops before call ${runs[s.id].blockedAt}`).join('; ')}. Partial-run totals are not a like-for-like savings comparison.`; return; }
  if (selected === 'cache') { $('insight').innerHTML = `<b>Same context, different bill.</b> At call ${inspect}, both history strategies carry ${integer(r.input)} input tokens. This one reuses ${integer(r.cached)} cached tokens. Caching reduces the price of reuse; it does not free context capacity.`; return; }
  if (selected === 'trim') { $('insight').innerHTML = `<b>A smaller prompt has a memory tradeoff.</b> Call ${inspect} keeps ${r.history.length} previous exchanges. ${r.retained ? 'The first requirement is still present at this point.' : 'The requirement from the first call has disappeared. Inspect the memory test below.'}`; return; }
  if (selected === 'full') { $('insight').innerHTML = `<b>The bill grows with the history you carry.</b> Call ${inspect} reads ${integer(r.input)} input tokens. Total cost includes a growing-history term plus the fixed prompt and output costs; the curve is not an exact “double calls, quadruple cost” rule.`; return; }
  const baseline = last('full').cumulative, total = last('summary').cumulative, savings = baseline ? (1 - total / baseline) * 100 : 0;
  const cachedTotal = last('cache').cumulative, versusCache = cachedTotal ? (total / cachedTotal - 1) * 100 : 0;
  $('insight').innerHTML = `<b>${savings >= 0 ? `${savings.toFixed(0)}% lower` : `${(-savings).toFixed(0)}% higher`} modeled session cost versus uncached full history.</b> Compared with cached full history, this is ${Math.abs(versusCache).toFixed(1)}% ${versusCache >= 0 ? 'more' : 'less'} expensive. Summary calls are included. At call ${inspect}, the prompt holds ${integer(r.input)} tokens${base ? ` versus ${integer(base.input)}` : ''}. Smaller context does not always mean a smaller bill.`;
}
function table() {
  $('data-caption').textContent = `${details().name} · ${model().name} · standard USD estimate`;
  $('data-body').innerHTML = runs[selected].rows.map(r => `<tr><td>${r.n}</td><td>${integer(r.input)}</td><td>${integer(r.cached)}</td><td>${money(r.summaryCost,4)}</td><td>${money(r.cost,4)}</td><td>${money(r.cumulative,4)}</td></tr>`).join('');
}
function render() {
  config = normalize(config); inspect = Math.min(config.turns, Math.max(1, inspect));
  runs = Object.fromEntries(STRATEGIES.map(s => [s.id, simulate(model(), config, s.id)]));
  $('turn').max = config.turns; $('turn').value = inspect; $('turn-number').textContent = inspect; $('turn-total').textContent = `/ ${config.turns}`; $('next').disabled = inspect >= config.turns;
  $('turns-value').textContent = config.turns; $('tools-value').textContent = `${integer(config.tools)} tk`; $('hit-value').textContent = `${Math.round(config.hit * 100)}%`;
  $('chart-title').textContent = { cumulative: 'Total session cost', cost: 'Cost of each model call', input: 'Input context in each call' }[metric];
  $('chart-subtitle').textContent = { cumulative: 'All calls so far, including summary overhead.', cost: 'Summary calls create visible cost spikes.', input: 'Cached tokens still occupy context capacity.' }[metric];
  const m = model();
  $('rate-card').innerHTML = `<div><small>Input / 1M</small><b>${money(m.input,2)}</b></div><div><small>Cached / 1M</small><b>${money(m.cached,m.cached < .1 ? 3 : 2)}</b></div><div><small>Output / 1M</small><b>${money(m.output,2)}</b></div>`;
  const expired = m.reviewAfter && new Date() > new Date(m.reviewAfter + 'T23:59:59Z');
  $('model-note').innerHTML = `${integer(m.limit)}-token ${m.limitKind === 'input' ? 'input limit' : 'context window'}. ${m.note || (m.provider === 'Anthropic' ? '5-minute cache-write pricing.' : 'Standard API rates; long-context pricing applies above 272k input.')} <a href="${m.source}" target="_blank" rel="noreferrer">Source ↗</a>${expired ? ' <b class="stale">Promotion needs a fresh price check.</b>' : ''}`;
  chart(); cards(); insight(); memory(); table();
}
function resetExperiment(preset) {
  config = { ...PRESETS[preset].values }; inspect = Math.min(12, config.turns);
  fields.forEach(id => $(id).value = config[id]); $('hit').value = config.hit * 100;
  $('scenario-description').textContent = PRESETS[preset].description;
  root.querySelectorAll('[data-preset]').forEach(b => { const active = b.dataset.preset === preset; b.classList.toggle('selected',active); b.setAttribute('aria-pressed',active); });
  render();
}
fields.forEach(id => $(id).addEventListener('input', () => {
  const el = $(id); const n = el.valueAsNumber;
  if (!Number.isFinite(n)) return;
  config[id] = Math.max(Number(el.min), Math.min(Number(el.max), n));
  root.querySelectorAll('[data-preset]').forEach(b => { b.classList.remove('selected'); b.setAttribute('aria-pressed','false'); });
  $('scenario-description').textContent = 'Custom workload. All strategies are recalculated with the same settings.';
  render();
}));
$('hit').addEventListener('input', () => { config.hit = Number($('hit').value) / 100; render(); });
$('model').addEventListener('change', render);
$('turn').addEventListener('input', () => { inspect = Number($('turn').value); render(); });
$('next').addEventListener('click', () => { inspect++; render(); });
$('reset').addEventListener('click', () => { inspect = 1; render(); });
$('defaults').addEventListener('click', () => { $('model').value = 'claude-sonnet-5'; selected = 'summary'; metric = 'cumulative'; root.querySelectorAll('[data-metric]').forEach(b => { const active=b.dataset.metric===metric; b.classList.toggle('selected',active); b.setAttribute('aria-pressed',active); }); resetExperiment('debug'); });
root.querySelectorAll('[data-preset]').forEach(b => b.addEventListener('click', () => resetExperiment(b.dataset.preset)));
root.querySelectorAll('[data-metric]').forEach(b => b.addEventListener('click', () => { metric = b.dataset.metric; root.querySelectorAll('[data-metric]').forEach(item => { const active=item===b; item.classList.toggle('selected',active); item.setAttribute('aria-pressed',active); }); render(); }));
root.querySelectorAll('[data-answer]').forEach(b => b.addEventListener('click', () => {
  root.querySelectorAll('[data-answer]').forEach(item => { item.classList.toggle('selected',item===b); item.setAttribute('aria-pressed',item===b); });
  $('prediction-feedback').textContent = (b.dataset.answer === 'sometimes' ? 'Exactly. ' : 'Look at the assumptions. ') + 'With uncached, steadily growing history, the history term is quadratic. Fixed prompt and output terms are linear. A bounded prompt gives roughly linear total cost, with extra costs for summaries. Try the “Per call” and “Context” views.';
}));
$('export').addEventListener('click', () => {
  const lines = ['model,verified,strategy,call,input_tokens,cached_tokens,output_tokens,input_cost,cache_cost,output_cost,summary_cost,call_cost,cumulative_cost'];
  for (const s of STRATEGIES) for (const r of runs[s.id].rows) lines.push([model().id,VERIFIED,s.id,r.n,r.input,r.cached,r.output,r.inputCost,r.cacheCost,r.outputCost,r.summaryCost,r.cost,r.cumulative].join(','));
  lines.push('', 'setting,value', ...Object.entries(config).map(([k,v]) => `${k},${v}`));
  for (const s of STRATEGIES) lines.push(`blocked_at_${s.id},${runs[s.id].blockedAt || ''}`);
  const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/csv' }));
  const a = document.createElement('a'); a.href = url; a.download = 'context-lab-experiment.csv'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
});
resetExperiment('debug');
window.addEventListener('resize', chart);

  return () => window.removeEventListener('resize', chart);
}
