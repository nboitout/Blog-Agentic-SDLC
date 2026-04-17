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

---

*Next: [The Agentic Loop →](/en/lectures/lecture-02-the-agentic-loop/)*
