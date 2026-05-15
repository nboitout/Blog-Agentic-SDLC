<template>
  <DefaultTheme.Layout>
    <template #home-hero-before>
      <NewsBanner />
    </template>
  </DefaultTheme.Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import NewsBanner from './components/NewsBanner.vue'
</script>
