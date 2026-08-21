<script setup lang="ts">
import { species } from '../data/bramble'
import { canInstall, installMessage, isInstalled, requestInstall } from '../state/install'
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
  localStorage.removeItem('brambleheart-rules-recent-v0.03')
  resetSettings()
}
</script>

<template>
  <section>
    <div class="page-title">
      <span class="eyebrow">APPLICATION</span>
      <h1>Settings</h1>
      <p>Display, personalization, installation, support, and local data controls.</p>
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
            <div><strong>Text Size</strong><p class="muted">Normal now uses the compact reading scale. Move two steps up for the previous large baseline.</p></div>
            <select v-model="settings.text" class="field-control compact-control">
              <option value="smaller">Smaller</option>
              <option value="small">Small</option>
              <option value="normal">Normal</option>
              <option value="large">Large</option>
              <option value="larger">Larger</option>
            </select>
          </div>
          <label class="setting-row clickable">
            <div><strong>Bold Text</strong><p class="muted">Increase the weight of standard interface text without changing headings.</p></div>
            <input v-model="settings.boldText" type="checkbox" class="toggle" />
          </label>
          <label class="setting-row clickable">
            <div><strong>Compact Cards</strong><p class="muted">Reduce vertical spacing in cards and lists.</p></div>
            <input v-model="settings.compact" type="checkbox" class="toggle" />
          </label>
          <div class="setting-row">
            <div><strong>Reset Display</strong><p class="muted">Restore appearance, text, species, and background settings to their defaults.</p></div>
            <button class="secondary-button" @click="resetDisplay">Reset Display</button>
          </div>
        </div>
      </details>

      <details class="panel settings-group" open>
        <summary class="settings-summary">
          <div><span class="eyebrow">SPECIES</span><strong>Species Themes</strong><small>Apply a palette for one of the current playable species.</small></div>
          <span class="summary-mark" aria-hidden="true">+</span>
        </summary>
        <div class="settings-body">
          <div class="setting-row">
            <div><strong>Species Theme</strong><p class="muted">Each current species has a dedicated interface palette. Artwork can be added later without changing the theme selector.</p></div>
            <select v-model="settings.speciesTheme" class="field-control compact-control">
              <option value="none">None</option>
              <option v-for="item in species" :key="item" :value="item">{{ item }}</option>
            </select>
          </div>
          <div class="species-preview-grid" aria-label="Available species themes">
            <button v-for="item in species" :key="item" type="button" class="species-preview" :class="{active:settings.speciesTheme===item}" :data-preview-species="item.toLowerCase()" @click="settings.speciesTheme=item">
              <span class="species-swatch"></span><strong>{{ item }}</strong>
            </button>
          </div>
        </div>
      </details>

      <details class="panel settings-group">
        <summary class="settings-summary">
          <div><span class="eyebrow">BACKGROUND</span><strong>Background</strong><small>Optional artwork behind the application shell.</small></div>
          <span class="summary-mark" aria-hidden="true">+</span>
        </summary>
        <div class="settings-body">
          <div class="setting-row">
            <div><strong>Background</strong><p class="muted">No background artwork is available in this build.</p></div>
            <select v-model="settings.background" class="field-control compact-control"><option value="none">None</option></select>
          </div>
        </div>
      </details>

      <details class="panel settings-group">
        <summary class="settings-summary">
          <div><span class="eyebrow">INSTALL</span><strong>Install Brambleheart</strong><small>Add the companion to a supported device or desktop.</small></div>
          <span class="summary-mark" aria-hidden="true">+</span>
        </summary>
        <div class="settings-body">
          <div class="setting-row">
            <div><strong>Install App</strong><p class="muted">Supported browsers can install Brambleheart as a standalone app. If the browser does not expose the install prompt, use its Install App or Add to Home Screen command.</p><p v-if="installMessage" class="setting-note">{{ installMessage }}</p></div>
            <button class="primary-button" :disabled="isInstalled" @click="requestInstall">{{ isInstalled ? 'Installed' : canInstall ? 'Install' : 'Install Help' }}</button>
          </div>
        </div>
      </details>

      <details class="panel settings-group">
        <summary class="settings-summary">
          <div><span class="eyebrow">SUPPORT</span><strong>Support</strong><small>Support development or report an application problem.</small></div>
          <span class="summary-mark" aria-hidden="true">+</span>
        </summary>
        <div class="settings-body">
          <div class="setting-row">
            <div><strong>Support Development</strong><p class="muted">Support ongoing Brambleheart development through Andreavnn.</p></div>
            <a class="secondary-button link-button" href="https://www.patreon.com/Andreavnn" target="_blank" rel="noopener noreferrer">Patreon</a>
          </div>
          <div class="setting-row">
            <div><strong>Report an Issue</strong><p class="muted">Open the public issue tracker for reproducible application bugs.</p></div>
            <a class="secondary-button link-button" href="https://github.com/Andreavnn/Brambleheart/issues" target="_blank" rel="noopener noreferrer">Issue Tracker</a>
          </div>
        </div>
      </details>

      <details class="panel settings-group">
        <summary class="settings-summary">
          <div><span class="eyebrow">DATA &amp; CONTENT</span><strong>Local Data</strong><small>Manage information stored in this browser.</small></div>
          <span class="summary-mark" aria-hidden="true">+</span>
        </summary>
        <div class="settings-body">
          <div class="setting-row"><div><strong>Character Data</strong><p class="muted">Characters are stored locally in this browser.</p></div><button class="danger-button" @click="clearCharacters">Reset Characters</button></div>
          <div class="setting-row"><div><strong>Reset Brambleheart</strong><p class="muted">Clear local character and recent-rule data and restore interface defaults.</p></div><button class="danger-button" @click="clearEverything">Reset All Data</button></div>
        </div>
      </details>
    </section>
  </section>
</template>
