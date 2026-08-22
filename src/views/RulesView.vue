<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { allRulePages, quickReferencePages, ruleCategories } from '../data/ruleCatalog'
import { loadRecentRuleSlugs } from '../services/ruleRecent'

const router=useRouter()
const query=ref('')
const recentChoice=ref('')
const recentSlugs=ref(loadRecentRuleSlugs())
const recentPages=computed(()=>recentSlugs.value.map(slug=>allRulePages.find(page=>page.slug===slug)).filter(Boolean))
const searchResults=computed(()=>{
  const q=query.value.trim().toLowerCase()
  if(!q)return[]
  return allRulePages.filter(page=>`${page.title} ${page.summary} ${(page.keywords||[]).join(' ')}`.toLowerCase().includes(q))
})
function clearSearch(){query.value=''}
function openRecent(){if(recentChoice.value)void router.push(`/rules/read/${recentChoice.value}`)}
</script>

<template>
  <main class="page rules-page">
    <AppHeader />

    <div class="page-title-block rules-title-block">
      <p class="eyebrow">RULES</p>
      <h1>Rules</h1>
      <p>Search the Brambleheart rules reader, reopen a recent page, or browse the rules by section. Each rule opens as its own reader page.</p>
    </div>

    <section class="rules-search-tools" aria-label="Rules search and recent rules">
      <label class="search-bar rules-primary-search">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/></svg>
        <input v-model="query" type="search" placeholder="Search rules" autocomplete="off" />
        <button v-if="query" type="button" class="search-clear" aria-label="Clear search" @click="clearSearch">×</button>
      </label>
      <label class="recent-rule-search">
        <span>Recent</span>
        <select v-model="recentChoice" class="field-control" @change="openRecent">
          <option value="">Open a Recent Rule</option>
          <option v-for="recent in recentPages" :key="recent!.slug" :value="recent!.slug">{{ recent!.title }}</option>
        </select>
      </label>
    </section>

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

    <template v-else>
      <section class="section-card quick-reference-menu open">
        <div class="section-heading static-section-heading quick-reference-heading"><span>Quick Reference</span></div>
        <div class="section-content quick-reference-menu-content">
          <RouterLink v-for="entry in quickReferencePages" :key="entry.slug" class="list-row quick-reference-row" :to="`/rules/read/${entry.slug}`">
            <div class="list-row-copy"><span class="list-row-title">{{ entry.title }}</span><span class="list-row-subtitle">{{ entry.summary }}</span></div>
            <svg class="row-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>
          </RouterLink>
        </div>
      </section>

      <section class="section-stack rules-toc-stack">
        <details v-for="category in ruleCategories" :key="category.id" class="section-card rule-menu-card">
          <summary class="section-heading rule-menu-summary">
            <div class="rule-menu-heading-copy"><strong>{{ category.title }}</strong><small>{{ category.summary }}</small></div>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </summary>
          <div class="section-content rule-menu-content">
            <RouterLink v-for="entry in category.pages" :key="entry.slug" class="list-row rule-child-row" :to="`/rules/read/${entry.slug}`">
              <div class="list-row-copy"><span class="list-row-title">{{ entry.title }}</span><span class="list-row-subtitle">{{ entry.summary }}</span></div>
              <svg class="row-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>
            </RouterLink>
          </div>
        </details>
      </section>
    </template>
  </main>
</template>
