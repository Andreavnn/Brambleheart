<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { findRulePage, fundamentalsNavigation, loreNavigation, quickFaq, quickReferencePages, resolveSourceSections, ruleCategories } from '../data/ruleCatalog'
import { speciesData } from '../data/speciesData'
import { recordRecentRule } from '../services/ruleRecent'
import type { RuleSourceBlock, RuleSourceSection } from '../data/rulesSource'

const route=useRoute()
const slug=computed(()=>String(route.params.slug||''))
const page=computed(()=>findRulePage(slug.value))
const rawSourceSections=computed(()=>page.value?resolveSourceSections(page.value):[])
watch(slug,value=>{if(value)recordRecentRule(value)},{immediate:true})

function displayText(value:string){
  return value.replace(/\bProwess\b/g,'Agility').replace(/\bprowess\b/g,'agility')
}
function isDialogue(value:string){return /\b(?:Watcher|Player|Selu):/.test(value)}
function dialogueParts(value:string){
  const parts:Array<{actor:string;text:string}>=[]
  const rx=/(Watcher|Player|Selu):\s*[“"]?([^”"]+)[”"]?/g
  let match:RegExpExecArray|null
  while((match=rx.exec(value)))parts.push({actor:match[1],text:match[2].trim()})
  return parts
}
function keywordParts(value:string){
  if(!/^KEYWORDS?:/i.test(value.trim()))return[]
  return value.split(':',2)[1].split('|').map(item=>item.trim()).filter(Boolean)
}
function isKeywordBlock(block:RuleSourceBlock){return block.type==='paragraph'&&keywordParts(block.text).length>0}
function isExampleHeading(value:string){return /example/i.test(value)}

const sourceSections=computed(()=>{
  const entries=rawSourceSections.value
  if(page.value?.loreHeading){
    const entry=entries[0];if(!entry)return[]
    const headings=new Set(loreNavigation.map(item=>item.heading))
    const blocks=entry.section.blocks
    const start=blocks.findIndex(block=>block.type==='paragraph'&&block.text.trim()===page.value?.loreHeading)
    if(start<0)return[]
    let end=blocks.length
    for(let index=start+1;index<blocks.length;index++){const block=blocks[index];if(block.type==='paragraph'&&headings.has(block.text.trim())){end=index;break}}
    const section:RuleSourceSection={heading:page.value.loreHeading,blocks:blocks.slice(start+1,end)}
    return[{...entry,section}]
  }
  if(slug.value!=='introduction')return entries
  const filtered=entries.filter(entry=>entry.section.heading!=='WHAT YOU’LL NEED')
  const watcher=filtered.find(entry=>entry.section.heading==='THE WATCHER')
  const flow=filtered.find(entry=>entry.section.heading==='HOW THE GAME FLOWS')
  if(!watcher||!flow)return filtered
  const merged:RuleSourceSection={heading:'THE WATCHER',blocks:[...flow.section.blocks,...watcher.section.blocks]}
  const out=filtered.filter(entry=>entry.section.heading!=='THE WATCHER'&&entry.section.heading!=='HOW THE GAME FLOWS')
  const insertAt=Math.max(0,out.findIndex(entry=>entry.section.heading==='CORE PRINCIPLES OF PLAY'))
  out.splice(insertAt<0?out.length:insertAt,0,{...watcher,section:merged})
  return out
})

const fundamentalIndex=computed(()=>fundamentalsNavigation.findIndex(item=>item.slug===slug.value))
const previousFundamental=computed(()=>fundamentalIndex.value>0?fundamentalsNavigation[fundamentalIndex.value-1]:null)
const nextFundamental=computed(()=>fundamentalIndex.value>=0&&fundamentalIndex.value<fundamentalsNavigation.length-1?fundamentalsNavigation[fundamentalIndex.value+1]:null)
const loreIndex=computed(()=>loreNavigation.findIndex(item=>item.slug===slug.value))
const previousLore=computed(()=>loreIndex.value>0?loreNavigation[loreIndex.value-1]:null)
const nextLore=computed(()=>loreIndex.value>=0&&loreIndex.value<loreNavigation.length-1?loreNavigation[loreIndex.value+1]:null)

