# Multi-Agent Coordination Patterns

> **One agent is a tool. Many agents coordinating reliably is an engineering problem.**

## Why multi-agent? {#why}

A single agent operating sequentially is bounded by its context window and its latency. Complex software development tasks — spanning frontend, backend, tests, and documentation — exceed both.

Multi-agent systems solve this by decomposing work across specialized agents running in parallel. But coordination introduces new failure modes that a single-agent harness doesn't anticipate.

## The three coordination patterns {#patterns}

### Pattern 1: Orchestrator → Worker
One orchestrator agent decomposes the task and dispatches subtasks to specialized worker agents. Workers report results back to the orchestrator, which integrates them.

**Best for**: tasks with clear decomposition and limited inter-dependencies.

**Failure mode**: orchestrator becomes a bottleneck; workers produce incompatible artifacts.

### Pattern 2: Peer Review
Two agents work on the same task sequentially — one implements, one reviews. The reviewer cannot see the implementer's prompt, only their output.

**Best for**: high-stakes code where independent verification matters.

**Failure mode**: reviewer rubber-stamps the implementer's work when context bleeds through.

### Pattern 3: Competitive Generation
Multiple agents produce independent implementations of the same feature. A judge agent (or human) selects the best.

**Best for**: creative tasks where the solution space is large.

**Failure mode**: expensive; requires a reliable judge.

## Shared state in multi-agent systems {#shared-state}

The repository remains the shared source of truth. Each agent writes to named branches or namespaced files. The harness enforces:
- No two agents modify the same file concurrently
- State files are written atomically
- The orchestrator reads all worker states before integration

---

*Next: [Testing Agentic Pipelines →](/en/lectures/lecture-06-testing-agentic-pipelines/)*
