import { characterExportPayload, loadCharacters, normalizeCharacterRecord, writeCharacters, type CharacterRecord } from './characters'
import { readLocalStorage, removeLocalStorage, STORAGE_KEYS, writeLocalStorage } from './storage'

export interface CharacterCloudConnection {
  provider:'dropbox'
  refreshToken:string
  accountId:string
  linkedAt:string
}
export interface CharacterCloudOAuth {
  state:string
  verifier:string
  redirectUri:string
  startedAt:string
}
export interface CharacterCloudState {
  linkCode:string
  connection:CharacterCloudConnection|null
  oauth:CharacterCloudOAuth|null
}
export interface CharacterCloudConfig {
  configured:boolean
  provider:'dropbox'
  workspaceLabel:string
}
export interface CharacterCloudPullResult {
  added:number
  replaced:number
  skipped:string[]
  totalRemote:number
}
export interface CharacterCloudPushResult {
  created:number
  updated:number
  renamed:number
  skipped:string[]
}

const CLOUD_STORE=STORAGE_KEYS.characterCloud
const LEGACY_DRIVE_STORE='brambleheart-character-drive-v0.01'
const DROPBOX_AUTHORIZE='https://www.dropbox.com/oauth2/authorize'
const DROPBOX_TOKEN='https://api.dropboxapi.com/oauth2/token'
const DROPBOX_API='https://api.dropboxapi.com/2'
const DROPBOX_CONTENT='https://content.dropboxapi.com/2'
const CLOUD_SCOPES=['files.metadata.read','files.content.read','files.content.write']
const LINK_CODE_ALPHABET='ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const VERIFIER_ALPHABET='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
const MAX_REMOTE_FILES=250

let cachedAccessToken=''
let cachedAccessTokenExpiresAt=0

function appKey(){return String(import.meta.env.VITE_DROPBOX_APP_KEY||'').trim()}
function configured(){return Boolean(appKey())}
function randomString(length:number,alphabet:string){
  const bytes=new Uint8Array(length)
  crypto.getRandomValues(bytes)
  return Array.from(bytes,value=>alphabet[value%alphabet.length]).join('')
}
function randomLinkCode(){return`BH-${randomString(24,LINK_CODE_ALPHABET)}`}
function isLinkCode(value:unknown){return typeof value==='string'&&/^BH-[A-Z2-9]{24}$/.test(value)}
function cleanState(value:unknown):CharacterCloudState{
  const raw=value&&typeof value==='object'?value as Partial<CharacterCloudState>:{ }
  const linkCode=isLinkCode(raw.linkCode)?raw.linkCode as string:randomLinkCode()
  const candidate=raw.connection
  const connection=candidate&&typeof candidate==='object'&&candidate.provider==='dropbox'&&typeof candidate.refreshToken==='string'&&candidate.refreshToken&&typeof candidate.accountId==='string'&&typeof candidate.linkedAt==='string'?candidate as CharacterCloudConnection:null
  const oauthCandidate=raw.oauth
  const oauth=oauthCandidate&&typeof oauthCandidate==='object'&&isLinkCode(oauthCandidate.state)&&typeof oauthCandidate.verifier==='string'&&oauthCandidate.verifier.length>=43&&typeof oauthCandidate.redirectUri==='string'&&typeof oauthCandidate.startedAt==='string'?oauthCandidate as CharacterCloudOAuth:null
  return{linkCode,connection,oauth}
}
function saveState(state:CharacterCloudState){
  const saved=writeLocalStorage(CLOUD_STORE,JSON.stringify(state))
  if(!saved.ok)throw new Error(saved.message)
  return state
}
function removeLegacyGoogleState(){
  if(readLocalStorage(LEGACY_DRIVE_STORE)!==null)removeLocalStorage(LEGACY_DRIVE_STORE)
}
export function loadCharacterCloudState():CharacterCloudState{
  removeLegacyGoogleState()
  try{return cleanState(JSON.parse(readLocalStorage(CLOUD_STORE)||'{}'))}catch{return cleanState({})}
}
export function ensureCharacterCloudState(){return saveState(loadCharacterCloudState())}
export function regenerateCharacterCloudCode(state:CharacterCloudState){
  if(state.connection)throw new Error('Disconnect Cloud Sync before generating a new Cloud Link Code.')
  return saveState({...state,linkCode:randomLinkCode(),oauth:null})
}
export function getCharacterCloudConfig():CharacterCloudConfig{
  return{configured:configured(),provider:'dropbox',workspaceLabel:'Dropbox App Folder'}
}
export function characterCloudRedirectUri(){return`${window.location.origin}/settings`}

