<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { BUILD } from './data/bramble'
import { externalLinks } from './data/links'
import { shareBrambleheart } from './services/siteShare'
import { isInstalled, requestInstall } from './state/install'
import { useSettings } from './state/settings'

const route = useRoute()
const {menusExpanded}=useSettings()
let menuObserver:MutationObserver|null=null
function expandCollapsibleMenus(){if(typeof document==='undefined'||!menusExpanded.value)return;document.querySelectorAll<HTMLDetailsElement>('details').forEach(menu=>{menu.open=true})}
watch([menusExpanded,()=>route.fullPath],async()=>{await nextTick();expandCollapsibleMenus()},{immediate:true})
onMounted(()=>{if(typeof MutationObserver==='undefined'||typeof document==='undefined')return;menuObserver=new MutationObserver(()=>expandCollapsibleMenus());menuObserver.observe(document.body,{childList:true,subtree:true});expandCollapsibleMenus()})
onBeforeUnmount(()=>menuObserver?.disconnect())
const showGlobalPageTools = computed(() => route.name !== 'welcome')

function reportIssue() {
  if (typeof window !== 'undefined') window.open(externalLinks.issues, '_blank', 'noopener,noreferrer')
}
function openDiscord(){if(typeof window!=='undefined')window.open(externalLinks.discord,'_blank','noopener,noreferrer')}
function openCreator(){if(typeof window!=='undefined')window.open(externalLinks.creator,'_blank','noopener,noreferrer')}
async function shareSite(){const result=await shareBrambleheart();if(!result.ok&&result.message!=='Share cancelled.')alert(result.message)}
</script>

<template>
  <div class="app-shell">
    <RouterView />

    <section v-if="showGlobalPageTools" class="page-utility-shell" aria-label="Brambleheart page tools">
      <div class="page-utility-divider" aria-hidden="true"></div>
      <div class="page-utility-actions">
        <button type="button" class="secondary-button footer-tool-button" @click="reportIssue">Report</button>
        <button type="button" class="secondary-button footer-tool-button" @click="openDiscord">Discord</button>
        <button type="button" class="secondary-button footer-tool-button" @click="shareSite">Share</button>
        <button type="button" class="secondary-button footer-tool-button" @click="openCreator">Creator</button>
        <button type="button" class="secondary-button footer-tool-button" :disabled="isInstalled" @click="requestInstall">{{ isInstalled ? 'Installed' : 'Install Brambleheart' }}</button>
      </div>
      <span class="page-utility-build">Brambleheart Beta Build {{ BUILD }}</span>
    </section>
  </div>
</template>
