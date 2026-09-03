import { structuredRule } from './rulesEngine'

export interface AbilityProcSource {
  id:string
  name:string
  source:string
  rules:string
  keywords:string[]
}

export type AbilityProcRelation='trigger'|'modifier'|'activation'
export type AbilityProcActor='self'|'ally'|'enemy'|'any'
export type AbilityTriggerDependency='independent'|'dependent'|'passive'
export interface AbilityProcContext{sameOwner?:boolean}

export interface AbilityProcMatch {
  relation:AbilityProcRelation
  actor:AbilityProcActor
  reason:string
  trigger:string
  conditional:boolean
  score:number
}

type TargetRelation='self'|'ally'|'enemy'|'any'
type AbilityEventProfile={
  combat:boolean
  movement:boolean
  magic:boolean
  spell:boolean
  actualSpell:boolean
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
  targets:Set<TargetRelation>
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

function parsedRule(ability:AbilityProcSource){return structuredRule(ability.rules)}
function fieldValue(ability:AbilityProcSource,label:string){return parsedRule(ability).fields.find(field=>field.label===label)?.value||''}
function triggerValue(ability:AbilityProcSource){return fieldValue(ability,'TRIGGER')}

function nonTriggerText(ability:AbilityProcSource){
  const parsed=parsedRule(ability)
  const fields=parsed.fields.filter(field=>!['TRIGGER','KEYWORDS','REQUIRES','RESTRICTIONS','COOLDOWN'].includes(field.label)).map(field=>`${field.label}: ${field.value}`)
  return `${parsed.intro} ${fields.join(' ')}`.trim()
}

function keywordSet(ability:AbilityProcSource){return new Set(ability.keywords.map(normalizedName))}

export function isCoreActionSource(ability:AbilityProcSource){
  const source=normalizedName(ability.source)
  return source==='core action'||source==='core ability'
}

export function isReactiveAbility(ability:AbilityProcSource){
  const keywords=keywordSet(ability)
  return keywords.has('reactive')||keywords.has('reaction')
}

function targetRelations(ability:AbilityProcSource){
  const targets=new Set<TargetRelation>()
  const parsed=parsedRule(ability)
  const text=normalized(parsed.fields.filter(field=>['DECLARE','TARGET','AREA','EFFECT','TO HIT','SAVE'].includes(field.label)).map(field=>field.value).join(' '))
  if(/\bcast on yourself\b|\btarget yourself\b|\byourself\b/.test(text))targets.add('self')
  if(/\btarget(?:s|ed)?\b[^.]{0,50}\ball(?:y|ies)\b|\bally characters?\b/.test(text))targets.add('ally')
  if(/\btarget(?:s|ed)?\b[^.]{0,50}\benem(?:y|ies)\b|\benemy characters?\b/.test(text))targets.add('enemy')
  if(/\ball characters\b|\bchoose (?:one|1) target\b|\btarget (?:one|1) character\b/.test(text))targets.add('any')
  const name=normalizedName(ability.name)
  if(name==='melee strike'||name==='range strike'||name==='ranged strike'||name==="hero's charge")targets.add('enemy')
  return targets
}

function immediateDamageProfile(text:string){
  const source=String(text||'').replace(/\n/g,' ')
  const sentences=source.split(/[.!?]+/).map(sentence=>normalized(sentence)).filter(Boolean)
  const damageSentences=sentences.filter(sentence=>/\bdamage\b/.test(sentence)&&(/\bdeal\b|\bsuffer\b|\bdamage dealt\b/.test(sentence)))
  return damageSentences.some(sentence=>!(/\beach time\b|\bat the start of\b|\bat the end of\b|\bfollowing round\b|\bpasses through\b|\bends? a movement\b|\bwhen another\b/.test(sentence)))
}

function profile(ability:AbilityProcSource):AbilityEventProfile{
  const keywords=keywordSet(ability)
  const name=normalizedName(ability.name)
  const source=normalizedName(ability.source)
  const parsed=parsedRule(ability)
  const effectText=parsed.fields.filter(field=>!['TRIGGER','RESTRICTIONS','REQUIRES','COOLDOWN','DURATION','AFTERBURN'].includes(field.label)).map(field=>`${field.label}: ${field.value}`).join(' ')
  const effect=normalized(`${parsed.intro} ${effectText}`)
  const cost=normalized(fieldValue(ability,'COST'))
  const actualSpell=source.includes('spell')
  const combat=keywords.has('combat')||keywords.has('touch')||keywords.has('shoot')||name==='melee strike'||name==='range strike'||name==='ranged strike'
  const movement=keywords.has('move')||/\bmove\b|\bmovement\b|\bspeed\b/.test(effect)
  const magic=keywords.has('magic')||actualSpell||name==='arcane command'
  const spell=actualSpell||name==='arcane command'
  const damage=immediateDamageProfile(effectText)||name==='melee strike'||name==='range strike'||name==='ranged strike'
  const lethalDamage=damage&&/\blethal damage\b/.test(effect)
  const healing=/\brestore\b[^.]{0,40}\bhealth\b|\bheal(?:ing)?\b/.test(effect)
  const enhance=keywords.has('enhance')||/\benhance\b/.test(effect)
  const hex=keywords.has('hex')||/\bhex\b/.test(effect)
  const wardRoll=/\bward roll\b|\bward\b/.test(effect)||parsed.fields.some(field=>field.label==='TO HIT'&&/\bward\b/i.test(field.value))
  const attributeSave=/\battribute save\b/.test(effect)||parsed.fields.some(field=>field.label==='SAVE')
  const roll=wardRoll||attributeSave||/\broll\b|\bto hit\b|\bstrike roll\b/.test(effect)
  const targeted=/\btarget\b|\btargeted\b/.test(effect)||parsed.fields.some(field=>['DECLARE','TARGET'].includes(field.label))
  const manaCost=/\bmana\b/.test(cost)||/\bcost\b[^.]{0,20}\bmana\b/.test(effect)
  const compelsRenew=/\bcompel(?:led|s)?\b.*\brenew the heart\b|\brequires?\b.*\brenew the heart\b/.test(effect)
  return{combat,movement,magic,spell,actualSpell,damage,lethalDamage,healing,enhance,hex,wardRoll,attributeSave,roll,targeted,manaCost,compelsRenew,targets:targetRelations(ability)}
}

function triggerActor(trigger:string):AbilityProcActor{
  const text=normalized(trigger)
  if(/\byou or an ally\b|\bcharacter\b/.test(text))return'any'
  if(/\ban ally\b|\byour ally\b/.test(text))return'ally'
  if(/\ban enemy\b|\bthe enemy\b/.test(text))return'enemy'
  if(/\byou\b|\byour\b/.test(text))return'self'
  return'any'
}

function triggerSourceActor(trigger:string):AbilityProcActor{
  const text=normalized(trigger)
  if(/\ban ally\b[^.]{0,55}\b(?:uses?|casts?|moves?)\b|\bwhen an ally moves\b/.test(text))return'ally'
  if(/\ban enemy\b[^.]{0,55}\b(?:uses?|casts?|moves?|deals?)\b/.test(text))return'enemy'
  if(/\bwhen you\b[^.]{0,55}\b(?:use|cast|move|deal)\b/.test(text))return'self'
  return'any'
}

function triggerTarget(trigger:string):TargetRelation|null{
  const text=normalized(trigger)
  if(/\byou or an ally\b[^.]{0,60}\b(?:suffer|fail|would suffer|targeted|reduced)\b/.test(text))return'any'
  if(/\ban ally\b[^.]{0,60}\b(?:suffers?|fails?|would suffer|is targeted|is reduced)\b/.test(text))return'ally'
  if(/\ban enemy\b[^.]{0,60}\b(?:suffers?|fails?|would suffer|is targeted|is reduced)\b/.test(text))return'enemy'
  if(/\bwhen you\b[^.]{0,60}\b(?:suffer|fail|are targeted|would suffer|are reduced)\b|\bwhen you are targeted\b/.test(text))return'self'
  return null
}

function targetCompatible(source:AbilityProcSource,trigger:string,context:AbilityProcContext){
  if(!context.sameOwner)return true
  const sourceActor=triggerSourceActor(trigger)
  if(sourceActor==='ally'||sourceActor==='enemy')return false
  const required=triggerTarget(trigger)
  if(!required)return true
  const targets=profile(source).targets
  if(required==='any')return targets.has('self')||targets.has('ally')||targets.has('any')
  return targets.has(required)||targets.has('any')
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

function sourceExplicitlyBlocksCandidate(source:AbilityProcSource,candidate:AbilityProcSource){
  const text=normalizedName(source.rules)
  return abilityAliases(candidate.name).some(alias=>text.includes(`this spell cannot trigger ${alias}`)||text.includes(`this ability cannot trigger ${alias}`))
}

function requiredLore(trigger:string){
  const match=normalized(trigger).match(/\blore of ([a-z]+) spell\b/)
  return match?.[1]||''
}

function genericTriggerMatch(source:AbilityProcSource,candidate:AbilityProcSource,trigger:string,knownAbilities:AbilityProcSource[],context:AbilityProcContext):AbilityProcMatch|null{
  const text=normalized(trigger)
  const events=profile(source)
  const keywords=keywordSet(source)
  const actor=triggerActor(trigger)
  const namedOther=triggerBindsOtherNamedAbility(trigger,source,knownAbilities)
  const lore=requiredLore(trigger)
  const make=(reason:string,score=70,conditional=true):AbilityProcMatch=>({relation:'trigger',actor,reason,trigger,conditional,score})

  if(sourceExplicitlyBlocksCandidate(source,candidate))return null
  if(!targetCompatible(source,trigger,context))return null
  if(lore){
    if(!events.actualSpell||!keywords.has(lore))return null
    return make(`${source.name} is a Lore of ${lore.replace(/^./,letter=>letter.toUpperCase())} spell that can satisfy this trigger.`,96,true)
  }
  if(directNameMatch(source,trigger))return make(`The trigger explicitly names ${source.name}.`,100,/\bif\b|\bwhen\b.*\bsuccess|\bfail|\bdamage|\bexceptional/.test(text))
  if(namedOther)return null

  if(/\bcore instinct (?:action|ability)\b/.test(text)&&keywords.has('core')&&keywords.has('instinct'))return make(`${source.name} spends the Core Instinct Action opportunity.`)
  if(/\bcore move (?:action|ability)\b/.test(text)&&keywords.has('core')&&keywords.has('move'))return make(`${source.name} spends the Core Move Action opportunity.`)
  if(/\bcore combat (?:action|ability)\b/.test(text)&&keywords.has('core')&&keywords.has('combat'))return make(`${source.name} spends the Core Combat Action opportunity.`)
  if(/\bphysical combat ability\b/.test(text))return events.combat&&!events.magic?make(`${source.name} is a physical Combat ability.`):null
  if(/\bcharge(?: combat)? ability\b/.test(text))return(keywords.has('charge')||normalizedName(source.name)==="hero's charge")?make(`${source.name} is a Charge ability.`):null
  if(/\bmove or combat ability\b/.test(text))return(events.movement||events.combat)?make(`${source.name} is a Move or Combat ability.`):null
  if(/\b(?:any )?move ability\b/.test(text))return events.movement?make(`${source.name} is a Move ability.`):null
  if(/\bmoves? as part of a combat ability\b/.test(text)&&events.combat&&events.movement)return make(`${source.name} is a Combat ability that can move a character.`)
  if(/\bmagic ability that requires mana\b/.test(text))return events.magic&&events.manaCost?make(`${source.name} is a Magic ability with a Mana cost.`):null
  if(/\buses? a combat ability\b|\bcombat ability\b/.test(text)&&events.combat)return make(`${source.name} is a Combat ability.`)
  if(/\buses? a magic ability\b|\bmagic ability\b/.test(text)&&events.magic)return make(`${source.name} is a Magic ability.`)
  if(/\bspell that restores? health or grants? an enhance\b/.test(text)&&events.actualSpell&&(events.healing||events.enhance))return make(`${source.name} is a spell that can restore Health or grant an Enhance.`)
  if(/\bspell cast\b|\bcast a spell\b|\bfirst spell\b|\bspell you cast\b/.test(text)&&events.actualSpell)return make(`${source.name} is a spell cast by the character.`)
  if(/\brestores? health\b|\brestore health\b/.test(text)&&events.healing)return make(`${source.name} can restore Health.`)
  if(/\bgrants? an enhance\b|\bgrant an enhance\b/.test(text)&&events.enhance)return make(`${source.name} can grant an Enhance.`)
  if(/\benhance or hex\b|\benhance\b.*\bhex\b/.test(text)&&(events.enhance||events.hex))return make(`${source.name} can apply an Enhance or Hex.`)
  if(/\blethal damage\b/.test(text)&&events.lethalDamage)return make(`${source.name} can deal Lethal damage.`)
  if(/\bsuffers? damage\b|\bwould suffer\b[^.]{0,30}\bdamage\b|\bsuccessfully deal(?:ing|s)? damage\b/.test(text)&&events.damage)return make(`${source.name} can deal damage during its resolution.`)
  if(/\bfails? a ward roll\b|\bward roll\b/.test(text)&&events.wardRoll)return make(`${source.name} can require or oppose a Ward roll.`)
  if(/\bfails? an attribute save\b|\battribute save\b/.test(text)&&events.attributeSave)return make(`${source.name} can require an Attribute Save.`)
  if(/\bbefore making a roll\b|\bexceptional result\b/.test(text)&&events.roll)return make(`${source.name} can create the roll named by this trigger.`)
  if(/\btargeted by a combat ability\b/.test(text)&&events.combat&&events.targeted)return make(`${source.name} is a targeting Combat ability.`)
  if(/\bcompel\b|\brenew the heart\b/.test(text)&&events.compelsRenew)return make(`${source.name} can compel Renew the Heart.`)
  return null
}

function passiveModifierMatch(source:AbilityProcSource,candidate:AbilityProcSource):AbilityProcMatch|null{
  const trigger=triggerValue(candidate)
  const keywords=keywordSet(candidate)
  if(!trigger&&!keywords.has('passive'))return null
  const raw=trigger?nonTriggerText(candidate):candidate.rules
  const text=normalized(raw)
  const events=profile(source)
  const sourceKeywords=keywordSet(source)
  const make=(reason:string,score=80):AbilityProcMatch=>({relation:'modifier',actor:'self',reason,trigger:'Passive or conditional modifier',conditional:/\bif\b|\bwhile\b|\bwhen\b|\bwhenever\b/.test(text),score})
  if(directNameMatch(source,raw))return make(`${candidate.name} explicitly modifies ${source.name}.`,90)
  if(trigger)return null
  if(!keywords.has('passive'))return null
  if(/\bphysical combat ability\b/.test(text))return events.combat&&!events.magic?make(`${candidate.name} passively modifies physical Combat ability use.`):null
  if(/\bcharge(?: combat)? ability\b/.test(text))return(sourceKeywords.has('charge')||normalizedName(source.name)==="hero's charge")?make(`${candidate.name} passively modifies Charge ability use.`):null
  if(/\bmove or combat ability\b/.test(text))return(events.movement||events.combat)?make(`${candidate.name} passively modifies Move or Combat ability use.`):null
  if(/\b(?:any )?move ability\b/.test(text)&&events.movement)return make(`${candidate.name} passively modifies Move ability use.`)
  if(/\bmagic ability that requires mana\b/.test(text))return events.magic&&events.manaCost?make(`${candidate.name} passively modifies a Magic ability with a Mana cost.`):null
  if(/\bcombat ability\b/.test(text)&&events.combat)return make(`${candidate.name} passively modifies Combat ability use.`)
  if(/\bmagic ability\b/.test(text)&&events.magic)return make(`${candidate.name} passively modifies Magic ability use.`)
  if(/\bspell\b/.test(text)&&events.actualSpell)return make(`${candidate.name} passively modifies spell use.`)
  return null
}

export function abilityTriggerDependency(ability:AbilityProcSource):AbilityTriggerDependency{
  const trigger=normalized(triggerValue(ability))
  const keywords=keywordSet(ability)
  if(!trigger)return keywords.has('passive')?'passive':'independent'
  const hasIndependentWindow=/\bduring your turn\b|\bat the start of your turn\b|\bat the start of the round\b|\bat the end of your turn\b|\bat the end of the round\b/.test(trigger)
  const beginsAsDependency=/\bwhen\b|\bafter\b|\bbefore\b|\bif\b|\bwhenever\b/.test(trigger)
  if(hasIndependentWindow&&!/^when\b|^after\b|^before\b|^if\b|^whenever\b/.test(trigger))return'independent'
  if(beginsAsDependency)return'dependent'
  return'independent'
}

export function abilityRequiresPriorTrigger(ability:AbilityProcSource){return abilityTriggerDependency(ability)==='dependent'}
export function abilityIsPassiveOnly(ability:AbilityProcSource){return abilityTriggerDependency(ability)==='passive'}

export function findAbilityProcMatch(source:AbilityProcSource,candidate:AbilityProcSource,knownAbilities:AbilityProcSource[]=[],context:AbilityProcContext={}):AbilityProcMatch|null{
  if(!source||!candidate||source.id===candidate.id||normalizedName(source.name)===normalizedName(candidate.name))return null
  const trigger=triggerValue(candidate)
  if(trigger){
    const triggerMatch=genericTriggerMatch(source,candidate,trigger,knownAbilities,context)
    if(triggerMatch)return triggerMatch
  }
  return passiveModifierMatch(source,candidate)
}


export function findCoreActionUseMatch(core:AbilityProcSource,candidate:AbilityProcSource):AbilityProcMatch|null{
  if(!isCoreActionSource(core)||isCoreActionSource(candidate)||core.id===candidate.id)return null
  const coreName=normalizedName(core.name)
  const candidateSource=normalizedName(candidate.source)
  const keywords=keywordSet(candidate)
  const dependency=abilityTriggerDependency(candidate)
  const activation=(reason:string,trigger:string,conditional=false,score=108):AbilityProcMatch=>({relation:'activation',actor:'self',reason,trigger,conditional,score})

  if(coreName==='reaction'&&isReactiveAbility(candidate)){
    const trigger=triggerValue(candidate)||'The Reactive Ability meets its printed Trigger.'
    return activation(`${candidate.name} is an eligible Reactive Ability that may be resolved through the Reaction Core Action.`,trigger,true,120)
  }
  if(isReactiveAbility(candidate))return null

  if(coreName==='arcane command'&&candidateSource.includes('spell')&&!keywords.has('signature')&&!abilityRequiresPriorTrigger(candidate)){
    return activation(`${candidate.name} is a non-Signature spell that can be chosen and cast through Arcane Command.`,'Arcane Command selects this spell.',false,118)
  }
  if(coreName==='arcane command'&&keywords.has('magic')&&dependency==='independent')return activation(`${candidate.name} is a Magic Ability that can be used from the Arcane Command Core Action.`,'Arcane Command opens a Magic Ability.',true,98)
  if(coreName==='melee strike'&&dependency==='independent'&&keywords.has('combat')&&(keywords.has('touch')||keywords.has('physical'))&&!keywords.has('shoot')&&!keywords.has('magic'))return activation(`${candidate.name} is a melee or physical Combat Ability that can build from Melee Strike.`,'Melee Strike opens a compatible Combat Ability.',true,96)
  if(coreName==='range strike'&&dependency==='independent'&&keywords.has('combat')&&keywords.has('shoot'))return activation(`${candidate.name} is a Shoot Combat Ability that can build from Range Strike.`,'Range Strike opens a compatible Shoot Ability.',true,96)
  if(coreName==="hero's charge"&&dependency==='independent'&&keywords.has('move')&&keywords.has('charge'))return activation(`${candidate.name} is a Charge Move Ability that can build from Hero’s Charge.`,'Hero’s Charge opens a compatible Charge Ability.',true,97)
  if((coreName==='stride'||coreName==='swiftstride')&&dependency==='independent'&&keywords.has('move')&&!keywords.has('charge'))return activation(`${candidate.name} is a Move Ability that can build from ${core.name}.`,`${core.name} opens a compatible Move Ability.`,true,94)
  if((coreName==='channel winds'||coreName==='focused will')&&dependency==='independent'&&keywords.has('instinct'))return activation(`${candidate.name} is an Instinct Ability that can build from ${core.name}.`,`${core.name} opens a compatible Instinct Ability.`,true,94)
  return null
}

/** Compatibility alias for older imports. Core Action is the canonical term in Beta 0.45+. */
export const findCoreAbilityUseMatch=findCoreActionUseMatch

export function findGrantedCoreActionMatch(source:AbilityProcSource,candidate:AbilityProcSource):AbilityProcMatch|null{
  if(isCoreActionSource(source)||!isCoreActionSource(candidate)||source.id===candidate.id)return null
  const text=normalizedName(nonTriggerText(source))
  const candidateName=normalizedName(candidate.name)
  const named=abilityAliases(candidate.name).some(alias=>containsAlias(text,alias))
  if(!named)return null
  const corePhrase=abilityAliases(candidate.name).some(alias=>text.includes(`${alias} core action`)||text.includes(`use ${alias}`)||text.includes(`use the ${alias}`))
  if(!corePhrase)return null
  const grants=/\bmay\b[^.]{0,55}\buse\b|\bimmediately\b[^.]{0,55}\buse\b|\bcompel(?:led|s)?\b[^.]{0,75}\buse\b/.test(text)
  if(!grants)return null
  let actor:AbilityProcActor='any'
  if(candidateName==='renew heart'&&/\benemy\b[^.]{0,100}\brenew heart\b/.test(text))actor='enemy'
  else if(candidateName==='stride'&&/\bally\b[^.]{0,100}\bstride\b/.test(text))actor='ally'
  else if(/\bfriendly character\b|\btarget ally\b|\ban ally\b/.test(text))actor='ally'
  return{relation:'activation',actor,reason:`${source.name} explicitly grants or compels the ${candidate.name} Core Action.`,trigger:`${source.name} explicitly permits this additional Core Action.`,conditional:/\bif\b|\bon failure\b|\bon success\b/.test(text),score:125}
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
  if(actor==='ally')return'Ally trigger'
  if(actor==='enemy')return'Enemy trigger'
  if(actor==='self')return'Self trigger'
  return'Any-character trigger'
}
