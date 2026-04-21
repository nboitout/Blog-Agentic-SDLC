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
    id: 'q16',
    prompt: 'An enterprise architecture team is debating how to constrain their new AI coding assistant. One engineer suggests spending a week refining the system prompt to handle every edge case. Why does the Agentic SDLC advocate for Harness Design over Prompt Engineering for reliability?',
    options: {
      A: 'Prompt engineering only works effectively with OpenAI models, whereas a repository-based harness is completely model-agnostic and universally applicable.',
      B: 'Prompts shape agent intent with low reliability and no auditability, while harnesses enforce physical behavior and maintain a full verifiable git history.',
      C: 'Harness design requires significantly less initial setup time than prompt engineering, allowing teams to deploy autonomous agents much faster.',
      D: 'Prompt engineering relies entirely on human-in-the-loop governance, whereas a well-designed harness allows the agent to function without any oversight.',
    },
    correct: 'B',
    whyCorrect: 'Correct: prompts influence intent, but harnesses enforce behavior with deterministic checks and auditable history.',
    whyIncorrect: 'Not quite. The key distinction is enforceability and auditability: harnesses create physical control boundaries.',
  },
  {
    id: 'q17',
    prompt: 'According to the five primitives of Harness Design, how must an agentic system handle the concept of "State"?',
    options: {
      A: 'State must be continuously streamed to a cloud-based vector database so the agent can perform semantic similarity searches on past decisions.',
      B: "State must be managed internally within the LLM's context window, utilizing advanced prompt techniques to maintain continuity across multiple turns.",
      C: 'State must be treated as secondary to the actual source code, meaning the agent only needs to log its actions if a critical compilation error occurs.',
      D: 'State must use the filesystem as the single source of truth, with progress, decisions, and failures written explicitly to files within the repository.',
    },
    correct: 'D',
    whyCorrect: 'Correct: harness design treats repository files as the authoritative state layer for continuity and recovery.',
    whyIncorrect: 'Not quite. In this model, state is explicit and file-based, not implicit or optional.',
  },
  {
    id: 'q18',
    prompt: 'A coding agent attempts to mark a Jira ticket as complete immediately after generating the required Python script. The system immediately rejects the status change. Which harness primitive is responsible for this rejection?',
    options: {
      A: 'Filesystem as state, which forces the agent to write its completion status to a local markdown file rather than updating the remote Jira board.',
      B: 'Continuity protocol, which requires the agent to generate a structured handoff document for the next session before it can officially terminate.',
      C: 'State transitions, which enforce explicit valid states and physically prevent marking a task complete unless the automated verification pipeline passes.',
      D: 'Scope enforcement, which detects that the agent modified files outside of its permitted directory and automatically rolls back the entire commit.',
    },
    correct: 'C',
    whyCorrect: 'Correct: state transitions enforce valid lifecycle gates, including blocking completion before verification passes.',
    whyIncorrect: 'Not quite. The blocking behavior here is specifically state-transition enforcement tied to verification.',
  },
  {
    id: 'q19',
    prompt: 'What are the essential components of a "Minimal Harness Pack" required to safely execute a basic agentic project?',
    options: {
      A: 'AGENTS.md for static rules, feature_list.json for task status, and progress.md for current session state.',
      B: 'prompt.txt for instructions, docker-compose.yml for isolation, and logs.txt for basic debugging output.',
      C: 'main.py for orchestrator logic, worker.py for execution, and evals.json for scoring the agent\'s final output.',
      D: 'architecture.md for system design, tests.spec.ts for verification, and memory.db for SQLite state persistence.',
    },
    correct: 'A',
    whyCorrect: 'Correct: the minimal pack is AGENTS.md + feature_list.json + progress.md.',
    whyIncorrect: 'Not quite. The lecture defines a specific three-file minimal harness pack.',
  },
  {
    id: 'q20',
    prompt: 'A harness answers four critical questions deterministically. Which of the following accurately represents how a harness answers "What can the agent do?"',
    options: {
      A: "By dynamically evaluating the agent's assigned role and requesting human permission via Slack before executing any sensitive commands.",
      B: 'By defining explicit allow-lists of files and directories the agent may touch, and physically blocking attempts to modify out-of-scope files.',
      C: "By analyzing the semantic meaning of the task description and allowing the model to self-regulate its access to the repository's sensitive modules.",
      D: 'By relying on the static instructions provided in the AGENTS.md file to persuade the model not to stray beyond its designated architectural boundaries.',
    },
    correct: 'B',
    whyCorrect: 'Correct: harnesses enforce capability through explicit scope boundaries and hard blocking.',
    whyIncorrect: 'Not quite. The reliable mechanism is enforced scope control, not persuasion or role interpretation.',
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

# Harness Design: Constraining Agents for Reliability

> **A harness is not a cage. It's the infrastructure that lets the agent run fast without crashing.**

## What a harness is {#definition}

A harness is the collection of files, scripts, conventions, and automated checks that surround an AI agent and shape its behavior. It is not the agent itself — it is the environment the agent operates in.

The harness answers four questions deterministically:
1. **What can the agent do?** (scope and permissions)
2. **What has been done?** (state management)
3. **Did it work?** (verification)
4. **What should happen next?** (continuity)

## From software factory fantasy to real engineering {#factory-fantasy}

A common mistake is to interpret coding agents as a simple path to a “software factory” in which code flows automatically from idea to production.

That framing is misleading.

Agentic systems do not remove the need for engineering discipline. They increase it.

The more autonomy you introduce, the more you need:

- better boundaries
- better sensors
- better rollback paths
- better observability
- better definitions of acceptable failure

Autonomy without harnesses creates fragility, not leverage.

## The five harness primitives {#primitives}

### 1. Filesystem as state
The repository is the single source of truth. The harness writes all state — progress, decisions, failures — to files in the repo, not to the agent's memory.

### 2. Scope enforcement
The harness defines explicit allow-lists of files and directories the agent may touch. Attempts to modify out-of-scope files are blocked or flagged.

### 3. Verification pipeline
A deterministic test suite runs automatically after every agent action. The harness does not ask the agent whether to run tests — it runs them unconditionally.

### 4. State transitions
The harness defines explicit states (`planning`, `in_progress`, `verifying`, `complete`, `failed`) and enforces valid transitions. An agent cannot mark a task `complete` without the verification pipeline passing.

### 5. Continuity protocol
Every session ends with a structured handoff file that contains enough context for the next session to resume without human intervention.

## A minimal harness pack {#minimal}

The minimum viable harness for an agentic project consists of three files:

```
AGENTS.md           # Static context and rules
feature_list.json   # Task registry with status
progress.md         # Current session state
```

See the [Templates](/en/resources/templates/) section for copy-ready versions of all three.

## Harness vs. prompt engineering {#vs-prompts}

| Approach | Where control lives | Reliability | Auditability |
|---|---|---|---|
| Prompt engineering | Agent's context | Low | None |
| Harness design | Repository + scripts | High | Full git history |

Prompts shape agent *intent*. Harnesses shape agent *behavior*. Both matter, but in a production agentic SDLC, harness design is the foundation.

<button class="lecture-quiz-trigger" @click="isQuizOpen = true">Take a short quiz</button>

<div v-if="isQuizOpen" class="lecture-quiz-modal" role="dialog" aria-modal="true" aria-label="Lecture 04 quiz">
<div class="lecture-quiz-backdrop" @click="isQuizOpen = false"></div>
<div class="lecture-quiz-panel">
<div class="lecture-quiz-header">
<h2>Lecture 04: Harness Design</h2>
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

*Next: [Multi-Agent Patterns →](/en/lectures/lecture-05-multi-agent-patterns/)*
