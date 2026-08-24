<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import { passiveTargets } from '../data/bramble'
import { skillDefinitions } from '../data/characterOptions'
import { loreSpells } from '../data/magicOptions'
import { spellDetails } from '../data/magicDetails'
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

const secondaryStats=computed(()=>{const c=selectedCharacter.value;if(!c)return null;return{speed:2+rank(c,'agility'),aim:rank(c,'agility')*2,mettle:rank(c,'might')*2,ward:rank(c,'hide')*2,control:rank(c,'lore')*2,power:rank(c,'might'),guts:rank(c,'hide')}})
const selectedSkills=computed(()=>Object.entries(selectedCharacter.value?.skillRanks||{}).map(([name,value])=>({name:normalizeSkillName(name),rank:Number(value)})).sort((a,b)=>a.name.localeCompare(b.name)))
const weapons=computed(()=>selectedCharacter.value?.equipment?.filter(item=>item.category==='Weapon')||[])
const armor=computed(()=>selectedCharacter.value?.equipment?.filter(item=>item.category==='Armor & Shield')||[])
const otherGear=computed(()=>selectedCharacter.value?.equipment?.filter(item=>!['Weapon','Armor & Shield'].includes(item.category||''))||[])
function spellDetail(name:string){const custom=customSpells.find(item=>item.name===name);return custom||spellDetails[name]}
const characterSpells=computed(()=>{const c=selectedCharacter.value;if(!c||c.path!=='magic')return[];const signature=c.loreAttunement?(customSpells.find(item=>item.lore===c.loreAttunement&&item.signature)?.name||loreSpells[c.loreAttunement]?.[0]||''):'';return Array.from(new Set([signature,...(c.spells||[]),...(c.invocationSpells||[])].filter(Boolean) as string[]))})
const talentSections=ruleSourceDocuments.talents.sections
function talentText(name:string){const custom=customTalents.find(item=>item.name===name);if(custom)return custom.text;const section=talentSections.find(item=>item.heading===name);return section?.blocks.filter(block=>block.type==='paragraph').map(block=>block.type==='paragraph'?block.text:'').join(' ')||''}
const manaPerRound=computed(()=>2+Number(selectedCharacter.value?.magicLevel??(selectedCharacter.value?.path==='magic'?1:0)))
</script>

