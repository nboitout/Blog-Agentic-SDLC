# Harness Design: constrângeri pentru fiabilitate

> Un harness este infrastructura care înconjoară agentul: fișiere, scripts, convenții și checks. El răspunde determinist la ce poate face agentul, ce s-a făcut, dacă a funcționat și ce urmează. Minimal harness pack: AGENTS.md, feature_list.json și progress.md.

## Key concepts

- **Scope**: ce poate modifica agentul și ce rămâne out-of-bounds.
- **State**: progresul scris în fișiere, nu presupus în context window.
- **Verification**: checks automate care nu pot fi bypassed.
- **Continuity**: handoff suficient pentru următoarea session.

## Business takeaway

Pentru management, întrebarea nu este dacă modelul poate genera cod. Întrebarea este dacă delivery system-ul face munca agentului auditable, recoverable și aligned cu risk tolerance-ul echipei.

## Două straturi de harness {#two-layers}

Acest curs folosește *harness* pentru ceea ce scrieți în repository. Același cuvânt denumește și produsul agent din jurul modelului, precum Claude Code, Codex, OpenCode sau Pi. Parcursul [Harness Engineering](https://www.agentic-sdlc.it/academy/harness-engineering#lecture) propus în Academy continuă de aici: alegerea produsului, conectarea lui la un model local sau self-hosted și măsurarea rezultatului.

---

*Următorul: [Multi-Agent Coordination Patterns](/ro/lectures/lecture-05-multi-agent-patterns/)*