function base64Url(bytes:ArrayBuffer){
  const view=new Uint8Array(bytes)
  let binary=''
  for(const byte of view)binary+=String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')
}
async function pkceChallenge(verifier:string){return base64Url(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(verifier)))}

export async function beginDropboxCloudConnection(state:CharacterCloudState){
  const key=appKey()
  if(!key)throw new Error('Dropbox Cloud Sync is not configured on this Brambleheart deployment. See Cloud Instructions (.txt).')
  if(state.connection)throw new Error('Cloud Sync is already connected. Disconnect it before linking another Dropbox account.')
  const verifier=randomString(64,VERIFIER_ALPHABET)
  const redirectUri=characterCloudRedirectUri()
  const oauth:CharacterCloudOAuth={state:state.linkCode,verifier,redirectUri,startedAt:new Date().toISOString()}
  saveState({...state,oauth})
  const params=new URLSearchParams({
    client_id:key,
    response_type:'code',
    redirect_uri:redirectUri,
    code_challenge:await pkceChallenge(verifier),
    code_challenge_method:'S256',
    token_access_type:'offline',
    state:state.linkCode,
    scope:CLOUD_SCOPES.join(' '),
  })
  window.location.assign(`${DROPBOX_AUTHORIZE}?${params}`)
}

async function tokenRequest(parameters:Record<string,string>){
  const response=await fetch(DROPBOX_TOKEN,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(parameters)})
  let value:any={}
  try{value=await response.json()}catch{}
  if(!response.ok)throw new Error(value?.error_description||value?.error||'Dropbox authorization failed.')
  return value
}
export async function completeDropboxCloudConnection(currentUrl:string):Promise<CharacterCloudState|null>{
  const state=loadCharacterCloudState()
  const url=new URL(currentUrl)
  const callbackState=url.searchParams.get('state')||''
  const code=url.searchParams.get('code')||''
  const oauthError=url.searchParams.get('error')||''
  const errorDescription=url.searchParams.get('error_description')||''
  if(!state.oauth||(!callbackState&&!code&&!oauthError))return null
  const clearPending=(connection:CharacterCloudConnection|null=state.connection)=>saveState({...state,connection,oauth:null})
  if(callbackState!==state.oauth.state){clearPending();throw new Error('Dropbox returned an unexpected Cloud Link Code. Start the Cloud Sync connection again.')}
  if(oauthError){clearPending();throw new Error(errorDescription||`Dropbox connection was not completed: ${oauthError}`)}
  if(!code){clearPending();throw new Error('Dropbox did not return an authorization code. Start the Cloud Sync connection again.')}
  const key=appKey()
  if(!key){clearPending();throw new Error('Dropbox Cloud Sync is not configured on this Brambleheart deployment.')}
  const token=await tokenRequest({code,grant_type:'authorization_code',redirect_uri:state.oauth.redirectUri,code_verifier:state.oauth.verifier,client_id:key})
  if(typeof token.refresh_token!=='string'||!token.refresh_token)throw new Error('Dropbox did not return the refresh token required for manual cloud updates. Disconnect the app in Dropbox and connect again.')
  const connection:CharacterCloudConnection={provider:'dropbox',refreshToken:token.refresh_token,accountId:String(token.account_id||''),linkedAt:new Date().toISOString()}
  cachedAccessToken=String(token.access_token||'')
  cachedAccessTokenExpiresAt=Date.now()+Math.max(30,Number(token.expires_in)||0)*1000-30_000
  return clearPending(connection)
}

async function accessToken(connection:CharacterCloudConnection){
  if(cachedAccessToken&&Date.now()<cachedAccessTokenExpiresAt)return cachedAccessToken
  const key=appKey()
  if(!key)throw new Error('Dropbox Cloud Sync is not configured on this Brambleheart deployment.')
  const token=await tokenRequest({refresh_token:connection.refreshToken,grant_type:'refresh_token',client_id:key})
  if(typeof token.access_token!=='string'||!token.access_token)throw new Error('Dropbox did not return an access token. Reconnect Cloud Sync.')
  cachedAccessToken=token.access_token
  cachedAccessTokenExpiresAt=Date.now()+Math.max(30,Number(token.expires_in)||0)*1000-30_000
  return cachedAccessToken
}
function authHeaders(token:string,extra:Record<string,string>={}){return{Authorization:`Bearer ${token}`,...extra}}
async function dropboxApi<T>(path:string,token:string,body:unknown):Promise<T>{
  const response=await fetch(`${DROPBOX_API}${path}`,{method:'POST',headers:authHeaders(token,{'Content-Type':'application/json'}),body:JSON.stringify(body)})
  let value:any={}
  try{value=await response.json()}catch{}
  if(!response.ok){
    const summary=typeof value?.error_summary==='string'?value.error_summary:''
    throw new Error(summary?`Dropbox request failed: ${summary}`:'Dropbox request failed.')
  }
  return value as T
}

