# Brambleheart TTRPG — Beta 0.25

Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.25 is a Character Creation, local-data, equipment, and magic-reader reliability release built directly on the current Beta 0.24 GitHub implementation.

## Main views

- Welcome / Splash
- Character List
- Guided Character Creation
- Character Level Up
- Rules / Rule Reader
- Rhythm Engine — Character Sheet and Dice Roller
- Settings
- Site Changelog

## Beta 0.25 focus

- Adds full-character Data Backup and consolidates local reset actions into Reset Custom, Reset Characters, and Reset Data.
- Reworks Attribute presentation and makes Homeland-vs-Cultural Skill rank sources explicit.
- Hardens the spell parser against cross-spell source bleed and restores Power Word: Reinforcement to the Oath spell index.
- Corrects Threadpiece denominations and starting wealth, adds a dedicated Adventure Kit parent panel, and supports quantity-aware repeatable equipment.
- Improves Language and Review summaries, including Touch weapon ranges, complete weapon qualities, Journey Knot damage, current currency, and carried weight.
- Adds a temporary Attuned preview switch to Lore reader pages; it reduces displayed spell Mana costs by 2 and resets on navigation.

## Runtime

- Node.js 22 or newer
- Vue 3 / TypeScript / Vite
