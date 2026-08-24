import type { AttributeId } from '../data/bramble'
import { writeLocalStorage, type StorageWriteResult } from './storage'

export type AttributeRanks = Record<AttributeId, number>
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
  locked?:boolean
  experience?:number
  magicLevel?:number
  draft?:boolean
  creationStep?:string
  createdAt:string
  updatedAt?:string
}

export const CHARACTER_STORE='brambleheart-characters-v0.01'

export function loadCharacters():CharacterRecord[]{
  if(typeof localStorage==='undefined') return []
  try{
    const parsed=JSON.parse(localStorage.getItem(CHARACTER_STORE)||'[]')
    return Array.isArray(parsed)?parsed:[]
  }catch{return[]}
}
export function writeCharacters(characters:CharacterRecord[]):StorageWriteResult{return writeLocalStorage(CHARACTER_STORE,JSON.stringify(characters))}
export function addCharacter(record:CharacterRecord):StorageWriteResult{const list=loadCharacters();list.unshift(record);return writeCharacters(list)}
export function upsertCharacter(record:CharacterRecord):StorageWriteResult{
  const list=loadCharacters();const index=list.findIndex(item=>item.id===record.id)
  if(index>=0)list[index]=record;else list.unshift(record)
  return writeCharacters(list)
}
export function characterExportPayload(character:CharacterRecord){return{format:'brambleheart-character',version:'0.18',character}}
export function downloadJson(filename:string,value:unknown){
  const blob=new Blob([JSON.stringify(value,null,2)],{type:'application/json'})
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)
}
