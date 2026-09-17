# Brambleheart Beta 0.11 — Monster, Lore & Under-Construction Refinement

## Watcher & Rules

- Adds Ember Dyrtle to the Watcher catalog with a full monster profile, updates its requested action and trait wording, converts its referenced Drutle naming to Dyrtle, and applies the supplied Ember Dyrtle artwork.
- Adds the supplied Muckling artwork to its Watcher entry so the creature now has profile art in the Rules reader.
- Replaces the Winds of Magic lore page with the newly supplied expanded reference text.
- Standardizes structured rule labels so target declaration language is presented uniformly as Target rather than mixing Target and Declare across equivalent rule fields.

## Shared Presentation

- Replaces the former orange edge accents on The Role-Play, The Watcher, and the Encounter Builder tab with a visible Under Construction stamp treatment that avoids covering surrounding text.
- Standardizes ability and rules pill ordering through a shared keyword-priority pass so repeated pill groups present in a consistent order throughout the site.

## Rhythm Engine & Reliability

- Restores missing expanded Equipment & Gear details for Adventure Kit items such as Torch and Trail Rations by matching them against the shared equipment catalog and falling back to clean weight-detail text when needed.
- Extends the current data set with the new monster-art assets and the new Ember Dyrtle profile while preserving the current Site Update / Game Update split.
- Synchronizes Site Update, package, runtime/export, downloadable instructions, install-asset versioning, and PWA cache metadata at Beta 0.11 while Game Update remains v0.01.

# Brambleheart Beta 0.10 — Card Flow & Character Sheet Cleanup

## Rhythm Engine & Navigation

- Removes Character Sheet Equipment & Gear drag-and-drop storage interaction and returns Traveler’s Pack and Forager’s Satchel to the same normal equipment-card flow as other carried items, while retaining existing persisted storage data for backward compatibility.
- Marks Encounter Builder as under construction with orange accents on both ends of its Rhythm Engine navigation tab.
- Slightly enlarges the Character Sheet Level Up control while preserving the existing Campaign field spacing and direct character Level Up link.

## Rules & Shared Presentation

- Marks The Role-Play and The Watcher expandable Rules categories as under construction with orange accents on both ends of their category title bars.
- Promotes the independent-height two-column behavior introduced for Monster Profiles into one shared card-column component and reuses it across repeated card lists, including Complete Core Actions, Talents, Species Traits, Spell Keywords, Sparks, Deeds, Adventuring Items, Experience methods, narrative lists, Character Creation reviews, Level Up known-content/equipment lists, and Character Sheet Skills, Trinkets, and Equipment & Gear.
- Removes superseded per-page column implementations and obsolete grid rules replaced by the shared independent-column authority.

## Reliability

- Keeps legacy equipment-container assignments isolated in character persistence for saved-data compatibility while removing their Character Sheet interaction and presentation logic.
- Extends repository regression checks for the shared independent-column authority, removed bag interaction UI, under-construction navigation accents, and enlarged Level Up control.
- Synchronizes Site Update, package, runtime/export, downloadable instructions, install-asset versioning, and PWA cache metadata at Beta 0.10 while Game Update remains v0.01.

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
