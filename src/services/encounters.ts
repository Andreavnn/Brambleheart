import type { CharacterRecord } from './characters'

export interface EncounterRecord{
  id:string
  name:string
  status:'ongoing'|'completed'
  pinned:boolean
  round:number
  health:number
  fateMarks:number
  mana:number
  createdAt:string
  updatedAt:string
  lastResult?:string
  events:string[]
  characterId:string
}

export const ENCOUNTER_STORE='brambleheart-simulator-encounters-v0.05'

export function loadEncounters():EncounterRecord[]{
  if(typeof localStorage==='undefined')return[]
  try{
    const parsed=JSON.parse(localStorage.getItem(ENCOUNTER_STORE)||'[]')
    if(!Array.isArray(parsed))return[]
    return parsed.map(item=>({
      ...item,
      health:Number(item.health??30),
      fateMarks:Number(item.fateMarks??0),
      mana:Number(item.mana??2),
      events:Array.isArray(item.events)?item.events:[],
      characterId:String(item.characterId||''),
    })).filter(item=>item.id)
  }catch{return[]}
}
export function writeEncounters(items:EncounterRecord[]){localStorage.setItem(ENCOUNTER_STORE,JSON.stringify(items))}
export function encounterSort(a:EncounterRecord,b:EncounterRecord){if(a.pinned!==b.pinned)return a.pinned?-1:1;return b.updatedAt.localeCompare(a.updatedAt)}
export function createEncounterRecord(character:CharacterRecord,name:string,index:number):EncounterRecord{
  const now=new Date().toISOString()
  return{id:crypto.randomUUID(),name:name.trim()||`Encounter ${index+1}`,status:'ongoing',pinned:false,round:1,health:30,fateMarks:0,mana:2+(character.path==='magic'?1:0),createdAt:now,updatedAt:now,events:[],characterId:character.id}
}
export function upsertEncounter(record:EncounterRecord){const list=loadEncounters();const index=list.findIndex(item=>item.id===record.id);if(index>=0)list[index]=record;else list.unshift(record);writeEncounters(list)}
