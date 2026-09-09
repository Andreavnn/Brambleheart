<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import RulePageNavigation from './RulePageNavigation.vue'
import RuleSurfaceScope from './RuleSurfaceScope.vue'
import type { RulePageNavigation as RulePageNavigationData } from '../data/ruleCatalog'

interface RuleBreadcrumbParent { label:string; path:string }

withDefaults(defineProps<{
  title:string
  section:string
  summary?:string
  parent?:RuleBreadcrumbParent|null
  backTo?:string
  backLabel?:string
  preferBackTo?:boolean
  skipBackPrefix?:string
  navigation?:RulePageNavigationData|null
  bodyClass?:string|string[]
}>(),{
  summary:'',
  parent:null,
  backTo:'/rules',
  backLabel:'Back to Rules',
  preferBackTo:false,
  skipBackPrefix:'/rules/read/',
  navigation:null,
  bodyClass:'',
})
</script>

<template>
  <main class="page rule-page">
    <AppHeader compact :back-to="backTo" :back-label="backLabel" :prefer-back-to="preferBackTo" :skip-back-prefix="skipBackPrefix" />
    <RuleSurfaceScope>
      <article class="rule-page-shell">
        <nav class="rule-breadcrumb" aria-label="Breadcrumb">
          <RouterLink to="/rules">Rules</RouterLink><span>›</span>
          <template v-if="parent"><RouterLink :to="parent.path">{{ parent.label }}</RouterLink><span>›</span></template>
          <strong>{{ title }}</strong>
        </nav>
        <header class="rule-page-hero card-surface">
          <p class="eyebrow">{{ section }}</p>
          <h1>{{ title }}</h1>
          <p v-if="summary" class="rule-page-detail">{{ summary }}</p>
        </header>
        <section class="rule-page-body card-surface" :class="bodyClass"><slot /></section>
        <slot name="contents" />
        <RulePageNavigation v-if="navigation" :navigation="navigation" />
      </article>
    </RuleSurfaceScope>
  </main>
</template>
