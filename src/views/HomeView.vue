<script setup lang="ts">
import { computed, ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import { attributes, homelands, sparks } from '../data/bramble'
import { characterExportPayload, downloadJson, loadCharacters, writeCharacters, type CharacterRecord } from '../services/characters'

const characters=ref<CharacterRecord[]>(loadCharacters())
const openIds=ref(new Set<string>())
const fileInput=ref<HTMLInputElement|null>(null)
const sortedCharacters=computed(()=>[...characters.value].sort((a,b)=>Number(Boolean(b.pinned))-Number(Boolean(a.pinned))||Date.parse(b.createdAt)-Date.parse(a.createdAt)))
function persist(){writeCharacters(characters.value)}
function toggle(id:string){const next=new Set(openIds.value);next.has(id)?next.delete(id):next.add(id);openIds.value=next}
function togglePin(id:string){const c=characters.value.find(item=>item.id===id);if(!c)return;c.pinned=!c.pinned;persist()}
function removeCharacter(id:string){if(!confirm('Delete this character from this device?'))return;characters.value=characters.value.filter(c=>c.id!==id);persist()}
function downloadCharacter(character:CharacterRecord){downloadJson(`${character.name.replace(/[^a-z0-9]+/gi,'-').toLowerCase()||'character'}.bramble.json`,characterExportPayload(character))}
function exportCharacters(){if(!characters.value.length)return;downloadJson('brambleheart-characters.json',{format:'brambleheart-characters',version:'0.05',characters:characters.value})}
async function importCharacter(event:Event){
  const input=event.target as HTMLInputElement;const file=input.files?.[0];if(!file)return
  try{
    const parsed=JSON.parse(await file.text())
    if(Array.isArray(parsed.characters)){
      const imported=parsed.characters.filter((raw:CharacterRecord)=>raw?.name&&raw?.attributes).map((raw:CharacterRecord)=>({...raw,id:crypto.randomUUID(),createdAt:new Date().toISOString(),pinned:Boolean(raw.pinned)}))
      characters.value=[...imported,...characters.value];persist()
    }else{
      const raw=parsed.character??parsed
      if(!raw?.name||!raw?.attributes)throw new Error('Invalid Brambleheart character JSON.')
      characters.value.unshift({...raw,id:crypto.randomUUID(),createdAt:new Date().toISOString(),pinned:Boolean(raw.pinned)});persist()
    }
  }catch(e){alert(e instanceof Error?e.message:'Could not import this character.')}
  input.value=''
}
function homelandSkills(name:string){return homelands.find(h=>h.name===name)?.skills.join(' · ')||'—'}
function sparkWords(name:string){return sparks.find(s=>s[0]===name)?.[1]||'—'}
function derived(c:CharacterRecord){return{speed:2+c.attributes.agility,aim:c.attributes.agility*2,mettle:c.attributes.might*2,ward:c.attributes.hide*2,control:c.attributes.lore*2,power:c.attributes.might,guts:c.attributes.hide}}
</script>

<template>
  <main class="page home-page">
    <AppHeader />

    <div class="page-title-block">
      <p class="eyebrow">CHARACTERS</p>
      <h1>Character List</h1>
      <p>Create, import, export, pin, and manage Brambleheart characters stored on this device.</p>
    </div>

    <section class="list-launch card-surface character-action-launch">
      <div class="list-launch-actions centered-character-actions">
        <RouterLink class="primary-button" to="/characters/create">Create a character</RouterLink>
        <button class="secondary-button" type="button" @click="fileInput?.click()">Import character</button>
        <button class="secondary-button" type="button" :disabled="!characters.length" @click="exportCharacters">Export characters</button>
        <input ref="fileInput" class="file-import-input" type="file" accept="application/json,.json" @change="importCharacter" />
      </div>
    </section>

    <section v-if="characters.length" class="saved-list-stack character-list-stack">
      <article v-for="character in sortedCharacters" :key="character.id" class="saved-list-card card-surface character-card" :class="{pinned:character.pinned}">
        <div class="character-card-topline">
          <button class="saved-list-open-area character-open-area" type="button" @click="toggle(character.id)">
            <div>
              <div class="character-title-line"><strong>{{ character.name }}</strong><span v-if="character.pinned" class="row-badge">PINNED</span></div>
              <div class="saved-list-labels"><span class="app-option-label">{{ character.species }}</span><span class="app-option-label">{{ character.spark }}</span><span class="app-option-label">{{ character.homeland }}</span></div>
            </div>
            <div class="saved-list-card-meta"><strong>{{ character.path==='magic'?'Magic 1 · 1 Talent':'2 Talents' }}</strong><small>{{ sparkWords(character.spark) }}</small></div>
          </button>
          <button class="icon-button character-pin-button" type="button" :aria-label="character.pinned?'Unpin character':'Pin character'" :title="character.pinned?'Unpin character':'Pin character'" @click="togglePin(character.id)">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 4 6 6-3 1-4 4-1 5-2-2-4 4-1-1 4-4-2-2 5-1 4-4 1-3Z"/></svg>
          </button>
        </div>
        <div v-if="openIds.has(character.id)" class="character-detail-panel">
          <div class="stat-grid character-stat-grid">
            <div v-for="attribute in attributes" :key="attribute.id" class="character-stat"><strong>{{ character.attributes[attribute.id] }}</strong><span>{{ attribute.name.slice(0,3).toUpperCase() }}</span></div>
          </div>
          <div class="detail-grid">
            <div><span>Faith</span><strong>{{ character.faith }}</strong></div><div><span>Oath</span><strong>{{ character.oath }}</strong></div><div><span>Starting Skills</span><strong>{{ homelandSkills(character.homeland) }}</strong></div><div><span>Starting Wealth</span><strong>{{ character.startingWealth ?? 50 }} sp{{ character.adventureKit===false?'':' + Adventure Kit' }}</strong></div>
          </div>
          <div class="info-card character-derived"><strong>Derived values</strong><p>Speed {{ derived(character).speed }} · Aim {{ derived(character).aim }} · Mettle {{ derived(character).mettle }} · Ward {{ derived(character).ward }} · Control {{ derived(character).control }} · Power {{ derived(character).power }} · Guts {{ derived(character).guts }}.</p></div>
          <div v-if="character.talents?.length" class="info-card"><strong>Talents{{ character.loreAttunement?` · ${character.loreAttunement} Attunement`:'' }}</strong><p>{{ character.talents.join(' · ') }}</p></div>
          <div class="button-row end"><button class="secondary-button" type="button" @click="downloadCharacter(character)">Export JSON</button><button class="secondary-button" type="button" @click="togglePin(character.id)">{{ character.pinned?'Unpin':'Pin to top' }}</button><button class="danger-button" type="button" @click="removeCharacter(character.id)">Delete</button></div>
        </div>
      </article>
    </section>

    <section v-else class="empty-state card-surface compact-empty lists-empty-state">
      <div class="empty-icon">◆</div><h2>Your characters will appear here</h2><p>Create a character or import an existing Brambleheart character file.</p>
    </section>
  </main>
</template>
