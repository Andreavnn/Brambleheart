import { BUILD, type AttributeId } from '../data/bramble'
import { gearShopItems as legacyGearShopItems } from '../data/characterOptions'
import { canonicalTalentName } from '../data/talentCategories'
import type { EquipmentStatBonuses } from '../data/equipment'
import { STARTING_WEALTH_WP, canonicalGearCostWp, canonicalGearName, economyGearCatalog, isTrinketGear, protectiveGearKind } from '../rules/economy'
import { WP_PER_NP, WP_PER_SP } from '../rules/threadpieces'
import { isArcaneFocusName } from '../rules/magicRules'
import { readLocalStorage, STORAGE_KEYS, writeLocalStorage, type StorageWriteResult } from './storage'

export type AttributeRanks = Record<AttributeId, number>
export type CharacterStatus = 'incomplete'|'unapproved'|'approved'
export interface PurchasedEquipment {
  name:string
  /** Current retail value in the canonical runtime monetary unit. */
  costWp?:number
  /** Historical amount paid. Never used as current retail-price authority. */
  costPaidWp?:number
  /** Legacy compatibility fields. Runtime logic must use costWp/canonicalGearCostWp. */
  costSp:number
  costNp?:number
  category?:string
  detail?:string
  effect?:string
  choice?:string
  attachedTo?:string
  quantity?:number
  statBonuses?:EquipmentStatBonuses
  /** Used by protective gear and Trinkets. */
  equipped?:boolean
  /** A Trinket normally uses the dedicated slot; one optional second Trinket may use an Armor & Shield slot. */
  trinketSlot?:'trinket'|'armor'
  /** Used only by Arcane Focus gear. At most one equipped focus may be active. */
  activeArcaneFocus?:boolean
}
export interface CharacterRecord {
  id:string
  name:string
  pronunciation?:string
  campaignName?:string
  allowCustomData?:boolean
  age?:string
  appearance?:string
  pronouns?:string
  kinship?:string
  species:string
  cultureTraits?:string[]
  cultureSkillChoices?:Record<string,string>
  spark:string
  homeland:string
  homelandDetail?:string
  skills?:string[]
  skillRanks?:Record<string,number>
  faith:string
  oath:string
  path:'magic'|'talents'|'skills'|'attribute'
  /** Creation-only bonus selections for the nonmagical Body & Spirit paths. */
  pathSkills?:string[]
  pathAttributeBonus?:AttributeId
  talents?:string[]
  loreAttunement?:string
  spells?:string[]
  invocationSpell?:string
  invocationSpells?:string[]
  languages?:string[]
  equipment?:PurchasedEquipment[]
  adventureKit?:boolean
  /** Canonical economy fields. Whole wp are the only runtime monetary authority. */
  startingWealthWp?:number
  wealthWp?:number
  currencyAddedWp?:number
  /** Legacy compatibility fields, normalized from the wp values above. */
  startingWealth?:number
  wealthRemaining?:number
  wealthCurrency?:'NP'|'SP'
  currencyAddedNp?:number
  /** Free-form treasure entries acquired after character creation. */
  treasure?:string[]
  attributes:AttributeRanks
  pinned?:boolean
  /** Manual local safety lock. Approval is tracked separately by status. */
  locked?:boolean
  status?:CharacterStatus
  experience?:number
  magicLevel?:number
  draft?:boolean
  creationStep?:string
  /** True once the character has completed the full creation flow. Later edits do not unset it. */
  creationComplete?:boolean
  createdAt:string
  updatedAt?:string
}

export const CHARACTER_STORE=STORAGE_KEYS.characters
const economyGearItems=economyGearCatalog(legacyGearShopItems)
const validStatuses=new Set<CharacterStatus>(['incomplete','unapproved','approved'])
const wholeWp=(value:unknown)=>Math.max(0,Math.floor(Number(value)||0))

export function characterCreationComplete(record:Pick<CharacterRecord,'creationComplete'|'status'|'draft'|'locked'>){
  if(typeof record.creationComplete==='boolean')return record.creationComplete
  if(record.status&&validStatuses.has(record.status))return record.status!=='incomplete'
  if(record.draft)return false
  return true
}
export function characterStatus(record:Pick<CharacterRecord,'creationComplete'|'status'|'draft'|'locked'>):CharacterStatus{
  if(!characterCreationComplete(record))return'incomplete'
  if(record.status==='approved')return'approved'
  if(record.status==='unapproved')return'unapproved'
  return record.locked?'approved':'unapproved'
}

