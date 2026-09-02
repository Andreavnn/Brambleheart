export interface MagicSpellAllowance {
  lore:number
  invocation:number
}

export interface MagicSpellGain {
  lore:number
  invocation:number
}

export type SpellCostKind='spell'|'signature'|'cantrip'|'variable'

export const MAGIC_LEVEL_MAX=10
export const LORE_ATTUNEMENT_DISCOUNT=2
export const ORDINARY_SPELL_MINIMUM_MANA=1


export const MAGIC_LEVEL_PROGRESSION:ReadonlyArray<{level:number;lore:number;invocation:number}>=[
  {level:1,lore:2,invocation:2},
  {level:2,lore:3,invocation:2},
  {level:3,lore:4,invocation:3},
  {level:4,lore:5,invocation:3},
  {level:5,lore:7,invocation:4},
  {level:6,lore:8,invocation:4},
  {level:7,lore:9,invocation:5},
  {level:8,lore:10,invocation:5},
  {level:9,lore:11,invocation:6},
  {level:10,lore:12,invocation:6},
]

export const SIGNATURE_SPELLS=new Set([
  'Smolder',
  'Flourishing Earth',
  'Oath Of Protection',
  'Hypothermia',
  'Scary Face',
  'Chorus Of Harmony',
  'Regrowth',
])

export const INVOCATION_CANTRIPS=new Set([
  'Whispering Wind',
  'Veil Of Glimmer',
  'Spectral Hand',
  'Forager’s Gift',
  'Mendcraft',
])

function clampLevel(level:number){return Math.max(0,Math.min(MAGIC_LEVEL_MAX,Math.floor(Number(level)||0)))}

export function magicSpellAllowance(level:number):MagicSpellAllowance{
  const current=clampLevel(level)
  if(current<1)return{lore:0,invocation:0}
  const row=MAGIC_LEVEL_PROGRESSION.find(entry=>entry.level===current)??MAGIC_LEVEL_PROGRESSION.at(-1)!
  return{lore:row.lore,invocation:row.invocation}
}

export function magicSpellGainAtLevel(level:number):MagicSpellGain{
  const current=clampLevel(level)
  if(current<1)return{lore:0,invocation:0}
  const previous=magicSpellAllowance(current-1)
  const next=magicSpellAllowance(current)
  return{lore:next.lore-previous.lore,invocation:next.invocation-previous.invocation}
}

export function isSignatureSpell(name:string){return SIGNATURE_SPELLS.has(String(name||''))}
export function isInvocationCantrip(name:string){return INVOCATION_CANTRIPS.has(String(name||''))}

export function spellCostKind(name:string,baseCost:number|null|undefined,signature=false,cantrip=false):SpellCostKind{
  if(signature||isSignatureSpell(name))return'signature'
  if(cantrip||isInvocationCantrip(name))return'cantrip'
  if(baseCost===null||baseCost===undefined||!Number.isFinite(Number(baseCost)))return'variable'
  return'spell'
}

export interface ResolveSpellManaInput {
  name:string
  lore:string
  baseCost:number|null|undefined
  attunedLore?:string
  manaSyphon?:number
  focusReduction?:number
  reductions?:number
  surcharges?:number
  signature?:boolean
  cantrip?:boolean
}

/**
 * Canonical Mana-cost authority.
 * Signature Spells are hard-free triggered effects. Invocation Cantrips are
 * explicit zero-cost exceptions. Every other numeric spell has a minimum
 * final cost of 1 Mana after all modifiers.
 */
export function resolveSpellManaCost(input:ResolveSpellManaInput):number|null{
  const kind=spellCostKind(input.name,input.baseCost,Boolean(input.signature),Boolean(input.cantrip))
  if(kind==='signature'||kind==='cantrip')return 0
  if(kind==='variable')return null
  const base=Math.max(0,Number(input.baseCost)||0)
  const attunement=input.attunedLore&&input.lore===input.attunedLore?LORE_ATTUNEMENT_DISCOUNT:0
  const manaSyphon=Math.max(0,Number(input.manaSyphon)||0)
  const focusReduction=Math.max(0,Number(input.focusReduction)||0)
  const reductions=Math.max(0,Number(input.reductions)||0)
  const surcharges=Math.max(0,Number(input.surcharges)||0)
  return Math.max(ORDINARY_SPELL_MINIMUM_MANA,base+manaSyphon+surcharges-attunement-focusReduction-reductions)
}

export function spellCostLabel(input:ResolveSpellManaInput):string{
  const kind=spellCostKind(input.name,input.baseCost,Boolean(input.signature),Boolean(input.cantrip))
  if(kind==='signature')return'Signature'
  if(kind==='cantrip')return'Cantrip'
  const value=resolveSpellManaCost(input)
  return value===null?'Variable':`${value} Mana`
}

export const START_OF_ROUND_SEQUENCE=[
  'Choose and resolve one eligible CORE Instinct ability.',
  'Apply effects that increase or decrease Magic Regen for this round.',
  'Restore Mana equal to the character’s current Magic Regen, without exceeding Mana Pool unless a rule explicitly allows it.',
  'Begin turns in Initiative Order.',
] as const
