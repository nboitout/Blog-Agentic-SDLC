# Project 01 · Baseline vs Agentic Sprint

**Difficulty:** Beginner · **Duration:** ~2 hours · **Prerequisites:** Lectures 01–02

## Objective {#objective}

Run the same feature implementation task twice — once with a vanilla agent (no harness), once with a minimal harness — and measure the difference in reliability, scope adherence, and time-to-verify.

This project makes the value of harness design viscerally concrete. Most engineers don't believe how large the difference is until they see it themselves.

## The task {#task}

You will implement a simple **user authentication module** with two endpoints:
- `POST /auth/login` — validate credentials, return a session token
- `POST /auth/logout` — invalidate the session token

The codebase is a minimal TypeScript Express application provided in `starter/`.

## Phase 1: The Baseline Run {#baseline}

### Setup
```bash
git clone https://github.com/nboitout/agentic-sdlc
cd projects/project-01/starter
npm install
```

### Instructions
Open Claude Code (or your preferred agent) in the `starter/` directory. Give it this prompt **and nothing else**:

```
Implement user authentication with POST /auth/login and POST /auth/logout.
Login should validate against the users array in src/data.ts.
Logout should invalidate the session token.
```

### What to observe
Run the agent and take notes on:
- [ ] Does it stay within the expected files?
- [ ] Does it run tests before finishing?
- [ ] Does it document what it did?
- [ ] How many attempts before tests pass?

Record your observations in `baseline-notes.md`.

## Phase 2: The Harnessed Run {#harnessed}

### Setup
Reset to the starter state:
```bash
git checkout -- .
```

### Add the harness
Copy the minimal harness pack into the project:
```bash
cp ../../resources/templates/AGENTS.md .
cp ../../resources/templates/feature_list.json .
cp ../../resources/templates/progress.md .
```

Edit `feature_list.json` to add your task:
```json
{
  "features": [
    {
      "id": "feat-001",
      "title": "User authentication endpoints",
      "status": "pending",
      "scope": ["src/auth/", "tests/auth/"],
      "acceptance": [
        "POST /auth/login returns 200 + token on valid credentials",
        "POST /auth/login returns 401 on invalid credentials",
        "POST /auth/logout returns 200 and invalidates token",
        "All tests pass: npm test"
      ]
    }
  ]
}
```

### Instructions
Give the agent the **same core prompt**, but now `AGENTS.md`, `feature_list.json`, and `progress.md` are present in the directory. The agent will read them automatically.

### What to observe
Run the agent and take the same notes:
- [ ] Does it stay within `src/auth/` and `tests/auth/`?
- [ ] Does it run `npm test` before finishing?
- [ ] Does it update `progress.md`?
- [ ] How many attempts before tests pass?

## Phase 3: Measure the difference {#measure}

Fill in the comparison table:

| Metric | Baseline | Harnessed |
|---|---|---|
| Files modified (total) | | |
| Out-of-scope edits | | |
| Tests run automatically? | | |
| Attempts to pass tests | | |
| Progress documented? | | |
| Time to completion | | |

## Reflection questions {#reflection}

1. What was the most surprising difference between the two runs?
2. Which harness primitive had the biggest impact? (scope / verification / state)
3. What would you add to AGENTS.md based on what you observed?

---

*Next: [Project 02 — Building a Minimal Harness →](/en/projects/project-02-minimal-harness/)*
