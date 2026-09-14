<script setup lang="ts">
import { abilityFeaturePillClass, abilityFeaturePillLabel } from '../rules/abilityPresentation'

interface TraitField { label:string; value:string }

withDefaults(defineProps<{
  title:string
  subtitle:string
  flavor?:string
  fields?:TraitField[]
  keywords?:string[]
  toneClass?:string|string[]
  cost?:string
  custom?:boolean
}>(),{
  flavor:'',
  fields:()=>[],
  keywords:()=>[],
  toneClass:'',
  cost:'',
  custom:false,
})
</script>

<template>
  <article class="trait-card full-rule-entry" :class="toneClass">
    <div class="trait-card-head">
      <div>
        <h3>{{ title }} <small v-if="custom" class="custom-content-badge">CUSTOM</small></h3>
        <small v-if="subtitle">{{ subtitle }}</small>
      </div>
      <div v-if="cost || $slots.actions" class="trait-card-head-actions">
        <span v-if="cost" class="mana-badge">{{ cost }}</span>
        <slot name="actions" />
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
