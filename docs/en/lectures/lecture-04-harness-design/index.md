# Harness Design: Constraining Agents for Reliability

> **A harness is not a cage. It's the infrastructure that lets the agent run fast without crashing.**

## What a harness is {#definition}

A harness is the collection of files, scripts, conventions, and automated checks that surround an AI agent and shape its behavior. It is not the agent itself — it is the environment the agent operates in.

The harness answers four questions deterministically:
1. **What can the agent do?** (scope and permissions)
2. **What has been done?** (state management)
3. **Did it work?** (verification)
4. **What should happen next?** (continuity)

## The five harness primitives {#primitives}

### 1. Filesystem as state
The repository is the single source of truth. The harness writes all state — progress, decisions, failures — to files in the repo, not to the agent's memory.

### 2. Scope enforcement
The harness defines explicit allow-lists of files and directories the agent may touch. Attempts to modify out-of-scope files are blocked or flagged.

### 3. Verification pipeline
A deterministic test suite runs automatically after every agent action. The harness does not ask the agent whether to run tests — it runs them unconditionally.

### 4. State transitions
The harness defines explicit states (`planning`, `in_progress`, `verifying`, `complete`, `failed`) and enforces valid transitions. An agent cannot mark a task `complete` without the verification pipeline passing.

### 5. Continuity protocol
Every session ends with a structured handoff file that contains enough context for the next session to resume without human intervention.

## A minimal harness pack {#minimal}

The minimum viable harness for an agentic project consists of three files:

```
AGENTS.md           # Static context and rules
feature_list.json   # Task registry with status
progress.md         # Current session state
```

See the [Templates](/en/resources/templates/) section for copy-ready versions of all three.

## Harness vs. prompt engineering {#vs-prompts}

| Approach | Where control lives | Reliability | Auditability |
|---|---|---|---|
| Prompt engineering | Agent's context | Low | None |
| Harness design | Repository + scripts | High | Full git history |

Prompts shape agent *intent*. Harnesses shape agent *behavior*. Both matter, but in a production agentic SDLC, harness design is the foundation.

---

*Next: [Multi-Agent Patterns →](/en/lectures/lecture-05-multi-agent-patterns/)*
