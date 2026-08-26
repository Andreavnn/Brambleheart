<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { canInstall, installMessage, isInstalled, requestInstall } from '../state/install'
import { useSettings, type FontSize, type RoleTheme } from '../state/settings'
import { backgroundOptions, backgroundLabel } from '../data/backgroundCatalog'
import { BUILD } from '../data/bramble'
import { externalLinks } from '../data/links'
import { downloadJson, loadCharacters, writeCharacters } from '../services/characters'
import { beginDropboxCloudConnection, completeDropboxCloudConnection, disconnectCharacterCloud, ensureCharacterCloudState, getCharacterCloudConfig, regenerateCharacterCloudCode, updateCharactersFromCloud, uploadCharactersToCloud } from '../services/characterCloud'
import { clearCustomData as clearCustomDataStore, customDataCounts, loadCustomData, mergeCustomData, parseCustomDataText, saveCustomData, type CustomDataItem } from '../services/customData'
import { localStorageKeys, removeLocalStorage, SETTINGS_STORE } from '../services/storage'

const router=useRouter()
const { darkMode, compactRows, fontSize, boldText, roleTheme, backgroundImage, backgroundGrayscale, bootAudio, reset } = useSettings()
const customDataInput=ref<HTMLInputElement|null>(null)
const customData=ref<CustomDataItem[]>(loadCustomData())
const customImportMessage=ref('')
const customCounts=computed(()=>customDataCounts(customData.value))
const customDataLabel=computed(()=>customData.value.length?`${customData.value.length} item${customData.value.length===1?'':'s'}`:'None loaded')
const characterCloudState=ref(ensureCharacterCloudState())
const characterCloudConfig=getCharacterCloudConfig()
const characterCloudMessage=ref('')
const characterCloudBusy=ref(false)
const characterCloudConnection=computed(()=>characterCloudState.value.connection)
const characterCloudConnected=computed(()=>Boolean(characterCloudConnection.value))

const fontOptions:Array<{value:FontSize;label:string}>=[
  {value:'smallest',label:'Smallest'},{value:'small',label:'Small'},{value:'normal',label:'Normal'},{value:'large',label:'Large'},{value:'largest',label:'Largest'},
]
const roleOptions:Array<{value:RoleTheme;label:string;description:string}>=[
  {value:'default',label:'Default',description:'The neutral parchment palette used by Old.dex.'},
  {value:'warrior',label:'The Warrior',description:'Crimson, brass, and dark-iron tones from Old.dex Powers of Chaos.'},
  {value:'healer',label:'The Healer',description:'Cool blue and heraldic parchment tones from Old.dex Forces of Fantasy.'},
  {value:'ranger',label:'The Ranger',description:'Muted green, ochre, and field-parchment tones from Old.dex Ravening Hordes.'},
  {value:'thief',label:'The Thief',description:'Cold bone, grave-green, and ancient-metal tones from Old.dex Legions of Undead.'},
]
const currentRoleLabel=computed(()=>roleOptions.find(item=>item.value===roleTheme.value)?.label||'Default')
const currentBackgroundLabel=computed(()=>backgroundLabel(backgroundImage.value))

