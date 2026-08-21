<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { attributes, faiths, homelands, oaths, sparks, species, type AttributeId } from '../data/bramble'
import { ruleSourceDocuments } from '../data/rulesSource'
import { addCharacter, type AttributeRanks, type CharacterRecord } from '../services/characters'

const router=useRouter()
const step=ref(1)
const error=ref('')
const talentNames=ruleSourceDocuments.talents.sections.map(s=>s.heading).filter(name=>name!=='Overview'&&name!=='TALENTS'&&!name.startsWith('KEYWORDS'))
const loreNames=['Invocation','Flames','Frost','Hallows','Harmony','Life','Oath','Wilds']

const form=reactive({
  species:species[0] as string,
  spark:sparks[0][0] as string,
  homeland:homelands[0].name as string,
  faith:faiths[0] as string,
  oath:oaths[0][0] as string,
  path:'magic' as 'magic'|'talents',
  talents:[''] as string[],
  loreAttunement:'Invocation',
  adventureKit:true,
  attributes:Object.fromEntries(attributes.map(a=>[a.id,1])) as AttributeRanks,
  name:'',pronunciation:'',age:'',appearance:'',pronouns:'',kinship:'',
})

const spent=computed(()=>Object.values(form.attributes).reduce((sum,rank)=>sum+rank-1,0))
const remaining=computed(()=>5-spent.value)
const startingWealth=computed(()=>form.adventureKit?50:53)
const derived=computed(()=>({
  speed:2+form.attributes.agility,
  aim:form.attributes.agility*2,
  mettle:form.attributes.might*2,
  ward:form.attributes.hide*2,
  control:form.attributes.lore*2,
  power:form.attributes.might,
  guts:form.attributes.hide,
}))

function adjust(id:AttributeId,delta:number){
  const current=form.attributes[id]
  if(delta>0&&(current>=3||remaining.value<=0))return
  if(delta<0&&current<=1)return
  form.attributes[id]+=delta
}
function requiredTalentCount(){return form.path==='magic'?1:2}
function normalizeTalentSlots(){
  const count=requiredTalentCount()
  while(form.talents.length<count)form.talents.push('')
  form.talents=form.talents.slice(0,count)
}
function validateCurrent(){
  error.value=''
  if(step.value===5&&remaining.value!==0){error.value='Spend all 5 attribute points before continuing.';return false}
  if(step.value===6){
    normalizeTalentSlots()
    if(form.talents.some(v=>!v)){error.value=`Choose ${requiredTalentCount()} Talent${requiredTalentCount()===1?'':'s'} before continuing.`;return false}
    if(new Set(form.talents).size!==form.talents.length){error.value='Choose different Talents for each selection.';return false}
  }
  if(step.value===8&&!form.name.trim()){error.value='Enter a character name before saving.';return false}
  return true
}
function next(){if(!validateCurrent())return;if(step.value<8){step.value+=1;error.value='';window.scrollTo({top:0,behavior:'smooth'})}}
function back(){if(step.value>1){step.value-=1;error.value='';window.scrollTo({top:0,behavior:'smooth'})}}
function save(){
  if(!validateCurrent())return
  const record:CharacterRecord={
    id:crypto.randomUUID(),name:form.name.trim(),pronunciation:form.pronunciation.trim(),age:form.age.trim(),appearance:form.appearance.trim(),pronouns:form.pronouns.trim(),kinship:form.kinship.trim(),
    species:form.species,spark:form.spark,homeland:form.homeland,faith:form.faith,oath:form.oath,path:form.path,
    talents:[...form.talents],loreAttunement:form.path==='magic'?form.loreAttunement:undefined,adventureKit:form.adventureKit,startingWealth:startingWealth.value,
    attributes:{...form.attributes},pinned:false,createdAt:new Date().toISOString(),
  }
  addCharacter(record)
  void router.replace('/characters')
}
function optionSummary<T extends readonly (readonly [string,string])[]>(list:T,name:string){return list.find(item=>item[0]===name)?.[1]||''}
</script>

