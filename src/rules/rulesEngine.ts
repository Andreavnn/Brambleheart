import type { EquipmentStatBonuses } from '../data/equipment'
import { formatMeasurementText } from './measurements'
import { canonicalGearName, isTrinketGear, protectiveGearKind } from './economy'
import { isArcaneFocusName } from './magicRules'

function total(values:number[]){return values.reduce((sum,value)=>sum+Number(value||0),0)}

export function rhythmResult(dice:number[],mode:'normal'|'edged'|'weighted'='normal',stat=0,conditions=0){
  const rolled=dice.map(Number),kept=[...rolled];let dropped:number|null=null
  if(mode==='edged'){const index=kept.indexOf(Math.min(...kept));dropped=kept.splice(index,1)[0]??null}
  else if(mode==='weighted'){const index=kept.indexOf(Math.max(...kept));dropped=kept.splice(index,1)[0]??null}
  const natural=total(kept)
  return{rolled,kept,dropped,natural,stat:Number(stat)||0,conditions:Number(conditions)||0,total:natural+(Number(stat)||0)+(Number(conditions)||0)}
}

export function advancementCost(type:'attribute'|'skill'|'new-skill'|'talent'|'magic',currentRank=1){
  const rank=Math.max(0,Number(currentRank)||0)
  if(type==='attribute')return 2+(2*rank)
  if(type==='skill')return 3+rank
  if(type==='new-skill')return 6
  if(type==='talent')return 10
  if(type==='magic')return 10+(4*rank)
  return 0
}

export type CoreAttributeRanks={agility:number;might:number;hide:number;lore:number;bravery:number}
export type EquipmentProfileSource={name:string;detail?:string}
export type CharacterSheetEquipmentSource=EquipmentProfileSource&{attachedTo?:string;category?:string;effect?:string;equipped?:boolean;trinketSlot?:'primary'|'secondary';statBonuses?:EquipmentStatBonuses;quantity?:number;activeArcaneFocus?:boolean}

export function rankModifier(rank:number){return Number(rank||0)*2}
const SKILL_ALIASES:Readonly<Record<string,string>>={Whisperstep:'Whisperster',Tradecraft:'Tradeskill',Beastcraft:'Bondcraft'}
export function normalizeSkillName(name:string){
  const source=String(name||'').replace(/^Crafting\s*\(Blacksmithing\)$/i,'Tradeskill (Blacksmithing)').trim()
  const base=source.replace(/\s*\([^)]*\)\s*/g,' ').replace(/\s+/g,' ').trim()
  return SKILL_ALIASES[base]||base
}

function profileParts(detail:string){return String(detail||'').split('·').map(part=>part.trim()).filter(Boolean)}
function labeledProfileValue(detail:string,label:string){const part=profileParts(detail).find(value=>value.toLowerCase().startsWith(label.toLowerCase()));return part?part.slice(label.length).trim():'—'}
function armorProfileValues(detail:string){
  const labeled={guts:labeledProfileValue(detail,'Guts Bonus'),mana:labeledProfileValue(detail,'Mana Syphon'),armorPenalty:labeledProfileValue(detail,'Armor Penalty'),might:labeledProfileValue(detail,'Might Requirement'),weight:labeledProfileValue(detail,'Weight')}
  if(labeled.armorPenalty==='—')labeled.armorPenalty=labeledProfileValue(detail,'Stealth Condition')
  if(labeled.armorPenalty==='—')labeled.armorPenalty=labeledProfileValue(detail,'Stealth Penalty')
  if(Object.values(labeled).some(value=>value!=='—'))return labeled
  const parts=profileParts(detail)
  if(parts.length>=5)return{might:parts[0],guts:parts[1],mana:parts[2],armorPenalty:parts[3],weight:parts[4]}
  return labeled
}
function numericProfileBonus(value:string){const match=String(value||'').match(/[+-]?(\d+)/);return match?Math.max(0,Number(match[1])):0}
function numericPenalty(value:string){const match=String(value||'').match(/[+-]?(\d+)/);if(!match)return 0;const n=Number(match[0]);return Number.isFinite(n)?Math.min(0,n):0}
function addNumericProfileBonus(value:string,bonus:number){if(!bonus||value==='—')return value;const match=String(value).match(/[+-]?\d+/);if(!match)return value;const next=Number(match[0])+bonus;return String(value).replace(match[0],`${next>=0?'+':''}${next}`)}

