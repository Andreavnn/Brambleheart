/**
 * Character-facing Threat Level authority.
 *
 * Threat Score is intentionally a coarse power gauge. It measures character
 * growth and major combat-facing options without assigning value to ordinary
 * Species, Spark, Homeland, Faith, Oath, or starting equipment choices.
 * Monster and encounter difficulty bands will be calibrated separately when
 * the Watcher encounter system receives its dedicated rules pass.
 */
export interface ThreatBand { level:number; minimum:number; maximum:number|null; label:string }

export const THREAT_BANDS:ReadonlyArray<ThreatBand>=[
  {level:1,minimum:0,maximum:10,label:'Starting Hero'},
  {level:2,minimum:11,maximum:17,label:'Seasoned Hero'},
  {level:3,minimum:18,maximum:24,label:'Veteran Hero'},
  {level:4,minimum:25,maximum:31,label:'Elite Hero'},
  {level:5,minimum:32,maximum:38,label:'Legendary Hero'},
  {level:6,minimum:39,maximum:null,label:'Mythic Hero'},
] as const

export interface ThreatScoreInput {
  attributeRanks:readonly number[]
  skillRanks?:readonly number[]
  talentCount?:number
  magicLevel?:number
  exceptionalGear?:number
}

export function characterThreatScore(input:ThreatScoreInput){
  const attributeGrowth=input.attributeRanks.reduce((sum,rank)=>sum+Math.max(0,Math.floor(Number(rank)||0)-1),0)
  const skillGrowth=(input.skillRanks||[]).reduce((sum,rank)=>sum+Math.max(0,Math.floor(Number(rank)||0)-1),0)
  const talents=Math.max(0,Math.floor(Number(input.talentCount)||0))*2
  const magic=Math.max(0,Math.floor(Number(input.magicLevel)||0))*2
  const gear=Math.max(0,Math.floor(Number(input.exceptionalGear)||0))
  return attributeGrowth+skillGrowth+talents+magic+gear
}

export function threatLevelForScore(score:number){
  const value=Math.max(0,Math.floor(Number(score)||0))
  return THREAT_BANDS.find(band=>value>=band.minimum&&(band.maximum===null||value<=band.maximum))?.level||THREAT_BANDS[THREAT_BANDS.length-1].level
}

export function groupThreat(levels:readonly number[]){return levels.reduce((sum,level)=>sum+Math.max(1,Math.floor(Number(level)||1)),0)}
export function groupThreatScore(scores:readonly number[]){return scores.reduce((sum,score)=>sum+Math.max(0,Math.floor(Number(score)||0)),0)}
export function threatBandScoreLabel(band:ThreatBand){return band.maximum===null?`${band.minimum}+`:`${band.minimum}–${band.maximum}`}
