export const STORAGE_KEYS={
  settings:'brambleheart-settings-v0.01',
  rhythm:'brambleheart-simulator-rhythm-v0.05',
  characters:'brambleheart-characters-v0.01',
  characterCloud:'brambleheart-character-cloud-v0.28',
  customData:'brambleheart-custom-data-v0.14',
  recentRules:'brambleheart-rules-recent-v0.05',
  welcomeSeen:'brambleheart.welcome.v0.05',
  installWelcomeDismissed:'brambleheart.install-welcome-dismissed.v0.04',
} as const

export const SETTINGS_STORE=STORAGE_KEYS.settings
export const RHYTHM_STORE=STORAGE_KEYS.rhythm

export interface StorageWriteResult {
  ok:boolean
  message:string
}

function storageMessage(error:unknown){
  const name=error instanceof DOMException?error.name:''
  if(name==='QuotaExceededError'||name==='NS_ERROR_DOM_QUOTA_REACHED')return'Brambleheart could not save this change because browser storage is full. Export or remove some local data, then try again.'
  return'Brambleheart could not save this change to this device. Browser storage may be unavailable or restricted. Your previous saved data has been left unchanged.'
}

export function readLocalStorage(key:string):string|null{
  if(typeof localStorage==='undefined')return null
  try{return localStorage.getItem(key)}catch{return null}
}

export function writeLocalStorage(key:string,value:string):StorageWriteResult{
  if(typeof localStorage==='undefined')return{ok:false,message:'Brambleheart local storage is unavailable on this device.'}
  try{
    localStorage.setItem(key,value)
    return{ok:true,message:''}
  }catch(error){
    return{ok:false,message:storageMessage(error)}
  }
}

export function removeLocalStorage(key:string):StorageWriteResult{
  if(typeof localStorage==='undefined')return{ok:false,message:'Brambleheart local storage is unavailable on this device.'}
  try{
    localStorage.removeItem(key)
    return{ok:true,message:''}
  }catch(error){
    return{ok:false,message:storageMessage(error)}
  }
}

export function localStorageKeys():string[]{
  if(typeof localStorage==='undefined')return[]
  try{return Array.from({length:localStorage.length},(_,index)=>localStorage.key(index)).filter((key):key is string=>Boolean(key))}catch{return[]}
}
