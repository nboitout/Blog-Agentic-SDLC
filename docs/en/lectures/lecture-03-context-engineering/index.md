# Context Engineering: What Your Agent Needs to Know

> **A capable model with bad context produces bad results. Context engineering is the discipline of making sure that never happens.**

## The context problem {#context-problem}

Every AI agent operates inside a context window. Whatever is not in that window does not exist for the agent. This creates a fundamental engineering challenge: **you must architect what the agent knows, not just what it can do**.

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
The industry standard for static context is a single file — `AGENTS.md` — committed to the repository root. It contains everything an agent needs to operate in that codebase: how to run tests, which directories are off-limits, naming conventions, and architectural constraints.

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

## The context window budget {#budget}

Context window space is finite. Filling it with the wrong information is as harmful as filling it with nothing. A disciplined approach allocates the budget explicitly:

- **~20%** — static context (AGENTS.md, architecture docs)
- **~30%** — task context (current feature, acceptance criteria)
- **~20%** — state context (progress file)
- **~30%** — dynamic code context (files relevant to the current subtask)

## Context rot {#rot}

Context rot occurs when the information in the context window drifts out of sync with the actual state of the codebase. It is one of the most insidious failure modes in long-running agentic projects.

Prevention strategies:
- Keep AGENTS.md versioned and reviewed on every PR
- Write state files atomically (never partial updates)
- Use structured formats (JSON, YAML) for state — not prose

::: tip
The harness design (Lecture 04) specifies exactly how state files are written, read, and verified. Never leave state management to the agent's discretion.
:::

---

*Next: [Harness Design →](/en/lectures/lecture-04-harness-design/)*
