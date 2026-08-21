<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
</script>

<template>
  <main class="page changelog-page">
    <AppHeader compact back-to="/characters" back-label="Back to Character List" />
    <div class="page-title-block"><p class="eyebrow">SITE UPDATES</p><h1>Changelog</h1><p>Changes to the Brambleheart companion site. System-rule amendments are tracked separately under Rules → Changes &amp; Updates.</p></div>

    <div class="changelog-stack">
      <details class="changelog-entry card-surface" open>
        <summary><span><strong>Alpha Build 0.05</strong><small>Reader, rules, character creation, backgrounds, and simulator pass</small></span><span class="value-chip">CURRENT</span></summary>
        <div class="changelog-entry-body"><ul>
          <li>Refined the responsive header, welcome screen, typography, install icons, default palette, species palettes, and fixed page backgrounds.</li>
          <li>Moved character creation into an eight-step guided page and added character pinning plus full-list export.</li>
          <li>Rebuilt Rules around the supplied table of contents, standalone reader pages, Quick Reference, FAQ, Recent, and Changes &amp; Updates.</li>
          <li>Expanded the Simulator with five-roll Rhythm history, optional targets, Fortune/Misfortune markers, ongoing encounters, completed history, and encounter pinning.</li>
          <li>Expanded Settings with Donation placeholders, Custom Data, background selection, and individual Simulator data reset controls.</li>
          <li>Added a conservative, manually triggered repository cleanup workflow with dry-run protection.</li>
        </ul></div>
      </details>
      <details class="changelog-entry card-surface"><summary><span><strong>Alpha Build 0.04</strong><small>Reader GUI alignment</small></span></summary><div class="changelog-entry-body"><p>Established the compact routed reader layout, settings presentation, welcome flow, and shared interface components.</p></div></details>
      <details class="changelog-entry card-surface"><summary><span><strong>Alpha Build 0.03</strong><small>Reference and settings expansion</small></span></summary><div class="changelog-entry-body"><p>Added five text sizes, bold text, species palettes, install controls, grouped rules reference, Recent rules, and the initial splash page.</p></div></details>
      <details class="changelog-entry card-surface"><summary><span><strong>Alpha Build 0.02</strong><small>Initial GUI overhaul</small></span></summary><div class="changelog-entry-body"><p>Standardized the first generation of application panels, controls, spacing, and settings.</p></div></details>
      <details class="changelog-entry card-surface"><summary><span><strong>Alpha Build 0.01</strong><small>Initial application build</small></span></summary><div class="changelog-entry-body"><p>Initial Vue 3 + TypeScript + Vite build with Character List, Rules, Simulator, Settings, local persistence, and Brambleheart assets.</p></div></details>
    </div>
  </main>
</template>
