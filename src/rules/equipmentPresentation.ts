export interface EquipmentPresentationItem {
  name:string
  category?:string
  shopGroup?:string
  detail?:string
  description?:string
  effect?:string
  cooldown?:string
  choice?:string
  attachedTo?:string
  weightLb?:number
  quantity?:number
}

export function equipmentCardFields(item:EquipmentPresentationItem){
  const fields:Array<{label:string;value:string}>=[]
  if(item.detail&&item.detail!=='—')fields.push({label:'PROFILE',value:item.detail})
  if(item.effect)fields.push({label:'EFFECT',value:item.effect})
  if(item.cooldown)fields.push({label:'COOLDOWN',value:item.cooldown})
  return fields
}

export function equipmentToneClass(item:EquipmentPresentationItem){
  return item.shopGroup==='Trinkets'||item.category==='Trinket'?'detail-tone-trinket':'detail-tone-equipment'
}

export function mergeEquipmentPresentation<T extends EquipmentPresentationItem>(item:T,catalog:ReadonlyArray<EquipmentPresentationItem>):T&EquipmentPresentationItem{
  const source=catalog.find(candidate=>candidate.name===item.name)
  if(!source)return item
  return{
    ...source,
    ...item,
    category:item.category??source.category,
    shopGroup:item.shopGroup??source.shopGroup,
    detail:item.detail??source.detail,
    description:item.description??source.description,
    effect:item.effect??source.effect,
    cooldown:item.cooldown??source.cooldown,
  }
}
