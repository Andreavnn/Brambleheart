**Brambleheart Beta 0.05 — Ability Templates & Reference Organization**

**Site Update — Beta 0.05**  
**Game Update — v0.01, Launch Patch**

- Consolidates Core Actions, monster Actions, and Monstrous Traits onto the shared Ability card template so matching action families use the same presentation and structured rule fields.
- Sorts Armor from lowest to highest Guts within each Armor category and adds spacing between Adventuring Item category menus.
- Separates Invocation Cantrips from Invocations and adds spacing between Lore spell presentation blocks.
- Moves Generic Monsters to the top of the Monsters reference and adds guidance introducing the deadlier creature categories that follow.
- Keeps Rhythm Engine Character Sheet Spells in a single column.
- Updates package/runtime/build/export/PWA/cache metadata to Site Update Beta 0.05; Game Update remains v0.01.

**Patch-note verification**

- Previous version reviewed: 0.04
- New version: 0.05
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: Repository integrity check; persistence regression check; TypeScript/Vue script syntax transpilation (74 source units); Vue template tag-balance audit (31 files); CSS parser validation across the global stylesheet and Vue style blocks. A full `vue-tsc`/Vite production build was not completed because this environment does not have the project dependencies installed and the offline npm cache is missing `@vitejs/plugin-vue`. Live browser responsive testing was not available in this environment.
- Known unfinished work intentionally excluded: None identified
