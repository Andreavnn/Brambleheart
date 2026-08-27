<script setup lang="ts">
import SettingsView from './SettingsView.vue'
</script>

<template>
  <SettingsView />
  <Teleport defer to=".settings-page .page-title-block">
    <p class="beta032-settings-detail">Site control: Community, display, data, storage, and optional controls.</p>
  </Teleport>
</template>
