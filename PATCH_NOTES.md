**Brambleheart Beta 0.18 — Species Artwork Presentation Cleanup**

**Site Update — Beta 0.18**
**Game Update — v0.01, Launch Patch**

- Removes the Character Creation species-image gradient, black border, rounded clipping, and overflow treatment so replacement artwork is presented without site-applied background effects.
- Removes the tinted species-art background from Rules › Playable Species pages so transparent artwork uses the normal page surface.
- Removes the duplicate Character Creation species border override and stale Rules-reader species frame styling so the shared stylesheet is the single species-art layout authority.
- Updates package/runtime/build/export/PWA/install-asset metadata to Site Update Beta 0.18 while Game Update remains v0.01.

Verification:
- Previous Site Update reviewed: 0.17
- New Site Update: 0.18
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: `node scripts/integrity-check.mjs` passed; `node scripts/persistence-check.mjs` passed. `npm run build` was attempted but could not run because `vue-tsc` is not installed in this environment. Live browser responsive testing was not completed.
- Known unfinished work intentionally excluded: None identified.
