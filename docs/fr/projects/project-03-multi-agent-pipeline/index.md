# Projet 03 · Multi-Agent Pipeline

**Difficulté :** Avancé · **Durée :** ~4 heures · **Prérequis :** Cours 01-05, Projets 01-02

## Objectif {#objective}

Implémenter un pattern orchestrator-worker multi-agent pour une feature couvrant frontend, backend et tests. Observez les coordination failures en conditions réelles et appliquez les shared-state patterns du cours 05.

## Le scénario {#scenario}

Vous allez construire un **real-time dashboard widget** qui affiche un compteur live d'utilisateurs actifs. La feature couvre trois couches :

- **Backend** : un endpoint WebSocket qui émet les mises à jour de user count
- **Frontend** : un composant React qui se connecte au WebSocket et affiche le count
- **Tests** : des integration tests qui vérifient le flow WebSocket → UI complet

Dans une session single-agent traditionnelle, cette tâche est propice aux interface mismatches : le backend et le frontend évoluent indépendamment et divergent.

## Étape 1 : Définir l'interface contract d'abord {#contract}

Avant qu'un agent écrive du code, définissez l'interface contract dans `src/ws/contract.ts` :

```typescript
// This file is the shared contract - no agent may modify it without orchestrator approval
export interface UserCountMessage {
  type: 'user_count'
  count: number
  timestamp: string
}

export const WS_ENDPOINT = '/ws/user-count'
```

Ajoutez à `AGENTS.md` :

```markdown
## Multi-agent rules
- The file src/ws/contract.ts is the interface contract
- No agent may modify contract.ts without writing a review request to reviews/
- Backend agent scope: src/ws/, src/server/
- Frontend agent scope: src/ui/, src/hooks/
- Test agent scope: tests/
```

## Étape 2 : Lancer l'orchestrator {#orchestrator}

Prompt de session pour l'orchestrator agent :

```text
Read AGENTS.md, feature_list.json, and src/ws/contract.ts.
Produce agent-plan.json with:
- Exact tasks for the backend agent
- Exact tasks for the frontend agent
- Exact tasks for the test agent
- The order in which they should run
- The verification command each must run before finishing
Do not write any application code. Only produce agent-plan.json.
```

Reviewez `agent-plan.json` avant de continuer.

## Étape 3 : Lancer backend et frontend agents séquentiellement {#workers}

Lancez d'abord le backend agent :

```text
Read AGENTS.md and agent-plan.json.
Implement the backend tasks assigned to the backend agent.
Respect scope: only touch src/ws/ and src/server/.
Run npm test -- --testPathPattern=ws before finishing.
Write your session summary to agent-ws.log.
```

Puis le frontend agent :

```text
Read AGENTS.md, agent-plan.json, and agent-ws.log.
Implement the frontend tasks assigned to the frontend agent.
Respect scope: only touch src/ui/ and src/hooks/.
Run npm test -- --testPathPattern=ui before finishing.
Write your session summary to agent-ui.log.
```

## Étape 4 : Lancer le test agent {#test-agent}

```text
Read AGENTS.md, agent-ws.log, and agent-ui.log.
Write integration tests in tests/ that cover the full WebSocket → UI flow.
Run npm test to verify all tests pass.
Update progress.md with the final status.
```

## Étape 5 : Observer et documenter les échecs {#observe}

Ce projet est conçu pour faire émerger de vrais coordination failures. Documentez ce que vous voyez :

| Failure type | Est-ce arrivé ? | Comment l'avez-vous corrigé ? |
|---|---|---|
| Interface mismatch | | |
| Out-of-scope edit | | |
| Test agent missing context | | |
| State file conflict | | |
| Verification skipped | | |

## Reflection {#reflection}

Après le projet, écrivez un court `retrospective.md` :

1. À quel moment l'orchestrator a-t-il eu le plus de valeur ?
2. Qu'est-ce qui aurait cassé sans le shared contract file ?
3. Comment amélioreriez-vous `AGENTS.md` pour la prochaine session multi-agent ?
