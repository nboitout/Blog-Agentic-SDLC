---
layout: home

hero:
  name: "Agentic SDLC"
  text: "Designing reliable software delivery with AI agents"
  tagline: A practical course on the loops, harnesses, and governance systems that let engineers and AI agents ship software reliably together.
  actions:
    - theme: brand
      text: Start with Lecture 01 →
      link: /en/lectures/lecture-01-why-traditional-sdlc-breaks/
    - theme: alt
      text: Take the Self-Assessment
      link: /en/executive-self-assessment/
  image:
    src: /hero-three-levels.svg
    alt: "Three levels: Agentic SDLC, Agentic engineering, Harness engineering"
---

<div class="hero-pillars">
  <div class="pillar-card">
    <div class="pillar-icon">↺</div>
    <div class="pillar-title">Loops</div>
    <div class="pillar-desc">Plan → Code → Verify → Reflect. The cycle that replaces the sprint.</div>
    <a class="pillar-link pillar-link--loops" href="/Blog-Agentic-SDLC/en/lectures/lecture-02-the-agentic-loop/">Lecture 02</a>
  </div>
  <div class="pillar-card">
    <div class="pillar-icon">⊞</div>
    <div class="pillar-title">Harnesses</div>
    <div class="pillar-desc">Scope, state, and verification. The structure that keeps agents on track.</div>
    <a class="pillar-link pillar-link--harness" href="/Blog-Agentic-SDLC/en/lectures/lecture-04-harness-design/">Lecture 04</a>
  </div>
  <div class="pillar-card">
    <div class="pillar-icon">◈</div>
    <div class="pillar-title">Governance</div>
    <div class="pillar-desc">Autonomy levels and checkpoints. Humans meaningfully in control.</div>
    <a class="pillar-link pillar-link--gov" href="/Blog-Agentic-SDLC/en/lectures/lecture-08-human-in-the-loop/">Lecture 08</a>
  </div>
</div>

## What this course is about {#what-is-it}

AI coding agents — tools like Claude Code, Codex, and Cursor — are increasingly capable of writing, reviewing, and refactoring code. But capability alone does not produce reliable delivery. Without deliberate engineering, agentic workflows introduce new failure modes: context loss between sessions, scope overreach, silent errors, and accumulated drift.

This course rethinks software delivery for a world where AI coding agents participate directly in planning, coding, testing, and review. It is not about replacing developers. It is about designing the systems, constraints, and feedback structures that make human-agent collaboration work in practice — at the feature level, the session level, and across the full delivery lifecycle.

### Three levels of the agentic stack

| Level | What it covers |
|---|---|
| **Agentic SDLC** | How software delivery changes when AI agents participate directly |
| **Agentic engineering** | How engineers work inside that model — loops, state, scope |
| **Harness engineering** | How agents are made reliable enough to participate at all |

## What you will be able to do {#outcomes}

By the end of this course you will be able to:

- Diagnose why an agentic workflow is failing and identify the harness primitive that is missing
- Design a minimal harness for a real codebase — scope rules, verification pipeline, state files
- Run a governed agent session that produces auditable, recoverable work
- Coordinate multiple agents across a feature that spans frontend, backend, and tests
- Set appropriate autonomy levels and define human checkpoints for your team's risk tolerance

## Where to start {#start}

- [Lecture 01: Why Traditional SDLC Breaks](/en/lectures/lecture-01-why-traditional-sdlc-breaks/) — start here for the theory
- [Project 01: Vibe Coding vs Harness Engineering](/en/projects/project-01-baseline-vs-agentic/) — start here for hands-on practice
- [Templates](/en/resources/templates/) — grab AGENTS.md, feature_list.json, and progress.md for your own project

## Bibliography {#bibliography}

This course was informed by a focused set of public references on harness engineering, long-running agents, and reliable agentic software delivery.

### Foundational perspectives

- [Anthropic — Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) — Practical patterns for keeping long-running agent workflows coherent, recoverable, and verifiable over time.
- [OpenAI — Harness engineering](https://openai.com/index/harness-engineering/) — Introduces harness engineering as the reliability layer that makes agent behavior operationally dependable.
- [Martin Fowler — Harness Engineering for Coding Agent Users](https://martinfowler.com/articles/harness-engineering.html) — Clear framing of why software teams need structure and control boundaries around coding agents.
- [LangChain — The anatomy of an agent harness](https://www.langchain.com/blog/the-anatomy-of-an-agent-harness) — Breaks down the main harness components and how they work together in production settings.

### Pedagogical deep dives

- [WalkingLabs — Learn Harness Engineering](https://walkinglabs.github.io/learn-harness-engineering/en/) — A structured learning path that connects conceptual foundations to implementation choices.

### Implementation-oriented references

- [Claude Code from Source — Chapter 1: Architecture / The golden path from keystroke to output](https://claude-code-from-source.com/ch01-architecture/#the-golden-path-from-keystroke-to-output) — Useful for understanding the end-to-end runtime path from prompt input to system output.
- [Claude Code from Source — Chapter 2: Bootstrap](https://claude-code-from-source.com/ch02-bootstrap/) — Explains early-session initialization mechanics that strongly influence reliability and context quality.
- [Simon Willison — Red/Green TDD for agentic coding](https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/) — A practical reliability pattern for keeping coding-agent changes test-driven and auditable.
- [Phil Schmid — Agent Harness 2026](https://www.philschmid.de/agent-harness-2026) — A concise implementation-focused perspective on harness design decisions and operational trade-offs.

## Help shape the next advanced chapters {#advanced-chapters}

We are preparing a new set of advanced chapters for engineering leaders and practitioners working on reliable human-agent software delivery.

These may include:
- Harness patterns for frontend agents
- Harness patterns for backend/API agents
- Harness patterns for QA and release engineering
- Agent memory design
- Subagents and role specialization
- When not to use agents
- Reviewing agent-generated pull requests
- Agentic incident response and SRE loops
- Harness anti-patterns
- Measuring real productivity gains

Tell us which topics matter most in your context.

[**Share your priorities →**](/en/share-your-priorities/)
