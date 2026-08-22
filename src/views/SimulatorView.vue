<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import { damageResult, healthPenalty, opposedResult, rhythmResult } from '../rules/rulesEngine'
import { passiveTargets } from '../data/bramble'
import { skillDefinitions } from '../data/characterOptions'
import { loreSpells } from '../data/magicOptions'
import { spellDetails } from '../data/magicDetails'
import { loadCharacters, type CharacterRecord } from '../services/characters'

type RhythmMode='normal'|'edged'|'weighted'
type TargetMode='none'|'passive'|'active'
type StrikeType='melee'|'ranged'|'magical'
type RhythmResultValue=ReturnType<typeof rhythmResult>
interface RhythmHistoryEntry{
  id:string;createdAt:string;rollType:string;mode:RhythmMode;stat:number;skillName:string;skillBonus:number;conditions:number;target:number|null;targetLabel:string;result:RhythmResultValue;fortunes:number;misfortunes:number
}
interface EncounterRecord{
  id:string;name:string;status:'ongoing'|'completed';pinned:boolean;round:number;health:number;fateMarks:number;mana:number;createdAt:string;updatedAt:string;lastResult?:string;events:string[];characterId?:string
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

const characters=ref<CharacterRecord[]>(loadCharacters().filter(character=>!character.draft))
const attributeCharacterId=ref('')
const attributeCharacter=computed(()=>attributeCharacterId.value?characters.value.find(character=>character.id===attributeCharacterId.value)||null:null)
const attributeCharacterStat=ref('agility')
const attributeStatOptions=computed(()=>{
  const c=attributeCharacter.value
  if(!c)return[]
  const rank=(key:'agility'|'might'|'hide'|'lore'|'bravery')=>Number(c.attributes?.[key]||0)
  return [
    ['agility','Agility',rank('agility')*2],['might','Might',rank('might')*2],['hide','Hide',rank('hide')*2],['lore','Lore',rank('lore')*2],['bravery','Bravery',rank('bravery')*2],
    ['speed','Speed',2+rank('agility')],['aim','Aim',rank('agility')*2],['mettle','Mettle',rank('might')*2],['ward','Ward',rank('hide')*2],['control','Control',rank('lore')*2],['power','Power',rank('might')],['guts','Guts',rank('hide')],
  ] as Array<[string,string,number]>
})
const selectedAttributeStatValue=computed(()=>attributeStatOptions.value.find(([key])=>key===attributeCharacterStat.value)?.[2]??0)
const attributeCharacterSkills=computed(()=>Object.entries(attributeCharacter.value?.skillRanks||{}).sort(([a],[b])=>a.localeCompare(b)))
watch([attributeCharacterId,attributeCharacterStat],()=>{if(attributeCharacter.value)rhythmStat.value=selectedAttributeStatValue.value})
watch(rhythmSkill,()=>{if(attributeCharacter.value){const rank=Number(attributeCharacter.value.skillRanks?.[rhythmSkill.value]||0);rhythmSkillBonus.value=rank*2}})
const newEncounterCharacterId=ref('')
const rawEncounters=readStore<EncounterRecord[]>(ENCOUNTER_STORE,[]).map(item=>({...item,health:Number(item.health??30),fateMarks:Number(item.fateMarks??0),mana:Number(item.mana??2),events:Array.isArray(item.events)?item.events:[]}))
const encounters=ref<EncounterRecord[]>(rawEncounters)
const encounterName=ref('')
const encounterStartError=ref('')
const activeEncounterId=ref<string|null>(encounters.value.find(item=>item.status==='ongoing')?.id||null)
const activeEncounter=computed(()=>encounters.value.find(item=>item.id===activeEncounterId.value)||null)
const activeCharacter=computed(()=>activeEncounter.value?.characterId?characters.value.find(character=>character.id===activeEncounter.value?.characterId)||null:null)
function characterName(id?:string){return id?characters.value.find(character=>character.id===id)?.name||'Character unavailable':''}
function attribute(character:CharacterRecord|null,key:'agility'|'might'|'hide'|'lore'|'bravery'){return Number(character?.attributes?.[key]||0)}
const secondaryStats=computed(()=>{
  const character=activeCharacter.value
  return {
    speed:character?2+attribute(character,'agility'):0,
    aim:character?attribute(character,'agility')*2:0,
    mettle:character?attribute(character,'might')*2:0,
    ward:character?attribute(character,'hide')*2:0,
    control:character?attribute(character,'lore')*2:0,
    power:character?attribute(character,'might'):0,
    guts:character?attribute(character,'hide'):0,
  }
})
const characterMagicLevel=computed(()=>activeCharacter.value?.path==='magic'?1:0)
const characterManaRegen=computed(()=>2+characterMagicLevel.value)
const characterSkillEntries=computed(()=>Object.entries(activeCharacter.value?.skillRanks||{}).sort(([a],[b])=>a.localeCompare(b)))
const characterSpells=computed(()=>{
  const character=activeCharacter.value
  if(!character)return[]
  const signature=character.loreAttunement?loreSpells[character.loreAttunement]?.[0]:''
  return Array.from(new Set([signature,...(character.spells||[]),...(character.invocationSpells||[]),character.invocationSpell||''].filter(Boolean) as string[]))
})
function skillModifier(rank:number){return Number(rank||0)*2}
function sortRecords(a:EncounterRecord,b:EncounterRecord){if(a.pinned!==b.pinned)return a.pinned?-1:1;return b.updatedAt.localeCompare(a.updatedAt)}
const ongoingEncounters=computed(()=>encounters.value.filter(item=>item.status==='ongoing').sort(sortRecords))
const encounterHistory=computed(()=>encounters.value.filter(item=>item.status==='completed').sort(sortRecords))
function persistEncounters(){writeStore(ENCOUNTER_STORE,encounters.value)}
function addEvent(text:string){const item=activeEncounter.value;if(!item)return;item.events=[`${new Date().toLocaleTimeString([],{hour:'numeric',minute:'2-digit'})} — ${text}`,...item.events].slice(0,30);item.lastResult=text;item.updatedAt=stamp();persistEncounters()}
function newEncounter(){
  encounterStartError.value=''
  const character=characters.value.find(item=>item.id===newEncounterCharacterId.value)||null
  if(!character){encounterStartError.value='Select a saved character before starting a Combat Encounter.';return}
  const name=encounterName.value.trim()||`Encounter ${encounters.value.length+1}`
  const now=stamp();const record:EncounterRecord={id:makeId(),name,status:'ongoing',pinned:false,round:1,health:30,fateMarks:0,mana:character?2+(character.path==='magic'?1:0):2,createdAt:now,updatedAt:now,events:[],characterId:character.id}
  encounters.value=[record,...encounters.value];activeEncounterId.value=record.id;encounterName.value='';newEncounterCharacterId.value='';resetRoundAbilities();persistEncounters()
}
function selectEncounter(id:string){activeEncounterId.value=id;resetRoundAbilities();combatResult.value=null}
function toggleEncounterPin(id:string){const item=encounters.value.find(e=>e.id===id);if(!item)return;item.pinned=!item.pinned;item.updatedAt=stamp();persistEncounters()}
function changeRound(delta:number){const item=activeEncounter.value;if(!item)return;const before=item.round;item.round=Math.max(1,item.round+delta);if(item.round>before){item.mana+=characterManaRegen.value;addEvent(`Round ${item.round}: +${characterManaRegen.value} Mana regenerated.`)}else{item.updatedAt=stamp();persistEncounters()}resetRoundAbilities()}
function completeEncounter(id:string){const item=encounters.value.find(e=>e.id===id);if(!item)return;item.status='completed';item.updatedAt=stamp();persistEncounters();if(activeEncounterId.value===id)activeEncounterId.value=ongoingEncounters.value.find(e=>e.id!==id)?.id||null}
function reopenEncounter(id:string){const item=encounters.value.find(e=>e.id===id);if(!item)return;item.status='ongoing';item.updatedAt=stamp();activeEncounterId.value=id;resetRoundAbilities();persistEncounters()}
function deleteEncounter(id:string){if(!confirm('Delete this encounter and its local history?'))return;encounters.value=encounters.value.filter(e=>e.id!==id);if(activeEncounterId.value===id)activeEncounterId.value=ongoingEncounters.value[0]?.id||null;persistEncounters()}
function assignActiveCharacter(id:string){const item=activeEncounter.value;if(!item)return;item.characterId=id||undefined;item.updatedAt=stamp();const character=characters.value.find(entry=>entry.id===id);if(character&&item.round===1&&!item.events.length)item.mana=2+(character.path==='magic'?1:0);persistEncounters()}
function assignActiveCharacterFromEvent(event:Event){assignActiveCharacter((event.target as HTMLSelectElement|null)?.value||'')}

const encounterHealth=computed({get:()=>activeEncounter.value?.health??30,set:(value:number)=>{const item=activeEncounter.value;if(!item)return;const before=item.health;item.health=Math.max(0,Number(value||0));if(before<=0&&item.health>0)item.fateMarks=0;item.updatedAt=stamp();persistEncounters()}})
const encounterFateMarks=computed({get:()=>activeEncounter.value?.fateMarks??0,set:(value:number)=>{const item=activeEncounter.value;if(!item)return;item.fateMarks=Math.max(0,Math.min(3,Number(value||0)));item.updatedAt=stamp();persistEncounters()}})
const encounterMana=computed({get:()=>activeEncounter.value?.mana??2,set:(value:number)=>{const item=activeEncounter.value;if(!item)return;item.mana=Math.max(0,Number(value||0));item.updatedAt=stamp();persistEncounters()}})
const healthPenaltyValue=computed(()=>healthPenalty(encounterHealth.value))

const abilitySpent=reactive({instinct:false,movement:false,combat:false,reaction:false})
const abilityTypes=['instinct','movement','combat','reaction'] as const
const abilityRemaining=computed(()=>abilityTypes.filter(type=>!abilitySpent[type]))
function resetRoundAbilities(){abilityTypes.forEach(type=>abilitySpent[type]=false)}
function toggleAbility(type:(typeof abilityTypes)[number]){abilitySpent[type]=!abilitySpent[type]}
const abilityStatus=computed(()=>abilityRemaining.value.length===0?'No Root ability types remain this round. Passive Abilities may still apply when their trigger and restrictions are met.':abilityRemaining.value.length===4?'Round ready: all four Root ability types are available.':`${abilityRemaining.value.length} Root ability type${abilityRemaining.value.length===1?'':'s'} remaining this round.`)

const strikeTypes:StrikeType[]=['melee','ranged','magical']
const strikeType=ref<StrikeType>('melee')
const strikeStatManual=ref(0),strikeCond=ref(0),wardStatManual=ref(0),wardCond=ref(0)
const strikeStatValue=computed(()=>activeCharacter.value?(strikeType.value==='melee'?secondaryStats.value.mettle:strikeType.value==='ranged'?secondaryStats.value.aim:secondaryStats.value.control):Number(strikeStatManual.value||0))
const wardStatValue=computed(()=>activeCharacter.value?secondaryStats.value.ward:Number(wardStatManual.value||0))
const strikeStatLabel=computed(()=>strikeType.value==='melee'?'Mettle':strikeType.value==='ranged'?'Aim':'Control')
const combatResult=ref<ReturnType<typeof opposedResult>|null>(null)
function rollCombat(){combatResult.value=opposedResult(dice(3),strikeStatValue.value,strikeCond.value,dice(3),wardStatValue.value,wardCond.value);abilitySpent.combat=true;addEvent(`${strikeType.value[0].toUpperCase()+strikeType.value.slice(1)} ${combatResult.value.hit?'Hit':'Miss'} — Strike ${combatResult.value.strike.total}, Ward ${combatResult.value.ward.total}`)}

const damage=ref(8),damageType=ref<'standard'|'direct'|'lethal'>('standard'),hideManual=ref(1),equipment=ref(0),damageCond=ref(0),resistance=ref(0),weakness=ref(0)
const hideValue=computed(()=>activeCharacter.value?attribute(activeCharacter.value,'hide'):Number(hideManual.value||0))
const netDamageConditions=computed(()=>Number(damageCond.value||0)+Math.abs(Number(resistance.value||0))-Math.abs(Number(weakness.value||0)))
const damageCalc=computed(()=>damageResult(damage.value,damageType.value,hideValue.value,equipment.value,netDamageConditions.value))
function applyDamage(){if(!activeEncounter.value)return;encounterHealth.value=Math.max(0,encounterHealth.value-damageCalc.value.suffered);addEvent(`${damageCalc.value.suffered} ${damageType.value} damage suffered; Health ${encounterHealth.value}.`)}
const hallows=ref<number|null>(null)
function rollHallows(){hallows.value=die();if(hallows.value>=6)addEvent(`Hallows ${hallows.value}: pass.`);else{encounterFateMarks.value=Math.min(3,encounterFateMarks.value+1);addEvent(`Hallows ${hallows.value}: fail; Fate Mark ${encounterFateMarks.value}/3.`)}}

const spellName=ref(''),spellBaseCostManual=ref(0),spellAdjustment=ref(0)
const selectedSpellDetail=computed(()=>spellName.value?spellDetails[spellName.value]:undefined)
const selectedSpellBaseCost=computed(()=>selectedSpellDetail.value?.manaCost===null||selectedSpellDetail.value?.manaCost===undefined?Number(spellBaseCostManual.value||0):Number(selectedSpellDetail.value.manaCost))
const selectedSpellAttuned=computed(()=>Boolean(activeCharacter.value?.loreAttunement&&selectedSpellDetail.value?.lore===activeCharacter.value.loreAttunement))
const spellEffectiveCost=computed(()=>Math.max(0,selectedSpellBaseCost.value-(selectedSpellAttuned.value?2:0)+Number(spellAdjustment.value||0)))
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
      <aside class="fortune-tip"><strong>Fortune &amp; Misfortune</strong><span>Fortune and Misfortune are natural die results that create exceptional or poor circumstances around a check. A kept natural 8–10 is a Fortune and can provide a +1 Condition to the total when that exceptional result applies; a kept natural 1–2 is a Misfortune and can apply a −1 Condition for the poor result. They are read from the natural dice before modifiers, while Conditions are applied after the dice total.</span></aside>

