<script setup lang="ts">
import { BUILD } from '../data/bramble'
import { settings } from '../state/settings'

defineEmits<{ changelog: [] }>()

function toggleTheme() {
  const active = document.documentElement.dataset.theme
  settings.theme = active === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <header class="app-header-wrap">
    <div class="wip-banner">
      BRAMBLEHEART IS A WORK IN PROGRESS — RULES, CONTENT, AND FEATURES MAY CHANGE DURING ALPHA DEVELOPMENT.
    </div>
    <div class="app-header">
      <span class="header-spacer" aria-hidden="true"></span>
      <RouterLink class="brand-stack brand-link" to="/" aria-label="Brambleheart home">
        <img src="/assets/Logo.png" alt="Brambleheart — Small Heroes, Big Adventures" class="brand-logo" />
        <span class="header-build-line">ALPHA BUILD {{ BUILD }}</span>
      </RouterLink>
      <div class="header-actions">
        <button class="header-text-button" type="button" @click="$emit('changelog')">CHANGELOG</button>
        <button class="header-theme-button" type="button" aria-label="Toggle light or dark appearance" title="Toggle appearance" @click="toggleTheme">◐</button>
      </div>
    </div>
  </header>
</template>
