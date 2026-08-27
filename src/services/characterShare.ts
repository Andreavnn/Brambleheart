import { externalLinks } from '../data/links'
import { characterExportPayload, normalizeImportedCharacter, type CharacterRecord } from './characters'

const SHARE_CODE_PREFIX='BH1.'
const LEGACY_SHARE_PREFIX='bhc='
const GZIP_PREFIX='g.'
const JSON_PREFIX='j.'
export const CHARACTER_SHARE_URL=`${externalLinks.site}/characters`

function bytesToBase64Url(bytes:Uint8Array){
  let binary=''
  const chunk=0x8000
  for(let index=0;index<bytes.length;index+=chunk)binary+=String.fromCharCode(...bytes.subarray(index,index+chunk))
  return btoa(binary).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')
}
function base64UrlToBytes(value:string){
  const padded=value.replace(/-/g,'+').replace(/_/g,'/')+'='.repeat((4-value.length%4)%4)
  const binary=atob(padded)
  return Uint8Array.from(binary,char=>char.charCodeAt(0))
}
function blobFromBytes(bytes:Uint8Array){
  const copy=new Uint8Array(bytes.byteLength)
  copy.set(bytes)
  return new Blob([copy.buffer])
}
async function gzip(bytes:Uint8Array){
  if(typeof CompressionStream==='undefined')return null
  const stream=blobFromBytes(bytes).stream().pipeThrough(new CompressionStream('gzip'))
  return new Uint8Array(await new Response(stream).arrayBuffer())
}
async function gunzip(bytes:Uint8Array){
  if(typeof DecompressionStream==='undefined')throw new Error('This browser cannot open compressed Brambleheart Share Code data.')
  const stream=blobFromBytes(bytes).stream().pipeThrough(new DecompressionStream('gzip'))
  return new Uint8Array(await new Response(stream).arrayBuffer())
}

function extractSharePayload(value:string){
  const source=String(value||'').trim()
  const codeMatch=source.match(/BH1\.(g|j)\.([A-Za-z0-9_-]+)/i)
  if(codeMatch)return{compressed:codeMatch[1].toLowerCase()==='g',encoded:codeMatch[2]}

  const hashIndex=source.indexOf('#')
  const fragment=(hashIndex>=0?source.slice(hashIndex+1):source).replace(/^#/,'')
  if(fragment.startsWith(LEGACY_SHARE_PREFIX)){
    const payload=fragment.slice(LEGACY_SHARE_PREFIX.length)
    const compressed=payload.startsWith(GZIP_PREFIX)
    const encoded=payload.slice(2)
    if(!encoded)throw new Error('The Brambleheart Share Code payload is empty.')
    return{compressed,encoded}
  }
  throw new Error('This is not a Brambleheart Share Code.')
}

export async function createCharacterShareCode(character:CharacterRecord){
  const json=JSON.stringify(characterExportPayload(character))
  const plain=new TextEncoder().encode(json)
  const compressed=await gzip(plain)
  const useCompressed=Boolean(compressed&&compressed.length<plain.length)
  const encoded=bytesToBase64Url(useCompressed?compressed!:plain)
  const code=`${SHARE_CODE_PREFIX}${useCompressed?'g':'j'}.${encoded}`
  return{code,bytes:new TextEncoder().encode(code).length,url:CHARACTER_SHARE_URL}
}

export async function parseCharacterShareValue(value:string):Promise<CharacterRecord>{
  const payload=extractSharePayload(value)
  let bytes=base64UrlToBytes(payload.encoded)
  if(payload.compressed)bytes=await gunzip(bytes)
  let parsed:unknown
  try{parsed=JSON.parse(new TextDecoder().decode(bytes))}catch{throw new Error('The Brambleheart Share Code is damaged or invalid.')}
  const raw=(parsed as {character?:unknown})?.character??parsed
  return normalizeImportedCharacter(raw)
}

export function consumeCharacterShareFromLocation(){
  if(typeof window==='undefined')return''
  const hash=window.location.hash.replace(/^#/,'')
  if(!hash.startsWith(LEGACY_SHARE_PREFIX))return''
  const captured=hash
  history.replaceState(history.state,'',`${window.location.pathname}${window.location.search}`)
  return captured
}

// Compatibility helpers for older character-share links and call sites.
export function characterShareFromLocation(){
  if(typeof window==='undefined')return''
  const hash=window.location.hash.replace(/^#/,'')
  return hash.startsWith(LEGACY_SHARE_PREFIX)?hash:''
}
export function clearCharacterShareLocation(){
  if(typeof window==='undefined'||!window.location.hash)return
  history.replaceState(history.state,'',`${window.location.pathname}${window.location.search}`)
}
