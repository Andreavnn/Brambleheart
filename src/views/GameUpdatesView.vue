<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
import { GAME_RULES_VERSION, gameUpdates } from '../data/gameUpdates'
</script>

<template>
  <main class="page game-updates-page">
    <AppHeader compact back-to="/characters" back-label="Back to Character List" />
    <div class="page-title-block">
      <p class="eyebrow">GAME RULES</p>
      <h1>Game Updates</h1>
      <p>Rules changes to Brambleheart itself. Site-interface and companion changes remain in the Site Changelog.</p>
    </div>
    <section class="game-update-current card-surface">
      <span>Current Rules Version</span><strong>{{ GAME_RULES_VERSION }}</strong>
    </section>
    <section class="game-update-stack">
      <article v-for="update in gameUpdates" :key="update.version" class="game-update-entry card-surface">
        <header><div><span class="eyebrow">RULES UPDATE {{ update.version }}</span><h2>{{ update.title }}</h2><small>{{ update.date }}</small></div><span class="value-chip">{{ update.version===GAME_RULES_VERSION?'CURRENT':'ARCHIVED' }}</span></header>
        <p>{{ update.summary }}</p>
        <ul><li v-for="change in update.changes" :key="change">{{ change }}</li></ul>
      </article>
    </section>
  </main>
</template>

<style scoped>
.game-update-current{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px;padding:12px 14px}.game-update-current span{color:var(--ink-soft);font-weight:800}.game-update-current strong{font-family:Georgia,'Times New Roman',serif;font-size:calc(24px + var(--font-offset));color:var(--accent-dark)}
.game-update-stack{display:grid;gap:12px}.game-update-entry{padding:0;overflow:hidden}.game-update-entry>header{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:13px 15px;border-bottom:1px solid var(--line);background:var(--paper-2)}.game-update-entry h2{margin:2px 0 0}.game-update-entry header small{color:var(--ink-soft)}.game-update-entry>p{margin:14px 16px 8px;color:var(--ink-soft);line-height:1.55}.game-update-entry ul{margin:8px 16px 16px;padding-left:20px}.game-update-entry li{margin:7px 0;line-height:1.5}
@media(max-width:620px){.game-update-entry>header{align-items:flex-start;flex-direction:column}.game-update-current{align-items:flex-start;flex-direction:column}}
</style>
