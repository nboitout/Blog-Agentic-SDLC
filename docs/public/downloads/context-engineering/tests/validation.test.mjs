import test from 'node:test';
import assert from 'node:assert/strict';
import { submitPayment, previewPayment } from '../src/entries.mjs';
import { quoteThenSubmit } from '../src/caller.mjs';

for (const fn of [submitPayment, previewPayment]) {
  test(`${fn.name}: signature and exact first error`, () => {
    assert.equal(fn.length, 1);
    for (const amount of [0, -1, 10]) {
      assert.throws(() => fn({ reference: '', amount }), { message: 'Reference is required' });
    }
    for (const amount of [0, -1]) {
      assert.throws(() => fn({ reference: 'A', amount }), { message: 'Amount must be positive' });
    }
  });
}
test('caller and successful return values remain stable', () => {
  assert.deepEqual(quoteThenSubmit({ reference: 'A', amount: 10 }), [
    { reference: 'A', amount: 10, status: 'preview' },
    { reference: 'A', amount: 10, status: 'submitted' },
  ]);
});
