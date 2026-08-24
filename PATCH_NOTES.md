# Brambleheart Beta 0.17 Patch Notes

## Rhythm Engine & Character Sheet
- Renamed Attribute Check to Dice Roller throughout the Rhythm Engine and local-data Settings copy.
- Rebuilt the Rhythm Engine Character Sheet with the same Review/Character Sheet layout used by the final Character Creation step, including Attributes, secondary statistics, Weapons, Armor & Shields, Skills, Magic, Talents, and Equipment & Gear.

## Rules Organization
- Renamed Recent & Common Rules to Recent and removed the History + quick access subtitle.
- Reorganized Heritage Traits, Cultural Traits, Talents, and Spells into the same card language used during Character Creation, with expandable/collapsible categories.
- Talent rules now use the Character Creation categories: Offensive Combat, Defensive Combat, Magic, Movement, Survival, Social, and Utility.
- Reorganized The Watcher so Critters & Companions live in their own parent category and Monsters are grouped by category, then by base monster type and variants.
- Added The Battles → Area of Effect as the authoritative battle-grid reference for Line, Cone, Orb, Direct Casting, and Impassable Collision using the supplied rulebook diagrams.
- Winds of Magic → Spell Rules now links to the Area of Effect page rather than duplicating the full geometry rules.
- Removed false Mana cost pills from non-mana rule cards and corrected Mana COST parsing.

## Character List
- Fixed character approval so completed characters reliably move between Unapproved and Approved lists after persistence.
- Converted Approved, Unapproved, and Incomplete lists into connected expandable panels.
- Removed empty floating group messages such as “No approved characters yet.”

## Display, Backgrounds & Navigation
- Added detail text to the Donation Settings section.
- Combined the global page-tool buttons and build detail into one footer bar with tighter spacing.
- Corrected Dark Mode so it no longer darkens the selected background artwork.
- Added a View Background / Show Page button beside the WIP banner to temporarily hide page content and expose the selected background.
- Hardened rule-banner discovery so files such as `Banner_AthroMundas.png` are matched by normalized page title/slug naming.

## Baseline Cleanup
- Updated the in-app Site Changelog through Beta 0.17 and removed the stale Beta 0.14 CURRENT marker.
- Corrected README version/focus drift.
- Removed inactive legacy Encounter source files that were already absent from active routing.
- Advanced visible build, character export, character-list export, and PWA shell cache markers to Beta 0.17.
