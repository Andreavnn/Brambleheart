/**
 * Brambleheart Beta 0.42 canonical equipment normalization.
 *
 * This is the single authority for the normalized weapon / armor / shield
 * profiles introduced by the Beta 0.42 balance pass. Economy presentation
 * consumes this table; character sheets parse the normalized detail string.
 *
 * Runtime currency remains whole Washer Pieces (wp):
 * 10 wp = 1 np, 5 np = 1 sp, 5 sp = 1 bp.
 */
export type EquipmentNormalization = {
  costWp?: number
  detail?: string
  shopGroup?: string
}

const SP=50
const NP=10

export type AdventureKitItem={name:string;category:'Adventure Kit';detail:string;costWp:number;quantity?:number}

export const ADVENTURE_KIT_ITEMS:ReadonlyArray<AdventureKitItem> = [
  {name:'Bedroll & Groundsheet',category:'Adventure Kit',detail:'Starting Adventure Kit',costWp:0},
  {name:'Traveler’s Cloak',category:'Adventure Kit',detail:'Starting Adventure Kit',costWp:0},
  {name:'Torch',category:'Adventure Kit',detail:'Starting Adventure Kit',costWp:0,quantity:2},
  {name:'Reed Flask',category:'Adventure Kit',detail:'Starting Adventure Kit',costWp:0},
  {name:'Trail Rations',category:'Adventure Kit',detail:'Starting Adventure Kit',costWp:0,quantity:2},
  {name:'Traveler’s Pack',category:'Adventure Kit',detail:'Starting Adventure Kit',costWp:0},
  {name:'Fire-Starting Kit',category:'Adventure Kit',detail:'Starting Adventure Kit',costWp:0},
]

