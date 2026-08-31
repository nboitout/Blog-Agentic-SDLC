<script setup lang="ts">
// Renders every entry in academy-modules.ts as a card. Uses VitePress's own
// --vp-c-* theme tokens throughout, so it automatically matches whatever
// light/dark theme this site already has — no colors of its own to clash
// with your design.

import { withBase } from 'vitepress'
import { academyModules } from '../data/academy-modules'

const levelLabel: Record<string, string> = {
  associate: 'Associate',
  developer: 'Developer',
  architect: 'Architect',
}
</script>

<template>
  <div class="academy-grid">
    <a
      v-for="mod in academyModules"
      :key="mod.id"
      class="academy-card"
      :href="withBase(mod.href)"
      target="_blank"
      rel="noopener"
    >
      <div class="academy-card-top">
        <span class="academy-kind">{{ mod.kind === 'map' ? 'Reference' : 'Deck' }}</span>
        <span class="academy-levels">
          <span v-for="lvl in mod.level" :key="lvl" class="academy-level">{{ levelLabel[lvl] }}</span>
        </span>
      </div>
      <h3>{{ mod.title }}</h3>
      <p>{{ mod.tagline }}</p>
      <div class="academy-domains">
        <span v-for="d in mod.domains" :key="d" class="academy-domain">{{ d }}</span>
      </div>
    </a>
  </div>
</template>

<style scoped>
.academy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  margin: 32px 0;
}
.academy-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none !important;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  transition: border-color 0.15s ease, transform 0.1s ease;
}
.academy-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}
.academy-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--vp-c-text-3);
}
.academy-levels {
  display: flex;
  gap: 6px;
}
.academy-level {
  padding: 2px 7px;
  border-radius: 99px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
}
.academy-card h3 {
  margin: 0;
  font-size: 17px;
  border: none;
  padding: 0;
}
.academy-card p {
  margin: 0;
  font-size: 13.5px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
.academy-domains {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
  padding-top: 4px;
}
.academy-domain {
  font-size: 10.5px;
  font-family: var(--vp-font-family-mono);
  padding: 2px 7px;
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-3);
}
</style>
