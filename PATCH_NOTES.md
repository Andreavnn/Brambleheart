# Brambleheart Beta 0.10 — Character, Rules & Encounter Patch

This full overlay starts from the working Beta 0.09 package. The v0.08/v0.09 Character Creation crash and page-boundary recovery fixes are preserved.

## Characters and creation

- Replaced Pronunciation with Campaign Name and display Character Name, Species, and Campaign on the Character List.
- Culture Trait picker now has All + Species tabs. Adding a Trait automatically replaces selected Traits in alternating first/second order instead of forcing manual removal.
- Culture Trait Skill choices use a clean dropdown with the selected +1 Skill below it; creation-time specialized Skill labels are normalized to their base Skill names where appropriate.
- Homeland Skills are displayed as text with optional replacements beneath them.
- Building Selu callouts now use a distinct two-sided color treatment.
- Winds of Magic Mana guidance uses the supplied rules: every character generates 2 Mana at the start of a combat round and Magic Level 1 adds +1 regeneration. Conditional Trait Mana effects are shown as conditional notes rather than permanently added to base Mana.
- Talent selection is now a searchable popup with All and category tabs.
- Threadpiece wealth is represented in WP, NP, SP, and BP from the source exchange table while Starting/Remaining Wealth are combined into one adjusting balance.
- Equipment shop rows are cleaner, category labels disappear inside a specific category tab, and compatible accessories can optionally attach/apply to purchased weapons.
- Language cards are larger and use available Species-language descriptions.
- Review adds Campaign, Mana, compact Secondary Stat boxes, collapsible Magic/Spells and Talents, and attachment details.

## Rules

- Lore of Anthro Mundas is split into ten source-backed pages: Brambleheart, Anthro Mundas, Winds of Magic, The Howling Hallows, The Ancients, The Great Morphing, The Era of Discovery, The Age of Strife, The Blight of Undeath, and Age of Adventure.
- Lore pages include horizontal section navigation and previous/next controls like The Fundamentals.
- Keyword pill UI is removed from Rule Reader pages; Keywords render as ordinary rule text.
- Box dividers are tightened to run edge-to-edge beneath headers, while Mana costs remain at the top-right of cards where present.

## Rhythm Engine and encounters

- Attribute Check fields follow Roll Type → Character Stat → Character Skill. Roll Type restricts available Stats, and the selected Stat filters saved-character Skills by governing Attribute.
- Attribute Check controls are reduced to compact three-column groups.
- Combat Encounters now open as their own routed pages, similar to Old.Dex match pages, while retaining existing local encounter storage compatibility.
- Mobile/tablet select controls are normalized to a stable readable size.

## Themes and presentation

- Themes are now Warrior, Ranger, Spellcaster, Healer, Thief, and Trickster, each with light and complete dark palettes. Legacy theme values migrate to the nearest new theme.
- The Beta 0.09 x5 logo experiment is reduced by half for this pass.

## Compatibility

- Character storage remains `brambleheart-characters-v0.01`.
- Encounter storage remains `brambleheart-simulator-encounters-v0.05`.
- Rhythm history remains `brambleheart-simulator-rhythm-v0.05`.
- PWA shell cache advances to v0.10.
