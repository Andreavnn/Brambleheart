**Brambleheart Beta 0.17 — Character Art Refresh**

**Site Update — Beta 0.17**
**Game Update — v0.01, Launch Patch**

- Replaces the supplied page-header character art for News, Character Roster, Rhythm Engine, Rules, and Settings while preserving the existing shared header behavior.
- Updates the Share Brambleheart promo art and removes the uploaded black background before applying it to the News card.
- Replaces the Muckling, Noxious Muckling, and Ember Dyrtle monster art, adding dedicated artwork for Noxious Muckling so all currently unlocked monster profiles have matching art.
- Replaces all 12 playable-species art assets with the supplied updated artwork and removes uploaded black backgrounds before applying them.
- Updates package/runtime/build/export/PWA/install-asset metadata to Site Update Beta 0.17 while Game Update remains v0.01.

Verification:
- Previous Site Update reviewed: 0.16
- New Site Update: 0.17
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: `node scripts/integrity-check.mjs` passed; `node scripts/persistence-check.mjs` passed. `npm run build` was not run because project dependencies were not installed in this environment. Live browser responsive testing was not completed.
- Known unfinished work intentionally excluded: None identified.
