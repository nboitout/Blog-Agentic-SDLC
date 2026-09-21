export const assessmentVersion = "2.0";
export const questions = [
  {
    "id": "q1_adoption",
    "number": 1,
    "text": "How widely is AI used in day-to-day engineering work?",
    "dimension": "Adoption and capability",
    "options": [
      {
        "id": "A",
        "text": "AI is not used in normal engineering work within this scope."
      },
      {
        "id": "B",
        "text": "AI use is occasional, or regular use is limited to isolated individuals."
      },
      {
        "id": "C",
        "text": "AI is used routinely within some teams or parts of this scope, but is not yet the usual practice across it."
      },
      {
        "id": "D",
        "text": "AI is a routine part of delivery work for most engineers across this scope."
      },
      {
        "id": "U",
        "text": "I don't know / I cannot verify this for the selected scope."
      }
    ],
    "helper": "Consider a typical working week, rather than license ownership or a demonstration. For a single team, assess how broadly the practice is shared within that team.",
    "recommendation": "Identify where regular use is concentrated and help the next group of engineers adopt one proven workflow. Track recurring use rather than license allocation.",
    "owner": "Engineering managers and engineers doing the work"
  },
  {
    "id": "q2_delegation",
    "number": 2,
    "text": "What do engineers actually delegate to AI?",
    "dimension": "Delegation and workflow",
    "options": [
      {
        "id": "A",
        "text": "We do not use AI, or use it mainly for explanations and suggestions while engineers perform the work."
      },
      {
        "id": "B",
        "text": "AI produces individual edits, tests, or drafts; engineers coordinate and carry out the remaining steps."
      },
      {
        "id": "C",
        "text": "AI completes bounded tasks and checks its work, with engineers intervening when it needs guidance."
      },
      {
        "id": "D",
        "text": "AI routinely plans and executes multiple steps, checks results, investigates failures, and iterates within agreed boundaries before presenting work for review."
      },
      {
        "id": "U",
        "text": "I don't know / I cannot verify this for the selected scope."
      }
    ],
    "helper": "Examples include implementing a small change, investigating a defect, or preparing a tested refactor. Completing a task does not mean merging or deploying without human approval.",
    "recommendation": "Select a bounded task that AI can execute through several steps. Define the expected result and checks, then review the completed work and where intervention was needed.",
    "owner": "Engineers using the workflows and repository maintainers"
  },
  {
    "id": "q3_workflow",
    "number": 3,
    "text": "When a suitable delivery task starts, what is the usual working pattern?",
    "dimension": "Delegation and workflow",
    "options": [
      {
        "id": "A",
        "text": "Engineers start and carry out the task manually; AI is rarely considered."
      },
      {
        "id": "B",
        "text": "Engineers start manually and ask AI for help along the way."
      },
      {
        "id": "C",
        "text": "Engineers consider delegation to AI upfront for selected types of task, with repeatable ways to supervise and review the work."
      },
      {
        "id": "D",
        "text": "Across this scope, the normal approach for suitable tasks is to define the objective and acceptance criteria, provide context, delegate execution, and review the result."
      },
      {
        "id": "U",
        "text": "I don't know / I cannot verify this for the selected scope."
      }
    ],
    "helper": "“Suitable” means appropriate to the task's risk, available tools, and permitted access. Engineers still use their judgment about when to work manually.",
    "recommendation": "For one suitable task type, make defining the objective, context, and acceptance criteria the starting point for delegation. Review what changes in the engineers' daily work.",
    "owner": "Engineers using the workflows and repository maintainers"
  },
  {
    "id": "q4_context",
    "number": 4,
    "text": "How is the context needed by AI maintained and made available?",
    "dimension": "Delegation and workflow",
    "options": [
      {
        "id": "A",
        "text": "There is no established way to provide relevant project context; it is absent or assembled from scratch."
      },
      {
        "id": "B",
        "text": "Individuals copy useful instructions, files, or snippets into their own sessions."
      },
      {
        "id": "C",
        "text": "Teams maintain reusable project instructions, build and test commands, and relevant documentation that AI can access within defined boundaries."
      },
      {
        "id": "D",
        "text": "This context is versioned, maintained by identified owners, and connected to repeatable workflows; outdated or missing context is corrected as part of delivery work."
      },
      {
        "id": "U",
        "text": "I don't know / I cannot verify this for the selected scope."
      }
    ],
    "helper": "Context includes requirements, repository conventions, architecture constraints, and reliable instructions for building and checking the software.",
    "recommendation": "Maintain project instructions, constraints, and build and test commands alongside the code. Assign someone to keep that context accurate.",
    "owner": "Engineers using the workflows and repository maintainers"
  },
  {
    "id": "q5_verification",
    "number": 5,
    "text": "What evidence is required before AI-produced changes are accepted?",
    "dimension": "Reliability and control",
    "options": [
      {
        "id": "A",
        "text": "Acceptance depends mainly on ad hoc inspection, with little repeatable verification."
      },
      {
        "id": "B",
        "text": "Some automated checks run, but important gaps or unreliable results often require case-by-case judgment."
      },
      {
        "id": "C",
        "text": "Changes are assessed against explicit acceptance criteria, reliable automated checks appropriate to the task, and human review before integration."
      },
      {
        "id": "D",
        "text": "Verification also targets failure modes that ordinary checks can miss, uses evidence beyond the generating agent's own assessment, and blocks acceptance when required checks fail."
      },
      {
        "id": "U",
        "text": "I don't know / I cannot verify this for the selected scope."
      }
    ],
    "helper": "Depending on the change, this can include integration, security, performance, regression, or replay checks. A convincing explanation from the generating agent is not sufficient evidence by itself.",
    "recommendation": "Establish reliable checks and clear acceptance criteria for a recurring task. Include evidence that can reveal mistakes the generating agent might miss.",
    "owner": "Engineers responsible for quality, tests, and delivery workflows"
  },
  {
    "id": "q6_learning",
    "number": 6,
    "text": "What changes after an AI workflow produces a poor result?",
    "dimension": "Reliability and control",
    "options": [
      {
        "id": "A",
        "text": "The immediate output is corrected or discarded, with no repeatable follow-up."
      },
      {
        "id": "B",
        "text": "Individuals adjust their prompts or working habits, but the lesson usually stays local."
      },
      {
        "id": "C",
        "text": "Teams update shared instructions, context, or checks so the same lesson benefits later tasks."
      },
      {
        "id": "D",
        "text": "Teams examine recurring failures, improve task boundaries and recovery steps, and check that the changes reduce recurrence across relevant workflows."
      },
      {
        "id": "U",
        "text": "I don't know / I cannot verify this for the selected scope."
      }
    ],
    "helper": "Assess your established response to failures. If no failure occurred in the last 30 days, use a documented example that still reflects current practice; do not assume the strongest answer because nothing went wrong.",
    "recommendation": "Turn a recent failure into an improvement to shared instructions, checks, or recovery steps. Verify that the change helps on the next relevant task.",
    "owner": "Engineers responsible for quality, tests, and delivery workflows"
  },
  {
    "id": "q7_ownership",
    "number": 7,
    "text": "Who is accountable for improving human–AI delivery workflows?",
    "dimension": "Adoption and capability",
    "options": [
      {
        "id": "A",
        "text": "No one is explicitly accountable."
      },
      {
        "id": "B",
        "text": "Interested engineers improve their own practices when time permits."
      },
      {
        "id": "C",
        "text": "A named engineering leader or team owner has allocated time to improve shared workflows and reviews progress."
      },
      {
        "id": "D",
        "text": "Ownership is part of normal engineering management, with sustained time, access to suitable tools, and accountability for adoption, quality, and results."
      },
      {
        "id": "U",
        "text": "I don't know / I cannot verify this for the selected scope."
      }
    ],
    "helper": "This can be an existing leader or team responsibility. Assess whether ownership works in practice, not whether a formal committee exists.",
    "recommendation": "Name the owner of one shared human–AI workflow and allocate time to improve it. Review adoption, quality, and delivery results as part of engineering management.",
    "owner": "The engineering leader accountable for the assessed scope"
  },
  {
    "id": "q8_controls",
    "number": 8,
    "text": "How clearly are the agent's permissions and human approval points defined?",
    "dimension": "Reliability and control",
    "options": [
      {
        "id": "A",
        "text": "Permissions, approval points, and responsibility for agent actions are unclear."
      },
      {
        "id": "B",
        "text": "Individuals apply their own precautions, with few shared rules."
      },
      {
        "id": "C",
        "text": "Recurring workflows have defined access boundaries, human approval points, and a clear way to stop or recover from unwanted actions."
      },
      {
        "id": "D",
        "text": "These controls are applied consistently, adjusted to task risk, and checked in practice; actions can be traced and exceptions have an accountable owner."
      },
      {
        "id": "U",
        "text": "I don't know / I cannot verify this for the selected scope."
      }
    ],
    "helper": "Consider source code, credentials, external services, merge rights, and deployment rights where relevant. Greater autonomy is appropriate only when the task and controls support it.",
    "recommendation": "Define the workflow's access permissions, human approval points, and stop or recovery steps. Check that these controls work in practice.",
    "owner": "Engineering/platform owners and security colleagues where relevant"
  },
  {
    "id": "q9_capability",
    "number": 9,
    "text": "How do engineers learn and share effective AI working practices?",
    "dimension": "Adoption and capability",
    "options": [
      {
        "id": "A",
        "text": "There is no organized support; engineers are left to figure it out themselves."
      },
      {
        "id": "B",
        "text": "Some engineers share tips or attend occasional demonstrations, but practices remain largely individual."
      },
      {
        "id": "C",
        "text": "Engineers have practical coaching, reusable examples, and shared guidance for common delivery tasks."
      },
      {
        "id": "D",
        "text": "Hands-on learning and review of working practices are recurring activities; proven approaches are maintained, reused, and included in onboarding."
      },
      {
        "id": "U",
        "text": "I don't know / I cannot verify this for the selected scope."
      }
    ],
    "helper": "Practical learning includes defining tasks, supplying context, supervising agents, evaluating results, and knowing when to intervene.",
    "recommendation": "Run a practical session on a real engineering task and maintain the resulting example for reuse. Build coaching and review of working practices into normal team learning.",
    "owner": "Engineering managers and people responsible for coaching or onboarding"
  },
  {
    "id": "q10_impact",
    "number": 10,
    "text": "What can you demonstrate about the value of AI in delivery?",
    "dimension": "Business impact",
    "options": [
      {
        "id": "A",
        "text": "We do not have evidence of delivery improvements."
      },
      {
        "id": "B",
        "text": "We have examples of useful output or perceived time savings, but no consistent comparison with earlier performance."
      },
      {
        "id": "C",
        "text": "We compare recurring workflows with an explicit baseline using delivery time and quality, including human review and rework."
      },
      {
        "id": "D",
        "text": "We use these comparisons, including total delivery cost and AI spend, to decide what to scale, change, or stop, and have demonstrated improvements that hold up beyond a single example."
      },
      {
        "id": "U",
        "text": "I don't know / I cannot verify this for the selected scope."
      }
    ],
    "helper": "Useful measures include lead time, review effort, rework, defects, and cost per accepted change. Token volume, generated code, and license counts alone do not demonstrate value.",
    "recommendation": "3",
    "owner": "Engineering and delivery leaders, with finance input for costs"
  }
];
export const profiles = [
  {
    "level": 1,
    "name": "AI exploration",
    "description": "AI-enabled delivery is at an early stage within the scope assessed. The priority is to establish a practical workflow that people can repeat and evaluate.",
    "nextMove": "Choose one bounded engineering task, name an owner, provide suitable tools and context, and agree how the result will be checked. Use it as a hands-on learning exercise."
  },
  {
    "level": 2,
    "name": "Local acceleration",
    "description": "Some useful practices are present, but repeatable delegation or the foundations needed to manage it are not yet consistent across the scope assessed.",
    "nextMove": "Use the gaps below to strengthen one recurring workflow. Give it clear ownership, reliable verification, and practical support for the engineers using it."
  },
  {
    "level": 3,
    "name": "Managed agentic delivery",
    "description": "Your answers indicate repeatable delegation supported by verification, ownership, and defined controls. AI-first working practices, shared capability, or evidence of value still have room to develop.",
    "nextMove": "Extend proven workflows across the assessed scope, maintain reusable context and practical coaching, and compare delivery results with a baseline."
  },
  {
    "level": 4,
    "name": "AI-native delivery",
    "description": "Your answers indicate broad AI use, routine delegation of multi-step work, and an AI-first approach to suitable tasks. These practices are supported by shared context, verification, accountable ownership, and measurement.",
    "nextMove": "Improve the quality and economics of the delivery system. Examine review effort, rework, and remaining bottlenecks, and keep updating the practices that support reliable delegation."
  }
];
export const scopes = [
 { id: 'organization', text: 'The whole software engineering organization' },
 { id: 'department', text: 'An engineering department or business unit' },
 { id: 'team', text: 'One engineering team' },
];
export const priorities = [
 'Establish a first repeatable AI workflow',
 'Move from suggestions to delegating complete tasks',
 'Improve verification and trust in results',
 'Improve permissions, approvals, and recovery',
 "Develop engineers' practical skills and shared practices",
 'Scale working practices across the organization',
 'Demonstrate delivery value and economics',
 'Another priority',
];
export const dimensions = [
 { id: 'adoption', label: 'Adoption and capability', numbers: [1,7,9] },
 { id: 'delegation', label: 'Delegation and workflow', numbers: [2,3,4] },
 { id: 'reliability', label: 'Reliability and control', numbers: [5,6,8] },
 { id: 'impact', label: 'Business impact', numbers: [10] },
];
export const title = 'How AI-first is your software engineering organization?';
export const pageUrl = 'https://nboitout.github.io/Blog-Agentic-SDLC/en/executive-self-assessment/';
export const unknownExplanation = 'You have completed the questionnaire, but some practices are not yet visible to you. Review these questions with the people closest to the work, then update your answers. Known dimensions are shown below; an overall profile needs all ten answers to be known.';
export const limitedExplanation = 'Your answers show strengths in several areas, but the next profile also requires consistent practice in the areas highlighted below. A high total cannot compensate for those gaps.';
