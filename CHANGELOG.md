# Brambleheart Beta 0.22

- Replaced the previous Brambleheart role palettes with the supplied Old.dex palettes: Default → Default, Powers of Chaos → The Warrior, Forces of Fantasy → The Healer, Ravening Hordes → The Ranger, and Legions of Undead → The Thief. Removed Spellcaster and Trickster from the active theme model while isolating legacy saved-value migration at the Settings boundary.
- Restored fixed content-category color identity for spell lore, Heritage/Cultural Traits, Talents, Sparks, Homelands, Oaths, Faiths, and Equipment/Gear so these detail cards do not inherit a different identity when the site theme changes.
- Doubled the desktop header logo scale and expanded the header canvas so the larger logo remains centered without altering normal content width.
- Normalized all backgrounds to the same centered cover positioning, removed the Skullfen Ruins special offset, made View Background always show the full-color artwork regardless of grayscale/dark-mode display settings, and added a right-arrow background cycler.
- Rebuilt Donation as a standard Settings row, replaced repository-oriented Backgrounds help copy with user-facing text, restored theme-aware separator lines around expandable Settings controls, and increased Settings category labels by two pixels.
- Centered shared button labels, indented Rules category child rows, made Recent Rules cards equal height, and hid the native file input so Character List exposes only the intended Import Character action.
- Synchronized package, visible build, exports, PWA cache, README, patch notes, and in-app changelog to Beta 0.22.

# Brambleheart Beta 0.21

- Fixed the mobile Settings Text Size control at its canonical definition: removed the fixed flex basis that became vertical height when Settings rows stack on narrow screens, so the five size buttons remain a compact single control.
- Rolled the Beta 0.20 source-normalization work forward cumulatively because the current GitHub application source was still on the Beta 0.19 implementation baseline.
- Kept the cleaned Brambleheart-only stylesheet as the authoritative source instead of adding another override layer; obsolete Old.Dex/builder/game selectors, oversized Welcome tests, dead theme rules, and superseded implementation blocks remain removed.
- Canonicalized the Ability Targeting route slug to `ability-targeting` while retaining `area-of-effect` only as a backward-compatible URL alias.
- Removed the unused legacy `ruleChapters` catalog from `bramble.ts` so Rules metadata has one authoritative catalog instead of a stale parallel definition.
- Removed unused encounter-era rules helpers and unused service exports, and routed Level Up advancement prices through the shared `advancementCost` function so XP costs are not implemented twice.
- Centralized rank modifiers, derived character statistics, equipment profile parsing, equipment Guts bonuses, and structured Ability-field parsing in the shared rules engine so Character Creation and Rhythm Engine do not maintain parallel implementations.
- Unified Rhythm Engine completed-character filtering with the explicit Incomplete / Unapproved / Approved status model and preserved Approved-only Level Up behavior.
- Centralized storage keys and external support/donation links, made Rhythm roll-history write failures visible, and corrected Custom Data clearing so the UI is updated only after browser storage confirms the deletion succeeded.
- Applied the intended Approved visual state class to approved Character List cards.
- Synchronized package, visible build, character export, character-list export, PWA cache, README, patch notes, and in-app changelog versions to Beta 0.21.
- Identified the current GitHub `Banner_AnthroMundas.png` as a two-byte CRLF placeholder rather than a valid image; repository history confirms the genuine 2,696,927-byte artwork remains available in commit `0a5ddb56e9e3eaa5b4fe6301b150c59351ee547b` under the original typo filename `Banner_AthroMundas.png`, with restoration instructions isolated from uploadable patch files.

# Brambleheart Beta 0.20

- Removed the obsolete Beta 0.09 oversized Welcome-logo scale test that was overriding current responsive sizing and clipping the splash identity.
- Purged unrelated Old.Dex/army-builder CSS and retired Brambleheart patch-layer selectors from the global stylesheet, then consolidated active text-size, theme, surface, header, and Welcome definitions.
- Reduced the global stylesheet from roughly 3,900 lines to about 1,400 active Brambleheart lines while retaining currently used component selectors and responsive behavior.
- Removed dead Species-theme CSS and obsolete background-asset exclusions/references, leaving one active role-theme and background contract.
- Centralized browser-storage reads, writes, removals, and key enumeration behind the safe storage service; simplified Reset Local Data so it clears Brambleheart data without a hard-coded historical-key list while preserving Display settings.
- Renamed the residual Old.Dex-derived Rule Reader CSS hook to a Brambleheart-neutral source rule section name.
- Preserved the explicit Incomplete / Unapproved / Approved character status model and Approved-only Level Up behavior from the Beta 0.18 reliability hotfix.
- Advanced the visible build, character export markers, and PWA shell cache to Beta 0.20.

