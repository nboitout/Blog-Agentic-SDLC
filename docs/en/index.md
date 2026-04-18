---
layout: home

hero:
  name: "Agentic SDLC"
  text: "Designing reliable software delivery with AI agents"
  tagline: A practical course on the loops, harnesses, and governance systems that let engineers and AI agents ship software reliably together.
  actions:
    - theme: brand
      text: Start Learning →
      link: /en/lectures/lecture-01-why-traditional-sdlc-breaks/
    - theme: alt
      text: View on GitHub
      link: https://github.com/nboitout/Blog-Agentic-SDLC

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

## What this course is about {#what-is-it}

AI coding agents — tools like Claude Code, Codex, and Cursor — are increasingly capable of writing, reviewing, and refactoring code. But capability alone does not produce reliable delivery. Without deliberate engineering, agentic workflows introduce new failure modes: context loss between sessions, scope overreach, silent errors, and accumulated drift.

This course rethinks software delivery for a world where AI coding agents participate directly in planning, coding, testing, and review. It is not about replacing developers. It is about designing the systems, constraints, and feedback structures that make human-agent collaboration work in practice — at the feature level, the session level, and across the full delivery lifecycle.

The course is built around three core concepts:

- **Loops** — the Plan → Code → Verify → Reflect cycles that replace the sprint as the unit of agentic work
- **Harnesses** — the files, scripts, and constraints that shape what agents can do, what state they maintain, and how failures are surfaced
- **Governance** — the checkpoints, review protocols, and autonomy levels that keep humans meaningfully in control

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
