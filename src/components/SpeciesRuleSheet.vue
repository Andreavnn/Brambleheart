<script setup lang="ts">
import { speciesData } from '../data/speciesData'
import { structuredRule, visibleRuleFields } from '../rules/rulesEngine'
import { abilityFeaturePillClass, abilityFeaturePillLabel, traitPillKeywords } from '../rules/abilityPresentation'

type SpeciesDefinition=(typeof speciesData)[number]
const props=defineProps<{species:SpeciesDefinition}>()

function speciesImageUrl(name:string){return`/assets/species/${name.toLowerCase()}.png`}
function manaCostFromRule(text:string){const match=text.match(/\bCOST:\s*\[?([0-9]+)\]?\s*mana/i);return match?Number(match[1]):null}
function footerKeywords(values:string[],kind:'Heritage'|'Cultural'){return traitPillKeywords(values,kind,props.species.name)}
</script>

<template>
  <section class="species-rule-sheet">
    <section class="rule-page-section species-rule-lore">
      <h2>{{ species.name }} Lore</h2>
      <small class="species-rule-pronunciation">{{ species.pronunciation }}</small>
      <div class="species-rule-layout">
        <div class="species-rule-lore-copy"><p>{{ species.lore }}</p><p><strong>Language:</strong> {{ species.language }}</p></div>
        <div class="species-rule-side"><div class="species-rule-art"><div class="species-rule-art-frame"><img :src="speciesImageUrl(species.name)" :alt="`${species.name} species artwork`" /></div></div><blockquote class="species-rule-quote">“{{ species.quote }}”</blockquote></div>
      </div>
    </section>
    <details class="organized-rule-category species-menu-panel species-rule-lore-placeholder card-surface"><summary><span class="species-menu-title">{{ species.name }} Lore</span><span class="species-menu-chevron" aria-hidden="true">⌄</span></summary><div class="organized-rule-category-body species-lore-placeholder-body" aria-label="Species lore placeholder"></div></details>
    <details class="organized-rule-category species-menu-panel species-rule-trait-section card-surface">
      <summary><span class="species-menu-title">Heritage Traits</span><span class="species-menu-chevron" aria-hidden="true">⌄</span></summary>
      <div class="organized-rule-category-body rule-box-grid"><article v-for="trait in species.speciesTraits" :key="trait.name" class="trait-card heritage-trait-card species-trait-rule"><div class="trait-card-head"><div><h3>{{ trait.name }}</h3><small>{{ species.name }} · Heritage</small></div><div class="trait-card-head-actions"><span v-if="manaCostFromRule(trait.text)!==null" class="mana-badge">{{ manaCostFromRule(trait.text) }} Mana</span></div></div><p v-if="structuredRule(trait.text).intro" class="rule-flavor">{{ structuredRule(trait.text).intro }}</p><div v-if="visibleRuleFields(trait.text).length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(trait.text)" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div class="keyword-pill-row"><span v-for="keyword in footerKeywords(trait.keywords,'Heritage')" :key="keyword" :class="abilityFeaturePillClass(keyword)">{{ abilityFeaturePillLabel(keyword) }}</span></div></article></div>
    </details>
    <details class="organized-rule-category species-menu-panel species-rule-trait-section card-surface">
      <summary><span class="species-menu-title">Cultural Traits</span><span class="species-menu-chevron" aria-hidden="true">⌄</span></summary>
      <div class="organized-rule-category-body rule-box-grid"><article v-for="trait in species.cultureTraits" :key="trait.name" class="trait-card culture-trait-card culture-trait-rule"><div class="trait-card-head"><div><h3>{{ trait.name }}</h3><small>{{ species.name }} · Cultural</small></div><div class="trait-card-head-actions"><span v-if="manaCostFromRule(trait.text)!==null" class="mana-badge">{{ manaCostFromRule(trait.text) }} Mana</span></div></div><p v-if="structuredRule(trait.text).intro" class="rule-flavor">{{ structuredRule(trait.text).intro }}</p><div v-if="visibleRuleFields(trait.text).length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(trait.text)" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div class="keyword-pill-row"><span v-for="keyword in footerKeywords(trait.keywords,'Cultural')" :key="keyword" :class="abilityFeaturePillClass(keyword)">{{ abilityFeaturePillLabel(keyword) }}</span></div></article></div>
    </details>
  </section>
</template>

<style scoped>
.species-menu-panel{overflow:hidden}
.species-menu-panel>summary{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:58px;padding:12px 14px;cursor:pointer;list-style:none;border-bottom:0;background:var(--surface-title,var(--paper-2))}
.species-menu-panel>summary::-webkit-details-marker{display:none}
.species-menu-panel[open]>summary{border-bottom:1px solid var(--surface-line,var(--line))}
.species-menu-title{font-family:Georgia,"Times New Roman",serif;font-size:clamp(16px,2.4vw,20px);font-weight:900;line-height:1.15}
.species-menu-chevron{flex:0 0 auto;font-size:19px;font-weight:900;transition:transform .16s ease}
.species-menu-panel[open] .species-menu-chevron{transform:rotate(180deg)}
</style>
