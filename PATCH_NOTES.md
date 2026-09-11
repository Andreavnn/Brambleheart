**Brambleheart Beta 0.05 — Stability & Encounter Foundations**

**Site Update — Beta 0.05**  
**Game Update — v0.01, Launch Patch**

- Added Selu of the Wandering Reeds as a complete approved premade character in Character Roster, including Sea of Roots, current character choices, current equipment, and one-time seeding that respects later user edits or deletion.
- Added Sea of Roots as a playable Homeland and Driftwood Charm as a Trinket that increases one healing Spell’s Health restoration by [+1] for one target once per round; standardized Leafstitch as the current armor name while preserving the old spelling only for legacy imports.
- Added the first functional Rhythm Engine Encounter Builder workflow with encounter details, party selection, Watcher opposition, battlefield notes, Group Threat, review, and locally persisted save/edit/delete support.
- Refined Fundamentals, Character Creation, Playable Species, Winds of Magic, Battle, Health, Healing, equipment, and narrative-list presentation, including direct Character Roster links, clearer current terminology, a corrected 3×3 Orb example, and reduced table-width pressure.
- Expanded the Watcher monster catalog with the requested sourced monsters and clearly marked placeholder names where a requested category lacked enough source entries; removed the external source-reference section and excluded Watcher catalogs/details from sequential previous/next Rules navigation.
- Updated News so Discord and Creator Content live-count lines align visually and both use the new muted green count treatment.
- Rebuilt the Site Changelog into five categorized historical releases, with no category exceeding 12 change logs, and updated the in-app changelog to render those categories.
- Consolidated all historical Game Updates into v0.01, **Launch Patch**, while keeping saved-data schema/version keys independent from the condensed public release number.
- Updated package/runtime/build/export/PWA/cache documentation metadata to Site Update Beta 0.05 and Game Update v0.01.

**Patch-note verification**

- Previous version reviewed: 0.27
- New version: 0.05
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: Repository integrity checks passed; persistence regression checks passed; TypeScript/Vue script syntax transpile check passed. Production `vue-tsc`/Vite build not run because the dependency install could not reach npm (`EAI_AGAIN`).
- Known unfinished work intentionally excluded: None identified
