---
pageClass: lecture-01-quiz-page
---

<script setup>
import { computed, reactive, ref } from 'vue'

const isQuizOpen = ref(false)
const currentQuestionIndex = ref(0)
const answers = reactive({})

const questions = [
  {
    id: 'q21',
    prompt: 'A team deploys an Orchestrator -> Worker pattern to build a full-stack feature. The system routinely stalls, and the final integrated code is riddled with API mismatches between the frontend and backend. What is the recognized failure mode for this pattern?',
    options: {
      A: 'The worker agents form a consensus loop, ignoring the orchestrator entirely and committing code directly to the main branch without proper review.',
      B: 'The orchestrator agent lacks the context window size to effectively evaluate the workers, leading it to randomly delete perfectly functional code blocks.',
      C: 'The orchestrator becomes a computational bottleneck, and independent workers produce incompatible artifacts because they lack horizontal visibility.',
      D: "The system relies too heavily on competitive generation, causing the workers to sabotage each other's state files in an attempt to win the execution race.",
    },
    correct: 'C',
    whyCorrect: 'Correct: this is the classic orchestrator-worker failure mode—central bottleneck plus incompatible worker outputs.',
    whyIncorrect: 'Not quite. The recognized failure mode here is orchestrator bottleneck and cross-worker incompatibility.',
  },
  {
    id: 'q22',
    prompt: 'An engineering manager wants to implement a "Peer Review" multi-agent pattern for highly sensitive financial calculation modules. To ensure this pattern works correctly and avoids its primary failure mode, what strict constraint must be applied?',
    options: {
      A: 'The reviewer agent must be granted elevated repository permissions so it can directly overwrite the implementer\'s code without asking for permission.',
      B: 'The reviewer agent must operate sequentially and must be strictly blocked from viewing the implementer\'s original prompt, seeing only the final output.',
      C: 'Both the implementer and reviewer agents must be instantiated from the exact same base model to guarantee they share identical coding standards.',
      D: 'The implementer agent must proactively write a defense of its code structure, which the reviewer agent is required to read before running unit tests.',
    },
    correct: 'B',
    whyCorrect: 'Correct: peer review relies on independence, so prompt isolation is essential to avoid bias and rubber-stamping.',
    whyIncorrect: 'Not quite. The key control is sequential independent review with no visibility into the implementer prompt.',
  },
  {
    id: 'q23',
    prompt: 'Under what specific scenario is the "Competitive Generation" multi-agent pattern the most architecturally sound choice?',
    options: {
      A: 'When migrating a massive legacy monolithic application into microservices where strict adherence to predefined schemas is the absolute top priority.',
      B: 'When the development team has a highly constrained cloud compute budget and needs to minimize the number of API calls made during the CI/CD pipeline.',
      C: 'When tackling creative, open-ended tasks where the solution space is exceptionally large and generating diverse, independent implementations is valuable.',
      D: 'When implementing routine boilerplate code across multiple nested directories where speed and consistency are favored over novel architectural approaches.',
    },
    correct: 'C',
    whyCorrect: 'Correct: competitive generation is strongest for open-ended tasks where diverse solutions improve outcome quality.',
    whyIncorrect: 'Not quite. This pattern is mainly for broad solution spaces, not strict-conformance or cost-minimization scenarios.',
  },
  {
    id: 'q24',
    prompt: 'In a multi-agent system, how should "Shared State" be handled to prevent corruption and synchronization errors?',
    options: {
      A: 'State should be maintained purely in memory via an active WebSocket connection between the orchestrator and all active worker agents.',
      B: 'Each agent must write to named branches or namespaces, and the harness must physically enforce that no two agents modify the same file concurrently.',
      C: 'The team should rely on the base LLM\'s internal threading capabilities to automatically segregate the thoughts of different agents during generation.',
      D: 'All agents should be granted concurrent write access to a single global_state.json file to ensure they always have the most up-to-date information.',
    },
    correct: 'B',
    whyCorrect: 'Correct: branch/namespace isolation plus enforced write constraints are the core anti-corruption controls.',
    whyIncorrect: 'Not quite. Reliable shared state requires explicit file-level concurrency controls enforced by the harness.',
  },
  {
    id: 'q25',
    prompt: 'Why is a multi-agent system necessary for complex software development tasks, rather than relying on a single highly capable agent?',
    options: {
      A: 'Single agents are inherently incapable of writing code in more than one programming language during a single execution session.',
      B: 'Multi-agent systems eliminate the need for an underlying harness because the agents can cross-verify each other\'s behavior natively.',
      C: 'A single agent operating sequentially is fundamentally bounded by the hard limits of its context window capacity and overall latency.',
      D: 'Modern LLM licensing agreements restrict single instances from generating more than a set number of files per project repository.',
    },
    correct: 'C',
    whyCorrect: 'Correct: context-window and latency ceilings are exactly why decomposition and parallelization become necessary.',
    whyIncorrect: 'Not quite. The architectural driver is bounded sequential capacity, not licensing or language limits.',
  },
]

const score = computed(() => questions.reduce((total, question) => {
  if (answers[question.id] === question.correct) return total + 1
  return total
}, 0))

const currentQuestion = computed(() => questions[currentQuestionIndex.value])

