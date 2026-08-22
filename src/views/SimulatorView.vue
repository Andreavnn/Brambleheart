<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { passiveTargets } from '../data/bramble'
import { skillDefinitions } from '../data/characterOptions'
import { rhythmResult } from '../rules/rulesEngine'
import { loadCharacters, type CharacterRecord } from '../services/characters'
import { createEncounterRecord, encounterSort, loadEncounters, writeEncounters, type EncounterRecord } from '../services/encounters'

type RhythmMode='normal'|'edged'|'weighted'
type TargetMode='none'|'passive'|'active'
type RhythmResultValue=ReturnType<typeof rhythmResult>
interface RhythmHistoryEntry{id:string;createdAt:string;rollType:string;mode:RhythmMode;stat:number;skillName:string;skillBonus:number;conditions:number;target:number|null;targetLabel:string;result:RhythmResultValue;fortunes:number;misfortunes:number}
const RHYTHM_STORE='brambleheart-simulator-rhythm-v0.05'
const router=useRouter()
function die(){const a=new Uint32Array(1);crypto.getRandomValues(a);return(a[0]%10)+1}
function dice(count:number){return Array.from({length:count},die)}
function readStore<T>(key:string,fallback:T):T{try{return JSON.parse(localStorage.getItem(key)||'') as T}catch{return fallback}}
function writeStore(key:string,value:unknown){localStorage.setItem(key,JSON.stringify(value))}
function stamp(){return new Date().toISOString()}
function formatTime(value:string){return new Date(value).toLocaleTimeString([],{hour:'numeric',minute:'2-digit'})}
function normalizeSkillName(name:string){return String(name||'').replace(/\s*\([^)]*\)\s*/g,' ').replace(/\s+/g,' ').trim()}

const rollTypes=['Attribute Check','Skill Check','Attribute Save','Initiative','Strike','Ward','Compelled','Role-Play','Other'] as const
const rollType=ref<(typeof rollTypes)[number]>('Attribute Check')
const rhythmMode=ref<RhythmMode>('normal')
const rhythmStat=ref(0),rhythmSkillBonus=ref(0),rhythmConditions=ref(0)
const rhythmSkill=ref('')
const targetMode=ref<TargetMode>('none'),passiveTarget=ref(18),activeTarget=ref<number|null>(null)
const rhythmHistory=ref<RhythmHistoryEntry[]>(readStore<RhythmHistoryEntry[]>(RHYTHM_STORE,[]).slice(0,5))
const characters=ref<CharacterRecord[]>(loadCharacters().filter(character=>!character.draft))
const attributeCharacterId=ref('')
const attributeCharacter=computed(()=>attributeCharacterId.value?characters.value.find(character=>character.id===attributeCharacterId.value)||null:null)
const attributeCharacterStat=ref('agility')

