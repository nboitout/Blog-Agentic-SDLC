import fs from 'node:fs';

const status = process.env.PRICING_STATUS || 'action_required';
const date = process.env.PRICING_DATE || new Date().toISOString().slice(0, 10);
const labels = { updated: 'Updated', no_changes: 'No price changes', action_required: 'Action required' };
const subject = `[Context Lab pricing] ${date} — ${labels[status] || 'Action required'}`;
const report = fs.existsSync('.context-lab-pricing-email.md') ? fs.readFileSync('.context-lab-pricing-email.md', 'utf8') : 'No report was produced; action is required.';
const links = [
  '[Live lab](https://nboitout.github.io/Blog-Agentic-SDLC/en/interactive/)',
  '[OpenAI pricing](https://developers.openai.com/api/docs/pricing)',
  '[Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing)',
  '[Google pricing](https://ai.google.dev/gemini-api/docs/pricing)',
  `[Commit](${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/commit/${process.env.GITHUB_SHA})`,
  `[Workflow run](${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID})`,
].join('\n\n');
if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM) {
  console.error('RESEND_API_KEY and RESEND_FROM must be configured as GitHub Actions secrets.'); process.exit(1);
}
const response = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from: process.env.RESEND_FROM, to: ['nicolas@agentic-sdlc.it'], subject, text: `${report}\n\n${links}\n` }) });
if (!response.ok) throw new Error(`Resend rejected the notification: ${response.status} ${await response.text()}`);
console.log(`Sent ${subject}`);
