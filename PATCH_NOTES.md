# Brambleheart Beta 0.41 Patch Notes

Baseline: GitHub `main` commit `eacd197438f6740ab3df9c0e9412cb03e17717fd` (Beta 0.40.0).

## Rule Updates v0.06
- A character may equip one Trinket in the dedicated Trinket slot and one additional Trinket in place of the Shield slot. The second Trinket no longer consumes a generic Armor & Shield slot.
- Journey Knot now reads: `While equipped and attached to a weapon, gain condition [+1] to one TO HIT roll made with that weapon.`
- Barkskin Vest gains Mana Syphon `[+1]`.
- A character that finishes creation with zero remaining Threadpieces is saved with 10 wp. The 10 wp is applied only when `Create Character (Finished)` completes creation and is not displayed during the Equipment or Review steps.
- Instinct abilities use the timing printed by the ability, including start- or end-of-round timing. During a character’s turn, eligible abilities may be performed in any order unless an ability states otherwise.

## Character Creation & Character Management
- Moves Oath & Faith immediately after Homeland, with Attributes and Skills following it.
- Groups the Species dropdown into `Woodlands` and `Custom` while retaining one select control.
- Removes `AGI MOD` from the visible creation Speed equation.
- Adds Settings → Display → Tip. When off, Character Creation help/detail panels start collapsed; the default remains on.
- Locked characters cannot enter edit or Level Up workflows. Roster actions are disabled and direct-route guards enforce the same rule.
- Replaces the Character Roster Filter text button with a compact filter icon.

## Equipment & Character Sheet
- Displays two equal Trinket cards beneath Armor & Shield: the dedicated Trinket slot and the Shield / Trinket slot.
- Displays Character Sheet Talents in one column.
- Removes the generic `Mechanical effect listed below.` placeholder.
- Replaces the Equipment & Gear category scrollbar with left/right arrow controls.

## Navigation, News & Presentation
- Adds `News` before Character Roster in primary navigation. News uses the existing changelog and Rule Updates authorities rather than a second update catalog.
- Rule Updates keeps only the current update expanded by default and archived entries collapsed.
- Enlarges and centers the footer Brambleheart icon and updates the global work-in-progress banner text.
- Removes underlining from the Rules Layout Test previous/next controls.

## Rules Layout Preview — Abilities
- Removes Selu avatar/name markers and arrows from the teaching graphics while retaining Selu in supporting example text.
- Equalizes graphic panels, centers the economy flow, and adds an example Speed value with numbered movement squares.
- Clarifies Instinct round timing and any-order use of eligible turn abilities.
- Colors Core Ability reference-card top borders by ability family.

## Release Integrity
- BUILD/export: `0.41`
- package version: `0.41.0`
- PWA cache: `v0.41`
- Rule Updates: `v0.06`
- Repository and in-app Site Changelog continue to use `CHANGELOG.md` as the release-history authority.
