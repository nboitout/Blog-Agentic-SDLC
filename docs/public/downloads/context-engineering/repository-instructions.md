# Repository instructions template

Copy this file to AGENTS.md in your isolated fixture root. Check your agent's
instruction discovery and scope rules; the filename alone does not enforce access.

## Purpose and conventions
Extract shared validation in a small JavaScript ES module fixture. Keep functions
small; preserve the public contract. Do not add dependencies or services.

## Setup, build, test (working directory: extracted fixture root)
Requires Node.js 20 or newer. No package installation is needed.
- Check runtime: `node --version`
- Syntax/build check (no compilation step): `node --check src/entries.mjs`
- Check caller: `node --check src/caller.mjs`
- Test: `node --test tests/validation.test.mjs`
Run `node --check` on any new helper module as well.

## Public contracts and boundaries
Preserve both one-object-argument signatures, exact error text, check order, and
success return values. Empty reference precedes non-positive amount.
Edit src/entries.mjs, add a helper in src/, and extend tests as needed.
Keep src/caller.mjs and specification.md unchanged; report a discrepancy before
changing a public contract. These instructions are guidance, not write protection.

## Authoritative starting points
- specification.md: approved revision 2, intended behavior and input domain.
- src/entries.mjs: observed implementation of both public functions.
- src/caller.mjs: representative consumer.
- tests/validation.test.mjs: exact messages, simultaneous invalid inputs, returns.

## Uncertainty and evidence
Separate observed behavior from approved intent. Record unresolved discrepancies
in handover.md. Report actual commands, results, and checked Git revision or
working-tree diff. Never label a proposed check as executed.

## Maintenance
Owner: fixture maintainer. Review when the contract, commands, or relevant paths
change. Review proposed instruction updates before distributing them.
