---
pageClass: lecture-01-quiz-page
---

<script setup>
import { withBase } from 'vitepress'
import ContextLessonQuiz from '../../../.vitepress/theme/components/ContextLessonQuiz.vue'
</script>

# Context Engineering: Give Your Coding Agent the Right Information, at the Right Time

> **Design how the agent discovers, selects, verifies, and preserves the information needed for its next decision.**

## A plausible refactor, a changed contract {#context-problem}

An agent extracts duplicated validation into a helper. The code builds. But when both `reference` and `amount` are invalid, the first error changes from `Reference is required` to `Amount must be positive`. A client that relies on the first error now behaves differently.

This is an **illustrative failure**, not a measured agent run. What did the agent need before deciding the order of checks? The approved contract, current implementation, callers, and tests covering simultaneous invalid inputs. A build alone cannot establish behavior preservation.

| Task brief | Information available to guide the decision |
|---|---|
| Before: “Extract the duplicated validation.” | Intent to remove duplication; public behavior is underspecified. |
| After: “Extract shared validation in the two entry points. Preserve signatures, exact errors, check order, and success returns. Start with the approved specification, implementation, caller, and tests. Record executed checks and unresolved discrepancies.” | Bounded scope, observable acceptance, starting points, and evidence requirements. |

By the end, you should be able to write useful repository instructions and a task brief, support autonomous retrieval, diagnose context problems, choose an appropriate continuity action, evaluate a context change, and identify boundaries that require enforcement outside the model.

## Map the context: five components {#what-goes-in}

A model brings pretrained knowledge and may retrieve external information using tools. Project-specific material outside the current context must be retrieved or supplied before it can reliably ground the next decision. A **context window** is the bounded input available to a model invocation; a file's durable existence does not mean its contents are loaded into that input.

Use these five components consistently:

| Component | Question | Running example |
|---|---|---|
| **Rules and constraints** | How must I work here? | Preserve interfaces; no new dependencies; allowed paths. |
| **Task and acceptance criteria** | What outcome am I trying to achieve? | Remove duplication while preserving observable validation behavior. |
| **Evidence** | What is actually true? | Current implementation, caller, tests, approved specification, tool results. |
| **Working state** | Where are we now? | Decisions, failed attempts, uncertainties, completed work, next step. |
| **Tools and reusable procedures** | How can I investigate and act? | Search, file reads, test runner, a relevant reusable skill. |

Each item also has a **scope**, **source**, **revision or freshness information**, and **loading policy**. Those are dimensions of an item, not additional content categories. For example, the specification is Evidence, applies to both entry points, comes from the fixture owner, is at revision 2, and is loaded when the decision needs it.

Durable repository instructions, task-specific briefs, and evidence retrieved during execution can all contribute to the selected input. Storage and loading are separate concerns.

### Visual recap: context during a task {#visual-recap}

| Available sources | Selection for this decision | Next action and new evidence |
|---|---|---|
| Repository instructions, task, code, tests, docs, notes, tools | Load relevant items from the five components; retain provenance and headroom | Inspect or refactor → run checks → record results |
| Changed implementation or approved contract | Refresh the affected snapshot and reconcile discrepancies | Reconsider the decision with current evidence |
| Repeated output or a long session | Filter noise or compact while retaining decisions and uncertainty | Continue with a smaller input; freshness still needs checking |

