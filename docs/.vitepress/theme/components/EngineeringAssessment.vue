<script setup>
import { computed, reactive, ref, watch, nextTick } from 'vue'
import { questions, profiles, scopes, priorities, title, unknownExplanation, limitedExplanation } from './engineering-assessment/data.mjs'
import { assess, copyResults, requirementText } from './engineering-assessment/scoring.mjs'
const answers = reactive({})
const scope = ref(''), scopeName = ref(''), priority = ref(''), customPriority = ref(''), workflow = ref('')
const result = ref(null), errors = ref([]), generatedDate = ref(''), copied = ref(false), fallback = ref(false)
const errorHeading = ref(null), resultHeading = ref(null), scopeField = ref(null), copyField = ref(null)
const progress = computed(() => questions.filter(q => answers[q.id]).length)
const chosenPriority = computed(() => priority.value === 'Another priority' ? customPriority.value || priority.value : priority.value)
const profile = computed(() => result.value?.status === 'complete' ? profiles[result.value.profile - 1] : null)
const copiedText = computed(() => result.value ? copyResults({ result: result.value, answers, scope: scope.value, scopeName: scopeName.value, priority: chosenPriority.value, workflow: workflow.value, date: generatedDate.value }) : '')
const question = id => questions.find(q => q.id === id)
watch([answers, scope, scopeName], () => { result.value = null; copied.value = false; fallback.value = false; errors.value = [] })
watch([priority, customPriority, workflow], () => { copied.value = false })
async function submit() {
  const next = assess(answers, scope.value)
  copied.value = false; fallback.value = false
  if (next.status === 'incomplete') {
    errors.value = [ ...(!scopes.some(s => s.id === scope.value) ? [{ id: 'assessment-scope', text: 'Choose your engineering scope.' }] : []), ...next.missing.map(id => ({ id, text: `Answer Q${question(id).number}: ${question(id).text}` })) ]
    result.value = null
    await nextTick(); errorHeading.value?.focus()
    return
  }
  errors.value = []; result.value = next; generatedDate.value = new Date().toLocaleDateString()
  await nextTick(); resultHeading.value?.focus()
}
async function copy() {
  copied.value = false
  try { await navigator.clipboard.writeText(copiedText.value); copied.value = true; fallback.value = false }
  catch { fallback.value = true; await nextTick(); copyField.value?.focus(); copyField.value?.select() }
}
async function reset() {
  Object.keys(answers).forEach(key => delete answers[key])
  scope.value = ''; scopeName.value = ''; priority.value = ''; customPriority.value = ''; workflow.value = ''
  result.value = null; errors.value = []; copied.value = false; fallback.value = false
  await nextTick(); scopeField.value?.focus()
}
function focusField(id) { document.getElementById(id)?.querySelector('input')?.focus() }
</script>

