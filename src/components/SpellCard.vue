<script setup lang="ts">
import { computed } from 'vue'
import { abilityFeaturePillClass, abilityFeaturePillKeywords, abilityFeaturePillLabel } from '../rules/abilityPresentation'

interface SpellField { label:string; value:string }

const props=withDefaults(defineProps<{
  title:string
  cost?:string
  lore?:string
  flavor?:string
  fields?:SpellField[]
  keywords?:string[]
  trinkets?:string[]
  custom?:boolean
  signature?:boolean
}>(),{
  cost:'',
  lore:'',
  flavor:'',
  fields:()=>[],
  keywords:()=>[],
  trinkets:()=>[],
  custom:false,
  signature:false,
})

const loreClass=computed(()=>`spell-lore-${String(props.lore||'invocation').toLowerCase().replace(/[^a-z0-9]+/g,'-')}`)
const featureKeywords=computed(()=>abilityFeaturePillKeywords(props.keywords))
const costParts=computed(()=>{
  const raw=String(props.cost||'').trim()
  const match=raw.match(/^(.+?)\s*[·]?\s*\((.+)\)$/)
  return match?{primary:match[1].trim(),detail:match[2].trim()}:{primary:raw,detail:''}
})
function trinketPillLabel(name:string){return name==='Scriptweave Book'?'SCRIPTWEAVE':String(name||'').toUpperCase()}
</script>

<template>
  <article class="spell-card" :class="loreClass">
    <header class="spell-card-head">
      <div>
        <h2>
          {{ title }}
          <small v-if="custom" class="custom-content-badge">CUSTOM</small>
        </h2>
      </div>
      <div class="trait-title-costs"><span v-if="costParts.primary" class="mana-badge">{{ costParts.primary }}</span></div>
    </header>

    <small v-if="costParts.detail" class="spell-cost-detail">{{ costParts.detail }}</small>
    <p v-if="flavor" class="rule-flavor"><em>{{ flavor }}</em></p>

    <div v-if="fields.length" class="rule-breakdown-grid">
      <div v-for="field in fields" :key="field.label">
        <small>{{ field.label }}</small>
        <span>{{ field.value }}</span>
      </div>
    </div>

    <div v-if="featureKeywords.length||trinkets.length" class="keyword-pill-row">
      <span v-for="keyword in featureKeywords" :key="keyword" :class="abilityFeaturePillClass(keyword)">{{ abilityFeaturePillLabel(keyword) }}</span>
      <span v-for="trinket in trinkets" :key="trinket" class="keyword-pill spell-trinket-pill">{{ trinketPillLabel(trinket) }}</span>
    </div>
  </article>
</template>
