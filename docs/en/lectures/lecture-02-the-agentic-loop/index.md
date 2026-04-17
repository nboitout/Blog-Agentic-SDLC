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

---

*Next: [Context Engineering →](/en/lectures/lecture-03-context-engineering/)*