<template>
  <div class="engineering-assessment">
    <header class="intro">
      <p class="eyebrow">Engineering leadership · Self-assessment</p>
      <h1>{{ title }}</h1>
      <p class="subtitle">A 5-minute self-assessment for engineering leaders</p>
      <p>Assess how your organization uses AI in software delivery: how widely people use it, what they delegate, how they verify the work, and what value they can demonstrate.</p>
      <p>Answer for the last 30 days. Describe normal practice across the scope you select, rather than your strongest pilot or your future ambition.</p>
      <p>Choose the highest statement that is consistently true. If you cannot verify an answer, select “I don't know.”</p>
      <aside class="definition"><strong>AI-first delivery</strong> means considering AI execution at the start of suitable tasks, then defining the work, providing context, supervising execution, and reviewing results. Engineers remain accountable for what is delivered.</aside>
    </header>
    <details class="method">
      <summary>How this assessment works</summary>
      <p>This is a directional, self-reported diagnostic. Its thresholds are product design choices, not an independently validated industry benchmark.</p>
      <p>Ten equally weighted questions produce a maximum score of 30. “I don't know” counts toward completion but does not receive points. An overall score and profile require all ten answers to be known; a dimension is shown only when all its answers are known.</p>
      <p>Score bands: 0–7 AI exploration; 8–15 Local acceleration; 16–23 Managed agentic delivery; 24–30 AI-native delivery.</p>
      <p>Managed agentic delivery also requires at least the third statement for adoption (Q1), delegation (Q2), verification (Q5), ownership (Q7), and controls (Q8). AI-native delivery requires at least the third statement on every question and the fourth statement on adoption (Q1), delegation (Q2), and workflow (Q3). The score band and these minimum practices must both be met.</p>
      <p>Version 2.0 uses a 0–30 scale. Scores are not comparable with the previous 10–40 assessment.</p>
    </details>
    <form @submit.prevent="submit" novalidate>
      <fieldset id="assessment-scope" class="card">
        <legend ref="scopeField" tabindex="-1">Which engineering organization are you assessing?</legend>
        <label v-for="s in scopes" :key="s.id" class="choice"><input v-model="scope" type="radio" name="scope" :value="s.id" aria-describedby="scope-help"> <span>{{ s.text }}</span></label>
        <label class="text-label" for="scope-name">Scope name <span class="muted">(optional)</span></label>
        <input id="scope-name" v-model="scopeName" type="text" maxlength="100" placeholder="For example: Payments Engineering">
        <p id="scope-help" class="helper">Keep this scope consistent throughout. A result for one team describes that team, not the whole organization.</p>
      </fieldset>
      <div class="progress" aria-live="polite"><strong>{{ progress }} of 10 questions answered</strong><progress :value="progress" max="10" aria-label="Questions answered"></progress></div>
      <fieldset v-for="q in questions" :id="q.id" :key="q.id" class="card">
        <legend><span class="question-number">{{ q.number }} / 10</span>{{ q.text }}</legend>
        <p :id="q.id + '-help'" class="helper">{{ q.helper }}</p>
        <label v-for="option in q.options" :key="option.id" class="choice" :class="{ selected: answers[q.id] === option.id }"><input v-model="answers[q.id]" type="radio" :name="q.id" :value="option.id" :aria-describedby="q.id + '-help'"><span>{{ option.text }}</span></label>
      </fieldset>
      <section class="card optional" aria-labelledby="next-step-title">
        <h2 id="next-step-title">Your next step</h2>
        <p class="helper">Optional. These answers do not affect your score or profile.</p>
        <label class="text-label" for="priority">What is the most useful improvement you want to achieve in the next 90 days?</label>
        <select id="priority" v-model="priority"><option value="">Choose a priority (optional)</option><option v-for="p in priorities" :key="p">{{ p }}</option></select>
        <template v-if="priority === 'Another priority'"><label class="text-label" for="custom-priority">Another priority (optional)</label><input id="custom-priority" v-model="customPriority" maxlength="200"></template>
        <label class="text-label" for="workflow">What concrete workflow would you use to make progress?</label>
        <textarea id="workflow" v-model="workflow" maxlength="400" rows="4" aria-describedby="workflow-help" placeholder="For example: prepare a tested change for a recurring class of maintenance ticket, with engineer approval before merge."></textarea>
        <p id="workflow-help" class="helper">Describe the task, who would own it, and what success would look like. Avoid confidential project details.</p>
      </section>
      <div v-if="errors.length" class="error" role="alert"><h2 ref="errorHeading" tabindex="-1">Please complete the missing fields</h2><ul><li v-for="error in errors" :key="error.id"><a :href="'#' + error.id" @click.prevent="focusField(error.id)">{{ error.text }}</a></li></ul></div>
      <div class="actions"><button type="submit" class="primary">See my results</button><button type="button" @click="reset">Start again</button></div>
      <p class="helper">Your answers stay in this page. No account or contact information is required.</p>
    </form>
    <section v-if="result" class="results" aria-labelledby="result-title">
      <h2 id="result-title" ref="resultHeading" tabindex="-1">{{ profile ? 'Your engineering delivery profile' : 'Assessment complete — visibility gaps' }}</h2>
      <h3 v-if="profile" class="profile-name">{{ profile.name }}</h3>
      <p><strong>Assessed scope:</strong> {{ scopes.find(s => s.id === scope)?.text }}<template v-if="scopeName"> — {{ scopeName }}</template></p>
      <template v-if="profile"><p class="score">{{ result.total }} / 30<span>Self-assessment score</span></p><p>{{ profile.description }}</p><p><strong>Next move:</strong> {{ profile.nextMove }}</p></template>
      <p v-else>{{ unknownExplanation }}</p>
      <div class="dimensions"><div v-for="d in result.dimensions" :key="d.id" class="dimension"><strong>{{ d.label }}</strong><span>{{ d.score === null ? 'Not enough information' : `${d.score} / ${d.maximum}` }}</span><meter v-if="d.score !== null" :value="d.score" min="0" :max="d.maximum" :aria-label="d.label"></meter><small>Questions {{ d.numbers.join(', ') }}</small></div></div>
      <p class="helper">Each dimension uses its own maximum. Business impact is one directional indicator, not an equally detailed sub-assessment.</p>
      <div v-if="result.limited" class="callout"><h3>Practices needed for the next profile</h3><p>{{ limitedExplanation }}</p><ul><li v-for="id in result.limitingQuestionIds" :key="id">{{ requirementText(result, id) }}</li></ul></div>
      <template v-if="result.unknownIds"><h3>Establish these answers</h3><ul><li v-for="id in result.unknownIds" :key="id"><a :href="'#' + id" @click.prevent="focusField(id)">Q{{ question(id).number }}. {{ question(id).text }}</a><p>Ask: {{ question(id).owner }}</p></li></ul></template>
      <template v-if="result.recommendationIds?.length"><h3>Your improvement priorities</h3><ol><li v-for="id in result.recommendationIds" :key="id">{{ question(id).recommendation }}</li></ol></template>
      <div v-if="chosenPriority || workflow" class="callout"><h3>Your chosen next step</h3><p v-if="chosenPriority">{{ chosenPriority }}</p><p v-if="workflow" class="user-text">{{ workflow }}</p></div>
      <h3>Compare perspectives before deciding what to change.</h3>
      <p>Ask an engineering leader, an engineering manager, and engineers doing the work to complete the assessment independently for the same scope. Compare the answers, investigate disagreements, and choose one improvement to pursue over the next 90 days.</p>
      <div class="actions"><button type="button" class="primary" @click="copy">Copy my results</button><a href="https://www.linkedin.com/in/nicolas-boitout-phd-8677842/">Discuss an engineering delivery diagnostic</a></div>
      <p v-if="copied" role="status">Results copied.</p>
      <div v-if="fallback"><label class="text-label" for="copy-fallback">Clipboard access is unavailable. Select and copy your results below.</label><textarea id="copy-fallback" ref="copyField" :value="copiedText" readonly rows="12"></textarea></div>
      <p class="helper">This profile reflects your answers for the selected scope. It is a starting point for an engineering leadership discussion, not an independent audit or certification.</p>
    </section>
  </div>
</template>

<style scoped src="./engineering-assessment/styles.css"></style>
