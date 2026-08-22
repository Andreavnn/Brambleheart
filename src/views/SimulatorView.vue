<script setup lang="ts">
import { computed, ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import { advancementCost, damageResult, healthPenalty, opposedResult, rhythmResult } from '../rules/rulesEngine'
import { passiveTargets } from '../data/bramble'

type RhythmMode = 'normal'|'edged'|'weighted'
type RhythmResultValue = ReturnType<typeof rhythmResult>
interface RhythmHistoryEntry {
  id:string
  createdAt:string
  mode:RhythmMode
  reason?:string
  baseStat?:number
  skillStat?:number
  target:number|null
  targetLabel:string
  result:RhythmResultValue
  fortunes:number
  misfortunes:number
}
interface EncounterRecord {
  id:string
  name:string
  status:'ongoing'|'completed'
  pinned:boolean
  round:number
  createdAt:string
  updatedAt:string
  lastResult?:string
}

// Keep the v0.05 keys so an upgrade does not discard a user's local histories.
const RHYTHM_STORE='brambleheart-simulator-rhythm-v0.05'
const ENCOUNTER_STORE='brambleheart-simulator-encounters-v0.05'
const tab=ref<'rhythm'|'combat'|'advancement'>('rhythm')

function die(){const a=new Uint32Array(1);crypto.getRandomValues(a);return(a[0]%10)+1}
function dice(count:number){return Array.from({length:count},die)}
function readStore<T>(key:string,fallback:T):T{try{return JSON.parse(localStorage.getItem(key)||'') as T}catch{return fallback}}
function writeStore(key:string,value:unknown){localStorage.setItem(key,JSON.stringify(value))}
function makeId(){return crypto.randomUUID()}
function stamp(){return new Date().toISOString()}

const rhythmMode=ref<RhythmMode>('normal')
const rhythmReason=ref('')
const rhythmBaseStat=ref(0)
const rhythmSkillStat=ref(0)
const rhythmConditions=ref(0)
const targetMode=ref<'none'|'passive'|'active'>('none')
const passiveTarget=ref(18)
const activeTarget=ref<number|null>(null)
const rhythmHistory=ref<RhythmHistoryEntry[]>(readStore<RhythmHistoryEntry[]>(RHYTHM_STORE,[]).slice(0,5))
const rhythmCombinedStat=computed(()=>Number(rhythmBaseStat.value||0)+Number(rhythmSkillStat.value||0))

const currentTarget=computed(()=>targetMode.value==='passive'?Number(passiveTarget.value):targetMode.value==='active'&&activeTarget.value!==null?Number(activeTarget.value):null)
function targetLabel(){
  if(targetMode.value==='active')return'Active Target'
  if(targetMode.value==='passive')return passiveTargets.find(([,value])=>value===Number(passiveTarget.value))?.[0]||'Passive Target'
  return'No Target'
}
function rollRhythm(){
  const result=rhythmResult(dice(rhythmMode.value==='normal'?3:4),rhythmMode.value,rhythmCombinedStat.value,rhythmConditions.value)
  const kept=result.kept||result.rolled
  const entry:RhythmHistoryEntry={
    id:makeId(),createdAt:stamp(),mode:rhythmMode.value,reason:rhythmReason.value.trim(),baseStat:Number(rhythmBaseStat.value||0),skillStat:Number(rhythmSkillStat.value||0),
    target:currentTarget.value,targetLabel:targetLabel(),result,
    fortunes:kept.filter(value=>value>=8).length,
    misfortunes:kept.filter(value=>value<=2).length,
  }
  rhythmHistory.value=[entry,...rhythmHistory.value].slice(0,5)
  writeStore(RHYTHM_STORE,rhythmHistory.value)
}
function clearRhythm(){
  if(!confirm('Clear the five-roll Rhythm history?'))return
  rhythmHistory.value=[];localStorage.removeItem(RHYTHM_STORE)
}
function rollOutcome(entry:RhythmHistoryEntry){if(entry.target===null)return'';return entry.result.total>=entry.target?'SUCCESS':'FAILURE'}
function formatTime(value:string){return new Date(value).toLocaleTimeString([],{hour:'numeric',minute:'2-digit'})}
function historyBaseStat(entry:RhythmHistoryEntry){return entry.baseStat??entry.result.stat??0}
function historySkillStat(entry:RhythmHistoryEntry){return entry.skillStat??0}

const encounters=ref<EncounterRecord[]>(readStore<EncounterRecord[]>(ENCOUNTER_STORE,[]))
const encounterName=ref('')
const activeEncounterId=ref<string|null>(encounters.value.find(item=>item.status==='ongoing')?.id||null)
const activeEncounter=computed(()=>encounters.value.find(item=>item.id===activeEncounterId.value)||null)
const ongoingEncounters=computed(()=>encounters.value.filter(item=>item.status==='ongoing').sort(sortRecords))
const encounterHistory=computed(()=>encounters.value.filter(item=>item.status==='completed').sort(sortRecords))
function sortRecords(a:EncounterRecord,b:EncounterRecord){if(a.pinned!==b.pinned)return a.pinned?-1:1;return b.updatedAt.localeCompare(a.updatedAt)}
function persistEncounters(){writeStore(ENCOUNTER_STORE,encounters.value)}
function newEncounter(){
  const name=encounterName.value.trim()||`Encounter ${encounters.value.length+1}`
  const now=stamp();const record:EncounterRecord={id:makeId(),name,status:'ongoing',pinned:false,round:1,createdAt:now,updatedAt:now}
  encounters.value=[record,...encounters.value];activeEncounterId.value=record.id;encounterName.value='';persistEncounters();tab.value='combat'
}
function selectEncounter(id:string){activeEncounterId.value=id}
function toggleEncounterPin(id:string){const item=encounters.value.find(e=>e.id===id);if(!item)return;item.pinned=!item.pinned;item.updatedAt=stamp();persistEncounters()}
function changeRound(delta:number){const item=activeEncounter.value;if(!item)return;item.round=Math.max(1,item.round+delta);item.updatedAt=stamp();persistEncounters()}
function completeEncounter(id:string){const item=encounters.value.find(e=>e.id===id);if(!item)return;item.status='completed';item.updatedAt=stamp();persistEncounters();if(activeEncounterId.value===id)activeEncounterId.value=ongoingEncounters.value.find(e=>e.id!==id)?.id||null}
function reopenEncounter(id:string){const item=encounters.value.find(e=>e.id===id);if(!item)return;item.status='ongoing';item.updatedAt=stamp();activeEncounterId.value=id;persistEncounters()}
function deleteEncounter(id:string){if(!confirm('Delete this encounter and its local history entry?'))return;encounters.value=encounters.value.filter(e=>e.id!==id);if(activeEncounterId.value===id)activeEncounterId.value=ongoingEncounters.value[0]?.id||null;persistEncounters()}

const strikeStat=ref(0),strikeCond=ref(0),wardStat=ref(0),wardCond=ref(0)
const combatResult=ref<ReturnType<typeof opposedResult>|null>(null)
function rollCombat(){
  combatResult.value=opposedResult(dice(3),strikeStat.value,strikeCond.value,dice(3),wardStat.value,wardCond.value)
  if(activeEncounter.value){
    activeEncounter.value.lastResult=`Round ${activeEncounter.value.round}: ${combatResult.value.hit?'Hit':'Miss'} — Strike ${combatResult.value.strike.total}, Ward ${combatResult.value.ward.total}`
    activeEncounter.value.updatedAt=stamp();persistEncounters()
  }
}
const damage=ref(8),damageType=ref<'standard'|'direct'|'lethal'>('standard'),hide=ref(1),equipment=ref(0),damageCond=ref(0)
const damageCalc=computed(()=>damageResult(damage.value,damageType.value,hide.value,equipment.value,damageCond.value))
const health=ref(30),penalty=computed(()=>healthPenalty(health.value)),hallows=ref<number|null>(null)
function rollHallows(){hallows.value=die()}
const advancementType=ref<'attribute'|'skill'|'new-skill'|'talent'|'magic'>('attribute'),currentRank=ref(1)
const xp=computed(()=>advancementCost(advancementType.value,currentRank.value))
</script>

<template>
  <main class="page simulator-page">
    <AppHeader />
    <div class="page-title-block"><p class="eyebrow">TOOLS</p><h1>Simulator</h1><p>Run Brambleheart dice, manage encounters, and check common combat and advancement calculations without changing character data.</p></div>

    <div class="segment-tabs simulator-tabs">
      <button class="segment-tab" :class="{active:tab==='rhythm'}" @click="tab='rhythm'">Rhythm Engine</button>
      <button class="segment-tab" :class="{active:tab==='combat'}" @click="tab='combat'">Combat</button>
      <button class="segment-tab" :class="{active:tab==='advancement'}" @click="tab='advancement'">Advancement</button>
    </div>

    <section v-if="tab==='rhythm'" class="tool-panel card-surface rhythm-tool-card">
      <div class="tool-heading"><div><p class="eyebrow">THE RHYTHM ENGINE</p><h2>3d10 + Stat</h2></div></div>
      <p class="tool-explainer">Most checks use three ten-sided dice plus the stat required by the rule and any conditions. When a Skill applies, enter its value separately and it is included in the roll total. Edged rolls add a fourth die and remove the lowest; weighted rolls remove the highest. Fortune and Misfortune results are shown from the natural kept dice.</p>
      <label class="field-label rhythm-reason-field">Reason for the Roll<input v-model="rhythmReason" class="field-control" type="text" maxlength="120" placeholder="Example: Selu searches the ruined shrine" /></label>
      <div class="field-grid three rhythm-input-grid">
        <label><span>Roll Type</span><select v-model="rhythmMode" class="field-control"><option value="normal">Normal — 3d10</option><option value="edged">Edged — 4d10, Drop Lowest</option><option value="weighted">Weighted — 4d10, Drop Highest</option></select></label>
        <label><span>Attribute / Secondary Stat</span><input v-model.number="rhythmBaseStat" class="field-control" type="number" /><small class="field-help">Enter the Attribute rank or secondary-stat modifier required by the rule.</small></label>
        <label><span>Skill</span><input v-model.number="rhythmSkillStat" class="field-control" type="number" /><small class="field-help">Optional. Add the Skill value only when the roll calls for a Skill.</small></label>
        <label><span>Conditions</span><input v-model.number="rhythmConditions" class="field-control" type="number" /></label>
        <label><span>Target Type</span><select v-model="targetMode" class="field-control"><option value="none">No Target</option><option value="passive">Passive Target</option><option value="active">Active Target</option></select></label>
        <label v-if="targetMode==='passive'"><span>Passive Target</span><select v-model.number="passiveTarget" class="field-control"><option v-for="target in passiveTargets" :key="target[0]" :value="target[1]">{{ target[0] }} — {{ target[1] }}</option></select></label>
        <label v-if="targetMode==='active'"><span>Active Target</span><input v-model.number="activeTarget" class="field-control" type="number" min="0" placeholder="Enter Target" /></label>
      </div>
      <div class="sim-stat-total"><span>Combined Stat</span><strong>{{ rhythmCombinedStat }}</strong><small>Attribute / Secondary Stat + Skill</small></div>
      <button class="primary-button wide" @click="rollRhythm">Roll Rhythm</button>

      <div class="sim-history-heading"><div><strong>Recent Rolls</strong><small>The latest five rolls are kept on this device.</small></div><button v-if="rhythmHistory.length" class="text-action" type="button" @click="clearRhythm">Clear</button></div>
      <div v-if="rhythmHistory.length" class="rhythm-history-list">
        <article v-for="(entry,index) in rhythmHistory" :key="entry.id" class="result-panel rhythm-history-entry" :class="{latest:index===0}">
          <div class="result-meta"><span>{{ formatTime(entry.createdAt) }}</span><span>{{ entry.mode }}</span><span v-if="entry.target!==null">{{ entry.targetLabel }} {{ entry.target }}</span></div>
          <strong v-if="entry.reason" class="roll-reason">{{ entry.reason }}</strong>
          <div class="dice-row"><span v-for="(value,dieIndex) in entry.result.rolled" :key="dieIndex" class="die" :class="{fortune:value>=8,misfortune:value<=2}">{{ value }}</span></div>
          <div class="result-summary"><strong class="result-total">{{ entry.result.total }}</strong><span v-if="entry.target!==null" class="outcome" :class="entry.result.total>=entry.target?'pass':'fail'">{{ rollOutcome(entry) }}</span></div>
          <div v-if="entry.fortunes||entry.misfortunes" class="special-result-row"><span v-if="entry.fortunes" class="special-result fortune-result">Fortune ×{{ entry.fortunes }}</span><span v-if="entry.misfortunes" class="special-result misfortune-result">Misfortune ×{{ entry.misfortunes }}</span></div>
          <small>{{ entry.result.natural }} natural + {{ historyBaseStat(entry) }} stat<template v-if="historySkillStat(entry)"> + {{ historySkillStat(entry) }} Skill</template> {{ entry.result.conditions>=0?'+':'−' }} {{ Math.abs(entry.result.conditions) }} Conditions<template v-if="entry.result.dropped!==null"> · Dropped {{ entry.result.dropped }}</template></small>
        </article>
      </div>
      <div v-else class="empty-inline sim-empty-inline">No rolls yet.</div>
    </section>

    <template v-if="tab==='combat'">
      <section class="tool-panel card-surface encounter-manager-card">
        <div class="tool-heading"><div><p class="eyebrow">ENCOUNTERS</p><h2>Combat Tracker</h2></div></div>
        <p class="tool-explainer">Start an encounter to keep its round, latest opposed roll, pin state, and completed history on this device.</p>
        <div class="inline-create-row"><input v-model="encounterName" class="field-control" placeholder="Encounter Name" @keyup.enter="newEncounter" /><button class="primary-button" type="button" @click="newEncounter">Start Encounter</button></div>

        <div v-if="activeEncounter" class="active-encounter-card">
          <div><span class="eyebrow">ACTIVE ENCOUNTER</span><h3>{{ activeEncounter.name }}</h3><small v-if="activeEncounter.lastResult">{{ activeEncounter.lastResult }}</small></div>
          <div class="round-control"><button type="button" class="icon-button" @click="changeRound(-1)">−</button><span><small>ROUND</small><strong>{{ activeEncounter.round }}</strong></span><button type="button" class="icon-button" @click="changeRound(1)">+</button></div>
        </div>

        <section class="encounter-opposed-panel">
          <div class="subsection-heading"><div><p class="eyebrow">OPPOSED ROLL</p><h3>Strike vs Ward</h3></div><small v-if="!activeEncounter">You can roll without starting an encounter.</small></div>
          <div class="field-grid two"><label><span>Strike Stat</span><input v-model.number="strikeStat" class="field-control" type="number" /></label><label><span>Strike Conditions</span><input v-model.number="strikeCond" class="field-control" type="number" /></label><label><span>Ward Stat</span><input v-model.number="wardStat" class="field-control" type="number" /></label><label><span>Ward Conditions</span><input v-model.number="wardCond" class="field-control" type="number" /></label></div>
          <button class="primary-button wide" @click="rollCombat">Roll Strike &amp; Ward</button>
          <div v-if="combatResult" class="versus-grid"><div><span>STRIKE</span><strong>{{ combatResult.strike.total }}</strong><small>{{ combatResult.strike.rolled.join(' + ') }}</small></div><div class="vs">VS</div><div><span>WARD</span><strong>{{ combatResult.ward.total }}</strong><small>{{ combatResult.ward.rolled.join(' + ') }}</small></div></div>
          <div v-if="combatResult" class="notice" :class="combatResult.hit?'good':'bad'">{{ combatResult.hit?'HIT — Strike exceeded Ward.':'MISS — Strike did not exceed Ward.' }}</div>
        </section>

        <details class="sim-list-panel" open><summary>Ongoing Encounters</summary><div class="sim-list-body">
          <div v-if="!ongoingEncounters.length" class="empty-inline">No ongoing encounters.</div>
          <article v-for="encounter in ongoingEncounters" :key="encounter.id" class="sim-record-row" :class="{selected:activeEncounterId===encounter.id}">
            <button class="sim-record-main" type="button" @click="selectEncounter(encounter.id)"><strong>{{ encounter.name }}</strong><small>Round {{ encounter.round }}<template v-if="encounter.lastResult"> · {{ encounter.lastResult }}</template></small></button>
            <div class="sim-record-actions"><button class="pin-button" :class="{pinned:encounter.pinned}" type="button" :aria-label="encounter.pinned?'Unpin encounter':'Pin encounter'" @click="toggleEncounterPin(encounter.id)">⌖</button><button class="secondary-button compact-action" type="button" @click="completeEncounter(encounter.id)">Complete</button><button class="icon-button compact-icon" type="button" aria-label="Delete encounter" @click="deleteEncounter(encounter.id)">×</button></div>
          </article>
        </div></details>

        <details class="sim-list-panel"><summary>Encounter History</summary><div class="sim-list-body">
          <div v-if="!encounterHistory.length" class="empty-inline">Completed encounters will appear here.</div>
          <article v-for="encounter in encounterHistory" :key="encounter.id" class="sim-record-row">
            <div class="sim-record-main static"><strong>{{ encounter.name }}</strong><small>Completed · {{ new Date(encounter.updatedAt).toLocaleDateString() }}<template v-if="encounter.lastResult"> · {{ encounter.lastResult }}</template></small></div>
            <div class="sim-record-actions"><button class="pin-button" :class="{pinned:encounter.pinned}" type="button" :aria-label="encounter.pinned?'Unpin encounter':'Pin encounter'" @click="toggleEncounterPin(encounter.id)">⌖</button><button class="secondary-button compact-action" type="button" @click="reopenEncounter(encounter.id)">Reopen</button><button class="icon-button compact-icon" type="button" aria-label="Delete encounter" @click="deleteEncounter(encounter.id)">×</button></div>
          </article>
        </div></details>
      </section>

      <section class="tool-panel card-surface"><div class="tool-heading"><div><p class="eyebrow">DAMAGE</p><h2>Damage &amp; Guts</h2></div></div><div class="field-grid three"><label><span>Incoming Damage</span><input v-model.number="damage" class="field-control" type="number" min="0" /></label><label><span>Damage Type</span><select v-model="damageType" class="field-control"><option value="standard">Standard</option><option value="direct">Direct</option><option value="lethal">Lethal</option></select></label><label><span>Hide / Base Guts</span><input v-model.number="hide" class="field-control" type="number" min="0" /></label><label><span>Equipment Guts</span><input v-model.number="equipment" class="field-control" type="number" min="0" /></label><label><span>Conditions</span><input v-model.number="damageCond" class="field-control" type="number" /></label></div><div class="metric-grid"><div><span>Effective Guts</span><strong>{{ damageCalc.guts }}</strong></div><div><span>Damage Suffered</span><strong>{{ damageCalc.suffered }}</strong></div></div></section>
      <section class="tool-panel card-surface"><div class="tool-heading"><div><p class="eyebrow">HEALTH &amp; DEFEAT</p><h2>Health / Hallows</h2></div></div><label><span>Current Health</span><input v-model.number="health" class="field-control" type="number" min="0" max="30" /></label><div class="metric-grid"><div><span>Health Penalty</span><strong>{{ penalty===null?'Defeated':penalty }}</strong></div><div><span>Hallows Save</span><strong>{{ hallows===null?'—':hallows }}</strong></div></div><button class="secondary-button wide" @click="rollHallows">Roll 1d10 Hallows Save</button><div v-if="hallows!==null" class="notice" :class="hallows>=6?'good':'bad'">{{ hallows>=6?'PASS':'FAIL — Gain a Fate Mark.' }}</div></section>
    </template>

    <section v-if="tab==='advancement'" class="tool-panel card-surface"><div class="tool-heading"><div><p class="eyebrow">EXPERIENCE</p><h2>Advancement Cost</h2></div></div><div class="field-grid two"><label><span>Advancement</span><select v-model="advancementType" class="field-control"><option value="attribute">Attribute Rank</option><option value="skill">Skill Rank</option><option value="new-skill">New Skill</option><option value="talent">New Talent</option><option value="magic">Magic Level</option></select></label><label><span>Current Rank / Level</span><input v-model.number="currentRank" class="field-control" type="number" min="0" /></label></div><div class="xp-display"><strong>{{ xp }}</strong><span>XP</span></div></section>
  </main>
</template>
