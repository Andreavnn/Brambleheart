<template>
  <nav class="primary-nav" aria-label="Primary navigation">
    <RouterLink to="/characters">Character Roster</RouterLink>
    <RouterLink to="/rules">Rules</RouterLink>
    <RouterLink to="/simulator">Rhythm Engine</RouterLink>
    <RouterLink to="/settings">Settings</RouterLink>
  </nav>
</template>

<style scoped>
@media(max-width:390px){.primary-nav a{font-size:calc(9px + var(--font-offset));letter-spacing:-.015em}}
</style>
