<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
</script>

<template>
  <main class="page changelog-page">
    <AppHeader compact back-to="/characters" back-label="Back to Character List" />
    <div class="page-title-block"><p class="eyebrow">SITE UPDATES</p><h1>Site Changelog</h1><p>Changes to the Brambleheart companion site. System-rule amendments are tracked under Rules → Changes &amp; Updates.</p></div>

    <div class="changelog-stack">
      <details class="changelog-entry card-surface" open>
        <summary><span><strong>Beta Build 0.10</strong><small>Character campaigns, Lore section pages, archetype themes, dependent Attribute Checks, and dedicated encounters</small></span><span class="value-chip">CURRENT</span></summary>
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
