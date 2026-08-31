<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
import { GAME_RULES_VERSION, gameUpdates } from '../data/gameUpdates'
import changelogRaw from '../../CHANGELOG.md?raw'

type SiteRelease={label:string;items:string[]}
function latestRelease(markdown:string):SiteRelease{
  let label='Current Build'
  const items:string[]=[]
  let found=false
  for(const rawLine of markdown.split(/\r?\n/)){
    const line=rawLine.trim()
    const heading=line.match(/^#{1,2}\s+(?:Brambleheart\s+)?((?:Beta|Alpha)\s+[0-9.]+)/i)
    if(heading){
      if(found)break
      label=heading[1]
      found=true
      continue
    }
    if(found&&line.startsWith('- '))items.push(line.slice(2).trim())
  }
  return{label,items}
}
const siteRelease=latestRelease(changelogRaw)
const currentRules=gameUpdates.find(update=>update.version===GAME_RULES_VERSION)||gameUpdates[0]
</script>

<template>
  <main class="page news-page">
    <AppHeader compact />
    <div class="page-title-block">
      <p class="eyebrow">BRAMBLEHEART</p>
      <h1>News</h1>
      <p>Current Brambleheart development and rules-update highlights.</p>
    </div>

    <section class="news-grid">
      <article class="news-card card-surface">
        <header><div><span class="eyebrow">LATEST SITE UPDATE</span><h2>{{ siteRelease.label }}</h2></div><RouterLink class="secondary-button news-action" to="/changelog">Site Changelog</RouterLink></header>
        <ul><li v-for="item in siteRelease.items.slice(0,6)" :key="item">{{ item }}</li></ul>
      </article>
      <article v-if="currentRules" class="news-card card-surface">
        <header><div><span class="eyebrow">CURRENT RULE UPDATE</span><h2>Rules Update {{ currentRules.version }} · {{ currentRules.title }}</h2></div><RouterLink class="secondary-button news-action" to="/game-updates">Rule Updates</RouterLink></header>
        <p>{{ currentRules.summary }}</p>
        <ul><li v-for="item in currentRules.changes.slice(0,4)" :key="item">{{ item }}</li></ul>
      </article>
    </section>
  </main>
</template>

<style scoped>
.news-grid{display:grid;gap:12px}.news-card{padding:0;overflow:hidden}.news-card>header{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:13px 15px;border-bottom:1px solid var(--line);background:var(--paper-2)}.news-card h2{margin:2px 0 0}.news-card>p{margin:14px 16px 6px;color:var(--ink-soft);line-height:1.55}.news-card ul{margin:10px 16px 16px;padding-left:20px}.news-card li{margin:7px 0;line-height:1.5}.news-action{flex:0 0 auto;text-decoration:none}
@media(max-width:620px){.news-card>header{flex-direction:column}.news-action{width:100%}}
</style>
