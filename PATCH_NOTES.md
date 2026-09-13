**Brambleheart Beta 0.08 — Talent Pass & Reference Polish**

**Site Update — Beta 0.08**  
**Game Update — v0.01, Launch Patch**

- Refines Character Sheet customization with a compact rainbow accent control, a Health-sized Mana Pool tracker that centers and wraps in rows of ten, and Rules-style Equipment & Gear cards.
- Replaces the Character Creation-only Tips setting with **Menus Expanded**, a site-wide collapsible-menu option that defaults off.
- Rebalances Rules presentation for Weapon/Armor/Shield tables, Known Spells, Playable Species expandable headings, Lore accents, Spell Range, Healing braces, and the Adventurer Oath card.
- Standardizes shared pills so Core Actions display `CORE`, Heritage traits display `HERITAGE`, Cultural traits display `Cultural`, and redundant `TRAIT`/Species pills are removed from Cultural traits.
- Updates the canonical Talent roster and presentation for the requested category moves, Sure Paw rename, Rooted Paws retirement, keyword removals, Hearth Touch/Threadseer/Second Chances/Victory Roar changes, Keen Edge prerequisite, and Pack Tactics Mana cost.
- Refines Glop with shared Character Sheet Attribute presentation, collapsible Actions/Special Rules, cleaned action/passive pills, and the Reconstitute Instinct action.
- Keeps gameplay/rules changes in the single consolidated Game Update v0.01 Launch Patch rather than duplicating them in Site Changelog history.
- Updates package/runtime/build/export/PWA/cache metadata to Site Update Beta 0.08.

**Patch-note verification**

- Previous version reviewed: 0.07
- New version: 0.08
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: Repository integrity check; persistence regression check; TypeScript/Vue script syntax transpilation (68 source units). Full `vue-tsc`/Vite production build not run because project dependencies are not bundled and npm registry access failed with `EAI_AGAIN`. Responsive browser testing was not available in this environment.
- Known unfinished work intentionally excluded: None identified
