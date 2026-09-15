# Brambleheart Beta 0.07 — Installed App, Equipment & Glop Refinement

## Application & Presentation

- Opens installed Brambleheart sessions on News and refreshes versioned manifest/icon resources only while the application is open, without adding background polling.
- Moves Cloak of Windweave from Tools to Traveler’s Gear and keeps Adventuring Item price badges resolved from the canonical equipment catalog when cards are collapsed or expanded.
- Replaces Character Sheet Equipment & Gear cost badges with per-entry item quantities while retaining Trinkets and their supported attachment controls.
- Moves Spell Mana calculation detail beneath the Mana badge on the right side of the shared Spell header.
- Renames current Skill references from Whisperster to Whisperstep while preserving migration of older saved characters at the persistence boundary.
- Refines Glop Action and Monstrous Trait wording and behavior for Gelatinous Bash, Reconstitute, Slick Trail, and Gelatinous Body.

## Reliability

- Keeps install-update checks tied to application load rather than timers or background-sync behavior.
- Extends regression checks for the installed-app launch route, versioned install assets, equipment pricing/quantity presentation, Whisperstep migration, Spell cost layout, and Glop rule structure.
- Synchronizes Site Update, package, runtime/export, downloadable instructions, and PWA cache metadata at Beta 0.07 while retaining Game Update v0.02.

# Brambleheart Beta 0.06 — Compact Equipment & Character Reference Refinement

## Application & Presentation

- Makes the shared Equipment card compact and expandable by default so Adventuring Items and Character Sheet gear keep independent heights while retaining the existing full detail presentation when opened.
- Adds editable attachment controls to compatible Character Sheet Trinkets and keeps attached spell Trinkets synchronized with live pill markers on their Spell cards.
- Separates Character Sheet Mana calculation detail from the Mana badge and removes the duplicate inline Signature marker from shared Spell titles.
- Expands Watcher monster profile presentation with structured Creature-facing Actions and Monstrous Traits plus a reusable monster-art frame and fallback placeholder.

## Reliability

- Extends the existing shared RuleFeatureCard/EquipmentCard and SpellCard authorities instead of adding page-specific replacements, so future equipment and Spell additions inherit the same behavior automatically.
- Synchronizes Site Update, package, runtime/export, downloadable instructions, and PWA cache metadata at Beta 0.06 while Game Update advances to v0.02.

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
