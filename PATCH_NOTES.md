# Brambleheart Beta 0.18 — Rules Authority & Presentation Corrections

**Site Update — Beta 0.18**

- Corrected the repeated Spell presentation failure at its source: Rules, Character Creation, Character Sheets, Level Up, and spell detail data now consume the canonical current-rules authority instead of importing the raw rules transcription directly. The already-approved Game Update v0.07 `TO HIT` and Spell balance changes therefore no longer depend on module initialization order.
- Corrected shared pill presentation. Cultural Traits that grant Skills now show only `SKILL`, `CULTURAL`, and `TRAIT`; Passive Traits no longer also show `ABILITY`; Talent and Spell Ability/type pills are placed in the lower card pill row rather than the title/cost area; and pill-style labels are consistently uppercase.
- Restored Rules navigation consistency. Dedicated Fundamentals pages now display the shared breadcrumb trail, Introduction uses the same Fundamentals presentation as Core Rules and related pages, Core Rules' back control returns directly to Introduction, and the obsolete Character Creation eight-step rule-page bar and redundant previous/next rule controls were removed.
- Removed the obsolete `Adventure Kit` category line and `Starting Adventure Kit` detail line from Adventure Kit item cards. Legacy saved Adventure Kit item entries are removed at the character normalization boundary so the package-level `adventureKit` state remains the single current representation.
- Updated Site Update / BUILD / character export, package, README, changelog, patch-note, and PWA cache metadata to Beta 0.18. Game Update remains v0.07 because this patch corrects consumption and presentation of the already-approved rules rather than introducing a new game-rule revision.

**Patch-note verification**

- Previous Site Update reviewed: Beta 0.17
- New Site Update: Beta 0.18
- Game Update: v0.07 (unchanged)
- Current GitHub baseline reviewed: Yes — `ece2a38e1487f89fcc610f68bbbc6250d1f3fa47`
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: TypeScript compilation of the changed current-rules/data/persistence graph; all 86 current Spells checked for `TO HIT`; Cultural Skill/Passive Trait pill-rule checks; representative legacy Adventure Kit storage migration followed by write → reload → read verification; Vue script syntax transpilation; repository-relative import and authority/reference scans.
- Not run: Full Vue/Vite production build and browser-based desktop/tablet/mobile runtime verification; the repository ZIP does not include installed dependencies, and the dependency-installation attempt timed out in this environment.
- Known unfinished work intentionally excluded: the four unresolved v0.07 Spell-design items already documented for later approval; Encounter Builder remains the existing placeholder.
