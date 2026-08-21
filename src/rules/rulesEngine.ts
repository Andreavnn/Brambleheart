export function total(values: number[]) { return values.reduce((sum, value) => sum + Number(value || 0), 0) }

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

export function opposedResult(strikeDice: number[], strikeStat=0, strikeConditions=0, wardDice: number[], wardStat=0, wardConditions=0) {
  const strike = rhythmResult(strikeDice, 'normal', strikeStat, strikeConditions)
  const ward = rhythmResult(wardDice, 'normal', wardStat, wardConditions)
  return { strike, ward, hit: strike.total > ward.total }
}

export function effectiveGuts(category: 'standard'|'direct'|'lethal', hideRank=0, equipment=0, conditions=0) {
  const base = Math.max(0, Number(hideRank)||0)
  const gear = Math.max(0, Number(equipment)||0)
  const cond = Number(conditions)||0
  if (category === 'lethal') return Math.max(0, cond)
  if (category === 'direct') return Math.max(0, Math.max(1, Math.ceil((base + gear) / 2)) + cond)
  return Math.max(0, base + gear + cond)
}

export function damageResult(damage: number, category: 'standard'|'direct'|'lethal', hideRank: number, equipment: number, conditions: number) {
  const incoming = Math.max(0, Number(damage)||0)
  const guts = effectiveGuts(category, hideRank, equipment, conditions)
  return { incoming, guts, suffered: Math.max(0, incoming - guts) }
}

export function healthPenalty(health: number) {
  const value = Number(health)
  if (value <= 0) return null
  if (value <= 1) return -3
  if (value <= 3) return -2
  if (value <= 5) return -1
  return 0
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
