# Brambleheart Beta 0.35 Patch Notes

## Rule Updates v0.01
- Keeps the game-rules update stream at `v0.01`; this application release does not increment the independent rules version.
- Corrects Bravery secondary stats to Heart = Bravery Rank and Spirit = Bravery modifier.
- Mana Pool = Magic Level + Spirit.
- Magic Regen = Heart +2 and is the amount restored at the start of each round. Effects that increase or decrease that start-of-round amount modify Magic Regen.
- Keeps the existing Aim/Accuracy/Speed, Brawl/Fury, Ward/Guts, and Control/Power formulas.

## Character Creation & Character Sheets
- Colors only the Agility modifier number and the Agility-modifier portion of the Speed calculation red in Distribute Attributes.
- Expands Rhythm of Body & Spirit with explicit Mana Pool `(Magic Level + Spirit [Bravery modifier])` and Magic Regen `([Bravery rank] Heart + 2)` detail.
- Introduces one shared Character Attribute panel used by Character Creation Review and Rhythm Engine so the two sheets no longer maintain independent Attribute/secondary-stat layouts.
- Restores full Attribute-style boxes, places secondary stats under their parent Attribute, and adds AGL/MIG/HID/LOR/BRY shorthand.
- Places Mana Pool and Magic Regen in separate adjacent resource boxes.
- Adds spacing between the Skills, Magic, Talents, and Equipment & Gear headings and their first content boxes.

## Character Roster
- Repairs the open Filter layout so Search, Status, and Clear occupy a contained full-width row beneath Create / Import / Export / Filter.
- Preserves Filter at the right end of the action row and the other three actions at the left.

## Settings
- Keeps Measurements below Bold Text.
- Moves Reset Local Settings to the bottom of the Display section, after Backgrounds.
- Preserves the repaired Theme, Background, and Measurement switch-style radio rendering.

## Rule Page Layout Test
- Removes the line-through from the discarded die in Edged and Weighted examples while retaining a subdued/dashed discarded state.
- Corrects Half-Step presentation: a natural d10 result of 1–5 becomes 1 and 6–10 becomes 2; the die is not divided numerically.
- Corrects the Threadseer example to convert the d10 into the half-step result before adding its +1 condition.
- Replaces the oversized Secondary Stats paragraph on Attributes & Skills with concise copy and an Attribute→secondary-stat breakdown graphic.
- Combines Skills and Skill Trees into one section.
- Moves Expanded & Restricted to the bottom.
- Renders Skill Tree tables in production-style Attribute-colored cards.

## Release Integrity
- Advances BUILD and character export version to `0.35`, package version to `0.35.0`, and PWA cache to `v0.35`.
- Keeps Node pinned to exact `22.x`.
