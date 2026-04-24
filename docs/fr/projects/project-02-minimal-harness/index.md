# Projet 02 · Construire un Minimal Harness from Scratch

**Difficulté :** Intermédiaire · **Durée :** ~3 heures · **Prérequis :** Cours 01-04, Projet 01

## Objectif {#objective}

Créer un minimal harness de niveau production - `AGENTS.md`, `feature_list.json`, `progress.md` - pour **votre propre repository réel**. Branchez la verification pipeline et exécutez votre première session agentique pleinement gouvernée.

Ce projet est volontairement appliqué à votre codebase, pas à un exemple jouet. La friction fait partie de l'apprentissage.

## Étape 1 : Auditer votre repository {#audit}

Avant d'écrire les fichiers du harness, répondez à ces questions sur votre repo :

**Build & test**

- Comment lancez-vous les tests ? (`npm test`, `pytest`, `cargo test`...)
- Comment lancez-vous le lint ? (`eslint`, `ruff`, `clippy`...)
- Comment faites-vous le build ? (`npm run build`, `make`...)

**Architecture**

- Quels dossiers sont off-limits pour les agents ? (`legacy/`, `infra/`, `.github/`)
- Quels fichiers ne doivent jamais être modifiés directement ? (`package-lock.json`, fichiers générés)
- Quelles sont vos naming conventions ? (noms de fichiers, fonctions, branches)

**Conventions**

- Quel format de commit message l'agent doit-il utiliser ?
- L'agent doit-il créer des branches ou travailler sur `main` ?
- Y a-t-il des services externes ou secrets auxquels il ne doit jamais toucher ?

Écrivez les réponses : elles alimenteront `AGENTS.md`.

## Étape 2 : Écrire AGENTS.md {#agents-md}

Créez `AGENTS.md` à la racine du repo. Utilisez cette structure :

```markdown
# AGENTS.md

## About this repo
[One paragraph description of what the codebase does]

## Build & test commands
- Run tests: `[your test command]`
- Lint: `[your lint command]`
- Build: `[your build command]`

## Scope rules
- NEVER modify files in: [list directories]
- NEVER edit directly: [list files]
- Only modify files in: [list allowed directories for agentic tasks]

## Architecture rules
- [Rule 1 - e.g. "All API calls go through src/api/client.ts"]
- [Rule 2 - e.g. "Use zod for all data validation"]
- [Rule 3 - e.g. "Never import from ../.. across module boundaries"]

## Session protocol
- Read feature_list.json at the start of every session
- Update progress.md at the end of every session
- Run the full test suite before marking any task complete
- Never mark a task complete if any test is failing
```

## Étape 3 : Créer feature_list.json {#feature-list}

```json
{
  "version": "1.0",
  "project": "your-project-name",
  "features": [
    {
      "id": "feat-001",
      "title": "Your first agentic task",
      "status": "pending",
      "priority": "high",
      "scope": ["src/your-module/"],
      "acceptance": [
        "Criterion 1",
        "Criterion 2",
        "All tests pass"
      ],
      "notes": ""
    }
  ]
}
```

::: tip
Gardez les acceptance criteria machine-verifiable dès que possible. "All tests pass" est meilleur que "works correctly". "Returns 200 on valid input" est meilleur que "handles input properly".
:::

## Étape 4 : Créer progress.md {#progress}

```markdown
# Agent Progress

## Current status
- **Session**: Not started
- **Active task**: None
- **Last verified**: N/A

## Completed tasks
(none yet)

## Pending tasks
- feat-001: Your first agentic task

## Notes
(Agent writes here at end of session)
```

## Étape 5 : Lancer votre première session gouvernée {#first-session}

Ouvrez Claude Code dans votre repo. Il lira `AGENTS.md` automatiquement. Démarrez la session avec :

```text
Read AGENTS.md and feature_list.json.
Pick the highest-priority pending task.
Implement it, run the verification pipeline, and update progress.md.
```

## Étape 6 : Review de la session {#review}

Après la session, vérifiez :

- [ ] L'agent a-t-il lu `AGENTS.md` ?
- [ ] A-t-il respecté les scope rules ?
- [ ] A-t-il lancé les verification commands ?
- [ ] A-t-il mis à jour `progress.md` ?
- [ ] Le status dans `feature_list.json` a-t-il été mis à jour ?

Si quelque chose a été manqué, clarifiez la règle dans `AGENTS.md` et relancez.

---

*Suivant : [Projet 03 - Multi-Agent Pipeline →](/fr/projects/project-03-multi-agent-pipeline/)*
