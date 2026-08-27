<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { attributes, BUILD, homelands, sparks } from '../data/bramble'
import { canonicalTalentName } from '../data/talentCategories'
import { derivedStats, equipmentControlBonus, equipmentGutsBonus } from '../rules/rulesEngine'
import { characterExportPayload, characterStatus, downloadJson, loadCharacters, normalizeImportedCharacter, setCharacterApproval, writeCharacters, type CharacterRecord } from '../services/characters'
import { CHARACTER_SHARE_URL, consumeCharacterShareFromLocation, createCharacterShareCode, parseCharacterShareValue } from '../services/characterShare'

const router=useRouter()
const characters=ref<CharacterRecord[]>(loadCharacters())
const openIds=ref(new Set<string>())
const fileInput=ref<HTMLInputElement|null>(null)
const shareDialogMode=ref<'closed'|'share'|'import'>('closed')
const shareCode=ref('')
const shareCodeInput=ref('')
const shareName=ref('')
const shareMessage=ref('')
const pendingSharedCharacter=ref<CharacterRecord|null>(null)
const sortedCharacters=computed(()=>[...characters.value].sort((a,b)=>Number(Boolean(b.pinned))-Number(Boolean(a.pinned))||Date.parse(b.updatedAt||b.createdAt)-Date.parse(a.updatedAt||a.createdAt)))
const unapprovedCharacters=computed(()=>sortedCharacters.value.filter(character=>characterStatus(character)==='unapproved'))
const approvedCharacters=computed(()=>sortedCharacters.value.filter(character=>characterStatus(character)==='approved'))
const incompleteCharacters=computed(()=>sortedCharacters.value.filter(character=>characterStatus(character)==='incomplete'))
function snapshot(){return JSON.parse(JSON.stringify(characters.value)) as CharacterRecord[]}
function persist(previous?:CharacterRecord[]){const saved=writeCharacters(characters.value);if(saved.ok)return true;if(previous)characters.value=previous;alert(saved.message);return false}
function toggle(id:string){const next=new Set(openIds.value);next.has(id)?next.delete(id):next.add(id);openIds.value=next}
function togglePin(id:string){const previous=snapshot();const c=characters.value.find(item=>item.id===id);if(!c)return;c.pinned=!c.pinned;c.updatedAt=new Date().toISOString();persist(previous)}
function toggleCharacterLock(id:string){const previous=snapshot();const c=characters.value.find(item=>item.id===id);if(!c)return;c.locked=!c.locked;c.updatedAt=new Date().toISOString();persist(previous)}
function setApproval(id:string,approved:boolean){const saved=setCharacterApproval(id,approved);if(!saved.ok){alert(saved.message);return}characters.value=loadCharacters()}
function levelUpCharacter(id:string){void router.push(`/characters/${id}/level-up`)}
function editCharacter(id:string){void router.push({path:'/characters/create',query:{edit:id}})}
function copyCharacter(id:string){const previous=snapshot();const source=characters.value.find(item=>item.id===id);if(!source)return;const now=new Date().toISOString();const complete=characterStatus(source)!=='incomplete';const copy:CharacterRecord={...source,id:crypto.randomUUID(),name:`${source.name} Copy`,creationComplete:complete,status:complete?'unapproved':'incomplete',draft:!complete,locked:false,pinned:false,createdAt:now,updatedAt:now};characters.value=[copy,...characters.value];persist(previous)}
function removeCharacter(id:string){const c=characters.value.find(item=>item.id===id);if(c&&(characterStatus(c)==='approved'||c.locked)){alert(characterStatus(c)==='approved'?'Remove approval before deleting this character.':'Unlock this character before deleting it.');return}if(!confirm('Delete this character from this device?'))return;const previous=snapshot();characters.value=characters.value.filter(item=>item.id!==id);persist(previous)}
function downloadCharacter(character:CharacterRecord){downloadJson(`${character.name.replace(/[^a-z0-9]+/gi,'-').toLowerCase()||'character'}.bramble.json`,characterExportPayload(character))}
function exportCharacters(){if(!characters.value.length)return;downloadJson('brambleheart-characters.json',{format:'brambleheart-characters',version:BUILD,characters:characters.value})}
async function importCharacter(event:Event){
  const input=event.target as HTMLInputElement;const file=input.files?.[0];if(!file)return
  try{
    const parsed=JSON.parse(await file.text())
    const rawItems=Array.isArray(parsed.characters)?parsed.characters:[parsed.character??parsed]
    const imported=rawItems.map((raw:unknown)=>normalizeImportedCharacter(raw))
    if(!imported.length)throw new Error('No Brambleheart characters were found in this file.')
    const previous=snapshot();characters.value=[...imported,...characters.value];persist(previous)
  }catch(e){alert(e instanceof Error?e.message:'Could not import this character.')}
  input.value=''
}
function openShareCodeImport(){
  shareDialogMode.value='import';shareCodeInput.value='';shareMessage.value='Paste a Brambleheart Share Code below.';pendingSharedCharacter.value=null
}
async function openCharacterShare(character:CharacterRecord){
  pendingSharedCharacter.value=null;shareMessage.value='';shareName.value=character.name
  try{
    const share=await createCharacterShareCode(character)
    shareCode.value=share.code
    shareMessage.value=`Share Code ready · ${share.bytes.toLocaleString()} bytes compressed.`
    shareDialogMode.value='share'
  }catch(error){shareDialogMode.value='share';shareCode.value='';shareMessage.value=error instanceof Error?error.message:'Could not create this character Share Code.'}
}
async function writeClipboard(text:string){
  if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(text);return}
  const area=document.createElement('textarea');area.value=text;area.style.position='fixed';area.style.opacity='0';document.body.appendChild(area);area.select();const copied=document.execCommand('copy');area.remove();if(!copied)throw new Error('Clipboard unavailable.')
}
async function copyShareCode(){
  if(!shareCode.value)return
  try{await writeClipboard(shareCode.value);shareMessage.value='Character Share Code copied.'}catch{shareMessage.value='Could not copy the Share Code in this browser.'}
}
async function shareCharacterCode(){
  if(!shareCode.value)return
  const text=`Brambleheart character: ${shareName.value}\n\nShare Code:\n${shareCode.value}\n\nOpen Brambleheart and choose Import Share Code.`
  try{
    if(navigator.share){await navigator.share({title:`Brambleheart Character — ${shareName.value}`,text,url:CHARACTER_SHARE_URL});shareMessage.value='Character Share Code sent.';return}
    await writeClipboard(`${text}\n\n${CHARACTER_SHARE_URL}`)
    shareMessage.value='Share message copied. The link uses the normal Brambleheart Character List URL.'
  }catch(error){if(error instanceof DOMException&&error.name==='AbortError')return;shareMessage.value='Could not share from this browser. Use Copy Share Code instead.'}
}
function closeShareDialog(){shareDialogMode.value='closed';pendingSharedCharacter.value=null;shareMessage.value='';shareCodeInput.value=''}
async function handleShareCode(text:string){
  try{
    const character=await parseCharacterShareValue(text)
    pendingSharedCharacter.value=character;shareDialogMode.value='import';shareMessage.value='Review the character below before importing it to this device.'
  }catch(error){pendingSharedCharacter.value=null;shareDialogMode.value='import';shareMessage.value=error instanceof Error?error.message:'Could not read this Share Code.'}
}
async function reviewShareCode(){
  if(!shareCodeInput.value.trim()){shareMessage.value='Paste a Brambleheart Share Code first.';return}
  await handleShareCode(shareCodeInput.value)
}
function importPendingShare(){
  const character=pendingSharedCharacter.value;if(!character)return
  const previous=snapshot();characters.value=[character,...characters.value]
  if(persist(previous))closeShareDialog()
}
function homelandSkills(name:string){return homelands.find(h=>h.name===name)?.skills.join(' · ')||'—'}
function sparkWords(name:string){return sparks.find(s=>s[0]===name)?.[1]||'—'}
function derived(c:CharacterRecord){return derivedStats(c.attributes,equipmentGutsBonus(c.equipment),equipmentControlBonus(c.equipment))}
function skillSummary(character:CharacterRecord){
  if(character.skillRanks&&Object.keys(character.skillRanks).length)return Object.entries(character.skillRanks).sort((a,b)=>a[0].localeCompare(b[0])).map(([name,rank])=>`${name}: Rank ${rank}, Mod +${Number(rank)*2}`).join(' · ')
  return character.skills?.length?character.skills.map(name=>`${name}: Rank 1, Mod +2`).join(' · '):homelandSkills(character.homeland)
}
onMounted(()=>{const shared=consumeCharacterShareFromLocation();if(shared)void handleShareCode(shared)})
</script>

