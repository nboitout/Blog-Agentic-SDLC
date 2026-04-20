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

## Recommended reading

- [Simon Willison — Red/green TDD](https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/) — A practical explanation of why test-first development is one of the strongest reliability patterns for coding agents.

---

*Next: [Observability →](/en/lectures/lecture-07-observability/)*
