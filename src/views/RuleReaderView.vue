<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { findRulePage, quickFaq, resolveSourceSections, ruleCategories } from '../data/ruleCatalog'
import { recordRecentRule } from '../services/ruleRecent'

const route=useRoute()
const slug=computed(()=>String(route.params.slug||''))
const page=computed(()=>findRulePage(slug.value))
const sourceSections=computed(()=>page.value?resolveSourceSections(page.value):[])
watch(slug,value=>{if(value)recordRecentRule(value)},{immediate:true})
</script>

<template>
  <main class="page rule-reader-page">
    <AppHeader compact back-to="/rules" back-label="Back to Rules" prefer-back-to skip-back-prefix="/rules/read/" />

    <template v-if="page">
      <div class="page-title-block rule-reader-title">
        <p class="eyebrow">RULES READER</p>
        <h1>{{ page.title }}</h1>
        <p>{{ page.summary }}</p>
      </div>

      <template v-if="page.slug==='quick-reference'">
        <section class="rule-content-card card-surface quick-reference-reader">
          <div class="rule-copy-card"><h2>Quick Reference</h2><p>Use these links to jump directly to every rules page currently organized in the Brambleheart reader.</p></div>
          <div v-for="category in ruleCategories.filter(group=>group.id!=='reference')" :key="category.id" class="quick-reference-group">
            <h2>{{ category.title }}</h2>
            <div class="quick-reference-link-grid">
              <RouterLink v-for="entry in category.pages" :key="entry.slug" :to="`/rules/read/${entry.slug}`" class="list-row quick-reference-link">
                <span class="list-row-copy"><span class="list-row-title">{{ entry.title }}</span><span class="list-row-subtitle">{{ entry.summary }}</span></span>
                <svg class="row-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>
              </RouterLink>
            </div>
          </div>
        </section>
      </template>

      <template v-else-if="page.slug==='faq'">
        <section class="rule-content-card card-surface faq-reader">
          <article v-for="item in quickFaq" :key="item.q" class="rule-copy-card faq-row"><h2>{{ item.q }}</h2><p>{{ item.a }}</p></article>
        </section>
      </template>

      <template v-else-if="page.slug==='changes-updates'">
        <section class="rule-content-card card-surface changes-reader">
          <article class="rule-copy-card"><h2>Changes &amp; Updates</h2><p>This page is reserved for Brambleheart rules errata, amendments, and system changes. No separate system amendment has been supplied for this build.</p></article>
        </section>
      </template>

      <template v-else>
        <section v-if="page.note" class="info-card rule-source-note"><strong>Source note</strong><p>{{ page.note }}</p></section>
        <section v-if="sourceSections.length" class="rule-content-card card-surface">
          <article v-for="(entry,index) in sourceSections" :key="`${entry.document}-${entry.section.heading}-${index}`" class="rule-copy-card source-section-card">
            <h2 v-if="entry.section.heading!=='Overview'">{{ entry.section.heading }}</h2>
            <template v-for="(block,blockIndex) in entry.section.blocks" :key="blockIndex">
              <p v-if="block.type==='paragraph'">{{ block.text }}</p>
              <div v-else class="rule-table-wrap">
                <table class="rule-source-table">
                  <tbody>
                    <tr v-for="(row,rowIndex) in block.rows" :key="rowIndex"><td v-for="(cell,cellIndex) in row" :key="cellIndex">{{ cell }}</td></tr>
                  </tbody>
                </table>
              </div>
            </template>
          </article>
        </section>
        <section v-else-if="!page.note" class="empty-state card-surface compact-empty"><h2>Rule text unavailable</h2><p>This page is organized in the reader but has no supplied source text in the current rules package.</p></section>
      </template>
    </template>

    <section v-else class="empty-state card-surface compact-empty"><h2>Rule not found</h2><p>The requested rule page is not available.</p><RouterLink class="primary-button" to="/rules">Back to Rules</RouterLink></section>
  </main>
</template>
