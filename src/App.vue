<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import PrimaryNav from './components/PrimaryNav.vue'
import { BUILD } from './data/bramble'
import './state/settings'

const showChangelog = ref(false)
</script>

<template>
  <div class="site-shell">
    <AppHeader @changelog="showChangelog = true" />
    <PrimaryNav />
    <main class="app-content">
      <RouterView />
    </main>
    <footer class="app-footer">
      <img src="/assets/Icon.png" alt="" aria-hidden="true" />
      <span>BRAMBLEHEART · ALPHA BUILD {{ BUILD }}</span>
    </footer>
  </div>

  <div v-if="showChangelog" class="modal-backdrop" @click.self="showChangelog = false">
    <section class="modal-card" role="dialog" aria-modal="true" aria-label="Changelog">
      <div class="modal-head">
        <div><span class="eyebrow">BRAMBLEHEART</span><h2>Changelog</h2></div>
        <button class="icon-button" type="button" @click="showChangelog = false">×</button>
      </div>
      <div class="rule-row">
        <strong>Alpha Build 0.03</strong>
        <p>Interface refinement patch: revised site header and WIP banner, compact five-step text sizing, bold-text control, species palettes, install and support settings, reorganized rules reference with search and recent entries, and a new splash page.</p>
      </div>
      <div class="rule-row">
        <strong>Alpha Build 0.02</strong>
        <p>Application-wide GUI consistency pass with revised settings groups, species theme selection, background controls, and tighter responsive presentation.</p>
      </div>
      <div class="rule-row">
        <strong>Alpha Build 0.01</strong>
        <p>Initial Vue 3 + TypeScript + Vite companion build with Character List, Rules, Simulator, Settings, local persistence, and Brambleheart branding assets.</p>
      </div>
    </section>
  </div>
</template>
