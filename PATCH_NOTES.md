# Brambleheart Alpha Build 0.05 — Full Reader & Companion Patch

This patch continues the GUI and reader overhaul using the established compact reader layout as the application-wide baseline.

## Interface

- Responsive header and welcome-screen pass for desktop, tablet, and mobile.
- Header now uses the Brambleheart logo, narrative introduction, appearance control, and primary navigation without build/changelog clutter.
- Standard text increased one step and site typography normalized to the reader font stack with serif headings.
- Default palette moved to the light reader; base colors and all species themes were darkened and separated further.
- Added five fixed-cover background choices: The Crossway Hearth, Thornwick Market, Leviathan’s Wreck, Deepwood Ruins, and Mushroom Isles.
- Corrected PWA favicon/install artwork with proportional square icon assets.

## Characters

- Character List actions centered and expanded to Create, Import, and Export.
- Character pinning keeps selected heroes at the top of the list.
- Character Creation is now a dedicated eight-step guided page with explanatory tips for each stage.
- Agility is used consistently for character-facing terminology and derived values.

## Rules

- Rules reorganized from the supplied table of contents; Index is intentionally omitted.
- Added standalone reader routes for rule topics instead of dropdown-only rule text.
- Added Quick Reference, FAQ, Recent, and Changes & Updates.
- Winds of Magic and Lores of Magic are their own categories.
- Trade Goods and Transportation are grouped with Role-Play.
- Supplied rule documents are bundled into the local reader. Sections not present in the supplied source package are labeled as unavailable rather than invented.

## Simulator

- Rhythm Engine includes an explanation, optional Passive/Active target, Fortune/Misfortune markers, and five-roll local history.
- Combat includes ongoing encounters, completed history, round tracking, pinning, reopening, and deletion.
- Settings can separately clear combat, dice rolls, or all Simulator history.

## Settings & maintenance

- Support was replaced by Donation with Single Support and Recurring Support placeholders until final links are supplied.
- Added Custom Data JSON storage.
- Site Changelog is linked from Data & Content; system changes remain under Rules → Changes & Updates.
- Added a manually triggered repository cleanup workflow. It runs as a dry run unless `apply_changes` is explicitly enabled and only targets known generated root artifacts.

## Local data

The existing character and display storage keys remain compatible. New Simulator, Recent Rules, and Custom Data entries use separate versioned local-storage keys.