<template>
  <main class="page home-page">
    <AppHeader />

    <div class="page-title-block">
      <h1>Character List</h1>
      <p>Create, import, export, pin, lock, and manage Brambleheart characters stored on this device.</p>
    </div>

    <section class="list-launch card-surface character-action-launch">
      <div class="list-launch-actions centered-character-actions">
        <RouterLink class="primary-button" to="/characters/create">Create a Character</RouterLink>
        <button class="secondary-button" type="button" @click="fileInput?.click()">Import Character</button>
        <button class="secondary-button" type="button" @click="openShareCodeImport">Import Share Code</button>
        <button class="secondary-button" type="button" :disabled="!characters.length" @click="exportCharacters">Export Characters</button>
        <input ref="fileInput" class="file-import-input" hidden type="file" accept="application/json,.json" @change="importCharacter" />
      </div>
    </section>

    <section v-if="characters.length" class="character-list-groups">
      <details v-for="group in [{title:'Approved Characters',characters:approvedCharacters,tone:'approved'},{title:'Unapproved Characters',characters:unapprovedCharacters,tone:'complete'},{title:'Incomplete Characters',characters:incompleteCharacters,tone:'incomplete'}]" :key="group.title" class="character-list-group" :class="`character-list-group-${group.tone}`" open>
        <summary class="character-list-group-heading"><div><h2>{{ group.title }}</h2><small>{{ group.characters.length }} {{ group.characters.length===1?'character':'characters' }}</small></div><span class="character-group-chevron" aria-hidden="true">⌄</span></summary>
        <div v-if="group.characters.length" class="saved-list-stack character-list-stack">
        <article v-for="character in group.characters" :key="character.id" class="saved-list-card card-surface character-card" :class="{pinned:character.pinned,locked:character.locked,approved:characterStatus(character)==='approved',draft:characterStatus(character)==='incomplete','character-status-incomplete':characterStatus(character)==='incomplete','character-status-complete':characterStatus(character)!=='incomplete'}">
          <div class="character-card-topline">
            <button class="saved-list-open-area character-open-area" type="button" @click="toggle(character.id)">
              <div>
                <div class="character-title-line"><strong>{{ character.name }}</strong><span v-if="characterStatus(character)==='incomplete'" class="character-status-badge incomplete">INCOMPLETE</span><span v-else class="character-status-badge complete">{{ characterStatus(character)==='approved'?'APPROVED':'UNAPPROVED' }}</span><span v-if="character.locked" class="row-badge lock-badge">LOCKED</span><span v-if="character.pinned" class="row-badge">PINNED</span></div>
                <div class="saved-list-labels character-list-summary"><span class="app-option-label">{{ character.species||'Species not selected' }}</span><span class="app-option-label">{{ character.campaignName||'No campaign assigned' }}</span></div>
              </div>
            </button>
            <div class="character-card-actions-visible" role="group" :aria-label="`${character.name} actions`">
              <button v-if="characterStatus(character)!=='approved'" class="secondary-button character-icon-action" type="button" aria-label="Edit character" title="Edit" @click="editCharacter(character.id)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/></svg></button>
              <button v-else class="primary-button character-icon-action" type="button" aria-label="Level up character" title="Level Up" @click="levelUpCharacter(character.id)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5"/><path d="m6.5 10.5 5.5-5.5 5.5 5.5"/></svg></button>
              <button class="secondary-button character-icon-action character-lock-button" type="button" :class="{active:character.locked}" :aria-label="character.locked?'Unlock character':'Lock character'" :title="character.locked?'Unlock':'Lock'" @click="toggleCharacterLock(character.id)"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg></button>
              <button v-if="characterStatus(character)==='unapproved'" class="secondary-button character-icon-action" type="button" aria-label="Approve character" title="Approve" @click="setApproval(character.id,true)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10v10H4V10h3Z"/><path d="M9 20h7.5a2 2 0 0 0 1.9-1.4l2-6A2 2 0 0 0 18.5 10H14l.7-3.5A2.5 2.5 0 0 0 12.2 4L9 10v10Z"/></svg></button>
              <button v-else-if="characterStatus(character)==='approved'" class="secondary-button character-icon-action" type="button" aria-label="Remove character approval" title="Remove Approval" @click="setApproval(character.id,false)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 14V4H4v10h3Z"/><path d="M9 4h7.5a2 2 0 0 1 1.9 1.4l2 6A2 2 0 0 1 18.5 14H14l.7 3.5A2.5 2.5 0 0 1 12.2 20L9 14V4Z"/></svg></button>
              <button class="secondary-button character-icon-action" type="button" aria-label="Copy character" title="Copy" @click="copyCharacter(character.id)"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg></button>
              <button class="secondary-button character-icon-action" type="button" aria-label="Share character code" title="Share Code" @click="openCharacterShare(character)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z"/><path d="M14 14h2v2h-2zM18 14h2v6h-2zM14 18h2v2h-2z"/></svg></button>
              <button class="danger-button character-icon-action" type="button" :disabled="character.locked||characterStatus(character)==='approved'" aria-label="Delete character" title="Delete" @click="removeCharacter(character.id)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="m6 7 1 13h10l1-13"/><path d="M10 11v5M14 11v5"/></svg></button>
            </div>
          </div>
          <div v-if="openIds.has(character.id)" class="character-detail-panel">
            <div class="stat-grid character-stat-grid"><div v-for="attribute in attributes" :key="attribute.id" class="character-stat"><strong>{{ character.attributes[attribute.id] }}</strong><span>{{ attribute.name.slice(0,3).toUpperCase() }}</span></div></div>
            <div class="detail-grid"><div><span>Faith</span><strong>{{ character.faith||'—' }}</strong></div><div><span>Oath</span><strong>{{ character.oath||'—' }}</strong></div><div><span>Skills</span><strong>{{ skillSummary(character) }}</strong></div><div><span>Starting Wealth</span><strong>{{ character.wealthRemaining ?? character.startingWealth ?? 188 }} {{ character.wealthCurrency||'NP' }} Remaining{{ character.adventureKit===false?'':' · Adventure Kit' }}</strong></div></div>
            <div v-if="character.cultureTraits?.length" class="info-card"><strong>Culture Traits</strong><p>{{ character.cultureTraits.join(' · ') }}</p></div>
            <div v-if="character.languages?.length" class="info-card"><strong>Languages</strong><p>{{ character.languages.join(' · ') }}</p></div>
            <div class="info-card character-derived"><strong>Derived Values</strong><p>Speed {{ derived(character).speed }} · Aim {{ derived(character).aim }} · Mettle {{ derived(character).mettle }} · Ward {{ derived(character).ward }} · Control {{ derived(character).control }} · Power {{ derived(character).power }} · Guts {{ derived(character).guts }}.</p></div>
            <div v-if="character.talents?.length" class="info-card"><strong>Talents{{ character.loreAttunement?` · ${character.loreAttunement} Attunement`:'' }}</strong><p>{{ character.talents.map(canonicalTalentName).join(' · ') }}</p></div>
            <div v-if="character.spells?.length || character.invocationSpells?.length || character.invocationSpell" class="info-card"><strong>Magic</strong><p><template v-if="character.spells?.length">Spells: {{ character.spells.join(' · ') }}</template><template v-if="character.invocationSpells?.length"> · Invocations: {{ character.invocationSpells.join(' · ') }}</template><template v-else-if="character.invocationSpell"> · Invocation: {{ character.invocationSpell }}</template></p></div>
            <div v-if="character.equipment?.length" class="info-card"><strong>Purchased Equipment</strong><p>{{ character.equipment.map(item=>item.name).join(' · ') }}</p></div>
            <div class="button-row end"><button class="secondary-button" type="button" @click="downloadCharacter(character)">Export JSON</button><button class="secondary-button" type="button" @click="openCharacterShare(character)">Share Code</button><button class="secondary-button" type="button" @click="toggleCharacterLock(character.id)">{{ character.locked?'Unlock Character':'Lock Character' }}</button><button v-if="characterStatus(character)!=='incomplete'" class="secondary-button" type="button" @click="setApproval(character.id,characterStatus(character)!=='approved')">{{ characterStatus(character)==='approved'?'Remove Approval':'Approve Character' }}</button><button class="secondary-button" type="button" @click="togglePin(character.id)">{{ character.pinned?'Unpin':'Pin to Top' }}</button><button class="danger-button" type="button" :disabled="character.locked||characterStatus(character)==='approved'" @click="removeCharacter(character.id)">Delete</button></div>
          </div>
        </article>
        </div>
      </details>
    </section>

    <section v-else class="empty-state card-surface compact-empty lists-empty-state"><div class="empty-icon">◆</div><h2>Your characters will appear here</h2><p>Create a character or import an existing Brambleheart character file.</p></section>

    <div v-if="shareDialogMode!=='closed'" class="share-code-backdrop" role="presentation" @click.self="closeShareDialog">
      <section class="share-code-dialog card-surface" role="dialog" aria-modal="true" :aria-label="shareDialogMode==='share'?'Share character code':'Import shared character'">
        <header class="share-code-heading"><div><p class="eyebrow">CHARACTER SHARE</p><h2 v-if="shareDialogMode==='share'">Share {{ shareName }}</h2><h2 v-else>Import Share Code</h2></div><button class="icon-button" type="button" aria-label="Close Share Code dialog" @click="closeShareDialog">×</button></header>
        <template v-if="shareDialogMode==='share'">
          <p class="share-code-help">The character data is carried by the Share Code. The link sent with it stays at the normal Brambleheart Character List URL.</p>
          <textarea class="share-code-field" :value="shareCode" readonly aria-label="Character Share Code"></textarea>
          <p class="share-code-url"><strong>Link:</strong> {{ CHARACTER_SHARE_URL }}</p>
          <p class="share-code-message">{{ shareMessage }}</p>
          <div class="button-row share-code-actions"><button v-if="shareCode" class="primary-button" type="button" @click="shareCharacterCode">Share Character</button><button v-if="shareCode" class="secondary-button" type="button" @click="copyShareCode">Copy Share Code</button><button class="secondary-button" type="button" @click="closeShareDialog">Close</button></div>
        </template>
        <template v-else>
          <template v-if="!pendingSharedCharacter">
            <p class="share-code-help">Paste the code from a Brambleheart character share. Legacy long Brambleheart share links are also accepted.</p>
            <textarea v-model="shareCodeInput" class="share-code-field" aria-label="Paste Character Share Code" placeholder="BH1.g.…"></textarea>
            <p class="share-code-message">{{ shareMessage }}</p>
            <div class="button-row share-code-actions"><button class="primary-button" type="button" @click="reviewShareCode">Review Share Code</button><button class="secondary-button" type="button" @click="closeShareDialog">Cancel</button></div>
          </template>
          <template v-else>
            <div class="share-code-import-summary"><strong>{{ pendingSharedCharacter.name }}</strong><span>{{ pendingSharedCharacter.species||'Species not selected' }} · {{ pendingSharedCharacter.campaignName||'No campaign assigned' }}</span><small>Status after import: {{ characterStatus(pendingSharedCharacter)==='approved'?'Approved':characterStatus(pendingSharedCharacter)==='unapproved'?'Unapproved':'Incomplete' }}</small></div>
            <p class="share-code-message">{{ shareMessage }}</p>
            <div class="button-row share-code-actions"><button class="primary-button" type="button" @click="importPendingShare">Import Character</button><button class="secondary-button" type="button" @click="openShareCodeImport">Use Another Code</button><button class="secondary-button" type="button" @click="closeShareDialog">Cancel</button></div>
          </template>
        </template>
      </section>
    </div>
  </main>
</template>
