// Deterministic, dependency-free ZIP (stored entries) for this tiny text fixture.
import { readFileSync, writeFileSync } from 'node:fs';
const root = new URL('../docs/public/downloads/context-engineering/', import.meta.url);
const names = ['repository-instructions.md', 'task-brief.md', 'handover.md', 'results.md', 'specification.md', 'src/entries.mjs', 'src/caller.mjs', 'tests/validation.test.mjs'];
function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) { crc ^= byte; for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0); }
  return (crc ^ 0xffffffff) >>> 0;
}
const chunks = [], directory = [];
let offset = 0;
for (const name of names) {
  const data = Buffer.from(readFileSync(new URL(name, root), 'utf8').replace(/\r\n/g, '\n'));
  const filename = Buffer.from(name), crc = crc32(data);
  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50); local.writeUInt16LE(20, 4); local.writeUInt16LE(33, 12);
  local.writeUInt32LE(crc, 14); local.writeUInt32LE(data.length, 18); local.writeUInt32LE(data.length, 22); local.writeUInt16LE(filename.length, 26);
  const central = Buffer.alloc(46);
  central.writeUInt32LE(0x02014b50); central.writeUInt16LE(20, 4); central.writeUInt16LE(20, 6); central.writeUInt16LE(33, 14);
  central.writeUInt32LE(crc, 16); central.writeUInt32LE(data.length, 20); central.writeUInt32LE(data.length, 24); central.writeUInt16LE(filename.length, 28); central.writeUInt32LE(offset, 42);
  chunks.push(local, filename, data); directory.push(central, filename);
  offset += local.length + filename.length + data.length;
}
const central = Buffer.concat(directory), end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50); end.writeUInt16LE(names.length, 8); end.writeUInt16LE(names.length, 10); end.writeUInt32LE(central.length, 12); end.writeUInt32LE(offset, 16);
writeFileSync(new URL('validation-fixture.zip', root), Buffer.concat([...chunks, central, end]));
console.log(`Packaged ${names.length} fixture files.`);
