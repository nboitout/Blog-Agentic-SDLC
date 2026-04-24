# Pourquoi le SDLC traditionnel échoue avec les AI agents

> **Le problème n'est pas que les AI agents codent mal. Le problème est qu'on leur demande d'opérer dans des systèmes qui n'ont jamais été conçus pour eux.**

## L'hypothèse qui ne tient plus {#assumption}

Les modèles classiques de SDLC - Agile, Scrum, Kanban, Waterfall - partagent une hypothèse fondatrice : **le développeur est un humain avec une mémoire persistante, du jugement et une responsabilité sociale**.

Cette hypothèse structure tout. Les standups existent parce que les humains perdent du contexte d'un jour à l'autre. Les code reviews existent parce que les humains rationalisent leurs propres erreurs. Le sprint planning existe parce que les humains ont besoin d'un engagement partagé pour se coordonner.

Quand vous introduisez un AI coding agent dans ce système, toutes ces hypothèses commencent à se fissurer.

## Les cinq failure modes {#failure-modes}

Même lorsqu'ils sont très capables, les AI agents cassent les loops SDLC traditionnelles de manière prévisible.

### 1. Context amnesia

Les agents n'ont pas de mémoire persistante entre les sessions. Chaque conversation redémarre à froid. Un développeur humain accumule pendant des mois une connaissance implicite du codebase : naming conventions, décisions d'architecture, règles d'équipe non écrites. Un agent n'a rien de tout cela, sauf si vous l'engineerez explicitement.

### 2. Clôture prématurée des tâches

Les agents ont tendance à déclarer la victoire lorsque la sous-tâche immédiate est terminée, pas lorsque l'objectif métier global est atteint. Ils peuvent fermer un ticket après avoir écrit le code, sans vérifier que les tests passent, que le build réussit ou que la feature fonctionne end-to-end.

### 3. Scope overreach

À l'inverse, les agents refactorent parfois bien au-delà du scope demandé, parce qu'ils ne paient aucun coût social à le faire. Un développeur humain hésite à réécrire un module qu'on ne lui a pas demandé de toucher. Un agent ne ressent pas cette limite.

### 4. Invisible failure

Les agents échouent silencieusement. Un développeur bloqué demande de l'aide, montre des signes de friction ou ne produit rien. Un agent produit souvent du code très convaincant en apparence, mais subtilement faux.

### 5. Entropy accumulation

Sans gouvernance active, les codebases agentiques dérivent. La documentation se désynchronise. Les naming conventions divergent. Le dead code s'accumule. Le repository devient progressivement plus difficile à naviguer pour les prochains agents.

## Pourquoi patcher l'ancien SDLC ne fonctionne pas {#patching}

Le réflexe naturel consiste à ajouter des règles spécifiques aux agents dans le process existant :

- "Ajouter une règle : les agents doivent lancer les tests avant de fermer un ticket"
- "Ajouter une règle : les agents ne doivent pas toucher les fichiers hors scope"

Cette approche échoue parce qu'elle traite le développement agentique comme un cas particulier du développement humain. Ce n'en est pas un. Il faut une architecture différente.

::: tip Insight clé
Un harness ne rend pas l'agent plus intelligent. Il établit un **closed-loop working system** qui rend son comportement prévisible, vérifiable et recoverable.
:::

## Ce qui vient ensuite {#next}

Les cours suivants construisent la fondation d'un SDLC redesigné :

- **Cours 02** introduit l'Agentic Loop, le feedback cycle qui remplace le sprint
- **Cours 03** couvre le context engineering, pour garantir que l'agent dispose du bon contexte au bon moment
- **Cours 04** couvre le harness design, les contraintes structurelles qui gardent les agents sur la bonne trajectoire

---

*Suivant : [The Agentic Loop →](/fr/lectures/lecture-02-the-agentic-loop/)*
