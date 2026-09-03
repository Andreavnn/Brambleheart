<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
import changelogRaw from '../../CHANGELOG.md?raw'

type Release={label:string;items:string[]}
function parseReleases(markdown:string){
  const releases:Release[]=[]
  let current:Release|null=null
  for(const rawLine of markdown.split(/\r?\n/)){
    const line=rawLine.trim()
    const heading=line.match(/^#{1,2}\s+(?:Brambleheart\s+)?((?:Beta|Alpha)\s+[0-9.]+)/i)
    if(heading){
      current={label:heading[1],items:[]}
      releases.push(current)
      continue
    }
    if(current&&line.startsWith('- '))current.items.push(line.slice(2).trim())
  }
  return releases
}
const releases=parseReleases(changelogRaw)
</script>

<template>
  <main class="page changelog-page">
    <AppHeader compact back-to="/settings" back-label="Back to Settings" prefer-back-to />
    <div class="page-title-block">
      <p class="eyebrow">CHANGELOG &amp; UPDATES</p>
      <h1>Site Changelog</h1>
      <p>Application, interface, data, and deployment changes. Brambleheart game-rule changes are listed separately under Game Updates.</p>
    </div>
    <section class="changelog-stack">
      <details v-for="(release,index) in releases" :key="release.label" class="changelog-entry settings-card" :open="index===0">
        <summary class="setting-row"><span><strong>{{ release.label }}</strong><small>{{ release.items.length }} change{{ release.items.length===1?'':'s' }}</small></span><span v-if="index===0" class="value-chip">CURRENT</span></summary>
        <ul class="changelog-items"><li v-for="item in release.items" :key="item">{{ item }}</li></ul>
      </details>
    </section>
  </main>
</template>

<style scoped>
.changelog-entry{overflow:hidden}.changelog-entry>summary{cursor:pointer;list-style:none}.changelog-entry>summary::-webkit-details-marker{display:none}.changelog-items{margin:0;padding:13px 34px 16px;border-top:1px solid var(--line);background:var(--paper)}.changelog-items li{margin:7px 0;line-height:1.5;color:var(--ink-soft)}
@media(max-width:620px){.changelog-items{padding:12px 28px 14px}}
</style>