const entries:Record<string,EquipmentNormalization> = {
  // Weapons — damage / quality profiles remain source-backed; prices are the
  // normalized Beta 0.42 creation-facing curve.
  'Club':{costWp:1*SP,detail:'3 · 2 lb. · Bludgeoning, Versatile'},
  'Shade Blade (Dagger)':{costWp:2*SP,detail:'2 · 1 lb. · Deadly, Versatile, Thrown (5)'},
  'Shade Blade(Dagger)':{costWp:2*SP,detail:'2 · 1 lb. · Deadly, Versatile, Thrown (5)'},
  'Shade Blade':{costWp:2*SP,detail:'2 · 1 lb. · Deadly, Versatile, Thrown (5)'},
  'Timber Fang (Hatchet)':{costWp:4*SP,detail:'3 · 2 lb. · Slashing, Thrown (5)'},
  'Timber Fang(Hatchet)':{costWp:4*SP,detail:'3 · 2 lb. · Slashing, Thrown (5)'},
  'Timber Fang':{costWp:4*SP,detail:'3 · 2 lb. · Slashing, Thrown (5)'},
  'Rootbreaker (Mace)':{costWp:6*SP,detail:'4 · 2 lb. · Bludgeoning, Thrown (4)'},
  'Rootbreaker(Mace)':{costWp:6*SP,detail:'4 · 2 lb. · Bludgeoning, Thrown (4)'},
  'Rootbreaker':{costWp:6*SP,detail:'4 · 2 lb. · Bludgeoning, Thrown (4)'},
  'Oak Staff (Quarterstaff)':{costWp:1*SP,detail:'2 (3) · 4 lb. · Adaptable'},
  'Oak Staff(Quarterstaff)':{costWp:1*SP,detail:'2 (3) · 4 lb. · Adaptable'},
  'Oak Staff':{costWp:1*SP,detail:'2 (3) · 4 lb. · Adaptable'},
  'Brush Blade (Short Sword)':{costWp:8*SP,detail:'3 · 2 lb. · Slashing, Versatile'},
  'Brush Blade(Short Sword)':{costWp:8*SP,detail:'3 · 2 lb. · Slashing, Versatile'},
  'Brush Blade':{costWp:8*SP,detail:'3 · 2 lb. · Slashing, Versatile'},
  'Field Blade (Long Sword)':{costWp:12*SP,detail:'3 (5) · 3 lb. · Slashing, Adaptable'},
  'Field Blade(Long Sword)':{costWp:12*SP,detail:'3 (5) · 3 lb. · Slashing, Adaptable'},
  'Field Blade':{costWp:12*SP,detail:'3 (5) · 3 lb. · Slashing, Adaptable'},
  'Stonebreaker (Warhammer)':{costWp:20*SP,detail:'4 (6) · 2 lb. · Bludgeoning, Adaptable'},
  'Stonebreaker(Warhammer)':{costWp:20*SP,detail:'4 (6) · 2 lb. · Bludgeoning, Adaptable'},
  'Stonebreaker':{costWp:20*SP,detail:'4 (6) · 2 lb. · Bludgeoning, Adaptable'},
  'Thornspike (Dart)':{costWp:5,detail:'3 · ¼ lb. · Penetration, Thrown (6)'},
  'Thornspike(Dart)':{costWp:5,detail:'3 · ¼ lb. · Penetration, Thrown (6)'},
  'Thornspike':{costWp:5,detail:'3 · ¼ lb. · Penetration, Thrown (6)'},
  'Reedpipe (Blowpipe)':{costWp:8,detail:'2 · 1 lb. · Projectile (4), Deadly'},
  'Reedpipe(Blowpipe)':{costWp:8,detail:'2 · 1 lb. · Projectile (4), Deadly'},
  'Reedpipe':{costWp:8,detail:'2 · 1 lb. · Projectile (4), Deadly'},
  'Sling':{costWp:2*NP,detail:'3 · — · Projectile (5), Skyfire'},
  'Brush Bow (Short Bow)':{costWp:14*SP,detail:'3 · 2 lb. · Projectile (7), Penetration'},
  'Brush Bow(Short Bow)':{costWp:14*SP,detail:'3 · 2 lb. · Projectile (7), Penetration'},
  'Brush Bow':{costWp:14*SP,detail:'3 · 2 lb. · Projectile (7), Penetration'},
  'Far Bow (Long Bow)':{costWp:25*SP,detail:'4 · 2 lb. · Projectile (12), Penetration, Skyfire'},
  'Far Bow(Long Bow)':{costWp:25*SP,detail:'4 · 2 lb. · Projectile (12), Penetration, Skyfire'},
  'Far Bow':{costWp:25*SP,detail:'4 · 2 lb. · Projectile (12), Penetration, Skyfire'},
  'Quicklock (Light Crossbow)':{costWp:18*SP,detail:'3 · 5 lb. · Projectile (8), Penetration, Versatile'},
  'Quicklock(Light Crossbow)':{costWp:18*SP,detail:'3 · 5 lb. · Projectile (8), Penetration, Versatile'},
  'Quicklock':{costWp:18*SP,detail:'3 · 5 lb. · Projectile (8), Penetration, Versatile'},
  'Latchlock (Heavy Crossbow)':{costWp:30*SP,detail:'5 · 5 lb. · Projectile (10), Penetration, Skyfire'},
  'Latchlock(Heavy Crossbow)':{costWp:30*SP,detail:'5 · 5 lb. · Projectile (10), Penetration, Skyfire'},
  'Latchlock':{costWp:30*SP,detail:'5 · 5 lb. · Projectile (10), Penetration, Skyfire'},

  // Armor & shields — fourth field is Armor Penalty. Armor Penalty is applied
  // to Speed and to Whisperster rolls while the item is equipped.
  'Leafsitch':{costWp:6*SP,detail:'0 · +1 · +0 · 0 · 4 lb.'},
  'Barkskin Vest':{costWp:4*SP,detail:'0 · +1 · +0 · -1 · 6 lb.'},
  'Briarhide':{costWp:12*SP,detail:'1+ · +2 · +1 · -2 · 9 lb.'},
  'Roughscale':{costWp:10*SP,detail:'2+ · +2 · +2 · -3 · 14 lb.'},
  'Root Weave':{costWp:18*SP,detail:'2+ · +3 · +2 · -4 · 28 lb.'},
  'Heartguard':{costWp:15*SP,detail:'3+ · +3 · +3 · -4 · 22 lb.'},
  'Earthforged Plate':{costWp:26*SP,detail:'4+ · +4 · +3 · -5 · 36 lb.'},
  'Toughscale':{costWp:30*SP,detail:'4+ · +4 · +2 · -5 · 32 lb.'},
  'Durtlehide':{costWp:42*SP,detail:'5+ · +5 · +3 · -5 · 40 lb.'},
  'Runeforged Plate':{costWp:60*SP,detail:'5+ · +6 · +4 · -6 · 65 lb.'},
  'Sapguard':{costWp:6*SP,detail:'1+ · +1 · +1 · -1 · 4 lb.'},
  'Sapguard*':{costWp:6*SP,detail:'1+ · +1 · +1 · -1 · 4 lb.'},
  'Vinegrip':{costWp:18*SP,detail:'2+ · +3 · +2 · -2 · 10 lb.'},
  'Ironwood Bulwark':{costWp:28*SP,detail:'3+ · +4 · +3 · -3 · 18 lb.'},
  'IronwoodBulwark':{costWp:28*SP,detail:'3+ · +4 · +3 · -3 · 18 lb.'},

  // Categorization correction.
  'Cloak of Windweave':{shopGroup:'Traveler’s Gear'},
}

export function equipmentNormalizationFor(name:string|undefined){
  return entries[String(name||'').trim()]
}

function priceTextFromWp(value:number){
  const wp=Math.max(0,Math.round(Number(value)||0))
  if(wp>0&&wp%SP===0)return`${wp/SP} sp`
  if(wp>0&&wp%NP===0)return`${wp/NP} np`
  return`${wp} wp`
}

export function normalizeEquipmentCatalogItem<T extends {name:string;detail?:string;costWp?:number;costNp?:number;costSp?:number;costText?:string;shopGroup?:string}>(item:T):T{
  const patch=equipmentNormalizationFor(item.name)
  if(!patch)return item
  const costWp=patch.costWp
  return ({
    ...item,
    ...patch,
    ...(costWp===undefined?{}:{costWp,costNp:costWp/NP,costSp:costWp/SP,costText:priceTextFromWp(costWp)}),
  } as T)
}

export function armorPenaltyFromDetail(detail:string|undefined){
  const parts=String(detail||'').split('·').map(part=>part.trim()).filter(Boolean)
  if(parts.length<5)return 0
  const value=Number(parts[3].replace(/[^0-9+-]/g,''))
  return Number.isFinite(value)?Math.min(0,value):0
}

export function adventureKitEquipment(enabled:boolean|undefined){
  return enabled===false?[]:ADVENTURE_KIT_ITEMS.map(item=>({...item}))
}
