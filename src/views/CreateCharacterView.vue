<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { attributes, faiths, homelands, oaths, sparks, species, type AttributeId } from '../data/bramble'
import { allCultureTraits, speciesByName } from '../data/speciesData'
import { gearShopItems, homelandDetails, skillDefinitions, sparkDetails } from '../data/characterOptions'
import { attunableLores, loreSpells } from '../data/magicOptions'
import { ruleSourceDocuments } from '../data/rulesSource'
import { addCharacter, type AttributeRanks, type CharacterRecord, type PurchasedEquipment } from '../services/characters'

const router=useRouter()
const stepIndex=ref(0)
const error=ref('')
const shopOpen=ref(false)
const shopSearch=ref('')
const openAttribute=ref<AttributeId|null>(null)

const talentSections=ruleSourceDocuments.talents.sections.filter(section=>section.heading!=='Overview'&&section.heading!=='TALENTS'&&!section.heading.startsWith('KEYWORDS'))
const talentNames=talentSections.map(section=>section.heading)
function sectionKeywords(name:string){
  const section=talentSections.find(item=>item.heading===name)
  if(!section)return[]
  return section.blocks.flatMap(block=>block.type==='paragraph'&&/^KEYWORDS?:/i.test(block.text)?block.text.split(':',2)[1].split('|').map(item=>item.trim()).filter(Boolean):[])
}
function selectedSpecies(){return speciesByName[form.species]||speciesByName[species[0]]}
function cultureId(speciesName:string,name:string){return `${speciesName}::${name}`}
function ownCultureIds(speciesName:string){return(speciesByName[speciesName]?.cultureTraits||[]).slice(0,2).map(trait=>cultureId(speciesName,trait.name))}
function findCulture(id:string){const [speciesName,name]=id.split('::');const species=speciesByName[speciesName];const trait=species?.cultureTraits.find(item=>item.name===name);return trait?{...trait,species:speciesName}:null}

const form=reactive({
  species:species[0] as string,
  cultureTraits:ownCultureIds(species[0]) as string[],
  spark:sparks[0][0] as string,
  homeland:homelands[0].name as string,
  skills:[...homelands[0].skills] as string[],
  faith:faiths[0] as string,
  oath:oaths[0][0] as string,
  path:'magic' as 'magic'|'talents',
  talents:[''] as string[],
  loreAttunement:'Flames',
  spells:['','',''] as string[],
  invocationSpell:'',
  adventureKit:true,
  equipment:[] as PurchasedEquipment[],
  attributes:Object.fromEntries(attributes.map(a=>[a.id,1])) as AttributeRanks,
  name:'',pronunciation:'',age:'',appearance:'',pronouns:'',kinship:'',
})

const steps=computed(()=>[
  'species','culture','spark','homeland','skills','faith-oath','attributes','path',
  ...(form.path==='magic'?['magic']:[]),'talents','equipment','languages','details',
])
const stepId=computed(()=>steps.value[stepIndex.value]||'species')
const totalSteps=computed(()=>steps.value.length)
const stepNumber=computed(()=>stepIndex.value+1)
const selectedSpeciesData=computed(()=>selectedSpecies())
const selectedCultureTraits=computed(()=>form.cultureTraits.map(findCulture).filter(Boolean))
const spent=computed(()=>Object.values(form.attributes).reduce((sum,rank)=>sum+rank-1,0))
const remaining=computed(()=>5-spent.value)
const startingWealth=computed(()=>form.adventureKit?50:53)
const spentWealth=computed(()=>form.equipment.reduce((sum,item)=>sum+item.costSp,0))
const wealthRemaining=computed(()=>Math.round((startingWealth.value-spentWealth.value)*100)/100)
const homelandDetail=computed(()=>homelandDetails[form.homeland])
const homelandSkillPool=computed(()=>Array.from(new Set([...(homelandDetail.value?.skills||[]),...(homelandDetail.value?.optionalReplacements||[])])))
const currentSpark=computed(()=>sparkDetails[form.spark])
const attunedSignature=computed(()=>loreSpells[form.loreAttunement]?.[0]||'—')
const selectableSpells=computed(()=>attunableLores.flatMap(lore=>(loreSpells[lore]||[]).slice(1).map(name=>({name,lore}))))
const invocationOptions=computed(()=>loreSpells.Invocation||[])
const filteredGear=computed(()=>{const q=shopSearch.value.trim().toLowerCase();return gearShopItems.filter(item=>!q||`${item.name} ${item.category} ${item.detail}`.toLowerCase().includes(q)).slice(0,80)})
const nativeLanguage=computed(()=>selectedSpeciesData.value?.language.split(',')[0]?.trim()||'Native Language')
const languages=computed(()=>[nativeLanguage.value,'Commonspeak'])

