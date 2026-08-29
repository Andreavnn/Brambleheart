import type { EquipmentStatBonuses } from '../data/equipment'
import { formatMeasurementText } from './measurements'
import { protectiveGearKind } from './economy'
import { isArcaneFocusName } from './magicRules'

function total(values: number[]) { return values.reduce((sum, value) => sum + Number(value || 0), 0) }

export function rhythmResult(dice: number[], mode: 'normal'|'edged'|'weighted'='normal', stat=0, conditions=0) {
  const rolled = dice.map(Number)
  const kept = [...rolled]
  let dropped: number | null = null
  if (mode === 'edged') {
    const index = kept.indexOf(Math.min(...kept)); dropped = kept.splice(index, 1)[0] ?? null
  } else if (mode === 'weighted') {
    const index = kept.indexOf(Math.max(...kept)); dropped = kept.splice(index, 1)[0] ?? null
  }
  const natural = total(kept)
  return { rolled, kept, dropped, natural, stat:Number(stat)||0, conditions:Number(conditions)||0, total:natural+(Number(stat)||0)+(Number(conditions)||0) }
}

export function advancementCost(type: 'attribute'|'skill'|'new-skill'|'talent'|'magic', currentRank=1) {
  const rank = Math.max(0, Number(currentRank)||0)
  if (type === 'attribute') return 2 + (2 * rank)
  if (type === 'skill') return 3 + rank
  if (type === 'new-skill') return 6
  if (type === 'talent') return 10
  if (type === 'magic') return 10 + (4 * rank)
  return 0
}

export type CoreAttributeRanks = {
  agility:number
  might:number
  hide:number
  lore:number
  bravery:number
}

export type EquipmentProfileSource = {
  name:string
  detail?:string
}

export function rankModifier(rank:number){return Number(rank||0)*2}
export function normalizeSkillName(name:string){return String(name||'').replace(/\s*\([^)]*\)\s*/g,' ').replace(/\s+/g,' ').trim()}

function profileParts(detail:string){return String(detail||'').split('·').map(part=>part.trim()).filter(Boolean)}
function labeledProfileValue(detail:string,label:string){const part=profileParts(detail).find(value=>value.toLowerCase().startsWith(label.toLowerCase()));return part?part.slice(label.length).trim():'—'}
function armorProfileValues(detail:string){
  const labeled={
    guts:labeledProfileValue(detail,'Guts Bonus'),
    mana:labeledProfileValue(detail,'Mana Syphon'),
    stealth:labeledProfileValue(detail,'Stealth Condition'),
    might:labeledProfileValue(detail,'Might Requirement'),
    weight:labeledProfileValue(detail,'Weight'),
  }
  if(Object.values(labeled).some(value=>value!=='—'))return labeled
  const parts=profileParts(detail)
  if(parts.length>=5)return{might:parts[0],guts:parts[1],mana:parts[2],stealth:parts[3],weight:parts[4]}
  return labeled
}
function numericProfileBonus(value:string){const match=String(value||'').match(/[+-]?(\d+)/);return match?Math.max(0,Number(match[1])):0}

export type ProtectiveEquipmentSource={name:string;detail?:string;category?:string;equipped?:boolean}
function equippedProtectiveItems<T extends ProtectiveEquipmentSource>(items:T[]|undefined):T[]{
  const candidates=(items||[]).filter(item=>item.category==='Armor & Shield')
  return(['armor','shield'] as const).flatMap(kind=>{
    const matching=candidates.filter(item=>protectiveGearKind(item)===kind)
    if(!matching.length)return[]
    const hasExplicit=matching.some(item=>typeof item.equipped==='boolean')
    const chosen=matching.find(item=>item.equipped===true)||(!hasExplicit?matching[0]:undefined)
    return chosen?[chosen]:[]
  })
}
export function equipmentGutsBonus(items:ProtectiveEquipmentSource[]|undefined){
  return equippedProtectiveItems(items).reduce((sum,item)=>sum+numericProfileBonus(armorProfileValues(String(item.detail||'')).guts),0)
}
export function equipmentManaSyphon(items:ProtectiveEquipmentSource[]|undefined){
  return equippedProtectiveItems(items).reduce((sum,item)=>sum+numericProfileBonus(armorProfileValues(String(item.detail||'')).mana),0)
}
export function equippedProtectiveGear<T extends ProtectiveEquipmentSource>(items:T[]|undefined){return equippedProtectiveItems(items)}
export type ArcaneFocusEquipmentSource={name:string;statBonuses?:EquipmentStatBonuses;quantity?:number;activeArcaneFocus?:boolean}
export function activeArcaneFocus<T extends ArcaneFocusEquipmentSource>(items:T[]|undefined):T|undefined{
  const focuses=(items||[]).filter(item=>isArcaneFocusName(item.name))
  if(!focuses.length)return undefined
  const explicit=focuses.find(item=>item.activeArcaneFocus===true)
  if(explicit)return explicit
  return focuses[0]
}
export function equipmentControlBonus(items:ArcaneFocusEquipmentSource[]|undefined){
  const list=items||[]
  const ordinary=list.filter(item=>!isArcaneFocusName(item.name)).reduce((sum,item)=>sum+Math.max(0,Number(item.statBonuses?.control)||0)*Math.max(1,Math.floor(Number(item.quantity)||1)),0)
  const focus=activeArcaneFocus(list)
  return ordinary+(focus?Math.max(0,Number(focus.statBonuses?.control)||0):0)
}
export function equipmentSpellManaReduction(items:ArcaneFocusEquipmentSource[]|undefined){return activeArcaneFocus(items)?.name==='Scriptweave Book'?1:0}

