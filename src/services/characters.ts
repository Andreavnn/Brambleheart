import type { AttributeId } from '../data/bramble'
import { writeLocalStorage, type StorageWriteResult } from './storage'

export type AttributeRanks = Record<AttributeId, number>
export type CharacterStatus = 'incomplete'|'unapproved'|'approved'
export interface PurchasedEquipment { name:string; costSp:number; costNp?:number; category?:string; detail?:string; effect?:string; choice?:string; attachedTo?:string }
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

export const CHARACTER_STORE='brambleheart-characters-v0.01'

const validStatuses=new Set<CharacterStatus>(['incomplete','unapproved','approved'])
export function characterStatus(record:Pick<CharacterRecord,'status'|'draft'|'locked'>):CharacterStatus{
  if(record.status&&validStatuses.has(record.status))return record.status
  if(record.draft)return'incomplete'
  return record.locked?'approved':'unapproved'
}
export function isCharacterApproved(record:Pick<CharacterRecord,'status'|'draft'|'locked'>){return characterStatus(record)==='approved'}
export function normalizeCharacterRecord(record:CharacterRecord):CharacterRecord{
  const status=characterStatus(record)
  return{...record,status,draft:status==='incomplete',locked:status==='incomplete'?Boolean(record.locked):false}
}
function plainCharacters(characters:CharacterRecord[]):CharacterRecord[]{
  return (JSON.parse(JSON.stringify(characters)) as CharacterRecord[]).map(normalizeCharacterRecord)
}
export function loadCharacters():CharacterRecord[]{
  if(typeof localStorage==='undefined')return[]
  try{
    const parsed=JSON.parse(localStorage.getItem(CHARACTER_STORE)||'[]')
    if(!Array.isArray(parsed))return[]
    const normalized=(parsed as CharacterRecord[]).map(normalizeCharacterRecord)
    if(parsed.some((item:CharacterRecord,index:number)=>item.status!==normalized[index]?.status||Boolean(item.draft)!==Boolean(normalized[index]?.draft)||Boolean(item.locked)!==Boolean(normalized[index]?.locked))){
      writeLocalStorage(CHARACTER_STORE,JSON.stringify(normalized))
    }
    return normalized
  }catch{return[]}
}
export function writeCharacters(characters:CharacterRecord[]):StorageWriteResult{return writeLocalStorage(CHARACTER_STORE,JSON.stringify(plainCharacters(characters)))}
export function addCharacter(record:CharacterRecord):StorageWriteResult{const list=loadCharacters();list.unshift(normalizeCharacterRecord(record));return writeCharacters(list)}
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
export function characterExportPayload(character:CharacterRecord){return{format:'brambleheart-character',version:'0.19',character}}
export function downloadJson(filename:string,value:unknown){
  const blob=new Blob([JSON.stringify(value,null,2)],{type:'application/json'})
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)
}
