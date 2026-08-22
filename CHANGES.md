# Packet Changes

## Code-red fix
`talentsValid()` no longer calls `ensureTalentSlots()` while Vue evaluates the template. Validation is now read-only, preventing the reactive mutation/recursive-render failure encountered when advancing from the Spells & Invocations step.

## Character creator visual fixes
Species rule content is constrained to its grid column, portrait overlap is prevented, portrait borders are black, Appearance uses a resizeable textarea, and long Oath/Faith content is contained.

## Button treatment
- Start Over: black text
- Close: red text

## Spell Lore colors
- Flames: red
- Frost: blue
- Hallows: violet
- Harmony: gold
- Life: green
- Oath: purple
- Wilds: green
- Invocation: neutral gray
