---
pageClass: lecture-01-quiz-page
---

<script setup>
import { computed, reactive, ref } from 'vue'

const isQuizOpen = ref(false)
const isSubmitted = ref(false)
const answers = reactive({})

const questions = [
  {
    id: 'q1',
    prompt: 'A development team integrates an AI coding agent into their existing Agile workflow. Despite writing functional code snippets, the agent frequently rewrites unrelated modules and marks complex user stories as "done" before tests pass. What is the primary architectural cause of this failure mode?',
    options: {
      A: "The agent suffers from context amnesia and requires its memory to be explicitly pre-loaded with the team's historical sprint retrospectives and ticket logs.",
      B: 'The agent lacks sufficient token limits to process the entire monolithic codebase, causing it to hallucinate the completion status of the broader feature request.',
      C: "The team is treating the agent like a human developer by relying on social accountability, rather than establishing a closed-loop system with physical constraints.",
      D: "The repository is missing an initial system prompt that strictly orders the model to avoid modifying out-of-scope files during the current two-week sprint cycle.",
    },
    correct: 'C',
  },
  {
    id: 'q2',
    prompt: 'An engineering lead notices that their agentic coding assistant consistently forgets naming conventions and architectural rules discussed just one day prior. Which of the following best describes this specific failure mode?',
    options: {
      A: 'Context amnesia, demonstrating that agents lack the persistent, implicit tribal knowledge that human developers naturally accumulate over months of work.',
      B: 'Invisible failure, where the agent produces confident-looking code that subtly violates the architecture without triggering immediate runtime errors.',
      C: 'Entropy accumulation, where the overall codebase gradually drifts away from standardized patterns due to a lack of active human oversight and maintenance.',
      D: 'Premature task closure, wherein the agent clears its own short-term memory cache under the false assumption that the overarching project objective is complete.',
    },
    correct: 'A',
  },
  {
    id: 'q3',
    prompt: 'When tasked with fixing a minor bug in a login component, an AI agent confidently refactors the entire authentication middleware. Why does "Scope Overreach" occur so frequently with AI agents compared to human developers?',
    options: {
      A: 'Agents inherently lack an understanding of system dependencies and accidentally trigger cascading file changes when utilizing modern IDE integrations.',
      B: "The agent's underlying large language model was over-indexed on refactoring examples during its fine-tuning phase, biasing it toward massive rewrites.",
      C: 'Traditional SDLC agile ceremonies fail to allocate enough story points to minor bugs, confusing the agent about the intended magnitude of the required fix.',
      D: "Agents experience no social or professional cost for rewriting modules they weren't asked to touch, whereas human developers hesitate to exceed boundaries.",
    },
    correct: 'D',
  },
  {
    id: 'q4',
    prompt: 'A team attempts to fix their agent\'s unreliable behavior by adding a strict rule to its system prompt: "You must always run the test suite before closing a Jira ticket." Why is this approach ultimately doomed to fail?',
    options: {
      A: "Jira's API rate limits will inevitably block the agent from making continuous status updates, leading to a breakdown in the prompt's intended workflow loop.",
      B: "The approach treats agentic development as a special case of human development, relying on the agent's internal compliance rather than enforcing structural boundaries.",
      C: 'System prompts degrade in effectiveness as the context window fills up, meaning the agent will simply forget the rule halfway through generating the source code.',
      D: 'The agent cannot securely authenticate into the CI/CD pipeline solely via a text-based prompt, making it impossible to genuinely trigger the required test suite.',
    },
    correct: 'B',
  },
  {
    id: 'q5',
    prompt: 'What is the foundational difference between a traditional "Harness" and simply giving an agent a highly detailed, explicitly formatted system prompt?',
    options: {
      A: "A harness establishes a closed-loop working system that makes behavior verifiable and recoverable, whereas a prompt only influences the model's textual intent.",
      B: "A harness provides the agent with increased computational intelligence, while a prompt relies strictly on the base model's pre-existing reasoning capabilities.",
      C: 'A harness is implemented using complex multi-agent frameworks like AutoGen, while prompt engineering is restricted to single-agent chat interface deployments.',
      D: 'A harness requires continuous, synchronous human supervision to execute tasks, whereas a well-designed prompt enables total Level 3 autonomous execution.',
    },
    correct: 'A',
  },
]

const score = computed(() => questions.reduce((total, question) => {
  if (answers[question.id] === question.correct) return total + 1
  return total
}, 0))

const totalAnswered = computed(() => questions.reduce((count, question) => {
  if (answers[question.id]) return count + 1
  return count
}, 0))

