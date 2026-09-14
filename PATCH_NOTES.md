**Brambleheart Beta 0.10 — Spell Card Restoration**

**Site Update — Beta 0.10**  
**Game Update — v0.01, Launch Patch**

- Restores the established full Known Spells card presentation rather than using the replacement expandable Spell implementation.
- Uses one shared Spell card authority across Lore pages, Character Creation, character review, and Rhythm Engine Character Sheets.
- Restores the two-column desktop Spell layout, Lore-colored card edge and tinted surface, header Mana badge, inline rule-detail rows, and keyword pills; narrow layouts collapse to one column.
- Preserves current Signature/Custom markers, current Spell rules, calculated Mana costs and modifier breakdowns, and Scriptweave cooldown behavior.
- Removes superseded Spell-specific presentation paths and adds regression checks against reintroducing them.
- Updates package/runtime/build/export/PWA/cache metadata to Site Update Beta 0.10; Game Update remains v0.01.

**Patch-note verification**

- Previous version reviewed: 0.09
- New version: 0.10
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: Repository integrity check; persistence regression check; TypeScript/Vue script syntax transpilation (70 source units); CSS structural validation. Full `vue-tsc`/Vite production build not run because dependency installation timed out in this environment. Live browser visual testing was not available.
- Known unfinished work intentionally excluded: None identified
