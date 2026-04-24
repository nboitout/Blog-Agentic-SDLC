# Observability: debugowalne zachowanie agentów

> Agentic observability obejmuje logs, metrics i traces, ale także reasoning behavior: plan, decyzje, pliki przeczytane, pliki zmienione i wynik verification. Session-log.json commitowany do git daje audit trail.

## Key concepts

- **Scope**: ce poate modifica agentul și ce rămâne out-of-bounds.
- **State**: progresul scris în fișiere, nu presupus în context window.
- **Verification**: checks automate care nu pot fi bypassed.
- **Continuity**: handoff suficient pentru următoarea session.

## Business takeaway

Pentru management, întrebarea nu este dacă modelul poate genera cod. Întrebarea este dacă delivery system-ul face munca agentului auditable, recoverable și aligned cu risk tolerance-ul echipei.

---

*Dalej: [Human-in-the-Loop Governance](/pl/lectures/lecture-08-human-in-the-loop/)*
