# Brambleheart TTRPG — Beta 0.17

Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.17 is a rules-organization and interface-consistency pass built on Beta 0.16. It concentrates on the Rhythm Engine, character-sheet parity, Rules organization, Watcher creature hierarchy, area-of-effect targeting, character approval, background presentation, and rule-banner discovery.

## Main views

- Welcome / Splash
- Character List
- Guided Character Creation
- Character Level Up
- Rules / Rule Reader
- Rhythm Engine — Dice Roller and Character Sheet
- Settings
- Site Changelog

## Beta 0.17 focus

- Renames Attribute Check to Dice Roller and makes the saved Character Sheet match the final Character Creation Review layout.
- Organizes Traits, Talents, and Spells into reusable expandable categories matching Character Creation presentation.
- Moves detailed Line, Cone, Orb, Direct Casting, and Impassable Collision targeting to The Battles → Area of Effect using supplied rulebook diagrams.
- Reorganizes Watcher creatures by parent category and monster family/type.
- Fixes Approved/Unapproved character movement and groups character lists into expandable panels.
- Removes false Mana pills from rules that do not define a Mana cost.
- Improves rule-banner filename detection, including `Banner_AthroMundas.png`.
- Keeps selected background artwork consistent between light and Dark Mode and adds a background-only viewing control.
- Consolidates the global page tools/build detail and refines Donation Settings copy.

## Runtime

- Node.js 22 or newer
- Vue 3 / TypeScript / Vite
