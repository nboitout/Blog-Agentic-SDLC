<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

/* ── Constants ── */
const MODELS = [
  { name: 'GPT-5.5',    inp: 5.00, out: 30.00 },
  { name: 'GPT-5.4',    inp: 2.50, out: 15.00 },
  { name: 'Opus 4.7',   inp: 5.00, out: 25.00 },
  { name: 'Sonnet 4.6', inp: 3.00, out: 15.00 },
]
const TURN_COLORS = [
  '#6366f1','#2563eb','#22a95c','#65a30d',
  '#b45309','#dc2626','#db2777','#4f46e5',
  '#0891b2','#047857','#a78bfa','#0284c7',
]
const SYS = 6000, OUTPUT_TK = 400, MAX_WIN = 44000, MAX_T = 15

/* ── Mutable state (not reactive — mutated imperatively like original) ── */
let turn = 0, cumCost = 0, cumEng = 0, t1cost = 0
let eng = false, busy = false
let curInp = 3.00, curOut = 15.00
let curPT = 2000
let chartInstance = null

/* ── Reactive display state ── */
const curName     = ref('Sonnet 4.6')
const activeModel = ref(3)
const nameField   = ref('Sonnet 4.6')
const inpField    = ref(3.00)
const outField    = ref(15.00)
const ptField     = ref(2000)

const procTokDisplay   = ref('—')
const capFillStyle     = ref({ width: '0%', background: '#22a95c' })
const capLabelDisplay  = ref('0 / 44,000 tokens (0%)')
const showLimitMsg     = ref(false)
const showCompBox      = ref(false)
const showEngLeg       = ref(false)
const mTurn            = ref(0)
const mTok             = ref('—')
const mCost            = ref('$0.000')
const mMult            = ref('1×')
const btnNextDisabled  = ref(false)
const btnNextText      = ref('Next turn →')

/* ── DOM refs ── */
const canvasRef  = ref(null)
const ctxBufRef  = ref(null)
const beltPktRef = ref(null)
const procBoxRef = ref(null)

/* ── Helpers ── */
function getInpTok(n, e) {
  return e ? SYS + Math.min(n, 3) * curPT : SYS + n * curPT
}
function getTurnCost(n, e) {
  return (getInpTok(n, e) * curInp + OUTPUT_TK * curOut) / 1e6
}

/* ── Model selection ── */
function selectModel(i) {
  activeModel.value = i
  const m = MODELS[i]
  curName.value = m.name; curInp = m.inp; curOut = m.out
  nameField.value = m.name; inpField.value = m.inp; outField.value = m.out
  rebuildChart()
}

function onEdit() {
  const n   = nameField.value.trim() || curName.value
  const inp = parseFloat(String(inpField.value)) || curInp
  const out = parseFloat(String(outField.value)) || curOut
  const pt  = parseInt(String(ptField.value)) || curPT
  curName.value = n; curInp = inp; curOut = out; curPT = pt
  let match = -1
  MODELS.forEach((m, i) => { if (m.name === n && m.inp === inp && m.out === out) match = i })
  activeModel.value = match
  rebuildChart()
}

function rebuildChart() {
  if (turn === 0 || !chartInstance) return
  const stdData = [], engData = [], labels = []
  let sc = 0, ec = 0
  for (let n = 1; n <= turn; n++) {
    sc += getTurnCost(n, false)
    ec += getTurnCost(n, true)
    labels.push('T' + n)
    stdData.push(parseFloat(sc.toFixed(6)))
    engData.push(parseFloat(ec.toFixed(6)))
  }
  chartInstance.data.labels = labels
  chartInstance.data.datasets[0].data = stdData
  chartInstance.data.datasets[1].data = engData
  chartInstance.update()
  cumCost = stdData[stdData.length - 1] || 0
  cumEng  = engData[engData.length - 1] || 0
  t1cost  = getTurnCost(1, false)
  mCost.value = '$' + (eng ? cumEng : cumCost).toFixed(4)
  if (turn > 0) mMult.value = (getTurnCost(turn, false) / getTurnCost(1, false)).toFixed(1) + '×'
}

