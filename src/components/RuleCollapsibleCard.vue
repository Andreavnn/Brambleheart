<script setup lang="ts">
withDefaults(defineProps<{
  title:string
  subtitle?:string
  badge?:string
  toneClass?:string|string[]
}>(),{subtitle:'',badge:'',toneClass:''})
</script>

<template>
  <details class="rule-feature-box rule-feature-card rule-collapsible-card" :class="toneClass">
    <summary class="rule-feature-card-head rule-collapsible-card-head">
      <div>
        <h3>{{ title }}</h3>
        <small v-if="subtitle">{{ subtitle }}</small>
      </div>
      <span class="rule-collapsible-card-meta">
        <span v-if="badge" class="mana-badge">{{ badge }}</span>
        <span class="rule-collapsible-chevron" aria-hidden="true">⌄</span>
      </span>
    </summary>
    <div class="rule-feature-card-body rule-collapsible-card-body"><slot /></div>
  </details>
</template>
