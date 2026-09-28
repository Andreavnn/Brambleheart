**Brambleheart Beta 0.19 — Species Asset Authority Fix**

**Site Update — Beta 0.19**
**Game Update — v0.01, Launch Patch**

- Removes the automatic lowercase filename behavior from playable-species artwork and makes Character Creation and Rules use one shared species-image mapping.
- Points Ardenn, Auravex, Axalori, Cethra, Ravari, Sauren, Tordan, Urnath, and Virelan at the newer case-sensitive image files already present in the repository instead of the older lowercase copies.
- Keeps Braelor, Hedgkin, and Rivkan on their existing lowercase images until matching replacement uploads exist, so the correction does not introduce broken art.
- Retires the obsolete lowercase duplicates for the nine species that now have replacement files.
- Updates package/runtime/build/export/PWA/install-asset metadata to Site Update Beta 0.19 while Game Update remains v0.01.

Verification:
- Previous Site Update reviewed: 0.18
- New Site Update: 0.19
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: `node scripts/integrity-check.mjs` passed; `node scripts/persistence-check.mjs` passed. `npm run build` was not run because project dependencies are not installed in this environment. Live browser/responsive testing was not performed.
- Known unfinished work intentionally excluded: Braelor, Hedgkin, and Rivkan do not currently have species-name-cased replacement image files in GitHub, so their existing lowercase assets remain authoritative for now.
