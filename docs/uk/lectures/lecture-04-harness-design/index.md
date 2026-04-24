# Harness Design: обмеження для надійності

> Harness — це інфраструктура навколо agent: files, scripts, conventions і automated checks. Він детерміновано відповідає: що agent може робити, що вже зроблено, чи працює результат і що далі. Minimal harness pack: AGENTS.md, feature_list.json і progress.md.

## Key concepts

- **Scope**: ce poate modifica agentul și ce rămâne out-of-bounds.
- **State**: progresul scris în fișiere, nu presupus în context window.
- **Verification**: checks automate care nu pot fi bypassed.
- **Continuity**: handoff suficient pentru următoarea session.

## Business takeaway

Pentru management, întrebarea nu este dacă modelul poate genera cod. Întrebarea este dacă delivery system-ul face munca agentului auditable, recoverable și aligned cu risk tolerance-ul echipei.

---

*Далі: [Multi-Agent Coordination Patterns](/uk/lectures/lecture-05-multi-agent-patterns/)*
