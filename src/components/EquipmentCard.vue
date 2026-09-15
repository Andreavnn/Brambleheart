<script setup lang="ts">
import RuleFeatureCard from './RuleFeatureCard.vue'

interface EquipmentField { label:string; value:string }

withDefaults(defineProps<{
  title:string
  badge?:string
  detailText?:string
  toneClass?:string|string[]
  description?:string
  fields?:EquipmentField[]
  collapsible?:boolean
}>(),{
  badge:'',
  detailText:'',
  toneClass:'detail-tone-equipment',
  description:'',
  fields:()=>[],
  collapsible:true,
})
</script>

<template>
  <RuleFeatureCard class="equipment-card" :title="title" :badge="badge" :meta-text="detailText" :tone-class="toneClass" :fields="fields" :collapsible="collapsible">
    <template #header-meta><slot v-if="$slots['header-meta']" name="header-meta" /></template>
    <p v-if="description">{{ description }}</p>
    <slot />
    <template #footer><slot v-if="$slots.footer" name="footer" /></template>
  </RuleFeatureCard>
</template>
