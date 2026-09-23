**Brambleheart Beta 0.15 — Reference Typography, Header Artwork & Default Background**

**Site Update — Beta 0.15**
**Game Update — v0.01, Launch Patch**

- Renames the Brambleheart Lore child entry from Lore - Anthro Mundas to Anthro Mundas and aligns the Brambleheart Lore parent title/detail typography with FAQ and Changes & Updates.
- Replaces the supplied News, Character Roster, Rhythm Engine, Rules, and Settings page-header artwork while retaining the existing shared header placement, mirroring, and responsive rules.
- Replaces the News Share Brambleheart character artwork using the existing Share card presentation.
- Sets Ready For Adventure as the default site background for new/reset settings without overriding existing saved background choices.
- Updates package/runtime/build/export/PWA/install-asset metadata to Site Update Beta 0.15 while Game Update remains v0.01.

Verification:
- Previous Site Update reviewed: 0.14
- New Site Update: 0.15
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: `node scripts/integrity-check.mjs` passed; `node scripts/persistence-check.mjs` passed; supplied page-header/share artwork transparency and path checks passed. `npm run build` was attempted but could not run because `vue-tsc` is not installed in this environment. Live browser responsive testing was not completed.
- Known unfinished work intentionally excluded: The Ages of Anthro Mundas still has no supplied lore illustration and intentionally retains its placeholder.
