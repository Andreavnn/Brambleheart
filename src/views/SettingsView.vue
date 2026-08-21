<script setup lang="ts">
import { computed } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import { species } from '../data/bramble'
import { canInstall, installMessage, isInstalled, requestInstall } from '../state/install'
import { useSettings, type FontSize, type SpeciesTheme } from '../state/settings'

const { darkMode, compactRows, fontSize, boldText, speciesTheme, reset } = useSettings()

const fontOptions: Array<{ value:FontSize; label:string }> = [
  { value:'smaller', label:'Smaller' },
  { value:'small', label:'Small' },
  { value:'normal', label:'Normal' },
  { value:'large', label:'Large' },
  { value:'larger', label:'Larger' },
]
const speciesOptions = species.map(name => ({ value:name as SpeciesTheme, label:name }))
const currentSpeciesLabel = computed(() => speciesTheme.value === 'default' ? 'Default' : speciesTheme.value)

function toggleSpecies(value: SpeciesTheme, event: Event) {
  const checked = Boolean((event.target as HTMLInputElement | null)?.checked)
  speciesTheme.value = checked ? value : (speciesTheme.value === value ? 'default' : speciesTheme.value)
}
function clearCharacters() {
  if (typeof window === 'undefined' || !window.confirm('Clear all saved Brambleheart characters from this device? This cannot be undone.')) return
  localStorage.removeItem('brambleheart-characters-v0.01')
}
function clearRecentRules() {
  if (typeof window === 'undefined' || !window.confirm('Clear recently opened rules from this device?')) return
  localStorage.removeItem('brambleheart-rules-recent-v0.04')
}
function clearAllLocalData() {
  if (typeof window === 'undefined' || !window.confirm('Reset Brambleheart local data? This removes saved characters and recent rules. Display settings are preserved.')) return
  localStorage.removeItem('brambleheart-characters-v0.01')
  localStorage.removeItem('brambleheart-rules-recent-v0.03')
  localStorage.removeItem('brambleheart-rules-recent-v0.04')
  localStorage.removeItem('brambleheart.welcome.v0.04')
  localStorage.removeItem('brambleheart.install-welcome-dismissed.v0.04')
}
function reportIssue() {
  if (typeof window !== 'undefined') window.open('https://github.com/Andreavnn/Brambleheart/issues', '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <main class="page settings-page">
    <AppHeader />
    <div class="page-title-block">
      <p class="eyebrow">SETTINGS</p>
      <h1>Settings</h1>
      <p>Display preferences, species palettes, install options, support links, and local data controls are kept together here.</p>
    </div>

    <section class="settings-group" aria-label="Install Brambleheart">
      <div class="settings-group-heading"><p class="eyebrow settings-group-title">INSTALL</p></div>
      <section class="settings-card">
        <div class="setting-row install-setting-row">
          <span><strong>Install Brambleheart</strong><small>{{ isInstalled ? 'Brambleheart is running as an installed app on this device.' : canInstall ? 'Install Brambleheart as an app on this phone, tablet, or computer.' : 'If the direct prompt is unavailable, use your browser menu and choose Install app or Add to Home Screen.' }}<template v-if="installMessage"> {{ installMessage }}</template></small></span>
          <button class="secondary-button settings-compact-action" type="button" :disabled="isInstalled" @click="requestInstall">{{ isInstalled ? 'Installed' : 'Install' }}</button>
        </div>
      </section>
    </section>

    <section class="settings-group" aria-label="Report bugs and issues">
      <div class="settings-group-heading"><p class="eyebrow settings-group-title">REPORT BUGS &amp; ISSUES</p></div>
      <section class="settings-card">
        <div class="setting-row static-row">
          <span><strong>Bug &amp; issue reporting</strong><small>Open the public issue tracker for reproducible application problems.</small></span>
          <button class="secondary-button settings-compact-action" type="button" @click="reportIssue">Report</button>
        </div>
      </section>
    </section>

    <section class="settings-group" aria-label="Display settings">
      <div class="settings-group-heading"><p class="eyebrow settings-group-title">DISPLAY</p></div>
      <section class="settings-card">
        <label class="setting-row">
          <span><strong>Dark mode</strong><small>The same setting controlled by the light/dark button in the top-right header.</small></span>
          <input v-model="darkMode" type="checkbox" />
        </label>
        <label class="setting-row">
          <span><strong>Compact rows</strong><small>Reduce character, rule, setting, and reference row height throughout Brambleheart.</small></span>
          <input v-model="compactRows" type="checkbox" />
        </label>
        <div class="setting-row">
          <span><strong>Text size</strong><small>Choose from two steps below or above the normal compact interface text size. The enlarged Brambleheart header is independent of this setting.</small></span>
          <div class="font-size-control" role="group" aria-label="Text size">
            <button v-for="option in fontOptions" :key="option.value" type="button" :class="{ active:fontSize === option.value }" @click="fontSize = option.value">{{ option.label }}</button>
          </div>
        </div>
        <label class="setting-row">
          <span><strong>Bold text</strong><small>Increase the weight of normal interface and reference text.</small></span>
          <input v-model="boldText" type="checkbox" />
        </label>
        <details class="theme-settings-panel species-settings-panel">
          <summary>
            <span><strong>Species</strong><small>Species themes change the Brambleheart palette while preserving the selected light or dark mode.</small></span>
            <span class="value-chip">{{ currentSpeciesLabel }}</span>
          </summary>
          <div class="theme-option-list">
            <label v-for="theme in speciesOptions" :key="String(theme.value)" class="theme-option-row setting-row">
              <span><strong>{{ theme.label }}</strong><small>Use the {{ theme.label }} interface palette.</small></span>
              <input :checked="speciesTheme === theme.value" type="checkbox" @change="toggleSpecies(theme.value, $event)" />
            </label>
          </div>
        </details>
        <details class="background-settings-panel">
          <summary>
            <span><strong>Backgrounds</strong><small>Background artwork will be added later. No image background is available in this build.</small></span>
            <span class="value-chip">Off</span>
          </summary>
          <div class="background-option-list">
            <label class="background-option-row setting-row">
              <span><strong>None</strong><small>Use the standard Brambleheart page background.</small></span>
              <input type="checkbox" checked disabled />
            </label>
          </div>
        </details>
        <div class="setting-row reset-setting-row">
          <span><strong>Reset local settings</strong><small>Restore display, species, and background preferences on this device to their defaults.</small></span>
          <button class="secondary-button settings-compact-action" type="button" @click="reset">Reset</button>
        </div>
      </section>
    </section>

    <section class="settings-group" aria-label="Support">
      <div class="settings-group-heading"><p class="eyebrow settings-group-title">SUPPORT</p></div>
      <section class="settings-card support-settings-card">
        <div class="setting-row static-row support-copy-row">
          <span><strong>Support Brambleheart</strong><small>Support continued Brambleheart development and related Andreavnn projects.</small></span>
        </div>
        <div class="support-button-row" aria-label="Brambleheart support options">
          <a class="secondary-button support-action-button" href="https://www.patreon.com/Andreavnn" target="_blank" rel="noopener noreferrer">Patreon</a>
          <a class="secondary-button support-action-button" href="https://github.com/Andreavnn/Brambleheart" target="_blank" rel="noopener noreferrer">Project Repository</a>
        </div>
      </section>
    </section>

    <section class="settings-group" aria-label="Data and content settings">
      <div class="settings-group-heading"><p class="eyebrow settings-group-title">DATA &amp; CONTENT</p></div>
      <section class="settings-card">
        <details class="reset-data-settings-panel">
          <summary>
            <span><strong>Reset local data</strong><small>Manage characters, recent rules, welcome state, and other locally stored Brambleheart data.</small></span>
            <span class="value-chip">MANAGE</span>
          </summary>
          <div class="reset-data-option-list">
            <div class="setting-row reset-data-row">
              <span><strong>Reset all local data</strong><small>Remove saved characters, recent rules, and local welcome state while preserving Display settings.</small></span>
              <button class="secondary-button settings-compact-action" type="button" @click="clearAllLocalData">Reset data</button>
            </div>
            <div class="setting-row local-clear-row">
              <span><strong>Clear characters</strong><small>Remove all locally saved Brambleheart characters.</small></span>
              <button class="secondary-button settings-compact-action" type="button" @click="clearCharacters">Clear</button>
            </div>
            <div class="setting-row local-clear-row">
              <span><strong>Clear recent rules</strong><small>Remove the locally stored Recent list from the rules reference.</small></span>
              <button class="secondary-button settings-compact-action" type="button" @click="clearRecentRules">Clear</button>
            </div>
          </div>
        </details>
        <div class="setting-row static-row">
          <span><strong>Rule content</strong><small>The current Brambleheart reference data is bundled with this alpha build.</small></span>
          <span class="value-chip">LOCAL</span>
        </div>
        <div class="setting-row static-row">
          <span><strong>Character data</strong><small>Characters are stored locally in this browser and can be imported or exported as JSON.</small></span>
          <span class="value-chip">LOCAL</span>
        </div>
      </section>
    </section>
  </main>
</template>
