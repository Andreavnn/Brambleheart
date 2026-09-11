**Brambleheart Beta 0.06 — Character State & Watcher Foundations**

**Site Update — Beta 0.06**  
**Game Update — v0.02, Bound Equipment**

- Adds persistent interactive Health to Rhythm Engine Character Sheets and applies the current Wounded, Critical, and Last Breath Conditions automatically to Dice Roller rolls for the selected character.
- Expands Encounter Builder into an approval-oriented workflow with incomplete/unapproved/approved states, lock/unlock, approval, copy/edit/delete controls, and selectable trap/environment Battlefield foundations.
- Refines Character Sheet identity, Threat Point, Skills, Trinkets, weapon/armor sizing, carried-item weight, Threadpiece, and spell Mana-breakdown presentation.
- Restores Homeland Related Skills and Oath list consistency, improves Equipment tables and Durtlehide presentation, adds dynamic Lore links, corrects the Spell Range/Healing graphics, and restores the requested Watcher previous/next sequence.
- Adds reusable Watcher monster-profile groundwork and the first complete Glop profile with Attributes, derived statistics, Actions, Special Rules, and Keywords.
- Changes Scriptweave Book to bind its Mana reduction and added cooldown to one selected known Lore Spell, and establishes Durtlehide’s selected elemental Resistance rule.
- Updates Selu of the Wandering Reeds’ campaign to **Verdant Secrets**.
- Updates package/runtime/build/export/PWA/cache documentation metadata to Site Update Beta 0.06 and Game Update v0.02.

**Patch-note verification**

- Previous version reviewed: 0.05
- New version: 0.06
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: `npm run test:integrity` (passed); `npm run test:persistence` (passed); TypeScript/Vue script syntax transpilation across 67 source units (passed). Full `vue-tsc`/Vite production build not run because npm registry resolution failed with `EAI_AGAIN`.
- Known unfinished work intentionally excluded: Full production build and live desktop/tablet/mobile browser verification could not be performed in this environment because project dependencies are not installed and npm registry resolution is unavailable.
