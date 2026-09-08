# Brambleheart Beta 0.21 — Character Creation & Rules Presentation

**Site Update — Beta 0.21**

- Fundamentals → Introduction now presents the Watcher dialogue at normal body weight, renames `CORE PRINCIPLES OF PLAY` to `PRINCIPLES OF PLAY`, and structures the principles as a bullet list.
- Character Creation → Step-by-Step removes the repeated `CHARACTER CREATION` eyebrow and adds visual examples for Heritage/Cultural Traits, Spark/Deed, Homeland, Faith/Oath, Paths, and starting equipment. The four Path cards share the same canonical option data used by Character Creation.
- Step 6 text is tightened around Path choice, Talents, and Magic. Step 7 now uses the application’s canonical starting values: Adventure Kit + 30 sp (1,500 wp), with the option to return the kit for +3 sp (150 wp), for 33 sp total before purchases.
- Sparks & Deeds is reorganized around a structured Spark explanation and one combined `Deeds` section with three visual Deed examples; the full Deed list remains available in a collapsed reference panel. Homeland, Oath, Faith, Talents, Adventuring Gear, and Beyond Character Creation retain their canonical data while using the shared Character Creation/Fundamentals presentation treatment.
- Species pages now keep Heritage and Cultural Trait panels collapsed by default and include an expandable `<Species> Lore` placeholder above them for future content.
- Winds of Magic → Spell Types & Targeting → Spell Keywords now uses the approved definitions for `MAGIC`, `SIGNATURE`, `CANTRIP`, `ENHANCE`, `HEX`, area-of-effect keywords, and `SUMMON`. Game Update remains v0.10 because this release does not alter the current Spell roster or v0.10 balance values.
- Site Update / BUILD / character export, package, README, changelog, patch-note, and PWA cache metadata advance to Beta 0.21.

**Patch-note verification**

- Previous Site Update reviewed: Beta 0.20
- New Site Update: Beta 0.21
- Game Update: v0.10 (unchanged)
- Current GitHub baseline reviewed: Yes — `b69454cefc7aeb77a9fb76c189cf420cf8c7653f`
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: TypeScript compilation of the changed current-rules/Character Creation data graph; compiled runtime audit of canonical Character Creation, Spark/Deed, Spell Keyword, Path, and starting-economy data; changed Vue script TypeScript checks using local Vue shims; changed Vue HTML structural parsing; changed scoped-CSS parsing with PostCSS; 204 repository-relative import checks; requested-content/reference scans; release/version synchronization audit; `git diff --check`; patch ZIP integrity check.
- Not run: Full `vue-tsc && vite build` and browser-based desktop/tablet/mobile runtime verification. Dependency installation was attempted with `npm install --ignore-scripts --no-package-lock` and timed out before `node_modules` was installed.
- Known unfinished work intentionally excluded: Species Lore panels are intentionally empty placeholders as requested; Encounter Builder remains the existing placeholder.
