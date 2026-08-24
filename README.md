# Brambleheart TTRPG — Beta 0.14

Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.14 builds on the stable Beta 0.13 package and focuses on typed custom content, automatic background discovery, and consolidating the Rhythm Engine around saved-character tools.

## Main views

- Welcome / Splash
- Character List
- Guided Character Creation
- Character Level Up
- Rules / Rule Reader
- Rhythm Engine — Attribute Check and Character Sheet
- Settings
- Site Changelog

## Beta 0.14 focus

- Adds a downloadable Custom Data template pack for Species, Spells, Talents, and Traits, with typed import recognition and clear Custom labeling.
- Adds an Allow Custom Data switch to Character Creation so imported content remains opt-in per character.
- Automatically discovers supported images placed in `src/assets/backgrounds` and exposes them in Settings after the next build.
- Adds the supplied Skullfen Ruins and Blightbound Horror artwork to the background catalog while retaining Ready For Adventure and Thornwick Market.
- Removes background-description copy from Settings and keeps background selection visually compact.
- Labels Strike-oriented Attribute Check stats by attack use: Shooting, Melee, and Magic.
- Replaces the former Combat Encounter section in the Rhythm Engine with a saved-character Character Sheet and moves character selection into a shared panel beneath the tool tabs.
- Removes the active runtime route to the legacy Encounter view and cleans obsolete Simulator encounter dependencies from the live navigation path.
