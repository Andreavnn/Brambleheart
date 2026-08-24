<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import { attributes, passiveTargets } from '../data/bramble'
import { skillDefinitions } from '../data/characterOptions'
import { loreSpells } from '../data/magicOptions'
import { loreDescriptions, spellDetails } from '../data/magicDetails'
import { ruleSourceDocuments } from '../data/rulesSource'
import { rhythmResult } from '../rules/rulesEngine'
import { loadCharacters, type CharacterRecord } from '../services/characters'
import { loadCustomData, type CustomSpeciesItem, type CustomSpellItem, type CustomTalentItem } from '../services/customData'

type RhythmMode='normal'|'edged'|'weighted'
type TargetMode='none'|'passive'|'active'
type RhythmResultValue=ReturnType<typeof rhythmResult>
interface RhythmHistoryEntry{id:string;createdAt:string;rollType:string;mode:RhythmMode;stat:number;skillName:string;skillBonus:number;conditions:number;target:number|null;targetLabel:string;result:RhythmResultValue;fortunes:number;misfortunes:number}
const RHYTHM_STORE='brambleheart-simulator-rhythm-v0.05'
const sheet=ref<'attribute'|'character'>('attribute')
const characters=ref<CharacterRecord[]>(loadCharacters().filter(character=>!character.draft))
const selectedCharacterId=ref(characters.value[0]?.id||'')
const selectedCharacter=computed(()=>selectedCharacterId.value?characters.value.find(character=>character.id===selectedCharacterId.value)||null:null)
const customData=loadCustomData()
const customSpecies=customData.filter((item):item is CustomSpeciesItem=>item.type==='species')
const customSpells=customData.filter((item):item is CustomSpellItem=>item.type==='spell')
const customTalents=customData.filter((item):item is CustomTalentItem=>item.type==='talent')
function isCustomSpecies(name:string){return customSpecies.some(item=>item.name===name)}
function isCustomSpell(name:string){return customSpells.some(item=>item.name===name)}
function isCustomTalent(name:string){return customTalents.some(item=>item.name===name)}

function die(){const a=new Uint32Array(1);crypto.getRandomValues(a);return(a[0]%10)+1}
function dice(count:number){return Array.from({length:count},die)}
function readStore<T>(key:string,fallback:T):T{try{return JSON.parse(localStorage.getItem(key)||'') as T}catch{return fallback}}
function writeStore(key:string,value:unknown){localStorage.setItem(key,JSON.stringify(value))}
function stamp(){return new Date().toISOString()}
function formatTime(value:string){return new Date(value).toLocaleTimeString([],{hour:'numeric',minute:'2-digit'})}
function normalizeSkillName(name:string){return String(name||'').replace(/\s*\([^)]*\)\s*/g,' ').replace(/\s+/g,' ').trim()}
function rank(c:CharacterRecord,key:'agility'|'might'|'hide'|'lore'|'bravery'){return Number(c.attributes?.[key]||0)}
function skillModifier(value:number){return Number(value||0)*2}

const rollTypes=['Attribute Save','Compelled','Initiative','Other','Role-Play','Skill Check','Strike','Ward'] as const
const rollType=ref<(typeof rollTypes)[number]>('Attribute Save')
const rhythmMode=ref<RhythmMode>('normal')
const rhythmStat=ref(0),rhythmSkillBonus=ref(0),rhythmConditions=ref(0)
const rhythmSkill=ref('')
const targetMode=ref<TargetMode>('none'),passiveTarget=ref(18),activeTarget=ref<number|null>(null)
const rhythmHistory=ref<RhythmHistoryEntry[]>(readStore<RhythmHistoryEntry[]>(RHYTHM_STORE,[]).slice(0,5))
const characterStatKey=ref('agility')

