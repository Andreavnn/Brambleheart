**Brambleheart Beta 0.06 — Compact Equipment & Character Reference Refinement**

**Site Update — Beta 0.06**  
**Game Update — v0.02, Dual Wielding & Sapguard**

- Makes shared Equipment cards compact and expandable by default across the Rules reference, Character Creation review, and Character Sheet; adjacent item cards keep independent heights.
- Keeps Trinkets in the Character Sheet Trinket area and also includes them in Equipment & Gear, where compatible Trinkets can change their attachment target and persist that change.
- Removes the inline Signature marker from shared Spell titles, separates Mana calculation details from the Mana pill, and displays attached spell Trinkets as live pills.
- Adds a reusable monster-art frame with a fallback placeholder and expands Glop Actions and Monstrous Traits with structured Creature-facing Triggers, Effects, TO HIT, Restrictions, and Cooldowns where applicable.
- Adds the Dual Wielding rules reference above Makeshift Weapons and marks Sapguard with its table note in Armor & Shields.
- Game Update v0.02 adds Mana Syphon [+1] while dual wielding and clarifies Sapguard use while wielding a weapon in each hand.
- Updates package/runtime/build/export/PWA/cache metadata to Site Update Beta 0.06 and Game Update v0.02.

**Patch-note verification**

- Previous version reviewed: 0.05
- New version: 0.06
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: Repository integrity check; persistence regression check; TypeScript/Vue script syntax transpilation (74 source units); Vue template tag-balance audit (31 files); CSS parser validation (19 stylesheet blocks); responsive CSS audit at 1280 px, 768 px, and 390 px for the changed equipment and monster layouts. A full `vue-tsc`/Vite production build was not completed because dependency installation timed out in this environment. Live browser visual testing was not completed in this environment.
- Known unfinished work intentionally excluded: None identified
