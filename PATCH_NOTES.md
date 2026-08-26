# Brambleheart Beta 0.25 Patch Notes

## Data & Content
- Added Data Backup above reset controls. It downloads one JSON payload containing every locally stored character regardless of Incomplete, Unapproved, or Approved status.
- Removed Clear Dice Rolls from Settings.
- Replaced the former nested Reset Local Data / Reset All Local Data / character-management controls with one row containing Reset Custom, Reset Characters, and Reset Data.
- Reset Data preserves Display settings while removing other Brambleheart local data.

## Character Creation
- Secondary Stats now sit beneath their related Attribute description. Rank and Modifier use the same visual stat-box language and the +/- control is centered beneath them.
- Starting Skills adds a Homeland pill when a selected Homeland Skill increases a Skill already granted by Culture.
- Currency of Anthro Mundas now shows WP, NP, SP, and BP using 10 WP = 1 NP, 5 NP = 1 SP, and 5 SP = 1 BP. Starting wealth is 50 SP. Selling the Adventure Kit adds 3 SP.
- Adventure Kit is contained by a new Starting Equipment parent panel.
- Repeatable purchased gear is quantity-aware. Duplicate purchases consolidate and +/- controls update quantity, cost, and carried weight.
- Additional Language identifies the Species associated with the selected language.
- Review Species no longer repeats the native language. Weapon ranges default to Touch when no range is listed; weapon qualities remain in Properties / Notes; attached Journey Knot is listed and adds +1 to displayed damage.
- Weapons, Armor & Shields, Skills, Magic, and Talents summaries no longer show counts/detail text. Equipment & Gear shows current Threadpieces and total carried weight.

## Rules & Magic
- Fixed the Thunder’s Fury spillover at the parser boundary. Power Word: Reinforcement was missing from the Oath spell index, so the parser treated its source paragraphs as a continuation of Thunder’s Fury; greedy keyword extraction then surfaced that appended text as a pill. The missing spell is registered and parsing now also stops at standalone source headings, with bounded keyword extraction.
- Every non-Invocation Lore page now has a temporary Attuned switch in its top panel. Enabling it previews the Lore Attunement reduction of 2 Mana for all spells on that page. Navigating away resets the switch.

## Release Integrity
- Visible build, package version, character export version source, PWA cache, README, patch notes, repository changelog, and in-app changelog are synchronized to Beta 0.25 / 0.25.0.
- This patch is based on GitHub main commit `28d8ff96ff2fa113bda986c461737f0fe1386f68` (Beta 0.24).
- Static source-integrity checks are included in packaging. A production Vite build and live browser responsive/persistence test are not claimed unless explicitly reported separately.
