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
let menusWereExpanded=false
const menuDefaultOpen=new WeakMap<HTMLDetailsElement,boolean>()
function syncCollapsibleMenus(){
  if(typeof document==='undefined')return
  const menus=Array.from(document.querySelectorAll<HTMLDetailsElement>('details'))
  if(menusExpanded.value){
    for(const menu of menus){
      if(!menuDefaultOpen.has(menu))menuDefaultOpen.set(menu,menu.open)
      menu.open=true
    }
    menusWereExpanded=true
    return
  }
  if(!menusWereExpanded)return
  for(const menu of menus){
    const defaultOpen=menuDefaultOpen.get(menu)
    if(defaultOpen!==undefined)menu.open=defaultOpen
    menuDefaultOpen.delete(menu)
  }
  menusWereExpanded=false
}
watch([menusExpanded,()=>route.fullPath],async()=>{await nextTick();syncCollapsibleMenus()},{immediate:true})
onMounted(()=>{
  if(typeof MutationObserver==='undefined'||typeof document==='undefined')return
  menuObserver=new MutationObserver(()=>syncCollapsibleMenus())
  menuObserver.observe(document.body,{childList:true,subtree:true})
  syncCollapsibleMenus()
})
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