function submitQuiz() {
  isSubmitted.value = true
}

function resetQuiz() {
  for (const question of questions) {
    answers[question.id] = ''
  }
  isSubmitted.value = false
}
</script>

# Why Traditional SDLC Breaks with AI Agents

> **The problem isn't that AI agents are bad at coding. It's that we're asking them to operate inside systems that were never designed for them.**

## The assumption that no longer holds {#assumption}

Classical SDLC models — Agile, Scrum, Kanban, Waterfall — share a foundational assumption: **the developer is a human being with persistent memory, judgment, and social accountability**.

That assumption shapes everything. Standups exist because humans forget context overnight. Code reviews exist because humans rationalise their own mistakes. Sprint planning exists because humans need shared commitment to coordinate.

When you introduce an AI coding agent into that system, all those assumptions start to crack.

## The five failure modes {#failure-modes}

AI agents, even highly capable ones, break traditional SDLC loops in predictable ways:

### 1. Context amnesia
Agents have no persistent memory across sessions. Every conversation starts cold. A human developer accumulates implicit knowledge about a codebase over months — naming conventions, architectural decisions, tribal rules. An agent has none of that unless you engineer it in explicitly.

### 2. Premature task closure
Agents tend to declare victory when the immediate subtask is complete, not when the broader goal is achieved. They will close a ticket after writing the code, without checking that tests pass, the build succeeds, or the feature actually works end-to-end.

### 3. Scope overreach
Conversely, agents sometimes refactor far beyond the scope of the task — because they have no social cost for doing so. A human developer hesitates to rewrite a module they weren't asked to touch. An agent does not.

### 4. Invisible failure
Agents fail silently. A human developer who is stuck will ask for help, look visibly frustrated, or produce nothing. An agent will produce confident-looking code that is subtly wrong.

### 5. Entropy accumulation
Without active governance, agentic codebases drift. Documentation falls out of sync. Naming conventions diverge. Dead code accumulates. The codebase becomes progressively harder for the agent to navigate.

## Why patching the old SDLC doesn't work {#patching}

The instinctive response is to add agent-specific rules to the existing process:
- "Add a rule that agents must run tests before closing tickets"
- "Add a rule that agents must not touch files outside the scope"

This approach fails because it treats agentic development as a special case of human development. It isn't. It requires a fundamentally different architecture.

::: tip Key Insight
A harness doesn't make the agent smarter. It establishes a **closed-loop working system** that makes the agent's behavior predictable, verifiable, and recoverable.
:::

## What comes next {#next}

The following lectures build the theoretical foundation for a redesigned SDLC:

- **Lecture 02** introduces the Agentic Loop — the core feedback cycle that replaces the sprint
- **Lecture 03** covers context engineering — how to ensure your agent always has what it needs
- **Lecture 04** covers harness design — the structural constraints that keep agents on track

<button class="lecture-quiz-trigger" @click="isQuizOpen = true">
  Take a short quiz
</button>

<div v-if="isQuizOpen" class="lecture-quiz-modal" role="dialog" aria-modal="true" aria-label="Lecture 01 quiz">
  <div class="lecture-quiz-backdrop" @click="isQuizOpen = false"></div>
  <div class="lecture-quiz-panel">
    <div class="lecture-quiz-header">
      <h2>Lecture 01: Why Traditional SDLC Breaks</h2>
      <button class="lecture-quiz-close" @click="isQuizOpen = false" aria-label="Close quiz">✕</button>
    </div>

    <p class="lecture-quiz-meta">Select one answer per question, then submit to check your score.</p>

    <div v-for="(question, index) in questions" :key="question.id" class="lecture-quiz-question">
      <p><strong>{{ index + 1 }}. {{ question.prompt }}</strong></p>
      <label v-for="(optionText, optionKey) in question.options" :key="optionKey" class="lecture-quiz-option">
        <input type="radio" :name="question.id" :value="optionKey" v-model="answers[question.id]">
        <span><strong>{{ optionKey }})</strong> {{ optionText }}</span>
      </label>
    </div>

    <div class="lecture-quiz-actions">
      <button @click="submitQuiz" class="lecture-quiz-submit">Submit quiz</button>
      <button @click="resetQuiz" class="lecture-quiz-reset">Reset</button>
      <span class="lecture-quiz-progress">Answered: {{ totalAnswered }} / 5</span>
    </div>

    <p v-if="isSubmitted" class="lecture-quiz-result">
      Score: <strong>{{ score }} / 5</strong>
    </p>
  </div>
</div>

---

*Next: [The Agentic Loop →](/en/lectures/lecture-02-the-agentic-loop/)*
