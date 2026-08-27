<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { BUILD } from './data/bramble'
import { externalLinks } from './data/links'
import { shareBrambleheart } from './services/siteShare'
import { isInstalled, requestInstall } from './state/install'
import './state/settings'

const route = useRoute()
const showGlobalPageTools = computed(() => route.name !== 'welcome')

function reportIssue() {
  if (typeof window !== 'undefined') window.open(externalLinks.issues, '_blank', 'noopener,noreferrer')
}
function openDiscord(){if(typeof window!=='undefined')window.open(externalLinks.discord,'_blank','noopener,noreferrer')}
async function shareSite(){const result=await shareBrambleheart();if(!result.ok&&result.message!=='Share cancelled.')alert(result.message)}
</script>

<template>
  <div class="app-shell">
    <RouterView />

    <section v-if="showGlobalPageTools" class="page-utility-shell" aria-label="Brambleheart page tools">
      <img class="page-utility-icon" src="/assets/Icon.png" alt="" aria-hidden="true" />
      <div class="page-utility-divider" aria-hidden="true"></div>
      <div class="page-utility-actions">
        <button type="button" class="secondary-button footer-tool-button" @click="reportIssue">Report</button>
        <button type="button" class="secondary-button footer-tool-button" @click="openDiscord">Discord</button>
        <button type="button" class="secondary-button footer-tool-button" @click="shareSite">Share</button>
        <button type="button" class="secondary-button footer-tool-button" :disabled="isInstalled" @click="requestInstall">{{ isInstalled ? 'Installed' : 'Install Brambleheart' }}</button>
      </div>
      <span class="page-utility-build">Brambleheart Beta Build {{ BUILD }}</span>
    </section>
  </div>
</template>
