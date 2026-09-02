<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import CharacterAttributePanel from '../components/CharacterAttributePanel.vue'
import { attributes, passiveTargets } from '../data/bramble'
import { skillDefinitions } from '../data/characterOptions'
import { coreAbilities } from '../data/coreAbilities'
import { speciesData } from '../data/speciesData'
import { loreSpells } from '../data/magicOptions'
import { loreDescriptions, spellDetails } from '../data/magicDetails'
import { ruleSourceDocuments } from '../data/rulesSource'
import { canonicalTalentName, talentNameMatches } from '../data/talentCategories'
import { characterSheetArmorProfile, characterSheetWeaponProfile, derivedStats, equippedProtectiveGear, equipmentControlBonus, equipmentGutsBonus, equipmentMagicRegenBonus, equipmentManaSyphon, equipmentRenewHeartConditionBonus, equipmentSpellManaReduction, magicResources, normalizeSkillName, rankModifier, rhythmResult, structuredRule, visibleRuleFields, equipmentArmorPenalty, equipmentSpeedPenalty } from '../rules/rulesEngine'
import { resolveSpellManaCost, spellCostLabel } from '../rules/magicRules'
import { canonicalGearCostWp } from '../rules/economy'
import { formatThreadpieceWp } from '../rules/threadpieces'
import { characterStatus, loadCharacters, type CharacterRecord } from '../services/characters'
import { readLocalStorage, RHYTHM_STORE, writeLocalStorage } from '../services/storage'
import { loadCustomData, type CustomSpeciesItem, type CustomSpellItem, type CustomTalentItem } from '../services/customData'
import { adventureKitEquipment } from '../data/equipmentNormalization'

