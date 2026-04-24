# Templates

Copiez ces fichiers directement dans votre repository. Ils forment le **minimal harness pack** : les trois fichiers dont chaque projet agentique a besoin pour fonctionner de manière fiable.

## AGENTS.md {#agents-md}

Le static context file. Commitez-le à la racine du repository. Chaque session agentique le lit en premier.

```markdown
# AGENTS.md

## About this repo
[One paragraph: what this codebase does, its main tech stack, and its purpose]

## Build & test
- Install: `npm install`
- Test: `npm test`
- Lint: `npm run lint`
- Build: `npm run build`
- Type check: `npm run typecheck`

## Scope rules
- NEVER modify files outside the directories listed in feature_list.json scope fields
- NEVER edit: package-lock.json, .env, any file in infra/ or .github/
- ALWAYS stay within the scope defined for the active task

## Architecture rules
- All external API calls go through src/api/client.ts
- All data validation uses zod schemas in src/schemas/
- No direct database queries outside src/db/
- All new modules must have a corresponding test file

## Session protocol
1. Read feature_list.json - identify the highest-priority pending task
2. Update the task status to "in_progress" in feature_list.json
3. Implement the task within the defined scope
4. Run the full verification pipeline (test + lint + build)
5. If verification passes: mark task "complete" in feature_list.json
6. If verification fails: mark task "failed", write failure details to progress.md
7. Update progress.md with session summary
8. Never mark a task complete if any test or lint check is failing

## Human checkpoints
Stop and write a review request to reviews/YYYY-MM-DD-review.md if:
- You need to modify a file outside your scope to complete the task
- Tests fail more than 3 times in a row
- The task description conflicts with these rules
- You are about to modify a shared interface or schema
```

## feature_list.json {#feature-list}

Le task registry. L'agent le lit pour trouver sa prochaine tâche et y réécrit les status updates.

```json
{
  "version": "1.0",
  "project": "your-project-name",
  "updated": "2026-04-17",
  "features": [
    {
      "id": "feat-001",
      "title": "Short, imperative task title",
      "status": "pending",
      "priority": "high",
      "scope": [
        "src/module-name/",
        "tests/module-name/"
      ],
      "acceptance": [
        "Specific, verifiable criterion 1",
        "Specific, verifiable criterion 2",
        "npm test passes with no failures",
        "npm run lint passes with no errors"
      ],
      "notes": "",
      "sessions": []
    }
  ]
}
```

**Valeurs de status :** `pending` → `in_progress` → `complete` | `failed` | `blocked`

## progress.md {#progress}

Le session state file. Mis à jour à la fin de chaque session agentique.

```markdown
# Agent Progress

## Current session
- **Date**: YYYY-MM-DD
- **Status**: [not started | in progress | complete | blocked]
- **Active task**: [feat-id or "none"]
- **Verification**: [not run | passed | failed]

## Last session summary
[Agent writes 2-3 sentences describing what was done, what passed, and what comes next]

## Completed tasks
- feat-001: Title - completed YYYY-MM-DD

## Pending tasks
- feat-002: Title - pending
- feat-003: Title - pending

## Blocked tasks
(none)

## Notes for next session
[Agent writes any context the next session needs that isn't in feature_list.json]
```

## session-log.json {#session-log}

Optionnel mais recommandé. Écrit par l'agent à la fin de chaque session pour l'observability.

```json
{
  "session_id": "YYYY-MM-DD-NNN",
  "date": "YYYY-MM-DD",
  "task_id": "feat-001",
  "status": "complete",
  "files_read": [
    "AGENTS.md",
    "feature_list.json",
    "src/auth/routes.ts"
  ],
  "files_modified": [
    "src/auth/login.ts",
    "src/auth/logout.ts",
    "tests/auth/login.test.ts"
  ],
  "verification": {
    "tests": "passed",
    "lint": "passed",
    "build": "passed"
  },
  "next_task": "feat-002",
  "notes": ""
}
```

## review-request.md {#review-request}

Écrit dans `reviews/YYYY-MM-DD-review.md` lorsqu'un human checkpoint est déclenché.

```markdown
# Review Request - YYYY-MM-DD

## Task
[feat-id]: Task title

## What I did
- [Action 1]
- [Action 2]

## Why I stopped
[Specific reason - scope conflict / test failure / ambiguity]

## What I need from you
[Specific question or decision required]

## Relevant files
- [file-path]: [why it's relevant]

## Proposed next step if approved
[What the agent will do after receiving a response]
```
