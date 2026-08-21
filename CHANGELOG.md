# Changelog

## 0.02

- Overhauled the application GUI for a more unified shell, navigation, card, form, and settings presentation.
- Standardized spacing, borders, control sizing, active states, and responsive behavior across desktop and mobile layouts.
- Reorganized Settings into Display, Species, Background, and Data & Content sections.
- Added a Species Theme preference sourced from the current playable species list and prepared it for future palettes and artwork.
- Added the Background preference with `None` as the only available option for this build.
- Added a dedicated Reset Display control while preserving existing local character data unless explicitly reset.

## 0.01

- Rebuilt Brambleheart on Vue 3 + TypeScript + Vite + Vue Router.
- Added routed Character List, Rules, Simulator, and Settings views.
- Added shared AppHeader and PrimaryNav components.
- Added Brambleheart logo and icon assets under `public/assets/`.
- Added local character persistence plus JSON import/export.
- Added rules reference and Brambleheart simulator tools.
- Added shared light/dark/system appearance, text sizing, and compact-card settings.
- Added Vite-compatible Vercel SPA configuration.
