<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { attributes, faiths, homelands, oaths, sparks, species, type AttributeId } from '../data/bramble'
import { allCultureTraits, speciesByName } from '../data/speciesData'
import { gearShopItems, homelandDetails, skillDefinitions, sparkDetails } from '../data/characterOptions'
import { cultureSkillGrants, speciesImagePaths } from '../data/creationRules'
import { attunableLores, loreSpells } from '../data/magicOptions'
import { loreDescriptions, spellDetails } from '../data/magicDetails'
import { ruleSourceDocuments } from '../data/rulesSource'
import { loadCharacters, upsertCharacter, type AttributeRanks, type CharacterRecord, type PurchasedEquipment } from '../services/characters'

const router = useRouter()
const route = useRoute()
const stepIndex = ref(0)
const error = ref('')
const shopOpen = ref(false)
const shopSearch = ref('')
const gearTab=ref('All')
const gearChoice=ref<Record<string,string>>({})
const culturePickerOpen = ref(false)
const cultureSearch = ref('')
const cultureTab = ref('All')
const cultureReplaceIndex = ref(0)
const talentPickerOpen = ref(false)
const talentSearch = ref('')
const talentTab = ref('All')
const openAttribute = ref<AttributeId | null>(null)
const draftId = ref<string | null>(null)
const originalCreatedAt = ref<string | null>(null)
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
function visibleRuleFields(text:string){return structuredRule(text).fields.filter(field=>field.label!=='COST')}
function manaCostFromText(text:string){const match=text.match(/\bCOST:\s*\[?([0-9]+)\]?\s*mana/i);return match?Number(match[1]):null}
function singleKeywords(values:string[]|undefined){return Array.from(new Set((values||[]).flatMap(value=>String(value).split(/[|,;]+/).map(item=>item.trim()).filter(Boolean))))}

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

function talentCategory(name:string){
  const hay=`${name} ${talentText(name)} ${talentKeywords(name).join(' ')}`.toLowerCase()
  if(/spell|mana|magic|lore|invocation/.test(hay))return'Magic'
  if(/strike|weapon|combat|attack|damage|ward/.test(hay))return'Combat'
  if(/move|movement|speed|travel|climb|jump/.test(hay))return'Movement'
  if(/health|guts|resist|defen|surviv|rest|heal/.test(hay))return'Survival'
  if(/charm|presence|social|speech|ally|friend|kin/.test(hay))return'Social'
  return'Utility'
}
const talentCategories=['Combat','Magic','Movement','Survival','Social','Utility'] as const
const talentGroups=computed(()=>talentCategories.map(category=>({category,talents:talentNames.value.filter(name=>talentCategory(name)===category)})).filter(group=>group.talents.length))
const talentTabs=computed(()=>['All',...talentGroups.value.map(group=>group.category)])
const filteredTalentPicker=computed(()=>{const q=talentSearch.value.trim().toLowerCase();return talentNames.value.filter(name=>(talentTab.value==='All'||talentCategory(name)===talentTab.value)&&(!q||`${name} ${talentText(name)} ${talentKeywords(name).join(' ')}`.toLowerCase().includes(q)))})

function cultureId(speciesName:string,name:string){return `${speciesName}::${name}`}
function ownCultureIds(speciesName:string){return (speciesByName[speciesName]?.cultureTraits||[]).slice(0,2).map(trait=>cultureId(speciesName,trait.name))}
function findCulture(id:string){
  const [speciesName,...rest]=id.split('::'); const name=rest.join('::')
  const data=speciesByName[speciesName]
  const trait=data?.cultureTraits.find(item=>item.name===name)
  return trait?{...trait,species:speciesName}:null
}

