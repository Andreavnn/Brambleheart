import { BUILD, type AttributeId } from '../data/bramble'
import { gearShopItems as legacyGearShopItems } from '../data/characterOptions'
import { canonicalTalentName } from '../data/talentCategories'
import type { EquipmentStatBonuses } from '../data/equipment'
import { STARTING_WEALTH_WP, canonicalGearCostWp, canonicalGearName, economyGearCatalog, isTrinketGear, protectiveGearKind } from '../rules/economy'
import { WP_PER_NP, WP_PER_SP } from '../rules/threadpieces'
import { readLocalStorage, STORAGE_KEYS, writeLocalStorage, type StorageWriteResult } from './storage'

export type AttributeRanks=Record<AttributeId,number>
export type CharacterStatus='incomplete'|'unapproved'|'approved'
export interface PurchasedEquipment{name:string;costWp?:number;costPaidWp?:number;costSp:number;costNp?:number;category?:string;detail?:string;effect?:string;choice?:string;attachedTo?:string;quantity?:number;statBonuses?:EquipmentStatBonuses;equipped?:boolean}
export interface CharacterRecord{id:string;name:string;pronunciation?:string;campaignName?:string;allowCustomData?:boolean;age?:string;appearance?:string;pronouns?:string;kinship?:string;species:string;cultureTraits?:string[];cultureSkillChoices?:Record<string,string>;spark:string;homeland:string;homelandDetail?:string;skills?:string[];skillRanks?:Record<string,number>;faith:string;oath:string;path:'magic'|'talents'|'skills'|'attribute';pathSkills?:string[];pathAttributeBonus?:AttributeId;talents?:string[];loreAttunement?:string;spells?:string[];invocationSpell?:string;invocationSpells?:string[];languages?:string[];equipment?:PurchasedEquipment[];adventureKit?:boolean;startingWealthWp?:number;wealthWp?:number;currencyAddedWp?:number;startingWealth?:number;wealthRemaining?:number;wealthCurrency?:'NP'|'SP';currencyAddedNp?:number;treasure?:string[];attributes:AttributeRanks;pinned?:boolean;locked?:boolean;status?:CharacterStatus;experience?:number;magicLevel?:number;draft?:boolean;creationStep?:string;creationComplete?:boolean;createdAt:string;updatedAt?:string}

export const CHARACTER_STORE=STORAGE_KEYS.characters
const economyGearItems=economyGearCatalog(legacyGearShopItems)
const validStatuses=new Set<CharacterStatus>(['incomplete','unapproved','approved'])
const wholeWp=(value:unknown)=>Math.max(0,Math.floor(Number(value)||0))
const skillAliases:Readonly<Record<string,string>>={Whisperstep:'Whisperster',Tradecraft:'Tradeskill',Beastcraft:'Bondcraft'}
function canonicalSavedSkill(value:string){const source=String(value||'').replace(/^Crafting\s*\(Blacksmithing\)$/i,'Tradeskill (Blacksmithing)').trim();return skillAliases[source]||source}
function canonicalEquipmentDetail(value:string|undefined){return String(value||'').replace(/\bStealth Condition\b/gi,'Armor Penalty').replace(/\bStealth Penalty\b/gi,'Armor Penalty')}

export function characterCreationComplete(record:Pick<CharacterRecord,'creationComplete'|'status'|'draft'|'locked'>){if(typeof record.creationComplete==='boolean')return record.creationComplete;if(record.status&&validStatuses.has(record.status))return record.status!=='incomplete';if(record.draft)return false;return true}
export function characterStatus(record:Pick<CharacterRecord,'creationComplete'|'status'|'draft'|'locked'>):CharacterStatus{if(!characterCreationComplete(record))return'incomplete';if(record.status==='approved')return'approved';if(record.status==='unapproved')return'unapproved';return record.locked?'approved':'unapproved'}
function legacyPaidWp(item:Pick<PurchasedEquipment,'costPaidWp'|'costNp'|'costSp'>,currentCostWp:number){if(Number.isFinite(Number(item.costPaidWp)))return wholeWp(item.costPaidWp);if(Number.isFinite(Number(item.costNp)))return wholeWp(Number(item.costNp)*WP_PER_NP);if(Number.isFinite(Number(item.costSp)))return wholeWp(Number(item.costSp)*WP_PER_SP);return currentCostWp}

