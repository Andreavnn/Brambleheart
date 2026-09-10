export const ABILITY_TYPE_KEYWORDS=new Set(['Core','Move','Combat','Reactive','Instinct','Passive','Touch','Shoot','Magic'])

export function canonicalAbilityType(value:string){
  const normalized=value.trim().replace(/[_-]+/g,' ').replace(/\s+/g,' ')
  if(!normalized)return''
  if(/^reaction$/i.test(normalized))return'Reactive'
  if(/^movement$/i.test(normalized))return'Move'
  if(/^melee$/i.test(normalized))return'Touch'
  return normalized.split(' ').map(word=>word?word[0].toUpperCase()+word.slice(1).toLowerCase():'').join(' ')
}

export function activeAbilityKeywords(values:string[]|undefined){
  const out:string[]=[]
  for(const value of values||[]){
    for(const token of String(value).split(/[|;,]/).map(item=>item.trim()).filter(Boolean)){
      if(/^root$/i.test(token))continue
      if(!out.some(item=>item.toLowerCase()===token.toLowerCase()))out.push(token)
    }
  }
  return out
}

export function abilityTypeKeywords(values:string[]|undefined){
  return Array.from(new Set(activeAbilityKeywords(values).map(canonicalAbilityType).filter(value=>ABILITY_TYPE_KEYWORDS.has(value))))
}

export function abilityFeaturePillKeywords(values:string[]|undefined){
  const types=abilityTypeKeywords(values)
  const remaining=activeAbilityKeywords(values).filter(value=>{
    const canonical=canonicalAbilityType(value)
    return canonical!=='Ability'&&!ABILITY_TYPE_KEYWORDS.has(canonical)
  })
  return Array.from(new Set(['Ability',...types,...remaining]))
}

export function traitPillKeywords(values:string[]|undefined,kind:'Heritage'|'Cultural',speciesName='',grantsSkill=false){
  const active=activeAbilityKeywords(values)
  const types=abilityTypeKeywords(active)
  const canonicalActive=active.map(canonicalAbilityType)
  if(kind==='Cultural'&&(grantsSkill||canonicalActive.includes('Skill')))return['Skill','Cultural','Trait']

  const structural=new Set(['Ability','Trait','Heritage','Cultural','Culture','Heritage Trait','Culture Trait','Cultural Trait'])
  const remaining=active.filter(value=>{
    const canonical=canonicalAbilityType(value)
    return !ABILITY_TYPE_KEYWORDS.has(canonical)&&!structural.has(canonical)&&canonical.toLowerCase()!==speciesName.trim().toLowerCase()
  })
  const includeAbility=!types.includes('Passive')
  return Array.from(new Set([...(includeAbility?['Ability']:[]),...types,...remaining,kind,'Trait',...(speciesName?[speciesName]:[])]))
}

export function isAbilityTypeKeyword(value:string){return ABILITY_TYPE_KEYWORDS.has(canonicalAbilityType(value))}
export function abilityTypeClass(value:string){return`type-${canonicalAbilityType(value).toLowerCase().replace(/[^a-z0-9]+/g,'-')}`}
export function abilityPillLabel(value:string){const type=canonicalAbilityType(value);return type==='Core'?'CORE':type.toUpperCase()}
export function abilityFeaturePillClass(value:string){const canonical=canonicalAbilityType(value);if(canonical==='Ability')return['ability-cost-pill','type-ability'];return ABILITY_TYPE_KEYWORDS.has(canonical)?['ability-cost-pill',abilityTypeClass(canonical)]:['keyword-pill']}
export function abilityFeaturePillLabel(value:string){const canonical=canonicalAbilityType(value);return canonical==='Ability'?'ABILITY':ABILITY_TYPE_KEYWORDS.has(canonical)?abilityPillLabel(canonical):canonical.toUpperCase()}