type RhythmMode='normal'|'edged'|'weighted'
type TargetMode='none'|'passive'|'active'
type RhythmResultValue=ReturnType<typeof rhythmResult>
interface RhythmHistoryEntry{id:string;createdAt:string;rollType:string;mode:RhythmMode;stat:number;skillName:string;skillBonus:number;conditions:number;target:number|null;targetLabel:string;result:RhythmResultValue;fortunes:number;misfortunes:number}
const sheet=ref<'attribute'|'character'|'ability'|'encounter'>('attribute')
const characters=ref<CharacterRecord[]>(loadCharacters().filter(character=>characterStatus(character)!=='incomplete'))
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
function readStore<T>(key:string,fallback:T):T{try{return JSON.parse(readLocalStorage(key)||'') as T}catch{return fallback}}
function writeStore(key:string,value:unknown){return writeLocalStorage(key,JSON.stringify(value))}
function stamp(){return new Date().toISOString()}
function formatTime(value:string){return new Date(value).toLocaleTimeString([],{hour:'numeric',minute:'2-digit'})}
function rank(c:CharacterRecord,key:'agility'|'might'|'hide'|'lore'|'bravery'){return Number(c.attributes?.[key]||0)}
const skillModifier=rankModifier

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
  const secondary=derivedStats(c.attributes,equipmentGutsBonus(c.equipment),equipmentControlBonus(c.equipment),equipmentArmorPenalty(c.equipment))
  return[
    {key:'agility',label:'Agility',value:rankModifier(rank(c,'agility')),attribute:'Agility'},
    {key:'might',label:'Might',value:rankModifier(rank(c,'might')),attribute:'Might'},
    {key:'hide',label:'Hide',value:rankModifier(rank(c,'hide')),attribute:'Hide'},
    {key:'lore',label:'Lore',value:rankModifier(rank(c,'lore')),attribute:'Lore'},
    {key:'bravery',label:'Bravery',value:rankModifier(rank(c,'bravery')),attribute:'Bravery'},
    {key:'speed',label:'Speed',value:secondary.speed,attribute:'Agility'},
    {key:'aim',label:'Aim',value:secondary.aim,attribute:'Agility'},
    {key:'accuracy',label:'Accuracy',value:secondary.accuracy,attribute:'Agility'},
    {key:'brawl',label:'Brawl',value:secondary.brawl,attribute:'Might'},
    {key:'fury',label:'Fury',value:secondary.fury,attribute:'Might'},
    {key:'ward',label:'Ward',value:secondary.ward,attribute:'Hide'},
    {key:'guts',label:'Guts',value:secondary.guts,attribute:'Hide'},
    {key:'control',label:'Control',value:secondary.control,attribute:'Lore'},
    {key:'power',label:'Power',value:secondary.power,attribute:'Lore'},
    {key:'spirit',label:'Spirit',value:secondary.spirit,attribute:'Bravery'},
    {key:'heart',label:'Heart',value:secondary.heart,attribute:'Bravery'},
  ]
})
function allowedStatKeys(type:string){
  if(type==='Initiative')return['speed']
  if(type==='Strike')return['aim','brawl','control']
  if(type==='Ward')return['ward']
  if(['Attribute Save','Compelled','Skill Check','Role-Play'].includes(type))return['agility','might','hide','lore','bravery']
  return allCharacterStats.value.map(item=>item.key)
}
const statOptions=computed(()=>{const allowed=new Set(allowedStatKeys(rollType.value));return allCharacterStats.value.filter(item=>allowed.has(item.key))})
const selectedStat=computed(()=>statOptions.value.find(item=>item.key===characterStatKey.value)||statOptions.value[0]||null)
function statOptionLabel(stat:{key:string;label:string;value:number}){
  if(stat.key==='aim')return`Aim +${stat.value} (Shooting)`
  if(stat.key==='brawl')return`Brawl +${stat.value} (Melee)`
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
const gearRenewHeartBonus=computed(()=>equipmentRenewHeartConditionBonus(selectedCharacter.value?.equipment))
const effectiveRhythmConditions=computed(()=>Number(rhythmConditions.value||0)+(rollType.value==='Compelled'?gearRenewHeartBonus.value:0)+(normalizeSkillName(rhythmSkill.value)==='Whisperster'?gearArmorPenalty.value:0))
const rollSummary=computed(()=>{const style=rhythmMode.value==='normal'?'Normal':rhythmMode.value==='edged'?'Edged':'Weighted';const stat=selectedStat.value?.label||statFieldLabel.value;const parts=[`${stat} (${effectiveRhythmStat.value})`];if(rollUsesSkill.value&&rhythmSkill.value)parts.push(`${rhythmSkill.value} (${Number(rhythmSkillBonus.value||0)})`);const conditions=effectiveRhythmConditions.value;if(conditions!==0)parts.push(`Conditions (${conditions})`);if(rollType.value==='Compelled'&&gearRenewHeartBonus.value)parts.push(`Votive Icon (+${gearRenewHeartBonus.value})`);return`${style} ${rollType.value} Roll: ${parts.join(' + ')} = ${rhythmCombinedStat.value+conditions}`})
const currentTarget=computed(()=>targetMode.value==='passive'?Number(passiveTarget.value):targetMode.value==='active'&&activeTarget.value!==null?Number(activeTarget.value):null)
function targetLabel(){if(targetMode.value==='active')return'Active Target';if(targetMode.value==='passive')return passiveTargets.find(([,value])=>value===Number(passiveTarget.value))?.[0]||'Passive Target';return'No Target'}
function rollAttributeCheck(){const conditions=effectiveRhythmConditions.value;const result=rhythmResult(dice(rhythmMode.value==='normal'?3:4),rhythmMode.value,rhythmCombinedStat.value,conditions);const kept=result.kept||result.rolled;const entry:RhythmHistoryEntry={id:crypto.randomUUID(),createdAt:stamp(),rollType:rollType.value,mode:rhythmMode.value,stat:effectiveRhythmStat.value,skillName:rollUsesSkill.value?rhythmSkill.value:'',skillBonus:rollUsesSkill.value?Number(rhythmSkillBonus.value||0):0,conditions,target:currentTarget.value,targetLabel:targetLabel(),result,fortunes:kept.filter(value=>value>=8).length,misfortunes:kept.filter(value=>value<=2).length};rhythmHistory.value=[entry,...rhythmHistory.value].slice(0,5);const saved=writeStore(RHYTHM_STORE,rhythmHistory.value);if(!saved.ok)alert(saved.message)}
function rollOutcome(entry:RhythmHistoryEntry){if(entry.target===null)return'';return entry.result.total>=entry.target?'SUCCESS':'FAILURE'}

const gearGutsBonus=computed(()=>equipmentGutsBonus(selectedCharacter.value?.equipment))
const gearControlBonus=computed(()=>equipmentControlBonus(selectedCharacter.value?.equipment))
const gearMagicRegenBonus=computed(()=>equipmentMagicRegenBonus(selectedCharacter.value?.equipment))
const gearArmorPenalty=computed(()=>equipmentArmorPenalty(selectedCharacter.value?.equipment))
const gearSpeedPenalty=computed(()=>equipmentSpeedPenalty(selectedCharacter.value?.equipment,selectedCharacter.value?.species==='Tordan'))
const secondaryStats=computed(()=>selectedCharacter.value?derivedStats(selectedCharacter.value.attributes,gearGutsBonus.value,gearControlBonus.value,gearSpeedPenalty.value):null)
const selectedSkills=computed(()=>{const c=selectedCharacter.value;if(!c)return[];const ranks=c.skillRanks&&Object.keys(c.skillRanks).length?c.skillRanks:Object.fromEntries((c.skills||[]).map(name=>[normalizeSkillName(name),1]));return Object.entries(ranks).map(([name,value])=>({name:normalizeSkillName(name),rank:Number(value)})).sort((a,b)=>a.name.localeCompare(b.name))})
const weapons=computed(()=>selectedCharacter.value?.equipment?.filter(item=>item.category==='Weapon')||[])
const armor=computed(()=>equippedProtectiveGear(selectedCharacter.value?.equipment))
const otherGear=computed(()=>selectedCharacter.value?[...adventureKitEquipment(selectedCharacter.value.adventureKit),...(selectedCharacter.value.equipment||[]).filter(item=>!['Weapon','Armor & Shield','Trinket'].includes(item.category||''))]:[])
const weaponSlots=computed(()=>Array.from({length:Math.max(3,weapons.value.length)},(_,index)=>characterSheetWeaponProfile(weapons.value[index],selectedCharacter.value?.equipment)))
const armorSlots=computed(()=>Array.from({length:Math.max(2,armor.value.length)},(_,index)=>characterSheetArmorProfile(armor.value[index],selectedCharacter.value?.equipment)))
const equippedTrinkets=computed(()=>selectedCharacter.value?.equipment?.filter(item=>item.category==='Trinket'&&(item.equipped!==false))||[])

function spellDetail(name:string){const custom=customSpells.find(item=>item.name===name);return custom||spellDetails[name]}
const talentSections=ruleSourceDocuments.talents.sections
function talentText(name:string){const custom=customTalents.find(item=>item.name===name);if(custom)return custom.text;const section=talentSections.find(item=>talentNameMatches(item.heading,name));return section?.blocks.filter(block=>block.type==='paragraph').map(block=>block.type==='paragraph'?block.text:'').join(' ')||''}
function talentKeywords(name:string){const custom=customTalents.find(item=>item.name===name);if(custom)return custom.keywords;const match=talentText(name).match(/\bKEYWORDS?:\s*(.+)$/i);return match?match[1].split('|').map(item=>item.trim()).filter(Boolean):[]}
const talentAbilityKeywords=new Set(['Core','Root','Move','Combat','Reactive','Instinct','Passive','Touch','Shoot','Magic'])
function canonicalAbilityType(value:string){const key=String(value||'').trim().toLowerCase();if(key==='reaction')return'Reactive';if(key==='movement')return'Move';if(key==='melee')return'Touch';return String(value||'').trim().replace(/^./,letter=>letter.toUpperCase())}
function talentAbilityClasses(name:string){return Array.from(new Set(talentKeywords(name).map(canonicalAbilityType).filter(value=>talentAbilityKeywords.has(value)))).map(value=>`type-${value.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`)}
function weaponPropertyPills(value:string){return value==='—'?[]:String(value||'').split(',').map(part=>part.trim()).filter(Boolean)}
function spellLoreClass(name:string){return `spell-lore-${String(spellDetail(name)?.lore||'invocation').toLowerCase()}`}
const magicLevel=computed(()=>Number(selectedCharacter.value?.magicLevel??(selectedCharacter.value?.path==='magic'?1:0)))
const resources=computed(()=>selectedCharacter.value?magicResources(selectedCharacter.value.attributes,magicLevel.value,gearMagicRegenBonus.value):{manaPool:0,magicRegen:0})
const maxMana=computed(()=>resources.value.manaPool)
const signatureSpell=computed(()=>{const c=selectedCharacter.value;if(!c?.loreAttunement)return'';return customSpells.find(item=>item.lore===c.loreAttunement&&item.signature)?.name||loreSpells[c.loreAttunement]?.[0]||''})
function spellNamesForCharacter(character:CharacterRecord|null){if(!character)return[] as string[];const level=Math.max(0,Number(character.magicLevel??(character.path==='magic'?1:0))||0);if(level<1)return[] as string[];const signature=character.loreAttunement?(customSpells.find(item=>item.lore===character.loreAttunement&&item.signature)?.name||loreSpells[character.loreAttunement]?.[0]||''):'';return Array.from(new Set([signature,...(character.spells||[]),...(character.invocationSpells||[]),...(character.invocationSpell?[character.invocationSpell]:[])].filter(Boolean) as string[]))}
const characterSpells=computed(()=>spellNamesForCharacter(selectedCharacter.value))
function effectiveMana(name:string){
  const detail=spellDetail(name);if(!detail)return null
  const custom=customSpells.find(item=>item.name===name)
  return resolveSpellManaCost({name,lore:detail.lore,baseCost:detail.manaCost,attunedLore:selectedCharacter.value?.loreAttunement,manaSyphon:equipmentManaSyphon(selectedCharacter.value?.equipment),focusReduction:equipmentSpellManaReduction(selectedCharacter.value?.equipment),signature:Boolean(custom?.signature),cantrip:Boolean(custom&&!custom.signature&&detail.lore==='Invocation'&&detail.manaCost===0)})
}
function spellCostText(name:string){
  const detail=spellDetail(name);if(!detail)return'Variable'
  const custom=customSpells.find(item=>item.name===name)
  return spellCostLabel({name,lore:detail.lore,baseCost:detail.manaCost,attunedLore:selectedCharacter.value?.loreAttunement,manaSyphon:equipmentManaSyphon(selectedCharacter.value?.equipment),focusReduction:equipmentSpellManaReduction(selectedCharacter.value?.equipment),signature:Boolean(custom?.signature),cantrip:Boolean(custom&&!custom.signature&&detail.lore==='Invocation'&&detail.manaCost===0)})
}
const loreCharacterSpells=computed(()=>characterSpells.value.filter(name=>!selectedCharacter.value?.invocationSpells?.includes(name)&&name!==selectedCharacter.value?.invocationSpell).sort((a,b)=>(effectiveMana(a)??999)-(effectiveMana(b)??999)||a.localeCompare(b)))
const invocationCharacterSpells=computed(()=>characterSpells.value.filter(name=>selectedCharacter.value?.invocationSpells?.includes(name)||name===selectedCharacter.value?.invocationSpell).sort((a,b)=>(effectiveMana(a)??999)-(effectiveMana(b)??999)||a.localeCompare(b)))
const selectedPathName=computed(()=>({magic:'Wind-Touched',talents:'Gifted Heart',skills:'Practiced Hand',attribute:'Tempered Form'} as const)[selectedCharacter.value?.path||'magic']||'Gifted Heart')

type AbilityManagerEntry={name:string;source:string;keywords:string[];rules:string;compatibility:string[];characterSpecific:boolean}
const selectedCoreAbilityName=ref(coreAbilities[0]?.name||'')
const abilityManagerCharacter=computed(()=>selectedCharacter.value)
const selectedCoreAbility=computed(()=>coreAbilities.find(ability=>ability.name===selectedCoreAbilityName.value)||coreAbilities[0]||null)
function managerAbilityKeywords(values:string[]){return Array.from(new Set(values.map(value=>canonicalAbilityType(value)).filter(Boolean)))}
function managerCompatibility(keywords:string[]){const normalized=managerAbilityKeywords(keywords);const families=new Set<string>()
  for(const keyword of normalized){if(['Instinct','Move','Touch','Shoot','Magic','Combat'].includes(keyword))families.add(keyword);if(['Passive','Reactive','Root'].includes(keyword))families.add(keyword)}
  return Array.from(families)
}
function managerEntry(name:string,source:string,rules:string,keywords:string[],characterSpecific:boolean):AbilityManagerEntry{return{name,source,keywords:managerAbilityKeywords(keywords),rules,compatibility:managerCompatibility(keywords),characterSpecific}}
function managerTraitEntries(character:CharacterRecord|null){
  if(!character)return[] as AbilityManagerEntry[]
  const builtInSpecies=speciesData.find(item=>item.name===character.species)
  const customSpeciesEntry=customSpecies.find(item=>item.name===character.species)
  const speciesEntries=(builtInSpecies?.speciesTraits||customSpeciesEntry?.speciesTraits||[]).map(trait=>managerEntry(trait.name,'Heritage Trait',trait.text,trait.keywords,true))
  const selectedCultureNames=new Set(character.cultureTraits||[])
  const culturePool=[...(builtInSpecies?.cultureTraits||[]),...(customSpeciesEntry?.cultureTraits||[])].filter(trait=>!selectedCultureNames.size||selectedCultureNames.has(trait.name))
  const cultureEntries=culturePool.map(trait=>managerEntry(trait.name,'Cultural Trait',trait.text,trait.keywords,true))
  return [...speciesEntries,...cultureEntries]
}
function allSpeciesEntries(){return[...speciesData.flatMap(species=>species.speciesTraits.map(trait=>managerEntry(trait.name,`${species.name} Heritage Trait`,trait.text,trait.keywords,false))),...speciesData.flatMap(species=>species.cultureTraits.map(trait=>managerEntry(trait.name,`${species.name} Cultural Trait`,trait.text,trait.keywords,false))),...customSpecies.flatMap(species=>species.speciesTraits.map(trait=>managerEntry(trait.name,`${species.name} Heritage Trait`,trait.text,trait.keywords,false))),...customSpecies.flatMap(species=>species.cultureTraits.map(trait=>managerEntry(trait.name,`${species.name} Cultural Trait`,trait.text,trait.keywords,false)))]}
function talentEntriesFor(character:CharacterRecord|null){
  const names=character?(character.talents||[]):talentSections.filter(section=>section.heading!=='Overview'&&section.heading!=='TALENTS').map(section=>section.heading)
  return names.map(name=>managerEntry(canonicalTalentName(name),'Talent',talentText(name),talentKeywords(name),Boolean(character)))
}
function spellEntriesFor(character:CharacterRecord|null){
  const names=character?spellNamesForCharacter(character):Array.from(new Set([...Object.keys(spellDetails),...customSpells.map(item=>item.name)]))
  return names.map(name=>{const detail=spellDetail(name);return managerEntry(name,'Spell',detail?.rules||'',detail?.keywords||[],Boolean(character))})
}
const abilityManagerEntries=computed(()=>{const character=abilityManagerCharacter.value;const entries=[...(character?managerTraitEntries(character):allSpeciesEntries()),...talentEntriesFor(character),...spellEntriesFor(character)]
  const seen=new Set<string>()
  return entries.filter(entry=>{const key=`${entry.source}|${entry.name}`;if(seen.has(key))return false;seen.add(key);return Boolean(entry.rules.trim())})
})
const filteredAbilityManagerEntries=computed(()=>{const core=selectedCoreAbility.value;if(!core)return[] as AbilityManagerEntry[]
  const coreFamilies=new Set(managerCompatibility(core.keywords))
  return abilityManagerEntries.value.filter(entry=>{if(!entry.compatibility.length)return true;return entry.compatibility.some(keyword=>keyword==='Passive'||keyword==='Reactive'||keyword==='Root'||coreFamilies.has(keyword))}).sort((a,b)=>a.source.localeCompare(b.source)||a.name.localeCompare(b.name))
})

</script>

<template>
  <main class="page simulator-page rhythm-engine-page">
    <AppHeader />
    <div class="page-title-block"><h1>Rhythm Engine</h1></div>
    <div class="segment-tabs simulator-tabs rhythm-sheet-tabs"><button type="button" class="segment-tab" :class="{active:sheet==='character'}" @click="sheet='character'">Character Sheet</button><button type="button" class="segment-tab" :class="{active:sheet==='attribute'}" @click="sheet='attribute'">Dice Roller</button><button type="button" class="segment-tab" :class="{active:sheet==='ability'}" @click="sheet='ability'">Ability Manager</button><button type="button" class="segment-tab" :class="{active:sheet==='encounter'}" @click="sheet='encounter'">Encounter Builder</button></div>

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

    <section v-else-if="sheet==='ability'" class="tool-panel card-surface ability-manager-card"><div class="tool-heading"><div><p class="eyebrow">ABILITY MANAGER</p><h2>Ability Chain Simulator</h2></div></div><p class="tool-explainer">Choose a core ability, then review compatible abilities. Selecting a character limits the list to that character’s known or inherited options.</p><div class="ability-manager-controls"><label class="field-label">Core Ability<select v-model="selectedCoreAbilityName" class="field-control"><option v-for="ability in coreAbilities" :key="ability.name" :value="ability.name">{{ ability.name }} — {{ ability.type }}</option></select></label></div><div v-if="selectedCoreAbility" class="ability-manager-summary"><article class="ability-manager-focus"><small>Selected Core Ability</small><strong>{{ selectedCoreAbility.name }}</strong><span>{{ selectedCoreAbility.type }}</span><div class="keyword-pill-row"><span v-for="keyword in selectedCoreAbility.keywords" :key="keyword" class="ability-cost-pill" :class="`type-${canonicalAbilityType(keyword).toLowerCase().replace(/[^a-z0-9]+/g,'-')}`">{{ canonicalAbilityType(keyword) }}</span></div></article><article class="ability-manager-focus"><small>Source Pool</small><strong>{{ abilityManagerCharacter?abilityManagerCharacter.name:'General reference' }}</strong><span>{{ abilityManagerCharacter?`${abilityManagerCharacter.species} ability list`:'Species traits, talents, and spells' }}</span><div class="keyword-pill-row"><span class="keyword-pill">{{ filteredAbilityManagerEntries.length }} compatible abilities</span></div></article></div><div v-if="filteredAbilityManagerEntries.length" class="ability-manager-results"><article v-for="entry in filteredAbilityManagerEntries" :key="`${entry.source}-${entry.name}`" class="review-feature-box ability-manager-entry full-rule-entry"><header><div><strong>{{ entry.name }}</strong><small>{{ entry.source }}</small></div><span v-if="entry.characterSpecific" class="custom-content-badge manager-badge">KNOWN</span></header><div v-if="visibleRuleFields(entry.rules).length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(entry.rules)" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><p v-else>{{ entry.rules }}</p><div class="keyword-pill-row"><span v-for="keyword in entry.keywords" :key="keyword" :class="talentAbilityKeywords.has(canonicalAbilityType(keyword))?['ability-cost-pill',`type-${canonicalAbilityType(keyword).toLowerCase().replace(/[^a-z0-9]+/g,'-')}`]:'keyword-pill'">{{ canonicalAbilityType(keyword) }}</span><span v-for="tag in entry.compatibility" :key="`${entry.name}-${tag}`" class="keyword-pill">{{ tag }}</span></div></article></div><div v-else class="empty-inline sim-empty-inline">No compatible abilities found for the selected core ability.</div></section>

    <section v-else-if="sheet==='encounter'" class="empty-state card-surface"><h2>Encounter Builder</h2><p>This workspace is reserved for the future Encounter Builder.</p></section>

    <section v-else class="character-sheet-view">
      <section v-if="selectedCharacter" class="digital-character-sheet card-surface review-character-sheet">
        <details class="review-section review-collapsible character-detail-section" open><summary><h2>Character Detail</h2><span>Identity &amp; origin</span></summary><div class="review-collapsible-body character-detail-body"><div class="field-grid two review-identity-edit"><label class="field-label review-name-field">Character Name<div class="field-control disabled-readout">{{ selectedCharacter.name }}</div></label><label class="field-label review-name-field">Campaign<div class="field-control disabled-readout">{{ selectedCharacter.campaignName||'No Campaign' }}</div></label></div><div class="review-grid review-summary-grid"><article><span>Species</span><strong>{{ selectedCharacter.species||'Not selected' }} <small v-if="isCustomSpecies(selectedCharacter.species)" class="custom-content-badge">CUSTOM</small></strong><small>{{ selectedCharacter.languages?.[0]||'—' }}</small></article><article><span>Spark</span><strong>{{ selectedCharacter.spark||'—' }}</strong></article><article><span>Homeland</span><strong>{{ selectedCharacter.homeland||'—' }}</strong></article><article><span>Oath</span><strong>{{ selectedCharacter.oath||'—' }}</strong></article><article><span>Faith</span><strong>{{ selectedCharacter.faith||'—' }}</strong></article><article><span>Path</span><strong>{{ selectedPathName }}</strong></article><article class="review-wide-field"><span>Languages</span><strong>{{ selectedCharacter.languages?.join(' · ')||'—' }}</strong></article></div></div></details>
        <details class="review-section review-collapsible character-sheet-attributes" open><summary><h2>Attributes</h2><span>Ranks &amp; secondary stats</span></summary><div class="review-collapsible-body"><CharacterAttributePanel v-if="secondaryStats" :attributes="selectedCharacter.attributes" :magic-level="magicLevel" :guts-bonus="gearGutsBonus" :control-bonus="gearControlBonus" :magic-regen-bonus="gearMagicRegenBonus" :armor-penalty="gearSpeedPenalty" /></div></details>
        <details class="review-section review-collapsible review-weapons-section" open><summary><h2>Weapons</h2><span>{{ weapons.length }} equipped</span></summary><div class="review-collapsible-body equipment-slot-sheet"><div class="equipment-slot-header weapon-slot-grid"><span>Weapon</span><span>Damage</span><span>Range</span><span>Properties / Notes</span><span>Wt.</span></div><div v-for="(slot,index) in weaponSlots" :key="`weapon-slot-${index}`" class="equipment-slot-row weapon-slot-grid"><strong>{{ slot.name }}</strong><span>{{ slot.damage }}</span><span>{{ slot.range }}</span><span class="keyword-pill-row equipment-quality-cell"><span v-for="property in weaponPropertyPills(slot.properties)" :key="property" class="keyword-pill">{{ property }}</span><span v-if="!weaponPropertyPills(slot.properties).length">—</span></span><span>{{ slot.weight }}</span></div></div></details>
        <details class="review-section review-collapsible review-armor-section" open><summary><h2>Armor &amp; Shield</h2><span>{{ armor.length }} / 2 protective slots</span></summary><div class="review-collapsible-body"><div class="equipment-slot-sheet"><div class="equipment-slot-header armor-slot-grid"><span>Armor / Shield</span><span>Guts</span><span>Mana Syphon</span><span>Armor Penalty</span><span>Might</span><span>Wt.</span></div><div v-for="(slot,index) in armorSlots" :key="`armor-slot-${index}`" class="equipment-slot-row armor-slot-grid"><strong>{{ slot.name }}</strong><span>{{ slot.guts }}</span><span>{{ slot.mana }}</span><span>{{ slot.armorPenalty }}</span><span>{{ slot.might }}</span><span>{{ slot.weight }}</span></div></div><div class="trinket-slot-sheet"><h3>Trinkets</h3><div v-if="equippedTrinkets.length" class="trinket-slot-grid"><article v-for="(item,index) in equippedTrinkets" :key="`${item.name}-${index}`" class="trinket-slot-card"><strong>{{ item.name }}</strong><small>{{ item.effect || item.detail || 'Passive trinket effect.' }}</small></article></div><p v-else class="muted">No trinkets equipped.</p></div></div></details>
        <details class="review-section review-collapsible character-sheet-content-section"><summary><h2>Skills</h2><span>{{ selectedSkills.length }} recorded</span></summary><div class="review-collapsible-body"><div v-if="selectedSkills.length" class="review-skill-grid"><article v-for="skill in selectedSkills" :key="skill.name" class="review-skill-sheet-row"><div><strong>{{ skill.name }}</strong></div><div class="review-skill-values"><strong>Rank {{ skill.rank }}</strong><small>Modifier +{{ skillModifier(skill.rank) }}</small></div></article></div><p v-else class="muted">No Skills recorded.</p></div></details>
        <details v-if="magicLevel>0" class="review-section review-collapsible character-sheet-content-section"><summary><h2>Magic</h2><span>{{ selectedCharacter.loreAttunement||'Not selected' }} · {{ maxMana }} Mana Pool</span></summary><div class="review-collapsible-body"><article class="review-feature-box lore"><strong>Lore of {{ selectedCharacter.loreAttunement||'—' }}</strong><span>{{ loreDescriptions[selectedCharacter.loreAttunement||'']||'No Lore selected.' }}</span></article><h3 class="review-subheading">Lore Spells</h3><div class="review-spell-column"><article v-for="spell in loreCharacterSpells" :key="spell" class="review-feature-box spell full-rule-entry" :class="spellLoreClass(spell)"><header><strong>{{ spell }} <small v-if="isCustomSpell(spell)" class="custom-content-badge">CUSTOM</small></strong><small>{{ spellCostText(spell) }}</small></header><span>{{ spell===signatureSpell?'Signature Spell · ':'' }}{{ spellDetail(spell)?.lore }}</span><p v-if="spellDetail(spell)?.flavor" class="rule-flavor"><em>{{ spellDetail(spell)?.flavor }}</em></p><div v-if="visibleRuleFields(spellDetail(spell)?.rules||'').length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(spellDetail(spell)?.rules||'')" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div></article><p v-if="!loreCharacterSpells.length" class="muted">No Lore Spells recorded.</p></div><h3 class="review-subheading">Invocation Spells</h3><div class="review-spell-column"><article v-for="spell in invocationCharacterSpells" :key="spell" class="review-feature-box spell full-rule-entry" :class="spellLoreClass(spell)"><header><strong>{{ spell }} <small v-if="isCustomSpell(spell)" class="custom-content-badge">CUSTOM</small></strong><small>{{ spellCostText(spell) }}</small></header><span>{{ spellDetail(spell)?.lore }}</span><p v-if="spellDetail(spell)?.flavor" class="rule-flavor"><em>{{ spellDetail(spell)?.flavor }}</em></p><div v-if="visibleRuleFields(spellDetail(spell)?.rules||'').length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(spellDetail(spell)?.rules||'')" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div></article><p v-if="!invocationCharacterSpells.length" class="muted">No Invocation Spells recorded.</p></div></div></details>
        <details class="review-section review-collapsible character-sheet-content-section"><summary><h2>Talents</h2><span>{{ selectedCharacter.talents?.length||0 }} selected</span></summary><div class="review-collapsible-body review-box-list review-talent-column"><article v-for="talent in selectedCharacter.talents||[]" :key="talent" class="review-feature-box talent full-rule-entry" :class="talentAbilityClasses(talent)"><header><strong>{{ canonicalTalentName(talent) }} <small v-if="isCustomTalent(talent)" class="custom-content-badge">CUSTOM</small></strong></header><p v-if="structuredRule(talentText(talent)).intro" class="rule-flavor"><em>{{ structuredRule(talentText(talent)).intro }}</em></p><div v-if="visibleRuleFields(talentText(talent)).length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(talentText(talent))" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div></article><p v-if="!selectedCharacter.talents?.length">No Talents selected.</p></div></details>
        <details class="review-section review-collapsible character-sheet-content-section"><summary><h2>Equipment &amp; Gear</h2><span>{{ otherGear.length }} items</span></summary><div class="review-collapsible-body"><div v-if="otherGear.length" class="review-equipment-grid"><article v-for="(item,index) in otherGear" :key="`${item.name}-${index}`"><strong>{{ item.name }}</strong><small>{{ item.category||'Gear' }} · {{ formatThreadpieceWp(canonicalGearCostWp(item)) }}</small><p v-if="item.detail">{{ item.detail }}</p><p v-if="item.effect">{{ item.effect }}</p><small v-if="item.choice">Choice: {{ item.choice }}</small><small v-if="item.attachedTo">Attached to: {{ item.attachedTo }}</small></article></div><p v-else class="muted">No additional equipment purchased.</p></div></details>
      </section>
      <section v-else class="empty-state card-surface"><h2>Select a Character</h2><p>Choose a saved character above to open the Character Sheet.</p></section>
    </section>
  </main>
</template>

<style scoped>
.custom-content-badge{display:inline-flex;align-items:center;margin-left:5px;padding:2px 5px;border:1px solid #7b4f8d;border-radius:999px;background:#efe5f4;color:#60336f;font-size:8px;font-weight:900;letter-spacing:.06em;vertical-align:middle}.rhythm-sheet-tabs{margin-bottom:8px}.character-selection-panel{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:end;gap:12px;margin-bottom:12px;padding:10px 12px}.character-selection-summary{display:grid;gap:2px;text-align:right}.character-selection-summary span{color:var(--ink-soft);font-size:calc(9px + var(--font-offset))}.fortune-tip{display:grid;gap:4px;margin:12px 0;padding:10px 12px;border:1px solid var(--line);border-left:5px solid var(--accent);border-radius:9px;background:var(--paper-2)}.fortune-tip strong{font-family:Georgia,'Times New Roman',serif}.fortune-tip span{color:var(--ink-soft);line-height:1.5}.field-off{opacity:.68}.disabled-readout{display:flex;align-items:center;background:var(--paper-2);color:var(--ink-soft);cursor:not-allowed}.review-character-sheet{display:grid;gap:10px;padding:12px;min-width:0;max-width:100%;overflow:hidden}.review-character-sheet>*{min-width:0;max-width:100%}.review-character-sheet>.review-section{width:100%;box-sizing:border-box;min-width:0}.character-detail-body{display:grid;gap:10px}.character-detail-body .review-summary-grid{margin-top:0}.equipment-slot-sheet{display:block!important;max-width:100%;overflow-x:auto}.weapon-slot-grid{min-width:620px}.armor-slot-grid{min-width:720px}.rhythm-dependent-grid,.rhythm-target-row{row-gap:12px!important}.rhythm-target-row{margin-top:12px!important}.roll-formula-summary{margin-top:12px!important}.rhythm-tool-card .tool-explainer{margin-bottom:10px}
.character-sheet-content-section>.review-collapsible-body{padding-top:16px!important}
.ability-manager-card{display:grid;gap:12px}.ability-manager-controls{display:grid;grid-template-columns:minmax(0,1fr);gap:12px}.ability-manager-summary{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.ability-manager-results{display:grid;gap:10px}.ability-manager-entry header{display:flex;justify-content:space-between;gap:10px;align-items:flex-start}.ability-manager-entry small{display:block}.ability-manager-focus{display:grid;gap:5px;padding:12px;border:1px solid var(--line);border-radius:10px;background:var(--paper-2)}.manager-badge{align-self:flex-start}.trinket-slot-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}.trinket-slot-card{display:grid;gap:4px;padding:10px;border:1px solid var(--line);border-radius:10px;background:var(--paper-2)}@media(max-width:720px){.ability-manager-summary{grid-template-columns:1fr}}
</style>
