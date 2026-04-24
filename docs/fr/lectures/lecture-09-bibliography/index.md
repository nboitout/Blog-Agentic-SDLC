# 09. Bibliographie

Ce cours s'appuie sur un ensemble ciblé de références publiques sur le harness engineering, les agents long-running et le delivery logiciel agentique fiable.

## Articles de recherche clés

- [Pan et al. - Natural-Language Agent Harnesses (Tsinghua University, mars 2026)](https://arxiv.org/abs/2603.25723) - Propose des spécifications de harness en langage naturel avec une couche explicite de runtime contract.
- [Lee et al. - Meta-Harness: End-to-End Optimization of Model Harnesses (Stanford University, mars 2026)](https://arxiv.org/abs/2603.28052) - Montre l'optimisation automatisée de harness à partir de traces d'exécution complètes et d'une amélioration outer-loop itérative.
- [DeepMind - AutoHarness: improving LLM agents by automatically synthesizing a code harness (mars 2026)](https://arxiv.org/abs/2603.03329) - Démontre des harnesses générés par code pour imposer des actions valides dans des tâches long-horizon.
- [AgentSpec - Customizable Runtime Enforcement for Safe and Reliable LLM Agents (contexte ICSE 2026)](https://arxiv.org/abs/2503.18666) - Introduit un DSL pour les runtime safety constraints et les policy boundaries enforceable.

## Sources industrie et case studies

- [Anthropic - Building effective agents (décembre 2024)](https://www.anthropic.com/engineering/building-effective-agents) - Patterns d'architecture pratiques pour choisir entre workflows et autonomous agents.
- [Anthropic - Effective harnesses for long-running agents (novembre 2025)](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) - Guidance concrète sur continuity, recovery et reliability dans les sessions agentiques longues.
- [Anthropic - Harness design for long-running applications](https://www.anthropic.com/engineering/harness-design-long-running-apps) - Patterns de design pour construire des harnesses durables dans des workflows de production long-horizon.
- [OpenAI - Zero-manual-code experiment report (2025-2026)](https://openai.com/research/zero-manual-code/) - Référence sur l'expérience OpenAI visant à réduire les étapes de coding manuel via des workflows agentiques.
- [LangChain - Evaluating Deep Agents CLI on Terminal Bench 2.0](https://www.langchain.com/blog/evaluating-deepagents-cli-on-terminal-bench-2-0) - Case study orientée benchmark sur l'impact du harness et du setup d'évaluation.

## Perspectives fondatrices

- [OpenAI - Harness engineering](https://openai.com/index/harness-engineering/) - Introduit le harness engineering comme couche de fiabilité qui rend le comportement agentique opérationnellement dependable.
- [Martin Fowler - Harness Engineering for Coding Agent Users](https://martinfowler.com/articles/harness-engineering.html) - Cadrage clair sur le besoin de structure et de control boundaries autour des coding agents.
- [LangChain - The anatomy of an agent harness](https://www.langchain.com/blog/the-anatomy-of-an-agent-harness) - Décompose les composants principaux d'un harness et leur articulation en production.

## Approfondissements pédagogiques

- [WalkingLabs - Learn Harness Engineering](https://walkinglabs.github.io/learn-harness-engineering/en/) - Parcours structuré reliant fondations conceptuelles et choix d'implémentation.

## Références orientées implémentation

- [Claude Code from Source - Chapter 1: Architecture](https://claude-code-from-source.com/ch01-architecture/#the-golden-path-from-keystroke-to-output) - Utile pour comprendre le runtime path end-to-end depuis le prompt jusqu'à l'output système.
- [Claude Code from Source - Chapter 2: Bootstrap](https://claude-code-from-source.com/ch02-bootstrap/) - Explique les mécanismes d'initialisation de session qui influencent fortement la reliability et la qualité du contexte.
- [Simon Willison - Red/Green TDD for agentic coding](https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/) - Pattern pratique de fiabilité pour garder les changements de coding agents test-driven et auditables.
- [Phil Schmid - Agent Harness 2026](https://www.philschmid.de/agent-harness-2026) - Perspective concise et orientée implémentation sur les décisions de harness design et les trade-offs opérationnels.

---

Commencer la pratique : [Projet 01 →](/fr/projects/project-01-baseline-vs-agentic/)