const breadcrumbSection=computed(()=>{
  if(loreIndex.value>=0||quickReferencePages.some(item=>item.slug===slug.value))return'References'
  return ruleCategories.find(category=>category.pages.some(item=>item.slug===slug.value))?.title||'Rules'
})
function labeledParagraph(value:string){
  const text=displayText(value).trim()
  const match=text.match(/^([^:]{2,45}):\s+(.+)$/)
  return match?{label:match[1],body:match[2]}:{label:'',body:text}
}
function bulletParts(value:string){
  const parts=displayText(value).split(/\s*•\s*/).map(part=>part.trim()).filter(Boolean)
  return parts.length>1?parts:[]
}
function singleCellText(block:RuleSourceBlock){return block.type==='table'&&block.rows.length===1&&block.rows[0].length===1?displayText(block.rows[0][0]).trim():''}
</script>

<template>
  <main class="page rule-reader-page">
    <AppHeader compact back-to="/rules" back-label="Back to Rules" prefer-back-to skip-back-prefix="/rules/read/" />

    <template v-if="page">
      <nav class="rule-breadcrumb" aria-label="Breadcrumb"><RouterLink to="/rules">Rules</RouterLink><span>›</span><span>{{ breadcrumbSection }}</span><span>›</span><strong>{{ page.title }}</strong></nav>
      <div class="page-title-block rule-reader-title">
        <p class="eyebrow">RULES READER</p>
        <h1>{{ page.title }}</h1>
        <p>{{ page.summary }}</p>
      </div>

      <nav v-if="fundamentalIndex>=0" class="fundamental-inner-links card-surface" aria-label="The Fundamentals pages"><RouterLink v-for="item in fundamentalsNavigation" :key="item.slug" :to="`/rules/read/${item.slug}`" :class="{active:item.slug===slug}">{{ item.title }}</RouterLink></nav>
      <nav v-else-if="loreIndex>=0" class="fundamental-inner-links lore-inner-links card-surface" aria-label="Lore of Anthro Mundas pages"><RouterLink v-for="item in loreNavigation" :key="item.slug" :to="`/rules/read/${item.slug}`" :class="{active:item.slug===slug}">{{ item.title }}</RouterLink></nav>

      <template v-if="page.slug==='playable-species'">
        <section class="rule-content-card card-surface playable-species-reader">
          <article class="rule-copy-card"><h2>Playable Species</h2><p>Choose a Species to read its lore, Species Traits, Culture Traits, and native language.</p></article>
          <RouterLink v-for="species in speciesData" :key="species.name" class="list-row" :to="`/rules/read/species-${species.name.toLowerCase()}`">
            <span class="list-row-copy"><span class="list-row-title">{{ species.name }}</span><span class="list-row-subtitle">{{ species.theme }}</span></span><svg class="row-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>
          </RouterLink>
        </section>
      </template>

      <template v-else-if="page.slug==='faq'">
        <section class="rule-content-card card-surface faq-reader"><article v-for="item in quickFaq" :key="item.q" class="rule-copy-card faq-row"><h2>{{ item.q }}</h2><p>{{ item.a }}</p></article></section>
      </template>

      <template v-else-if="page.slug==='changes-updates'">
        <section class="rule-content-card card-surface changes-reader"><article class="rule-copy-card"><h2>Changes &amp; Updates</h2><p>This page is reserved for Brambleheart rules errata, amendments, and system changes. No separate system amendment has been supplied for this build.</p></article></section>
      </template>

      <template v-else>
        <section v-if="page.note" class="info-card rule-source-note"><strong>Source Note</strong><p>{{ displayText(page.note) }}</p></section>
        <section v-if="sourceSections.length" class="rule-content-card card-surface">
          <article v-for="(entry,index) in sourceSections" :key="`${entry.document}-${entry.section.heading}-${index}`" class="rule-copy-card source-section-card old-dex-rule-section" :class="{'example-source-card':isExampleHeading(entry.section.heading)}">
            <h2 v-if="entry.section.heading!=='Overview'">{{ displayText(entry.section.heading) }}</h2>
            <template v-for="(block,blockIndex) in entry.section.blocks" :key="blockIndex">
              <p v-if="isKeywordBlock(block)" class="rule-keyword-line"><strong>Keywords:</strong> {{ keywordParts(block.type==='paragraph'?block.text:'').map(displayText).join(' · ') }}</p>
              <template v-else-if="block.type==='paragraph'">
                <div v-if="isDialogue(block.text)" class="dialogue-example-box">
                  <p v-for="part in dialogueParts(block.text)" :key="`${part.actor}-${part.text}`"><strong>{{ part.actor }}:</strong> <em>{{ displayText(part.text) }}</em></p>
                </div>
                <div v-else-if="bulletParts(block.text).length" class="rule-bullet-block"><p>{{ bulletParts(block.text)[0] }}</p><ul><li v-for="part in bulletParts(block.text).slice(1)" :key="part">{{ part }}</li></ul></div>
                <p v-else :class="{'example-copy':isExampleHeading(entry.section.heading)}"><strong v-if="labeledParagraph(block.text).label" class="rule-inline-label">{{ labeledParagraph(block.text).label }}:</strong><span>{{ labeledParagraph(block.text).body }}</span></p>
              </template>
              <div v-else-if="block.rows.length===1&&block.rows[0].length===1&&isDialogue(block.rows[0][0])" class="dialogue-example-box">
                <p v-for="part in dialogueParts(block.rows[0][0])" :key="`${part.actor}-${part.text}`"><strong>{{ part.actor }}:</strong> <em>{{ displayText(part.text) }}</em></p>
              </div>
              <h3 v-else-if="singleCellText(block)" class="source-table-title">{{ singleCellText(block) }}</h3>
              <div v-else class="rule-table-wrap"><table class="rule-source-table"><tbody><tr v-for="(row,rowIndex) in block.rows" :key="rowIndex"><td v-for="(cell,cellIndex) in row" :key="cellIndex">{{ displayText(cell) }}</td></tr></tbody></table></div>
            </template>
          </article>
        </section>
        <section v-else-if="!page.note" class="empty-state card-surface compact-empty"><h2>Rule Text Unavailable</h2><p>This page is organized in the reader but has no supplied source text in the current rules package.</p></section>
      </template>

      <nav v-if="fundamentalIndex>=0" class="fundamental-bottom-nav card-surface" aria-label="Fundamental rules navigation">
        <RouterLink v-if="previousFundamental" class="fundamental-nav-button prev" :to="`/rules/read/${previousFundamental.slug}`"><span>‹</span><small>BACK</small><strong>{{ previousFundamental.title }}</strong></RouterLink><span v-else class="fundamental-nav-spacer"></span>
        <div class="fundamental-nav-position"><small>THE FUNDAMENTALS</small><strong>{{ fundamentalIndex+1 }} / {{ fundamentalsNavigation.length }}</strong></div>
        <RouterLink v-if="nextFundamental" class="fundamental-nav-button next" :to="`/rules/read/${nextFundamental.slug}`"><small>NEXT</small><strong>{{ nextFundamental.title }}</strong><span>›</span></RouterLink><span v-else class="fundamental-nav-spacer"></span>
      </nav>
      <nav v-if="loreIndex>=0" class="fundamental-bottom-nav lore-bottom-nav card-surface" aria-label="Lore of Anthro Mundas navigation">
        <RouterLink v-if="previousLore" class="fundamental-nav-button prev" :to="`/rules/read/${previousLore.slug}`"><span>‹</span><small>BACK</small><strong>{{ previousLore.title }}</strong></RouterLink><span v-else class="fundamental-nav-spacer"></span>
        <div class="fundamental-nav-position"><small>ANTHRO MUNDAS</small><strong>{{ loreIndex+1 }} / {{ loreNavigation.length }}</strong></div>
        <RouterLink v-if="nextLore" class="fundamental-nav-button next" :to="`/rules/read/${nextLore.slug}`"><small>NEXT</small><strong>{{ nextLore.title }}</strong><span>›</span></RouterLink><span v-else class="fundamental-nav-spacer"></span>
      </nav>
    </template>

    <section v-else class="empty-state card-surface compact-empty"><h2>Rule Not Found</h2><p>The requested rule page is not available.</p><RouterLink class="primary-button" to="/rules">Back to Rules</RouterLink></section>
  </main>
