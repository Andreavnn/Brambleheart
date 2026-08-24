# Brambleheart Beta 0.14 — Custom Data & Character Sheet

## Custom Data
- Added one downloadable ZIP containing typed JSON templates for custom Species, Spell, Talent, and Trait entries.
- Imported JSON is normalized by its declared type and stored as Brambleheart Custom Data.
- Custom entries are clearly marked as Custom anywhere they are surfaced during Character Creation.
- Character Creation Step 1 now includes an Allow Custom Data switch above Campaign so imported content remains opt-in for each character.
- Custom Species, embedded/standalone Traits, Spells, Talents, languages, Lore groups, and applicable Skill grants are integrated into the creator when enabled.

## Backgrounds & Settings
- Removed explanatory detail text from individual Background choices.
- Background options are now generated from supported image files found in `src/assets/backgrounds` at build time.
- Added the supplied Skullfen Ruins and Blightbound Horror images to the discovered background set.
- Ready For Adventure and Thornwick Market remain available; retired legacy background images remain hidden from the selector.
- Background grayscale remains compatible with dynamically discovered images.

## Rhythm Engine
- Attribute Check Strike stats now identify their combat use: Aim for Shooting, Mettle for Melee, and Control for Magic.
- Removed Combat Encounter as a Rhythm Engine section.
- Added Character Sheet as the second Rhythm Engine section, using the saved character selected in the shared Character panel directly below the tabs.
- The Character Sheet presents identity, Attributes, secondary stats, Mana, Skills, full Talent entries, weapons, armor and shields, Magic/Spells, and remaining Equipment & Gear.

## Code Cleanup
- Removed the legacy Encounter route from active routing and removed Encounter dependencies from the live Simulator view.
- Preserved existing character storage compatibility while adding the per-character Custom Data permission flag.
- Advanced the visible build and PWA shell cache to Beta 0.14.
