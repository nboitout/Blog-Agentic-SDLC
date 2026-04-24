# Human-in-the-Loop Governance

> **L'autonomie est un dial, pas un switch. Le harness contrôle où il est positionné.**

## Le spectre d'autonomie {#spectrum}

Toutes les tâches agentiques ne méritent pas le même niveau de supervision humaine. Un Agentic SDLC bien conçu définit des niveaux d'autonomie explicites et assigne les tâches à ces niveaux de manière délibérée.

| Niveau | Autonomie de l'agent | Implication humaine |
|---|---|---|
| **L0 - Assisted** | Suggère des changements ; l'humain applique | Élevée |
| **L1 - Supervised** | Applique des changements ; l'humain review chacun | Moyenne |
| **L2 - Checkpointed** | Exécute une session ; l'humain review à la fin | Faible |
| **L3 - Autonomous** | Exécute plusieurs sessions sans review | Minimale |

La plupart des équipes de production opèrent à L1-L2. L3 n'est approprié que pour des tâches bien bornées et fortement couvertes par les tests.

## Quand insérer un human checkpoint {#checkpoints}

Le harness définit des conditions explicites qui suspendent l'exécution autonome et demandent une human review :

- **Scope boundary hit** - l'agent a tenté de modifier un fichier hors scope
- **Verification failure** - les tests ont échoué plus de N fois de suite
- **Ambiguity detected** - la description de tâche contredit les règles d'AGENTS.md
- **Architecture impact** - le changement proposé touche une interface ou un schema core
- **Novel failure mode** - type d'erreur non observé dans les sessions précédentes

## Le review protocol {#review}

Quand un human checkpoint est déclenché, l'agent écrit une review request structurée :

```markdown
# Review Request - 2026-04-17

## Task
Implement user authentication logout endpoint

## What I did
- Added `POST /auth/logout` endpoint in `src/auth/routes.ts`
- Invalidated session token in Redis

## Why I stopped
Verification failed: `tests/auth/logout.test.ts` - 2 failing assertions

## What I need
Clarification on expected token invalidation behaviour (see failing test line 47)

## Next step if approved
Fix token invalidation logic and re-run verification
```

L'humain lit, répond, puis l'agent reprend. L'échange complet est commité dans git.

---

*Suivant : [09. Bibliographie →](/fr/lectures/lecture-09-bibliography/)*
