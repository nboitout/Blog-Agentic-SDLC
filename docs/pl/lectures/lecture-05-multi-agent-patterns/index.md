# Multi-Agent Coordination Patterns

> Pojedynczy agent jest ograniczony przez context window i latency. Multi-agent systems rozbijają pracę na role: orchestrator-worker, peer review i competitive generation. Repository pozostaje shared source of truth, a harness egzekwuje izolację plików i state.

## Key concepts

- **Scope**: ce poate modifica agentul și ce rămâne out-of-bounds.
- **State**: progresul scris în fișiere, nu presupus în context window.
- **Verification**: checks automate care nu pot fi bypassed.
- **Continuity**: handoff suficient pentru următoarea session.

## Business takeaway

Pentru management, întrebarea nu este dacă modelul poate genera cod. Întrebarea este dacă delivery system-ul face munca agentului auditable, recoverable și aligned cu risk tolerance-ul echipei.

---

*Dalej: [Testing Agentic Pipelines](/pl/lectures/lecture-06-testing-agentic-pipelines/)*
