# Brambleheart TTRPG — Beta 0.11

Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.11 builds on the stable Beta 0.10 package and preserves the recovered Character Creation crash and page-boundary fixes.

## Main views

- Welcome / Splash
- Character List
- Guided Character Creation
- Rules / Rule Reader
- Rhythm Engine — Attribute Check
- Combat Encounter sheets
- Settings
- Site Changelog

## Beta 0.11 focus

- Character List now keeps Edit, Lock, Copy, and Delete visible and clearly marks Complete/Incomplete characters.
- Character Creation identity is reduced to Character Name, Campaign, and a larger Appearance field.
- Attribute Check and Combat Encounters are separate Rhythm Engine sheets; Skills turn off for roll types that do not use them.
- Combat Encounters use a character-sheet presentation with clickable Attributes, secondary stats, weapons, and spells for common rolls.
- Default plus Warrior, Ranger, Spellcaster, Healer, Thief, and Trickster themes now use stronger full-site light/dark palettes.
- Anthro Mundas starts the setting-lore sequence; all rule sections gain previous/next navigation and rule cards are flatter and denser.
- Reset Local Data returns to the Welcome page, and the splash install flow is more defensive when the browser install prompt is unavailable.
- Settings now offers only the standard background and the supplied Ready For Adventure artwork.
