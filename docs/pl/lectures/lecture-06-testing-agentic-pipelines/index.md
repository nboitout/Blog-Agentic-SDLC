# Testing Agentic Pipelines

> Unit tests sprawdzają output kodu, ale nie to, czy agent respektował harness. Potrzebne są output tests, behavior tests i harness regression tests. Red/green TDD jest micro-harness: failing test tworzy oracle, passing test definiuje stop condition.

## Key concepts

- **Scope**: ce poate modifica agentul și ce rămâne out-of-bounds.
- **State**: progresul scris în fișiere, nu presupus în context window.
- **Verification**: checks automate care nu pot fi bypassed.
- **Continuity**: handoff suficient pentru următoarea session.

## Business takeaway

Pentru management, întrebarea nu este dacă modelul poate genera cod. Întrebarea este dacă delivery system-ul face munca agentului auditable, recoverable și aligned cu risk tolerance-ul echipei.

---

*Dalej: [Observability: debugowalne zachowanie agentów](/pl/lectures/lecture-07-observability/)*