const totalAnswered = computed(() => questions.reduce((count, question) => {
  if (answers[question.id]) return count + 1
  return count
}, 0))

const isCorrect = (question) => answers[question.id] === question.correct

function resetQuiz() {
  for (const question of questions) {
    answers[question.id] = ''
  }
  currentQuestionIndex.value = 0
}

function nextQuestion() {
  if (currentQuestionIndex.value < questions.length - 1) {
    currentQuestionIndex.value += 1
  }
}
</script>

# Multi-Agent Coordination Patterns

> **One agent is a tool. Many agents coordinating reliably is an engineering problem.**

## Why multi-agent? {#why}

A single agent operating sequentially is bounded by its context window and its latency. Complex software development tasks — spanning frontend, backend, tests, and documentation — exceed both.

Multi-agent systems solve this by decomposing work across specialized agents running in parallel. But coordination introduces new failure modes that a single-agent harness doesn't anticipate.

## The three coordination patterns {#patterns}

### Pattern 1: Orchestrator → Worker
One orchestrator agent decomposes the task and dispatches subtasks to specialized worker agents. Workers report results back to the orchestrator, which integrates them.

**Best for**: tasks with clear decomposition and limited inter-dependencies.

**Failure mode**: orchestrator becomes a bottleneck; workers produce incompatible artifacts.

### Pattern 2: Peer Review
Two agents work on the same task sequentially — one implements, one reviews. The reviewer cannot see the implementer's prompt, only their output.

**Best for**: high-stakes code where independent verification matters.

**Failure mode**: reviewer rubber-stamps the implementer's work when context bleeds through.

### Pattern 3: Competitive Generation
Multiple agents produce independent implementations of the same feature. A judge agent (or human) selects the best.

**Best for**: creative tasks where the solution space is large.

**Failure mode**: expensive; requires a reliable judge.

## Shared state in multi-agent systems {#shared-state}

The repository remains the shared source of truth. Each agent writes to named branches or namespaced files. The harness enforces:
- No two agents modify the same file concurrently
- State files are written atomically
- The orchestrator reads all worker states before integration

<button class="lecture-quiz-trigger" @click="isQuizOpen = true">Take a short quiz</button>

<div v-if="isQuizOpen" class="lecture-quiz-modal" role="dialog" aria-modal="true" aria-label="Lecture 05 quiz">
<div class="lecture-quiz-backdrop" @click="isQuizOpen = false"></div>
<div class="lecture-quiz-panel">
<div class="lecture-quiz-header">
<h2>Lecture 05: Multi-Agent Patterns</h2>
<button class="lecture-quiz-close" @click="isQuizOpen = false" aria-label="Close quiz">✕</button>
</div>

<p class="lecture-quiz-meta">Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}. Select one answer to get immediate feedback.</p>

<div class="lecture-quiz-question">
<p><strong>{{ currentQuestionIndex + 1 }}. {{ currentQuestion.prompt }}</strong></p>
<div
  v-if="answers[currentQuestion.id]"
  class="lecture-quiz-feedback"
  :class="isCorrect(currentQuestion) ? 'is-correct' : 'is-incorrect'"
>
  <strong>{{ isCorrect(currentQuestion) ? 'Correct' : 'Incorrect' }}</strong>
  <span>{{ isCorrect(currentQuestion) ? 'Great job! Review the rationale below.' : 'Review the rationale below.' }}</span>
</div>

<div v-for="(optionText, optionKey) in currentQuestion.options" :key="optionKey">
  <label
    class="lecture-quiz-option"
    :class="{
      'is-correct': answers[currentQuestion.id] && optionKey === currentQuestion.correct,
      'is-selected-wrong': answers[currentQuestion.id] === optionKey && optionKey !== currentQuestion.correct
    }"
  >
  <input type="radio" :name="currentQuestion.id" :value="optionKey" v-model="answers[currentQuestion.id]">
  <span><strong>{{ optionKey }})</strong> {{ optionText }}</span>
  <span v-if="answers[currentQuestion.id] && optionKey === currentQuestion.correct" class="lecture-quiz-marker">✓</span>
  <span v-else-if="answers[currentQuestion.id] === optionKey && optionKey !== currentQuestion.correct" class="lecture-quiz-marker">✕</span>
  </label>
</div>

<p v-if="answers[currentQuestion.id]" class="lecture-quiz-rationale">
  {{ isCorrect(currentQuestion) ? currentQuestion.whyCorrect : currentQuestion.whyIncorrect }}
</p>
</div>

<div class="lecture-quiz-actions">
<button @click="resetQuiz" class="lecture-quiz-reset">Reset</button>
<span class="lecture-quiz-progress">Answered: {{ totalAnswered }} / 5</span>
<span class="lecture-quiz-progress">Score: {{ score }} / 5</span>
<button
  class="lecture-quiz-submit"
  @click="nextQuestion"
  :disabled="!answers[currentQuestion.id] || currentQuestionIndex === questions.length - 1"
>
  Next Question
</button>
</div>

<p v-if="currentQuestionIndex === questions.length - 1 && answers[currentQuestion.id]" class="lecture-quiz-result">
You reached the last question. Review your score or click Reset to try again.
</p>
</div>
</div>

---

*Next: [Testing Agentic Pipelines →](/en/lectures/lecture-06-testing-agentic-pipelines/)*
