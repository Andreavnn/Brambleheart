<script setup lang="ts">
import { speciesData } from '../data/speciesData'
import { structuredRule, visibleRuleFields } from '../rules/rulesEngine'
import { traitPillKeywords } from '../rules/abilityPresentation'
import RuleCollapsibleCard from './RuleCollapsibleCard.vue'
import TraitCard from './TraitCard.vue'

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
    <RuleCollapsibleCard :title="`${species.name} Lore`" class="species-menu-panel species-rule-lore-placeholder"><div class="species-lore-placeholder-body" aria-label="Species lore placeholder"></div></RuleCollapsibleCard>
    <RuleCollapsibleCard title="Heritage Traits" tone-class="detail-tone-heritage" class="species-menu-panel species-rule-trait-section">
      <div class="rule-box-grid"><TraitCard v-for="trait in species.speciesTraits" :key="trait.name" :title="trait.name" :subtitle="`${species.name} · Heritage`" :flavor="structuredRule(trait.text).intro" :fields="visibleRuleFields(trait.text)" :keywords="footerKeywords(trait.keywords,'Heritage')" :tone-class="['heritage-trait-card','species-trait-rule']" :cost="manaCostFromRule(trait.text)!==null?`${manaCostFromRule(trait.text)} Mana`:''" /></div>
    </RuleCollapsibleCard>
    <RuleCollapsibleCard title="Cultural Traits" tone-class="detail-tone-culture" class="species-menu-panel species-rule-trait-section">
      <div class="rule-box-grid"><TraitCard v-for="trait in species.cultureTraits" :key="trait.name" :title="trait.name" :subtitle="`${species.name} · Cultural`" :flavor="structuredRule(trait.text).intro" :fields="visibleRuleFields(trait.text)" :keywords="footerKeywords(trait.keywords,'Cultural')" :tone-class="['culture-trait-card','culture-trait-rule']" :cost="manaCostFromRule(trait.text)!==null?`${manaCostFromRule(trait.text)} Mana`:''" /></div>
    </RuleCollapsibleCard>
  </section>
</template>

