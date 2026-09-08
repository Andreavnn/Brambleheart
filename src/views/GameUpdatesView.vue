<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
import GameUpdateList from '../components/GameUpdateList.vue'
</script>

<template>
  <main class="page game-updates-page">
    <AppHeader compact back-to="/characters" back-label="Back to Character Roster" />
    <div class="page-title-block">
      <h1>Game Updates</h1>
      <p>Rules changes to Brambleheart itself. Site-interface and companion changes remain in the Site Changelog.</p>
    </div>
    <GameUpdateList />
  </main>
</template>
