// The single source of truth for the Academy section's module grid.
// Adding module #4 later is exactly this: one new entry here, plus the
// module's own self-contained HTML file dropped into public/academy/.
// Nothing else in the site needs to change.

export interface AcademyModule {
  id: string
  title: string
  tagline: string
  domains: string[]
  level: Array<'associate' | 'developer' | 'architect'>
  kind: 'deck' | 'map'
  href: string
}

export const academyModules: AcademyModule[] = [
  {
    id: 'agent-sdk-anatomy',
    title: 'Agent SDK Anatomy',
    tagline:
      'A click-through tour of the Claude Agent SDK’s twelve building blocks — the agent loop, hooks, skills, permissions, custom tools, subagents, sessions, MCP servers, guardrails, and context compaction.',
    domains: ['Domain 1 · Agentic Architecture', 'Domain 2 · Tool Design & MCP'],
    level: ['developer', 'architect'],
    kind: 'deck',
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
    href: '/academy/interception-point.html',
  },
  {
    id: 'study-map',
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
    href: '/academy/study-map.html',
  },
]
