import { externalLinks } from '../data/links'
import { characterExportPayload, normalizeImportedCharacter, type CharacterRecord } from './characters'

const SHARE_PREFIX='bhc='
const GZIP_PREFIX='g.'
const JSON_PREFIX='j.'
export const CHARACTER_QR_MAX_BYTES=2800

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
async function gzip(bytes:Uint8Array){
  if(typeof CompressionStream==='undefined')return null
  const stream=new Blob([bytes]).stream().pipeThrough(new CompressionStream('gzip'))
  return new Uint8Array(await new Response(stream).arrayBuffer())
}
async function gunzip(bytes:Uint8Array){
  if(typeof DecompressionStream==='undefined')throw new Error('This browser cannot open compressed Brambleheart QR data.')
  const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))
  return new Uint8Array(await new Response(stream).arrayBuffer())
}

export async function createCharacterShareUrl(character:CharacterRecord){
  const json=JSON.stringify(characterExportPayload(character))
  const plain=new TextEncoder().encode(json)
  const compressed=await gzip(plain)
  const encoded=compressed&&compressed.length<plain.length?`${GZIP_PREFIX}${bytesToBase64Url(compressed)}`:`${JSON_PREFIX}${bytesToBase64Url(plain)}`
  const url=`${externalLinks.site}/characters#${SHARE_PREFIX}${encoded}`
  const bytes=new TextEncoder().encode(url).length
  if(bytes>CHARACTER_QR_MAX_BYTES)throw new Error(`This character needs ${bytes.toLocaleString()} bytes, above the ${CHARACTER_QR_MAX_BYTES.toLocaleString()}-byte reliable QR limit. Use Export JSON instead.`)
  return{url,bytes}
}

export async function parseCharacterShareValue(value:string):Promise<CharacterRecord>{
  const source=value.trim()
  const hashIndex=source.indexOf('#')
  const fragment=(hashIndex>=0?source.slice(hashIndex+1):source).replace(/^#/,'')
  if(!fragment.startsWith(SHARE_PREFIX))throw new Error('This QR code is not a Brambleheart character share.')
  const payload=fragment.slice(SHARE_PREFIX.length)
  const compressed=payload.startsWith(GZIP_PREFIX)
  const encoded=payload.slice(2)
  if(!encoded)throw new Error('The Brambleheart QR payload is empty.')
  let bytes=base64UrlToBytes(encoded)
  if(compressed)bytes=await gunzip(bytes)
  let parsed:unknown
  try{parsed=JSON.parse(new TextDecoder().decode(bytes))}catch{throw new Error('The Brambleheart QR payload is damaged or invalid.')}
  const raw=(parsed as {character?:unknown})?.character??parsed
  return normalizeImportedCharacter(raw)
}

export function characterShareFromLocation(){
  if(typeof window==='undefined')return''
  const hash=window.location.hash.replace(/^#/,'')
  return hash.startsWith(SHARE_PREFIX)?hash:''
}

export function clearCharacterShareLocation(){
  if(typeof window==='undefined'||!window.location.hash)return
  history.replaceState(history.state,'',`${window.location.pathname}${window.location.search}`)
}