export type ProtectiveEquipmentSource={name:string;detail?:string;category?:string;equipped?:boolean;attachedTo?:string;trinketSlot?:'primary'|'secondary'}
function equippedProtectiveItems<T extends ProtectiveEquipmentSource>(items:T[]|undefined):T[]{
  const candidates=(items||[]).filter(item=>item.category==='Armor & Shield')
  return(['armor','shield'] as const).flatMap(kind=>{const matching=candidates.filter(item=>protectiveGearKind(item)===kind);if(!matching.length)return[];const hasExplicit=matching.some(item=>typeof item.equipped==='boolean');const chosen=matching.find(item=>item.equipped===true)||(!hasExplicit?matching[0]:undefined);return chosen?[chosen]:[]})
}
export function equippedTrinketGear<T extends ProtectiveEquipmentSource>(items:T[]|undefined):T[]{
  const candidates=(items||[]).filter(item=>isTrinketGear(item)),explicit=candidates.filter(item=>item.equipped===true)
  if(explicit.length)return explicit.slice(0,2)
  const hasExplicit=candidates.some(item=>typeof item.equipped==='boolean')
  return hasExplicit?[]:candidates.slice(0,2)
}
export function primaryTrinketGear<T extends ProtectiveEquipmentSource>(items:T[]|undefined):T|undefined{const equipped=equippedTrinketGear(items);return equipped.find(item=>item.trinketSlot==='primary')||equipped[0]}
export function secondaryTrinketGear<T extends ProtectiveEquipmentSource>(items:T[]|undefined):T|undefined{const equipped=equippedTrinketGear(items);const primary=primaryTrinketGear(items);return equipped.find(item=>item.trinketSlot==='secondary')||equipped.find(item=>item!==primary)}
export function equipmentGutsBonus(items:ProtectiveEquipmentSource[]|undefined){const protective=equippedProtectiveItems(items);const base=protective.reduce((sum,item)=>sum+numericProfileBonus(armorProfileValues(String(item.detail||'')).guts),0);const armor=protective.find(item=>protectiveGearKind(item)==='armor');const heartward=Boolean(armor&&equippedTrinketGear(items).some(item=>canonicalGearName(item.name)==='Heartward Token'&&item.attachedTo===armor.name));return base+(heartward?1:0)}
export function equipmentManaSyphon(items:ProtectiveEquipmentSource[]|undefined){return equippedProtectiveItems(items).reduce((sum,item)=>sum+numericProfileBonus(armorProfileValues(String(item.detail||'')).mana),0)}
export function equipmentArmorPenalty(items:ProtectiveEquipmentSource[]|undefined){return equippedProtectiveItems(items).reduce((sum,item)=>sum+numericPenalty(armorProfileValues(String(item.detail||'')).armorPenalty),0)}
export function equipmentSpeedPenalty(items:ProtectiveEquipmentSource[]|undefined,hasSteadyPace=false){const raw=Math.min(0,equipmentArmorPenalty(items));const armorComponent=hasSteadyPace?Math.min(0,raw+2):raw;return armorComponent+(hasSteadyPace?-1:0)}
export function equippedProtectiveGear<T extends ProtectiveEquipmentSource>(items:T[]|undefined){return equippedProtectiveItems(items)}
export type ArcaneFocusEquipmentSource=ProtectiveEquipmentSource&{statBonuses?:EquipmentStatBonuses;quantity?:number;activeArcaneFocus?:boolean}
export function activeArcaneFocus<T extends ArcaneFocusEquipmentSource>(items:T[]|undefined):T|undefined{const focuses=equippedTrinketGear(items).filter(item=>isArcaneFocusName(canonicalGearName(item.name)));if(!focuses.length)return undefined;return focuses.find(item=>item.activeArcaneFocus===true)||focuses[0]}
export function equipmentControlBonus(items:ArcaneFocusEquipmentSource[]|undefined){const list=items||[];const ordinary=list.filter(item=>!isArcaneFocusName(canonicalGearName(item.name))&&!isTrinketGear(item)).reduce((sum,item)=>sum+Math.max(0,Number(item.statBonuses?.control)||0)*Math.max(1,Math.floor(Number(item.quantity)||1)),0);const focus=activeArcaneFocus(list);return ordinary+(focus?Math.max(0,Number(focus.statBonuses?.control)||0):0)}
export function equipmentSpellManaReduction(items:ArcaneFocusEquipmentSource[]|undefined){return canonicalGearName(activeArcaneFocus(items)?.name||'')==='Scriptweave Book'?1:0}
export function equipmentMagicRegenBonus(items:ArcaneFocusEquipmentSource[]|undefined){const equipped=equippedTrinketGear(items);let bonus=equipped.some(item=>canonicalGearName(item.name)==='Shiny Bobble')?1:0;if(canonicalGearName(activeArcaneFocus(items)?.name||'')==='Scriptweave Book')bonus+=1;return bonus}
export function equipmentRenewHeartConditionBonus(items:ProtectiveEquipmentSource[]|undefined){return equippedTrinketGear(items).some(item=>canonicalGearName(item.name)==='Votive Icon')?1:0}
export function equipmentSpellDamageBonus(items:ProtectiveEquipmentSource[]|undefined){return equippedTrinketGear(items).some(item=>canonicalGearName(item.name)==='Spell Charm')?1:0}
export function equipmentWeaponToHitBonus(items:ProtectiveEquipmentSource[]|undefined,weaponName:string){const names=new Set(['Journey Knot','Quickdraw Quiver','Wristloop']);return equippedTrinketGear(items).some(item=>item.attachedTo===weaponName&&names.has(canonicalGearName(item.name)))?1:0}
export function equipmentAttachmentTargets(item:ProtectiveEquipmentSource,equipment:ProtectiveEquipmentSource[]|undefined){const name=canonicalGearName(item.name),weapons=(equipment||[]).filter(candidate=>candidate.category==='Weapon');if(name==='Quickdraw Quiver')return weapons.filter(candidate=>/\bbow\b/i.test(candidate.name)&&!/crossbow/i.test(candidate.name)).map(candidate=>candidate.name);if(name==='Featherwind Bolt-Case')return weapons.filter(candidate=>/crossbow/i.test(candidate.name)).map(candidate=>candidate.name);if(name==='Wristloop')return weapons.filter(candidate=>/Thrown/i.test(candidate.detail||'')).map(candidate=>candidate.name);if(name==='Journey Knot'||name==='Sharpening Stone')return weapons.map(candidate=>candidate.name);if(name==='Heartward Token')return(equipment||[]).filter(candidate=>candidate.category==='Armor & Shield'&&protectiveGearKind(candidate)==='armor').map(candidate=>candidate.name);return[]}

