export type AdvancementType='attribute'|'skill'|'new-skill'|'talent'|'magic'

/** Canonical XP pacing and advancement-cost authority. */
export const XP_GUIDANCE={
  averagePerSession:[7,10] as const,
  sparkAlignmentBonus:1,
  encounterOrMilestone:[2,5] as const,
  watcherAward:[1,2] as const,
} as const

export const ADVANCEMENT_FORMULAS={
  attribute:'4 + (2 × current rank)',
  skill:'4 + current rank',
  newSkill:'8',
  talent:'12',
  magic:'12 + (4 × current rank)',
} as const

export function advancementCost(type:AdvancementType,currentRank=1){
  const rank=Math.max(0,Number(currentRank)||0)
  if(type==='attribute')return 4+(2*rank)
  if(type==='skill')return 4+rank
  if(type==='new-skill')return 8
  if(type==='talent')return 12
  if(type==='magic')return 12+(4*rank)
  return 0
}

export function cumulativeRankCost(type:Extract<AdvancementType,'attribute'|'skill'|'magic'>,targetRank:number,startRank=1){
  const start=Math.max(1,Math.floor(Number(startRank)||1))
  const target=Math.max(start,Math.floor(Number(targetRank)||start))
  let total=0
  for(let rank=start;rank<target;rank++)total+=advancementCost(type,rank)
  return total
}
