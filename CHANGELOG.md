# Changelog

## 0.03

- Refined the application header and added the persistent alpha work-in-progress banner.
- Reduced the normal interface text baseline and expanded text sizing to Smaller, Small, Normal, Large, and Larger.
- Added an optional Bold Text display setting.
- Added dedicated palette themes for every currently listed playable species.
- Added Install and Support sections to Settings.
- Added web-app manifest and service-worker support for browser installation where available.
- Reorganized Rules into Reference & Updates, Fundamental Rules, Character Creation Rules, Species Rules, Battle Rules, and Role-Playing Rules.
- Added rules search and locally tracked recent-rule shortcuts.
- Added a new Brambleheart splash page at the site root.
- Continued the overall GUI consistency and responsive-layout pass.

## 0.02

- Completed an application-wide GUI consistency pass.
- Reworked spacing, navigation, panels, cards, controls, forms, modals, and responsive behavior.
- Reorganized Settings into collapsible Display, Species, Background, and Data & Content groups.
- Added species theme selection using the current playable-species dataset.
- Added the Background control with None as the current available option.
- Preserved existing character and display local-storage data.

## 0.01

- Rebuilt Brambleheart on Vue 3 + TypeScript + Vite + Vue Router.
- Added routed Character List, Rules, Simulator, and Settings views.
- Added shared application header and primary navigation components.
- Added Brambleheart logo and icon assets under `public/assets/`.
- Added local character persistence plus JSON import/export.
- Added rules reference and Brambleheart simulator tools.
- Added shared appearance, text sizing, and compact-card settings.
- Added Vite-compatible Vercel SPA configuration.
