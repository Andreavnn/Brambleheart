<script setup lang="ts">
import { settings, resetSettings } from '../state/settings'

function clearCharacters(){
  if (!confirm('Delete all saved Brambleheart characters from this browser?')) return
  localStorage.removeItem('brambleheart-characters-v0.01')
}
function clearEverything(){
  if (!confirm('Reset all Brambleheart local data and settings?')) return
  localStorage.removeItem('brambleheart-characters-v0.01')
  resetSettings()
}
</script>

<template>
  <section>
    <div class="page-title"><span class="eyebrow">APPLICATION</span><h1>Settings</h1><p>Display and local data controls for this browser.</p></div>

    <section class="panel settings-section">
      <div class="section-head"><div><span class="eyebrow">DISPLAY</span><h2>Appearance</h2></div></div>
      <div class="setting-row">
        <div><strong>Theme</strong><p class="muted">Match the device, use the light paper theme, or use the dark Old.dex-style shell.</p></div>
        <select v-model="settings.theme" class="field-control compact-control"><option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option></select>
      </div>
      <div class="setting-row">
        <div><strong>Text Size</strong><p class="muted">Adjust the application text scale.</p></div>
        <select v-model="settings.text" class="field-control compact-control"><option value="small">Small</option><option value="medium">Medium</option><option value="large">Large</option></select>
      </div>
      <label class="setting-row clickable">
        <div><strong>Compact Cards</strong><p class="muted">Reduce vertical spacing in cards and lists.</p></div>
        <input v-model="settings.compact" type="checkbox" class="toggle" />
      </label>
    </section>

    <section class="panel settings-section">
      <div class="section-head"><div><span class="eyebrow">DATA</span><h2>Local Data</h2></div></div>
      <div class="setting-row"><div><strong>Character Data</strong><p class="muted">Characters are stored locally in this browser.</p></div><button class="danger-button" @click="clearCharacters">Reset Characters</button></div>
      <div class="setting-row"><div><strong>Reset Brambleheart</strong><p class="muted">Clear all local application data and restore display defaults.</p></div><button class="danger-button" @click="clearEverything">Reset All Data</button></div>
    </section>
  </section>
</template>
