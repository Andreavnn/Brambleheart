# Brambleheart Beta 0.34 Patch Notes

## Rule Updates 0.01 & Secondary Statistics
- Separates the site build (`Beta 0.34`) from the Brambleheart rules-update version (`0.01`).
- Adds a centered `Rule Updates v0.01` link below the Brambleheart logo and above primary navigation; it is not a primary-navigation tab.
- Corrects the shared secondary-stat formulas sitewide:
  - Agility: Aim = modifier, Accuracy = Rank, Speed = modifier +2.
  - Might: Brawl = modifier, Fury = Rank.
  - Hide: Ward = modifier, Guts = Rank plus applicable equipment bonuses.
  - Lore: Control = modifier plus applicable equipment bonuses, Power = Rank.
  - Bravery: Spirit = Rank, Heart = modifier.
- Mana Pool = Magic Level + Heart. Start-of-round Mana restoration = Spirit.
- Adds the rules-wide formula clarification to Rule Updates 0.01 while intentionally omitting Accuracy from the update entry, per design direction.
- Updates active melee references from Mettle to Brawl and retains Fury as melee damage and Power as magical damage.

## Character Roster & Level Up
- Renames the visible Character List to `Character Roster` and updates related navigation/back labels.
- Keeps Create, Import, and Export on the left of the Roster action bar and moves Filter to the right.
- Adds Level Up currency management using Threadpiece denominations.
- Adds a simple persistent Treasure list to Level Up as the first-pass treasure placeholder.
- Adds Equipment & Gear purchasing to Level Up using the current catalog cost, choices, Might requirements, and saved equipment model.
- Adds a persisted post-creation currency ledger so currency earned after creation survives normalization/reload and is included in available wealth.
- Shows acquired Treasure on expanded Character Roster entries.

## Character Creation & Economy
- Reorders Distribute Attributes secondary stats so Rank-based stats appear first, modifier-based stats second, and Speed third under Agility.
- Displays Speed as `2 + Agility modifier`, including the visible `2+` calculation in the Attribute step.
- Raises starting currency from `2 sp` to `30 sp`.
- Raises the Adventure Kit sale value from `1 sp` to `2 sp`.
- Keeps the Beta 0.33 50% Equipment & Gear price reduction and now rounds fractional discounted Threadpieces down to the nearest whole Threadpiece.
- Standardizes visible currency initials to lowercase (`wp`, `np`, `sp`, `bp`) and uses shared exchange-rate formatting for displayed prices.

## Rhythm Engine
- Rebuilds Character Sheet secondary stats under their parent Attributes:
  - Agility: Aim, Accuracy
  - Might: Brawl, Fury
  - Hide: Ward, Guts
  - Lore: Control, Power
  - Bravery: Spirit, Heart
- Places Mana Pool and Speed beneath the Attribute groups.
- Adds Speed formula detail and Mana Pool/round-restoration detail.
- Updates Strike selection to use Aim, Brawl, or Control as appropriate.

## Settings
- Places Measurements directly below Bold Text.
- Places Reset Local Settings directly below Measurements.
- Repairs switch-style radio presentation for Themes, Backgrounds, and Measurements so the control renders as one complete flip switch rather than separated circles.
- Keeps Squares as the measurement default and the existing square/yard/meter/feet conversion authority.

## Rule Page Layout Test — Fundamentals
- Changes the Conditions example to High Ground +1, Fortune +2, and Obscured −1 for a +2 total.
- Centers Fortune and Misfortune example contents within their cards.
- Adds Edged and Weighted four-die example graphics showing which die is removed and the kept-dice total.
- Moves Active & Passive Targets above Half-Step Rolls.
- Adds an Example column to the passive-target difficulty chart with concise single-line guidance and narrower Difficulty/Target columns.
- Keeps Threadseer as the Half-Step example and adds a visual die/math process for `[1d10/2+1]`.
- Retains the existing Core Roll formula box, supplied dice strip, separate Attributes & Skills preview page, bottom page navigation, and bottom Contents section.

## Release Integrity
- Advances BUILD and character export version to `0.34`, package version to `0.34.0`, and PWA cache to `v0.34`.
- Keeps the Node runtime pin at exact `22.x`.
- Rebuilds the in-app Site Changelog to read the repository `CHANGELOG.md` directly, making the repository changelog the single release-history authority.
