# Brambleheart Beta 0.05 — Ability Templates & Reference Organization

## Rules & Presentation

- Consolidates Core Actions, monster Actions, and Monstrous Traits onto the shared Ability card authority so monster abilities inherit the same action fields, accents, and keyword treatment as their parent action types.
- Normalizes the current Glop Action and Monstrous Trait text into structured Trigger, Target, To Hit, Damage, Effect, and Cooldown fields where applicable.
- Sorts Armor entries from lowest to highest Guts within each armor category and adds separation between Adventuring Item category menus.
- Separates Invocation Cantrips into their own category, labels the remaining Invocation spells as Invocations, and adds spacing between Lore spell presentation blocks.
- Moves Generic Monsters to the top of the monster reference and adds guidance introducing the deadlier creature categories that follow.
- Keeps Rhythm Engine Character Sheet Spells in a single-column layout.

## Reliability

- Reuses the shared Ability card instead of maintaining a parallel Core Action renderer and removes the Monster-only trait color override that could diverge from canonical ability tones.
- Extends repository regression coverage for Ability-card authority, Invocation grouping, Armor ordering, monster-category order, menu spacing, and Character Sheet Spell layout.
- Synchronizes Site Update, package, runtime/export, downloadable instructions, and PWA cache metadata at Beta 0.05 while retaining Game Update v0.01, Launch Patch.

# Brambleheart Beta 0.04 — Presentation Templates & Magic/Monster Layout Alignment

## Application & Presentation

- Establishes additional shared presentation templates for reusable Ability, Equipment, and Trait cards so Rules, Character Creation, Character Sheets, and Monster references use the same default boxes for related content.
- Moves Lore of Magic pages to a signature-spell-first layout, places the remaining Lore Spells inside a collapsible menu, and keeps those Spell cards in a single-column presentation.
- Changes Rhythm Engine Character Sheet Magic to a single-column Spell layout and prevents Character Sheet Equipment & Gear cards from stretching to the height of adjacent cards.
- Reworks Watcher monster profiles so Actions and Monstrous Traits render in the matching ability-style cards and renames the old Special Rules section to Monstrous Traits.
- Enlarges the Spell Range demo squares so Caster and Point labels fit cleanly and corrects the ORB area graphic to match the documented example.

## Reliability

- Extends shared-card authority coverage to reduce future box-format drift when new content is added or when custom data is loaded.
- Synchronizes Site Update, package, runtime/export, downloadable instructions, and PWA cache metadata at Beta 0.04 while retaining Game Update v0.01, Launch Patch.

# Brambleheart Beta 0.03 — Character Sheet & Reference Alignment

## Character Sheet & Rules Presentation

- Aligns Rhythm Engine Character Sheet Talents and Known Spells with the same shared card presentations used by their related Rules pages, including consistent headers, accents, rule-detail rows, badges, and keyword pills.
- Aligns Character Sheet Equipment & Gear cards with the Rules equipment presentation by preserving the shared item-card surface, header badge, descriptive fields, and equipment accent instead of applying Character Sheet-only card overrides.
- Displays Known Spells on individual Lores of Magic pages in one column while retaining the shared Spell card authority used elsewhere.
- Gives the Adventurer Oath detail content the full width of its inner detail area, restores interior padding for Talent text, and uses the common Adventuring Item accent for Trinkets.
- Removes the visible Character Accent Color label from the Character Sheet while retaining an accessible label on the color picker.

## Reliability

- Establishes one shared Talent card authority across Rules, Character Creation, and Character Sheets and removes superseded Character Sheet Talent presentation paths.
- Extends repository regression checks for shared Talent, Spell, and equipment presentation, Lore-page column behavior, Adventurer Oath layout, Trinket accent consistency, and the Character Sheet accent control.
- Synchronizes Site Update, package, runtime/export, downloadable instructions, and PWA cache metadata at Beta 0.03 while retaining Game Update v0.01, Launch Patch.
