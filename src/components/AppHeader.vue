<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import PrimaryNav from './PrimaryNav.vue'
import { useSettings } from '../state/settings'

const props=defineProps<{compact?:boolean;backTo?:string;backLabel?:string;preferBackTo?:boolean;skipBackPrefix?:string}>()
const router=useRouter()
const {darkMode,toggleTheme}=useSettings()
function goBack(){
  const previous=typeof window!=='undefined'?String(window.history.state?.back||''):''
  if(props.backTo&&props.skipBackPrefix&&previous.startsWith(props.skipBackPrefix))void router.push(props.backTo)
  else if(props.preferBackTo&&props.backTo)void router.push(props.backTo)
  else if(typeof window!=='undefined'&&window.history.length>1)router.back()
  else if(props.backTo)void router.push(props.backTo)
}
</script>

<template>
  <header class="app-header-wrap bramble-site-header">
    <aside v-if="!compact" class="bramble-world-intro">
      <strong>Welcome to Brambleheart</strong>
      <p>Brambleheart is a story-driven tabletop role-playing game of courage, kinship, and discovery, set in the myth-wild world of Anthro Mundas — a land where storms sing names, ancient oaths still echo, and the Beastfolk of fur, feather, and scale walk beneath the gaze of old gods and older memories.</p>
    </aside>

    <div class="app-header" :class="{compact}">
      <button v-if="backTo" type="button" class="icon-button back-button" :aria-label="backLabel||'Back'" @click="goBack"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 5 8.5 12l7 7"/></svg></button>
      <div v-else class="header-spacer"></div>

      <RouterLink to="/characters" class="brand-stack brand-logo-link" aria-label="Brambleheart Character List">
        <img src="/assets/Logo.png" alt="Brambleheart — Small Heroes, Big Adventures" class="brand-logo" />
      </RouterLink>

      <button class="icon-button theme-button" type="button" :aria-label="darkMode?'Switch to light mode':'Switch to dark mode'" @click="toggleTheme">
        <svg v-if="darkMode" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></svg>
        <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.4A8.5 8.5 0 0 1 8.6 3.8 8.5 8.5 0 1 0 20.2 15.4Z"/></svg>
      </button>
    </div>
    <PrimaryNav />
  </header>
</template>
