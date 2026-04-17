# Project 02 · Building a Minimal Harness from Scratch

**Difficulty:** Intermediate · **Duration:** ~3 hours · **Prerequisites:** Lectures 01–04, Project 01

## Objective {#objective}

Scaffold a production-grade minimal harness — `AGENTS.md`, `feature_list.json`, `progress.md` — for **your own real repository**. Wire up the verification pipeline and run your first fully governed agent session.

This project is intentionally applied to your own codebase, not a toy example. The friction is the point.

## Step 1: Audit your repository {#audit}

Before writing any harness files, answer these questions about your repo:

**Build & test**
- How do you run tests? (`npm test`, `pytest`, `cargo test`…)
- How do you lint? (`eslint`, `ruff`, `clippy`…)
- How do you build? (`npm run build`, `make`…)

**Architecture**
- Which directories are off-limits for agents? (`legacy/`, `infra/`, `.github/`)
- Which files should never be edited directly? (`package-lock.json`, generated files)
- What are your naming conventions? (file names, function names, branch names)

**Conventions**
- How should the agent format commit messages?
- Should the agent create branches or work on `main`?
- Are there any external services or secrets it must never touch?

Write the answers down — you'll need them for `AGENTS.md`.

## Step 2: Write AGENTS.md {#agents-md}

Create `AGENTS.md` in your repo root. Use this structure:

```markdown
# AGENTS.md

## About this repo
[One paragraph description of what the codebase does]

## Build & test commands
- Run tests: `[your test command]`
- Lint: `[your lint command]`
- Build: `[your build command]`

## Scope rules
- NEVER modify files in: [list directories]
- NEVER edit directly: [list files]
- Only modify files in: [list allowed directories for agentic tasks]

## Architecture rules
- [Rule 1 — e.g. "All API calls go through src/api/client.ts"]
- [Rule 2 — e.g. "Use zod for all data validation"]
- [Rule 3 — e.g. "Never import from ../.. across module boundaries"]

## Session protocol
- Read feature_list.json at the start of every session
- Update progress.md at the end of every session
- Run the full test suite before marking any task complete
- Never mark a task complete if any test is failing
```

## Step 3: Create feature_list.json {#feature-list}

```json
{
  "version": "1.0",
  "project": "your-project-name",
  "features": [
    {
      "id": "feat-001",
      "title": "Your first agentic task",
      "status": "pending",
      "priority": "high",
      "scope": ["src/your-module/"],
      "acceptance": [
        "Criterion 1",
        "Criterion 2",
        "All tests pass"
      ],
      "notes": ""
    }
  ]
}
```

::: tip
Keep acceptance criteria machine-verifiable where possible. "All tests pass" is better than "works correctly." "Returns 200 on valid input" is better than "handles input properly."
:::

## Step 4: Create progress.md {#progress}

```markdown
# Agent Progress

## Current status
- **Session**: Not started
- **Active task**: None
- **Last verified**: N/A

## Completed tasks
(none yet)

## Pending tasks
- feat-001: Your first agentic task

## Notes
(Agent writes here at end of session)
```

## Step 5: Run your first governed session {#first-session}

Open Claude Code in your repo. It will read `AGENTS.md` automatically. Start the session with:

```
Read AGENTS.md and feature_list.json. 
Pick the highest-priority pending task.
Implement it, run the verification pipeline, and update progress.md.
```

## Step 6: Review the session {#review}

After the session, check:
- [ ] Did the agent read `AGENTS.md`?
- [ ] Did it respect the scope rules?
- [ ] Did it run the verification commands?
- [ ] Did it update `progress.md`?
- [ ] Is `feature_list.json` status updated?

If anything was missed, update `AGENTS.md` with a clearer rule and re-run.

---

*Next: [Project 03 — Multi-Agent Pipeline →](/en/projects/project-03-multi-agent-pipeline/)*
