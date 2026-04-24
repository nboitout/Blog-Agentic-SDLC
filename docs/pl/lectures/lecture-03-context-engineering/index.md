# Context Engineering: co agent musi wiedzieć

> Context engineering oznacza projektowanie tego, co agent wie. Używaj static context w AGENTS.md, task context z acceptance criteria, state context w strukturach JSON/YAML i dynamic code context tylko dla istotnych plików. Tak ograniczasz context rot.

## Key concepts

- **Scope**: ce poate modifica agentul și ce rămâne out-of-bounds.
- **State**: progresul scris în fișiere, nu presupus în context window.
- **Verification**: checks automate care nu pot fi bypassed.
- **Continuity**: handoff suficient pentru următoarea session.

## Business takeaway

Pentru management, întrebarea nu este dacă modelul poate genera cod. Întrebarea este dacă delivery system-ul face munca agentului auditable, recoverable și aligned cu risk tolerance-ul echipei.

---

*Dalej: [Harness Design: ograniczenia dla niezawodności](/pl/lectures/lecture-04-harness-design/)*
