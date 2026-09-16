**Brambleheart Beta 0.09 — Character Sheet, Level Up & Reference Alignment**

**Site Update — Beta 0.09**  
**Game Update — v0.01, Launch Patch**

- Monster Profile Action and Monstrous Trait cards now flow independently inside their respective two-column layouts, and Monster index links show Threat Level detail where a profile exists.
- Level Up now uses the Character Sheet-style central content column, places the character name beneath the Level Up heading, and retains the current interactive advancement controls inside that shared presentation.
- Character Sheets now include a compact Level Up control beside Campaign, and the Dice Roller uses the selected character’s saved Character Sheet accent color.
- Saved Encounters now reuse the Character Roster icon-action presentation for Edit, Lock, Approval, Copy, and Delete where applicable.
- The Ancients now follows Lore - Anthro Mundas in reference navigation and uses the supplied expanded Ancient-civilization and Threadpiece lore.
- The Attacking & Defending comparison graphic has additional separation before Tie Goes to the Defender.
- Game Update v0.02 has been consolidated into the v0.01 Launch Patch; there is again one canonical Game Update entry.
- Updates package/runtime/build/export/PWA/install-asset metadata to Site Update Beta 0.09 while Game Update is v0.01.

Verification:
- Previous Site Update reviewed: 0.08
- New Site Update: 0.09
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: `npm test` (repository integrity + persistence regression); TypeScript/Vue script syntax transpilation (75 source units); changed-Vue template tag-balance audit (3 files); CSS parser validation (20 stylesheet blocks); relative-import audit (78 source files); static responsive CSS audit at 1280 px, 768 px, and 390 px. Full `vue-tsc`/Vite production build was not completed because `vue-tsc` is not installed in this environment. Live browser visual testing was not completed.
- Known unfinished work intentionally excluded: None identified
