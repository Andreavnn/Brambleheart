<script setup lang="ts">
import { species } from '../data/bramble'
import { settings, resetDisplaySettings, resetSettings } from '../state/settings'

function clearCharacters(){
  if (!confirm('Delete all saved Brambleheart characters from this browser?')) return
  localStorage.removeItem('brambleheart-characters-v0.01')
}
function resetDisplay(){
  if (!confirm('Restore Brambleheart display settings to their defaults?')) return
  resetDisplaySettings()
}
function clearEverything(){
  if (!confirm('Reset all Brambleheart local data and settings?')) return
  localStorage.removeItem('brambleheart-characters-v0.01')
  resetSettings()
}
</script>

<template>
  <section>
    <div class="page-title">
      <span class="eyebrow">APPLICATION</span>
      <h1>Settings</h1>
      <p>Display, interface personalization, and local data controls for this browser.</p>
    </div>

    <section class="settings-stack">
      <details class="panel settings-group" open>
        <summary class="settings-summary">
          <div><span class="eyebrow">DISPLAY</span><strong>Appearance</strong><small>Control the core interface presentation.</small></div>
          <span class="summary-mark" aria-hidden="true">+</span>
        </summary>
        <div class="settings-body">
          <div class="setting-row">
            <div><strong>Appearance Mode</strong><p class="muted">Match the device or force the light or dark interface.</p></div>
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
          <div class="setting-row">
            <div><strong>Reset Display</strong><p class="muted">Restore appearance, species, and background settings to their defaults.</p></div>
            <button class="secondary-button" @click="resetDisplay">Reset Display</button>
          </div>
        </div>
      </details>

      <details class="panel settings-group" open>
        <summary class="settings-summary">
          <div><span class="eyebrow">SPECIES</span><strong>Species</strong><small>Prepare the interface for species-specific presentation.</small></div>
          <span class="summary-mark" aria-hidden="true">+</span>
        </summary>
        <div class="settings-body">
          <div class="setting-row">
            <div><strong>Species Theme</strong><p class="muted">Choose a species profile. The base interface remains in use until species palettes and artwork are added.</p></div>
            <select v-model="settings.speciesTheme" class="field-control compact-control">
              <option value="none">None</option>
              <option v-for="item in species" :key="item" :value="item">{{ item }}</option>
            </select>
          </div>
        </div>
      </details>

      <details class="panel settings-group" open>
        <summary class="settings-summary">
          <div><span class="eyebrow">BACKGROUND</span><strong>Background</strong><small>Optional background artwork for the application shell.</small></div>
          <span class="summary-mark" aria-hidden="true">+</span>
        </summary>
        <div class="settings-body">
          <div class="setting-row">
            <div><strong>Background</strong><p class="muted">No background artwork is available in this build.</p></div>
            <select v-model="settings.background" class="field-control compact-control"><option value="none">None</option></select>
          </div>
        </div>
      </details>

      <details class="panel settings-group" open>
        <summary class="settings-summary">
          <div><span class="eyebrow">DATA &amp; CONTENT</span><strong>Local Data</strong><small>Manage information stored in this browser.</small></div>
          <span class="summary-mark" aria-hidden="true">+</span>
        </summary>
        <div class="settings-body">
          <div class="setting-row"><div><strong>Character Data</strong><p class="muted">Characters are stored locally in this browser.</p></div><button class="danger-button" @click="clearCharacters">Reset Characters</button></div>
          <div class="setting-row"><div><strong>Reset Brambleheart</strong><p class="muted">Clear all local character data and restore interface defaults.</p></div><button class="danger-button" @click="clearEverything">Reset All Data</button></div>
        </div>
      </details>
    </section>
  </section>
</template>
