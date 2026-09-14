**Brambleheart Beta 0.03 — Character Sheet & Reference Alignment**

**Site Update — Beta 0.03**  
**Game Update — v0.01, Launch Patch**

- Aligns Rhythm Engine Character Sheet Talents, Known Spells, and Equipment & Gear with the same shared card presentations used by their related Rules pages.
- Changes individual Lores of Magic pages to a single-column Spell layout while preserving the shared Spell card implementation elsewhere.
- Expands the Adventurer Oath detail area across both inner columns, restores Talent-card text padding, and changes Trinkets to the common Adventuring Item accent.
- Removes the visible Character Accent Color text from the Character Sheet while retaining the accessible color-picker label.
- Establishes a shared Talent card authority across Rules, Character Creation, and Character Sheets and adds regression checks for the aligned Spell, Talent, equipment, Oath, Trinket, and accent-control presentation.
- Updates package/runtime/build/export/PWA/cache metadata to Site Update Beta 0.03; Game Update remains v0.01.

**Patch-note verification**

- Previous version reviewed: 0.10
- New version: 0.03
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: Repository integrity check; persistence regression check; TypeScript/Vue script syntax transpilation (71 source units); CSS parser validation; responsive CSS audit at 1280 px, 768 px, and 390 px. Full `vue-tsc`/Vite production build was not completed because dependency installation timed out in this environment. Live browser visual testing could not be completed because Chromium did not start successfully in this environment.
- Known unfinished work intentionally excluded: None identified
