**Brambleheart Beta 0.12 — Watcher Navigation, Creature Profiles & Level Up Alignment**

**Site Update — Beta 0.12**  
**Game Update — v0.01, Launch Patch**

- Renames Generic Monsters to Creatures of the Winds, moves Ember Dyrtle into that category, and removes only the requested Muckling/Dyrtle variants.
- Adds bio text and name-specific profile wording for Muckling, Noxious Muckling, and Ember Dyrtle, with Slosh / Seeping Slosh / Cinderstep rendered as structured rule rows.
- Corrects Watcher monster breadcrumbs and monster-profile back navigation through the shared Rules page-layout authority.
- Refines the Encounter Builder Under Construction stamp without increasing the navigation tab height and removes duplicate selected-character detail text beside the Rhythm Engine character selector.
- Shares the Character Detail section between Character Sheet and Level Up and restores Level Up section headers to the Character Sheet collapsible presentation.
- Replaces the Hollowing Hallows lore page with the supplied current text.
- Updates package/runtime/build/export/PWA/install-asset metadata to Site Update Beta 0.12 while Game Update remains v0.01.

Verification:
- Previous Site Update reviewed: 0.11
- New Site Update: 0.12
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: `npm test` (repository integrity + persistence regression); TypeScript/Vue script syntax transpilation (77 source units); Vue template tag-balance audit (34 files); CSS parser validation (22 stylesheet blocks); relative-import audit (282 imports); compiled monster/runtime verification for retained/removed catalog entries and structured STRIDE fields; static responsive structural audit at 1280 px, 768 px, and 390 px. `npm run build` was attempted but could not run because `vue-tsc` is not installed in this environment. Live browser visual testing was not completed.
- Known unfinished work intentionally excluded: None identified