function rank(c:CharacterRecord,key:'agility'|'might'|'hide'|'lore'|'bravery'){return Number(c.attributes?.[key]||0)}
const allCharacterStats=computed(()=>{
  const c=attributeCharacter.value;if(!c)return[] as Array<{key:string;label:string;value:number;attribute:string}>
  return[
    {key:'agility',label:'Agility',value:rank(c,'agility')*2,attribute:'Agility'},
    {key:'might',label:'Might',value:rank(c,'might')*2,attribute:'Might'},
    {key:'hide',label:'Hide',value:rank(c,'hide')*2,attribute:'Hide'},
    {key:'lore',label:'Lore',value:rank(c,'lore')*2,attribute:'Lore'},
    {key:'bravery',label:'Bravery',value:rank(c,'bravery')*2,attribute:'Bravery'},
    {key:'speed',label:'Speed',value:2+rank(c,'agility'),attribute:'Agility'},
    {key:'aim',label:'Aim',value:rank(c,'agility')*2,attribute:'Agility'},
    {key:'mettle',label:'Mettle',value:rank(c,'might')*2,attribute:'Might'},
    {key:'ward',label:'Ward',value:rank(c,'hide')*2,attribute:'Hide'},
    {key:'control',label:'Control',value:rank(c,'lore')*2,attribute:'Lore'},
    {key:'power',label:'Power',value:rank(c,'might'),attribute:'Might'},
    {key:'guts',label:'Guts',value:rank(c,'hide'),attribute:'Hide'},
  ]
})
function allowedStatKeys(type:string){
  if(type==='Initiative')return['speed']
  if(type==='Strike')return['mettle','aim','control']
  if(type==='Ward')return['ward']
  if(['Attribute Check','Attribute Save','Compelled'].includes(type))return['agility','might','hide','lore','bravery']
  if(['Skill Check','Role-Play'].includes(type))return['agility','might','hide','lore','bravery']
  return allCharacterStats.value.map(item=>item.key)
}
const attributeStatOptions=computed(()=>{const allowed=new Set(allowedStatKeys(rollType.value));return allCharacterStats.value.filter(item=>allowed.has(item.key))})
const selectedStat=computed(()=>attributeStatOptions.value.find(item=>item.key===attributeCharacterStat.value)||attributeStatOptions.value[0]||null)
const characterSkillOptions=computed(()=>{
  const c=attributeCharacter.value,stat=selectedStat.value;if(!c||!stat)return[] as Array<{name:string;rank:number}>
  return Object.entries(c.skillRanks||{}).map(([name,rank])=>({name:normalizeSkillName(name),rank:Number(rank)})).filter(entry=>{
    const def=skillDefinitions.find(item=>normalizeSkillName(item.name)===entry.name)
    return !def||def.attribute===stat.attribute
  }).sort((a,b)=>a.name.localeCompare(b.name))
})
const statFieldLabel=computed(()=>rollType.value==='Strike'?'Strike Stat':rollType.value==='Ward'?'Ward Stat':rollType.value==='Initiative'?'Initiative Stat':rollType.value==='Attribute Save'?'Save Attribute':rollType.value==='Skill Check'?'Skill Attribute':'Character Stat')
const skillFieldLabel=computed(()=>selectedStat.value?`${selectedStat.value.attribute} Skill`:'Character Skill')
watch([rollType,attributeCharacterId],()=>{const first=attributeStatOptions.value[0];attributeCharacterStat.value=first?.key||'agility';rhythmSkill.value=''},{immediate:true})
watch(attributeCharacterStat,()=>{rhythmSkill.value='';if(attributeCharacter.value)rhythmStat.value=selectedStat.value?.value||0},{immediate:true})
watch(rhythmSkill,()=>{if(attributeCharacter.value){const entry=characterSkillOptions.value.find(item=>item.name===rhythmSkill.value);rhythmSkillBonus.value=(entry?.rank||0)*2}})
const effectiveRhythmStat=computed(()=>attributeCharacter.value?Number(selectedStat.value?.value||0):Number(rhythmStat.value||0))
const rhythmCombinedStat=computed(()=>effectiveRhythmStat.value+Number(rhythmSkillBonus.value||0))
const currentTarget=computed(()=>targetMode.value==='passive'?Number(passiveTarget.value):targetMode.value==='active'&&activeTarget.value!==null?Number(activeTarget.value):null)
function targetLabel(){if(targetMode.value==='active')return'Active Target';if(targetMode.value==='passive')return passiveTargets.find(([,value])=>value===Number(passiveTarget.value))?.[0]||'Passive Target';return'No Target'}
function rollAttributeCheck(){const result=rhythmResult(dice(rhythmMode.value==='normal'?3:4),rhythmMode.value,rhythmCombinedStat.value,rhythmConditions.value);const kept=result.kept||result.rolled;const entry:RhythmHistoryEntry={id:crypto.randomUUID(),createdAt:stamp(),rollType:rollType.value,mode:rhythmMode.value,stat:effectiveRhythmStat.value,skillName:rhythmSkill.value,skillBonus:Number(rhythmSkillBonus.value||0),conditions:Number(rhythmConditions.value||0),target:currentTarget.value,targetLabel:targetLabel(),result,fortunes:kept.filter(value=>value>=8).length,misfortunes:kept.filter(value=>value<=2).length};rhythmHistory.value=[entry,...rhythmHistory.value].slice(0,5);writeStore(RHYTHM_STORE,rhythmHistory.value)}
function rollOutcome(entry:RhythmHistoryEntry){if(entry.target===null)return'';return entry.result.total>=entry.target?'SUCCESS':'FAILURE'}

const encounters=ref<EncounterRecord[]>(loadEncounters())
const encounterName=ref(''),newEncounterCharacterId=ref(''),encounterStartError=ref('')
const ongoingEncounters=computed(()=>encounters.value.filter(item=>item.status==='ongoing').sort(encounterSort))
const encounterHistory=computed(()=>encounters.value.filter(item=>item.status==='completed').sort(encounterSort))
function characterName(id:string){return characters.value.find(character=>character.id===id)?.name||'Character unavailable'}
function persist(){writeEncounters(encounters.value)}
function newEncounter(){encounterStartError.value='';const character=characters.value.find(item=>item.id===newEncounterCharacterId.value);if(!character){encounterStartError.value='Select a saved character before starting a Combat Encounter.';return}const record=createEncounterRecord(character,encounterName.value,encounters.value.length);encounters.value=[record,...encounters.value];persist();void router.push(`/simulator/encounters/${record.id}`)}
function togglePin(id:string){const item=encounters.value.find(entry=>entry.id===id);if(!item)return;item.pinned=!item.pinned;item.updatedAt=stamp();persist()}
function complete(id:string){const item=encounters.value.find(entry=>entry.id===id);if(!item)return;item.status='completed';item.updatedAt=stamp();persist()}
function reopen(id:string){const item=encounters.value.find(entry=>entry.id===id);if(!item)return;item.status='ongoing';item.updatedAt=stamp();persist();void router.push(`/simulator/encounters/${id}`)}
function remove(id:string){if(!confirm('Delete this encounter and its local history?'))return;encounters.value=encounters.value.filter(entry=>entry.id!==id);persist()}
</script>

