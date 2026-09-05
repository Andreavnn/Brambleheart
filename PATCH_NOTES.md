# Brambleheart Beta 0.17 — Rules Presentation & Game Data Update

**Site Update — Beta 0.17**

- Restored breadcrumb navigation beneath the main Rules navigation and removed the redundant previous/next navigation controls from Rules pages.
- Applied the established Core Rules section-header/card presentation to the remaining Rule Reader pages without altering the dedicated Core Rules, Attributes & Skills, or Core Actions layouts.
- Restored Species-page detail summaries while keeping those summaries hidden from the expandable Playable Species menu; removed the Woodlands Species-count subtitle.
- Standardized pill UI text to uppercase across shared presentation surfaces.

**Game Update — v0.07**

- Updated all 60 Heritage and Cultural Traits for the 12 current Woodlands Species from the approved v0.16 Species Trait document.
- Renamed the Fundamentals section The Core Roll to The Rhythm Engine.
- Added the global rule that effects from the same named Ability or Spell do not stack unless a more specific rule says otherwise.
- Added an explicit TO HIT resolution to all 86 current Spells and standardized Automatic, Magical Strike, Renew the Heart, and mixed Strike + Renew resolution.
- Applied the approved Spell balance pass across Flames, Wilds, Oaths, Frost, Hallows, Harmony, Life, and Invocation, including the universal one-active-summon rule.
- Intentionally left unresolved spell-design decisions unchanged: Deathly Shadow Empower, Orb of Impurity damage/outcome order, Spectral Hand manipulation range, and Spectral Grasp Empower redesign.

**Patch-note verification**

- Previous Site Update reviewed: Beta 0.16
- New Site Update: Beta 0.17
- Previous Game Update reviewed: v0.06
- New Game Update: v0.07
- Current GitHub baseline reviewed: Yes — `ecef3ea94b93f48dfea874526cdeda324c6514d5`
- Source/diff reviewed: Yes
- Species Trait source reviewed: Yes — supplied 18-page v0.16 trait document
- Version metadata synchronized: Yes
- Tests actually run: TypeScript compilation of the current-rules spell authority and dependencies; 86-spell TO HIT/Hex validation; Vue script syntax transpilation; Species Trait count/name verification; release/version checks; repository-relative import scan using the available repository scaffold.
- Not run: Full Vue/Vite production build and browser-based desktop/tablet/mobile runtime verification.
- Known unfinished work intentionally excluded: the four unresolved spell-design items listed above; Encounter Builder remains the existing placeholder.
