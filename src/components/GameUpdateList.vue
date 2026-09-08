<script setup lang="ts">
import { GAME_RULES_VERSION, gameUpdates } from '../data/gameUpdates'
</script>

<template>
  <section class="game-update-stack">
    <details v-for="update in gameUpdates" :key="update.version" class="game-update-entry card-surface" :open="update.version===GAME_RULES_VERSION">
      <summary><div><span class="eyebrow">GAME UPDATE {{ update.version }}</span><h2>{{ update.title }}</h2><small>{{ update.date }}</small></div><span class="value-chip">{{ update.version===GAME_RULES_VERSION?'CURRENT':'ARCHIVED' }}</span></summary>
      <div class="game-update-body"><p>{{ update.summary }}</p><ul><li v-for="change in update.changes" :key="change">{{ change }}</li></ul></div>
    </details>
  </section>
</template>

<style scoped>
.game-update-stack{display:grid;gap:12px}.game-update-entry{padding:0;overflow:hidden}.game-update-entry>summary{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:13px 15px;cursor:pointer;list-style:none;background:var(--paper-2)}.game-update-entry>summary::-webkit-details-marker{display:none}.game-update-entry[open]>summary{border-bottom:1px solid var(--line)}.game-update-entry h2{margin:2px 0 0}.game-update-entry summary small{color:var(--ink-soft)}.game-update-body>p{margin:14px 16px 8px;color:var(--ink-soft);line-height:1.55}.game-update-body ul{margin:8px 16px 16px;padding-left:20px}.game-update-body li{margin:7px 0;line-height:1.5}
@media(max-width:620px){.game-update-entry>summary{align-items:flex-start;flex-direction:column}}
</style>
