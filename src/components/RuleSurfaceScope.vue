<template>
  <div class="rule-surface-scope"><slot /></div>
</template>

<style scoped>
.rule-surface-scope{
  --paper:#fbfaf6;
  --paper-2:#f4f1e9;
  --surface-front:#fbfaf6;
  --surface-back:#f4f1e9;
  --surface-title:#f4f1e9;
}
:global(:root[data-theme="dark"]) .rule-surface-scope{
  --paper:#211f1b;
  --paper-2:#28251f;
  --surface-front:#211f1b;
  --surface-back:#28251f;
  --surface-title:#28251f;
}
</style>
