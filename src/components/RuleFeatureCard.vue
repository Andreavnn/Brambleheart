<script setup lang="ts">
import { computed } from 'vue'
import { formatMeasurementText } from '../rules/measurements'
import { useSettings } from '../state/settings'

interface RuleFeatureField { label:string; value:string }

const props=withDefaults(defineProps<{
  title:string
  subtitle?:string
  badge?:string
  metaText?:string
  fields?:RuleFeatureField[]
  toneClass?:string|string[]
  compact?:boolean
  collapsible?:boolean
}>(),{subtitle:'',badge:'',metaText:'',fields:()=>[],toneClass:'',compact:false,collapsible:false})

const {measurement}=useSettings()
const displayFields=computed(()=>props.fields.map(field=>({...field,value:formatMeasurementText(field.value,measurement.value)})))
</script>

<template>
  <component :is="collapsible?'details':'article'" class="rule-feature-box rule-feature-card" :class="[toneClass,{compact,collapsible}]">
    <component :is="collapsible?'summary':'header'" class="rule-feature-card-head">
      <div>
        <slot name="header-extra" />
        <h3>{{ title }}</h3>
        <small v-if="subtitle">{{ subtitle }}</small>
      </div>
      <div class="rule-feature-card-meta">
        <span v-if="metaText" class="rule-feature-card-detail">{{ metaText }}</span>
        <slot name="header-meta" />
        <span v-if="badge" class="mana-badge">{{ badge }}</span>
        <span v-if="collapsible" class="rule-feature-card-chevron" aria-hidden="true">⌄</span>
      </div>
    </component>
    <div v-if="$slots.default" class="rule-feature-card-body"><slot /></div>
    <div v-if="displayFields.length" class="rule-feature-card-fields">
      <div v-for="field in displayFields" :key="field.label">
        <small>{{ field.label }}</small>
        <span>{{ field.value }}</span>
      </div>
    </div>
    <div v-if="$slots.footer" class="rule-feature-card-footer"><slot name="footer" /></div>
  </component>
</template>