      <label class="field-label attribute-character-picker"><span>Saved Character (Optional)</span><select v-model="attributeCharacterId" class="field-control"><option value="">Manual Check</option><option v-for="character in characters" :key="character.id" :value="character.id">{{ character.name }} — {{ character.species }}</option></select></label>
      <div v-if="attributeCharacter" class="field-grid two attribute-check-row character-check-fields"><label><span>Character Stat</span><select v-model="attributeCharacterStat" class="field-control"><option v-for="option in attributeStatOptions" :key="option[0]" :value="option[0]">{{ option[1] }} — +{{ option[2] }}</option></select></label><label><span>Character Skill</span><select v-model="rhythmSkill" class="field-control"><option value="">No Skill</option><option v-for="([skill,rank]) in attributeCharacterSkills" :key="skill" :value="skill">{{ skill }} — Rank {{ rank }} / +{{ Number(rank)*2 }}</option></select></label></div>

      <div class="field-grid two attribute-check-row">
        <label><span>Roll Type</span><select v-model="rollType" class="field-control"><option v-for="option in rollTypes" :key="option">{{ option }}</option></select></label>
        <label><span>Weighted / Edged</span><select v-model="rhythmMode" class="field-control"><option value="normal">Normal — 3d10</option><option value="edged">Edged — 4d10, Drop Lowest</option><option value="weighted">Weighted — 4d10, Drop Highest</option></select></label>
      </div>
      <div class="field-grid three attribute-check-row">
        <label><span>Attribute / Stat</span><input v-model.number="rhythmStat" class="field-control" type="number" :disabled="!!attributeCharacter" /></label>
        <label v-if="!attributeCharacter"><span>Skill</span><select v-model="rhythmSkill" class="field-control"><option value="">No Skill</option><option v-for="skill in skillDefinitions" :key="skill.name">{{ skill.name }}</option></select></label>
        <label><span>Skill Bonus</span><input v-model.number="rhythmSkillBonus" class="field-control" type="number" :disabled="!!attributeCharacter||!rhythmSkill" /></label>
      </div>
      <div class="field-grid three attribute-check-row">
        <label><span>Conditions</span><input v-model.number="rhythmConditions" class="field-control" type="number" /></label>
        <label><span>Target Type</span><select v-model="targetMode" class="field-control"><option value="none">No Target</option><option value="passive">Passive</option><option value="active">Active</option></select></label>
        <label v-if="targetMode==='passive'"><span>Passive Target</span><select v-model.number="passiveTarget" class="field-control"><option v-for="target in passiveTargets" :key="target[0]" :value="target[1]">{{ target[0] }} — {{ target[1] }}</option></select></label>
        <label v-else-if="targetMode==='active'"><span>Active Target</span><input v-model.number="activeTarget" class="field-control" type="number" min="0" placeholder="Enter Target" /></label>
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
        <p class="tool-explainer">Choose a saved character to carry its Attributes, secondary stats, Skills, Talents, Mana, and Spells into the encounter. A character is required before an encounter can begin.</p>
        <div class="encounter-create-grid"><input v-model="encounterName" class="field-control" placeholder="Encounter Name" @keyup.enter="newEncounter" /><select v-model="newEncounterCharacterId" class="field-control"><option value="">Choose Character…</option><option v-for="character in characters" :key="character.id" :value="character.id">{{ character.name }} — {{ character.species }}</option></select><button class="primary-button" type="button" @click="newEncounter">Start Encounter</button></div><p v-if="encounterStartError" class="creation-status-message encounter-start-error">{{ encounterStartError }}</p>