const form = reactive({
  name:'', campaignName:'', age:'', appearance:'', pronouns:'', kinship:'',
  species:'',
  cultureTraits:[] as string[],
  cultureSkillChoices:{} as Record<string,string>,
  spark:sparks[0][0] as string,
  homeland:homelands[0].name as string,
  customHomelandName:'', customHomelandDetail:'',
  skills:homelands[0].skills.map(normalizeSkillName) as string[],
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
  additionalLanguage:'',
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
function normalizeSkillName(name:string){return String(name||'').replace(/\s*\([^)]*\)\s*/g,' ').replace(/\s+/g,' ').trim()}
const homelandCoreSkills=computed(()=>Array.from(new Set((homelandDetail.value?.skills||[]).map(normalizeSkillName))))
const homelandOptionalSkills=computed(()=>Array.from(new Set((homelandDetail.value?.optionalReplacements||[]).map(normalizeSkillName))).filter(skill=>!homelandCoreSkills.value.includes(skill)))
const homelandSkillPool=computed(()=>{
  if(isCustomHomeland.value) return Array.from(new Set(skillDefinitions.map(item=>normalizeSkillName(item.name))))
  return Array.from(new Set([...homelandCoreSkills.value,...homelandOptionalSkills.value]))
})
const currentSpark=computed(()=>sparkDetails[form.spark])
const gearTabs=['All','Weapons','Armor & Shields','Travel','Tools & Kits','Consumables','Spellcasting','Accessories'] as const
function gearTabFor(item:typeof gearShopItems[number]){
  if(item.category==='Weapon')return'Weapons'
  if(item.category==='Armor & Shield')return'Armor & Shields'
  if(['Antivenin','Aroma','Black Water','Blessed Water','Liquid Fire','Potion of Healing'].includes(item.name))return'Consumables'
  if(['Scriptweave Book','Totem','Charm','Len-stone Arcanum','Cloak of Windweave'].includes(item.name))return'Spellcasting'
  if(['Quickdraw Quiver','Featherwind Bolt-Case','Wristloop','Sharpening Stone','Journey Knot'].includes(item.name))return'Accessories'
  if(/Artisan|Climber|Disguise|Forgery|Navigator|Poisoner|Herbalist|Infusion|Thieves/.test(item.name))return'Tools & Kits'
  return'Travel'
}
const filteredGear=computed(()=>{
  const q=shopSearch.value.trim().toLowerCase()
  return gearShopItems.filter(item=>(gearTab.value==='All'||gearTabFor(item)===gearTab.value)&&(!q||`${item.name} ${item.category} ${item.detail} ${gearDescription(item)} ${gearEffect(item)}`.toLowerCase().includes(q))).slice(0,120)
})
const cultureTabs=computed(()=>['All',...Array.from(new Set(allCultureTraits.map(trait=>trait.species))).sort()])
const filteredCultureTraits=computed(()=>{
  const q=cultureSearch.value.trim().toLowerCase()
  return allCultureTraits
    .filter(trait=>cultureTab.value==='All'||trait.species===cultureTab.value)
    .filter(trait=>!form.cultureTraits.includes(cultureId(trait.species,trait.name)))
    .filter(trait=>!q||`${trait.name} ${trait.species} ${trait.text} ${(trait.keywords||[]).join(' ')}`.toLowerCase().includes(q))
})
const nativeLanguage=computed(()=>selectedSpeciesData.value?.language.split(',')[0]?.trim()||'Native Language')
const languageOptions=computed(()=>Array.from(new Set(Object.values(speciesByName).map(entry=>entry.language.split(',')[0]?.trim()).filter(Boolean) as string[])).filter(language=>language!==nativeLanguage.value&&language!=='Commonspeak').sort())
const languages=computed(()=>form.species?[nativeLanguage.value,'Commonspeak',form.additionalLanguage].filter(Boolean):['Commonspeak',form.additionalLanguage].filter(Boolean))
function languageDescription(name:string){
  if(name==='Commonspeak')return'Every Species receives Commonspeak alongside its native tongue during character creation.'
  for(const entry of Object.values(speciesByName)){const [language,...detail]=entry.language.split(',');if(language?.trim()===name)return detail.join(',').trim().replace(/,$/,'')}
  return'This language is learned through travel, study, kinship, work, or another community.'
}
const magicLevel=computed(()=>form.path==='magic'&&pathTouched.value?1:0)
const manaPerRound=computed(()=>2+magicLevel.value)
const startingMana=computed(()=>manaPerRound.value)
const manaTraitNotes=computed(()=>selectedCultureTraits.value.filter(trait=>/mana/i.test(trait.text)&&/(generate|regenerat|restore)/i.test(trait.text)).map(trait=>`${trait.name}: ${trait.text}`))
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
const gearGutsBonus=computed(()=>Math.max(0,...form.equipment.map(item=>{const match=String(item.detail||'').match(/Guts Bonus\s*\+?(\d+)/i);return match?Number(match[1]):0})))
const reviewGuts=computed(()=>derived.value.guts+gearGutsBonus.value)
const selectedPathName=computed(()=>form.path==='magic'?'Wind-Touched':'Gifted Heart')
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
function setCultureChoice(id:string,index:number,value:string){form.cultureSkillChoices[cultureChoiceKey(id,index)]=normalizeSkillName(value)}
function setCultureChoiceFromEvent(id:string,index:number,event:Event){setCultureChoice(id,index,(event.target as HTMLSelectElement|null)?.value||'')}
function clearCultureChoices(id:string){Object.keys(form.cultureSkillChoices).filter(key=>key.startsWith(`${id}::choice-`)).forEach(key=>delete form.cultureSkillChoices[key])}
function setCulture(id:string,checked:boolean){
  if(checked){
    if(form.cultureTraits.includes(id))return
    if(form.cultureTraits.length<2){form.cultureTraits=[...form.cultureTraits,id];cultureReplaceIndex.value=form.cultureTraits.length%2;return}
    const index=cultureReplaceIndex.value%2;const replaced=form.cultureTraits[index];if(replaced)clearCultureChoices(replaced)
    const next=[...form.cultureTraits];next[index]=id;form.cultureTraits=next;cultureReplaceIndex.value=(index+1)%2
  }else {
    form.cultureTraits=form.cultureTraits.filter(item=>item!==id);clearCultureChoices(id)
    cultureReplaceIndex.value=form.cultureTraits.length%2
  }
}

const cultureSkillEntries=computed(()=>{
  const out:Array<{skill:string;source:string}>=[]
  for(const id of form.cultureTraits){
    const trait=findCulture(id); const grant=cultureGrant(id)
    if(!trait||!grant)continue
    grant.fixed.forEach(skill=>out.push({skill:normalizeSkillName(skill),source:trait.name}))
    grant.choices.forEach((_,index)=>{const skill=normalizeSkillName(cultureChoiceValue(id,index));if(skill)out.push({skill,source:trait.name})})
  }
  return out
})
const skillRanks=computed(()=>{
  const ranks:Record<string,number>={}
  form.skills.filter(Boolean).map(normalizeSkillName).forEach(skill=>ranks[skill]=(ranks[skill]||0)+1)
  cultureSkillEntries.value.forEach(({skill})=>ranks[skill]=(ranks[skill]||0)+1)
  return ranks
})

function cultureRankForSkill(skill:string){return cultureSkillEntries.value.filter(entry=>entry.skill===skill).length}
function cultureSourcesForSkill(skill:string){return Array.from(new Set(cultureSkillEntries.value.filter(entry=>entry.skill===skill).map(entry=>entry.source))).join(', ')}
function homelandSkillOptionLabel(skill:string){return cultureRankForSkill(skill)>0?`${skill} (+1 rank)`:skill}
function spellGroupLabel(lore:string){return `Lore of ${lore}${lore===form.loreAttunement?' — (Attuned)':''}`}

const gearDescriptions:Record<string,string>={
  'Bedroll & Groundsheet':'A compact treated bedroll and moisture-resistant groundsheet for reliable rest in unpredictable conditions.',
  'Traveler’s Cloak':'A heavy weather-ready cloak that protects against wind and cold while helping careful movement and concealment.',
  'Torch (each)':'A wrapped-cloth torch that requires a Fire-Starting Kit or another open flame to ignite.',
  'Travel Lantern':'A sturdy shuttered oil lantern that requires fuel and a Fire-Starting Kit.',
  'Glowfruit Cage':'A wicker cage holding naturally bioluminescent fruit that glows steadily without ignition.',
  'Waterskin':'A tightly sealed hide container for carrying water on extended travel.',
  'Reed Flask':'A lightweight reed-wrapped water container that is easy to refill and carry.',
  'Travel Meal (2 day)':'A prepared bundle of preserved food intended for travel.',
  'Trail Rations (1 day)':'Dry, compact preserved food suited for long journeys.',
  'Traveler’s Pack':'A durable pack designed for extended travel and awkward expedition gear.',
  'Forager’s Satchel':'A divided satchel for herbs, fungi, and other small natural materials.',
  'Fire-Starting Kit':'Flint, striker, resin tinder, and ember fungus for lighting torches, lanterns, and campfires.',
  'Traveler’s Rope (20 ft)':'Strong flexible rope for climbing, securing loads, and solving terrain problems.',
  'Glow-Moss Chalk':'Marking tools for walls, stones, trail features, navigation, and warnings.',
  'Rootwalker Bundle':'Bark strips, resin, rope, and stakes for securing footing, bracing unstable surfaces, and marking safe crossings.',
  'Artisan':'A compact collection of crafting, repair, and camp-cooking tools.',
  'Climber':'Hooks, pitons, straps, and line supports used to scale stone, wood, and ruins.',
  'Disguise':'Pigments, powders, cloth wraps, and shaping tools used to alter appearance and roles.',
  'Forgery':'Ink, seals, imitation stamps, paper scraps, and precision tools for recreating documents and markings.',
  'Navigator':'Charts, parchment, measuring cords, charcoal, and a sighting tool for navigation and mapmaking.',
  'Poisoner':'Vials, gloves, clamps, and tools for safely creating, refining, or applying simple poisons.',
  'Herbalist':'A divided pouch with bandages, dried leaves, bark, binding fibers, and storage for gathered herbs.',
  'Infusion':'A small alchemical setup for tinctures, distillations, and other non-herbal mixtures.',
  'Thieves’':'Slim picks, soft pads, wedges, and tension tools for quiet entry and delicate manipulation.',
  'Antivenin':'A neutralizing mixture designed to counter common natural toxins.',
  'Aroma':'A potent scent used to mask odors, soothe beasts, or confuse creatures that hunt by smell.',
  'Black Water':'A murky Ancient-site liquid whose properties vary with source and preparation.',
  'Blessed Water':'Ritually prepared water used in cleansing, warding, and symbolic acts.',
  'Liquid Fire':'A volatile mixture that clings to surfaces when ignited and is useful for clearing obstacles or dispersing threats.',
  'Potion of Healing':'A restorative mixture that speeds recovery and helps stabilize the wounded.',
  'Scriptweave Book':'A sturdy book that can be inscribed and prepared as the required Spellbook focus for a caster.',
  'Totem':'A crafted bone, wood, metal, or woven charm that can be designated as a caster’s arcane focus.',
  'Charm':'A small enchanted emblem worn or carried to reinforce spell damage.',
  'Len-stone Arcanum':'A polished crystal lens bound in cord that alters a compelled Renew the Heart target once per encounter.',
  'Cloak of Windweave':'A shimmering mantle infused with subtle harmonic currents.',
  'Quickdraw Quiver':'A rigid quiver designed for rapid arrow retrieval.',
  'Featherwind Bolt-Case':'A smooth-lined case that keeps crossbow bolts from snagging.',
  'Wristloop':'A fitted wrist strap that improves the release of thrown weapons.',
  'Sharpening Stone':'A compact whetstone used to prepare slashing or piercing weapons before a fight.',
  'Journey Knot':'A braided endurance-and-fortune charm tied to a weapon grip or bow limb.',
}
function gearDescription(item:typeof gearShopItems[number]){return gearDescriptions[item.name]||''}

const gearEffects:Record<string,string>={
  'Bedroll & Groundsheet':'Using it during rest prevents the effects of a restless night.',
  'Traveler’s Cloak':'Travel clothing that assists quiet movement; source grants +1 to the associated stealth skill check.',
  'Torch (each)':'Illuminates an Orb [4] area.',
  'Travel Lantern':'Illuminates a Cone [4] area.',
  'Glowfruit Cage':'Illuminates an Orb [3] area.',
  'Waterskin':'Carries roughly two days of water.',
  'Reed Flask':'Carries roughly one day of water.',
  'Travel Meal (2 day)':'Enough prepared food for two days.',
  'Trail Rations (1 day)':'Enough trail food for one day.',
  'Traveler’s Pack':'Carries up to 40 lb. of equipment.',
  'Scriptweave Book':'When prepared as a Spellbook, it is required for that caster’s spellcasting. Each known spell may be cast only once per encounter; spell Mana cost is −1, non-lethal spell damage is +1, and Spell Strike is +1.',
  'Totem':'May be designated as an arcane focus. While held or worn as the required focus, gain +1 to Strike rolls for spells.',
  'Charm':'Once per round, increase the damage of one spell by +1.',
  'Len-stone Arcanum':'Once per encounter, when a spell compels Renew the Heart, adjust the passive target by one category up or down.',
  'Cloak of Windweave':'Gain +1 Guts against damaging magical abilities and Resistance +1 against one chosen damage type.',
  'Quickdraw Quiver':'Gain +1 Strike with bows using Shoot.',
  'Featherwind Bolt-Case':'Gain +1 Accuracy with crossbows.',
  'Wristloop':'Gain +1 Strike with thrown weapons.',
  'Sharpening Stone':'After preparation, a physical nonmagical weapon deals +1 damage until the end of the next combat encounter.',
  'Journey Knot':'Once per round, add +1 damage to one attack made with the attached weapon.',
}
const gearChoiceOptions:Record<string,string[]>={'Cloak of Windweave':['Bludgeoning','Slashing','Piercing','Fire','Frost','Lightning','Poison','Radiant','Shadow']}
function gearEffect(item:typeof gearShopItems[number]){return gearEffects[item.name]||''}
function gearChoices(item:typeof gearShopItems[number]){return gearChoiceOptions[item.name]||[]}
function gearShopSubtitle(item:typeof gearShopItems[number]){return gearTab.value==='All'?`${gearTabFor(item)} · ${item.costText}`:item.costText}
function gearDisplayDetail(item:typeof gearShopItems[number]){
  if(item.category==='Armor & Shield'){
    const parts=item.detail.split('·').map(part=>part.trim())
    if(parts.length>=5)return `Might Requirement ${parts[0]} · Guts Bonus ${parts[1]} · Mana Syphon ${parts[2]} · Stealth Condition ${parts[3]} · Weight ${parts[4]}`
  }
  if(item.category==='Weapon'){
    const parts=item.detail.split('·').map(part=>part.trim())
    if(parts.length>=3)return `Damage ${parts[0]} · Weight ${parts[1]} · ${parts.slice(2).join(' · ')}`
  }
  return item.detail&&item.detail!=='—'?`Weight ${item.detail}`:(gearEffect(item)?'Mechanical effect listed below.':'No weight or numeric profile is listed in the current source.')
}

function setPath(path:'magic'|'talents'){
  form.path=path; pathTouched.value=true
  form.talents=path==='magic'?['']:['','']
}
function requiredTalentCount(){return form.path==='magic'?1:2}
function ensureTalentSlots(){const count=requiredTalentCount();while(form.talents.length<count)form.talents.push('');form.talents=form.talents.slice(0,count)}
function addEquipment(item:typeof gearShopItems[number]){if(item.costSp>wealthRemaining.value)return;const choices=gearChoices(item);const choice=gearChoice.value[item.name]||'';if(choices.length&&!choice)return;form.equipment.push({name:item.name,costSp:item.costSp,category:item.category,detail:gearDisplayDetail(item),effect:gearEffect(item),choice:choice||undefined})}
function removeEquipment(index:number){form.equipment.splice(index,1)}
function equipmentAttachTargets(item:PurchasedEquipment){
  const weapons=form.equipment.filter(candidate=>candidate.category==='Weapon').map(candidate=>candidate.name)
  if(item.name==='Quickdraw Quiver')return weapons.filter(name=>/bow/i.test(name))
  if(item.name==='Featherwind Bolt-Case')return weapons.filter(name=>/crossbow/i.test(name))
  if(item.name==='Journey Knot'||item.name==='Sharpening Stone'||item.name==='Wristloop')return weapons
  return[]
}
function setAttachment(index:number,event:Event){const item=form.equipment[index];if(item)item.attachedTo=(event.target as HTMLSelectElement|null)?.value||undefined}
function openTalentPicker(_index=0){talentTab.value='All';talentSearch.value='';talentPickerOpen.value=true}
function talentSelected(name:string){return form.talents.includes(name)}
function toggleTalentChoice(name:string){
  const selected=form.talents.filter(Boolean)
  if(selected.includes(name)){
    const next=selected.filter(item=>item!==name)
    while(next.length<requiredTalentCount())next.push('')
    form.talents=next.slice(0,requiredTalentCount())
    return
  }
  if(selected.length>=requiredTalentCount()||!talentRequirementMet(name))return
  const next=[...selected,name]
  while(next.length<requiredTalentCount())next.push('')
  form.talents=next.slice(0,requiredTalentCount())
}
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
  if(id==='spells'&&!regularSpellsValid())return 'Choose 2 different Lore Spells.'
  if(id==='spells'&&!invocationSpellsValid())return 'Choose 2 different Invocation Spells.'
  if(id==='talents'&&!talentsValid())return invalidTalents.value.length?`Resolve Talent requirements: ${invalidTalents.value.join(', ')}.`:`Choose ${requiredTalentCount()} different Talent${requiredTalentCount()===1?'':'s'}.`
  if(id==='equipment'&&wealthRemaining.value<0)return 'Remove equipment until Remaining Wealth is 0 sp or more.'
  if(id==='languages'&&!form.additionalLanguage)return 'Choose one additional Language before continuing.'
  return ''
}
function allValidationErrors(){
  const errors:string[]=[]
  if(!form.name.trim())errors.push('Character name is required.')
  for(const id of stepDefs.value.map(step=>step.id)){
    if(id==='review')continue
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
    campaignName:form.campaignName.trim(), appearance:form.appearance.trim(),
    species:form.species,
    cultureTraits:selectedCultureTraits.value.map(item=>`${item.name} (${item.species})`),
    cultureSkillChoices:{...form.cultureSkillChoices},
    spark:form.spark,
    homeland:homelandName,
    homelandDetail:isCustomHomeland.value?form.customHomelandDetail.trim():homelandDetail.value?.description,
    skills:[...form.skills.map(normalizeSkillName)], skillRanks:{...skillRanks.value},
    faith:form.faith, oath:form.oath, path:form.path,
    talents:[...form.talents.filter(Boolean)],
    loreAttunement:form.path==='magic'?form.loreAttunement:undefined,
    spells:form.path==='magic'?[...form.spells.filter(Boolean)]:undefined,
    invocationSpells:form.path==='magic'?[...form.invocationSpells.filter(Boolean)]:undefined,
    languages:[...languages.value], equipment:[...form.equipment], adventureKit:form.adventureKit,
    startingWealth:startingWealth.value, wealthRemaining:wealthRemaining.value,
    attributes:{...form.attributes}, draft, creationStep:stepId.value,
    createdAt:originalCreatedAt.value||now, updatedAt:now,
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
  form.name='';form.campaignName='';form.age='';form.appearance='';form.pronouns='';form.kinship='';form.species='';form.cultureTraits=[];form.cultureSkillChoices={};
  form.spark=sparks[0][0];form.homeland=homelands[0].name;form.customHomelandName='';form.customHomelandDetail='';form.skills=homelands[0].skills.map(normalizeSkillName);form.faith=faiths[0];form.oath=oaths[0][0];
  attributes.forEach(attribute=>form.attributes[attribute.id]=1);form.path='magic';pathTouched.value=false;form.loreAttunement='';form.spells=['',''];form.invocationSpells=['',''];form.talents=[''];form.adventureKit=true;form.equipment=[];form.additionalLanguage='';
  draftId.value=null;originalCreatedAt.value=null;stepIndex.value=0;error.value='';window.scrollTo({top:0,behavior:'smooth'})
}
function closeWithoutSave(){void router.push('/characters')}

let modalScrollY=0
let modalScrollLocked=false
function syncModalScrollLock(){
  if(typeof document==='undefined'||typeof window==='undefined')return
  const locked=shopOpen.value||culturePickerOpen.value||talentPickerOpen.value
  if(locked&&!modalScrollLocked){
    modalScrollY=window.scrollY
    document.documentElement.classList.add('modal-open')
    document.body.classList.add('modal-open')
    document.body.style.position='fixed'
    document.body.style.top=`-${modalScrollY}px`
    document.body.style.left='0'
    document.body.style.right='0'
    document.body.style.width='100%'
    modalScrollLocked=true
  }else if(!locked&&modalScrollLocked){
    document.documentElement.classList.remove('modal-open')
    document.body.classList.remove('modal-open')
    document.body.style.position=''
    document.body.style.top=''
    document.body.style.left=''
    document.body.style.right=''
    document.body.style.width=''
    modalScrollLocked=false
    window.scrollTo(0,modalScrollY)
  }
}
watch([shopOpen,culturePickerOpen,talentPickerOpen],syncModalScrollLock)
onMounted(async()=>{
  const editId=String(route.query.edit||'')
  if(!editId)return
  const record=loadCharacters().find(item=>item.id===editId)
  if(!record)return
  draftId.value=record.id;originalCreatedAt.value=record.createdAt
  form.name=record.name||'';form.campaignName=record.campaignName||'';form.appearance=record.appearance||''
  form.species=record.species||''
  await nextTick()
  form.cultureTraits=(record.cultureTraits||[]).map(label=>{const match=String(label).match(/^(.*) \(([^)]+)\)$/);return match?cultureId(match[2],match[1]):label}).filter(id=>Boolean(findCulture(id))).slice(0,2)
  form.cultureSkillChoices={...(record.cultureSkillChoices||{})};form.spark=record.spark||sparks[0][0]
  form.homeland=homelands.some(item=>item.name===record.homeland)?record.homeland:'__custom__';form.customHomelandName=form.homeland==='__custom__'?record.homeland:'';form.customHomelandDetail=record.homelandDetail||''
  form.skills=(record.skills||[]).map(normalizeSkillName).slice(0,2);while(form.skills.length<2)form.skills.push('')
  form.faith=record.faith||faiths[0];form.oath=record.oath||oaths[0][0];Object.assign(form.attributes,record.attributes||{})
  form.path=record.path||'magic';pathTouched.value=true;form.loreAttunement=record.loreAttunement||'';form.spells=[...(record.spells||[]).slice(0,2)];while(form.spells.length<2)form.spells.push('')
  form.invocationSpells=[...(record.invocationSpells||[]).slice(0,2)];while(form.invocationSpells.length<2)form.invocationSpells.push('')
  form.talents=[...(record.talents||[]).slice(0,requiredTalentCount())];while(form.talents.length<requiredTalentCount())form.talents.push('')
  form.adventureKit=record.adventureKit!==false;form.equipment=[...(record.equipment||[])]
  const known=new Set([nativeLanguage.value,'Commonspeak']);form.additionalLanguage=(record.languages||[]).find(language=>!known.has(language))||''
})
onBeforeUnmount(()=>{
  if(typeof document==='undefined'||typeof window==='undefined')return
  if(modalScrollLocked){
    document.body.style.position='';document.body.style.top='';document.body.style.left='';document.body.style.right='';document.body.style.width=''
    window.scrollTo(0,modalScrollY)
  }
  document.documentElement.classList.remove('modal-open');document.body.classList.remove('modal-open')
})

