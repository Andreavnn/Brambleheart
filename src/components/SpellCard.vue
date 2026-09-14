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
  custom?:boolean
  signature?:boolean
}>(),{
  cost:'',
  lore:'',
  flavor:'',
  fields:()=>[],
  keywords:()=>[],
  custom:false,
  signature:false,
})

const loreClass=computed(()=>`spell-lore-${String(props.lore||'invocation').toLowerCase().replace(/[^a-z0-9]+/g,'-')}`)
const featureKeywords=computed(()=>abilityFeaturePillKeywords(props.keywords))
</script>

<template>
  <article class="spell-card" :class="loreClass">
    <header class="spell-card-head">
      <div>
        <h2>
          {{ title }}
          <small v-if="signature" class="custom-content-badge">SIGNATURE</small>
          <small v-if="custom" class="custom-content-badge">CUSTOM</small>
        </h2>
      </div>
      <div class="trait-title-costs"><span v-if="cost" class="mana-badge">{{ cost }}</span></div>
    </header>

    <p v-if="flavor" class="rule-flavor"><em>{{ flavor }}</em></p>

    <div v-if="fields.length" class="rule-breakdown-grid">
      <div v-for="field in fields" :key="field.label">
        <small>{{ field.label }}</small>
        <span>{{ field.value }}</span>
      </div>
    </div>

    <div v-if="featureKeywords.length" class="keyword-pill-row">
      <span v-for="keyword in featureKeywords" :key="keyword" :class="abilityFeaturePillClass(keyword)">{{ abilityFeaturePillLabel(keyword) }}</span>
    </div>
  </article>
</template>
