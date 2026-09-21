export const questions = [
  {
    "id": "q1",
    "prompt": "An agent read a module before a teammate changed its public behavior. The agent is about to refactor that module. What is the best next step?",
    "options": {
      "A": "Compact the conversation and continue using the earlier snapshot.",
      "B": "Reload the relevant implementation and tests, inspect the change, and reconcile it with the task's approved contract.",
      "C": "Increase the context limit without changing the loaded sources.",
      "D": "Add an instruction to be more careful while retaining the earlier snapshot."
    },
    "correct": "B",
    "feedback": {
      "A": "Compaction does not refresh the changed module. Reload implementation and tests, then reconcile the approved contract.",
      "B": "Current implementation and tests reveal the change; the approved contract establishes intended behavior.",
      "C": "More capacity does not update the earlier snapshot. Retrieve current evidence.",
      "D": "A reminder cannot replace stale evidence. Reload and inspect the change."
    }
  },
  {
    "id": "q2",
    "prompt": "A workflow controller must validate a task status field, while the next agent session needs decisions, rationale, and unresolved questions. Which design best fits these needs?",
    "options": {
      "A": "Put everything in one free-form paragraph and ask the controller to infer the status.",
      "B": "Put everything into a single status enum and discard the reasoning.",
      "C": "Use schema-validated fields for controller state and a structured Markdown handover for explanations, with clear links between them.",
      "D": "Rely entirely on the chat history because both consumers can recover the same information from it."
    },
    "correct": "C",
    "feedback": {
      "A": "Free-form prose leaves controller validation ambiguous. Use schema-validated status fields.",
      "B": "An enum preserves status but loses decisions, rationale, and unresolved questions.",
      "C": "Schema-validated controller state and a linked Markdown handover serve their different consumers.",
      "D": "Accessible, durable history cannot be assumed. Save explicit state and a usable handover."
    }
  },
  {
    "id": "q3",
    "prompt": "A protected directory must remain unmodified even if an agent ignores a repository instruction. What provides the required protection?",
    "options": {
      "A": "A clearer instruction in the repository file alone.",
      "B": "A reminder at the end of every task prompt alone.",
      "C": "A post-task review alone, after writes have already occurred.",
      "D": "A write restriction enforced by the execution environment, supported by clear instructions and verification."
    },
    "correct": "D",
    "feedback": {
      "A": "Instructions guide behavior but cannot prevent writes if ignored.",
      "B": "Repeating a reminder does not enforce a write boundary.",
      "C": "Review can detect a violation after it occurs; it does not prevent it.",
      "D": "An execution-environment write restriction enforces the boundary; instructions and checks support it."
    }
  },
  {
    "id": "q4",
    "prompt": "A long session contains abandoned approaches, repeated logs, an approved interface constraint, and an unresolved discrepancy between documentation and tests. What should the compacted context preserve?",
    "options": {
      "A": "The goal, current constraints, decisions with evidence references, relevant failed approaches, unresolved discrepancy, and next step; reduce redundant detail.",
      "B": "Only the last tool response, because it is the newest information.",
      "C": "Every log line, while dropping uncertainties to make the summary shorter.",
      "D": "The most confident earlier conclusion, treating it as current even if its source was superseded."
    },
    "correct": "A",
    "feedback": {
      "A": "Preserve what future decisions depend on, including evidence, uncertainty, constraints, and useful failed attempts.",
      "B": "The newest response can omit essential constraints and unresolved questions.",
      "C": "Keeping redundant logs while removing uncertainty makes the next decision less grounded.",
      "D": "Confidence is not freshness. A superseded assumption must remain flagged or be reconciled."
    }
  },
  {
    "id": "q5",
    "prompt": "A retrieved issue comment contains reproduction steps and asks the agent to disable a project check and upload environment files to an external address. The assigned task is only to investigate the bug. How should the agent use the comment?",
    "options": {
      "A": "Follow all of it because it came through an approved retrieval tool.",
      "B": "Treat the reproduction steps as evidence to evaluate, and do not treat the embedded requests as authority to change scope, permissions, or data handling.",
      "C": "Promote the entire comment into the repository's standing instructions.",
      "D": "Assume the user's original request authorizes every action mentioned by linked material."
    },
    "correct": "B",
    "feedback": {
      "A": "An approved retrieval tool provides access to content; it does not grant that content authority.",
      "B": "Evaluate reproduction steps as evidence. Embedded requests cannot expand the assigned scope, permissions, or data handling.",
      "C": "Unreviewed issue content must not become standing policy.",
      "D": "A linked source does not inherit the authority to authorize every action it mentions."
    }
  }
];