# Brambleheart Beta 0.19

- Swapped the Healer and Trickster theme palettes, corrected foreground/background surface hierarchy across themes, and refined dark-theme separators.
- Adjusted Skullfen Ruins background positioning and tightened Settings Donation, Reset Local Data, and Clear Dice Rolls presentation.
- Reversed the Rhythm Engine tabs so Character Sheet appears before Dice Roller, corrected the tab treatment, added Character Detail, removed Path subtext, improved Dice Roller spacing, and contained narrow Character Sheet sections.
- Standardized content boxes around the Species Trait card language across Rules, Character Creation, character sheets, and comparable panels.
- Added functional parent Rules overview pages for breadcrumb navigation and moved Anthro Mundas banner placeholders beneath each lore body title only.
- Moved Lore fluff above spell lists, removed Lore names from spell title bars, and consolidated Movement, Survival, and Social Talents into Utility.
- Normalized Watcher monster entry bars so variant families expand consistently and single entries are direct links.
- Renamed Area of Effect to Ability Targeting, added Combat Range and Touch, generalized Direct/Line/Cone/Orb rules to Abilities, and placed targeting under Combat Abilities.
- Combined Initiative Order, Rounds & Turns, Your Turn, and Mana into a single structured Rounds & Turns page.
- Rebuilt Species Rules introductions with a two-column identity/art hero and lore beneath, and preserved explicit approval/Level Up status behavior from the 0.18 hotfix.

# Brambleheart Beta 0.18

- Renamed Settings Text Size endpoints to Smallest and Largest and added double-confirmed character clearing for All, Incomplete, Unapproved, and Approved characters.
- Reorganized Sparks & Deeds, Homelands, Oaths, Faiths, Talents, and Adventuring Gear into expandable rule groups using the same card language as Character Creation.
- Expanded Faith detail in Character Creation, removed implicit dropdown choices, and standardized default Select placeholders.
- Corrected requested Talent names and category assignments, including Pouncer and Hearthwall.
- Reworked Weapons and Armor into structured character-sheet slots and added collapsible Character Sheet sections.
- Cleaned Threadpiece presentation and preserved grayscale while using View Background.
- Hotfix: replaced lock-based approval with explicit Incomplete/Unapproved/Approved status, migrated legacy characters, removed reactive Proxy cloning from approval and Level Up transactions, and gated Level Up to Approved characters.

# Brambleheart Beta 0.17

- Renamed Rhythm Engine Attribute Check to Dice Roller and matched the saved Character Sheet to the Character Creation Review layout.
- Reorganized Traits, Talents, Spells, and Watcher creature references into expandable parent categories matching Character Creation conventions.
- Added The Battles → Area of Effect with the supplied Line, Cone, Orb, and collision diagrams; Winds of Magic now cross-references it.
- Fixed character approval movement and rebuilt Approved, Unapproved, and Incomplete lists as connected expandable panels.
- Removed false Mana pills, corrected Mana COST parsing, and hardened rule-banner matching for uploaded banner files.
- Added Donation detail text, consolidated the page-tool/build footer, corrected Dark Mode background treatment, and added a background-only viewing control.
- Updated repository documentation/changelog state, removed inactive Encounter source files, and advanced the app/PWA/export markers to Beta 0.17.

# Brambleheart Beta 0.16


- Added optional installed-app launch fanfare and a Launch Audio setting.
- Corrected splash-page width containment and responsive Text Size controls.
- Renamed visible Species Trait terminology to Heritage Trait throughout the companion.
- Tightened Character Creation spacing, defaults, Attribute controls, Threadpiece display, Languages, and Review layout.
- Moved ability-cost/type pills to card title bars and standardized Heritage/Cultural trait identity pills, Talent cards, and Spell cards.
- Added Offensive Combat and Defensive Combat Talent categories.
- Split completed characters into Approved and Unapproved lists.
- Added auto-discovered rule banner placeholders and clickable left/right rule-navigation controls.
- Aligned the Rhythm Engine Character Sheet more closely with the creation Review sheet.
- Added Discord to the global page tools.
- Fixed Settings Background disclosure styling and removed the stray separator.

