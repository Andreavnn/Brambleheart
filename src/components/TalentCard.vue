<script setup lang="ts">
import { abilityFeaturePillClass, abilityFeaturePillLabel } from '../rules/abilityPresentation'

interface TalentField { label:string; value:string }

withDefaults(defineProps<{
  title:string
  cost?:string
  flavor?:string
  fields?:TalentField[]
  keywords?:string[]
  toneClass?:string|string[]
  custom?:boolean
  requirement?:string
  requirementMet?:boolean
}>(),{
  cost:'',
  flavor:'',
  fields:()=>[],
  keywords:()=>[],
  toneClass:'',
  custom:false,
  requirement:'',
  requirementMet:true,
})
</script>

<template>
  <article class="talent-detail-card full-rule-entry" :class="toneClass">
    <div class="talent-detail-head">
      <div>
        <small v-if="custom" class="custom-content-badge">CUSTOM</small>
        <h2>{{ title }}</h2>
      </div>
      <div v-if="cost || requirement" class="talent-head-actions">
        <span v-if="cost" class="mana-badge">{{ cost }}</span>
        <span v-if="requirement" class="requirement-badge" :class="{invalid:!requirementMet}">Requires {{ requirement }}</span>
      </div>
    </div>
    <p v-if="flavor" class="rule-flavor"><em>{{ flavor }}</em></p>
    <div v-if="fields.length" class="rule-breakdown-grid">
      <div v-for="field in fields" :key="field.label">
        <small>{{ field.label }}</small>
        <span>{{ field.value }}</span>
      </div>
    </div>
    <div v-if="keywords.length" class="keyword-pill-row">
      <span v-for="keyword in keywords" :key="keyword" :class="abilityFeaturePillClass(keyword)">{{ abilityFeaturePillLabel(keyword) }}</span>
    </div>
    <slot />
  </article>
</template>
