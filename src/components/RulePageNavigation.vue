<script setup lang="ts">
import type { RulePageNavigation } from '../data/ruleCatalog'

defineProps<{navigation:RulePageNavigation}>()
</script>

<template>
  <nav v-if="navigation.previous||navigation.next" class="rule-page-neighbors" aria-label="Rule page navigation">
    <RouterLink v-if="navigation.previous" class="rule-page-neighbor previous" :to="`/rules/read/${navigation.previous.slug}`">
      <small>Previous · {{ navigation.previous.section }}</small>
      <strong>‹ {{ navigation.previous.title }}</strong>
    </RouterLink>
    <span v-else class="rule-page-neighbor-spacer" aria-hidden="true"></span>
    <RouterLink v-if="navigation.next" class="rule-page-neighbor next" :to="`/rules/read/${navigation.next.slug}`">
      <small>Next · {{ navigation.next.section }}</small>
      <strong>{{ navigation.next.title }} ›</strong>
    </RouterLink>
  </nav>
</template>

<style scoped>
.rule-page-neighbors{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:14px}.rule-page-neighbor{display:grid;gap:3px;min-width:0;padding:11px 13px;border:1px solid var(--line);border-radius:9px;background:var(--paper-2);color:var(--ink);text-decoration:none}.rule-page-neighbor:hover{border-color:var(--accent);background:var(--accent-wash)}.rule-page-neighbor small{color:var(--ink-soft);font-size:calc(8px + var(--font-offset));font-weight:800;letter-spacing:.04em;text-transform:uppercase}.rule-page-neighbor strong{overflow-wrap:anywhere;font-family:Georgia,'Times New Roman',serif;font-size:calc(13px + var(--font-offset))}.rule-page-neighbor.next{text-align:right}.rule-page-neighbor-spacer{min-width:0}
@media(max-width:620px){.rule-page-neighbors{grid-template-columns:1fr}.rule-page-neighbor-spacer{display:none}.rule-page-neighbor.next{text-align:left}}
</style>
