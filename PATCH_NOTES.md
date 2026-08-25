# Brambleheart Beta 0.23 Patch Notes

## Character Creation Flow
- Character Name is required before leaving Choose Your Species.
- Culture Traits no longer use a separate Exchange/Add panel. Each selected Culture Trait has an Exchange action that opens the existing picker at that slot.
- Passive is presented with the lower keyword pills on Culture Trait cards rather than in the title actions.
- Empty Spark detail cards remain hidden until a Spark is selected.
- Wind-Touched and Gifted Heart now act as forward-navigation choices and immediately continue into the appropriate path flow.

## Homeland & Attributes
- Custom Homelands now collect their name, description, and two Skills directly on the Homeland step.
- Skill #1 follows the supplied Lore/Might/Prowess grouping (Prowess maps to the current Agility tree); Skill #2 follows Courage/Lore (Courage maps to Bravery).
- The Starting Skills step no longer exposes premade-Homeland replacement controls for custom Homelands.
- Attribute rows now give Rank/Modifier controls the larger panel and right-align Rank, Modifier, and +/- controls; Secondary Stats use the smaller panel.

## Talents, Gear & Currency
- Anchor Spirit and Battlebane are explicitly classified as Utility Talents.
- Threadpiece equivalencies now show `1 BP = 2 SP`; current balances are ordered WP → NP → SP → BP and always show the BP amount, including 0.
- Weapon Qualities are removed from Equipment & Gear purchase categories and are displayed as pill UI on weapons.
- Armor & Shields now includes the full supplied list: Leafsitch, Barkskin Vest, Briarhide, Roughscale, Root Weave, Heartguard, Earthforged Plate, Toughscale, Durtlehide, Runeforged Plate, Sapguard, Vinegrip, and Ironwood Bulwark.
- Equipment descriptions, mechanical effects, and supported purchase choices are carried by the equipment data model and shown in the purchase window.
- Armor Might requirements are enforced when adding new armor.

## Review & Rules Application
- Armor/Shield Guts bonuses are cumulative and appear in Review-derived Guts.
- Armor Mana Syphon is included in displayed spell Mana costs.
- Review Character Name and Campaign are readonly by default with per-field `(Change)` / `(Lock)` controls.
- Weapon/Armor tables are reduced on wider screens; narrow screens use left/right scroll buttons with hidden scrollbars.
- Review Talents, Lore/Spells, and other rule boxes retain their category/lore colors and standard title-bar treatment across themes.
- Starting Language cards remain equal height; the selected additional Language receives a pill.

## Release Integrity
- Beta/build/package/PWA markers are synchronized to 0.23 / 0.23.0.
- This patch is based on current GitHub main commit `a0ef8c507e1ebda7404018ce63026f8327225ad2` (Beta 0.22).
