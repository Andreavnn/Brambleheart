<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { attributes, homelands, sparks } from '../data/bramble'
import { characterExportPayload, downloadJson, loadCharacters, writeCharacters, type CharacterRecord } from '../services/characters'

const router=useRouter()
const characters=ref<CharacterRecord[]>(loadCharacters())
const openIds=ref(new Set<string>())
const fileInput=ref<HTMLInputElement|null>(null)
const sortedCharacters=computed(()=>[...characters.value].sort((a,b)=>Number(Boolean(b.pinned))-Number(Boolean(a.pinned))||Date.parse(b.updatedAt||b.createdAt)-Date.parse(a.updatedAt||a.createdAt)))
const completeCharacters=computed(()=>sortedCharacters.value.filter(character=>!character.draft))
const incompleteCharacters=computed(()=>sortedCharacters.value.filter(character=>character.draft))
function snapshot(){return typeof structuredClone==='function'?structuredClone(characters.value):JSON.parse(JSON.stringify(characters.value)) as CharacterRecord[]}
function persist(previous?:CharacterRecord[]){const saved=writeCharacters(characters.value);if(saved.ok)return true;if(previous)characters.value=previous;alert(saved.message);return false}
function toggle(id:string){const next=new Set(openIds.value);next.has(id)?next.delete(id):next.add(id);openIds.value=next}
function togglePin(id:string){const previous=snapshot();const c=characters.value.find(item=>item.id===id);if(!c)return;c.pinned=!c.pinned;c.updatedAt=new Date().toISOString();persist(previous)}
function toggleLock(id:string){const previous=snapshot();const c=characters.value.find(item=>item.id===id);if(!c)return;c.locked=!c.locked;c.updatedAt=new Date().toISOString();persist(previous)}
function levelUpCharacter(id:string){void router.push(`/characters/${id}/level-up`)}
function editCharacter(id:string){void router.push({path:'/characters/create',query:{edit:id}})}
function copyCharacter(id:string){const previous=snapshot();const source=characters.value.find(item=>item.id===id);if(!source)return;const now=new Date().toISOString();const copy:CharacterRecord={...source,id:crypto.randomUUID(),name:`${source.name} Copy`,locked:false,pinned:false,createdAt:now,updatedAt:now};characters.value=[copy,...characters.value];persist(previous)}
function removeCharacter(id:string){const c=characters.value.find(item=>item.id===id);if(c?.locked){alert('Unlock this character before deleting it.');return}if(!confirm('Delete this character from this device?'))return;const previous=snapshot();characters.value=characters.value.filter(item=>item.id!==id);persist(previous)}
function downloadCharacter(character:CharacterRecord){downloadJson(`${character.name.replace(/[^a-z0-9]+/gi,'-').toLowerCase()||'character'}.bramble.json`,characterExportPayload(character))}
function exportCharacters(){if(!characters.value.length)return;downloadJson('brambleheart-characters.json',{format:'brambleheart-characters',version:'0.15',characters:characters.value})}
async function importCharacter(event:Event){
  const input=event.target as HTMLInputElement;const file=input.files?.[0];if(!file)return
  try{
    const parsed=JSON.parse(await file.text())
    if(Array.isArray(parsed.characters)){
      const previous=snapshot()
      const imported=parsed.characters.filter((raw:CharacterRecord)=>raw?.name&&raw?.attributes).map((raw:CharacterRecord)=>({...raw,id:crypto.randomUUID(),createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),pinned:Boolean(raw.pinned),locked:Boolean(raw.locked)}))
      characters.value=[...imported,...characters.value];persist(previous)
    }else{
      const previous=snapshot()
      const raw=parsed.character??parsed
      if(!raw?.name||!raw?.attributes)throw new Error('Invalid Brambleheart character JSON.')
      characters.value.unshift({...raw,id:crypto.randomUUID(),createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),pinned:Boolean(raw.pinned),locked:Boolean(raw.locked)});persist(previous)
    }
  }catch(e){alert(e instanceof Error?e.message:'Could not import this character.')}
  input.value=''
}
function homelandSkills(name:string){return homelands.find(h=>h.name===name)?.skills.join(' · ')||'—'}
function sparkWords(name:string){return sparks.find(s=>s[0]===name)?.[1]||'—'}
function equipmentGuts(c:CharacterRecord){return Math.max(0,...(c.equipment||[]).map(item=>{const match=String(item.detail||'').match(/Guts Bonus\s*\+?(\d+)/i);return match?Number(match[1]):0}))}
function derived(c:CharacterRecord){return{speed:2+c.attributes.agility,aim:c.attributes.agility*2,mettle:c.attributes.might*2,ward:c.attributes.hide*2,control:c.attributes.lore*2,power:c.attributes.might,guts:c.attributes.hide+equipmentGuts(c)}}
function skillSummary(character:CharacterRecord){
  if(character.skillRanks&&Object.keys(character.skillRanks).length)return Object.entries(character.skillRanks).sort((a,b)=>a[0].localeCompare(b[0])).map(([name,rank])=>`${name}: Rank ${rank}, Mod +${rank*2}`).join(' · ')
  return character.skills?.length?character.skills.map(name=>`${name}: Rank 1, Mod +2`).join(' · '):homelandSkills(character.homeland)
}
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
        <button class="secondary-button" type="button" :disabled="!characters.length" @click="exportCharacters">Export Characters</button>
        <input ref="fileInput" class="file-import-input" type="file" accept="application/json,.json" @change="importCharacter" />
      </div>
    </section>

    <section v-if="characters.length" class="character-list-groups">
      <section v-for="group in [{title:'Complete Characters',characters:completeCharacters,tone:'complete'},{title:'Incomplete Characters',characters:incompleteCharacters,tone:'incomplete'}]" :key="group.title" class="character-list-group" :class="`character-list-group-${group.tone}`">
        <header class="character-list-group-heading"><div><h2>{{ group.title }}</h2><small>{{ group.characters.length }} {{ group.characters.length===1?'character':'characters' }}</small></div></header>
        <div v-if="group.characters.length" class="saved-list-stack character-list-stack">
        <article v-for="character in group.characters" :key="character.id" class="saved-list-card card-surface character-card" :class="{pinned:character.pinned,locked:character.locked,draft:character.draft,'character-status-incomplete':character.draft,'character-status-complete':!character.draft}">
          <div class="character-card-topline">
            <button class="saved-list-open-area character-open-area" type="button" @click="toggle(character.id)">
              <div>
                <div class="character-title-line"><strong>{{ character.name }}</strong><span v-if="character.draft" class="character-status-badge incomplete">INCOMPLETE</span><span v-else class="character-status-badge complete">COMPLETE</span><span v-if="character.locked" class="row-badge lock-badge">{{ character.draft?'LOCKED':'APPROVED' }}</span><span v-if="character.pinned" class="row-badge">PINNED</span></div>
                <div class="saved-list-labels character-list-summary"><span class="app-option-label">{{ character.species||'Species not selected' }}</span><span class="app-option-label">{{ character.campaignName||'No campaign assigned' }}</span></div>
              </div>
              <div class="saved-list-card-meta"><strong>{{ character.campaignName||'Independent' }}</strong><small>{{ character.species||'Species not selected' }}</small></div>
            </button>
            <div class="character-card-actions-visible">
              <button v-if="character.draft||!character.locked" class="secondary-button compact-action" type="button" @click="editCharacter(character.id)">Edit</button>
              <button v-else class="primary-button compact-action" type="button" @click="levelUpCharacter(character.id)">Level Up</button>
              <button class="secondary-button compact-action character-lock-button" type="button" :class="{active:character.locked}" @click="toggleLock(character.id)">{{ character.draft?(character.locked?'Locked':'Lock'):(character.locked?'Approved':'Approve') }}</button>
              <button class="secondary-button compact-action" type="button" @click="copyCharacter(character.id)">Copy</button>
              <button class="danger-button compact-action" type="button" :disabled="character.locked" @click="removeCharacter(character.id)">Delete</button>
            </div>
          </div>
          <div v-if="openIds.has(character.id)" class="character-detail-panel">
            <div class="stat-grid character-stat-grid"><div v-for="attribute in attributes" :key="attribute.id" class="character-stat"><strong>{{ character.attributes[attribute.id] }}</strong><span>{{ attribute.name.slice(0,3).toUpperCase() }}</span></div></div>
            <div class="detail-grid"><div><span>Faith</span><strong>{{ character.faith||'—' }}</strong></div><div><span>Oath</span><strong>{{ character.oath||'—' }}</strong></div><div><span>Skills</span><strong>{{ skillSummary(character) }}</strong></div><div><span>Starting Wealth</span><strong>{{ character.wealthRemaining ?? character.startingWealth ?? 188 }} {{ character.wealthCurrency||'NP' }} Remaining{{ character.adventureKit===false?'':' · Adventure Kit' }}</strong></div></div>
            <div v-if="character.cultureTraits?.length" class="info-card"><strong>Culture Traits</strong><p>{{ character.cultureTraits.join(' · ') }}</p></div>
            <div v-if="character.languages?.length" class="info-card"><strong>Languages</strong><p>{{ character.languages.join(' · ') }}</p></div>
            <div class="info-card character-derived"><strong>Derived Values</strong><p>Speed {{ derived(character).speed }} · Aim {{ derived(character).aim }} · Mettle {{ derived(character).mettle }} · Ward {{ derived(character).ward }} · Control {{ derived(character).control }} · Power {{ derived(character).power }} · Guts {{ derived(character).guts }}.</p></div>
            <div v-if="character.talents?.length" class="info-card"><strong>Talents{{ character.loreAttunement?` · ${character.loreAttunement} Attunement`:'' }}</strong><p>{{ character.talents.join(' · ') }}</p></div>
            <div v-if="character.spells?.length || character.invocationSpells?.length || character.invocationSpell" class="info-card"><strong>Magic</strong><p><template v-if="character.spells?.length">Spells: {{ character.spells.join(' · ') }}</template><template v-if="character.invocationSpells?.length"> · Invocations: {{ character.invocationSpells.join(' · ') }}</template><template v-else-if="character.invocationSpell"> · Invocation: {{ character.invocationSpell }}</template></p></div>
            <div v-if="character.equipment?.length" class="info-card"><strong>Purchased Equipment</strong><p>{{ character.equipment.map(item=>item.name).join(' · ') }}</p></div>
            <div class="button-row end"><button class="secondary-button" type="button" @click="downloadCharacter(character)">Export JSON</button><button class="secondary-button" type="button" @click="toggleLock(character.id)">{{ character.draft?(character.locked?'Unlock':'Lock Character'):(character.locked?'Remove Approval':'Approve Character') }}</button><button class="secondary-button" type="button" @click="togglePin(character.id)">{{ character.pinned?'Unpin':'Pin to Top' }}</button><button class="danger-button" type="button" :disabled="character.locked" @click="removeCharacter(character.id)">Delete</button></div>
          </div>
        </article>
        </div>
        <div v-else class="empty-inline character-group-empty">No {{ group.tone }} characters yet.</div>
      </section>
    </section>

    <section v-else class="empty-state card-surface compact-empty lists-empty-state"><div class="empty-icon">◆</div><h2>Your characters will appear here</h2><p>Create a character or import an existing Brambleheart character file.</p></section>
  </main>
</template>
