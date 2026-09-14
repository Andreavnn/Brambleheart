<script setup lang="ts">
import { computed } from 'vue'
import { ABILITY_TYPE_KEYWORDS, abilityPillLabel, abilityTypeClass, canonicalAbilityType, activeAbilityKeywords } from '../rules/abilityPresentation'
import RuleFeatureCard from './RuleFeatureCard.vue'

interface AbilityField { label:string; value:string }

const props=withDefaults(defineProps<{
  title:string
  subtitle?:string
  badge?:string
  flavor?:string
  body?:string
  fields?:AbilityField[]
  keywords?:string[]
  toneClass?:string|string[]
  custom?:boolean
}>(),{
  subtitle:'',
  badge:'',
  flavor:'',
  body:'',
  fields:()=>[],
  keywords:()=>[],
  toneClass:'',
  custom:false,
})

const familyPriority=['Instinct','Move','Touch','Shoot','Magic','Reactive','Passive'] as const
const normalizedKeywords=computed(()=>activeAbilityKeywords(props.keywords))
const family=computed(()=>{
  const canonical=normalizedKeywords.value.map(canonicalAbilityType)
  if(canonical.includes('Combat'))return 'Touch'
  return familyPriority.find(item=>canonical.includes(item))||'Core'
})
function pillClass(keyword:string){
  const canonical=canonicalAbilityType(keyword)
  return ABILITY_TYPE_KEYWORDS.has(canonical)?['ability-cost-pill',abilityTypeClass(canonical)]:['keyword-pill']
}
function pillLabel(keyword:string){return abilityPillLabel(keyword)}
const mergedToneClass=computed<string[]>(()=>{
  const toneClasses=Array.isArray(props.toneClass)?props.toneClass:props.toneClass?[props.toneClass]:[]
  return ['full-rule-entry',abilityTypeClass(family.value),...toneClasses]
})
</script>

<template>
  <RuleFeatureCard :title="title" :subtitle="subtitle" :badge="badge" :fields="fields" :tone-class="mergedToneClass">
    <template #header-extra>
      <small v-if="custom" class="custom-content-badge">CUSTOM</small>
    </template>
    <p v-if="flavor" class="rule-flavor"><em>{{ flavor }}</em></p>
    <p v-if="body">{{ body }}</p>
    <template #footer>
      <div v-if="normalizedKeywords.length" class="keyword-pill-row">
        <span v-for="keyword in normalizedKeywords" :key="keyword" :class="pillClass(keyword)">{{ pillLabel(keyword) }}</span>
      </div>
    </template>
  </RuleFeatureCard>
</template>
