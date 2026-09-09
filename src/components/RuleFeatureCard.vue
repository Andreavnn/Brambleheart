<script setup lang="ts">
interface RuleFeatureField { label:string; value:string }

withDefaults(defineProps<{
  title:string
  subtitle?:string
  badge?:string
  fields?:RuleFeatureField[]
  toneClass?:string|string[]
  compact?:boolean
}>(),{subtitle:'',badge:'',fields:()=>[],toneClass:'',compact:false})
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
    <div v-if="fields.length" class="rule-feature-card-fields">
      <div v-for="field in fields" :key="field.label">
        <small>{{ field.label }}</small>
        <span>{{ field.value }}</span>
      </div>
    </div>
    <div v-if="$slots.footer" class="rule-feature-card-footer"><slot name="footer" /></div>
  </article>
</template>
