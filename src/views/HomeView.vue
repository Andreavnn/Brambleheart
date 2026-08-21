<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import { attributes, faiths, homelands, oaths, sparks, species, type AttributeId } from '../data/bramble'

type AttributeRanks = Record<AttributeId, number>
interface CharacterRecord {
  id:string; name:string; species:string; spark:string; homeland:string; faith:string; oath:string;
  path:'magic'|'talents'; attributes:AttributeRanks; createdAt:string
}

const STORE='brambleheart-characters-v0.01'
function loadCharacters():CharacterRecord[]{ try{return JSON.parse(localStorage.getItem(STORE)||'[]')}catch{return[]} }
const characters=ref<CharacterRecord[]>(loadCharacters())
const openIds=ref(new Set<string>())
const showForm=ref(false)
const fileInput=ref<HTMLInputElement|null>(null)
const error=ref('')
const form=reactive<{name:string;species:string;spark:string;homeland:string;faith:string;oath:string;path:'magic'|'talents';attributes:AttributeRanks}>({
  name:'',species:species[0],spark:sparks[0][0],homeland:homelands[0].name,faith:faiths[0],oath:oaths[0][0],path:'magic',attributes:Object.fromEntries(attributes.map(a=>[a.id,1])) as AttributeRanks,
})
const spent=computed(()=>Object.values(form.attributes).reduce((sum,rank)=>sum+rank-1,0))
const remaining=computed(()=>5-spent.value)
function persist(){localStorage.setItem(STORE,JSON.stringify(characters.value))}
function resetForm(){form.name='';form.species=species[0];form.spark=sparks[0][0];form.homeland=homelands[0].name;form.faith=faiths[0];form.oath=oaths[0][0];form.path='magic';attributes.forEach(a=>form.attributes[a.id]=1);error.value=''}
function adjust(id:AttributeId,delta:number){const current=form.attributes[id];if(delta>0&&(current>=3||remaining.value<=0))return;if(delta<0&&current<=1)return;form.attributes[id]+=delta}
function saveCharacter(){error.value='';if(!form.name.trim()){error.value='Enter a character name.';return}if(remaining.value!==0){error.value='Spend all 5 attribute points before saving.';return}characters.value.unshift({id:crypto.randomUUID(),name:form.name.trim(),species:form.species,spark:form.spark,homeland:form.homeland,faith:form.faith,oath:form.oath,path:form.path,attributes:{...form.attributes},createdAt:new Date().toISOString()});persist();showForm.value=false;resetForm()}
function toggle(id:string){const next=new Set(openIds.value);next.has(id)?next.delete(id):next.add(id);openIds.value=next}
function removeCharacter(id:string){if(!confirm('Delete this character from this device?'))return;characters.value=characters.value.filter(c=>c.id!==id);persist()}
function downloadCharacter(character:CharacterRecord){const blob=new Blob([JSON.stringify({format:'brambleheart-character',version:'0.01',character},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`${character.name.replace(/[^a-z0-9]+/gi,'-').toLowerCase()||'character'}.bramble.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
async function importCharacter(event:Event){const input=event.target as HTMLInputElement;const file=input.files?.[0];if(!file)return;try{const parsed=JSON.parse(await file.text());const raw=parsed.character??parsed;if(!raw?.name||!raw?.attributes)throw new Error('Invalid Brambleheart character JSON.');characters.value.unshift({...raw,id:crypto.randomUUID(),createdAt:new Date().toISOString()});persist()}catch(e){alert(e instanceof Error?e.message:'Could not import this character.')}input.value=''}
function homelandSkills(name:string){return homelands.find(h=>h.name===name)?.skills.join(' · ')||'—'}
function sparkWords(name:string){return sparks.find(s=>s[0]===name)?.[1]||'—'}
</script>

<template>
  <main class="page home-page">
    <AppHeader />

    <div class="page-title-block">
      <p class="eyebrow">CHARACTERS</p>
      <h1>Character List</h1>
      <p>Create, import, and manage Brambleheart characters on this device.</p>
    </div>

    <section class="list-launch card-surface">
      <div class="list-launch-copy"><strong>My Characters</strong><p>{{ characters.length ? `${characters.length} saved character${characters.length===1?'':'s'}.` : 'No saved characters yet.' }}</p></div>
      <div class="list-launch-actions">
        <button class="primary-button" type="button" @click="showForm=true">Create a character</button>
        <button class="secondary-button" type="button" @click="fileInput?.click()">Import character</button>
        <input ref="fileInput" class="file-import-input" type="file" accept="application/json,.json" @change="importCharacter" />
      </div>
    </section>

    <section v-if="showForm" class="form-card character-form-card">
      <div class="form-card-heading">
        <div><p class="eyebrow">NEW CHARACTER</p><h2>Create Character</h2></div>
        <button class="icon-button" type="button" aria-label="Close character form" @click="showForm=false;resetForm()">×</button>
      </div>
      <div class="field-grid two">
        <label><span>Name</span><input v-model="form.name" class="field-control" placeholder="Character name" /></label>
        <label><span>Species</span><select v-model="form.species" class="field-control"><option v-for="item in species" :key="item">{{ item }}</option></select></label>
        <label><span>Spark</span><select v-model="form.spark" class="field-control"><option v-for="item in sparks" :key="item[0]" :value="item[0]">{{ item[0] }} — {{ item[1] }}</option></select></label>
        <label><span>Homeland</span><select v-model="form.homeland" class="field-control"><option v-for="item in homelands" :key="item.name">{{ item.name }}</option></select></label>
        <label><span>Faith</span><select v-model="form.faith" class="field-control"><option v-for="item in faiths" :key="item">{{ item }}</option></select></label>
        <label><span>Oath</span><select v-model="form.oath" class="field-control"><option v-for="item in oaths" :key="item[0]" :value="item[0]">{{ item[0] }} — {{ item[1] }}</option></select></label>
      </div>

      <div class="subsection-title"><strong>Attributes</strong><span>{{ remaining }} points remaining</span></div>
      <p class="form-note">Each starts at rank 1. Spend 5 points; no attribute may exceed rank 3 at creation.</p>
      <div class="attribute-editor">
        <div v-for="attribute in attributes" :key="attribute.id" class="attribute-row">
          <div><strong>{{ attribute.name }}</strong><small>{{ attribute.description }}</small></div>
          <div class="stepper"><button type="button" @click="adjust(attribute.id,-1)">−</button><span>{{ form.attributes[attribute.id] }}</span><button type="button" @click="adjust(attribute.id,1)">+</button></div>
        </div>
      </div>

      <fieldset class="choice-box"><legend>Rhythm of Body &amp; Spirit</legend><label><input v-model="form.path" type="radio" value="magic" /> Magic Level 1 + 1 Talent</label><label><input v-model="form.path" type="radio" value="talents" /> 2 Talents</label></fieldset>
      <div class="button-row end"><button class="secondary-button" type="button" @click="showForm=false;resetForm()">Cancel</button><button class="primary-button" type="button" @click="saveCharacter">Save Character</button></div>
      <p v-if="error" class="error-text">{{ error }}</p>
    </section>

    <section v-if="characters.length" class="saved-list-stack character-list-stack">
      <article v-for="character in characters" :key="character.id" class="saved-list-card card-surface character-card">
        <button class="saved-list-open-area character-open-area" type="button" @click="toggle(character.id)">
          <div><strong>{{ character.name }}</strong><div class="saved-list-labels"><span class="app-option-label">{{ character.species }}</span><span class="app-option-label">{{ character.spark }}</span><span class="app-option-label">{{ character.homeland }}</span></div></div>
          <div class="saved-list-card-meta"><strong>{{ character.path==='magic'?'Magic 1 · 1 Talent':'2 Talents' }}</strong><small>{{ sparkWords(character.spark) }}</small></div>
        </button>
        <div v-if="openIds.has(character.id)" class="character-detail-panel">
          <div class="stat-grid character-stat-grid"><div v-for="attribute in attributes" :key="attribute.id" class="character-stat"><strong>{{ character.attributes[attribute.id] }}</strong><span>{{ attribute.name.slice(0,3).toUpperCase() }}</span></div></div>
          <div class="detail-grid"><div><span>Faith</span><strong>{{ character.faith }}</strong></div><div><span>Oath</span><strong>{{ character.oath }}</strong></div><div><span>Starting Skills</span><strong>{{ homelandSkills(character.homeland) }}</strong></div><div><span>Starting Wealth</span><strong>50 sp + Adventure Kit</strong></div></div>
          <div class="info-card character-derived"><strong>Derived values</strong><p>Mettle {{ character.attributes.might*2 }} · Ward {{ character.attributes.hide*2 }} · Control {{ character.attributes.lore*2 }} · Power {{ character.attributes.might }} · Guts {{ character.attributes.hide }}. Speed remains unresolved while the current source chapters differ between Agility and Prowess.</p></div>
          <div class="button-row end"><button class="secondary-button" type="button" @click="downloadCharacter(character)">Export JSON</button><button class="danger-button" type="button" @click="removeCharacter(character.id)">Delete</button></div>
        </div>
      </article>
    </section>

    <section v-else class="empty-state card-surface compact-empty lists-empty-state">
      <div class="empty-icon">◆</div><h2>Your characters will appear here</h2><p>Characters are saved automatically on this device after creation or import.</p>
    </section>
  </main>
</template>
