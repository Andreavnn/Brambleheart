<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { attributes, faiths, homelands, oaths, sparks, species, type AttributeId } from '../data/bramble'
import { allCultureTraits, speciesByName } from '../data/speciesData'
import { gearShopItems, homelandDetails, skillDefinitions, sparkDetails } from '../data/characterOptions'
import { cultureSkillGrants, speciesImagePaths } from '../data/creationRules'
import { attunableLores, loreSpells } from '../data/magicOptions'
import { loreDescriptions, spellDetails } from '../data/magicDetails'
import { ruleSourceDocuments } from '../data/rulesSource'
import { upsertCharacter, type AttributeRanks, type CharacterRecord, type PurchasedEquipment } from '../services/characters'

const router = useRouter()
const stepIndex = ref(0)
const error = ref('')
const shopOpen = ref(false)
const shopSearch = ref('')
const culturePickerOpen = ref(false)
const cultureSearch = ref('')
const openAttribute = ref<AttributeId | null>(null)
const draftId = ref<string | null>(null)
const pathTouched = ref(false)

interface StructuredField { label:string; value:string }
const STRUCTURED_LABELS = ['OPEN DEFENCE','COST','TRIGGER','DECLARE','DECLEAR','TARGET','EFFECT','RESTRICTIONS','RESTRICTION','DURATION','EMPOWER','COOLDOWN','AFTERBURN','PURIFY','REQUIRES','KEYWORDS']
const STRUCTURED_RE = new RegExp(`\\b(${STRUCTURED_LABELS.join('|')}):`, 'gi')
function structuredRule(text:string):{ intro:string; fields:StructuredField[] } {
  const matches = [...text.matchAll(STRUCTURED_RE)]
  if (!matches.length) return { intro:text.trim(), fields:[] }
  const intro = text.slice(0, matches[0].index).trim()
  const fields:StructuredField[] = []
  for (let i=0;i<matches.length;i++) {
    const match=matches[i]
    const start=(match.index||0)+match[0].length
    const end=i+1<matches.length?(matches[i+1].index||text.length):text.length
    let label=match[1].toUpperCase()
    if(label==='DECLEAR') label='DECLARE'
    const value=text.slice(start,end).trim()
    if(label!=='KEYWORDS'&&value) fields.push({label,value})
  }
  return {intro,fields}
}