const allCharacterStats=computed(()=>{
  const c=selectedCharacter.value;if(!c)return[] as Array<{key:string;label:string;value:number;attribute:string}>
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
  if(type==='Strike')return['aim','mettle','control']
  if(type==='Ward')return['ward']
  if(['Attribute Save','Compelled','Skill Check','Role-Play'].includes(type))return['agility','might','hide','lore','bravery']
  return allCharacterStats.value.map(item=>item.key)
}
const statOptions=computed(()=>{const allowed=new Set(allowedStatKeys(rollType.value));return allCharacterStats.value.filter(item=>allowed.has(item.key))})
const selectedStat=computed(()=>statOptions.value.find(item=>item.key===characterStatKey.value)||statOptions.value[0]||null)
function statOptionLabel(stat:{key:string;label:string;value:number}){
  if(stat.key==='aim')return`Aim +${stat.value} (Shooting)`
  if(stat.key==='mettle')return`Mettle +${stat.value} (Melee)`
  if(stat.key==='control')return`Control +${stat.value} (Magic)`
  return`${stat.label} +${stat.value}`
}
const rollUsesSkill=computed(()=>['Skill Check','Role-Play','Other'].includes(rollType.value))
const characterSkillOptions=computed(()=>{
  const c=selectedCharacter.value,stat=selectedStat.value;if(!c||!stat||!rollUsesSkill.value)return[] as Array<{name:string;rank:number}>
  return Object.entries(c.skillRanks||{}).map(([name,value])=>({name:normalizeSkillName(name),rank:Number(value)})).filter(entry=>{
    const def=skillDefinitions.find(item=>normalizeSkillName(item.name)===entry.name)
    return Boolean(def)&&def?.attribute===stat.attribute
  }).sort((a,b)=>a.name.localeCompare(b.name))
})
const statFieldLabel=computed(()=>rollType.value==='Strike'?'Strike Stat':rollType.value==='Ward'?'Ward Stat':rollType.value==='Initiative'?'Initiative Stat':rollType.value==='Attribute Save'?'Save Attribute':rollType.value==='Skill Check'?'Skill Attribute':'Character Stat')
const skillFieldLabel=computed(()=>selectedStat.value?`${selectedStat.value.attribute} Skill`:'Character Skill')
watch([rollType,selectedCharacterId],()=>{const first=statOptions.value[0];characterStatKey.value=first?.key||'agility';rhythmSkill.value='';if(!rollUsesSkill.value)rhythmSkillBonus.value=0},{immediate:true})
watch(characterStatKey,()=>{rhythmSkill.value='';if(selectedCharacter.value)rhythmStat.value=selectedStat.value?.value||0},{immediate:true})
watch(rhythmSkill,()=>{if(!rollUsesSkill.value){rhythmSkillBonus.value=0;return}if(selectedCharacter.value){const entry=characterSkillOptions.value.find(item=>item.name===rhythmSkill.value);rhythmSkillBonus.value=skillModifier(entry?.rank||0)}})
const effectiveRhythmStat=computed(()=>selectedCharacter.value?Number(selectedStat.value?.value||0):Number(rhythmStat.value||0))
const rhythmCombinedStat=computed(()=>effectiveRhythmStat.value+(rollUsesSkill.value?Number(rhythmSkillBonus.value||0):0))
const rollSummary=computed(()=>{
  const style=rhythmMode.value==='normal'?'Normal':rhythmMode.value==='edged'?'Edged':'Weighted'
  const stat=selectedStat.value?.label||statFieldLabel.value
  const parts=[`${stat} (${effectiveRhythmStat.value})`]
  if(rollUsesSkill.value&&rhythmSkill.value)parts.push(`${rhythmSkill.value} (${Number(rhythmSkillBonus.value||0)})`)
  const conditions=Number(rhythmConditions.value||0);if(conditions!==0)parts.push(`Conditions (${conditions})`)
  return`${style} ${rollType.value} Roll: ${parts.join(' + ')} = ${rhythmCombinedStat.value+conditions}`
})
const currentTarget=computed(()=>targetMode.value==='passive'?Number(passiveTarget.value):targetMode.value==='active'&&activeTarget.value!==null?Number(activeTarget.value):null)
function targetLabel(){if(targetMode.value==='active')return'Active Target';if(targetMode.value==='passive')return passiveTargets.find(([,value])=>value===Number(passiveTarget.value))?.[0]||'Passive Target';return'No Target'}
function rollAttributeCheck(){const result=rhythmResult(dice(rhythmMode.value==='normal'?3:4),rhythmMode.value,rhythmCombinedStat.value,rhythmConditions.value);const kept=result.kept||result.rolled;const entry:RhythmHistoryEntry={id:crypto.randomUUID(),createdAt:stamp(),rollType:rollType.value,mode:rhythmMode.value,stat:effectiveRhythmStat.value,skillName:rollUsesSkill.value?rhythmSkill.value:'',skillBonus:rollUsesSkill.value?Number(rhythmSkillBonus.value||0):0,conditions:Number(rhythmConditions.value||0),target:currentTarget.value,targetLabel:targetLabel(),result,fortunes:kept.filter(value=>value>=8).length,misfortunes:kept.filter(value=>value<=2).length};rhythmHistory.value=[entry,...rhythmHistory.value].slice(0,5);writeStore(RHYTHM_STORE,rhythmHistory.value)}
function rollOutcome(entry:RhythmHistoryEntry){if(entry.target===null)return'';return entry.result.total>=entry.target?'SUCCESS':'FAILURE'}

const gearGutsBonus=computed(()=>Math.max(0,...(selectedCharacter.value?.equipment||[]).map(item=>{const match=String(item.detail||'').match(/Guts Bonus\s*\+?(\d+)/i);return match?Number(match[1]):0})))
const secondaryStats=computed(()=>{const c=selectedCharacter.value;if(!c)return null;return{speed:2+rank(c,'agility'),aim:rank(c,'agility')*2,mettle:rank(c,'might')*2,ward:rank(c,'hide')*2,control:rank(c,'lore')*2,power:rank(c,'might'),guts:rank(c,'hide')}})
const reviewGuts=computed(()=>Number(secondaryStats.value?.guts||0)+gearGutsBonus.value)
const selectedSkills=computed(()=>{const c=selectedCharacter.value;if(!c)return[];const ranks=c.skillRanks&&Object.keys(c.skillRanks).length?c.skillRanks:Object.fromEntries((c.skills||[]).map(name=>[normalizeSkillName(name),1]));return Object.entries(ranks).map(([name,value])=>({name:normalizeSkillName(name),rank:Number(value)})).sort((a,b)=>a.name.localeCompare(b.name))})
const weapons=computed(()=>selectedCharacter.value?.equipment?.filter(item=>item.category==='Weapon')||[])
const armor=computed(()=>selectedCharacter.value?.equipment?.filter(item=>item.category==='Armor & Shield')||[])
const otherGear=computed(()=>selectedCharacter.value?.equipment?.filter(item=>!['Weapon','Armor & Shield'].includes(item.category||''))||[])
function spellDetail(name:string){const custom=customSpells.find(item=>item.name===name);return custom||spellDetails[name]}
const talentSections=ruleSourceDocuments.talents.sections
function talentText(name:string){const custom=customTalents.find(item=>item.name===name);if(custom)return custom.text;const section=talentSections.find(item=>item.heading===name);return section?.blocks.filter(block=>block.type==='paragraph').map(block=>block.type==='paragraph'?block.text:'').join(' ')||''}
function talentKeywords(name:string){const custom=customTalents.find(item=>item.name===name);if(custom)return custom.keywords;const match=talentText(name).match(/\bKEYWORDS?:\s*(.+)$/i);return match?match[1].split('|').map(item=>item.trim()).filter(Boolean):[]}
function talentCategory(name:string){const custom=customTalents.find(item=>item.name===name);const hay=`${name} ${talentText(name)} ${talentKeywords(name).join(' ')}`.toLowerCase();if(custom&&custom.category!=='Combat')return custom.category;if(/spell|mana|magic|lore|invocation/.test(hay))return'Magic';if(/ward|defen|guard|block|resist|armor|shield|protect/.test(hay))return'Defensive Combat';if(/strike|weapon|combat|attack|damage|shoot|melee/.test(hay))return'Offensive Combat';if(/move|movement|speed|travel|climb|jump/.test(hay))return'Movement';if(/health|guts|resist|defen|surviv|rest|heal/.test(hay))return'Survival';if(/charm|presence|social|speech|ally|friend|kin/.test(hay))return'Social';return'Utility'}
type StructuredField={label:string;value:string}
function structuredRule(text:string):{intro:string;fields:StructuredField[]}{const labels=['COST','TRIGGER','DECLARE','DECLEAR','TARGET','EFFECT','RESTRICTION','RESTRICTIONS','DURATION','EMPOWER','COOLDOWN','AFTERBURN','PURIFY','REQUIRES','KEYWORDS'];const rx=new RegExp(`\\b(${labels.join('|')}):\\s*`,'gi');const matches=Array.from(text.matchAll(rx));if(!matches.length)return{intro:text.trim(),fields:[]};const intro=text.slice(0,matches[0].index).trim();const fields=matches.map((match,index)=>({label:match[1].toUpperCase().replace('DECLEAR','DECLARE'),value:text.slice((match.index||0)+match[0].length,index+1<matches.length?matches[index+1].index:text.length).trim()}));return{intro,fields}}
function visibleRuleFields(text:string){return structuredRule(text).fields.filter(field=>field.label!=='COST'&&field.label!=='KEYWORDS')}
function spellLoreClass(name:string){return `spell-lore-${String(spellDetail(name)?.lore||'invocation').toLowerCase()}`}
const magicLevel=computed(()=>Number(selectedCharacter.value?.magicLevel??(selectedCharacter.value?.path==='magic'?1:0)))
const manaPerRound=computed(()=>2+magicLevel.value)
const maxMana=computed(()=>manaPerRound.value)
const signatureSpell=computed(()=>{const c=selectedCharacter.value;if(!c?.loreAttunement)return'';return customSpells.find(item=>item.lore===c.loreAttunement&&item.signature)?.name||loreSpells[c.loreAttunement]?.[0]||''})
const characterSpells=computed(()=>{const c=selectedCharacter.value;if(!c||c.path!=='magic')return[];return Array.from(new Set([signatureSpell.value,...(c.spells||[]),...(c.invocationSpells||[]),...(c.invocationSpell?[c.invocationSpell]:[])].filter(Boolean) as string[]))})
function effectiveMana(name:string){const detail=spellDetail(name);if(!detail||detail.manaCost===null)return null;return Math.max(0,Number(detail.manaCost)-(detail.lore===selectedCharacter.value?.loreAttunement?2:0))}
const loreCharacterSpells=computed(()=>characterSpells.value.filter(name=>!selectedCharacter.value?.invocationSpells?.includes(name)&&name!==selectedCharacter.value?.invocationSpell).sort((a,b)=>(effectiveMana(a)??999)-(effectiveMana(b)??999)||a.localeCompare(b)))
const invocationCharacterSpells=computed(()=>characterSpells.value.filter(name=>selectedCharacter.value?.invocationSpells?.includes(name)||name===selectedCharacter.value?.invocationSpell).sort((a,b)=>(effectiveMana(a)??999)-(effectiveMana(b)??999)||a.localeCompare(b)))
const selectedPathName=computed(()=>selectedCharacter.value?.path==='magic'?'Wind-Touched':'Gifted Heart')
function attributeModifier(value:number){return Number(value||0)*2}
</script>

<template>
  <main class="page simulator-page rhythm-engine-page">
    <AppHeader />
    <div class="page-title-block"><h1>Rhythm Engine</h1><p>Use the Dice Roller for guided Rhythm Engine checks or open a saved character sheet.</p></div>
    <div class="segment-tabs simulator-tabs rhythm-sheet-tabs"><button type="button" class="segment-tab" :class="{active:sheet==='attribute'}" @click="sheet='attribute'">Dice Roller</button><button type="button" class="segment-tab" :class="{active:sheet==='character'}" @click="sheet='character'">Character Sheet</button></div>

    <section class="character-selection-panel card-surface"><label class="field-label">Character<select v-model="selectedCharacterId" class="field-control"><option value="">Manual / No Character</option><option v-for="character in characters" :key="character.id" :value="character.id">{{ character.name }} {{ character.species }}</option></select></label><div v-if="selectedCharacter" class="character-selection-summary"><strong>{{ selectedCharacter.name }}</strong><span>{{ selectedCharacter.species }} · {{ selectedCharacter.campaignName||'No Campaign' }}</span></div></section>

    <section v-if="sheet==='attribute'" class="tool-panel card-surface rhythm-tool-card">
      <div class="tool-heading"><div><p class="eyebrow">DICE ROLLER</p><h2>3d10 + Stat + Skill</h2></div></div>
      <p class="tool-explainer">Choose a Roll Type, then the valid Character Stat. Skills only turn on for roll types that use a Skill.</p>
      <aside class="fortune-tip"><strong>Fortune &amp; Misfortune</strong><span>Natural dice of 8–10 create Fortune results and natural dice of 1–2 create Misfortune results. Fortune represents an advantageous twist and may create a +1 Condition where the rule allows; Misfortune represents a complication and may create a −1 Condition.</span></aside>
      <div class="rhythm-dependent-grid"><label class="field-label">Roll Type<select v-model="rollType" class="field-control"><option v-for="option in rollTypes" :key="option">{{ option }}</option></select></label><label class="field-label">{{ statFieldLabel }}<select v-if="selectedCharacter" v-model="characterStatKey" class="field-control"><option v-for="stat in statOptions" :key="stat.key" :value="stat.key">{{ statOptionLabel(stat) }}</option></select><input v-else v-model.number="rhythmStat" class="field-control" type="number" /></label><label class="field-label" :class="{'field-off':!rollUsesSkill}">{{ rollUsesSkill?skillFieldLabel:'Skill (Off)' }}<select v-if="rollUsesSkill&&selectedCharacter" v-model="rhythmSkill" class="field-control"><option value="">No Skill</option><option v-for="skill in characterSkillOptions" :key="skill.name" :value="skill.name">{{ skill.name }} Rank {{ skill.rank }} +{{ skillModifier(skill.rank) }}</option></select><input v-else-if="rollUsesSkill" v-model.number="rhythmSkillBonus" class="field-control" type="number" placeholder="Skill Bonus" /><div v-else class="field-control disabled-readout">Off</div></label></div>
      <div class="rhythm-target-row"><label class="field-label rhythm-style-field">Roll Style<select v-model="rhythmMode" class="field-control"><option value="normal">Normal 3d10</option><option value="edged">Edged 4d10, Drop Lowest</option><option value="weighted">Weighted 4d10, Drop Highest</option></select></label><label class="field-label conditions-short-field">Conditions<input v-model.number="rhythmConditions" class="field-control" type="number" /></label><label class="field-label target-type-field">Target Type<select v-model="targetMode" class="field-control"><option value="none">No Target</option><option value="passive">Passive</option><option value="active">Active</option></select></label><label v-if="targetMode==='passive'" class="field-label target-value-field">Passive Target<select v-model.number="passiveTarget" class="field-control"><option v-for="target in passiveTargets" :key="target[0]" :value="target[1]">{{ target[0] }} {{ target[1] }}</option></select></label><label v-else-if="targetMode==='active'" class="field-label target-value-field">Active Target<input v-model.number="activeTarget" class="field-control" type="number" min="0" placeholder="Enter Target" /></label></div>
      <div class="roll-formula-summary"><strong>{{ rollSummary }}</strong></div><button class="primary-button wide" @click="rollAttributeCheck">Roll {{ rollType }}</button>
      <div class="sim-history-heading"><div><strong>Recent Rolls</strong><small>The latest five rolls are kept on this device.</small></div></div><div v-if="rhythmHistory.length" class="rhythm-history-list"><article v-for="(entry,index) in rhythmHistory" :key="entry.id" class="result-panel rhythm-history-entry" :class="{latest:index===0}"><div class="result-meta"><span>{{ formatTime(entry.createdAt) }}</span><span>{{ entry.rollType }}</span><span>{{ entry.mode }}</span><span v-if="entry.target!==null">{{ entry.targetLabel }} {{ entry.target }}</span></div><div class="dice-row"><span v-for="(value,dieIndex) in entry.result.rolled" :key="dieIndex" class="die" :class="{fortune:value>=8,misfortune:value<=2}">{{ value }}</span></div><div class="result-summary"><strong class="result-total">{{ entry.result.total }}</strong><span v-if="entry.target!==null" class="outcome" :class="entry.result.total>=entry.target?'pass':'fail'">{{ rollOutcome(entry) }}</span></div><div v-if="entry.fortunes||entry.misfortunes" class="special-result-row"><span v-if="entry.fortunes" class="special-result fortune-result">Fortune ×{{ entry.fortunes }}</span><span v-if="entry.misfortunes" class="special-result misfortune-result">Misfortune ×{{ entry.misfortunes }}</span></div><small>{{ entry.result.natural }} natural + {{ entry.stat }} Stat<template v-if="entry.skillName"> + {{ entry.skillBonus }} {{ entry.skillName }}</template> {{ entry.conditions>=0?'+':'−' }} {{ Math.abs(entry.conditions) }} Conditions</small></article></div><div v-else class="empty-inline sim-empty-inline">No rolls yet.</div>
    </section>

    <section v-else class="character-sheet-view">
      <section v-if="selectedCharacter" class="digital-character-sheet card-surface review-character-sheet">
        <div class="field-grid two review-identity-edit"><label class="field-label review-name-field">Character Name<div class="field-control disabled-readout">{{ selectedCharacter.name }}</div></label><label class="field-label review-name-field">Campaign<div class="field-control disabled-readout">{{ selectedCharacter.campaignName||'No Campaign' }}</div></label></div>
        <div class="review-grid review-summary-grid"><article><span>Species</span><strong>{{ selectedCharacter.species||'Not selected' }} <small v-if="isCustomSpecies(selectedCharacter.species)" class="custom-content-badge">CUSTOM</small></strong><small>{{ selectedCharacter.languages?.[0]||'—' }}</small></article><article><span>Spark</span><strong>{{ selectedCharacter.spark||'—' }}</strong></article><article><span>Homeland</span><strong>{{ selectedCharacter.homeland||'—' }}</strong></article><article><span>Oath</span><strong>{{ selectedCharacter.oath||'—' }}</strong></article><article><span>Faith</span><strong>{{ selectedCharacter.faith||'—' }}</strong></article><article><span>Path</span><strong>{{ selectedPathName }}</strong><small>{{ selectedCharacter.path==='magic'?`Magic Level ${magicLevel} + Talents`:'Talents' }}</small></article><article class="review-wide-field"><span>Languages</span><strong>{{ selectedCharacter.languages?.join(' · ')||'—' }}</strong></article></div>
        <section class="review-section character-sheet-attributes"><h2>Attributes</h2><div class="review-attribute-cards single-row-attributes"><article v-for="attribute in attributes" :key="attribute.id"><strong>{{ attribute.name }}</strong><span>Rank {{ selectedCharacter.attributes[attribute.id] }}</span><small>Modifier +{{ attributeModifier(selectedCharacter.attributes[attribute.id]) }}</small></article></div><div v-if="secondaryStats" class="review-secondary-strip"><article><span>Speed</span><strong>{{ secondaryStats.speed }}</strong></article><article><span>Aim</span><strong>{{ secondaryStats.aim }}</strong></article><article><span>Mettle</span><strong>{{ secondaryStats.mettle }}</strong></article><article><span>Ward</span><strong>{{ secondaryStats.ward }}</strong></article><article><span>Control</span><strong>{{ secondaryStats.control }}</strong></article><article><span>Power</span><strong>{{ secondaryStats.power }}</strong></article><article><span>Guts</span><strong>{{ reviewGuts }}</strong><small v-if="gearGutsBonus">{{ secondaryStats.guts }} + {{ gearGutsBonus }} gear</small></article><article class="review-mana-stat"><span>Mana</span><small>Max / Round</small><strong>{{ maxMana }} / +{{ manaPerRound }}</strong></article></div></section>
        <section class="review-section review-weapons-section"><h2>Weapons</h2><div v-if="weapons.length" class="review-box-list"><article v-for="weapon in weapons" :key="weapon.name" class="review-feature-box weapon"><strong>{{ weapon.name }}</strong><span>{{ weapon.detail||'Weapon' }}</span><small v-if="weapon.effect">{{ weapon.effect }}</small></article></div><p v-else class="empty-inline">No purchased weapons.</p></section>
        <section class="review-section review-armor-section"><h2>Armor &amp; Shields</h2><div v-if="armor.length" class="review-box-list"><article v-for="item in armor" :key="item.name" class="review-feature-box armor"><strong>{{ item.name }}</strong><span>{{ item.detail||'Protective equipment' }}</span><small v-if="item.effect">{{ item.effect }}</small></article></div><p v-else class="empty-inline">No purchased armor or shields.</p></section>
        <section class="review-section"><h2>Skills</h2><div v-if="selectedSkills.length" class="review-skill-grid"><article v-for="skill in selectedSkills" :key="skill.name" class="review-skill-sheet-row"><div><strong>{{ skill.name }}</strong></div><div class="review-skill-values"><strong>Rank {{ skill.rank }}</strong><small>Modifier +{{ skillModifier(skill.rank) }}</small></div></article></div><p v-else class="muted">No Skills recorded.</p></section>
        <details v-if="selectedCharacter.path==='magic'" class="review-section review-collapsible" open><summary><h2>Magic</h2><span>{{ selectedCharacter.loreAttunement||'Not selected' }} · {{ maxMana }} Mana</span></summary><div class="review-collapsible-body"><article class="review-feature-box lore"><strong>Lore of {{ selectedCharacter.loreAttunement||'—' }}</strong><span>{{ loreDescriptions[selectedCharacter.loreAttunement||'']||'No Lore selected.' }}</span></article><h3 class="review-subheading">Lore Spells</h3><div class="review-spell-column"><article v-for="spell in loreCharacterSpells" :key="spell" class="review-feature-box spell full-rule-entry" :class="spellLoreClass(spell)"><header><strong>{{ spell }} <small v-if="isCustomSpell(spell)" class="custom-content-badge">CUSTOM</small></strong><small v-if="effectiveMana(spell)!==null">{{ effectiveMana(spell) }} Mana</small></header><span>{{ spell===signatureSpell?'Signature Spell · ':'' }}{{ spellDetail(spell)?.lore }}</span><p v-if="spellDetail(spell)?.flavor" class="rule-flavor"><em>{{ spellDetail(spell)?.flavor }}</em></p><div v-if="visibleRuleFields(spellDetail(spell)?.rules||'').length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(spellDetail(spell)?.rules||'')" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div></article><p v-if="!loreCharacterSpells.length" class="muted">No Lore Spells recorded.</p></div><h3 class="review-subheading">Invocation Spells</h3><div class="review-spell-column"><article v-for="spell in invocationCharacterSpells" :key="spell" class="review-feature-box spell full-rule-entry" :class="spellLoreClass(spell)"><header><strong>{{ spell }} <small v-if="isCustomSpell(spell)" class="custom-content-badge">CUSTOM</small></strong><small v-if="effectiveMana(spell)!==null">{{ effectiveMana(spell) }} Mana</small></header><span>{{ spellDetail(spell)?.lore }}</span><p v-if="spellDetail(spell)?.flavor" class="rule-flavor"><em>{{ spellDetail(spell)?.flavor }}</em></p><div v-if="visibleRuleFields(spellDetail(spell)?.rules||'').length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(spellDetail(spell)?.rules||'')" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div></article><p v-if="!invocationCharacterSpells.length" class="muted">No Invocation Spells recorded.</p></div></div></details>
        <details class="review-section review-collapsible"><summary><h2>Talents</h2><span>{{ selectedCharacter.talents?.length||0 }} selected</span></summary><div class="review-collapsible-body review-box-list"><article v-for="talent in selectedCharacter.talents||[]" :key="talent" class="review-feature-box talent full-rule-entry"><header><strong>{{ talent }} <small v-if="isCustomTalent(talent)" class="custom-content-badge">CUSTOM</small></strong><small>{{ talentCategory(talent) }}</small></header><p v-if="structuredRule(talentText(talent)).intro" class="rule-flavor"><em>{{ structuredRule(talentText(talent)).intro }}</em></p><div v-if="visibleRuleFields(talentText(talent)).length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(talentText(talent))" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div></article><p v-if="!selectedCharacter.talents?.length">No Talents selected.</p></div></details>
        <section class="review-section"><div class="review-section-heading-split"><h2>Equipment &amp; Gear</h2><strong>{{ selectedCharacter.wealthRemaining??0 }} {{ selectedCharacter.wealthCurrency||'NP' }}</strong></div><div v-if="otherGear.length" class="review-equipment-grid"><article v-for="(item,index) in otherGear" :key="`${item.name}-${index}`"><strong>{{ item.name }}</strong><small>{{ item.category||'Gear' }} · {{ item.costNp??item.costSp }} {{ selectedCharacter.wealthCurrency||'NP' }}</small><p v-if="item.detail">{{ item.detail }}</p><p v-if="item.effect">{{ item.effect }}</p><small v-if="item.choice">Choice: {{ item.choice }}</small><small v-if="item.attachedTo">Attached to: {{ item.attachedTo }}</small></article></div><p v-else class="muted">No additional equipment purchased.</p></section>
      </section>
      <section v-else class="empty-state card-surface"><h2>Select a Character</h2><p>Choose a saved character above to open the Character Sheet.</p></section>
    </section>
  </main>
</template>

<style scoped>
.custom-content-badge{display:inline-flex;align-items:center;margin-left:5px;padding:2px 5px;border:1px solid #7b4f8d;border-radius:999px;background:#efe5f4;color:#60336f;font-size:8px;font-weight:900;letter-spacing:.06em;vertical-align:middle}.rhythm-sheet-tabs{margin-bottom:8px}.character-selection-panel{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:end;gap:12px;margin-bottom:12px;padding:10px 12px}.character-selection-summary{display:grid;gap:2px;text-align:right}.character-selection-summary span{color:var(--ink-soft);font-size:calc(9px + var(--font-offset))}.fortune-tip{display:grid;gap:4px;margin:12px 0;padding:10px 12px;border:1px solid var(--line);border-left:5px solid var(--accent);border-radius:9px;background:var(--paper-2)}.fortune-tip strong{font-family:Georgia,'Times New Roman',serif}.fortune-tip span{color:var(--ink-soft);line-height:1.5}.field-off{opacity:.68}.disabled-readout{display:flex;align-items:center;background:var(--paper-2);color:var(--ink-soft);cursor:not-allowed}.review-character-sheet{display:grid;gap:0;padding:12px}.review-character-sheet>.review-summary-grid{margin-top:0}.review-character-sheet>.review-section{width:100%;box-sizing:border-box}@media(max-width:760px){.character-selection-panel{grid-template-columns:1fr}.character-selection-summary{text-align:left}}
</style>
