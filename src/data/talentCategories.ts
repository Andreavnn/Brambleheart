export const TALENT_CATEGORIES=['Offensive Combat','Defensive Combat','Magic','Utility'] as const
export type TalentCategory=(typeof TALENT_CATEGORIES)[number]

const renames:Record<string,string>={pocuncer:'Pouncer',heartwall:'Hearthwall','fang break':'Cleave','primate grip':'Beastgrasp'}
function key(value:string){return String(value||'').trim().toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ')}
function capitalizeTalentName(value:string){return String(value||'').trim().toLowerCase().replace(/(^|[\s\-—–/])([a-z])/g,(_m,prefix:string,letter:string)=>`${prefix}${letter.toUpperCase()}`)}
export function canonicalTalentName(name:string){return renames[key(name)]||capitalizeTalentName(name)}
export function talentNameMatches(left:string,right:string){return key(canonicalTalentName(left))===key(canonicalTalentName(right))}

const categoryOverrides=new Map<string,TalentCategory>()
function assign(category:TalentCategory,names:string[]){for(const name of names)categoryOverrides.set(key(name),category)}
assign('Utility',['Beastgrasp','Victory Roar','Fieldcraft','Skillcraft','Shadow Fang','Pack Tactics','Rooted Paws',"Hare's Luck",'Hare’s Luck','Second Chances','Blood Oath','Foresight','Field Medic','Ironhide','Magebane','Snapstep','Oath Guard','Anchor Spirit','Battlebane','Jumpstart','Keen Edge','Undying Resolve'])
assign('Offensive Combat',['Breakgrip','Cleave','Pouncer','Thunderous Charge','Hammerfall','Heartseeker','Heroic Surge','Hollowing Claw','Pair Shot','Ragebound','Heavy Draw',"Titan's Wake",'Titan’s Wake','Twin Linked','Warpath','Wildchain','Warhowl','Guardbreaker','Ramhorn','Bond Of Blades','Rhythm Of Blades','Hunter’s Mark','Sure Hand'])
assign('Defensive Combat',['Hearthwall','Turnstrike','Stillroot','Shield Hand','Ward Guard','Evading Retreat'])
assign('Magic',['Current Overflow','Hearth Touch','Pulse Of Attunement','Quick Cast','Spell Breaker','Spell Cleave','Spellforge','Spellwinds','Steelweaver','Threadseer','Witch Hunter'])
export function talentCategoryOverride(name:string){return categoryOverrides.get(key(name))}
export function classifyTalent(name:string,text='',keywords:string[]=[]):TalentCategory{const forced=talentCategoryOverride(name);if(forced)return forced;const hay=`${name} ${text} ${keywords.join(' ')}`.toLowerCase();if(/spell|mana|magic|lore|invocation/.test(hay))return'Magic';if(/ward|defen|guard|block|resist|armor|shield|protect/.test(hay))return'Defensive Combat';if(/strike|weapon|combat|attack|damage|shoot|touch|melee/.test(hay))return'Offensive Combat';return'Utility'}
