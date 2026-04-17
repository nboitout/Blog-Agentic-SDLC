# Guides

Practical, step-by-step implementation guides for the most common Agentic SDLC scenarios.

## Setting up your first harness {#first-harness}

**Time:** 30 minutes · **When:** New project or existing project with no harness

1. Copy the three core template files into your repo root: `AGENTS.md`, `feature_list.json`, `progress.md`
2. Edit `AGENTS.md` — fill in your actual test, lint, and build commands
3. Add your first task to `feature_list.json` with explicit scope and acceptance criteria
4. Commit all three files: `git add AGENTS.md feature_list.json progress.md && git commit -m "chore: add minimal agent harness"`
5. Open Claude Code and run your first governed session

**Validation checklist:**
- [ ] Agent reads AGENTS.md without being told to
- [ ] Agent respects scope boundaries
- [ ] Agent runs verification before marking task complete
- [ ] Agent updates progress.md

---

## Migrating a legacy project {#legacy-migration}

**Time:** 1–2 hours · **When:** Existing codebase with no tests or documentation

Legacy codebases present a specific challenge: the agent has no test suite to verify against, and no architectural documentation to guide scope decisions.

**Step 1: Write AGENTS.md first, before any agent runs.**
Interview yourself about the codebase. What are the unwritten rules? What breaks when you touch the wrong thing? Write it down.

**Step 2: Add a smoke test.**
Before agentic tasks begin, add at minimum a smoke test that verifies the application starts:
```bash
#!/bin/bash
# scripts/smoke-test.sh
npm run build && echo "BUILD OK" || exit 1
node -e "require('./dist/index.js'); process.exit(0)" && echo "STARTUP OK" || exit 1
```

Reference this in AGENTS.md as the minimum verification command.

**Step 3: Start with documentation tasks.**
The safest first agentic task in a legacy project is documentation, not implementation. Ask the agent to read the codebase and produce an architecture summary. This forces it to map the codebase before touching anything.

**Step 4: Expand scope incrementally.**
Start with one module. Add tests for it. Then allow the agent to work on that module only. Expand scope only when verification is passing reliably.

---

## Configuring Claude Code for team use {#team-config}

**Time:** 30 minutes · **When:** Rolling out agentic workflow to a team

**Shared AGENTS.md**
The `AGENTS.md` file is a shared team artifact. Treat it like the `README.md` — review changes to it carefully, discuss scope rule changes in PRs.

**Branch strategy**
Recommended: agents work on feature branches, never directly on `main`.
```markdown
## Branch rules (add to AGENTS.md)
- Always create a branch named feat/[task-id] before starting work
- Never commit directly to main
- Push the branch and open a PR when the task is complete
```

**Feature list ownership**
Assign one team member as the feature list owner. They are responsible for:
- Writing acceptance criteria that are specific and verifiable
- Setting scope boundaries that don't conflict
- Reviewing `session-log.json` files after each agent session

**Review cadence**
Run a weekly 30-minute harness review:
- What scope violations occurred?
- What tests failed repeatedly?
- What AGENTS.md rules were unclear?
- Update the harness accordingly.
