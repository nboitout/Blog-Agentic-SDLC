import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MODELS, PRICING_RETRIEVED_ON, SOURCES } from '../docs/.vitepress/theme/components/context-lab/models.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const reportPath = path.join(root, '.context-lab-pricing-report.json');
const outputPath = process.env.GITHUB_OUTPUT;
const summaryPath = process.env.GITHUB_STEP_SUMMARY;
const fail = message => { throw new Error(message); };
const writeOutput = (key, value) => outputPath && fs.appendFileSync(outputPath, `${key}=${value}\n`);

try {
  if (!fs.existsSync(reportPath)) fail('The pricing reviewer did not create .context-lab-pricing-report.json.');
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  if (!['updated', 'no_changes', 'action_required'].includes(report.status)) fail('Report status must be updated, no_changes, or action_required.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(report.verificationDate || '')) fail('Report requires an ISO verificationDate.');
  if (!Array.isArray(report.sources) || report.sources.length !== 3) fail('Report must account for all three official sources.');
  for (const [provider, url] of Object.entries(SOURCES)) {
    const source = report.sources.find(item => item.provider === provider);
    if (!source || source.url !== url || typeof source.verified !== 'boolean') fail(`Missing or invalid ${provider} source verification.`);
  }
  if (!Array.isArray(report.models) || report.models.length !== MODELS.length) fail('Report must have exactly one entry for every listed model.');
  const ids = new Set(report.models.map(model => model.id));
  if (ids.size !== MODELS.length || MODELS.some(model => !ids.has(model.id))) fail('Report model IDs do not exactly match models.mjs.');
  if (report.models.some(model => model.checked !== true || !String(model.evidence || '').trim())) fail('Every model needs checked: true and concise source evidence.');
  const failures = Array.isArray(report.failures) ? report.failures : [];
  const allSourcesVerified = report.sources.every(source => source.verified);
  const successful = report.status !== 'action_required';
  if (successful && (!allSourcesVerified || failures.length || PRICING_RETRIEVED_ON !== report.verificationDate)) fail('A successful report requires every source, no failures, and PRICING_RETRIEVED_ON equal to verificationDate.');
  if (!successful && PRICING_RETRIEVED_ON === report.verificationDate) fail('An incomplete verification must retain the previous retrieval date.');
  const details = report.models.map(model => `- ${model.id}: ${model.outcome || 'checked'} — ${model.evidence}`).join('\n');
  const markdown = `## Context Lab pricing maintenance\n\nStatus: **${report.status}**  \nVerification date: ${report.verificationDate}\n\n${details}\n\nFailures:\n${failures.length ? failures.map(item => `- ${item}`).join('\n') : '- None'}\n`;
  if (summaryPath) fs.appendFileSync(summaryPath, markdown);
  fs.writeFileSync(path.join(root, '.context-lab-pricing-email.md'), markdown);
  writeOutput('status', report.status); writeOutput('verification_date', report.verificationDate); writeOutput('report_path', '.context-lab-pricing-email.md');
  if (!successful) process.exitCode = 2;
} catch (error) {
  const markdown = `## Context Lab pricing maintenance\n\nStatus: **action_required**\n\n- ${error.message}\n`;
  if (summaryPath) fs.appendFileSync(summaryPath, markdown);
  fs.writeFileSync(path.join(root, '.context-lab-pricing-email.md'), markdown);
  writeOutput('status', 'action_required'); writeOutput('verification_date', 'unavailable'); writeOutput('report_path', '.context-lab-pricing-email.md');
  console.error(error.message); process.exitCode = 2;
}