export function derivedStats(attributes:CoreAttributeRanks,gutsBonus=0,controlBonus=0){
  const agility=Number(attributes.agility||0)
  const might=Number(attributes.might||0)
  const hide=Number(attributes.hide||0)
  const lore=Number(attributes.lore||0)
  const bravery=Number(attributes.bravery||0)
  return{
    aim:rankModifier(agility),
    accuracy:agility,
    speed:rankModifier(agility)+2,
    brawl:rankModifier(might),
    fury:might,
    ward:rankModifier(hide),
    guts:hide+Math.max(0,Number(gutsBonus)||0),
    control:rankModifier(lore)+Math.max(0,Number(controlBonus)||0),
    power:lore,
    heart:bravery,
    spirit:rankModifier(bravery),
  }
}

export function magicResources(attributes:CoreAttributeRanks,magicLevel=0){
  const stats=derivedStats(attributes)
  const level=Math.max(0,Number(magicLevel)||0)
  return{manaPool:level+stats.spirit,magicRegen:stats.heart}
}

export function weaponProfile(item:EquipmentProfileSource|undefined){
  if(!item)return{name:'—',damage:'—',range:'—',properties:'—',weight:'—'}
  const parts=profileParts(item.detail||'')
  const propertyParts=parts.filter(part=>!/^Damage\b/i.test(part)&&!/^Weight\b/i.test(part))
  const properties=propertyParts.join(', ')||'—'
  const range=properties.match(/(?:Projectile|Reach)\s*\(([^)]+)\)/i)?.[1]||'Touch'
  return{name:item.name,damage:labeledProfileValue(item.detail||'','Damage'),range:formatMeasurementText(range),properties:formatMeasurementText(properties),weight:labeledProfileValue(item.detail||'','Weight')}
}

export function armorProfile(item:EquipmentProfileSource|undefined){
  if(!item)return{name:'—',guts:'—',mana:'—',stealth:'—',might:'—',weight:'—'}
  const values=armorProfileValues(item.detail||'')
  return{name:item.name,...values}
}

export type StructuredRuleField={label:string;value:string}
const STRUCTURED_RULE_LABELS=['COST','TRIGGER','DECLARE','DECLEAR','TARGET','AREA','STRIKE','TO HIT','ATTRIBUTE SAVE','SAVE','HEX','ON FAILURE','EFFECT','DAMAGE','LONG RANGE','PICK UP','AFTERBURN','PURIFY','EMPOWER','DURATION','OPEN DEFENCE','ARMOR MASTERY','DEFENSELESS','FORTIFIED','RAPID ATTACK','RESTICTION','RESTICTIONS','RESTRICTION','RESTRICTIONS','REQUIRES','COOLDOWN','KEYWORDS'] as const
const RULE_FIELD_ORDER=['COST','TRIGGER','DECLARE','TARGET','AREA','TO HIT','SAVE','HEX','ON FAILURE','EFFECT','DAMAGE','LONG RANGE','PICK UP','AFTERBURN','PURIFY','EMPOWER','DURATION','OPEN DEFENCE','ARMOR MASTERY','DEFENSELESS','FORTIFIED','RAPID ATTACK','RESTRICTIONS','REQUIRES','COOLDOWN','KEYWORDS'] as const
function canonicalRuleLabel(value:string){const label=value.toUpperCase();if(label==='DECLEAR')return'DECLARE';if(label==='STRIKE')return'TO HIT';if(label==='ATTRIBUTE SAVE')return'SAVE';if(label==='RESTICTION'||label==='RESTICTIONS'||label==='RESTRICTION')return'RESTRICTIONS';return label}
function ruleFieldOrder(label:string){const index=RULE_FIELD_ORDER.indexOf(label as typeof RULE_FIELD_ORDER[number]);return index<0?RULE_FIELD_ORDER.length:index}

export function structuredRule(text:string):{intro:string;fields:StructuredRuleField[]}{
  const source=formatMeasurementText(String(text||''))
  const rx=new RegExp(`\\b(${STRUCTURED_RULE_LABELS.join('|')}):\\s*`,'gi')
  const matches=Array.from(source.matchAll(rx))
  if(!matches.length)return{intro:source.trim(),fields:[]}
  const intro=source.slice(0,matches[0].index).trim()
  const fields=matches.map((match,index)=>({
    label:canonicalRuleLabel(match[1]),
    value:source.slice((match.index||0)+match[0].length,index+1<matches.length?matches[index+1].index:source.length).trim(),
    sourceIndex:index,
  })).filter(field=>field.value).sort((left,right)=>ruleFieldOrder(left.label)-ruleFieldOrder(right.label)||left.sourceIndex-right.sourceIndex)
    .map(({label,value})=>({label,value}))
  return{intro,fields}
}
export function visibleRuleFields(text:string){return structuredRule(text).fields.filter(field=>field.label!=='COST'&&field.label!=='KEYWORDS')}