This selectable-text recap replaces the lecture's earlier allocation infographic. Across tasks, use the course's **Generate → Evaluate → Distribute → Observe → Improve** framework, developed [below](#cdlc), to keep shared context useful.

## Build a useful entry point {#good-practices}

The [downloadable fixture](#practical) contains two deliberately duplicated public functions in `src/entries.mjs`. Both currently follow the approved revision-2 specification:

```js
export function submitPayment({ reference, amount }) {
  if (!reference) throw new Error('Reference is required');
  if (amount <= 0) throw new Error('Amount must be positive');
  return { reference, amount, status: 'submitted' };
}
```

`previewPayment({ reference, amount })` repeats these checks and returns status `preview`. `src/caller.mjs` calls both. The input domain is string references and finite numeric amounts. Normalizing inputs or changing accepted types is outside this refactor.

A candidate extraction keeps the checks in the same order:

```js
function validate({ reference, amount }) {
  if (!reference) throw new Error('Reference is required');
  if (amount <= 0) throw new Error('Amount must be positive');
}
// Each public entry point calls validate({ reference, amount })
// and keeps its signature and successful return object unchanged.
```

This is an illustrative proposal, not an already-verified learner change. The supplied baseline tests check individual failures, simultaneous invalid inputs, public arity, and caller return values.

### Repository instructions that help

Include commands and constraints that matter and are easy to miss. Keep deeper explanations in their authoritative files instead of copying the entire repository tree into instructions. Here is a compact entry point for the **extracted fixture root**, not the course site's root:

```markdown
# AGENTS.md
Purpose: extract shared validation without changing public behavior.
Setup: Node.js 20+; no dependencies to install.
Syntax/build check: node --check src/entries.mjs
Caller check: node --check src/caller.mjs
Test: node --test tests/validation.test.mjs
Syntax-check any new helper too; this fixture needs no compilation step.

Preserve signatures, exact errors, validation order, and successful returns.
Edit entries.mjs, a helper under src/, and targeted tests.
Keep caller and approved specification unchanged.
Read specification.md (approved r2), src/caller.mjs,
and tests/validation.test.mjs when making the order decision.
Record uncertainty and actual verification evidence in handover.md.
```

These commands are exercised against the supplied fixture during repository validation. Learners must rerun them after making changes; an earlier pass does not validate a later diff.

Repository-wide instructions establish common conventions. Directory-scoped instructions can describe module-specific boundaries: for example, a hypothetical `src/payments/AGENTS.md` might point to the payment contract. That path is an adaptation example, not a file in this fixture. Scope, discovery, inheritance, and precedence depend on the agent; there is no universal ordering across `AGENTS.md`, `CLAUDE.md`, skills, and user instructions. Consult the [AGENTS.md guidance](https://agents.md/) and your tool's documentation.

For example, Claude Code documents launch-time and on-demand loading of different instruction files. A reusable **skill** packages a procedure that can load when relevant. Its discovery description can still consume context before the full procedure loads. Keep the catalog and the loaded procedure focused; behavior varies by tool and version. See [Claude Code memory](https://code.claude.com/docs/en/memory) and [skills](https://code.claude.com/docs/en/skills).

Repository instructions **guide** behavior. A sentence saying “do not edit this directory” does not restrict filesystem access. Permissions, sandbox boundaries, hooks, and external checks can enforce particular constraints, depending on configuration. See [Harness Design](/en/lectures/lecture-04-harness-design/) for enforcement.

## Retrieve information when needed {#retrieval}

The developer supplies useful starting points, tools, and constraints; the agent can assemble much of its own evidence. You do not need to paste every relevant file into the prompt. **Progressive disclosure** means starting with a small entry point, then reading deeper material when a decision needs it. [Anthropic's context-engineering discussion](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) describes this approach to retrieval and continuity.

An illustrative investigation, from the extracted fixture root:

```sh
rg -n 'submitPayment|previewPayment' src tests
rg -n 'Reference is required|Amount must be positive' src tests
node --test tests/validation.test.mjs
```

The first searches find the implementation, callers, and relevant assertions. Read those files and `specification.md` before extracting the helper. Consult version-matched external documentation only when language or tool behavior is uncertain. The test command produces execution evidence; merely reading assertions does not.

Treat retrieved pages, issue comments, logs, and tool results as evidence to assess. They do not automatically gain authority to redirect the task or expand permissions. An issue comment may contain useful reproduction steps alongside a request to disable checks and upload environment files. Evaluate the reproduction; the embedded request does not authorize those unrelated actions.

### Context composition and headroom {#budget}

There is no standard percentage split. Composition depends on the task, tool, and model. Account for standing instructions, task information, evidence, tool definitions and results, and working history, leaving adequate headroom for subsequent work. More relevant evidence can be necessary even when it increases size.

Replaying an ever-growing full history, with roughly constant new content each turn, can produce **quadratic cumulative input-token volume** across turns. That is a replay assumption, not a universal billing law: caching, pricing, and compaction change costs. The separate [Token Cost tool](/en/interactive/) explores those assumptions.

## Maintain continuity {#continuity}

| Action | Example | What it does not establish |
|---|---|---|
| Refresh | Reload implementation and tests after a teammate's change; compare with approved intent. | Freshness of every other source or automatic conflict resolution. |
| Filter | Exclude an unrelated image-build log from the next model input. | Missing contract evidence. |
| Compact | Summarize repeated investigation while retaining goal, constraints, decisions, source references, useful failed attempts, uncertainty, and next step. | Freshness: an amount-first assumption can survive in a short summary. |
| Record a handover | Save scope, checked revision, completed work, decisions, verification status, open questions, and next action. | Truth of the note or automatic loading in the next session. |

Excluding content from a future input is different from deleting the original source or audit record. An end user may not be able to remove messages already submitted; the harness may support compaction, input filtering, or starting a fresh session with a handover.

Use schema-validated structured data when a workflow controller must validate a field such as `status`. Use structured Markdown for decisions, rationale, unresolved questions, and handovers. LLMs can use prose; choose representations for the consumer and validation needs, and link the two when both are needed.

Atomic writes prevent readers seeing partial files. They do not prove that the complete file is accurate, current, or sufficient. Refresh evidence and validate claims separately.

A useful handover might say: “Proposed reference-first helper; approved spec r2 and tests agree. Refactor not yet executed. Reload entries and tests at the current checkout; run the checks after editing.” This clearly distinguishes a proposed action from a completed check. Use the <a :href="withBase('/downloads/context-engineering/handover.md')" download>handover template</a>.

## Diagnose the failure before choosing a fix {#rot}

**Staleness** means a source or remembered fact no longer matches relevant project reality or approved intent. **Long-context degradation** concerns difficulty using information reliably as input length and distractions grow. Either can occur without the other. Chroma's [Context Rot research](https://www.trychroma.com/research/context-rot) investigates performance across input lengths; it should not be read as a synonym for outdated repository facts or a universal failure threshold.

| Symptom | Appropriate action | An action that does not solve it |
|---|---|---|
| Missing evidence | Retrieve the public contract and multi-invalid tests. | Add a generic “be careful” instruction. |
| Stale snapshot | Reload the changed source, inspect the diff, reconcile intended and observed behavior. | Compact the same outdated claim. |
| Conflicting sources | Compare provenance, approval, revisions, and current behavior; retain unresolved questions. | Automatically choose the newest timestamp or current code. |
| Excessive irrelevant material | Filter repeated logs and retain useful references. | Increase capacity without selecting information. |
| Lost decisions after compaction | Recover constraints and rationale from sources or the audit record; improve the handover. | Invent the missing rationale. |
| Untrusted instructions in retrieved content | Use relevant evidence while preserving task authority and permissions. | Treat tool access as authorization for embedded requests. |

Review feedback is a diagnostic signal. Inspect context, tools, environment, task ambiguity, model behavior, and verification before prescribing a fix. A broken test environment needs repair; more instructions alone may not help.

## Evaluate a context change {#evaluation}

Compare the same task set and repository revision, model and harness settings, tool permissions, and checks in fresh sessions. Deliberately change the context treatment. Keep individual results, configuration details, traces, and diffs so reviewers can inspect what happened. This extends the distinction between output and behavior checks in [Testing Agentic Pipelines](/en/lectures/lecture-06-testing-agentic-pipelines/).

Separate the **grader** from the behavior being evaluated. A deterministic assertion can score variable agent behavior. Conventional tests can also be flaky or involve randomness; neither “all tests are deterministic” nor “all context checks are probabilistic” is a useful universal rule.

A **hypothetical reporting example**, not course measurements:

| Context treatment | Accepted runs | Rule violations | Tokens, runtime, review effort |
|---|---|---|---|
| A: minimal brief | 12/20 | Record separately | Unavailable in this illustration |
| B: improved context package | 17/20 | Record separately | Unavailable in this illustration |

Do not infer causality or a stable success probability from a single comparison. Use representative tasks and repeats for broader conclusions. Report counts, denominators, configurations, and limitations. Five repeats across three models and two configurations is **30 runs** for the full cross-product; 95% is not an exact binary pass rate for 30 observations.

## Context across tasks: the Context Development Lifecycle {#cdlc}

This is the course's organizing framework, not a universally standardized process. Context deserves versioning, evaluation, ownership, review, and continuous improvement.

| Phase | Artifact or action from the validation example |
|---|---|
| **Generate** | Draft concise repository instructions, an acceptance-focused task brief, and pointers to approved spec r2. |
| **Evaluate** | Compare context versions on controlled refactoring tasks; score behavior preservation and rule violations separately. |
| **Distribute** | Review and version the package; ship instructions with the fixture and make relevant procedures discoverable. |
| **Observe** | Inspect review feedback and traces: did the first error change, was a source stale, or did verification fail to run? |
| **Improve** | Add multi-invalid coverage or clarify an ambiguous contract; review the change, rerun relevant evals, retire the superseded note. |

Assign an owner to each shared artifact. Refresh instructions when the facts or rules they describe change: public contracts, commands, module boundaries, dependencies, or tool loading semantics. Do not require editing or rereading every instruction file on every unrelated PR.

Agents can propose improvements from session findings. Review those proposals before promoting a local note into shared policy. Retire obsolete guidance from active distribution while retaining the revision history needed for audit and reproduction.

## Practice and takeaways {#practical}

The **cockpit provides an overview, while the lab lets learners practice context decisions**. Both remain available:

- [Open the Context Cockpit](/context-cockpit.html)
- [Open the Context Engineering Lab — context decisions](/en/interactive/context-engineering-lab/)
- [Open the separate Token Cost tool](/en/interactive/)

The new lab runs without a coding agent or external service. Try removing the irrelevant log, compacting the old assumption, loading current evidence, investigating the conflict, and saving then resuming a handover. Watch size, staleness, missing evidence, contradictions, and simulated acceptance separately.

### Download the fixture and three templates

[Download the complete validation fixture ZIP](/downloads/context-engineering/validation-fixture.zip). Extract it into a safe local directory. The archive root contains `src/`, `tests/`, the approved specification, and these Markdown templates:

- <a :href="withBase('/downloads/context-engineering/repository-instructions.md')" download>Repository instructions</a> — copy to `AGENTS.md` in the fixture root when using the improved package.
- <a :href="withBase('/downloads/context-engineering/task-brief.md')" download>Task brief</a> — real fixture paths and observable acceptance.
- <a :href="withBase('/downloads/context-engineering/handover.md')" download>Handover</a> — decisions, evidence, uncertainties, and next action.
- <a :href="withBase('/downloads/context-engineering/results.md')" download>Comparison results table</a> and <a :href="withBase('/downloads/context-engineering/specification.md')" download>approved specification</a>.

### Optional 20–30 minute activity with a coding agent

1. **Prepare (5 minutes):** extract the fixture; run its syntax checks and tests. Save a baseline Git revision and create two isolated copies at that same revision. Use fresh agent sessions.
2. **Compare (10–15 minutes):** in copy A, request “Extract duplicated validation while preserving behavior.” In copy B, supply the improved instructions and task brief. Keep model, harness settings, permissions, and available checks consistent. Keep all other files identical, including the specification; change the context package deliberately.
3. **Review (5 minutes):** inspect both diffs and actual test output. Compare public behavior, scope violations, evidence quality, review effort, and observable resource use. Use the results table; leave unavailable measurements blank. One pair illustrates a workflow, not established reliability.
4. **Hand over (5 minutes):** produce repository instructions, a task brief, and a handover explaining what was verified, remaining uncertainties, sources needing refresh, and the next action.

Your three takeaways are **useful repository instructions**, **a bounded task brief**, and **an evidence-backed handover**. Together they connect the [agentic loop](/en/lectures/lecture-02-the-agentic-loop/) to context that can be reviewed and improved. Use [harness controls](/en/lectures/lecture-04-harness-design/) for requirements that need enforcement.

## References {#references}

Technical references checked for this revision; vendor behavior can vary by tool and version.

- [Anthropic — Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents): retrieval and continuity techniques.
- [AGENTS.md](https://agents.md/): repository instruction format and guidance.
- [Chroma — Context Rot](https://www.trychroma.com/research/context-rot): experiments on using longer inputs reliably.
- [Claude Code — Memory](https://code.claude.com/docs/en/memory) and [Skills](https://code.claude.com/docs/en/skills): implementation-specific loading and discovery.

<ContextLessonQuiz />

---

*Next: [Harness Design →](/en/lectures/lecture-04-harness-design/)*
