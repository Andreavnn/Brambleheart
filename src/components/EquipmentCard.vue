<script setup lang="ts">
import RuleFeatureCard from './RuleFeatureCard.vue'

interface EquipmentField { label:string; value:string }

withDefaults(defineProps<{
  title:string
  badge?:string
  toneClass?:string|string[]
  description?:string
  fields?:EquipmentField[]
}>(),{
  badge:'',
  toneClass:'detail-tone-equipment',
  description:'',
  fields:()=>[],
})
</script>

<template>
  <RuleFeatureCard :title="title" :badge="badge" :tone-class="toneClass" :fields="fields">
    <p v-if="description">{{ description }}</p>
    <slot />
    <template #footer><slot v-if="$slots.footer" name="footer" /></template>
  </RuleFeatureCard>
</template>
