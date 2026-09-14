**Brambleheart Beta 0.09 — Presentation Architecture Repair**

**Site Update — Beta 0.09**  
**Game Update — v0.01, Launch Patch**

- Replaces neutral semantic Rules expandables with one shared expandable RuleFeature card component, restoring the established accent treatment to Spell and related rules-reference surfaces without adding cascade overrides.
- Separates Talent visual tone from visible keyword pills so requested keyword removals do not erase or change established Talent accent colors.
- Restores the Trinket accent through the shared equipment-presentation authority in Rules, Character Sheet Equipment & Gear, and the equipment shop.
- Moves Playable Species Lore, Heritage, and Cultural menus onto the shared expandable-card authority and removes their superseded duplicate menu CSS.
- Updates package/runtime/build/export/PWA/cache metadata to Site Update Beta 0.09; Game Update remains v0.01.

**Patch-note verification**

- Previous version reviewed: 0.08
- New version: 0.09
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: Repository integrity check; persistence regression check; TypeScript/Vue script syntax transpilation (70 source units); CSS parser validation; semantic-card visual/containment audit at 1280 px, 768 px, and 390 px plus light/dark/theme checks. Full `vue-tsc`/Vite production build not run because project dependencies are not installed in this environment and the dependency-install attempt timed out.
- Known unfinished work intentionally excluded: None identified
