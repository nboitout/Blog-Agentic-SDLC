# Approved validation contract — revision 2

Fixture owner: course maintainer. Revision 2 is the approved intent for this exercise.
This supersedes revision 1, which checked amount first.

Both submitPayment({ reference, amount }) and previewPayment({ reference, amount })
take one object argument. Inputs in scope have a string reference and finite numeric amount.
Check an empty reference first: throw Error('Reference is required').
Then check amount <= 0: throw Error('Amount must be positive').
For { reference: '', amount: 0 }, the first error is 'Reference is required'.
Preserve successful return objects, signatures, error text, and validation order.
Changing input types or adding normalization is outside this refactoring task.

Sources: src/entries.mjs, src/caller.mjs, tests/validation.test.mjs.
