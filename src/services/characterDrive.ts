import { characterExportPayload, loadCharacters, normalizeCharacterRecord, writeCharacters, type CharacterRecord } from './characters'
import { readLocalStorage, removeLocalStorage, STORAGE_KEYS, writeLocalStorage } from './storage'

export interface CharacterDriveLink {
  folderId:string
  folderName:string
  folderUrl:string
  token:string
  serviceAccountEmail:string
  linkedAt:string
}
export interface CharacterDriveState {
  pendingCode:string
  link:CharacterDriveLink|null
}
export interface CharacterDriveConfig {
  configured:boolean
  serviceAccountEmail:string
}
export interface CharacterDrivePullResult {
  added:number
  replaced:number
  skipped:string[]
  totalRemote:number
}
export interface CharacterDrivePushResult {
  created:number
  updated:number
  renamed:number
  skipped:string[]
}

const DRIVE_STORE=STORAGE_KEYS.characterDrive
const LINK_CODE_ALPHABET='ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function randomLinkCode(){
  const bytes=new Uint8Array(24)
  crypto.getRandomValues(bytes)
  return`BH-${Array.from(bytes,value=>LINK_CODE_ALPHABET[value%LINK_CODE_ALPHABET.length]).join('')}`
}
function cleanState(value:unknown):CharacterDriveState{
  const raw=value&&typeof value==='object'?value as Partial<CharacterDriveState>:{}
  const pendingCode=typeof raw.pendingCode==='string'&&/^BH-[A-Z2-9]{24}$/.test(raw.pendingCode)?raw.pendingCode:randomLinkCode()
  const candidate=raw.link
  const link=candidate&&typeof candidate==='object'&&typeof candidate.folderId==='string'&&typeof candidate.folderName==='string'&&typeof candidate.folderUrl==='string'&&typeof candidate.token==='string'&&typeof candidate.serviceAccountEmail==='string'&&typeof candidate.linkedAt==='string'?candidate as CharacterDriveLink:null
  return{pendingCode,link}
}
export function loadCharacterDriveState():CharacterDriveState{
  try{return cleanState(JSON.parse(readLocalStorage(DRIVE_STORE)||'{}'))}catch{return cleanState({})}
}
export function saveCharacterDriveState(state:CharacterDriveState){return writeLocalStorage(DRIVE_STORE,JSON.stringify(state))}
export function ensureCharacterDriveState():CharacterDriveState{
  const state=loadCharacterDriveState()
  saveCharacterDriveState(state)
  return state
}
export function regenerateCharacterDriveCode(state:CharacterDriveState):CharacterDriveState{
  const next={...state,pendingCode:randomLinkCode()}
  const saved=saveCharacterDriveState(next)
  if(!saved.ok)throw new Error(saved.message)
  return next
}
export function disconnectCharacterDrive():CharacterDriveState{
  const removed=removeLocalStorage(DRIVE_STORE)
  if(!removed.ok)throw new Error(removed.message)
  const next=cleanState({})
  const saved=saveCharacterDriveState(next)
  if(!saved.ok)throw new Error(saved.message)
  return next
}

async function apiRequest<T>(body?:unknown):Promise<T>{
  const response=await fetch('/api/character-drive',body===undefined?{method:'GET',headers:{Accept:'application/json'}}:{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(body)})
  let value:any={}
  try{value=await response.json()}catch{}
  if(!response.ok)throw new Error(typeof value?.error==='string'?value.error:'Google Drive sync failed.')
  return value as T
}
export async function getCharacterDriveConfig(){return apiRequest<CharacterDriveConfig>()}
export async function linkCharacterDrive(folderUrl:string,linkCode:string):Promise<CharacterDriveLink>{
  const result=await apiRequest<{folderId:string;folderName:string;token:string;serviceAccountEmail:string}>({action:'link',folderUrl,linkCode})
  const link:CharacterDriveLink={...result,folderUrl,linkedAt:new Date().toISOString()}
  const state=loadCharacterDriveState()
  const saved=saveCharacterDriveState({...state,link})
  if(!saved.ok)throw new Error(saved.message)
  return link
}
function validRemoteCharacter(value:unknown):CharacterRecord|null{
  if(!value||typeof value!=='object')return null
  const payload=value as {format?:unknown;character?:unknown}
  if(payload.format!=='brambleheart-character'||!payload.character||typeof payload.character!=='object')return null
  const character=payload.character as CharacterRecord
  if(typeof character.id!=='string'||!character.id.trim()||typeof character.name!=='string'||!character.attributes||typeof character.attributes!=='object')return null
  return normalizeCharacterRecord(character)
}
export async function updateCharactersFromDrive(link:CharacterDriveLink):Promise<CharacterDrivePullResult>{
  const result=await apiRequest<{characters:unknown[];skipped?:string[];totalFiles?:number}>({action:'pull',link:{folderId:link.folderId,token:link.token}})
  const remoteCharacters=(result.characters||[]).map(validRemoteCharacter).filter((character):character is CharacterRecord=>Boolean(character))
  const remoteById=new Map(remoteCharacters.map(character=>[character.id,character]))
  const local=loadCharacters()
  const localIds=new Set(local.map(character=>character.id))
  let replaced=0
  const merged=local.map(character=>{
    const remote=remoteById.get(character.id)
    if(!remote)return character
    replaced+=1
    return remote
  })
  let added=0
  for(const remote of remoteCharacters){
    if(localIds.has(remote.id))continue
    merged.push(remote)
    added+=1
  }
  const saved=writeCharacters(merged)
  if(!saved.ok)throw new Error(saved.message)
  return{added,replaced,skipped:result.skipped||[],totalRemote:remoteCharacters.length}
}
export async function uploadCharactersToDrive(link:CharacterDriveLink):Promise<CharacterDrivePushResult>{
  const characters=loadCharacters().map(characterExportPayload)
  return apiRequest<CharacterDrivePushResult>({action:'push',link:{folderId:link.folderId,token:link.token},characters})
}
