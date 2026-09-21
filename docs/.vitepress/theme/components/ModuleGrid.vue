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
      title: 'Prepare for your exam',
      label: 'Study maps',
      note: 'Search the exam domains and track what you’ve reviewed.',
      items: visible.value.filter((m) => m.kind === 'map'),
    },
    {
      id: 'decks',
      title: 'Explore a topic',
      label: 'Deep-dive decks',
      note: 'Learn one concept through an illustrated slide deck.',
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
  return mod.kind === 'map' ? 'Open study map' : 'View slides'
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
      <p class="academy-band-label">{{ band.label }}</p>
      <h2 :id="`academy-${band.id}`" class="academy-band-title">{{ band.title }}</h2>
      <p class="academy-band-note">{{ band.note }}</p>
      <p v-if="band.id === 'decks'" class="academy-rotation-note">Slide decks open sideways on portrait phones.</p>
      <div class="academy-grid" :class="`academy-${band.id}`">
        <a
          v-for="mod in band.items"
          :key="mod.id"
          class="academy-card"
          :class="`academy-card-${mod.kind}`"
          :style="{ '--card-accent': accentVar(mod) }"
          :href="withBase(mod.href)"
          target="_self"
          :aria-labelledby="`academy-title-${mod.id}`"
        >
          <svg v-if="mod.kind === 'map'" class="academy-checklist" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="26" height="26" rx="5" />
            <path d="m8 11 2 2 4-4M18 11h6m-16 10 2 2 4-4m4 2h6" />
          </svg>
          <img
            v-else-if="mod.preview"
            class="academy-preview"
            :src="withBase(mod.preview)"
            alt=""
            width="1152"
            height="655"
            loading="lazy"
            decoding="async"
          />
          <div class="academy-card-body">
            <h3 :id="`academy-title-${mod.id}`">{{ mod.title }}</h3>
            <p v-if="mod.kind === 'deck'" class="academy-tagline">{{ mod.tagline }}</p>
            <div class="academy-metadata">
              <span>{{ metricsLine(mod) }}</span>
              <span v-if="mod.kind === 'deck'" class="academy-levels">{{ mod.level.map((level) => levelLabel[level]).join(' / ') }}</span>
              <span v-else class="academy-progress-feature">Progress tracking</span>
            </div>
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
  margin-bottom: 40px;
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
.academy-band-label {
  margin: 0 0 6px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  font-weight: 600;
}
.academy-rotation-note {
  margin: -6px 0 20px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
}
.academy-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 16px;
}
.academy-maps {
  gap: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
.academy-card {
  min-width: 0;
  text-decoration: none !important;
  color: var(--vp-c-text-1);
  overflow-wrap: anywhere;
}
.academy-card-map {
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr);
  gap: 8px 14px;
  padding: 20px 16px;
  border-left: 4px solid var(--card-accent);
}
.academy-card-map + .academy-card-map {
  border-top: 1px solid var(--vp-c-divider);
}
.academy-card-map:first-child { border-radius: 11px 11px 0 0; }
.academy-card-map:last-child { border-radius: 0 0 11px 11px; }
.academy-card-map:only-child { border-radius: 11px; }
.academy-checklist {
  width: 32px;
  height: 32px;
  color: var(--card-accent);
}
.academy-card-body {
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 10px;
}
.academy-card h3 {
  margin: 0;
  padding: 0;
  border: none;
  font-size: 22px;
  line-height: 1.35;
  letter-spacing: normal;
}
.academy-card p { margin: 0; }
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
  font-size: 14px;
  line-height: 1.6;
  font-weight: 400;
  color: var(--vp-c-text-2);
}
.academy-progress-feature { flex-basis: 100%; }
.academy-cta {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}
.academy-card-map .academy-cta { grid-column: 2; }
.academy-card-deck {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
}
.academy-preview {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9.1;
  object-fit: contain;
  border-radius: 11px 11px 0 0;
  border-bottom: 1px solid var(--vp-c-divider);
  background: #fbfbf9;
}
.academy-card-deck .academy-card-body { padding: 20px 20px 12px; flex: 1; }
.academy-card-deck .academy-metadata { margin-top: auto; padding-top: 4px; }
.academy-card-deck .academy-cta { margin: 0 20px 12px; padding-top: 8px; border-top: 1px solid var(--vp-c-divider); }
.academy-card:focus-visible,
.academy-filter-btn:focus-visible,
.academy-mobile-filter select:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}
@media (hover: hover) {
  .academy-card-deck:hover,
  .academy-filter-btn:hover {
    border-color: var(--vp-c-brand-1);
  }
  .academy-card-map:hover { background: var(--vp-c-default-soft); }
  .academy-card:hover h3 { text-decoration: underline; text-underline-offset: 4px; }
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
  .academy-decks {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 288px), 1fr));
  }
  .academy-card-map {
    grid-template-columns: 32px minmax(0, 1fr) auto;
    align-items: center;
    padding: 20px;
  }
  .academy-card-map .academy-cta { grid-column: 3; }
  .academy-progress-feature { flex-basis: auto; }
}
</style>
