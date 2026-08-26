# Brambleheart TTRPG — Beta 0.24

Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.24 is a Rules-reader consolidation and navigation release built directly on the current Beta 0.23 GitHub implementation. It keeps the Character Creation and equipment work from 0.23 intact while simplifying Rules structure, repairing navigation, stabilizing rule-panel surfaces across themes, and correcting several presentation issues.

## Main views

- Welcome / Splash
- Character List
- Guided Character Creation
- Character Level Up
- Rules / Rule Reader
- Rhythm Engine — Character Sheet and Dice Roller
- Settings
- Site Changelog

## Beta 0.24 focus

- Realigns the header Back and Dark Mode controls to the normal content width while keeping the enlarged logo centered.
- Restores automatic Recent Rules card sizing so summaries are not clipped.
- Removes the intermediate References landing page; Anthro Mundas, FAQ, and Changes & Updates are direct Rules entries, with the old References URL retained only as an alias.
- Renames Keywords & Ability Types to Keyword Abilities and combines the source-backed Core Abilities into that page as individual rule boxes.
- Makes the rule-reader arrow controls navigate to the previous/next page instead of only scrolling the page strip.
- Consolidates Damage Category, Damage Type, and Resistance & Weakness into To Damage; consolidates Healing, Defeated, and Encounter End into Health while preserving old URLs as aliases.
- Boxes the three To Strike roll types, moves the Touch pill below Combat Range, outlines playable Species artwork, and adds Back to Rules on ending pages.
- Keeps Rules panel background surfaces stable when changing role themes while retaining light/dark mode behavior.
- Verifies Brambleheart's five Text Size offsets already match Old.dex; no duplicate text-size implementation is added.

## Runtime

- Node.js 22 or newer
- Vue 3 / TypeScript / Vite
