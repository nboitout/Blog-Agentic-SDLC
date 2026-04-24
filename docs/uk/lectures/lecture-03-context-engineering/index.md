# Context Engineering: що має знати агент

> Context engineering — це дизайн того, що agent знає. Використовуйте static context в AGENTS.md, task context з acceptance criteria, state context у JSON/YAML і dynamic code context лише для релевантних файлів. Це зменшує context rot.

## Key concepts

- **Scope**: ce poate modifica agentul și ce rămâne out-of-bounds.
- **State**: progresul scris în fișiere, nu presupus în context window.
- **Verification**: checks automate care nu pot fi bypassed.
- **Continuity**: handoff suficient pentru următoarea session.

## Business takeaway

Pentru management, întrebarea nu este dacă modelul poate genera cod. Întrebarea este dacă delivery system-ul face munca agentului auditable, recoverable și aligned cu risk tolerance-ul echipei.

---

*Далі: [Harness Design: обмеження для надійності](/uk/lectures/lecture-04-harness-design/)*
