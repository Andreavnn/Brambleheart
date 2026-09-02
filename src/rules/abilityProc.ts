import { structuredRule } from './rulesEngine'

export interface AbilityProcSource {
  id:string
  name:string
  source:string
  rules:string
  keywords:string[]
}

export type AbilityProcRelation='trigger'|'modifier'
export type AbilityProcActor='self'|'ally'|'enemy'|'any'

export interface AbilityProcMatch {
  relation:AbilityProcRelation
  actor:AbilityProcActor
  reason:string
  trigger:string
  conditional:boolean
  score:number
}

type AbilityEventProfile={
  combat:boolean
  movement:boolean
  magic:boolean
  spell:boolean
  damage:boolean
  lethalDamage:boolean
  healing:boolean
  enhance:boolean
  hex:boolean
  wardRoll:boolean
  attributeSave:boolean
  roll:boolean
  targeted:boolean
  manaCost:boolean
  compelsRenew:boolean
}

function normalized(value:string){
  return String(value||'')
    .normalize('NFKD')
    .replace(/[’‘`]/g,"'")
    .replace(/[^a-zA-Z0-9'+-]+/g,' ')
    .replace(/\s+/g,' ')
    .trim()
    .toLowerCase()
}

function normalizedName(value:string){return normalized(value).replace(/\bthe\b/g,' ').replace(/\s+/g,' ').trim()}

function abilityAliases(name:string){
  const base=normalizedName(name)
  const aliases=new Set<string>([base])
  if(base==='range strike')aliases.add('ranged strike')
  if(base==='hero s charge')aliases.add("hero's charge")
  return Array.from(aliases).filter(Boolean)
}

function fieldValue(ability:AbilityProcSource,label:string){
  return structuredRule(ability.rules).fields.find(field=>field.label===label)?.value||''
}

function triggerValue(ability:AbilityProcSource){return fieldValue(ability,'TRIGGER')}

function nonTriggerText(ability:AbilityProcSource){
  const parsed=structuredRule(ability.rules)
  const fields=parsed.fields.filter(field=>!['TRIGGER','KEYWORDS','REQUIRES','RESTRICTIONS','COOLDOWN'].includes(field.label)).map(field=>`${field.label}: ${field.value}`)
  return `${parsed.intro} ${fields.join(' ')}`.trim()
}

function keywordSet(ability:AbilityProcSource){return new Set(ability.keywords.map(normalizedName))}

function profile(ability:AbilityProcSource):AbilityEventProfile{
  const keywords=keywordSet(ability)
  const name=normalizedName(ability.name)
  const source=normalizedName(ability.source)
  const effect=normalized(nonTriggerText(ability))
  const cost=normalized(fieldValue(ability,'COST'))
  const isSpellSource=source.includes('spell')
  const combat=keywords.has('combat')||keywords.has('touch')||keywords.has('shoot')||name==='melee strike'||name==='range strike'||name==='ranged strike'
  const movement=keywords.has('move')||/\bmove\b|\bmovement\b|\bspeed\b/.test(effect)
  const magic=keywords.has('magic')||isSpellSource||name==='arcane command'
  const spell=isSpellSource||name==='arcane command'
  const damage=/\bdamage\b|\bdamage dealt\b|\bdeal\b/.test(effect)||/\bstrike\b/.test(name)
  const lethalDamage=/\blethal damage\b/.test(effect)
  const healing=/\brestore\b[^.]{0,40}\bhealth\b|\bheal(?:ing)?\b/.test(effect)
  const enhance=keywords.has('enhance')||/\benhance\b/.test(effect)
  const hex=keywords.has('hex')||/\bhex\b/.test(effect)
  const wardRoll=/\bward roll\b|\bward\b/.test(effect)||structuredRule(ability.rules).fields.some(field=>field.label==='TO HIT'&&/\bward\b/i.test(field.value))
  const attributeSave=/\battribute save\b/.test(effect)||structuredRule(ability.rules).fields.some(field=>field.label==='SAVE')
  const roll=wardRoll||attributeSave||/\broll\b|\bto hit\b|\bstrike roll\b/.test(effect)
  const targeted=/\btarget\b|\btargeted\b/.test(effect)||structuredRule(ability.rules).fields.some(field=>['DECLARE','TARGET'].includes(field.label))
  const manaCost=/\bmana\b/.test(cost)||/\bcost\b[^.]{0,20}\bmana\b/.test(effect)
  const compelsRenew=/\bcompel(?:led|s)?\b.*\brenew the heart\b|\brequires?\b.*\brenew the heart\b/.test(effect)
  return{combat,movement,magic,spell,damage,lethalDamage,healing,enhance,hex,wardRoll,attributeSave,roll,targeted,manaCost,compelsRenew}
}

function triggerActor(trigger:string):AbilityProcActor{
  const text=normalized(trigger)
  if(/\byou or an ally\b|\bcharacter\b/.test(text))return'any'
  if(/\ban ally\b|\byour ally\b/.test(text))return'ally'
  if(/\ban enemy\b|\bthe enemy\b/.test(text))return'enemy'
  if(/\byou\b|\byour\b/.test(text))return'self'
  return'any'
}

function containsAlias(haystack:string,alias:string){return` ${haystack} `.includes(` ${alias} `)}

function triggerBindsOtherNamedAbility(trigger:string,source:AbilityProcSource,knownAbilities:AbilityProcSource[]){
  const text=normalizedName(trigger)
  const sourceAliases=new Set(abilityAliases(source.name))
  return knownAbilities.some(ability=>ability.id!==source.id&&abilityAliases(ability.name).some(alias=>{
    if(alias.length<5||sourceAliases.has(alias)||!containsAlias(text,alias))return false
    return[`when using ${alias}`,`when you use ${alias}`,`successfully dealing damage with ${alias}`,`damage dealt by ${alias}`,`target of ${alias}`,`granted by ${alias}`,`additional strike granted by ${alias}`].some(phrase=>text.includes(phrase))
  }))
}

function directNameMatch(source:AbilityProcSource,text:string){
  const haystack=normalizedName(text)
  return abilityAliases(source.name).some(alias=>alias.length>=3&&containsAlias(haystack,alias))
}

function genericTriggerMatch(source:AbilityProcSource,trigger:string,knownAbilities:AbilityProcSource[]):AbilityProcMatch|null{
  const text=normalized(trigger)
  const events=profile(source)
  const keywords=keywordSet(source)
  const actor=triggerActor(trigger)
  const namedOther=triggerBindsOtherNamedAbility(trigger,source,knownAbilities)
  const make=(reason:string,score=70,conditional=true):AbilityProcMatch=>({relation:'trigger',actor,reason,trigger,conditional,score})

  if(directNameMatch(source,trigger))return make(`The trigger explicitly names ${source.name}.`,100,/\bif\b|\bwhen\b.*\bsuccess|\bfail|\bdamage|\bexceptional/.test(text))
  if(namedOther)return null

  if(/\bcore instinct ability\b/.test(text)&&keywords.has('core')&&keywords.has('instinct'))return make(`${source.name} spends the CORE Instinct opportunity.`)
  if(/\bcore move ability\b/.test(text)&&keywords.has('core')&&keywords.has('move'))return make(`${source.name} spends the CORE Move opportunity.`)
  if(/\bcore combat ability\b/.test(text)&&keywords.has('core')&&keywords.has('combat'))return make(`${source.name} spends the CORE Combat opportunity.`)
  if(/\bmoves? as part of a combat ability\b/.test(text)&&events.combat&&events.movement)return make(`${source.name} is a Combat ability that can move a character.`)
  if(/\buses? a combat ability\b|\bcombat ability\b/.test(text)&&events.combat)return make(`${source.name} is a Combat ability.`)
  if(/\buses? a magic ability\b|\bmagic ability\b/.test(text)&&events.magic)return make(`${source.name} is a Magic ability.`)
  if(/\bspell that restores? health or grants? an enhance\b/.test(text)&&events.spell&&(events.healing||events.enhance))return make(`${source.name} is a spell that can restore Health or grant an Enhance.`)
  if(/\bspell cast\b|\bcast a spell\b|\bfirst spell\b|\bspell you cast\b/.test(text)&&events.spell)return make(`${source.name} casts or resolves a spell.`)
  if(/\brestores? health\b|\brestore health\b/.test(text)&&events.healing)return make(`${source.name} can restore Health.`)
  if(/\bgrants? an enhance\b|\bgrant an enhance\b/.test(text)&&events.enhance)return make(`${source.name} can grant an Enhance.`)
  if(/\benhance or hex\b|\benhance\b.*\bhex\b/.test(text)&&(events.enhance||events.hex))return make(`${source.name} can apply an Enhance or Hex.`)
  if(/\blethal damage\b/.test(text)&&events.lethalDamage)return make(`${source.name} can deal Lethal damage.`)
  if(/\bsuffers? damage\b|\bwould suffer\b[^.]{0,30}\bdamage\b|\bsuccessfully deal(?:ing|s)? damage\b/.test(text)&&events.damage)return make(`${source.name} can deal damage.`)
  if(/\bfails? a ward roll\b|\bward roll\b/.test(text)&&events.wardRoll)return make(`${source.name} can require or oppose a Ward roll.`)
  if(/\bfails? an attribute save\b|\battribute save\b/.test(text)&&events.attributeSave)return make(`${source.name} can require an Attribute Save.`)
  if(/\bbefore making a roll\b|\bexceptional result\b/.test(text)&&events.roll)return make(`${source.name} can create the roll named by this trigger.`)
  if(/\btargeted by a combat ability\b/.test(text)&&events.combat&&events.targeted)return make(`${source.name} is a targeting Combat ability.`)
  if(/\bcompel\b|\brenew the heart\b/.test(text)&&events.compelsRenew)return make(`${source.name} can compel Renew the Heart.`)
  return null
}

function passiveModifierMatch(source:AbilityProcSource,candidate:AbilityProcSource):AbilityProcMatch|null{
  const trigger=triggerValue(candidate)
  const text=trigger?nonTriggerText(candidate):candidate.rules
  if(!directNameMatch(source,text))return null
  return{relation:'modifier',actor:'self',reason:`${candidate.name} explicitly modifies or references ${source.name}.`,trigger:'Passive or conditional modifier',conditional:/\bif\b|\bwhile\b|\bwhen\b/.test(normalized(text)),score:80}
}

export function findAbilityProcMatch(source:AbilityProcSource,candidate:AbilityProcSource,knownAbilities:AbilityProcSource[]=[]):AbilityProcMatch|null{
  if(!source||!candidate||source.id===candidate.id||normalizedName(source.name)===normalizedName(candidate.name))return null
  const trigger=triggerValue(candidate)
  if(trigger){
    const triggerMatch=genericTriggerMatch(source,trigger,knownAbilities)
    if(triggerMatch)return triggerMatch
  }
  return passiveModifierMatch(source,candidate)
}

export function abilityProcCondition(ability:AbilityProcSource){
  const trigger=triggerValue(ability)
  if(trigger)return trigger
  const parsed=structuredRule(ability.rules)
  const effect=parsed.fields.find(field=>field.label==='EFFECT')?.value||parsed.intro
  if(effect&&/\bwhile\b|\bwhen\b|\bagainst\b|\busing\b|\bstrike\b|\bspell\b|\bability\b/i.test(effect))return`Passive: ${effect}`
  return''
}

export function abilityProcActorLabel(actor:AbilityProcActor){
  if(actor==='ally')return'Ally response'
  if(actor==='enemy')return'Enemy response'
  if(actor==='self')return'Self response'
  return'Any character'
}
