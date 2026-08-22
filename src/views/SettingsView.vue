<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { canInstall, installMessage, isInstalled, requestInstall } from '../state/install'
import { useSettings, type BackgroundChoice, type FontSize, type RoleTheme } from '../state/settings'

const router=useRouter()
const { darkMode, compactRows, fontSize, boldText, roleTheme, backgroundImage, reset } = useSettings()
const customDataInput=ref<HTMLInputElement|null>(null)
const customDataLabel=ref(localStorage.getItem('brambleheart-custom-data-name-v0.08')||localStorage.getItem('brambleheart-custom-data-name-v0.07')||localStorage.getItem('brambleheart-custom-data-name-v0.06')||'None loaded')

const fontOptions:Array<{value:FontSize;label:string}>=[
  {value:'smaller',label:'Smaller'},{value:'small',label:'Small'},{value:'normal',label:'Normal'},{value:'large',label:'Large'},{value:'larger',label:'Larger'},
]
const roleOptions:Array<{value:RoleTheme;label:string;description:string}>=[
  {value:'default',label:'Default',description:'Use the standard Brambleheart colors and reader treatment.'},
  {value:'adventurer',label:'Adventurer',description:'Forest greens and worn-paper neutrals for the classic journey-first reader.'},
  {value:'storyteller',label:'Storyteller',description:'Deep berry and warm parchment tones for character- and narrative-focused tables.'},
  {value:'tactician',label:'Tactician',description:'Cool slate and steel-blue tones for encounter-focused play.'},
  {value:'mystic',label:'Mystic',description:'Deep indigo and violet tones inspired by the Winds of Magic.'},
]
const backgroundOptions:Array<{value:BackgroundChoice;label:string;description:string}>=[
  {value:'default',label:'Default',description:'Use the standard Brambleheart reader background.'},
  {value:'crossway-hearth',label:'The Crossway Hearth',description:'A quiet hearthstead in the woods.'},
  {value:'thornwick-market',label:'Thornwick Market',description:'A crowded Beastfolk market street.'},
  {value:'leviathans-wreck',label:'Leviathan’s Wreck',description:'A shattered vessel and a colossal sea beast.'},
  {value:'deepwood-ruins',label:'Deepwood Ruins',description:'Ancient stone hidden in the deep woods.'},
  {value:'mushroom-isles',label:'Mushroom Isles',description:'A strange waterside landscape of giant mushrooms.'},
]
const currentRoleLabel=computed(()=>roleOptions.find(item=>item.value===roleTheme.value)?.label||'Default')
const currentBackgroundLabel=computed(()=>backgroundOptions.find(item=>item.value===backgroundImage.value)?.label||'Default')

function clearKey(key:string,message:string){if(!confirm(message))return;localStorage.removeItem(key)}
function clearCharacters(){clearKey('brambleheart-characters-v0.01','Clear all saved Brambleheart characters from this device? This cannot be undone.')}
function clearCombat(){clearKey('brambleheart-simulator-encounters-v0.05','Clear all ongoing and completed combat encounters?')}
function clearDiceRolls(){clearKey('brambleheart-simulator-rhythm-v0.05','Clear the stored Rhythm Engine roll history?')}
function clearSimulatorAll(){if(!confirm('Clear all Rhythm Engine data, including combat encounters and dice rolls?'))return;localStorage.removeItem('brambleheart-simulator-encounters-v0.05');localStorage.removeItem('brambleheart-simulator-rhythm-v0.05')}
function clearAllLocalData(){
  if(!confirm('Reset Brambleheart local data? This removes characters, recent rules, Rhythm Engine history, custom data, and welcome state. Display settings are preserved.'))return
  const keys=['brambleheart-characters-v0.01','brambleheart-rules-recent-v0.03','brambleheart-rules-recent-v0.04','brambleheart-rules-recent-v0.05','brambleheart-rules-recent-v0.06','brambleheart-rules-recent-v0.07','brambleheart-rules-recent-v0.08','brambleheart-simulator-encounters-v0.05','brambleheart-simulator-rhythm-v0.05','brambleheart-custom-data-v0.05','brambleheart-custom-data-name-v0.05','brambleheart-custom-data-v0.06','brambleheart-custom-data-name-v0.06','brambleheart-custom-data-v0.07','brambleheart-custom-data-name-v0.07','brambleheart-custom-data-v0.08','brambleheart-custom-data-name-v0.08','brambleheart.welcome.v0.04','brambleheart.welcome.v0.05','brambleheart.welcome.v0.06','brambleheart.welcome.v0.07','brambleheart.welcome.v0.08','brambleheart.install-welcome-dismissed.v0.04','brambleheart.install-welcome-dismissed.v0.05','brambleheart.install-welcome-dismissed.v0.06','brambleheart.install-welcome-dismissed.v0.07','brambleheart.install-welcome-dismissed.v0.08']
  keys.forEach(key=>localStorage.removeItem(key));customDataLabel.value='None loaded'
}
function reportIssue(){window.open('https://github.com/Andreavnn/Brambleheart/issues','_blank','noopener,noreferrer')}
function openDiscord(){window.open('https://discord.gg/NHf3YdueHE','_blank','noopener,noreferrer')}
async function importCustomData(event:Event){
  const input=event.target as HTMLInputElement;const file=input.files?.[0];if(!file)return
  try{const raw=await file.text();JSON.parse(raw);localStorage.setItem('brambleheart-custom-data-v0.08',raw);localStorage.setItem('brambleheart-custom-data-name-v0.08',file.name);customDataLabel.value=file.name}
  catch{alert('Custom Data must be a valid JSON file.')}
  input.value=''
}
function clearCustomData(){if(!confirm('Remove the locally loaded Custom Data file?'))return;['brambleheart-custom-data-v0.05','brambleheart-custom-data-name-v0.05','brambleheart-custom-data-v0.06','brambleheart-custom-data-name-v0.06','brambleheart-custom-data-v0.07','brambleheart-custom-data-name-v0.07','brambleheart-custom-data-v0.08','brambleheart-custom-data-name-v0.08'].forEach(key=>localStorage.removeItem(key));customDataLabel.value='None loaded'}
</script>

