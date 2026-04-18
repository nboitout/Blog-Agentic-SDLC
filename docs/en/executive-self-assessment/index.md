<script setup>
import { computed, reactive } from 'vue'

const questions = [
  {
    id: 'q1',
    text: 'How is AI used by your software teams today?',
    options: [
      { key: 'A', points: 1, label: 'Mostly personal experimentation' },
      { key: 'B', points: 2, label: 'Used by some engineers to move faster individually' },
      { key: 'C', points: 3, label: 'Used in recurring team workflows' },
      { key: 'D', points: 4, label: 'Embedded in delivery processes with clear operating rules' },
    ],
  },
  {
    id: 'q2',
    text: 'When an AI tool generates code, what usually happens next?',
    options: [
      { key: 'A', points: 1, label: 'A developer manually reviews and edits everything ad hoc' },
      { key: 'B', points: 2, label: 'The code is useful, but validation is mostly manual' },
      { key: 'C', points: 3, label: 'Standard checks are usually run before integration' },
      { key: 'D', points: 4, label: 'Code enters a governed loop with explicit verification and escalation rules' },
    ],
  },
  {
    id: 'q3',
    text: 'Which statement best describes your delivery model?',
    options: [
      { key: 'A', points: 1, label: 'AI helps individuals, but the SDLC is unchanged' },
      { key: 'B', points: 2, label: 'Some teams are adapting their workflow informally' },
      { key: 'C', points: 3, label: 'We are redesigning parts of delivery around agent workflows' },
      { key: 'D', points: 4, label: 'We are intentionally evolving toward an agentic operating model' },
    ],
  },
  {
    id: 'q4',
    text: 'How comfortable would your organization be with an agent opening a pull request overnight?',
    options: [
      { key: 'A', points: 1, label: 'Not comfortable at all' },
      { key: 'B', points: 2, label: 'Only as an experiment' },
      { key: 'C', points: 3, label: 'Comfortable in some bounded cases' },
      { key: 'D', points: 4, label: 'Already normal in selected workflows' },
    ],
  },
  {
    id: 'q5',
    text: 'What best describes your testing and verification posture?',
    options: [
      { key: 'A', points: 1, label: 'Testing is uneven and often manual' },
      { key: 'B', points: 2, label: 'We have automation, but it is not consistently trusted' },
      { key: 'C', points: 3, label: 'Most important paths have reliable automated checks' },
      { key: 'D', points: 4, label: 'Verification is strong enough to support governed agent autonomy' },
    ],
  },
  {
    id: 'q6',
    text: 'When AI produces the wrong thing, what is the usual response?',
    options: [
      { key: 'A', points: 1, label: 'People lose trust and revert to manual work' },
      { key: 'B', points: 2, label: 'The output is corrected case by case' },
      { key: 'C', points: 3, label: 'We refine prompts and working practices' },
      { key: 'D', points: 4, label: 'We improve the harness: scope, context, checks, state, and recovery rules' },
    ],
  },
  {
    id: 'q7',
    text: 'Who owns the design of human + AI workflows in engineering?',
    options: [
      { key: 'A', points: 1, label: 'No one explicitly' },
      { key: 'B', points: 2, label: 'Individual engineers or enthusiasts' },
      { key: 'C', points: 3, label: 'Some engineering leaders or pilot teams' },
      { key: 'D', points: 4, label: 'It is treated as an operating-model responsibility' },
    ],
  },
  {
    id: 'q8',
    text: 'Which statement best reflects your current governance model?',
    options: [
      { key: 'A', points: 1, label: 'No clear rules; people use tools as they want' },
      { key: 'B', points: 2, label: 'Some informal good practices exist' },
      { key: 'C', points: 3, label: 'There are defined guardrails for some workflows' },
      { key: 'D', points: 4, label: 'Autonomy levels, checkpoints, and review protocols are explicit' },
    ],
  },
  {
    id: 'q9',
    text: 'How do you think about value from AI in software delivery?',
    options: [
      { key: 'A', points: 1, label: 'Better individual productivity' },
      { key: 'B', points: 2, label: 'Faster coding and documentation' },
      { key: 'C', points: 3, label: 'Better team throughput and quality' },
      { key: 'D', points: 4, label: 'A redesigned system of delivery with new economics and roles' },
    ],
  },
  {
    id: 'q10',
    text: 'Over the next 12 months, what is your real ambition?',
    options: [
      { key: 'A', points: 1, label: 'Let teams explore safely' },
      { key: 'B', points: 2, label: 'Standardize a few useful tools' },
      { key: 'C', points: 3, label: 'Scale proven practices across multiple teams' },
      { key: 'D', points: 4, label: 'Build a measurable, governed, agentic software delivery capability' },
    ],
  },
]

