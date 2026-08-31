<script setup lang="ts">
// The Academy hub board: headline stats, a tier filter, and the modules
// grouped into two bands (study maps, then deep-dive decks).
//
// Everything here is derived from academy-modules.ts — adding a module there
// updates the stats, the filter counts, and the right band automatically.
// Colours come from VitePress's own --vp-c-* tokens plus the three tier
// accents defined in custom.css, so light/dark work with no extra branches.

import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import { academyModules, type AcademyModule } from '../data/academy-modules'

type Level = 'associate' | 'developer' | 'architect'

const levelLabel: Record<Level, string> = {
  associate: 'Associate',
  developer: 'Developer',
  architect: 'Architect',
}

const levelOrder: Level[] = ['associate', 'developer', 'architect']

/** How many domain names a card spells out before collapsing into a "+N more". */
const MAX_NAMES = 3

const activeLevel = ref<Level | 'all'>('all')

function isLevel(value: string): value is Level {
  return (levelOrder as string[]).includes(value)
}

// Mirror the filter in the URL hash so a tier view can be linked to directly.
function readHash() {
  const fromHash = window.location.hash.replace(/^#level=/, '')
  activeLevel.value = isLevel(fromHash) ? fromHash : 'all'
}

onMounted(() => {
  readHash()
  window.addEventListener('hashchange', readHash)
})

onBeforeUnmount(() => window.removeEventListener('hashchange', readHash))

function setLevel(level: Level | 'all') {
  activeLevel.value = level
  const hash = level === 'all' ? '' : `#level=${level}`
  history.replaceState(null, '', `${window.location.pathname}${window.location.search}${hash}`)
}

function matches(mod: AcademyModule) {
  return activeLevel.value === 'all' || mod.level.includes(activeLevel.value)
}

const visible = computed(() => academyModules.filter(matches))

// The two bands, in reading order. A band with nothing left after filtering
// drops out entirely, header and all.
const bands = computed(() =>
  [
    {
      id: 'maps',
      title: 'Study maps',
      note: 'one per exam tier · searchable · progress saved in your browser',
      items: visible.value.filter((m) => m.kind === 'map'),
    },
    {
      id: 'decks',
      title: 'Deep-dive decks',
      note: 'click-through explainers on one topic each',
      items: visible.value.filter((m) => m.kind === 'deck'),
    },
  ].filter((band) => band.items.length > 0)
)

const filters = computed(() => [
  { id: 'all' as const, label: 'All', count: academyModules.length },
  ...levelOrder.map((level) => ({
    id: level,
    label: levelLabel[level],
    count: academyModules.filter((m) => m.level.includes(level)).length,
  })),
])

function sum(pick: (m: AcademyModule) => number | undefined) {
  return academyModules.reduce((total, m) => total + (pick(m) ?? 0), 0)
}

const stats = computed(() => [
  { value: academyModules.filter((m) => m.kind === 'map').length, label: 'exam tiers' },
  { value: sum((m) => m.metrics.domains), label: 'domains' },
  { value: sum((m) => m.metrics.subdomains), label: 'subdomains' },
  { value: sum((m) => m.metrics.slides), label: 'deck slides' },
])

/**
 * Single-tier modules take that tier's accent; modules that span tiers
 * (both decks are developer + architect) fall back to the site's indigo.
 */
function accentVar(mod: AcademyModule) {
  return mod.level.length === 1 ? `var(--academy-${mod.level[0]})` : 'var(--vp-c-brand-1)'
}

function accentSoftVar(mod: AcademyModule) {
  return mod.level.length === 1 ? `var(--academy-${mod.level[0]}-soft)` : 'var(--vp-c-brand-soft)'
}

function kindLabel(mod: AcademyModule) {
  return mod.kind === 'map' ? 'Reference' : 'Deck'
}

/** "7 domains · 30 subdomains" / "13 slides" — the size of the thing. */
function metricsLine(mod: AcademyModule) {
  const parts: string[] = []
  if (mod.metrics.domains) parts.push(`${mod.metrics.domains} domains`)
  if (mod.metrics.subdomains) parts.push(`${mod.metrics.subdomains} subdomains`)
  if (mod.metrics.slides) parts.push(`${mod.metrics.slides} slides`)
  return parts.join(' · ')
}

/**
 * What the module covers, as one clamped line rather than a stack of chips —
 * the full domain names are long enough that chips wrap one per row and leave
 * the cards ragged. Names are dropped after MAX_NAMES and counted instead.
 */
function coverage(mod: AcademyModule) {
  const names = mod.domains.map((d) => d.replace(/^Domain [\d.]+ · /, ''))
  const shown = names.slice(0, MAX_NAMES)
  const rest = names.length - shown.length
  return rest > 0 ? [...shown, `+${rest} more`].join('  ·  ') : shown.join('  ·  ')
}

function cta(mod: AcademyModule) {
  return mod.kind === 'map' ? 'Open the map' : 'Open the deck'
}
</script>

<template>
  <div class="academy-board">
    <!-- Headline stats, summed from the module data -->
    <dl class="academy-stats">
      <div v-for="stat in stats" :key="stat.label" class="academy-stat">
        <dt>{{ stat.value }}</dt>
        <dd>{{ stat.label }}</dd>
      </div>
    </dl>

    <!-- Tier filter -->
    <div class="academy-filter" role="group" aria-label="Filter modules by exam tier">
      <button
        v-for="f in filters"
        :key="f.id"
        type="button"
        class="academy-filter-btn"
        :class="[`is-${f.id}`, { 'is-active': activeLevel === f.id }]"
        :aria-pressed="activeLevel === f.id"
        @click="setLevel(f.id)"
      >
        {{ f.label }}<span class="academy-filter-count">{{ f.count }}</span>
      </button>
    </div>

    <!-- Bands: study maps first, then decks -->
    <section v-for="band in bands" :key="band.id" class="academy-band">
      <h2 class="academy-band-title">
        {{ band.title }}
        <span>{{ band.note }}</span>
      </h2>
      <div class="academy-grid" :class="{ 'is-decks': band.id === 'decks' }">
        <a
          v-for="mod in band.items"
          :key="mod.id"
          class="academy-card"
          :style="{ '--card-accent': accentVar(mod), '--card-accent-soft': accentSoftVar(mod) }"
          :href="withBase(mod.href)"
          target="_blank"
          rel="noopener"
          :aria-label="`${mod.title} — ${mod.tagline} (opens in a new tab)`"
        >
          <div class="academy-card-top">
            <span class="academy-kind">{{ kindLabel(mod) }}</span>
            <span class="academy-levels">
              <span v-for="lvl in mod.level" :key="lvl" class="academy-level">{{ levelLabel[lvl] }}</span>
            </span>
          </div>
          <h3>{{ mod.title }}</h3>
          <p class="academy-metrics">{{ metricsLine(mod) }}</p>
          <p class="academy-tagline">{{ mod.tagline }}</p>
          <p class="academy-coverage">{{ coverage(mod) }}</p>
          <span class="academy-cta">{{ cta(mod) }}<span aria-hidden="true">↗</span></span>
        </a>
      </div>
    </section>

  </div>
</template>

<style scoped>
.academy-board {
  margin: 28px 0 8px;
}

/* ── Headline stats ── */
.academy-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  margin: 0 0 28px;
  padding: 0;
}
.academy-stat {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 14px 16px;
}
.academy-stat dt {
  font-size: 26px;
  font-weight: 700;
  line-height: 1.1;
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}
.academy-stat dd {
  margin: 2px 0 0;
  font-size: 11.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

/* ── Tier filter ── */
.academy-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 26px;
}
.academy-filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease;
}
.academy-filter-btn:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-text-3);
}
.academy-filter-count {
  font-size: 11px;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}
