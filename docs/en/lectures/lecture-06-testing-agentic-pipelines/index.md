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
    id: 'q26',
    prompt: 'A QA engineer realizes that while their Cypress tests prove the application functions correctly, they have no idea if the AI agent actually respected the directory constraints during development. What specific type of testing does this pipeline lack?',
    options: {
      A: 'Level 1: Output tests, which strictly evaluate the runtime performance of the agent-generated code against baseline human metrics.',
      B: 'Level 2: Behavior tests, which verify harness constraint compliance by inspecting the agent\'s trace and state files rather than the code output.',
      C: 'Level 3: Regression tests, which ensure that future updates to the foundational model do not degrade the agent\'s overall coding capabilities.',
      D: 'Level 4: Integration tests, which confirm that the agent\'s new code seamlessly connects with the enterprise\'s external third-party API providers.',
    },
    correct: 'B',
    whyCorrect: 'Correct: this gap is behavior testing—checking whether the agent followed harness constraints, not just whether output works.',
    whyIncorrect: 'Not quite. The missing layer is Level 2 behavior tests over trace/state compliance.',
  },
  {
    id: 'q27',
    prompt: 'Why is Red/Green Test-Driven Development (TDD) described as a powerful "Micro-Harness" for coding agents?',
    options: {
      A: 'It drastically reduces the number of tokens the agent needs to generate, saving the enterprise money on expensive large language model API requests.',
      B: 'It allows the agent to automatically write its own test cases, completely removing the need for a human engineer to define the feature\'s acceptance criteria.',
      C: 'It relies on the model\'s internal vibe coding abilities to guess the expected behavior, resulting in faster iteration speeds compared to traditional methods.',
      D: 'It provides an external, deterministic signal that the agent cannot bluff, turning an open-ended generation task into a tightly controlled verification loop.',
    },
    correct: 'D',
    whyCorrect: 'Correct: red/green creates a deterministic oracle the agent cannot bluff and enforces a bounded loop.',
    whyIncorrect: 'Not quite. The key value is deterministic external verification, not token savings or autonomous test invention.',
  },
  {
    id: 'q28',
    prompt: 'An engineering team modifies the AGENTS.md file to update their strict naming conventions. Shortly after, the agent begins failing to properly write state files. What testing protocol is designed specifically to catch this exact issue?',
    options: {
      A: 'Harness regression tests, which verify that the agent still produces correct operational behavior after changes are made to its constraints or prompts.',
      B: 'Semantic output tests, which analyze the generated source code to ensure it aligns with the updated naming conventions defined in the markdown file.',
      C: 'Multi-agent competitive evals, where a secondary agent grades the primary agent\'s compliance with the newly established static context rules.',
      D: 'End-to-end integration tests, which run the entire application pipeline to ensure the updated naming conventions haven\'t broken the user interface.',
    },
    correct: 'A',
    whyCorrect: 'Correct: regression tests on harness behavior are exactly for detecting behavior breaks after constraint/prompt changes.',
    whyIncorrect: 'Not quite. The scenario describes harness-change side effects, which are caught by harness regression tests.',
  },
  {
    id: 'q29',
    prompt: 'When establishing the "eval mindset" for testing agent behavior, what are the three necessary components of a successful evaluation?',
    options: {
      A: 'A human reviewer, an isolation container, and a continuous integration pipeline.',
      B: 'A fixed input, a reference output defining expected behavior, and a discrete scoring function.',
      C: 'A variable prompt, a dynamically generated state file, and an algorithmic timeout threshold.',
      D: 'A multi-agent orchestrator, a worker agent execution trace, and a graphical performance dashboard.',
    },
    correct: 'B',
    whyCorrect: 'Correct: evals require fixed input, expected behavior reference, and explicit scoring.',
    whyIncorrect: 'Not quite. The eval core is input + expected behavior + scoring function.',
  },
  {
    id: 'q30',
    prompt: 'What is the recommended practical rule for initiating a behavioral change with a coding agent using the TDD micro-harness pattern?',
    options: {
      A: 'Instruct the agent to "Implement this feature, and ensure you write comprehensive unit tests after the code compiles successfully."',
      B: 'Instruct the agent to "Analyze the existing architecture, generate a technical design document, and await human approval before coding."',
      C: 'Instruct the agent to "Add a test capturing the expected behavior, confirm it fails, then implement the minimum change needed to pass."',
      D: 'Instruct the agent to "Read the AGENTS.md file, update the feature_list.json, and rewrite the entire module to conform to the new standards."',
    },
    correct: 'C',
    whyCorrect: 'Correct: start with a failing test, then implement the minimal change to pass—this is the micro-harness rule.',
    whyIncorrect: 'Not quite. The recommended rule is explicitly test-first with fail-then-fix loop discipline.',
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

# Testing Agentic Pipelines

> **Unit tests test code. Harness tests test behavior. You need both.**

## The testing gap {#gap}

Traditional unit and integration tests verify that code does what it's supposed to do. They don't verify that the agent did what it was supposed to do.

Agentic pipelines require a second layer of testing — **harness tests** — that verify the agent's behavior, not just its output.

## Three levels of agentic testing {#levels}

### Level 1: Output tests (standard)
Does the code the agent produced work correctly? Standard unit and integration tests cover this. Your CI pipeline should run these unconditionally after every agent session.

### Level 2: Behavior tests
Did the agent respect the harness constraints?
- Did it stay within scope?
- Did it write the state file correctly?
- Did it run the verification pipeline before marking complete?

These are checked by inspecting the agent's trace and the state file, not the code output.

### Level 3: Regression tests
Does the agent still produce correct behavior after you change the harness — the AGENTS.md, the feature list format, the prompt structure?

Regression tests for agent behavior are the hardest to write and the most valuable to maintain.

## Red/Green TDD as a Micro-Harness

One of the simplest ways to make coding agents more reliable is to place them inside a **red/green TDD loop**.

The idea is simple:

1. **Write or update a test first**
2. **Run it and confirm that it fails**
3. **Ask the agent to implement the change**
4. **Run the tests again until they pass**

This matters because coding agents are good at producing plausible code, but plausibility is not enough. A failing test creates an external signal the agent cannot easily bluff. A passing test creates a bounded definition of success. In that sense, red/green TDD acts as a **micro-harness**: it gives the agent a target, an oracle, and a stop condition.

Simon Willison recommends this pattern because models already understand the shorthand. Saying “use red/green TDD” is often enough to trigger a better execution loop: define the expected behavior, prove the current system does not satisfy it, then iterate until it does.

This pattern is especially valuable for agentic engineering because it addresses two common failure modes at once:

- the agent writes code that looks reasonable but does not actually work
- the agent claims completion without strong external evidence

A red/green loop reduces both risks by forcing the work through a deterministic feedback channel.

There is also a second lesson here: **tests are not only for verification, they are also for orientation**. Agents often inspect existing tests to understand how a feature is supposed to behave. That means a good test suite is not just a safety net for changes. It is also part of the repository’s working memory for future agents.

### Practical rule

When a coding agent is about to change behavior, do not start with:

> Implement this feature.

Start with:

> Add or update a test that captures the expected behavior. Run it, confirm it fails, then implement the minimum change needed to make it pass.

That small shift turns an open-ended generation task into a controlled verification loop.

### Key takeaway

**Red/green TDD is not just a development method. For coding agents, it is a reliability harness.**

## The eval mindset {#evals}

Think of agent behavior testing as **evals** — a discipline borrowed from LLM evaluation research. An eval consists of:
- A fixed input (task description + context)
- A reference output (expected behavior, not expected code)
- A scoring function (did the agent do what was asked?)

Start with three to five evals per harness. Run them on every harness change. Treat harness regressions as seriously as code regressions.

<button class="lecture-quiz-trigger" @click="isQuizOpen = true">Take a short quiz</button>

<div v-if="isQuizOpen" class="lecture-quiz-modal" role="dialog" aria-modal="true" aria-label="Lecture 06 quiz">
<div class="lecture-quiz-backdrop" @click="isQuizOpen = false"></div>
<div class="lecture-quiz-panel">
<div class="lecture-quiz-header">
<h2>Lecture 06: Testing Agentic Pipelines</h2>
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

## Recommended reading

- [Simon Willison — Red/green TDD](https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/) — A practical explanation of why test-first development is one of the strongest reliability patterns for coding agents.

---

*Next: [Observability →](/en/lectures/lecture-07-observability/)*
