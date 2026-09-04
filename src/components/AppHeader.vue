<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import PrimaryNav from './PrimaryNav.vue'
import { useSettings } from '../state/settings'
import { backgroundOptions } from '../data/backgroundCatalog'
import { GAME_RULES_VERSION } from '../data/gameUpdates'
import newsHeaderCharacter from '../assets/page-headers/news.png'
import characterRosterHeaderCharacter from '../assets/page-headers/character-roster.png'
import rhythmEngineHeaderCharacter from '../assets/page-headers/rhythm-engine.png'
import rulesHeaderCharacter from '../assets/page-headers/rules.png'
import settingsHeaderCharacter from '../assets/page-headers/settings.png'

const props=defineProps<{compact?:boolean;backTo?:string;backLabel?:string;preferBackTo?:boolean;skipBackPrefix?:string}>()
const route=useRoute(),router=useRouter()
const {darkMode,toggleTheme,backgroundImage}=useSettings()
const backgroundOnly=ref(typeof document!=='undefined'&&document.documentElement.dataset.backgroundView==='true')
const headerCharacter=computed(()=>route.name==='news'?newsHeaderCharacter:route.name==='characters'?characterRosterHeaderCharacter:route.name==='rules'?rulesHeaderCharacter:route.name==='simulator'?rhythmEngineHeaderCharacter:route.name==='settings'?settingsHeaderCharacter:'')
const headerCharacterClass=computed(()=>({flipped:route.name==='news'||route.name==='characters'||route.name==='rules'}))
function toggleBackgroundOnly(){backgroundOnly.value=!backgroundOnly.value;if(typeof document!=='undefined')document.documentElement.dataset.backgroundView=backgroundOnly.value?'true':'false'}
function cycleBackground(){const available=backgroundOptions.filter(option=>option.url);if(!available.length)return;const current=available.findIndex(option=>option.value===backgroundImage.value);backgroundImage.value=available[(current+1+available.length)%available.length]!.value}
function goBack(){const previous=typeof window!=='undefined'?String(window.history.state?.back||''):'';if(props.backTo&&props.skipBackPrefix&&previous.startsWith(props.skipBackPrefix))void router.push(props.backTo);else if(props.preferBackTo&&props.backTo)void router.push(props.backTo);else if(typeof window!=='undefined'&&window.history.length>1)router.back();else if(props.backTo)void router.push(props.backTo)}
</script>

<template>
  <header class="app-header-wrap bramble-site-header">
    <div class="site-wip-toolbar"><div class="wip-banner site-wip-banner">Brambleheart TTRPG is a work in progress. May contain unfinished rules, presentation, and tools.</div><div class="background-toolbar-actions"><button type="button" class="secondary-button background-view-button" :aria-pressed="backgroundOnly" @click="toggleBackgroundOnly">{{ backgroundOnly?'Show Page':'View Background' }}</button><button type="button" class="icon-button background-cycle-button" aria-label="Next background" title="Next background" @click="cycleBackground"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8.5 5 7 7-7 7"/></svg></button></div></div>
    <div class="app-header" :class="{compact}"><div class="header-control-row"><button v-if="backTo" type="button" class="icon-button back-button" :aria-label="backLabel||'Back'" @click="goBack"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 5 8.5 12l7 7"/></svg></button><div v-else class="header-spacer"></div><button class="icon-button theme-button" type="button" :aria-label="darkMode?'Switch to light mode':'Switch to dark mode'" @click="toggleTheme"><svg v-if="darkMode" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></svg><svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.4A8.5 8.5 0 0 1 8.6 3.8 8.5 8.5 0 1 0 20.2 15.4Z"/></svg></button></div><div class="brand-stack brand-update-stack"><RouterLink to="/news" class="brand-logo-link" aria-label="Brambleheart News"><img src="/assets/Logo.png" alt="Brambleheart — Small Heroes, Big Adventures" class="brand-logo" /></RouterLink><RouterLink to="/game-updates" class="game-updates-header-link">Game Updates v{{ GAME_RULES_VERSION }}</RouterLink></div></div>
    <PrimaryNav />
    <img v-if="headerCharacter" :src="headerCharacter" class="page-header-character" :class="headerCharacterClass" alt="" aria-hidden="true" />
  </header>
</template>

<style scoped>
.bramble-site-header{position:relative}
.header-control-row{grid-column:1/-1;grid-row:1;z-index:3;width:min(760px,calc(100vw - 28px));justify-self:center;display:flex;align-items:center;justify-content:space-between;pointer-events:none}
.header-control-row>*{pointer-events:auto}
.header-control-row .header-spacer{pointer-events:none}
.brand-update-stack{grid-column:1/-1;grid-row:1;z-index:1;display:grid;justify-items:center;align-content:center;gap:2px;min-width:0;height:100%;position:relative}
.brand-logo-link{display:block;min-width:0}
.game-updates-header-link{position:absolute;left:50%;bottom:8px;transform:translateX(-50%);width:max-content;max-width:calc(100% - 24px);color:var(--ink-soft);font-size:calc(9px + var(--font-offset));font-weight:850;letter-spacing:.055em;text-transform:uppercase;text-align:center;text-decoration:none}
.game-updates-header-link:hover,.game-updates-header-link.router-link-active{color:var(--accent-dark);text-decoration:underline;text-underline-offset:3px}
.page-header-character{position:absolute;z-index:4;right:12px;bottom:-128px;width:clamp(118px,22vw,180px);height:126px;object-fit:contain;object-position:right bottom;pointer-events:none;filter:drop-shadow(0 3px 2px rgba(0,0,0,.08))}
.page-header-character.flipped{object-position:left bottom;transform:scaleX(-1)}
@media(max-width:680px){.header-control-row{width:min(760px,calc(100vw - 20px))}.game-updates-header-link{bottom:5px;font-size:calc(8.5px + var(--font-offset))}.page-header-character{right:4px;bottom:-104px;width:124px;height:106px}}
@media(max-width:430px){.page-header-character{width:106px;height:94px;bottom:-90px}}
</style>
