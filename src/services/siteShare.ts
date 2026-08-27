import { externalLinks } from '../data/links'

export type ShareSiteResult={ok:boolean;message:string}

export async function shareBrambleheart():Promise<ShareSiteResult>{
  const data={title:'Brambleheart',text:'Brambleheart — Small Heroes, Big Adventures',url:externalLinks.site}
  try{
    if(typeof navigator!=='undefined'&&navigator.share){
      await navigator.share(data)
      return{ok:true,message:'Share sheet opened.'}
    }
    if(typeof navigator!=='undefined'&&navigator.clipboard?.writeText){
      await navigator.clipboard.writeText(externalLinks.site)
      return{ok:true,message:'Brambleheart link copied.'}
    }
    if(typeof window!=='undefined'){
      window.prompt('Copy this Brambleheart link:',externalLinks.site)
      return{ok:true,message:'Brambleheart link ready to copy.'}
    }
    return{ok:false,message:'Sharing is not available in this browser.'}
  }catch(error){
    if(error instanceof DOMException&&error.name==='AbortError')return{ok:false,message:'Share cancelled.'}
    return{ok:false,message:'Could not share Brambleheart from this browser.'}
  }
}
