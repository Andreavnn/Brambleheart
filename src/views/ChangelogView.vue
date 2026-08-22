<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
</script>

<template>
  <main class="page changelog-page">
    <AppHeader compact back-to="/characters" back-label="Back to Character List" />
    <div class="page-title-block"><p class="eyebrow">SITE UPDATES</p><h1>Site Changelog</h1><p>Changes to the Brambleheart companion site. System-rule amendments are tracked under Rules → Changes &amp; Updates.</p></div>

    <div class="changelog-stack">
      <details class="changelog-entry card-surface" open>
        <summary><span><strong>Beta Build 0.06</strong><small>Character creator, rules reader, Simulator, and interface refinement</small></span><span class="value-chip">CURRENT</span></summary>
        <div class="changelog-entry-body"><ul>
          <li>Expanded guided character creation with Culture Traits, Skills, Lore Attunement, Spells, Talents, Languages, equipment purchasing, richer Species/Spark/Homeland/Faith/Oath guidance, and final character review.</li>
          <li>Expanded the Rules reader with standalone source-backed pages, Quick Reference, FAQ, Recent Rules, Changes &amp; Updates, individual Playable Species, and nested Winds of Magic/Lores of Magic organization.</li>
          <li>Refined rule examples, keyword pills, Fundamental-rule navigation, capitalization, and reader hierarchy.</li>
          <li>Expanded the Rhythm Engine with a roll reason, separate Stat and optional Skill values, five-roll history, targets, and Fortune/Misfortune results.</li>
          <li>Integrated Strike vs Ward into the Encounter tracker while retaining ongoing/completed encounter history and pinning.</li>
          <li>Updated donation controls, application naming, Beta release labeling, responsive branding, and interface consistency.</li>
        </ul></div>
      </details>
      <details class="changelog-entry card-surface"><summary><span><strong>Alpha Build 0.05</strong><small>Reader, rules, character creation, backgrounds, and Simulator pass</small></span></summary><div class="changelog-entry-body"><p>Added the supplied backgrounds, standalone rule-reader structure, initial guided character creation, expanded Simulator history, and repository cleanup workflow.</p></div></details>
      <details class="changelog-entry card-surface"><summary><span><strong>Alpha Build 0.04</strong><small>Reader GUI alignment</small></span></summary><div class="changelog-entry-body"><p>Established the compact routed reader layout, Settings presentation, welcome flow, and shared interface components.</p></div></details>
      <details class="changelog-entry card-surface"><summary><span><strong>Alpha Build 0.03</strong><small>Reference and Settings expansion</small></span></summary><div class="changelog-entry-body"><p>Added five text sizes, bold text, species palettes, install controls, grouped Rules reference, Recent Rules, and the initial splash page.</p></div></details>
      <details class="changelog-entry card-surface"><summary><span><strong>Alpha Build 0.02</strong><small>Initial GUI overhaul</small></span></summary><div class="changelog-entry-body"><p>Standardized the first generation of application panels, controls, spacing, and Settings.</p></div></details>
      <details class="changelog-entry card-surface"><summary><span><strong>Alpha Build 0.01</strong><small>Initial application build</small></span></summary><div class="changelog-entry-body"><p>Initial Vue 3 + TypeScript + Vite build with Character List, Rules, Simulator, Settings, local persistence, and Brambleheart assets.</p></div></details>
    </div>
  </main>
</template>
