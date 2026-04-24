# Multi-Agent Coordination Patterns

> Un singur agent este limitat de context window și latency. Multi-agent systems împart munca între roluri specializate: orchestrator-worker, peer review și competitive generation. Repository-ul rămâne shared source of truth, iar harness-ul previne conflictele de fișiere și state corruption.

## Key concepts

- **Scope**: ce poate modifica agentul și ce rămâne out-of-bounds.
- **State**: progresul scris în fișiere, nu presupus în context window.
- **Verification**: checks automate care nu pot fi bypassed.
- **Continuity**: handoff suficient pentru următoarea session.

## Business takeaway

Pentru management, întrebarea nu este dacă modelul poate genera cod. Întrebarea este dacă delivery system-ul face munca agentului auditable, recoverable și aligned cu risk tolerance-ul echipei.

---

*Următorul: [Testing Agentic Pipelines](/ro/lectures/lecture-06-testing-agentic-pipelines/)*
