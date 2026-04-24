# Harness Design: constrângeri pentru fiabilitate

> Un harness este infrastructura care înconjoară agentul: fișiere, scripts, convenții și checks. El răspunde determinist la ce poate face agentul, ce s-a făcut, dacă a funcționat și ce urmează. Minimal harness pack: AGENTS.md, feature_list.json și progress.md.

## Key concepts

- **Scope**: ce poate modifica agentul și ce rămâne out-of-bounds.
- **State**: progresul scris în fișiere, nu presupus în context window.
- **Verification**: checks automate care nu pot fi bypassed.
- **Continuity**: handoff suficient pentru următoarea session.

## Business takeaway

Pentru management, întrebarea nu este dacă modelul poate genera cod. Întrebarea este dacă delivery system-ul face munca agentului auditable, recoverable și aligned cu risk tolerance-ul echipei.

---

*Următorul: [Multi-Agent Coordination Patterns](/ro/lectures/lecture-05-multi-agent-patterns/)*
