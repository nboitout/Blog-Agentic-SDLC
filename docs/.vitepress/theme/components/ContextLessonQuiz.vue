<script setup>
import { computed, nextTick, ref } from 'vue'
import { questions } from './context-decisions/quiz.mjs'
const dialog = ref(null)
const trigger = ref(null)
const current = ref(0)
const answers = ref({})
const question = computed(() => questions[current.value])
const score = computed(() => questions.filter(q => answers.value[q.id] === q.correct).length)
const answered = computed(() => Object.keys(answers.value).length)
async function focusQuestion() {
  await nextTick()
  dialog.value.querySelector('legend').focus({ preventScroll: true })
  dialog.value.scrollTop = 0
}
function reset() { answers.value = {}; current.value = 0; focusQuestion() }
function move(delta) { current.value += delta; focusQuestion() }
function close() { dialog.value.close(); trigger.value.focus() }
</script>

<template>
  <button ref="trigger" class="lecture-quiz-trigger" @click="dialog.showModal()">Take a short quiz</button>
  <dialog ref="dialog" class="context-quiz" aria-labelledby="context-quiz-title" @close="trigger?.focus()" @click="event => { if (event.target === dialog) close() }">
    <div class="quiz-header">
      <h2 id="context-quiz-title">Lecture 03: Context Engineering</h2>
      <button autofocus aria-label="Close quiz" @click="close">Close</button>
    </div>
    <p>Question {{ current + 1 }} of {{ questions.length }}. Select one answer for feedback.</p>
    <fieldset :key="question.id">
      <legend tabindex="-1">{{ question.prompt }}</legend>
      <label v-for="(option, key) in question.options" :key="key" class="quiz-option">
        <input v-model="answers[question.id]" type="radio" :name="question.id" :value="key">
        <span><strong>{{ key }}.</strong> {{ option }}</span>
      </label>
    </fieldset>
    <p v-if="answers[question.id]" class="feedback" role="status">
      <strong>{{ answers[question.id] === question.correct ? 'Correct.' : 'Consider the evidence.' }}</strong>
      {{ question.feedback[answers[question.id]] }}
    </p>
    <div class="quiz-footer">
      <button @click="reset">Reset quiz</button>
      <span>Answered: {{ answered }} / 5 · Score: {{ score }} / 5</span>
      <button :disabled="current === 0" @click="move(-1)">Previous question</button>
      <button :disabled="!answers[question.id] || current === questions.length - 1" @click="move(1)">Next question</button>
    </div>
    <p v-if="answered === questions.length">All five answered. Review any question or reset to try again.</p>
  </dialog>
</template>

<style scoped>
.context-quiz { background: var(--vp-c-bg); color: var(--vp-c-text-1); border: 1px solid var(--vp-c-divider); border-radius: 16px; padding: 24px; width: min(740px, calc(100vw - 32px)); max-height: 86vh; margin: auto; overflow: auto; }
.context-quiz::backdrop { background: #0009; }
.quiz-header, .quiz-footer { display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; }
.quiz-header h2 { margin: 0; border: 0; padding: 0; font-size: 1.2rem; }
fieldset { border: 0; padding: 0; margin: 16px 0; } legend { font-weight: 650; margin-bottom: 12px; }
.quiz-option { display: flex; align-items: start; gap: 12px; padding: 12px; margin: 10px 0; border: 1px solid var(--vp-c-divider); border-radius: 8px; cursor: pointer; }
.quiz-option:has(input:checked) { border-color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); }
input { margin-top: 5px; accent-color: #4f46e5; flex-shrink: 0; }
button { min-height: 44px; padding: 8px 14px; border: 1px solid var(--vp-c-divider); border-radius: 8px; cursor: pointer; }
button:disabled { opacity: .45; cursor: default; } button:focus-visible, input:focus-visible { outline: 3px solid var(--vp-c-brand-1); outline-offset: 3px; }
.feedback { padding: 14px; background: var(--vp-c-brand-soft); border-radius: 8px; }
</style>