/* ── Chart init ── */
function initChart() {
  if (!canvasRef.value || !window.Chart) return
  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const gridColor = dark ? 'rgba(130,130,140,0.14)' : 'rgba(100,100,110,0.1)'
  const tickColor = dark ? 'rgba(235,235,245,0.5)'  : 'rgba(60,60,67,0.55)'
  chartInstance = new window.Chart(canvasRef.value, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Standard',
          data: [],
          borderColor: '#b45309',
          backgroundColor: 'rgba(180,83,9,0.07)',
          borderWidth: 2, pointRadius: 4, pointBackgroundColor: '#b45309',
          fill: true, tension: 0.35,
        },
        {
          label: 'Engineered',
          data: [],
          borderColor: '#22a95c',
          backgroundColor: 'rgba(34,169,92,0.07)',
          borderWidth: 2, pointRadius: 4, pointBackgroundColor: '#22a95c',
          fill: true, tension: 0.35, hidden: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: c => '$' + c.parsed.y.toFixed(5) } },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { callback: v => '$' + v.toFixed(4), font: { size: 11 }, color: tickColor },
          grid: { color: gridColor },
        },
        x: {
          ticks: { font: { size: 11 }, color: tickColor },
          grid: { display: false },
        },
      },
    },
  })
}

/* ── Next turn ── */
function nextTurn() {
  if (busy || turn >= MAX_T) return
  busy = true
  btnNextDisabled.value = true
  turn++

  const buf = ctxBufRef.value
  const box = document.createElement('div')
  box.className = 'cb-turn-box'
  box.style.borderLeftColor = TURN_COLORS[turn % TURN_COLORS.length]
  box.innerHTML =
    `<span class="cb-turn-label">Turn ${turn}</span>` +
    `<span class="cb-turn-tk">+${curPT / 1000}k tk</span>`
  buf.appendChild(box)
  buf.scrollTop = buf.scrollHeight

  const tokens = getInpTok(turn, eng)
  const pktPct = Math.min(Math.round((tokens / MAX_WIN) * 85), 85)
  const pkt    = beltPktRef.value
  pkt.style.transition = 'none'
  pkt.style.width   = pktPct + '%'
  pkt.style.left    = '-' + pktPct + '%'
  pkt.style.opacity = '0'
  requestAnimationFrame(() => requestAnimationFrame(() => {
    pkt.style.transition = 'left 1.1s ease-in-out, opacity 0.15s'
    pkt.style.left    = '110%'
    pkt.style.opacity = '0.8'
    setTimeout(() => { pkt.style.opacity = '0' }, 950)
  }))

  setTimeout(() => {
    const pb = procBoxRef.value
    pb.style.animation = 'cb-proc-pulse 0.35s ease 2'
    setTimeout(() => { pb.style.animation = '' }, 700)
    procTokDisplay.value = tokens.toLocaleString() + ' tk'

    const costStd = getTurnCost(turn, false)
    const costEng = getTurnCost(turn, true)
    cumCost += costStd
    cumEng  += costEng
    if (turn === 1) t1cost = costStd

    const pct = Math.min((tokens / MAX_WIN) * 100, 100)
    capFillStyle.value = {
      width: pct + '%',
      background: pct > 80 ? '#dc2626' : pct > 60 ? '#b45309' : '#22a95c',
      transition: 'width 0.5s ease, background 0.3s',
    }
    capLabelDisplay.value = tokens.toLocaleString() + ' / 44,000 tokens (' + pct.toFixed(0) + '%)'
    if (pct > 70) showLimitMsg.value = true

    mTurn.value = turn
    mTok.value  = tokens.toLocaleString()
    mCost.value = '$' + (eng ? cumEng : cumCost).toFixed(4)
    mMult.value = (costStd / t1cost).toFixed(1) + '×'

    if (chartInstance) {
      chartInstance.data.labels.push('T' + turn)
      chartInstance.data.datasets[0].data.push(parseFloat(cumCost.toFixed(6)))
      chartInstance.data.datasets[1].data.push(parseFloat(cumEng.toFixed(6)))
      chartInstance.update()
    }

    busy = false
    if (turn < MAX_T) btnNextDisabled.value = false
    else btnNextText.value = 'Max turns reached'
  }, 1150)
}

/* ── Engineered mode toggle ── */
function toggleEng(e) {
  eng = e.target.checked
  showCompBox.value = eng
  showEngLeg.value  = eng
  if (chartInstance) {
    chartInstance.data.datasets[1].hidden = !eng
    chartInstance.update()
  }
  if (turn > 0) mCost.value = '$' + (eng ? cumEng : cumCost).toFixed(4)
}

