<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { findRulePage, fundamentalsNavigation, quickFaq, quickReferencePages, resolveSourceSections, ruleCategories } from '../data/ruleCatalog'
import { speciesData } from '../data/speciesData'
import { recordRecentRule } from '../services/ruleRecent'
import type { RuleSourceBlock, RuleSourceSection } from '../data/rulesSource'

const route=useRoute()
const slug=computed(()=>String(route.params.slug||''))
const page=computed(()=>findRulePage(slug.value))
const rawSourceSections=computed(()=>page.value?resolveSourceSections(page.value):[])
watch(slug,value=>{if(value)recordRecentRule(value)},{immediate:true})

function displayText(value:string){
  return value.replace(/\bProwess\b/g,'Agility').replace(/\bprowess\b/g,'ability')
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
</script>

<template>
  <main class="page rule-reader-page">
    <AppHeader compact back-to="/rules" back-label="Back to Rules" prefer-back-to skip-back-prefix="/rules/read/" />

    <template v-if="page">
      <div class="page-title-block rule-reader-title">
        <p class="eyebrow">RULES READER</p>
        <h1>{{ page.title }}</h1>
        <p>{{ page.summary }}</p>
        <div v-if="page.keywords?.length" class="keyword-pill-row page-keywords"><span v-for="keyword in page.keywords" :key="keyword" class="keyword-pill">{{ keyword }}</span></div>
      </div>

      <template v-if="page.slug==='quick-reference'">
        <section class="rule-content-card card-surface quick-reference-reader">
          <div class="rule-copy-card"><h2>Quick Reference</h2><p>Use these links to jump directly to the rules currently organized in the Brambleheart reader.</p></div>
          <div class="quick-reference-group quick-reference-featured">
            <h2>Reference &amp; Setting</h2>
            <div class="quick-reference-link-grid">
              <RouterLink v-for="entry in quickReferencePages.filter(item=>item.slug!=='quick-reference')" :key="entry.slug" :to="`/rules/read/${entry.slug}`" class="list-row quick-reference-link">
                <span class="list-row-copy"><span class="list-row-title">{{ entry.title }}</span><span class="list-row-subtitle">{{ entry.summary }}</span></span><svg class="row-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>
              </RouterLink>
            </div>
          </div>
          <div v-for="category in ruleCategories" :key="category.id" class="quick-reference-group">
            <h2>{{ category.title }}</h2>
            <div class="quick-reference-link-grid">
              <RouterLink v-for="entry in category.pages" :key="entry.slug" :to="`/rules/read/${entry.slug}`" class="list-row quick-reference-link">
                <span class="list-row-copy"><span class="list-row-title">{{ entry.title }}</span><span class="list-row-subtitle">{{ entry.summary }}</span></span><svg class="row-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>
              </RouterLink>
            </div>
          </div>
        </section>
      </template>

      <template v-else-if="page.slug==='playable-species'">
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
          <article v-for="(entry,index) in sourceSections" :key="`${entry.document}-${entry.section.heading}-${index}`" class="rule-copy-card source-section-card" :class="{'example-source-card':isExampleHeading(entry.section.heading)}">
            <h2 v-if="entry.section.heading!=='Overview'">{{ displayText(entry.section.heading) }}</h2>
            <template v-for="(block,blockIndex) in entry.section.blocks" :key="blockIndex">
              <div v-if="isKeywordBlock(block)" class="keyword-pill-row"><span v-for="keyword in keywordParts(block.type==='paragraph'?block.text:'')" :key="keyword" class="keyword-pill">{{ displayText(keyword) }}</span></div>
              <template v-else-if="block.type==='paragraph'">
                <div v-if="isDialogue(block.text)" class="dialogue-example-box">
                  <p v-for="part in dialogueParts(block.text)" :key="`${part.actor}-${part.text}`"><strong>{{ part.actor }}:</strong> <em>{{ displayText(part.text) }}</em></p>
                </div>
                <p v-else :class="{'example-copy':isExampleHeading(entry.section.heading)}">{{ displayText(block.text) }}</p>
              </template>
              <div v-else-if="block.rows.length===1&&block.rows[0].length===1&&isDialogue(block.rows[0][0])" class="dialogue-example-box">
                <p v-for="part in dialogueParts(block.rows[0][0])" :key="`${part.actor}-${part.text}`"><strong>{{ part.actor }}:</strong> <em>{{ displayText(part.text) }}</em></p>
              </div>
              <div v-else class="rule-table-wrap"><table class="rule-source-table"><tbody><tr v-for="(row,rowIndex) in block.rows" :key="rowIndex"><td v-for="(cell,cellIndex) in row" :key="cellIndex">{{ displayText(cell) }}</td></tr></tbody></table></div>
            </template>
          </article>
        </section>
        <section v-else-if="!page.note" class="empty-state card-surface compact-empty"><h2>Rule Text Unavailable</h2><p>This page is organized in the reader but has no supplied source text in the current rules package.</p></section>
      </template>

      <nav v-if="fundamentalIndex>=0" class="reader-page-nav card-surface" aria-label="Fundamental rules navigation">
        <RouterLink v-if="previousFundamental" class="secondary-button" :to="`/rules/read/${previousFundamental.slug}`">← {{ previousFundamental.title }}</RouterLink><span v-else></span>
        <RouterLink class="secondary-button" to="/rules">Fundamentals Menu</RouterLink>
        <RouterLink v-if="nextFundamental" class="secondary-button" :to="`/rules/read/${nextFundamental.slug}`">{{ nextFundamental.title }} →</RouterLink><span v-else></span>
      </nav>
    </template>

    <section v-else class="empty-state card-surface compact-empty"><h2>Rule Not Found</h2><p>The requested rule page is not available.</p><RouterLink class="primary-button" to="/rules">Back to Rules</RouterLink></section>
  </main>
</template>
