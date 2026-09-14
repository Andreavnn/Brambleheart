import { abilityFeaturePillKeywords, abilityTypeClass, abilityTypeKeywords, canonicalAbilityType } from '../rules/abilityPresentation'
export const TALENT_CATEGORIES=['Offensive','Defensive','Magic','Utility'] as const
export type TalentCategory=(typeof TALENT_CATEGORIES)[number]

const renames:Record<string,string>={pocuncer:'Pouncer',heartwall:'Hearthwall','fang break':'Cleave','primate grip':'Beastgrasp','sure hand':'Sure Paw','twin linked':'Twin-Linked'}
function key(value:string){return String(value||'').trim().toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ')}
function capitalizeTalentName(value:string){return String(value||'').trim().toLowerCase().replace(/(^|[\s\-—–/])([a-z])/g,(_m,prefix:string,letter:string)=>`${prefix}${letter.toUpperCase()}`)}
export function canonicalTalentName(name:string){return renames[key(name)]||capitalizeTalentName(name)}
export function talentNameMatches(left:string,right:string){return key(canonicalTalentName(left))===key(canonicalTalentName(right))}

export function talentManaCost(text:string){const match=String(text||'').match(/\bCOST:\s*\[?([0-9]+)\]?\s*mana/i);return match?Number(match[1]):null}

export const RETIRED_TALENTS=new Set(['Ward Guard','Rooted Paw','Rooted Paws'])

const categoryOverrides=new Map<string,TalentCategory>()
function assign(category:TalentCategory,names:string[]){for(const name of names)categoryOverrides.set(key(name),category)}
assign('Utility',['Beastgrasp','Victory Roar','Fieldcraft','Skillcraft','Pack Tactics',"Hare's Luck",'Hare’s Luck','Second Chances','Blood Oath','Foresight','Field Medic','Ironhide','Magebane','Snapstep','Oath Guard','Anchor Spirit','Battlebane','Jumpstart','Keen Edge','Undying Resolve','Bond Of Blades','Rhythm Of Blades','Sure Paw','Twin-Linked','Witch Hunter'])
assign('Offensive',['Breakgrip','Cleave','Pouncer','Thunderous Charge','Hammerfall','Heartseeker','Heroic Surge','Hollowing Claw','Pair Shot','Ragebound','Heavy Draw',"Titan's Wake",'Titan’s Wake','Warpath','Wildchain','Warhowl','Guardbreaker','Ramhorn','Hunter’s Mark','Spell Cleave','Shadow Fang'])
assign('Defensive',['Hearthwall','Turnstrike','Stillroot','Shield Hand','Evading Retreat','Spell Breaker'])
assign('Magic',['Current Overflow','Hearth Touch','Pulse Of Attunement','Quick Cast','Spellforge','Spellwinds','Steelweaver','Threadseer'])
export function talentCategoryOverride(name:string){return categoryOverrides.get(key(name))}
export function classifyTalent(name:string,text='',keywords:string[]=[]):TalentCategory{const forced=talentCategoryOverride(name);if(forced)return forced;const hay=`${name} ${text} ${keywords.join(' ')}`.toLowerCase();if(/spell|mana|magic|lore|invocation/.test(hay))return'Magic';if(/ward|defen|guard|block|resist|armor|shield|protect/.test(hay))return'Defensive';if(/strike|weapon|combat|attack|damage|shoot|touch|melee/.test(hay))return'Offensive';return'Utility'}


const TALENTS_WITHOUT_ABILITY_PILL=new Set([
  'Bond Of Blades',"Hunter’s Mark",'Rhythm Of Blades','Hearthwall','Shield Hand','Hearth Touch',
  'Pulse Of Attunement','Spell Breaker','Steelweaver','Beastgrasp','Fieldcraft','Foresight','Ironhide',
  'Jumpstart','Skillcraft','Stoneblood','Undying Resolve','Victory Roar',
].map(key))

export function talentFeaturePillKeywords(name:string,keywords:string[]|undefined){
  const pills=abilityFeaturePillKeywords(keywords)
  if(!TALENTS_WITHOUT_ABILITY_PILL.has(key(name)))return pills
  return pills.filter(value=>canonicalAbilityType(value)!=='Ability')
}

const TALENT_TONE_OVERRIDES=new Map<string,string>([
  ['Bond Of Blades','Touch'],
  ["Hunter's Mark",'Shoot'],
  ['Rhythm Of Blades','Touch'],
  ['Pulse Of Attunement','Magic'],
  ['Beastgrasp','Touch'],
].map(([name,tone])=>[key(name),tone]))

export function talentToneClasses(name:string,keywords:string[]|undefined){
  const override=TALENT_TONE_OVERRIDES.get(key(canonicalTalentName(name)))
  const types=override?[override]:abilityTypeKeywords(keywords)
  return types.map(abilityTypeClass)
}

