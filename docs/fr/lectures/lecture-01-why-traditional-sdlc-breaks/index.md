# Pourquoi le SDLC traditionnel échoue avec les agents IA

> **Le problème n'est pas que les agents IA codent mal. C'est qu'on leur demande d'opérer dans des systèmes qui n'ont jamais été conçus pour eux.**

## L'hypothèse qui ne tient plus {#hypothese}

Les modèles classiques de SDLC — Agile, Scrum, Kanban, Cycle en V — partagent une hypothèse fondamentale : **le développeur est un être humain avec une mémoire persistante, du jugement, et une responsabilité sociale**.

Cette hypothèse façonne tout. Les standups existent parce que les humains oublient le contexte d'un jour à l'autre. Les revues de code existent parce que les humains rationalisent leurs propres erreurs. La planification de sprint existe parce que les humains ont besoin d'un engagement partagé pour se coordonner.

Quand vous introduisez un agent IA dans ce système, toutes ces hypothèses commencent à se fissurer.

## Les cinq modes d'échec {#modes-echec}

Les agents IA, même très capables, brisent les boucles SDLC traditionnelles de manière prévisible :

### 1. Amnésie contextuelle
Les agents n'ont pas de mémoire persistante entre les sessions. Chaque conversation repart de zéro. Un développeur humain accumule une connaissance implicite d'une base de code sur des mois. Un agent n'en a aucune, sauf si vous l'engineérez explicitement.

### 2. Clôture prématurée des tâches
Les agents ont tendance à déclarer victoire quand la sous-tâche immédiate est terminée, pas quand l'objectif global est atteint. Ils fermeront un ticket après avoir écrit le code, sans vérifier que les tests passent ou que la fonctionnalité fonctionne de bout en bout.

### 3. Dépassement de périmètre
À l'inverse, les agents refactorisent parfois bien au-delà du périmètre de la tâche — parce qu'ils n'ont aucun coût social à le faire. Un développeur humain hésite à réécrire un module qu'on ne lui a pas demandé de toucher. Un agent, non.

### 4. Échec invisible
Les agents échouent silencieusement. Un développeur humain bloqué demandera de l'aide ou produira rien. Un agent produira un code d'apparence confiante mais subtilement incorrect.

### 5. Accumulation d'entropie
Sans gouvernance active, les bases de code agentiques dérivent. La documentation se désynchronise. Les conventions de nommage divergent. Le code mort s'accumule.

## Pourquoi corriger l'ancien SDLC ne fonctionne pas {#correction}

La réponse instinctive est d'ajouter des règles spécifiques aux agents dans le processus existant. Cette approche échoue parce qu'elle traite le développement agentique comme un cas particulier du développement humain. Ce n'est pas le cas — il exige une architecture fondamentalement différente.

::: tip Insight clé
Un harnais ne rend pas l'agent plus intelligent. Il établit un **système de travail en boucle fermée** qui rend le comportement de l'agent prévisible, vérifiable et récupérable.
:::

---

*Suivant : [La boucle agentique →](/fr/lectures/lecture-02-the-agentic-loop/)*
