<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useData } from 'vitepress'
import lesson from './context-lab/lesson.html?raw'
import { mountContextLab } from './context-lab/app.mjs'
import './context-lab/styles.css'

const root = ref(null)
const { lang } = useData()
let dispose
onMounted(() => { dispose = mountContextLab(root.value) })
onBeforeUnmount(() => { dispose?.() })
</script>

<template>
  <div class="context-lab">
    <p v-if="lang.startsWith('fr')" class="locale-note" lang="fr">
      Laboratoire d’ingénierie du contexte : comparez le coût, le cache et les informations conservées.
      Un contexte borné donne un coût cumulé approximativement linéaire, avec des frais de résumé.
      Les tarifs API ne permettent pas de calculer la rentabilité d’un abonnement.
      Les commandes et les explications détaillées du laboratoire sont actuellement en anglais.
    </p>
    <p v-else-if="lang.startsWith('ro')" class="locale-note" lang="ro">
      Laborator de inginerie a contextului: comparați costul, memoria cache și informațiile păstrate.
      Un context limitat produce un cost cumulat aproximativ liniar, la care se adaugă costurile rezumării.
      Tarifele API nu permit calcularea rentabilității unui abonament.
      Comenzile și explicațiile detaliate ale laboratorului sunt momentan în engleză.
    </p>
    <div ref="root" lang="en" v-html="lesson" />
    <noscript><p class="locale-note">Enable JavaScript to run the experiment. The lesson and its assumptions remain available on this page.</p></noscript>
  </div>
</template>
