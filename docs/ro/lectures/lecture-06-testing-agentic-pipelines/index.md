# Testing Agentic Pipelines

> Unit tests verifică output-ul codului, dar nu verifică dacă agentul a respectat harness-ul. Aveți nevoie de output tests, behavior tests și regression tests pentru harness. Red/green TDD este un micro-harness: testul eșuat creează un oracle extern, iar testul verde definește condiția de oprire.

## Key concepts

- **Scope**: ce poate modifica agentul și ce rămâne out-of-bounds.
- **State**: progresul scris în fișiere, nu presupus în context window.
- **Verification**: checks automate care nu pot fi bypassed.
- **Continuity**: handoff suficient pentru următoarea session.

## Business takeaway

Pentru management, întrebarea nu este dacă modelul poate genera cod. Întrebarea este dacă delivery system-ul face munca agentului auditable, recoverable și aligned cu risk tolerance-ul echipei.

---

*Următorul: [Observability: comportament debuggable](/ro/lectures/lecture-07-observability/)*
