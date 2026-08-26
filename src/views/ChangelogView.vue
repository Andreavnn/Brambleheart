<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'

type Release={version:string;summary:string;items:string[];open?:boolean}
const releases:Release[]=[
  {version:'Beta Build 0.24',summary:'Rules-reader consolidation, navigation repair, stable panels, and header alignment',open:true,items:[
    'Realigns Back and Dark Mode controls to the normal content width without shifting the enlarged centered logo.',
    'Restores content-driven Recent Rules card height so titles and summaries are no longer clipped.',
    'Removes the intermediate References landing page and links Anthro Mundas, FAQ, and Changes & Updates directly, while keeping the former References URL only as a compatibility alias.',
    'Renames Keywords & Ability Types to Keyword Abilities and combines the source-backed Core Abilities into individual rule boxes on the same page; the former keyword/core URLs are aliases.',
    'Repairs Fundamental and Lore arrow navigation so the controls open the previous/next page and adds Back to Rules to ending pages.',
    'Boxes Melee, Ranged, and Magical To Strike rules, moves Touch beneath Combat Range, and adds a black outline to playable Species artwork.',
    'Combines Damage Category, Damage Type, and Resistance & Weakness into To Damage, and Healing, Defeated, and Encounter End into Health, with legacy routes isolated as aliases.',
    'Keeps Rules panel surfaces stable across role themes while retaining Dark Mode, and verifies the five Text Size offsets already match Old.dex without adding duplicate size rules.',
  ]},
  {version:'Beta Build 0.23',summary:'Character Creation flow, Homeland skills, equipment rules, and Review-sheet reliability',open:true,items:[
    'Requires a Character Name before leaving Species, streamlines Culture Trait exchange, moves Passive into Culture Trait keyword pills, and makes both Body & Spirit path cards advance directly to their respective next step.',
    'Moves custom-Homeland Skill selection into the Homeland step using the supplied Homeland skill-tree rules and prevents the Starting Skills step from treating custom Homelands like premade ones.',
    'Rebalances Attribute-row layout so Rank/Modifier controls are larger and right-aligned while Secondary Stats occupy the smaller panel.',
    'Corrects Threadpiece presentation, removes Weapon Qualities from the purchase categories, renders weapon qualities as pills, restores the complete Armor & Shields catalog, and shows source-backed gear effects/options in the purchase window.',
    'Applies purchased Armor/Shield Guts bonuses cumulatively and Mana Syphon to spell costs on the character sheet, while enforcing Might requirements on new armor purchases.',
    'Equalizes Starting Language cards, adds the selected additional-language pill, locks Review identity fields by default with Change/Lock controls, and replaces narrow-screen equipment scrollbars with left/right controls.',
    'Restores rule-category color identity and standard title-bar treatment to Review rule boxes across themes.',
  ]},
  {version:'Beta Build 0.22',summary:'Old.dex theme migration, background/view controls, stable detail colors, and interface alignment',open:true,items:[
    "Replaced Brambleheart's former role palettes with the supplied Old.dex Default, Powers of Chaos, Forces of Fantasy, Ravening Hordes, and Legions of Undead palettes mapped to Default, The Warrior, The Healer, The Ranger, and The Thief.",
    'Kept spell-lore, Trait, Talent, Spark, Homeland, Oath, Faith, and Equipment/Gear detail colors independent from the selected site theme.',
    'Doubled the desktop header-logo scale and expanded the header canvas so the larger identity remains centered instead of being squeezed by the normal page width.',
    'Normalized all background images to the same centered cover position, removed the Skullfen-specific offset, restored full-color artwork in View Background even when grayscale is enabled, and added a next-background arrow.',
    'Rebuilt Donation as a normal Settings row, restored theme-safe separator lines around expandable Settings panels, generalized the Backgrounds help text, and enlarged Settings category labels.',
    'Centered shared button labels, indented Rules chapter child rows, normalized Recent Rules card heights, and removed the visible native Character import control so Character List has one import action.',
  ]},
  {version:'Beta Build 0.21',summary:'Mobile Text Size repair, cumulative source normalization, route/status consistency, and repository integrity',open:true,items:[
    'Fixed the mobile Text Size control at its canonical CSS definition by removing the fixed flex basis that became vertical height when Settings rows stack.',
    'Rolled the source-normalization work forward cumulatively from the actual GitHub Beta 0.19 application baseline instead of layering another override on the contaminated stylesheet.',
    'Kept obsolete Old.Dex/builder/game CSS, oversized Welcome tests, dead theme rules, and stale background references removed.',
    'Canonicalized Ability Targeting to the ability-targeting route while preserving the former Area-of-Effect URL as a compatibility alias.',
    'Removed the unused parallel rule-chapter catalog from bramble.ts so Rules navigation has one authoritative data source.',
    'Removed unused encounter-era helpers/service exports and centralized Level Up XP prices through the shared advancement-cost calculator.',
    'Centralized rank modifiers, derived statistics, equipment/Ability parsing, storage keys, and external support links instead of maintaining parallel view-specific implementations.',
    'Unified Rhythm Engine character filtering with explicit character status, preserved Approved-only Level Up, and corrected Custom Data/roll-history failure handling.',
    'Synchronized package, build, export, PWA cache, and release-document versions and documented replacement of the invalid two-byte Banner_AnthroMundas.png from the genuine historical artwork stored under the original Banner_AthroMundas.png filename.',
  ]},
  {version:'Beta Build 0.20',summary:'Welcome repair, stylesheet decontamination, theme consolidation, and storage reliability cleanup',open:true,items:[
    'Removed the obsolete oversized Welcome-logo scale test and rebuilt responsive Welcome/header identity sizing without clipping or horizontal overflow.',
    'Removed unrelated Old.Dex army-builder/game CSS and retired Brambleheart patch-layer selectors from the global stylesheet.',
    'Consolidated active text-size, role-theme, surface, and background contracts and removed dead Species-theme/retired-background rules.',
    'Centralized browser-storage operations behind the guarded storage service and simplified Reset Local Data while preserving Display settings.',
    'Renamed the residual Old.Dex-derived Rule Reader implementation class and retained historical Old.Dex changelog references only as release history.',
    'Retested legacy character migration, approval persistence, approval removal, and Approved-only Level Up behavior.',
  ]},
  {version:'Beta Build 0.19',summary:'Theme depth, shared card styling, Rules parent pages, Ability Targeting, and responsive sheet cleanup',open:true,items:[
    'Swapped Healer and Trickster palettes, corrected surface depth across themes, refined separator colors, and adjusted Skullfen Ruins positioning.',
    'Moved Donation detail text inside its panel, removed Clear Dice Rolls indentation, and refined Settings presentation.',
    'Placed Character Sheet before Dice Roller, rebuilt the tab treatment, added Character Detail, removed Path subtext, improved field spacing, and contained narrow sheet sections.',
    'Standardized reusable content boxes around the Species Trait card language.',
    'Added Rules parent overview pages, corrected breadcrumb destinations, and limited Anthro Mundas banners to the body-title position.',
    'Moved Lore fluff above spell lists, removed Lore names from spell title bars, and consolidated Movement, Survival, and Social Talents into Utility.',
    'Standardized Watcher monster rows and rebuilt Species Rules intros with identity/art columns and lore below.',
    'Renamed Area of Effect to Ability Targeting, added Combat Range and Touch, generalized targeting to Abilities, and combined Initiative/turn/Mana guidance into Rounds & Turns.',
  ]},
  {version:'Beta Build 0.18',summary:'Rules cleanup, character data controls, explicit creator choices, talent corrections, and equipment-sheet refinements',open:true,items:[
    'Renamed Text Size endpoints to Smallest and Largest and added double-confirmed character clearing by All, Incomplete, Unapproved, or Approved status.',
    'Reorganized Sparks & Deeds, Homelands, Oaths, Faiths, Talents, and Adventuring Gear into cleaner expandable rule groups using Character Creation card styling.',
    'Expanded Faith detail in Character Creation, removed implicit dropdown choices, and standardized Select placeholders.',
    'Corrected requested Talent names and category assignments, including Pouncer and Hearthwall.',
    'Rebuilt weapon and armor presentation as structured character-sheet slots and added collapsible sheet sections.',
    'Adjusted Threadpiece presentation and preserved grayscale when using View Background.',
    'Rebuilt character approval around an explicit status model, migrated legacy lock-based approvals, removed Vue Proxy cloning from approval/Level Up transactions, and gated Level Up to Approved characters.',
  ]},
  {version:'Beta Build 0.17',summary:'Rules organization, Dice Roller, character-sheet parity, AoE targeting, approval fixes, and background controls',open:true,items:[
    'Renamed Rhythm Engine Attribute Check to Dice Roller and rebuilt the saved Character Sheet to match the final Character Creation Review layout.',
    'Reorganized Traits, Talents, Spells, and Watcher creature references into expandable parent categories using Character Creation conventions.',
    'Added The Battles → Area of Effect with the supplied Line, Cone, Orb, Direct Casting, and Impassable Collision rules and diagrams.',
    'Fixed completed-character approval movement and rebuilt Approved, Unapproved, and Incomplete lists as expandable panels without floating empty messages.',
    'Corrected false Mana pills and Mana COST parsing, and hardened automatic rule-banner filename matching.',
    'Added Donation detail text, consolidated footer tools/build detail, corrected Dark Mode background treatment, and added a background-only viewing control.',
  ]},
  {version:'Beta Build 0.16',summary:'Creator refinement, Heritage terminology, rule banners, launch audio, and interface alignment',items:[
    'Added optional installed-app launch fanfare and a Launch Audio setting.',
    'Corrected splash-page containment, responsive Text Size controls, and Settings Background disclosure styling.',
    'Renamed visible Species Trait terminology to Heritage Trait and refined Character Creation cards, defaults, Attributes, Threadpieces, Languages, and Review.',
    'Added Offensive Combat and Defensive Combat Talent categories and split completed characters into Approved and Unapproved lists.',
    'Added rule-banner placeholders/navigation, Discord access, and Character Sheet alignment work.',
  ]},
  {version:'Beta Build 0.15',summary:'Reliability, accessibility, persistence safety, validation, and repository cleanup',items:[
    'Hardened the service worker, local persistence, and Level Up transactions against failed writes and bad cached responses.',
    'Added modal focus trapping, Escape dismissal, and focus restoration.',
    'Prevented Character Creation progress jumps from bypassing required validation and unified Talent prerequisite enforcement.',
    'Improved Custom Data import feedback and corrected Gloommere’s Whisperster Skill handling.',
    'Removed retired background/payload material and advanced the visible build and PWA shell cache.',
  ]},
  {version:'Beta Build 0.14',summary:'Typed Custom Data, automatic backgrounds, Attribute Check labels, and saved-character sheets',open:true,items:[
    'Added a downloadable typed JSON template pack for custom Species, Spells, Talents, and Traits, plus recognized imports and visible Custom labeling.',
    'Added an Allow Custom Data switch to Character Creation so imported options are explicitly enabled per character.',
    'Made Background Settings discover supported images from the background asset folder automatically and added Skullfen Ruins plus Blightbound Horror.',
    'Clarified Strike-related Attribute Check stats as Shooting, Melee, and Magic.',
    'Replaced the Rhythm Engine Combat Encounter section with a saved-character Character Sheet and moved character selection directly below the tool tabs.',
    'Removed the old Encounter route from active navigation and cleaned obsolete Simulator encounter dependencies.',
  ]},
  {version:'Beta Build 0.13',summary:'Advancement, creator cleanup, Rules boxing, backgrounds, popup repair, and encounter character sheets',open:true,items:[
    'Added Approved character progression and a source-cost Level Up page for Attributes, Skills, new Skills, and Magic Level.',
    'Refined Culture Skill awards, Spark-specific Deed examples, Homeland Skills, Attribute Rank/Modifier layout, Oath/Faith and Lore spacing, Languages, wealth, and Review.',
    'Rebuilt Talent/Culture/Gear popup sizing so full cards remain visible on desktop, tablet, and mobile.',
    'Reworked Deeds, Oaths, Faith, Homeland, Talents, Spells, and Equipment rule presentation into stronger individual boxes and corrected oversized narrative notes.',
    'Added Thornwick Market and Skullfen Ruins backgrounds, kept Ready For Adventure on the splash page, and tightened logo/navigation spacing.',
    'Further rebuilt Combat Encounters as a persistent pen-and-paper sheet with always-visible Core Abilities, boxed Talents/Spells, one log, and simplified encounter actions.',
  ]},
  {version:'Beta Build 0.12',summary:'Creator polish, structured Rules, source-backed Watcher references, roll summaries, and character-sheet encounters',items:[
    'Refined Character Creation Culture Skill selection, Deed guidance, Attribute rows, Oath/Faith spacing, spell ordering/capitalization, NP wealth, Languages, and Review.',
    'Added background grayscale control and removed the paper backing behind the logo on image-backed pages.',
    'Reordered Fundamentals, boxed Skill Trees/Heritage Traits and comparable Rules entries, and synchronized source-backed Building Selu examples.',
    'Added Encounter Rating guidance plus an indexed local Rules page for every creature exposed by the supplied Woodlands monster reference without fabricating unavailable statistics.',
    'Tightened Attribute Check targeting and added a dynamic sentence-form roll formula.',
    'Refined Combat Encounter pages further toward a clickable pen-and-paper character-sheet presentation.',
  ]},
  {version:'Beta Build 0.11',summary:'Character-sheet encounters, visible character actions, stronger themes, rule navigation, and Ready For Adventure',items:[
    'Made Character List Edit, Lock, Copy, and Delete controls always visible and added clear Complete/Incomplete status treatment.',
    'Simplified creator identity to Character Name, Campaign, and Appearance; tightened Review, Languages, Talents, and creator popup layouts.',
    'Separated Attribute Check and Combat Encounter sheets, disabled Skills for roll types that do not use them, and rebuilt encounter pages around clickable character statistics and weapons.',
    'Restored Default and strengthened all six archetype themes in both light and Dark Mode.',
    'Removed the redundant Brambleheart lore page, expanded previous/next rule navigation, flattened rule-card internals, and reduced FAQ typography.',
    'Reduced header/navigation spacing, enlarged the logo one step, made Reset Data return to Welcome, hardened splash install handling, and replaced selectable backgrounds with Ready For Adventure.',
  ]},
  {version:'Beta Build 0.10',summary:'Character campaigns, Lore section pages, archetype themes, dependent Attribute Checks, and dedicated encounters',open:true,items:[
    'Added Campaign Name and updated the Character List identity summary.',
    'Split Lore of Anthro Mundas into navigable section pages and removed keyword pills from Rule Reader pages.',
    'Replaced themes with Warrior, Ranger, Spellcaster, Healer, Thief, and Trickster and reduced the large-logo test by half.',
    'Made Attribute Check choices dependent on Roll Type and selected Stat, and moved Combat Encounters to their own routed pages.',
    'Refined Culture Traits, Talents, Skills, Mana, Threadpiece wealth, Equipment & Gear, Languages, and Review.',
  ]},
  {version:'Beta Build 0.09',summary:'Rules reader presentation, creator refinement, theme repair, and encounter validation',open:true,items:[
    'Rebuilt the Rules landing page, removed the redundant Table of Content page, expanded full-width search, and added breadcrumbs plus Old.Dex-inspired Fundamental navigation.',
    'Added a site-wide WIP banner, enlarged the Brambleheart logo for the requested scale test, and repaired Dark Mode surfaces for non-default role themes.',
    'Expanded Fortune & Misfortune guidance, removed the empty target placeholder, added saved-character Attribute Checks, and made Combat Encounters require a selected character.',
    'Refined creator identity fields, Selu examples, help panels, Attributes, Skills, Lore Spells, Talent grouping, modal scroll behavior, equipment purchasing, Languages, and Review.',
    'Reworked trait, talent, spell, and rule presentation toward the Old.Dex special-rule card language for future icons and type color coding.',
  ]},
  {version:'Beta Build 0.08',summary:'Rules navigation, character creator stabilization, and character-linked encounters',items:[
    'Fixed the Starting Spells → Talents character creator crash.',
    'Reorganized References, The Fundamentals, and Playable Species; added Fundamental inner links and recently viewed Rules boxes.',
    'Refined creator Species/Culture presentation, resizable Appearance, Skill Rank + Modifier display, information cards, button colors, and Lore-colored Spell cards.',
    'Added Default to the top of Themes.',
    'Expanded Combat Encounters with saved-character selection, secondary stats, Skills, Talents, Mana, Spells, Abilities, Melee/Ranged/Magical Strike modes, Attacking & Defending, and Resistance/Weakness controls.',
    'Added the Fortune & Misfortune Rhythm Engine tip and refreshed the PWA shell cache.',
  ]},
  {version:'Beta Build 0.07',summary:'Rhythm Engine, character creator, Species artwork, and interface refinement',items:[
    'Replaced Species-linked display themes with four stable player-archetype themes.',
    'Updated splash entry, Thornwick Market presentation, Discord access, fixed backgrounds, and green interaction highlights.',
    'Rebuilt the Rhythm Engine around Attribute Checks and persistent Combat Encounters with Health, Mana, Fate Marks, round tracking, combat tools, and history.',
    'Rebuilt guided character creation with clickable step navigation, Species artwork, Culture Trait exchange, source-based Skill ranks, revised Attributes, custom Homelands, Magic/Lore and Spell steps, Talent validation, Equipment & Gear, draft saves, and final validation.',
    'Added character locking and refined display treatment for Traits, Talents, Spells, and rule keywords.',
  ]},
  {version:'Beta Build 0.06',summary:'Character creator and Rules expansion',items:['Expanded guided creation, standalone source-backed Rules pages, Donation controls, and Beta presentation.']},
  {version:'Alpha Build 0.05',summary:'Reader, rules, backgrounds, and tabletop tools',items:['Added supplied backgrounds, the expanded Rules reader, guided creation, encounter history, Rhythm roll history, Custom Data, and repository cleanup workflow.']},
  {version:'Alpha Build 0.04',summary:'Reader GUI alignment',items:['Established the compact routed reader layout, Settings presentation, welcome flow, and shared interface components.']},
  {version:'Alpha Build 0.03',summary:'Reference and Settings expansion',items:['Added five text sizes, bold text, install controls, grouped Rules reference, Recent Rules, and the initial splash page.']},
  {version:'Alpha Build 0.02',summary:'Initial GUI overhaul',items:['Standardized the first generation of application panels, controls, spacing, and Settings.']},
  {version:'Alpha Build 0.01',summary:'Initial application build',items:['Initial Vue 3 + TypeScript + Vite build with Character List, Rules, Simulator, Settings, local persistence, and Brambleheart assets.']},
]
</script>

<template>
  <main class="page changelog-page">
    <AppHeader compact back-to="/characters" back-label="Back to Character List" />
    <div class="page-title-block"><h1>Site Changelog</h1><p>Changes to the Brambleheart companion site. System-rule amendments are tracked under Rules → Changes &amp; Updates.</p></div>

    <div class="changelog-stack">
      <details v-for="(release,index) in releases" :key="release.version" class="changelog-entry card-surface" :open="release.open">
        <summary><span><strong>{{ release.version }}</strong><small>{{ release.summary }}</small></span><span v-if="index===0" class="value-chip">CURRENT</span></summary>
        <div class="changelog-entry-body"><ul><li v-for="item in release.items" :key="item">{{ item }}</li></ul></div>
      </details>
    </div>
  </main>
</template>
