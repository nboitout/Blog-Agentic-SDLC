# Multi-Agent Coordination Patterns

> **Un agent est un outil. Plusieurs agents qui se coordonnent de façon fiable deviennent un problème d'engineering.**

## Pourquoi du multi-agent ? {#why}

Un agent unique qui travaille séquentiellement est limité par sa context window et par sa latence. Les tâches de software development complexes - couvrant frontend, backend, tests et documentation - dépassent rapidement ces deux limites.

Les multi-agent systems résolvent ce problème en décomposant le travail entre agents spécialisés qui tournent en parallèle. Mais la coordination introduit de nouveaux failure modes qu'un single-agent harness n'anticipe pas.

## Les trois patterns de coordination {#patterns}

### Pattern 1 : Orchestrator → Worker

Un orchestrator agent décompose la tâche et assigne des sous-tâches à des worker agents spécialisés. Les workers remontent leurs résultats à l'orchestrator, qui les intègre.

**Adapté à** : tâches avec décomposition claire et peu d'interdépendances.

**Failure mode** : l'orchestrator devient un bottleneck ; les workers produisent des artifacts incompatibles.

### Pattern 2 : Peer Review

Deux agents travaillent sur la même tâche séquentiellement : l'un implémente, l'autre review. Le reviewer ne voit pas le prompt de l'implementer, seulement son output.

**Adapté à** : code high-stakes où une verification indépendante compte vraiment.

**Failure mode** : le reviewer rubber-stamp le travail de l'implementer lorsque le contexte fuit entre les deux.

### Pattern 3 : Competitive Generation

Plusieurs agents produisent des implémentations indépendantes de la même feature. Un judge agent, ou un humain, choisit la meilleure.

**Adapté à** : tâches créatives où l'espace de solutions est large.

**Failure mode** : coûteux ; exige un judge fiable.

## Shared state dans les systèmes multi-agent {#shared-state}

Le repository reste la shared source of truth. Chaque agent écrit dans des branches nommées ou des fichiers namespaced. Le harness impose :

- Aucun fichier modifié simultanément par deux agents
- State files écrits atomiquement
- Orchestrator obligé de lire tous les worker states avant intégration

---

*Suivant : [Testing Agentic Pipelines →](/fr/lectures/lecture-06-testing-agentic-pipelines/)*
