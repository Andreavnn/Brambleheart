<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { BUILD } from './data/bramble'
import { isInstalled, requestInstall } from './state/install'
import './state/settings'

const route = useRoute()
const showGlobalPageTools = computed(() => route.name !== 'welcome')

function reportIssue() {
  if (typeof window !== 'undefined') window.open('https://github.com/Andreavnn/Brambleheart/issues', '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <div class="app-shell">
    <RouterView />

    <section v-if="showGlobalPageTools" class="page-utility-shell" aria-label="Brambleheart page tools">
      <div class="page-utility-actions">
        <button type="button" class="secondary-button footer-tool-button" @click="reportIssue">Report</button>
        <button type="button" class="secondary-button footer-tool-button" :disabled="isInstalled" @click="requestInstall">{{ isInstalled ? 'Installed' : 'Install Brambleheart' }}</button>
      </div>
    </section>

    <footer v-if="showGlobalPageTools" class="app-footer">
      <span>Brambleheart Alpha Build {{ BUILD }}</span>
    </footer>
  </div>
</template>
