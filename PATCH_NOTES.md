# Brambleheart Beta 0.22 Patch Notes

## Themes
- Replaces all former Brambleheart role palettes with theme values taken from the supplied Old.dex repository.
- Mapping: Old.dex Default → Brambleheart Default; Powers of Chaos → The Warrior; Forces of Fantasy → The Healer; Ravening Hordes → The Ranger; Legions of Undead → The Thief.
- Removes Spellcaster and Trickster from active theme choices. Legacy saved values are normalized only when Settings data is loaded.
- Detail-card identity colors for Spells, Heritage/Cultural Traits, Talents, Sparks, Homelands, Oaths, Faiths, and Equipment/Gear remain stable when the site theme changes.

## Header & Backgrounds
- Doubles the desktop header-logo scale and gives the header a wider centered canvas so the larger logo is not constrained by the normal 760px content column.
- Removes the Skullfen Ruins-specific background position. Every background now uses the same centered `cover` presentation.
- View Background now suppresses grayscale in both light and dark mode, matching the intended full-art viewing behavior.
- Adds a small right-arrow control beside View Background to cycle through all discovered background images.

## Settings & Common UI
- Rebuilds Donation as a standard Settings row with its description and support actions aligned like the rest of the page.
- Replaces developer-facing Backgrounds repository instructions with normal user-facing copy.
- Restores separator borders for expandable Settings controls using the active theme line color.
- Increases Settings category labels by two pixels.
- Ensures shared primary/secondary button labels are centered horizontally and vertically.

## Rules & Character List
- Indents Rules child rows beneath each chapter heading so parent/child hierarchy is visually clear.
- Makes Recent Rules cards equal height regardless of summary length.
- Hides the native file input on Character List; Import Character remains the single visible import control.

## Release Integrity
- Beta/build/package/PWA markers are synchronized to 0.22 / 0.22.0.
- The patch is based on current GitHub main commit `356b2bb3cfd0894eb03791f98ae8d74e3896eb36` and the complete current-repository ZIP supplied with the request.