<template>
  <main class="page settings-page">
    <AppHeader />
    <div class="page-title-block"><p class="eyebrow">SETTINGS</p><h1>Settings</h1><p>Access, community, display, donation, custom data, and local-storage controls.</p></div>

    <section class="settings-group" aria-label="Access and community"><div class="settings-group-heading"><p class="eyebrow settings-group-title">ACCESS &amp; COMMUNITY</p></div><section class="settings-card">
      <div class="setting-row install-setting-row"><span><strong>Install Brambleheart</strong><small>{{ isInstalled?'Brambleheart is installed on this device.':canInstall?'Install the companion as an app on this phone, tablet, or computer.':'If the direct prompt is unavailable, use the browser menu and choose Install app or Add to Home Screen.' }}<template v-if="installMessage"> {{ installMessage }}</template></small></span><button class="secondary-button settings-compact-action" type="button" :disabled="isInstalled" @click="requestInstall">{{ isInstalled?'Installed':'Install' }}</button></div>
      <div class="setting-row"><span><strong>Join Discord</strong><small>Join the Brambleheart community server for discussion, play, and development updates.</small></span><button class="secondary-button settings-compact-action" type="button" @click="openDiscord">Join</button></div>
    </section></section>

    <section class="settings-group" aria-label="Report bugs and issues"><div class="settings-group-heading"><p class="eyebrow settings-group-title">REPORT BUGS &amp; ISSUES</p></div><section class="settings-card"><div class="setting-row static-row"><span><strong>Bug &amp; Issue Reporting</strong><small>Open the public issue tracker for reproducible application problems.</small></span><button class="secondary-button settings-compact-action" type="button" @click="reportIssue">Report</button></div></section></section>

    <section class="settings-group" aria-label="Display settings"><div class="settings-group-heading"><p class="eyebrow settings-group-title">DISPLAY</p></div><section class="settings-card">
      <label class="setting-row"><span><strong>Dark Mode</strong><small>Switch between the light reader and the darker night reader.</small></span><input v-model="darkMode" type="checkbox" /></label>
      <label class="setting-row"><span><strong>Compact Rows</strong><small>Reduce list and settings row height throughout the companion.</small></span><input v-model="compactRows" type="checkbox" /></label>
      <div class="setting-row"><span><strong>Text Size</strong><small>Adjust standard interface and rules-reader text.</small></span><div class="font-size-control" role="group" aria-label="Text size"><button v-for="option in fontOptions" :key="option.value" type="button" :class="{active:fontSize===option.value}" @click="fontSize=option.value">{{ option.label }}</button></div></div>
      <label class="setting-row"><span><strong>Bold Text</strong><small>Increase the weight of standard interface and reference text.</small></span><input v-model="boldText" type="checkbox" /></label>
      <details class="theme-settings-panel"><summary><span><strong>Themes</strong><small>Choose a stable role-player theme. Themes no longer depend on the Species list.</small></span><span class="value-chip">{{ currentRoleLabel }}</span></summary><div class="theme-option-list"><label v-for="theme in roleOptions" :key="theme.value" class="theme-option-row setting-row"><span><strong>{{ theme.label }}</strong><small>{{ theme.description }}</small></span><input v-model="roleTheme" type="radio" name="role-theme" :value="theme.value" /></label></div></details>
      <details class="background-settings-panel"><summary><span><strong>Backgrounds</strong><small>Choose fixed artwork that remains behind the reader while pages scroll.</small></span><span class="value-chip">{{ currentBackgroundLabel }}</span></summary><div class="background-option-list"><label v-for="background in backgroundOptions" :key="background.value" class="background-option-row setting-row" :class="`background-preview-${background.value}`"><span><strong>{{ background.label }}</strong><small>{{ background.description }}</small></span><input v-model="backgroundImage" type="radio" name="background" :value="background.value" /></label></div></details>
      <div class="setting-row reset-setting-row"><span><strong>Reset Local Settings</strong><small>Restore display, theme, and background preferences to their defaults.</small></span><button class="secondary-button settings-compact-action" type="button" @click="reset">Reset</button></div>
    </section></section>

    <section class="settings-group compact-donation-group" aria-label="Donation"><div class="settings-group-heading"><p class="eyebrow settings-group-title">DONATION</p></div><section class="settings-card support-settings-card"><div class="support-button-row compact-support-buttons"><a class="secondary-button support-action-button" href="https://donate.stripe.com/eVq28r5fM5PI1bKdzz3Nm04" target="_blank" rel="noopener noreferrer">Donation</a><a class="secondary-button support-action-button" href="https://donate.stripe.com/cNifZh4bIce6bQo5333Nm05" target="_blank" rel="noopener noreferrer">Recurring Support</a></div></section></section>

    <section class="settings-group" aria-label="Data and content settings"><div class="settings-group-heading"><p class="eyebrow settings-group-title">DATA &amp; CONTENT</p></div><section class="settings-card">
      <details class="reset-data-settings-panel"><summary><span><strong>Reset Local Data</strong><small>Manage characters, recent rules, Rhythm Engine history, custom data, and local welcome state.</small></span><span class="value-chip">MANAGE</span></summary><div class="reset-data-option-list">
        <div class="setting-row reset-data-row"><span><strong>Reset All Local Data</strong><small>Remove all locally stored app data while preserving Display settings.</small></span><button class="secondary-button settings-compact-action" type="button" @click="clearAllLocalData">Reset Data</button></div>
        <div class="setting-row local-clear-row"><span><strong>Clear Characters</strong><small>Remove all locally saved characters.</small></span><button class="secondary-button settings-compact-action" type="button" @click="clearCharacters">Clear</button></div>
        <div class="setting-row local-clear-row"><span><strong>Clear Combat</strong><small>Remove ongoing and completed encounter records.</small></span><button class="secondary-button settings-compact-action" type="button" @click="clearCombat">Clear</button></div>
        <div class="setting-row local-clear-row"><span><strong>Clear Dice Rolls</strong><small>Remove the Attribute Check roll history.</small></span><button class="secondary-button settings-compact-action" type="button" @click="clearDiceRolls">Clear</button></div>
        <div class="setting-row local-clear-row"><span><strong>Clear Rhythm Engine All</strong><small>Remove Combat Encounter and Attribute Check local history together.</small></span><button class="secondary-button settings-compact-action" type="button" @click="clearSimulatorAll">Clear</button></div>
      </div></details>
      <div class="setting-row static-row"><span><strong>Site Changelog</strong><small>Review changes to the Brambleheart companion site. Rules amendments are listed under Changes &amp; Updates.</small></span><button class="secondary-button settings-compact-action" type="button" @click="router.push('/changelog')">Open</button></div>
      <div class="setting-row static-row"><span><strong>Character Data</strong><small>Characters are stored locally and can be imported or exported as JSON.</small></span><span class="value-chip">LOCAL</span></div>
      <details class="custom-data-panel"><summary><span><strong>Custom Data</strong><small>Load an optional JSON data file into this browser for future custom-content support.</small></span><span class="value-chip">{{ customDataLabel }}</span></summary><div class="custom-data-actions setting-row"><span><strong>Local JSON data</strong><small>This build stores the validated file locally without replacing bundled system rules.</small></span><div class="button-row"><button class="secondary-button settings-compact-action" type="button" @click="customDataInput?.click()">Import</button><button class="secondary-button settings-compact-action" type="button" @click="clearCustomData">Clear</button><input ref="customDataInput" hidden type="file" accept="application/json,.json" @change="importCustomData" /></div></div></details>
    </section></section>
  </main>
</template>
