---
pageClass: interactive-page
aside: false
---

<div class="page-eyebrow-pill">Lecture 03 · Interactive</div>

# Context Engineering — The Conveyor Belt

Every turn replays the full conversation from scratch. Input tokens grow linearly per turn — so **cumulative cost grows quadratically** with conversation length. This widget makes the curve visible and lets you compare standard vs. engineered context.

<ConveyorBelt />

---

## How to read this

**Context buffer (left):** every block represents one exchange added to the conversation history. The system prompt is always at the base.

**Belt packet:** each turn, the entire accumulated context is shipped to the processor. Watch the packet grow wider — more tokens carried each time.

**Processor:** the model that receives the full context. The token count shown is what you pay for as *input* on that turn.

**Cost multiplier:** how much more expensive the current turn is vs. turn 1. By turn 10 at default settings it's already ~2.7×. Cumulative cost at that point is ~5× what a flat-cost model would charge.

**Engineered mode:** enables a compressor between the buffer and the processor. It caps context at the last 3 turns, simulating deliberate context management. The green curve on the chart stays flat regardless of how long the conversation runs.

**Try it:** set tokens/turn to **8,000** (realistic for agentic sessions with tool calls) and watch the window fill by turn 4. Then toggle Engineered mode.

---

## Compacting vs. context engineering

These are related but distinct. The distinction matters because one solves a different problem than the other.

### Compacting — Anthropic's built-in feature

When a Claude conversation approaches the context window limit, Claude automatically summarizes the oldest portion of the conversation into a compact representation, then continues. It is:

- **Reactive** — triggered when the window fills, not on your schedule
- **Coarse** — summarizes whole chunks of old history uniformly
- **Uncontrolled** — you don't choose what gets compressed or how
- **Paid** — the summarization turn itself consumes tokens and costs money

Compacting solves the **window overflow** problem: it keeps the conversation alive past the point where raw history would exceed the context limit.

It does *not* solve the cost shape problem — the parabola you see in the widget.

### Context engineering — proactive, deliberate, surgical

Context engineering is the practice of intentionally shaping what enters the context window *before* it becomes a problem. You decide:

- **What stays verbatim** — recent turns that carry live task state
- **What gets compressed** — earlier turns distilled into a summary
- **What gets dropped entirely** — turns that are no longer causally relevant to the next response
- **What gets reformatted** — a 10-turn debugging thread turned into a 200-token structured state object

The widget's "Engineered mode" is a simplified model of the last approach: it caps context at the last 3 turns instead of growing unboundedly. Real techniques go further:

| Technique | What it does | Token savings |
|---|---|---|
| **Conversation splitting** | Start a new chat — the parabola resets to zero | Full reset |
| **Summarization on demand** | Ask the model to compress history, seed a new chat with the summary | 60–80% |
| **State extraction** | Distill a conversation into a structured object — `{ resolved: [...], current_task: "...", constraints: [...] }` | 90–95% |
| **Selective retention** | Keep only turns causally relevant to the next response | Variable |
| **External memory** | Move facts out of the context window into a retrieval system, inject only what's needed per turn | Near-zero carry cost |

The key difference from compacting:

> **Compacting** = automatic, reactive, coarse (summarize old turns when the window fills)
>
> **Context engineering** = intentional, selective, surgical — controlled by you, on your schedule, at the granularity you choose

---

## Subscription economics: the breakeven math

If your monthly subscription is $20 — how many consecutive turns per day can the AI lab absorb before it starts losing money on your session?

**Revenue per user per day:**

$$\$20 \div 30 = \$0.667\text{/day}$$

**Cumulative input cost formula** (Sonnet 4.6, input at $3/1M tokens):

$$\text{Cost}(N) = \frac{3 \cdot (N \cdot S + P \cdot \frac{N(N+1)}{2})}{10^6}$$

where $S$ = system prompt tokens, $P$ = tokens added per turn (user + assistant), $N$ = number of turns.

Setting cost = $0.667 and solving for N gives the breakeven turn count. The critical unknown is the actual system prompt size. The widget uses 6k tokens — but a real claude.ai system prompt (tool definitions, memory system, formatting rules, search instructions) is much larger. This conversation's system prompt alone is likely 15,000–25,000 tokens.

| System prompt size | Breakeven turns/day | Adjusted for ~50% margin |
|---|---|---|
| 6k tokens (widget default) | ~12 turns | ~18 turns |
| 15k tokens (realistic) | ~9 turns | ~14 turns |
| 25k tokens (heavy tooling) | ~7 turns | ~11 turns |

**Three things this reveals:**

**First — the model only works because most users don't come close to this.** The median user sends 3–5 messages a day. Heavy users are cross-subsidized by light ones. The subscription model is an actuarial bet on usage distribution.

**Second — starting a new chat is free context engineering.** One long session of N turns costs N² worth of input. Two sessions of N/2 turns each costs half as much — the parabola restarts from zero. There is no technical reason to keep a single conversation alive across unrelated tasks.

**Third — the 5-hour rolling window of ~44k tokens is not arbitrary.** It is approximately the rate limit that keeps expected cost per user below subscription revenue, assuming an average mix of light and heavy users. The limit is an actuarial guardrail, not a technical one.

**The uncomfortable implication:** the AI lab's incentive and yours are perfectly aligned — you both want shorter, denser, more structured context. Context engineering is not an optimization trick. It is a direct consequence of how transformer attention works and how subscription economics are structured.

---

*Back to [Lecture 03 — Context Engineering](/en/lectures/lecture-03-context-engineering/)*
