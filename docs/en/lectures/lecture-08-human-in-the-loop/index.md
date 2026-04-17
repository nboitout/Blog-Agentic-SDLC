# Human-in-the-Loop Governance

> **Autonomy is a dial, not a switch. The harness controls where it's set.**

## The autonomy spectrum {#spectrum}

Not all agentic tasks warrant the same level of human oversight. A well-designed Agentic SDLC defines explicit autonomy levels and assigns tasks to them deliberately.

| Level | Agent autonomy | Human involvement |
|---|---|---|
| **L0 — Assisted** | Suggests changes; human applies | High |
| **L1 — Supervised** | Applies changes; human reviews each | Medium |
| **L2 — Checkpointed** | Runs a session; human reviews at end | Low |
| **L3 — Autonomous** | Runs multi-session without review | Minimal |

Most production teams operate at L1–L2. L3 is appropriate only for well-bounded, high-coverage tasks.

## When to insert a human checkpoint {#checkpoints}

The harness defines explicit conditions that pause autonomous execution and request human review:

- **Scope boundary hit** — agent attempted to modify an out-of-scope file
- **Verification failure** — tests failed more than N times in a row
- **Ambiguity detected** — task description conflicts with AGENTS.md rules
- **Architecture impact** — proposed change touches a core interface or schema
- **Novel failure mode** — error type not seen in previous sessions

## The review protocol {#review}

When a human checkpoint is triggered, the agent writes a structured review request:

```markdown
# Review Request — 2026-04-17

## Task
Implement user authentication logout endpoint

## What I did
- Added `POST /auth/logout` endpoint in `src/auth/routes.ts`
- Invalidated session token in Redis

## Why I stopped
Verification failed: `tests/auth/logout.test.ts` — 2 failing assertions

## What I need
Clarification on expected token invalidation behaviour (see failing test line 47)

## Next step if approved
Fix token invalidation logic and re-run verification
```

The human reads, responds, and the agent resumes. The entire exchange is committed to git.

---

You've completed the lecture series. Start with [Project 01](/en/projects/project-01-baseline-vs-agentic/) to put these concepts into practice.
