export interface StorageWriteResult {
  ok:boolean
  message:string
}

function storageMessage(error:unknown){
  const name=error instanceof DOMException?error.name:''
  if(name==='QuotaExceededError'||name==='NS_ERROR_DOM_QUOTA_REACHED')return'Brambleheart could not save this change because browser storage is full. Export or remove some local data, then try again.'
  return'Brambleheart could not save this change to this device. Browser storage may be unavailable or restricted. Your previous saved data has been left unchanged.'
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