/** Canonical trinket equipment authority. Owned trinkets use only a simple equipped state. */
export function normalizeTrinketEquipment(items:PurchasedEquipment[]|undefined):PurchasedEquipment[]{
  return(items||[]).map(item=>isTrinketGear(item)?{...item,equipped:item.equipped!==false}:{...item})
}

function normalizeEquipment(items:PurchasedEquipment[]|undefined){
  let normalized=(items||[]).map(raw=>{
    const item=raw as PurchasedEquipment&{trinketSlot?:'primary'|'secondary'|'trinket'|'shield'|'armor';activeArcaneFocus?:boolean}
    const name=canonicalGearName(item.name)
    const source=economyGearItems.find(candidate=>candidate.name===name&&candidate.category===item.category)||economyGearItems.find(candidate=>candidate.name===name)
    const category=source?.category??(isTrinketGear({name,category:item.category})?'Trinket':item.category)
    const currentCostWp=source?.costWp??canonicalGearCostWp({...item,name})
    const canonical={...item};delete canonical.trinketSlot;delete canonical.activeArcaneFocus
    const base={...canonical,name,category,detail:canonicalEquipmentDetail(source?.detail??item.detail),costWp:currentCostWp,costPaidWp:legacyPaidWp(item,currentCostWp),costSp:currentCostWp/WP_PER_SP,costNp:currentCostWp/WP_PER_NP,effect:source?.effect??item.effect,quantity:Math.max(1,Math.floor(Number(item.quantity)||1)),statBonuses:source?.statBonuses??item.statBonuses} as PurchasedEquipment
    if(category==='Trinket')base.equipped=item.equipped!==false
    return base
  }) as PurchasedEquipment[]
  for(const kind of ['armor','shield'] as const){const indexes=normalized.map((item,index)=>protectiveGearKind(item)===kind?index:-1).filter(index=>index>=0);if(!indexes.length)continue;const hasExplicit=indexes.some(index=>typeof normalized[index].equipped==='boolean');const chosen=indexes.find(index=>normalized[index].equipped===true)??(!hasExplicit?indexes[0]:-1);for(const index of indexes)normalized[index].equipped=index===chosen}
  return normalizeTrinketEquipment(normalized)
}

function legacyMoneyWp(record:CharacterRecord,key:'starting'|'remaining'|'added'){if(key==='starting'&&Number.isFinite(Number(record.startingWealth)))return wholeWp(Number(record.startingWealth)*(record.wealthCurrency==='SP'?WP_PER_SP:WP_PER_NP));if(key==='remaining'&&Number.isFinite(Number(record.wealthRemaining)))return wholeWp(Number(record.wealthRemaining)*(record.wealthCurrency==='SP'?WP_PER_SP:WP_PER_NP));if(key==='added'&&Number.isFinite(Number(record.currencyAddedNp)))return wholeWp(Number(record.currencyAddedNp)*WP_PER_NP);return undefined}
export function characterWealthWp(record:Pick<CharacterRecord,'wealthWp'|'wealthRemaining'|'wealthCurrency'>){if(Number.isFinite(Number(record.wealthWp)))return wholeWp(record.wealthWp);if(Number.isFinite(Number(record.wealthRemaining)))return wholeWp(Number(record.wealthRemaining)*(record.wealthCurrency==='SP'?WP_PER_SP:WP_PER_NP));return 0}
export function currentEquipmentRetailWp(item:PurchasedEquipment){return canonicalGearCostWp(item)}
export function canEquipProtectiveEquipment(items:PurchasedEquipment[]|undefined,index:number){const target=(items||[])[index];return Boolean(target&&protectiveGearKind(target))}
export function setProtectiveEquipmentEquipped(items:PurchasedEquipment[]|undefined,index:number,equipped=true){const next=(items||[]).map(item=>({...item}));const target=next[index];if(!target)return next;const kind=protectiveGearKind(target);if(!kind)return next;if(!equipped){target.equipped=false;return next}for(const item of next)if(item!==target&&protectiveGearKind(item)===kind)item.equipped=false;target.equipped=true;return next}
/** Equip or unequip a passive Trinket. */
export function setTrinketEquipmentEquipped(items:PurchasedEquipment[]|undefined,index:number,equipped=true){const next=normalizeTrinketEquipment(items);const target=next[index];if(!target||!isTrinketGear(target))return next;target.equipped=equipped;return next}

