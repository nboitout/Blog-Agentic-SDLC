// The single source of truth for the Academy section's module grid.
// Adding the next module is exactly this: one new entry here, plus the
// module's own self-contained HTML file dropped into public/academy/.
// Decks also provide a cover-slide screenshot in public/academy/previews/.
// Nothing else in the site needs to change — the hub's catalogue summary,
// its tier filter, and its two bands are all derived from this array.
//
// Order matters: entries are rendered in the order below, within their band.
// Maps are listed in study order (Associate → Developer → Architect).

export interface AcademyModule {
  id: string
  title: string
  tagline: string
  domains: string[]
  level: Array<'associate' | 'developer' | 'architect'>
  kind: 'deck' | 'map'
  /**
   * Numbers shown on the card and summed into the page's catalogue summary.
   * Maps report `domains`/`subdomains`; decks report `slides`.
   */
  metrics: {
    domains?: number
    subdomains?: number
    slides?: number
  }
  href: string
  /** Actual cover-slide screenshot for the lesson gallery. */
  preview?: string
}

export const academyModules: AcademyModule[] = [
  {
    id: 'associate-study-map',
    title: 'Associate’s Study Map',
    tagline:
      'Practice prompting, evaluation, and everyday Claude workflows.',
    domains: [
      'Domain 1 · Prompting & Task Execution',
      'Domain 2 · Output Evaluation & Validation',
      'Domain 3 · Product & Model Selection',
      'Domain 4 · Workflow Integration & Solution Design',
      'Domain 5 · Configuration & Knowledge Management',
      'Domain 6 · Governance, Risk & Responsible Use',
      'Domain 7 · Troubleshooting & Optimization',
    ],
    level: ['associate'],
    kind: 'map',
    metrics: { domains: 7, subdomains: 30 },
    href: '/academy/associate-study-map.html',
  },
  {
    id: 'developer-study-map',
    title: 'Developer’s Study Map',
    tagline:
      'Build and debug Claude applications, agents, and tool integrations.',
    domains: [
      'Domain 1 · Agents & Workflows',
      'Domain 2 · Applications & Integration',
      'Domain 3 · Claude Code',
      'Domain 4 · Eval, Testing & Debugging',
      'Domain 5 · Model Selection & Optimization',
      'Domain 6 · Prompt & Context Engineering',
      'Domain 7 · Security & Safety',
      'Domain 8 · Tools & MCPs',
    ],
    level: ['developer'],
    kind: 'map',
    metrics: { domains: 8, subdomains: 25 },
    href: '/academy/developer-study-map.html',
  },
  {
    id: 'architect-study-map',
    title: 'Architect’s Study Map',
    tagline:
      'Design reliable agent systems, tool integrations, and context strategies.',
    domains: [
      'Domain 1 · Agentic Architecture',
      'Domain 2 · Tool Design & MCP',
      'Domain 3 · Claude Code Config',
      'Domain 4 · Prompt Engineering',
      'Domain 5 · Context & Reliability',
    ],
    level: ['architect'],
    kind: 'map',
    metrics: { domains: 5, subdomains: 30 },
    href: '/academy/study-map.html', // filename kept as-is — already live under this path
  },
  {
    id: 'agent-sdk-anatomy',
    title: 'Agent SDK Anatomy',
    tagline:
      'Understand the agent loop and the core building blocks of the Claude Agent SDK.',
    domains: ['Domain 1 · Agentic Architecture', 'Domain 2 · Tool Design & MCP'],
    level: ['developer', 'architect'],
    kind: 'deck',
    metrics: { slides: 13 },
    href: '/academy/agent-sdk-anatomy.html',
    preview: '/academy/previews/agent-sdk-anatomy.jpg',
  },
  {
    id: 'interception-point',
    title: 'The Interception Point',
    tagline:
      'Use hooks to inspect, control, and transform agent tool calls.',
    domains: ['Domain 1.5 · Hooks for interception & normalization'],
    level: ['developer', 'architect'],
    kind: 'deck',
    metrics: { slides: 13 },
    href: '/academy/interception-point.html',
    preview: '/academy/previews/interception-point.jpg',
  },
  {
    id: 'mcp-protocol',
    title: 'One Protocol, Any Tool',
    tagline:
      'Learn how MCP connects agents to tools, resources, and prompts.',
    domains: ['Domain 2 · Tool Design & MCP'],
    level: ['developer', 'architect'],
    kind: 'deck',
    metrics: { slides: 13 },
    href: '/academy/mcp-protocol.html',
    preview: '/academy/previews/mcp-protocol.jpg',
  },
  {
    id: 'skills-deep-dive',
    title: 'Cheap Until Called',
    tagline:
      'Package reusable instructions with skills and load them when needed.',
    domains: ['Domain 1 · Agentic Architecture'],
    level: ['developer', 'architect'],
    kind: 'deck',
    metrics: { slides: 13 },
    href: '/academy/skills-deep-dive.html',
    preview: '/academy/previews/skills-deep-dive.jpg',
  },
  {
    id: 'subagents-deep-dive',
    title: 'One Prompt, A Tree of Agents',
    tagline:
      'Delegate work to subagents with isolated context and scoped tools.',
    domains: ['Domain 1 · Agentic Architecture'],
    level: ['developer', 'architect'],
    kind: 'deck',
    metrics: { slides: 13 },
    href: '/academy/subagents-deep-dive.html',
    preview: '/academy/previews/subagents-deep-dive.jpg',
  },
  {
    id: 'permissions-deep-dive',
    title: 'You Decide, Claude Code Enforces',
    tagline:
      'Control agent access with permission modes, rules, and sandboxing.',
    domains: ['Domain 3 · Claude Code Config'],
    level: ['developer', 'architect'],
    kind: 'deck',
    metrics: { slides: 13 },
    href: '/academy/permissions-deep-dive.html',
    preview: '/academy/previews/permissions-deep-dive.jpg',
  },
]
