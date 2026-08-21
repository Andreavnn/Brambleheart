# Brambleheart Alpha Build 0.04 — GUI Alignment Patch

This patch replaces the previous approximation of the application interface with the established reader GUI structure now used as the visual baseline.

## Included

- Rebuilt header and persistent WIP notice.
- Centered branding, build label, changelog link, light/dark icon, and four-tab primary navigation.
- Shared 760px reader page width and parchment/card presentation across routed screens.
- First-visit welcome page with install prompt.
- Five-step text sizing: Smaller, Small, Normal, Large, Larger.
- Bold Text and Compact Rows settings.
- Species palette themes for all currently listed playable species.
- Backgrounds retained with None as the only current option.
- Settings reorganized into Install, Report Bugs & Issues, Display, Support, and Data & Content.
- Rules reorganized into Reference & Updates, Fundamental Rules, Character Creation Rules, Species Rules, Battle Rules, and Role-Playing Rules with Search and Recent controls.
- Character List and Simulator converted to the same page/card/control hierarchy.
- Routed Changelog page and compact footer utilities.

## Local data

The existing character storage key remains unchanged. Existing display preferences are migrated where possible into the current settings structure.

## Applying

Overlay these files onto the current Brambleheart repository and preserve any repository files not included in this patch.