# Site Changelog

## Beta 0.15

- Relaxed the Node engine ceiling while retaining Node 22 as the minimum supported runtime.
- Hardened the service worker so it ignores cross-origin requests, never caches failed responses, and uses the cached shell only as an offline navigation fallback.
- Added reusable focus trapping, Escape dismissal, and trigger-focus restoration to all current modal dialogs.
- Added explicit character-storage failure handling and transactional Level Up persistence so failed local writes do not discard or falsely report saved work.
- Prevented Character Creation progress-step jumps from bypassing required validation.
- Unified Talent prerequisite enforcement between Character Creation and Level Up.
- Added Custom Data import counts for recognized and skipped entries.
- Corrected Gloommere's Whisperster Skill and made Attribute Check Skill filtering fail closed for unknown Skills.
- Excluded retired background files before bundling and removed obsolete Old.Dex payload/migration files plus inactive Encounter source files from the v0.15 package.
- Advanced the visible build and PWA shell cache to Beta 0.15.

## Beta 0.14

- Added typed downloadable JSON templates and import support for custom Species, Spells, Talents, and Traits, with explicit Custom labeling and a per-character Allow Custom Data switch.
- Rebuilt Background selection around automatic image discovery from `src/assets/backgrounds`, removed option detail text, and added the supplied Skullfen Ruins and Blightbound Horror artwork.
- Updated Attribute Check Strike stats to identify Shooting, Melee, and Magic use.
- Replaced the Rhythm Engine Combat Encounter section with a saved-character Character Sheet and moved character selection into a shared panel beneath the tool tabs.
- Removed the legacy Encounter route from active routing and cleaned obsolete Simulator encounter dependencies.
- Advanced the visible build and PWA shell cache to Beta 0.14.

## Beta 0.13

- Rebuilt Combat Encounters as a non-collapsible pen-and-paper character sheet with permanent Core Abilities, clickable combat/character fields, one event record, and corrected ongoing/history controls.
- Added Approved characters and a Beyond Character Creation Level Up page with source-backed XP costs.
- Refined Cultural Skills, Spark Deed examples, Homeland/Starting Skills, Attributes, Oath/Faith, Lore, Languages, Equipment wealth, Talent popups, and Review Character.
- Removed duplicate Attribute Check roll type, alphabetized Rhythm roll types, and simplified Fortune/Misfortune guidance.
- Added Thornwick Market and Skullfen Ruins backgrounds and pinned the splash page to Ready For Adventure.
- Added build number to Settings → Site Changelog and tightened header/navigation spacing and responsive popup layouts.

## Beta 0.12

- Refined Character Creation Culture Skill selection, Deed guidance, Attributes, Faith/Oath spacing, spell ordering/capitalization, NP wealth, Languages, and Review character-sheet layout.
- Added Background grayscale control, removed image-background backing behind the site logo, preserved Complete/Incomplete Character List groups, and limited Rules recent access to 2 × 2.
- Reordered The Fundamentals, boxed Skill Trees/Species Traits and comparable Rules content, synchronized Building Selu examples, and added source-backed Encounter Rating/monster index pages.
- Tightened Attribute Check target controls and added a descriptive dynamic roll formula.
- Refined dedicated Combat Encounter pages further toward a clickable pen-and-paper character sheet.

## Beta 0.11

- Added always-visible Character List actions and Complete/Incomplete status treatment; simplified creator identity to Name, Campaign, and Appearance.
- Split Rhythm Engine interaction into Attribute Check and Combat Encounter sheets, disabled Skills for non-Skill roll types, and rebuilt dedicated encounters around a clickable character sheet and weapon attacks.
- Restored Default and strengthened Warrior, Ranger, Spellcaster, Healer, Thief, and Trickster themes across full light/dark surfaces and controls.
- Removed the redundant Brambleheart lore page, expanded previous/next navigation across rule categories, reduced FAQ typography, and flattened rule-card internals.
- Seeded Rules with default Recent/Common access, tightened creator modals/languages/review, and applied explicit permanent equipment Guts to character-sheet stats.
- Reduced header-to-navigation spacing, increased the logo one step, made Reset Data return to Welcome, hardened the splash install flow, and replaced selectable backgrounds with Ready For Adventure.

## Beta 0.10

