---
layout: home

hero:
  name: "Agentic SDLC"
  text: "From AI coding tools to reliable delivery systems"
  tagline: A practical course on the coding agents, loops, harnesses, and governance patterns that make a software factory possible.
  actions:
    - theme: brand
      text: Start Learning
      link: /en/lectures/lecture-01-why-traditional-sdlc-breaks/
    - theme: alt
      text: Self-Assessment for Executives
      link: /en/executive-self-assessment/

features:
  - icon: 🎓
    title: Lectures
    details: Eight lectures covering why classical delivery loops break under agentic pressure — and how to redesign them with explicit constraints, state management, and verification.
    link: /en/lectures/lecture-01-why-traditional-sdlc-breaks/
    linkText: Start with Lecture 01
  - icon: 🛠️
    title: Projects
    details: Hands-on practice building and comparing agentic pipelines — from a first minimal harness to a multi-agent feature pipeline spanning frontend, backend, and tests.
    link: /en/projects/
    linkText: Explore Projects
  - icon: 📚
    title: Resource Library
    details: Copy-ready templates — AGENTS.md, feature lists, session logs, review requests — designed to be dropped into real repositories and used immediately.
    link: /en/resources/
    linkText: Browse Resources
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

## Three levels of the agentic stack {#three-levels}

Agentic software delivery operates across three nested levels. This course covers all three, from the highest-level lifecycle changes down to the engineering primitives that make agents reliable.

| Level | What it covers |
|---|---|
| **Agentic SDLC** | How software delivery changes when AI agents participate directly in planning, coding, testing, and review |
| **Agentic engineering** | How engineers work inside that model — designing loops, managing state, and setting scope boundaries |
| **Harness engineering** | How agents are made reliable enough to participate at all — constraints, verification, and continuity |

## What this course is about {#what-is-it}

AI coding agents — tools like Claude Code, Codex, and Cursor — are increasingly capable of writing, reviewing, and refactoring code. But capability alone does not produce reliable delivery. Without deliberate engineering, agentic workflows introduce new failure modes: context loss between sessions, scope overreach, silent errors, and accumulated drift.

This course rethinks software delivery for a world where AI coding agents participate directly in planning, coding, testing, and review. It is not about replacing developers. It is about designing the systems, constraints, and feedback structures that make human-agent collaboration work in practice — at the feature level, the session level, and across the full delivery lifecycle.

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
