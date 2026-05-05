<script setup>
import { computed, reactive } from 'vue'

const questions = [
  {
    id: 'q1',
    text: 'Cum este utilizat AI de echipele dumneavoastră software astăzi?',
    options: [
      { key: 'A', points: 1, label: 'Experimentare individuală în principal' },
      { key: 'B', points: 2, label: 'Folosit de anumiți ingineri pentru a lucra mai rapid individual' },
      { key: 'C', points: 3, label: 'Utilizat în fluxuri de lucru recurente ale echipei' },
      { key: 'D', points: 4, label: 'Integrat în procesele de livrare cu reguli operaționale clare' },
    ],
  },
  {
    id: 'q2',
    text: 'Când un instrument AI generează cod, ce se întâmplă de obicei în continuare?',
    options: [
      { key: 'A', points: 1, label: 'Un dezvoltator revizuiește și editează manual totul ad hoc' },
      { key: 'B', points: 2, label: 'Codul este util, dar validarea este în mare parte manuală' },
      { key: 'C', points: 3, label: 'Verificările standard sunt de obicei rulate înainte de integrare' },
      { key: 'D', points: 4, label: 'Codul intră într-un ciclu guvernat cu reguli explicite de verificare și escaladare' },
    ],
  },
  {
    id: 'q3',
    text: 'Care afirmație descrie cel mai bine modelul dumneavoastră de livrare?',
    options: [
      { key: 'A', points: 1, label: 'AI ajută indivizii, dar SDLC-ul este neschimbat' },
      { key: 'B', points: 2, label: 'Unele echipe își adaptează informal fluxul de lucru' },
      { key: 'C', points: 3, label: 'Redesignăm unele părți ale livrării în jurul fluxurilor de lucru agentice' },
      { key: 'D', points: 4, label: 'Evoluăm intenționat spre un model operațional agentice' },
    ],
  },
  {
    id: 'q4',
    text: 'Cât de confortabilă ar fi organizația dumneavoastră cu un agent care deschide un pull request peste noapte?',
    options: [
      { key: 'A', points: 1, label: 'Deloc confortabilă' },
      { key: 'B', points: 2, label: 'Doar ca experiment' },
      { key: 'C', points: 3, label: 'Confortabilă în unele cazuri bine delimitate' },
      { key: 'D', points: 4, label: 'Deja normal în fluxuri de lucru selectate' },
    ],
  },
  {
    id: 'q5',
    text: 'Ce descrie cel mai bine postura dumneavoastră de testare și verificare?',
    options: [
      { key: 'A', points: 1, label: 'Testarea este neuniformă și adesea manuală' },
      { key: 'B', points: 2, label: 'Avem automatizare, dar nu este în mod constant de încredere' },
      { key: 'C', points: 3, label: 'Cele mai importante căi au verificări automate fiabile' },
      { key: 'D', points: 4, label: 'Verificarea este suficient de solidă pentru a susține autonomia agentică guvernată' },
    ],
  },
  {
    id: 'q6',
    text: 'Când AI produce ceva greșit, care este răspunsul obișnuit?',
    options: [
      { key: 'A', points: 1, label: 'Oamenii își pierd încrederea și revin la munca manuală' },
      { key: 'B', points: 2, label: 'Rezultatul este corectat de la caz la caz' },
      { key: 'C', points: 3, label: 'Rafinăm prompt-urile și practicile de lucru' },
      { key: 'D', points: 4, label: 'Îmbunătățim harness-ul: domeniu, context, verificări, stare și reguli de recuperare' },
    ],
  },
  {
    id: 'q7',
    text: 'Cine este responsabil de designul fluxurilor de lucru uman + AI în inginerie?',
    options: [
      { key: 'A', points: 1, label: 'Nimeni în mod explicit' },
      { key: 'B', points: 2, label: 'Ingineri individuali sau entuziaști' },
      { key: 'C', points: 3, label: 'Anumiți lideri de inginerie sau echipe pilot' },
      { key: 'D', points: 4, label: 'Este tratată ca o responsabilitate a modelului operațional' },
    ],
  },
  {
    id: 'q8',
    text: 'Care afirmație reflectă cel mai bine modelul dumneavoastră actual de guvernanță?',
    options: [
      { key: 'A', points: 1, label: 'Nu există reguli clare; oamenii folosesc instrumentele cum vor' },
      { key: 'B', points: 2, label: 'Există unele bune practici informale' },
      { key: 'C', points: 3, label: 'Există guardrails definite pentru unele fluxuri de lucru' },
      { key: 'D', points: 4, label: 'Nivelurile de autonomie, punctele de control și protocoalele de revizuire sunt explicite' },
    ],
  },
  {
    id: 'q9',
    text: 'Cum vă gândiți la valoarea AI în livrarea software?',
    options: [
      { key: 'A', points: 1, label: 'Productivitate individuală mai bună' },
      { key: 'B', points: 2, label: 'Codare și documentare mai rapide' },
      { key: 'C', points: 3, label: 'Throughput și calitate mai bune la nivelul echipei' },
      { key: 'D', points: 4, label: 'Un sistem de livrare redesignat cu o nouă economie și roluri noi' },
    ],
  },
  {
    id: 'q10',
    text: 'În următoarele 12 luni, care este adevărata dumneavoastră ambiție?',
    options: [
      { key: 'A', points: 1, label: 'Lăsați echipele să exploreze în siguranță' },
      { key: 'B', points: 2, label: 'Standardizați câteva instrumente utile' },
      { key: 'C', points: 3, label: 'Extindeți practicile dovedite la mai multe echipe' },
      { key: 'D', points: 4, label: 'Construiți o capacitate de livrare software agentică, măsurabilă și guvernată' },
    ],
  },
]

