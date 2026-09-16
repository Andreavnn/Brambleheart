# Brambleheart Beta 0.09 — Character Sheet, Level Up & Reference Alignment

## Rhythm Engine & Character Progression

- Adds a compact Level Up control to the selected Character Sheet beside the Campaign label, using the supplied Level Up artwork without its background and linking directly to that character’s Level Up page.
- Makes the Dice Roller inherit the selected character’s Character Sheet accent color while retaining the default Rhythm Engine accent when no character color is available.
- Reframes Level Up inside the same central Character Sheet-style column used by Rhythm Engine and places the character name on its own line beneath the Level Up heading for long-name support.
- Keeps the existing shared interactive Attribute control, expandable known Skill/Talent lists, spell-capacity warnings, and Character Sheet-style Equipment & Gear presentation inside the aligned Level Up shell.
- Changes Saved Encounter controls to the same compact icon-button presentation used by Character Roster records where the corresponding encounter action exists.

## Rules & References

- Gives each Monster Profile Action and Monstrous Trait column its own vertical flow so shorter cards are no longer forced to inherit spacing from taller cards in the neighboring column.
- Shows each monster’s Threat Level beside its name in Monster index links when a profile exists, with an explicit unknown marker for entries that do not yet have a stat block.
- Moves The Ancients directly after Lore - Anthro Mundas in the Anthro Mundas reference sequence and replaces the page with the current expanded Ancient-civilization and Threadpiece lore.
- Increases the separation between the To Hit & To Ward comparison graphic and the Tie Goes to the Defender reference card.

## Game Updates & Reliability

- Consolidates the former Game Update v0.02 Dual Wielding & Sapguard notes into the v0.01 Launch Patch so the Game Updates history once again has one canonical current entry.
- Extends repository regression checks for independent Monster Profile columns, monster Threat Level link details, Anthro Mundas lore ordering, Level Up page-shell alignment, Character Sheet Level Up navigation, selected-character Dice Roller accents, shared encounter record controls, and the consolidated Game Update history.
- Synchronizes Site Update, package, runtime/export, downloadable instructions, install-asset versioning, and PWA cache metadata at Beta 0.09 while Game Update returns to v0.01.

# Brambleheart Beta 0.08 — Inventory Containers & Level Up Alignment

## Rhythm Engine & Level Up

- Gives Character Sheet inventory containers full-width presentation below loose equipment, shows contained item count and weight, supports Empty state detail, and allows inventory items to be moved between loose storage and supported bags.
- Reuses the Character Creation interactive Attribute graphic for Level Up, places known Skills and Talents in expandable menus, highlights unused Magic spell capacity, and removes the redundant Signature Known status.
- Aligns Level Up Equipment & Gear with the shared Character Sheet equipment cards, removes Equip/Equipped controls, and places the existing Sell action in the card header.

## Rules & Watcher

- Gives Watcher monster Actions and Monstrous Traits independent heights with thinner category title bars.
- Refines Glop so Gelatinous Bash uses Trigger, Target, To Hit, and Damage without the former free movement effect, while Gelatinous Body separates its forced-movement immunity into a dedicated Formless field.
- Adds separation between the Attacking & Defending comparison graphic and the Tie Goes to the Defender example card.

## Reliability

- Extracts the interactive Attribute display into one shared component used by both Character Creation and Level Up rather than maintaining separate renderers.
- Extends persistence coverage for equipment-container assignment and current Level Up presentation state.
- Synchronizes Site Update, package, runtime/export, downloadable instructions, and PWA cache metadata at Beta 0.08 while retaining the consolidated Game Update v0.01.

# Brambleheart Beta 0.07 — Installed App, Equipment & Glop Refinement

## Application & Character Sheet

- Opens installed Brambleheart sessions on News and refreshes release-versioned manifest/icon metadata only when the application itself is opened.
- Corrects Character Sheet Spell Mana presentation and attachment pills, including live Scriptweave attachment display.
- Refines Character Sheet Equipment & Gear counts and shared compact Equipment presentation while retaining Trinkets in the main gear list and their dedicated slot area.

## Rules & Watcher

- Moves Cloak of Windweave into Traveler’s Gear and keeps current Adventuring Item prices visible in shared equipment cards.
- Normalizes Whisperstep terminology across current character/rules data.
- Expands Glop Action and Monstrous Trait wording and behavior for Gelatinous Bash, Reconstitute, Slick Trail, and Gelatinous Body.
- Adds reusable monster artwork resolution with an explicit placeholder when artwork is unavailable.

## Reliability

- Keeps installed-app refresh work tied to application launch rather than background polling or periodic sync.
- Synchronizes Site Update, package, runtime/export, downloadable instructions, and PWA cache metadata at Beta 0.07 while retaining the consolidated Game Update v0.01.