function confirmTwice(first:string,second:string){return confirm(first)&&confirm(second)}
function downloadCharacterBackup(){
  const characters=loadCharacters()
  downloadJson(`brambleheart-character-backup-${new Date().toISOString().slice(0,10)}.json`,{
    format:'brambleheart-character-backup',version:BUILD,exportedAt:new Date().toISOString(),characters,
  })
}
function resetCustomData(){
  if(!confirmTwice('Reset all imported Custom Data on this device?','Confirm again: permanently remove all imported Custom Data? This cannot be undone.'))return
  const cleared=clearCustomDataStore();if(!cleared.ok){alert(cleared.message);return}customData.value=[]
}
function resetCharacters(){
  if(!confirmTwice('Reset all saved characters on this device?','Confirm again: permanently delete approved, unapproved, and incomplete characters? This cannot be undone.'))return
  const saved=writeCharacters([]);if(!saved.ok)alert(saved.message)
}
function resetAllLocalData(){
  if(!confirmTwice('Reset all Brambleheart local data? Display settings are preserved.','Confirm again: remove characters, recent rules, Dice Roller history, custom data, and local welcome state? This cannot be undone.'))return
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
function newCharacterCloudCode(){
  if(characterCloudConnected.value)return
  try{
    characterCloudState.value=regenerateCharacterCloudCode(characterCloudState.value)
    characterCloudMessage.value='A new Cloud Link Code was generated. Brambleheart will verify this code automatically when Dropbox returns to this browser.'
  }catch(error){characterCloudMessage.value=error instanceof Error?error.message:'A new Cloud Link Code could not be saved on this device.'}
}
async function copyCloudValue(value:string,label:string){
  if(!value)return
  try{await navigator.clipboard.writeText(value);characterCloudMessage.value=`${label} copied.`}catch{characterCloudMessage.value=`Copy this ${label.toLowerCase()} manually: ${value}`}
}
async function connectCharacterCloud(){
  if(characterCloudBusy.value||characterCloudConnected.value)return
  characterCloudBusy.value=true;characterCloudMessage.value='Opening Dropbox…'
  try{await beginDropboxCloudConnection(characterCloudState.value)}
  catch(error){characterCloudBusy.value=false;characterCloudMessage.value=error instanceof Error?error.message:'Dropbox could not start the Cloud Sync connection.'}
}
async function updateCharacterCloud(){
  const connection=characterCloudConnection.value
  if(!connection||characterCloudBusy.value)return
  characterCloudBusy.value=true;characterCloudMessage.value=''
  try{
    const result=await updateCharactersFromCloud(connection)
    const skipped=result.skipped.length?` ${result.skipped.length} invalid _BH.json ${result.skipped.length===1?'file was':'files were'} skipped.`:''
    characterCloudMessage.value=`Cloud update complete: ${result.replaced} replaced, ${result.added} added.${skipped}`
  }catch(error){characterCloudMessage.value=error instanceof Error?error.message:'Cloud update failed.'}
  finally{characterCloudBusy.value=false}
}
async function uploadCharacterCloud(){
  const connection=characterCloudConnection.value
  if(!connection||characterCloudBusy.value)return
  if(!confirm('Upload all local characters to the Brambleheart Dropbox App Folder? Existing cloud files with the same internal character ID will be replaced.'))return
  characterCloudBusy.value=true;characterCloudMessage.value=''
  try{
    const result=await uploadCharactersToCloud(connection)
    const skipped=result.skipped.length?` ${result.skipped.length} invalid existing _BH.json ${result.skipped.length===1?'file was':'files were'} ignored.`:''
    characterCloudMessage.value=`Cloud upload complete: ${result.updated} updated, ${result.created} created${result.renamed?`, ${result.renamed} renamed`:''}.${skipped}`
  }catch(error){characterCloudMessage.value=error instanceof Error?error.message:'Cloud upload failed.'}
  finally{characterCloudBusy.value=false}
}
async function disconnectCloud(){
  if(!characterCloudConnection.value||characterCloudBusy.value)return
  if(!confirm('Disconnect Dropbox Cloud Sync from this device? Cloud files will not be deleted.'))return
  characterCloudBusy.value=true;characterCloudMessage.value=''
  try{
    const result=await disconnectCharacterCloud(characterCloudState.value)
    characterCloudState.value=result.state
    characterCloudMessage.value=result.revoked?'Dropbox Cloud Sync was disconnected and its authorization was revoked.':'Dropbox Cloud Sync was disconnected from this device. If Dropbox authorization was already unavailable, remove Brambleheart from Dropbox Connected Apps if you also want to revoke it there.'
  }catch(error){characterCloudMessage.value=error instanceof Error?error.message:'The cloud connection could not be removed from local storage.'}
  finally{characterCloudBusy.value=false}
}
onMounted(async()=>{
  const url=new URL(window.location.href)
  const hasDropboxReturn=Boolean(characterCloudState.value.oauth&&(url.searchParams.get('code')||url.searchParams.get('state')||url.searchParams.get('error')))
  if(!hasDropboxReturn)return
  characterCloudBusy.value=true
  try{
    const next=await completeDropboxCloudConnection(window.location.href)
    if(next){characterCloudState.value=next;characterCloudMessage.value='Dropbox Cloud Sync connected. Characters remain stored locally and Dropbox is contacted only when you choose Update from Cloud or Upload Local.'}
  }catch(error){characterCloudMessage.value=error instanceof Error?error.message:'Dropbox Cloud Sync could not complete the connection.'}
  finally{
    characterCloudBusy.value=false
    window.history.replaceState({},document.title,window.location.pathname)
  }
})
</script>

<template>
  <main class="page settings-page">
    <AppHeader />
    <div class="page-title-block"><h1>Settings</h1><p>Access, community, display, donation, custom data, local storage, and optional linked character-data controls.</p></div>

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
      <details class="theme-settings-panel"><summary><span><strong>Themes</strong><small>Choose a Brambleheart theme adapted from Old.dex. Dark Mode has a matching palette for every theme.</small></span><span class="value-chip">{{ currentRoleLabel }}</span></summary><div class="theme-option-list"><label v-for="theme in roleOptions" :key="theme.value" class="theme-option-row setting-row"><span><strong>{{ theme.label }}</strong><small>{{ theme.description }}</small></span><input v-model="roleTheme" type="radio" name="role-theme" :value="theme.value" /></label></div></details>
      <details class="background-settings-panel"><summary><span><strong>Backgrounds</strong><small>Choose the artwork shown behind Brambleheart. Available backgrounds are listed here automatically.</small></span><span class="background-summary-controls"><span class="value-chip">{{ currentBackgroundLabel }}</span><label v-if="backgroundImage!=='none'" class="background-grayscale-switch" @click.stop><span>Grayscale</span><span class="switch"><input v-model="backgroundGrayscale" type="checkbox" @click.stop /><span></span></span></label></span></summary><div class="background-option-list"><label v-for="background in backgroundOptions" :key="background.value" class="background-option-row setting-row"><span class="background-option-copy"><span class="background-thumb" :class="{empty:!background.url}" :style="background.url?{backgroundImage:`url(${background.url})`}:undefined"></span><strong>{{ background.label }}</strong></span><input v-model="backgroundImage" type="radio" name="background" :value="background.value" /></label></div></details>
      <div class="setting-row reset-setting-row"><span><strong>Reset Local Settings</strong><small>Restore display, theme, and background preferences to their defaults.</small></span><button class="secondary-button settings-compact-action" type="button" @click="reset">Reset</button></div>
    </section></section>

    <section class="settings-group compact-donation-group" aria-label="Donation"><div class="settings-group-heading"><p class="eyebrow settings-group-title">DONATION</p></div><section class="settings-card support-settings-card"><div class="setting-row donation-setting-row"><span><strong>Support Brambleheart</strong><small>Support development with a one-time donation or recurring contribution.</small></span><div class="support-button-row compact-support-buttons"><a class="secondary-button support-action-button" :href="externalLinks.donation" target="_blank" rel="noopener noreferrer">Donation</a><a class="secondary-button support-action-button" :href="externalLinks.recurringSupport" target="_blank" rel="noopener noreferrer">Recurring Support</a></div></div></section></section>

    <section class="settings-group" aria-label="Data and content settings"><div class="settings-group-heading"><p class="eyebrow settings-group-title">DATA &amp; CONTENT</p></div><section class="settings-card">
      <div class="setting-row data-backup-row"><span><strong>Data Backup</strong><small>Download one JSON backup containing all approved, unapproved, and incomplete characters stored on this device.</small></span><button class="secondary-button settings-compact-action" type="button" @click="downloadCharacterBackup">Download</button></div>
      <div class="setting-row reset-data-row"><span><strong>Reset Local Data</strong><small>Reset custom content, characters, or all locally stored Brambleheart data.</small></span><div class="button-row reset-data-actions"><button class="secondary-button settings-compact-action" type="button" @click="resetCustomData">Reset Custom</button><button class="secondary-button settings-compact-action" type="button" @click="resetCharacters">Reset Characters</button><button class="secondary-button settings-compact-action" type="button" @click="resetAllLocalData">Reset Data</button></div></div>
      <div class="setting-row static-row"><span><strong>Site Changelog - Beta {{ BUILD }}</strong><small>Review changes to the Brambleheart companion site. Rules amendments are listed under Changes &amp; Updates.</small></span><button class="secondary-button settings-compact-action" type="button" @click="router.push('/changelog')">Open</button></div>
      <details class="custom-data-panel character-data-panel"><summary><span><strong>Character Data</strong><small>Character data is stored locally. Optionally link Dropbox for cloud base storage.</small></span><span class="character-data-status-pills"><span class="value-chip">LOCAL</span><span class="value-chip">{{ characterCloudConnected?'CONNECTED':'DISCONNECTED' }}</span></span></summary><div class="custom-data-actions custom-data-stack">
        <div class="setting-row"><span><strong>Local Character Storage</strong><small>Approved, unapproved, and incomplete characters continue to use this device as their active storage. Cloud Sync never replaces local storage as the live character database.</small></span><span class="value-chip">LOCAL</span></div>
      </div></details>
      <details class="custom-data-panel cloud-sync-panel"><summary><span><strong>Cloud Sync</strong><small>Optionally connect Dropbox App Folder storage for explicit character updates and uploads.</small></span><span class="value-chip">DROPBOX</span></summary><div class="custom-data-actions custom-data-stack">
        <div class="setting-row character-cloud-detail"><span><strong>Dropbox App Folder</strong><small>Brambleheart uses Dropbox App Folder access, so it can read and write only the folder Dropbox assigns to this app. Nothing is polled in the background. Only files ending in <code>_BH.json</code> are considered during a manual sync.</small><a class="inline-rule-link" href="/downloads/Brambleheart-Cloud-Instructions.txt" download>Cloud Instructions (.txt)</a></span></div>
        <div v-if="!characterCloudConnected" class="setting-row"><span><strong>Cloud Link Code</strong><small>This code protects the Dropbox OAuth return to this browser. Brambleheart sends it automatically and verifies the exact value when Dropbox returns; you do not need to paste it anywhere.</small></span><div class="character-cloud-code-controls"><code>{{ characterCloudState.linkCode }}</code><div class="button-row character-cloud-code-actions"><button class="secondary-button settings-compact-action" type="button" @click="newCharacterCloudCode">New Code</button><button class="secondary-button settings-compact-action" type="button" @click="copyCloudValue(characterCloudState.linkCode,'Cloud Link Code')">Copy Code</button></div></div></div>
        <div v-if="!characterCloudConnected" class="setting-row character-cloud-workspace-row"><span><strong>Workspace Link</strong><small>Connect a Dropbox account. Dropbox creates and isolates the Brambleheart App Folder automatically; no shared-folder URL, Workspace account, or service account is required.</small></span><div class="character-cloud-workspace-controls"><code>Dropbox App Folder</code><button class="secondary-button settings-compact-action" type="button" :disabled="characterCloudBusy||!characterCloudConfig.configured" @click="connectCharacterCloud">{{ characterCloudBusy?'Working…':'Connect Dropbox' }}</button></div></div>
        <div v-if="!characterCloudConfig.configured&&!characterCloudConnected" class="setting-row"><span><strong>Cloud Configuration</strong><small>This deployment is missing the Dropbox App Key. Follow Cloud Instructions (.txt), set <code>VITE_DROPBOX_APP_KEY</code> in Vercel, register the production <code>/settings</code> redirect URI in Dropbox, and redeploy.</small></span><span class="value-chip">NOT CONFIGURED</span></div>
        <div v-else-if="characterCloudConnection" class="setting-row"><span><strong>Dropbox App Folder</strong><small>Connected {{ new Date(characterCloudConnection.linkedAt).toLocaleDateString() }}. Exact character-ID matches from Dropbox replace the local copy only when Update from Cloud is clicked. Unmatched local characters remain local.</small></span><div class="button-row character-cloud-sync-actions"><button class="secondary-button settings-compact-action" type="button" :disabled="characterCloudBusy" @click="updateCharacterCloud">Update from Cloud</button><button class="secondary-button settings-compact-action" type="button" :disabled="characterCloudBusy" @click="uploadCharacterCloud">Upload Local</button><button class="secondary-button settings-compact-action" type="button" :disabled="characterCloudBusy" @click="disconnectCloud">Disconnect</button></div></div>
      </div><p v-if="characterCloudMessage" class="creation-status-message character-cloud-status-message">{{ characterCloudMessage }}</p></details>
      <details class="custom-data-panel"><summary><span><strong>Custom Data</strong><small>Import custom Species, Spells, Talents, and Traits built from the supplied JSON templates.</small></span><span class="value-chip">{{ customDataLabel }}</span></summary><div class="custom-data-actions custom-data-stack">
        <div class="setting-row"><span><strong>Custom Data Templates</strong><small>Download one ZIP containing typed JSON templates for Species, Spell, Talent, and Trait entries.</small></span><a class="secondary-button settings-compact-action" href="/downloads/Brambleheart-Custom-Data-Templates.zip" download>Download Templates</a></div>
        <div class="setting-row"><span><strong>Imported Custom Content</strong><small>Species {{ customCounts.species }} · Spells {{ customCounts.spell }} · Talents {{ customCounts.talent }} · Traits {{ customCounts.trait }}</small></span><div class="button-row"><button class="secondary-button settings-compact-action" type="button" @click="customDataInput?.click()">Import JSON</button><button class="secondary-button settings-compact-action" type="button" :disabled="!customData.length" @click="clearCustomData">Clear</button><input ref="customDataInput" hidden multiple type="file" accept="application/json,.json" @change="importCustomData" /></div></div>
      </div><p v-if="customImportMessage" class="creation-status-message custom-data-import-status">{{ customImportMessage }}</p></details>
    </section></section>
  </main>
</template>

<style scoped>
.character-cloud-detail>span{max-width:100%;}
.character-cloud-detail .inline-rule-link{width:max-content;max-width:100%;}
.character-data-status-pills{display:flex;align-items:center;justify-content:flex-end;gap:6px;flex-wrap:wrap;margin-left:auto;}
.character-cloud-code-controls,.character-cloud-workspace-controls{display:flex;align-items:center;justify-content:flex-end;gap:8px;min-width:0;max-width:58%;}
.character-cloud-code-controls code,.character-cloud-workspace-controls code{min-width:0;overflow-wrap:anywhere;color:var(--ink);font-size:calc(9px + var(--font-offset));}
.character-cloud-code-actions,.character-cloud-sync-actions{justify-content:flex-end;flex-wrap:wrap;}
.character-cloud-status-message{margin:10px 12px 12px;}
.cloud-sync-panel code{user-select:text;-webkit-user-select:text;}
@media(max-width:680px){
  .cloud-sync-panel .setting-row,.character-data-panel .setting-row{align-items:stretch;flex-direction:column;}
  .character-data-status-pills{justify-content:flex-start;margin-left:0;}
  .character-cloud-workspace-row{align-items:stretch;flex-direction:column;}
  .character-cloud-code-controls,.character-cloud-workspace-controls{width:100%;max-width:100%;flex-wrap:wrap;justify-content:flex-start;}
  .character-cloud-workspace-controls .settings-compact-action{width:100%;}
  .character-cloud-code-actions{width:100%;display:grid;grid-template-columns:1fr 1fr;}
  .character-cloud-code-actions .settings-compact-action{width:100%;}
  .character-cloud-sync-actions{width:100%;display:grid;grid-template-columns:1fr;}
  .character-cloud-sync-actions .settings-compact-action{width:100%;}
}
</style>
