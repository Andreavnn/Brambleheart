**Brambleheart Beta 0.04 — Presentation Templates & Magic/Monster Layout Alignment**

**Site Update — Beta 0.04**  
**Game Update — v0.01, Launch Patch**

- Establishes additional shared presentation templates for reusable Ability, Equipment, and Trait cards so Rules, Character Creation, Character Sheets, and Monster references draw from the same default box authorities.
- Moves Lore of Magic pages to a signature-spell-first layout and places the remaining Lore Spells inside a collapsible menu while keeping the single-column Spell presentation.
- Changes Character Sheet Magic to a single-column Spell layout and prevents Equipment & Gear cards from stretching to match the height of neighboring cards.
- Reworks Watcher monster profile entries so Actions and Monstrous Traits render in the matching ability-style cards, and renames the monster rules section from Special Rules to Monstrous Traits.
- Enlarges the Spell Range demonstration squares to improve the Caster and Point labels and corrects the ORB area graphic to match the documented 7 × 7 example.
- Updates package/runtime/build/export/PWA/cache metadata to Site Update Beta 0.04; Game Update remains v0.01.

**Patch-note verification**

- Previous version reviewed: 0.03
- New version: 0.04
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: Repository integrity check; persistence regression check; TypeScript/Vue script syntax transpilation (74 source units); CSS parser validation (19 style blocks). Full `vue-tsc`/Vite production build was not completed because dependency installation timed out in this environment. Live browser responsive testing was not available in this environment.
- Known unfinished work intentionally excluded: None identified
