<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { canInstall, installMessage, isInstalled, requestInstall } from '../state/install'
import { useSettings, type FontSize, type RoleTheme } from '../state/settings'
import { backgroundOptions, backgroundLabel } from '../data/backgroundCatalog'
import { BUILD } from '../data/bramble'
import { externalLinks } from '../data/links'
import { characterStatus, loadCharacters, writeCharacters, type CharacterRecord } from '../services/characters'
import { clearCustomData as clearCustomDataStore, customDataCounts, loadCustomData, mergeCustomData, parseCustomDataText, saveCustomData, type CustomDataItem } from '../services/customData'
import { localStorageKeys, removeLocalStorage, RHYTHM_STORE, SETTINGS_STORE } from '../services/storage'

const router=useRouter()
const { darkMode, compactRows, fontSize, boldText, roleTheme, backgroundImage, backgroundGrayscale, bootAudio, reset } = useSettings()
const customDataInput=ref<HTMLInputElement|null>(null)
const customData=ref<CustomDataItem[]>(loadCustomData())
const customImportMessage=ref('')
const customCounts=computed(()=>customDataCounts(customData.value))
const customDataLabel=computed(()=>customData.value.length?`${customData.value.length} item${customData.value.length===1?'':'s'}`:'None loaded')

const fontOptions:Array<{value:FontSize;label:string}>=[
  {value:'smallest',label:'Smallest'},{value:'small',label:'Small'},{value:'normal',label:'Normal'},{value:'large',label:'Large'},{value:'largest',label:'Largest'},
]
const roleOptions:Array<{value:RoleTheme;label:string;description:string}>=[
  {value:'default',label:'Default',description:'The standard Brambleheart parchment, moss, and woodland palette.'},
  {value:'warrior',label:'Warrior',description:'Iron, ember, and deep red tones for direct martial play.'},
  {value:'ranger',label:'Ranger',description:'Forest green and weathered earth tones for scouts and wanderers.'},
  {value:'spellcaster',label:'Spellcaster',description:'Violet, indigo, and arcane-blue tones for the Winds of Magic.'},
  {value:'healer',label:'Healer',description:'Amber and plum contrast for restorative, hopeful play.'},
  {value:'thief',label:'Thief',description:'Shadowed slate and brass tones for subtle play.'},
  {value:'trickster',label:'Trickster',description:'Teal, sage, and shadowed woodland tones for mischief and improvisation.'},
]
const currentRoleLabel=computed(()=>roleOptions.find(item=>item.value===roleTheme.value)?.label||'Default')
const currentBackgroundLabel=computed(()=>backgroundLabel(backgroundImage.value))

