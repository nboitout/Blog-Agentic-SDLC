# Harness Design : contraindre les agents pour gagner en fiabilité

> **Un harness n'est pas une cage. C'est l'infrastructure qui permet à l'agent d'aller vite sans sortir de route.**

## Ce qu'est un harness {#definition}

Un harness est l'ensemble des fichiers, scripts, conventions et checks automatisés qui entourent un AI agent et structurent son comportement. Ce n'est pas l'agent lui-même : c'est l'environnement dans lequel l'agent opère.

Le harness répond de manière déterministe à quatre questions :

1. **Que peut faire l'agent ?** (scope et permissions)
2. **Qu'est-ce qui a été fait ?** (state management)
3. **Est-ce que cela fonctionne ?** (verification)
4. **Que doit-il se passer ensuite ?** (continuity)

## Du fantasme de software factory au vrai engineering {#factory-fantasy}

Une erreur fréquente consiste à voir les coding agents comme un chemin simple vers une "software factory" où le code passerait automatiquement de l'idée à la production.

Ce cadrage est trompeur.

Les systèmes agentiques ne suppriment pas le besoin de discipline d'engineering. Ils l'augmentent.

Plus vous introduisez d'autonomie, plus vous avez besoin de :

- meilleures boundaries
- meilleurs sensors
- meilleurs rollback paths
- meilleure observability
- meilleures définitions de l'échec acceptable

L'autonomie sans harness crée de la fragilité, pas du leverage.

## Les cinq primitives du harness {#primitives}

### 1. Filesystem as state

Le repository est la single source of truth. Le harness écrit tout le state - avancement, décisions, échecs - dans des fichiers du repo, pas dans la mémoire de l'agent.

### 2. Scope enforcement

Le harness définit des allow-lists explicites de fichiers et dossiers que l'agent peut toucher. Les modifications hors scope sont bloquées ou signalées.

### 3. Verification pipeline

Une test suite déterministe s'exécute automatiquement après chaque action de l'agent. Le harness ne demande pas à l'agent s'il faut lancer les tests : il les lance sans condition.

### 4. State transitions

Le harness définit des états explicites (`planning`, `in_progress`, `verifying`, `complete`, `failed`) et impose les transitions valides. Un agent ne peut pas marquer une tâche `complete` tant que la verification pipeline ne passe pas.

### 5. Continuity protocol

Chaque session se termine par un handoff file structuré contenant assez de contexte pour que la session suivante puisse reprendre sans intervention humaine.

## Un minimal harness pack {#minimal}

Le minimum viable harness pour un projet agentique tient en trois fichiers :

```text
AGENTS.md           # Static context and rules
feature_list.json   # Task registry with status
progress.md         # Current session state
```

Voir la section [Templates](/fr/resources/templates/) pour des versions prêtes à copier.

## Harness vs prompt engineering {#vs-prompts}

| Approche | Où vit le contrôle | Fiabilité | Auditabilité |
|---|---|---|---|
| Prompt engineering | Context de l'agent | Faible | Aucune |
| Harness design | Repository + scripts | Élevée | Historique git complet |

Les prompts façonnent l'*intention* de l'agent. Les harnesses façonnent son *comportement*. Les deux comptent, mais dans un agentic SDLC de production, le harness design est la fondation.

---

*Suivant : [Multi-Agent Patterns →](/fr/lectures/lecture-05-multi-agent-patterns/)*
