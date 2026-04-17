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

## The eval mindset {#evals}

Think of agent behavior testing as **evals** — a discipline borrowed from LLM evaluation research. An eval consists of:
- A fixed input (task description + context)
- A reference output (expected behavior, not expected code)
- A scoring function (did the agent do what was asked?)

Start with three to five evals per harness. Run them on every harness change. Treat harness regressions as seriously as code regressions.

---

*Next: [Observability →](/en/lectures/lecture-07-observability/)*
