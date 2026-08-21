<script setup lang="ts">
import { computed, ref } from 'vue'
import { BUILD, ruleChapters, type RuleChapter } from '../data/bramble'

const RECENT_KEY='brambleheart-rules-recent-v0.03'
const query=ref('')
const open=ref(new Set<string>())
const recentIds=ref<string[]>(loadRecent())

const groups = [
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
function label(status:string){ return status==='interactive'?'LOADED':status==='indexed'?'INDEXED':'TOC' }
function matches(chapter:RuleChapter){
  const q=query.value.trim().toLowerCase()
  return !q || JSON.stringify(chapter).toLowerCase().includes(q)
}
const groupedRules=computed(()=>groups.map(group=>({
  ...group,
  chapters:group.ids.map(id=>ruleChapters.find(chapter=>chapter.id===id)).filter((chapter): chapter is RuleChapter=>Boolean(chapter)).filter(matches),
})).filter(group=>group.chapters.length))
const recentRules=computed(()=>recentIds.value.map(id=>ruleChapters.find(chapter=>chapter.id===id)).filter((chapter):chapter is RuleChapter=>Boolean(chapter)))
</script>

<template>
  <section>
    <div class="page-title">
      <span class="eyebrow">REFERENCE</span>
      <h1>Rules</h1>
      <p>Search the current Brambleheart reference, return to recent entries, or browse by rules section.</p>
    </div>

    <section class="panel reference-panel">
      <div class="section-head"><div><span class="eyebrow">REFERENCE &amp; UPDATES</span><h2>Reference &amp; Updates</h2></div><span class="build-chip">BUILD {{ BUILD }}</span></div>
      <div class="reference-grid">
        <div class="reference-box">
          <span class="field-label">Search Rules</span>
          <label class="search-box embedded"><span>⌕</span><input v-model="query" placeholder="Search rules…" autocomplete="off" /></label>
          <div class="status-row"><span class="chip">LOADED</span><span class="chip">INDEXED</span><span class="chip toc">TOC</span></div>
        </div>
        <div class="reference-box">
          <span class="field-label">Recent</span>
          <div v-if="recentRules.length" class="recent-list">
            <button v-for="chapter in recentRules" :key="chapter.id" type="button" @click="openRecent(chapter.id)"><strong>{{ chapter.title }}</strong><span>{{ chapter.eyebrow }}</span></button>
          </div>
          <p v-else class="muted recent-empty">Recently opened rules will appear here.</p>
        </div>
      </div>
    </section>

    <section class="rules-groups">
      <details v-for="group in groupedRules" :key="group.id" class="panel rule-group" open>
        <summary class="rule-group-summary">
          <div><span class="eyebrow">{{ group.eyebrow }}</span><strong>{{ group.title }}</strong><small>{{ group.chapters.length }} entr{{ group.chapters.length===1?'y':'ies' }}</small></div>
          <span class="summary-mark" aria-hidden="true">+</span>
        </summary>
        <div class="rule-group-body">
          <article v-for="chapter in group.chapters" :id="`rule-${chapter.id}`" :key="chapter.id" class="rule-card">
            <button class="rule-heading" type="button" @click="toggle(chapter.id)">
              <div><span class="eyebrow">{{ chapter.eyebrow }}</span><strong>{{ chapter.title }}</strong><small>{{ chapter.summary }}</small></div>
              <span class="status-pill" :class="chapter.status">{{ label(chapter.status) }}</span>
            </button>
            <div v-if="open.has(chapter.id)" class="rule-content">
              <div v-for="section in chapter.sections" :key="section[0]" class="rule-row"><strong>{{ section[0] }}</strong><p>{{ section[1] }}</p></div>
            </div>
          </article>
        </div>
      </details>
    </section>

    <section v-if="!groupedRules.length" class="panel empty-state"><h2>No matching rules</h2><p>Try a different word or chapter title.</p></section>
  </section>
</template>
