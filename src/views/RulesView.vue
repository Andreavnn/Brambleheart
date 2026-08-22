<script setup lang="ts">
import { computed, ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import { allRulePages, quickReferencePages, ruleCategories } from '../data/ruleCatalog'
import { loadRecentRuleSlugs } from '../services/ruleRecent'

const query=ref('')
const recentSlugs=ref(loadRecentRuleSlugs())
const recentPages=computed(()=>recentSlugs.value.map(slug=>allRulePages.find(page=>page.slug===slug)).filter(Boolean).slice(0,6))
const searchResults=computed(()=>{
  const q=query.value.trim().toLowerCase()
  if(!q)return[]
  return allRulePages.filter(page=>`${page.title} ${page.summary} ${(page.keywords||[]).join(' ')}`.toLowerCase().includes(q))
})
function clearSearch(){query.value=''}
</script>

<template>
  <main class="page rules-page">
    <AppHeader />

    <div class="page-title-block rules-title-block">
      <p class="eyebrow">RULES</p>
      <h1>Rules</h1>
      <p>Search the Brambleheart rules reader, reopen a recent page, or browse the rules by section. Each rule opens as its own reader page.</p>
    </div>

    <section class="rules-search-tools" aria-label="Rules search">
      <label class="search-bar rules-primary-search">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/></svg>
        <input v-model="query" type="search" placeholder="Search rules" autocomplete="off" />
        <button v-if="query" type="button" class="search-clear" aria-label="Clear search" @click="clearSearch">×</button>
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
      <section v-if="recentPages.length" class="recent-rules-panel card-surface" aria-label="Recently viewed rules">
        <div class="recent-rules-heading"><div><p class="eyebrow">RECENT</p><h2>Recently Viewed</h2></div><small>Quickly reopen rules you used most recently.</small></div>
        <div class="recent-rules-grid">
          <RouterLink v-for="recent in recentPages" :key="recent!.slug" class="recent-rule-box" :to="`/rules/read/${recent!.slug}`">
            <span>{{ recent!.title }}</span><small>{{ recent!.summary }}</small>
          </RouterLink>
        </div>
      </section>

      <section class="section-card quick-reference-menu open">
        <div class="section-heading static-section-heading quick-reference-heading"><span>References</span></div>
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

<style scoped>
.recent-rules-panel{margin-bottom:13px;overflow:hidden}
.recent-rules-heading{display:flex;align-items:end;justify-content:space-between;gap:14px;padding:13px 15px;border-bottom:1px solid var(--line);background:var(--paper-2)}
.recent-rules-heading .eyebrow{margin:0 0 3px}.recent-rules-heading h2{margin:0;font-family:Georgia,'Times New Roman',serif;font-size:calc(18px + var(--font-offset))}.recent-rules-heading>small{max-width:260px;color:var(--ink-soft);text-align:right}
.recent-rules-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;padding:10px}
.recent-rule-box{min-width:0;display:grid;gap:3px;padding:10px 11px;border:1px solid var(--line);border-top:4px solid var(--accent);border-radius:9px;background:var(--paper);color:var(--ink);text-decoration:none;box-shadow:0 2px 6px rgba(0,0,0,.04)}
.recent-rule-box:hover{border-color:var(--line-dark);background:var(--paper-2)}.recent-rule-box span{font-family:Georgia,'Times New Roman',serif;font-weight:800}.recent-rule-box small{color:var(--ink-soft);line-height:1.35}
@media(max-width:620px){.recent-rules-heading{align-items:flex-start;flex-direction:column}.recent-rules-heading>small{text-align:left}.recent-rules-grid{grid-template-columns:1fr}}
</style>
