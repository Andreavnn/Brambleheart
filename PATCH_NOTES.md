# Brambleheart Beta 0.19 — Rules Navigation, Spell Damage & Reference Updates

**Site Update — Beta 0.19**

- Rules → References → Changes & Updates now uses the canonical Game Update history directly. The current Game Update appears first and expanded; archived updates remain collapsed beneath it. The standalone Game Updates page uses the same shared presentation rather than maintaining a duplicate implementation.
- Rule pages now use one shared Previous/Next navigation sequence in addition to breadcrumbs. Navigation moves through pages inside a rule section and carries the final page of each section into the next rule section; Core Actions advances to Character Creation.
- Character Creation → Step-by-Step now gives numbered steps a stronger visual hierarchy. Step 5 replaces the static Attribute table with a self-contained interactive five-point Attribute allocator modeled on Character Creation; its values are intentionally temporary and reset on route exit or reload.
- News now presents the current Game Update before the latest Site Update.

**Game Update — v0.08**

- Hostile Spells resolved by Magic Strike now state the complete TO HIT roll: `(3d10) + Control + condition(s)` against the target’s `(3d10) + Ward + condition(s)`.
- Spells resolved through Renew the Heart use the approved save wording: `Renew the Heart save. On a failed save, apply the Signature Hex.`
- Printed Spell damage clauses now add Heart to the listed damage value. The added Heart portion is Standard damage unless a Spell specifically states otherwise; the printed damage amount retains its listed category and damage type.
- The Battles → To Damage → Damage Category now states that Heart-damage rule explicitly. The former empty `Damage − Guts = Total Damage` section heading is replaced by a visual formula and Selu example.
- Updated Site Update / BUILD / character export, package, README, changelog, patch-note, and PWA cache metadata to Beta 0.19; Game Update metadata advances to v0.08.

**Patch-note verification**

- Previous Site Update reviewed: Beta 0.18
- New Site Update: Beta 0.19
- Previous Game Update reviewed: v0.07
- New Game Update: v0.08
- Current GitHub baseline reviewed: Yes — `6a158f1a689a2624f6f8071bd8ec9219b6179ea2`
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: Node 22 execution audit of the canonical current-rules/data graph; all 86 current Spells checked for exactly one canonical `TO HIT` resolution; 41 printed Deal/Suffer Spell-damage clauses checked for `Heart +` inclusion; Fundamentals and full rule-neighbor navigation target audit; Game Update ordering/current-version audit; changed Vue script syntax checks; changed scoped-CSS parse checks; changed template tag-balance checks; repository-relative import scan; `git diff --check`.
- Not run: Full Vue/Vite production build and browser-based desktop/tablet/mobile runtime verification. Dependency installation was attempted with `npm install --no-package-lock --ignore-scripts` and timed out before dependencies were installed.
- Known unfinished work intentionally excluded: the four unresolved spell-design items already documented for later approval; Encounter Builder remains the existing placeholder.
