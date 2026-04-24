# Context Engineering : ce que votre agent doit savoir

> **Un modèle puissant avec un mauvais contexte produit de mauvais résultats. Le context engineering est la discipline qui évite cela.**

## Le problème du contexte {#context-problem}

Chaque AI agent opère dans une context window. Ce qui n'est pas dans cette fenêtre n'existe pas pour l'agent. Cela crée un enjeu d'engineering fondamental : **vous devez architecturer ce que l'agent sait, pas seulement ce qu'il peut faire**.

Le context engineering consiste à designer, structurer et maintenir l'information qui entre dans la context window de l'agent, dans le temps, entre sessions et à travers les différentes étapes d'une tâche.

## Que met-on dans le contexte ? {#what-goes-in}

Le contexte d'un coding agent comporte plusieurs couches distinctes :

| Couche | Contenu | Persistance |
|---|---|---|
| **Static context** | Règles d'architecture, coding standards, repo conventions | Toujours présent |
| **Task context** | Description de feature, acceptance criteria, scope boundaries | Par tâche |
| **State context** | Avancement courant, ce qui est terminé, ce qui a échoué | Par session |
| **Code context** | Fichiers pertinents, interfaces, structures de tests | Chargé dynamiquement |

### Le pattern AGENTS.md

Le standard émergent pour le static context est un fichier unique - `AGENTS.md` - commité à la racine du repository. Il contient tout ce dont l'agent a besoin pour opérer dans ce codebase : comment lancer les tests, quels dossiers sont off-limits, les naming conventions et les contraintes d'architecture.

```markdown
# AGENTS.md

## Build & test
- Run tests: `npm test`
- Lint: `npm run lint`
- Build: `npm run build`

## Scope rules
- Never modify files in `legacy/`
- Never edit `package-lock.json` directly

## Architecture
- All API calls go through `src/api/client.ts`
- Use `zod` for all data validation
```

## Le budget de context window {#budget}

L'espace de context window est fini. Le remplir avec les mauvaises informations est aussi dommageable que ne pas le remplir. Une approche disciplinée alloue explicitement ce budget :

- **~20%** - static context (AGENTS.md, architecture docs)
- **~30%** - task context (feature courante, acceptance criteria)
- **~20%** - state context (progress file)
- **~30%** - dynamic code context (fichiers pertinents pour la sous-tâche)

## Context rot {#rot}

Le context rot apparaît lorsque l'information dans la context window dérive par rapport à l'état réel du codebase. C'est l'un des failure modes les plus insidieux dans les projets agentiques longs.

Stratégies de prévention :

- Garder AGENTS.md versionné et revu à chaque PR
- Écrire les state files de manière atomique, jamais en mises à jour partielles
- Utiliser des formats structurés (JSON, YAML) pour le state, pas de prose libre

::: tip
Le harness design (Cours 04) précise exactement comment les state files sont écrits, lus et vérifiés. Ne laissez jamais le state management à la discrétion de l'agent.
:::

---

*Suivant : [Harness Design →](/fr/lectures/lecture-04-harness-design/)*
