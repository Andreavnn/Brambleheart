<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
</script>

<template>
  <main class="page changelog-page">
    <AppHeader compact back-to="/characters" back-label="Back to Character List" />
    <div class="page-title-block"><h1>Site Changelog</h1><p>Changes to the Brambleheart companion site. System-rule amendments are tracked under Rules → Changes &amp; Updates.</p></div>

    <div class="changelog-stack">
      <details class="changelog-entry card-surface" open>
        <summary><span><strong>Beta Build 0.23</strong><small>Character Creation flow, Homeland skills, equipment rules, and Review-sheet reliability</small></span><span class="value-chip">CURRENT</span></summary>
        <div class="changelog-entry-body"><ul>
          <li>Requires a Character Name before leaving Species, streamlines Culture Trait exchange, moves Passive into Culture Trait keyword pills, and makes both Body &amp; Spirit path cards advance directly to their respective next step.</li>
          <li>Moves custom-Homeland Skill selection into the Homeland step using the supplied Homeland skill-tree rules and prevents the Starting Skills step from treating custom Homelands like premade ones.</li>
          <li>Rebalances Attribute-row layout so Rank/Modifier controls are larger and right-aligned while Secondary Stats occupy the smaller panel.</li>
          <li>Corrects Threadpiece presentation, removes Weapon Qualities from the purchase categories, renders weapon qualities as pills, restores the complete Armor &amp; Shields catalog, and shows source-backed gear effects/options in the purchase window.</li>
          <li>Applies purchased Armor/Shield Guts bonuses cumulatively and Mana Syphon to spell costs on the character sheet, while enforcing Might requirements on new armor purchases.</li>
          <li>Equalizes Starting Language cards, adds the selected additional-language pill, locks Review identity fields by default with Change/Lock controls, and replaces narrow-screen equipment scrollbars with left/right controls.</li>
          <li>Restores rule-category color identity and standard title-bar treatment to Review rule boxes across themes.</li>
        </ul></div>
      </details>
      <details class="changelog-entry card-surface" open>
        <summary><span><strong>Beta Build 0.22</strong><small>Old.dex theme migration, background/view controls, stable detail colors, and interface alignment</small></span></summary>
        <div class="changelog-entry-body"><ul>
          <li>Replaced Brambleheart's former role palettes with the supplied Old.dex Default, Powers of Chaos, Forces of Fantasy, Ravening Hordes, and Legions of Undead palettes mapped to Default, The Warrior, The Healer, The Ranger, and The Thief.</li>
          <li>Kept spell-lore, Trait, Talent, Spark, Homeland, Oath, Faith, and Equipment/Gear detail colors independent from the selected site theme.</li>
          <li>Doubled the desktop header-logo scale and expanded the header canvas so the larger identity remains centered instead of being squeezed by the normal page width.</li>
          <li>Normalized all background images to the same centered cover position, removed the Skullfen-specific offset, restored full-color artwork in View Background even when grayscale is enabled, and added a next-background arrow.</li>
          <li>Rebuilt Donation as a normal Settings row, restored theme-safe separator lines around expandable Settings panels, generalized the Backgrounds help text, and enlarged Settings category labels.</li>
          <li>Centered shared button labels, indented Rules chapter child rows, normalized Recent Rules card heights, and removed the visible native Character import control so Character List has one import action.</li>
        </ul></div>
      </details>
      <details class="changelog-entry card-surface" open>
        <summary><span><strong>Beta Build 0.21</strong><small>Mobile Text Size repair, cumulative source normalization, route/status consistency, and repository integrity</small></span></summary>
        <div class="changelog-entry-body"><ul>
          <li>Fixed the mobile Text Size control at its canonical CSS definition by removing the fixed flex basis that became vertical height when Settings rows stack.</li>
          <li>Rolled the source-normalization work forward cumulatively from the actual GitHub Beta 0.19 application baseline instead of layering another override on the contaminated stylesheet.</li>
          <li>Kept obsolete Old.Dex/builder/game CSS, oversized Welcome tests, dead theme rules, and stale background references removed.</li>
          <li>Canonicalized Ability Targeting to the <code>ability-targeting</code> route while preserving the former Area-of-Effect URL as a compatibility alias.</li>
          <li>Removed the unused parallel rule-chapter catalog from <code>bramble.ts</code> so Rules navigation has one authoritative data source.</li>
          <li>Removed unused encounter-era helpers/service exports and centralized Level Up XP prices through the shared advancement-cost calculator.</li>
          <li>Centralized rank modifiers, derived statistics, equipment/Ability parsing, storage keys, and external support links instead of maintaining parallel view-specific implementations.</li>
          <li>Unified Rhythm Engine character filtering with explicit character status, preserved Approved-only Level Up, and corrected Custom Data/roll-history failure handling.</li>
          <li>Synchronized package, build, export, PWA cache, and release-document versions and documented replacement of the invalid two-byte <code>Banner_AnthroMundas.png</code> from the genuine historical artwork stored under the original <code>Banner_AthroMundas.png</code> filename.</li>
        </ul></div>
      </details>
      <details class="changelog-entry card-surface" open>
        <summary><span><strong>Beta Build 0.20</strong><small>Welcome repair, stylesheet decontamination, theme consolidation, and storage reliability cleanup</small></span></summary>
        <div class="changelog-entry-body"><ul>
          <li>Removed the obsolete oversized Welcome-logo scale test and rebuilt responsive Welcome/header identity sizing without clipping or horizontal overflow.</li>
          <li>Removed unrelated Old.Dex army-builder/game CSS and retired Brambleheart patch-layer selectors from the global stylesheet.</li>
          <li>Consolidated active text-size, role-theme, surface, and background contracts and removed dead Species-theme/retired-background rules.</li>
          <li>Centralized browser-storage operations behind the guarded storage service and simplified Reset Local Data while preserving Display settings.</li>
          <li>Renamed the residual Old.Dex-derived Rule Reader implementation class and retained historical Old.Dex changelog references only as release history.</li>
          <li>Retested legacy character migration, approval persistence, approval removal, and Approved-only Level Up behavior.</li>
        </ul></div>
      </details>
      <details class="changelog-entry card-surface" open>
        <summary><span><strong>Beta Build 0.19</strong><small>Theme depth, shared card styling, Rules parent pages, Ability Targeting, and responsive sheet cleanup</small></span></summary>
        <div class="changelog-entry-body"><ul>
          <li>Swapped Healer and Trickster palettes, corrected surface depth across themes, refined separator colors, and adjusted Skullfen Ruins positioning.</li>
          <li>Moved Donation detail text inside its panel, removed Clear Dice Rolls indentation, and refined Settings presentation.</li>
          <li>Placed Character Sheet before Dice Roller, rebuilt the tab treatment, added Character Detail, removed Path subtext, improved field spacing, and contained narrow sheet sections.</li>
          <li>Standardized reusable content boxes around the Species Trait card language.</li>
          <li>Added Rules parent overview pages, corrected breadcrumb destinations, and limited Anthro Mundas banners to the body-title position.</li>
          <li>Moved Lore fluff above spell lists, removed Lore names from spell title bars, and consolidated Movement, Survival, and Social Talents into Utility.</li>
          <li>Standardized Watcher monster rows and rebuilt Species Rules intros with identity/art columns and lore below.</li>
          <li>Renamed Area of Effect to Ability Targeting, added Combat Range and Touch, generalized targeting to Abilities, and combined Initiative/turn/Mana guidance into Rounds &amp; Turns.</li>
        </ul></div>
      </details>
      <details class="changelog-entry card-surface" open>
        <summary><span><strong>Beta Build 0.18</strong><small>Rules cleanup, character data controls, explicit creator choices, talent corrections, and equipment-sheet refinements</small></span></summary>
        <div class="changelog-entry-body"><ul>
          <li>Renamed Text Size endpoints to Smallest and Largest and added double-confirmed character clearing by All, Incomplete, Unapproved, or Approved status.</li>
          <li>Reorganized Sparks &amp; Deeds, Homelands, Oaths, Faiths, Talents, and Adventuring Gear into cleaner expandable rule groups using Character Creation card styling.</li>
          <li>Expanded Faith detail in Character Creation, removed implicit dropdown choices, and standardized Select placeholders.</li>
          <li>Corrected requested Talent names and category assignments, including Pouncer and Hearthwall.</li>
          <li>Rebuilt weapon and armor presentation as structured character-sheet slots and added collapsible sheet sections.</li>
          <li>Adjusted Threadpiece presentation and preserved grayscale when using View Background.</li>
          <li>Rebuilt character approval around an explicit status model, migrated legacy lock-based approvals, removed Vue Proxy cloning from approval/Level Up transactions, and gated Level Up to Approved characters.</li>
        </ul></div>
      </details>
      <details class="changelog-entry card-surface" open>
        <summary><span><strong>Beta Build 0.17</strong><small>Rules organization, Dice Roller, character-sheet parity, AoE targeting, approval fixes, and background controls</small></span></summary>
        <div class="changelog-entry-body"><ul>
          <li>Renamed Rhythm Engine Attribute Check to Dice Roller and rebuilt the saved Character Sheet to match the final Character Creation Review layout.</li>
          <li>Reorganized Traits, Talents, Spells, and Watcher creature references into expandable parent categories using the Character Creation card language.</li>
          <li>Added The Battles → Area of Effect with the supplied Line, Cone, Orb, Direct Casting, and Impassable Collision rules and diagrams.</li>
          <li>Fixed completed-character approval movement and rebuilt Approved, Unapproved, and Incomplete lists as expandable panels without floating empty messages.</li>
          <li>Corrected false Mana pills and Mana COST parsing, and hardened automatic rule-banner filename matching.</li>
          <li>Added Donation detail text, consolidated footer tools/build detail, corrected Dark Mode background treatment, and added a background-only viewing control.</li>
        </ul></div>
      </details>
      <details class="changelog-entry card-surface">
        <summary><span><strong>Beta Build 0.16</strong><small>Creator refinement, Heritage terminology, rule banners, launch audio, and interface alignment</small></span></summary>
        <div class="changelog-entry-body"><ul>
          <li>Added optional installed-app launch fanfare and a Launch Audio setting.</li>
          <li>Corrected splash-page containment, responsive Text Size controls, and Settings Background disclosure styling.</li>
          <li>Renamed visible Species Trait terminology to Heritage Trait and refined Character Creation cards, defaults, Attributes, Threadpieces, Languages, and Review.</li>
          <li>Added Offensive Combat and Defensive Combat Talent categories and split completed characters into Approved and Unapproved lists.</li>
          <li>Added rule-banner placeholders/navigation, Discord access, and Character Sheet alignment work.</li>
        </ul></div>
      </details>
      <details class="changelog-entry card-surface">
        <summary><span><strong>Beta Build 0.15</strong><small>Reliability, accessibility, persistence safety, validation, and repository cleanup</small></span></summary>
        <div class="changelog-entry-body"><ul>
          <li>Hardened the service worker, local persistence, and Level Up transactions against failed writes and bad cached responses.</li>
          <li>Added modal focus trapping, Escape dismissal, and focus restoration.</li>
          <li>Prevented Character Creation progress jumps from bypassing required validation and unified Talent prerequisite enforcement.</li>
          <li>Improved Custom Data import feedback and corrected Gloommere's Whisperster Skill handling.</li>
          <li>Removed retired background/payload material and advanced the visible build and PWA shell cache.</li>
        </ul></div>
      </details>
      <details class="changelog-entry card-surface" open>
        <summary><span><strong>Beta Build 0.14</strong><small>Typed Custom Data, automatic backgrounds, Attribute Check labels, and saved-character sheets</small></span></summary>
        <div class="changelog-entry-body"><ul>
          <li>Added a downloadable typed JSON template pack for custom Species, Spells, Talents, and Traits, plus recognized imports and visible Custom labeling.</li>
          <li>Added an Allow Custom Data switch to Character Creation so imported options are explicitly enabled per character.</li>
          <li>Made Background Settings discover supported images from the background asset folder automatically and added Skullfen Ruins plus Blightbound Horror.</li>
          <li>Clarified Strike-related Attribute Check stats as Shooting, Melee, and Magic.</li>
          <li>Replaced the Rhythm Engine Combat Encounter section with a saved-character Character Sheet and moved character selection directly below the tool tabs.</li>
          <li>Removed the old Encounter route from active navigation and cleaned obsolete Simulator encounter dependencies.</li>
        </ul></div>
      </details>
      <details class="changelog-entry card-surface" open>
        <summary><span><strong>Beta Build 0.13</strong><small>Advancement, creator cleanup, Rules boxing, backgrounds, popup repair, and encounter character sheets</small></span></summary>
        <div class="changelog-entry-body"><ul>
          <li>Added Approved character progression and a source-cost Level Up page for Attributes, Skills, new Skills, and Magic Level.</li>
          <li>Refined Culture Skill awards, Spark-specific Deed examples, Homeland Skills, Attribute Rank/Modifier layout, Oath/Faith and Lore spacing, Languages, wealth, and Review.</li>
          <li>Rebuilt Talent/Culture/Gear popup sizing so full cards remain visible on desktop, tablet, and mobile.</li>
          <li>Reworked Deeds, Oaths, Faith, Homeland, Talents, Spells, and Equipment rule presentation into stronger individual boxes and corrected oversized narrative notes.</li>
          <li>Added Thornwick Market and Skullfen Ruins backgrounds, kept Ready For Adventure on the splash page, and tightened logo/navigation spacing.</li>
          <li>Further rebuilt Combat Encounters as a persistent pen-and-paper sheet with always-visible Core Abilities, boxed Talents/Spells, one log, and simplified encounter actions.</li>
        </ul></div>
      </details>
      <details class="changelog-entry card-surface">
        <summary><span><strong>Beta Build 0.12</strong><small>Creator polish, structured Rules, source-backed Watcher references, roll summaries, and character-sheet encounters</small></span></summary>
        <div class="changelog-entry-body"><ul>
          <li>Refined Culture Skill selection, Deed guidance, Attribute rows, Oath/Faith spacing, spell ordering/capitalization, NP wealth, Languages, and Review.</li>
          <li>Added background grayscale control and removed the paper backing behind the logo on image-backed pages.</li>
          <li>Reordered Fundamentals, boxed Skill Trees/Heritage Traits and comparable Rules entries, and synchronized source-backed Building Selu examples.</li>
          <li>Added Encounter Rating guidance plus an indexed local Rules page for every creature exposed by the supplied Woodlands monster reference without fabricating unavailable statistics.</li>
          <li>Tightened Attribute Check targeting and added a dynamic sentence-form roll formula.</li>
          <li>Refined Combat Encounter pages further toward a clickable pen-and-paper character-sheet presentation.</li>
        </ul></div>
      </details>
      <details class="changelog-entry card-surface">
        <summary><span><strong>Beta Build 0.11</strong><small>Character-sheet encounters, visible character actions, stronger themes, rule navigation, and Ready For Adventure</small></span></summary>
        <div class="changelog-entry-body"><ul>
          <li>Made Character List Edit, Lock, Copy, and Delete controls always visible and added clear Complete/Incomplete status treatment.</li>
          <li>Simplified creator identity to Character Name, Campaign, and Appearance; tightened Review, Languages, Talents, and creator popup layouts.</li>
          <li>Separated Attribute Check and Combat Encounter sheets, disabled Skills for roll types that do not use them, and rebuilt encounter pages around clickable character statistics and weapons.</li>
          <li>Restored Default and strengthened all six archetype themes in both light and Dark Mode.</li>
          <li>Removed the redundant Brambleheart lore page, expanded previous/next rule navigation, flattened rule-card internals, and reduced FAQ typography.</li>
          <li>Reduced header/navigation spacing, enlarged the logo one step, made Reset Data return to Welcome, hardened splash install handling, and replaced selectable backgrounds with Ready For Adventure.</li>
        </ul></div>
      </details>
      <details class="changelog-entry card-surface" open>
        <summary><span><strong>Beta Build 0.10</strong><small>Character campaigns, Lore section pages, archetype themes, dependent Attribute Checks, and dedicated encounters</small></span></summary>
        <div class="changelog-entry-body"><ul>
          <li>Added Campaign Name and updated the Character List identity summary.</li>
          <li>Split Lore of Anthro Mundas into navigable section pages and removed keyword pills from Rule Reader pages.</li>
          <li>Replaced themes with Warrior, Ranger, Spellcaster, Healer, Thief, and Trickster and reduced the large-logo test by half.</li>
          <li>Made Attribute Check choices dependent on Roll Type and selected Stat, and moved Combat Encounters to their own routed pages.</li>
          <li>Refined Culture Traits, Talents, Skills, Mana, Threadpiece wealth, Equipment &amp; Gear, Languages, and Review.</li>
        </ul></div>
      </details>
      <details class="changelog-entry card-surface" open>
        <summary><span><strong>Beta Build 0.09</strong><small>Rules reader presentation, creator refinement, theme repair, and encounter validation</small></span></summary>
        <div class="changelog-entry-body"><ul>
          <li>Rebuilt the Rules landing page, removed the redundant Table of Content page, expanded full-width search, and added breadcrumbs plus Old.Dex-inspired Fundamental navigation.</li>
          <li>Added a site-wide WIP banner, enlarged the Brambleheart logo for the requested scale test, and repaired Dark Mode surfaces for non-default role themes.</li>
          <li>Expanded Fortune &amp; Misfortune guidance, removed the empty target placeholder, added saved-character Attribute Checks, and made Combat Encounters require a selected character.</li>
          <li>Refined creator identity fields, Selu examples, help panels, Attributes, Skills, Lore Spells, Talent grouping, modal scroll behavior, equipment purchasing, Languages, and Review.</li>
          <li>Reworked trait, talent, spell, and rule presentation toward the Old.Dex special-rule card language for future icons and type color coding.</li>
        </ul></div>
      </details>
      <details class="changelog-entry card-surface">
        <summary><span><strong>Beta Build 0.08</strong><small>Rules navigation, character creator stabilization, and character-linked encounters</small></span></summary>
        <div class="changelog-entry-body"><ul>
          <li>Fixed the Starting Spells → Talents character creator crash.</li>
          <li>Reorganized References, The Fundamentals, and Playable Species; added Fundamental inner links and recently viewed Rules boxes.</li>
          <li>Refined creator Species/Culture presentation, resizable Appearance, Skill Rank + Modifier display, information cards, button colors, and Lore-colored Spell cards.</li>
          <li>Added Default to the top of Themes.</li>
          <li>Expanded Combat Encounters with saved-character selection, secondary stats, Skills, Talents, Mana, Spells, Abilities, Melee/Ranged/Magical Strike modes, Attacking &amp; Defending, and Resistance/Weakness controls.</li>
          <li>Added the Fortune &amp; Misfortune Rhythm Engine tip and refreshed the PWA shell cache.</li>
        </ul></div>
      </details>
      <details class="changelog-entry card-surface">
        <summary><span><strong>Beta Build 0.07</strong><small>Rhythm Engine, character creator, Species artwork, and interface refinement</small></span></summary>
        <div class="changelog-entry-body"><ul>
          <li>Replaced Species-linked display themes with four stable player-archetype themes.</li>
          <li>Updated splash entry, Thornwick Market presentation, Discord access, fixed backgrounds, and green interaction highlights.</li>
          <li>Rebuilt the Rhythm Engine around Attribute Checks and persistent Combat Encounters with Health, Mana, Fate Marks, round tracking, combat tools, and history.</li>
          <li>Rebuilt guided character creation with clickable step navigation, Species artwork, Culture Trait exchange, source-based Skill ranks, revised Attributes, custom Homelands, Magic/Lore and Spell steps, Talent validation, Equipment &amp; Gear, draft saves, and final validation.</li>
          <li>Added character locking and refined display treatment for Traits, Talents, Spells, and rule keywords.</li>
        </ul></div>
      </details>
      <details class="changelog-entry card-surface"><summary><span><strong>Beta Build 0.06</strong><small>Character creator and Rules expansion</small></span></summary><div class="changelog-entry-body"><p>Expanded guided creation, standalone source-backed Rules pages, Donation controls, and Beta presentation.</p></div></details>
      <details class="changelog-entry card-surface"><summary><span><strong>Alpha Build 0.05</strong><small>Reader, rules, backgrounds, and tabletop tools</small></span></summary><div class="changelog-entry-body"><p>Added supplied backgrounds, the expanded Rules reader, guided creation, encounter history, Rhythm roll history, Custom Data, and repository cleanup workflow.</p></div></details>
      <details class="changelog-entry card-surface"><summary><span><strong>Alpha Build 0.04</strong><small>Reader GUI alignment</small></span></summary><div class="changelog-entry-body"><p>Established the compact routed reader layout, Settings presentation, welcome flow, and shared interface components.</p></div></details>
      <details class="changelog-entry card-surface"><summary><span><strong>Alpha Build 0.03</strong><small>Reference and Settings expansion</small></span></summary><div class="changelog-entry-body"><p>Added five text sizes, bold text, install controls, grouped Rules reference, Recent Rules, and the initial splash page.</p></div></details>
      <details class="changelog-entry card-surface"><summary><span><strong>Alpha Build 0.02</strong><small>Initial GUI overhaul</small></span></summary><div class="changelog-entry-body"><p>Standardized the first generation of application panels, controls, spacing, and Settings.</p></div></details>
      <details class="changelog-entry card-surface"><summary><span><strong>Alpha Build 0.01</strong><small>Initial application build</small></span></summary><div class="changelog-entry-body"><p>Initial Vue 3 + TypeScript + Vite build with Character List, Rules, Simulator, Settings, local persistence, and Brambleheart assets.</p></div></details>
    </div>
  </main>
</template>
