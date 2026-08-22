import type { AttributeId } from '../data/bramble'

export type AttributeRanks = Record<AttributeId, number>
export interface PurchasedEquipment { name:string; costSp:number; category?:string }
export interface CharacterRecord {
  id:string
  name:string
  pronunciation?:string
  age?:string
  appearance?:string
  pronouns?:string
  kinship?:string
  species:string
  cultureTraits?:string[]
  spark:string
  homeland:string
  skills?:string[]
  faith:string
  oath:string
  path:'magic'|'talents'
  talents?:string[]
  loreAttunement?:string
  spells?:string[]
  invocationSpell?:string
  languages?:string[]
  equipment?:PurchasedEquipment[]
  adventureKit?:boolean
  startingWealth?:number
  wealthRemaining?:number
  attributes:AttributeRanks
  pinned?:boolean
  createdAt:string
}

export const CHARACTER_STORE='brambleheart-characters-v0.01'

export function loadCharacters():CharacterRecord[]{
  if(typeof localStorage==='undefined') return []
  try{
    const parsed=JSON.parse(localStorage.getItem(CHARACTER_STORE)||'[]')
    return Array.isArray(parsed)?parsed:[]
  }catch{return[]}
}
export function writeCharacters(characters:CharacterRecord[]){localStorage.setItem(CHARACTER_STORE,JSON.stringify(characters))}
export function addCharacter(record:CharacterRecord){const list=loadCharacters();list.unshift(record);writeCharacters(list)}
export function characterExportPayload(character:CharacterRecord){return{format:'brambleheart-character',version:'0.06',character}}
export function downloadJson(filename:string,value:unknown){
  const blob=new Blob([JSON.stringify(value,null,2)],{type:'application/json'})
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)
}
