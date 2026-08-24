export function normalizeTalentName(name:string){return String(name||'').toLowerCase().replace(/[’']/g,"'").replace(/\s+talent$/,'').trim()}

export function talentRequirementFromText(text:string){
  const match=String(text||'').match(/\bREQUIRES:\s*([^|]+?)(?=\s+KEYWORDS?:|$)/i)
  return match?.[1]?.trim().replace(/\s+Talent$/i,'')||''
}

export function talentRequirementSatisfied(required:string,known:string[],candidate=''){
  if(!required)return true
  const normalizedRequired=normalizeTalentName(required)
  const normalizedCandidate=normalizeTalentName(candidate)
  return known.some(name=>name&&normalizeTalentName(name)!==normalizedCandidate&&normalizeTalentName(name)===normalizedRequired)
}