watch(()=>form.species,(next:string)=>{
  if(!next){form.cultureTraits=[];form.cultureSkillChoices={};return}
  form.cultureTraits=ownCultureIds(next);form.cultureSkillChoices={};cultureReplaceIndex.value=0
})
watch(()=>form.homeland,(next:string)=>{
  if(next==='__custom__'){form.skills=['',''];return}
  form.skills=[...(homelandDetails[next]?.skills||[]).slice(0,2).map(normalizeSkillName)]
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
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s player starts with the hero’s identity, then chooses the Beastfolk Species whose story, Traits, and language best fit the character they imagine.</em></div>
          <details class="creation-info-panel help-panel" open><summary>What is a Species?</summary><div class="creation-info-body"><p>Your Species describes the Beastfolk lineage your hero belongs to. Across Anthro Mundas, Beastfolk are peoples of fur, feather, scale, and many other forms, each carrying their own histories, languages, Species Traits, and cultural traditions.</p><p>Species Traits are inherent features of that lineage. Culture Traits reflect learned traditions and can be exchanged in the next step.</p></div></details>

          <div class="identity-fields creator-identity-fields">
            <div class="field-grid two"><label class="field-label">Character Name<input v-model="form.name" class="field-control" placeholder="Character name" /></label><label class="field-label">Campaign<input v-model="form.campaignName" class="field-control" placeholder="Campaign name" /></label></div>
            <label class="field-label creator-appearance-field">Appearance<textarea v-model="form.appearance" class="field-control appearance-textarea" rows="5" placeholder="Describe your character's appearance"></textarea></label>
          </div>

          <div class="species-choice-layout">
            <div class="species-choice-copy">
              <label class="field-label">Species<select v-model="form.species" class="field-control"><option value="">Choose Your Species</option><option v-for="item in species" :key="item" :value="item">{{ item }}</option></select></label>
              <div v-if="selectedSpeciesImage" class="species-art-shell species-art-inline"><img :src="selectedSpeciesImage" :alt="`${form.species} character artwork`" /></div>
              <template v-if="selectedSpeciesData">
                <details class="creation-info-panel species-lore-panel" open><summary>{{ selectedSpeciesData.name }} Lore</summary><div class="creation-info-body"><p class="species-quote">“{{ selectedSpeciesData.quote }}”</p><p>{{ selectedSpeciesData.lore }}</p><div class="keyword-pill-row"><span class="keyword-pill">{{ selectedSpeciesData.theme }}</span><span class="keyword-pill">{{ selectedSpeciesData.language.split(',')[0] }}</span></div></div></details>
                <details class="creation-info-panel trait-panel species-trait-panel"><summary>Species Traits</summary><div class="creation-info-body trait-stack"><article v-for="trait in selectedSpeciesData.speciesTraits" :key="trait.name" class="trait-card species-trait-card"><div class="trait-card-head"><h3>{{ trait.name }}</h3><span v-if="manaCostFromText(trait.text)!==null" class="mana-badge">{{ manaCostFromText(trait.text) }} Mana</span></div><p v-if="structuredRule(trait.text).intro" class="rule-flavor">{{ structuredRule(trait.text).intro }}</p><div v-if="visibleRuleFields(trait.text).length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(trait.text)" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div class="keyword-pill-row"><span v-for="keyword in singleKeywords(trait.keywords)" :key="keyword" class="keyword-pill">{{ keyword }}</span></div></article></div></details>
                <details class="creation-info-panel trait-panel culture-trait-panel"><summary>Culture Traits</summary><div class="creation-info-body"><p>Your Species begins with these two Culture Traits. In Step 2 you may keep them or exchange them for Culture Traits from other peoples.</p><div class="trait-stack"><article v-for="trait in selectedSpeciesData.cultureTraits" :key="trait.name" class="trait-card culture-trait-card"><div class="trait-card-head"><h3>{{ trait.name }}</h3><span v-if="manaCostFromText(trait.text)!==null" class="mana-badge">{{ manaCostFromText(trait.text) }} Mana</span></div><p v-if="structuredRule(trait.text).intro" class="rule-flavor">{{ structuredRule(trait.text).intro }}</p><div v-if="visibleRuleFields(trait.text).length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(trait.text)" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div class="keyword-pill-row"><span v-for="keyword in singleKeywords(trait.keywords)" :key="keyword" class="keyword-pill">{{ keyword }}</span></div></article></div></div></details>
              </template>
            </div>
          </div>
        </template>

        <template v-else-if="stepId==='culture'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Culture Traits</h1></div></div>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s player keeps one familiar Culture Trait and exchanges the other for a tradition learned while traveling, showing that upbringing can cross Species lines.</em></div>
          <details class="creation-info-panel help-panel" open><summary>What are Culture Traits?</summary><div class="creation-info-body"><p>Culture Traits represent traditions, training, and ways of living learned from a community rather than inherited from Species. Your Species provides two starting Culture Traits, but character creation allows you to exchange them for other Culture Traits.</p></div></details>
          <section class="selected-culture-panel"><h2>Selected Culture Traits <span>{{ form.cultureTraits.length }}/2</span></h2><div class="trait-stack"><article v-for="trait in selectedCultureTraits" :key="`${trait.species}-${trait.name}`" class="trait-card culture-trait-card selected-trait-card"><div class="trait-card-head"><div><h3>{{ trait.name }}</h3><small>{{ trait.species }}</small></div><div class="trait-card-head-actions"><span v-if="manaCostFromText(trait.text)!==null" class="mana-badge">{{ manaCostFromText(trait.text) }} Mana</span><button type="button" class="secondary-button compact-action" @click="setCulture(cultureId(trait.species,trait.name),false)">Remove</button></div></div><p v-if="structuredRule(trait.text).intro" class="rule-flavor">{{ structuredRule(trait.text).intro }}</p><div v-if="visibleRuleFields(trait.text).length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(trait.text)" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div class="keyword-pill-row"><span v-for="keyword in singleKeywords(trait.keywords)" :key="keyword" class="keyword-pill">{{ keyword }}</span></div><div v-if="cultureGrant(cultureId(trait.species,trait.name))" class="trait-skill-grants"><span v-for="skill in cultureGrant(cultureId(trait.species,trait.name))?.fixed||[]" :key="skill" class="keyword-pill">+1 {{ normalizeSkillName(skill) }}</span><div v-for="(choices,index) in cultureGrant(cultureId(trait.species,trait.name))?.choices||[]" :key="index" class="culture-skill-choice"><select class="field-control" :value="cultureChoiceValue(cultureId(trait.species,trait.name),index)" @change="setCultureChoiceFromEvent(cultureId(trait.species,trait.name),index,$event)"><option value="">Choose a Skill</option><option v-for="choice in Array.from(new Set(choices.map(normalizeSkillName)))" :key="choice" :value="choice">{{ choice }}</option></select><span v-if="cultureChoiceValue(cultureId(trait.species,trait.name),index)" class="keyword-pill">+1 {{ cultureChoiceValue(cultureId(trait.species,trait.name),index) }}</span></div></div></article></div></section>
          <section class="available-culture-panel culture-picker-launch-panel"><h2>Exchange / Add Culture Traits</h2><p class="muted">Open the Culture Trait picker to inspect traditions from every playable Species and exchange your starting Traits.</p><button type="button" class="secondary-button wide culture-picker-launch" @click="culturePickerOpen=true">Choose Culture Traits</button></section>
        </template>

        <template v-else-if="stepId==='spark'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Choose Your Spark</h1></div></div>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s player chooses a Spark that describes how Selu responds when the story puts a difficult choice in front of them, then uses its keywords as a guide when pursuing Deeds.</em></div>
          <details class="creation-info-panel help-panel" open><summary>What is a Spark &amp; what does it do?</summary><div class="creation-info-body"><p>A Spark is the personality archetype that describes what tends to move your hero into action — courage, curiosity, compassion, defiance, wonder, or another defining impulse.</p><p>A Spark has two keywords. When your hero completes a Deed that aligns with one of those keywords, the Spark can reward role-play with additional Experience. It is not a flat bonus to every roll; it is a reason to make character choices matter in the story.</p><RouterLink to="/rules/read/sparks-deeds" class="inline-rule-link">Read Sparks &amp; Deeds →</RouterLink></div></details>
          <label class="field-label">Spark<select v-model="form.spark" class="field-control"><option v-for="item in sparks" :key="item[0]" :value="item[0]">{{ item[0] }}</option></select></label>
          <article class="choice-summary spark-description-card"><h2>{{ form.spark }}</h2><p>{{ currentSpark?.description }}</p><div class="keyword-pill-row"><span v-for="keyword in singleKeywords(currentSpark?.keywords||[])" :key="keyword" class="keyword-pill">{{ keyword }}</span></div></article>
        </template>

        <template v-else-if="stepId==='homeland'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Choose Your Homeland</h1></div></div>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s player picks the place that best explains what Selu knew before becoming an adventurer, then lets those memories shape the two Skills chosen later.</em></div>
          <details class="creation-info-panel help-panel" open><summary>What is a Homeland?</summary><div class="creation-info-body"><p>Your Homeland is the place, road, settlement, or community that shaped your hero before the adventure began. It provides two starting Skills at Rank 1 and gives context to the habits and knowledge your character carries into the wider world.</p></div></details>
          <label class="field-label">Homeland<select v-model="form.homeland" class="field-control"><option v-for="item in homelands" :key="item.name" :value="item.name">{{ item.name }}</option><option value="__custom__">Other — Custom Homeland</option></select></label>
          <template v-if="isCustomHomeland"><div class="field-grid two"><label class="field-label">Homeland Name<input v-model="form.customHomelandName" class="field-control" placeholder="Name your Homeland" /></label><label class="field-label">Homeland Details<textarea v-model="form.customHomelandDetail" class="field-control textarea-control" placeholder="Describe the place and what it taught your hero"></textarea></label></div><p class="muted">Choose its two starting Skills in the Starting Skills step.</p></template>
          <article v-else class="choice-summary homeland-description-card"><h2>{{ form.homeland }}</h2><p>{{ homelandDetail?.description }}</p><div class="homeland-skill-copy"><strong>Skills:</strong> {{ homelandCoreSkills.join(' · ') }}<small v-if="homelandOptionalSkills.length"><strong>Optional:</strong> {{ homelandOptionalSkills.join(' · ') }}</small></div></article>
        </template>

        <template v-else-if="stepId==='attributes'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Distribute Attributes</h1></div></div>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s player raises the Attributes that support the character concept, while watching how each Rank changes the modifier and secondary stats used elsewhere in play.</em></div>
          <details class="creation-info-panel help-panel" open><summary>What do Attributes do?</summary><div class="creation-info-body"><p>Attributes are the five pillars of your character’s natural capability. Each begins at Rank 1. Spend 5 points to raise them, with a maximum Rank of 3 during character creation. Attribute Rank determines its modifier and helps form secondary stats used by other rules.</p><RouterLink to="/rules/read/attributes-skills" class="inline-rule-link">Read Attributes &amp; Skills →</RouterLink></div></details>
          <div class="subsection-title"><strong>Spend 5 Points</strong><span>{{ remaining }} points remaining</span></div>
          <div class="attribute-editor detailed-attribute-editor slim-attribute-editor"><article v-for="attribute in attributes" :key="attribute.id" class="attribute-detail-card" :class="{expanded:openAttribute===attribute.id}"><button type="button" class="attribute-info-toggle" @click="toggleAttribute(attribute.id)"><span><strong>{{ attribute.name }}</strong><small>{{ attribute.description }}</small><em>Secondary Stats: {{ secondaryLabel(attribute.id) }}</em></span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button><div class="attribute-control-grid"><div class="attribute-modifier-column"><small>Modifier</small><strong>+{{ attributeModifier(form.attributes[attribute.id]) }}</strong></div><div class="attribute-rank-column"><small>Rank</small><div class="rank-stepper-line"><span class="max-marker">{{ form.attributes[attribute.id]===3?'MAX':'' }}</span><div class="stepper"><button type="button" @click="adjust(attribute.id,-1)">−</button><span>{{ form.attributes[attribute.id] }}</span><button type="button" @click="adjust(attribute.id,1)">+</button></div></div></div></div><div v-if="openAttribute===attribute.id" class="attribute-secondary-detail"><article v-for="secondary in secondaryStats[attribute.id]" :key="secondary.name"><strong><RouterLink v-if="secondary.slug" :to="`/rules/read/${secondary.slug}`" class="inline-rule-link">{{ secondary.name }}</RouterLink><template v-else>{{ secondary.name }}</template></strong><small>{{ secondary.formula }}</small><p>{{ secondary.description }}</p></article><p v-if="!secondaryStats[attribute.id].length">The supplied Battle rules do not currently list a direct secondary stat derived from {{ attribute.name }}.</p></div></article></div>
        </template>

        <template v-else-if="stepId==='skills'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Starting Skills</h1></div></div>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s Homeland establishes two dependable Skills. Any training granted by Culture Traits stacks on top, so the final list shows exactly where Selu begins.</em></div>
          <details class="creation-info-panel help-panel" open><summary>How do Starting Skills work?</summary><div class="creation-info-body"><p>The supplied Character Creation rules grant two Skills from your Homeland at Rank 1. There is no separate pool of Skill points to spend during creation. Some selected Culture Traits grant additional Skill ranks; those are added automatically below and can raise a Skill already gained from your Homeland.</p><RouterLink to="/rules/read/attributes-skills" class="inline-rule-link">Read Attributes &amp; Skills →</RouterLink></div></details>
          <div v-if="!isCustomHomeland" class="homeland-skill-reference"><strong>Homeland Skills</strong><span>{{ homelandCoreSkills.join(' · ') }}</span><small v-if="homelandOptionalSkills.length">Optional: {{ homelandOptionalSkills.join(' · ') }}</small></div><section class="skill-rank-summary"><h2>Starting Skill Ranks</h2><div class="skill-rank-grid"><article v-for="(rank,skill) in skillRanks" :key="skill"><span class="skill-rank-name"><strong>{{ skill }}</strong><small v-if="cultureRankForSkill(skill)" class="cultural-skill-pill">Cultural · {{ cultureSourcesForSkill(skill) }}</small></span><span class="skill-rank-values"><b>Rank {{ rank }}</b><small>Modifier +{{ skillModifier(rank) }}</small></span></article></div></section>
          <div class="field-grid two"><label v-for="index in 2" :key="index" class="field-label">Homeland Skill Option #{{ index }}<select v-model="form.skills[index-1]" class="field-control"><option value="">Choose a Skill</option><option v-for="skill in homelandSkillPool" :key="skill" :value="skill" :disabled="form.skills.some((selected,selectedIndex)=>selected===skill&&selectedIndex!==index-1)">{{ homelandSkillOptionLabel(skill) }}</option></select></label></div>
        </template>

        <template v-else-if="stepId==='faith-oath'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Oath &amp; Faith</h1></div></div>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s Oath describes the promise they refuse to abandon; Faith explains the larger belief that gives that promise meaning.</em></div>
          <div class="faith-oath-column"><section><details class="creation-info-panel help-panel" open><summary>What is an Oath?</summary><div class="creation-info-body"><p>An Oath is the principle your hero has chosen to live by. It does not provide a flat mechanical bonus, but keeping or breaking it can shape reputation, narrative consequences, and how your character is remembered.</p></div></details><label class="field-label">Oath<select v-model="form.oath" class="field-control"><option v-for="item in oaths" :key="item[0]" :value="item[0]">{{ item[0] }} — {{ item[1] }}</option></select></label><article class="choice-summary"><h2>{{ form.oath }}</h2><p>{{ oathDescription }}</p></article></section><section><details class="creation-info-panel help-panel" open><summary>What is Faith?</summary><div class="creation-info-body"><p>Faith describes what your hero reveres, trusts, or believes gives meaning to the world. It helps frame decisions and relationships without forcing one way to play the character.</p></div></details><label class="field-label">Faith<select v-model="form.faith" class="field-control"><option v-for="item in faiths" :key="item">{{ item }}</option></select></label><article class="choice-summary"><h2>{{ form.faith }}</h2><p>{{ faithDescription }}</p></article></section></div>
        </template>

        <template v-else-if="stepId==='path'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Rhythm of Body &amp; Spirit</h1></div></div>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s player chooses the path that best explains where the hero’s extraordinary gifts come from, rather than simply chasing the largest bonus.</em></div>
          <details class="creation-info-panel help-panel" open><summary>Choose Your Path</summary><div class="creation-info-body"><p>This choice decides how your hero first expresses exceptional ability. One path begins Magic Level 1 and pairs it with a Talent; the other begins with two Talents and no starting Magic Level.</p></div></details>
          <aside class="creator-static-panel mana-path-panel winds-magic-panel"><strong>Winds of Magic</strong><p>The Winds of Magic are living currents that move through stone, storm, root, and heartbeat. Mana is the portion of that rhythm a hero can draw upon to fuel Abilities, Spells, and other supernatural effects.</p><div class="mana-stat-line"><span>Starting Mana <b>{{ startingMana }}</b></span><span>Restored at start of each round <b>{{ manaPerRound }}</b></span></div><p v-if="manaTraitNotes.length" class="mana-trait-note"><strong>Trait interaction:</strong> {{ manaTraitNotes.join(' · ') }}</p></aside>
          <div class="path-choice-grid"><button type="button" class="path-choice-card" :class="{selected:pathTouched&&form.path==='magic'}" @click="setPath('magic')"><span class="path-choice-kicker">WIND-TOUCHED</span><strong class="path-choice-title">Magic Level 1 + 1 Talent</strong><p>Attune to a Lore, gain its Signature Spell, choose starting Spells, then select one Talent.</p></button><button type="button" class="path-choice-card" :class="{selected:pathTouched&&form.path==='talents'}" @click="setPath('talents')"><span class="path-choice-kicker">GIFTED HEART</span><strong class="path-choice-title">2 Talents</strong><p>Build around training, instinct, and practiced gifts by selecting two Talents.</p></button></div>
        </template>

        <template v-else-if="stepId==='lore'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Lore Attunement</h1></div></div>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s player chooses the Lore whose themes fit the character, then reads its Signature Spell before deciding which other magic will fill the remaining spell choices.</em></div>
          <details class="creation-info-panel help-panel" open><summary>Magic Level 1 &amp; Mana</summary><div class="creation-info-body"><p>Magic draws on Mana. At Magic Level 1, your hero gains magical spellcasting and attunes to one Lore. Spells from the attuned Lore reduce their Mana cost by 2, and the Lore’s Signature Spell is gained automatically without consuming a spell slot.</p><RouterLink to="/rules/read/lore-attunement" class="inline-rule-link">Read Lore Attunement →</RouterLink></div></details>
          <label class="field-label">Lore Attunement<select v-model="form.loreAttunement" class="field-control"><option value="">Select Lore Attunement</option><option v-for="lore in attunableLores" :key="lore" :value="lore">{{ lore }}</option></select></label>
          <template v-if="form.loreAttunement"><article class="choice-summary lore-fluff-card"><h2>Lore of {{ form.loreAttunement }}</h2><p>{{ loreDescriptions[form.loreAttunement] }}</p></article><article v-if="signatureDetail" class="spell-detail-card signature-spell-card" :class="spellLoreClass(signatureDetail.name)"><div class="spell-detail-head"><div><span class="eyebrow">SIGNATURE SPELL</span><h2>{{ signatureDetail.name }}</h2></div><span class="mana-badge">{{ effectiveMana(signatureDetail.name) ?? '—' }} Mana</span></div><p class="rule-flavor">{{ signatureDetail.flavor }}</p><div class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(signatureDetail.rules)" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div class="keyword-pill-row"><span v-for="keyword in singleKeywords(signatureDetail.keywords)" :key="keyword" class="keyword-pill">{{ keyword }}</span></div></article></template>
        </template>

        <template v-else-if="stepId==='spells'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Starting Spells</h1></div></div>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s player chooses two Lore Spells for the character’s personal style, then adds two Invocation Spells for dependable magical options beyond the attuned Lore.</em></div>
          <details class="creation-info-panel help-panel" open><summary>Magical Spells</summary><div class="creation-info-body"><p>Magical Spells are divided between the seven Lores of Magic and Invocation magic. Lore Attunement gives a free Signature Spell and reduces the Mana cost of spells from that Lore. Invocation Spells are dependable magical effects outside a Lore. For this creation build, your Magic Level 1 hero begins with the free Signature Spell, two different Lore Spells, and two different Invocation Spells; these selections are your starting spell slots, and a Spell cannot be selected twice.</p><p>When a Lore Spell belongs to your attuned Lore, its displayed Mana cost includes the Lore Attunement reduction of 2.</p></div></details>
          <section class="spell-selection-block"><h2>Lore Spells</h2><div class="field-grid two"><label v-for="index in 2" :key="`spell-${index}`" class="field-label">Spell {{ index }}<select v-model="form.spells[index-1]" class="field-control"><option value="">Choose a Spell</option><optgroup v-for="group in regularSpellGroups" :key="group.lore" :label="spellGroupLabel(group.lore)"><option v-for="spell in group.spells" :key="spell" :value="spell" :disabled="spellDisabled(spell,form.spells[index-1],'regular')">{{ spell }}</option></optgroup></select></label></div></section>
          <section class="spell-selection-block"><h2>Invocation Spells</h2><div class="field-grid two"><label v-for="index in 2" :key="`inv-${index}`" class="field-label">Invocation {{ index }}<select v-model="form.invocationSpells[index-1]" class="field-control"><option value="">Choose an Invocation Spell</option><option v-for="spell in invocationOptions" :key="spell" :value="spell" :disabled="spellDisabled(spell,form.invocationSpells[index-1],'invocation')">{{ spell }}</option></select></label></div></section>
          <div class="selected-spell-stack"><article v-for="spell in [...form.spells,...form.invocationSpells].filter(Boolean)" :key="spell" class="spell-detail-card" :class="spellLoreClass(spell)"><div class="spell-detail-head"><div><span class="eyebrow">{{ spellLore(spell) }}</span><h2>{{ spell }}</h2></div><span class="mana-badge"><template v-if="spellDetails[spell]?.manaCost!==null">{{ effectiveMana(spell) }} Mana</template><template v-else>Variable</template></span></div><p class="rule-flavor">{{ spellDetails[spell]?.flavor }}</p><div class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(spellDetails[spell]?.rules||'')" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div class="keyword-pill-row"><span v-for="keyword in singleKeywords(spellDetails[spell]?.keywords||[])" :key="keyword" class="keyword-pill">{{ keyword }}</span></div></article></div>
        </template>

        <template v-else-if="stepId==='talents'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Choose Talents</h1></div></div>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s player reads the full Talent effect and requirement before committing, making sure the choice is both legal and a good fit for how Selu acts in play.</em></div>
          <details class="creation-info-panel help-panel" open><summary>What are Talents?</summary><div class="creation-info-body"><p>Talents represent trained techniques, unusual gifts, and practiced capabilities. Some Talents require another Talent first. Requirements must be met before this character can be finished.</p></div></details>
          <div class="talent-slot-grid"><button v-for="index in requiredTalentCount()" :key="index" type="button" class="talent-slot-button" @click="openTalentPicker(index-1)"><span>Talent {{ index }}</span><strong>{{ form.talents[index-1]||'Choose a Talent' }}</strong><small v-if="form.talents[index-1]">{{ talentCategory(form.talents[index-1]) }}</small></button></div>
          <div class="selected-talent-stack"><article v-for="talent in form.talents.filter(Boolean)" :key="talent" class="talent-detail-card" :class="{invalid:!talentRequirementMet(talent)}"><div class="talent-detail-head"><h2>{{ talent }}</h2><div class="talent-head-actions"><span v-if="manaCostFromText(talentText(talent))!==null" class="mana-badge">{{ manaCostFromText(talentText(talent)) }} Mana</span><span v-if="talentRequires(talent)" class="requirement-badge" :class="{invalid:!talentRequirementMet(talent)}">Requires {{ talentRequires(talent) }}</span></div></div><p v-if="structuredRule(talentText(talent)).intro" class="rule-flavor">{{ structuredRule(talentText(talent)).intro }}</p><div v-if="visibleRuleFields(talentText(talent)).length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(talentText(talent))" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div class="keyword-pill-row"><span v-for="keyword in singleKeywords(talentKeywords(talent))" :key="keyword" class="keyword-pill">{{ keyword }}</span></div><p v-if="!talentRequirementMet(talent)" class="invalid-option-text">Requirement not met. Select {{ talentRequires(talent) }} as the other Talent or choose a different option.</p></article></div>
          <div v-if="invalidTalents.length" class="invalid-panel">One or more selected Talents are invalid. You may jump to another creation step, but Continue and final character creation remain locked until requirements are met.</div>
        </template>

        <template v-else-if="stepId==='equipment'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Equipment &amp; Gear</h1></div></div>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s player decides whether the Adventure Kit is worth keeping, then spends only the remaining wealth on gear that supports the character’s role and story.</em></div>
          <details class="creation-info-panel help-panel" open><summary>Starting Equipment &amp; Currency</summary><div class="creation-info-body"><p>Trade across Anthro Mundas commonly uses Ancient fasteners called <strong>Threadpieces</strong>. Washer pieces (wp) cover everyday purchases, Nut pieces (np) local trade, Screw pieces (sp) most adventuring commerce, and Bolt pieces (bp) major debts and purchases.</p><div class="currency-grid"><span><strong>10 wp</strong><small>= 1 np</small></span><span><strong>5 np</strong><small>= 1 sp</small></span><span><strong>2 sp</strong><small>= 1 bp</small></span><span><strong>100 wp</strong><small>= 1 bp</small></span></div><p>Characters begin with an Adventure Kit and 50 sp. The Adventure Kit may be returned for 3 additional sp.</p></div></details>
          <section class="starting-equipment-panel"><div class="adventure-kit-bar"><div><strong>Adventure Kit (Starting Equipment Package)</strong><small>Starting Equipment</small></div><div class="kit-return-control"><span>Return</span><label class="switch"><input v-model="form.adventureKit" type="checkbox" :true-value="false" :false-value="true"/><span></span></label></div></div><div v-if="form.adventureKit" class="adventure-kit-contents"><span>Bedroll &amp; Groundsheet</span><span>Traveler’s Cloak</span><span>2× Torches</span><span>Reed Flask</span><span>2× Trail Rations</span><span>Traveler’s Pack</span><span>Fire-Starting Kit</span></div><div class="wealth-balance-field"><span>Threadpiece Wealth</span><strong>{{ wealthRemaining }} sp remaining <small>of {{ startingWealth }} sp</small></strong><div class="wealth-equivalents"><span>{{ wealthRemaining*50 }} wp</span><span>{{ wealthRemaining*5 }} np</span><span>{{ wealthRemaining }} sp</span><span>{{ wealthRemaining/2 }} bp</span></div></div></section>
          <button type="button" class="secondary-button wide" @click="shopOpen=true">Equipment &amp; Gear</button>
          <section v-if="form.equipment.length" class="purchased-equipment-section"><h2>Purchased Equipment &amp; Gear</h2><div class="purchased-gear-list"><article v-for="(item,index) in form.equipment" :key="`${item.name}-${index}`" class="list-row"><span class="list-row-copy"><strong class="list-row-title">{{ item.name }}</strong><small class="list-row-subtitle">{{ item.category }} · {{ item.costSp }} sp</small></span><div class="purchased-item-detail"><small v-if="item.choice">Choice: {{ item.choice }}</small><label v-if="equipmentAttachTargets(item).length" class="attachment-control">Attach / Apply (optional)<select class="field-control" :value="item.attachedTo||''" @change="setAttachment(index,$event)"><option value="">Not attached</option><option v-for="target in equipmentAttachTargets(item)" :key="target" :value="target">{{ target }}</option></select></label></div><button type="button" class="secondary-button compact-action" @click="removeEquipment(index)">Remove</button></article></div></section>
        </template>

        <template v-else-if="stepId==='languages'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Starting Languages</h1></div></div>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu carries a language of home and Commonspeak into the wider world, giving the character both a cultural voice and a shared tongue for the road.</em></div>
          <details class="creation-info-panel help-panel" open><summary>Languages</summary><div class="creation-info-body"><p>Your Species gives you its native tongue, and Commonspeak serves as the shared trade language used between peoples. Choose one additional language to represent travel, study, kinship, work, or another part of your character’s history.</p></div></details>
          <div class="language-choice-grid"><article class="choice-summary language-card"><h2>{{ nativeLanguage }}</h2><p>{{ languageDescription(nativeLanguage) }}</p></article><article class="choice-summary language-card"><h2>Commonspeak</h2><p>{{ languageDescription('Commonspeak') }}</p></article><article class="choice-summary language-card additional-language-card"><h2>Additional Language</h2><p>Choose a third language learned through travel, study, work, family, or another community.</p><select v-model="form.additionalLanguage" class="field-control"><option value="">Choose a Language…</option><option v-for="language in languageOptions" :key="language" :value="language">{{ language }}</option></select><p v-if="form.additionalLanguage">{{ languageDescription(form.additionalLanguage) }}</p></article></div>
        </template>

        <template v-else>
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Review Character</h1></div></div>
          <div v-if="finalErrors.length" class="invalid-panel final-invalid-panel"><h2>Character Cannot Be Finished</h2><ul><li v-for="message in finalErrors" :key="message">{{ message }}</li></ul></div>
          <div v-else class="valid-panel"><strong>Character Ready</strong><p>All required creation choices are valid. Review the summary below, then finish the character.</p></div>
          <div class="field-grid two review-identity-edit"><label class="field-label review-name-field">Character Name<input v-model="form.name" class="field-control" placeholder="Character name" /></label><label class="field-label review-name-field">Campaign<input v-model="form.campaignName" class="field-control" placeholder="Campaign name" /></label></div><div class="review-grid review-summary-grid"><article><span>Species</span><strong>{{ form.species||'Not selected' }}</strong><small>{{ nativeLanguage }}</small></article><article><span>Spark</span><strong>{{ form.spark }}</strong></article><article><span>Homeland</span><strong>{{ isCustomHomeland?(form.customHomelandName||'Custom Homeland'):form.homeland }}</strong></article><article><span>Oath</span><strong>{{ form.oath }}</strong></article><article><span>Faith</span><strong>{{ form.faith }}</strong></article><article><span>Path</span><strong>{{ selectedPathName }}</strong><small>{{ form.path==='magic'?'Magic Level 1 + 1 Talent':'2 Talents' }}</small></article><article class="review-wide-field"><span>Languages</span><strong>{{ languages.join(' · ') }}</strong></article></div>
          <section class="review-section"><h2>Attributes</h2><div class="review-attribute-cards"><article v-for="attribute in attributes" :key="attribute.id"><span>{{ attribute.name }}</span><strong>Rank {{ form.attributes[attribute.id] }}</strong><small>Modifier +{{ attributeModifier(form.attributes[attribute.id]) }}</small></article></div><h3 class="review-subheading">Secondary Stats</h3><div class="review-attribute-cards review-secondary-cards"><article><span>Speed</span><strong>{{ derived.speed }}</strong></article><article><span>Aim</span><strong>{{ derived.aim }}</strong></article><article><span>Mettle</span><strong>{{ derived.mettle }}</strong></article><article><span>Ward</span><strong>{{ derived.ward }}</strong></article><article><span>Control</span><strong>{{ derived.control }}</strong></article><article><span>Power</span><strong>{{ derived.power }}</strong></article><article><span>Guts</span><strong>{{ reviewGuts }}</strong><small v-if="gearGutsBonus">Base {{ derived.guts }} + {{ gearGutsBonus }} gear</small></article><article><span>Mana</span><strong>{{ startingMana }}</strong><small>+{{ manaPerRound }} / round</small></article></div></section>
          <section class="review-section"><h2>Skills</h2><div class="review-skill-grid"><article v-for="(rank,skill) in skillRanks" :key="skill"><strong>{{ skill }}</strong><span>Rank {{ rank }}</span><small>Modifier +{{ skillModifier(rank) }}</small><small v-if="cultureRankForSkill(skill)" class="cultural-skill-pill">Cultural</small></article></div></section>
          <details v-if="form.path==='magic'" class="review-section review-collapsible"><summary><h2>Magic</h2><span>{{ form.loreAttunement||'Not selected' }} · {{ startingMana }} Mana</span></summary><div class="review-collapsible-body"><p><strong>Lore Attunement:</strong> {{ form.loreAttunement||'Not selected' }}</p><p v-if="signatureSpell"><strong>Signature:</strong> {{ signatureSpell }}</p><p v-for="spell in form.spells.filter(Boolean)" :key="spell"><strong>Lore Spell:</strong> {{ spell }}</p><p v-for="spell in form.invocationSpells.filter(Boolean)" :key="spell"><strong>Invocation:</strong> {{ spell }}</p></div></details>
          <details class="review-section review-collapsible"><summary><h2>Talents</h2><span>{{ form.talents.filter(Boolean).length }} selected</span></summary><div class="review-collapsible-body"><p v-for="talent in form.talents.filter(Boolean)" :key="talent"><strong>{{ talent }}</strong> · {{ talentCategory(talent) }}</p></div></details>
          <section class="review-section"><h2>Equipment &amp; Gear</h2><p v-if="form.adventureKit"><strong>Adventure Kit:</strong> Starting Equipment Package retained.</p><div v-if="form.equipment.length" class="review-equipment-grid"><article v-for="(item,index) in form.equipment" :key="`${item.name}-${index}`"><strong>{{ item.name }}</strong><small>{{ item.category }} · {{ item.costSp }} sp</small><p v-if="item.detail">{{ item.detail }}</p><p v-if="item.effect">{{ item.effect }}</p><small v-if="item.choice">Choice: {{ item.choice }}</small><small v-if="item.attachedTo">Attached to: {{ item.attachedTo }}</small></article></div><p v-else class="muted">No additional equipment purchased.</p></section>
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
        <div class="culture-species-tabs" role="tablist"><button v-for="tab in cultureTabs" :key="tab" type="button" :class="{active:cultureTab===tab}" @click="cultureTab=tab">{{ tab }}</button></div><label class="rules-search culture-picker-search"><span aria-hidden="true">⌕</span><input v-model="cultureSearch" type="search" placeholder="Search Culture Traits or Species…" /></label>
        <div class="culture-picker-list">
          <article v-for="trait in filteredCultureTraits" :key="`${trait.species}-${trait.name}`" class="culture-picker-row">
            <div class="culture-picker-row-head"><div><strong>{{ trait.name }}</strong><small>{{ trait.species }}</small></div><div class="culture-picker-row-actions"><span v-if="manaCostFromText(trait.text)!==null" class="mana-badge">{{ manaCostFromText(trait.text) }} Mana</span><button type="button" class="secondary-button compact-action" @click="setCulture(cultureId(trait.species,trait.name),true)">Add</button></div></div>
            <p v-if="structuredRule(trait.text).intro" class="rule-flavor">{{ structuredRule(trait.text).intro }}</p>
            <div v-if="visibleRuleFields(trait.text).length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(trait.text)" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div>
            <div class="keyword-pill-row"><span v-for="keyword in singleKeywords(trait.keywords)" :key="keyword" class="keyword-pill">{{ keyword }}</span></div>
          </article>
        </div>
        <div class="culture-picker-footer"><span>{{ form.cultureTraits.length===2?'Culture Traits ready.':'Choose exactly 2 Culture Traits.' }}</span><button type="button" class="primary-button" :disabled="form.cultureTraits.length!==2" @click="culturePickerOpen=false">Done</button></div>
      </section>
    </div>

    <div v-if="talentPickerOpen" class="modal-backdrop talent-picker-backdrop" @click.self="talentPickerOpen=false">
      <section class="modal-card talent-picker-modal" role="dialog" aria-modal="true" aria-label="Choose a Talent">
        <div class="modal-head"><div><span class="eyebrow">TALENTS</span><h2>Choose Talents</h2><small>{{ form.talents.filter(Boolean).length }} / {{ requiredTalentCount() }} selected</small></div><button type="button" class="icon-button" aria-label="Close Talent picker" @click="talentPickerOpen=false">×</button></div>
        <div class="talent-picker-tabs" role="tablist"><button v-for="tab in talentTabs" :key="tab" type="button" :class="{active:talentTab===tab}" @click="talentTab=tab">{{ tab }}</button></div>
        <label class="rules-search talent-picker-search"><span aria-hidden="true">⌕</span><input v-model="talentSearch" type="search" placeholder="Search Talents…" /></label>
        <div class="talent-picker-list"><article v-for="talent in filteredTalentPicker" :key="talent" class="talent-detail-card talent-picker-card" :class="{invalid:!talentRequirementMet(talent)}"><div class="talent-detail-head"><div><small>{{ talentCategory(talent) }}</small><h2>{{ talent }}</h2></div><div class="talent-head-actions"><span v-if="manaCostFromText(talentText(talent))!==null" class="mana-badge">{{ manaCostFromText(talentText(talent)) }} Mana</span><span v-if="talentRequires(talent)" class="requirement-badge" :class="{invalid:!talentRequirementMet(talent)}">Requires {{ talentRequires(talent) }}</span></div></div><p v-if="structuredRule(talentText(talent)).intro" class="rule-flavor">{{ structuredRule(talentText(talent)).intro }}</p><div v-if="visibleRuleFields(talentText(talent)).length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(talentText(talent))" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div class="talent-picker-action"><button type="button" class="secondary-button" :class="{active:talentSelected(talent)}" :disabled="!talentSelected(talent)&&(form.talents.filter(Boolean).length>=requiredTalentCount()||!talentRequirementMet(talent))" @click="toggleTalentChoice(talent)">{{ talentSelected(talent)?'Selected':'Select' }}</button></div></article></div><div class="talent-picker-footer"><span>{{ form.talents.filter(Boolean).length }} / {{ requiredTalentCount() }} selected</span><button type="button" class="primary-button" :disabled="!talentsValid()" @click="talentPickerOpen=false">Done</button></div>
      </section>
    </div>

    <div v-if="shopOpen" class="modal-backdrop gear-picker-backdrop" @click.self="shopOpen=false"><section class="modal-card gear-shop-modal" role="dialog" aria-modal="true" aria-label="Equipment and Gear"><div class="modal-head"><div><span class="eyebrow">EQUIPMENT &amp; GEAR</span><h2>Equipment &amp; Gear</h2></div><button type="button" class="icon-button" @click="shopOpen=false">×</button></div><div class="gear-shop-balance"><span>Remaining Wealth</span><strong>{{ wealthRemaining }} sp</strong></div><div class="gear-tabs" role="tablist"><button v-for="tab in gearTabs" :key="tab" type="button" :class="{active:gearTab===tab}" @click="gearTab=tab">{{ tab }}</button></div><div class="rules-search gear-search"><span aria-hidden="true">⌕</span><input v-model="shopSearch" placeholder="Search equipment…" /></div><div class="gear-shop-list"><article v-for="item in filteredGear" :key="`${item.category}-${item.name}`" class="gear-shop-row"><div class="gear-shop-copy"><div class="gear-shop-title"><strong>{{ item.name }}</strong><small>{{ gearShopSubtitle(item) }}</small></div><p class="gear-profile">{{ gearDisplayDetail(item) }}</p><label v-if="gearChoices(item).length" class="field-label gear-choice-field">Choose {{ item.name }} option<select v-model="gearChoice[item.name]" class="field-control"><option value="">Choose…</option><option v-for="choice in gearChoices(item)" :key="choice" :value="choice">{{ choice }}</option></select></label></div><button type="button" class="secondary-button compact-action" :disabled="item.costSp>wealthRemaining||(gearChoices(item).length>0&&!gearChoice[item.name])" @click="addEquipment(item)">Add</button></article></div></section></div>
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
.culture-picker-row-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}.culture-picker-row-head>div:first-child{display:grid;gap:2px}.culture-picker-row-actions{display:flex!important;align-items:center;gap:6px}.culture-picker-row-head strong{font-family:Georgia,'Times New Roman',serif;font-size:calc(17px + var(--font-offset))}.culture-picker-row-head small{color:var(--ink-soft)}
.culture-picker-footer{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:9px;padding-top:10px;border-top:1px solid var(--line)}.culture-picker-footer>span{color:var(--ink-soft);font-weight:750}
.skill-rank-values{display:grid!important;justify-items:end;gap:1px}.skill-rank-values b{color:var(--ink);font-weight:850}.skill-rank-values small{color:var(--accent-dark);font-size:calc(9px + var(--font-offset));font-weight:800}
@media(max-width:680px){.culture-picker-modal{width:100%;max-height:92vh;border-radius:14px 14px 0 0}.culture-picker-backdrop{align-items:flex-end}.culture-picker-footer{align-items:stretch;flex-direction:column}.culture-picker-footer .primary-button{width:100%}}

.culture-species-tabs,.talent-picker-tabs{display:flex;gap:5px;overflow-x:auto;padding:1px 0 9px}.culture-species-tabs button,.talent-picker-tabs button{flex:0 0 auto;min-height:32px;padding:0 10px;border:1px solid var(--line);border-radius:999px;background:var(--paper);color:var(--ink-soft);font-weight:800}.culture-species-tabs button.active,.talent-picker-tabs button.active{border-color:var(--accent);background:var(--accent-wash);color:var(--ink)}
.culture-skill-choice{display:grid;gap:5px;min-width:180px}.trait-card-head-actions{display:flex;align-items:center;gap:6px}
.homeland-skill-reference{display:grid;gap:3px;margin:8px 0 11px;padding:10px 12px;border-left:4px solid var(--accent);background:var(--paper-2);border-radius:7px}.homeland-skill-reference small{color:var(--ink-soft)}
.winds-magic-panel{border-left-color:#6e4c94!important;border-right:5px solid #6e4c94!important}.mana-stat-line{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:9px}.mana-stat-line span{display:flex;justify-content:space-between;gap:8px;padding:7px 9px;border:1px solid var(--line);border-radius:7px;background:var(--paper)}.mana-trait-note{font-size:calc(10px + var(--font-offset))}
.talent-slot-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.talent-slot-button{display:grid;gap:3px;padding:11px 12px;border:1px solid var(--line-dark);border-top:5px solid #a67913;border-radius:9px;background:var(--paper);color:var(--ink);text-align:left}.talent-slot-button span,.talent-slot-button small{color:var(--ink-soft)}
.talent-picker-modal{width:min(780px,calc(100% - 24px));max-height:86vh;display:grid;grid-template-rows:auto auto auto minmax(0,1fr);overflow:hidden}.talent-picker-list{display:grid;gap:9px;overflow:auto;min-height:0;padding:1px 2px}.talent-picker-action{display:flex;justify-content:flex-end;margin-top:8px}
.wealth-balance-field{display:grid;gap:5px;margin-top:10px;padding:10px 12px;border:1px solid var(--line);border-radius:9px;background:var(--paper)}.wealth-balance-field>strong{font-size:calc(18px + var(--font-offset))}.wealth-balance-field>strong small{font-size:.65em;color:var(--ink-soft)}.wealth-equivalents{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px}.wealth-equivalents span{padding:5px;border-radius:6px;background:var(--paper-2);text-align:center;font-size:calc(9px + var(--font-offset));font-weight:800}.attachment-control{display:grid;gap:3px;font-size:calc(9px + var(--font-offset));font-weight:750}
.language-card{min-height:155px;padding:14px!important}.language-card p{margin:3px 0;color:var(--ink-soft);line-height:1.55}
.review-secondary-cards{grid-template-columns:repeat(4,minmax(0,1fr))}.review-collapsible{padding:0!important;overflow:hidden}.review-collapsible>summary{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:11px 12px;cursor:pointer;background:var(--paper-2)}.review-collapsible>summary h2{margin:0}.review-collapsible>summary span{color:var(--ink-soft)}.review-collapsible-body{padding:10px 12px;border-top:1px solid var(--line)}.review-collapsible-body p{margin:5px 0}
.creation-example{border-left:4px solid #b06c27!important;border-right:4px solid #b06c27!important;background:color-mix(in srgb,#dca96f 18%,var(--paper-2))!important}
@media(max-width:680px){.mana-stat-line,.talent-slot-grid,.review-secondary-cards{grid-template-columns:1fr 1fr}.talent-picker-modal{width:100%;max-height:92vh;border-radius:14px 14px 0 0}.talent-picker-backdrop{align-items:flex-end}.wealth-equivalents{grid-template-columns:1fr 1fr}}

.homeland-skill-copy{display:grid;gap:5px;margin-top:9px;padding-top:8px;border-top:1px solid var(--line);color:var(--ink-soft)}.homeland-skill-copy>strong,.homeland-skill-copy small strong{color:var(--ink)}.talent-head-actions{display:flex;align-items:center;justify-content:flex-end;gap:6px;flex-wrap:wrap}
</style>
