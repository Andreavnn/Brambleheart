**Beta 0.45.2 — Rules Navigation & Core Actions Presentation**

- Renamed Rules → Fundamentals → Abilities to **Core Actions** and reorganized its teaching sections: Core Actions & Abilities now defines Actions, **Abilities** defines Ability behavior, and the examples are labeled **Action & Ability Example**, **Reaction Example**, and **Chaining Abilities**. The reference section is now simply **Core Actions**.
- Updated Core Action reference-card accent bars to derive from the same action-family color authority used by the pill UI, so Instinct, Move, Touch, Shoot, Magic, Reaction, and Passive cards match their corresponding pills.
- Removed category landing/parent pages from every expandable Rules chapter menu. The landing routes remain available for navigation/search where needed, but they are no longer duplicated inside their own chapter menus.
- Added a **Woodlands** subcategory under Playable Species and placed the current Species list within it. Removed the repeated “lore, Heritage Traits, Culture Traits, and language” subtitle from individual Species entries.
- Restyled individual Species lore panels to visually match the Character Creation Step 1 information panels while retaining the existing Species page structure, the artwork beside the quote on wider screens, and the current Heritage Traits and Cultural Traits sections.
- Updated BUILD/export, package, and PWA cache metadata to Beta 0.45.2. Rule Updates remains v0.08 because this patch changes presentation/navigation rather than game mechanics.

**Patch-note verification**

- Previous version reviewed: 0.45.1
- New version: 0.45.2
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: TypeScript semantic checks for the changed Rules catalog/release data; TypeScript syntax transpilation for FundamentalsRuleView, RuleReaderView, and RulesView; runtime assertions for the Core Actions page metadata, Woodlands Species grouping, Species subtitle removal, and core-actions route alias; source assertions for requested section titles/menu cleanup; shared action-family color checks; release/version integrity checks; repository-relative import scan. Dependency installation was attempted but failed with `EAI_AGAIN` because the npm registry was unreachable, and `npm run build` could not run because `vue-tsc`/Vite dependencies are not installed. Browser-responsive runtime testing was therefore not performed.
- Known unfinished work intentionally excluded: Encounter Builder remains the existing placeholder.
