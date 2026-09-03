**Site Update — Beta 0.16**

- Removed the decorative site icon from the bottom of pages and tightened the page-to-footer spacing around the divider, utility buttons, and build label.
- Standardized current Ability UI terminology so Core-family pills display **CORE ACTION**, while Traits, Talents, Spells, and comparable Ability cards display a consistent **ABILITY** pill where applicable.
- Added distinct accent identities to Heritage and Cultural Trait cards and changed Cultural Traits away from the Magic/Spell purple family.
- Normalized page-header character positioning around the logo/header stage so the artwork does not shift down into page content when no background image is selected.
- Changed Settings → Display → Backgrounds to switch-style exclusive choices and made header spacing respond dynamically to the selected Logo Size.
- Added a Fundamentals-style section header and responsive Character Creation path graphic to Rules → Character Creation child pages.
- Standardized visible update labels to **Site Updates** and **Game Updates**.

**Game Update — v0.06**

- Retired **ROOT** as an active Ability keyword and removed it from current Traits and Talents.
- Removing ROOT does not change the affected Abilities’ printed costs, Triggers, Effects, requirements, or remaining keywords.
- Removed the former ROOT once-per-family-per-round restriction. Ability Chains remain bounded by the existing once-per-specific-Ability-instance rule.

**Patch-note verification**

- Previous Site Update reviewed: Beta 0.15
- New Site Update: Beta 0.16
- Previous Game Update reviewed: v0.05
- New Game Update: v0.06
- Current GitHub baseline reviewed: Yes — `c535bcf397257656f5f4efd5a6762923f0b57129`
- Source/diff reviewed: Yes
- Site/Game history separation checked: Yes
- Version metadata synchronized: Yes
- Tests actually run: Static source assertions, TypeScript syntax/semantic checks available without project dependencies, release/history checks, and repository-relative import audit. Full Vue/Vite production build and browser responsive runtime testing were not run in this environment.
- Known unfinished work intentionally excluded: Encounter Builder remains the existing placeholder.
