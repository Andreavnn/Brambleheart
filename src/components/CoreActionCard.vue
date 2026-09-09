<script setup lang="ts">
import type { CoreActionDefinition } from '../data/coreAbilities'
import { ABILITY_TYPE_KEYWORDS, abilityPillLabel, abilityTypeClass, canonicalAbilityType } from '../rules/abilityPresentation'
import RuleFeatureCard from './RuleFeatureCard.vue'

const props=defineProps<{action:CoreActionDefinition}>()
const coreFamilyPriority=['Instinct','Move','Touch','Shoot','Magic','Reactive','Passive']
function family(){const keywords=props.action.keywords.map(canonicalAbilityType);if(keywords.includes('Combat'))return'Touch';return coreFamilyPriority.find(item=>keywords.includes(item))||'Core'}
function pillClass(keyword:string){const canonical=canonicalAbilityType(keyword);return ABILITY_TYPE_KEYWORDS.has(canonical)?['ability-cost-pill',abilityTypeClass(canonical)]:['keyword-pill']}
function pillLabel(keyword:string){return props.action.name.toUpperCase()==='REACTION'&&keyword.trim().toLowerCase()==='reaction'?'REACTION':abilityPillLabel(keyword)}
</script>

<template>
  <RuleFeatureCard
    :title="action.name"
    :subtitle="action.flavor"
    :badge="action.cost||''"
    :fields="action.fields"
    :tone-class="['core-action-card',abilityTypeClass(family())]"
  >
    <template #footer>
      <div class="keyword-pill-row">
        <span v-for="keyword in action.keywords" :key="keyword" :class="pillClass(keyword)">{{ pillLabel(keyword) }}</span>
      </div>
    </template>
  </RuleFeatureCard>
</template>
