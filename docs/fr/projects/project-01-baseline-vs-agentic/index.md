# Projet 01 · Vibe Coding vs Harness Engineering

**Difficulté :** Débutant · **Durée :** ~2 heures · **Prérequis :** Cours 01-02

## Objectif {#objective}

Exécuter la même tâche d'implémentation deux fois : d'abord en **vibe-coding mode** avec un agent vanilla et sans harness, puis avec un **minimal harness**. Comparez la fiabilité, le respect du scope et le time-to-verify.

Ce projet rend le contraste concret : le vibe coding est rapide, intuitif et peu contrôlé ; le harness engineering est borné, vérifiable et recoverable.

## La tâche {#task}

Vous allez implémenter un module simple de **user authentication** avec deux endpoints :

- `POST /auth/login` - valide les credentials et retourne un session token
- `POST /auth/logout` - invalide le session token

Le codebase est une application TypeScript Express minimale fournie dans `starter/`.

## Phase 1 : The Vibe-Coding Run {#baseline}

### Setup

```bash
git clone https://github.com/nboitout/agentic-sdlc
cd projects/project-01/starter
npm install
```

### Instructions

Ouvrez Claude Code, ou votre agent préféré, dans le dossier `starter/`. Donnez-lui ce prompt **et rien d'autre** :

```text
Implement user authentication with POST /auth/login and POST /auth/logout.
Login should validate against the users array in src/data.ts.
Logout should invalidate the session token.
```

### À observer

Lancez l'agent et notez :

- [ ] Reste-t-il dans les fichiers attendus ?
- [ ] Lance-t-il les tests avant de finir ?
- [ ] Documente-t-il ce qu'il a fait ?
- [ ] Combien de tentatives avant que les tests passent ?

Consignez vos observations dans `baseline-notes.md`.

## Phase 2 : The Harnessed Run {#harnessed}

### Setup

Revenez à l'état starter :

```bash
git checkout -- .
```

### Ajouter le harness

Copiez le minimal harness pack dans le projet :

```bash
cp ../../resources/templates/AGENTS.md .
cp ../../resources/templates/feature_list.json .
cp ../../resources/templates/progress.md .
```

Modifiez `feature_list.json` pour ajouter votre tâche :

```json
{
  "features": [
    {
      "id": "feat-001",
      "title": "User authentication endpoints",
      "status": "pending",
      "scope": ["src/auth/", "tests/auth/"],
      "acceptance": [
        "POST /auth/login returns 200 + token on valid credentials",
        "POST /auth/login returns 401 on invalid credentials",
        "POST /auth/logout returns 200 and invalidates token",
        "All tests pass: npm test"
      ]
    }
  ]
}
```

### Instructions

Donnez à l'agent le **même core prompt**, mais cette fois `AGENTS.md`, `feature_list.json` et `progress.md` sont présents dans le dossier. L'agent les lira automatiquement.

### À observer

Lancez l'agent et prenez les mêmes notes :

- [ ] Reste-t-il dans `src/auth/` et `tests/auth/` ?
- [ ] Lance-t-il `npm test` avant de terminer ?
- [ ] Met-il à jour `progress.md` ?
- [ ] Combien de tentatives avant que les tests passent ?

## Phase 3 : Mesurer la différence {#measure}

Complétez le tableau :

| Metric | Baseline | Harnessed |
|---|---|---|
| Fichiers modifiés (total) | | |
| Modifications hors scope | | |
| Tests lancés automatiquement ? | | |
| Tentatives avant tests verts | | |
| Progress documenté ? | | |
| Time to completion | | |

## Questions de réflexion {#reflection}

1. Quelle différence vous a le plus surpris entre les deux runs ?
2. Quelle primitive de harness a eu le plus d'impact ? (scope / verification / state)
3. Qu'ajouteriez-vous à AGENTS.md à partir de vos observations ?

---

*Suivant : [Projet 02 - Construire un Minimal Harness →](/fr/projects/project-02-minimal-harness/)*
