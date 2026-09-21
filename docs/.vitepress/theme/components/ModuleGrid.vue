<script setup lang="ts">
// The Academy catalogue: a tier filter, a catalogue summary, and modules
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

function selectLevel(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  setLevel(isLevel(value) ? value : 'all')
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
      note: 'Search each map and save your progress in this browser.',
      items: visible.value.filter((m) => m.kind === 'map'),
    },
    {
      id: 'decks',
      title: 'Deep-dive decks',
      note: 'Explore one topic at a time.',
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
 * (the decks are developer + architect) fall back to the site's indigo.
 */
function accentVar(mod: AcademyModule) {
  return mod.level.length === 1 ? `var(--academy-${mod.level[0]})` : 'var(--vp-c-brand-1)'
}

/** "7 domains · 30 subdomains" / "13 slides" — the size of the thing. */
function metricsLine(mod: AcademyModule) {
  const parts: string[] = []
  if (mod.metrics.domains) parts.push(`${mod.metrics.domains} domains`)
  if (mod.metrics.subdomains) parts.push(`${mod.metrics.subdomains} subdomains`)
  if (mod.metrics.slides) parts.push(`${mod.metrics.slides} slides`)
  return parts.join(' · ')
}

function cta(mod: AcademyModule) {
  return mod.kind === 'map' ? 'Open study map' : 'Open lesson'
}
</script>

<template>
  <div class="academy-board">
    <div class="academy-mobile-filter">
      <label for="academy-level">Exam tier</label>
      <select id="academy-level" :value="activeLevel" @change="selectLevel">
        <option v-for="f in filters" :key="f.id" :value="f.id">
          {{ f.label }} ({{ f.count }})
        </option>
      </select>
    </div>

    <div class="academy-filter" role="group" aria-label="Filter modules by exam tier">
      <button
        v-for="f in filters"
        :key="f.id"
        type="button"
        class="academy-filter-btn"
        :class="{ 'is-active': activeLevel === f.id }"
        :aria-pressed="activeLevel === f.id"
        @click="setLevel(f.id)"
      >
        {{ f.label }} <span class="academy-filter-count">{{ f.count }}</span>
      </button>
    </div>
    <p class="academy-result-count" role="status">{{ visible.length }} {{ visible.length === 1 ? 'module' : 'modules' }}</p>

    <section v-for="band in bands" :key="band.id" class="academy-band" :aria-labelledby="`academy-${band.id}`">
      <h2 :id="`academy-${band.id}`" class="academy-band-title">{{ band.title }}</h2>
      <p class="academy-band-note">{{ band.note }}</p>
      <div class="academy-grid">
        <a
          v-for="mod in band.items"
          :key="mod.id"
          class="academy-card"
          :style="{ '--card-accent': accentVar(mod) }"
          :href="withBase(mod.href)"
          target="_self"
          :aria-labelledby="`academy-title-${mod.id}`"
        >
          <h3 :id="`academy-title-${mod.id}`">{{ mod.title }}</h3>
          <p class="academy-tagline">{{ mod.tagline }}</p>
          <div class="academy-metadata">
            <span>{{ metricsLine(mod) }}</span>
            <span v-if="mod.kind === 'deck'" class="academy-levels">{{ mod.level.map((level) => levelLabel[level]).join(' / ') }}</span>
          </div>
          <span class="academy-cta">{{ cta(mod) }} <span aria-hidden="true">→</span></span>
        </a>
      </div>
    </section>

    <dl class="academy-stats" aria-label="Full catalogue at a glance">
      <div v-for="stat in stats" :key="stat.label" class="academy-stat">
        <dt>{{ stat.label }}</dt>
        <dd>{{ stat.value }}</dd>
      </div>
    </dl>
  </div>
</template>

<style scoped>
.academy-board {
  margin: 24px 0 8px;
}
.academy-mobile-filter {
  display: grid;
  gap: 8px;
}
.academy-mobile-filter label {
  font-weight: 600;
}
.academy-mobile-filter select {
  width: 100%;
  min-width: 0;
  min-height: 48px;
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font: inherit;
  appearance: auto;
}
.academy-filter {
  display: none;
  flex-wrap: wrap;
  gap: 8px;
}
.academy-filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 8px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 99px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}
.academy-filter-btn.is-active {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.academy-filter-count {
  font-size: 14px;
}
.academy-result-count {
  margin: 12px 0 24px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}
.academy-band {
  margin-bottom: 32px;
}
.academy-band-title {
  margin: 0;
  padding: 0;
  border: none;
  font-size: 24px;
  line-height: 1.3;
  letter-spacing: normal;
}
.academy-band-note {
  margin: 8px 0 16px;
  font-size: 16px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}
.academy-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 16px;
}
.academy-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 12px;
  padding: 20px 16px;
  border: 1px solid var(--vp-c-divider);
  border-left: 4px solid var(--card-accent);
  border-radius: 12px;
  text-decoration: none !important;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  overflow-wrap: anywhere;
}
.academy-card h3 {
  margin: 0;
  padding: 0;
  border: none;
  font-size: 22px;
  line-height: 1.35;
  letter-spacing: normal;
}
.academy-card p {
  margin: 0;
}
.academy-tagline {
  font-size: 16px;
  line-height: 1.6;
  font-weight: 400;
  color: var(--vp-c-text-1);
}
.academy-metadata {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 12px;
  margin-top: auto;
  font-size: 14px;
  line-height: 1.6;
  font-weight: 400;
  color: var(--vp-c-text-2);
}
.academy-levels {
  overflow-wrap: anywhere;
}
.academy-cta {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 8px;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}
.academy-card:focus-visible,
.academy-filter-btn:focus-visible,
.academy-mobile-filter select:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}
@media (hover: hover) {
  .academy-card:hover,
  .academy-filter-btn:hover {
    border-color: var(--vp-c-brand-1);
  }
}
.academy-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  margin: 32px 0 0;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
}
.academy-stat {
  display: flex;
  flex-direction: row-reverse;
  gap: 6px;
}
.academy-stat dd {
  margin: 0;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
@media (min-width: 641px) {
  .academy-mobile-filter {
    display: none;
  }
  .academy-filter {
    display: flex;
  }
  .academy-grid {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 288px), 1fr));
  }
  .academy-card {
    padding: 20px;
  }
}
</style>
