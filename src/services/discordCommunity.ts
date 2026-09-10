import { externalLinks } from '../data/links'

interface DiscordWidgetPayload {
  instant_invite?:unknown
  presence_count?:unknown
}
interface DiscordInvitePayload {
  approximate_member_count?:unknown
  approximate_presence_count?:unknown
}
export interface DiscordCommunityCounts {
  members:number|null
  online:number|null
}

function cleanCount(value:unknown){
  const count=Number(value)
  return Number.isFinite(count)&&count>=0?Math.floor(count):null
}
function inviteCode(value:string){
  try{return new URL(value).pathname.split('/').filter(Boolean).at(-1)||''}catch{return''}
}

async function loadDiscordServerCounts(widgetUrl:string,fallbackInvite=''):Promise<DiscordCommunityCounts>{
  let online:number|null=null
  let invite=fallbackInvite
  try{
    const response=await fetch(widgetUrl,{headers:{Accept:'application/json'}})
    if(response.ok){
      const payload=await response.json() as DiscordWidgetPayload
      online=cleanCount(payload.presence_count)
      if(typeof payload.instant_invite==='string'&&payload.instant_invite.trim())invite=payload.instant_invite.trim()
    }
  }catch{}

  const code=inviteCode(invite)
  if(!code)return{members:null,online}
  try{
    const response=await fetch(`https://discord.com/api/v10/invites/${encodeURIComponent(code)}?with_counts=true`,{headers:{Accept:'application/json'}})
    if(!response.ok)return{members:null,online}
    const payload=await response.json() as DiscordInvitePayload
    return{
      members:cleanCount(payload.approximate_member_count),
      online:cleanCount(payload.approximate_presence_count)??online,
    }
  }catch{return{members:null,online}}
}

export function loadDiscordCommunityCounts(){return loadDiscordServerCounts(externalLinks.discordWidget,externalLinks.discord)}

/**
 * Creator followers are the combined public member counts for the Brambleheart
 * community plus the two creator communities. Discord does not expose a way to
 * deduplicate users who belong to more than one of these servers.
 */
export async function loadCreatorFollowerCount(){
  const sources=[
    [externalLinks.discordWidget,externalLinks.discord],
    ...externalLinks.creatorDiscordWidgets.map(widget=>[widget,''] as const),
  ] as const
  const counts=await Promise.all(sources.map(([widget,invite])=>loadDiscordServerCounts(widget,invite)))
  if(counts.some(item=>item.members===null))return null
  return counts.reduce((sum,item)=>sum+(item.members||0),0)
}
