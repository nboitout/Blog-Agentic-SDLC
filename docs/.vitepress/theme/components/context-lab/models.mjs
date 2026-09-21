// Date the rates below were retrieved from all three official pricing pages.
// Advance this only after checking the prices and promotional terms, never at build time.
export const PRICING_RETRIEVED_ON = '2026-09-21';
export const SOURCES = {
  openai: 'https://developers.openai.com/api/docs/pricing',
  claude: 'https://platform.claude.com/docs/en/about-claude/pricing',
  google: 'https://ai.google.dev/gemini-api/docs/pricing',
};
const openai = { provider: 'OpenAI', limit: 1050000, limitKind: 'combined', threshold: 272000, inputMultiplier: 2, outputMultiplier: 1.5, source: SOURCES.openai, minimumCache: 1024 };
const claude = { provider: 'Anthropic', limit: 1000000, limitKind: 'combined', source: SOURCES.claude, minimumCache: 4096 };
const google = { provider: 'Google', limit: 1048576, limitKind: 'input', source: SOURCES.google, minimumCache: 4096, note: 'Implicit-cache illustration; explicit cache storage is excluded.' };
export const MODELS = [
  { ...openai, id: 'gpt-6-astra', name: 'GPT-6 Astra', input: 10, cached: 1, write: 12.5, output: 50, status: 'Current' },
  { ...openai, id: 'gpt-5.6-sol', name: 'GPT-5.6 Sol', input: 4, cached: .4, write: 5, output: 20, status: 'Promotion', reviewAfter: '2026-11-21', note: 'Promotional rates available at least through 21 Nov 2026; no future rate is assumed.' },
  { ...openai, id: 'gpt-5.6-terra', name: 'GPT-5.6 Terra', input: 2, cached: .2, write: 2.5, output: 12, status: 'Current' },
  { ...openai, id: 'gpt-5.6-luna', name: 'GPT-5.6 Luna', input: .2, cached: .02, write: .25, output: 1.2, status: 'Current' },
  { ...claude, id: 'claude-fable-5-1', name: 'Claude Fable 5.1', input: 10, cached: .25, write: 12.5, output: 50, status: 'Current' },
  { ...claude, id: 'claude-opus-5', name: 'Claude Opus 5', input: 5, cached: .5, write: 6.25, output: 25, status: 'Current' },
  { ...claude, id: 'claude-sonnet-5', name: 'Claude Sonnet 5', input: 2, cached: .2, write: 2.5, output: 10, status: 'Current', note: '$2 / $10 is now standard pricing; the previously planned September increase was cancelled.' },
  { ...claude, id: 'claude-haiku-4-5-20251001', name: 'Claude Haiku 4.5', limit: 200000, input: 1, cached: .1, write: 1.25, output: 5, status: 'Current' },
  { ...google, id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash', input: .75, cached: .075, write: .75, output: 3.75, status: 'Promotion', reviewAfter: '2026-12-31', note: 'Through 31 Dec 2026. From 1 Jan 2027: $1.50 input / $0.15 cached / $7.50 output. Implicit-cache illustration.' },
  { ...google, id: 'gemini-3.5-flash-lite', name: 'Gemini 3.5 Flash-Lite', input: .3, cached: .03, write: .3, output: 2.5, status: 'Current' },
  { ...google, id: 'gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro Preview', input: 2, cached: .2, write: 2, output: 12, threshold: 200000, inputMultiplier: 2, outputMultiplier: 1.5, status: 'Preview' },
  { ...openai, id: 'gpt-5.5', name: 'GPT-5.5', input: 5, cached: .5, write: 5, output: 30, status: 'Earlier generation' },
  { ...openai, id: 'gpt-5.4', name: 'GPT-5.4', input: 2.5, cached: .25, write: 2.5, output: 15, status: 'Earlier generation' },
  { ...claude, id: 'claude-opus-4-7', name: 'Claude Opus 4.7', input: 5, cached: .5, write: 6.25, output: 25, status: 'Earlier generation' },
  { ...claude, id: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6', input: 3, cached: .3, write: 3.75, output: 15, status: 'Earlier generation' },
];