function confirmTwice(first:string,second:string){return confirm(first)&&confirm(second)}
type CharacterClearMode='all'|'incomplete'|'unapproved'|'approved'
function characterMatchesClearMode(character:CharacterRecord,mode:CharacterClearMode){
  if(mode==='all')return true
  if(mode==='incomplete')return characterStatus(character)==='incomplete'
  if(mode==='approved')return characterStatus(character)==='approved'
  return characterStatus(character)==='unapproved'
}
function clearCharacters(mode:CharacterClearMode){
  const labels={all:'all saved characters',incomplete:'all incomplete characters',unapproved:'all unapproved characters',approved:'all approved characters'} as const
  if(!confirmTwice(`Clear ${labels[mode]} from this device?`,`Confirm again: permanently delete ${labels[mode]}? This cannot be undone.`))return
  const current=loadCharacters();const next=current.filter(character=>!characterMatchesClearMode(character,mode))
  const saved=writeCharacters(next);if(!saved.ok)alert(saved.message)
}
function clearDiceRolls(){
  if(!confirm('Clear the stored Dice Roller history?'))return
  const removed=removeLocalStorage(RHYTHM_STORE);if(!removed.ok)alert(removed.message)
}
function clearAllLocalData(){
  if(!confirm('Reset Brambleheart local data? This removes characters, recent rules, Dice Roller history, custom data, and welcome state. Display settings are preserved.'))return
  const keys=localStorageKeys().filter(key=>key.startsWith('brambleheart')&&key!==SETTINGS_STORE)
  for(const key of keys){const removed=removeLocalStorage(key);if(!removed.ok){alert(removed.message);return}}
  customData.value=[];void router.replace('/welcome')
}
function reportIssue(){window.open(externalLinks.issues,'_blank','noopener,noreferrer')}
function openDiscord(){window.open(externalLinks.discord,'_blank','noopener,noreferrer')}
async function importCustomData(event:Event){
  const input=event.target as HTMLInputElement
  const files=Array.from(input.files||[])
  if(!files.length)return
  try{
    let incoming:CustomDataItem[]=[]
    let skipped=0
    let total=0
    for(const file of files){
      const parsed=parseCustomDataText(await file.text())
      incoming=[...incoming,...parsed.items]
      skipped+=parsed.skipped
      total+=parsed.total
    }
    const merged=mergeCustomData(customData.value,incoming)
    const saved=saveCustomData(merged)
    if(!saved.ok){customImportMessage.value=saved.message;return}
    customData.value=merged
    customImportMessage.value=skipped?`Imported ${incoming.length} of ${total} entries. Skipped ${skipped} malformed or unrecognized ${skipped===1?'entry':'entries'}.`:`Imported ${incoming.length} ${incoming.length===1?'entry':'entries'} successfully.`
  }catch(error){customImportMessage.value=error instanceof Error?error.message:'Custom Data must use a recognized Brambleheart JSON template.'}
  finally{input.value=''}
}
function clearCustomData(){if(!confirm('Remove all locally loaded Custom Data?'))return;const cleared=clearCustomDataStore();if(!cleared.ok){alert(cleared.message);return}customData.value=[]}
</script>

