# Observability: поведінка, яку можна debug

> Agentic observability включає logs, metrics і traces, а також reasoning behavior: план, рішення, прочитані файли, змінені файли і результат verification. Session-log.json у git створює audit trail.

## Key concepts

- **Scope**: ce poate modifica agentul și ce rămâne out-of-bounds.
- **State**: progresul scris în fișiere, nu presupus în context window.
- **Verification**: checks automate care nu pot fi bypassed.
- **Continuity**: handoff suficient pentru următoarea session.

## Business takeaway

Pentru management, întrebarea nu este dacă modelul poate genera cod. Întrebarea este dacă delivery system-ul face munca agentului auditable, recoverable și aligned cu risk tolerance-ul echipei.

---

*Далі: [Human-in-the-Loop Governance](/uk/lectures/lecture-08-human-in-the-loop/)*