        <div v-if="activeEncounter" class="active-encounter-tools">
          <div class="active-encounter-card"><div><span class="eyebrow">ACTIVE ENCOUNTER</span><h3>{{ activeEncounter.name }}</h3><small v-if="activeEncounter.lastResult">{{ activeEncounter.lastResult }}</small></div><div class="round-control"><button type="button" class="icon-button" @click="changeRound(-1)">−</button><span><small>ROUND</small><strong>{{ activeEncounter.round }}</strong></span><button type="button" class="icon-button" @click="changeRound(1)">+</button></div></div>

          <label class="encounter-character-select"><span>Encounter Character</span><select class="field-control" :value="activeEncounter.characterId||''" @change="assignActiveCharacterFromEvent"><option value="" disabled>Choose Character…</option><option v-for="character in characters" :key="character.id" :value="character.id">{{ character.name }} — {{ character.species }}</option></select></label>

          <section v-if="activeCharacter" class="character-encounter-panel">
            <div class="character-encounter-heading"><div><span class="eyebrow">CHARACTER</span><h3>{{ activeCharacter.name }}</h3><small>{{ activeCharacter.species }} · {{ activeCharacter.homeland }}</small></div><span class="value-chip">{{ activeCharacter.path==='magic'?'Magic Level 1':'Talent Path' }}</span></div>
            <div class="secondary-stat-grid"><div><span>Speed</span><strong>{{ secondaryStats.speed }}</strong></div><div><span>Aim</span><strong>{{ secondaryStats.aim }}</strong></div><div><span>Mettle</span><strong>{{ secondaryStats.mettle }}</strong></div><div><span>Ward</span><strong>{{ secondaryStats.ward }}</strong></div><div><span>Control</span><strong>{{ secondaryStats.control }}</strong></div><div><span>Power</span><strong>{{ secondaryStats.power }}</strong></div><div><span>Guts</span><strong>{{ secondaryStats.guts }}</strong></div></div>
            <div v-if="characterSkillEntries.length" class="character-encounter-section"><strong>Skills</strong><div class="keyword-pill-row"><span v-for="([skill,rank]) in characterSkillEntries" :key="skill" class="keyword-pill">{{ skill }} · Rank {{ rank }} · Mod +{{ skillModifier(rank) }}</span></div></div>
            <div v-if="activeCharacter.talents?.length" class="character-encounter-section"><strong>Talents</strong><div class="keyword-pill-row"><span v-for="talent in activeCharacter.talents" :key="talent" class="keyword-pill">{{ talent }}</span></div></div>
            <div v-if="activeCharacter.path==='magic'" class="character-encounter-section"><strong>Magic</strong><p>Lore of {{ activeCharacter.loreAttunement||'—' }} · Mana regeneration {{ characterManaRegen }} / round</p><div class="keyword-pill-row"><span v-for="spell in characterSpells" :key="spell" class="keyword-pill">{{ spell }}</span></div></div>
          </section>