<template>
  <main class="page simulator-page rhythm-engine-page">
    <AppHeader />
    <div class="page-title-block"><p class="eyebrow">RHYTHM ENGINE</p><h1>Rhythm Engine</h1><p>Make focused Attribute Checks and open Combat Encounters as dedicated encounter pages.</p></div>

    <section class="tool-panel card-surface rhythm-tool-card">
      <div class="tool-heading"><div><p class="eyebrow">ATTRIBUTE CHECK</p><h2>3d10 + Stat + Skill</h2></div></div>
      <p class="tool-explainer">Choose a character, then narrow the roll from Roll Type to the appropriate Character Stat and finally to Skills governed by that Stat. You can still roll manually without selecting a character.</p>
      <aside class="fortune-tip"><strong>Fortune &amp; Misfortune</strong><span>Natural kept dice of 8–10 create Fortune results and natural kept dice of 1–2 create Misfortune results. Fortune represents an advantageous twist and may create a +1 Condition where the rule allows; Misfortune represents a complication and may create a −1 Condition. These results are read from the natural dice before ordinary Conditions are added.</span></aside>
      <label class="field-label attribute-character-picker">Character<select v-model="attributeCharacterId" class="field-control"><option value="">Manual / No Character</option><option v-for="character in characters" :key="character.id" :value="character.id">{{ character.name }} — {{ character.species }}</option></select></label>

      <div class="rhythm-dependent-grid">
        <label class="field-label">Roll Type<select v-model="rollType" class="field-control"><option v-for="option in rollTypes" :key="option">{{ option }}</option></select></label>
        <label class="field-label">{{ statFieldLabel }}<select v-if="attributeCharacter" v-model="attributeCharacterStat" class="field-control"><option v-for="stat in attributeStatOptions" :key="stat.key" :value="stat.key">{{ stat.label }} — +{{ stat.value }}</option></select><input v-else v-model.number="rhythmStat" class="field-control" type="number" /></label>
        <label class="field-label">{{ skillFieldLabel }}<select v-if="attributeCharacter" v-model="rhythmSkill" class="field-control"><option value="">No Skill</option><option v-for="skill in characterSkillOptions" :key="skill.name" :value="skill.name">{{ skill.name }} — Rank {{ skill.rank }} / +{{ skill.rank*2 }}</option></select><input v-else v-model.number="rhythmSkillBonus" class="field-control" type="number" placeholder="Skill Bonus" /></label>
      </div>
      <div class="rhythm-compact-values">
        <label class="field-label">Roll Style<select v-model="rhythmMode" class="field-control"><option value="normal">Normal — 3d10</option><option value="edged">Edged — 4d10, Drop Lowest</option><option value="weighted">Weighted — 4d10, Drop Highest</option></select></label>
        <label class="field-label">Conditions<input v-model.number="rhythmConditions" class="field-control" type="number" /></label>
        <label class="field-label">Target Type<select v-model="targetMode" class="field-control"><option value="none">No Target</option><option value="passive">Passive</option><option value="active">Active</option></select></label>
      </div>
      <label v-if="targetMode==='passive'" class="field-label target-value-field">Passive Target<select v-model.number="passiveTarget" class="field-control"><option v-for="target in passiveTargets" :key="target[0]" :value="target[1]">{{ target[0] }} — {{ target[1] }}</option></select></label>
      <label v-else-if="targetMode==='active'" class="field-label target-value-field">Active Target<input v-model.number="activeTarget" class="field-control" type="number" min="0" placeholder="Enter Target" /></label>
      <div class="sim-stat-total"><span>Combined Bonus</span><strong>{{ rhythmCombinedStat }}</strong><small>Stat + Skill</small></div>
      <button class="primary-button wide" @click="rollAttributeCheck">Roll Attribute Check</button>
      <div class="sim-history-heading"><div><strong>Recent Rolls</strong><small>The latest five rolls are kept on this device.</small></div></div>
      <div v-if="rhythmHistory.length" class="rhythm-history-list"><article v-for="(entry,index) in rhythmHistory" :key="entry.id" class="result-panel rhythm-history-entry" :class="{latest:index===0}"><div class="result-meta"><span>{{ formatTime(entry.createdAt) }}</span><span>{{ entry.rollType }}</span><span>{{ entry.mode }}</span><span v-if="entry.target!==null">{{ entry.targetLabel }} {{ entry.target }}</span></div><div class="dice-row"><span v-for="(value,dieIndex) in entry.result.rolled" :key="dieIndex" class="die" :class="{fortune:value>=8,misfortune:value<=2}">{{ value }}</span></div><div class="result-summary"><strong class="result-total">{{ entry.result.total }}</strong><span v-if="entry.target!==null" class="outcome" :class="entry.result.total>=entry.target?'pass':'fail'">{{ rollOutcome(entry) }}</span></div><div v-if="entry.fortunes||entry.misfortunes" class="special-result-row"><span v-if="entry.fortunes" class="special-result fortune-result">Fortune ×{{ entry.fortunes }}</span><span v-if="entry.misfortunes" class="special-result misfortune-result">Misfortune ×{{ entry.misfortunes }}</span></div><small>{{ entry.result.natural }} natural + {{ entry.stat }} Stat<template v-if="entry.skillName"> + {{ entry.skillBonus }} {{ entry.skillName }}</template> {{ entry.conditions>=0?'+':'−' }} {{ Math.abs(entry.conditions) }} Conditions</small></article></div>
      <div v-else class="empty-inline sim-empty-inline">No rolls yet.</div>
    </section>

    <section class="tool-panel card-surface encounter-start-section">
      <div class="tool-heading"><div><p class="eyebrow">COMBAT ENCOUNTERS</p><h2>Start Encounter</h2></div></div>
      <p class="tool-explainer">Combat Encounters now open as dedicated pages. Select a saved character before starting; the encounter carries that character’s combat statistics, Mana, Talents, and Spells with it.</p>
      <div class="encounter-create-grid"><input v-model="encounterName" class="field-control" placeholder="Encounter Name" /><select v-model="newEncounterCharacterId" class="field-control"><option value="">Choose a Character</option><option v-for="character in characters" :key="character.id" :value="character.id">{{ character.name }} — {{ character.species }}</option></select><button class="primary-button" type="button" @click="newEncounter">Start Encounter</button></div>
      <p v-if="encounterStartError" class="creation-status-message">{{ encounterStartError }}</p>
    </section>

    <section class="tool-panel card-surface encounter-list-section"><div class="tool-heading"><div><p class="eyebrow">ONGOING</p><h2>Ongoing Encounters</h2></div></div><div v-if="!ongoingEncounters.length" class="empty-inline">No ongoing encounters.</div><div v-else class="sim-list-body standalone-list-body"><article v-for="encounter in ongoingEncounters" :key="encounter.id" class="sim-record-row"><RouterLink class="sim-record-main encounter-list-row-link" :to="`/simulator/encounters/${encounter.id}`"><strong>{{ encounter.name }}</strong><small>{{ characterName(encounter.characterId) }} · Round {{ encounter.round }} · Health {{ encounter.health }} · Fate {{ encounter.fateMarks }}/3</small></RouterLink><div class="sim-record-actions"><button class="pin-button" :class="{pinned:encounter.pinned}" @click="togglePin(encounter.id)">⌖</button><button class="secondary-button compact-action" @click="complete(encounter.id)">Complete</button><button class="icon-button compact-icon" @click="remove(encounter.id)">×</button></div></article></div></section>
    <section class="tool-panel card-surface encounter-list-section"><div class="tool-heading"><div><p class="eyebrow">HISTORY</p><h2>Encounter History</h2></div></div><div v-if="!encounterHistory.length" class="empty-inline">Completed encounters will appear here.</div><div v-else class="sim-list-body standalone-list-body"><article v-for="encounter in encounterHistory" :key="encounter.id" class="sim-record-row"><RouterLink class="sim-record-main encounter-list-row-link" :to="`/simulator/encounters/${encounter.id}`"><strong>{{ encounter.name }}</strong><small>{{ characterName(encounter.characterId) }} · Completed · Round {{ encounter.round }}</small></RouterLink><div class="sim-record-actions"><button class="secondary-button compact-action" @click="reopen(encounter.id)">Reopen</button><button class="icon-button compact-icon" @click="remove(encounter.id)">×</button></div></article></div></section>
  </main>
</template>

<style scoped>
.fortune-tip{display:grid;gap:4px;margin:12px 0;padding:10px 12px;border:1px solid var(--line);border-left:5px solid var(--accent);border-radius:9px;background:var(--paper-2)}.fortune-tip strong{font-family:Georgia,'Times New Roman',serif}.fortune-tip span{color:var(--ink-soft);line-height:1.5}.attribute-character-picker{margin-bottom:9px}.target-value-field{display:block;margin-top:8px}.encounter-create-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr) auto;gap:8px}.encounter-list-section{margin-top:12px}@media(max-width:760px){.encounter-create-grid{grid-template-columns:1fr}}
</style>
