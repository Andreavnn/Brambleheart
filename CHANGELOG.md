# Brambleheart Beta 0.12 — Watcher Navigation, Creature Profiles & Level Up Alignment

## Watcher & Monster Profiles

- Renames Generic Monsters to Creatures of the Winds and places Muckling, Noxious Muckling, and Ember Dyrtle in that category while removing the requested Elemental/Prismheart Muckling and Rime/Storm/Verdant/Arcane Dyrtle entries.
- Adds dedicated bio text to Muckling, Noxious Muckling, and Ember Dyrtle and updates their profile rules to refer to each monster by name instead of generic player- or Creature-facing wording.
- Presents Muckling Slosh, Noxious Muckling Seeping Slosh, and Ember Dyrtle Cinderstep as dedicated structured rule rows below Effect.
- Extends rule breadcrumbs to support nested Watcher navigation so monster profiles show Rules › The Watcher › Monsters › Monster and return directly to Monsters.

## Rhythm Engine & Character Progression

- Moves the Encounter Builder Under Construction stamp behind the tab label with a lighter, lower-opacity treatment so the navigation bar keeps its normal height.
- Removes the selected-character duplicate detail text beside the Character selector on Character Sheet and Dice Roller views.
- Extracts Character Detail into one shared section used by both the Character Sheet and Level Up, including identity, campaign, origin, Threat, Health, and character accent controls.
- Aligns Level Up section headers with the Character Sheet collapsible-section presentation while retaining the existing advancement controls.

## Lore & Release Integrity

- Replaces the Hollowing Hallows reference page with the supplied current lore text and aligns the page title and heading to Hollowing Hallows.
- Synchronizes Site Update, package, runtime/export, downloadable instructions, install-asset versioning, and PWA cache metadata at Beta 0.12 while Game Update remains v0.01.

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
