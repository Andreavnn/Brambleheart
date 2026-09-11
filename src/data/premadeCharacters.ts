import { gearShopItems } from './characterOptions'
import type { CharacterRecord, PurchasedEquipment } from '../services/characters'

function purchasedEquipment(name:string):PurchasedEquipment{
  const item=gearShopItems.find(entry=>entry.name===name)
  if(!item)throw new Error(`Missing canonical premade equipment: ${name}`)
  return{
    name:item.name,
    costWp:item.costWp,
    costPaidWp:item.costWp,
    costSp:item.costSp,
    category:item.category,
    detail:item.detail,
    effect:item.effect,
    statBonuses:item.statBonuses,
    equipped:item.category==='Armor & Shield'||item.category==='Trinket'?true:undefined,
  }
}

/** Built-in editable examples are seeded once per browser profile, then behave like ordinary user characters. */
export const premadeCharacters:ReadonlyArray<CharacterRecord>=[
  {
    id:'premade-selu',
    name:'Selu of the Wandering Reeds',
    campaignName:'Verdant Secrets',
    species:'Axalori',
    cultureTraits:['Tranquil Discipline (Axalori)','Resonant Pulse (Axalori)'],
    cultureSkillChoices:{},
    spark:'Healer',
    homeland:'Sea of Roots',
    homelandDetail:'A vast wetland of mangrove villages, drifting reed platforms, and moss-kissed shrines where patience, observation, and living gently with the land shape daily life.',
    skills:['Herbalry','Wayfinding'],
    skillRanks:{Herbalry:2,Wayfinding:1,Lorekeeping:1},
    faith:'The Dreamtide',
    oath:'Mercy',
    path:'magic',
    talents:['Hearth Touch'],
    loreAttunement:'Harmony',
    spells:['Ballad Of The Courageous','Chant Of Resilience'],
    invocationSpells:['Soothing Bloom','Mendcraft'],
    languages:['Antheric','Commonspeak','Corakish'],
    equipment:[
      purchasedEquipment('Leafstitch'),
      purchasedEquipment('Oak Staff (Quarterstaff)'),
      purchasedEquipment('Driftwood Charm'),
      purchasedEquipment('Herbalist'),
      {...purchasedEquipment('Scriptweave Book'),attachedTo:'Ballad Of The Courageous'},
    ],
    adventureKit:true,
    startingWealthWp:1500,
    wealthWp:250,
    currencyAddedWp:0,
    attributes:{agility:2,might:1,hide:1,lore:3,bravery:3},
    status:'approved',
    draft:false,
    creationComplete:true,
    locked:false,
    pinned:false,
    magicLevel:1,
    currentHealth:30,
    exampleCharacter:true,
    createdAt:'2026-09-11T12:00:00.000Z',
    updatedAt:'2026-09-11T12:00:00.000Z',
  },
]
