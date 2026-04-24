# Guides

Guides pratiques, étape par étape, pour les scénarios Agentic SDLC les plus fréquents.

## Mettre en place votre premier harness {#first-harness}

**Temps :** 30 minutes · **Quand :** Nouveau projet ou projet existant sans harness

1. Copiez les trois template files de base à la racine de votre repo : `AGENTS.md`, `feature_list.json`, `progress.md`
2. Modifiez `AGENTS.md` : renseignez vos vraies commandes de test, lint et build
3. Ajoutez votre première tâche dans `feature_list.json` avec scope et acceptance criteria explicites
4. Commitez les trois fichiers : `git add AGENTS.md feature_list.json progress.md && git commit -m "chore: add minimal agent harness"`
5. Ouvrez Claude Code et lancez votre première session gouvernée

**Validation checklist :**

- [ ] L'agent lit AGENTS.md sans qu'on le lui dise explicitement
- [ ] L'agent respecte les scope boundaries
- [ ] L'agent lance la verification avant de marquer la tâche complete
- [ ] L'agent met à jour progress.md

---

## Migrer un legacy project {#legacy-migration}

**Temps :** 1-2 heures · **Quand :** Codebase existant sans tests ou documentation

Les legacy codebases présentent un défi spécifique : l'agent n'a pas de test suite pour vérifier son travail, ni de documentation d'architecture pour guider ses décisions de scope.

**Étape 1 : Écrire AGENTS.md avant toute exécution d'agent.**

Interviewez-vous sur le codebase. Quelles sont les règles non écrites ? Qu'est-ce qui casse quand on touche au mauvais endroit ? Écrivez-le.

**Étape 2 : Ajouter un smoke test.**

Avant de démarrer les tâches agentiques, ajoutez au minimum un smoke test qui vérifie que l'application démarre :

```bash
#!/bin/bash
# scripts/smoke-test.sh
npm run build && echo "BUILD OK" || exit 1
node -e "require('./dist/index.js'); process.exit(0)" && echo "STARTUP OK" || exit 1
```

Référencez cette commande dans AGENTS.md comme verification minimale.

**Étape 3 : Commencer par des tâches de documentation.**

La première tâche agentique la plus sûre dans un legacy project est la documentation, pas l'implémentation. Demandez à l'agent de lire le codebase et de produire un architecture summary. Cela l'oblige à cartographier le système avant de modifier quoi que ce soit.

**Étape 4 : Élargir le scope progressivement.**

Commencez par un module. Ajoutez des tests pour ce module. Autorisez ensuite l'agent à travailler uniquement sur ce module. Étendez le scope seulement lorsque la verification passe de manière fiable.

---

## Configurer Claude Code pour une équipe {#team-config}

**Temps :** 30 minutes · **Quand :** Déploiement d'un agentic workflow dans une équipe

**Shared AGENTS.md**

Le fichier `AGENTS.md` est un artifact d'équipe. Traitez-le comme `README.md` : reviewez soigneusement ses changements, discutez les évolutions de scope rules en PR.

**Branch strategy**

Recommandation : les agents travaillent sur des feature branches, jamais directement sur `main`.

```markdown
## Branch rules (add to AGENTS.md)
- Always create a branch named feat/[task-id] before starting work
- Never commit directly to main
- Push the branch and open a PR when the task is complete
```

**Feature list ownership**

Désignez un owner pour la feature list. Cette personne est responsable de :

- Écrire des acceptance criteria spécifiques et vérifiables
- Définir des scope boundaries non conflictuelles
- Reviewer les fichiers `session-log.json` après chaque session agentique

**Review cadence**

Organisez une harness review hebdomadaire de 30 minutes :

- Quelles scope violations ont eu lieu ?
- Quels tests ont échoué de manière répétée ?
- Quelles règles d'AGENTS.md étaient ambiguës ?
- Mettez le harness à jour en conséquence.
