**Beta 0.44 — Ability Chaining & Passive Trinkets**

- Updated the Axalori Heritage Traits Heartcurrent, Stillwater Renewal, and Harmonic Field to the supplied effect text; Resonant Pulse now uses the supplied damage-reduction wording and costs 2 Mana.
- Added Rhythm Engine → Ability Manager between Dice Roller and Encounter Builder. It can be used with no character for the general rules pool or with a saved character to narrow the compatible ability list, then filters that list against the selected Core Ability.
- Added Rules → Fundamentals → Stacking and Chaining as dedicated visual teaching pages showing multiple abilities layered onto one Core Ability and Reactive/triggered abilities chaining between characters.
- Standardized the Abilities teaching graphics so flow boxes share consistent sizing, and tied Basic Core Ability accent bars and ability pills to their Core Ability color families.
- Added Settings → Display → Logo Size with five size choices from Smallest through Largest; Largest preserves the previous site-logo size and remains the default.
- Replaced the Character Roster and Rules header character artwork with the supplied images, flipped those two header characters horizontally, and lowered shared page-header characters slightly to reduce navigation-bar clipping.
- Removed the subtitle/detail text beneath the News, Character Roster, Rules, and Rhythm Engine page titles.
- Replaced the numbered Trinket 1/Trinket 2 model with simple equipped Trinkets. Equipped Trinkets now apply their passive effects directly, and saved legacy slot/focus fields are discarded at the character normalization boundary instead of continuing through application logic.
- Removed Arcane Focus selection. Scriptweave Book and Caster Totem now apply their listed effects whenever equipped rather than requiring a separately selected active focus.
- Updated Rule Updates to v0.07 for the Axalori and Trinket rules changes and synchronized application BUILD/export, package, PWA cache, README, patch notes, and changelog metadata to Beta 0.44.

**Patch-note verification**

- Previous version reviewed: 0.43
- New version: 0.44
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: Not run. Dependency installation was attempted but timed out before typecheck/build could run.
- Known unfinished work intentionally excluded: Encounter Builder remains the existing placeholder; no Encounter Builder implementation was requested in this patch.