const derived=computed(()=>({
  speed:2+form.attributes.agility,
  aim:form.attributes.agility*2,
  mettle:form.attributes.might*2,
  ward:form.attributes.hide*2,
  control:form.attributes.lore*2,
  power:form.attributes.might,
  guts:form.attributes.hide,
}))
const secondaryStats:Record<AttributeId,Array<{name:string;formula:string;description:string}>>={
  agility:[{name:'Speed',formula:'2 + Agility Rank',description:'Used for Initiative and movement-related rules where Speed is called for.'},{name:'Aim',formula:'Agility × 2',description:'Used by ranged Strike rolls.'}],
  might:[{name:'Mettle',formula:'Might × 2',description:'Used by melee Strike rolls.'},{name:'Power',formula:'Might Rank',description:'Represents raw force where Power is called for.'}],
  hide:[{name:'Ward',formula:'Hide × 2',description:'Used for opposed defensive Ward rolls.'},{name:'Guts',formula:'Hide Rank',description:'Reduces incoming damage according to the damage rules.'}],
  lore:[{name:'Control',formula:'Lore × 2',description:'Used by magical Strike rolls and spellcasting interactions.'}],
  bravery:[],
}
function secondaryLabel(id:AttributeId){const items=secondaryStats[id];return items.length?items.map(item=>item.name).join(', '):'No direct secondary stat listed'}
function attributeModifier(rank:number){return rank*2}
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

function setCulture(id:string,checked:boolean){
  if(checked){if(form.cultureTraits.length>=2)return;form.cultureTraits=[...form.cultureTraits,id]}
  else form.cultureTraits=form.cultureTraits.filter(item=>item!==id)
}
function setCultureFromEvent(id:string,event:Event){setCulture(id,Boolean((event.target as HTMLInputElement|null)?.checked))}
function setPath(path:'magic'|'talents'){form.path=path;form.talents=path==='magic'?['']:['','']}
function requiredTalentCount(){return form.path==='magic'?1:2}
function ensureTalentSlots(){const count=requiredTalentCount();while(form.talents.length<count)form.talents.push('');form.talents=form.talents.slice(0,count)}
function addEquipment(item:typeof gearShopItems[number]){if(item.costSp>wealthRemaining.value)return;form.equipment.push({name:item.name,costSp:item.costSp,category:item.category})}
function removeEquipment(index:number){form.equipment.splice(index,1)}

