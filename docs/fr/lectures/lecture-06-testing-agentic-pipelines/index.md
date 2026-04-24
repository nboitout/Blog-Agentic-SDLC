# Testing Agentic Pipelines

> **Les unit tests testent le code. Les harness tests testent le comportement. Vous avez besoin des deux.**

## Le testing gap {#gap}

Les tests unitaires et d'intégration traditionnels vérifient que le code fait ce qu'il doit faire. Ils ne vérifient pas que l'agent a fait ce qu'il était censé faire.

Les agentic pipelines exigent une seconde couche de tests - des **harness tests** - qui vérifient le comportement de l'agent, pas seulement son output.

## Trois niveaux de testing agentique {#levels}

### Level 1 : Output tests (standard)

Le code produit par l'agent fonctionne-t-il correctement ? Les unit tests et integration tests standards couvrent ce niveau. Votre CI pipeline doit les lancer sans condition après chaque session agentique.

### Level 2 : Behavior tests

L'agent a-t-il respecté les contraintes du harness ?

- Est-il resté dans le scope ?
- A-t-il écrit le state file correctement ?
- A-t-il lancé la verification pipeline avant de marquer la tâche complete ?

Ces points se vérifient en inspectant la trace de l'agent et le state file, pas l'output du code.

### Level 3 : Regression tests

L'agent produit-il toujours le bon comportement après une modification du harness - AGENTS.md, format de feature list, structure de prompt ?

Les regression tests du comportement agentique sont difficiles à écrire, mais ce sont aussi les plus précieux à maintenir.

## Red/Green TDD comme Micro-Harness

L'une des façons les plus simples de rendre les coding agents plus fiables est de les placer dans une **red/green TDD loop**.

Le principe est simple :

1. **Écrire ou mettre à jour un test d'abord**
2. **Le lancer et confirmer qu'il échoue**
3. **Demander à l'agent d'implémenter le changement**
4. **Relancer les tests jusqu'à ce qu'ils passent**

Cela compte parce que les coding agents sont bons pour produire du code plausible, mais la plausibilité ne suffit pas. Un test qui échoue crée un signal externe que l'agent ne peut pas facilement bluffer. Un test qui passe crée une définition bornée du succès. En ce sens, le red/green TDD agit comme un **micro-harness** : il donne à l'agent une cible, un oracle et une condition d'arrêt.

Simon Willison recommande ce pattern parce que les modèles comprennent déjà ce raccourci. Dire "use red/green TDD" suffit souvent à déclencher une meilleure execution loop : définir le comportement attendu, prouver que le système actuel ne le satisfait pas, puis itérer jusqu'à ce qu'il le fasse.

Ce pattern est particulièrement utile en agentic engineering car il traite deux failure modes fréquents :

- l'agent écrit du code qui semble raisonnable mais ne fonctionne pas réellement
- l'agent déclare la tâche terminée sans preuve externe solide

Une red/green loop réduit ces deux risques en forçant le travail à passer par un feedback channel déterministe.

Il y a une seconde leçon : **les tests ne servent pas seulement à vérifier, ils servent aussi à orienter**. Les agents inspectent souvent les tests existants pour comprendre comment une feature doit se comporter. Une bonne test suite est donc à la fois un safety net et une partie de la working memory du repository pour les futurs agents.

### Règle pratique

Quand un coding agent va modifier un comportement, ne commencez pas par :

> Implémente cette feature.

Commencez par :

> Ajoute ou mets à jour un test qui capture le comportement attendu. Lance-le, confirme qu'il échoue, puis implémente le changement minimal nécessaire pour le faire passer.

Ce petit changement transforme une tâche de génération ouverte en verification loop contrôlée.

### Key takeaway

**Le red/green TDD n'est pas seulement une méthode de développement. Pour les coding agents, c'est un reliability harness.**

## L'eval mindset {#evals}

Pensez les tests de comportement agentique comme des **evals**, une discipline issue de l'évaluation des LLMs. Une eval contient :

- Un input fixe (description de tâche + contexte)
- Un reference output (comportement attendu, pas code attendu)
- Une scoring function (l'agent a-t-il fait ce qui était demandé ?)

Commencez avec trois à cinq evals par harness. Lancez-les à chaque changement de harness. Traitez les harness regressions avec le même sérieux que les code regressions.

## Lecture recommandée

- [Simon Willison - Red/green TDD](https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/) - Une explication pratique de pourquoi le test-first development est l'un des patterns de fiabilité les plus puissants pour les coding agents.

---

*Suivant : [Observability →](/fr/lectures/lecture-07-observability/)*