<template>
  <main class="page character-create-page">
    <AppHeader compact back-to="/characters" back-label="Back to Character List" prefer-back-to />

    <div class="page-title-block">
      <p class="eyebrow">CHARACTER CREATION</p>
      <h1>Create a Character</h1>
      <p>Build a Brambleheart hero one step at a time. Each step includes the rule context needed to understand the choice before moving on.</p>
    </div>

    <div class="creation-progress" aria-label="Character creation progress">
      <span v-for="n in 8" :key="n" :class="{active:n===step,done:n<step}">{{ n }}</span>
    </div>

    <section class="form-card creation-step-card">
      <template v-if="step===1">
        <div class="form-card-heading"><div><p class="eyebrow">STEP 1 OF 8</p><h2>Choose Your Species</h2></div></div>
        <div class="step-tip"><strong>What is a species?</strong><p>Your species defines your character's origin — the form their spirit took when they entered the world. The current creation rules grant species traits, culture traits, a native language, and Commonspeak.</p></div>
        <label class="field-label">Species<select v-model="form.species" class="field-control"><option v-for="item in species" :key="item">{{ item }}</option></select></label>
        <p class="form-note source-note">The supplied Character Species chapter currently contains only its title page, so detailed species-trait selections are not inferred here.</p>
      </template>

      <template v-else-if="step===2">
        <div class="form-card-heading"><div><p class="eyebrow">STEP 2 OF 8</p><h2>Choose Your Spark</h2></div></div>
        <div class="step-tip"><strong>What is a Spark?</strong><p>A Spark is your personality archetype — how your hero thinks, feels, and acts. When a completed Deed aligns with one of the Spark's keywords, the current rules award additional experience.</p></div>
        <label class="field-label">Spark<select v-model="form.spark" class="field-control"><option v-for="item in sparks" :key="item[0]" :value="item[0]">{{ item[0] }} — {{ item[1] }}</option></select></label>
        <div class="choice-summary"><strong>{{ form.spark }}</strong><span>{{ optionSummary(sparks,form.spark) }}</span></div>
      </template>

      <template v-else-if="step===3">
        <div class="form-card-heading"><div><p class="eyebrow">STEP 3 OF 8</p><h2>Select Your Homeland</h2></div></div>
        <div class="step-tip"><strong>What is a Homeland?</strong><p>Your Homeland represents the lands, peoples, and traditions that shaped your hero's first lessons. A Homeland grants two skills at rank 1 and is not restricted by species.</p></div>
        <label class="field-label">Homeland<select v-model="form.homeland" class="field-control"><option v-for="item in homelands" :key="item.name">{{ item.name }}</option></select></label>
        <div class="choice-summary"><strong>Starting Skills</strong><span>{{ homelands.find(item=>item.name===form.homeland)?.skills.join(' · ') }}</span></div>
      </template>

      <template v-else-if="step===4">
        <div class="form-card-heading"><div><p class="eyebrow">STEP 4 OF 8</p><h2>Choose Faith &amp; Oath</h2></div></div>
        <div class="step-tip"><strong>Faith and Oath</strong><p>Faith describes what your hero reveres or trusts. Oath describes the principle they act upon. Both are story-driven elements that help define role-play.</p></div>
        <div class="field-grid two">
          <label class="field-label">Faith<select v-model="form.faith" class="field-control"><option v-for="item in faiths" :key="item">{{ item }}</option></select></label>
          <label class="field-label">Oath<select v-model="form.oath" class="field-control"><option v-for="item in oaths" :key="item[0]" :value="item[0]">{{ item[0] }} — {{ item[1] }}</option></select></label>
        </div>
        <div class="choice-summary"><strong>{{ form.oath }}</strong><span>{{ optionSummary(oaths,form.oath) }}</span></div>
      </template>

      <template v-else-if="step===5">
        <div class="form-card-heading"><div><p class="eyebrow">STEP 5 OF 8</p><h2>Attribute Distribution</h2></div></div>
        <div class="step-tip"><strong>What are Attributes?</strong><p>Attributes are the five pillars of a character's natural capability. Each starts at rank 1. Spend 5 points to raise them; no Attribute may exceed rank 3 during creation.</p></div>
        <div class="subsection-title"><strong>Attributes</strong><span>{{ remaining }} points remaining</span></div>
        <div class="attribute-editor">
          <div v-for="attribute in attributes" :key="attribute.id" class="attribute-row">
            <div><strong>{{ attribute.name }}</strong><small>{{ attribute.description }}</small></div>
            <div class="stepper"><button type="button" @click="adjust(attribute.id,-1)">−</button><span>{{ form.attributes[attribute.id] }}</span><button type="button" @click="adjust(attribute.id,1)">+</button></div>
          </div>
        </div>
      </template>

      <template v-else-if="step===6">
        <div class="form-card-heading"><div><p class="eyebrow">STEP 6 OF 8</p><h2>The Rhythm of Body &amp; Spirit</h2></div></div>
        <div class="step-tip"><strong>Talents or Magic</strong><p>Choose either Magic Level 1 and one Talent, or two Talents. Talents represent practiced or natural capability; Magic represents attunement to the living Winds of Magic.</p></div>
        <fieldset class="choice-box">
          <legend>Choose one path</legend>
          <label><input v-model="form.path" type="radio" value="magic" @change="normalizeTalentSlots" /> Magic Level 1 + 1 Talent</label>
          <label><input v-model="form.path" type="radio" value="talents" @change="normalizeTalentSlots" /> 2 Talents</label>
        </fieldset>
        <div v-if="form.path==='magic'" class="field-grid two magic-choice-grid">
          <label class="field-label">Lore Attunement<select v-model="form.loreAttunement" class="field-control"><option v-for="lore in loreNames" :key="lore">{{ lore }}</option></select></label>
          <label class="field-label">Talent<select v-model="form.talents[0]" class="field-control"><option value="">Choose a Talent</option><option v-for="talent in talentNames" :key="talent">{{ talent }}</option></select></label>
        </div>
        <div v-else class="field-grid two">
          <label v-for="index in 2" :key="index" class="field-label">Talent {{ index }}<select v-model="form.talents[index-1]" class="field-control"><option value="">Choose a Talent</option><option v-for="talent in talentNames" :key="talent">{{ talent }}</option></select></label>
        </div>
      </template>

      <template v-else-if="step===7">
        <div class="form-card-heading"><div><p class="eyebrow">STEP 7 OF 8</p><h2>Equipment &amp; Items</h2></div></div>
        <div class="step-tip"><strong>Starting equipment</strong><p>Each character begins with an Adventure Kit and 50 sp. The Adventure Kit may be returned for an additional 3 sp.</p></div>
        <label class="setting-row character-kit-choice"><span><strong>Keep Adventure Kit</strong><small>Keep the standard starting kit. Turn this off to begin with 53 sp instead.</small></span><input v-model="form.adventureKit" type="checkbox" /></label>
        <div class="metric-grid"><div><span>Starting Wealth</span><strong>{{ startingWealth }} sp</strong></div><div><span>Adventure Kit</span><strong>{{ form.adventureKit?'Yes':'Returned' }}</strong></div></div>
        <p class="form-note">Additional weapon, armor, and adventuring gear purchasing can be expanded in a later character-equipment pass.</p>
      </template>

      <template v-else>
        <div class="form-card-heading"><div><p class="eyebrow">STEP 8 OF 8</p><h2>Character Details</h2></div></div>
        <div class="step-tip"><strong>Finish the hero</strong><p>Add the final identity details, then review the secondary values calculated from the current rules. Agility is used throughout the app for Speed and Aim.</p></div>
        <div class="field-grid two">
          <label class="field-label">Name<input v-model="form.name" class="field-control" placeholder="Character name" /></label>
          <label class="field-label">Pronunciation<input v-model="form.pronunciation" class="field-control" placeholder="Optional" /></label>
          <label class="field-label">Age<input v-model="form.age" class="field-control" placeholder="Optional" /></label>
          <label class="field-label">Pronouns<input v-model="form.pronouns" class="field-control" placeholder="Optional" /></label>
          <label class="field-label">Pack / Herd / Kinship<input v-model="form.kinship" class="field-control" placeholder="Optional" /></label>
          <label class="field-label">Appearance<input v-model="form.appearance" class="field-control" placeholder="Short description" /></label>
        </div>
        <div class="stat-grid creation-derived-grid">
          <div class="character-stat"><strong>{{ derived.speed }}</strong><span>SPEED</span></div><div class="character-stat"><strong>{{ derived.aim }}</strong><span>AIM</span></div><div class="character-stat"><strong>{{ derived.mettle }}</strong><span>METTLE</span></div><div class="character-stat"><strong>{{ derived.ward }}</strong><span>WARD</span></div><div class="character-stat"><strong>{{ derived.control }}</strong><span>CONTROL</span></div><div class="character-stat"><strong>{{ derived.power }}</strong><span>POWER</span></div><div class="character-stat"><strong>{{ derived.guts }}</strong><span>GUTS</span></div>
        </div>
      </template>

      <p v-if="error" class="error-text creation-error">{{ error }}</p>
      <div class="creation-nav">
        <button v-if="step>1" type="button" class="secondary-button" @click="back">Back</button>
        <RouterLink v-else class="secondary-button" to="/characters">Cancel</RouterLink>
        <button v-if="step<8" type="button" class="primary-button" @click="next">Continue</button>
        <button v-else type="button" class="primary-button" @click="save">Save Character</button>
      </div>
    </section>
  </main>
</template>
