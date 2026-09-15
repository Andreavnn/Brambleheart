**Brambleheart Beta 0.08 — Inventory Containers & Level Up Alignment**

**Site Update — Beta 0.08**  
**Game Update — v0.02, Dual Wielding & Sapguard**

- Gives Watcher monster Actions and Monstrous Traits independent heights and thinner category headers; Gelatinous Bash now uses Trigger, Target, To Hit, and Damage, while Gelatinous Body exposes its forced-movement immunity as Formless.
- Changes Character Sheet Equipment quantities to plain `x N` detail text and adds persistent Traveler’s Pack / Forager’s Satchel containers with full-width placement, contained-item count/weight summaries, and drag-and-drop inventory movement.
- Adds spacing between the Attacking & Defending comparison graphic and Tie Goes to the Defender.
- Reuses one shared interactive Attribute graphic for Character Creation and Level Up; Level Up known Skills and Talents now use expandable menus and unused spell capacity highlights its maximum value.
- Removes the Level Up Signature Known status and Equip/Equipped controls, and aligns owned Level Up gear with the shared EquipmentCard presentation while keeping Sell in the header.
- Updates package/runtime/build/export/PWA/cache metadata to Site Update Beta 0.08. Game Update remains v0.02.

**Patch-note verification**

- Previous version reviewed: 0.07
- New version: 0.08
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: `npm test` (repository integrity + persistence regression); TypeScript/Vue script syntax transpilation (75 source units); Vue template tag-balance audit (32 files); CSS parser validation (20 stylesheet blocks); manifest/package JSON validation; service-worker JavaScript syntax validation; relative-import audit; static responsive layout audit at 1280 px, 768 px, and 390 px. Full `vue-tsc`/Vite production build was not completed because dependency installation timed out after 90 seconds and no `node_modules` installation completed. Live browser visual/drag testing was not completed.
- Known unfinished work intentionally excluded: None identified
