/** Canonical UI presentation for Core Action and Ability family keywords. */
export const ABILITY_TYPE_KEYWORDS=new Set(['Core','Move','Combat','Reactive','Instinct','Passive','Touch','Shoot','Magic'])

export function canonicalAbilityType(value:string){
  const key=String(value||'').trim().toLowerCase()
  if(key==='reaction')return'Reactive'
  if(key==='movement')return'Move'
  if(key==='melee')return'Touch'
  return String(value||'').trim().replace(/^./,letter=>letter.toUpperCase())
}

export function isRetiredAbilityKeyword(value:string){return canonicalAbilityType(value)==='Root'}
export function activeAbilityKeywords(values:string[]|undefined){
  return Array.from(new Set((values||[]).flatMap(value=>String(value).split(/[|,;]+/).map(item=>item.trim()).filter(item=>item&&!isRetiredAbilityKeyword(item)))))
}
export function isAbilityTypeKeyword(value:string){return ABILITY_TYPE_KEYWORDS.has(canonicalAbilityType(value))}
export function abilityTypeClass(value:string){return`type-${canonicalAbilityType(value).toLowerCase().replace(/[^a-z0-9]+/g,'-')}`}
export function abilityPillLabel(value:string){const type=canonicalAbilityType(value);return type==='Core'?'CORE ACTION':type.toUpperCase()}
