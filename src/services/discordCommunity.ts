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

export async function loadDiscordCommunityCounts():Promise<DiscordCommunityCounts>{
  let online:number|null=null
  let invite:string=externalLinks.discord
  try{
    const response=await fetch(externalLinks.discordWidget,{headers:{Accept:'application/json'}})
    if(response.ok){
      const payload=await response.json() as DiscordWidgetPayload
      online=cleanCount(payload.presence_count)
      if(typeof payload.instant_invite==='string'&&payload.instant_invite.trim())invite=payload.instant_invite.trim()
    }
  }catch{}

  const code=inviteCode(invite)||inviteCode(externalLinks.discord)
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
