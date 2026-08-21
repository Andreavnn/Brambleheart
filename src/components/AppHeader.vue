<script setup lang="ts">
import { BUILD } from '../data/bramble'
defineEmits<{ changelog: [] }>()
</script>

<template>
  <header class="app-header">
    <div class="brand-row">
      <RouterLink class="brand-link" to="/" aria-label="Brambleheart Character List">
        <img src="/assets/Logo.png" alt="Brambleheart — Small Heroes, Big Adventures" class="brand-logo" />
      </RouterLink>
      <div class="build-block">
        <span>ALPHA BUILD {{ BUILD }}</span>
        <button class="text-button" type="button" @click="$emit('changelog')">CHANGELOG</button>
      </div>
    </div>
  </header>
</template>