const talentSections = ruleSourceDocuments.talents.sections.filter(section =>
  section.heading !== 'Overview' && section.heading !== 'TALENTS' && !section.heading.startsWith('KEYWORDS')
)
function talentText(name:string) {
  const section=talentSections.find(item=>item.heading===name)
  return section?.blocks.filter(block=>block.type==='paragraph').map(block=>block.type==='paragraph'?block.text:'').join(' ') || ''
}
function talentRequires(name:string) {
  const match=talentText(name).match(/\bREQUIRES:\s*([^|]+?)(?=\s+KEYWORDS?:|$)/i)
  return match?.[1]?.trim().replace(/\s+Talent$/i,'') || ''
}
function talentKeywords(name:string) {
  const match=talentText(name).match(/\bKEYWORDS?:\s*(.+)$/i)
  return match ? match[1].split('|').map(item=>item.trim()).filter(Boolean) : []
}
function normalizeTalent(name:string){return name.toLowerCase().replace(/[’']/g,"'").replace(/\s+talent$/,'').trim()}
function talentRequirementMet(name:string) {
  const required=talentRequires(name)
  if(!required) return true
  return form.talents.some(other=>other && other!==name && normalizeTalent(other)===normalizeTalent(required))
}
const talentNames = computed(() => [...talentSections.map(section=>section.heading)].sort((a,b)=>{
  const ar=Boolean(talentRequires(a)), br=Boolean(talentRequires(b))
  if(ar!==br) return ar?1:-1
  return a.localeCompare(b)
}))

function cultureId(speciesName:string,name:string){return `${speciesName}::${name}`}
function ownCultureIds(speciesName:string){return (speciesByName[speciesName]?.cultureTraits||[]).slice(0,2).map(trait=>cultureId(speciesName,trait.name))}
function findCulture(id:string){
  const [speciesName,...rest]=id.split('::'); const name=rest.join('::')
  const data=speciesByName[speciesName]
  const trait=data?.cultureTraits.find(item=>item.name===name)
  return trait?{...trait,species:speciesName}:null
}

const form = reactive({
  name:'', pronunciation:'', age:'', appearance:'', pronouns:'', kinship:'',
  species:'',
  cultureTraits:[] as string[],
  cultureSkillChoices:{} as Record<string,string>,
  spark:sparks[0][0] as string,
  homeland:homelands[0].name as string,
  customHomelandName:'', customHomelandDetail:'',
  skills:[...homelands[0].skills] as string[],
  faith:faiths[0] as string,
  oath:oaths[0][0] as string,
  attributes:Object.fromEntries(attributes.map(a=>[a.id,1])) as AttributeRanks,
  path:'magic' as 'magic'|'talents',
  loreAttunement:'',
  spells:['',''] as string[],
  invocationSpells:['',''] as string[],
  talents:[''] as string[],
  adventureKit:true,
  equipment:[] as PurchasedEquipment[],
})

const stepDefs = computed(()=>[
  {id:'species',label:'Species',title:'Choose Your Species'},
  {id:'culture',label:'Culture',title:'Culture Traits'},
  {id:'spark',label:'Spark',title:'Choose Your Spark'},
  {id:'homeland',label:'Homeland',title:'Choose Your Homeland'},
  {id:'attributes',label:'Attributes',title:'Distribute Attributes'},
  {id:'skills',label:'Skills',title:'Starting Skills'},
  {id:'faith-oath',label:'Oath',title:'Oath & Faith'},
  {id:'path',label:'Path',title:'Rhythm of Body & Spirit'},
  ...(form.path==='magic'&&pathTouched.value?[
    {id:'lore',label:'Lore',title:'Lore Attunement'},
    {id:'spells',label:'Spells',title:'Starting Spells'},
  ]:[]),
  {id:'talents',label:'Talents',title:'Choose Talents'},
  {id:'equipment',label:'Gear',title:'Equipment & Gear'},
  {id:'languages',label:'Language',title:'Starting Languages'},
  {id:'review',label:'Review',title:'Review Character'},
])
const stepId=computed(()=>stepDefs.value[stepIndex.value]?.id||'species')
const stepNumber=computed(()=>stepIndex.value+1)
const totalSteps=computed(()=>stepDefs.value.length)

const selectedSpeciesData=computed(()=>form.species?speciesByName[form.species]:null)
const selectedSpeciesImage=computed(()=>form.species?speciesImagePaths[form.species]||'':'')
const selectedCultureTraits=computed(()=>form.cultureTraits.map(findCulture).filter((item):item is NonNullable<ReturnType<typeof findCulture>>=>Boolean(item)))
const spent=computed(()=>Object.values(form.attributes).reduce((sum,rank)=>sum+rank-1,0))
const remaining=computed(()=>5-spent.value)
const startingWealth=computed(()=>form.adventureKit?50:53)
const spentWealth=computed(()=>form.equipment.reduce((sum,item)=>sum+item.costSp,0))
const wealthRemaining=computed(()=>Math.round((startingWealth.value-spentWealth.value)*100)/100)
const isCustomHomeland=computed(()=>form.homeland==='__custom__')
const homelandDetail=computed(()=>isCustomHomeland.value?null:homelandDetails[form.homeland])
const homelandSkillPool=computed(()=>{
  if(isCustomHomeland.value) return skillDefinitions.map(item=>item.name)
  return Array.from(new Set([...(homelandDetail.value?.skills||[]),...(homelandDetail.value?.optionalReplacements||[])]))
})
const currentSpark=computed(()=>sparkDetails[form.spark])
const filteredGear=computed(()=>{
  const q=shopSearch.value.trim().toLowerCase()
  return gearShopItems.filter(item=>!q||`${item.name} ${item.category} ${item.detail}`.toLowerCase().includes(q)).slice(0,100)
})
const filteredCultureTraits=computed(()=>{
  const q=cultureSearch.value.trim().toLowerCase()
  return allCultureTraits.filter(trait=>!q||`${trait.name} ${trait.species} ${trait.text} ${(trait.keywords||[]).join(' ')}`.toLowerCase().includes(q))
})
const nativeLanguage=computed(()=>selectedSpeciesData.value?.language.split(',')[0]?.trim()||'Native Language')
const languages=computed(()=>form.species?[nativeLanguage.value,'Commonspeak']:['Commonspeak'])
const signatureSpell=computed(()=>form.loreAttunement?(loreSpells[form.loreAttunement]?.[0]||''):'')
const signatureDetail=computed(()=>signatureSpell.value?spellDetails[signatureSpell.value]:undefined)
const invocationOptions=computed(()=>loreSpells.Invocation||[])
const regularSpellGroups=computed(()=>attunableLores.map(lore=>({lore,spells:(loreSpells[lore]||[]).slice(1)})))
const invalidTalents=computed(()=>form.talents.filter(Boolean).filter(name=>!talentRequirementMet(name)))

const derived=computed(()=>({
  speed:2+form.attributes.agility,
  aim:form.attributes.agility*2,
  mettle:form.attributes.might*2,
  ward:form.attributes.hide*2,
  control:form.attributes.lore*2,
  power:form.attributes.might,
  guts:form.attributes.hide,
}))
const secondaryStats:Record<AttributeId,Array<{name:string;formula:string;description:string;slug?:string}>>={
  agility:[
    {name:'Speed',formula:'2 + Agility Rank',description:'Speed contributes to movement and is used when determining Initiative.',slug:'initiative-order'},
    {name:'Aim',formula:'Agility × 2',description:'Aim is the stat used by ranged Strike rolls.',slug:'to-strike'},
  ],
  might:[
    {name:'Mettle',formula:'Might × 2',description:'Mettle is the stat used by melee Strike rolls.',slug:'to-strike'},
    {name:'Power',formula:'Might Rank',description:'Power represents raw physical force where a rule calls for it.',slug:'attributes-skills'},
  ],
  hide:[
    {name:'Ward',formula:'Hide × 2',description:'Ward is used for opposed defensive rolls.',slug:'to-ward'},
    {name:'Guts',formula:'Hide Rank',description:'Guts reduces incoming damage according to the damage rules.',slug:'to-damage'},
  ],
  lore:[{name:'Control',formula:'Lore × 2',description:'Control is used by magical Strike rolls and magical interactions.',slug:'to-strike'}],
  bravery:[],
}
function secondaryLabel(id:AttributeId){const items=secondaryStats[id];return items.length?items.map(item=>item.name).join(', '):'No direct secondary stat listed'}
function attributeModifier(rank:number){return rank*2}
function skillModifier(rank:number){return rank*2}
function toggleAttribute(id:AttributeId){openAttribute.value=openAttribute.value===id?null:id}
function adjust(id:AttributeId,delta:number){const current=form.attributes[id];if(delta>0&&(current>=3||remaining.value<=0))return;if(delta<0&&current<=1)return;form.attributes[id]+=delta}

function sourceDescription(documentKey:string,heading:string){
  const doc=ruleSourceDocuments[documentKey]
  const section=doc?.sections.find(item=>item.heading.toLowerCase()===heading.toLowerCase())
  if(!section)return''
  return section.blocks.filter(block=>block.type==='paragraph').slice(0,3).map(block=>block.type==='paragraph'?block.text:'').join(' ')
}
const faithDescription=computed(()=>sourceDescription('faith',form.faith))
const oathDescription=computed(()=>sourceDescription('oath',form.oath))

function cultureGrantKey(id:string){const trait=findCulture(id);return trait?`${trait.species}::${trait.name}`:''}
function cultureGrant(id:string){return cultureSkillGrants[cultureGrantKey(id)]}
function cultureChoiceKey(id:string,index:number){return `${id}::choice-${index}`}
function cultureChoiceValue(id:string,index:number){return form.cultureSkillChoices[cultureChoiceKey(id,index)]||''}
function setCultureChoice(id:string,index:number,value:string){form.cultureSkillChoices[cultureChoiceKey(id,index)]=value}
function setCultureChoiceFromEvent(id:string,index:number,event:Event){setCultureChoice(id,index,(event.target as HTMLSelectElement|null)?.value||'')}
function setCulture(id:string,checked:boolean){
  if(checked){if(form.cultureTraits.length>=2)return;form.cultureTraits=[...form.cultureTraits,id]}
  else {
    form.cultureTraits=form.cultureTraits.filter(item=>item!==id)
    Object.keys(form.cultureSkillChoices).filter(key=>key.startsWith(`${id}::choice-`)).forEach(key=>delete form.cultureSkillChoices[key])
  }
}

const cultureSkillEntries=computed(()=>{
  const out:Array<{skill:string;source:string}>=[]
  for(const id of form.cultureTraits){
    const trait=findCulture(id); const grant=cultureGrant(id)
    if(!trait||!grant)continue
    grant.fixed.forEach(skill=>out.push({skill,source:trait.name}))
    grant.choices.forEach((_,index)=>{const skill=cultureChoiceValue(id,index);if(skill)out.push({skill,source:trait.name})})
  }
  return out
})
const skillRanks=computed(()=>{
  const ranks:Record<string,number>={}
  form.skills.filter(Boolean).forEach(skill=>ranks[skill]=(ranks[skill]||0)+1)
  cultureSkillEntries.value.forEach(({skill})=>ranks[skill]=(ranks[skill]||0)+1)
  return ranks
})

function setPath(path:'magic'|'talents'){
  form.path=path; pathTouched.value=true
  form.talents=path==='magic'?['']:['','']
}
function requiredTalentCount(){return form.path==='magic'?1:2}
function ensureTalentSlots(){const count=requiredTalentCount();while(form.talents.length<count)form.talents.push('');form.talents=form.talents.slice(0,count)}
function addEquipment(item:typeof gearShopItems[number]){if(item.costSp>wealthRemaining.value)return;form.equipment.push({name:item.name,costSp:item.costSp,category:item.category})}
function removeEquipment(index:number){form.equipment.splice(index,1)}
function spellLore(name:string){return spellDetails[name]?.lore||''}
function spellLoreClass(name:string){const lore=spellLore(name).toLowerCase().replace(/[^a-z0-9]+/g,'-');return lore?`spell-lore-${lore}`:'spell-lore-untyped'}
function effectiveMana(name:string){
  const detail=spellDetails[name]; if(!detail||detail.manaCost===null)return null
  return Math.max(0,detail.manaCost-(detail.lore===form.loreAttunement?2:0))
}
function spellDisabled(name:string,current:string,kind:'regular'|'invocation'){
  const selected=kind==='regular'?form.spells:form.invocationSpells
  return name!==current&&selected.includes(name)
}

function requiredCultureChoicesMissing(){
  for(const id of form.cultureTraits){
    const grant=cultureGrant(id)
    if(!grant)continue
    for(let index=0;index<grant.choices.length;index++) if(!cultureChoiceValue(id,index)) return true
  }
  return false
}
function customHomelandValid(){return !isCustomHomeland.value || (form.customHomelandName.trim()&&form.customHomelandDetail.trim())}
function regularSpellsValid(){return form.spells.length===2&&form.spells.every(Boolean)&&new Set(form.spells).size===2}
function invocationSpellsValid(){return form.invocationSpells.length===2&&form.invocationSpells.every(Boolean)&&new Set(form.invocationSpells).size===2}
function talentsValid(){
  const required=requiredTalentCount()
  return form.talents.length===required&&form.talents.every(Boolean)&&new Set(form.talents).size===form.talents.length&&invalidTalents.value.length===0
}

function validateStep(id=stepId.value){
  if(id==='species'&&!form.species)return 'Choose a Species before continuing.'
  if(id==='culture'&&form.cultureTraits.length!==2)return 'Choose exactly 2 Culture Traits before continuing.'
  if(id==='culture'&&requiredCultureChoicesMissing())return 'Finish the Skill choice granted by each selected Culture Trait.'
  if(id==='spark'&&!form.spark)return 'Choose a Spark before continuing.'
  if(id==='homeland'&&!customHomelandValid())return 'Enter a name and description for your custom Homeland.'
  if(id==='attributes'&&remaining.value!==0)return 'Spend all 5 Attribute points before continuing.'
  if(id==='skills'&&(form.skills.length!==2||form.skills.some(value=>!value)||new Set(form.skills).size!==2))return 'Choose 2 different Homeland Skills before continuing.'
  if(id==='faith-oath'&&(!form.oath||!form.faith))return 'Choose both an Oath and a Faith before continuing.'
  if(id==='path'&&!pathTouched.value)return 'Choose your Body & Spirit path before continuing.'
  if(id==='lore'&&!form.loreAttunement)return 'Choose a Lore Attunement before continuing.'
  if(id==='spells'&&!regularSpellsValid())return 'Choose 2 different regular Spells.'
  if(id==='spells'&&!invocationSpellsValid())return 'Choose 2 different Invocation Spells.'
  if(id==='talents'&&!talentsValid())return invalidTalents.value.length?`Resolve Talent requirements: ${invalidTalents.value.join(', ')}.`:`Choose ${requiredTalentCount()} different Talent${requiredTalentCount()===1?'':'s'}.`
  if(id==='equipment'&&wealthRemaining.value<0)return 'Remove equipment until Remaining Wealth is 0 sp or more.'
  return ''
}
function allValidationErrors(){
  const errors:string[]=[]
  if(!form.name.trim())errors.push('Character name is required.')
  for(const id of stepDefs.value.map(step=>step.id)){
    if(id==='review'||id==='languages')continue
    const message=validateStep(id); if(message&&!errors.includes(message))errors.push(message)
  }
  return errors
}
const finalErrors=computed(()=>allValidationErrors())
const canFinish=computed(()=>finalErrors.value.length===0)

function jumpTo(index:number){stepIndex.value=Math.max(0,Math.min(index,totalSteps.value-1));error.value='';window.scrollTo({top:0,behavior:'smooth'})}
function next(){const message=validateStep();if(message){error.value=message;return}if(stepIndex.value<totalSteps.value-1)jumpTo(stepIndex.value+1)}
function back(){if(stepIndex.value>0)jumpTo(stepIndex.value-1)}

function buildRecord(draft:boolean):CharacterRecord{
  const now=new Date().toISOString()
  const homelandName=isCustomHomeland.value?(form.customHomelandName.trim()||'Custom Homeland'):form.homeland
  return {
    id:draftId.value||crypto.randomUUID(),
    name:form.name.trim()||(draft?'Unnamed Draft':'Unnamed Character'),
    pronunciation:form.pronunciation.trim(), age:form.age.trim(), appearance:form.appearance.trim(), pronouns:form.pronouns.trim(), kinship:form.kinship.trim(),
    species:form.species,
    cultureTraits:selectedCultureTraits.value.map(item=>`${item.name} (${item.species})`),
    cultureSkillChoices:{...form.cultureSkillChoices},
    spark:form.spark,
    homeland:homelandName,
    homelandDetail:isCustomHomeland.value?form.customHomelandDetail.trim():homelandDetail.value?.description,
    skills:[...form.skills], skillRanks:{...skillRanks.value},
    faith:form.faith, oath:form.oath, path:form.path,
    talents:[...form.talents.filter(Boolean)],
    loreAttunement:form.path==='magic'?form.loreAttunement:undefined,
    spells:form.path==='magic'?[...form.spells.filter(Boolean)]:undefined,
    invocationSpells:form.path==='magic'?[...form.invocationSpells.filter(Boolean)]:undefined,
    languages:[...languages.value], equipment:[...form.equipment], adventureKit:form.adventureKit,
    startingWealth:startingWealth.value, wealthRemaining:wealthRemaining.value,
    attributes:{...form.attributes}, draft, creationStep:stepId.value,
    createdAt:now, updatedAt:now,
  }
}
function saveDraft(close=false){
  const record=buildRecord(true); draftId.value=record.id; upsertCharacter(record)
  if(close)void router.push('/characters'); else error.value='Draft saved.'
}
function finishCharacter(){
  if(!canFinish.value){error.value='This character cannot be finished yet. Resolve the errors shown in Review.';return}
  const record=buildRecord(false); draftId.value=record.id; upsertCharacter(record); void router.push('/characters')
}
function resetForm(){
  form.name='';form.pronunciation='';form.age='';form.appearance='';form.pronouns='';form.kinship='';form.species='';form.cultureTraits=[];form.cultureSkillChoices={};
  form.spark=sparks[0][0];form.homeland=homelands[0].name;form.customHomelandName='';form.customHomelandDetail='';form.skills=[...homelands[0].skills];form.faith=faiths[0];form.oath=oaths[0][0];
  attributes.forEach(attribute=>form.attributes[attribute.id]=1);form.path='magic';pathTouched.value=false;form.loreAttunement='';form.spells=['',''];form.invocationSpells=['',''];form.talents=[''];form.adventureKit=true;form.equipment=[];
  draftId.value=null;stepIndex.value=0;error.value='';window.scrollTo({top:0,behavior:'smooth'})
}
function closeWithoutSave(){void router.push('/characters')}

watch(()=>form.species,(next:string)=>{
  if(!next){form.cultureTraits=[];form.cultureSkillChoices={};return}
  form.cultureTraits=ownCultureIds(next);form.cultureSkillChoices={}
})
watch(()=>form.homeland,(next:string)=>{
  if(next==='__custom__'){form.skills=['',''];return}
  form.skills=[...(homelandDetails[next]?.skills||[]).slice(0,2)]
})
watch(()=>form.path,()=>ensureTalentSlots())
</script>

<template>
  <div class="app-page creator-page">
    <main class="page character-create-page creator-reader-page">
      <AppHeader compact back-to="/characters" back-label="Back to Character List" prefer-back-to />
      <section class="creator-progress-shell" aria-label="Character creation steps">
        <div class="creator-progress-labels">
          <button v-for="(step,index) in stepDefs" :key="step.id" type="button" :class="{active:index===stepIndex,complete:index<stepIndex}" @click="jumpTo(index)">{{ step.label }}</button>
        </div>
        <div class="creator-progress-dots">
          <button v-for="(step,index) in stepDefs" :key="`${step.id}-dot`" type="button" :aria-label="`Go to ${step.title}`" :class="{active:index===stepIndex,complete:index<stepIndex}" @click="jumpTo(index)"><span></span><small>{{ index+1 }}</small></button>
        </div>
      </section>

      <section class="form-card creation-step-card">
        <template v-if="stepId==='species'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Choose Your Species</h1></div></div>
          <details class="creation-info-panel help-panel" open><summary>What is a Species?</summary><div class="creation-info-body"><p>Your Species describes the Beastfolk lineage your hero belongs to. Across Anthro Mundas, Beastfolk are peoples of fur, feather, scale, and many other forms, each carrying their own histories, languages, Species Traits, and cultural traditions.</p><p>Species Traits are inherent features of that lineage. Culture Traits reflect learned traditions and can be exchanged in the next step.</p></div></details>

          <div class="identity-fields field-grid two">
            <label class="field-label">Character Name<input v-model="form.name" class="field-control" placeholder="Character name" /></label>
            <label class="field-label">Pronunciation<input v-model="form.pronunciation" class="field-control" placeholder="How is the name spoken?" /></label>
            <label class="field-label">Age<input v-model="form.age" class="field-control" placeholder="Age" /></label>
            <label class="field-label">Pronouns<input v-model="form.pronouns" class="field-control" placeholder="Pronouns" /></label>
            <label class="field-label">Kinship / Family<input v-model="form.kinship" class="field-control" placeholder="Kin, family, pack, circle…" /></label>
            <label class="field-label">Appearance<textarea v-model="form.appearance" class="field-control appearance-textarea" rows="3" placeholder="A short visual description"></textarea></label>
          </div>

          <div class="species-choice-layout">
            <div class="species-choice-copy">
              <label class="field-label">Species<select v-model="form.species" class="field-control"><option value="">Choose Your Species</option><option v-for="item in species" :key="item" :value="item">{{ item }}</option></select></label>
              <div v-if="selectedSpeciesImage" class="species-art-shell species-art-inline"><img :src="selectedSpeciesImage" :alt="`${form.species} character artwork`" /></div>
              <template v-if="selectedSpeciesData">
                <details class="creation-info-panel species-lore-panel" open><summary>{{ selectedSpeciesData.name }} Lore</summary><div class="creation-info-body"><p class="species-quote">“{{ selectedSpeciesData.quote }}”</p><p>{{ selectedSpeciesData.lore }}</p><div class="keyword-pill-row"><span class="keyword-pill">{{ selectedSpeciesData.theme }}</span><span class="keyword-pill">{{ selectedSpeciesData.language.split(',')[0] }}</span></div></div></details>
                <details class="creation-info-panel trait-panel species-trait-panel"><summary>Species Traits</summary><div class="creation-info-body trait-stack"><article v-for="trait in selectedSpeciesData.speciesTraits" :key="trait.name" class="trait-card species-trait-card"><h3>{{ trait.name }}</h3><p v-if="structuredRule(trait.text).intro" class="rule-flavor">{{ structuredRule(trait.text).intro }}</p><div v-if="structuredRule(trait.text).fields.length" class="rule-breakdown-grid"><div v-for="field in structuredRule(trait.text).fields" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div class="keyword-pill-row"><span v-for="keyword in trait.keywords" :key="keyword" class="keyword-pill">{{ keyword }}</span></div></article></div></details>
                <details class="creation-info-panel trait-panel culture-trait-panel"><summary>Culture Traits</summary><div class="creation-info-body"><p>Your Species begins with these two Culture Traits. In Step 2 you may keep them or exchange them for Culture Traits from other peoples.</p><div class="trait-stack"><article v-for="trait in selectedSpeciesData.cultureTraits" :key="trait.name" class="trait-card culture-trait-card"><h3>{{ trait.name }}</h3><p v-if="structuredRule(trait.text).intro" class="rule-flavor">{{ structuredRule(trait.text).intro }}</p><div v-if="structuredRule(trait.text).fields.length" class="rule-breakdown-grid"><div v-for="field in structuredRule(trait.text).fields" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div class="keyword-pill-row"><span v-for="keyword in trait.keywords" :key="keyword" class="keyword-pill">{{ keyword }}</span></div></article></div></div></details>
              </template>
            </div>
          </div>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s player starts with the hero’s identity, then chooses the Beastfolk Species whose story, Traits, and language best fit the character they imagine.</em></div>
        </template>

        <template v-else-if="stepId==='culture'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Culture Traits</h1></div></div>
          <details class="creation-info-panel help-panel" open><summary>What are Culture Traits?</summary><div class="creation-info-body"><p>Culture Traits represent traditions, training, and ways of living learned from a community rather than inherited from Species. Your Species provides two starting Culture Traits, but character creation allows you to exchange them for other Culture Traits.</p></div></details>
          <section class="selected-culture-panel"><h2>Selected Culture Traits <span>{{ form.cultureTraits.length }}/2</span></h2><div class="trait-stack"><article v-for="trait in selectedCultureTraits" :key="`${trait.species}-${trait.name}`" class="trait-card culture-trait-card selected-trait-card"><div class="trait-card-head"><div><h3>{{ trait.name }}</h3><small>{{ trait.species }}</small></div><button type="button" class="secondary-button compact-action" @click="setCulture(cultureId(trait.species,trait.name),false)">Remove</button></div><p v-if="structuredRule(trait.text).intro" class="rule-flavor">{{ structuredRule(trait.text).intro }}</p><div v-if="structuredRule(trait.text).fields.length" class="rule-breakdown-grid"><div v-for="field in structuredRule(trait.text).fields" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div class="keyword-pill-row"><span v-for="keyword in trait.keywords" :key="keyword" class="keyword-pill">{{ keyword }}</span></div><div v-if="cultureGrant(cultureId(trait.species,trait.name))" class="trait-skill-grants"><strong>Skill Ranks</strong><span v-for="skill in cultureGrant(cultureId(trait.species,trait.name))?.fixed||[]" :key="skill" class="keyword-pill">+1 {{ skill }}</span><label v-for="(choices,index) in cultureGrant(cultureId(trait.species,trait.name))?.choices||[]" :key="index" class="field-label">Choose +1 Skill<select class="field-control" :value="cultureChoiceValue(cultureId(trait.species,trait.name),index)" @change="setCultureChoiceFromEvent(cultureId(trait.species,trait.name),index,$event)"><option value="">Choose a Skill</option><option v-for="choice in choices" :key="choice">{{ choice }}</option></select></label></div></article></div></section>
          <section class="available-culture-panel culture-picker-launch-panel"><h2>Exchange / Add Culture Traits</h2><p class="muted">Open the Culture Trait picker to inspect traditions from every playable Species and exchange your starting Traits.</p><button type="button" class="secondary-button wide culture-picker-launch" @click="culturePickerOpen=true">Choose Culture Traits</button></section>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s player keeps one familiar Culture Trait and exchanges the other for a tradition learned while traveling, showing that upbringing can cross Species lines.</em></div>
        </template>

        <template v-else-if="stepId==='spark'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Choose Your Spark</h1></div></div>
          <details class="creation-info-panel help-panel" open><summary>What is a Spark?</summary><div class="creation-info-body"><p>A Spark is the personality archetype that describes what tends to move your hero into action — courage, curiosity, compassion, defiance, wonder, or another defining impulse.</p></div></details>
          <details class="creation-info-panel help-panel" open><summary>What does a Spark do?</summary><div class="creation-info-body"><p>A Spark has two keywords. When your hero completes a Deed that aligns with one of those keywords, the Spark can reward role-play with additional Experience. It is not a flat bonus to every roll; it is a reason to make character choices matter in the story.</p><RouterLink to="/rules/read/sparks-deeds" class="inline-rule-link">Read Sparks &amp; Deeds →</RouterLink></div></details>
          <label class="field-label">Spark<select v-model="form.spark" class="field-control"><option v-for="item in sparks" :key="item[0]" :value="item[0]">{{ item[0] }}</option></select></label>
          <article class="choice-summary spark-description-card"><h2>{{ form.spark }}</h2><p>{{ currentSpark?.description }}</p><div class="keyword-pill-row"><span v-for="keyword in currentSpark?.keywords||[]" :key="keyword" class="keyword-pill">{{ keyword }}</span></div></article>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s player chooses a Spark that describes how Selu responds when the story puts a difficult choice in front of them, then uses its keywords as a guide when pursuing Deeds.</em></div>
        </template>

        <template v-else-if="stepId==='homeland'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Choose Your Homeland</h1></div></div>
          <details class="creation-info-panel help-panel" open><summary>What is a Homeland?</summary><div class="creation-info-body"><p>Your Homeland is the place, road, settlement, or community that shaped your hero before the adventure began. It provides two starting Skills at Rank 1 and gives context to the habits and knowledge your character carries into the wider world.</p></div></details>
          <label class="field-label">Homeland<select v-model="form.homeland" class="field-control"><option v-for="item in homelands" :key="item.name" :value="item.name">{{ item.name }}</option><option value="__custom__">Other — Custom Homeland</option></select></label>
          <template v-if="isCustomHomeland"><div class="field-grid two"><label class="field-label">Homeland Name<input v-model="form.customHomelandName" class="field-control" placeholder="Name your Homeland" /></label><label class="field-label">Homeland Details<textarea v-model="form.customHomelandDetail" class="field-control textarea-control" placeholder="Describe the place and what it taught your hero"></textarea></label></div><p class="muted">Choose its two starting Skills in the Starting Skills step.</p></template>
          <article v-else class="choice-summary homeland-description-card"><h2>{{ form.homeland }}</h2><p>{{ homelandDetail?.description }}</p><div class="keyword-pill-row"><span v-for="skill in homelandDetail?.skills||[]" :key="skill" class="keyword-pill">{{ skill }}</span><span v-for="skill in homelandDetail?.optionalReplacements||[]" :key="skill" class="keyword-pill alternate-pill">Option: {{ skill }}</span></div></article>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s player picks the place that best explains what Selu knew before becoming an adventurer, then lets those memories shape the two Skills chosen later.</em></div>
        </template>

        <template v-else-if="stepId==='attributes'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Distribute Attributes</h1></div></div>
          <details class="creation-info-panel help-panel" open><summary>What do Attributes do?</summary><div class="creation-info-body"><p>Attributes are the five pillars of your character’s natural capability. Each begins at Rank 1. Spend 5 points to raise them, with a maximum Rank of 3 during character creation. Attribute Rank determines its modifier and helps form secondary stats used by other rules.</p><RouterLink to="/rules/read/attributes-skills" class="inline-rule-link">Read Attributes &amp; Skills →</RouterLink></div></details>
          <div class="subsection-title"><strong>Spend 5 Points</strong><span>{{ remaining }} points remaining</span></div>
          <div class="attribute-editor detailed-attribute-editor slim-attribute-editor"><article v-for="attribute in attributes" :key="attribute.id" class="attribute-detail-card" :class="{expanded:openAttribute===attribute.id}"><button type="button" class="attribute-info-toggle" @click="toggleAttribute(attribute.id)"><span><strong>{{ attribute.name }}</strong><small>{{ attribute.description }}</small><em>Secondary Stats: {{ secondaryLabel(attribute.id) }}</em></span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button><div class="attribute-control-grid"><div class="attribute-modifier-column"><small>Modifier</small><strong>+{{ attributeModifier(form.attributes[attribute.id]) }}</strong></div><div class="attribute-rank-column"><small>Rank</small><div class="rank-stepper-line"><span class="max-marker">{{ form.attributes[attribute.id]===3?'MAX':'' }}</span><div class="stepper"><button type="button" @click="adjust(attribute.id,-1)">−</button><span>{{ form.attributes[attribute.id] }}</span><button type="button" @click="adjust(attribute.id,1)">+</button></div></div></div></div><div v-if="openAttribute===attribute.id" class="attribute-secondary-detail"><article v-for="secondary in secondaryStats[attribute.id]" :key="secondary.name"><strong><RouterLink v-if="secondary.slug" :to="`/rules/read/${secondary.slug}`" class="inline-rule-link">{{ secondary.name }}</RouterLink><template v-else>{{ secondary.name }}</template></strong><small>{{ secondary.formula }}</small><p>{{ secondary.description }}</p></article><p v-if="!secondaryStats[attribute.id].length">The supplied Battle rules do not currently list a direct secondary stat derived from {{ attribute.name }}.</p></div></article></div>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s player raises the Attributes that support the character concept, while watching how each Rank changes the modifier and secondary stats used elsewhere in play.</em></div>
        </template>

        <template v-else-if="stepId==='skills'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Starting Skills</h1></div></div>
          <details class="creation-info-panel help-panel" open><summary>How do Starting Skills work?</summary><div class="creation-info-body"><p>The supplied Character Creation rules grant two Skills from your Homeland at Rank 1. There is no separate pool of Skill points to spend during creation. Some selected Culture Traits grant additional Skill ranks; those are added automatically below and can raise a Skill already gained from your Homeland.</p><RouterLink to="/rules/read/attributes-skills" class="inline-rule-link">Read Attributes &amp; Skills →</RouterLink></div></details>
          <div class="field-grid two"><label v-for="index in 2" :key="index" class="field-label">Homeland Skill {{ index }}<select v-model="form.skills[index-1]" class="field-control"><option value="">Choose a Skill</option><option v-for="skill in homelandSkillPool" :key="skill" :value="skill" :disabled="form.skills.some((selected,selectedIndex)=>selected===skill&&selectedIndex!==index-1)">{{ skill }}</option></select></label></div>
          <section v-if="cultureSkillEntries.length" class="skill-grant-panel"><h2>Culture Trait Skill Ranks</h2><div class="keyword-pill-row"><span v-for="entry in cultureSkillEntries" :key="`${entry.source}-${entry.skill}`" class="keyword-pill">+1 {{ entry.skill }} · {{ entry.source }}</span></div></section>
          <section class="skill-rank-summary"><h2>Starting Skill Ranks</h2><div class="skill-rank-grid"><article v-for="(rank,skill) in skillRanks" :key="skill"><strong>{{ skill }}</strong><span class="skill-rank-values"><b>Rank {{ rank }}</b><small>Modifier +{{ skillModifier(rank) }}</small></span></article></div></section>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s Homeland establishes two dependable Skills. Any training granted by Culture Traits stacks on top, so the final list shows exactly where Selu begins.</em></div>
        </template>

        <template v-else-if="stepId==='faith-oath'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Oath &amp; Faith</h1></div></div>
          <div class="faith-oath-column"><section><details class="creation-info-panel help-panel" open><summary>What is an Oath?</summary><div class="creation-info-body"><p>An Oath is the principle your hero has chosen to live by. It does not provide a flat mechanical bonus, but keeping or breaking it can shape reputation, narrative consequences, and how your character is remembered.</p></div></details><label class="field-label">Oath<select v-model="form.oath" class="field-control"><option v-for="item in oaths" :key="item[0]" :value="item[0]">{{ item[0] }} — {{ item[1] }}</option></select></label><article class="choice-summary"><h2>{{ form.oath }}</h2><p>{{ oathDescription }}</p></article></section><section><details class="creation-info-panel help-panel" open><summary>What is Faith?</summary><div class="creation-info-body"><p>Faith describes what your hero reveres, trusts, or believes gives meaning to the world. It helps frame decisions and relationships without forcing one way to play the character.</p></div></details><label class="field-label">Faith<select v-model="form.faith" class="field-control"><option v-for="item in faiths" :key="item">{{ item }}</option></select></label><article class="choice-summary"><h2>{{ form.faith }}</h2><p>{{ faithDescription }}</p></article></section></div>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s Oath describes the promise they refuse to abandon; Faith explains the larger belief that gives that promise meaning.</em></div>
        </template>

        <template v-else-if="stepId==='path'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Rhythm of Body &amp; Spirit</h1></div></div>
          <details class="creation-info-panel help-panel" open><summary>Choose Your Path</summary><div class="creation-info-body"><p>This choice decides how your hero first expresses exceptional ability. One path begins Magic Level 1 and pairs it with a Talent; the other begins with two Talents and no starting Magic Level.</p></div></details>
          <div class="path-choice-grid"><button type="button" class="path-choice-card" :class="{selected:pathTouched&&form.path==='magic'}" @click="setPath('magic')"><span class="path-choice-kicker">WIND-TOUCHED</span><strong class="path-choice-title">Magic Level 1 + 1 Talent</strong><p>Attune to a Lore, gain its Signature Spell, choose starting Spells, then select one Talent.</p></button><button type="button" class="path-choice-card" :class="{selected:pathTouched&&form.path==='talents'}" @click="setPath('talents')"><span class="path-choice-kicker">GIFTED HEART</span><strong class="path-choice-title">2 Talents</strong><p>Build around training, instinct, and practiced gifts by selecting two Talents.</p></button></div>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s player chooses the path that best explains where the hero’s extraordinary gifts come from, rather than simply chasing the largest bonus.</em></div>
        </template>

        <template v-else-if="stepId==='lore'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Lore Attunement</h1></div></div>
          <details class="creation-info-panel help-panel" open><summary>Magic Level 1 &amp; Mana</summary><div class="creation-info-body"><p>Magic draws on Mana. At Magic Level 1, your hero gains magical spellcasting and attunes to one Lore. Spells from the attuned Lore reduce their Mana cost by 2, and the Lore’s Signature Spell is gained automatically without consuming a spell slot.</p><RouterLink to="/rules/read/lore-attunement" class="inline-rule-link">Read Lore Attunement →</RouterLink></div></details>
          <label class="field-label">Lore Attunement<select v-model="form.loreAttunement" class="field-control"><option value="">Select Lore Attunement</option><option v-for="lore in attunableLores" :key="lore" :value="lore">{{ lore }}</option></select></label>
          <template v-if="form.loreAttunement"><article class="choice-summary lore-fluff-card"><h2>Lore of {{ form.loreAttunement }}</h2><p>{{ loreDescriptions[form.loreAttunement] }}</p></article><article v-if="signatureDetail" class="spell-detail-card signature-spell-card" :class="spellLoreClass(signatureDetail.name)"><div class="spell-detail-head"><div><span class="eyebrow">SIGNATURE SPELL</span><h2>{{ signatureDetail.name }}</h2></div><span class="mana-badge">{{ effectiveMana(signatureDetail.name) ?? '—' }} Mana</span></div><p class="rule-flavor">{{ signatureDetail.flavor }}</p><div class="rule-breakdown-grid"><div v-for="field in structuredRule(signatureDetail.rules).fields" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div class="keyword-pill-row"><span v-for="keyword in signatureDetail.keywords" :key="keyword" class="keyword-pill">{{ keyword }}</span></div></article></template>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s player chooses the Lore whose themes fit the character, then reads its Signature Spell before deciding which other magic will fill the remaining spell choices.</em></div>
        </template>

        <template v-else-if="stepId==='spells'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Starting Spells</h1></div></div>
          <details class="creation-info-panel help-panel" open><summary>Spell Slots</summary><div class="creation-info-body"><p>For this creation build, your Magic Level 1 hero begins with the free Signature Spell from Lore Attunement, two different regular Spells chosen from any Lore, and two different Invocation Spells. A Spell cannot be selected twice.</p><p>When a regular Spell belongs to your attuned Lore, its displayed Mana cost includes the Lore Attunement reduction of 2.</p></div></details>
          <section class="spell-selection-block"><h2>Regular Spells</h2><div class="field-grid two"><label v-for="index in 2" :key="`spell-${index}`" class="field-label">Spell {{ index }}<select v-model="form.spells[index-1]" class="field-control"><option value="">Choose a Spell</option><optgroup v-for="group in regularSpellGroups" :key="group.lore" :label="group.lore"><option v-for="spell in group.spells" :key="spell" :value="spell" :disabled="spellDisabled(spell,form.spells[index-1],'regular')">{{ spell }}</option></optgroup></select></label></div></section>
          <section class="spell-selection-block"><h2>Invocation Spells</h2><div class="field-grid two"><label v-for="index in 2" :key="`inv-${index}`" class="field-label">Invocation {{ index }}<select v-model="form.invocationSpells[index-1]" class="field-control"><option value="">Choose an Invocation Spell</option><option v-for="spell in invocationOptions" :key="spell" :value="spell" :disabled="spellDisabled(spell,form.invocationSpells[index-1],'invocation')">{{ spell }}</option></select></label></div></section>
          <div class="selected-spell-stack"><article v-for="spell in [...form.spells,...form.invocationSpells].filter(Boolean)" :key="spell" class="spell-detail-card" :class="spellLoreClass(spell)"><div class="spell-detail-head"><div><span class="eyebrow">{{ spellLore(spell) }}</span><h2>{{ spell }}</h2></div><span class="mana-badge"><template v-if="spellDetails[spell]?.manaCost!==null">{{ effectiveMana(spell) }} Mana</template><template v-else>Variable</template></span></div><p class="rule-flavor">{{ spellDetails[spell]?.flavor }}</p><div class="rule-breakdown-grid"><div v-for="field in structuredRule(spellDetails[spell]?.rules||'').fields" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div class="keyword-pill-row"><span v-for="keyword in spellDetails[spell]?.keywords||[]" :key="keyword" class="keyword-pill">{{ keyword }}</span></div></article></div>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s player chooses two regular Spells for the character’s personal style, then adds two Invocation Spells for dependable magical options beyond the attuned Lore.</em></div>
        </template>

        <template v-else-if="stepId==='talents'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Choose Talents</h1></div></div>
          <details class="creation-info-panel help-panel" open><summary>What are Talents?</summary><div class="creation-info-body"><p>Talents represent trained techniques, unusual gifts, and practiced capabilities. Some Talents require another Talent first. Requirements must be met before this character can be finished.</p></div></details>
          <div class="field-grid two"><label v-for="index in requiredTalentCount()" :key="index" class="field-label">Talent {{ index }}<select v-model="form.talents[index-1]" class="field-control"><option value="">Choose a Talent</option><option v-for="talent in talentNames" :key="talent" :value="talent" :disabled="form.talents.some((selected,selectedIndex)=>selected===talent&&selectedIndex!==index-1)">{{ talent }}</option></select></label></div>
          <div class="selected-talent-stack"><article v-for="talent in form.talents.filter(Boolean)" :key="talent" class="talent-detail-card" :class="{invalid:!talentRequirementMet(talent)}"><div class="talent-detail-head"><h2>{{ talent }}</h2><span v-if="talentRequires(talent)" class="requirement-badge" :class="{invalid:!talentRequirementMet(talent)}">Requires {{ talentRequires(talent) }}</span></div><p v-if="structuredRule(talentText(talent)).intro" class="rule-flavor">{{ structuredRule(talentText(talent)).intro }}</p><div v-if="structuredRule(talentText(talent)).fields.length" class="rule-breakdown-grid"><div v-for="field in structuredRule(talentText(talent)).fields" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div class="keyword-pill-row"><span v-for="keyword in talentKeywords(talent)" :key="keyword" class="keyword-pill">{{ keyword }}</span></div><p v-if="!talentRequirementMet(talent)" class="invalid-option-text">Requirement not met. Select {{ talentRequires(talent) }} as the other Talent or choose a different option.</p></article></div>
          <div v-if="invalidTalents.length" class="invalid-panel">One or more selected Talents are invalid. You may jump to another creation step, but Continue and final character creation remain locked until requirements are met.</div>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s player reads the full Talent effect and requirement before committing, making sure the choice is both legal and a good fit for how Selu acts in play.</em></div>
        </template>

        <template v-else-if="stepId==='equipment'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Equipment &amp; Gear</h1></div></div>
          <details class="creation-info-panel help-panel" open><summary>Starting Equipment</summary><div class="creation-info-body"><p>Characters begin with an Adventure Kit and 50 sp. The Adventure Kit may be returned for 3 additional sp, giving you more Threadpieces to spend in Equipment &amp; Gear.</p></div></details>
          <section class="starting-equipment-panel"><div class="adventure-kit-bar"><div><strong>Adventure Kit</strong><small>Contents</small></div><div class="kit-return-control"><span>Return</span><label class="switch"><input v-model="form.adventureKit" type="checkbox" :true-value="false" :false-value="true"/><span></span></label></div></div><div v-if="form.adventureKit" class="adventure-kit-contents"><span>Bedroll &amp; Groundsheet</span><span>Traveler’s Cloak</span><span>2× Torches</span><span>Reed Flask</span><span>2× Trail Rations</span><span>Traveler’s Pack</span><span>Fire-Starting Kit</span></div><div class="metric-grid wealth-grid"><div><span>Starting Wealth</span><strong>{{ startingWealth }} sp</strong></div><div><span>Remaining Wealth</span><strong>{{ wealthRemaining }} sp</strong></div></div></section>
          <button type="button" class="secondary-button wide" @click="shopOpen=true">Equipment &amp; Gear</button>
          <div v-if="form.equipment.length" class="purchased-gear-list"><article v-for="(item,index) in form.equipment" :key="`${item.name}-${index}`" class="list-row"><span class="list-row-copy"><strong class="list-row-title">{{ item.name }}</strong><small class="list-row-subtitle">{{ item.category }} · {{ item.costSp }} sp</small></span><button type="button" class="secondary-button compact-action" @click="removeEquipment(index)">Remove</button></article></div>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s player decides whether the Adventure Kit is worth keeping, then spends only the remaining wealth on gear that supports the character’s role and story.</em></div>
        </template>

        <template v-else-if="stepId==='languages'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Starting Languages</h1></div></div>
          <details class="creation-info-panel help-panel" open><summary>Languages</summary><div class="creation-info-body"><p>The supplied character creation rules give each Species its native tongue and Commonspeak. Those two starting languages are recorded automatically from the Species you selected.</p></div></details>
          <div class="language-choice-grid"><article class="choice-summary"><h2>{{ nativeLanguage }}</h2><span>{{ form.species }} native language</span></article><article class="choice-summary"><h2>Commonspeak</h2><span>Shared common language</span></article></div>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu carries a language of home and Commonspeak into the wider world, giving the character both a cultural voice and a shared tongue for the road.</em></div>
        </template>

        <template v-else>
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Review Character</h1></div></div>
          <div v-if="finalErrors.length" class="invalid-panel final-invalid-panel"><h2>Character Cannot Be Finished</h2><ul><li v-for="message in finalErrors" :key="message">{{ message }}</li></ul></div>
          <div v-else class="valid-panel"><strong>Character Ready</strong><p>All required creation choices are valid. Review the summary below, then finish the character.</p></div>
          <div class="review-grid"><article><span>Character</span><strong>{{ form.name||'Unnamed' }}</strong><small>{{ form.pronouns }} {{ form.age }}</small></article><article><span>Species</span><strong>{{ form.species||'Not selected' }}</strong><small>{{ nativeLanguage }}</small></article><article><span>Spark</span><strong>{{ form.spark }}</strong></article><article><span>Homeland</span><strong>{{ isCustomHomeland?(form.customHomelandName||'Custom Homeland'):form.homeland }}</strong></article><article><span>Oath</span><strong>{{ form.oath }}</strong></article><article><span>Faith</span><strong>{{ form.faith }}</strong></article><article><span>Path</span><strong>{{ form.path==='magic'?'Magic Level 1 + 1 Talent':'2 Talents' }}</strong></article><article><span>Languages</span><strong>{{ languages.join(' · ') }}</strong></article></div>
          <div class="stat-grid five review-attributes"><div v-for="attribute in attributes" :key="attribute.id" class="stat-tile"><strong>{{ form.attributes[attribute.id] }}</strong><span>{{ attribute.name }}</span><small>+{{ attributeModifier(form.attributes[attribute.id]) }}</small></div></div>
          <section class="review-section"><h2>Starting Skills</h2><div class="keyword-pill-row"><span v-for="(rank,skill) in skillRanks" :key="skill" class="keyword-pill">{{ skill }} · Rank {{ rank }} · Mod +{{ skillModifier(rank) }}</span></div></section>
          <section v-if="form.path==='magic'" class="review-section"><h2>Magic</h2><p><strong>Lore Attunement:</strong> {{ form.loreAttunement||'Not selected' }}</p><div class="keyword-pill-row"><span v-if="signatureSpell" class="keyword-pill">Signature: {{ signatureSpell }}</span><span v-for="spell in form.spells.filter(Boolean)" :key="spell" class="keyword-pill">{{ spell }}</span><span v-for="spell in form.invocationSpells.filter(Boolean)" :key="spell" class="keyword-pill">Invocation: {{ spell }}</span></div></section>
          <section class="review-section"><h2>Talents</h2><div class="keyword-pill-row"><span v-for="talent in form.talents.filter(Boolean)" :key="talent" class="keyword-pill">{{ talent }}</span></div></section>
          <button type="button" class="primary-button wide finish-character-button" :disabled="!canFinish" @click="finishCharacter">Create Character (Finished)</button>
        </template>

        <p v-if="error" class="creation-status-message" :class="{saved:error==='Draft saved.'}">{{ error }}</p>
        <div class="creation-step-actions"><button type="button" class="secondary-button" :disabled="stepIndex===0" @click="back">Back</button><button v-if="stepId!=='review'" type="button" class="primary-button" :disabled="stepId==='talents'&&!talentsValid()" @click="next">Continue</button></div>
      </section>

      <section class="creator-bottom-actions"><button type="button" class="secondary-button" @click="saveDraft(false)">Save</button><button type="button" class="secondary-button" @click="saveDraft(true)">Save &amp; Close</button><button type="button" class="danger-button creator-start-over" @click="resetForm">Start Over</button><button type="button" class="secondary-button creator-close-button" @click="closeWithoutSave">Close</button></section>
    </main>

    <div v-if="culturePickerOpen" class="modal-backdrop culture-picker-backdrop" @click.self="culturePickerOpen=false">
      <section class="modal-card culture-picker-modal" role="dialog" aria-modal="true" aria-label="Choose Culture Traits">
        <div class="modal-head"><div><span class="eyebrow">CULTURE TRAITS</span><h2>Choose Culture Traits</h2><small>{{ form.cultureTraits.length }}/2 selected</small></div><button type="button" class="icon-button" aria-label="Close Culture Trait picker" @click="culturePickerOpen=false">×</button></div>
        <label class="rules-search culture-picker-search"><span aria-hidden="true">⌕</span><input v-model="cultureSearch" type="search" placeholder="Search Culture Traits or Species…" /></label>
        <div class="culture-picker-list">
          <article v-for="trait in filteredCultureTraits" :key="`${trait.species}-${trait.name}`" class="culture-picker-row" :class="{selected:form.cultureTraits.includes(cultureId(trait.species,trait.name))}">
            <div class="culture-picker-row-head"><div><strong>{{ trait.name }}</strong><small>{{ trait.species }}</small></div><button v-if="form.cultureTraits.includes(cultureId(trait.species,trait.name))" type="button" class="secondary-button compact-action" @click="setCulture(cultureId(trait.species,trait.name),false)">Remove</button><button v-else type="button" class="secondary-button compact-action" :disabled="form.cultureTraits.length>=2" @click="setCulture(cultureId(trait.species,trait.name),true)">Add</button></div>
            <p v-if="structuredRule(trait.text).intro" class="rule-flavor">{{ structuredRule(trait.text).intro }}</p>
            <div v-if="structuredRule(trait.text).fields.length" class="rule-breakdown-grid"><div v-for="field in structuredRule(trait.text).fields" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div>
            <div class="keyword-pill-row"><span v-for="keyword in trait.keywords" :key="keyword" class="keyword-pill">{{ keyword }}</span></div>
          </article>
        </div>
        <div class="culture-picker-footer"><span>{{ form.cultureTraits.length===2?'Culture Traits ready.':'Choose exactly 2 Culture Traits.' }}</span><button type="button" class="primary-button" :disabled="form.cultureTraits.length!==2" @click="culturePickerOpen=false">Done</button></div>
      </section>
    </div>

    <div v-if="shopOpen" class="modal-backdrop" @click.self="shopOpen=false"><section class="modal-card gear-shop-modal" role="dialog" aria-modal="true" aria-label="Equipment and Gear"><div class="modal-head"><div><span class="eyebrow">EQUIPMENT &amp; GEAR</span><h2>Spend Starting Wealth</h2></div><button type="button" class="icon-button" @click="shopOpen=false">×</button></div><div class="gear-shop-balance"><span>Remaining Wealth</span><strong>{{ wealthRemaining }} sp</strong></div><div class="rules-search gear-search"><span aria-hidden="true">⌕</span><input v-model="shopSearch" placeholder="Search equipment…" /></div><div class="gear-shop-list"><article v-for="item in filteredGear" :key="`${item.category}-${item.name}`" class="gear-shop-row"><div><strong>{{ item.name }}</strong><small>{{ item.category }} · {{ item.costText }}</small><p>{{ item.detail }}</p></div><button type="button" class="secondary-button compact-action" :disabled="item.costSp>wealthRemaining" @click="addEquipment(item)">Add</button></article></div></section></div>
  </div>
</template>

<style scoped>
.creator-reader-page,.creation-step-card,.species-choice-layout,.species-choice-copy,.faith-oath-column{min-width:0;max-width:100%}
.species-choice-copy{overflow:hidden}
.species-choice-copy .creation-info-panel,.species-choice-copy .creation-info-body,.species-choice-copy .trait-stack,.species-choice-copy .trait-card,.faith-oath-column>section,.faith-oath-column .creation-info-panel,.faith-oath-column .creation-info-body,.faith-oath-column .choice-summary{min-width:0;max-width:100%}
.species-choice-copy .rule-breakdown-grid>div{min-width:0}
.species-choice-copy .rule-breakdown-grid span,.species-choice-copy .rule-flavor,.species-choice-copy .creation-info-body p,.faith-oath-column p{overflow-wrap:anywhere}
.species-art-shell{border:2px solid #000!important}
.appearance-textarea{min-height:82px;padding-top:10px;padding-bottom:10px;resize:vertical;line-height:1.45;font:inherit}
.creator-start-over{color:#000!important}
.creator-close-button{color:var(--danger)!important}
.spell-detail-card{--spell-lore:#6d6b66;border-top:5px solid var(--spell-lore)!important;background:color-mix(in srgb,var(--spell-lore) 7%,var(--paper))!important}
.spell-lore-flames{--spell-lore:#a63b32}.spell-lore-frost{--spell-lore:#347ba4}.spell-lore-hallows{--spell-lore:#76518e}.spell-lore-harmony{--spell-lore:#a87919}.spell-lore-life{--spell-lore:#3f7f4a}.spell-lore-oath{--spell-lore:#6d57a3}.spell-lore-wilds{--spell-lore:#56753a}.spell-lore-invocation{--spell-lore:#6d6b66}
:global(:root[data-theme="dark"]) .spell-detail-card{background:color-mix(in srgb,var(--spell-lore) 14%,var(--paper))!important}

.creation-info-panel{border-radius:10px!important;border:1px solid var(--line-dark)!important;border-top:5px solid var(--accent)!important;background:var(--paper)!important;box-shadow:0 2px 8px rgba(0,0,0,.05)}
.creation-info-panel>summary{min-height:42px!important;background:color-mix(in srgb,var(--accent) 8%,var(--paper-2))!important;border-bottom:0!important}
.creation-info-panel[open]>summary{border-bottom:1px solid var(--line)!important}
.creation-info-panel .creation-info-body{background:var(--paper)!important}
.culture-picker-modal{width:min(760px,calc(100% - 24px));max-height:84vh;display:grid;grid-template-rows:auto auto minmax(0,1fr) auto;overflow:hidden}
.culture-picker-modal .modal-head{padding-bottom:10px}.culture-picker-modal .modal-head small{display:block;margin-top:3px;color:var(--ink-soft)}
.culture-picker-search{margin:0 0 10px}.culture-picker-list{display:grid;gap:8px;min-height:0;overflow:auto;padding:1px 2px 6px}
.culture-picker-row{padding:11px 12px;border:1px solid var(--line);border-radius:10px;background:var(--paper-2)}
.culture-picker-row.selected{border-color:var(--accent);box-shadow:inset 4px 0 0 var(--accent);background:color-mix(in srgb,var(--accent-wash) 52%,var(--paper))}
.culture-picker-row-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}.culture-picker-row-head>div{display:grid;gap:2px}.culture-picker-row-head strong{font-family:Georgia,'Times New Roman',serif;font-size:calc(17px + var(--font-offset))}.culture-picker-row-head small{color:var(--ink-soft)}
.culture-picker-footer{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:9px;padding-top:10px;border-top:1px solid var(--line)}.culture-picker-footer>span{color:var(--ink-soft);font-weight:750}
.skill-rank-values{display:grid!important;justify-items:end;gap:1px}.skill-rank-values b{color:var(--ink);font-weight:850}.skill-rank-values small{color:var(--accent-dark);font-size:calc(9px + var(--font-offset));font-weight:800}
@media(max-width:680px){.culture-picker-modal{width:100%;max-height:92vh;border-radius:14px 14px 0 0}.culture-picker-backdrop{align-items:flex-end}.culture-picker-footer{align-items:stretch;flex-direction:column}.culture-picker-footer .primary-button{width:100%}}

</style>
