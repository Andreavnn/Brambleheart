**Brambleheart Beta 0.10 — Card Flow & Character Sheet Cleanup**

**Site Update — Beta 0.10**  
**Game Update — v0.01, Launch Patch**

- Removes Character Sheet bag drag-and-drop and returns supported bags to the normal Equipment & Gear card flow without deleting legacy saved container assignments.
- Adds orange left/right under-construction accents to The Role-Play, The Watcher, and Encounter Builder navigation controls.
- Introduces one shared independent-height card-column presentation and reuses it across repeated card lists, including Complete Core Actions, Talents, Species Traits, Spell Keywords, Sparks, Deeds, Adventuring Items, Experience methods, narrative references, Character Creation and Level Up review cards, Monster Profile cards, Character Sheet Skills/Trinkets, and Character Sheet Equipment & Gear.
- Removes superseded Monster-specific column layout code and obsolete grid selectors replaced by the shared column authority.
- Slightly enlarges the Character Sheet Level Up control without changing the surrounding Campaign field layout.
- Updates package/runtime/build/export/PWA/install-asset metadata to Site Update Beta 0.10 while Game Update remains v0.01.

Verification:
- Previous Site Update reviewed: 0.09
- New Site Update: 0.10
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: Repository integrity check; persistence regression check; TypeScript/Vue script syntax transpilation (76 source units); Vue template tag-balance audit (33 files); CSS parser validation (21 stylesheet blocks); relative-import audit (79 source files); static responsive audit at 1280 px, 768 px, and 390 px. A full vue-tsc/Vite production build could not be run because project dependencies are not installed and the offline npm cache does not contain @vitejs/plugin-vue. Live browser visual testing was not completed.
- Known unfinished work intentionally excluded: None identified
