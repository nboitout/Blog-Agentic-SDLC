# Context Engineering: ce trebuie să știe agentul

> Context engineering înseamnă să arhitectați ce știe agentul. Folosiți static context în AGENTS.md, task context cu acceptance criteria, state context în fișiere structurate și dynamic code context încărcat doar când este relevant. Preveniți context rot prin state atomic, JSON/YAML și review la fiecare schimbare de AGENTS.md.

## Key concepts

- **Scope**: ce poate modifica agentul și ce rămâne out-of-bounds.
- **State**: progresul scris în fișiere, nu presupus în context window.
- **Verification**: checks automate care nu pot fi bypassed.
- **Continuity**: handoff suficient pentru următoarea session.

## Business takeaway

Pentru management, întrebarea nu este dacă modelul poate genera cod. Întrebarea este dacă delivery system-ul face munca agentului auditable, recoverable și aligned cu risk tolerance-ul echipei.

---

*Următorul: [Harness Design: constrângeri pentru fiabilitate](/ro/lectures/lecture-04-harness-design/)*
