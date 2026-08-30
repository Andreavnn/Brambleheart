<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import CharacterAttributePanel from '../components/CharacterAttributePanel.vue'
import { useFocusTrap } from '../composables/useFocusTrap'
import { attributes, faiths, homelands, oaths, sparks, species, type AttributeId } from '../data/bramble'
import { allCultureTraits, speciesByName } from '../data/speciesData'
import { gearShopItems as legacyGearShopItems, homelandDetails, skillDefinitions, sparkDetails } from '../data/characterOptions'
import { cultureSkillGrants, speciesImagePaths } from '../data/creationRules'
import { attunableLores, loreSpells } from '../data/magicOptions'
import { loreDescriptions, spellDetails } from '../data/magicDetails'
import { ruleSourceDocuments } from '../data/rulesSource'
import { TALENT_CATEGORIES, canonicalTalentName, classifyTalent, talentNameMatches } from '../data/talentCategories'
import { characterSheetArmorProfile, characterSheetWeaponProfile, dedicatedTrinketGear, derivedStats, equippedProtectiveGear, equipmentAttachmentTargets, equipmentControlBonus, equipmentGutsBonus, equipmentMagicRegenBonus, equipmentManaSyphon, equipmentSpellManaReduction, magicResources, normalizeSkillName, overflowTrinketGear, rankModifier, structuredRule, visibleRuleFields } from '../rules/rulesEngine'
import { ADVENTURE_KIT_SELL_WP, STARTING_WEALTH_WP, canonicalGearCostWp, economyGearCatalog, isTrinketGear, protectiveGearKind, SHIELD_NAMES } from '../rules/economy'
import { formatThreadpieceBalance, formatThreadpieceWp, formatThreadpieceWpAs, threadpieceBreakdownFromWp, WP_PER_NP, WP_PER_SP } from '../rules/threadpieces'
import { talentRequirementFromText, talentRequirementSatisfied } from '../rules/talentRequirements'
import { resolveSpellManaCost, spellCostLabel } from '../rules/magicRules'
import { canEquipTrinketInArmorSlot, characterStatus, loadCharacters, setProtectiveEquipmentEquipped, setTrinketEquipmentEquipped, upsertCharacter, type AttributeRanks, type CharacterRecord, type PurchasedEquipment } from '../services/characters'
import { loadCustomData, type CustomSpeciesItem, type CustomSpellItem, type CustomTalentItem, type CustomTraitItem } from '../services/customData'


const gearShopItems=economyGearCatalog(legacyGearShopItems)

const router = useRouter()
const route = useRoute()
const stepIndex = ref(0)
const error = ref('')
const shopOpen = ref(false)
const shopSearch = ref('')
const gearTab=ref('All')
const gearChoice=ref<Record<string,string>>({})
const reviewNameLocked=ref(true)
const reviewCampaignLocked=ref(true)
const weaponSheet=ref<HTMLElement|null>(null)
const armorSheet=ref<HTMLElement|null>(null)
const culturePickerOpen = ref(false)
const cultureSearch = ref('')
const cultureTab = ref('All')
const cultureReplaceIndex = ref(0)
const talentPickerOpen = ref(false)
const talentSearch = ref('')
const talentTab = ref('All')
const cultureDialog=ref<HTMLElement|null>(null)
const talentDialog=ref<HTMLElement|null>(null)
const gearDialog=ref<HTMLElement|null>(null)
useFocusTrap(culturePickerOpen,cultureDialog,()=>{culturePickerOpen.value=false})
useFocusTrap(talentPickerOpen,talentDialog,()=>{talentPickerOpen.value=false})
useFocusTrap(shopOpen,gearDialog,()=>{shopOpen.value=false})

const draftId = ref<string | null>(null)
const originalCreatedAt = ref<string | null>(null)
const originalStatus = ref<'incomplete'|'unapproved'|'approved'>('incomplete')
const originalLocked = ref(false)
const originalRecord = ref<CharacterRecord | null>(null)
const pathTouched = ref(false)
const customData=ref(loadCustomData())
const customSpeciesItems=computed(()=>customData.value.filter((item):item is CustomSpeciesItem=>item.type==='species'))
const customSpellItems=computed(()=>customData.value.filter((item):item is CustomSpellItem=>item.type==='spell'))
const customTalentItems=computed(()=>customData.value.filter((item):item is CustomTalentItem=>item.type==='talent'))
const customTraitItems=computed(()=>customData.value.filter((item):item is CustomTraitItem=>item.type==='trait'))

function manaCostFromText(text:string){const match=text.match(/\bCOST:\s*\[?([0-9]+)\]?\s*mana/i);return match?Number(match[1]):null}
function singleKeywords(values:string[]|undefined){return Array.from(new Set((values||[]).flatMap(value=>String(value).split(/[|,;]+/).map(item=>item.trim()).filter(Boolean))))}
const abilityCostKeywords=new Set(['Core','Root','Move','Combat','Reactive','Instinct','Passive','Touch','Shoot','Magic'])
function canonicalAbilityType(value:string){const key=String(value||'').trim().toLowerCase();if(key==='reaction')return'Reactive';if(key==='movement')return'Move';if(key==='melee')return'Touch';return String(value||'').trim().replace(/^./,letter=>letter.toUpperCase())}
function abilityTypeKeywords(values:string[]|undefined){return Array.from(new Set(singleKeywords(values).map(canonicalAbilityType).filter(value=>abilityCostKeywords.has(value))))}
function abilityTypeClass(value:string){return`type-${canonicalAbilityType(value).toLowerCase().replace(/[^a-z0-9]+/g,'-')}`}
function talentCardClasses(name:string){return abilityTypeKeywords(talentKeywords(name)).map(abilityTypeClass)}
function cardKeywords(values:string[]|undefined,traitType='',speciesName=''){const speciesNames=new Set([...species,...customSpeciesItems.value.map(item=>item.name)].map(name=>name.toLowerCase()));return singleKeywords(values).filter(value=>!abilityTypeKeywords([value]).length&&!['Trait','Heritage','Cultural','Culture'].includes(value)&&!speciesNames.has(value.toLowerCase())).concat(traitType?[traitType]:[],speciesName?[speciesName]:[])}
function traitFooterKeywords(values:string[]|undefined,traitType='',speciesName=''){return Array.from(new Set([...abilityTypeKeywords(values),...cardKeywords(values,traitType,speciesName)]))}
function traitFooterClass(keyword:string){return abilityTypeKeywords([keyword]).length?['ability-cost-pill',abilityTypeClass(keyword)]:['keyword-pill']}

const talentSections = ruleSourceDocuments.talents.sections.filter(section =>
  section.heading !== 'Overview' && section.heading !== 'TALENTS' && !section.heading.startsWith('KEYWORDS')
)
function customTalent(name:string){return form.allowCustomData?customTalentItems.value.find(item=>item.name===name):undefined}
function talentText(name:string) {
  const custom=customTalent(name)
  if(custom)return custom.text
  const section=talentSections.find(item=>talentNameMatches(item.heading,name))
  return section?.blocks.filter(block=>block.type==='paragraph').map(block=>block.type==='paragraph'?block.text:'').join(' ') || ''
}
function talentRequires(name:string) {
  const custom=customTalent(name)
  if(custom?.requires)return custom.requires
  return talentRequirementFromText(talentText(name))
}
function talentKeywords(name:string) {
  const custom=customTalent(name)
  if(custom)return custom.keywords
  const match=talentText(name).match(/\bKEYWORDS?:\s*(.+)$/i)
  return match ? match[1].split('|').map(item=>item.trim()).filter(Boolean) : []
}
function isCustomTalent(name:string){return Boolean(form.allowCustomData&&customTalentItems.value.some(item=>item.name===name))}
function talentRequirementMet(name:string) {
  return talentRequirementSatisfied(talentRequires(name),form.talents,name)
}
const talentNames = computed(() => [...talentSections.map(section=>canonicalTalentName(section.heading)),...(form.allowCustomData?customTalentItems.value.map(item=>item.name):[])].filter((name,index,array)=>array.indexOf(name)===index).sort((a,b)=>{
  const ar=Boolean(talentRequires(a)), br=Boolean(talentRequires(b))
  if(ar!==br) return ar?1:-1
  return a.localeCompare(b)
}))

function talentCategory(name:string){
  const custom=customTalent(name)
  if(custom&&custom.category&&custom.category!=='Combat')return custom.category
  return classifyTalent(name,talentText(name),talentKeywords(name))
}
const talentGroups=computed(()=>TALENT_CATEGORIES.map(category=>({category,talents:talentNames.value.filter(name=>talentCategory(name)===category)})).filter(group=>group.talents.length))
const talentTabs=computed(()=>['All',...talentGroups.value.map(group=>group.category)])
const filteredTalentPicker=computed(()=>{const q=talentSearch.value.trim().toLowerCase();return talentNames.value.filter(name=>(talentTab.value==='All'||talentCategory(name)===talentTab.value)&&(!q||`${name} ${talentText(name)} ${talentKeywords(name).join(' ')}`.toLowerCase().includes(q)))})

function cultureId(speciesName:string,name:string){return `${speciesName}::${name}`}
function customSpecies(name:string){return form.allowCustomData?customSpeciesItems.value.find(item=>item.name===name):undefined}
function speciesDataFor(name:string){
  const custom=customSpecies(name)
  if(custom)return{...custom,custom:true}
  const builtin=speciesByName[name]
  return builtin?{...builtin,custom:false}:null
}
const availableSpecies=computed(()=>Array.from(new Set([...species,...(form.allowCustomData?customSpeciesItems.value.map(item=>item.name):[])])).sort())
const allAvailableCultureTraits=computed(()=>{
  const builtin=allCultureTraits.map(trait=>({...trait,custom:false as const}))
  if(!form.allowCustomData)return builtin
  const embedded=customSpeciesItems.value.flatMap(item=>item.cultureTraits.map(trait=>({...trait,species:item.name,custom:true as const})))
  const standalone=customTraitItems.value.filter(item=>item.traitKind==='culture').map(item=>({name:item.name,text:item.text,keywords:item.keywords,species:item.species,skillGrants:item.skillGrants,custom:true as const}))
  return[...builtin,...embedded,...standalone]
})
function ownCultureIds(speciesName:string){return (speciesDataFor(speciesName)?.cultureTraits||[]).slice(0,2).map(trait=>cultureId(speciesName,trait.name))}
function findCulture(id:string){
  const [speciesName,...rest]=id.split('::'); const name=rest.join('::')
  return allAvailableCultureTraits.value.find(trait=>trait.species===speciesName&&trait.name===name)||null
}