          <div class="encounter-vital-grid"><label><span>Health</span><input v-model.number="encounterHealth" class="field-control" type="number" min="0" max="30" /></label><label><span>Mana</span><input v-model.number="encounterMana" class="field-control" type="number" min="0" /></label><label><span>Fate Marks</span><input v-model.number="encounterFateMarks" class="field-control" type="number" min="0" max="3" /></label></div>

          <details class="encounter-tool-panel abilities-panel" open><summary>Abilities</summary><div class="encounter-tool-body"><p class="ability-help">At the start of your turn, resolve start-of-turn triggers first. During the turn, Abilities may be performed in any order when their Keywords, triggers, and restrictions allow them. Root limits track one Instinct, Movement, Combat, and Reaction use per type each round.</p><div class="ability-root-grid"><button v-for="type in abilityTypes" :key="type" type="button" :class="{spent:abilitySpent[type]}" @click="toggleAbility(type)"><span>Root {{ type }}</span><strong>{{ abilitySpent[type]?'Used':'Available' }}</strong></button><article class="passive-ability-card"><span>Passive</span><strong>Trigger Based</strong><small>Does not consume a Root type.</small></article></div><div class="ability-status" :class="{empty:abilityRemaining.length===0}">{{ abilityStatus }}</div><button class="secondary-button wide" type="button" @click="resetRoundAbilities">Reset Round Abilities</button></div></details>

