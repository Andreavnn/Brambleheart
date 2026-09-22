**Brambleheart Beta 0.14 — Lore Navigation & Artwork Refresh**

**Site Update — Beta 0.14**
**Game Update — v0.01, Launch Patch**

- Reorganizes Rules › References around an expandable Brambleheart Lore parent and places the Anthro Mundas lore pages beneath it while keeping FAQ and Changes & Updates as separate reference entries.
- Removes the obsolete lore banner/placeholder layer and the retired Anthro Mundas banner asset so each lore page has one authoritative illustration area.
- Replaces the supplied Anthro Mundas, The Ancients, and Winds of Magic artwork and adds the supplied Hollowing Hallows, The Blight of the Undeath, and The Great Adventure illustrations.
- Leaves The Ages of Anthro Mundas on the same lore illustration layout with its placeholder until artwork is supplied.
- Updates package/runtime/build/export/PWA/install-asset metadata to Site Update Beta 0.14 while Game Update remains v0.01.

Verification:
- Previous Site Update reviewed: 0.13
- New Site Update: 0.14
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: `npm test` (repository integrity + persistence regression) passed; targeted TypeScript compilation of the updated rule catalog/release modules passed; supplied lore-image byte verification passed. `npm run build` was attempted but could not run because `vue-tsc` is not installed in this environment.
- Known unfinished work intentionally excluded: The Ages of Anthro Mundas still has no supplied lore illustration and intentionally retains its placeholder.
