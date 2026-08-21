<script setup lang="ts">
import { computed, ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import { allRulePages, ruleCategories } from '../data/ruleCatalog'
import { loadRecentRuleSlugs } from '../services/ruleRecent'

const query=ref('')
const recentSlugs=ref(loadRecentRuleSlugs())
const recentPages=computed(()=>recentSlugs.value.map(slug=>allRulePages.find(page=>page.slug===slug)).filter(Boolean))
const searchResults=computed(()=>{
  const q=query.value.trim().toLowerCase()
  if(!q)return[]
  return allRulePages.filter(page=>`${page.title} ${page.summary} ${page.note||''}`.toLowerCase().includes(q))
})
function clearSearch(){query.value=''}
</script>

<template>
  <main class="page rules-page">
    <AppHeader />

    <div class="page-title-block rules-title-block">
      <p class="eyebrow">RULES</p>
      <h1>Rules</h1>
      <p>Search the Brambleheart rules reader or browse the table-of-contents groups below. Each rule opens as its own reader page.</p>
    </div>

    <label class="search-bar">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/></svg>
      <input v-model="query" type="search" placeholder="Search rules" autocomplete="off" />
      <button v-if="query" type="button" class="search-clear" aria-label="Clear search" @click="clearSearch">×</button>
    </label>

    <section v-if="query" class="section-card rules-search-results open">
      <div class="section-heading static-section-heading"><span>Search Results</span></div>
      <div class="section-content">
        <RouterLink v-for="result in searchResults" :key="result.slug" class="list-row" :to="`/rules/read/${result.slug}`">
          <div class="list-row-copy"><span class="list-row-title">{{ result.title }}</span><span class="list-row-subtitle">{{ result.summary }}</span></div>
          <svg class="row-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>
        </RouterLink>
        <div v-if="!searchResults.length" class="empty-inline">No matching rules.</div>
      </div>
    </section>

    <section v-if="recentPages.length&&!query" class="section-card rules-recent-card open">
      <div class="section-heading static-section-heading"><span>Recent</span></div>
      <div class="section-content">
        <RouterLink v-for="recent in recentPages" :key="recent!.slug" class="list-row" :to="`/rules/read/${recent!.slug}`">
          <div class="list-row-copy"><span class="list-row-title">{{ recent!.title }}</span><span class="list-row-subtitle">Recently opened rule</span></div>
          <svg class="row-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>
        </RouterLink>
      </div>
    </section>

    <section v-if="!query" class="section-stack rules-toc-stack">
      <details v-for="category in ruleCategories" :key="category.id" class="section-card rule-menu-card">
        <summary class="section-heading rule-menu-summary">
          <div class="rule-menu-heading-copy"><strong>{{ category.title }}</strong><small>{{ category.summary }}</small></div>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
        </summary>
        <div class="section-content">
          <RouterLink v-for="entry in category.pages" :key="entry.slug" class="list-row" :to="`/rules/read/${entry.slug}`">
            <div class="list-row-copy"><span class="list-row-title">{{ entry.title }}</span><span class="list-row-subtitle">{{ entry.summary }}</span></div>
            <svg class="row-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>
          </RouterLink>
        </div>
      </details>
    </section>
  </main>
</template>
