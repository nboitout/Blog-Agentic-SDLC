---
pageClass: interactive-page
aside: false
---

<div class="page-eyebrow-pill">Cours 03 · Interactif</div>

# Context Engineering — La chaîne de montage

À chaque tour, la conversation entière est renvoyée au modèle depuis le début. Les tokens d'entrée augmentent linéairement à chaque tour — le **coût cumulatif croît donc de façon quadratique** avec la longueur de la conversation. Ce widget rend la courbe visible et permet de comparer le mode standard au mode avec context engineering.

<ConveyorBelt />

---

## Comment lire ce widget

**Context buffer (à gauche) :** chaque bloc représente un échange ajouté à l'historique. Le system prompt est toujours à la base.

**Paquet sur la ceinture :** à chaque tour, l'intégralité du contexte accumulé est envoyée au processeur. Le paquet s'élargit — plus de tokens transportés à chaque fois.

**Processeur :** le modèle qui reçoit le contexte complet. Le nombre de tokens affiché est ce que vous payez en *input* pour ce tour.

**Multiplicateur de coût :** combien le tour courant coûte de plus que le premier. Au tour 10 avec les réglages par défaut, c'est déjà ~2,7×. Le coût cumulatif atteint alors ~5× ce que facturerait un modèle à coût fixe.

**Mode Engineered :** active un compresseur entre le buffer et le processeur, qui limite le contexte aux 3 derniers tours. La courbe verte reste plate quelle que soit la durée de la conversation.

**À tester :** réglez les tokens/tour sur **8 000** (réaliste pour des sessions agentiques avec des appels d'outils) et observez la fenêtre se remplir en 4 tours. Activez ensuite le mode Engineered.

---

## Compacting vs. context engineering

Ces deux concepts sont liés mais distincts. La différence est importante : ils ne résolvent pas le même problème.

### Compacting — la fonctionnalité intégrée d'Anthropic

Quand une conversation Claude approche la limite de la fenêtre de contexte, Claude résume automatiquement la portion la plus ancienne en une représentation compacte, puis continue. Cette fonctionnalité est :

- **Réactive** — déclenchée quand la fenêtre se remplit, pas selon votre agenda
- **Grossière** — résume des blocs entiers d'historique de façon uniforme
- **Non contrôlée** — vous ne choisissez pas ce qui est compressé ni comment
- **Payante** — le tour de résumé consomme lui-même des tokens et coûte de l'argent

Le compacting résout le problème de **débordement de fenêtre** : il maintient la conversation en vie au-delà du point où l'historique brut dépasserait la limite du contexte.

Il ne résout *pas* le problème de forme du coût — la parabole que vous voyez dans le widget.

### Context engineering — proactif, délibéré, chirurgical

Le context engineering est la pratique qui consiste à façonner intentionnellement ce qui entre dans la fenêtre de contexte *avant* que ça ne devienne un problème. Vous décidez :

- **Ce qui reste verbatim** — les tours récents qui portent l'état courant de la tâche
- **Ce qui est compressé** — les tours antérieurs distillés en un résumé
- **Ce qui est supprimé entièrement** — les tours qui ne sont plus causalement pertinents pour la prochaine réponse
- **Ce qui est reformaté** — un fil de débogage de 10 tours transformé en objet d'état structuré de 200 tokens

Le mode « Engineered » du widget est un modèle simplifié de cette dernière approche. Les techniques réelles vont plus loin :

| Technique | Ce qu'elle fait | Économie de tokens |
|---|---|---|
| **Découpage de conversation** | Démarrer un nouveau chat — la parabole repart de zéro | Reset complet |
| **Résumé à la demande** | Demander au modèle de compresser l'historique, amorcer un nouveau chat avec ce résumé | 60–80 % |
| **Extraction d'état** | Distiller une conversation en objet structuré — `{ résolu: [...], tâche_courante: "...", contraintes: [...] }` | 90–95 % |
| **Rétention sélective** | Conserver uniquement les tours causalement pertinents pour la prochaine réponse | Variable |
| **Mémoire externe** | Déplacer les faits hors de la fenêtre vers un système de retrieval, injecter uniquement ce qui est nécessaire | Coût de transport quasi nul |

La différence clé avec le compacting :

> **Compacting** = automatique, réactif, grossier (résumer les anciens tours quand la fenêtre se remplit)
>
> **Context engineering** = intentionnel, sélectif, chirurgical — contrôlé par vous, à votre rythme, à la granularité que vous choisissez

---

## Économie des abonnements : le calcul du seuil de rentabilité

Si votre abonnement mensuel est à 20 $ — combien de tours consécutifs par jour le lab peut-il absorber avant de perdre de l'argent sur votre session ?

**Revenu par utilisateur par jour :**

$$20\ \$ \div 30 = 0{,}667\ \text{\$/jour}$$

**Formule du coût d'entrée cumulatif** (Sonnet 4.6, input à 3 \$/1M tokens) :

$$\text{Coût}(N) = \frac{3 \cdot \left(N \cdot S + P \cdot \frac{N(N+1)}{2}\right)}{10^6}$$

où $S$ = tokens du system prompt, $P$ = tokens ajoutés par tour (utilisateur + assistant), $N$ = nombre de tours.

En posant coût = 0,667 \$ et en résolvant pour N, on obtient le nombre de tours au seuil de rentabilité. La variable critique est la taille réelle du system prompt. Le widget utilise 6 000 tokens — mais le system prompt réel de claude.ai (définitions d'outils, système de mémoire, règles de formatage, instructions de recherche…) est bien plus grand. Le system prompt de cette conversation seule fait probablement entre 15 000 et 25 000 tokens.

| Taille du system prompt | Tours/jour au seuil | Ajusté pour ~50 % de marge |
|---|---|---|
| 6k tokens (défaut du widget) | ~12 tours | ~18 tours |
| 15k tokens (réaliste) | ~9 tours | ~14 tours |
| 25k tokens (outillage lourd) | ~7 tours | ~11 tours |

**Trois enseignements :**

**Premier — le modèle ne fonctionne que parce que la plupart des utilisateurs n'approchent pas de ce seuil.** L'utilisateur médian envoie 3 à 5 messages par jour. Les gros utilisateurs sont subventionnés par les utilisateurs légers. L'abonnement est un pari actuariel sur la distribution d'usage.

**Deuxième — démarrer un nouveau chat, c'est du context engineering gratuit.** Une longue session de N tours coûte ce que vaut N² en tokens d'entrée. Deux sessions de N/2 tours chacune coûtent deux fois moins — la parabole repart de zéro. Il n'y a aucune raison technique de maintenir une seule conversation ouverte pour des tâches sans lien entre elles.

**Troisième — la fenêtre glissante de ~44k tokens sur 5 heures n'est pas arbitraire.** C'est approximativement le rate limit qui maintient le coût attendu par utilisateur en dessous du revenu de l'abonnement, en supposant un mix moyen d'utilisateurs légers et intensifs. Cette limite est un garde-fou actuariel, pas technique.

**L'implication inconfortable :** l'intérêt du lab et le vôtre sont parfaitement alignés — vous voulez tous les deux un contexte plus court, plus dense, mieux structuré. Le context engineering n'est pas une optimisation. C'est une conséquence directe du fonctionnement de l'attention transformer et de la structure économique des abonnements.

---

*Retour au [Cours 03 — Context Engineering](/fr/lectures/lecture-03-context-engineering/)*
