export const WP_PER_NP=10
export const NP_PER_SP=5
export const SP_PER_BP=5
export const WP_PER_SP=WP_PER_NP*NP_PER_SP
export const WP_PER_BP=WP_PER_SP*SP_PER_BP
export type ThreadpieceUnit='wp'|'np'|'sp'|'bp'

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

export function threadpieceBreakdownFromWp(value:number){
  let remainder=wholeWp(value)
  const bp=Math.floor(remainder/WP_PER_BP);remainder%=WP_PER_BP
  const sp=Math.floor(remainder/WP_PER_SP);remainder%=WP_PER_SP
  const np=Math.floor(remainder/WP_PER_NP);const wp=remainder%WP_PER_NP
  return{bp,sp,np,wp}
}

export function formatThreadpieceBalance(value:number){
  const balance=threadpieceBreakdownFromWp(value)
  const parts=[balance.bp?`${balance.bp} bp`:'',balance.sp?`${balance.sp} sp`:'',balance.np?`${balance.np} np`:'',balance.wp?`${balance.wp} wp`:''].filter(Boolean)
  return parts.join(' · ')||'0 wp'
}

export function formatThreadpieceWp(value:number){
  const wp=wholeWp(value)
  if(wp>=WP_PER_BP&&wp%WP_PER_BP===0)return`${wp/WP_PER_BP} bp`
  if(wp>=WP_PER_SP&&wp%WP_PER_SP===0)return`${wp/WP_PER_SP} sp`
  if(wp>=WP_PER_NP&&wp%WP_PER_NP===0)return`${wp/WP_PER_NP} np`
  return`${wp} wp`
}


export function formatThreadpieceWpAs(value:number,unit:ThreadpieceUnit){
  const wp=wholeWp(value)
  const divisor=unit==='bp'?WP_PER_BP:unit==='sp'?WP_PER_SP:unit==='np'?WP_PER_NP:1
  if(wp%divisor!==0)return formatThreadpieceWp(wp)
  return`${wp/divisor} ${unit}`
}

export function gearCostNp(costSp:number){return Math.max(0,Number(costSp)||0)*NP_PER_SP}
export function formatGearCostNp(value:number){return formatThreadpieceWp(Math.max(0,Number(value)||0)*WP_PER_NP)}
export function formatGearCostSp(costSp:number){return formatGearCostNp(gearCostNp(costSp))}
