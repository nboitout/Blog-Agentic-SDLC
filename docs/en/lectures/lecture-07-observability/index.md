# Observability: Making Agent Behavior Debuggable

> **If you can't see what the agent did, you can't fix what went wrong.**

## Why observability is different for agents {#why-different}

In traditional software, observability means logs, metrics, and traces of system behavior. For agentic systems, you need all of that — plus traces of *reasoning behavior*: what did the agent plan, what did it decide, what did it change its mind about?

## The three observability layers {#layers}

### Layer 1: Code-level observability
Standard: logs, error traces, test results. These are produced by the verification pipeline and should be written to the state file after every loop.

### Layer 2: Session-level observability
What happened in this agent session? A structured session log should capture:
- Which files were read
- Which files were modified
- Which tests were run and their results
- The agent's self-assessment at session end

### Layer 3: Harness-level observability
Over time: is the harness working? Track metrics like:
- Task completion rate per session
- Verification pipeline pass rate
- Scope violations (out-of-bounds file edits)
- Session restart rate (proxy for context loss)

## Practical instrumentation {#instrumentation}

The minimum viable observability setup:

```bash
# At session end, the agent writes:
echo '{
  "session_id": "2026-04-17-001",
  "tasks_completed": ["feat/auth-login"],
  "tasks_failed": [],
  "files_modified": ["src/auth/login.ts", "tests/auth.test.ts"],
  "verification": "passed",
  "next_task": "feat/auth-logout"
}' > .agent/session-log.json
```

This file is committed to git, giving you a full audit trail of every agent session.

---

*Next: [Human-in-the-Loop Governance →](/en/lectures/lecture-08-human-in-the-loop/)*