function legacyPaidWp(item:PurchasedEquipment,currentCostWp:number){
  if(Number.isFinite(Number(item.costPaidWp)))return wholeWp(item.costPaidWp)
  if(Number.isFinite(Number(item.costNp)))return wholeWp(Number(item.costNp)*WP_PER_NP)
  if(Number.isFinite(Number(item.costSp)))return wholeWp(Number(item.costSp)*WP_PER_SP)
  return currentCostWp
}
function normalizeEquipment(items:PurchasedEquipment[]|undefined){
  const normalized=(items||[]).map(item=>{
    const name=canonicalGearName(item.name)
    const source=economyGearItems.find(candidate=>candidate.name===name&&candidate.category===item.category)
      ||economyGearItems.find(candidate=>candidate.name===name)
    const category=source?.category??(isTrinketGear({name,category:item.category})?'Trinket':item.category)
    const currentCostWp=source?.costWp??canonicalGearCostWp({...item,name})
    const statBonuses=source?.statBonuses??item.statBonuses
    const effect=source?.effect??item.effect
    return{
      ...item,
      name,
      category,
      detail:source?.detail??item.detail,
      costWp:currentCostWp,
      costPaidWp:legacyPaidWp(item,currentCostWp),
      // Compatibility only. These are derived from costWp and are never read as price authority.
      costSp:currentCostWp/WP_PER_SP,
      costNp:currentCostWp/WP_PER_NP,
      effect,
      quantity:Math.max(1,Math.floor(Number(item.quantity)||1)),
      statBonuses,
    }
  })
  for(const kind of ['armor','shield'] as const){
    const indexes=normalized.map((item,index)=>protectiveGearKind(item)===kind?index:-1).filter(index=>index>=0)
    if(!indexes.length)continue
    const hasExplicit=indexes.some(index=>typeof normalized[index].equipped==='boolean')
    const chosen=indexes.find(index=>normalized[index].equipped===true)??(!hasExplicit?indexes[0]:-1)
    for(const index of indexes)normalized[index].equipped=index===chosen
  }

  const trinketIndexes=normalized.map((item,index)=>isTrinketGear(item)?index:-1).filter(index=>index>=0)
  if(trinketIndexes.length){
    const hasExplicit=trinketIndexes.some(index=>typeof normalized[index].equipped==='boolean'||Boolean(normalized[index].trinketSlot))
    const preferred=trinketIndexes.find(index=>normalized[index].equipped===true&&normalized[index].trinketSlot!=='armor')
      ??trinketIndexes.find(index=>normalized[index].activeArcaneFocus===true)
      ??(!hasExplicit?trinketIndexes[0]:-1)
    for(const index of trinketIndexes){
      if(index===preferred){normalized[index].equipped=true;normalized[index].trinketSlot='trinket'}
      else if(normalized[index].trinketSlot!=='armor')normalized[index].equipped=false
    }
    const protectiveUsed=normalized.filter(item=>item.category==='Armor & Shield'&&item.equipped===true).length
    const overflow=protectiveUsed<2?trinketIndexes.find(index=>index!==preferred&&normalized[index].equipped===true&&normalized[index].trinketSlot==='armor'):-1
    for(const index of trinketIndexes){
      if(index===overflow){normalized[index].equipped=true;normalized[index].trinketSlot='armor'}
      else if(index!==preferred&&normalized[index].trinketSlot==='armor'){normalized[index].equipped=false;delete normalized[index].trinketSlot}
    }
  }

  const focusIndexes=normalized.map((item,index)=>isArcaneFocusName(item.name)&&item.equipped===true?index:-1).filter(index=>index>=0)
  for(const item of normalized)if(isArcaneFocusName(item.name)&&item.equipped!==true)item.activeArcaneFocus=false
  if(focusIndexes.length){
    const chosen=focusIndexes.find(index=>normalized[index].activeArcaneFocus===true)??focusIndexes[0]
    for(const index of focusIndexes)normalized[index].activeArcaneFocus=index===chosen
  }
  return normalized
}

