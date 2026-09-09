<script setup lang="ts">
import { computed } from 'vue'
import { formatMeasurementText } from '../rules/measurements'
import { useSettings } from '../state/settings'

interface RuleFeatureField { label:string; value:string }

const props=withDefaults(defineProps<{
  title:string
  subtitle?:string
  badge?:string
  fields?:RuleFeatureField[]
  toneClass?:string|string[]
  compact?:boolean
}>(),{subtitle:'',badge:'',fields:()=>[],toneClass:'',compact:false})

const {measurement}=useSettings()
const displayFields=computed(()=>props.fields.map(field=>({...field,value:formatMeasurementText(field.value,measurement.value)})))
</script>

<template>
  <article class="rule-feature-box rule-feature-card" :class="[toneClass,{compact}]">
    <header class="rule-feature-card-head">
      <div>
        <h3>{{ title }}</h3>
        <small v-if="subtitle">{{ subtitle }}</small>
      </div>
      <span v-if="badge" class="mana-badge">{{ badge }}</span>
    </header>
    <div v-if="$slots.default" class="rule-feature-card-body"><slot /></div>
    <div v-if="displayFields.length" class="rule-feature-card-fields">
      <div v-for="field in displayFields" :key="field.label">
        <small>{{ field.label }}</small>
        <span>{{ field.value }}</span>
      </div>
    </div>
    <div v-if="$slots.footer" class="rule-feature-card-footer"><slot name="footer" /></div>
  </article>
</template>