          <details class="encounter-tool-panel" open><summary>Attacking &amp; Defending</summary><div class="encounter-tool-body"><div class="strike-type-tabs"><button v-for="type in strikeTypes" :key="type" type="button" :class="{active:strikeType===type}" @click="strikeType=type">{{ type[0].toUpperCase()+type.slice(1) }} Strike</button></div><div class="field-grid two"><label><span>{{ strikeStatLabel }} — Strike Stat</span><input v-if="!activeCharacter" v-model.number="strikeStatManual" class="field-control" type="number" /><div v-else class="field-control stat-readout">{{ strikeStatValue }}</div></label><label><span>Strike Conditions</span><input v-model.number="strikeCond" class="field-control" type="number" /></label><label><span>Ward — Defence Stat</span><input v-if="!activeCharacter" v-model.number="wardStatManual" class="field-control" type="number" /><div v-else class="field-control stat-readout">{{ wardStatValue }}</div></label><label><span>Ward Conditions</span><input v-model.number="wardCond" class="field-control" type="number" /></label></div><button class="primary-button wide" @click="rollCombat">Roll {{ strikeType[0].toUpperCase()+strikeType.slice(1) }} Strike &amp; Ward</button><div v-if="combatResult" class="versus-grid"><div><span>STRIKE</span><strong>{{ combatResult.strike.total }}</strong><small>{{ combatResult.strike.rolled.join(' + ') }}</small></div><div class="vs">VS</div><div><span>WARD</span><strong>{{ combatResult.ward.total }}</strong><small>{{ combatResult.ward.rolled.join(' + ') }}</small></div></div><div v-if="combatResult" class="notice" :class="combatResult.hit?'good':'bad'">{{ combatResult.hit?'HIT — Strike exceeded Ward.':'MISS — Ward wins ties and higher results.' }}</div></div></details>

