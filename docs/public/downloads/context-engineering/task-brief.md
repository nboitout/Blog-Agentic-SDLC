# Task: extract shared validation

## Outcome
Remove duplicated validation while preserving externally observable behavior.

## Acceptance criteria
- Public one-object-argument signatures remain unchanged.
- Error messages and success return values remain unchanged.
- Validation order remains unchanged when several inputs are invalid.
- Existing checks pass, with targeted coverage of the refactor.

## Boundaries
Edit src/entries.mjs, add a shared helper under src/, and extend tests as needed.
Do not change src/caller.mjs, specification.md, input types, or dependencies.

## Starting points (relative to extracted fixture root)
- Implementation: src/entries.mjs
- Caller: src/caller.mjs
- Tests: tests/validation.test.mjs
- Approved intent: specification.md, revision 2

## Uncertainties
Record observed behavior, intended behavior, and unresolved discrepancies separately.
The baseline is intentionally duplicated. No refactor has yet been verified.

## Verification
From the fixture root: `node --check src/entries.mjs`, `node --check src/caller.mjs`,
and `node --test tests/validation.test.mjs`. Syntax-check any new helper.
Record commands, actual results, Git revision, and uncommitted diff checked.
