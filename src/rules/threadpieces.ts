export const WP_PER_NP=10
export const NP_PER_SP=5
export const SP_PER_BP=5
export const WP_PER_SP=WP_PER_NP*NP_PER_SP
export const WP_PER_BP=WP_PER_SP*SP_PER_BP

function wholeWp(value:number){return Math.max(0,Math.floor(Number(value)||0))}

export function threadpieceValueToWp(amount:number,unit:string){
  const value=Math.max(0,Number(amount)||0)
  switch(String(unit||'').toLowerCase()){
    case'wp':return value
    case'np':return value*WP_PER_NP
    case'sp':return value*WP_PER_SP
    case'bp':return value*WP_PER_BP
    default:return 0
  }
}

export function formatThreadpieceWp(value:number){
  const wp=wholeWp(value)
  if(wp>=WP_PER_BP&&wp%WP_PER_BP===0)return`${wp/WP_PER_BP} bp`
  if(wp>=WP_PER_SP&&wp%WP_PER_SP===0)return`${wp/WP_PER_SP} sp`
  if(wp>=WP_PER_NP&&wp%WP_PER_NP===0)return`${wp/WP_PER_NP} np`
  return`${wp} wp`
}

export function gearCostNp(costSp:number){return Math.max(0,Number(costSp)||0)*NP_PER_SP}
export function formatGearCostNp(value:number){return formatThreadpieceWp(Math.max(0,Number(value)||0)*WP_PER_NP)}
export function formatGearCostSp(costSp:number){return formatGearCostNp(gearCostNp(costSp))}
export function halfGearCostSp(costSp:number){
  const fullWp=Math.max(0,Number(costSp)||0)*WP_PER_SP
  return Math.floor(fullWp/2)/WP_PER_SP
}

export function halfThreadpieceCostText(value:string){
  const text=String(value||'')
  const match=text.match(/^\s*(\d+(?:\.\d+)?)\s*(wp|np|sp|bp)\b(.*)$/i)
  if(!match)return text
  const halfWp=Math.floor(threadpieceValueToWp(Number(match[1]),match[2])/2)
  return`${formatThreadpieceWp(halfWp)}${match[3]||''}`
}