.academy-filter-btn.is-active {
  color: var(--filter-accent, var(--vp-c-brand-1));
  border-color: var(--filter-accent, var(--vp-c-brand-1));
  background: var(--filter-accent-soft, var(--vp-c-brand-soft));
}
.academy-filter-btn.is-active .academy-filter-count {
  color: inherit;
}
.academy-filter-btn.is-associate {
  --filter-accent: var(--academy-associate);
  --filter-accent-soft: var(--academy-associate-soft);
}
.academy-filter-btn.is-developer {
  --filter-accent: var(--academy-developer);
  --filter-accent-soft: var(--academy-developer-soft);
}
.academy-filter-btn.is-architect {
  --filter-accent: var(--academy-architect);
  --filter-accent-soft: var(--academy-architect-soft);
}

/* ── Bands ── */
.academy-band {
  margin-bottom: 34px;
}
.academy-band-title {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 10px;
  margin: 0 0 14px;
  padding: 0 0 10px;
  border-top: none;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--vp-c-text-1);
}
.academy-band-title span {
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  text-transform: none;
  color: var(--vp-c-text-3);
}

/* ── Cards ── */
.academy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
  gap: 18px;
}
/* auto-fit, not auto-fill: with only two decks the pair stretches to fill the
   row instead of leaving a phantom third column. */
.academy-grid.is-decks {
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
}
.academy-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 20px 18px 23px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none !important;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  overflow: hidden;
  transition: border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
}
/* Tier accent bar down the left edge */
.academy-card::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 4px;
  background: var(--card-accent);
}
.academy-card:hover {
  border-color: var(--card-accent);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.09);
}
.academy-card:focus-visible {
  outline: 2px solid var(--card-accent);
  outline-offset: 3px;
}
.academy-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.academy-kind {
  font-family: var(--vp-font-family-mono);
  font-weight: 600;
  color: var(--card-accent);
  white-space: nowrap;
}
.academy-levels {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}
.academy-level {
  padding: 2px 8px;
  border-radius: 99px;
  background: var(--card-accent-soft);
  color: var(--card-accent);
  font-weight: 600;
  white-space: nowrap;
}
.academy-card h3 {
  margin: 0;
  font-size: 19px;
  line-height: 1.25;
  border: none;
  padding: 0;
  letter-spacing: -0.01em;
}
.academy-card p {
  margin: 0;
}
.academy-metrics {
  margin-top: -4px !important;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-3);
}
.academy-tagline {
  /* Clamped to keep every card the same shape; the full text stays in the
     card's aria-label, so nothing is lost to screen readers. */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  overflow: hidden;
  font-size: 13.5px;
  color: var(--vp-c-text-2);
  line-height: 1.55;
}
.academy-coverage {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  margin-top: auto !important;
  padding-top: 10px;
  font-family: var(--vp-font-family-mono);
  font-size: 10.5px;
  line-height: 1.6;
  color: var(--vp-c-text-3);
}
.academy-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
  padding-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 13px;
  font-weight: 600;
  color: var(--card-accent);
}
.academy-card:hover .academy-cta span {
  transform: translate(2px, -2px);
}
.academy-cta span {
  transition: transform 0.15s ease;
}

@media (max-width: 640px) {
  .academy-stat dt {
    font-size: 22px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .academy-card,
  .academy-cta span,
  .academy-filter-btn {
    transition: none;
  }
  .academy-card:hover {
    transform: none;
  }
  .academy-card:hover .academy-cta span {
    transform: none;
  }
}
</style>
