export interface BackgroundOption {
  value:string
  label:string
  url:string
}

const modules=import.meta.glob('../assets/backgrounds/*.{png,jpg,jpeg,webp}',{
  eager:true,
  query:'?url',
  import:'default',
}) as Record<string,string>

function slugFromPath(path:string){
  const file=path.split('/').pop()||path
  return file.replace(/\.[^.]+$/,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
}
function labelFromSlug(slug:string){
  if(slug==='ready-for-adventure')return'Ready For Adventure'
  return slug.split('-').filter(Boolean).map(word=>word[0]?.toUpperCase()+word.slice(1)).join(' ')
}

const discoveredByValue=new Map<string,BackgroundOption>()
for(const [path,url] of Object.entries(modules)){
  const value=slugFromPath(path)
  if(value&&!discoveredByValue.has(value))discoveredByValue.set(value,{value,label:labelFromSlug(value),url})
}
const discovered=Array.from(discoveredByValue.values()).sort((a,b)=>{
  const preferred=['ready-for-adventure','thornwick-market','skullfen-ruins','blightbound-horror']
  const ai=preferred.indexOf(a.value),bi=preferred.indexOf(b.value)
  if(ai>=0||bi>=0){if(ai<0)return 1;if(bi<0)return-1;return ai-bi}
  return a.label.localeCompare(b.label)
})

export const backgroundOptions:BackgroundOption[]=[{value:'none',label:'Default',url:''},...discovered]
export const backgroundIds=backgroundOptions.map(item=>item.value)
export function backgroundUrl(value:string){return backgroundOptions.find(item=>item.value===value)?.url||''}
export function backgroundLabel(value:string){return backgroundOptions.find(item=>item.value===value)?.label||'Default'}
