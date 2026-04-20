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
    id: 'q6',
    prompt: 'An enterprise team wants to replace their bi-weekly sprints with an "Agentic Loop" for their autonomous coders. What are the four deterministic phases of a correctly implemented Agentic Loop?',
    options: {
      A: 'Prompt → Generate → Review → Deploy',
      B: 'Plan → Code → Verify → Reflect',
      C: 'Ideate → Build → Test → Release',
      D: 'Context → Execute → Debug → Commit',
    },
    correct: 'B',
  },
  {
    id: 'q7',
    prompt: 'During the "Plan" phase of the Agentic Loop, an engineer designs the system so that the agent explicitly writes its step-by-step strategy to a physical markdown file rather than holding it in the context window. What is the primary benefit of this design?',
    options: {
      A: 'It reduces the overall token consumption of the session, lowering API costs for the enterprise by offloading memory to local storage.',
      B: 'It allows the harness to automatically execute the steps without needing the LLM to generate any further code, accelerating the process.',
      C: "It externalizes the agent's intent, making the strategy auditable, reversible, and persistently available to the next automated session.",
      D: 'It prevents the agent from experiencing "Invisible Failure" by ensuring all planned code compiles perfectly before any files are modified.',
    },
    correct: 'C',
  },
  {
    id: 'q8',
    prompt: 'A platform team allows their AI agent to dynamically decide whether to run integration tests based on how complex the generated code appears. According to Agentic SDLC principles, why is this a severe anti-pattern?',
    options: {
      A: 'Agents are notoriously bad at estimating code complexity, often confusing verbose boilerplate with highly intricate business logic.',
      B: 'The integration test suite will likely time out if the agent triggers it incorrectly, causing the entire pipeline to crash and lock the repository.',
      C: 'The loop is something the engineer must design prior to runtime; asking the agent to design its own verification loop reliably leads to bypassed safety checks.',
      D: 'The dynamic decision-making process consumes too much of the context window budget, leaving inadequate room for the actual source code and state files.',
    },
    correct: 'C',
  },
  {
    id: 'q9',
    prompt: 'In the context of Agentic Loop granularity, which of the following best describes the appropriate verification mechanism and timescale for a "Feature Loop"?',
    options: {
      A: 'Timescale: Seconds | Verifier: Granular unit tests checking individual functions.',
      B: 'Timescale: Minutes | Verifier: Integration tests ensuring the full feature works.',
      C: 'Timescale: Hours | Verifier: Full pipeline execution and manual human review.',
      D: 'Timescale: Days | Verifier: End-to-end user acceptance testing in staging.',
    },
    correct: 'B',
  },
  {
    id: 'q10',
    prompt: 'After an agent attempts to implement a feature, the verification suite fails. According to the "Reflect" phase of the Agentic Loop, what must happen next to ensure session continuity?',
    options: {
      A: 'The agent is immediately terminated, and a human developer must manually resolve the broken code before re-triggering a brand new loop.',
      B: 'The orchestrator agent opens a new Jira ticket detailing the specific errors and assigns it to a secondary worker agent for bug squashing.',
      C: 'The agent deletes the failing code, restores the repository to its previous commit, and generates a completely different architectural approach.',
      D: 'The agent reads the verification results and explicitly updates the state file with what was completed, what failed, and the targeted next step.',
    },
    correct: 'D',
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

# The Agentic Loop: Plan → Code → Verify → Reflect

> **The sprint is the wrong unit of work for an AI agent. The loop is the right one.**

## From sprints to loops {#from-sprints}

A sprint is a human construct — a two-week social commitment that creates artificial urgency and shared accountability. It works because human developers respond to social pressure.

An AI agent doesn't care about sprint deadlines. It doesn't feel accountability to the team. What it responds to is **feedback** — immediate, precise, machine-readable signals about whether its last action moved the system toward the goal.

The **Agentic Loop** is the replacement unit of work. It runs in seconds or minutes, not weeks, and it is self-correcting by design.

## The four phases {#phases}

```
┌─────────────────────────────────────────┐
│                                         │
│   PLAN  →  CODE  →  VERIFY  →  REFLECT │
│     ↑                           │       │
│     └───────────────────────────┘       │
│                                         │
└─────────────────────────────────────────┘
```

### Phase 1: Plan
The agent reads its context — the feature list, the current state file, the task description — and produces an explicit plan. The plan is written to a file, not held in memory.

**Why this matters**: writing the plan externalises the agent's intent. It becomes auditable, reversible, and available to the next session.

### Phase 2: Code
The agent executes the plan, modifying files within a defined scope. Scope constraints are enforced by the harness — not by the agent's own judgment.

**Why this matters**: without scope constraints, agents over-reach. The harness acts as a physical boundary.

### Phase 3: Verify
The harness runs a deterministic verification suite: unit tests, integration tests, linters, type checks. The results are written back to the context file.

**Why this matters**: verification must be automatic and non-bypassable. An agent that can skip verification will skip it when under pressure.

### Phase 4: Reflect
The agent reads the verification results and updates the state file with what was completed, what failed, and what the next step should be.

**Why this matters**: reflection is the mechanism that preserves continuity across sessions. Without it, the next session starts blind.

## The loop is not the agent {#distinction}

A common mistake is to think the loop is something the agent designs at runtime. It isn't. **The loop is designed by the engineer before the agent runs.** The agent operates inside the loop — it doesn't design it.

This distinction is critical. It means agentic SDLC is primarily an **engineering discipline**, not a prompting discipline.

::: warning Common Mistake
Asking the agent to decide when to run tests, what scope to respect, and how to handle failures is asking the agent to design its own loop. That reliably fails. Design the loop first; let the agent run inside it.
:::

## Loop granularity {#granularity}

Not every loop runs at the same granularity. A healthy agentic SDLC has at least three nested loops:

| Loop | Timescale | Trigger | Verifier |
|---|---|---|---|
| **Micro loop** | Seconds | One function / one file | Unit tests |
| **Feature loop** | Minutes | One feature | Integration tests |
| **Session loop** | Hours | One work session | Full pipeline + human review |

The harness design (Lecture 04) specifies how each of these loops is instrumented.

<button class="lecture-quiz-trigger" @click="isQuizOpen = true">Take a short quiz</button>

<div v-if="isQuizOpen" class="lecture-quiz-modal" role="dialog" aria-modal="true" aria-label="Lecture 02 quiz">
<div class="lecture-quiz-backdrop" @click="isQuizOpen = false"></div>
<div class="lecture-quiz-panel">
<div class="lecture-quiz-header">
<h2>Lecture 02: The Agentic Loop</h2>
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

*Next: [Context Engineering →](/en/lectures/lecture-03-context-engineering/)*
