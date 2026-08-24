# Brambleheart TTRPG — Beta 0.18

Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.18 is a rules-organization, character-creation, and character-sheet refinement pass built on Beta 0.17. It concentrates on cleaner Rules grouping, explicit Character Creation choices, complete Faith presentation, Talent corrections, local-character data controls, Adventuring Gear organization, structured weapon/armor slots, and background display consistency.

## Main views

- Welcome / Splash
- Character List
- Guided Character Creation
- Character Level Up
- Rules / Rule Reader
- Rhythm Engine — Dice Roller and Character Sheet
- Settings
- Site Changelog

## Beta 0.18 focus

- Renames Text Size endpoints to Smallest and Largest and adds status-specific character clearing with a second confirmation.
- Reorganizes Sparks & Deeds, Homelands, Oaths, Faiths, Talents, and Adventuring Gear into expandable Rules groups.
- Uses Character Creation-style cards for reusable ability/rule entries where supported.
- Removes implicit creator choices so applicable dropdowns begin with Select… placeholders.
- Expands Faith detail and refines Oath/Faith presentation in Character Creation.
- Corrects requested Talent names and category assignments while preserving compatibility with older saved-character spellings.
- Separates Adventuring Gear into Weapons, Armor, Tools, and related groups, with Weapon Qualities separated from weapon listings.
- Reworks Character Sheet Weapons and Armor into structured slots and adds collapsible sheet sections.
- Uses explicit character approval status with automatic legacy migration; Approved characters expose Level Up instead of Edit, and Level Up transactions avoid reactive Proxy cloning.
- Cleans Threadpiece conversion presentation and keeps grayscale active in View Background mode.

## Runtime

- Node.js 22 or newer
- Vue 3 / TypeScript / Vite
