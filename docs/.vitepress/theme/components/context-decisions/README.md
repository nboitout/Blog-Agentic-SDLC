# Context decisions exercise

Route: `/en/interactive/context-engineering-lab/` under the site's configured base.
This module is separate from the existing token-cost `context-lab/` and standalone
`docs/public/context-cockpit.html`. Do not consolidate their styles or state.

`simulation.mjs` is a pure, deterministic state machine. `ContextDecisionLab.vue`
renders it. All five component labels come from `COMPONENTS`. Sources identify
provenance and fixture revisions; loaded snapshots and before/after action records
keep an audit trail. Estimated tokens count characters / 4, not a tokenizer.

Run `npm run test:context-decisions` from the repository root. Fixture commands
are in `docs/public/downloads/context-engineering/repository-instructions.md`.
After editing fixture files, run `npm run build:context-fixture` to rebuild its ZIP.
The complete package is intentionally a duplicated baseline, not a completed refactor.

Owner: course maintainer. Refresh on fixture contract, paths, command, or loading
semantics changes. Review evidence and rule changes together. English lecture,
exercise, and quiz ship first; separately maintained French and Romanian lessons
need a deliberate translation pass. The old recap asset stays available for those
editions; the English lecture uses an independent HTML table recap.

## Verification for the initial release (2026-09-21)

- Production VitePress build passed. All 37 tests passed across context decisions
  and fixture (12), the existing token-cost tool (9), and assessment (16).
- The ZIP was extracted and its three baseline tests executed successfully.
- Browser checks covered direct navigation/refresh with the GitHub Pages base,
  lesson anchors and local links, raw Markdown and handover downloads, wrong and
  correct quiz feedback, scoring/reset, Escape/focus return, keyboard actions,
  390px layout, and the source/conflict/compaction/handover/resume walkthrough.
- The final production preview had no browser console errors or warnings.
- Preservation baseline: `3d5883e59c8f9262b11afe183dccdd912c4da6b4`.
  Cockpit source SHA-256: `17D5A3D1D20ED68CB73DC5FF3E6BFB65CCC239EAD542A8035CECCDA9F9BCDF0E`.
  Its only external dependency is the unchanged favicon. Slider, switch, reset,
  tooltips, and visual rendering were checked. No cockpit, token-cost source,
  shared theme CSS, old recap image, or non-English lesson was edited.
- The initial checkout had only untracked `.playwright-cli/` and `output/`
  artifacts; these were excluded from the commit. The separate application
  workspace's pre-existing changes were not touched.

These are implementation checks, not measurements of model reliability. The
browser only simulates the both-invalid order check; it never runs a coding agent.
