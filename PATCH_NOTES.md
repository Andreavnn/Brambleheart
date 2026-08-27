# Brambleheart Beta 0.33 Patch Notes

## Character List & Share Codes
- Removes active QR generation/scanning and QR dependencies; compressed Share Codes are the character-transfer authority.
- Keeps the QR-shaped per-character action icon, now as the direct Share Code action.
- Rebuilds the Share Code popup to match the supplied Old.dex pattern: short Share Page, truncated code preview, expandable full code, and centered copy/send actions.
- Combines import into one `Import Character` control with Upload File and Paste Share Code choices.
- Combines export into one `Export Character` control with all-character download plus one-character file/Share Code choices.
- Adds a Character Filter control to the action panel.
- New shares keep the browser URL at the short canonical Character List address. Legacy `#bhc=` links remain readable and clean their payload fragment immediately after capture.

## Measurements
- Adds Settings → Display → Measurements with Squares, Yards, Meters, and Feet switch-style choices; Squares is the default.
- Uses one conversion authority: 1 square = 1 yard = 1 meter = 3 feet, rounded up to whole displayed units.
- Removes the space in bracketed distance notation (`[2] squares` → `[2]squares`, or the selected converted unit).

## Game Rules
- Adds Heart = Bravery Rank.
- Adds Inspiration = Bravery modifier.
- Renames the former Might-based Power secondary stat to Fury = Might Rank; Fury adds physical damage where called for.
- Adds Lore Power = Lore Rank; Power adds spell damage where called for.
- Replaces Starting Mana with Mana Pool = Magic Level + Inspiration.
- Mana restored at the start of each round = Heart; other rules can still restore additional Mana.
- Adds a versioned Game Updates page documenting game-mechanics amendments. Its link appears beneath the Brambleheart logo, not in primary navigation, and is also available from Settings → Changelog & Updates.

## Character Creation
- Reduces the normal text size of Step 5 Speed, Aim, Rank, Modifier, and matching secondary-stat labels by one step.
- Ensures Talent display names use consistent capitalization.
- Makes Spirit Flare require Threadseer.
- Reduces all Equipment & Gear purchase costs by 50%, with NP/WP display conversion using the existing Threadpiece exchange rates.
- Moves the Bonus Language pill above its dropdown and removes the word `Language` from Species-language pills.
- Removes the artificial spacing/underline treatment after Review Character Name and Campaign labels.
- Makes Review Spell boxes use the same spell-card structure as Step 10.
- Displays Review Talents in a single vertical column.
- Shows Heart, Inspiration, Fury, Lore Power, Mana Pool, and Heart-based round Mana in Review.

## Rules Layout Preview
- Keeps Rule Page Layout Test as its own Rules parent below The Watcher.
- Keeps Contents at the bottom, no Overview panel, compact title block, colored section headings, and colored tables/charts.
- Uses the supplied dice artwork for Fundamentals.
- Centers the Core Roll formula in its own colored formula box.
- Adds a process-style Conditions example showing two bonuses and one penalty combining into a total.
- Renames `FORTUNE & MISFORTUNE RESULTS` display heading to `FORTUNE & MISFORTUNE` and adds example dice-result graphics.
- Separates Active & Passive Targets from Edged & Weighted Rolls and places them below Half-Step Rolls.
- Uses Threadseer as the Half-Step Talent example.
- Moves Attributes, Ranks & Modifiers, Skills, Skill Trees, and Expanded & Restricted Skills to their own preview page.
- Adds previous/next page controls at the bottom of the Fundamentals preview pages.

## Core Abilities & Talents
- Renames the Rules page `Keyword Abilities` to `Core Abilities`.
- Moves Spirit Flare, Echo Strike, Steadfast, Sentinel’s Call, Wander Step, Verdant Surge, and Rooted Resolve from Core Abilities into their requested Talent categories.
- Renames Swift Rush → Swiftstride and Sure Shot → Range Strike across loaded rules/Core Ability references.
- Updates Melee Strike damage to use Fury and Arcane Command spell damage to include Power.

## Interface & Release Integrity
- Reduces the bottom-of-page Brambleheart image from 260px to 65px.
- Uses Settings detail text: `Site control: Community, display, data, storage, and optional controls.`
- Keeps primary navigation limited to Character List, Rules, Rhythm Engine, and Settings.
- Advances release markers to Beta `0.33`, package `0.33.0`, and PWA cache `v0.33`, while preserving Node `22.x`.
