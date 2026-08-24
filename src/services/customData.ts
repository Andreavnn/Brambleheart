import { readLocalStorage, removeLocalStorage, STORAGE_KEYS, writeLocalStorage, type StorageWriteResult } from './storage'

export type CustomDataType='species'|'spell'|'talent'|'trait'
export type CustomTraitKind='species'|'culture'
export type CustomTalentCategory='Combat'|'Offensive Combat'|'Defensive Combat'|'Magic'|'Utility'

export interface CustomSkillGrants { fixed:string[]; choices:string[][] }
export interface CustomTraitPayload {
  name:string
  text:string
  keywords:string[]
  skillGrants?:CustomSkillGrants
}
interface CustomBase {
  format:'brambleheart-custom'
  version:1
  type:CustomDataType
  id:string
  name:string
  custom:true
}
export interface CustomSpeciesItem extends CustomBase {
  type:'species'
  pronunciation:string
  quote:string
  theme:string
  lore:string
  language:string
  speciesTraits:CustomTraitPayload[]
  cultureTraits:CustomTraitPayload[]
}
export interface CustomSpellItem extends CustomBase {
  type:'spell'
  lore:string
  flavor:string
  rules:string
  manaCost:number|null
  keywords:string[]
  signature:boolean
}
export interface CustomTalentItem extends CustomBase {
  type:'talent'
  category:CustomTalentCategory
  text:string
  keywords:string[]
  requires:string
}
export interface CustomTraitItem extends CustomBase {
  type:'trait'
  traitKind:CustomTraitKind
  species:string
  text:string
  keywords:string[]
  skillGrants?:CustomSkillGrants
}
export type CustomDataItem=CustomSpeciesItem|CustomSpellItem|CustomTalentItem|CustomTraitItem

export const CUSTOM_DATA_STORE=STORAGE_KEYS.customData

function text(value:unknown){return typeof value==='string'?value.trim():''}
function stringList(value:unknown){return Array.isArray(value)?value.map(text).filter(Boolean):[]}
function slug(value:string){return value.toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function skillGrants(value:unknown):CustomSkillGrants|undefined{
  if(!value||typeof value!=='object')return undefined
  const raw=value as Record<string,unknown>
  const fixed=stringList(raw.fixed)
  const choices=Array.isArray(raw.choices)?raw.choices.map(item=>stringList(item)).filter(item=>item.length):[]
  return fixed.length||choices.length?{fixed,choices}:undefined
}
function traitPayload(value:unknown):CustomTraitPayload|null{
  if(!value||typeof value!=='object')return null
  const raw=value as Record<string,unknown>
  const name=text(raw.name),body=text(raw.text)
  if(!name||!body)return null
  return{name,text:body,keywords:stringList(raw.keywords),skillGrants:skillGrants(raw.skillGrants)}
}
function itemId(type:CustomDataType,name:string,extra=''){return`custom-${type}-${slug(extra?`${extra}-${name}`:name)}`}
function normalizeOne(value:unknown):CustomDataItem|null{
  if(!value||typeof value!=='object')return null
  const raw=value as Record<string,unknown>
  const type=text(raw.type).toLowerCase() as CustomDataType
  const name=text(raw.name)
  if(!name||!['species','spell','talent','trait'].includes(type))return null
  if(type==='species'){
    const speciesTraits=(Array.isArray(raw.speciesTraits)?raw.speciesTraits:[]).map(traitPayload).filter((item):item is CustomTraitPayload=>Boolean(item))
    const cultureTraits=(Array.isArray(raw.cultureTraits)?raw.cultureTraits:[]).map(traitPayload).filter((item):item is CustomTraitPayload=>Boolean(item))
    return{format:'brambleheart-custom',version:1,type,id:itemId(type,name),name,custom:true,pronunciation:text(raw.pronunciation),quote:text(raw.quote),theme:text(raw.theme)||'Custom Species',lore:text(raw.lore),language:text(raw.language)||'Custom Language',speciesTraits,cultureTraits}
  }
  if(type==='spell'){
    const mana=raw.manaCost===null?null:Number(raw.manaCost)
    return{format:'brambleheart-custom',version:1,type,id:itemId(type,name,text(raw.lore)),name,custom:true,lore:text(raw.lore)||'Custom',flavor:text(raw.flavor),rules:text(raw.rules),manaCost:Number.isFinite(mana as number)?mana:null,keywords:stringList(raw.keywords),signature:Boolean(raw.signature)}
  }
  if(type==='talent'){
    const rawCategory=text(raw.category)
    const legacyUtility=['Movement','Survival','Social'].includes(rawCategory)
    const normalizedCategory:CustomTalentCategory=legacyUtility?'Utility':(['Combat','Offensive Combat','Defensive Combat','Magic','Utility'].includes(rawCategory)?rawCategory as CustomTalentCategory:'Utility')
    return{format:'brambleheart-custom',version:1,type,id:itemId(type,name),name,custom:true,category:normalizedCategory,text:text(raw.text),keywords:stringList(raw.keywords),requires:text(raw.requires)}
  }
  const traitKind=text(raw.traitKind).toLowerCase()==='species'?'species':'culture'
  const species=text(raw.species)||'Custom'
  return{format:'brambleheart-custom',version:1,type,id:itemId(type,name,`${traitKind}-${species}`),name,custom:true,traitKind,species,text:text(raw.text),keywords:stringList(raw.keywords),skillGrants:skillGrants(raw.skillGrants)}
}

export interface CustomDataParseResult { items:CustomDataItem[]; skipped:number; total:number }
export function parseCustomDataText(raw:string):CustomDataParseResult{
  const parsed=JSON.parse(raw) as unknown
  const values=Array.isArray(parsed)?parsed:(parsed&&typeof parsed==='object'&&Array.isArray((parsed as Record<string,unknown>).items)?(parsed as {items:unknown[]}).items:[parsed])
  const items=values.map(normalizeOne).filter((item):item is CustomDataItem=>Boolean(item))
  if(!items.length)throw new Error('No recognized Brambleheart custom Species, Spell, Talent, or Trait entries were found.')
  return{items,skipped:values.length-items.length,total:values.length}
}
export function loadCustomData():CustomDataItem[]{
  try{const raw=JSON.parse(readLocalStorage(CUSTOM_DATA_STORE)||'[]');return Array.isArray(raw)?raw.map(normalizeOne).filter((item):item is CustomDataItem=>Boolean(item)):[]}
  catch{return[]}
}
export function saveCustomData(items:CustomDataItem[]):StorageWriteResult{return writeLocalStorage(CUSTOM_DATA_STORE,JSON.stringify(items))}
export function mergeCustomData(existing:CustomDataItem[],incoming:CustomDataItem[]){
  const map=new Map(existing.map(item=>[item.id,item]))
  incoming.forEach(item=>map.set(item.id,item))
  return Array.from(map.values()).sort((a,b)=>a.type.localeCompare(b.type)||a.name.localeCompare(b.name))
}
export function clearCustomData():StorageWriteResult{return removeLocalStorage(CUSTOM_DATA_STORE)}
export function customDataCounts(items:CustomDataItem[]){
  return items.reduce((out,item)=>{out[item.type]=(out[item.type]||0)+1;return out},{species:0,spell:0,talent:0,trait:0} as Record<CustomDataType,number>)
}