/* ── Reset ── */
function resetAll() {
  turn = 0; cumCost = 0; cumEng = 0; t1cost = 0; eng = false; busy = false
  const buf = ctxBufRef.value
  while (buf.children.length > 1) buf.removeChild(buf.lastChild)
  procTokDisplay.value  = '—'
  capFillStyle.value    = { width: '0%', background: '#22a95c' }
  capLabelDisplay.value = '0 / 44,000 tokens (0%)'
  showLimitMsg.value    = false
  mTurn.value = 0; mTok.value = '—'; mCost.value = '$0.000'; mMult.value = '1×'
  btnNextDisabled.value = false
  btnNextText.value     = 'Next turn →'
  showCompBox.value     = false
  showEngLeg.value      = false
  if (chartInstance) {
    chartInstance.data.labels = []
    chartInstance.data.datasets[0].data = []
    chartInstance.data.datasets[1].data = []
    chartInstance.data.datasets[1].hidden = true
    chartInstance.update()
  }
}

/* ── Lifecycle ── */
onMounted(() => {
  if (typeof window === 'undefined') return
  if (window.Chart) {
    initChart()
  } else {
    const s = document.createElement('script')
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js'
    s.onload = () => initChart()
    document.head.appendChild(s)
  }
})

onUnmounted(() => {
  if (chartInstance) { chartInstance.destroy(); chartInstance = null }
})
</script>

<template>
  <div class="cb-widget">

    <!-- ── Model selector ── -->
    <div class="cb-panel">
      <div class="cb-panel-label">Model &amp; pricing</div>
      <div class="cb-model-row">
        <button
          v-for="(m, i) in MODELS"
          :key="m.name"
          :class="['cb-model-btn', { active: activeModel === i }]"
          @click="selectModel(i)"
        >{{ m.name }}</button>
      </div>
      <div class="cb-pricing-grid">
        <div>
          <div class="cb-field-label">Model name</div>
          <input class="cb-field" v-model="nameField" @input="onEdit" />
        </div>
        <div>
          <div class="cb-field-label">Input (USD / 1M tk)</div>
          <input class="cb-field" type="number" step="0.5" min="0" v-model="inpField" @input="onEdit" />
        </div>
        <div>
          <div class="cb-field-label">Output (USD / 1M tk)</div>
          <input class="cb-field" type="number" step="0.5" min="0" v-model="outField" @input="onEdit" />
        </div>
        <div>
          <div class="cb-field-label">Context (tokens / turn)</div>
          <input class="cb-field" type="number" step="500" min="500" v-model="ptField" @input="onEdit" />
        </div>
      </div>
    </div>

    <!-- ── Factory floor ── -->
    <div class="cb-panel">
      <div class="cb-panel-label">Token pipeline</div>
      <div class="cb-factory-row">

        <div class="cb-fzone">
          <div class="cb-fzone-label">Context buffer</div>
          <div class="cb-ctx-buf" ref="ctxBufRef">
            <div class="cb-turn-box" style="border-left-color:var(--vp-c-brand-1);">
              <span class="cb-turn-label">System prompt</span>
              <span class="cb-turn-tk">6k tk</span>
            </div>
          </div>
        </div>

        <div class="cb-belt-wrap">
          <div class="cb-belt-track">
            <div class="cb-belt-pkt" ref="beltPktRef"></div>
            <div class="cb-belt-label">full context →</div>
          </div>
          <div class="cb-belt-sub">replayed every turn</div>
        </div>

        <div v-if="showCompBox" class="cb-fzone">
          <div class="cb-fzone-label">Compressor</div>
          <div class="cb-pbox cb-pbox-success">
            <div class="cb-comp-icon"><div class="cb-comp-bar"></div></div>
            <div class="cb-pbox-success-text">trim</div>
          </div>
        </div>

        <div class="cb-fzone">
          <div class="cb-fzone-label">Processor</div>
          <div class="cb-pbox" ref="procBoxRef">
            <div class="cb-pbox-icon"></div>
            <div class="cb-pbox-name">{{ curName }}</div>
            <div class="cb-pbox-tok">{{ procTokDisplay }}</div>
          </div>
        </div>

        <div class="cb-arrow">→</div>

        <div class="cb-fzone">
          <div class="cb-fzone-label">Output</div>
          <div class="cb-pbox cb-pbox-success">
            <div class="cb-pbox-out-icon"></div>
            <div class="cb-pbox-success-text">~400 tk</div>
          </div>
        </div>

      </div>
    </div>

    <!-- ── Capacity bar ── -->
    <div class="cb-cap-wrap">
      <div class="cb-cap-row">
        <span>Context window usage</span>
        <span>{{ capLabelDisplay }}</span>
      </div>
      <div class="cb-cap-track">
        <div class="cb-cap-fill" :style="capFillStyle"></div>
      </div>
      <div v-if="showLimitMsg" class="cb-limit-msg">Window limit approaching — context truncation risk</div>
    </div>

    <!-- ── Metric cards ── -->
    <div class="cb-stats-grid">
      <div class="cb-mcard">
        <div class="cb-mcard-label">Turn</div>
        <div class="cb-mcard-val" style="color:var(--vp-c-brand-1);">{{ mTurn }}</div>
        <div class="cb-mcard-sub">exchanges</div>
      </div>
      <div class="cb-mcard">
        <div class="cb-mcard-label">Input tokens this turn</div>
        <div class="cb-mcard-val">{{ mTok }}</div>
        <div class="cb-mcard-sub">all re-processed</div>
      </div>
      <div class="cb-mcard">
        <div class="cb-mcard-label">Cumulative cost</div>
        <div class="cb-mcard-val cb-val-danger">{{ mCost }}</div>
        <div class="cb-mcard-sub">input + output</div>
      </div>
      <div class="cb-mcard">
        <div class="cb-mcard-label">Cost multiplier</div>
        <div class="cb-mcard-val cb-val-amber">{{ mMult }}</div>
        <div class="cb-mcard-sub">vs turn 1</div>
      </div>
    </div>

    <!-- ── Chart legend ── -->
    <div class="cb-chart-legend">
      <span class="cb-leg-item">
        <span class="cb-leg-dot" style="background:#b45309;"></span>Standard — cumulative cost
      </span>
      <span v-if="showEngLeg" class="cb-leg-item">
        <span class="cb-leg-dot" style="background:#22a95c;"></span>Engineered — context managed
      </span>
      <span class="cb-chart-note">double the turns → quadruple the cost</span>
    </div>

    <!-- ── Chart ── -->
    <div class="cb-chart-wrap">
      <canvas ref="canvasRef" role="img" aria-label="Cumulative cost growing quadratically with each conversation turn"></canvas>
    </div>

    <!-- ── Controls ── -->
    <div class="cb-controls">
      <button class="cb-btn-primary" :disabled="btnNextDisabled" @click="nextTurn">{{ btnNextText }}</button>
      <button @click="resetAll">Reset</button>
      <label class="cb-eng-label">
        <input type="checkbox" @change="toggleEng" />
        Engineered mode
      </label>
    </div>

  </div>