<template>
  <main class="page settings-page">
    <AppHeader />
    <div class="page-title-block"><h1>Settings</h1><p>Access, community, display, donation, custom data, and local-storage controls.</p></div>

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
      <label class="setting-row"><span><strong>Launch Audio</strong><small>Play the Brambleheart fanfare when the installed app opens.</small></span><input v-model="bootAudio" type="checkbox" /></label>
      <details class="theme-settings-panel"><summary><span><strong>Themes</strong><small>Choose a character-archetype theme. Dark Mode has a matching palette for every theme.</small></span><span class="value-chip">{{ currentRoleLabel }}</span></summary><div class="theme-option-list"><label v-for="theme in roleOptions" :key="theme.value" class="theme-option-row setting-row"><span><strong>{{ theme.label }}</strong><small>{{ theme.description }}</small></span><input v-model="roleTheme" type="radio" name="role-theme" :value="theme.value" /></label></div></details>
      <details class="background-settings-panel"><summary><span><strong>Backgrounds</strong><small>Images placed in <code>src/assets/backgrounds</code> are discovered automatically on the next site build.</small></span><span class="background-summary-controls"><span class="value-chip">{{ currentBackgroundLabel }}</span><label v-if="backgroundImage!=='none'" class="background-grayscale-switch" @click.stop><span>Grayscale</span><span class="switch"><input v-model="backgroundGrayscale" type="checkbox" @click.stop /><span></span></span></label></span></summary><div class="background-option-list"><label v-for="background in backgroundOptions" :key="background.value" class="background-option-row setting-row"><span class="background-option-copy"><span class="background-thumb" :class="{empty:!background.url}" :style="background.url?{backgroundImage:`url(${background.url})`}:undefined"></span><strong>{{ background.label }}</strong></span><input v-model="backgroundImage" type="radio" name="background" :value="background.value" /></label></div></details>
      <div class="setting-row reset-setting-row"><span><strong>Reset Local Settings</strong><small>Restore display, theme, and background preferences to their defaults.</small></span><button class="secondary-button settings-compact-action" type="button" @click="reset">Reset</button></div>
    </section></section>

    <section class="settings-group compact-donation-group" aria-label="Donation"><div class="settings-group-heading"><p class="eyebrow settings-group-title">DONATION</p></div><section class="settings-card support-settings-card"><p class="donation-panel-detail">Support Brambleheart development with a one-time donation or recurring contribution.</p><div class="support-button-row compact-support-buttons"><a class="secondary-button support-action-button" :href="externalLinks.donation" target="_blank" rel="noopener noreferrer">Donation</a><a class="secondary-button support-action-button" :href="externalLinks.recurringSupport" target="_blank" rel="noopener noreferrer">Recurring Support</a></div></section></section>

    <section class="settings-group" aria-label="Data and content settings"><div class="settings-group-heading"><p class="eyebrow settings-group-title">DATA &amp; CONTENT</p></div><section class="settings-card">
      <details class="reset-data-settings-panel"><summary><span><strong>Reset Local Data</strong><small>Manage characters, recent rules, Dice Roller history, custom data, and local welcome state.</small></span><span class="value-chip">MANAGE</span></summary><div class="reset-data-option-list">
        <div class="setting-row reset-data-row"><span><strong>Reset All Local Data</strong><small>Remove all locally stored app data while preserving Display settings.</small></span><button class="secondary-button settings-compact-action" type="button" @click="clearAllLocalData">Reset Data</button></div>
        <details class="character-clear-panel"><summary><span><strong>Clear Characters</strong><small>Delete characters by completion and approval status. Every action requires two confirmations.</small></span><span class="value-chip">MANAGE</span></summary><div class="character-clear-actions"><button class="secondary-button settings-compact-action" type="button" @click="clearCharacters('all')">Clear All</button><button class="secondary-button settings-compact-action" type="button" @click="clearCharacters('incomplete')">Clear Incomplete</button><button class="secondary-button settings-compact-action" type="button" @click="clearCharacters('unapproved')">Clear Unapproved</button><button class="secondary-button settings-compact-action" type="button" @click="clearCharacters('approved')">Clear Approved</button></div></details>
        <div class="setting-row local-clear-row"><span><strong>Clear Dice Rolls</strong><small>Remove the Dice Roller roll history.</small></span><button class="secondary-button settings-compact-action" type="button" @click="clearDiceRolls">Clear</button></div>
      </div></details>
      <div class="setting-row static-row"><span><strong>Site Changelog - Beta {{ BUILD }}</strong><small>Review changes to the Brambleheart companion site. Rules amendments are listed under Changes &amp; Updates.</small></span><button class="secondary-button settings-compact-action" type="button" @click="router.push('/changelog')">Open</button></div>
      <div class="setting-row static-row"><span><strong>Character Data</strong><small>Characters are stored locally and can be imported or exported as JSON.</small></span><span class="value-chip">LOCAL</span></div>
      <details class="custom-data-panel"><summary><span><strong>Custom Data</strong><small>Import custom Species, Spells, Talents, and Traits built from the supplied JSON templates.</small></span><span class="value-chip">{{ customDataLabel }}</span></summary><div class="custom-data-actions custom-data-stack">
        <div class="setting-row"><span><strong>Custom Data Templates</strong><small>Download one ZIP containing typed JSON templates for Species, Spell, Talent, and Trait entries.</small></span><a class="secondary-button settings-compact-action" href="/downloads/Brambleheart-Custom-Data-Templates.zip" download>Download Templates</a></div>
        <div class="setting-row"><span><strong>Imported Custom Content</strong><small>Species {{ customCounts.species }} · Spells {{ customCounts.spell }} · Talents {{ customCounts.talent }} · Traits {{ customCounts.trait }}</small></span><div class="button-row"><button class="secondary-button settings-compact-action" type="button" @click="customDataInput?.click()">Import JSON</button><button class="secondary-button settings-compact-action" type="button" :disabled="!customData.length" @click="clearCustomData">Clear</button><input ref="customDataInput" hidden multiple type="file" accept="application/json,.json" @change="importCustomData" /></div></div>
      </div><p v-if="customImportMessage" class="creation-status-message custom-data-import-status">{{ customImportMessage }}</p></details>
    </section></section>
  </main>
</template>
