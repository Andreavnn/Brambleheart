<script setup lang="ts">
import { computed, ref } from 'vue'
import { ruleChapters } from '../data/bramble'

const query = ref('')
const open = ref(new Set<string>())
const filtered = computed(() => {
  const q=query.value.trim().toLowerCase()
  if (!q) return ruleChapters
  return ruleChapters.filter(chapter => JSON.stringify(chapter).toLowerCase().includes(q))
})
function toggle(id:string){ const next=new Set(open.value); next.has(id)?next.delete(id):next.add(id); open.value=next }
function label(status:string){ return status==='interactive'?'LOADED':status==='indexed'?'INDEXED':'TOC' }
</script>

<template>
  <section>
    <div class="page-title"><span class="eyebrow">REFERENCE</span><h1>Rules</h1><p>Browse the current Brambleheart rules index and loaded v0.01 reference text.</p></div>
    <label class="search-box"><span>⌕</span><input v-model="query" placeholder="Search rules…" /></label>
    <div class="status-row"><span class="chip">LOADED</span><span class="chip">INDEXED</span><span class="chip toc">TOC</span></div>
    <section class="stack">
      <article v-for="chapter in filtered" :key="chapter.id" class="panel rule-card">
        <button class="rule-heading" type="button" @click="toggle(chapter.id)">
          <div><span class="eyebrow">{{ chapter.eyebrow }}</span><strong>{{ chapter.title }}</strong><small>{{ chapter.summary }}</small></div>
          <span class="status-pill" :class="chapter.status">{{ label(chapter.status) }}</span>
        </button>
        <div v-if="open.has(chapter.id)" class="rule-content">
          <div v-for="section in chapter.sections" :key="section[0]" class="rule-row"><strong>{{ section[0] }}</strong><p>{{ section[1] }}</p></div>
        </div>
      </article>
    </section>
    <section v-if="!filtered.length" class="panel empty-state"><h2>No matching rules</h2><p>Try a different search term.</p></section>
  </section>
</template>
