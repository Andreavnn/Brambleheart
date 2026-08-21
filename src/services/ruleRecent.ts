export const RECENT_RULES_KEY='brambleheart-rules-recent-v0.05'
export function loadRecentRuleSlugs():string[]{
  if(typeof localStorage==='undefined')return[]
  try{const raw=JSON.parse(localStorage.getItem(RECENT_RULES_KEY)||'[]');return Array.isArray(raw)?raw.filter(v=>typeof v==='string').slice(0,8):[]}
  catch{return[]}
}
export function recordRecentRule(slug:string){
  const next=[slug,...loadRecentRuleSlugs().filter(item=>item!==slug)].slice(0,8)
  localStorage.setItem(RECENT_RULES_KEY,JSON.stringify(next))
}
export function clearRecentRules(){localStorage.removeItem(RECENT_RULES_KEY)}
