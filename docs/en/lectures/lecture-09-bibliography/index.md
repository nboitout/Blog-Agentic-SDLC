# 09. Bibliography

This course was informed by a focused set of public references on harness engineering, long-running agents, and reliable agentic software delivery.

## Core papers

- [Pan et al. — Natural-Language Agent Harnesses (Tsinghua University, March 2026)](https://arxiv.org/abs/2603.25723) — Proposes natural-language harness specifications with an explicit runtime contract layer.
- [Lee et al. — Meta-Harness: End-to-End Optimization of Model Harnesses (Stanford University, March 2026)](https://arxiv.org/abs/2603.28052) — Shows automated harness optimization using full execution traces and iterative outer-loop improvement.
- [DeepMind — AutoHarness: improving LLM agents by automatically synthesizing a code harness (March 2026)](https://arxiv.org/abs/2603.03329) — Demonstrates code-generated harnesses to enforce environment-valid actions in long-horizon tasks.
- [AgentSpec — Customizable Runtime Enforcement for Safe and Reliable LLM Agents (ICSE 2026 track context)](https://arxiv.org/abs/2503.18666) — Introduces a DSL for runtime safety constraints and enforceable policy boundaries.

## Industry sources & case studies

- [Anthropic — Building effective agents (December 2024)](https://www.anthropic.com/engineering/building-effective-agents) — Practical architecture patterns for deciding when to use workflows vs autonomous agents.
- [Anthropic — Effective harnesses for long-running agents (November 2025)](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) — Concrete guidance on continuity, recovery, and reliability in extended agent sessions.
- [Anthropic — Harness design for long-running applications](https://www.anthropic.com/engineering/harness-design-long-running-apps) — Practical design patterns for building durable harnesses in long-horizon production workflows.
- [OpenAI — Zero-manual-code experiment report (2025–2026)](https://openai.com/research/zero-manual-code/) — Reference link for OpenAI’s reported experiment on reducing manual coding steps through agentic workflows.
- [LangChain — Evaluating Deep Agents CLI on Terminal Bench 2.0 (December 2025, referenced in March 2026 reporting)](https://www.langchain.com/blog/evaluating-deepagents-cli-on-terminal-bench-2-0) — Benchmark-oriented case study on harness and evaluation setup impact.

## Foundational perspectives

- [OpenAI — Harness engineering](https://openai.com/index/harness-engineering/) — Introduces harness engineering as the reliability layer that makes agent behavior operationally dependable.
- [Martin Fowler — Harness Engineering for Coding Agent Users](https://martinfowler.com/articles/harness-engineering.html) — Clear framing of why software teams need structure and control boundaries around coding agents.
- [LangChain — The anatomy of an agent harness](https://www.langchain.com/blog/the-anatomy-of-an-agent-harness) — Breaks down the main harness components and how they work together in production settings.

## Pedagogical deep dives

- [WalkingLabs — Learn Harness Engineering](https://walkinglabs.github.io/learn-harness-engineering/en/) — A structured learning path that connects conceptual foundations to implementation choices.

## Implementation-oriented references

- [Claude Code from Source — Chapter 1: Architecture / The golden path from keystroke to output](https://claude-code-from-source.com/ch01-architecture/#the-golden-path-from-keystroke-to-output) — Useful for understanding the end-to-end runtime path from prompt input to system output.
- [Claude Code from Source — Chapter 2: Bootstrap](https://claude-code-from-source.com/ch02-bootstrap/) — Explains early-session initialization mechanics that strongly influence reliability and context quality.
- [Simon Willison — Red/Green TDD for agentic coding](https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/) — A practical reliability pattern for keeping coding-agent changes test-driven and auditable.
- [Phil Schmid — Agent Harness 2026](https://www.philschmid.de/agent-harness-2026) — A concise implementation-focused perspective on harness design decisions and operational trade-offs.

---

Start practice: [Project 01 →](/en/projects/project-01-baseline-vs-agentic/)