</template>

<style scoped>
.rule-breadcrumb{display:flex;align-items:center;gap:7px;min-width:0;margin:2px 2px 10px;color:var(--ink-soft);font-size:calc(10px + var(--font-offset));overflow:hidden;white-space:nowrap}.rule-breadcrumb a{color:var(--accent-dark);font-weight:800;text-decoration:none}.rule-breadcrumb strong{min-width:0;overflow:hidden;text-overflow:ellipsis;color:var(--ink)}
.rule-reader-title{margin-top:8px}.rule-reader-title h1{font-weight:900}.rule-reader-title p{max-width:690px}
.fundamental-inner-links{display:flex;gap:6px;padding:7px;margin:0 0 13px;overflow-x:auto}.fundamental-inner-links a{flex:1 0 auto;min-height:34px;display:flex;align-items:center;justify-content:center;padding:5px 9px;border:1px solid var(--line);border-radius:7px;background:var(--paper-2);color:var(--ink-soft);text-decoration:none;font-size:calc(9px + var(--font-offset));font-weight:750;white-space:nowrap}.fundamental-inner-links a.active{border-color:var(--accent);background:var(--accent-wash);color:var(--ink)}
.old-dex-rule-section{position:relative;padding:0!important;background:var(--paper)!important}.old-dex-rule-section>h2{margin:0!important;padding:12px 15px;border-bottom:1px solid var(--line);border-left:5px solid var(--accent);background:color-mix(in srgb,var(--accent-wash) 32%,var(--paper-2));font-family:Georgia,'Times New Roman',serif;font-size:calc(19px + var(--font-offset));font-weight:900;line-height:1.15}.old-dex-rule-section>p,.old-dex-rule-section>.dialogue-example-box,.old-dex-rule-section>.rule-table-wrap,.old-dex-rule-section>.rule-keyword-line,.old-dex-rule-section>.rule-bullet-block,.old-dex-rule-section>.source-table-title{margin-left:15px!important;margin-right:15px!important}.old-dex-rule-section>p{margin-top:12px;margin-bottom:12px;line-height:1.62}.old-dex-rule-section>p:last-child{margin-bottom:15px}.rule-inline-label{margin-right:.35em;color:var(--ink);font-weight:900}.rule-keyword-line{padding:8px 0 12px;border-top:1px solid var(--line);color:var(--ink-soft)}.rule-bullet-block{margin-top:11px;margin-bottom:12px;line-height:1.55}.rule-bullet-block>p{margin:0 0 6px}.rule-bullet-block ul{margin:0;padding-left:20px}.rule-bullet-block li+li{margin-top:4px}.source-table-title{margin-top:13px!important;margin-bottom:7px!important;font-family:Georgia,'Times New Roman',serif;font-size:calc(14px + var(--font-offset));font-weight:900;color:var(--ink)}
.fundamental-bottom-nav{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:stretch;gap:8px;margin-top:14px;padding:8px}.fundamental-nav-button{display:grid;grid-template-columns:auto minmax(0,1fr);grid-template-rows:auto auto;align-items:center;column-gap:8px;min-width:0;padding:9px 11px;border:1px solid var(--line);border-radius:9px;background:var(--paper-2);color:var(--ink);text-decoration:none}.fundamental-nav-button.next{grid-template-columns:minmax(0,1fr) auto;text-align:right}.fundamental-nav-button>span{grid-row:1/3;font-size:28px;color:var(--accent-dark)}.fundamental-nav-button.next>span{grid-column:2}.fundamental-nav-button small{color:var(--ink-soft);font-size:8px;font-weight:900;letter-spacing:.1em}.fundamental-nav-button strong{min-width:0;font-family:Georgia,'Times New Roman',serif;font-size:calc(11px + var(--font-offset));overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.fundamental-nav-position{display:grid;place-items:center;align-content:center;min-width:86px;color:var(--ink-soft);text-align:center}.fundamental-nav-position small{font-size:8px;font-weight:900;letter-spacing:.08em}.fundamental-nav-position strong{color:var(--ink);font-size:12px}.fundamental-nav-spacer{min-width:0}
@media(max-width:620px){.fundamental-bottom-nav{grid-template-columns:1fr 1fr}.fundamental-nav-position{grid-column:1/-1;grid-row:1}.fundamental-nav-button.prev{grid-column:1}.fundamental-nav-button.next{grid-column:2}.fundamental-nav-spacer{display:none}.old-dex-rule-section>p,.old-dex-rule-section>.dialogue-example-box,.old-dex-rule-section>.rule-table-wrap,.old-dex-rule-section>.rule-keyword-line,.old-dex-rule-section>.rule-bullet-block,.old-dex-rule-section>.source-table-title{margin-left:11px!important;margin-right:11px!important}}
</style>
