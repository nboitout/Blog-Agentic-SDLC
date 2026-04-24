# Observability: comportament debuggable

> Pentru sisteme agentice, observability include logs, metrics și traces, dar și reasoning behavior: ce a planificat agentul, ce fișiere a citit, ce a modificat și de ce a schimbat direcția. Un session-log.json comitat în git oferă audit trail.

## Key concepts

- **Scope**: ce poate modifica agentul și ce rămâne out-of-bounds.
- **State**: progresul scris în fișiere, nu presupus în context window.
- **Verification**: checks automate care nu pot fi bypassed.
- **Continuity**: handoff suficient pentru următoarea session.

## Business takeaway

Pentru management, întrebarea nu este dacă modelul poate genera cod. Întrebarea este dacă delivery system-ul face munca agentului auditable, recoverable și aligned cu risk tolerance-ul echipei.

---

*Următorul: [Human-in-the-Loop Governance](/ro/lectures/lecture-08-human-in-the-loop/)*
