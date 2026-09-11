import { readLocalStorage, STORAGE_KEYS, writeLocalStorage, type StorageWriteResult } from './storage'

export interface EncounterOpponent {
  name:string
  quantity:number
}

export interface EncounterRecord {
  id:string
  name:string
  objective:string
  partyCharacterIds:string[]
  opponents:EncounterOpponent[]
  environment:string
  notes:string
  createdAt:string
  updatedAt:string
}

function cleanOpponent(value:Partial<EncounterOpponent>):EncounterOpponent|null{
  const name=String(value.name||'').trim()
  const quantity=Math.max(1,Math.floor(Number(value.quantity)||1))
  return name?{name,quantity}:null
}

function normalizeEncounter(value:Partial<EncounterRecord>):EncounterRecord{
  const now=new Date().toISOString()
  return{
    id:String(value.id||''),
    name:String(value.name||'Untitled Encounter').trim()||'Untitled Encounter',
    objective:String(value.objective||'').trim(),
    partyCharacterIds:Array.from(new Set((value.partyCharacterIds||[]).map(String).filter(Boolean))),
    opponents:(value.opponents||[]).map(cleanOpponent).filter((item):item is EncounterOpponent=>Boolean(item)),
    environment:String(value.environment||'').trim(),
    notes:String(value.notes||'').trim(),
    createdAt:String(value.createdAt||now),
    updatedAt:String(value.updatedAt||now),
  }
}

export function loadEncounters():EncounterRecord[]{
  try{
    const parsed=JSON.parse(readLocalStorage(STORAGE_KEYS.encounters)||'[]')
    return Array.isArray(parsed)?parsed.map(item=>normalizeEncounter(item as Partial<EncounterRecord>)).filter(item=>item.id):[]
  }catch{return[]}
}

export function saveEncounters(encounters:EncounterRecord[]):StorageWriteResult{
  return writeLocalStorage(STORAGE_KEYS.encounters,JSON.stringify(encounters.map(normalizeEncounter)))
}

export function upsertEncounter(encounters:EncounterRecord[],encounter:EncounterRecord):{encounters:EncounterRecord[];result:StorageWriteResult}{
  const normalized=normalizeEncounter({...encounter,updatedAt:new Date().toISOString()})
  const index=encounters.findIndex(item=>item.id===normalized.id)
  const next=index>=0?encounters.map((item,itemIndex)=>itemIndex===index?normalized:item):[normalized,...encounters]
  return{encounters:next,result:saveEncounters(next)}
}

export function deleteEncounter(encounters:EncounterRecord[],id:string):{encounters:EncounterRecord[];result:StorageWriteResult}{
  const next=encounters.filter(item=>item.id!==id)
  return{encounters:next,result:saveEncounters(next)}
}
