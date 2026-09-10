import { externalLinks } from '../data/links'

interface DiscordWidgetPayload {
  instant_invite?:unknown
  presence_count?:unknown
}
interface DiscordInvitePayload {
  approximate_member_count?:unknown
  approximate_presence_count?:unknown
}
interface DiscordGuildPreviewPayload {
  approximate_member_count?:unknown
  approximate_presence_count?:unknown
}
export interface DiscordCommunityCounts {
  members:number|null
  online:number|null
}
export interface CreatorFollowerCount {
  count:number|null
  complete:boolean
}

function cleanCount(value:unknown){
  const count=Number(value)
  return Number.isFinite(count)&&count>=0?Math.floor(count):null
}
function inviteCode(value:string){
  try{return new URL(value).pathname.split('/').filter(Boolean).at(-1)||''}catch{return''}
}
function guildIdFromWidget(value:string){
  return value.match(/\/guilds\/(\d+)\/widget\.json(?:$|[?#])/i)?.[1]||''
}

async function loadGuildPreview(guildId:string):Promise<DiscordCommunityCounts>{
  if(!guildId)return{members:null,online:null}
  try{
    const response=await fetch(`https://discord.com/api/v10/guilds/${encodeURIComponent(guildId)}/preview`,{headers:{Accept:'application/json'}})
    if(!response.ok)return{members:null,online:null}
    const payload=await response.json() as DiscordGuildPreviewPayload
    return{
      members:cleanCount(payload.approximate_member_count),
      online:cleanCount(payload.approximate_presence_count),
    }
  }catch{return{members:null,online:null}}
}

async function loadDiscordServerCounts(widgetUrl:string,fallbackInvite=''):Promise<DiscordCommunityCounts>{
  const previewPromise=loadGuildPreview(guildIdFromWidget(widgetUrl))
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

  const preview=await previewPromise
  let members=preview.members
  online=preview.online??online

  const code=inviteCode(invite)
  if(code){
    try{
      const response=await fetch(`https://discord.com/api/v10/invites/${encodeURIComponent(code)}?with_counts=true`,{headers:{Accept:'application/json'}})
      if(response.ok){
        const payload=await response.json() as DiscordInvitePayload
        members=cleanCount(payload.approximate_member_count)??members
        online=cleanCount(payload.approximate_presence_count)??online
      }
    }catch{}
  }

  return{members,online}
}

export function loadDiscordCommunityCounts(){
  return loadDiscordServerCounts(externalLinks.discordWidget,externalLinks.discord)
}

/**
 * Creator followers are the combined public member counts for the Brambleheart
 * community plus the two creator communities. Discord does not expose a way to
 * deduplicate users who belong to more than one of these servers.
 *
 * Presence/online counts are deliberately never used as follower counts. If a
 * total member count cannot be obtained for every configured server, the result
 * remains incomplete rather than substituting the smaller online population.
 */
export async function loadCreatorFollowerCount():Promise<CreatorFollowerCount>{
  const sources=[
    {widget:externalLinks.discordWidget,invite:externalLinks.discord},
    ...externalLinks.creatorDiscordServers,
  ] as const
  const counts=await Promise.all(sources.map(source=>loadDiscordServerCounts(source.widget,source.invite)))
  if(counts.some(item=>item.members===null))return{count:null,complete:false}
  return{
    count:counts.reduce((sum,item)=>sum+(item.members as number),0),
    complete:true,
  }
}