export function derivedStats(attributes:CoreAttributeRanks,gutsBonus=0,controlBonus=0,armorPenalty=0){
  const agility=Number(attributes.agility||0),might=Number(attributes.might||0),hide=Number(attributes.hide||0),lore=Number(attributes.lore||0),bravery=Number(attributes.bravery||0)
  return{aim:rankModifier(agility),accuracy:agility,speed:Math.max(1,rankModifier(agility)+2+Math.min(0,Number(armorPenalty)||0)),brawl:rankModifier(might),fury:might,ward:rankModifier(hide),guts:hide+Math.max(0,Number(gutsBonus)||0),control:rankModifier(lore)+Math.max(0,Number(controlBonus)||0),power:lore,heart:bravery,spirit:rankModifier(bravery)}
}
export function magicResources(attributes:CoreAttributeRanks,magicLevel=0,magicRegenBonus=0){const stats=derivedStats(attributes);const level=Math.max(0,Number(magicLevel)||0);return{manaPool:level+stats.spirit,magicRegen:stats.heart+Math.max(0,Number(magicRegenBonus)||0)}}

export function weaponProfile(item:EquipmentProfileSource|undefined){
  if(!item)return{name:'—',damage:'—',range:'—',properties:'—',weight:'—'}
  const raw=String(item.detail||''),parts=profileParts(raw);let damage=labeledProfileValue(raw,'Damage'),weight=labeledProfileValue(raw,'Weight'),properties='—'
  const positional=parts.length>=2&&damage==='—'&&weight==='—'
  if(positional){damage=parts[0]||'—';weight=parts[1]||'—';properties=parts.slice(2).join(', ')||'—'}
  else properties=parts.filter(part=>!/^Damage\b/i.test(part)&&!/^Weight\b/i.test(part)).join(', ')||'—'
  const range=properties.match(/(?:Projectile|Reach|Thrown)\s*\(([^)]+)\)/i)?.[1]||'Touch'
  return{name:item.name,damage,range:formatMeasurementText(range),properties:formatMeasurementText(properties),weight}
}
function addWeaponDamageBonus(value:string,bonus:number){if(!bonus||value==='—')return value;let applied=false;return value.replace(/\d+(?:\.\d+)?/,match=>{if(applied)return match;applied=true;return String(Number(match)+bonus)})}
export function characterSheetWeaponName(name:string){return String(name||'').replace(/\s+\([^()]+\)\s*$/,'').trim()||'—'}
const CHARACTER_SHEET_WEAPON_DAMAGE_ATTACHMENTS:Readonly<Record<string,number>>={'Sharpening Stone':1}
function attachmentLabel(item:CharacterSheetEquipmentSource){const name=canonicalGearName(item.name);if(name==='Journey Knot')return'Journey Knot (+1 TO HIT)';return name}
export function characterSheetWeaponProfile(item:CharacterSheetEquipmentSource|undefined,equipment:CharacterSheetEquipmentSource[]|undefined=[]){const base=weaponProfile(item);if(!item)return base;const attached=(equipment||[]).filter(candidate=>candidate.attachedTo===item.name&&(!isTrinketGear(candidate)||candidate.equipped===true));const attachedDamageSources=attached.filter(candidate=>CHARACTER_SHEET_WEAPON_DAMAGE_ATTACHMENTS[canonicalGearName(candidate.name)]);const damageBonus=attachedDamageSources.reduce((sum,candidate)=>sum+CHARACTER_SHEET_WEAPON_DAMAGE_ATTACHMENTS[canonicalGearName(candidate.name)],0);const properties=[base.properties==='—'?'':base.properties,...attached.map(attachmentLabel)].filter(Boolean).join(', ')||'—';return{...base,name:characterSheetWeaponName(base.name),damage:addWeaponDamageBonus(base.damage,damageBonus),properties}}

