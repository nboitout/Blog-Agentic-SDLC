# Multi-Agent Coordination Patterns

> Один agent обмежений context window і latency. Multi-agent systems розкладають роботу за ролями: orchestrator-worker, peer review і competitive generation. Repository лишається shared source of truth, а harness запобігає file conflicts і state corruption.

## Key concepts

- **Scope**: ce poate modifica agentul și ce rămâne out-of-bounds.
- **State**: progresul scris în fișiere, nu presupus în context window.
- **Verification**: checks automate care nu pot fi bypassed.
- **Continuity**: handoff suficient pentru următoarea session.

## Business takeaway

Pentru management, întrebarea nu este dacă modelul poate genera cod. Întrebarea este dacă delivery system-ul face munca agentului auditable, recoverable și aligned cu risk tolerance-ul echipei.

---

*Далі: [Testing Agentic Pipelines](/uk/lectures/lecture-06-testing-agentic-pipelines/)*
