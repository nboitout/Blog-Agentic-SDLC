# Testing Agentic Pipelines

> Unit tests перевіряють output коду, але не поведінку agent. Потрібні output tests, behavior tests і harness regression tests. Red/green TDD — це micro-harness: failing test створює oracle, passing test задає stop condition.

## Key concepts

- **Scope**: ce poate modifica agentul și ce rămâne out-of-bounds.
- **State**: progresul scris în fișiere, nu presupus în context window.
- **Verification**: checks automate care nu pot fi bypassed.
- **Continuity**: handoff suficient pentru următoarea session.

## Business takeaway

Pentru management, întrebarea nu este dacă modelul poate genera cod. Întrebarea este dacă delivery system-ul face munca agentului auditable, recoverable și aligned cu risk tolerance-ul echipei.

---

*Далі: [Observability: поведінка, яку можна debug](/uk/lectures/lecture-07-observability/)*