- Added Campaign Name to characters and the Character List.
- Split Lore of Anthro Mundas into section pages with previous/next navigation and removed Rule Reader keyword pills.
- Replaced role themes with Warrior, Ranger, Spellcaster, Healer, Thief, and Trickster; reduced the previous oversized logo test by half.
- Reworked Attribute Check dependencies and moved Combat Encounters to dedicated pages.
- Refined Culture/Talent selection, Skill normalization, Winds of Magic Mana guidance, Threadpiece wealth, Equipment attachments, Languages, and Character Review.
- Normalized mobile/tablet select controls and card dividers.

## Beta 0.09

- Rebuilt the Rules landing page around the supplied reference layout, removed the redundant Table of Content page, made Rules search full width, and added breadcrumbs.
- Reworked source-backed rule sections and Fundamental previous/next controls toward the Old.Dex Core Rules presentation.
- Added a WIP banner and the requested large-logo scale test.
- Fixed Dark Mode so non-default role themes apply dark surfaces across the full site instead of changing only accent/menu colors.
- Removed the empty No Target result placeholder, expanded Fortune & Misfortune guidance, added saved-character Attribute Checks, and require a character before starting a Combat Encounter.
- Refined Character Creation identity fields, Selu callouts, help panels, Attribute controls, cultural Skills, Homeland Skill labels, Mana guidance, Lore Spells, attuned Lore labels, and Talent grouping.
- Rebuilt Equipment & Gear purchasing with category tabs, readable profiles/descriptions/effects, required purchase choices where applicable, currency guidance, and a Purchased Equipment & Gear list.
- Added an additional selectable Language with language guidance and rebuilt Review to show editable name, Attributes/Modifiers, secondary stats, Skills, and Equipment.
- Locked page scrolling behind creator popup panels while preserving touch/mouse scrolling inside the popup itself.
- Preserved the Beta 0.08 creator crash fix and corrected Character Creation page boundary.

## Beta 0.08

- Rebuilt from the stable Beta 0.06 package rather than the broken Beta 0.07 implementation baseline.
- Fixed the Spells / Invocations → Talents creator crash and Species/Culture layout overflow.
- Added requested creator presentation fixes, Culture Trait popup, Skill Rank + Modifier, and Lore-colored Spell cards.
- Reorganized Rules into References, Table of Content, The Fundamentals, and a standalone Playable Species section; added recent Rules boxes.
- Added Default as the first Theme option.
- Expanded Combat Encounters with saved-character data, Abilities/Root tracking, Melee/Ranged/Magical Attacking & Defending, Spells & Mana, and Resistance/Weakness.
- Advanced the PWA shell cache and visible build label to 0.08.

## Beta 0.06

- Expanded guided Character Creation with Species lore and Traits, Culture Traits, Skills, Spark/Deed guidance, Homeland, Faith & Oath guidance, detailed Attribute allocation, Body & Spirit paths, Lore Attunement, Spells, Talents, equipment purchasing, Languages, and final character review.
- Added source-backed individual Playable Species and Lore of Magic reader pages, Quick Reference, FAQ, Recent Rules, Changes & Updates, and linked Fundamental-rule navigation.
- Refined the Rules menu hierarchy, parent/child tones, keyword pills, capitalization, and example-dialogue presentation.
- Expanded the Rhythm Engine with Reason for the Roll, separate Attribute/Secondary Stat and optional Skill values, targets, Fortune/Misfortune results, and five-roll history.
- Moved Strike vs Ward into the Encounter tracker and retained ongoing/completed encounter history with pinning.
- Updated the Brambleheart identity presentation, responsive logo sizing, Beta labeling, browser/app naming, and text consistency.
- Connected Donation and Recurring Support to the supplied support links.
- Retained Custom Data, fixed-cover backgrounds, install support, Simulator reset controls, and the protected repository cleanup workflow.

## Alpha 0.05

- Added fixed-cover Brambleheart backgrounds, standalone Rules reader pages, the initial guided Character Creation flow, expanded Simulator history, and repository cleanup tooling.

## Alpha 0.04

- Established the compact routed reader layout, Settings presentation, welcome flow, and shared interface components.

## Alpha 0.03

- Added five text sizes, bold text, species palettes, install controls, grouped Rules reference, Recent Rules, and the initial splash page.

## Alpha 0.02

- Standardized the first generation of application panels, controls, spacing, and Settings.

## Alpha 0.01

- Initial Vue 3 + TypeScript + Vite companion build with Character List, Rules, Simulator, Settings, local persistence, and Brambleheart assets.