function legacyMoneyWp(record:CharacterRecord,key:'starting'|'remaining'|'added'){
  if(key==='starting'&&Number.isFinite(Number(record.startingWealth)))return wholeWp(Number(record.startingWealth)*(record.wealthCurrency==='SP'?WP_PER_SP:WP_PER_NP))
  if(key==='remaining'&&Number.isFinite(Number(record.wealthRemaining)))return wholeWp(Number(record.wealthRemaining)*(record.wealthCurrency==='SP'?WP_PER_SP:WP_PER_NP))
  if(key==='added'&&Number.isFinite(Number(record.currencyAddedNp)))return wholeWp(Number(record.currencyAddedNp)*WP_PER_NP)
  return undefined
}
export function characterWealthWp(record:Pick<CharacterRecord,'wealthWp'|'wealthRemaining'|'wealthCurrency'>){
  if(Number.isFinite(Number(record.wealthWp)))return wholeWp(record.wealthWp)
  if(Number.isFinite(Number(record.wealthRemaining)))return wholeWp(Number(record.wealthRemaining)*(record.wealthCurrency==='SP'?WP_PER_SP:WP_PER_NP))
  return 0
}
export function currentEquipmentRetailWp(item:PurchasedEquipment){return canonicalGearCostWp(item)}
function protectiveSlotUse(items:PurchasedEquipment[]|undefined){return (items||[]).filter(item=>item.category==='Armor & Shield'&&item.equipped===true).length+(items||[]).filter(item=>isTrinketGear(item)&&item.equipped===true&&item.trinketSlot==='armor').length}
export function canEquipProtectiveEquipment(items:PurchasedEquipment[]|undefined,index:number){
  const list=items||[];const target=list[index];if(!target||!protectiveGearKind(target))return false
  if(target.equipped===true)return true
  const kind=protectiveGearKind(target)
  const sameKindAlready=list.some((item,itemIndex)=>itemIndex!==index&&protectiveGearKind(item)===kind&&item.equipped===true)
  return protectiveSlotUse(list)-(sameKindAlready?1:0)<2
}
export function setProtectiveEquipmentEquipped(items:PurchasedEquipment[]|undefined,index:number,equipped=true){
  const next=(items||[]).map(item=>({...item}))
  const target=next[index];if(!target)return next
  const kind=protectiveGearKind(target);if(!kind)return next
  if(!equipped){target.equipped=false;return next}
  for(const item of next)if(item!==target&&protectiveGearKind(item)===kind)item.equipped=false
  if(protectiveSlotUse(next)>=2&&target.equipped!==true)return next
  target.equipped=true
  return next
}
export function canEquipTrinketInArmorSlot(items:PurchasedEquipment[]|undefined,index:number){
  const list=items||[];const target=list[index];if(!target||!isTrinketGear(target))return false
  if(target.equipped===true&&target.trinketSlot==='armor')return true
  return protectiveSlotUse(list)<2
}
export function setTrinketEquipmentEquipped(items:PurchasedEquipment[]|undefined,index:number,slot:'trinket'|'armor'|null){
  const next=(items||[]).map(item=>({...item}))
  const target=next[index];if(!target||!isTrinketGear(target))return next
  if(slot===null){target.equipped=false;delete target.trinketSlot;if(isArcaneFocusName(target.name))target.activeArcaneFocus=false;return next}
  if(slot==='armor'&&!canEquipTrinketInArmorSlot(next,index))return next
  for(const item of next){
    if(item===target||!isTrinketGear(item))continue
    if((item.trinketSlot||'trinket')===slot&&item.equipped===true){item.equipped=false;delete item.trinketSlot;if(isArcaneFocusName(item.name))item.activeArcaneFocus=false}
  }
  target.equipped=true;target.trinketSlot=slot
  return next
}

export function setActiveArcaneFocus(items:PurchasedEquipment[]|undefined,index:number,active=true){
  const next=(items||[]).map(item=>({...item}))
  const target=next[index];if(!target||!isArcaneFocusName(target.name)||target.equipped!==true)return next
  for(const item of next)if(isArcaneFocusName(item.name))item.activeArcaneFocus=false
  target.activeArcaneFocus=active
  return next
}

