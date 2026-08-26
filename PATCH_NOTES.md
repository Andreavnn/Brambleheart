# Brambleheart Beta 0.26 Patch Notes

## Character Creation & Review
- Shared Heritage/Cultural Trait, Talent, and Spell title bars now use one full-width layout authority. The conflicting width rules that caused the right edge to stop short were removed, and the generic content-width clamp no longer constrains Trait title bars.
- Rank and Modifier labels in Distribute Attributes now use the same label treatment as Secondary Stats.
- Starting Skills shows a Homeland source pill for every Skill granted by the selected Homeland, whether the Homeland creates Rank 1 or raises an existing Cultural rank.
- Starting wealth is 2 SP. Returning the Adventure Kit adds 1 SP.
- Equipment & Gear separates Shields into their own purchase tab. Armor and Shields remain compatible with existing saved characters.
- Both Review Character `(Change)` controls include the requested two-space separation.
- Weapon Review range ignores Thrown(x) when determining range; a weapon with only Thrown(x) displays Touch while Thrown(x) remains under Properties / Notes.
- Armor/Shield profile parsing supports both current labeled profiles and legacy positional profiles. Total Mana Syphon from equipped armor/shields is added to the Mana cost of every known spell.
- Review Equipment & Gear weight now totals only purchased Weapons, Armor/Shields, and other items in the Equipment & Gear list; the Adventure Kit no longer contributes an additional hidden 15 lb.

## Settings
- Removed `Display settings are preserved by Reset Data` from the Reset Local Data menu text.
- Reset Custom, Reset Characters, and Reset Data remain in one action row; the row stacks beneath its descriptive text on narrow screens without splitting the three buttons.

## Release Integrity
- Visible build, package version, character export version source, PWA cache, README, patch notes, repository changelog, and in-app changelog are synchronized to Beta 0.26 / 0.26.0.
- This patch is based on current GitHub `main` commit `f319aaa0be0d17b3131348cb7602de9f89b4fd88` (Beta 0.25 plus the Node runtime correction).
- `package.json` retains the exact runtime constraint `"node": "22.x"`.
- Static source-integrity checks were performed during packaging. A production Vite/vue-tsc build and live browser responsive/persistence test are not claimed because repository dependencies are not installed in the available runtime.
