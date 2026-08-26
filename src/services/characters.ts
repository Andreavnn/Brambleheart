import { BUILD, type AttributeId } from '../data/bramble'
import { readLocalStorage, STORAGE_KEYS, writeLocalStorage, type StorageWriteResult } from './storage'

export type AttributeRanks = Record<AttributeId, number>
export type CharacterStatus = 'incomplete'|'unapproved'|'approved'
export interface PurchasedEquipment { name:string; costSp:number; costNp?:number; category?:string; detail?:string; effect?:string; choice?:string; attachedTo?:string; quantity?:number }
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
  path:'magic'|'talents'
  talents?:string[]
  loreAttunement?:string
  spells?:string[]
  invocationSpell?:string
  invocationSpells?:string[]
  languages?:string[]
  equipment?:PurchasedEquipment[]
  adventureKit?:boolean
  startingWealth?:number
  wealthRemaining?:number
  wealthCurrency?:'NP'|'SP'
  attributes:AttributeRanks
  pinned?:boolean
  /** Draft-only manual lock. Approval is tracked separately by status. */
  locked?:boolean
  status?:CharacterStatus
  experience?:number
  magicLevel?:number
  draft?:boolean
  creationStep?:string
  createdAt:string
  updatedAt?:string
}

export const CHARACTER_STORE=STORAGE_KEYS.characters

const validStatuses=new Set<CharacterStatus>(['incomplete','unapproved','approved'])
export function characterStatus(record:Pick<CharacterRecord,'status'|'draft'|'locked'>):CharacterStatus{
  if(record.status&&validStatuses.has(record.status))return record.status
  if(record.draft)return'incomplete'
  return record.locked?'approved':'unapproved'
}
function normalizeEquipment(items:PurchasedEquipment[]|undefined){
  return (items||[]).map(item=>({...item,quantity:Math.max(1,Math.floor(Number(item.quantity)||1))}))
}
export function normalizeCharacterRecord(record:CharacterRecord):CharacterRecord{
  const status=characterStatus(record)
  return{...record,equipment:normalizeEquipment(record.equipment),status,draft:status==='incomplete',locked:status==='incomplete'?Boolean(record.locked):false}
}
function plainCharacters(characters:CharacterRecord[]):CharacterRecord[]{
  return (JSON.parse(JSON.stringify(characters)) as CharacterRecord[]).map(normalizeCharacterRecord)
}
export function loadCharacters():CharacterRecord[]{
  try{
    const parsed=JSON.parse(readLocalStorage(CHARACTER_STORE)||'[]')
    if(!Array.isArray(parsed))return[]
    const normalized=(parsed as CharacterRecord[]).map(normalizeCharacterRecord)
    if(parsed.some((item:CharacterRecord,index:number)=>item.status!==normalized[index]?.status||Boolean(item.draft)!==Boolean(normalized[index]?.draft)||Boolean(item.locked)!==Boolean(normalized[index]?.locked)||JSON.stringify(item.equipment||[])!==JSON.stringify(normalized[index]?.equipment||[]))){
      writeLocalStorage(CHARACTER_STORE,JSON.stringify(normalized))
    }
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
  list[index]={...list[index],status:approved?'approved':'unapproved',draft:false,locked:false,updatedAt:new Date().toISOString()}
  return writeCharacters(list)
}
export function characterExportPayload(character:CharacterRecord){return{format:'brambleheart-character',version:BUILD,character}}
export function downloadJson(filename:string,value:unknown){
  const blob=new Blob([JSON.stringify(value,null,2)],{type:'application/json'})
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)
}
