<script setup lang="ts">
import { computed, ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import { BUILD, ruleChapters, type RuleChapter } from '../data/bramble'

const RECENT_KEY='brambleheart-rules-recent-v0.04'
const query=ref('')
const open=ref(new Set<string>())
const recentIds=ref<string[]>(loadRecent())

const groups = [
  { id:'reference', title:'Reference & Updates', eyebrow:'REFERENCE', ids:[] as string[] },
  { id:'fundamental', title:'Fundamental Rules', eyebrow:'CORE SYSTEM', ids:['fundamentals','core-abilities'] },
  { id:'creation', title:'Character Creation Rules', eyebrow:'CHARACTERS', ids:['character-creation','sparks','homeland','faith-oath','talents','adventuring-gear','trade-goods','transportation','beyond-creation'] },
  { id:'species', title:'Species Rules', eyebrow:'SPECIES', ids:['species'] },
  { id:'battle', title:'Battle Rules', eyebrow:'ENCOUNTERS', ids:['winds-of-magic','battles','weapons','armor'] },
  { id:'roleplay', title:'Role-Playing Rules', eyebrow:'STORY & WATCHER', ids:['role-play','monsters'] },
] as const

function loadRecent(){
  try { const raw=JSON.parse(localStorage.getItem(RECENT_KEY)||'[]'); return Array.isArray(raw)?raw.filter(v=>typeof v==='string').slice(0,6):[] }
  catch { return [] }
}
function recordRecent(id:string){
  recentIds.value=[id,...recentIds.value.filter(value=>value!==id)].slice(0,6)
  localStorage.setItem(RECENT_KEY,JSON.stringify(recentIds.value))
}
function toggle(id:string){
  const next=new Set(open.value)
  next.has(id)?next.delete(id):next.add(id)
  open.value=next
  recordRecent(id)
}
function openRecent(id:string){
  open.value=new Set([...open.value,id])
  recordRecent(id)
  requestAnimationFrame(()=>document.getElementById(`rule-${id}`)?.scrollIntoView({behavior:'smooth',block:'center'}))
}
function clearSearch(){ query.value='' }
function matches(chapter:RuleChapter){
  const q=query.value.trim().toLowerCase()
  return !q || JSON.stringify(chapter).toLowerCase().includes(q)
}
function jumpTo(id:string){ document.getElementById(`rules-${id}`)?.scrollIntoView({behavior:'smooth',block:'start'}) }

const categoryGroups=computed(()=>groups.slice(1).map(group=>({
  ...group,
  chapters:group.ids.map(id=>ruleChapters.find(chapter=>chapter.id===id)).filter((chapter): chapter is RuleChapter=>Boolean(chapter)).filter(matches),
})).filter(group=>group.chapters.length))
const recentRules=computed(()=>recentIds.value.map(id=>ruleChapters.find(chapter=>chapter.id===id)).filter((chapter):chapter is RuleChapter=>Boolean(chapter)))
</script>

<template>
  <main class="page rules-page">
    <AppHeader />

    <div class="page-title-block rules-title-block">
      <p class="eyebrow">RULES</p>
      <h1>Rules</h1>
      <div class="rules-intro-copy">
        <p>Search the current Brambleheart reference, return to recently opened entries, or browse the major rules sections.</p>
        <p class="rules-version-note"><strong>Alpha Build {{ BUILD }}</strong> · Reference content reflects the rules currently loaded into this build.</p>
      </div>
    </div>

    <label class="search-bar">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/></svg>
      <input v-model="query" type="search" placeholder="Search rules" autocomplete="off" />
      <button v-if="query" type="button" class="search-clear" aria-label="Clear search" @click="clearSearch">×</button>
    </label>

    <section class="quick-actions rules-quick-actions" aria-label="Rules sections">
      <button v-for="group in groups" :key="group.id" type="button" class="quick-action rules-quick-action" @click="jumpTo(group.id)">
        <span>{{ group.title }}</span>
      </button>
    </section>

    <section id="rules-reference" class="section-card rules-reference-card open">
      <div class="section-heading static-section-heading">
        <span>Reference &amp; Updates</span>
        <span class="section-heading-right"><span class="section-count">{{ recentRules.length }}</span></span>
      </div>
      <div class="section-content">
        <div class="list-row muted">
          <div class="list-row-copy"><span class="list-row-title">Current reference build</span><span class="list-row-subtitle">Brambleheart Alpha Build {{ BUILD }}. Rule groups are indexed from the current application data.</span></div>
          <span class="row-badge">CURRENT</span>
        </div>
        <template v-if="recentRules.length">
          <button v-for="chapter in recentRules" :key="chapter.id" type="button" class="list-row recent-rule-row" @click="openRecent(chapter.id)">
            <div class="list-row-copy"><span class="list-row-title">{{ chapter.title }}</span><span class="list-row-subtitle">Recently opened · {{ chapter.eyebrow }}</span></div>
            <svg class="row-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>
          </button>
        </template>
        <div v-else class="empty-inline">Recently opened rules will appear here.</div>
      </div>
    </section>

    <section class="section-stack rules-accordion-stack">
      <article v-for="group in categoryGroups" :id="`rules-${group.id}`" :key="group.id" class="section-card" :class="{ open:true }">
        <div class="section-heading static-section-heading">
          <span>{{ group.title }}</span>
          <span class="section-heading-right"><span class="section-count">{{ group.chapters.length }}</span></span>
        </div>
        <div class="section-content">
          <article v-for="chapter in group.chapters" :id="`rule-${chapter.id}`" :key="chapter.id" class="nested-rule-entry">
            <button type="button" class="list-row nested-rule-toggle" @click="toggle(chapter.id)">
              <div class="list-row-copy">
                <span class="list-row-title">{{ chapter.title }}</span>
                <span class="list-row-subtitle">{{ chapter.summary }}</span>
              </div>
              <span class="row-badge">{{ chapter.status === 'interactive' ? 'LOADED' : chapter.status === 'indexed' ? 'INDEXED' : 'TOC' }}</span>
              <svg class="row-chevron" :class="{ rotated:open.has(chapter.id) }" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>
            </button>
            <div v-if="open.has(chapter.id)" class="nested-rule-content">
              <div v-for="section in chapter.sections" :key="section[0]" class="rule-copy-row">
                <strong>{{ section[0] }}</strong>
                <p>{{ section[1] }}</p>
              </div>
            </div>
          </article>
        </div>
      </article>
    </section>

    <section v-if="query && !categoryGroups.length" class="empty-state card-surface compact-empty">
      <div class="empty-icon">⌕</div>
      <h2>No matching rules</h2>
      <p>Try a different search term.</p>
    </section>
  </main>
</template>
