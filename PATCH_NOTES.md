# Brambleheart Beta 0.24 Patch Notes

## Header & Rules Landing
- Back and Dark Mode controls now share a normal-width header control row while the enlarged Brambleheart logo remains centered independently.
- Recent Rules cards use content-driven height again; summaries are no longer clipped by the fixed-height/line-clamp combination introduced in the previous layout adjustment.
- The References parent page is removed from active Rules navigation. Anthro Mundas, FAQ, and Changes & Updates open directly; `/rules/read/references-overview` remains an isolated compatibility alias to Anthro Mundas.
- Brambleheart Text Size values were compared with Old.dex and already match exactly: Smallest -2px, Small -1px, Normal 0px, Large +1px, Largest +2px. No second font-size system was added.

## Rule Navigation & Organization
- The top Fundamental/Lore arrow controls now navigate to the previous or next rule page instead of merely scrolling the horizontal page strip.
- Ending pages now expose a bottom-right Back to Rules action instead of an empty navigation slot.
- `Keywords & Ability Types` is now `Keyword Abilities`; the standalone Core Abilities page is retired and its source-backed abilities are shown as individual rule boxes on the combined page.
- Legacy `keywords-ability-types` and `core-abilities` URLs resolve through explicit aliases to `keyword-abilities`.
- To Damage now contains Damage Category, Damage Type/Soak handling, and Resistances & Weakness. The former child-page URLs resolve to To Damage.
- Health now contains Health, Healing, Defeated, and Encounter End. The former child-page URLs resolve to Health.
- Encounter & Setup and Combat Abilities no longer duplicate To Hit/To Defend or Core Ability source sections that have their own canonical destinations.

## Rule Presentation
- Ability Targeting places the Touch pill directly beneath the Combat Range title.
- To Strike presents Melee, Ranged, and Magical Strike rules as separate rule boxes.
- Playable Species artwork receives a black outline that follows the upper-right artwork-panel curve on wider layouts and squares off on narrow layouts.
- Rules pages are wrapped in a dedicated rule-surface token boundary so role themes continue to change accents without recoloring rule panel backgrounds; Dark Mode still supplies the corresponding dark rule surfaces.

## Release Integrity
- Visible build, package version, character export version source, PWA cache marker, README, patch notes, repository changelog, and in-app changelog are synchronized to Beta 0.24 / 0.24.0.
- This patch is based on current GitHub main commit `5fc61aac73c895a8081435ba5c7d1ce6a4401609` (Beta 0.23).
- Static TypeScript syntax and Vue template tag-balance checks were performed on the synthesized Rule Reader changes. A production Vite/vue-tsc build and live responsive/browser test could not be performed in the available runtime because the repository dependencies are not installed here.
