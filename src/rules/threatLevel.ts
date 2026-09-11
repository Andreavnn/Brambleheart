/**
 * Character-facing Threat Level authority.
 *
 * Threat Score measures advancement beyond an ordinary starting hero. Species,
 * Spark, Homeland, Faith, Oath, and ordinary starting equipment do not add
 * Threat on their own. Exceptional gear is a Watcher-assigned adjustment.
 */
export interface ThreatBand { level:number; minimum:number; maximum:number|null; label:string }

export const THREAT_BANDS:ReadonlyArray<ThreatBand>=[
  {level:1,minimum:0,maximum:10,label:'Starting Hero'},
  {level:2,minimum:11,maximum:20,label:'Seasoned Hero'},
  {level:3,minimum:21,maximum:30,label:'Veteran Hero'},
  {level:4,minimum:31,maximum:40,label:'Elite Hero'},
  {level:5,minimum:41,maximum:50,label:'Legendary Hero'},
  {level:6,minimum:51,maximum:null,label:'Mythic Hero'},
] as const

export interface ThreatScoreInput {
  attributeRanks:readonly number[]
  skillRanks?:readonly number[]
  talentCount?:number
  magicLevel?:number
  exceptionalGear?:number
}

export function characterThreatScore(input:ThreatScoreInput){
  const attributeGrowth=input.attributeRanks.reduce((sum,rank)=>sum+Math.max(0,Math.floor(Number(rank)||0)-2)*2,0)
  const skillGrowth=(input.skillRanks||[]).reduce((sum,rank)=>sum+Math.max(0,Math.floor(Number(rank)||0)-2),0)
  const talentCount=Math.max(0,Math.floor(Number(input.talentCount)||0))
  const talents=talentCount>0?3+Math.max(0,talentCount-1):0
  const magicLevel=Math.max(0,Math.floor(Number(input.magicLevel)||0))
  const magic=magicLevel>0?3+Math.max(0,magicLevel-1)*2:0
  const gear=Math.max(0,Math.min(5,Math.floor(Number(input.exceptionalGear)||0)))
  return attributeGrowth+skillGrowth+talents+magic+gear
}

export function threatLevelForScore(score:number){
  const value=Math.max(0,Math.floor(Number(score)||0))
  return THREAT_BANDS.find(band=>value>=band.minimum&&(band.maximum===null||value<=band.maximum))?.level||THREAT_BANDS[THREAT_BANDS.length-1].level
}

export function characterThreatLevel(input:ThreatScoreInput){return threatLevelForScore(characterThreatScore(input))}
export function groupThreat(levels:readonly number[]){return levels.reduce((sum,level)=>sum+Math.max(1,Math.floor(Number(level)||1)),0)}
export function groupThreatScore(scores:readonly number[]){return scores.reduce((sum,score)=>sum+Math.max(0,Math.floor(Number(score)||0)),0)}
export function threatBandScoreLabel(band:ThreatBand){return band.maximum===null?`${band.minimum}+`:`${band.minimum}–${band.maximum}`}
