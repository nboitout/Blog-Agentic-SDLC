---
layout: home

hero:
  name: "SDLC Agentique"
  text: "Des outils de code IA aux systèmes de delivery fiables"
  tagline: Un cours pratique sur les coding agents, les loops, les harnesses et les patterns de gouvernance qui rendent possible une software factory maîtrisée.
  actions:
    - theme: brand
      text: Commencer
      link: /fr/lectures/lecture-01-why-traditional-sdlc-breaks/
    - theme: alt
      text: Auto-évaluation dirigeant
      link: /fr/executive-self-assessment/

features:
  - icon: 🎓
    title: Cours
    details: Neuf chapitres pour comprendre pourquoi les delivery loops classiques se dégradent sous pression agentique, et comment les redesign avec contraintes explicites, state management et verification.
    link: /fr/lectures/lecture-01-why-traditional-sdlc-breaks/
    linkText: Commencer par le cours 01
  - icon: 🛠️
    title: Projets
    details: Des exercices terrain pour construire et comparer des agentic pipelines, du minimal harness à un pipeline multi-agent couvrant frontend, backend et tests.
    link: /fr/projects/
    linkText: Explorer les projets
  - icon: 📚
    title: Resource Library
    details: Des templates prêts à copier - AGENTS.md, feature lists, session logs, review requests - conçus pour être utilisés directement dans de vrais repositories.
    link: /fr/resources/
    linkText: Parcourir les ressources
---

<div class="hero-pillars">
  <div class="pillar-card">
    <div class="pillar-icon">↺</div>
    <div class="pillar-title">Loops</div>
    <div class="pillar-desc">Plan → Code → Verify → Reflect. Le cycle opérationnel qui remplace le sprint comme unité de contrôle.</div>
    <a class="pillar-link pillar-link--loops" href="/Blog-Agentic-SDLC/fr/lectures/lecture-02-the-agentic-loop/">Cours 02</a>
  </div>
  <div class="pillar-card">
    <div class="pillar-icon">⊞</div>
    <div class="pillar-title">Harnesses</div>
    <div class="pillar-desc">Scope, state et verification. La structure qui garde les agents alignés sur l'objectif.</div>
    <a class="pillar-link pillar-link--harness" href="/Blog-Agentic-SDLC/fr/lectures/lecture-04-harness-design/">Cours 04</a>
  </div>
  <div class="pillar-card">
    <div class="pillar-icon">◈</div>
    <div class="pillar-title">Governance</div>
    <div class="pillar-desc">Niveaux d'autonomie et checkpoints. Des humains réellement en contrôle.</div>
    <a class="pillar-link pillar-link--gov" href="/Blog-Agentic-SDLC/fr/lectures/lecture-08-human-in-the-loop/">Cours 08</a>
  </div>
</div>

## Les trois niveaux de l'agentic stack {#three-levels}

Le delivery logiciel agentique opère sur trois niveaux imbriqués. Ce cours couvre les trois, depuis l'évolution du lifecycle jusqu'aux primitives d'ingénierie qui rendent les agents fiables.

| Niveau | Ce qu'il couvre |
|---|---|
| **Agentic SDLC** | Comment le delivery change lorsque des AI agents participent directement au planning, au coding, aux tests et à la review |
| **Agentic engineering** | Comment les ingénieurs travaillent dans ce modèle : loop design, state management et scope boundaries |
| **Harness engineering** | Comment rendre les agents suffisamment fiables pour participer : constraints, verification et continuity |

## De quoi parle ce cours ? {#what-is-it}

Les AI coding agents - Claude Code, Codex, Cursor et outils équivalents - savent de mieux en mieux écrire, revoir et refactorer du code. Mais la capacité du modèle ne suffit pas à produire un delivery fiable. Sans engineering explicite, les workflows agentiques introduisent de nouveaux failure modes : perte de contexte entre sessions, scope overreach, erreurs silencieuses et drift accumulé.

Ce cours repense le software delivery pour un monde où les AI coding agents participent directement au planning, au coding, aux tests et à la review. Il ne s'agit pas de remplacer les développeurs. Il s'agit de designer les systèmes, contraintes et feedback loops qui rendent la collaboration humain-agent réellement opérationnelle, au niveau de la feature, de la session et du delivery lifecycle complet.

## Ce que vous saurez faire {#outcomes}

À la fin du cours, vous saurez :

- Diagnostiquer pourquoi un agentic workflow échoue et identifier la primitive de harness manquante
- Concevoir un minimal harness pour un vrai codebase : scope rules, verification pipeline, state files
- Exécuter une session agentique gouvernée qui produit un travail auditable et recoverable
- Coordonner plusieurs agents sur une feature couvrant frontend, backend et tests
- Définir des niveaux d'autonomie et des human checkpoints adaptés au niveau de risque de votre équipe

## Par où commencer {#start}

- [Cours 01 : Pourquoi le SDLC traditionnel échoue](/fr/lectures/lecture-01-why-traditional-sdlc-breaks/) - pour poser le cadre théorique
- [Projet 01 : Vibe Coding vs Harness Engineering](/fr/projects/project-01-baseline-vs-agentic/) - pour pratiquer immédiatement
- [Templates](/fr/resources/templates/) - pour récupérer AGENTS.md, feature_list.json et progress.md pour votre propre projet

## Aidez-nous à prioriser les chapitres avancés {#advanced-chapters}

Nous préparons une nouvelle série de chapitres avancés pour les engineering leaders et praticiens qui travaillent sur le delivery humain-agent fiable.

Les sujets possibles incluent :
- Harness patterns pour agents frontend
- Harness patterns pour agents backend/API
- Harness patterns pour QA et release engineering
- Agent memory design
- Subagents et spécialisation des rôles
- Quand ne pas utiliser d'agents
- Review de pull requests générées par agent
- Agentic incident response et SRE loops
- Harness anti-patterns
- Mesure des vrais gains de productivité

Indiquez-nous les thèmes les plus utiles dans votre contexte.

[**Partager vos priorités →**](/fr/share-your-priorities/)
