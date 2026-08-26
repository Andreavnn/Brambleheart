<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { canInstall, installMessage, isInstalled, requestInstall } from '../state/install'
import { useSettings, type FontSize, type RoleTheme } from '../state/settings'
import { backgroundOptions, backgroundLabel } from '../data/backgroundCatalog'
import { BUILD } from '../data/bramble'
import { externalLinks } from '../data/links'
import { downloadJson, loadCharacters, writeCharacters } from '../services/characters'
import { disconnectCharacterDrive, ensureCharacterDriveState, getCharacterDriveConfig, linkCharacterDrive, regenerateCharacterDriveCode, updateCharactersFromDrive, uploadCharactersToDrive, type CharacterDriveConfig } from '../services/characterDrive'
import { clearCustomData as clearCustomDataStore, customDataCounts, loadCustomData, mergeCustomData, parseCustomDataText, saveCustomData, type CustomDataItem } from '../services/customData'
import { localStorageKeys, removeLocalStorage, SETTINGS_STORE } from '../services/storage'

const router=useRouter()
const { darkMode, compactRows, fontSize, boldText, roleTheme, backgroundImage, backgroundGrayscale, bootAudio, reset } = useSettings()
const customDataInput=ref<HTMLInputElement|null>(null)
const customData=ref<CustomDataItem[]>(loadCustomData())
const customImportMessage=ref('')
const customCounts=computed(()=>customDataCounts(customData.value))
const customDataLabel=computed(()=>customData.value.length?`${customData.value.length} item${customData.value.length===1?'':'s'}`:'None loaded')
const characterDriveState=ref(ensureCharacterDriveState())
const characterDriveConfig=ref<CharacterDriveConfig|null>(null)
const characterDriveFolderUrl=ref(characterDriveState.value.link?.folderUrl||'')
const characterDriveMessage=ref('')
const characterDriveBusy=ref(false)
const characterDriveStatus=computed(()=>characterDriveState.value.link?'DRIVE LINKED':'LOCAL')
const characterDriveLink=computed(()=>characterDriveState.value.link)

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
async function loadCharacterDriveConfig(){
  if(characterDriveConfig.value)return
  try{characterDriveConfig.value=await getCharacterDriveConfig()}catch(error){characterDriveMessage.value=error instanceof Error?error.message:'Drive sync configuration could not be loaded.'}
}
async function onCharacterDataToggle(event:Event){
  if((event.currentTarget as HTMLDetailsElement).open)await loadCharacterDriveConfig()
}
async function copyDriveValue(value:string,label:string){
  if(!value)return
  try{await navigator.clipboard.writeText(value);characterDriveMessage.value=`${label} copied.`}catch{characterDriveMessage.value=`Copy this ${label.toLowerCase()} manually: ${value}`}
}
function newCharacterDriveCode(){
  if(characterDriveState.value.link)return
  try{
    characterDriveState.value=regenerateCharacterDriveCode(characterDriveState.value)
    characterDriveMessage.value='A new folder link code was generated. Put the new code in the Shared Drive folder description before linking.'
  }catch(error){characterDriveMessage.value=error instanceof Error?error.message:'A new Drive link code could not be saved on this device.'}
}
async function connectCharacterDrive(){
  if(characterDriveBusy.value)return
  characterDriveBusy.value=true;characterDriveMessage.value=''
  try{
    const link=await linkCharacterDrive(characterDriveFolderUrl.value,characterDriveState.value.pendingCode)
    characterDriveState.value={...characterDriveState.value,link}
    characterDriveMessage.value=`Linked ${link.folderName}. The temporary BH-LINK line was removed from the folder description. Characters remain stored locally until you explicitly update or upload.`
  }catch(error){characterDriveMessage.value=error instanceof Error?error.message:'The Shared Drive folder could not be linked.'}
  finally{characterDriveBusy.value=false}
}
async function updateCharacterDrive(){
  const link=characterDriveLink.value
  if(!link||characterDriveBusy.value)return
  characterDriveBusy.value=true;characterDriveMessage.value=''
  try{
    const result=await updateCharactersFromDrive(link)
    const skipped=result.skipped.length?` ${result.skipped.length} invalid _BH.json ${result.skipped.length===1?'file was':'files were'} skipped.`:''
    characterDriveMessage.value=`Drive update complete: ${result.replaced} replaced, ${result.added} added.${skipped}`
  }catch(error){characterDriveMessage.value=error instanceof Error?error.message:'Drive update failed.'}
  finally{characterDriveBusy.value=false}
}
async function uploadCharacterDrive(){
  const link=characterDriveLink.value
  if(!link||characterDriveBusy.value)return
  if(!confirm('Upload all local characters to the linked Shared Drive folder? Existing Drive files with the same internal character ID will be replaced.'))return
  characterDriveBusy.value=true;characterDriveMessage.value=''
  try{
    const result=await uploadCharactersToDrive(link)
    const skipped=result.skipped.length?` ${result.skipped.length} invalid existing _BH.json ${result.skipped.length===1?'file was':'files were'} ignored.`:''
    characterDriveMessage.value=`Drive upload complete: ${result.updated} updated, ${result.created} created${result.renamed?`, ${result.renamed} renamed`:''}.${skipped}`
  }catch(error){characterDriveMessage.value=error instanceof Error?error.message:'Drive upload failed.'}
  finally{characterDriveBusy.value=false}
}
function disconnectDrive(){
  if(!characterDriveLink.value)return
  if(!confirm('Disconnect this Shared Drive folder from this device? Drive files will not be deleted.'))return
  try{
    characterDriveState.value=disconnectCharacterDrive()
    characterDriveFolderUrl.value=''
    characterDriveMessage.value='Google Drive sync was disconnected from this device. Remove the service-account share from the folder if you also want to revoke server access.'
  }catch(error){characterDriveMessage.value=error instanceof Error?error.message:'The Drive link could not be removed from local storage.'}
}
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
      <details class="custom-data-panel character-data-panel" @toggle="onCharacterDataToggle"><summary><span><strong>Character Data</strong><small>Characters remain stored locally. Optionally link one Google Workspace Shared Drive folder for manual _BH.json updates and uploads.</small></span><span class="value-chip">{{ characterDriveStatus }}</span></summary><div class="custom-data-actions custom-data-stack">
        <div class="setting-row character-drive-detail"><span><strong>Google Drive Character Sync</strong><small>Brambleheart does not poll Google Drive. Drive access occurs only when you link a folder, choose Update from Drive, or choose Upload Local. Only the exact linked Shared Drive folder is searched, and only files ending in <code>_BH.json</code> are considered.</small><a class="inline-rule-link" href="/downloads/Brambleheart-Google-Drive-Setup.txt" download>Download Google Drive setup instructions (.txt)</a></span></div>
        <div class="setting-row"><span><strong>Service Account</strong><small v-if="characterDriveConfig?.configured">Share only the exact Brambleheart folder directly with this account using an edit-capable role that can add and edit files. Do not add the service account as a member of the entire Shared Drive.</small><small v-else>{{ characterDriveConfig?'Drive sync is not configured on this deployment. Follow the site-owner section in the setup instructions.':'Open this menu to load the configured service-account address.' }}</small></span><div class="character-drive-value"><code>{{ characterDriveConfig?.serviceAccountEmail||characterDriveLink?.serviceAccountEmail||'Not configured' }}</code><button class="secondary-button settings-compact-action" type="button" :disabled="!(characterDriveConfig?.serviceAccountEmail||characterDriveLink?.serviceAccountEmail)" @click="copyDriveValue(characterDriveConfig?.serviceAccountEmail||characterDriveLink?.serviceAccountEmail||'','Service account')">Copy</button></div></div>
        <div v-if="!characterDriveLink" class="setting-row"><span><strong>Folder Link Code</strong><small>In Google Drive, put this exact temporary line in the folder description before linking: <code>BH-LINK:{{ characterDriveState.pendingCode }}</code>. Brambleheart removes the line after a successful link and stores its private pairing marker on the folder.</small></span><div class="button-row character-drive-code-actions"><button class="secondary-button settings-compact-action" type="button" :disabled="Boolean(characterDriveLink)" @click="newCharacterDriveCode">New Code</button><button class="secondary-button settings-compact-action" type="button" @click="copyDriveValue(`BH-LINK:${characterDriveState.pendingCode}`,'Folder link code')">Copy Code</button></div></div>
        <div v-if="!characterDriveLink" class="setting-row character-drive-folder-row"><span><strong>Shared Drive Folder Link</strong><small>Paste the link to the exact folder Brambleheart may use. Normal My Drive folders are rejected because Google service accounts cannot own new My Drive files.</small></span><div class="character-drive-link-controls"><input v-model.trim="characterDriveFolderUrl" class="field-control" type="url" autocomplete="off" placeholder="https://drive.google.com/drive/folders/..." /><button class="secondary-button settings-compact-action" type="button" :disabled="characterDriveBusy||!characterDriveFolderUrl||!characterDriveConfig?.configured" @click="connectCharacterDrive">{{ characterDriveBusy?'Working…':'Link Folder' }}</button></div></div>
        <div v-else class="setting-row"><span><strong>{{ characterDriveLink.folderName }}</strong><small>Linked {{ new Date(characterDriveLink.linkedAt).toLocaleDateString() }}. Exact character-ID matches from Drive replace the local copy when Update from Drive is clicked. Unmatched local characters remain local.</small></span><div class="button-row character-drive-sync-actions"><button class="secondary-button settings-compact-action" type="button" :disabled="characterDriveBusy" @click="updateCharacterDrive">Update from Drive</button><button class="secondary-button settings-compact-action" type="button" :disabled="characterDriveBusy" @click="uploadCharacterDrive">Upload Local</button><button class="secondary-button settings-compact-action" type="button" :disabled="characterDriveBusy" @click="disconnectDrive">Disconnect</button></div></div>
      </div><p v-if="characterDriveMessage" class="creation-status-message character-drive-status-message">{{ characterDriveMessage }}</p></details>
      <details class="custom-data-panel"><summary><span><strong>Custom Data</strong><small>Import custom Species, Spells, Talents, and Traits built from the supplied JSON templates.</small></span><span class="value-chip">{{ customDataLabel }}</span></summary><div class="custom-data-actions custom-data-stack">
        <div class="setting-row"><span><strong>Custom Data Templates</strong><small>Download one ZIP containing typed JSON templates for Species, Spell, Talent, and Trait entries.</small></span><a class="secondary-button settings-compact-action" href="/downloads/Brambleheart-Custom-Data-Templates.zip" download>Download Templates</a></div>
        <div class="setting-row"><span><strong>Imported Custom Content</strong><small>Species {{ customCounts.species }} · Spells {{ customCounts.spell }} · Talents {{ customCounts.talent }} · Traits {{ customCounts.trait }}</small></span><div class="button-row"><button class="secondary-button settings-compact-action" type="button" @click="customDataInput?.click()">Import JSON</button><button class="secondary-button settings-compact-action" type="button" :disabled="!customData.length" @click="clearCustomData">Clear</button><input ref="customDataInput" hidden multiple type="file" accept="application/json,.json" @change="importCustomData" /></div></div>
      </div><p v-if="customImportMessage" class="creation-status-message custom-data-import-status">{{ customImportMessage }}</p></details>
    </section></section>
  </main>