<template>
  <main class="page simulator-page rhythm-engine-page">
    <AppHeader />
    <div class="page-title-block"><h1>Rhythm Engine</h1><p>Make guided Attribute rolls or open a saved character as a digital character sheet.</p></div>
    <div class="segment-tabs simulator-tabs rhythm-sheet-tabs"><button type="button" class="segment-tab" :class="{active:sheet==='attribute'}" @click="sheet='attribute'">Attribute Check</button><button type="button" class="segment-tab" :class="{active:sheet==='character'}" @click="sheet='character'">Character Sheet</button></div>

    <section class="character-selection-panel card-surface"><label class="field-label">Character<select v-model="selectedCharacterId" class="field-control"><option value="">Manual / No Character</option><option v-for="character in characters" :key="character.id" :value="character.id">{{ character.name }} {{ character.species }}</option></select></label><div v-if="selectedCharacter" class="character-selection-summary"><strong>{{ selectedCharacter.name }}</strong><span>{{ selectedCharacter.species }} · {{ selectedCharacter.campaignName||'No Campaign' }}</span></div></section>

    <section v-if="sheet==='attribute'" class="tool-panel card-surface rhythm-tool-card">
      <div class="tool-heading"><div><p class="eyebrow">ATTRIBUTE CHECK</p><h2>3d10 + Stat + Skill</h2></div></div>
      <p class="tool-explainer">Choose a Roll Type, then the valid Character Stat. Skills only turn on for roll types that use a Skill.</p>
      <aside class="fortune-tip"><strong>Fortune &amp; Misfortune</strong><span>Natural dice of 8–10 create Fortune results and natural dice of 1–2 create Misfortune results. Fortune represents an advantageous twist and may create a +1 Condition where the rule allows; Misfortune represents a complication and may create a −1 Condition.</span></aside>
      <div class="rhythm-dependent-grid"><label class="field-label">Roll Type<select v-model="rollType" class="field-control"><option v-for="option in rollTypes" :key="option">{{ option }}</option></select></label><label class="field-label">{{ statFieldLabel }}<select v-if="selectedCharacter" v-model="characterStatKey" class="field-control"><option v-for="stat in statOptions" :key="stat.key" :value="stat.key">{{ statOptionLabel(stat) }}</option></select><input v-else v-model.number="rhythmStat" class="field-control" type="number" /></label><label class="field-label" :class="{'field-off':!rollUsesSkill}">{{ rollUsesSkill?skillFieldLabel:'Skill (Off)' }}<select v-if="rollUsesSkill&&selectedCharacter" v-model="rhythmSkill" class="field-control"><option value="">No Skill</option><option v-for="skill in characterSkillOptions" :key="skill.name" :value="skill.name">{{ skill.name }} Rank {{ skill.rank }} +{{ skillModifier(skill.rank) }}</option></select><input v-else-if="rollUsesSkill" v-model.number="rhythmSkillBonus" class="field-control" type="number" placeholder="Skill Bonus" /><div v-else class="field-control disabled-readout">Off</div></label></div>
      <div class="rhythm-target-row"><label class="field-label rhythm-style-field">Roll Style<select v-model="rhythmMode" class="field-control"><option value="normal">Normal 3d10</option><option value="edged">Edged 4d10, Drop Lowest</option><option value="weighted">Weighted 4d10, Drop Highest</option></select></label><label class="field-label conditions-short-field">Conditions<input v-model.number="rhythmConditions" class="field-control" type="number" /></label><label class="field-label target-type-field">Target Type<select v-model="targetMode" class="field-control"><option value="none">No Target</option><option value="passive">Passive</option><option value="active">Active</option></select></label><label v-if="targetMode==='passive'" class="field-label target-value-field">Passive Target<select v-model.number="passiveTarget" class="field-control"><option v-for="target in passiveTargets" :key="target[0]" :value="target[1]">{{ target[0] }} {{ target[1] }}</option></select></label><label v-else-if="targetMode==='active'" class="field-label target-value-field">Active Target<input v-model.number="activeTarget" class="field-control" type="number" min="0" placeholder="Enter Target" /></label></div>
      <div class="roll-formula-summary"><strong>{{ rollSummary }}</strong></div><button class="primary-button wide" @click="rollAttributeCheck">Roll {{ rollType }}</button>
      <div class="sim-history-heading"><div><strong>Recent Rolls</strong><small>The latest five rolls are kept on this device.</small></div></div><div v-if="rhythmHistory.length" class="rhythm-history-list"><article v-for="(entry,index) in rhythmHistory" :key="entry.id" class="result-panel rhythm-history-entry" :class="{latest:index===0}"><div class="result-meta"><span>{{ formatTime(entry.createdAt) }}</span><span>{{ entry.rollType }}</span><span>{{ entry.mode }}</span><span v-if="entry.target!==null">{{ entry.targetLabel }} {{ entry.target }}</span></div><div class="dice-row"><span v-for="(value,dieIndex) in entry.result.rolled" :key="dieIndex" class="die" :class="{fortune:value>=8,misfortune:value<=2}">{{ value }}</span></div><div class="result-summary"><strong class="result-total">{{ entry.result.total }}</strong><span v-if="entry.target!==null" class="outcome" :class="entry.result.total>=entry.target?'pass':'fail'">{{ rollOutcome(entry) }}</span></div><div v-if="entry.fortunes||entry.misfortunes" class="special-result-row"><span v-if="entry.fortunes" class="special-result fortune-result">Fortune ×{{ entry.fortunes }}</span><span v-if="entry.misfortunes" class="special-result misfortune-result">Misfortune ×{{ entry.misfortunes }}</span></div><small>{{ entry.result.natural }} natural + {{ entry.stat }} Stat<template v-if="entry.skillName"> + {{ entry.skillBonus }} {{ entry.skillName }}</template> {{ entry.conditions>=0?'+':'−' }} {{ Math.abs(entry.conditions) }} Conditions</small></article></div><div v-else class="empty-inline sim-empty-inline">No rolls yet.</div>
    </section>

    <section v-else class="character-sheet-view">
      <section v-if="selectedCharacter" class="digital-character-sheet card-surface">
        <header class="sheet-identity"><div><p class="eyebrow">CHARACTER SHEET</p><h2>{{ selectedCharacter.name }}</h2><p>{{ selectedCharacter.species }} <small v-if="isCustomSpecies(selectedCharacter.species)" class="custom-content-badge">CUSTOM</small> · {{ selectedCharacter.homeland }} · {{ selectedCharacter.campaignName||'No Campaign' }}</p></div><div class="sheet-identity-values"><span><small>PATH</small><strong>{{ selectedCharacter.path==='magic'?'Wind-Touched':'Gifted Heart' }}</strong></span><span><small>WEALTH</small><strong>{{ selectedCharacter.wealthRemaining??0 }} {{ selectedCharacter.wealthCurrency||'NP' }}</strong></span></div></header>
        <div class="sheet-meta-grid"><article><span>Oath</span><strong>{{ selectedCharacter.oath }}</strong></article><article><span>Faith</span><strong>{{ selectedCharacter.faith }}</strong></article><article><span>Spark</span><strong>{{ selectedCharacter.spark }}</strong></article><article><span>Languages</span><strong>{{ selectedCharacter.languages?.join(' · ')||'—' }}</strong></article></div>
        <section class="sheet-section"><h3>Attributes</h3><div class="sheet-stat-grid"><article v-for="attribute in ['agility','might','hide','lore','bravery']" :key="attribute"><span>{{ attribute[0].toUpperCase()+attribute.slice(1) }}</span><strong>{{ rank(selectedCharacter,attribute as 'agility'|'might'|'hide'|'lore'|'bravery') }}</strong><small>Mod +{{ rank(selectedCharacter,attribute as 'agility'|'might'|'hide'|'lore'|'bravery')*2 }}</small></article></div></section>
        <section v-if="secondaryStats" class="sheet-section"><h3>Secondary Stats</h3><div class="sheet-stat-grid secondary"><article v-for="(value,key) in secondaryStats" :key="key"><span>{{ String(key)[0].toUpperCase()+String(key).slice(1) }}</span><strong>{{ value }}</strong></article><article><span>Mana</span><strong>{{ manaPerRound }}</strong><small>+{{ manaPerRound }}/round</small></article></div></section>
        <div class="sheet-two-column"><section class="sheet-section"><h3>Skills</h3><div class="sheet-list-grid"><article v-for="skill in selectedSkills" :key="skill.name"><strong>{{ skill.name }}</strong><span>Rank {{ skill.rank }}</span><small>Modifier +{{ skillModifier(skill.rank) }}</small></article></div></section><section class="sheet-section"><h3>Talents</h3><div class="sheet-rule-stack"><article v-for="talent in selectedCharacter.talents||[]" :key="talent"><header><strong>{{ talent }} <small v-if="isCustomTalent(talent)" class="custom-content-badge">CUSTOM</small></strong></header><p>{{ talentText(talent) }}</p></article><p v-if="!selectedCharacter.talents?.length" class="muted">No Talents recorded.</p></div></section></div>
        <div class="sheet-two-column"><section class="sheet-section"><h3>Weapons</h3><div class="sheet-rule-stack"><article v-for="item in weapons" :key="item.name"><header><strong>{{ item.name }}</strong><span>{{ item.detail }}</span></header><p v-if="item.effect">{{ item.effect }}</p></article><p v-if="!weapons.length" class="muted">No weapons recorded.</p></div></section><section class="sheet-section"><h3>Armor &amp; Shields</h3><div class="sheet-rule-stack"><article v-for="item in armor" :key="item.name"><header><strong>{{ item.name }}</strong><span>{{ item.detail }}</span></header><p v-if="item.effect">{{ item.effect }}</p></article><p v-if="!armor.length" class="muted">No armor or shields recorded.</p></div></section></div>
        <section v-if="selectedCharacter.path==='magic'" class="sheet-section"><h3>Magic &amp; Spells</h3><div class="sheet-lore-banner"><strong>Lore of {{ selectedCharacter.loreAttunement||'—' }}</strong><span>Mana restore +{{ manaPerRound }}/round</span></div><div class="sheet-rule-grid"><article v-for="spell in characterSpells" :key="spell"><header><strong>{{ spell }} <small v-if="isCustomSpell(spell)" class="custom-content-badge">CUSTOM</small></strong><span>{{ spellDetail(spell)?.lore }}</span></header><p>{{ spellDetail(spell)?.flavor }}</p><small>{{ spellDetail(spell)?.rules }}</small></article></div></section>
        <section class="sheet-section"><h3>Equipment &amp; Gear</h3><div class="sheet-list-grid gear"><article v-for="item in otherGear" :key="item.name"><strong>{{ item.name }}</strong><small v-if="item.choice">{{ item.choice }}</small><small v-if="item.attachedTo">Attached to {{ item.attachedTo }}</small></article></div></section>
      </section>
      <section v-else class="empty-state card-surface"><h2>Select a Character</h2><p>Choose a saved character above to open the Character Sheet.</p></section>
    </section>
  </main>