const answers = reactive({})
const languageCode = 'ro'
const languageLabel = 'Română'

const totalScore = computed(() => questions.reduce((sum, question) => {
  const selectedKey = answers[question.id]
  if (!selectedKey) return sum
  const selected = question.options.find((option) => option.key === selectedKey)
  return sum + (selected?.points ?? 0)
}, 0))

const selectedOption = (question) => question.options.find((option) => option.key === answers[question.id])

const currentProfile = computed(() => {
  if (totalScore.value <= 16) return 'Tooling Curious'
  if (totalScore.value <= 24) return 'Local Acceleration'
  if (totalScore.value <= 32) return 'Managed Agentic Delivery'
  return 'AI-Native Delivery System'
})

const profileInterpretation = computed(() => {
  if (totalScore.value <= 16) {
    return 'AI este în principal un ajutor individual astăzi; modelul dumneavoastră de livrare în sine nu s-a schimbat încă.'
  }
  if (totalScore.value <= 24) {
    return 'Obțineți câștiguri practice, dar fluxurile de lucru și guvernanța rămân fragmentate între echipe.'
  }
  if (totalScore.value <= 32) {
    return 'Fluxuri de lucru agentice structurate apar cu o verificare mai puternică și o supraveghere umană mai clară.'
  }
  return 'Evoluați spre un model de livrare guvernat și nativ AI, cu colaborare recurentă uman-agent.'
})
</script>

# Cât de agentică este livrarea software a organizației dumneavoastră?

**O autoevaluare executivă de 3 minute**

Această scurtă autoevaluare este concepută pentru directori executivi și lideri de inginerie care doresc o viziune rapidă și structurată asupra maturității actuale a organizației lor în livrarea software nativă AI. Nu este un quiz tehnic. Este o imagine practică a modului în care AI este folosit efectiv în modelul dumneavoastră de livrare astăzi.

**Sfat:** Nu răspundeți bazat pe ambițiile dumneavoastră AI. Răspundeți bazat pe modul în care organizația dumneavoastră funcționează efectiv astăzi.

## 10 întrebări

<div v-for="(question, index) in questions" :id="question.id" :key="question.id" style="margin: 1.25rem 0; padding: 1rem; border: 1px solid var(--vp-c-divider); border-radius: 10px;">
  <p style="margin: 0 0 0.75rem 0;"><strong>{{ index + 1 }}. {{ question.text }}</strong></p>
  <label v-for="option in question.options" :key="option.key" style="display: block; margin: 0.35rem 0; cursor: pointer;">
    <input
      :name="question.id"
      type="radio"
      :value="option.key"
      v-model="answers[question.id]"
      style="margin-right: 0.5rem;"
    >
    <strong>{{ option.key }}.</strong> {{ option.label }} <span style="opacity: 0.75;">({{ option.points }} pt)</span>
  </label>
  <p v-if="selectedOption(question)" style="margin: 0.65rem 0 0 0; font-size: 0.92rem; color: var(--vp-c-text-2);">
    Selectat: <strong>{{ selectedOption(question).key }}</strong> — {{ selectedOption(question).points }} punct<span v-if="selectedOption(question).points > 1">e</span>
  </p>
