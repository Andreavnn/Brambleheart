<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { ruleSourceDocuments, type RuleSourceBlock } from '../data/rulesSource'

const route=useRoute()
const router=useRouter()
const sourceKeys=Object.keys(ruleSourceDocuments).sort((a,b)=>a.localeCompare(b))
const requestedKey=computed(()=>String(route.params.slug||''))
const activeKey=computed(()=>sourceKeys.includes(requestedKey.value)?requestedKey.value:(sourceKeys.includes('fundamentals')?'fundamentals':sourceKeys[0]||''))
const documentSource=computed(()=>ruleSourceDocuments[activeKey.value])
const overview=computed(()=>documentSource.value?.sections.find(section=>section.heading.toLowerCase()==='overview')||null)
const bodySections=computed(()=>documentSource.value?.sections.filter(section=>section!==overview.value)||[])
const title=computed(()=>activeKey.value.split('-').filter(Boolean).map(word=>word[0]?.toUpperCase()+word.slice(1)).join(' '))

const bannerModules=import.meta.glob('../assets/rule-banners/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP}',{eager:true,query:'?url',import:'default'}) as Record<string,string>
function key(value:string){return value.replace(/[^a-z0-9]+/gi,'').toLowerCase()}
function bannerStem(path:string){return(path.split('/').pop()||'').replace(/\.[^.]+$/,'').replace(/^banner[-_ ]*/i,'')}
const banner=computed(()=>{
  const wanted=key(activeKey.value)
  const entry=Object.entries(bannerModules).find(([path])=>{const stem=key(bannerStem(path));return stem===wanted||stem.endsWith(wanted)||wanted.endsWith(stem)})
  return entry?.[1]||''
})
function sectionId(value:string,index:number){return`preview-${index}-${value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'section'}`}
function selectSource(event:Event){const value=(event.target as HTMLSelectElement).value;if(value)void router.replace(`/rules/layout-preview/${value}`)}
function tableRows(block:RuleSourceBlock){return block.type==='table'?block.rows:[]}
</script>

<template>
  <main class="page rule-layout-preview-page">
    <AppHeader compact back-to="/rules" back-label="Back to Rules" prefer-back-to />

    <div class="rule-layout-preview-notice card-surface"><strong>RULE PAGE LAYOUT PREVIEW — TEST PAGE</strong><span>This route is isolated from the existing Rule Reader. It does not replace or modify production rule pages.</span></div>

    <label class="field-label rule-layout-preview-picker">Preview Source
      <select class="field-control" :value="activeKey" @change="selectSource"><option v-for="source in sourceKeys" :key="source" :value="source">{{ source }}</option></select>
    </label>

    <article v-if="documentSource" class="rule-layout-preview-shell">
      <header class="rule-layout-preview-hero card-surface" :class="{withBanner:banner}" :style="banner?{backgroundImage:`linear-gradient(rgba(20,17,14,.22),rgba(20,17,14,.58)),url(${banner})`}:undefined">
        <p class="eyebrow">RULES LAYOUT TEST</p>
        <h1>{{ title }}</h1>
        <small>{{ documentSource.sourceFile }}</small>
      </header>

      <nav class="rule-layout-preview-contents card-surface" aria-label="Preview page contents">
        <h2>Contents</h2>
        <div class="rule-layout-preview-links"><a v-if="overview" href="#preview-overview">Overview</a><a v-for="(section,index) in bodySections" :key="`${section.heading}-${index}`" :href="`#${sectionId(section.heading,index)}`">{{ section.heading }}</a></div>
      </nav>

      <section v-if="overview" id="preview-overview" class="rule-layout-preview-overview card-surface">
        <p class="eyebrow">OVERVIEW</p><h2>Overview</h2>
        <template v-for="(block,index) in overview.blocks" :key="index">
          <p v-if="block.type==='paragraph'">{{ block.text }}</p>
          <div v-else class="rule-layout-preview-table-wrap"><table><tbody><tr v-for="(row,rowIndex) in tableRows(block)" :key="rowIndex"><td v-for="(cell,cellIndex) in row" :key="cellIndex">{{ cell }}</td></tr></tbody></table></div>
        </template>
      </section>

      <section class="rule-layout-preview-body card-surface">
        <article v-for="(section,index) in bodySections" :id="sectionId(section.heading,index)" :key="`${section.heading}-${index}`" class="rule-layout-preview-section">
          <h2>{{ section.heading }}</h2>
          <template v-for="(block,blockIndex) in section.blocks" :key="blockIndex">
            <p v-if="block.type==='paragraph'">{{ block.text }}</p>
            <div v-else class="rule-layout-preview-table-wrap"><table><tbody><tr v-for="(row,rowIndex) in tableRows(block)" :key="rowIndex"><td v-for="(cell,cellIndex) in row" :key="cellIndex">{{ cell }}</td></tr></tbody></table></div>
          </template>
        </article>
      </section>
    </article>
  </main>
</template>

<style scoped>
.rule-layout-preview-page{--preview-gap:14px}.rule-layout-preview-notice{display:grid;gap:4px;margin-bottom:12px;padding:12px 14px;border-left:5px solid var(--accent)}.rule-layout-preview-notice strong{font-size:12px;letter-spacing:.04em}.rule-layout-preview-notice span{color:var(--ink-soft);line-height:1.4}.rule-layout-preview-picker{display:grid;gap:5px;margin-bottom:var(--preview-gap)}.rule-layout-preview-shell{display:grid;gap:var(--preview-gap)}.rule-layout-preview-hero{min-height:220px;padding:22px;display:flex;flex-direction:column;justify-content:flex-end;background:var(--paper)}.rule-layout-preview-hero.withBanner{background-position:center;background-size:cover;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.7)}.rule-layout-preview-hero h1{margin:4px 0;font-size:clamp(36px,7vw,62px)}.rule-layout-preview-hero small{opacity:.84}.rule-layout-preview-contents,.rule-layout-preview-overview,.rule-layout-preview-body{padding:16px}.rule-layout-preview-contents h2,.rule-layout-preview-overview h2{margin:0 0 9px}.rule-layout-preview-links{display:flex;gap:7px;flex-wrap:wrap}.rule-layout-preview-links a{padding:6px 9px;border:1px solid var(--line);border-radius:999px;background:var(--paper-2);color:var(--ink);font-weight:800;text-decoration:none}.rule-layout-preview-overview p:not(.eyebrow),.rule-layout-preview-section p{line-height:1.65}.rule-layout-preview-body{display:grid;gap:18px}.rule-layout-preview-section{scroll-margin-top:16px}.rule-layout-preview-section+.rule-layout-preview-section{padding-top:18px;border-top:1px solid var(--line)}.rule-layout-preview-section h2{margin:0 0 10px;font-size:clamp(24px,4vw,34px)}.rule-layout-preview-table-wrap{max-width:100%;overflow-x:auto;margin:10px 0}.rule-layout-preview-table-wrap table{width:100%;border-collapse:collapse}.rule-layout-preview-table-wrap td{padding:8px;border:1px solid var(--line);vertical-align:top}@media(max-width:620px){.rule-layout-preview-hero{min-height:170px;padding:16px}.rule-layout-preview-contents,.rule-layout-preview-overview,.rule-layout-preview-body{padding:12px}}
</style>
