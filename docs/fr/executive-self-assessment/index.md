<script setup>
import { computed, reactive } from 'vue'

const questions = [
  {
    id: 'q1',
    text: "Comment l'IA est-elle utilisée aujourd'hui par vos équipes software ?",
    options: [
      { key: 'A', points: 1, label: 'Principalement comme expérimentation individuelle' },
      { key: 'B', points: 2, label: 'Utilisée par certains ingénieurs pour accélérer leur travail personnel' },
      { key: 'C', points: 3, label: "Utilisée dans des workflows d'équipe récurrents" },
      { key: 'D', points: 4, label: 'Intégrée dans les delivery processes avec des operating rules claires' },
    ],
  },
  {
    id: 'q2',
    text: "Quand un outil IA génère du code, que se passe-t-il ensuite ?",
    options: [
      { key: 'A', points: 1, label: 'Un développeur review et corrige tout manuellement, au cas par cas' },
      { key: 'B', points: 2, label: 'Le code est utile, mais la validation reste surtout manuelle' },
      { key: 'C', points: 3, label: 'Les checks standards sont généralement lancés avant intégration' },
      { key: 'D', points: 4, label: 'Le code entre dans une loop gouvernée avec verification et escalation rules explicites' },
    ],
  },
  {
    id: 'q3',
    text: 'Quelle phrase décrit le mieux votre delivery model ?',
    options: [
      { key: 'A', points: 1, label: "L'IA aide les individus, mais le SDLC reste inchangé" },
      { key: 'B', points: 2, label: 'Certaines équipes adaptent leur workflow de façon informelle' },
      { key: 'C', points: 3, label: "Nous redesignons certaines parties du delivery autour d'agent workflows" },
      { key: 'D', points: 4, label: 'Nous évoluons volontairement vers un agentic operating model' },
    ],
  },
  {
    id: 'q4',
    text: "Votre organisation serait-elle à l'aise avec un agent ouvrant une pull request pendant la nuit ?",
    options: [
      { key: 'A', points: 1, label: "Pas du tout à l'aise" },
      { key: 'B', points: 2, label: 'Uniquement comme expérimentation' },
      { key: 'C', points: 3, label: "À l'aise dans certains cas bien bornés" },
      { key: 'D', points: 4, label: 'Déjà normal dans certains workflows sélectionnés' },
    ],
  },
  {
    id: 'q5',
    text: 'Comment qualifieriez-vous votre posture de testing et verification ?',
    options: [
      { key: 'A', points: 1, label: 'Les tests sont inégaux et souvent manuels' },
      { key: 'B', points: 2, label: "Nous avons de l'automatisation, mais elle n'est pas toujours fiable" },
      { key: 'C', points: 3, label: 'Les parcours importants ont des automated checks fiables' },
      { key: 'D', points: 4, label: 'La verification est assez solide pour supporter une autonomie agentique gouvernée' },
    ],
  },
  {
    id: 'q6',
    text: "Quand l'IA produit le mauvais résultat, quelle est la réponse habituelle ?",
    options: [
      { key: 'A', points: 1, label: 'Les équipes perdent confiance et reviennent au travail manuel' },
      { key: 'B', points: 2, label: "L'output est corrigé au cas par cas" },
      { key: 'C', points: 3, label: 'Nous affinons les prompts et les pratiques de travail' },
      { key: 'D', points: 4, label: 'Nous améliorons le harness : scope, context, checks, state et recovery rules' },
    ],
  },
  {
    id: 'q7',
    text: "Qui possède le design des workflows humain + IA en engineering ?",
    options: [
      { key: 'A', points: 1, label: 'Personne explicitement' },
      { key: 'B', points: 2, label: 'Des ingénieurs individuels ou enthousiastes' },
      { key: 'C', points: 3, label: 'Certains engineering leaders ou pilot teams' },
      { key: 'D', points: 4, label: "C'est traité comme une responsabilité d'operating model" },
    ],
  },
  {
    id: 'q8',
    text: 'Quelle phrase reflète le mieux votre governance model actuel ?',
    options: [
      { key: 'A', points: 1, label: 'Pas de règles claires ; chacun utilise les outils comme il veut' },
      { key: 'B', points: 2, label: 'Quelques bonnes pratiques informelles existent' },
      { key: 'C', points: 3, label: 'Des guardrails sont définis pour certains workflows' },
      { key: 'D', points: 4, label: 'Autonomy levels, checkpoints et review protocols sont explicites' },
    ],
  },
  {
    id: 'q9',
    text: "Comment pensez-vous la valeur de l'IA dans le software delivery ?",
    options: [
      { key: 'A', points: 1, label: 'Meilleure productivité individuelle' },
      { key: 'B', points: 2, label: 'Coding et documentation plus rapides' },
      { key: 'C', points: 3, label: "Meilleur throughput et meilleure qualité à l'échelle équipe" },
      { key: 'D', points: 4, label: 'Un delivery system redesigné avec une nouvelle économie et de nouveaux rôles' },
    ],
  },
  {
    id: 'q10',
    text: 'Sur les 12 prochains mois, quelle est votre vraie ambition ?',
    options: [
      { key: 'A', points: 1, label: 'Laisser les équipes explorer en sécurité' },
      { key: 'B', points: 2, label: 'Standardiser quelques outils utiles' },
      { key: 'C', points: 3, label: 'Scaler les pratiques prouvées sur plusieurs équipes' },
      { key: 'D', points: 4, label: 'Construire une capability mesurable, gouvernée et agentique de software delivery' },
    ],
  },
]