          <details class="encounter-tool-panel" open><summary>Spells &amp; Mana</summary><div class="encounter-tool-body"><div class="field-grid two"><label><span>Spell</span><input v-model="spellName" class="field-control" list="character-spell-options" placeholder="Spell Name" /><datalist id="character-spell-options"><option v-for="spell in characterSpells" :key="spell" :value="spell" /></datalist></label><label><span>Base Mana Cost</span><input v-model.number="spellBaseCostManual" class="field-control" type="number" min="0" :disabled="selectedSpellDetail?.manaCost!==null&&selectedSpellDetail?.manaCost!==undefined" /></label><label><span>Attunement</span><div class="field-control stat-readout">{{ selectedSpellAttuned?'−2 Mana':'No reduction' }}</div></label><label><span>Other Mana Adjustment</span><input v-model.number="spellAdjustment" class="field-control" type="number" /></label></div><article v-if="selectedSpellDetail" class="spell-encounter-card"><div><span>{{ selectedSpellDetail.lore }}</span><strong>{{ spellName }}</strong></div><p>{{ selectedSpellDetail.flavor }}</p></article><div class="sim-stat-total"><span>Recorded Mana Cost</span><strong>{{ spellEffectiveCost }}</strong><small>{{ encounterMana }} Mana available · {{ characterManaRegen }} regen/round</small></div><button class="secondary-button wide" :disabled="!spellName.trim()||spellEffectiveCost>encounterMana" @click="recordSpell">Record Spell Use</button></div></details>

