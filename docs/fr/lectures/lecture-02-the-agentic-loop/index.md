# The Agentic Loop : Plan → Code → Verify → Reflect

> **Le sprint n'est pas la bonne unité de travail pour un AI agent. La loop, oui.**

## Des sprints aux loops {#from-sprints}

Un sprint est une construction humaine : un engagement social de deux semaines qui crée de l'urgence artificielle et de la responsabilité partagée. Cela fonctionne parce que les développeurs humains réagissent à la pression sociale.

Un AI agent ne se soucie pas d'une deadline de sprint. Il ne ressent pas de responsabilité envers l'équipe. Ce à quoi il répond, c'est au **feedback** : des signaux immédiats, précis et machine-readable indiquant si sa dernière action a rapproché le système de l'objectif.

L'**Agentic Loop** devient donc la nouvelle unité de travail. Elle s'exécute en secondes ou minutes, pas en semaines, et elle est self-correcting par design.

## Les quatre phases {#phases}

```text
PLAN → CODE → VERIFY → REFLECT
  ↑                         |
  └─────────────────────────┘
```

### Phase 1 : Plan

L'agent lit son contexte - feature list, state file courant, description de tâche - et produit un plan explicite. Ce plan est écrit dans un fichier, pas simplement conservé en mémoire.

**Pourquoi c'est important** : écrire le plan externalise l'intention de l'agent. Elle devient auditable, réversible et disponible pour la session suivante.

### Phase 2 : Code

L'agent exécute le plan en modifiant les fichiers dans un scope défini. Les contraintes de scope sont appliquées par le harness, pas par le jugement interne de l'agent.

**Pourquoi c'est important** : sans scope constraints, les agents overreach. Le harness agit comme une boundary physique.

### Phase 3 : Verify

Le harness lance une verification suite déterministe : unit tests, integration tests, linters, type checks. Les résultats sont réécrits dans le context file.

**Pourquoi c'est important** : la verification doit être automatique et non bypassable. Un agent qui peut éviter la vérification finira par l'éviter sous pression.

### Phase 4 : Reflect

L'agent lit les résultats de verification et met à jour le state file avec ce qui est terminé, ce qui a échoué et la prochaine étape ciblée.

**Pourquoi c'est important** : la reflection préserve la continuité entre sessions. Sans elle, la session suivante redémarre à l'aveugle.

## La loop n'est pas l'agent {#distinction}

Une erreur fréquente consiste à croire que la loop est quelque chose que l'agent conçoit à runtime. Ce n'est pas le cas. **La loop est designée par l'ingénieur avant l'exécution de l'agent.** L'agent opère dans la loop ; il ne la conçoit pas.

Cette distinction est critique. Elle signifie que l'agentic SDLC est d'abord une **discipline d'engineering**, pas une discipline de prompting.

::: warning Erreur fréquente
Demander à l'agent de décider quand lancer les tests, quel scope respecter et comment traiter les échecs revient à lui demander de concevoir sa propre loop. Cela échoue de manière fiable. Concevez la loop d'abord ; laissez l'agent opérer à l'intérieur.
:::

## Granularité des loops {#granularity}

Toutes les loops n'ont pas la même granularité. Un agentic SDLC sain comporte au moins trois loops imbriquées :

| Loop | Timescale | Trigger | Verifier |
|---|---|---|---|
| **Micro loop** | Secondes | Une fonction / un fichier | Unit tests |
| **Feature loop** | Minutes | Une feature | Integration tests |
| **Session loop** | Heures | Une session de travail | Full pipeline + human review |

Le harness design (Cours 04) précise comment instrumenter chacune de ces loops.

---

*Suivant : [Context Engineering →](/fr/lectures/lecture-03-context-engineering/)*