export function normalizeCharacterRecord(record:CharacterRecord):CharacterRecord{
  const creationComplete=characterCreationComplete(record),status=characterStatus({...record,creationComplete}),equipment=normalizeEquipment(record.equipment)
  const startingWealthWp=Number.isFinite(Number(record.startingWealthWp))?wholeWp(record.startingWealthWp):(legacyMoneyWp(record,'starting')??STARTING_WEALTH_WP)
  const wealthWp=Number.isFinite(Number(record.wealthWp))?wholeWp(record.wealthWp):(legacyMoneyWp(record,'remaining')??startingWealthWp)
  const currencyAddedWp=Number.isFinite(Number(record.currencyAddedWp))?wholeWp(record.currencyAddedWp):(legacyMoneyWp(record,'added')??0)
  const skills=(record.skills||[]).map(canonicalSavedSkill),pathSkills=(record.pathSkills||[]).map(canonicalSavedSkill)
  const skillRanks=Object.fromEntries(Object.entries(record.skillRanks||{}).map(([key,value])=>[canonicalSavedSkill(key),value]))
  const cultureSkillChoices=Object.fromEntries(Object.entries(record.cultureSkillChoices||{}).map(([key,value])=>[key,canonicalSavedSkill(value)]))
  return{...record,equipment,skills,pathSkills,skillRanks,cultureSkillChoices,talents:Array.from(new Set((record.talents||[]).map(canonicalTalentName))),startingWealthWp,wealthWp,currencyAddedWp,startingWealth:startingWealthWp/WP_PER_NP,wealthRemaining:wealthWp/WP_PER_NP,wealthCurrency:'NP',currencyAddedNp:currencyAddedWp/WP_PER_NP,creationComplete,status,draft:!creationComplete,locked:Boolean(record.locked)}
}
export function normalizeImportedCharacter(raw:unknown):CharacterRecord{if(!raw||typeof raw!=='object')throw new Error('Invalid Brambleheart character data.');const source=raw as Partial<CharacterRecord>;if(!source.name||!source.attributes)throw new Error('Invalid Brambleheart character data.');const now=new Date().toISOString();return normalizeCharacterRecord({...source,id:crypto.randomUUID(),name:String(source.name),attributes:source.attributes,createdAt:now,updatedAt:now,pinned:Boolean(source.pinned)} as CharacterRecord)}
function plainCharacters(characters:CharacterRecord[]):CharacterRecord[]{return(JSON.parse(JSON.stringify(characters)) as CharacterRecord[]).map(normalizeCharacterRecord)}
export function loadCharacters():CharacterRecord[]{try{const parsed=JSON.parse(readLocalStorage(CHARACTER_STORE)||'[]');if(!Array.isArray(parsed))return[];const normalized=(parsed as CharacterRecord[]).map(normalizeCharacterRecord);if(JSON.stringify(parsed)!==JSON.stringify(normalized))writeLocalStorage(CHARACTER_STORE,JSON.stringify(normalized));return normalized}catch{return[]}}
export function writeCharacters(characters:CharacterRecord[]):StorageWriteResult{return writeLocalStorage(CHARACTER_STORE,JSON.stringify(plainCharacters(characters)))}
export function upsertCharacter(record:CharacterRecord):StorageWriteResult{const list=loadCharacters(),index=list.findIndex(item=>item.id===record.id),normalized=normalizeCharacterRecord(record);if(index>=0)list[index]=normalized;else list.unshift(normalized);return writeCharacters(list)}
export function setCharacterApproval(id:string,approved:boolean):StorageWriteResult{const list=loadCharacters(),index=list.findIndex(item=>item.id===id);if(index<0)return{ok:false,message:'That character could not be found on this device.'};if(characterStatus(list[index])==='incomplete')return{ok:false,message:'Finish this character before approving it.'};list[index]={...list[index],creationComplete:true,status:approved?'approved':'unapproved',draft:false,updatedAt:new Date().toISOString()};return writeCharacters(list)}
export function characterExportPayload(character:CharacterRecord){return{format:'brambleheart-character',version:BUILD,character}}
export function downloadJson(filename:string,value:unknown){const blob=new Blob([JSON.stringify(value,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
