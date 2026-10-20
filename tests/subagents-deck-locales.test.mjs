import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const root = new URL('../docs/public/academy/', import.meta.url);
const html = readFileSync(new URL('subagents-deep-dive.html', root), 'utf8');
const keys = [...html.matchAll(/data-i18n(?:-aria)?="([^"]+)"/g)].map(match => match[1]);
const context = vm.createContext({ window: {} });
for (const code of ['fr', 'ro']) {
  const filename = `subagents-deep-dive.${code}.js`;
  assert.ok(html.indexOf(filename) < html.indexOf('src="./deck-standard.js"'));
  vm.runInContext(readFileSync(new URL(filename, root), 'utf8'), context);
}

for (const code of ['fr', 'ro']) {
  test(`${code}: all 13 slides, diagrams and navigation hints are translated`, () => {
    const locale = context.window.academyDeckLocales[code];
    assert.ok(locale.title.trim());
    assert.deepEqual(Object.keys(locale.content).sort(), [...keys].sort());
    for (const key of keys) {
      assert.equal(typeof locale.content[key], 'string', key);
      assert.ok(locale.content[key].trim(), key);
    }
    for (let slide = 0; slide < 13; slide++) {
      assert.ok(keys.some(key => key.startsWith(`s${slide}-`)));
    }
  });

  test(`${code}: code examples retain their executable identifiers`, () => {
    const content = context.window.academyDeckLocales[code].content;
    for (const identifier of ['name', 'description', 'tools', 'model', 'code-reviewer', 'Read, Grep, Glob', 'sonnet']) {
      assert.ok(content['s3-4'].includes(identifier), identifier);
    }
    for (const identifier of ['AgentDefinition', 'description=', 'prompt=', 'tools=', 'model=', '"Read"', '"Grep"', '"Glob"']) {
      assert.ok(content['s3-5'].includes(identifier), identifier);
    }
  });
}
