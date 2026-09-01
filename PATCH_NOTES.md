# Brambleheart Beta 0.43 Patch Notes

Baseline: Beta 0.42.0, matching GitHub main commit `7cdc6561811311ecf86b477e3cd6bd8289b04a63`.

## Rules presentation
- Promotes the approved Fundamentals layout work into the production Rules pages for Core Rules, Attributes & Skills, and Abilities instead of maintaining a separate layout-test implementation.
- Keeps the existing source-backed Fundamentals content while retaining the teaching graphics for Conditions, Fortune/Misfortune, Edged/Weighted rolls, Half-Step rolls, Attribute secondary stats, Skill Trees, Ability economy, Reactive timing, and the shared Core Ability reference.
- Keeps legacy `dice-rules`, `keyword-abilities`, and `core-abilities` URLs as explicit aliases to the new canonical pages.
- Removes the obsolete Rule Page Layout Test route/view after promotion.

## Equipment, Trinkets & character presentation
- Reorganizes the shared Equipment & Gear shop into Weapons, Armor, Shields, Trinkets, Traveler’s Gear, Field Kits, Consumables, and Tools with explicit horizontal/vertical navigation controls.
- Labels weapon and protective profiles instead of exposing raw dot-separated values; Sharpening Stone is categorized as a Consumable.
- Makes the two Trinket positions automatic at the saved-character equipment authority while preserving real saved slot assignments at the normalization boundary.
- Removes manual Trinket-position controls from the rebuilt Level Up equipment management surface and shows the assigned Trinket position as read-only status.
- Improves Level Up reward entry, advancement grouping, Magic Level preview, and equipment management without duplicating economy or advancement rules.

## Site presentation
- Uses the supplied page-header character artwork on News, Character Roster, Rules, Rhythm Engine, and Settings through the shared AppHeader implementation.
- Replaces the temporary News SVG promo graphics with the supplied Discord and Share PNG artwork.
- Fixes the Settings Background radio conflict at the actual Background input by removing the generic switch class, rather than adding another CSS override.
- Enlarges the existing footer Brambleheart icon at its transitional presentation authority.

## Cleanup & release integrity
- Removes the pass-through Settings wrapper and routes directly to the real Settings view.
- Removes superseded Rules layout-test and News SVG assets; deletion instructions are isolated under `DO NOT UPLOAD`.
- Synchronizes application BUILD/export to `0.43`, package version to `0.43.0`, and PWA cache to `v0.43` while Rule Updates remains `v0.06` because this patch does not introduce a new rules amendment.
