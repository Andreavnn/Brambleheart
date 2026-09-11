<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
import changelogRaw from '../../CHANGELOG.md?raw'

type ReleaseCategory={title:string;items:string[]}
type Release={label:string;categories:ReleaseCategory[]}
function parseReleases(markdown:string){
  const releases:Release[]=[]
  let current:Release|null=null
  let category:ReleaseCategory|null=null
  for(const rawLine of markdown.split(/\r?\n/)){
    const line=rawLine.trim()
    const heading=line.match(/^#{1,2}\s+(?:Brambleheart\s+)?((?:Beta|Alpha)\s+[0-9.]+)/i)
    if(heading){
      current={label:heading[1],categories:[]}
      category=null
      releases.push(current)
      continue
    }
    const categoryHeading=line.match(/^##\s+(.+)/)
    if(current&&categoryHeading){
      category={title:categoryHeading[1].trim(),items:[]}
      current.categories.push(category)
      continue
    }
    if(current&&line.startsWith('- ')){
      if(!category){category={title:'Updates',items:[]};current.categories.push(category)}
      category.items.push(line.slice(2).trim())
    }
  }
  return releases
}
function releaseChangeCount(release:Release){return release.categories.reduce((sum,category)=>sum+category.items.length,0)}
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
        <summary class="setting-row"><span><strong>{{ release.label }}</strong><small>{{ releaseChangeCount(release) }} change{{ releaseChangeCount(release)===1?'':'s' }}</small></span><span v-if="index===0" class="value-chip">CURRENT</span></summary>
        <div class="changelog-category-stack"><section v-for="category in release.categories" :key="category.title" class="changelog-category"><h2>{{ category.title }}</h2><ul class="changelog-items"><li v-for="item in category.items" :key="item">{{ item }}</li></ul></section></div>
      </details>
    </section>
  </main>
</template>

<style scoped>
.changelog-entry{overflow:hidden}.changelog-entry>summary{cursor:pointer;list-style:none}.changelog-entry>summary::-webkit-details-marker{display:none}.changelog-category-stack{border-top:1px solid var(--line);background:var(--paper)}.changelog-category{padding:13px 34px 16px}.changelog-category+.changelog-category{border-top:1px solid var(--line)}.changelog-category h2{margin:0 0 8px;font-size:calc(15px + var(--font-offset))}.changelog-items{margin:0;padding-left:18px}.changelog-items li{margin:7px 0;line-height:1.5;color:var(--ink-soft)}
@media(max-width:620px){.changelog-category{padding:12px 28px 14px}}
</style>