function validateCurrent(){
  error.value=''
  if(stepId.value==='culture'&&form.cultureTraits.length!==2){error.value='Choose exactly 2 Culture Traits before continuing.';return false}
  if(stepId.value==='skills'&&(form.skills.length!==2||form.skills.some(v=>!v)||new Set(form.skills).size!==2)){error.value='Choose 2 different starting Skills before continuing.';return false}
  if(stepId.value==='attributes'&&remaining.value!==0){error.value='Spend all 5 Attribute points before continuing.';return false}
  if(stepId.value==='magic'){
    if(!form.loreAttunement){error.value='Choose a Lore Attunement.';return false}
    if(form.spells.some(v=>!v)||new Set(form.spells).size!==3){error.value='Choose 3 different spells for your Level 1 spell slots.';return false}
    if(!form.invocationSpell){error.value='Choose 1 Invocation Spell.';return false}
  }
  if(stepId.value==='talents'){
    ensureTalentSlots()
    if(form.talents.some(v=>!v)){error.value=`Choose ${requiredTalentCount()} Talent${requiredTalentCount()===1?'':'s'} before continuing.`;return false}
    if(new Set(form.talents).size!==form.talents.length){error.value='Choose different Talents for each selection.';return false}
  }
  if(stepId.value==='equipment'&&wealthRemaining.value<0){error.value='Remove equipment until your remaining wealth is 0 sp or more.';return false}
  if(stepId.value==='details'&&!form.name.trim()){error.value='Enter a character name before saving.';return false}
  return true
}
function next(){if(!validateCurrent())return;if(stepIndex.value<totalSteps.value-1){stepIndex.value+=1;error.value='';window.scrollTo({top:0,behavior:'smooth'})}}
function back(){if(stepIndex.value>0){stepIndex.value-=1;error.value='';window.scrollTo({top:0,behavior:'smooth'})}}
function save(){
  if(!validateCurrent())return
  const record:CharacterRecord={
    id:crypto.randomUUID(),name:form.name.trim(),pronunciation:form.pronunciation.trim(),age:form.age.trim(),appearance:form.appearance.trim(),pronouns:form.pronouns.trim(),kinship:form.kinship.trim(),
    species:form.species,cultureTraits:selectedCultureTraits.value.map(item=>`${item!.name} (${item!.species})`),spark:form.spark,homeland:form.homeland,skills:[...form.skills],faith:form.faith,oath:form.oath,path:form.path,
    talents:[...form.talents],loreAttunement:form.path==='magic'?form.loreAttunement:undefined,spells:form.path==='magic'?[...form.spells]:undefined,invocationSpell:form.path==='magic'?form.invocationSpell:undefined,
    languages:languages.value,equipment:[...form.equipment],adventureKit:form.adventureKit,startingWealth:startingWealth.value,wealthRemaining:wealthRemaining.value,
    attributes:{...form.attributes},pinned:false,createdAt:new Date().toISOString(),
  }
  addCharacter(record);void router.replace('/characters')
}

watch(()=>form.species,(value,old)=>{if(value===old)return;form.cultureTraits=ownCultureIds(value)})
watch(()=>form.homeland,(value,old)=>{if(value===old)return;form.skills=[...(homelandDetails[value]?.skills||[]).slice(0,2)]})
watch(()=>form.path,()=>ensureTalentSlots())
</script>