export function armorProfile(item:EquipmentProfileSource|undefined){if(!item)return{name:'—',guts:'—',mana:'—',armorPenalty:'—',might:'—',weight:'—'};const values=armorProfileValues(item.detail||'');return{name:item.name,...values}}
export function characterSheetArmorProfile(item:CharacterSheetEquipmentSource|undefined,equipment:CharacterSheetEquipmentSource[]|undefined=[]){const base=armorProfile(item);if(!item||protectiveGearKind(item)!=='armor')return base;const bonus=equippedTrinketGear(equipment).some(candidate=>canonicalGearName(candidate.name)==='Heartward Token'&&candidate.attachedTo===item.name)?1:0;return{...base,guts:addNumericProfileBonus(base.guts,bonus)}}

export type StructuredRuleField={label:string;value:string}
const STRUCTURED_RULE_LABELS=['COST','TRIGGER','DECLARE','DECLEAR','TARGET','AREA','STRIKE','TO HIT','ATTRIBUTE SAVE','SAVE','HEX','ON FAILURE','EFFECT','DAMAGE','LONG RANGE','PICK UP','AFTERBURN','PURIFY','EMPOWER','IMPACT','DURATION','OPEN DEFENCE','ARMOR MASTERY','DEFENSELESS','FORTIFIED','RAPID ATTACK','RESTICTION','RESTICTIONS','RESTRICTION','RESTRICTIONS','REQUIRES','COOLDOWN','KEYWORDS'] as const
const RULE_FIELD_ORDER=['COST','TRIGGER','DECLARE','TARGET','AREA','TO HIT','SAVE','HEX','ON FAILURE','EFFECT','DAMAGE','IMPACT','LONG RANGE','PICK UP','AFTERBURN','PURIFY','EMPOWER','DURATION','OPEN DEFENCE','ARMOR MASTERY','DEFENSELESS','FORTIFIED','RAPID ATTACK','RESTRICTIONS','REQUIRES','COOLDOWN','KEYWORDS'] as const
function canonicalRuleLabel(value:string){const label=value.toUpperCase();if(label==='DECLEAR')return'DECLARE';if(label==='STRIKE')return'TO HIT';if(label==='ATTRIBUTE SAVE')return'SAVE';if(label==='RESTICTION'||label==='RESTICTIONS'||label==='RESTRICTION')return'RESTRICTIONS';return label}
function ruleFieldOrder(label:string){const index=RULE_FIELD_ORDER.indexOf(label as typeof RULE_FIELD_ORDER[number]);return index<0?RULE_FIELD_ORDER.length:index}
export function structuredRule(text:string):{intro:string;fields:StructuredRuleField[]}{const source=formatMeasurementText(String(text||''));const rx=new RegExp(`\\b(${STRUCTURED_RULE_LABELS.join('|')}):\\s*`,'gi');const matches=Array.from(source.matchAll(rx));if(!matches.length)return{intro:source.trim(),fields:[]};const intro=source.slice(0,matches[0].index).trim();const fields=matches.map((match,index)=>({label:canonicalRuleLabel(match[1]),value:source.slice((match.index||0)+match[0].length,index+1<matches.length?matches[index+1].index:source.length).trim(),sourceIndex:index})).filter(field=>field.value).sort((left,right)=>ruleFieldOrder(left.label)-ruleFieldOrder(right.label)||left.sourceIndex-right.sourceIndex).map(({label,value})=>({label,value}));return{intro,fields}}
export function visibleRuleFields(text:string){return structuredRule(text).fields.filter(field=>field.label!=='COST'&&field.label!=='KEYWORDS')}