</template>

<style scoped>
.custom-content-badge{display:inline-flex;align-items:center;margin-left:5px;padding:2px 5px;border:1px solid #7b4f8d;border-radius:999px;background:#efe5f4;color:#60336f;font-size:8px;font-weight:900;letter-spacing:.06em;vertical-align:middle}
.rhythm-sheet-tabs{margin-bottom:8px}.character-selection-panel{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:end;gap:12px;margin-bottom:12px;padding:10px 12px}.character-selection-summary{display:grid;gap:2px;text-align:right}.character-selection-summary span{color:var(--ink-soft);font-size:calc(9px + var(--font-offset))}.fortune-tip{display:grid;gap:4px;margin:12px 0;padding:10px 12px;border:1px solid var(--line);border-left:5px solid var(--accent);border-radius:9px;background:var(--paper-2)}.fortune-tip strong{font-family:Georgia,'Times New Roman',serif}.fortune-tip span{color:var(--ink-soft);line-height:1.5}.field-off{opacity:.68}.disabled-readout{display:flex;align-items:center;background:var(--paper-2);color:var(--ink-soft);cursor:not-allowed}.digital-character-sheet{overflow:hidden;border:1px solid var(--line-dark);border-top:8px solid var(--accent)}.sheet-identity{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;padding:16px;border-bottom:2px solid var(--line-dark);background:var(--paper-2)}.sheet-identity h2{margin:2px 0;font-family:Georgia,'Times New Roman',serif;font-size:30px}.sheet-identity p{margin:0;color:var(--ink-soft)}.sheet-identity-values{display:flex;gap:7px}.sheet-identity-values span{display:grid;gap:2px;min-width:100px;padding:7px 9px;border:1px solid var(--line);background:var(--paper);text-align:center}.sheet-identity-values small{font-size:8px;letter-spacing:.08em}.sheet-meta-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-bottom:1px solid var(--line-dark)}.sheet-meta-grid article{display:grid;gap:2px;padding:8px 10px;border-right:1px solid var(--line)}.sheet-meta-grid article:last-child{border-right:0}.sheet-meta-grid span{font-size:8px;font-weight:900;letter-spacing:.08em;color:var(--ink-soft)}.sheet-section{min-width:0;padding:12px 14px;border-bottom:1px solid var(--line)}.sheet-section h3{display:flex;align-items:center;gap:8px;margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:.07em}.sheet-section h3::after{content:'';height:1px;flex:1;background:var(--line-dark)}.sheet-stat-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px}.sheet-stat-grid.secondary{grid-template-columns:repeat(4,minmax(0,1fr))}.sheet-stat-grid article{display:grid;place-items:center;gap:2px;padding:8px 5px;border:1px solid var(--line-dark);background:var(--paper)}.sheet-stat-grid strong{font-size:20px}.sheet-stat-grid span,.sheet-stat-grid small{font-size:9px}.sheet-two-column{display:grid;grid-template-columns:1fr 1fr}.sheet-two-column>.sheet-section+section{border-left:1px solid var(--line-dark)}.sheet-list-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}.sheet-list-grid article{display:grid;grid-template-columns:1fr auto;gap:2px;padding:7px;border:1px solid var(--line);background:var(--paper)}.sheet-list-grid article small{grid-column:1/-1;color:var(--ink-soft)}.sheet-rule-stack{display:grid;gap:7px}.sheet-rule-stack article,.sheet-rule-grid article{padding:9px;border:1px solid var(--line-dark);border-top:5px solid var(--accent);background:var(--paper)}.sheet-rule-stack header,.sheet-rule-grid header{display:flex;justify-content:space-between;gap:8px;padding-bottom:5px;border-bottom:1px solid var(--line)}.sheet-rule-stack p,.sheet-rule-grid p,.sheet-rule-grid small{margin:6px 0 0;color:var(--ink-soft);line-height:1.45}.sheet-lore-banner{display:flex;justify-content:space-between;gap:8px;margin-bottom:7px;padding:8px 10px;border:1px solid var(--line);background:var(--paper-2)}.sheet-rule-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.sheet-list-grid.gear{grid-template-columns:repeat(4,minmax(0,1fr))}@media(max-width:760px){.character-selection-panel,.sheet-identity{grid-template-columns:1fr;display:grid}.character-selection-summary{text-align:left}.sheet-identity-values,.sheet-meta-grid,.sheet-stat-grid,.sheet-stat-grid.secondary,.sheet-two-column,.sheet-rule-grid,.sheet-list-grid.gear{grid-template-columns:1fr 1fr}.sheet-two-column>.sheet-section+section{border-left:0}.sheet-meta-grid article{border-right:0}.sheet-list-grid{grid-template-columns:1fr}}
</style>
