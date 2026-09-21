<script setup>
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { COMPONENTS, SOURCES, CAPACITY, initialState, inspect, transition, handoverMarkdown } from './context-decisions/simulation.mjs'
const state = ref(initialState())
const selected = ref('spec')
const resumeSources = ref([])
const status = computed(() => inspect(state.value))
const selectedSource = computed(() => SOURCES.find(s => s.id === selected.value))
const selectedSnapshot = computed(() => state.value.loaded[selected.value])
const act = action => {
  state.value = transition(state.value, action, selected.value, resumeSources.value)
  if (action === 'reset') { selected.value = 'spec'; resumeSources.value = [] }
}
function download() {
  const blob = new Blob([handoverMarkdown(state.value.handover)], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'context-lab-handover.md'; a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
</script>

<template>
  <div class="decision-lab">
    <header class="lab-intro">
      <p class="eyebrow">LECTURE 03 · PRACTICE</p>
      <h1>Context Engineering Lab</h1>
      <p class="subtitle">Choose what your agent needs for its next decision</p>
      <p>Illustrative simulation. Outcomes follow the exercise rules; they are not measurements of an AI model's reliability.</p>
      <p class="muted">Runs locally in your browser. No account, API key, LLM call, or backend. Page refresh starts over; download a handover to keep a record.</p>
      <a :href="withBase('/en/lectures/lecture-03-context-engineering/#practical')">← Return to the lesson and downloads</a>
    </header>

    <section class="lab-card task" aria-labelledby="task-title">
      <p class="eyebrow">01 / READ THE TASK</p>
      <h2 id="task-title">Extract shared validation. Preserve behavior.</h2>
      <p>Two public functions, <code>submitPayment({ reference, amount })</code> and <code>previewPayment({ reference, amount })</code>, duplicate the same checks.</p>
      <p><strong>Acceptance:</strong> preserve signatures, exact error messages, validation order, and successful return values. Relevant tests must pass.</p>
      <p><strong>Scope:</strong> change the implementation, add a helper, and extend targeted tests. Keep the caller, approved contract, and dependencies unchanged.</p>
      <p class="decision"><strong>Next decision:</strong> For <code>{ reference: '', amount: 0 }</code>, which error should the shared helper throw first?</p>
    </section>

    <div class="lab-grid">
      <section class="lab-card" aria-labelledby="source-title">
        <p class="eyebrow">02 / INSPECT SOURCES</p>
        <h2 id="source-title">Available is different from loaded</h2>
        <label for="lab-source">Source to inspect or act on</label>
        <select id="lab-source" v-model="selected">
          <option v-for="source in SOURCES" :key="source.id" :value="source.id">{{ source.title }}</option>
        </select>
        <dl class="source-meta">
          <dt>Component</dt><dd>{{ selectedSource.category }}</dd>
          <dt>Origin</dt><dd>{{ selectedSource.origin }}</dd>
          <dt>Scope</dt><dd>{{ selectedSource.scope }}</dd>
          <dt>Available revision</dt><dd>r{{ selectedSource.revision }} · {{ selected === 'note' ? 'Unverified; no newer note known' : selected === 'log' ? 'Freshness irrelevant to this task' : 'Current fixture source' }}</dd>
          <dt>Loading policy</dt><dd>Explicit load or refresh; inspecting this panel does not load evidence into the simulated input.</dd>
          <dt>Loaded status</dt><dd>{{ selectedSnapshot ? `r${selectedSnapshot.revision} · ${selectedSnapshot.excluded ? 'excluded from next input' : 'in next input'}${selectedSnapshot.superseded ? ' · superseded assumption' : ''}` : 'Not loaded' }}</dd>
        </dl>
        <h3>Available content</h3>
        <pre>{{ selectedSource.content }}</pre>
        <template v-if="selectedSnapshot">
          <h3>Loaded snapshot</h3><pre>{{ selectedSnapshot.content }}</pre>
        </template>
      </section>

      <section class="lab-card" aria-labelledby="working-title">
        <p class="eyebrow">03 / DIAGNOSE</p>
        <h2 id="working-title">Current working context</h2>
        <p><strong>Estimated size: {{ status.tokens }} / {{ CAPACITY }} illustrative tokens</strong></p>
        <meter :value="Math.min(status.tokens, CAPACITY)" :max="CAPACITY" min="0" aria-label="Estimated illustrative context occupancy" />
        <p class="muted">Estimator: selected content + uncompacted action text, characters ÷ 4, rounded up. Capacity is an illustration, not a model limit. Size does not measure correctness.</p>
        <ul class="indicators">
          <li><strong>Missing decision evidence:</strong> {{ status.missing.join('; ') || 'None for the order decision' }}</li>
          <li><strong>Known stale loaded sources:</strong> {{ status.stale.join('; ') || 'None known; unverified notes may still be wrong' }}</li>
          <li><strong>Unresolved contradictions:</strong> {{ status.conflict ? 'Amount-first versus reference-first' : 'None exposed by currently loaded claims' }}</li>
          <li><strong>Acceptance checked:</strong> {{ state.preview?.checks.bothInvalid || 'Not checked' }} (both-invalid order only). Other contracts: not executed.</li>
        </ul>
        <div v-for="category in COMPONENTS" :key="category" class="context-category">
          <h3>{{ category }}</h3>
          <p v-if="!status.items.some(s => s.category === category)" class="muted">No item loaded in this component.</p>
          <details v-for="item in status.items.filter(s => s.category === category)" :key="item.id">
            <summary>{{ item.title }} · r{{ item.revision }}{{ item.superseded ? ' · superseded; audit only' : '' }}</summary>
            <p>{{ item.origin }}</p><pre>{{ item.content }}</pre>
          </details>
        </div>
      </section>
    </div>

    <section class="lab-card" aria-labelledby="actions-title">
      <p class="eyebrow">04 / ACT ONE STEP AT A TIME</p>
      <h2 id="actions-title">Choose a context action</h2>
      <p>The first three controls act on <strong>{{ selectedSource.title }}</strong>. Each action has a different purpose.</p>
      <div class="action-grid">
        <div><button @click="act('load')">Load relevant evidence</button><p>Add the selected snapshot. Availability alone does not establish authority.</p></div>
        <div><button @click="act('refresh')">Refresh a source</button><p>Replace only the selected loaded snapshot with its current fixture revision.</p></div>
        <div><button @click="act('exclude')">Exclude irrelevant output</button><p>Remove the selected item from future input; keep its source and history.</p></div>
        <div><button @click="act('compact')">Compact history</button><p>Shorten working history while keeping decisions, uncertainty, and references. No freshness guarantee.</p></div>
        <div><button @click="act('investigate')">Investigate a conflict</button><p>Compare loaded claims, provenance, approved intent, and observations. Recency alone cannot decide.</p></div>
        <div><button class="primary" @click="act('preview')">Preview next decision</button><p>Apply the transparent exercise rules. This is not a real model prediction.</p></div>
      </div>
    </section>

    <section class="lab-card consequence" aria-labelledby="consequence-title">
      <p class="eyebrow">05 / INSPECT THE CONSEQUENCE</p>
      <h2 id="consequence-title">What changed, and what remains?</h2>
      <p role="status" aria-live="polite" aria-atomic="true">{{ state.consequence }}</p>
      <p v-if="state.decision"><strong>Decision support:</strong> {{ state.decision.reason }}</p>
      <ul v-if="status.unresolved.length"><li v-for="question in status.unresolved" :key="question">{{ question }}</li></ul>
      <p v-else>Order is justified within the fixture. A real refactor still needs all contract checks and diff review.</p>
      <details><summary>Transparent simulation rules</summary>
        <ul>
          <li>Only amount-first assumptions: preview proposes amount first and fails the both-invalid condition.</li>
          <li>Contradictory loaded claims: show a conflict and withhold an accepted proposal.</li>
          <li>Approved spec r2 plus code or tests supports reference first. Investigate to justify intent and mark old claims superseded, retaining their audit trace.</li>
          <li>One current source provides partial evidence. Both code and tests are useful; no single click sequence is required.</li>
          <li>Exclusion changes size. Compaction can preserve a stale assumption. Neither refreshes evidence.</li>
          <li>Preview checks only the illustrative both-invalid order. Reading tests does not run them.</li>
        </ul>
      </details>
    </section>

    <section class="lab-card" aria-labelledby="handover-title">
      <p class="eyebrow">06 / PRESERVE CONTINUITY</p>
      <h2 id="handover-title">Save a handover, then resume</h2>
      <p>A note preserves claims; it does not validate them. A new session needs evidence loaded explicitly.</p>
      <button @click="act('save')">Save handover</button>
      <template v-if="state.handover">
        <details><summary>Preview saved Markdown handover</summary><pre>{{ handoverMarkdown(state.handover) }}</pre></details>
        <button @click="download">Download handover</button>
      </template>
      <fieldset><legend>Explicitly load these sources on resume (optional)</legend>
        <label v-for="source in SOURCES.filter(s => s.id !== 'task')" :key="source.id" class="check-label">
          <input v-model="resumeSources" type="checkbox" :value="source.id"> {{ source.title }} · available r{{ source.revision }}
        </label>
      </fieldset>
      <button :disabled="!state.handover" @click="act('resume')">Resume a session</button>
      <p class="muted">With nothing selected, resume loads only the task and handover. Prior verification remains historical; refresh flags and uncertainties stay visible.</p>
    </section>

    <section class="lab-card" aria-labelledby="debrief-title">
      <h2 id="debrief-title">Debrief</h2>
      <p><strong>A smaller context can still be wrong; a larger context can be necessary to resolve uncertainty.</strong> Try excluding the log and compacting before refreshing. Then compare the old note with approved intent and current observations.</p>
      <p>This fixture can establish a justified reference-first decision and a simulated check for one input. A real agent run must still refactor the code, run the tests, review signatures and all error cases, inspect scope violations, and record actual results.</p>
      <details><summary>Action history ({{ state.history.length }})</summary>
        <ol><li v-for="(event, index) in state.history" :key="index"><strong>{{ event.action }}</strong>: {{ event.message }}<details><summary>Evidence snapshots at this action</summary><pre>{{ event.snapshots }}</pre><template v-if="event.previousSnapshots"><h3>Before this action</h3><pre>{{ event.previousSnapshots }}</pre></template></details></li></ol>
      </details>
      <button @click="act('reset')">Reset</button>
      <p class="muted">Reset clears this exercise only. No external files change.</p>
    </section>
  </div>
</template>

<style scoped>
.decision-lab { --context-accent: #4f46e5; max-width: 1140px; margin: 0 auto; padding: 42px 24px 72px; color: var(--vp-c-text-1); line-height: 1.65; }
:global(.dark) .decision-lab { --context-accent: #a5b4fc; }
.lab-intro { max-width: 820px; margin-bottom: 32px; }
h1 { font-size: clamp(2rem, 5vw, 3.1rem); line-height: 1.13; font-weight: 750; letter-spacing: -.035em; margin: 12px 0; }
h2 { font-size: 1.3rem; font-weight: 650; line-height: 1.35; margin: 4px 0 14px; }
h3 { font-size: 1rem; font-weight: 650; margin: 16px 0 8px; }
p { margin: 10px 0; }
.subtitle { font-size: 1.3rem; color: var(--vp-c-text-2); }
.eyebrow { color: var(--context-accent); font-size: .75rem; letter-spacing: .1em; font-weight: 700; }
.muted, .action-grid p { color: var(--vp-c-text-2); font-size: .88rem; }
.lab-card { border: 1px solid var(--vp-c-divider); border-radius: 16px; padding: 24px; margin: 0 0 24px; background: var(--vp-c-bg-soft); min-width: 0; }
.task, .consequence { border-top: 3px solid var(--vp-c-brand-1); }
.decision { background: var(--vp-c-brand-soft); padding: 14px; border-radius: 8px; }
.lab-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.action-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.source-meta { display: grid; grid-template-columns: 130px 1fr; font-size: .88rem; gap: 6px 12px; margin-top: 16px; }
dt { color: var(--vp-c-text-2); } dd { margin: 0; overflow-wrap: anywhere; }
pre { font-size: .82rem; white-space: pre-wrap; overflow-wrap: anywhere; max-height: 320px; overflow: auto; border-radius: 8px; background: var(--vp-c-bg); padding: 14px; line-height: 1.6; }
code { font-size: .9em; overflow-wrap: anywhere; }
select { display: block; width: 100%; appearance: auto; padding: 10px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 6px; margin-top: 6px; }
button { background: var(--vp-c-bg); border: 1px solid var(--vp-c-brand-1); border-radius: 8px; padding: 9px 14px; font-weight: 600; cursor: pointer; min-height: 44px; }
button:hover { background: var(--vp-c-brand-soft); } button.primary { background: #4f46e5; color: #fff; } button:disabled { opacity: .5; cursor: default; }
button:focus-visible, select:focus-visible, input:focus-visible, summary:focus-visible, a:focus-visible { outline: 3px solid var(--vp-c-brand-1); outline-offset: 4px; }
ul, ol { padding-left: 22px; } li { margin: 6px 0; } .indicators { font-size: .9rem; }
.context-category { border-top: 1px solid var(--vp-c-divider); margin-top: 14px; }
summary { cursor: pointer; padding: 8px 0; } details { margin: 8px 0; }
meter { width: 100%; height: 14px; } a { color: var(--context-accent); text-decoration: underline; }
fieldset { border: 1px solid var(--vp-c-divider); padding: 14px; border-radius: 8px; margin: 20px 0; }
legend { font-weight: 600; padding: 0 6px; } .check-label { display: flex; gap: 10px; padding: 6px 0; align-items: center; } input { width: 18px; height: 18px; accent-color: #4f46e5; }
@media (max-width: 760px) { .lab-grid, .action-grid { grid-template-columns: 1fr; gap: 0; } .action-grid { gap: 16px; } .decision-lab { padding: 26px 16px 48px; } .lab-card { padding: 18px; } .source-meta { grid-template-columns: 1fr; gap: 0; } dt { margin-top: 8px; } }
</style>
