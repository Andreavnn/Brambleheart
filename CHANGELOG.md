# Brambleheart Beta 0.08 — Inventory Containers & Level Up Alignment

## Application & Presentation

- Gives Watcher monster Actions and Monstrous Traits independent card heights and reduces the height of their category title bars.
- Refines Glop so Gelatinous Bash uses Trigger, Target, To Hit, and Damage without the former free movement effect, while Gelatinous Body separates its forced-movement immunity into a dedicated Formless field.
- Reworks Character Sheet Equipment & Gear quantities as plain detail text and introduces persistent Traveler’s Pack / Forager’s Satchel inventory containers that span both columns, report contained item count and weight, and accept drag-and-drop item movement.
- Adds separation between the Attacking & Defending comparison graphic and the Tie Goes to the Defender card.
- Reuses the Character Creation interactive Attribute graphic for Level Up, places known Skills and Talents in expandable menus, highlights unused Magic spell capacity, and removes the redundant Signature Known status.
- Aligns Level Up Equipment & Gear with the shared Character Sheet equipment cards, removes Equip/Equipped controls, and places the existing Sell action in the card header.

## Reliability

- Extracts the interactive Attribute display into one shared component used by both Character Creation and Level Up rather than maintaining separate renderers.
- Adds stable inventory identifiers and a normalized equipment-storage boundary so bag assignments persist through reload while stale, nested, or invalid assignments are removed safely.
- Extends regression coverage for shared Attribute presentation, equipment containers, bag persistence, monster field structure, Level Up menus, spell-capacity warnings, shared Level Up equipment cards, and responsive card layouts.
- Synchronizes Site Update, package, runtime/export, downloadable instructions, and PWA cache metadata at Beta 0.08 while retaining Game Update v0.02.

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
