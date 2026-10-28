import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const root = new URL('../docs/public/academy/', import.meta.url);
const html = readFileSync(new URL('agent-sdk-anatomy.html', root), 'utf8');
const keys = [...html.matchAll(/data-i18n(?:-aria)?="([^"]+)"/g)].map(match => match[1]);
const sources = [...html.matchAll(/<p class="sources" data-i18n="([^"]+)">(.+?)<\/p>/g)];
const context = vm.createContext({ window: {} });
assert.equal(new Set(keys).size, keys.length, 'Translation keys must be unique');
assert.equal(sources.length, 13, 'Every slide must retain its documentation footer');

for (const language of ['fr', 'ro']) {
  const filename = `agent-sdk-anatomy.${language}.js`;
  test(`${language}: translations load before the language switcher and cover every slide`, () => {
    const script = html.indexOf(`src="./${filename}"`);
    assert.ok(script >= 0 && script < html.indexOf('src="./deck-standard.js"'));
    vm.runInContext(readFileSync(new URL(filename, root), 'utf8'), context);
    const locale = context.window.academyDeckLocales[language];
    assert.ok(locale.title.trim());
    assert.deepEqual(Object.keys(locale.content).sort(), [...keys].sort());
    for (const key of keys) assert.ok(locale.content[key].trim(), key);
    for (let slide = 0; slide < 13; slide++) {
      assert.ok(keys.some(key => key.startsWith(`s${slide}-`)), `slide ${slide + 1}`);
    }
  });

  test(`${language}: documentation links, review date and API names survive translation`, () => {
    const { content } = context.window.academyDeckLocales[language];
    const hrefs = text => [...text.matchAll(/href="([^"]+)"/g)].map(match => match[1]);
    for (const [, key, original] of sources) {
      assert.deepEqual(hrefs(content[key]), hrefs(original), key);
    }
    assert.ok(content['s0-7'].includes('datetime="2026-10-27"'));
    for (const [key, identifiers] of Object.entries({
      's1-15': ['init', 'ResultMessage'],
      's2-16': ['updatedToolOutput', 'updatedMCPToolOutput'],
      's4-16': ['canUseTool', 'can_use_tool', 'dontAsk'],
      's5-10': ['create_sdk_mcp_server()'],
      's5-11': ['createSdkMcpServer()'],
      's9-6': ['error_max_turns', 'result'],
      's10-11': ['PreCompact', 'compact_boundary', 'CLAUDE.md'],
      's11-13': ['AgentDefinition', 'updatedInput', 'maxTurns']
    })) for (const identifier of identifiers) assert.ok(content[key].includes(identifier), identifier);
    const cover = keys.filter(key => key.startsWith('s0-')).map(key => content[key]).join(' ');
    assert.doesNotMatch(cover, /npmjs|pypi|0\.3\.312|0\.2\.174/);
  });
}
