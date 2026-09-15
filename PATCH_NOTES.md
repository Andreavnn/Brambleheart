**Brambleheart Beta 0.07 — Installed App, Equipment & Glop Refinement**

**Site Update — Beta 0.07**  
**Game Update — v0.02, Dual Wielding & Sapguard**

- Opens installed sessions on News, versions the PWA manifest/icon URLs, and refreshes install metadata only when Brambleheart is open.
- Moves Cloak of Windweave into Traveler’s Gear and routes Rules Adventuring Item price badges through the canonical equipment-price authority.
- Replaces Character Sheet item-cost badges with quantity badges while retaining Trinkets in Equipment & Gear and their persisted attachment controls.
- Moves Spell Mana calculation detail below the Mana badge at the right side of the shared Spell header.
- Changes the current Skill name from Whisperster to Whisperstep across rules/data while migrating legacy saved Whisperster values into the new canonical name.
- Updates Glop so Gelatinous Bash exposes Trigger, Declare, Effect, TO HIT, Damage, and Restrictions; Reconstitute requires below 5 Health; Slick Trail affects the last traversed square; and Gelatinous Body prevents forced movement, disarm, grapple, and pin effects.
- Updates package/runtime/build/export/PWA/cache metadata to Site Update Beta 0.07. Game Update remains v0.02.

**Patch-note verification**

- Previous version reviewed: 0.06
- New version: 0.07
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: `npm test` (repository integrity + persistence regression); TypeScript/Vue script syntax transpilation (74 source units); Vue template tag-balance audit (31 files); CSS parser validation (19 stylesheet blocks); manifest JSON validation; service-worker JavaScript syntax validation; relative-import audit; Adventuring Item catalog cost/grouping verification; static responsive layout audit at 1280 px, 768 px, and 390 px. Full `vue-tsc`/Vite production build was not completed because the offline npm cache does not contain `@vitejs/plugin-vue`. Live browser visual testing was not completed.
- Known unfinished work intentionally excluded: None identified
