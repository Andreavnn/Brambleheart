<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
</script>

<template>
  <main class="page changelog-page">
    <AppHeader compact back-to="/characters" back-label="Back to Character List" />
    <div class="page-title-block">
      <p class="eyebrow">UPDATES</p>
      <h1>Changelog</h1>
      <p>Interface, reference, and application changes made during alpha development.</p>
    </div>

    <div class="changelog-stack">
      <details class="changelog-entry card-surface" open>
        <summary><span><strong>Alpha Build 0.04</strong><small>GUI alignment pass</small></span><span class="value-chip">CURRENT</span></summary>
        <div class="changelog-entry-body"><ul><li>Rebuilt the application shell, header, navigation, page width, cards, settings rows, controls, rules layout, splash screen, and footer into one consistent interface system.</li><li>Moved the header into routed pages and added a first-visit welcome screen.</li><li>Reworked Settings around compact grouped cards, five-step text sizing, bold text, species palettes, install, support, and local data controls.</li><li>Reworked Rules around the compact search, quick-action, accordion, and recent-reference patterns.</li></ul></div>
      </details>
      <details class="changelog-entry card-surface">
        <summary><span><strong>Alpha Build 0.03</strong><small>Reference and settings expansion</small></span></summary>
        <div class="changelog-entry-body"><p>Added the WIP notice, five text sizes, bold text, species palettes, install and support controls, rules grouping, recent rules, and an initial splash page.</p></div>
      </details>
      <details class="changelog-entry card-surface">
        <summary><span><strong>Alpha Build 0.02</strong><small>Initial GUI overhaul</small></span></summary>
        <div class="changelog-entry-body"><p>Standardized the first generation of Brambleheart application panels, controls, spacing, and settings.</p></div>
      </details>
      <details class="changelog-entry card-surface">
        <summary><span><strong>Alpha Build 0.01</strong><small>Initial application build</small></span></summary>
        <div class="changelog-entry-body"><p>Initial Vue 3 + TypeScript + Vite build with Character List, Rules, Simulator, Settings, local persistence, and Brambleheart assets.</p></div>
      </details>
    </div>
  </main>
</template>
