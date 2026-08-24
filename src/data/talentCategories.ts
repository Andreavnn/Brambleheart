export const TALENT_CATEGORIES=['Offensive Combat','Defensive Combat','Magic','Utility'] as const
export type TalentCategory=(typeof TALENT_CATEGORIES)[number]

const renames:Record<string,string>={
  pocuncer:'Pouncer',
  heartwall:'Hearthwall',
}

function key(value:string){return String(value||'').trim().toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ')}

export function canonicalTalentName(name:string){return renames[key(name)]||name}
export function talentNameMatches(left:string,right:string){return key(canonicalTalentName(left))===key(canonicalTalentName(right))}

const categoryOverrides=new Map<string,TalentCategory>()
function assign(category:TalentCategory,names:string[]){for(const name of names)categoryOverrides.set(key(name),category)}

assign('Utility',[
  'Beastgrasp','Breakgrip','Victory Roar','Fieldcart','Fieldcraft','Shadow Fang','Pack Tactics','Rooted Paws','Fang Break',"Hare's Luck",'Hare’s Luck','Second Chances','Warhowl','Blood Oath','Witch Hunter',
])
assign('Utility',['Foresight','Field Medic','Ironhide'])
assign('Offensive Combat',[
  'Pocuncer','Pouncer','Thunderous Charge','Hammerfall','Heartseeker','Heroic Surge','Hollowing Claw','Pair Shot','Ragebound','Stillroot','Turnstrike','Heavy Draw',"Titan's Wake",'Titan’s Wake','Twin-Linked','Warpath','Wildchain',
])
assign('Defensive Combat',['Heartwall','Hearthwall','Spell Breaker','Ramhorn'])
assign('Utility',['Magebane','Snapstep'])
assign('Utility',['Oath Guard'])

export function talentCategoryOverride(name:string){return categoryOverrides.get(key(name))}

export function classifyTalent(name:string,text='',keywords:string[]=[]):TalentCategory{
  const forced=talentCategoryOverride(name)
  if(forced)return forced
  const hay=`${name} ${text} ${keywords.join(' ')}`.toLowerCase()
  if(/spell|mana|magic|lore|invocation/.test(hay))return'Magic'
  if(/ward|defen|guard|block|resist|armor|shield|protect/.test(hay))return'Defensive Combat'
  if(/strike|weapon|combat|attack|damage|shoot|melee/.test(hay))return'Offensive Combat'
  if(/move|movement|speed|travel|climb|jump/.test(hay))return'Utility'
  if(/health|guts|surviv|rest|heal/.test(hay))return'Utility'
  if(/charm|presence|social|speech|ally|friend|kin/.test(hay))return'Utility'
  return'Utility'
}