</template>

<style scoped>
/* ── Widget wrapper ── */
.cb-widget {
  font-size: 14px;
  line-height: 1.5;
  margin: 1.5rem 0 2rem;
}

/* ── Panel ── */
.cb-panel {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px 18px;
  margin-bottom: 12px;
}

.cb-panel-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
  margin-bottom: 12px;
}

/* ── Model buttons ── */
.cb-model-row {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}

.cb-model-btn {
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-family: inherit;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}
.cb-model-btn:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.cb-model-btn.active {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  font-weight: 600;
}

/* ── Pricing grid ── */
.cb-pricing-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
  align-items: end;
}
@media (max-width: 580px) {
  .cb-pricing-grid { grid-template-columns: 1fr 1fr; }
}

.cb-field-label {
  font-size: 11px;
  color: var(--vp-c-text-3);
  font-weight: 500;
  margin-bottom: 4px;
}

.cb-field {
  font-size: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
  padding: 5px 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono, monospace);
  width: 100%;
  outline: none;
  transition: border-color 0.15s;
}
.cb-field:focus { border-color: var(--vp-c-brand-1); }

/* ── Factory row ── */
.cb-factory-row {
  display: flex;
  align-items: center;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 2px;
}

.cb-fzone {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.cb-fzone-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

/* Context buffer */
.cb-ctx-buf {
  width: 185px;
  max-height: 195px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 3px;
  padding: 7px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

/* Belt */
.cb-belt-wrap {
  flex: 1;
  min-width: 60px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.cb-belt-track {
  height: 40px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  background: var(--vp-c-bg);
}

.cb-belt-pkt {
  position: absolute;
  top: 0;
  height: 100%;
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand-3, #818cf8);
  left: -30%;
  border-radius: 8px;
  opacity: 0;
}

.cb-belt-label {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: var(--vp-c-text-3);
  pointer-events: none;
}

.cb-belt-sub {
  font-size: 10px;
  color: var(--vp-c-text-3);
  text-align: center;
}

/* pbox */
.cb-pbox {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 9px 11px;
  min-width: 72px;
}

.cb-pbox-success {
  border-color: #22a95c;
  background: rgba(34,169,92,0.08);
}
.dark .cb-pbox-success { background: rgba(34,169,92,0.13); }

.cb-pbox-icon {
  width: 20px; height: 20px;
  background: var(--vp-c-brand-1);
  border-radius: 4px;
  opacity: 0.85;
}
.cb-pbox-out-icon {
  width: 14px; height: 14px;
  background: #22a95c;
  border-radius: 3px;
  opacity: 0.75;
}

.cb-pbox-name {
  font-size: 11px;
  color: var(--vp-c-text-2);
  text-align: center;
  max-width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cb-pbox-tok {
  font-size: 12px;
  font-weight: 600;
  font-family: var(--vp-font-family-mono, monospace);
  color: var(--vp-c-text-1);
}

.cb-pbox-success-text {
  font-size: 11px;
  color: #22a95c;
  font-weight: 500;
}
.dark .cb-pbox-success-text { color: #6ee7b7; }

/* Compressor icon */
.cb-comp-icon {
  width: 22px; height: 14px;
  background: #22a95c;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cb-comp-bar {
  width: 14px; height: 3px;
  background: rgba(255,255,255,0.6);
  border-radius: 1px;
}

.cb-arrow { font-size: 14px; color: var(--vp-c-text-3); flex-shrink: 0; }

/* ── Capacity bar ── */
.cb-cap-wrap { margin-bottom: 12px; }

.cb-cap-row {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
}

.cb-cap-track {
  height: 5px;
  background: var(--vp-c-bg-mute);
  border-radius: 3px;
  overflow: hidden;
}

.cb-cap-fill {
  height: 100%;
  width: 0%;
  border-radius: 3px;
  background: #22a95c;
}

.cb-limit-msg {
  font-size: 11px;
  color: #dc2626;
  margin-top: 3px;
}
.dark .cb-limit-msg { color: #f87171; }

/* ── Metric cards ── */
.cb-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 12px;
}
@media (max-width: 560px) {
  .cb-stats-grid { grid-template-columns: repeat(2, 1fr); }
}

.cb-mcard {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 11px 13px;
}

.cb-mcard-label {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-bottom: 3px;
  font-weight: 500;
}

.cb-mcard-val {
  font-size: 22px;
  font-weight: 700;
  font-family: var(--vp-font-family-mono, monospace);
  line-height: 1;
  margin-bottom: 3px;
  color: var(--vp-c-text-1);
}

.cb-mcard-sub { font-size: 11px; color: var(--vp-c-text-3); }

.cb-val-danger { color: #c0392b; }
.dark .cb-val-danger { color: #f87171; }
.cb-val-amber { color: #b45309; }
.dark .cb-val-amber { color: #fbbf24; }

/* ── Chart legend ── */
.cb-chart-legend {
  display: flex;
  gap: 14px;
  margin-bottom: 8px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  align-items: center;
  flex-wrap: wrap;
}

.cb-leg-item { display: flex; align-items: center; gap: 5px; }

.cb-leg-dot {
  width: 10px; height: 10px;
  border-radius: 2px;
  display: inline-block;
  flex-shrink: 0;
}

.cb-chart-note { margin-left: auto; font-size: 11px; color: var(--vp-c-text-3); }

/* ── Chart ── */
.cb-chart-wrap {
  position: relative;
  width: 100%;
  height: 200px;
  margin-bottom: 14px;
}

/* ── Controls ── */
.cb-controls {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.cb-btn-primary {
  padding: 7px 18px;
  font-size: 13px;
  border-radius: 7px;
  border: 1px solid var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: #fff;
  cursor: pointer;
  font-family: inherit;
  font-weight: 500;
  transition: background 0.15s, border-color 0.15s;
}
.cb-btn-primary:hover { background: var(--vp-c-brand-2); border-color: var(--vp-c-brand-2); }
.cb-btn-primary:disabled { opacity: 0.38; cursor: not-allowed; }

.cb-eng-label {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  cursor: pointer;
  color: var(--vp-c-text-2);
  user-select: none;
}
.cb-eng-label input { cursor: pointer; accent-color: var(--vp-c-brand-1); }
</style>

<!-- Global styles for dynamically created turn-box elements -->
<style>
.cb-turn-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  font-size: 12px;
  border-left-width: 3px;
  border-left-style: solid;
  animation: cb-slide-in 0.2s ease;
}

.cb-turn-label { color: var(--vp-c-text-2); }
.cb-turn-tk { font-family: var(--vp-font-family-mono, monospace); font-size: 11px; color: var(--vp-c-text-3); }

@keyframes cb-slide-in {
  from { opacity: 0; transform: translateY(-5px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes cb-proc-pulse {
  0%, 100% { border-color: var(--vp-c-divider); }
  50%       { border-color: var(--vp-c-brand-1); box-shadow: 0 0 0 2px var(--vp-c-brand-soft); }
}
</style>
