// The single source of truth for the Academy section's module grid.
// Adding module #6 later is exactly this: one new entry here, plus the
// module's own self-contained HTML file dropped into public/academy/.
// Nothing else in the site needs to change — the hub's headline stats,
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
   * Numbers shown on the card and summed into the page's headline stats.
   * Maps report `domains`/`subdomains`; decks report `slides`.
   */
  metrics: {
    domains?: number
    subdomains?: number
    slides?: number
  }
  href: string
}

export const academyModules: AcademyModule[] = [
  {
    id: 'associate-study-map',
    title: 'Associate’s Study Map',
    tagline:
      'All 7 domains and 30 subdomains of the Associate blueprint — prompting, output evaluation, product/model selection, workflow integration, configuration, governance, and troubleshooting — with added practice notes since the source blueprint is one line per subdomain.',
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
      'All 8 domains and 25 subdomains of the Developer blueprint — agent construction, API mechanics, Claude Code, debugging, model selection, prompt/context engineering, security, and tools/MCPs — on one searchable reference page.',
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
      'All 5 domains and 30 subdomains of the Architect (Foundations) blueprint on one searchable reference page, with a review tracker saved in your browser.',
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
      'A click-through tour of the Claude Agent SDK’s twelve building blocks — the agent loop, hooks, skills, permissions, custom tools, subagents, sessions, MCP servers, guardrails, and context compaction.',
    domains: ['Domain 1 · Agentic Architecture', 'Domain 2 · Tool Design & MCP'],
    level: ['developer', 'architect'],
    kind: 'deck',
    metrics: { slides: 13 },
    href: '/academy/agent-sdk-anatomy.html',
  },
  {
    id: 'interception-point',
    title: 'The Interception Point',
    tagline:
      'A deep dive on PreToolUse and PostToolUse hooks specifically — decision fields, exit codes, matchers, settings.json vs. SDK callbacks, and what happens when several hooks fire at once.',
    domains: ['Domain 1.5 · Hooks for interception & normalization'],
    level: ['developer', 'architect'],
    kind: 'deck',
    metrics: { slides: 13 },
    href: '/academy/interception-point.html',
  },
]