          <details class="encounter-tool-panel"><summary>Damage &amp; Guts</summary><div class="encounter-tool-body"><div class="field-grid three"><label><span>Incoming Damage</span><input v-model.number="damage" class="field-control" type="number" min="0" /></label><label><span>Damage Type</span><select v-model="damageType" class="field-control"><option value="standard">Standard</option><option value="direct">Direct</option><option value="lethal">Lethal</option></select></label><label><span>Hide / Base Guts</span><input v-if="!activeCharacter" v-model.number="hideManual" class="field-control" type="number" min="0" /><div v-else class="field-control stat-readout">{{ hideValue }}</div></label><label><span>Equipment Guts</span><input v-model.number="equipment" class="field-control" type="number" min="0" /></label><label><span>Conditions</span><input v-model.number="damageCond" class="field-control" type="number" /></label><label><span>Resistance Condition</span><input v-model.number="resistance" class="field-control" type="number" min="0" /></label><label><span>Weakness Condition</span><input v-model.number="weakness" class="field-control" type="number" min="0" /></label></div><p class="damage-rule-note">Resistance adds a positive Guts condition and Weakness adds a negative Guts condition after the damage category modifies Guts.</p><div class="metric-grid"><div><span>Effective Guts</span><strong>{{ damageCalc.guts }}</strong></div><div><span>Damage Suffered</span><strong>{{ damageCalc.suffered }}</strong></div></div><button class="secondary-button wide" @click="applyDamage">Apply Damage to Active Health</button></div></details>

          <details class="encounter-tool-panel"><summary>Health, Hallows &amp; Fate Marks</summary><div class="encounter-tool-body"><div class="metric-grid"><div><span>Health Penalty</span><strong>{{ healthPenaltyValue===null?'Defeated':healthPenaltyValue }}</strong></div><div><span>Fate Marks</span><strong>{{ encounterFateMarks }} / 3</strong></div></div><button class="secondary-button wide" @click="rollHallows">Roll 1d10 Hallows Save</button><div v-if="hallows!==null" class="notice" :class="hallows>=6?'good':'bad'">{{ hallows>=6?`PASS — ${hallows}`:`FAIL — ${hallows}; Fate Mark ${encounterFateMarks}/3.` }}</div></div></details>

          <details v-if="activeEncounter.events.length" class="encounter-tool-panel"><summary>Encounter Log</summary><div class="encounter-log"><p v-for="(event,index) in activeEncounter.events" :key="index">{{ event }}</p></div></details>
        </div>
      </section>

      <section class="tool-panel card-surface encounter-list-section"><div class="tool-heading"><div><p class="eyebrow">ONGOING</p><h2>Ongoing Encounters</h2></div></div><div v-if="!ongoingEncounters.length" class="empty-inline">No ongoing encounters.</div><div v-else class="sim-list-body standalone-list-body"><article v-for="encounter in ongoingEncounters" :key="encounter.id" class="sim-record-row" :class="{selected:activeEncounterId===encounter.id}"><button class="sim-record-main" type="button" @click="selectEncounter(encounter.id)"><strong>{{ encounter.name }}</strong><small><template v-if="encounter.characterId">{{ characterName(encounter.characterId) }} · </template>Round {{ encounter.round }} · Health {{ encounter.health }} · Fate {{ encounter.fateMarks }}/3<template v-if="encounter.lastResult"> · {{ encounter.lastResult }}</template></small></button><div class="sim-record-actions"><button class="pin-button" :class="{pinned:encounter.pinned}" type="button" :aria-label="encounter.pinned?'Unpin encounter':'Pin encounter'" @click="toggleEncounterPin(encounter.id)">⌖</button><button class="secondary-button compact-action" type="button" @click="completeEncounter(encounter.id)">Complete</button><button class="icon-button compact-icon" type="button" aria-label="Delete encounter" @click="deleteEncounter(encounter.id)">×</button></div></article></div></section>

