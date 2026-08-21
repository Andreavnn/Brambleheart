<script setup lang="ts">
import { BUILD, species } from '../data/bramble'
</script>

<template>
  <section class="splash-page">
    <section class="splash-hero panel">
      <div class="splash-mark"><img src="/assets/Icon.png" alt="" aria-hidden="true" /></div>
      <span class="eyebrow">ALPHA BUILD {{ BUILD }}</span>
      <h1>Brambleheart</h1>
      <p class="splash-lead">Small heroes, big adventures. Build characters, browse the current rules reference, and use the tabletop tools from one companion.</p>
      <div class="splash-actions">
        <RouterLink class="primary-button link-button" to="/characters">Character List</RouterLink>
        <RouterLink class="secondary-button link-button" to="/rules">Browse Rules</RouterLink>
      </div>
    </section>

    <section class="splash-grid">
      <RouterLink class="panel splash-card" to="/characters">
        <span class="splash-card-icon">◆</span>
        <div><span class="eyebrow">CHARACTERS</span><strong>Create &amp; Manage</strong><p>Build local characters and import or export character JSON.</p></div>
      </RouterLink>
      <RouterLink class="panel splash-card" to="/rules">
        <span class="splash-card-icon">⌕</span>
        <div><span class="eyebrow">REFERENCE</span><strong>Rules Library</strong><p>Search the current rules index and return to recently opened entries.</p></div>
      </RouterLink>
      <RouterLink class="panel splash-card" to="/simulator">
        <span class="splash-card-icon">✦</span>
        <div><span class="eyebrow">TOOLS</span><strong>Simulator</strong><p>Run Rhythm Engine, combat, damage, Health, Hallows, and advancement tools.</p></div>
      </RouterLink>
      <RouterLink class="panel splash-card" to="/settings">
        <span class="splash-card-icon">⚙</span>
        <div><span class="eyebrow">APPLICATION</span><strong>Settings</strong><p>Adjust display, species themes, install support, and local data.</p></div>
      </RouterLink>
    </section>

    <section class="panel splash-species-strip">
      <div><span class="eyebrow">PLAYABLE SPECIES</span><strong>{{ species.length }} current species themes</strong></div>
      <div class="chip-row"><span v-for="item in species" :key="item" class="chip">{{ item }}</span></div>
    </section>
  </section>
</template>