const form = reactive({
  name:'', campaignName:'', age:'', appearance:'', pronouns:'', kinship:'', allowCustomData:false,
  species:'',
  cultureTraits:[] as string[],
  cultureSkillChoices:{} as Record<string,string>,
  spark:'' as string,
  homeland:'' as string,
  customHomelandName:'', customHomelandDetail:'',
  skills:['',''] as string[],
  faith:'' as string,
  oath:'' as string,
  attributes:Object.fromEntries(attributes.map(a=>[a.id,1])) as AttributeRanks,
  path:'magic' as 'magic'|'talents'|'skills'|'attribute',
  pathSkills:['',''] as string[],
  pathAttributeBonus:'' as AttributeId|'',
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
  ...(form.path==='skills'&&pathTouched.value?[{id:'path-skills',label:'Skills+',title:'Path Skills'}]:[]),
  ...(form.path==='attribute'&&pathTouched.value?[{id:'path-attribute',label:'Attribute+',title:'Path Attribute'}]:[]),
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

const selectedSpeciesData=computed(()=>form.species?speciesDataFor(form.species):null)
const selectedSpeciesTraits=computed(()=>{const base=(selectedSpeciesData.value?.speciesTraits||[]).map(trait=>({...trait,custom:Boolean(selectedSpeciesData.value?.custom)}));if(!form.allowCustomData||!form.species)return base;const extra=customTraitItems.value.filter(item=>item.traitKind==='species'&&item.species===form.species).map(item=>({name:item.name,text:item.text,keywords:item.keywords,custom:true}));return[...base,...extra]})
const selectedSpeciesImage=computed(()=>form.species?speciesImagePaths[form.species]||'':'')
const selectedCultureTraits=computed(()=>form.cultureTraits.map(findCulture).filter((item):item is NonNullable<ReturnType<typeof findCulture>>=>Boolean(item)))
const spent=computed(()=>Object.values(form.attributes).reduce((sum,rank)=>sum+rank-1,0))
const remaining=computed(()=>5-spent.value)
const effectiveAttributes=computed<AttributeRanks>(()=>{const result={...form.attributes};if(form.path==='attribute'&&form.pathAttributeBonus)result[form.pathAttributeBonus]+=1;return result})
function gearCostWp(item:{name:string;costWp?:number;costSp?:number;costNp?:number}){return canonicalGearCostWp(item)}
function equipmentQuantity(item:PurchasedEquipment){return Math.max(1,Math.floor(Number(item.quantity)||1))}
const startingWealth=computed(()=>STARTING_WEALTH_WP+(form.adventureKit?0:ADVENTURE_KIT_SELL_WP))
const spentWealth=computed(()=>form.equipment.reduce((sum,item)=>sum+gearCostWp(item)*equipmentQuantity(item),0))
const wealthRemaining=computed(()=>Math.max(0,startingWealth.value-spentWealth.value))
const threadpieceBreakdown=computed(()=>threadpieceBreakdownFromWp(wealthRemaining.value))
const threadpieceBalanceLabel=computed(()=>formatThreadpieceBalance(wealthRemaining.value))
function formatGearCost(item:Pick<PurchasedEquipment,'name'|'costWp'|'costSp'|'costNp'>){return formatThreadpieceWp(gearCostWp(item))}
const isCustomHomeland=computed(()=>form.homeland==='__custom__')
const homelandDetail=computed(()=>isCustomHomeland.value?null:homelandDetails[form.homeland])
const homelandCoreSkills=computed(()=>Array.from(new Set((homelandDetail.value?.skills||[]).map(normalizeSkillName))))
const homelandOptionalSkills=computed(()=>Array.from(new Set((homelandDetail.value?.optionalReplacements||[]).map(normalizeSkillName))).filter(skill=>!homelandCoreSkills.value.includes(skill)))
const homelandSkillPool=computed(()=>Array.from(new Set([...homelandCoreSkills.value,...homelandOptionalSkills.value])))
const customHomelandSkillPools=computed(()=>{
  const pool=(attributes:string[])=>Array.from(new Set(skillDefinitions.filter(item=>attributes.includes(item.attribute)).map(item=>normalizeSkillName(item.name)))).sort()
  return [pool(['Lore','Might','Agility']),pool(['Bravery','Lore'])]
})
const currentSpark=computed(()=>sparkDetails[form.spark])

const deedExamples = [
  {name:'Participation Trophy',objective:'Win one Active Target Roll of any kind.',reward:'+1 XP',keywords:['Driven','Focused']},
  {name:'Skill of the Day',objective:'Succeed at a Medium or higher Passive Skill Roll.',reward:'+2 XP',keywords:['Studious','Curious']},
  {name:'Voice of the Table',objective:'Use a non-combat Skill unique to your character during a social or exploration scene.',reward:'+3 XP',keywords:['Charming','Creative']},
  {name:'Brush with Fate',objective:'Raise a Medium or Easy Passive Roll to Hard and succeed.',reward:'+5 XP',keywords:['Bold','Defiant']},
  {name:'Steady Hand',objective:'Roll two exceptional results (8+) on the same check.',reward:'+3 XP',keywords:['Focused','Steadfast']},
  {name:'Heart of the Party',objective:'Use a Heart-based Skill to shift an NPC or group attitude.',reward:'+3 XP',keywords:['Charming','Compassionate']},
  {name:'Wild Wanderer',objective:'Discover or interpret something hidden in the wild with Lore, Awareness, or Wayfinding.',reward:'+1 XP',keywords:['Curious','Adaptable']},
  {name:'Spark of Insight',objective:'Reveal meaningful information through Lore or Seeking.',reward:'+1 XP',keywords:['Intuitive','Studious']},
  {name:'Brushfire Courage',objective:'Place yourself in danger to protect another.',reward:'+2 XP',keywords:['Bold','Compassionate']},
  {name:'Steadfast Resolve',objective:'Resist or end an ongoing effect using an Attribute Save.',reward:'+2 XP',keywords:['Steadfast','Driven']},
  {name:'Tinker’s Triumph',objective:'Craft, repair, or modify an item or structure successfully.',reward:'+1 XP',keywords:['Creative','Inventive']},
  {name:'Hope in the Ashes',objective:'Encourage an ally to try again after failure.',reward:'+2 XP',keywords:['Hopeful','Compassionate']},
  {name:'Measured Breath',objective:'Complete two successful Weighted Rolls in one session.',reward:'+3 XP',keywords:['Cautious','Focused']},
  {name:'Trickster’s Turn',objective:'Turn a disadvantage or failure into a benefit.',reward:'+2 XP',keywords:['Playful','Defiant']},
  {name:'Pathfinder’s Mark',objective:'Guide the party safely to a location or resource.',reward:'+2 XP',keywords:['Adaptable','Independent']},
  {name:'Flicker of Faith',objective:'Persevere through a conflict involving your Oath or Faith.',reward:'+3 XP',keywords:['Hopeful','Reflective']},
  {name:'Quiet Observer',objective:'Use Awareness or Lorekeeping to uncover a hidden detail that changes a scene.',reward:'+1 XP',keywords:['Cautious','Reflective']},
  {name:'Vision in Shadow',objective:'Spot or interpret a hidden clue before others act.',reward:'+2 XP',keywords:['Intuitive','Curious']},
]
const currentDeedExample=computed(()=>{const keys=new Set(currentSpark.value?.keywords||[]);return deedExamples.find(deed=>deed.keywords.some(keyword=>keys.has(keyword)))||deedExamples[0]})
const shieldNames=SHIELD_NAMES
const gearTabs=['All','Weapons','Armor','Shields','Trinkets','Traveler’s Gear','Field Kits','Consumables','Spellcasting Implements','Accessories','Tools'] as const
function gearTabFor(item:typeof gearShopItems[number]){
  if(item.category==='Weapon')return'Weapons'
  if(item.category==='Armor & Shield')return shieldNames.has(item.name)?'Shields':'Armor'
  if(isTrinketGear(item))return'Trinkets'
  return item.shopGroup||'Traveler’s Gear'
}
const filteredGear=computed(()=>{
  const q=shopSearch.value.trim().toLowerCase()
  return gearShopItems.filter(item=>(gearTab.value==='All'||gearTabFor(item)===gearTab.value)&&(!q||`${item.name} ${item.category} ${item.detail} ${item.description||''} ${item.effect||''}`.toLowerCase().includes(q))).slice(0,120)
})
const cultureTabs=computed(()=>['All',...Array.from(new Set(allAvailableCultureTraits.value.map(trait=>trait.species))).sort()])
const filteredCultureTraits=computed(()=>{
  const q=cultureSearch.value.trim().toLowerCase()
  return allAvailableCultureTraits.value
    .filter(trait=>cultureTab.value==='All'||trait.species===cultureTab.value)
    .filter(trait=>!form.cultureTraits.includes(cultureId(trait.species,trait.name)))
    .filter(trait=>!q||`${trait.name} ${trait.species} ${trait.text} ${(trait.keywords||[]).join(' ')}`.toLowerCase().includes(q))
})
const nativeLanguage=computed(()=>selectedSpeciesData.value?.language.split(',')[0]?.trim()||'Native Language')
const languageOptions=computed(()=>Array.from(new Set([...Object.values(speciesByName).map(entry=>entry.language.split(',')[0]?.trim()),...(form.allowCustomData?customSpeciesItems.value.map(entry=>entry.language.split(',')[0]?.trim()):[])].filter(Boolean) as string[])).filter(language=>language!==nativeLanguage.value&&language!=='Commonspeak').sort())
const languages=computed(()=>form.species?[nativeLanguage.value,'Commonspeak',form.additionalLanguage].filter(Boolean):['Commonspeak',form.additionalLanguage].filter(Boolean))
function languageDescription(name:string){
  if(name==='Commonspeak')return'Every Species receives Commonspeak alongside its native tongue during character creation.'
  for(const entry of [...Object.values(speciesByName),...(form.allowCustomData?customSpeciesItems.value:[])]){const [language,...detail]=entry.language.split(',');if(language?.trim()===name){const copy=detail.join(',').trim().replace(/,$/,'');return copy?copy[0].toUpperCase()+copy.slice(1):copy}}
  return'This language is learned through travel, study, kinship, work, or another community.'
}
function speciesForLanguage(name:string){
  const builtin=Object.entries(speciesByName).find(([,entry])=>entry.language.split(',')[0]?.trim()===name)?.[0]
  if(builtin)return builtin
  return customSpeciesItems.value.find(entry=>entry.language.split(',')[0]?.trim()===name)?.name||''
}
const magicLevel=computed(()=>form.path==='magic'&&pathTouched.value?1:0)
const magicResourceValues=computed(()=>magicResources(effectiveAttributes.value,magicLevel.value,equipmentMagicRegenBonus(form.equipment)))
const magicRegen=computed(()=>magicResourceValues.value.magicRegen)
const manaPool=computed(()=>magicResourceValues.value.manaPool)
const manaTraitNotes=computed(()=>selectedCultureTraits.value.filter(trait=>/mana/i.test(trait.text)&&/(generate|regen|restore)/i.test(trait.text)).map(trait=>`${trait.name}: ${trait.text}`))
function customSpell(name:string){return form.allowCustomData?customSpellItems.value.find(item=>item.name===name):undefined}
function spellDetail(name:string){const custom=customSpell(name);return custom?{name:custom.name,lore:custom.lore,flavor:custom.flavor,rules:custom.rules,manaCost:custom.manaCost,keywords:custom.keywords}:spellDetails[name]}
const availableLoreSpells=computed(()=>{const out:Record<string,string[]>={};for(const [lore,names] of Object.entries(loreSpells))out[lore]=[...names];if(form.allowCustomData)for(const spell of customSpellItems.value){out[spell.lore]=out[spell.lore]||[];if(!out[spell.lore].includes(spell.name))out[spell.lore].push(spell.name)}return out})
const availableAttunableLores=computed(()=>Array.from(new Set([...attunableLores,...(form.allowCustomData?customSpellItems.value.map(item=>item.lore).filter(lore=>lore!=='Invocation'):[])])).sort())
function signatureForLore(lore:string){const explicit=form.allowCustomData?customSpellItems.value.find(item=>item.lore===lore&&item.signature)?.name:'';return loreSpells[lore]?.[0]||explicit||availableLoreSpells.value[lore]?.[0]||''}
const signatureSpell=computed(()=>form.loreAttunement?signatureForLore(form.loreAttunement):'')
const signatureDetail=computed(()=>signatureSpell.value?spellDetail(signatureSpell.value):undefined)
const invocationOptions=computed(()=>availableLoreSpells.value.Invocation||[])
const regularSpellGroups=computed(()=>availableAttunableLores.value.sort((a,b)=>Number(b===form.loreAttunement)-Number(a===form.loreAttunement)).map(lore=>({lore,spells:(availableLoreSpells.value[lore]||[]).filter(name=>name!==signatureForLore(lore))})))
function loreDescription(name:string){return loreDescriptions[name]||`A custom Lore of Magic shaped by the creator's rules.`}
function isCustomSpell(name:string){return Boolean(form.allowCustomData&&customSpellItems.value.some(item=>item.name===name))}
const invalidTalents=computed(()=>form.talents.filter(Boolean).filter(name=>!talentRequirementMet(name)))

const gearGutsBonus=computed(()=>equipmentGutsBonus(form.equipment))
const gearControlBonus=computed(()=>equipmentControlBonus(form.equipment))
const gearManaSyphon=computed(()=>equipmentManaSyphon(form.equipment))
const gearMagicRegenBonus=computed(()=>equipmentMagicRegenBonus(form.equipment))
const gearSpellManaReduction=computed(()=>equipmentSpellManaReduction(form.equipment))
const derived=computed(()=>derivedStats(effectiveAttributes.value))
const reviewGuts=computed(()=>derivedStats(effectiveAttributes.value,gearGutsBonus.value,gearControlBonus.value).guts)
const reviewControl=computed(()=>derivedStats(effectiveAttributes.value,gearGutsBonus.value,gearControlBonus.value).control)
const selectedPathName=computed(()=>({magic:'Wind-Touched',talents:'Gifted Heart',skills:'Practiced Hand',attribute:'Tempered Form'} as const)[form.path])
const secondaryStats:Record<AttributeId,Array<{name:string;formula:string;description:string;slug?:string}>>={
  agility:[
    {name:'Accuracy',formula:'Agility Rank',description:'Accuracy adds to ranged attack damage.',slug:'to-damage'},
    {name:'Aim',formula:'Agility Modifier',description:'Aim is the stat used by ranged Strike rolls.',slug:'to-strike'},
    {name:'Speed',formula:'Agility Modifier +2',description:'Speed equals 2 + the Agility modifier and is used when determining movement and Initiative.',slug:'rounds-turns'},
  ],
  might:[
    {name:'Fury',formula:'Might Rank',description:'Fury adds to melee damage where a rule calls for it.',slug:'to-damage'},
    {name:'Brawl',formula:'Might Modifier',description:'Brawl is the stat used by melee Strike rolls.',slug:'to-strike'},
  ],
  hide:[
    {name:'Guts',formula:'Hide Rank',description:'Guts reduces incoming damage according to the damage rules.',slug:'to-damage'},
    {name:'Ward',formula:'Hide Modifier',description:'Ward is used for opposed defensive rolls.',slug:'to-ward'},
  ],
  lore:[
    {name:'Power',formula:'Lore Rank',description:'Power adds to magical attack damage where a rule calls for it.',slug:'to-damage'},
    {name:'Control',formula:'Lore Modifier',description:'Control is used by magical Strike rolls and magical interactions.',slug:'to-strike'},
  ],
  bravery:[
    {name:'Heart',formula:'Bravery Rank',description:'Heart is the Bravery Rank and contributes to Magic Regen.',slug:'rounds-turns'},
    {name:'Spirit',formula:'Bravery Modifier',description:'Spirit is the Bravery modifier and contributes to the Mana Pool.',slug:'rounds-turns'},
  ],
}
function secondaryValue(name:string){
  const values:Record<string,number>={Accuracy:derived.value.accuracy,Aim:derived.value.aim,Speed:derived.value.speed,Fury:derived.value.fury,Brawl:derived.value.brawl,Guts:derived.value.guts,Ward:derived.value.ward,Power:derived.value.power,Control:derived.value.control,Spirit:derived.value.spirit,Heart:derived.value.heart}
  return values[name]??0
}
const attributeModifier=rankModifier
const skillModifier=rankModifier
function adjust(id:AttributeId,delta:number){const current=form.attributes[id];if(delta>0&&(current>=3||remaining.value<=0))return;if(delta<0&&current<=1)return;form.attributes[id]+=delta}

function sourceParagraphs(documentKey:string,heading:string){
  const doc=ruleSourceDocuments[documentKey]
  const section=doc?.sections.find(item=>item.heading.toLowerCase()===heading.toLowerCase())
  return section?.blocks.filter(block=>block.type==='paragraph').map(block=>block.type==='paragraph'?block.text.trim():'').filter(Boolean)||[]
}
function sourceDescription(documentKey:string,heading:string){return sourceParagraphs(documentKey,heading).filter(text=>!/^(Creed|Practices|Taboos|Signs|Conflict Hook|Voice|Virtue|Strain):?/i.test(text)).slice(0,3).join(' ')}
type NarrativeDetail={intro:string;creed:string;practices:string[];taboos:string[];signs:string;conflictHook:string;voice:string;virtue:string;strain:string}
function narrativeDetail(documentKey:string,heading:string):NarrativeDetail{
  const detail:NarrativeDetail={intro:'',creed:'',practices:[],taboos:[],signs:'',conflictHook:'',voice:'',virtue:'',strain:''}
  const intro:string[]=[];let mode:'intro'|'practices'|'taboos'='intro'
  for(const raw of sourceParagraphs(documentKey,heading)){
    const text=raw.trim()
    let match=text.match(/^Creed:\s*(.*)$/i);if(match){detail.creed=match[1].trim();mode='intro';continue}
    if(/^Practices:\s*$/i.test(text)){mode='practices';continue}
    if(/^Taboos:\s*$/i.test(text)){mode='taboos';continue}
    match=text.match(/^Signs:\s*(.*)$/i);if(match){detail.signs=match[1].trim();mode='intro';continue}
    match=text.match(/^Conflict Hook:\s*(.*)$/i);if(match){detail.conflictHook=match[1].trim();mode='intro';continue}
    match=text.match(/^Voice:\s*(.*)$/i);if(match){detail.voice=match[1].trim();mode='intro';continue}
    match=text.match(/^Virtue:\s*(.*)$/i);if(match){detail.virtue=match[1].trim();mode='intro';continue}
    match=text.match(/^Strain:\s*(.*)$/i);if(match){detail.strain=match[1].trim();mode='intro';continue}
    if(mode==='practices')detail.practices.push(text);else if(mode==='taboos')detail.taboos.push(text);else intro.push(text)
  }
  detail.intro=intro.join(' ');return detail
}
const faithDescription=computed(()=>sourceDescription('faith',form.faith))
const oathDescription=computed(()=>sourceDescription('oath',form.oath))
const faithDetail=computed(()=>narrativeDetail('faith',form.faith))
const oathDetail=computed(()=>narrativeDetail('oath',form.oath))

function cultureGrantKey(id:string){const trait=findCulture(id);return trait?`${trait.species}::${trait.name}`:''}
function cultureGrant(id:string){const trait=findCulture(id);if(trait&&'skillGrants' in trait&&trait.skillGrants)return trait.skillGrants;return cultureSkillGrants[cultureGrantKey(id)]}
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
function exchangeCulture(id:string){
  const index=form.cultureTraits.indexOf(id)
  if(index>=0)cultureReplaceIndex.value=index
  cultureTab.value='All';cultureSearch.value='';culturePickerOpen.value=true
}
function cultureFooterKeywords(values:string[]|undefined,traitType='',speciesName=''){return traitFooterKeywords(values,traitType,speciesName)}

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
const baseSkillRanks=computed(()=>{
  const ranks:Record<string,number>={}
  form.skills.filter(Boolean).map(normalizeSkillName).forEach(skill=>ranks[skill]=(ranks[skill]||0)+1)
  cultureSkillEntries.value.forEach(({skill})=>ranks[skill]=(ranks[skill]||0)+1)
  return ranks
})
const pathSkillOptions=computed(()=>Array.from(new Set(skillDefinitions.map(item=>normalizeSkillName(item.name)))).filter(skill=>!baseSkillRanks.value[skill]).sort())
const skillRanks=computed(()=>{const ranks={...baseSkillRanks.value};if(form.path==='skills')form.pathSkills.filter(Boolean).map(normalizeSkillName).forEach(skill=>ranks[skill]=(ranks[skill]||0)+1);return ranks})

function cultureRankForSkill(skill:string|number){const wanted=String(skill);return cultureSkillEntries.value.filter(entry=>entry.skill===wanted).length}
function cultureSourcesForSkill(skill:string|number){const wanted=String(skill);return Array.from(new Set(cultureSkillEntries.value.filter(entry=>entry.skill===wanted).map(entry=>entry.source))).join(', ')}
function homelandRankForSkill(skill:string|number){const wanted=normalizeSkillName(String(skill));return form.skills.filter(Boolean).map(normalizeSkillName).filter(value=>value===wanted).length}
function homelandSkillOptionLabel(skill:string){return cultureRankForSkill(skill)>0?`${skill} (+1 rank)`:skill}
function spellGroupLabel(lore:string){return `Lore of ${lore}${lore===form.loreAttunement?' (Attuned)':''}`}

function gearDescription(item:typeof gearShopItems[number]){return item.description||''}
function gearEffect(item:typeof gearShopItems[number]){return item.effect||''}
function gearChoices(item:typeof gearShopItems[number]){return item.choices||[]}
function weaponQualityPills(item:typeof gearShopItems[number]){
  if(item.category!=='Weapon')return[]
  const parts=item.detail.split('·').map(part=>part.trim()).filter(Boolean)
  return parts.slice(2).flatMap(part=>part.split(',')).map(part=>part.trim()).filter(Boolean)
}
function weaponPropertyPills(properties:string){return properties==='—'?[]:properties.split(',').map(part=>part.trim()).filter(Boolean)}
function gearMightRequirement(item:typeof gearShopItems[number]){
  if(item.category!=='Armor & Shield')return 0
  const first=item.detail.split('·')[0]?.trim()||'0'
  return Number(first.replace(/[^0-9]/g,''))||0
}
function canAddEquipment(item:typeof gearShopItems[number]){
  return gearCostWp(item)<=wealthRemaining.value && (!gearChoices(item).length||Boolean(gearChoice.value[item.name])) && effectiveAttributes.value.might>=gearMightRequirement(item)
}
function gearShopSubtitle(item:typeof gearShopItems[number]){const cost=item.costText.toLowerCase();return gearTab.value==='All'?`${gearTabFor(item)} · ${cost}`:cost}
function gearDisplayDetail(item:typeof gearShopItems[number]){
  if(item.category==='Armor & Shield'){
    const parts=item.detail.split('·').map(part=>part.trim())
    if(parts.length>=5)return `Might Requirement ${parts[0]} · Guts Bonus ${parts[1]} · Mana Syphon ${parts[2]} · Stealth Condition ${parts[3]} · Weight ${parts[4]}`
  }
  if(item.category==='Weapon'){
    const parts=item.detail.split('·').map(part=>part.trim())
    if(parts.length>=2){const properties=parts.slice(2).join(' · ');return `Damage ${parts[0]} · Weight ${parts[1]}${properties?` · ${properties}`:''}`}
  }
  return item.detail&&item.detail!=='—'?`Weight ${item.detail}`:(gearEffect(item)?'Mechanical effect listed below.':'No weight or numeric profile is listed in the current source.')
}

const repeatableGearNames=new Set(['Torch (each)','Travel Meal (2 day)','Trail Rations (1 day)','Glow-Moss Chalk','Traveler’s Rope (20 ft)'])
function sourceGearFor(item:PurchasedEquipment){return gearShopItems.find(source=>source.name===item.name&&source.category===item.category)}
function isStackableGear(item:typeof gearShopItems[number]){return item.shopGroup==='Consumables'||repeatableGearNames.has(item.name)}
function isStackablePurchased(item:PurchasedEquipment){const source=sourceGearFor(item);return Boolean(source&&isStackableGear(source))}
function consolidatePurchasedEquipment(items:PurchasedEquipment[]){
  const output:PurchasedEquipment[]=[]
  for(const item of items){
    const copy={...item,quantity:equipmentQuantity(item)}
    if(isStackablePurchased(copy)){
      const existing=output.find(candidate=>candidate.name===copy.name&&candidate.category===copy.category&&(candidate.choice||'')===(copy.choice||'')&&(candidate.attachedTo||'')===(copy.attachedTo||''))
      if(existing){existing.quantity=equipmentQuantity(existing)+equipmentQuantity(copy);continue}
    }
    output.push(copy)
  }
  return output
}
function setPath(path:'magic'|'talents'|'skills'|'attribute'){
  form.path=path;pathTouched.value=true
  if(path!=='skills')form.pathSkills=['','']
  if(path!=='attribute')form.pathAttributeBonus=''
  form.talents=path==='talents'?['','']:['']
}
function choosePath(path:'magic'|'talents'|'skills'|'attribute'){setPath(path);next()}
function requiredTalentCount(){return form.path==='talents'?2:1}
function ensureTalentSlots(){const count=requiredTalentCount();while(form.talents.length<count)form.talents.push('');form.talents=form.talents.slice(0,count)}
function addEquipment(item:typeof gearShopItems[number]){
  if(!canAddEquipment(item))return
  const costWp=gearCostWp(item);const choice=gearChoice.value[item.name]||''
  if(isStackableGear(item)){
    const existing=form.equipment.find(candidate=>candidate.name===item.name&&candidate.category===item.category&&(candidate.choice||'')===choice)
    if(existing){existing.quantity=equipmentQuantity(existing)+1;return}
  }
  const kind=protectiveGearKind(item)
  const trinket=isTrinketGear(item)
  const hasDedicatedTrinket=form.equipment.some(candidate=>isTrinketGear(candidate)&&candidate.equipped===true&&candidate.trinketSlot!=='armor')
  const equipped=kind?!form.equipment.some(candidate=>protectiveGearKind(candidate)===kind&&candidate.equipped===true):trinket?!hasDedicatedTrinket:undefined
  form.equipment.push({name:item.name,costWp,costPaidWp:costWp,costSp:costWp/WP_PER_SP,costNp:costWp/WP_PER_NP,category:item.category,detail:gearDisplayDetail(item),effect:gearEffect(item),choice:choice||undefined,quantity:1,statBonuses:item.statBonuses,equipped,trinketSlot:trinket&&equipped?'trinket':undefined})
}
function removeEquipment(index:number){
  const removed=form.equipment[index];const kind=removed?protectiveGearKind(removed):null;const wasEquipped=Boolean(removed?.equipped);const removedDedicated=Boolean(removed&&isTrinketGear(removed)&&removed.equipped&&removed.trinketSlot!=='armor')
  form.equipment.splice(index,1)
  if(kind&&wasEquipped){const replacement=form.equipment.findIndex(item=>protectiveGearKind(item)===kind);if(replacement>=0)form.equipment=setProtectiveEquipmentEquipped(form.equipment,replacement,true)}
  if(removedDedicated){const replacement=form.equipment.findIndex(item=>isTrinketGear(item)&&item.equipped!==true);if(replacement>=0)form.equipment=setTrinketEquipmentEquipped(form.equipment,replacement,'trinket')}
}
function isProtectivePurchased(item:PurchasedEquipment){return protectiveGearKind(item)!==null}
function isTrinketPurchased(item:PurchasedEquipment){return isTrinketGear(item)}
function setProtectiveEquipped(index:number){form.equipment=setProtectiveEquipmentEquipped(form.equipment,index,true)}
function setTrinketSlot(index:number,slot:'trinket'|'armor'){
  const current=form.equipment[index];if(!current)return
  form.equipment=setTrinketEquipmentEquipped(form.equipment,index,current.equipped===true&&current.trinketSlot===slot?null:slot)
}
function changeEquipmentQuantity(index:number,delta:-1|1){
  const item=form.equipment[index];if(!item||!isStackablePurchased(item))return
  if(delta>0){const source=sourceGearFor(item);if(!source||!canAddEquipment(source))return;item.quantity=equipmentQuantity(item)+1;return}
  const next=equipmentQuantity(item)-1;if(next<1)removeEquipment(index);else item.quantity=next
}
const reviewWeapons=computed(()=>form.equipment.filter(item=>item.category==='Weapon'))
const reviewArmor=computed(()=>equippedProtectiveGear(form.equipment))
const dedicatedReviewTrinket=computed(()=>dedicatedTrinketGear(form.equipment))
const overflowReviewTrinket=computed(()=>overflowTrinketGear(form.equipment))
function reviewWeaponProfile(item:PurchasedEquipment|undefined){
  if(!item)return characterSheetWeaponProfile(undefined,form.equipment)
  const source=sourceGearFor(item)
  const detail=source&&source.category==='Weapon'?gearDisplayDetail(source):item.detail
  return characterSheetWeaponProfile({...item,detail},form.equipment)
}
const weaponSlots=computed(()=>Array.from({length:Math.max(3,reviewWeapons.value.length)},(_,index)=>reviewWeaponProfile(reviewWeapons.value[index])))
const armorSlots=computed(()=>Array.from({length:Math.max(2,reviewArmor.value.length)},(_,index)=>characterSheetArmorProfile(reviewArmor.value[index],form.equipment)))

function equipmentAttachTargets(item:PurchasedEquipment){return equipmentAttachmentTargets(item,form.equipment)}
function setAttachment(index:number,event:Event){const item=form.equipment[index];if(item)item.attachedTo=(event.target as HTMLSelectElement|null)?.value||undefined}
function scrollEquipment(target:HTMLElement|null,direction:-1|1){if(target)target.scrollBy({left:direction*Math.max(240,target.clientWidth*.72),behavior:'smooth'})}
function parseWeight(detail:string|undefined){
  const text=String(detail||'').replace(/¼/g,'.25').replace(/½/g,'.5').replace(/¾/g,'.75')
  const match=text.match(/(?:Weight\s*)?([0-9]+(?:\.[0-9]+)?)\s*lb\.?/i)
  return match?Number(match[1]):0
}
const carriedWeight=computed(()=>form.equipment.reduce((sum,item)=>sum+parseWeight(item.detail)*equipmentQuantity(item),0))
const carriedWeightLabel=computed(()=>`${Number(carriedWeight.value.toFixed(2))} lb.`)
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
function spellLore(name:string){return spellDetail(name)?.lore||''}
function spellLoreClass(name:string){const lore=spellLore(name).toLowerCase().replace(/[^a-z0-9]+/g,'-');return lore?`spell-lore-${lore}`:'spell-lore-untyped'}
function effectiveMana(name:string){
  const detail=spellDetail(name);if(!detail)return null
  const custom=customSpell(name)
  return resolveSpellManaCost({name,lore:detail.lore,baseCost:detail.manaCost,attunedLore:form.loreAttunement,manaSyphon:gearManaSyphon.value,focusReduction:gearSpellManaReduction.value,signature:Boolean(custom?.signature),cantrip:Boolean(custom&&!custom.signature&&detail.lore==='Invocation'&&detail.manaCost===0)})
}
function spellCostText(name:string){
  const detail=spellDetail(name);if(!detail)return'Variable'
  const custom=customSpell(name)
  return spellCostLabel({name,lore:detail.lore,baseCost:detail.manaCost,attunedLore:form.loreAttunement,manaSyphon:gearManaSyphon.value,focusReduction:gearSpellManaReduction.value,signature:Boolean(custom?.signature),cantrip:Boolean(custom&&!custom.signature&&detail.lore==='Invocation'&&detail.manaCost===0)})
}
const reviewLoreSpells=computed(()=>Array.from(new Set([signatureSpell.value,...form.spells].filter(Boolean) as string[])).sort((a,b)=>(effectiveMana(a)??999)-(effectiveMana(b)??999)||a.localeCompare(b)))
const reviewInvocationSpells=computed(()=>Array.from(new Set(form.invocationSpells.filter(Boolean))).sort((a,b)=>(effectiveMana(a)??999)-(effectiveMana(b)??999)||a.localeCompare(b)))
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
function customHomelandValid(){return !isCustomHomeland.value || Boolean(form.customHomelandName.trim()&&form.customHomelandDetail.trim()&&form.skills.length===2&&form.skills.every(Boolean)&&new Set(form.skills).size===2)}
function regularSpellsValid(){return form.spells.length===2&&form.spells.every(Boolean)&&new Set(form.spells).size===2}
function invocationSpellsValid(){return form.invocationSpells.length===2&&form.invocationSpells.every(Boolean)&&new Set(form.invocationSpells).size===2}
function talentsValid(){
  const required=requiredTalentCount()
  return form.talents.length===required&&form.talents.every(Boolean)&&new Set(form.talents).size===form.talents.length&&invalidTalents.value.length===0
}

function validateStep(id=stepId.value){
  if(id==='species'&&!form.name.trim())return 'Enter a Character Name before continuing.'
  if(id==='species'&&!form.species)return 'Choose a Species before continuing.'
  if(id==='culture'&&form.cultureTraits.length!==2)return 'Choose exactly 2 Culture Traits before continuing.'
  if(id==='culture'&&requiredCultureChoicesMissing())return 'Finish the Skill choice granted by each selected Culture Trait.'
  if(id==='spark'&&!form.spark)return 'Choose a Spark before continuing.'
  if(id==='homeland'&&!form.homeland)return 'Choose a Homeland before continuing.'
  if(id==='homeland'&&!customHomelandValid())return 'Enter a name and description and choose two different Skills for your custom Homeland.'
  if(id==='attributes'&&remaining.value!==0)return 'Spend all 5 Attribute points before continuing.'
  if(id==='skills'&&!isCustomHomeland.value&&(form.skills.length!==2||form.skills.some(value=>!value)||new Set(form.skills).size!==2))return 'Choose 2 different Homeland Skills before continuing.'
  if(id==='faith-oath'&&(!form.oath||!form.faith))return 'Choose both an Oath and a Faith before continuing.'
  if(id==='path'&&!pathTouched.value)return 'Choose your Body & Spirit path before continuing.'
  if(id==='path-skills'&&(form.pathSkills.length!==2||form.pathSkills.some(value=>!value)||new Set(form.pathSkills).size!==2))return 'Choose 2 different new Skills for Practiced Hand.'
  if(id==='path-skills'&&form.pathSkills.some(skill=>Boolean(baseSkillRanks.value[normalizeSkillName(skill)])))return 'Practiced Hand must grant Skills the character does not already know.'
  if(id==='path-attribute'&&!form.pathAttributeBonus)return 'Choose an Attribute for Tempered Form.'
  if(id==='path-attribute'&&form.pathAttributeBonus&&form.attributes[form.pathAttributeBonus]>=3)return 'Tempered Form cannot raise an Attribute above Rank 3 during character creation.'
  if(id==='lore'&&!form.loreAttunement)return 'Choose a Lore Attunement before continuing.'
  if(id==='spells'&&!regularSpellsValid())return 'Choose 2 different Lore Spells.'
  if(id==='spells'&&!invocationSpellsValid())return 'Choose 2 different Invocation Spells.'
  if(id==='talents'&&!talentsValid())return invalidTalents.value.length?`Resolve Talent requirements: ${invalidTalents.value.join(', ')}.`:`Choose ${requiredTalentCount()} different Talent${requiredTalentCount()===1?'':'s'}.`
  if(id==='equipment'&&wealthRemaining.value<0)return 'Remove equipment until Remaining Wealth is 0 wp or more.'
  if(id==='languages'&&!form.additionalLanguage)return 'Choose one Bonus Language before continuing.'
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

function jumpTo(index:number){
  const target=Math.max(0,Math.min(index,totalSteps.value-1))
  if(target>stepIndex.value){
    for(let cursor=stepIndex.value;cursor<target;cursor++){
      stepIndex.value=cursor
      const message=validateStep()
      if(message){error.value=message;window.scrollTo({top:0,behavior:'smooth'});return}
    }
  }
  stepIndex.value=target
  error.value=''
  window.scrollTo({top:0,behavior:'smooth'})
}
function next(){if(stepIndex.value<totalSteps.value-1)jumpTo(stepIndex.value+1)}
function back(){if(stepIndex.value>0)jumpTo(stepIndex.value-1)}

function buildRecord(saveAsDraft:boolean):CharacterRecord{
  const now=new Date().toISOString()
  const homelandName=isCustomHomeland.value?(form.customHomelandName.trim()||'Custom Homeland'):form.homeland
  const creationComplete=!saveAsDraft||originalStatus.value!=='incomplete'
  const status=creationComplete?(originalStatus.value==='approved'?'approved':'unapproved'):'incomplete'
  const previous=originalRecord.value
  const preserveCampaignEconomy=Boolean(previous&&characterStatus(previous)==='approved')
  const startingWealthWp=preserveCampaignEconomy?previous!.startingWealthWp:startingWealth.value
  const wealthWp=preserveCampaignEconomy?previous!.wealthWp:wealthRemaining.value
  const currencyAddedWp=preserveCampaignEconomy?previous!.currencyAddedWp:0
  return {
    id:draftId.value||crypto.randomUUID(),
    name:form.name.trim()||(!creationComplete?'Unnamed Draft':'Unnamed Character'),
    campaignName:form.campaignName.trim(), appearance:form.appearance.trim(), allowCustomData:form.allowCustomData,
    species:form.species,
    cultureTraits:selectedCultureTraits.value.map(item=>`${item.name} (${item.species})`),
    cultureSkillChoices:{...form.cultureSkillChoices},
    spark:form.spark,
    homeland:homelandName,
    homelandDetail:isCustomHomeland.value?form.customHomelandDetail.trim():homelandDetail.value?.description,
    skills:[...form.skills.map(normalizeSkillName)], skillRanks:{...skillRanks.value},
    faith:form.faith, oath:form.oath, path:form.path,
    pathSkills:form.path==='skills'?[...form.pathSkills.map(normalizeSkillName)]:undefined,
    pathAttributeBonus:form.path==='attribute'&&form.pathAttributeBonus?form.pathAttributeBonus:undefined,
    talents:[...form.talents.filter(Boolean)],
    loreAttunement:form.path==='magic'?form.loreAttunement:undefined,
    spells:form.path==='magic'?[...form.spells.filter(Boolean)]:undefined,
    invocationSpells:form.path==='magic'?[...form.invocationSpells.filter(Boolean)]:undefined,
    languages:[...languages.value], equipment:consolidatePurchasedEquipment(form.equipment), adventureKit:form.adventureKit,
    startingWealthWp, wealthWp, currencyAddedWp,
    treasure:preserveCampaignEconomy?[...(previous?.treasure||[])]:undefined,
    experience:preserveCampaignEconomy?previous?.experience:undefined, magicLevel:preserveCampaignEconomy?previous?.magicLevel:undefined, pinned:previous?.pinned,
    attributes:{...effectiveAttributes.value}, status, draft:!creationComplete, creationComplete, locked:originalLocked.value, creationStep:stepId.value,
    createdAt:originalCreatedAt.value||now, updatedAt:now,
  }
}
function saveDraft(close=false){
  const record=buildRecord(true)
  const saved=upsertCharacter(record)
  if(!saved.ok){error.value=saved.message;return}
  draftId.value=record.id
  if(close)void router.push('/characters'); else error.value='Draft saved.'
}
function finishCharacter(){
  if(!canFinish.value){error.value='This character cannot be finished yet. Resolve the errors shown in Review.';return}
  const record=buildRecord(false)
  const saved=upsertCharacter(record)
  if(!saved.ok){error.value=saved.message;return}
  draftId.value=record.id
  void router.push('/characters')
}
function resetForm(){
  form.name='';form.campaignName='';form.appearance='';form.allowCustomData=false;form.species='';form.cultureTraits=[];form.cultureSkillChoices={};
  form.spark='';form.homeland='';form.customHomelandName='';form.customHomelandDetail='';form.skills=['',''];form.faith='';form.oath='';
  attributes.forEach(attribute=>form.attributes[attribute.id]=1);form.path='magic';form.pathSkills=['',''];form.pathAttributeBonus='';pathTouched.value=false;form.loreAttunement='';form.spells=['',''];form.invocationSpells=['',''];form.talents=[''];form.adventureKit=true;form.equipment=[];form.additionalLanguage='';
  draftId.value=null;originalCreatedAt.value=null;originalStatus.value='incomplete';originalLocked.value=false;originalRecord.value=null;reviewNameLocked.value=true;reviewCampaignLocked.value=true;stepIndex.value=0;error.value='';window.scrollTo({top:0,behavior:'smooth'})
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
  draftId.value=record.id;originalCreatedAt.value=record.createdAt;originalStatus.value=characterStatus(record);originalLocked.value=Boolean(record.locked);originalRecord.value=record
  form.name=record.name||'';form.campaignName=record.campaignName||'';form.appearance=record.appearance||'';form.allowCustomData=Boolean(record.allowCustomData)
  form.species=record.species||''
  await nextTick()
  form.cultureTraits=(record.cultureTraits||[]).map(label=>{const match=String(label).match(/^(.*) \(([^)]+)\)$/);return match?cultureId(match[2],match[1]):label}).filter(id=>Boolean(findCulture(id))).slice(0,2)
  form.cultureSkillChoices={...(record.cultureSkillChoices||{})};form.spark=record.spark||''
  form.homeland=homelands.some(item=>item.name===record.homeland)?record.homeland:'__custom__';form.customHomelandName=form.homeland==='__custom__'?record.homeland:'';form.customHomelandDetail=record.homelandDetail||''
  form.skills=(record.skills||[]).map(normalizeSkillName).slice(0,2);while(form.skills.length<2)form.skills.push('')
  form.faith=record.faith||'';form.oath=record.oath||'';Object.assign(form.attributes,record.attributes||{})
  form.path=record.path||'magic';form.pathSkills=[...(record.pathSkills||[]).slice(0,2)];while(form.pathSkills.length<2)form.pathSkills.push('');form.pathAttributeBonus=record.pathAttributeBonus||''
  if(form.path==='attribute'&&form.pathAttributeBonus&&form.attributes[form.pathAttributeBonus]>1)form.attributes[form.pathAttributeBonus]-=1
  pathTouched.value=true;form.loreAttunement=record.loreAttunement||'';form.spells=[...(record.spells||[]).slice(0,2)];while(form.spells.length<2)form.spells.push('')
  form.invocationSpells=[...(record.invocationSpells||[]).slice(0,2)];while(form.invocationSpells.length<2)form.invocationSpells.push('')
  form.talents=[...(record.talents||[]).map(canonicalTalentName).slice(0,requiredTalentCount())];while(form.talents.length<requiredTalentCount())form.talents.push('')
  form.adventureKit=record.adventureKit!==false;form.equipment=consolidatePurchasedEquipment([...(record.equipment||[])])
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

watch(()=>form.allowCustomData,(enabled:boolean)=>{
  if(enabled)return
  if(customSpeciesItems.value.some(item=>item.name===form.species))form.species=''
  form.cultureTraits=form.cultureTraits.filter(id=>!findCulture(id)?.custom)
  form.talents=form.talents.map(name=>customTalentItems.value.some(item=>item.name===name)?'':name)
  form.spells=form.spells.map(name=>customSpellItems.value.some(item=>item.name===name)?'':name)
  form.invocationSpells=form.invocationSpells.map(name=>customSpellItems.value.some(item=>item.name===name)?'':name)
  if(customSpellItems.value.some(item=>item.lore===form.loreAttunement))form.loreAttunement=''
})

watch(()=>form.species,(next:string)=>{
  if(!next){form.cultureTraits=[];form.cultureSkillChoices={};return}
  form.cultureTraits=ownCultureIds(next);form.cultureSkillChoices={};cultureReplaceIndex.value=0
})
watch(()=>form.homeland,(next:string)=>{
  if(!next||next==='__custom__'){form.skills=['',''];return}
  form.skills=['','']
})
watch(()=>form.path,()=>ensureTalentSlots())
</script>

<template>
  <div class="app-page creator-page">
    <main class="page character-create-page creator-reader-page">
      <AppHeader compact back-to="/characters" back-label="Back to Character Roster" prefer-back-to />
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
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu of the Wandering Reeds — “The still water remembers what the wind forgets.” Selu is a gentle Axalori healer who travels the Sea of Roots tending wounded travelers and recording dreams. Selu’s player chooses Axalori, drawn to their connection with balance, healing, and the calm of flowing water.</em></div>
          <details class="creation-info-panel help-panel" open><summary>What is a Species?</summary><div class="creation-info-body"><p>Your Species describes the Beastfolk lineage your hero belongs to. Across Anthro Mundas, Beastfolk are peoples of fur, feather, scale, and many other forms, each carrying their own histories, languages, Heritage Traits, and cultural traditions.</p><p>Heritage Traits are inherent features of that lineage. Culture Traits reflect learned traditions and can be exchanged in the next step.</p></div></details>

          <div class="identity-fields creator-identity-fields">
            <div class="field-grid two creator-name-campaign-grid"><label class="field-label">Character Name<input v-model="form.name" class="field-control" placeholder="Character name" /></label><div class="campaign-custom-stack"><label class="custom-data-toggle compact-custom-toggle"><span><strong>Allow Custom Data</strong></span><span class="switch"><input v-model="form.allowCustomData" type="checkbox" /><span></span></span></label><label class="field-label">Campaign<input v-model="form.campaignName" class="field-control" placeholder="Campaign name" /></label></div></div>
            <label class="field-label creator-appearance-field">Appearance<textarea v-model="form.appearance" class="field-control appearance-textarea" rows="5" placeholder="Describe your character's appearance"></textarea></label>
          </div>

          <div class="species-choice-layout">
            <div class="species-choice-copy">
              <label class="field-label">Species<select v-model="form.species" class="field-control"><option value="">Select Species</option><option v-for="item in availableSpecies" :key="item" :value="item">{{ item }}{{ customSpecies(item)?' (Custom)':'' }}</option></select></label>
              <div v-if="selectedSpeciesImage" class="species-art-shell species-art-inline"><img :src="selectedSpeciesImage" :alt="`${form.species} character artwork`" /></div>
              <template v-if="selectedSpeciesData">
                <details class="creation-info-panel species-lore-panel" open><summary>{{ selectedSpeciesData.name }} Lore <span v-if="selectedSpeciesData.custom" class="custom-content-badge">CUSTOM</span></summary><div class="creation-info-body"><p class="species-quote">“{{ selectedSpeciesData.quote }}”</p><p>{{ selectedSpeciesData.lore }}</p><div class="keyword-pill-row"><span class="keyword-pill">{{ selectedSpeciesData.theme }}</span><span class="keyword-pill">{{ selectedSpeciesData.language.split(',')[0] }}</span></div></div></details>
                <details class="creation-info-panel trait-panel species-trait-panel"><summary>Heritage Traits</summary><div class="creation-info-body trait-stack"><article v-for="trait in selectedSpeciesTraits" :key="trait.name" class="trait-card species-trait-card"><div class="trait-card-head"><h3>{{ trait.name }} <small v-if="'custom' in trait&&trait.custom" class="custom-content-badge">CUSTOM</small></h3><div class="trait-title-costs"><span v-if="manaCostFromText(trait.text)!==null" class="mana-badge">{{ manaCostFromText(trait.text) }} Mana</span></div></div><p v-if="structuredRule(trait.text).intro" class="rule-flavor">{{ structuredRule(trait.text).intro }}</p><div v-if="visibleRuleFields(trait.text).length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(trait.text)" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div class="keyword-pill-row"><span v-for="keyword in traitFooterKeywords(trait.keywords,'Heritage',form.species)" :key="keyword" :class="traitFooterClass(keyword)">{{ canonicalAbilityType(keyword) }}</span></div></article></div></details>
                <details class="creation-info-panel trait-panel culture-trait-panel"><summary>Culture Traits</summary><div class="creation-info-body"><p>Your Species begins with these two Culture Traits. In Step 2 you may keep them or exchange them for Culture Traits from other peoples.</p><div class="trait-stack"><article v-for="trait in selectedSpeciesData.cultureTraits" :key="trait.name" class="trait-card culture-trait-card"><div class="trait-card-head"><h3>{{ trait.name }} <small v-if="selectedSpeciesData.custom" class="custom-content-badge">CUSTOM</small></h3><div class="trait-title-costs"><span v-if="manaCostFromText(trait.text)!==null" class="mana-badge">{{ manaCostFromText(trait.text) }} Mana</span></div></div><p v-if="structuredRule(trait.text).intro" class="rule-flavor">{{ structuredRule(trait.text).intro }}</p><div v-if="visibleRuleFields(trait.text).length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(trait.text)" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div class="keyword-pill-row"><span v-for="keyword in cultureFooterKeywords(trait.keywords,'Cultural',form.species)" :key="keyword" :class="traitFooterClass(keyword)">{{ canonicalAbilityType(keyword) }}</span></div></article></div></div></details>
              </template>
            </div>
          </div>
        </template>

        <template v-else-if="stepId==='culture'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Culture Traits</h1></div></div>
          <details class="creation-info-panel help-panel" open><summary>What are Culture Traits?</summary><div class="creation-info-body"><p>Culture Traits represent traditions, training, and ways of living learned from a community rather than inherited from Species. Your Species provides two starting Culture Traits, but character creation allows you to exchange them for other Culture Traits.</p></div></details>
          <section class="selected-culture-panel"><h2>Selected Culture Traits <span>{{ form.cultureTraits.length }}/2</span></h2><div class="trait-stack"><article v-for="trait in selectedCultureTraits" :key="`${trait.species}-${trait.name}`" class="trait-card culture-trait-card selected-trait-card"><div class="trait-card-head"><div><h3>{{ trait.name }} <small v-if="trait.custom" class="custom-content-badge">CUSTOM</small></h3><small>{{ trait.species }}</small></div><div class="trait-card-head-actions"><span v-if="manaCostFromText(trait.text)!==null" class="mana-badge">{{ manaCostFromText(trait.text) }} Mana</span><button type="button" class="secondary-button compact-action" @click="exchangeCulture(cultureId(trait.species,trait.name))">Exchange</button></div></div><p v-if="structuredRule(trait.text).intro" class="rule-flavor">{{ structuredRule(trait.text).intro }}</p><div v-if="visibleRuleFields(trait.text).length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(trait.text)" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div class="keyword-pill-row"><span v-for="keyword in cultureFooterKeywords(trait.keywords,'Cultural',trait.species)" :key="keyword" :class="traitFooterClass(keyword)">{{ canonicalAbilityType(keyword) }}</span></div><div v-if="cultureGrant(cultureId(trait.species,trait.name))" class="trait-skill-grants culture-skill-layout"><div class="culture-skill-award-column"><span v-for="skill in cultureGrant(cultureId(trait.species,trait.name))?.fixed||[]" :key="skill" class="culture-skill-award">+1 {{ normalizeSkillName(skill) }}</span><span v-for="(choices,index) in cultureGrant(cultureId(trait.species,trait.name))?.choices||[]" :key="`selected-${index}`" v-show="cultureChoiceValue(cultureId(trait.species,trait.name),index)" class="culture-skill-award selected">+1 {{ cultureChoiceValue(cultureId(trait.species,trait.name),index) }}</span></div><div class="culture-skill-select-column"><select v-for="(choices,index) in cultureGrant(cultureId(trait.species,trait.name))?.choices||[]" :key="index" class="field-control" :value="cultureChoiceValue(cultureId(trait.species,trait.name),index)" @change="setCultureChoiceFromEvent(cultureId(trait.species,trait.name),index,$event)"><option value="">Select Skill</option><option v-for="choice in Array.from(new Set(choices.map(normalizeSkillName)))" :key="choice" :value="choice">{{ choice }}</option></select></div></div></article></div></section>
        </template>

        <template v-else-if="stepId==='spark'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Choose Your Spark</h1></div></div>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s player wants a character defined by empathy, intuition, and the quiet courage it takes to heal in a dangerous world, so they select the Healer Spark. Healer understands the wounds others hide, meeting challenge with empathy and insight rather than force.</em></div>
          <details class="creation-info-panel help-panel" open><summary>What is a Spark &amp; Deed?</summary><div class="creation-info-body"><p>A Spark is the personality archetype that describes what tends to move your hero into action. Each Spark has two keywords that describe its nature.</p><p><strong>Deeds</strong> are meaningful acts completed during play — moments of courage, wit, compassion, discovery, or conviction that shape who your hero becomes. A completed Deed grants Experience based on its challenge and impact. If the Deed shares a keyword with your Spark, it grants <strong>+3 bonus XP</strong> in addition to the normal reward.</p><RouterLink to="/rules/read/sparks-deeds" class="inline-rule-link">Read Sparks &amp; Deeds →</RouterLink></div></details><article class="deed-example-card"><span class="eyebrow">EXAMPLE DEED FOR {{ form.spark.toUpperCase() }}</span><h2>{{ currentDeedExample.name }}</h2><p>{{ currentDeedExample.objective }}</p><div class="deed-example-meta"><span class="deed-bonus-reward"><strong>Bonus Reward</strong> {{ currentDeedExample.reward }}</span><div class="keyword-pill-row"><span v-for="keyword in currentDeedExample.keywords" :key="keyword" class="keyword-pill">{{ keyword }}</span></div></div></article>
          <label class="field-label">Spark<select v-model="form.spark" class="field-control"><option value="">Select Spark</option><option v-for="item in sparks" :key="item[0]" :value="item[0]">{{ item[0] }}</option></select></label>
          <article v-if="form.spark" class="choice-summary spark-description-card compact-spark-preview detail-tone-spark"><h2>{{ form.spark }}</h2><p>{{ currentSpark?.description }}</p><div class="keyword-pill-row"><span v-for="keyword in singleKeywords(currentSpark?.keywords||[])" :key="keyword" class="keyword-pill">{{ keyword }}</span></div></article>
        </template>

        <template v-else-if="stepId==='homeland'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Choose Your Homeland</h1></div></div>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s player imagines them growing up in the Sea of Roots, a vast wetland dotted with mangrove villages, drifting reed platforms, and moss-kissed shrines to the Dreamtide faith. Life there teaches patience, observation, and the gentle skill of living with what nature offers.</em></div>
          <details class="creation-info-panel help-panel" open><summary>What is a Homeland?</summary><div class="creation-info-body"><p>Your Homeland is the place, road, settlement, or community that shaped your hero before the adventure began. It provides two starting Skills at Rank 1 and gives context to the habits and knowledge your character carries into the wider world.</p></div></details>
          <label class="field-label">Homeland<select v-model="form.homeland" class="field-control"><option value="">Select Homeland</option><option v-for="item in homelands" :key="item.name" :value="item.name">{{ item.name }}</option><option value="__custom__">Other — Custom Homeland</option></select></label>
          <template v-if="isCustomHomeland"><div class="field-grid custom-homeland-grid"><label class="field-label custom-homeland-name-field">Homeland Name<input v-model="form.customHomelandName" class="field-control" placeholder="Name your Homeland" /></label><label class="field-label custom-homeland-detail-field">Homeland Details<textarea v-model="form.customHomelandDetail" class="field-control textarea-control" rows="2" placeholder="Describe the place and what it taught your hero"></textarea></label></div><div class="field-grid two custom-homeland-skills"><label v-for="(pool,index) in customHomelandSkillPools" :key="index" class="field-label">Homeland Skill #{{ index+1 }}<select v-model="form.skills[index]" class="field-control"><option value="">Select Skill</option><option v-for="skill in pool" :key="skill" :value="skill" :disabled="form.skills.some((selected,selectedIndex)=>selected===skill&&selectedIndex!==index)">{{ skill }}</option></select></label></div><div v-if="form.skills.some(Boolean)" class="keyword-pill-row selected-homeland-skill-pills"><span v-for="skill in form.skills.filter(Boolean)" :key="skill" class="keyword-pill">{{ skill }} · Homeland</span></div></template>
          <article v-else-if="form.homeland" class="choice-summary homeland-description-card detail-tone-homeland"><h2>{{ form.homeland }}</h2><p>{{ homelandDetail?.description }}</p><div class="homeland-skill-copy"><strong>Skills</strong><div class="keyword-pill-row"><span v-for="skill in homelandCoreSkills" :key="skill" class="keyword-pill">{{ skill }}</span></div><small v-if="homelandOptionalSkills.length"><strong>Optional</strong></small><div v-if="homelandOptionalSkills.length" class="keyword-pill-row"><span v-for="skill in homelandOptionalSkills" :key="skill" class="keyword-pill alternate-pill">{{ skill }}</span></div></div></article>
        </template>

        <template v-else-if="stepId==='attributes'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Distribute Attributes</h1></div></div>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s player wants a healer whose strength lies in intuition, patience, and the courage to face suffering without turning away. They place their points as Lore 3, Bravery 3, Agility 2, Hide 1, and Might 1.</em></div>
          <details class="creation-info-panel help-panel" open><summary>What do Attributes do?</summary><div class="creation-info-body"><p>Attributes are the five pillars of your character’s natural capability. Each begins at Rank 1. Spend 5 points to raise them, with a maximum Rank of 3 during character creation. Attribute Rank determines its modifier and helps form secondary stats used by other rules.</p><RouterLink to="/rules/read/attributes-skills" class="inline-rule-link">Read Attributes &amp; Skills →</RouterLink></div></details>
          <div class="subsection-title"><strong>Spend 5 Points</strong><span>{{ remaining }} points remaining</span></div>
          <div class="attribute-editor attribute-sheet-editor"><article v-for="attribute in attributes" :key="attribute.id" class="attribute-sheet-row" :class="`attribute-${attribute.id}`"><div class="attribute-sheet-copy"><div class="attribute-sheet-title"><strong>{{ attribute.name }}</strong></div><small>{{ attribute.description }}</small><div class="attribute-sheet-secondary"><span v-for="secondary in secondaryStats[attribute.id]" :key="secondary.name"><RouterLink v-if="secondary.slug" :to="`/rules/read/${secondary.slug}`">{{ secondary.name }}</RouterLink><template v-else>{{ secondary.name }}</template><b v-if="secondary.name==='Speed'" class="speed-formula">2 + <span class="agility-modifier-accent">{{ derived.aim }}</span> AGI MOD = {{ derived.speed }}</b><b v-else>{{ secondaryValue(secondary.name) }}</b></span><em v-if="!secondaryStats[attribute.id].length">No direct secondary stat</em></div></div><div class="attribute-rank-stack"><div class="attribute-rank-mod-row"><span class="attribute-rank-display attribute-stat-box"><span>Rank</span><b>{{ form.attributes[attribute.id] }}</b></span><span class="attribute-mod-display attribute-stat-box" :class="{'agility-modifier-box':attribute.id==='agility'}"><span>Modifier</span><b>+{{ attributeModifier(form.attributes[attribute.id]) }}</b></span></div><div class="stepper attribute-rank-stepper"><button type="button" @click="adjust(attribute.id,-1)">−</button><span>{{ form.attributes[attribute.id] }}</span><button type="button" @click="adjust(attribute.id,1)">+</button></div></div></article></div>
        </template>

        <template v-else-if="stepId==='skills'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Starting Skills</h1></div></div>
          <details class="creation-info-panel help-panel" open><summary>How do Starting Skills work?</summary><div class="creation-info-body"><p>The supplied Character Creation rules grant two Skills from your Homeland at Rank 1. There is no separate pool of Skill points to spend during creation. Some selected Culture Traits grant additional Skill ranks; those are added automatically below and can raise a Skill already gained from your Homeland.</p><RouterLink to="/rules/read/attributes-skills" class="inline-rule-link">Read Attributes &amp; Skills →</RouterLink></div></details>
          <div v-if="!isCustomHomeland" class="homeland-skill-reference"><strong>Homeland Skills</strong><div class="keyword-pill-row"><span v-for="skill in homelandCoreSkills" :key="skill" class="keyword-pill">{{ skill }}</span></div><small v-if="homelandOptionalSkills.length">Optional</small><div v-if="homelandOptionalSkills.length" class="keyword-pill-row"><span v-for="skill in homelandOptionalSkills" :key="skill" class="keyword-pill alternate-pill">{{ skill }}</span></div></div><section class="skill-rank-summary"><h2>Starting Skill Ranks</h2><div class="skill-rank-grid"><article v-for="(rank,skill) in skillRanks" :key="skill"><span class="skill-rank-name"><strong>{{ skill }}</strong><span class="skill-source-pills"><small v-if="cultureRankForSkill(skill)" class="cultural-skill-pill">Cultural · {{ cultureSourcesForSkill(skill) }}</small><small v-if="homelandRankForSkill(skill)" class="homeland-skill-pill">Homeland</small></span></span><span class="skill-rank-values"><b>Rank {{ rank }}</b><small>Modifier +{{ skillModifier(rank) }}</small></span></article></div></section>
          <div v-if="!isCustomHomeland" class="field-grid two"><label v-for="index in 2" :key="index" class="field-label">Homeland Skill Option #{{ index }}<select v-model="form.skills[index-1]" class="field-control"><option value="">Select Skill</option><option v-for="skill in homelandSkillPool" :key="skill" :value="skill" :disabled="form.skills.some((selected,selectedIndex)=>selected===skill&&selectedIndex!==index-1)">{{ homelandSkillOptionLabel(skill) }}</option></select></label></div><div v-if="form.skills.some(Boolean)" class="selected-homeland-skill-pills keyword-pill-row"><span v-for="skill in form.skills.filter(Boolean)" :key="skill" class="keyword-pill">{{ skill }} · Homeland</span></div><p v-if="isCustomHomeland" class="muted custom-homeland-skill-note">Custom Homeland Skills were selected in the Homeland step.</p>
        </template>

        <template v-else-if="stepId==='faith-oath'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Oath &amp; Faith</h1></div></div>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s player creates the Oath Mend the Broken Thread: no one deserves to fade alone and every wound must be tended. For Faith they choose the Dreamtide, whose followers believe sleeping minds drift together and dreams carry truths the waking world forgets.</em></div>
          <div class="faith-oath-column"><section><details class="creation-info-panel help-panel" open><summary>What is an Oath?</summary><div class="creation-info-body"><p>An Oath is the principle your hero has chosen to live by. It does not provide a flat mechanical bonus, but keeping or breaking it can shape reputation, narrative consequences, and how your character is remembered.</p></div></details><label class="field-label faith-oath-select">Oath<select v-model="form.oath" class="field-control"><option value="">Select Oath</option><option v-for="item in oaths" :key="item[0]" :value="item[0]">{{ item[0] }} — {{ item[1] }}</option></select></label><article v-if="form.oath" class="choice-summary faith-oath-detail-card detail-tone-oath"><header><h2>{{ form.oath }}</h2><small>OATH</small></header><p v-if="oathDetail.intro||oathDescription">{{ oathDetail.intro||oathDescription }}</p><div class="narrative-detail-grid"><div v-if="oathDetail.voice"><small>VOICE</small><span>{{ oathDetail.voice }}</span></div><div v-if="oathDetail.virtue"><small>VIRTUE</small><span>{{ oathDetail.virtue }}</span></div><div v-if="oathDetail.strain"><small>STRAIN</small><span>{{ oathDetail.strain }}</span></div></div></article></section><section><details class="creation-info-panel help-panel" open><summary>What is Faith?</summary><div class="creation-info-body"><p>Faith describes what your hero reveres, trusts, or believes gives meaning to the world. It helps frame decisions and relationships without forcing one way to play the character.</p></div></details><label class="field-label faith-oath-select">Faith<select v-model="form.faith" class="field-control"><option value="">Select Faith</option><option v-for="item in faiths" :key="item">{{ item }}</option></select></label><article v-if="form.faith" class="choice-summary faith-oath-detail-card detail-tone-faith"><header><h2>{{ form.faith }}</h2><small>FAITH</small></header><p v-if="faithDetail.intro||faithDescription">{{ faithDetail.intro||faithDescription }}</p><div class="narrative-detail-grid"><div v-if="faithDetail.creed"><small>CREED</small><span>{{ faithDetail.creed }}</span></div><div v-if="faithDetail.practices.length"><small>PRACTICES</small><ul><li v-for="item in faithDetail.practices" :key="item">{{ item }}</li></ul></div><div v-if="faithDetail.taboos.length"><small>TABOOS</small><ul><li v-for="item in faithDetail.taboos" :key="item">{{ item }}</li></ul></div><div v-if="faithDetail.signs"><small>SIGNS</small><span>{{ faithDetail.signs }}</span></div><div v-if="faithDetail.conflictHook"><small>CONFLICT HOOK</small><span>{{ faithDetail.conflictHook }}</span></div></div></article></section></div>
        </template>

        <template v-else-if="stepId==='path'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Rhythm of Body &amp; Spirit</h1></div></div>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s player knows this Axalori is shaped more by intuition and compassion than force of arms. They gain a Magic Level, attune to the Lore of Harmony, and choose Hearth Touch as their Talent.</em></div>
          <details class="creation-info-panel help-panel" open><summary>Choose Your Path</summary><div class="creation-info-body"><p>This choice decides how your hero first expresses exceptional ability. Every path grants at least one Talent. Wind-Touched begins magical progression, Gifted Heart begins with a second Talent, Practiced Hand broadens Skills, and Tempered Form strengthens one Attribute.</p></div></details>
          <aside class="creator-static-panel mana-path-panel winds-magic-panel"><strong>Winds of Magic</strong><p>The Winds of Magic are living currents that move through stone, storm, root, and heartbeat. Mana is the portion of that rhythm a hero can draw upon to fuel Abilities, Spells, and other supernatural effects.</p><div class="mana-stat-line"><div><span>Mana Pool</span><b>{{ manaPool }}</b><small>(Magic Level + Spirit [Bravery modifier]).</small></div><div><span>Magic Regen</span><b>{{ magicRegen }}</b><small>(Heart [Bravery rank]).</small></div></div><p v-if="manaTraitNotes.length" class="mana-trait-note"><strong>Magic Regen interaction:</strong> {{ manaTraitNotes.join(' · ') }}</p></aside>
          <div class="path-choice-grid"><button type="button" class="path-choice-card path-magic" :class="{selected:pathTouched&&form.path==='magic'}" @click="choosePath('magic')"><span class="path-choice-kicker">WIND-TOUCHED</span><strong class="path-choice-title">Magic Level 1 + 1 Talent</strong><p>Attune to a Lore, gain its Signature Spell, choose starting Spells, then select one Talent.</p></button><button type="button" class="path-choice-card path-talents" :class="{selected:pathTouched&&form.path==='talents'}" @click="choosePath('talents')"><span class="path-choice-kicker">GIFTED HEART</span><strong class="path-choice-title">2 Talents</strong><p>Build around training, instinct, and practiced gifts by selecting two Talents.</p></button><button type="button" class="path-choice-card path-skills" :class="{selected:pathTouched&&form.path==='skills'}" @click="choosePath('skills')"><span class="path-choice-kicker">PRACTICED HAND</span><strong class="path-choice-title">2 New Skills + 1 Talent</strong><p>Learn two Skills you do not already know, then select one Talent.</p></button><button type="button" class="path-choice-card path-attribute" :class="{selected:pathTouched&&form.path==='attribute'}" @click="choosePath('attribute')"><span class="path-choice-kicker">TEMPERED FORM</span><strong class="path-choice-title">Attribute Point + 1 Talent</strong><p>Strengthen one Attribute, then select one Talent.</p></button></div>
        </template>

        <template v-else-if="stepId==='path-skills'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Practiced Hand</h1></div></div>
          <details class="creation-info-panel help-panel" open><summary>Choose Two New Skills</summary><div class="creation-info-body"><p>Practiced Hand grants two Skills at Rank 1 in addition to your Homeland and Culture Skills. Each choice must be a Skill your character does not already know.</p></div></details>
          <div class="field-grid two"><label v-for="index in 2" :key="`path-skill-${index}`" class="field-label">New Skill {{ index }}<select v-model="form.pathSkills[index-1]" class="field-control"><option value="">Select New Skill</option><option v-for="skill in pathSkillOptions" :key="skill" :value="skill" :disabled="form.pathSkills.some((selected,selectedIndex)=>selected===skill&&selectedIndex!==index-1)">{{ skill }}</option></select></label></div>
          <div v-if="form.pathSkills.some(Boolean)" class="keyword-pill-row"><span v-for="skill in form.pathSkills.filter(Boolean)" :key="skill" class="keyword-pill">{{ skill }} · Practiced Hand</span></div>
        </template>

        <template v-else-if="stepId==='path-attribute'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Tempered Form</h1></div></div>
          <details class="creation-info-panel help-panel" open><summary>Choose One Attribute</summary><div class="creation-info-body"><p>Tempered Form strengthens one Attribute before you choose your Talent.</p></div></details>
          <div class="path-attribute-choice-grid"><button v-for="attribute in attributes" :key="attribute.id" type="button" class="path-attribute-choice" :class="{selected:form.pathAttributeBonus===attribute.id}" :disabled="form.attributes[attribute.id]>=3" @click="form.pathAttributeBonus=attribute.id"><strong>{{ attribute.name }}</strong><span>Rank {{ form.attributes[attribute.id] }} → {{ form.attributes[attribute.id] < 3 ? form.attributes[attribute.id]+1 : 3 }}</span><small>{{ form.attributes[attribute.id]>=3?'Already at creation maximum':'Grant +1 Rank' }}</small></button></div>
        </template>

        <template v-else-if="stepId==='lore'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Lore Attunement</h1></div></div>
          <details class="creation-info-panel help-panel" open><summary>Magic Level 1 &amp; Mana</summary><div class="creation-info-body"><p>Magic draws on Mana. At Magic Level 1, your hero gains magical spellcasting and attunes to one Lore. Spells from the attuned Lore reduce their Mana cost by 2, and the Lore’s Signature Spell is gained automatically and tracked separately from chosen Lore Spells.</p><RouterLink to="/rules/read/lore-attunement" class="inline-rule-link">Read Lore Attunement →</RouterLink></div></details>
          <label class="field-label">Lore Attunement<select v-model="form.loreAttunement" class="field-control"><option value="">Select Lore Attunement</option><option v-for="lore in availableAttunableLores" :key="lore" :value="lore">{{ lore }}</option></select></label>
          <template v-if="form.loreAttunement"><article class="choice-summary lore-fluff-card"><h2>Lore of {{ form.loreAttunement }}</h2><p>{{ loreDescription(form.loreAttunement) }}</p></article><article v-if="signatureDetail" class="spell-detail-card signature-spell-card" :class="spellLoreClass(signatureDetail.name)"><div class="spell-detail-head"><div><span class="eyebrow">SIGNATURE SPELL</span><h2>{{ signatureDetail.name }}</h2></div><div class="trait-title-costs"><span v-for="type in abilityTypeKeywords(signatureDetail.keywords)" :key="type" :class="['ability-cost-pill',abilityTypeClass(type)]">{{ type }}</span><span class="mana-badge">{{ spellCostText(signatureDetail.name) }}</span></div></div><p class="rule-flavor">{{ signatureDetail.flavor }}</p><div class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(signatureDetail.rules)" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div class="keyword-pill-row"><span v-for="keyword in cardKeywords(signatureDetail.keywords)" :key="keyword" class="keyword-pill">{{ keyword }}</span></div></article></template>
        </template>

        <template v-else-if="stepId==='spells'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Starting Spells</h1></div></div>
          <details class="creation-info-panel help-panel" open><summary>Magical Spells</summary><div class="creation-info-body"><p>Magical Spells are divided between the seven Lores of Magic and Invocation magic. Lore Attunement gives a free Signature Spell and reduces the Mana cost of spells from that Lore. Invocation Spells are dependable magical effects outside a Lore. At Magic Level 1, your hero begins with the free Signature Spell, two different Lore Spells, and two different Invocation Spells; these are your starting known spells, and a Spell cannot be selected twice.</p><p>When a Lore Spell belongs to your attuned Lore, its displayed Mana cost includes the Lore Attunement reduction of 2.</p></div></details>
          <section class="spell-selection-block"><h2>Lore Spells</h2><div class="field-grid two"><label v-for="index in 2" :key="`spell-${index}`" class="field-label">Spell {{ index }}<select v-model="form.spells[index-1]" class="field-control"><option value="">Select Spell</option><optgroup v-for="group in regularSpellGroups" :key="group.lore" :label="spellGroupLabel(group.lore)"><option v-for="spell in group.spells" :key="spell" :value="spell" :disabled="spellDisabled(spell,form.spells[index-1],'regular')">{{ spell }}</option></optgroup></select></label></div></section>
          <section class="spell-selection-block"><h2>Invocation Spells</h2><div class="field-grid two"><label v-for="index in 2" :key="`inv-${index}`" class="field-label">Invocation {{ index }}<select v-model="form.invocationSpells[index-1]" class="field-control"><option value="">Select Invocation Spell</option><option v-for="spell in invocationOptions" :key="spell" :value="spell" :disabled="spellDisabled(spell,form.invocationSpells[index-1],'invocation')">{{ spell }}</option></select></label></div></section>
          <div class="selected-spell-stack"><article v-for="spell in [...form.spells,...form.invocationSpells].filter(Boolean)" :key="spell" class="spell-detail-card" :class="spellLoreClass(spell)"><div class="spell-detail-head"><div><h2>{{ spell }} <small v-if="isCustomSpell(spell)" class="custom-content-badge">CUSTOM</small></h2></div><div class="trait-title-costs"><span v-for="type in abilityTypeKeywords(spellDetail(spell)?.keywords||[])" :key="type" :class="['ability-cost-pill',abilityTypeClass(type)]">{{ type }}</span><span class="mana-badge">{{ spellCostText(spell) }}</span></div></div><p class="rule-flavor">{{ spellDetail(spell)?.flavor }}</p><div class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(spellDetail(spell)?.rules||'')" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div class="keyword-pill-row"><span v-for="keyword in cardKeywords(spellDetail(spell)?.keywords||[])" :key="keyword" class="keyword-pill">{{ keyword }}</span></div></article></div>
        </template>

        <template v-else-if="stepId==='talents'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Choose Talents</h1></div></div>
          <details class="creation-info-panel help-panel" open><summary>What are Talents?</summary><div class="creation-info-body"><p>Talents represent trained techniques, unusual gifts, and practiced capabilities. Some Talents require another Talent first. Requirements must be met before this character can be finished.</p></div></details>
          <div class="talent-slot-grid"><button v-for="index in requiredTalentCount()" :key="index" type="button" class="talent-slot-button" :class="form.talents[index-1]?talentCardClasses(form.talents[index-1]):[]" @click="openTalentPicker(index-1)"><span>Talent {{ index }}</span><strong>{{ form.talents[index-1]||'Choose a Talent' }}</strong><small v-if="form.talents[index-1]">{{ talentCategory(form.talents[index-1]) }}</small></button></div>
          <div class="selected-talent-stack"><article v-for="talent in form.talents.filter(Boolean)" :key="talent" class="talent-detail-card" :class="[...talentCardClasses(talent),{invalid:!talentRequirementMet(talent)}]"><div class="talent-detail-head"><h2>{{ canonicalTalentName(talent) }}</h2><div class="talent-head-actions"><span v-for="type in abilityTypeKeywords(talentKeywords(talent))" :key="type" :class="['ability-cost-pill',abilityTypeClass(type)]">{{ type }}</span><span v-if="manaCostFromText(talentText(talent))!==null" class="mana-badge">{{ manaCostFromText(talentText(talent)) }} Mana</span><span v-if="talentRequires(talent)" class="requirement-badge" :class="{invalid:!talentRequirementMet(talent)}">Requires {{ talentRequires(talent) }}</span></div></div><p v-if="structuredRule(talentText(talent)).intro" class="rule-flavor">{{ structuredRule(talentText(talent)).intro }}</p><div v-if="visibleRuleFields(talentText(talent)).length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(talentText(talent))" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div class="keyword-pill-row"><span v-for="keyword in cardKeywords(talentKeywords(talent))" :key="keyword" class="keyword-pill">{{ keyword }}</span></div><p v-if="!talentRequirementMet(talent)" class="invalid-option-text">Requirement not met. Select {{ talentRequires(talent) }} as the other Talent or choose a different option.</p></article></div>
          <div v-if="invalidTalents.length" class="invalid-panel">One or more selected Talents are invalid. You may jump to another creation step, but Continue and final character creation remain locked until requirements are met.</div>
        </template>

        <template v-else-if="stepId==='equipment'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Equipment &amp; Gear</h1></div></div>
          <div class="creation-example"><strong>Building Selu:</strong> <em>Selu’s travels and clothes are humble and practical. Their starting gear includes Leafstitch armor, an oakstaff, a driftwood charm, healing herbs, a water flask, and a journal of dreams.</em></div>
          <details class="creation-info-panel help-panel" open><summary>Currency of Anthro Mundas</summary><div class="creation-info-body"><p>Trade across Anthro Mundas commonly uses Ancient fasteners called <strong>Threadpieces</strong>. Washer pieces (wp) cover everyday purchases, Nut pieces (np) local trade, Screw pieces (sp) most adventuring commerce, and Bolt pieces (bp) major debts and purchases.</p><div class="currency-grid currency-grid-four"><span><strong>Washer Pieces</strong><small>10 wp = 1 np</small></span><span><strong>Nut Pieces</strong><small>5 np = 1 sp</small></span><span><strong>Screw Pieces</strong><small>5 sp = 1 bp</small></span><span><strong>Bolt Pieces</strong><small>Highest denomination</small></span></div></div></details>
          <details class="creation-info-panel help-panel starting-equipment-parent" open><summary>Starting Equipment</summary><div class="creation-info-body"><p>Each character begins with <strong>{{ formatThreadpieceWpAs(STARTING_WEALTH_WP,'sp') }}</strong> in Threadpieces and an Adventure Kit. Keep the Adventure Kit as the standard starting package, or sell it during creation for an additional <strong>{{ formatThreadpieceWpAs(ADVENTURE_KIT_SELL_WP,'sp') }}</strong> to spend on equipment and gear.</p><section class="starting-equipment-panel"><div class="adventure-kit-bar"><div><strong>Adventure Kit - Starting Equipment Package</strong></div><div class="kit-return-control"><span>Sell</span><label class="switch"><input v-model="form.adventureKit" type="checkbox" :true-value="false" :false-value="true"/><span></span></label></div></div><div v-if="form.adventureKit" class="adventure-kit-contents"><span>Bedroll &amp; Groundsheet</span><span>Traveler’s Cloak</span><span>2× Torches</span><span>Reed Flask</span><span>2× Trail Rations</span><span>Traveler’s Pack</span><span>Fire-Starting Kit</span></div><div class="wealth-balance-field"><span>Threadpieces</span><div class="threadpiece-breakdown"><span><b>{{ threadpieceBreakdown.wp }}</b> wp</span><span><b>{{ threadpieceBreakdown.np }}</b> np</span><span><b>{{ threadpieceBreakdown.sp }}</b> sp</span><span><b>{{ threadpieceBreakdown.bp }}</b> bp</span></div></div></section></div></details>
          <button type="button" class="secondary-button wide" @click="shopOpen=true">Equipment &amp; Gear</button>
          <section v-if="form.equipment.length" class="purchased-equipment-section"><h2>Purchased Equipment &amp; Gear</h2><div class="purchased-gear-list"><article v-for="(item,index) in form.equipment" :key="`${item.name}-${item.choice||''}-${index}`" class="list-row"><span class="list-row-copy"><strong class="list-row-title">{{ item.name }}<template v-if="equipmentQuantity(item)>1"> ×{{ equipmentQuantity(item) }}</template></strong><small class="list-row-subtitle">{{ item.category }} · {{ formatGearCost(item) }}<template v-if="isStackablePurchased(item)"> each</template></small></span><div class="purchased-item-detail"><small v-if="item.choice">Choice: {{ item.choice }}</small><label v-if="equipmentAttachTargets(item).length" class="attachment-control">Attach / Apply (optional)<select class="field-control" :value="item.attachedTo||''" @change="setAttachment(index,$event)"><option value="">Not attached</option><option v-for="target in equipmentAttachTargets(item)" :key="target" :value="target">{{ target }}</option></select></label></div><div v-if="isStackablePurchased(item)" class="equipment-quantity-control" role="group" :aria-label="`Quantity of ${item.name}`"><button type="button" class="secondary-button compact-action" @click="changeEquipmentQuantity(index,-1)">−</button><strong>{{ equipmentQuantity(item) }}</strong><button type="button" class="secondary-button compact-action" :disabled="!sourceGearFor(item)||!canAddEquipment(sourceGearFor(item)!)" @click="changeEquipmentQuantity(index,1)">+</button></div><div v-else class="purchased-gear-actions"><button v-if="isProtectivePurchased(item)" type="button" class="secondary-button compact-action" :class="{active:item.equipped}" @click="setProtectiveEquipped(index)">{{ item.equipped?'Equipped':'Equip' }}</button><template v-if="isTrinketPurchased(item)"><button type="button" class="secondary-button compact-action" :class="{active:item.equipped&&item.trinketSlot!=='armor'}" @click="setTrinketSlot(index,'trinket')">{{ item.equipped&&item.trinketSlot!=='armor'?'Trinket Slot':'Equip Trinket' }}</button><button type="button" class="secondary-button compact-action" :class="{active:item.equipped&&item.trinketSlot==='armor'}" :disabled="!(item.equipped&&item.trinketSlot==='armor')&&!canEquipTrinketInArmorSlot(form.equipment,index)" @click="setTrinketSlot(index,'armor')">{{ item.equipped&&item.trinketSlot==='armor'?'A&S Slot':'Equip A&S' }}</button></template><button type="button" class="secondary-button compact-action" @click="removeEquipment(index)">Remove</button></div></article></div></section>
        </template>

        <template v-else-if="stepId==='languages'">
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Starting Languages</h1></div></div>
          <details class="creation-info-panel help-panel" open><summary>Languages</summary><div class="creation-info-body"><p>Your Species gives you its native tongue, and Commonspeak serves as the shared trade language used between peoples. Choose one bonus language to represent travel, study, kinship, work, or another part of your character’s history.</p></div></details>
          <div class="language-choice-grid compact-language-grid"><article class="choice-summary language-card species-language-card" :data-species="form.species"><h2>{{ nativeLanguage }}</h2><div class="keyword-pill-row"><span class="keyword-pill">{{ form.species }}</span></div><p>{{ languageDescription(nativeLanguage) }}</p></article><article class="choice-summary language-card common-language-card"><h2>Commonspeak</h2><p>{{ languageDescription('Commonspeak') }}</p></article><article class="choice-summary language-card bonus-language-card"><h2>Bonus Language</h2><div v-if="form.additionalLanguage&&speciesForLanguage(form.additionalLanguage)" class="keyword-pill-row bonus-language-pill-row"><span class="keyword-pill">{{ speciesForLanguage(form.additionalLanguage) }}</span></div><select v-model="form.additionalLanguage" class="field-control"><option value="">Select Language</option><option v-for="language in languageOptions" :key="language" :value="language">{{ language }}</option></select><p v-if="form.additionalLanguage">{{ languageDescription(form.additionalLanguage) }}</p></article></div>
        </template>

        <template v-else>
          <div class="form-card-heading"><div><p class="eyebrow">STEP {{ stepNumber }} OF {{ totalSteps }}</p><h1>Review Character</h1></div></div>
          <div v-if="finalErrors.length" class="invalid-panel final-invalid-panel"><h2>Character Cannot Be Finished</h2><ul><li v-for="message in finalErrors" :key="message">{{ message }}</li></ul></div>
          <div v-else class="valid-panel"><strong>Character Ready</strong><p>All required creation choices are valid. Review the summary below, then finish the character.</p></div>
          <details class="review-section review-collapsible character-detail-section" open><summary><h2>Character Detail</h2><span>Identity &amp; origin</span></summary><div class="review-collapsible-body character-detail-body"><div class="field-grid two review-identity-edit"><label class="field-label review-name-field"><span class="review-lock-label"><span>Character Name</span><button type="button" class="review-lock-toggle" @click="reviewNameLocked=!reviewNameLocked">({{ reviewNameLocked?'Change':'Lock' }})</button></span><input v-model="form.name" class="field-control" :readonly="reviewNameLocked" placeholder="Character name" /></label><label class="field-label review-name-field"><span class="review-lock-label"><span>Campaign</span><button type="button" class="review-lock-toggle" @click="reviewCampaignLocked=!reviewCampaignLocked">({{ reviewCampaignLocked?'Change':'Lock' }})</button></span><input v-model="form.campaignName" class="field-control" :readonly="reviewCampaignLocked" placeholder="Campaign name" /></label></div><div class="review-grid review-summary-grid"><article><span>Species</span><strong>{{ form.species||'Not selected' }}</strong></article><article><span>Spark</span><strong>{{ form.spark }}</strong></article><article><span>Homeland</span><strong>{{ isCustomHomeland?(form.customHomelandName||'Custom Homeland'):form.homeland }}</strong></article><article><span>Oath</span><strong>{{ form.oath }}</strong></article><article><span>Faith</span><strong>{{ form.faith }}</strong></article><article><span>Path</span><strong>{{ selectedPathName }}</strong></article><article class="review-wide-field"><span>Languages</span><strong>{{ languages.join(' · ') }}</strong></article></div></div></details>
          <details class="review-section review-collapsible character-sheet-attributes" open><summary><h2>Attributes</h2><span>Ranks &amp; secondary stats</span></summary><div class="review-collapsible-body"><CharacterAttributePanel :attributes="effectiveAttributes" :magic-level="magicLevel" :guts-bonus="gearGutsBonus" :control-bonus="gearControlBonus" :magic-regen-bonus="gearMagicRegenBonus" /></div></details>
          <details class="review-section review-collapsible review-weapons-section" open><summary><h2>Weapons</h2></summary><div class="review-collapsible-body equipment-scroll-shell"><button type="button" class="equipment-scroll-button" aria-label="Scroll weapons left" @click="scrollEquipment(weaponSheet,-1)">‹</button><div ref="weaponSheet" class="equipment-slot-sheet"><div class="equipment-slot-header weapon-slot-grid"><span>Weapon</span><span>Damage</span><span>Range</span><span>Properties / Notes</span><span>Wt.</span></div><div v-for="(slot,index) in weaponSlots" :key="`weapon-slot-${index}`" class="equipment-slot-row weapon-slot-grid"><strong>{{ slot.name }}</strong><span>{{ slot.damage }}</span><span>{{ slot.range }}</span><span class="keyword-pill-row equipment-quality-cell"><span v-for="quality in weaponPropertyPills(slot.properties)" :key="quality" class="keyword-pill">{{ quality }}</span><span v-if="!weaponPropertyPills(slot.properties).length">—</span></span><span>{{ slot.weight }}</span></div></div><button type="button" class="equipment-scroll-button" aria-label="Scroll weapons right" @click="scrollEquipment(weaponSheet,1)">›</button></div></details>
          <details class="review-section review-collapsible review-armor-section" open><summary><h2>Armor &amp; Shield</h2><span>{{ reviewArmor.length + (overflowReviewTrinket ? 1 : 0) }} / 2 protective slots</span></summary><div class="review-collapsible-body"><div class="equipment-scroll-shell"><button type="button" class="equipment-scroll-button" aria-label="Scroll armor left" @click="scrollEquipment(armorSheet,-1)">‹</button><div ref="armorSheet" class="equipment-slot-sheet"><div class="equipment-slot-header armor-slot-grid"><span>Armor / Shield</span><span>Guts</span><span>Mana Syphon</span><span>Stealth</span><span>Might</span><span>Wt.</span></div><div v-for="(slot,index) in armorSlots" :key="`armor-slot-${index}`" class="equipment-slot-row armor-slot-grid"><strong>{{ slot.name }}</strong><span>{{ slot.guts }}</span><span>{{ slot.mana }}</span><span>{{ slot.stealth }}</span><span>{{ slot.might }}</span><span>{{ slot.weight }}</span></div></div><button type="button" class="equipment-scroll-button" aria-label="Scroll armor right" @click="scrollEquipment(armorSheet,1)">›</button></div><div class="trinket-slot-sheet"><h3>Trinket</h3><div class="trinket-slot-row"><span>Trinket Slot</span><strong>{{ dedicatedReviewTrinket?.name || '—' }}</strong><small>{{ dedicatedReviewTrinket?.effect || 'One equipped Trinket can use this slot.' }}</small></div><div v-if="overflowReviewTrinket" class="trinket-slot-row overflow"><span>Armor &amp; Shield Slot</span><strong>{{ overflowReviewTrinket.name }}</strong><small>{{ overflowReviewTrinket.effect }}</small></div></div></div></details>
          <details class="review-section review-collapsible character-sheet-content-section"><summary><h2>Skills</h2></summary><div class="review-collapsible-body"><div class="review-skill-grid"><article v-for="(rank,skill) in skillRanks" :key="skill" class="review-skill-sheet-row"><div><strong>{{ skill }}</strong><small v-if="cultureRankForSkill(skill)" class="cultural-skill-pill">Cultural · {{ cultureSourcesForSkill(skill) }}</small></div><div class="review-skill-values"><strong>Rank {{ rank }}</strong><small>Modifier +{{ skillModifier(rank) }}</small></div></article></div></div></details>
          <details v-if="form.path==='magic'" class="review-section review-collapsible character-sheet-content-section"><summary><h2>Magic</h2></summary><div class="review-collapsible-body"><article class="review-feature-box lore full-rule-entry detail-tone-magic"><strong>Lore of {{ form.loreAttunement||'—' }}</strong><span>{{ loreDescription(form.loreAttunement)||'No Lore selected.' }}</span></article><h3 class="review-subheading">Lore Spells</h3><div class="review-spell-column"><article v-for="spell in reviewLoreSpells" :key="spell" class="spell-detail-card review-spell-detail-card" :class="spellLoreClass(spell)"><div class="spell-detail-head"><div><h2>{{ spell }} <small v-if="spell===signatureSpell" class="custom-content-badge">SIGNATURE</small><small v-if="isCustomSpell(spell)" class="custom-content-badge">CUSTOM</small></h2></div><div class="trait-title-costs"><span v-for="type in abilityTypeKeywords(spellDetail(spell)?.keywords||[])" :key="type" :class="['ability-cost-pill',abilityTypeClass(type)]">{{ type }}</span><span class="mana-badge">{{ spellCostText(spell) }}</span></div></div><p class="rule-flavor">{{ spellDetail(spell)?.flavor }}</p><div v-if="visibleRuleFields(spellDetail(spell)?.rules||'').length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(spellDetail(spell)?.rules||'')" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div class="keyword-pill-row"><span v-for="keyword in cardKeywords(spellDetail(spell)?.keywords||[])" :key="keyword" class="keyword-pill">{{ keyword }}</span></div></article></div><h3 class="review-subheading">Invocation Spells</h3><div class="review-spell-column"><article v-for="spell in reviewInvocationSpells" :key="spell" class="spell-detail-card review-spell-detail-card" :class="spellLoreClass(spell)"><div class="spell-detail-head"><div><h2>{{ spell }} <small v-if="isCustomSpell(spell)" class="custom-content-badge">CUSTOM</small></h2></div><div class="trait-title-costs"><span v-for="type in abilityTypeKeywords(spellDetail(spell)?.keywords||[])" :key="type" :class="['ability-cost-pill',abilityTypeClass(type)]">{{ type }}</span><span class="mana-badge">{{ spellCostText(spell) }}</span></div></div><p class="rule-flavor">{{ spellDetail(spell)?.flavor }}</p><div v-if="visibleRuleFields(spellDetail(spell)?.rules||'').length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(spellDetail(spell)?.rules||'')" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div class="keyword-pill-row"><span v-for="keyword in cardKeywords(spellDetail(spell)?.keywords||[])" :key="keyword" class="keyword-pill">{{ keyword }}</span></div></article><p v-if="!reviewInvocationSpells.length" class="muted">No Invocation Spells selected.</p></div></div></details>
          <details class="review-section review-collapsible character-sheet-content-section"><summary><h2>Talents</h2></summary><div class="review-collapsible-body review-box-list review-talent-column"><article v-for="talent in form.talents.filter(Boolean)" :key="talent" class="review-feature-box talent full-rule-entry detail-tone-talent" :class="talentCardClasses(talent)"><header><strong>{{ canonicalTalentName(talent) }}</strong><small>{{ talentCategory(talent) }}</small></header><p class="rule-flavor"><em>{{ structuredRule(talentText(talent)).intro }}</em></p><div v-if="visibleRuleFields(talentText(talent)).length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(talentText(talent))" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div></article><p v-if="!form.talents.filter(Boolean).length">No Talents selected.</p></div></details>
          <details class="review-section review-collapsible character-sheet-content-section"><summary><h2>Equipment &amp; Gear</h2><span>{{ threadpieceBalanceLabel }} — {{ carriedWeightLabel }}</span></summary><div class="review-collapsible-body"><div v-if="form.equipment.filter(item=>item.category!=='Weapon'&&item.category!=='Armor & Shield').length" class="review-equipment-grid"><article v-for="(item,index) in form.equipment.filter(item=>item.category!=='Weapon'&&item.category!=='Armor & Shield')" :key="`${item.name}-${index}`"><strong>{{ item.name }}<template v-if="equipmentQuantity(item)>1"> ×{{ equipmentQuantity(item) }}</template></strong><small>{{ item.category }} · {{ formatGearCost(item) }}<template v-if="isStackablePurchased(item)"> each</template></small><p v-if="item.detail">{{ item.detail }}</p><p v-if="item.effect">{{ item.effect }}</p><small v-if="item.choice">Choice: {{ item.choice }}</small><small v-if="item.attachedTo">Attached to: {{ item.attachedTo }}</small></article></div><p v-else class="muted">No additional equipment purchased.</p></div></details>
          <div class="review-finish-row"><button type="button" class="secondary-button" @click="back">Back</button><button type="button" class="primary-button review-create-button" :disabled="!canFinish" @click="finishCharacter">Create Character (Finished)</button></div>
        </template>

        <p v-if="error" class="creation-status-message" :class="{saved:error==='Draft saved.'}">{{ error }}</p>
        <div v-if="stepId!=='review'" class="creation-step-actions"><button type="button" class="secondary-button" :disabled="stepIndex===0" @click="back">Back</button><button type="button" class="primary-button" :disabled="stepId==='talents'&&!talentsValid()" @click="next">Continue</button></div>
      </section>

      <section class="creator-bottom-actions"><button type="button" class="secondary-button" @click="saveDraft(false)">Save</button><button type="button" class="secondary-button" @click="saveDraft(true)">Save &amp; Close</button><button type="button" class="danger-button creator-start-over" @click="resetForm">Start Over</button><button type="button" class="secondary-button creator-close-button" @click="closeWithoutSave">Close</button></section>
    </main>

    <div v-if="culturePickerOpen" class="modal-backdrop culture-picker-backdrop" @click.self="culturePickerOpen=false">
      <section ref="cultureDialog" class="modal-card culture-picker-modal" role="dialog" aria-modal="true" aria-label="Choose Culture Traits">
        <div class="modal-head"><div><span class="eyebrow">CULTURE TRAITS</span><h2>Choose Culture Traits</h2><small>{{ form.cultureTraits.length }}/2 selected</small></div><button type="button" class="icon-button" aria-label="Close Culture Trait picker" @click="culturePickerOpen=false">×</button></div>
        <div class="culture-species-tabs" role="tablist"><button v-for="tab in cultureTabs" :key="tab" type="button" :class="{active:cultureTab===tab}" @click="cultureTab=tab">{{ tab }}</button></div><label class="rules-search culture-picker-search"><span aria-hidden="true">⌕</span><input v-model="cultureSearch" type="search" placeholder="Search Culture Traits or Species…" /></label>
        <div class="culture-picker-list">
          <article v-for="trait in filteredCultureTraits" :key="`${trait.species}-${trait.name}`" class="culture-picker-row">
            <div class="culture-picker-row-head"><div><strong>{{ trait.name }} <small v-if="trait.custom" class="custom-content-badge">CUSTOM</small></strong><small>{{ trait.species }}</small></div><div class="culture-picker-row-actions"><span v-if="manaCostFromText(trait.text)!==null" class="mana-badge">{{ manaCostFromText(trait.text) }} Mana</span><button type="button" class="secondary-button compact-action" @click="setCulture(cultureId(trait.species,trait.name),true)">Add</button></div></div>
            <p v-if="structuredRule(trait.text).intro" class="rule-flavor">{{ structuredRule(trait.text).intro }}</p>
            <div v-if="visibleRuleFields(trait.text).length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(trait.text)" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div>
            <div class="keyword-pill-row"><span v-for="keyword in cultureFooterKeywords(trait.keywords,'Cultural',trait.species)" :key="keyword" :class="traitFooterClass(keyword)">{{ canonicalAbilityType(keyword) }}</span></div>
          </article>
        </div>
        <div class="culture-picker-footer"><span>{{ form.cultureTraits.length===2?'Culture Traits ready.':'Choose exactly 2 Culture Traits.' }}</span><button type="button" class="primary-button" :disabled="form.cultureTraits.length!==2" @click="culturePickerOpen=false">Done</button></div>
      </section>
    </div>

    <div v-if="talentPickerOpen" class="modal-backdrop talent-picker-backdrop" @click.self="talentPickerOpen=false">
      <section ref="talentDialog" class="modal-card talent-picker-modal" role="dialog" aria-modal="true" aria-label="Choose a Talent">
        <div class="modal-head"><div><span class="eyebrow">TALENTS</span><h2>Choose Talents</h2><small>{{ form.talents.filter(Boolean).length }} / {{ requiredTalentCount() }} selected</small></div><button type="button" class="icon-button" aria-label="Close Talent picker" @click="talentPickerOpen=false">×</button></div>
        <div class="talent-picker-tabs" role="tablist"><button v-for="tab in talentTabs" :key="tab" type="button" :class="{active:talentTab===tab}" @click="talentTab=tab">{{ tab }}</button></div>
        <label class="rules-search talent-picker-search"><span aria-hidden="true">⌕</span><input v-model="talentSearch" type="search" placeholder="Search Talents…" /></label>
        <div class="talent-picker-list"><article v-for="talent in filteredTalentPicker" :key="talent" class="talent-detail-card talent-picker-card" :class="[...talentCardClasses(talent),{invalid:!talentRequirementMet(talent)}]"><div class="talent-detail-head"><div><small>{{ talentCategory(talent) }}<span v-if="isCustomTalent(talent)" class="custom-content-badge">CUSTOM</span></small><h2>{{ canonicalTalentName(talent) }}</h2></div><div class="talent-head-actions"><span v-for="type in abilityTypeKeywords(talentKeywords(talent))" :key="type" :class="['ability-cost-pill',abilityTypeClass(type)]">{{ type }}</span><span v-if="manaCostFromText(talentText(talent))!==null" class="mana-badge">{{ manaCostFromText(talentText(talent)) }} Mana</span><span v-if="talentRequires(talent)" class="requirement-badge" :class="{invalid:!talentRequirementMet(talent)}">Requires {{ talentRequires(talent) }}</span></div></div><p v-if="structuredRule(talentText(talent)).intro" class="rule-flavor">{{ structuredRule(talentText(talent)).intro }}</p><div v-if="visibleRuleFields(talentText(talent)).length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(talentText(talent))" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div class="talent-picker-action"><button type="button" class="secondary-button" :class="{active:talentSelected(talent)}" :disabled="!talentSelected(talent)&&(form.talents.filter(Boolean).length>=requiredTalentCount()||!talentRequirementMet(talent))" @click="toggleTalentChoice(talent)">{{ talentSelected(talent)?'Selected':'Select' }}</button></div></article></div><div class="talent-picker-footer"><span>{{ form.talents.filter(Boolean).length }} / {{ requiredTalentCount() }} selected</span><button type="button" class="primary-button" :disabled="!talentsValid()" @click="talentPickerOpen=false">Done</button></div>
      </section>
    </div>

    <div v-if="shopOpen" class="modal-backdrop gear-picker-backdrop" @click.self="shopOpen=false"><section ref="gearDialog" class="modal-card gear-shop-modal" role="dialog" aria-modal="true" aria-label="Equipment and Gear"><div class="modal-head"><div><span class="eyebrow">EQUIPMENT &amp; GEAR</span><h2>Equipment &amp; Gear</h2></div><button type="button" class="icon-button" @click="shopOpen=false">×</button></div><div class="gear-tabs" role="tablist"><button v-for="tab in gearTabs" :key="tab" type="button" :class="{active:gearTab===tab}" @click="gearTab=tab">{{ tab }}</button></div><div class="rules-search gear-search"><span aria-hidden="true">⌕</span><input v-model="shopSearch" placeholder="Search equipment…" /></div><div class="gear-shop-list"><article v-for="item in filteredGear" :key="`${item.category}-${item.name}`" class="gear-shop-row"><div class="gear-shop-copy"><div class="gear-shop-title"><strong>{{ item.name }}</strong><small>{{ gearShopSubtitle(item) }}</small></div><p v-if="gearDescription(item)" class="gear-description">{{ gearDescription(item) }}</p><p class="gear-profile">{{ gearDisplayDetail(item) }}</p><div v-if="weaponQualityPills(item).length" class="keyword-pill-row gear-quality-pills"><span v-for="quality in weaponQualityPills(item)" :key="quality" class="keyword-pill">{{ quality }}</span></div><p v-if="gearEffect(item)" class="gear-effect"><strong>Effect:</strong> {{ gearEffect(item) }}</p><p v-if="item.category==='Armor & Shield'&&gearMightRequirement(item)>effectiveAttributes.might" class="gear-requirement-warning">Requires Might {{ gearMightRequirement(item) }}+</p><label v-if="gearChoices(item).length" class="field-label gear-choice-field">Choose {{ item.name }} option<select v-model="gearChoice[item.name]" class="field-control"><option value="">Select Option</option><option v-for="choice in gearChoices(item)" :key="choice" :value="choice">{{ choice }}</option></select></label></div><button type="button" class="secondary-button compact-action" :disabled="!canAddEquipment(item)" @click="addEquipment(item)">Add</button></article></div></section></div>
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
.winds-magic-panel{border-left-color:#6e4c94!important;border-right:5px solid #6e4c94!important}.mana-stat-line{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:9px}.mana-stat-line>div{display:grid;grid-template-columns:1fr auto;gap:3px 8px;padding:8px 9px;border:1px solid var(--line);border-radius:7px;background:var(--paper)}.mana-stat-line>div>span{font-weight:850}.mana-stat-line>div>b{font-size:calc(15px + var(--font-offset));color:var(--accent-dark)}.mana-stat-line>div>small{grid-column:1/-1;color:var(--ink-soft);line-height:1.3}.mana-trait-note{font-size:calc(10px + var(--font-offset))}
.talent-slot-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.path-attribute-choice-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:7px}.path-attribute-choice{display:grid;gap:3px;min-width:0;padding:10px 8px;border:1px solid var(--line-dark);border-left:5px solid var(--accent);border-radius:9px;background:var(--paper);color:var(--ink);text-align:left;cursor:pointer}.path-attribute-choice.selected{border-color:var(--accent);background:var(--accent-wash)}.path-attribute-choice:disabled{opacity:.48;cursor:not-allowed}.path-attribute-choice span,.path-attribute-choice small{color:var(--ink-soft)}.talent-slot-button{display:grid;gap:3px;padding:11px 12px;border:1px solid var(--line-dark);border-top:5px solid var(--rule-tone,var(--detail-talent,#a67913));border-radius:9px;background:var(--paper);color:var(--ink);text-align:left}.talent-slot-button span,.talent-slot-button small{color:var(--ink-soft)}
.talent-picker-modal{width:min(780px,calc(100% - 24px));max-height:86vh;display:grid;grid-template-rows:auto auto auto minmax(0,1fr);overflow:hidden}.talent-picker-list{display:grid;gap:9px;overflow:auto;min-height:0;padding:1px 2px}.talent-picker-action{display:flex;justify-content:flex-end;margin-top:8px}
.wealth-balance-field{display:grid;gap:5px;margin-top:10px;padding:10px 12px;border:1px solid var(--line);border-radius:9px;background:var(--paper)}.wealth-balance-field>strong{font-size:calc(18px + var(--font-offset))}.wealth-balance-field>strong small{font-size:.65em;color:var(--ink-soft)}.wealth-equivalents{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px}.wealth-equivalents span{padding:5px;border-radius:6px;background:var(--paper-2);text-align:center;font-size:calc(9px + var(--font-offset));font-weight:800}.attachment-control{display:grid;gap:3px;font-size:calc(9px + var(--font-offset));font-weight:750}
.language-card{min-height:155px;padding:14px!important}.language-card p{margin:3px 0;color:var(--ink-soft);line-height:1.55}
.review-secondary-cards{grid-template-columns:repeat(4,minmax(0,1fr))}.character-detail-body{display:grid;gap:10px;min-width:0}.character-detail-body .review-summary-grid{margin-top:0}.review-collapsible{padding:0!important;overflow:hidden;min-width:0;max-width:100%}.review-collapsible>summary{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:11px 12px;cursor:pointer;background:var(--paper-2)}.review-collapsible>summary h2{margin:0}.review-collapsible>summary span{color:var(--ink-soft)}.review-collapsible-body{padding:10px 12px;border-top:1px solid var(--line)}.review-collapsible-body p{margin:5px 0}
.creation-example{border-left:4px solid #b06c27!important;border-right:4px solid #b06c27!important;background:color-mix(in srgb,#dca96f 18%,var(--paper-2))!important}
@media(max-width:680px){.mana-stat-line,.talent-slot-grid,.review-secondary-cards{grid-template-columns:1fr 1fr}.path-attribute-choice-grid{grid-template-columns:1fr 1fr}.talent-picker-modal{width:100%;max-height:92vh;border-radius:14px 14px 0 0}.talent-picker-backdrop{align-items:flex-end}.wealth-equivalents{grid-template-columns:1fr 1fr}}

.homeland-skill-copy{display:grid;gap:5px;margin-top:9px;padding-top:8px;border-top:1px solid var(--line);color:var(--ink-soft)}.homeland-skill-copy>strong,.homeland-skill-copy small strong{color:var(--ink)}.talent-head-actions{display:flex;align-items:center;justify-content:flex-end;gap:6px;flex-wrap:wrap}

.custom-data-toggle{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:50px;padding:7px 9px;border:1px solid var(--line);border-radius:8px;background:var(--paper-2)}.custom-data-toggle>span:first-child{display:grid;gap:2px}.custom-data-toggle small{color:var(--ink-soft);font-size:calc(8.5px + var(--font-offset))}.campaign-custom-stack{display:grid;gap:6px}.custom-content-badge{display:inline-flex!important;align-items:center!important;margin-left:5px;padding:2px 5px!important;border:1px solid #7b4f8d!important;border-radius:999px!important;background:#efe5f4!important;color:#60336f!important;font-family:Inter,ui-sans-serif,system-ui,sans-serif!important;font-size:8px!important;font-weight:900!important;letter-spacing:.06em!important;vertical-align:middle}.creator-name-campaign-grid{align-items:end}

/* Canonical creator structures. */
.attribute-sheet-row{--attribute-tone:#a06b2c;grid-template-columns:minmax(0,1fr) minmax(220px,.72fr)!important;align-items:start!important}.attribute-sheet-row.attribute-agility{--attribute-tone:#46779a}.attribute-sheet-row.attribute-might{--attribute-tone:#9b543e}.attribute-sheet-row.attribute-hide{--attribute-tone:#527934}.attribute-sheet-row.attribute-lore{--attribute-tone:#6d5293}.attribute-sheet-row.attribute-bravery{--attribute-tone:#a06b2c}.attribute-sheet-copy{gap:7px}.attribute-sheet-secondary{margin-top:3px}.attribute-sheet-secondary>span,.attribute-stat-box{display:grid!important;align-items:center;gap:8px;min-height:44px;padding:7px 9px!important;border:1px solid var(--line)!important;border-left:4px solid var(--attribute-tone)!important;border-radius:7px!important;background:var(--paper-2)!important}.attribute-sheet-secondary>span{grid-template-columns:1fr auto;text-align:left!important;flex:0 1 120px}.attribute-stat-box{grid-template-columns:1fr!important;justify-items:center!important;text-align:center!important}.attribute-sheet-secondary>span b,.attribute-stat-box b{font-size:calc(13px + var(--font-offset))!important;line-height:1!important}.attribute-sheet-secondary>span .speed-formula{font-size:calc(12px + var(--font-offset))!important;white-space:nowrap}.attribute-sheet-secondary>span small{font-size:calc(8px + var(--font-offset))!important;color:var(--ink-soft)}.attribute-stat-box>span{color:var(--ink);font-weight:850}.attribute-rank-stack{align-self:center}.attribute-rank-mod-row{margin-bottom:7px}.attribute-rank-stepper{margin-inline:auto}.attribute-rank-stepper>span{min-width:34px;text-align:center}.skill-source-pills{display:flex;align-items:center;gap:4px;flex-wrap:wrap}.homeland-skill-pill{display:inline-flex;padding:2px 6px;border:1px solid var(--accent);border-radius:999px;background:var(--accent-wash);color:var(--accent-dark);font-size:calc(8px + var(--font-offset));font-weight:850}.currency-grid-four{grid-template-columns:repeat(4,minmax(0,1fr))!important}.starting-equipment-parent .starting-equipment-panel{margin-top:10px}.equipment-quantity-control{display:grid;grid-template-columns:34px 34px 34px;align-items:center;justify-content:end;gap:4px}.equipment-quantity-control strong{text-align:center}.equipment-quantity-control .compact-action{min-width:34px;padding-inline:0}.purchased-gear-list .list-row{align-items:center}.purchased-gear-actions{display:flex;align-items:center;gap:5px;justify-content:flex-end}.purchased-gear-actions .active{border-color:var(--accent);background:var(--accent-wash)}
@media(max-width:680px){.attribute-sheet-row{grid-template-columns:1fr!important}.attribute-rank-stack{width:100%;min-width:0!important}.currency-grid-four{grid-template-columns:repeat(2,minmax(0,1fr))!important}.purchased-gear-list .list-row{align-items:stretch}.equipment-quantity-control{justify-content:start}.purchased-gear-actions{justify-content:flex-start}}


/* Beta 0.33 creator refinements. */
.attribute-sheet-secondary>span{font-size:calc(9px + var(--font-offset))}.agility-modifier-box b,.speed-formula .agility-modifier-accent{color:var(--danger)!important}.character-sheet-content-section>.review-collapsible-body{padding-top:16px!important}
.attribute-stat-box>span{font-size:calc(9px + var(--font-offset))}
.bonus-language-pill-row{margin-bottom:7px}
.review-lock-label{display:flex;align-items:center;gap:6px}.review-lock-toggle{text-decoration:none!important;margin:0!important;padding:0!important}
.review-spell-column,.review-talent-column{display:grid!important;grid-template-columns:1fr!important;gap:10px!important}
.review-spell-detail-card{width:100%;box-sizing:border-box}
</style>
