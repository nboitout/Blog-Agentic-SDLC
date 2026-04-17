# La boucle agentique : Plan → Code → Vérification → Réflexion

> **Le sprint est la mauvaise unité de travail pour un agent IA. La boucle est la bonne.**

## Du sprint à la boucle {#du-sprint}

Un sprint est une construction humaine — un engagement social de deux semaines qui crée une urgence artificielle et une responsabilité partagée. Cela fonctionne parce que les développeurs humains répondent à la pression sociale.

Un agent IA ne se soucie pas des deadlines de sprint. Ce à quoi il répond, c'est le **feedback** — des signaux immédiats, précis et lisibles par machine indiquant si sa dernière action a rapproché le système de l'objectif.

La **boucle agentique** est l'unité de travail de remplacement. Elle s'exécute en secondes ou en minutes, pas en semaines, et elle est auto-correctrice par conception.

## Les quatre phases {#phases}

```
┌─────────────────────────────────────────┐
│                                         │
│  PLAN  →  CODE  →  VÉRIFIE  →  RÉFLÉCHIT│
│    ↑                            │       │
│    └────────────────────────────┘       │
│                                         │
└─────────────────────────────────────────┘
```

### Phase 1 : Planifier
L'agent lit son contexte et produit un plan explicite. Le plan est écrit dans un fichier, pas maintenu en mémoire.

### Phase 2 : Coder
L'agent exécute le plan, modifiant les fichiers dans un périmètre défini. Les contraintes de périmètre sont appliquées par le harnais — pas par le jugement de l'agent.

### Phase 3 : Vérifier
Le harnais exécute une suite de vérification déterministe : tests unitaires, tests d'intégration, linters, vérifications de types. Les résultats sont écrits dans le fichier de contexte.

### Phase 4 : Réfléchir
L'agent lit les résultats de vérification et met à jour le fichier d'état avec ce qui a été complété, ce qui a échoué, et quelle devrait être l'étape suivante.

## La boucle n'est pas l'agent {#distinction}

La boucle est conçue par l'ingénieur **avant** que l'agent s'exécute. L'agent opère à l'intérieur de la boucle — il ne la conçoit pas.

Cette distinction est critique. Elle signifie que le SDLC agentique est avant tout une **discipline d'ingénierie**, pas une discipline de prompting.

---

*Suivant : [Ingénierie du contexte →](/fr/lectures/lecture-03-context-engineering/)*
