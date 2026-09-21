# Context Engineering Lab

The English, French, and Romanian interactive routes mount `ContextEngineeringLab.vue` inside the VitePress page layout. French and Romanian readers receive a localized introduction; the shared lab is currently in English and declares `lang="en"`.

`lesson.html` contains the static teaching content, rendered on the server. `app.mjs` mounts controls into that markup. Each mount owns its state and DOM queries, and its resize listener is removed on unmount. `styles.css` is scoped under `.context-lab` so the lab cannot restyle the surrounding site.

## Pricing and assumptions

`models.mjs` contains `PRICING_RETRIEVED_ON`, source links, rates, context limits, long-context thresholds, and promotional review dates. The retrieval date records an actual check of all three official pricing pages; do not advance it automatically on builds or page visits. Review the rates and promotional terms together before updating it.

The date appears beside the selected model and above the pricing table. The selected model links to its provider's official pricing page, and the reference section links to all three providers. CSV exports include the retrieval date and source URL. The lab displays a freshness notice in both pricing areas after 30 days and calls out promotions that need another check. These notices do not update the prices automatically.

`simulation.mjs` is independent of the UI. It models a fixed synthetic text workload, matching-prefix cache reuse, explicit paid summary calls, and context-limit failures. The lesson discloses the cache approximation, excludes service fees and storage, and distinguishes API costs from provider profitability. Cost comparisons are not quality benchmarks or invoice predictions.

The default scenario deliberately allows cached full history to cost slightly less than summarizing. Keeping a smaller active context and paying less are separate outcomes. Recent-only retention also demonstrates how pruning can break prefix reuse and discard a requirement.

## Verification

Run `npm run test:context-lab` for the independent formula and boundary checks, then `npm run build` for static rendering. The tests also run before the GitHub Pages build.

For browser verification, use `npm run preview -- --host 127.0.0.1 --port 8766` and open `/Blog-Agentic-SDLC/en/interactive/`. Check model changes, chart modes, the memory test, overflow, CSV export, narrow layouts, and navigation away and back. The mounted lab should initialize exactly once per visit.
