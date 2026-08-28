<script setup lang="ts">
import { useRouter } from 'vue-router'
import SettingsView from './SettingsView.vue'
import { useSettings } from '../state/settings'
import { MEASUREMENT_OPTIONS } from '../rules/measurements'
import { GAME_RULES_VERSION } from '../data/gameUpdates'

const router=useRouter()
const {measurement}=useSettings()
</script>

<template>
  <SettingsView />
  <Teleport defer to=".settings-page .page-title-block">
    <p class="beta032-settings-detail">Site control: Community, display, data, storage, and optional controls.</p>
  </Teleport>
  <Teleport defer to=".settings-page .settings-group[aria-label='Display settings'] .settings-card">
    <details class="measurement-settings-panel">
      <summary><span><strong>Measurements</strong><small>Display square-based rules as Squares, Yards, Meters, or Feet. One square equals 1 yard, 1 meter, or 3 feet.</small></span><span class="value-chip">{{ MEASUREMENT_OPTIONS.find(option=>option.value===measurement)?.label||'Squares' }}</span></summary>
      <div class="measurement-option-list">
        <label v-for="option in MEASUREMENT_OPTIONS" :key="option.value" class="setting-row measurement-option-row"><span><strong>{{ option.label }}</strong><small v-if="option.value==='squares'">Default rule measurement.</small><small v-else-if="option.value==='feet'">1 square = 3 feet; converted values round up.</small><small v-else>1 square = 1 {{ option.value==='yards'?'yard':'meter' }}; converted values round up.</small></span><input v-model="measurement" type="radio" class="choice-switch-input" name="measurement-unit" :value="option.value" /></label>
      </div>
    </details>
  </Teleport>
  <Teleport defer to=".settings-page .settings-group[aria-label='Changelog and updates'] .settings-card">
    <div class="setting-row static-row game-updates-setting-row"><span><strong>Rule Updates v{{ GAME_RULES_VERSION }}</strong><small>Review Brambleheart rules changes. Site and interface changes remain in the Site Changelog.</small></span><button class="secondary-button settings-compact-action" type="button" @click="router.push('/game-updates')">Open</button></div>
  </Teleport>
</template>

<style scoped>
.measurement-settings-panel{border-top:1px solid var(--line)}
.measurement-settings-panel>summary{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px;cursor:pointer;list-style:none}
.measurement-settings-panel>summary::-webkit-details-marker{display:none}.measurement-settings-panel>summary>span:first-child{display:grid;gap:2px}.measurement-settings-panel>summary small{color:var(--ink-soft)}.measurement-option-list{border-top:1px solid var(--line)}
.game-updates-setting-row{border-top:1px solid var(--line)}
:deep(.settings-group[aria-label='Display settings']>.settings-card){display:flex;flex-direction:column}
:deep(.settings-group[aria-label='Display settings']>.settings-card>:nth-child(1)){order:10}
:deep(.settings-group[aria-label='Display settings']>.settings-card>:nth-child(2)){order:20}
:deep(.settings-group[aria-label='Display settings']>.settings-card>:nth-child(3)){order:30}
:deep(.settings-group[aria-label='Display settings']>.settings-card>:nth-child(4)){order:40}
.measurement-settings-panel{order:50}
:deep(.settings-group[aria-label='Display settings']>.settings-card>:nth-child(5)){order:60}
:deep(.settings-group[aria-label='Display settings'] .theme-settings-panel){order:70}
:deep(.settings-group[aria-label='Display settings'] .background-settings-panel){order:80}
:deep(.settings-group[aria-label='Display settings'] .reset-setting-row){order:90}
:deep(.theme-option-row>input[type='radio'].choice-switch-input),:deep(.background-option-row>input[type='radio'].choice-switch-input),:deep(.measurement-option-row>input[type='radio'].choice-switch-input){-webkit-appearance:none;appearance:none;width:42px;height:24px;min-width:42px;min-height:24px;margin:0;border:0;border-radius:999px;background:radial-gradient(circle at 12px 12px,#fff 0 8.5px,transparent 9px),#cbc5ba;position:relative;display:block;flex:0 0 42px;align-self:center;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.18);cursor:pointer;transition:background .18s}
:deep(.theme-option-row>input[type='radio'].choice-switch-input:checked),:deep(.background-option-row>input[type='radio'].choice-switch-input:checked),:deep(.measurement-option-row>input[type='radio'].choice-switch-input:checked){background:radial-gradient(circle at 30px 12px,#fff 0 8.5px,transparent 9px),var(--accent-dark)}
:deep(.theme-option-row>input[type='radio'].choice-switch-input::after),:deep(.background-option-row>input[type='radio'].choice-switch-input::after),:deep(.measurement-option-row>input[type='radio'].choice-switch-input::after){content:none!important;display:none!important}
</style>
