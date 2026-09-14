<script setup lang="ts">
import type { CoreActionDefinition } from '../data/coreAbilities'
import AbilityCard from './AbilityCard.vue'

defineProps<{action:CoreActionDefinition}>()
</script>

<template>
  <AbilityCard
    :title="action.name"
    :subtitle="action.flavor"
    :badge="action.cost||''"
    :fields="action.fields"
    :keywords="action.keywords"
    tone-class="core-action-card"
  />
</template>