const answers = reactive({})
const languageCode = 'fr'
const languageLabel = 'Français'

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
    return "L'IA est principalement un outil d'aide individuelle aujourd'hui ; le delivery model lui-même n'a pas encore évolué."
  }
  if (totalScore.value <= 24) {
    return 'Vous engrangez des gains concrets, mais workflows et gouvernance restent fragmentés entre les équipes.'
  }
  if (totalScore.value <= 32) {
    return 'Des workflows agentiques structurés émergent, avec une supervision humaine plus forte et une meilleure vérification.'
  }
  return 'Vous évoluez vers un modèle de delivery gouverné et AI-native, avec une collaboration humain-agent récurrente.'
})
</script>

# À quel point votre software delivery model est-il agentique ?

**Une auto-évaluation dirigeant en 3 minutes**

Cette auto-évaluation courte s'adresse aux executives et engineering leaders qui veulent une lecture rapide et structurée de la maturité actuelle de leur organisation en AI-native software delivery. Ce n'est pas un quiz technique. C'est une photographie pratique de la manière dont l'IA est réellement utilisée aujourd'hui dans votre delivery model.

**Conseil :** ne répondez pas selon vos ambitions IA. Répondez selon la manière dont votre organisation fonctionne réellement aujourd'hui.

## 10 questions

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
    Sélectionné : <strong>{{ selectedOption(question).key }}</strong> — {{ selectedOption(question).points }} point<span v-if="selectedOption(question).points > 1">s</span>
  </p>
</div>

## Votre résultat actuel

<div style="margin: 1.25rem 0 1.75rem; padding: 1rem 1.1rem; border: 1px solid var(--vp-c-divider); border-radius: 10px;">
  <p style="margin: 0; font-size: 1.7rem; font-weight: 700; line-height: 1.2;">{{ totalScore }} / 40</p>
  <p style="margin: 0.15rem 0 0.85rem; font-size: 0.88rem; color: var(--vp-c-text-2);">Score auto-évaluation dirigeant</p>
  <p style="margin: 0.2rem 0;"><strong>Profil :</strong> {{ currentProfile }}</p>
  <p style="margin: 0.45rem 0 0; color: var(--vp-c-text-2);">{{ profileInterpretation }}</p>
  <p style="margin: 0.75rem 0 0; font-size: 0.84rem; color: var(--vp-c-text-3);">Ce résultat se met à jour automatiquement au fur et à mesure que vous répondez aux questions.</p>
</div>

<SelfAssessmentSubmit
  :answers="answers"
  :language-code="languageCode"
  :language-label="languageLabel"
  :profile-name="currentProfile"
  :questions="questions"
  :total-score="totalScore"
/>

## Votre profil de maturité

### 10–16 — Tooling Curious

L'IA est présente, mais surtout comme outil de productivité individuelle. Le delivery system lui-même n'a pas encore changé.

**Schéma typique**

- l'expérimentation est réelle
- les pratiques sont inégales
- la confiance est faible
- la valeur est locale, pas systémique

**Prochaine étape**  
Concentrez-vous sur un workflow bien borné avec une vérification solide.

### 17–24 — Local Acceleration

Les équipes tirent de la valeur de l'IA, mais de manière fragmentée. Vous êtes plus rapides par endroits, mais l'operating model doit encore rattraper.

**Schéma typique**

- plusieurs équipes utilisent l'IA régulièrement
- l'adoption est pratique, mais informelle
- la gouvernance est inconsistante
- les bottlenecks se déplacent plutôt que de disparaître

**Prochaine étape**  
Passez de l'adoption d'outils au workflow design.

### 25–32 — Managed Agentic Delivery

L'IA commence à participer à des delivery workflows structurés, avec une supervision humaine significative et une vérification plus forte.

**Schéma typique**

- des workflows agentiques bornés existent
- les équipes font davantage confiance à l'automatisation
- les patterns de review et d'escalation émergent
- certaines parties du SDLC sont redesignées

**Prochaine étape**  
Industrialisez le modèle : autonomy levels, harness patterns, shared metrics.

### 33–40 — AI-Native Delivery System

Vous ne traitez plus l'IA comme un side tool. Vous redesigniez activement le software delivery autour d'une collaboration humain-agent gouvernée.

**Schéma typique**

- l'IA participe à des workflows récurrents
- la validation est solide
- la gouvernance est intentionnelle
- l'operating model devient genuinement agentique

**Prochaine étape**  
Travaillez la scale, la cohérence et l'économie du modèle.

## Vous voulez la version approfondie ?

Cette auto-évaluation n'est qu'une première photographie. Le diagnostic Agentic SDLC complet va plus loin dans les delivery workflows, la gouvernance, la vérification, l'operating-model design et la readiness organisationnelle.

**Prochaine étape recommandée :** demandez à 3–5 leaders engineering, product et delivery de compléter cette page séparément, comparez les réponses et identifiez les divergences d'hypothèses.

Cette discussion est souvent plus précieuse que le score lui-même.

[**Me contacter pour le diagnostic complet — par exemple en DM LinkedIn**](https://www.linkedin.com/in/nicolas-boitout-phd-8677842/)
