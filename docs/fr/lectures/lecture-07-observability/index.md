# Observability : rendre le comportement des agents debuggable

> **Si vous ne voyez pas ce que l'agent a fait, vous ne pouvez pas corriger ce qui s'est mal passé.**

## Pourquoi l'observability est différente pour les agents {#why-different}

Dans le software traditionnel, l'observability signifie logs, metrics et traces du comportement système. Pour les systèmes agentiques, il faut tout cela, plus des traces du **reasoning behavior** : qu'a planifié l'agent, qu'a-t-il décidé, quand a-t-il changé d'avis et pourquoi ?

## Les trois couches d'observability {#layers}

### Layer 1 : Code-level observability

Standard : logs, error traces, test results. Ces signaux sont produits par la verification pipeline et doivent être écrits dans le state file après chaque loop.

### Layer 2 : Session-level observability

Que s'est-il passé dans cette session agentique ? Un structured session log doit capturer :

- Les fichiers lus
- Les fichiers modifiés
- Les tests lancés et leurs résultats
- L'auto-évaluation de l'agent en fin de session

### Layer 3 : Harness-level observability

Dans le temps : le harness fonctionne-t-il ? Suivez des metrics comme :

- Task completion rate par session
- Verification pipeline pass rate
- Scope violations (modifications de fichiers out-of-bounds)
- Session restart rate (proxy de context loss)

## Instrumentation pratique {#instrumentation}

Le minimum viable observability setup :

```bash
# At session end, the agent writes:
echo '{
  "session_id": "2026-04-17-001",
  "tasks_completed": ["feat/auth-login"],
  "tasks_failed": [],
  "files_modified": ["src/auth/login.ts", "tests/auth.test.ts"],
  "verification": "passed",
  "next_task": "feat/auth-logout"
}' > .agent/session-log.json
```

Ce fichier est commité dans git, ce qui donne un audit trail complet de chaque session agentique.

---

*Suivant : [Human-in-the-Loop Governance →](/fr/lectures/lecture-08-human-in-the-loop/)*