interface DropboxFileEntry {'.tag':'file';name:string;id:string;path_lower:string;path_display?:string}
interface DropboxListResult {entries:Array<DropboxFileEntry|{'.tag':string;name?:string}>;cursor:string;has_more:boolean}
async function listBhFiles(token:string){
  const files:DropboxFileEntry[]=[]
  let result=await dropboxApi<DropboxListResult>('/files/list_folder',token,{path:'',recursive:false,include_deleted:false,limit:2000})
  while(true){
    for(const entry of result.entries||[]){
      if(entry['.tag']!=='file')continue
      const file=entry as DropboxFileEntry
      if(!/_BH\.json$/i.test(file.name))continue
      files.push(file)
      if(files.length>MAX_REMOTE_FILES)throw new Error(`The Dropbox App Folder contains more than ${MAX_REMOTE_FILES} _BH.json files. Remove or archive older files before syncing.`)
    }
    if(!result.has_more)break
    result=await dropboxApi<DropboxListResult>('/files/list_folder/continue',token,{cursor:result.cursor})
  }
  return files
}
async function downloadJsonFile(file:DropboxFileEntry,token:string){
  const response=await fetch(`${DROPBOX_CONTENT}/files/download`,{method:'POST',headers:authHeaders(token,{'Dropbox-API-Arg':JSON.stringify({path:file.path_lower})})})
  const text=await response.text()
  if(!response.ok)throw new Error(`Dropbox could not read ${file.name}.`)
  try{return JSON.parse(text)}catch{return null}
}
function validRemoteCharacter(value:unknown):CharacterRecord|null{
  if(!value||typeof value!=='object')return null
  const payload=value as {format?:unknown;character?:unknown}
  if(payload.format!=='brambleheart-character'||!payload.character||typeof payload.character!=='object')return null
  const character=payload.character as CharacterRecord
  if(typeof character.id!=='string'||!character.id.trim()||typeof character.name!=='string'||!character.name.trim()||!character.attributes||typeof character.attributes!=='object')return null
  return normalizeCharacterRecord(character)
}
interface IndexedRemote {files:DropboxFileEntry[];byId:Map<string,{file:DropboxFileEntry;character:CharacterRecord}>;valid:Array<{file:DropboxFileEntry;character:CharacterRecord}>;skipped:string[];totalFiles:number}
async function indexedRemoteFiles(token:string):Promise<IndexedRemote>{
  const files=await listBhFiles(token)
  const byId=new Map<string,{file:DropboxFileEntry;character:CharacterRecord}>()
  const valid:Array<{file:DropboxFileEntry;character:CharacterRecord}>=[]
  const skipped:string[]=[]
  for(const file of files){
    const character=validRemoteCharacter(await downloadJsonFile(file,token))
    if(!character){skipped.push(file.name);continue}
    if(byId.has(character.id))throw new Error(`Dropbox contains more than one _BH.json file for character ID ${character.id}. Remove the duplicate before syncing.`)
    const entry={file,character}
    byId.set(character.id,entry)
    valid.push(entry)
  }
  return{files,byId,valid,skipped,totalFiles:files.length}
}
function safeStem(name:string){
  return String(name||'Character').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[<>:"/\\|?*\u0000-\u001F]/g,' ').replace(/\s+/g,'_').replace(/_+/g,'_').replace(/^[_\.]+|[_\.]+$/g,'').slice(0,82)||'Character'
}
function filenameFor(character:CharacterRecord,used:Set<string>,currentPath=''){
  const stem=safeStem(character.name)
  const current=currentPath.toLowerCase()
  const available=(filename:string)=>{const path=`/${filename.toLowerCase()}`;return!used.has(path)||path===current}
  const preferred=`${stem}_BH.json`
  if(available(preferred))return preferred
  const suffix=character.id.replace(/[^A-Za-z0-9]/g,'').slice(0,8)||'character'
  const withId=`${stem}_${suffix}_BH.json`
  if(available(withId))return withId
  for(let index=2;index<1000;index++){
    const candidate=`${stem}_${suffix}_${index}_BH.json`
    if(available(candidate))return candidate
  }
  throw new Error(`Could not create a unique cloud filename for ${character.name}.`)
}
async function moveFile(fromPath:string,toPath:string,token:string){
  if(fromPath.toLowerCase()===toPath.toLowerCase())return false
  await dropboxApi('/files/move_v2',token,{from_path:fromPath,to_path:toPath,autorename:false,allow_ownership_transfer:false})
  return true
}
async function uploadFile(path:string,payload:unknown,token:string){
  const response=await fetch(`${DROPBOX_CONTENT}/files/upload`,{
    method:'POST',
    headers:authHeaders(token,{
      'Content-Type':'application/octet-stream',
      'Dropbox-API-Arg':JSON.stringify({path,mode:'overwrite',autorename:false,mute:true,strict_conflict:false}),
    }),
    body:JSON.stringify(payload,null,2),
  })
  if(!response.ok){let detail='';try{detail=(await response.json())?.error_summary||''}catch{};throw new Error(detail?`Dropbox could not upload ${path}: ${detail}`:`Dropbox could not upload ${path}.`)}
}

export async function updateCharactersFromCloud(connection:CharacterCloudConnection):Promise<CharacterCloudPullResult>{
  const token=await accessToken(connection)
  const remote=await indexedRemoteFiles(token)
  const remoteById=new Map(remote.valid.map(entry=>[entry.character.id,entry.character]))
  const local=loadCharacters()
  const localIds=new Set(local.map(character=>character.id))
  let replaced=0
  const merged=local.map(character=>{
    const incoming=remoteById.get(character.id)
    if(!incoming)return character
    replaced+=1
    return incoming
  })
  let added=0
  for(const entry of remote.valid){
    if(localIds.has(entry.character.id))continue
    merged.push(entry.character)
    added+=1
  }
  const saved=writeCharacters(merged)
  if(!saved.ok)throw new Error(saved.message)
  return{added,replaced,skipped:remote.skipped,totalRemote:remote.valid.length}
}
export async function uploadCharactersToCloud(connection:CharacterCloudConnection):Promise<CharacterCloudPushResult>{
  const token=await accessToken(connection)
  const local=loadCharacters()
  if(local.length>MAX_REMOTE_FILES)throw new Error(`A single cloud upload is limited to ${MAX_REMOTE_FILES} characters.`)
  const ids=local.map(character=>character.id)
  if(new Set(ids).size!==ids.length)throw new Error('Local character data contains duplicate internal character IDs. Resolve the duplicates before uploading to Cloud Sync.')
  const remote=await indexedRemoteFiles(token)
  const used=new Set(remote.files.map(file=>file.path_lower.toLowerCase()))
  let created=0,updated=0,renamed=0
  for(const character of local){
    const existing=remote.byId.get(character.id)
    const filename=filenameFor(character,used,existing?.file.path_lower||'')
    const targetPath=`/${filename}`
    if(existing){
      const oldPath=existing.file.path_lower
      if(await moveFile(oldPath,targetPath,token)){
        used.delete(oldPath.toLowerCase());used.add(targetPath.toLowerCase());renamed+=1
      }
      await uploadFile(targetPath,characterExportPayload(character),token)
      updated+=1
    }else{
      await uploadFile(targetPath,characterExportPayload(character),token)
      used.add(targetPath.toLowerCase())
      created+=1
    }
  }
  return{created,updated,renamed,skipped:remote.skipped}
}
export async function disconnectCharacterCloud(state:CharacterCloudState){
  const connection=state.connection
  let revoked=false
  if(connection){
    try{
      const token=await accessToken(connection)
      const response=await fetch(`${DROPBOX_API}/auth/token/revoke`,{method:'POST',headers:authHeaders(token)})
      revoked=response.ok
    }catch{}
  }
  cachedAccessToken='';cachedAccessTokenExpiresAt=0
  const removed=removeLocalStorage(CLOUD_STORE)
  if(!removed.ok)throw new Error(removed.message)
  const next=cleanState({})
  saveState(next)
  return{state:next,revoked}
}