      <section class="tool-panel card-surface encounter-list-section"><div class="tool-heading"><div><p class="eyebrow">HISTORY</p><h2>Encounter History</h2></div></div><div v-if="!encounterHistory.length" class="empty-inline">Completed encounters will appear here.</div><div v-else class="sim-list-body standalone-list-body"><article v-for="encounter in encounterHistory" :key="encounter.id" class="sim-record-row"><div class="sim-record-main static"><strong>{{ encounter.name }}</strong><small><template v-if="encounter.characterId">{{ characterName(encounter.characterId) }} · </template>Completed · {{ new Date(encounter.updatedAt).toLocaleDateString() }} · Round {{ encounter.round }} · Fate {{ encounter.fateMarks }}/3<template v-if="encounter.lastResult"> · {{ encounter.lastResult }}</template></small></div><div class="sim-record-actions"><button class="pin-button" :class="{pinned:encounter.pinned}" type="button" :aria-label="encounter.pinned?'Unpin encounter':'Pin encounter'" @click="toggleEncounterPin(encounter.id)">⌖</button><button class="secondary-button compact-action" type="button" @click="reopenEncounter(encounter.id)">Reopen</button><button class="icon-button compact-icon" type="button" aria-label="Delete encounter" @click="deleteEncounter(encounter.id)">×</button></div></article></div></section>
    </template>
  </main>
</template>

<style scoped>
.fortune-tip{display:grid;gap:4px;margin:12px 0;padding:10px 12px;border:1px solid var(--line);border-left:5px solid var(--accent);border-radius:9px;background:var(--paper-2)}.fortune-tip strong{font-family:Georgia,'Times New Roman',serif}.fortune-tip span{color:var(--ink-soft);line-height:1.45}
.encounter-create-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr) auto;gap:8px}.encounter-character-select{display:grid;gap:6px;margin:10px 0}.encounter-character-select>span{font-weight:800}
.character-encounter-panel{display:grid;gap:10px;padding:12px;border:1px solid var(--line);border-top:5px solid var(--accent);border-radius:10px;background:var(--paper)}.character-encounter-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.character-encounter-heading h3{margin:0;font-family:Georgia,'Times New Roman',serif}.character-encounter-heading small{color:var(--ink-soft)}
.secondary-stat-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px}.secondary-stat-grid>div{display:grid;justify-items:center;gap:2px;padding:8px 5px;border:1px solid var(--line);border-radius:8px;background:var(--paper-2)}.secondary-stat-grid span{color:var(--ink-soft);font-size:calc(8px + var(--font-offset));font-weight:800}.secondary-stat-grid strong{font-size:calc(17px + var(--font-offset))}
.character-encounter-section{display:grid;gap:6px;padding-top:8px;border-top:1px solid var(--line)}.character-encounter-section p{margin:0;color:var(--ink-soft)}
.abilities-panel{border-top:5px solid #5b7440}.ability-help{margin:0 0 10px;color:var(--ink-soft);line-height:1.45}.ability-root-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:7px}.ability-root-grid button,.passive-ability-card{min-height:68px;display:grid;align-content:center;justify-items:center;gap:3px;padding:7px;border:1px solid var(--line);border-radius:8px;background:var(--paper);color:var(--ink);text-transform:capitalize}.ability-root-grid button{cursor:pointer}.ability-root-grid button.spent{opacity:.58;background:var(--paper-2);text-decoration:line-through}.ability-root-grid button strong,.passive-ability-card strong{font-size:calc(9px + var(--font-offset))}.passive-ability-card small{color:var(--ink-soft);text-align:center;font-size:calc(7px + var(--font-offset))}.ability-status{margin:9px 0;padding:8px 10px;border-radius:8px;background:color-mix(in srgb,var(--accent-wash) 42%,var(--paper));font-weight:750}.ability-status.empty{background:color-mix(in srgb,var(--danger) 8%,var(--paper));color:var(--danger)}
.strike-type-tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:9px}.strike-type-tabs button{min-height:35px;border:1px solid var(--line);border-radius:8px;background:var(--paper-2);color:var(--ink-soft);font-weight:800;cursor:pointer}.strike-type-tabs button.active{border-color:var(--accent);background:var(--accent-wash);color:var(--ink)}.stat-readout{display:flex;align-items:center;font-weight:850;background:var(--paper-2)}
.spell-encounter-card{margin-top:9px;padding:10px 11px;border:1px solid var(--line);border-top:5px solid #76518e;border-radius:9px;background:var(--paper)}.spell-encounter-card>div{display:flex;align-items:baseline;justify-content:space-between;gap:10px}.spell-encounter-card span{color:var(--ink-soft);font-size:calc(8px + var(--font-offset));font-weight:850;text-transform:uppercase}.spell-encounter-card p{margin:6px 0 0;color:var(--ink-soft)}.damage-rule-note{margin:8px 0;color:var(--ink-soft);line-height:1.4}
@media(max-width:760px){.encounter-create-grid{grid-template-columns:1fr}.secondary-stat-grid{grid-template-columns:repeat(4,minmax(0,1fr))}.ability-root-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.passive-ability-card{grid-column:1/-1}}
@media(max-width:480px){.secondary-stat-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.strike-type-tabs{grid-template-columns:1fr}}
</style>
