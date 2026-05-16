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
    id: 'q11',
    prompt: "A development team provides their agent with the codebase, the Jira ticket, and API documentation. Over multiple sessions, the agent's output becomes increasingly erratic and disconnected from the repository's current state. What phenomenon is this team experiencing?",
    options: {
      A: 'Token limit exhaustion, where the foundational model silently truncates the end of the context window without alerting the engineering team.',
      B: 'Context rot, occurring when the information in the context window drifts out of sync with the actual, dynamic state of the project codebase.',
      C: 'Scope overreach, wherein the agent begins reading files outside of its explicitly assigned directory and confuses its internal knowledge graph.',
      D: "Competitive generation failure, where overlapping sub-agents overwrite each other's context files and corrupt the shared repository state.",
    },
    correct: 'B',
    whyCorrect: 'Correct: this is context rot — session context has drifted out of sync with the repository reality.',
    whyIncorrect: 'Not quite. The core failure mode here is context rot (drift between context and real repo state).',
  },
  {
    id: 'q12',
    prompt: 'When organizing the context window budget for a coding agent, a disciplined engineer should allocate approximately 20% of the space to which specific layer of context?',
    options: {
      A: 'Task context, which includes the immediate feature descriptions and acceptance criteria.',
      B: 'Dynamic code context, which comprises the specific source files relevant to the subtask.',
      C: 'Static context, which includes the AGENTS.md file, architectural rules, and repo standards.',
      D: 'External context, which includes retrieved StackOverflow threads and public documentation.',
    },
    correct: 'C',
    whyCorrect: 'Correct: the course budget allocates ~20% to static context (AGENTS.md, rules, architecture constraints).',
    whyIncorrect: 'Not quite. In this model, ~20% is reserved for static context.',
  },
  {
    id: 'q13',
    prompt: 'A junior engineer decides to implement state management for their agent by asking it to write a detailed prose summary of its progress in a text file. Why is this a poor context engineering practice?',
    options: {
      A: 'Prose summaries lack the necessary emotional nuance required to accurately convey the difficulty of the coding task to the next agent session.',
      B: 'Large language models cannot effectively parse prose summaries, leading to frequent hallucinations during the reflection phase of the loop.',
      C: 'The harness design requires state files to be written in structured formats (like JSON or YAML) so they can be deterministically read and verified.',
      D: "Writing long prose summaries consumes an excessive amount of processing time, significantly slowing down the agent's overall execution speed.",
    },
    correct: 'C',
    whyCorrect: 'Correct: state should be structured (JSON/YAML) so it can be read, validated, and handed off deterministically.',
    whyIncorrect: 'Not quite. The key issue is determinism: prose is ambiguous; structured state is verifiable.',
  },
  {
    id: 'q14',
    prompt: 'What is the primary operational purpose of implementing the industry-standard AGENTS.md file within an Agentic SDLC architecture?',
    options: {
      A: 'To serve as a dynamic scratchpad where the agent can temporarily store algorithmic calculations before committing them to the main codebase.',
      B: "To act as a comprehensive, human-readable onboarding document that explains the project's history to new human developers joining the team.",
      C: 'To provide a centralized, version-controlled repository of static context—such as scope boundaries and architectural rules—that the agent loads automatically.',
      D: 'To replace traditional package.json or requirements.txt files by allowing the agent to dynamically manage dependencies during runtime.',
    },
    correct: 'C',
    whyCorrect: 'Correct: AGENTS.md is the centralized, version-controlled static context for safe agent operation.',
    whyIncorrect: 'Not quite. AGENTS.md is primarily for persistent operational constraints and context, not scratch storage or dependency management.',
  },
  {
    id: 'q15',
    prompt: 'To prevent "Context Rot" in a long-running agentic project, which of the following is considered a mandatory prevention strategy?',
    options: {
      A: "Ensuring that state files are always written atomically to prevent partial updates from corrupting the agent's understanding of its progress.",
      B: "Completely clearing the agent's memory cache every 15 minutes to guarantee it is forced to re-read the entire codebase from scratch.",
      C: 'Allowing the agent to independently modify the AGENTS.md file whenever it discovers a more efficient architectural pattern or library.',
      D: 'Using only visual representations (like architecture diagrams) instead of text to communicate the current state of the repository.',
    },
    correct: 'A',
    whyCorrect: 'Correct: atomic state writes are a mandatory safeguard against corrupted or partial continuity records.',
    whyIncorrect: 'Not quite. The mandatory prevention strategy in this context is atomic state-file updates.',
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

# Context Engineering: What Your Agent Needs to Know

> **A capable model with poor context produces poor results. Context engineering is the discipline of designing what the agent needs to know.**

## The context problem {#context-problem}

Every AI agent operates inside a context window. Whatever is not in that window is effectively invisible to the agent. This creates a fundamental engineering challenge: **you must design what the agent knows, not only what it can do**.

Context engineering is the practice of designing, structuring, and maintaining the information that flows into an agent's context window — across time, across sessions, and across different stages of a task.

## What goes in the context? {#what-goes-in}

Context for a coding agent has several distinct layers:

| Layer | Content | Persistence |
|---|---|---|
| **Static context** | Architecture rules, coding standards, repo conventions | Always present |
| **Task context** | Feature description, acceptance criteria, scope boundaries | Per-task |
| **State context** | Current progress, what was completed, what failed | Per-session |
| **Code context** | Relevant files, interfaces, test structures | Dynamically loaded |

### The AGENTS.md pattern
A common emerging pattern for static context is a single file — `AGENTS.md` — committed to the repository root. It contains the stable instructions an agent needs to operate in that codebase: how to run tests, which directories are off-limits, naming conventions, and architectural constraints.

```markdown
# AGENTS.md

## Build & test
- Run tests: `npm test`
- Lint: `npm run lint`
- Build: `npm run build`

## Scope rules
- Never modify files in `legacy/`
- Never edit `package-lock.json` directly

## Architecture
- All API calls go through `src/api/client.ts`
- Use `zod` for all data validation
```

<div class="lecture-recap-floating-wrap">
  <a class="lecture-recap-floating" href="/Blog-Agentic-SDLC/lecture-03-context-recap.png" target="_blank" rel="noopener" aria-label="Open the full-size visual recap of Lecture 03 in a new tab">
    <span class="lecture-recap-floating-icon" aria-hidden="true">🗺️</span>
    <span class="lecture-recap-floating-label">Visual recap</span>
  </a>
</div>

## Visual recap: Context Engineering at a glance {#visual-recap}

The full picture is broader than context-window management. Context engineering starts with what the agent sees at runtime, but it matures into a lifecycle for designing, testing, governing, and continuously improving the context that shapes agent behavior.

<div class="lecture-recap">
  <a href="/Blog-Agentic-SDLC/lecture-03-context-recap.png" target="_blank" rel="noopener" aria-label="Open full-size visual recap in a new tab">
    <img src="/lecture-03-context-recap.png" alt="Infographic recap of Lecture 03 covering runtime context layers, the Context Development Lifecycle, good practices, and context rot prevention." loading="lazy">
  </a>
  <div class="lecture-recap-caption">
    Runtime context (layers + 20 / 30 / 20 / 30 budget) → Context Development Lifecycle (Generate · Evaluate · Distribute · Observe · Improve) → good practices → context rot prevention.
  </div>
  <div class="lecture-recap-actions">
    <a href="/Blog-Agentic-SDLC/lecture-03-context-recap.png" target="_blank" rel="noopener">View full-size</a>
    <span aria-hidden="true">·</span>
    <a href="/Blog-Agentic-SDLC/lecture-03-context-recap.png" download>Download as PNG</a>
  </div>
</div>

## The context window budget {#budget}

Context window space is finite. Filling it with irrelevant information can be as harmful as providing too little context. A disciplined approach allocates the budget explicitly:

- **~20%** — static context (AGENTS.md, architecture docs)
- **~30%** — task context (current feature, acceptance criteria)
- **~20%** — state context (progress file)
- **~30%** — dynamic code context (files relevant to the current subtask)

<div class="widget-cta">
  <span class="widget-cta-icon">⚡</span>
  <div class="widget-cta-body">
    <strong>See the quadratic cost curve in action</strong>
    <span>Step through turns and watch input tokens grow — then enable Engineered mode to see what proactive context management changes.</span>
  </div>
  <a href="../../interactive/" class="widget-cta-btn">Launch Widget →</a>
</div>

## Advanced: The Context Development Lifecycle {#cdlc}

Context engineering often starts with managing what enters the agent's context window. That is only the first level.

In professional agentic engineering, context is no longer just a temporary input to a chat session. It becomes part of the software production system.

Specifications, `AGENTS.md`, `CLAUDE.md`, architecture maps, domain vocabulary, reusable skills, library documentation, MCP context, tickets, logs, and review feedback are no longer disposable prompts. They are software artifacts that directly shape agent behavior.

This creates a new engineering question:

> If context changes agent behavior, how do we design, test, distribute, observe, and improve that context?

That is the role of the **Context Development Lifecycle**.

| Phase | Core question |
|---|---|
| **Generate** | Have we clarified intent, vocabulary, constraints, and architecture before execution? |
| **Evaluate** | Does this context reliably shape the agent's behavior? |
| **Distribute** | Can this context be packaged, versioned, reused, and governed across teams? |
| **Observe** | What do PR reviews, agent logs, and production incidents reveal about missing or misleading context? |
| **Improve** | How do we feed those signals back into the context stack? |

A mature workflow is not simply:

```text
prompt → code
```

It becomes:

```text
shared intent → evaluated context → generated code → telemetry → improved context
```

This is the bridge from vibe coding to professional agentic engineering.

The practical consequence is simple: context should be managed with the same seriousness as code.

## Good practices: treating context as a software artifact {#good-practices}

Once context shapes agent behavior, it needs engineering discipline.

### 1. Make context explicit

Do not rely on hidden conversation history for durable project knowledge.

Move durable instructions into versioned artifacts:

- `AGENTS.md`
- architecture maps
- domain vocabulary
- task specifications
- test instructions
- reusable skills
- project-specific examples

A useful rule:

> If the agent should remember it tomorrow, it probably does not belong only in today's chat.

### 2. Separate context layers

Do not collapse everything into a single giant instruction file.

A mature context stack usually has several layers:

| Layer | Examples |
|---|---|
| **Global context** | Company conventions, security rules, domain vocabulary |
| **System context** | Architecture maps, repository documentation, module boundaries |
| **Agent context** | `AGENTS.md`, `CLAUDE.md`, reusable skills, tool instructions |
| **Task context** | Specs, tickets, MCP context, current logs, review comments |

This separation matters because each layer changes at a different speed. Company conventions are relatively stable. Task context changes constantly. Mixing them creates noise, increases drift, and makes context harder to review.

### 3. Test context, not only code

A change to `AGENTS.md`, a reusable skill, or a project specification can change many future agent runs.

That means context needs evaluation.

A context eval asks:

> Did this piece of context reliably shape the agent's behavior in the intended way?

Useful levels of context testing include:

| Level | Purpose |
|---|---|
| **Context linting** | Validate structure, syntax, and required fields |
| **Clarity checks** | Check whether the instruction is explicit and complete enough for an LLM |
| **Behavioral evals** | Test whether the agent follows a project rule |
| **Agentic E2E** | Let an agent run the system and verify real behavior |

Example:

```text
Context rule:
All API endpoints must start with /awesome.

Eval:
Ask the agent to add a new user endpoint.
Check whether the generated route follows the required prefix.
```

The point is not only to test the code that was generated. The point is to test whether the context caused the right behavior.

### 4. Think probabilistically

Traditional tests are deterministic: pass or fail.

Context evals are probabilistic. The same context may work with one model, fail with another, or pass only four times out of five.

So a passing context eval might mean:

```text
This context causes the desired behavior 95% of the time
across 5 runs, 3 models, and 2 agent configurations.
```

For agentic systems, quality increasingly means reliability under variation.

### 5. Treat PR feedback as context telemetry

In a traditional workflow, PR feedback is used to fix code.

In an agentic workflow, PR feedback should also update the context stack.

When a reviewer finds a problem, ask: What context was missing, weak, or misleading?

Possible follow-up actions:

- update `AGENTS.md`
- improve the task spec
- add a missing architecture rule
- update the domain vocabulary
- create a new context eval
- improve a reusable skill
- add a regression test

The goal is not only to fix the current PR. It is to prevent the same failure from recurring across future agent runs.

### 6. Govern shared context

For one developer, context is a productivity tool.

For an organization, shared context becomes platform infrastructure.

Reusable context should therefore be:

- versioned
- owned
- reviewed
- tested
- documented
- scanned for security issues
- distributed through curated registries when reused across teams

Once context becomes executable through agents, it becomes part of the software supply chain.

## Context rot {#rot}

Context rot is not only a session problem. At enterprise scale, it also becomes a governance problem.

A stale instruction in `AGENTS.md`, an outdated architecture map, or an obsolete reusable skill can silently influence many future agent runs. In that sense, changing context without evaluation is close to changing production behavior without tests.

Context rot occurs when the information in the context window drifts out of sync with the actual state of the codebase. It is one of the most insidious failure modes in long-running agentic projects.

Prevention strategies:
- Keep `AGENTS.md` versioned and reviewed on every PR
- Add context evals for important rules and reusable skills
- Write state files atomically — never partial updates
- Use structured formats such as JSON or YAML for state, not free-form prose
- Keep architecture maps close to the code they describe
- Remove obsolete context aggressively
- Treat PR review comments and production incidents as signals to improve context

::: tip
The harness design (Lecture 04) specifies exactly how state files are written, read, and verified. Never leave state management to the agent's discretion.
:::

<button class="lecture-quiz-trigger" @click="isQuizOpen = true">Take a short quiz</button>

<div v-if="isQuizOpen" class="lecture-quiz-modal" role="dialog" aria-modal="true" aria-label="Lecture 03 quiz">
<div class="lecture-quiz-backdrop" @click="isQuizOpen = false"></div>
<div class="lecture-quiz-panel">
<div class="lecture-quiz-header">
<h2>Lecture 03: Context Engineering</h2>
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

*Next: [Harness Design →](/en/lectures/lecture-04-harness-design/)*
