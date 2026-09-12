import { readLocalStorage, STORAGE_KEYS, writeLocalStorage, type StorageWriteResult } from './storage'

export type EncounterStatus='incomplete'|'unapproved'|'approved'
export interface EncounterOpponent { name:string; quantity:number }
export interface EncounterRecord {
  id:string
  name:string
  objective:string
  opponents:EncounterOpponent[]
  traps:string[]
  environments:string[]
  environment:string
  notes:string
  status:EncounterStatus
  creationComplete:boolean
  locked:boolean
  createdAt:string
  updatedAt:string
}

const validStatuses=new Set<EncounterStatus>(['incomplete','unapproved','approved'])
function cleanOpponent(value:Partial<EncounterOpponent>):EncounterOpponent|null{const name=String(value.name||'').trim(),quantity=Math.max(1,Math.floor(Number(value.quantity)||1));return name?{name,quantity}:null}
function cleanList(values:unknown){return Array.from(new Set((Array.isArray(values)?values:[]).map(value=>String(value||'').trim()).filter(Boolean)))}
export function encounterCreationComplete(value:Partial<EncounterRecord>){if(typeof value.creationComplete==='boolean')return value.creationComplete;if(value.status&&validStatuses.has(value.status))return value.status!=='incomplete';return Boolean(String(value.name||'').trim()&&String(value.objective||'').trim()&&(value.opponents||[]).length)}
export function encounterStatus(value:Partial<EncounterRecord>):EncounterStatus{if(!encounterCreationComplete(value))return'incomplete';return value.status==='approved'?'approved':'unapproved'}

function normalizeEncounter(value:Partial<EncounterRecord>):EncounterRecord{
  const now=new Date().toISOString(),creationComplete=encounterCreationComplete(value),status=encounterStatus({...value,creationComplete})
  return{
    id:String(value.id||''),name:String(value.name||'Untitled Encounter').trim()||'Untitled Encounter',objective:String(value.objective||'').trim(),
    opponents:(value.opponents||[]).map(cleanOpponent).filter((item):item is EncounterOpponent=>Boolean(item)),
    traps:cleanList(value.traps),environments:cleanList(value.environments),environment:String(value.environment||'').trim(),notes:String(value.notes||'').trim(),
    status,creationComplete,locked:Boolean(value.locked),createdAt:String(value.createdAt||now),updatedAt:String(value.updatedAt||now),
  }
}

export function loadEncounters():EncounterRecord[]{try{const parsed=JSON.parse(readLocalStorage(STORAGE_KEYS.encounters)||'[]');return Array.isArray(parsed)?parsed.map(item=>normalizeEncounter(item as Partial<EncounterRecord>)).filter(item=>item.id):[]}catch{return[]}}
export function saveEncounters(encounters:EncounterRecord[]):StorageWriteResult{return writeLocalStorage(STORAGE_KEYS.encounters,JSON.stringify(encounters.map(normalizeEncounter)))}
export function upsertEncounter(encounters:EncounterRecord[],encounter:EncounterRecord):{encounters:EncounterRecord[];result:StorageWriteResult}{const normalized=normalizeEncounter({...encounter,updatedAt:new Date().toISOString()}),index=encounters.findIndex(item=>item.id===normalized.id),next=index>=0?encounters.map((item,itemIndex)=>itemIndex===index?normalized:item):[normalized,...encounters];return{encounters:next,result:saveEncounters(next)}}
export function setEncounterApproval(encounters:EncounterRecord[],id:string,approved:boolean){const target=encounters.find(item=>item.id===id);if(!target)return{encounters,result:{ok:false,message:'Encounter not found.'} as StorageWriteResult};if(!target.creationComplete)return{encounters,result:{ok:false,message:'Complete the encounter before approving it.'} as StorageWriteResult};return upsertEncounter(encounters,{...target,status:approved?'approved':'unapproved'})}
export function setEncounterLocked(encounters:EncounterRecord[],id:string,locked:boolean){const target=encounters.find(item=>item.id===id);return target?upsertEncounter(encounters,{...target,locked}):{encounters,result:{ok:false,message:'Encounter not found.'} as StorageWriteResult}}
export function copyEncounter(encounters:EncounterRecord[],id:string,newId:string){const source=encounters.find(item=>item.id===id);if(!source)return{encounters,result:{ok:false,message:'Encounter not found.'} as StorageWriteResult};const now=new Date().toISOString();return upsertEncounter(encounters,{...source,id:newId,name:`${source.name} Copy`,status:source.creationComplete?'unapproved':'incomplete',locked:false,createdAt:now,updatedAt:now})}
export function deleteEncounter(encounters:EncounterRecord[],id:string):{encounters:EncounterRecord[];result:StorageWriteResult}{const next=encounters.filter(item=>item.id!==id);return{encounters:next,result:saveEncounters(next)}}
