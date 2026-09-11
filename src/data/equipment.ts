export interface EquipmentStatBonuses {
  control?:number
}

export type AdventureKitItem={name:string;category:'Adventure Kit';costWp:number;costSp:number;costNp?:number;effect?:string;choice?:string;attachedTo?:string;quantity?:number;weightLb?:number}

/** The Adventure Kit is starting inventory, not a second equipment shop catalog. */
export const ADVENTURE_KIT_ITEMS:ReadonlyArray<AdventureKitItem>=[
  {name:'Bedroll & Groundsheet',category:'Adventure Kit',costWp:0,costSp:0,weightLb:4},
  {name:'Traveler’s Cloak',category:'Adventure Kit',costWp:0,costSp:0,weightLb:2},
  {name:'Torch',category:'Adventure Kit',costWp:0,costSp:0,weightLb:1,quantity:2},
  {name:'Reed Flask',category:'Adventure Kit',costWp:0,costSp:0,weightLb:1},
  {name:'Trail Rations',category:'Adventure Kit',costWp:0,costSp:0,weightLb:1,quantity:2},
  {name:'Traveler’s Pack',category:'Adventure Kit',costWp:0,costSp:0,weightLb:2},
  {name:'Fire-Starting Kit',category:'Adventure Kit',costWp:0,costSp:0,weightLb:0.5},
]

export function adventureKitEquipment(enabled:boolean|undefined){return enabled===false?[]:ADVENTURE_KIT_ITEMS.map(item=>({...item}))}
