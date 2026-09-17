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
  costText?:string
}

export function equipmentCardFields(item:EquipmentPresentationItem){
  const fields:Array<{label:string;value:string}>=[]
  if(item.detail&&item.detail!=='—')fields.push({label:'PROFILE',value:item.detail})
  if(item.effect)fields.push({label:'EFFECT',value:item.effect})
  if(item.cooldown)fields.push({label:'COOLDOWN',value:item.cooldown})
  return fields
}

export function equipmentToneClass(_item:EquipmentPresentationItem){
  return 'detail-tone-equipment'
}

export function equipmentQuantityDetail(item:EquipmentPresentationItem){
  const quantity=Math.max(1,Math.floor(Number(item.quantity)||1))
  return`x ${quantity}`
}

function canonicalEquipmentName(value:string){
  return String(value||'')
    .replace(/\([^)]*\)/g,' ')
    .replace(/[’']/g,'')
    .replace(/[^a-z0-9]+/gi,' ')
    .trim()
    .replace(/\s+/g,' ')
    .toLowerCase()
}

function weightDetail(weightLb:number|undefined){
  const weight=Number(weightLb)
  if(!Number.isFinite(weight)||weight<=0)return''
  return`${Number.isInteger(weight)?weight:weight.toFixed(1)} lb.`
}

export function mergeEquipmentPresentation<T extends EquipmentPresentationItem>(item:T,catalog:ReadonlyArray<EquipmentPresentationItem>):T&EquipmentPresentationItem{
  const source=catalog.find(candidate=>candidate.name===item.name)||catalog.find(candidate=>canonicalEquipmentName(candidate.name)===canonicalEquipmentName(item.name))
  if(!source)return{...item,detail:item.detail||weightDetail(item.weightLb)}
  return{
    ...source,
    ...item,
    category:item.category??source.category,
    shopGroup:item.shopGroup??source.shopGroup,
    detail:item.detail??source.detail??weightDetail(item.weightLb??source.weightLb),
    description:item.description??source.description,
    effect:item.effect??source.effect,
    cooldown:item.cooldown??source.cooldown,
  }
}
