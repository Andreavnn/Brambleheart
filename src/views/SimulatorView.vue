<script setup lang="ts">
import { computed, ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import { damageResult, healthPenalty, opposedResult, rhythmResult } from '../rules/rulesEngine'
import { passiveTargets } from '../data/bramble'
import { skillDefinitions } from '../data/characterOptions'

 type RhythmMode='normal'|'edged'|'weighted'
type TargetMode='none'|'passive'|'active'
type RhythmResultValue=ReturnType<typeof rhythmResult>
interface RhythmHistoryEntry{
  id:string;createdAt:string;rollType:string;mode:RhythmMode;stat:number;skillName:string;skillBonus:number;conditions:number;target:number|null;targetLabel:string;result:RhythmResultValue;fortunes:number;misfortunes:number
}
interface EncounterRecord{
  id:string;name:string;status:'ongoing'|'completed';pinned:boolean;round:number;health:number;fateMarks:number;mana:number;createdAt:string;updatedAt:string;lastResult?:string;events:string[]
}

const RHYTHM_STORE='brambleheart-simulator-rhythm-v0.05'
const ENCOUNTER_STORE='brambleheart-simulator-encounters-v0.05'
const tab=ref<'attribute'|'combat'>('attribute')
function die(){const a=new Uint32Array(1);crypto.getRandomValues(a);return(a[0]%10)+1}
function dice(count:number){return Array.from({length:count},die)}
function readStore<T>(key:string,fallback:T):T{try{return JSON.parse(localStorage.getItem(key)||'') as T}catch{return fallback}}
function writeStore(key:string,value:unknown){localStorage.setItem(key,JSON.stringify(value))}
function makeId(){return crypto.randomUUID()}
function stamp(){return new Date().toISOString()}
function formatTime(value:string){return new Date(value).toLocaleTimeString([],{hour:'numeric',minute:'2-digit'})}

const rollTypes=['Attribute Check','Skill Check','Attribute Save','Initiative','Strike','Ward','Compelled','Role-Play','Other'] as const
const rollType=ref<(typeof rollTypes)[number]>('Attribute Check')
const rhythmMode=ref<RhythmMode>('normal')
const rhythmStat=ref(0)
const rhythmSkill=ref('')
const rhythmSkillBonus=ref(0)
const rhythmConditions=ref(0)
const targetMode=ref<TargetMode>('none')
const passiveTarget=ref(18)
const activeTarget=ref<number|null>(null)
const rhythmHistory=ref<RhythmHistoryEntry[]>(readStore<RhythmHistoryEntry[]>(RHYTHM_STORE,[]).slice(0,5))
const rhythmCombinedStat=computed(()=>Number(rhythmStat.value||0)+Number(rhythmSkillBonus.value||0))
const currentTarget=computed(()=>targetMode.value==='passive'?Number(passiveTarget.value):targetMode.value==='active'&&activeTarget.value!==null?Number(activeTarget.value):null)
function targetLabel(){if(targetMode.value==='active')return'Active Target';if(targetMode.value==='passive')return passiveTargets.find(([,value])=>value===Number(passiveTarget.value))?.[0]||'Passive Target';return'No Target'}
function rollAttributeCheck(){
  const result=rhythmResult(dice(rhythmMode.value==='normal'?3:4),rhythmMode.value,rhythmCombinedStat.value,rhythmConditions.value)
  const kept=result.kept||result.rolled
  const entry:RhythmHistoryEntry={id:makeId(),createdAt:stamp(),rollType:rollType.value,mode:rhythmMode.value,stat:Number(rhythmStat.value||0),skillName:rhythmSkill.value,skillBonus:Number(rhythmSkillBonus.value||0),conditions:Number(rhythmConditions.value||0),target:currentTarget.value,targetLabel:targetLabel(),result,fortunes:kept.filter(value=>value>=8).length,misfortunes:kept.filter(value=>value<=2).length}
  rhythmHistory.value=[entry,...rhythmHistory.value].slice(0,5);writeStore(RHYTHM_STORE,rhythmHistory.value)
}
function rollOutcome(entry:RhythmHistoryEntry){if(entry.target===null)return'';return entry.result.total>=entry.target?'SUCCESS':'FAILURE'}

const rawEncounters=readStore<EncounterRecord[]>(ENCOUNTER_STORE,[]).map(item=>({...item,health:Number(item.health??30),fateMarks:Number(item.fateMarks??0),mana:Number(item.mana??2),events:Array.isArray(item.events)?item.events:[]}))
const encounters=ref<EncounterRecord[]>(rawEncounters)
const encounterName=ref('')
const activeEncounterId=ref<string|null>(encounters.value.find(item=>item.status==='ongoing')?.id||null)
const activeEncounter=computed(()=>encounters.value.find(item=>item.id===activeEncounterId.value)||null)
function sortRecords(a:EncounterRecord,b:EncounterRecord){if(a.pinned!==b.pinned)return a.pinned?-1:1;return b.updatedAt.localeCompare(a.updatedAt)}
const ongoingEncounters=computed(()=>encounters.value.filter(item=>item.status==='ongoing').sort(sortRecords))
const encounterHistory=computed(()=>encounters.value.filter(item=>item.status==='completed').sort(sortRecords))
function persistEncounters(){writeStore(ENCOUNTER_STORE,encounters.value)}
function addEvent(text:string){const item=activeEncounter.value;if(!item)return;item.events=[`${new Date().toLocaleTimeString([],{hour:'numeric',minute:'2-digit'})} — ${text}`,...item.events].slice(0,30);item.lastResult=text;item.updatedAt=stamp();persistEncounters()}
function newEncounter(){const name=encounterName.value.trim()||`Encounter ${encounters.value.length+1}`;const now=stamp();const record:EncounterRecord={id:makeId(),name,status:'ongoing',pinned:false,round:1,health:30,fateMarks:0,mana:2,createdAt:now,updatedAt:now,events:[]};encounters.value=[record,...encounters.value];activeEncounterId.value=record.id;encounterName.value='';persistEncounters()}
function selectEncounter(id:string){activeEncounterId.value=id}
function toggleEncounterPin(id:string){const item=encounters.value.find(e=>e.id===id);if(!item)return;item.pinned=!item.pinned;item.updatedAt=stamp();persistEncounters()}
function changeRound(delta:number){const item=activeEncounter.value;if(!item)return;item.round=Math.max(1,item.round+delta);item.updatedAt=stamp();persistEncounters()}
function completeEncounter(id:string){const item=encounters.value.find(e=>e.id===id);if(!item)return;item.status='completed';item.updatedAt=stamp();persistEncounters();if(activeEncounterId.value===id)activeEncounterId.value=ongoingEncounters.value.find(e=>e.id!==id)?.id||null}
function reopenEncounter(id:string){const item=encounters.value.find(e=>e.id===id);if(!item)return;item.status='ongoing';item.updatedAt=stamp();activeEncounterId.value=id;persistEncounters()}
function deleteEncounter(id:string){if(!confirm('Delete this encounter and its local history?'))return;encounters.value=encounters.value.filter(e=>e.id!==id);if(activeEncounterId.value===id)activeEncounterId.value=ongoingEncounters.value[0]?.id||null;persistEncounters()}

const encounterHealth=computed({get:()=>activeEncounter.value?.health??30,set:(value:number)=>{const item=activeEncounter.value;if(!item)return;const before=item.health;item.health=Math.max(0,Number(value||0));if(before<=0&&item.health>0)item.fateMarks=0;item.updatedAt=stamp();persistEncounters()}})
const encounterFateMarks=computed({get:()=>activeEncounter.value?.fateMarks??0,set:(value:number)=>{const item=activeEncounter.value;if(!item)return;item.fateMarks=Math.max(0,Math.min(3,Number(value||0)));item.updatedAt=stamp();persistEncounters()}})
const encounterMana=computed({get:()=>activeEncounter.value?.mana??2,set:(value:number)=>{const item=activeEncounter.value;if(!item)return;item.mana=Math.max(0,Number(value||0));item.updatedAt=stamp();persistEncounters()}})
const healthPenaltyValue=computed(()=>healthPenalty(encounterHealth.value))

const strikeStat=ref(0),strikeCond=ref(0),wardStat=ref(0),wardCond=ref(0)
const combatResult=ref<ReturnType<typeof opposedResult>|null>(null)
function rollCombat(){combatResult.value=opposedResult(dice(3),strikeStat.value,strikeCond.value,dice(3),wardStat.value,wardCond.value);addEvent(`${combatResult.value.hit?'Hit':'Miss'} — Strike ${combatResult.value.strike.total}, Ward ${combatResult.value.ward.total}`)}

const damage=ref(8),damageType=ref<'standard'|'direct'|'lethal'>('standard'),hide=ref(1),equipment=ref(0),damageCond=ref(0)
const damageCalc=computed(()=>damageResult(damage.value,damageType.value,hide.value,equipment.value,damageCond.value))
function applyDamage(){if(!activeEncounter.value)return;encounterHealth.value=Math.max(0,encounterHealth.value-damageCalc.value.suffered);addEvent(`${damageCalc.value.suffered} ${damageType.value} damage suffered; Health ${encounterHealth.value}.`)}
const hallows=ref<number|null>(null)
function rollHallows(){hallows.value=die();if(hallows.value>=6)addEvent(`Hallows ${hallows.value}: pass.`);else{encounterFateMarks.value=Math.min(3,encounterFateMarks.value+1);addEvent(`Hallows ${hallows.value}: fail; Fate Mark ${encounterFateMarks.value}/3.`)}}

const spellName=ref(''),spellBaseCost=ref(0),spellAttuned=ref(false),spellAdjustment=ref(0)
const spellEffectiveCost=computed(()=>Math.max(0,Number(spellBaseCost.value||0)-(spellAttuned.value?2:0)+Number(spellAdjustment.value||0)))
function recordSpell(){if(!activeEncounter.value||!spellName.value.trim())return;if(spellEffectiveCost.value>encounterMana.value){alert('The active encounter does not have enough Mana for this recorded cost.');return}encounterMana.value-=spellEffectiveCost.value;addEvent(`Cast ${spellName.value.trim()} for ${spellEffectiveCost.value} Mana; ${encounterMana.value} Mana remaining.`)}
</script>

<template>
  <main class="page simulator-page rhythm-engine-page">
    <AppHeader />
    <div class="page-title-block"><p class="eyebrow">RHYTHM ENGINE</p><h1>Rhythm Engine</h1><p>Make Attribute Checks and manage Combat Encounters using Brambleheart's core roll language.</p></div>

    <div class="segment-tabs simulator-tabs">
      <button class="segment-tab" :class="{active:tab==='attribute'}" @click="tab='attribute'">Attribute Check</button>
      <button class="segment-tab" :class="{active:tab==='combat'}" @click="tab='combat'">Combat Encounter</button>
    </div>

    <section v-if="tab==='attribute'" class="tool-panel card-surface rhythm-tool-card">
      <div class="tool-heading"><div><p class="eyebrow">ATTRIBUTE CHECK</p><h2>3d10 + Stat + Skill</h2></div></div>
      <p class="tool-explainer">Choose what kind of roll is being made, then add the Attribute or secondary Stat required by the rule. If a Skill applies, choose it and enter its Skill Bonus separately. Edged adds a fourth die and drops the lowest; Weighted adds a fourth die and drops the highest.</p>

      <div class="field-grid two attribute-check-row">
        <label><span>Roll Type</span><select v-model="rollType" class="field-control"><option v-for="option in rollTypes" :key="option">{{ option }}</option></select></label>
        <label><span>Weighted / Edged</span><select v-model="rhythmMode" class="field-control"><option value="normal">Normal — 3d10</option><option value="edged">Edged — 4d10, Drop Lowest</option><option value="weighted">Weighted — 4d10, Drop Highest</option></select></label>
      </div>
      <div class="field-grid three attribute-check-row">
        <label><span>Attribute / Stat</span><input v-model.number="rhythmStat" class="field-control" type="number" /></label>
        <label><span>Skill</span><select v-model="rhythmSkill" class="field-control"><option value="">No Skill</option><option v-for="skill in skillDefinitions" :key="skill.name">{{ skill.name }}</option></select></label>
        <label><span>Skill Bonus</span><input v-model.number="rhythmSkillBonus" class="field-control" type="number" :disabled="!rhythmSkill" /></label>
      </div>
      <div class="field-grid three attribute-check-row">
        <label><span>Conditions</span><input v-model.number="rhythmConditions" class="field-control" type="number" /></label>
        <label><span>Target Type</span><select v-model="targetMode" class="field-control"><option value="none">No Target</option><option value="passive">Passive</option><option value="active">Active</option></select></label>
        <label v-if="targetMode==='passive'"><span>Passive Target</span><select v-model.number="passiveTarget" class="field-control"><option v-for="target in passiveTargets" :key="target[0]" :value="target[1]">{{ target[0] }} — {{ target[1] }}</option></select></label>
        <label v-else-if="targetMode==='active'"><span>Active Target</span><input v-model.number="activeTarget" class="field-control" type="number" min="0" placeholder="Enter Target" /></label>
        <div v-else class="attribute-check-placeholder"><span>No Target</span><small>Use this when the result is being recorded without a fixed threshold.</small></div>
      </div>

      <div class="sim-stat-total"><span>Combined Bonus</span><strong>{{ rhythmCombinedStat }}</strong><small>Attribute / Stat + Skill Bonus</small></div>
      <button class="primary-button wide" @click="rollAttributeCheck">Roll Attribute Check</button>

      <div class="sim-history-heading"><div><strong>Recent Rolls</strong><small>The latest five rolls are kept on this device.</small></div></div>
      <div v-if="rhythmHistory.length" class="rhythm-history-list">
        <article v-for="(entry,index) in rhythmHistory" :key="entry.id" class="result-panel rhythm-history-entry" :class="{latest:index===0}">
          <div class="result-meta"><span>{{ formatTime(entry.createdAt) }}</span><span>{{ entry.rollType }}</span><span>{{ entry.mode }}</span><span v-if="entry.target!==null">{{ entry.targetLabel }} {{ entry.target }}</span></div>
          <div class="dice-row"><span v-for="(value,dieIndex) in entry.result.rolled" :key="dieIndex" class="die" :class="{fortune:value>=8,misfortune:value<=2}">{{ value }}</span></div>
          <div class="result-summary"><strong class="result-total">{{ entry.result.total }}</strong><span v-if="entry.target!==null" class="outcome" :class="entry.result.total>=entry.target?'pass':'fail'">{{ rollOutcome(entry) }}</span></div>
          <div v-if="entry.fortunes||entry.misfortunes" class="special-result-row"><span v-if="entry.fortunes" class="special-result fortune-result">Fortune ×{{ entry.fortunes }}</span><span v-if="entry.misfortunes" class="special-result misfortune-result">Misfortune ×{{ entry.misfortunes }}</span></div>
          <small>{{ entry.result.natural }} natural + {{ entry.stat }} Stat<template v-if="entry.skillName"> + {{ entry.skillBonus }} {{ entry.skillName }}</template> {{ entry.conditions>=0?'+':'−' }} {{ Math.abs(entry.conditions) }} Conditions<template v-if="entry.result.dropped!==null"> · Dropped {{ entry.result.dropped }}</template></small>
        </article>
      </div>
      <div v-else class="empty-inline sim-empty-inline">No rolls yet.</div>
    </section>

    <template v-if="tab==='combat'">
      <section class="tool-panel card-surface encounter-start-section">
        <div class="tool-heading"><div><p class="eyebrow">COMBAT ENCOUNTER</p><h2>Start Encounter</h2></div></div>
        <p class="tool-explainer">Start an encounter to track its rounds, Health, Mana, Fate Marks, opposed rolls, damage, spell use, and a short local event history.</p>
        <div class="inline-create-row"><input v-model="encounterName" class="field-control" placeholder="Encounter Name" @keyup.enter="newEncounter" /><button class="primary-button" type="button" @click="newEncounter">Start Encounter</button></div>

        <div v-if="activeEncounter" class="active-encounter-tools">
          <div class="active-encounter-card"><div><span class="eyebrow">ACTIVE ENCOUNTER</span><h3>{{ activeEncounter.name }}</h3><small v-if="activeEncounter.lastResult">{{ activeEncounter.lastResult }}</small></div><div class="round-control"><button type="button" class="icon-button" @click="changeRound(-1)">−</button><span><small>ROUND</small><strong>{{ activeEncounter.round }}</strong></span><button type="button" class="icon-button" @click="changeRound(1)">+</button></div></div>

          <div class="encounter-vital-grid"><label><span>Health</span><input v-model.number="encounterHealth" class="field-control" type="number" min="0" max="30" /></label><label><span>Mana</span><input v-model.number="encounterMana" class="field-control" type="number" min="0" /></label><label><span>Fate Marks</span><input v-model.number="encounterFateMarks" class="field-control" type="number" min="0" max="3" /></label></div>

          <details class="encounter-tool-panel" open><summary>Opposed Roll — Strike vs Ward</summary><div class="encounter-tool-body"><div class="field-grid two"><label><span>Strike Stat</span><input v-model.number="strikeStat" class="field-control" type="number" /></label><label><span>Strike Conditions</span><input v-model.number="strikeCond" class="field-control" type="number" /></label><label><span>Ward Stat</span><input v-model.number="wardStat" class="field-control" type="number" /></label><label><span>Ward Conditions</span><input v-model.number="wardCond" class="field-control" type="number" /></label></div><button class="primary-button wide" @click="rollCombat">Roll Strike &amp; Ward</button><div v-if="combatResult" class="versus-grid"><div><span>STRIKE</span><strong>{{ combatResult.strike.total }}</strong><small>{{ combatResult.strike.rolled.join(' + ') }}</small></div><div class="vs">VS</div><div><span>WARD</span><strong>{{ combatResult.ward.total }}</strong><small>{{ combatResult.ward.rolled.join(' + ') }}</small></div></div><div v-if="combatResult" class="notice" :class="combatResult.hit?'good':'bad'">{{ combatResult.hit?'HIT — Strike exceeded Ward.':'MISS — Strike did not exceed Ward.' }}</div></div></details>

          <details class="encounter-tool-panel"><summary>Damage &amp; Guts</summary><div class="encounter-tool-body"><div class="field-grid three"><label><span>Incoming Damage</span><input v-model.number="damage" class="field-control" type="number" min="0" /></label><label><span>Damage Type</span><select v-model="damageType" class="field-control"><option value="standard">Standard</option><option value="direct">Direct</option><option value="lethal">Lethal</option></select></label><label><span>Hide / Base Guts</span><input v-model.number="hide" class="field-control" type="number" min="0" /></label><label><span>Equipment Guts</span><input v-model.number="equipment" class="field-control" type="number" min="0" /></label><label><span>Conditions</span><input v-model.number="damageCond" class="field-control" type="number" /></label></div><div class="metric-grid"><div><span>Effective Guts</span><strong>{{ damageCalc.guts }}</strong></div><div><span>Damage Suffered</span><strong>{{ damageCalc.suffered }}</strong></div></div><button class="secondary-button wide" @click="applyDamage">Apply Damage to Active Health</button></div></details>

          <details class="encounter-tool-panel"><summary>Health, Hallows &amp; Fate Marks</summary><div class="encounter-tool-body"><div class="metric-grid"><div><span>Health Penalty</span><strong>{{ healthPenaltyValue===null?'Defeated':healthPenaltyValue }}</strong></div><div><span>Fate Marks</span><strong>{{ encounterFateMarks }} / 3</strong></div></div><button class="secondary-button wide" @click="rollHallows">Roll 1d10 Hallows Save</button><div v-if="hallows!==null" class="notice" :class="hallows>=6?'good':'bad'">{{ hallows>=6?`PASS — ${hallows}`:`FAIL — ${hallows}; Fate Mark ${encounterFateMarks}/3.` }}</div></div></details>

          <details class="encounter-tool-panel"><summary>Spell &amp; Mana</summary><div class="encounter-tool-body"><div class="field-grid two"><label><span>Spell</span><input v-model="spellName" class="field-control" placeholder="Spell Name" /></label><label><span>Base Mana Cost</span><input v-model.number="spellBaseCost" class="field-control" type="number" min="0" /></label><label class="setting-row mini-toggle-row"><span><strong>Attuned Lore</strong><small>Apply the normal −2 Lore Attunement reduction.</small></span><input v-model="spellAttuned" type="checkbox" /></label><label><span>Other Mana Adjustment</span><input v-model.number="spellAdjustment" class="field-control" type="number" /></label></div><div class="sim-stat-total"><span>Recorded Mana Cost</span><strong>{{ spellEffectiveCost }}</strong><small>{{ encounterMana }} Mana available</small></div><button class="secondary-button wide" :disabled="!spellName.trim()||spellEffectiveCost>encounterMana" @click="recordSpell">Record Spell Use</button></div></details>

          <details v-if="activeEncounter.events.length" class="encounter-tool-panel"><summary>Encounter Log</summary><div class="encounter-log"><p v-for="(event,index) in activeEncounter.events" :key="index">{{ event }}</p></div></details>
        </div>
      </section>

      <section class="tool-panel card-surface encounter-list-section"><div class="tool-heading"><div><p class="eyebrow">ONGOING</p><h2>Ongoing Encounters</h2></div></div><div v-if="!ongoingEncounters.length" class="empty-inline">No ongoing encounters.</div><div v-else class="sim-list-body standalone-list-body"><article v-for="encounter in ongoingEncounters" :key="encounter.id" class="sim-record-row" :class="{selected:activeEncounterId===encounter.id}"><button class="sim-record-main" type="button" @click="selectEncounter(encounter.id)"><strong>{{ encounter.name }}</strong><small>Round {{ encounter.round }} · Health {{ encounter.health }} · Fate {{ encounter.fateMarks }}/3<template v-if="encounter.lastResult"> · {{ encounter.lastResult }}</template></small></button><div class="sim-record-actions"><button class="pin-button" :class="{pinned:encounter.pinned}" type="button" :aria-label="encounter.pinned?'Unpin encounter':'Pin encounter'" @click="toggleEncounterPin(encounter.id)">⌖</button><button class="secondary-button compact-action" type="button" @click="completeEncounter(encounter.id)">Complete</button><button class="icon-button compact-icon" type="button" aria-label="Delete encounter" @click="deleteEncounter(encounter.id)">×</button></div></article></div></section>

      <section class="tool-panel card-surface encounter-list-section"><div class="tool-heading"><div><p class="eyebrow">HISTORY</p><h2>Encounter History</h2></div></div><div v-if="!encounterHistory.length" class="empty-inline">Completed encounters will appear here.</div><div v-else class="sim-list-body standalone-list-body"><article v-for="encounter in encounterHistory" :key="encounter.id" class="sim-record-row"><div class="sim-record-main static"><strong>{{ encounter.name }}</strong><small>Completed · {{ new Date(encounter.updatedAt).toLocaleDateString() }} · Round {{ encounter.round }} · Fate {{ encounter.fateMarks }}/3<template v-if="encounter.lastResult"> · {{ encounter.lastResult }}</template></small></div><div class="sim-record-actions"><button class="pin-button" :class="{pinned:encounter.pinned}" type="button" :aria-label="encounter.pinned?'Unpin encounter':'Pin encounter'" @click="toggleEncounterPin(encounter.id)">⌖</button><button class="secondary-button compact-action" type="button" @click="reopenEncounter(encounter.id)">Reopen</button><button class="icon-button compact-icon" type="button" aria-label="Delete encounter" @click="deleteEncounter(encounter.id)">×</button></div></article></div></section>
    </template>
  </main>
</template>