<template>
  <main class="page character-create-page">
    <AppHeader compact back-to="/characters" back-label="Back to Character List" prefer-back-to />

    <div class="page-title-block">
      <p class="eyebrow">CHARACTER CREATION</p>
      <h1>Create a Character</h1>
      <p>Build a Brambleheart hero one choice at a time. Each step explains what the choice means before you continue.</p>
    </div>

    <div class="creation-progress" aria-label="Character creation progress">
      <span v-for="(_,index) in steps" :key="index" :class="{active:index===stepIndex,done:index<stepIndex}">{{ index+1 }}</span>
    </div>

    <section class="form-card creation-step-card">
      <template v-if="stepId==='species'">
        <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h2>Choose Your Species</h2></div></div>
        <div class="step-tip"><strong>What is a Species?</strong><p>Your Species defines the form your spirit took when it entered the world. It provides 3 Species Traits, 2 Culture Traits, a native language, and Commonspeak.</p></div>
        <label class="field-label">Species<select v-model="form.species" class="field-control"><option v-for="item in species" :key="item">{{ item }}</option></select></label>
        <details class="creation-info-panel"><summary>Species Lore</summary><div class="creation-info-body"><p><strong>{{ selectedSpeciesData.name }}</strong> ({{ selectedSpeciesData.pronunciation }})</p><p class="species-quote">“{{ selectedSpeciesData.quote }}”</p><p>{{ selectedSpeciesData.lore }}</p><p><strong>Language:</strong> {{ selectedSpeciesData.language }}</p></div></details>
        <details class="creation-info-panel"><summary>Species Traits</summary><div class="creation-info-body trait-card-stack"><article v-for="trait in selectedSpeciesData.speciesTraits" :key="trait.name" class="trait-choice-card"><strong>{{ trait.name }}</strong><p>{{ trait.text }}</p><div class="keyword-pill-row"><span v-for="keyword in trait.keywords" :key="keyword" class="keyword-pill">{{ keyword }}</span></div></article></div></details>
        <div class="creation-example"><strong>Selu's Player:</strong> <em>Selu is an Axalori, so I picture them as calm and patient even when the road becomes dangerous.</em></div>
      </template>

      <template v-else-if="stepId==='culture'">
        <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h2>Choose Culture Traits</h2></div></div>
        <div class="step-tip"><strong>What are Culture Traits?</strong><p>Culture Traits are learned traditions and disciplines shared through story rather than blood. Your Species' two Culture Traits begin selected below, but the character creation rules allow you to exchange them for Culture Traits from any Species entry.</p></div>
        <section class="own-culture-panel"><h3>{{ selectedSpeciesData.name }} Culture Traits</h3><div class="trait-card-stack"><article v-for="trait in selectedSpeciesData.cultureTraits" :key="trait.name" class="trait-choice-card"><strong>{{ trait.name }}</strong><p>{{ trait.text }}</p><div class="keyword-pill-row"><span v-for="keyword in trait.keywords" :key="keyword" class="keyword-pill">{{ keyword }}</span></div></article></div></section>
        <div class="culture-choice-list"><label v-for="trait in allCultureTraits" :key="cultureId(trait.species,trait.name)" class="culture-choice-row"><span><strong>{{ trait.name }}</strong><small>{{ trait.species }}</small></span><input type="checkbox" :checked="form.cultureTraits.includes(cultureId(trait.species,trait.name))" :disabled="!form.cultureTraits.includes(cultureId(trait.species,trait.name))&&form.cultureTraits.length>=2" @change="setCultureFromEvent(cultureId(trait.species,trait.name),$event)" /></label></div>
        <p class="form-note">{{ form.cultureTraits.length }} / 2 Culture Traits selected.</p>
        <div class="creation-example"><strong>Selu's Player:</strong> <em>Selu keeps one Axalori tradition, then exchanges the other for a Culture Trait that better reflects the community that raised them.</em></div>
      </template>

      <template v-else-if="stepId==='spark'">
        <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h2>Choose Your Spark</h2></div></div>
        <details class="creation-info-panel" open><summary>What is a Spark?</summary><div class="creation-info-body"><p>A Spark is your personality archetype — the way your hero thinks, feels, and acts. It shapes how you approach challenges and how your character's personality appears in play.</p></div></details>
        <details class="creation-info-panel"><summary>What does a Spark do?</summary><div class="creation-info-body"><p>A Spark does not change rolls or stats. It connects to Deeds: when you complete a Deed that aligns with one of your Spark's Keywords, you gain +3 additional Experience for that Deed.</p><RouterLink to="/rules/read/sparks-deeds" class="inline-rule-link">Read Sparks &amp; Deeds →</RouterLink></div></details>
        <label class="field-label">Spark<select v-model="form.spark" class="field-control"><option v-for="item in sparks" :key="item[0]" :value="item[0]">{{ item[0] }}</option></select></label>
        <div class="choice-summary descriptive-choice-panel"><p>{{ currentSpark?.description }}</p><div class="keyword-pill-row"><span v-for="keyword in currentSpark?.keywords||[]" :key="keyword" class="keyword-pill">{{ keyword }}</span></div></div>
        <div class="creation-example"><strong>Selu's Player:</strong> <em>I choose Healer because Selu listens first and looks for ways to mend a problem before escalating it.</em></div>
      </template>

      <template v-else-if="stepId==='homeland'">
        <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h2>Select Your Homeland</h2></div></div>
        <div class="step-tip"><strong>What is a Homeland?</strong><p>Your Homeland is the place and culture that shaped your first lessons. It grants 2 Skills at Rank 1 and colors your worldview; it is not restricted by Species.</p></div>
        <label class="field-label">Homeland<select v-model="form.homeland" class="field-control"><option v-for="item in homelands" :key="item.name">{{ item.name }}</option></select></label>
        <div class="choice-summary descriptive-choice-panel"><p>{{ homelandDetail?.description }}</p><p><strong>Starting Skills:</strong> {{ homelandDetail?.skills.join(' · ') }}</p><p v-if="homelandDetail?.optionalReplacements.length"><strong>Optional Replacements:</strong> {{ homelandDetail.optionalReplacements.join(' · ') }}</p></div>
        <div class="creation-example"><strong>Selu's Player:</strong> <em>Selu grew up in Willowstead, where helping neighbors and tending small hurts were part of daily life.</em></div>
      </template>

      <template v-else-if="stepId==='skills'">
        <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h2>Choose Starting Skills</h2></div></div>
        <div class="step-tip"><strong>What are Skills?</strong><p>Skills are learned or natural areas of focused practice. Your Homeland grants 2 Skills at Rank 1. Where the Homeland lists optional replacements, you may use those instead.</p></div>
        <div class="field-grid two"><label v-for="index in 2" :key="index" class="field-label">Skill {{ index }}<select v-model="form.skills[index-1]" class="field-control"><option value="">Choose a Skill</option><option v-for="skill in homelandSkillPool" :key="skill">{{ skill }}</option></select></label></div>
        <div class="selected-skill-stack"><article v-for="skill in form.skills.filter(Boolean)" :key="skill" class="choice-summary"><strong>{{ skill }}</strong><template v-if="skillDefinitions.find(item=>item.name===skill)"><p>{{ skillDefinitions.find(item=>item.name===skill)?.description }}</p><div class="keyword-pill-row"><span class="keyword-pill">{{ skillDefinitions.find(item=>item.name===skill)?.attribute }}</span><span v-if="skillDefinitions.find(item=>item.name===skill)?.restricted" class="keyword-pill">Restricted</span><span v-if="skillDefinitions.find(item=>item.name===skill)?.expanded" class="keyword-pill">Expanded</span></div></template></article></div>
        <div class="creation-example"><strong>Selu's Player:</strong> <em>Willowstead gives Selu Herbalry and Charm, so I keep both at Rank 1 to match the kind of help they learned to offer at home.</em></div>
      </template>

      <template v-else-if="stepId==='faith-oath'">
        <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h2>Choose Faith &amp; Oath</h2></div></div>
        <div class="step-tip"><strong>Faith and Oath</strong><p>Faith describes what your hero reveres or trusts. Oath describes the principle they act upon. Both are story-driven elements that can shape favor, reputation, and consequences through play.</p></div>
        <div class="field-grid two"><label class="field-label">Faith<select v-model="form.faith" class="field-control"><option v-for="item in faiths" :key="item">{{ item }}</option></select></label><label class="field-label">Oath<select v-model="form.oath" class="field-control"><option v-for="item in oaths" :key="item[0]" :value="item[0]">{{ item[0] }}</option></select></label></div>
        <div class="field-grid two"><article class="choice-summary descriptive-choice-panel"><strong>{{ form.faith }}</strong><p>{{ faithDescription||'A story-facing expression of what your hero reveres or trusts.' }}</p></article><article class="choice-summary descriptive-choice-panel"><strong>{{ form.oath }}</strong><p>{{ oathDescription||oaths.find(item=>item[0]===form.oath)?.[1] }}</p></article></div>
        <div class="creation-example"><strong>Selu's Player:</strong> <em>I choose a Faith that gives Selu a language for what they believe, then an Oath that tells me what principle they refuse to abandon when the story becomes difficult.</em></div>
      </template>

      <template v-else-if="stepId==='attributes'">
        <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h2>Attribute Distribution</h2></div></div>
        <details class="creation-info-panel" open><summary>What do Attributes do?</summary><div class="creation-info-body"><p>Attributes are the five pillars of your character's natural capability. They determine modifiers used by rolls and feed several secondary stats used in battle.</p><RouterLink to="/rules/read/attributes-skills" class="inline-rule-link">Read Attributes &amp; Skills →</RouterLink></div></details>
        <div class="subsection-title"><strong>Spend 5 Points</strong><span>{{ remaining }} points remaining</span></div>
        <div class="attribute-editor detailed-attribute-editor">
          <article v-for="attribute in attributes" :key="attribute.id" class="attribute-detail-card" :class="{expanded:openAttribute===attribute.id}">
            <button type="button" class="attribute-info-toggle" @click="toggleAttribute(attribute.id)"><span><strong>{{ attribute.name }}</strong><small>{{ attribute.description }}</small><em>Secondary Stats: {{ secondaryLabel(attribute.id) }}</em></span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>
            <div class="attribute-control-grid"><div class="attribute-modifier-column"><small>Modifier</small><strong>+{{ attributeModifier(form.attributes[attribute.id]) }}</strong></div><div class="attribute-rank-column"><small>Rank</small><div class="rank-stepper-line"><span class="max-marker">{{ form.attributes[attribute.id]===3?'MAX':'' }}</span><div class="stepper"><button type="button" @click="adjust(attribute.id,-1)">−</button><span>{{ form.attributes[attribute.id] }}</span><button type="button" @click="adjust(attribute.id,1)">+</button></div></div></div></div>
            <div v-if="openAttribute===attribute.id" class="attribute-secondary-detail"><article v-for="secondary in secondaryStats[attribute.id]" :key="secondary.name"><strong>{{ secondary.name }}</strong><small>{{ secondary.formula }}</small><p>{{ secondary.description }}</p></article><p v-if="!secondaryStats[attribute.id].length">The supplied Battle rules do not currently list a direct secondary stat derived from {{ attribute.name }}.</p></div>
          </article>
        </div>
        <div class="creation-example"><strong>Selu's Player:</strong> <em>I raise Lore because Selu is observant and magical, but I still keep enough Hide to make their Ward and Guts dependable.</em></div>
      </template>

      <template v-else-if="stepId==='path'">
        <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h2>The Rhythm of Body &amp; Spirit</h2></div></div>
        <div class="step-tip"><strong>Choose one path</strong><p>Every hero develops a rhythm of practiced talent, magical attunement, or both. Choose Magic Level 1 plus 1 Talent, or 2 Talents.</p></div>
        <div class="path-choice-grid">
          <button type="button" class="path-choice-card" :class="{selected:form.path==='magic'}" @click="setPath('magic')"><span class="path-choice-kicker">WIND-TOUCHED</span><strong>Magic Level 1 + 1 Talent</strong><p>Listen to the Winds of Magic, choose a Lore Attunement and starting Spells, then choose one Talent.</p></button>
          <button type="button" class="path-choice-card" :class="{selected:form.path==='talents'}" @click="setPath('talents')"><span class="path-choice-kicker">GIFTED HEART</span><strong>2 Talents</strong><p>Lean into practiced skill, instinct, and hard-earned capability by choosing two Talents.</p></button>
        </div>
        <div class="creation-example"><strong>Selu's Player:</strong> <em>Selu hears the Winds clearly, so I choose Wind-Touched and will build their first magical choices next.</em></div>
      </template>

      <template v-else-if="stepId==='magic'">
        <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h2>Magic &amp; Lore Attunement</h2></div></div>
        <div class="step-tip"><strong>Magic Level 1</strong><p>At Magic Level 1, choose 3 different Spells from the seven magical Lores, gain 1 Invocation Spell, and attune to 1 Lore of Magic. Your attuned Lore reduces the Mana cost of its Spells by 2 and grants its Signature Spell for free.</p></div>
        <label class="field-label">Lore Attunement<select v-model="form.loreAttunement" class="field-control"><option v-for="lore in attunableLores" :key="lore">{{ lore }}</option></select></label>
        <div class="choice-summary"><strong>Signature Spell</strong><span>{{ attunedSignature }} — gained free from {{ form.loreAttunement }} Attunement.</span><div class="keyword-pill-row"><span class="keyword-pill">Lore</span><span class="keyword-pill">{{ form.loreAttunement }}</span><span class="keyword-pill">Signature</span></div></div>
        <div class="field-grid three"><label v-for="index in 3" :key="index" class="field-label">Spell Slot {{ index }}<select v-model="form.spells[index-1]" class="field-control"><option value="">Choose a Spell</option><option v-for="spell in selectableSpells" :key="`${spell.lore}-${spell.name}`" :value="spell.name">{{ spell.name }} — {{ spell.lore }}</option></select></label></div>
        <label class="field-label">Invocation Spell<select v-model="form.invocationSpell" class="field-control"><option value="">Choose an Invocation Spell</option><option v-for="spell in invocationOptions" :key="spell">{{ spell }}</option></select></label>
        <div class="creation-example"><strong>Selu's Player:</strong> <em>I attune Selu to Life. That gives them the Lore's Signature Spell and makes their Life Spells less costly to cast.</em></div>
      </template>

      <template v-else-if="stepId==='talents'">
        <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h2>Choose Talents</h2></div></div>
        <div class="step-tip"><strong>What are Talents?</strong><p>Talents are marks of practiced skill or natural brilliance — things your hero does exceptionally well through training, instinct, or fate.</p></div>
        <div class="field-grid two"><label v-for="index in requiredTalentCount()" :key="index" class="field-label">Talent {{ index }}<select v-model="form.talents[index-1]" class="field-control"><option value="">Choose a Talent</option><option v-for="talent in talentNames" :key="talent">{{ talent }}</option></select></label></div>
        <div class="selected-talent-stack"><article v-for="talent in form.talents.filter(Boolean)" :key="talent" class="choice-summary"><strong>{{ talent }}</strong><div class="keyword-pill-row"><span v-for="keyword in sectionKeywords(talent)" :key="keyword" class="keyword-pill">{{ keyword }}</span></div></article></div>
        <div class="creation-example"><strong>Selu's Player:</strong> <em>I pick a Talent that reinforces Selu's established strengths rather than choosing only by the largest numerical bonus.</em></div>
      </template>

      <template v-else-if="stepId==='equipment'">
        <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h2>Equipment &amp; Items</h2></div></div>
        <div class="step-tip"><strong>Starting equipment</strong><p>Each character begins with an Adventure Kit and 50 sp to spend on additional gear. You may return the Adventure Kit for an additional 3 sp.</p></div>
        <details class="creation-info-panel" open><summary>Adventure Kit Contents</summary><div class="creation-info-body"><ul><li>Bedroll &amp; Groundsheet</li><li>Traveler's Cloak</li><li>2× Torches</li><li>Reed Flask &amp; 2× Trail Rations</li><li>Traveler's Pack</li><li>Fire-Starting Kit</li></ul></div></details>
        <label class="setting-row character-kit-choice"><span><strong>Keep Adventure Kit</strong><small>Turn this off to return the kit and add 3 sp to starting wealth.</small></span><input v-model="form.adventureKit" type="checkbox" /></label>
        <div class="metric-grid"><div><span>Starting Wealth</span><strong>{{ startingWealth }} sp</strong></div><div><span>Remaining Wealth</span><strong>{{ wealthRemaining }} sp</strong></div></div>
        <button type="button" class="secondary-button wide" @click="shopOpen=true">Spend Wealth on Equipment</button>
        <div v-if="form.equipment.length" class="purchased-gear-list"><article v-for="(item,index) in form.equipment" :key="`${item.name}-${index}`" class="list-row"><span class="list-row-copy"><strong class="list-row-title">{{ item.name }}</strong><small class="list-row-subtitle">{{ item.category }} · {{ item.costSp }} sp</small></span><button type="button" class="secondary-button compact-action" @click="removeEquipment(index)">Remove</button></article></div>
        <div class="creation-example"><strong>Selu's Player:</strong> <em>I keep the Adventure Kit, then buy only what supports Selu's role so they still have some Threadpieces left when the journey begins.</em></div>
      </template>

      <template v-else-if="stepId==='languages'">
        <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h2>Starting Languages</h2></div></div>
        <div class="step-tip"><strong>Languages</strong><p>The character creation rules give each Species its native tongue and Commonspeak. These are recorded automatically from your Species choice.</p></div>
        <div class="language-choice-grid"><article class="choice-summary"><strong>{{ nativeLanguage }}</strong><span>{{ form.species }} native language</span></article><article class="choice-summary"><strong>Commonspeak</strong><span>Shared common language</span></article></div>
        <div class="creation-example"><strong>Selu's Player:</strong> <em>Selu begins knowing their Species' native tongue and Commonspeak, giving them both a language of home and a language shared across the wider world.</em></div>
      </template>

      <template v-else>
        <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h2>Character Details</h2></div></div>
        <div class="step-tip"><strong>Finish the hero</strong><p>Add the final identity details, then review the character's Attributes and secondary values before saving.</p></div>
        <div class="field-grid two"><label class="field-label">Name<input v-model="form.name" class="field-control" placeholder="Character name" /></label><label class="field-label">Pronunciation<input v-model="form.pronunciation" class="field-control" placeholder="Optional" /></label><label class="field-label">Age<input v-model="form.age" class="field-control" placeholder="Optional" /></label><label class="field-label">Pronouns<input v-model="form.pronouns" class="field-control" placeholder="Optional" /></label><label class="field-label">Pack / Herd / Kinship<input v-model="form.kinship" class="field-control" placeholder="Optional" /></label><label class="field-label">Appearance<input v-model="form.appearance" class="field-control" placeholder="Short description" /></label></div>
        <div class="review-attribute-grid"><article v-for="attribute in attributes" :key="attribute.id"><span>{{ attribute.name }}</span><strong>Rank {{ form.attributes[attribute.id] }}</strong><small>Modifier +{{ attributeModifier(form.attributes[attribute.id]) }}</small></article></div>
        <div class="stat-grid creation-derived-grid"><div class="character-stat"><strong>{{ derived.speed }}</strong><span>SPEED</span></div><div class="character-stat"><strong>{{ derived.aim }}</strong><span>AIM</span></div><div class="character-stat"><strong>{{ derived.mettle }}</strong><span>METTLE</span></div><div class="character-stat"><strong>{{ derived.ward }}</strong><span>WARD</span></div><div class="character-stat"><strong>{{ derived.control }}</strong><span>CONTROL</span></div><div class="character-stat"><strong>{{ derived.power }}</strong><span>POWER</span></div><div class="character-stat"><strong>{{ derived.guts }}</strong><span>GUTS</span></div></div>
        <section class="character-review-card"><strong>{{ form.species }} · {{ form.spark }} · {{ form.homeland }}</strong><p>{{ form.faith }} · Oath of {{ form.oath }}</p><p>Skills: {{ form.skills.join(' · ') }} · Languages: {{ languages.join(' · ') }}</p><p v-if="form.path==='magic'">{{ form.loreAttunement }} Attunement · {{ form.spells.join(' · ') }} · Invocation: {{ form.invocationSpell }}</p><p>Talents: {{ form.talents.join(' · ') }}</p></section>
      </template>

      <p v-if="error" class="error-text creation-error">{{ error }}</p>
      <div class="creation-nav"><button v-if="stepIndex>0" type="button" class="secondary-button" @click="back">Back</button><RouterLink v-else class="secondary-button" to="/characters">Cancel</RouterLink><button v-if="stepIndex<totalSteps-1" type="button" class="primary-button" @click="next">Continue</button><button v-else type="button" class="primary-button" @click="save">Save Character</button></div>
    </section>

    <div v-if="shopOpen" class="modal-backdrop" @click.self="shopOpen=false">
      <section class="modal-card equipment-shop-modal" role="dialog" aria-modal="true" aria-label="Equipment shop">
        <div class="modal-head"><div><p class="eyebrow">EQUIPMENT</p><h2>Spend Starting Wealth</h2></div><button class="icon-button" type="button" aria-label="Close equipment shop" @click="shopOpen=false">×</button></div>
        <div class="shop-wealth-line"><span>Remaining</span><strong>{{ wealthRemaining }} sp</strong></div>
        <label class="search-bar shop-search"><span aria-hidden="true">⌕</span><input v-model="shopSearch" type="search" placeholder="Search equipment" /></label>
        <div class="equipment-shop-list"><article v-for="item in filteredGear" :key="`${item.category}-${item.name}`" class="equipment-shop-row"><div><strong>{{ item.name }}</strong><small>{{ item.category }} · {{ item.costText }}<template v-if="item.detail"> · {{ item.detail }}</template></small></div><button type="button" class="secondary-button compact-action" :disabled="item.costSp>wealthRemaining" @click="addEquipment(item)">Add</button></article></div>
      </section>
    </div>
  </main>
</template>