</template>

<style scoped>
.character-drive-detail>span{max-width:100%;}
.character-drive-detail .inline-rule-link{width:max-content;max-width:100%;}
.character-drive-value{display:flex;align-items:center;justify-content:flex-end;gap:8px;min-width:0;max-width:52%;}
.character-drive-value code{min-width:0;overflow-wrap:anywhere;color:var(--ink);font-size:calc(9px + var(--font-offset));}
.character-drive-link-controls{display:grid;grid-template-columns:minmax(220px,1fr) auto;align-items:center;gap:7px;width:min(440px,58%);}
.character-drive-code-actions,.character-drive-sync-actions{justify-content:flex-end;flex-wrap:wrap;}
.character-drive-status-message{margin:10px 12px 12px;}
.character-data-panel code{user-select:text;-webkit-user-select:text;}
@media(max-width:680px){
  .character-data-panel .setting-row{align-items:stretch;flex-direction:column;}
  .character-drive-folder-row{align-items:stretch;flex-direction:column;}
  .character-drive-link-controls{width:100%;grid-template-columns:1fr;}
  .character-drive-link-controls .settings-compact-action{width:100%;}
  .character-drive-value{width:100%;max-width:100%;flex-wrap:wrap;justify-content:flex-start;}
  .character-drive-code-actions{width:100%;display:grid;grid-template-columns:1fr 1fr;}
  .character-drive-code-actions .settings-compact-action{width:100%;}
  .character-drive-sync-actions{width:100%;display:grid;grid-template-columns:1fr;}
  .character-drive-sync-actions .settings-compact-action{width:100%;}
}
</style>