export function normalizeCharacterRecord(record:CharacterRecord):CharacterRecord{
  const creationComplete=characterCreationComplete(record)
  const status=characterStatus({...record,creationComplete})
  const equipment=normalizeEquipment(record.equipment)
  const startingWealthWp=Number.isFinite(Number(record.startingWealthWp))?wholeWp(record.startingWealthWp):(legacyMoneyWp(record,'starting')??STARTING_WEALTH_WP)
  // Preserve the saved wallet snapshot during migration. New retail prices never retroactively charge a character.
  const wealthWp=Number.isFinite(Number(record.wealthWp))?wholeWp(record.wealthWp):(legacyMoneyWp(record,'remaining')??startingWealthWp)
  const currencyAddedWp=Number.isFinite(Number(record.currencyAddedWp))?wholeWp(record.currencyAddedWp):(legacyMoneyWp(record,'added')??0)
  return{
    ...record,
    equipment,
    talents:Array.from(new Set((record.talents||[]).map(canonicalTalentName))),
    startingWealthWp,
    wealthWp,
    currencyAddedWp,
    // Compatibility fields are generated from canonical wp values.
    startingWealth:startingWealthWp/WP_PER_NP,
    wealthRemaining:wealthWp/WP_PER_NP,
    wealthCurrency:'NP',
    currencyAddedNp:currencyAddedWp/WP_PER_NP,
    creationComplete,
    status,
    draft:!creationComplete,
    locked:Boolean(record.locked),
  }
}
export function normalizeImportedCharacter(raw:unknown):CharacterRecord{
  if(!raw||typeof raw!=='object')throw new Error('Invalid Brambleheart character data.')
  const source=raw as Partial<CharacterRecord>
  if(!source.name||!source.attributes)throw new Error('Invalid Brambleheart character data.')
  const now=new Date().toISOString()
  return normalizeCharacterRecord({...source,id:crypto.randomUUID(),name:String(source.name),attributes:source.attributes,createdAt:now,updatedAt:now,pinned:Boolean(source.pinned)} as CharacterRecord)
}
function plainCharacters(characters:CharacterRecord[]):CharacterRecord[]{
  return (JSON.parse(JSON.stringify(characters)) as CharacterRecord[]).map(normalizeCharacterRecord)
}
export function loadCharacters():CharacterRecord[]{
  try{
    const parsed=JSON.parse(readLocalStorage(CHARACTER_STORE)||'[]')
    if(!Array.isArray(parsed))return[]
    const normalized=(parsed as CharacterRecord[]).map(normalizeCharacterRecord)
    if(JSON.stringify(parsed)!==JSON.stringify(normalized))writeLocalStorage(CHARACTER_STORE,JSON.stringify(normalized))
    return normalized
  }catch{return[]}
}
export function writeCharacters(characters:CharacterRecord[]):StorageWriteResult{return writeLocalStorage(CHARACTER_STORE,JSON.stringify(plainCharacters(characters)))}
export function upsertCharacter(record:CharacterRecord):StorageWriteResult{
  const list=loadCharacters();const index=list.findIndex(item=>item.id===record.id)
  const normalized=normalizeCharacterRecord(record)
  if(index>=0)list[index]=normalized;else list.unshift(normalized)
  return writeCharacters(list)
}
export function setCharacterApproval(id:string,approved:boolean):StorageWriteResult{
  const list=loadCharacters();const index=list.findIndex(item=>item.id===id)
  if(index<0)return{ok:false,message:'That character could not be found on this device.'}
  if(characterStatus(list[index])==='incomplete')return{ok:false,message:'Finish this character before approving it.'}
  list[index]={...list[index],creationComplete:true,status:approved?'approved':'unapproved',draft:false,updatedAt:new Date().toISOString()}
  return writeCharacters(list)
}
export function characterExportPayload(character:CharacterRecord){return{format:'brambleheart-character',version:BUILD,character}}
export function downloadJson(filename:string,value:unknown){
  const blob=new Blob([JSON.stringify(value,null,2)],{type:'application/json'})
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)
}
