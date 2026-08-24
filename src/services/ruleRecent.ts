import { readLocalStorage, STORAGE_KEYS, writeLocalStorage } from './storage'

export const RECENT_RULES_KEY=STORAGE_KEYS.recentRules
export function loadRecentRuleSlugs():string[]{
  try{const raw=JSON.parse(readLocalStorage(RECENT_RULES_KEY)||'[]');return Array.isArray(raw)?raw.filter(v=>typeof v==='string').slice(0,8):[]}
  catch{return[]}
}
export function recordRecentRule(slug:string){
  const next=[slug,...loadRecentRuleSlugs().filter(item=>item!==slug)].slice(0,8)
  writeLocalStorage(RECENT_RULES_KEY,JSON.stringify(next))
}
