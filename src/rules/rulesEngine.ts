import type { EquipmentStatBonuses } from '../data/equipment'

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

export function equipmentGutsBonus(items:Array<{detail?:string;category?:string}>|undefined){
  return (items||[]).filter(item=>item.category==='Armor & Shield').reduce((sum,item)=>sum+numericProfileBonus(armorProfileValues(String(item.detail||'')).guts),0)
}

export function equipmentManaSyphon(items:Array<{detail?:string;category?:string}>|undefined){
  return (items||[]).filter(item=>item.category==='Armor & Shield').reduce((sum,item)=>sum+numericProfileBonus(armorProfileValues(String(item.detail||'')).mana),0)
}

export function equipmentControlBonus(items:Array<{statBonuses?:EquipmentStatBonuses;quantity?:number}>|undefined){
  return (items||[]).reduce((sum,item)=>sum+Math.max(0,Number(item.statBonuses?.control)||0)*Math.max(1,Math.floor(Number(item.quantity)||1)),0)
}

export function derivedStats(attributes:CoreAttributeRanks,gutsBonus=0,controlBonus=0){
  const agility=Number(attributes.agility||0),might=Number(attributes.might||0),hide=Number(attributes.hide||0),lore=Number(attributes.lore||0)
  return{speed:2+agility,aim:rankModifier(agility),mettle:rankModifier(might),ward:rankModifier(hide),control:rankModifier(lore)+Math.max(0,Number(controlBonus)||0),power:might,guts:hide+Math.max(0,Number(gutsBonus)||0)}
}

export function weaponProfile(item:EquipmentProfileSource|undefined){
  if(!item)return{name:'—',damage:'—',range:'—',properties:'—',weight:'—'}
  const parts=profileParts(item.detail||'')
  const propertyParts=parts.filter(part=>!/^Damage\b/i.test(part)&&!/^Weight\b/i.test(part))
  const properties=propertyParts.join(', ')||'—'
  const range=properties.match(/(?:Projectile|Reach)\s*\(([^)]+)\)/i)?.[1]||'Touch'
  return{name:item.name,damage:labeledProfileValue(item.detail||'','Damage'),range,properties,weight:labeledProfileValue(item.detail||'','Weight')}
}

export function armorProfile(item:EquipmentProfileSource|undefined){
  if(!item)return{name:'—',guts:'—',mana:'—',stealth:'—',might:'—',weight:'—'}
  const values=armorProfileValues(item.detail||'')
  return{name:item.name,...values}
}

export type StructuredRuleField={label:string;value:string}
const STRUCTURED_RULE_LABELS=['OPEN DEFENCE','COST','TRIGGER','DECLARE','DECLEAR','TARGET','EFFECT','RESTRICTION','RESTRICTIONS','DURATION','EMPOWER','COOLDOWN','AFTERBURN','PURIFY','REQUIRES','KEYWORDS'] as const

export function structuredRule(text:string):{intro:string;fields:StructuredRuleField[]}{
  const source=String(text||'')
  const rx=new RegExp(`\\b(${STRUCTURED_RULE_LABELS.join('|')}):\\s*`,'gi')
  const matches=Array.from(source.matchAll(rx))
  if(!matches.length)return{intro:source.trim(),fields:[]}
  const intro=source.slice(0,matches[0].index).trim()
  const fields=matches.map((match,index)=>({
    label:match[1].toUpperCase().replace('DECLEAR','DECLARE'),
    value:source.slice((match.index||0)+match[0].length,index+1<matches.length?matches[index+1].index:source.length).trim(),
  })).filter(field=>field.value)
  return{intro,fields}
}

export function visibleRuleFields(text:string){return structuredRule(text).fields.filter(field=>field.label!=='COST'&&field.label!=='KEYWORDS')}
