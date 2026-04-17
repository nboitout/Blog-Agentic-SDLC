# Project 03 · Multi-Agent Pipeline

**Difficulty:** Advanced · **Duration:** ~4 hours · **Prerequisites:** Lectures 01–05, Projects 01–02

## Objective {#objective}

Implement an orchestrator–worker multi-agent pattern for a feature that spans frontend, backend, and tests. Observe coordination failures in the wild and apply the shared-state patterns from Lecture 05.

## The scenario {#scenario}

You will build a **real-time dashboard widget** that displays a live count of active users. The feature spans three layers:

- **Backend**: a WebSocket endpoint that emits user count updates
- **Frontend**: a React component that connects to the WebSocket and renders the count
- **Tests**: integration tests verifying the full WebSocket → UI flow

In a traditional single-agent session, this is prone to interface mismatch — the backend and frontend evolve independently and diverge.

## Architecture {#architecture}

```
┌──────────────────────────────────────────┐
│            ORCHESTRATOR AGENT            │
│  Reads: feature_list.json, progress.md   │
│  Writes: agent-plan.json                 │
└─────────┬───────────────┬───────────────┘
          │               │
          ▼               ▼
┌─────────────────┐  ┌─────────────────┐
│  BACKEND AGENT  │  │ FRONTEND AGENT  │
│  src/ws/        │  │  src/ui/        │
│  Writes:        │  │  Writes:        │
│  agent-ws.log   │  │  agent-ui.log   │
└────────┬────────┘  └────────┬────────┘
         │                    │
         └────────┬───────────┘
                  ▼
        ┌──────────────────┐
        │   TEST AGENT     │
        │  tests/          │
        │  Reads both logs │
        └──────────────────┘
```

## Step 1: Define the interface contract first {#contract}

Before any agent writes code, define the interface contract in `src/ws/contract.ts`:

```typescript
// This file is the shared contract — no agent may modify it without orchestrator approval
export interface UserCountMessage {
  type: 'user_count'
  count: number
  timestamp: string
}

export const WS_ENDPOINT = '/ws/user-count'
```

Add to `AGENTS.md`:
```markdown
## Multi-agent rules
- The file src/ws/contract.ts is the interface contract
- No agent may modify contract.ts without writing a review request to reviews/
- Backend agent scope: src/ws/, src/server/
- Frontend agent scope: src/ui/, src/hooks/
- Test agent scope: tests/
```

## Step 2: Run the orchestrator {#orchestrator}

Session prompt for the orchestrator agent:

```
Read AGENTS.md, feature_list.json, and src/ws/contract.ts.
Produce agent-plan.json with:
- Exact tasks for the backend agent
- Exact tasks for the frontend agent  
- Exact tasks for the test agent
- The order in which they should run
- The verification command each must run before finishing
Do not write any application code. Only produce agent-plan.json.
```

Review `agent-plan.json` before proceeding.

## Step 3: Run backend and frontend agents sequentially {#workers}

Run the backend agent first:
```
Read AGENTS.md and agent-plan.json.
Implement the backend tasks assigned to the backend agent.
Respect scope: only touch src/ws/ and src/server/.
Run npm test -- --testPathPattern=ws before finishing.
Write your session summary to agent-ws.log.
```

Then the frontend agent:
```
Read AGENTS.md, agent-plan.json, and agent-ws.log.
Implement the frontend tasks assigned to the frontend agent.
Respect scope: only touch src/ui/ and src/hooks/.
Run npm test -- --testPathPattern=ui before finishing.
Write your session summary to agent-ui.log.
```

## Step 4: Run the test agent {#test-agent}

```
Read AGENTS.md, agent-ws.log, and agent-ui.log.
Write integration tests in tests/ that cover the full WebSocket → UI flow.
Run npm test to verify all tests pass.
Update progress.md with the final status.
```

## Step 5: Observe and document failures {#observe}

This project is designed to surface real coordination failures. Document what you find:

| Failure type | Did it occur? | How did you fix it? |
|---|---|---|
| Interface mismatch | | |
| Out-of-scope edit | | |
| Test agent missing context | | |
| State file conflict | | |
| Verification skipped | | |

## Reflection {#reflection}

After completing the project, write a short `retrospective.md` answering:

1. At which point was the orchestrator most valuable?
2. What would have broken without the shared contract file?
3. How would you improve `AGENTS.md` for the next multi-agent session?