</div>

## Rezultatul dumneavoastră curent

<div style="margin: 1.25rem 0 1.75rem; padding: 1rem 1.1rem; border: 1px solid var(--vp-c-divider); border-radius: 10px;">
  <p style="margin: 0; font-size: 1.7rem; font-weight: 700; line-height: 1.2;">{{ totalScore }} / 40</p>
  <p style="margin: 0.15rem 0 0.85rem; font-size: 0.88rem; color: var(--vp-c-text-2);">Scor autoevaluare executivă</p>
  <p style="margin: 0.2rem 0;"><strong>Profil:</strong> {{ currentProfile }}</p>
  <p style="margin: 0.45rem 0 0; color: var(--vp-c-text-2);">{{ profileInterpretation }}</p>
  <p style="margin: 0.75rem 0 0; font-size: 0.84rem; color: var(--vp-c-text-3);">Acest rezultat se actualizează automat pe măsură ce răspundeți la întrebări.</p>
</div>

<SelfAssessmentSubmit
  :answers="answers"
  :language-code="languageCode"
  :language-label="languageLabel"
  :profile-name="currentProfile"
  :questions="questions"
  :total-score="totalScore"
/>

## Profilul dumneavoastră de maturitate

### 10–16 — Tooling Curious

AI este prezentă, dar în principal ca instrument de productivitate individuală. Sistemul de livrare în sine nu s-a schimbat încă.

**Tipar tipic**

- experimentarea este reală
- practicile sunt neuniforme
- încrederea este scăzută
- valoarea este locală, nu sistemică

**Pasul următor**  
Concentrați-vă pe un flux de lucru bine delimitat cu verificare solidă.

### 17–24 — Local Acceleration

Echipele obțin valoare din AI, dar în mare parte fragmentat. Sunteți mai rapizi în unele locuri, dar modelul operațional nu a ținut pasul.

**Tipar tipic**

- mai multe echipe folosesc AI în mod regulat
- adoptarea este practică, dar informală
- guvernanța este inconsistentă
- blocajele se mută, nu dispar

**Pasul următor**  
Treceți de la adoptarea instrumentelor la designul fluxului de lucru.

### 25–32 — Managed Agentic Delivery

AI începe să participe la fluxuri de lucru de livrare structurate, cu supraveghere umană semnificativă și verificare mai puternică.

**Tipar tipic**

- există fluxuri de lucru agentice bine delimitate
- echipele au mai multă încredere în automatizare
- tiparele de revizuire și escaladare apar
- unele părți ale SDLC-ului sunt redesignate

**Pasul următor**  
Industrializați modelul: niveluri de autonomie, pattern-uri harness, metrici comune.

### 33–40 — AI-Native Delivery System

Nu mai tratați AI ca un instrument secundar. Redesignați activ livrarea software în jurul colaborării guvernate uman-agent.

**Tipar tipic**

- AI participă la fluxuri de lucru recurente
- validarea este puternică
- guvernanța este intenționată
- modelul operațional devine cu adevărat agentice

**Pasul următor**  
Concentrați-vă pe scalabilitate, consistență și economie.

## Doriți versiunea mai aprofundată?

Această autoevaluare este doar o primă imagine. Diagnosticul complet Agentic SDLC merge mai adânc în fluxurile de livrare, guvernanță, verificare, designul modelului operațional și pregătirea organizațională.

**Pasul următor recomandat:** cereți la 3–5 lideri din inginerie, produs și livrare să completeze această pagină separat, comparați răspunsurile și identificați unde diverge viziunea.

Acea discuție este adesea mai valoroasă decât scorul în sine.

[**Contactați-mă pentru diagnosticul complet — DM pe LinkedIn, de exemplu**](https://www.linkedin.com/in/nicolas-boitout-phd-8677842/)
