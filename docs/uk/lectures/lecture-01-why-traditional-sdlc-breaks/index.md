# Чому традиційний SDLC ламається з AI agents

> Класичні моделі SDLC припускають людину з постійною пам’яттю, судженням і соціальною відповідальністю. AI agents працюють інакше: мають context amnesia, передчасно закривають tasks, роблять scope overreach, створюють invisible failures і накопичують entropy. Рішення — не довший prompt, а closed-loop working system зі scope, state, verification і recovery.

## Key concepts

- **Scope**: ce poate modifica agentul și ce rămâne out-of-bounds.
- **State**: progresul scris în fișiere, nu presupus în context window.
- **Verification**: checks automate care nu pot fi bypassed.
- **Continuity**: handoff suficient pentru următoarea session.

## Business takeaway

Pentru management, întrebarea nu este dacă modelul poate genera cod. Întrebarea este dacă delivery system-ul face munca agentului auditable, recoverable și aligned cu risk tolerance-ul echipei.

---

*Далі: [The Agentic Loop: Plan → Code → Verify → Reflect](/uk/lectures/lecture-02-the-agentic-loop/)*