const answers = reactive({})

const totalScore = computed(() => questions.reduce((sum, question) => {
  const selectedKey = answers[question.id]
  if (!selectedKey) return sum
  const selected = question.options.find((option) => option.key === selectedKey)
  return sum + (selected?.points ?? 0)
}, 0))

const selectedOption = (question) => question.options.find((option) => option.key === answers[question.id])
</script>

# How agentic is your software delivery model?

**A 3-minute executive self-assessment**

This short self-assessment is designed for executives and engineering leaders who want a fast, structured view of their organization’s current maturity in AI-native software delivery. It is not a technical quiz. It is a practical snapshot of how AI is actually used in your delivery model today.

**Tip:** Don’t answer based on your AI ambitions. Answer based on how your organization actually works today.

## 10 questions

<div v-for="(question, index) in questions" :key="question.id" style="margin: 1.25rem 0; padding: 1rem; border: 1px solid var(--vp-c-divider); border-radius: 10px;">
  <p style="margin: 0 0 0.75rem 0;"><strong>{{ index + 1 }}. {{ question.text }}</strong></p>
  <label v-for="option in question.options" :key="option.key" style="display: block; margin: 0.35rem 0; cursor: pointer;">
    <input
      :name="question.id"
      type="radio"
      :value="option.key"
      v-model="answers[question.id]"
      style="margin-right: 0.5rem;"
    >
    <strong>{{ option.key }}.</strong> {{ option.label }} <span style="opacity: 0.75;">({{ option.points }} pt)</span>
  </label>
  <p v-if="selectedOption(question)" style="margin: 0.65rem 0 0 0; font-size: 0.92rem; color: var(--vp-c-text-2);">
    Selected: <strong>{{ selectedOption(question).key }}</strong> — {{ selectedOption(question).points }} point<span v-if="selectedOption(question).points > 1">s</span>
  </p>
</div>

## How to score yourself

- **A = 1 point**
- **B = 2 points**
- **C = 3 points**
- **D = 4 points**

Add your points across all 10 questions and total your score out of 40.

> **Current score:** **{{ totalScore }}/40**

## Your maturity profile

### 10–16 — Tooling Curious

AI is present, but mostly as an individual productivity aid. The delivery system itself has not changed yet.

**Typical pattern**

- experimentation is real
- practices are uneven
- trust is low
- value is local, not systemic

**Next move**  
Focus on one bounded workflow with strong verification.

### 17–24 — Local Acceleration

Teams are getting value from AI, but mostly in fragmented ways. You are faster in places, but the operating model is still catching up.

**Typical pattern**

- several teams use AI regularly
- adoption is practical, but informal
- governance is inconsistent
- bottlenecks move rather than disappear

**Next move**  
Shift from tool adoption to workflow design.

### 25–32 — Managed Agentic Delivery

AI is starting to participate in structured delivery workflows, with meaningful human oversight and stronger verification.

**Typical pattern**

- bounded agent workflows exist
- teams trust automation more
- review and escalation patterns are emerging
- parts of the SDLC are being redesigned

**Next move**  
Industrialize the model: autonomy levels, harness patterns, shared metrics.

### 33–40 — AI-Native Delivery System

You are no longer treating AI as a side tool. You are actively redesigning software delivery around governed human-agent collaboration.

**Typical pattern**

- AI participates in recurring workflows
- validation is strong
- governance is intentional
- the operating model is becoming genuinely agentic

**Next move**  
Focus on scale, consistency, and economics.

## Want the deeper version?

This quick self-assessment is only a snapshot. The full Agentic SDLC diagnostic goes deeper into engineering workflows, governance, quality systems, and organizational readiness.

If useful, start here with your leadership team, then compare answers before moving to the full diagnostic.
