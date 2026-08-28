import type { GearShopItem } from '../data/characterOptions'
import { formatThreadpieceWp, formatThreadpieceWpAs, threadpieceValueToWp, WP_PER_NP, WP_PER_SP, type ThreadpieceUnit } from './threadpieces'

export const STARTING_WEALTH_WP=1500
export const ADVENTURE_KIT_SELL_WP=150
export const ORDINARY_GEAR_RESALE_PERCENT=50
export const TRADE_GOOD_RESALE_PERCENT=75
export const CRAFTING_MATERIAL_FLOOR_PERCENT=50

export type LegacyGearPriceSource={name:string;costWp?:number;costSp?:number;costNp?:number}
export type EconomyGearItem=GearShopItem&{costWp:number}
export type ProtectiveGearKind='armor'|'shield'

export const GEAR_PRICE_WP:Readonly<Record<string,number>>={
  'Club':50,
  'Shade Blade (Dagger)':150,
  'Timber Fang (Hatchet)':250,
  'Rootbreaker (Mace)':400,
  'Oak Staff (Quarterstaff)':50,
  'Brush Blade (Short Sword)':500,
  'Field Blade (Long Sword)':1000,
  'Stonebreaker (Warhammer)':1750,
  'Thornspike (Dart)':5,
  'Reedpipe (Blowpipe)':8,
  'Sling':20,
  'Brush Bow (Short Bow)':1000,
  'Far Bow (Long Bow)':2500,
  'Quicklock (Light Crossbow)':1250,
  'Latchlock (Heavy Crossbow)':3000,
  'Leafsitch':400,
  'Barkskin Vest':250,
  'Briarhide':2250,
  'Roughscale':1750,
  'Root Weave':3750,
  'Heartguard':12500,
  'Earthforged Plate':30000,
  'Toughscale':15000,
  'Durtlehide':40000,
  'Runeforged Plate':75000,
  'Sapguard':600,
  'Vinegrip':3250,
  'Ironwood Bulwark':15000,
  'Bedroll & Groundsheet':80,
  'Traveler’s Cloak':200,
  "Traveler's Cloak":200,
  'Torch (each)':2,
  'Travel Lantern':100,
  'Glowfruit Cage':30,
  'Waterskin':80,
  'Reed Flask':40,
  'Travel Meal (2 day)':60,
  'Trail Rations (1 day)':30,
  'Traveler’s Pack':50,
  "Traveler's Pack":50,
  'Forager’s Satchel':50,
  "Forager's Satchel":50,
  'Fire-Starting Kit':60,
  'Traveler’s Rope (20 ft)':50,
  "Traveler's Rope (20 ft)":50,
  'Glow-Moss Chalk':1,
  'Rootwalker Bundle':50,
  'Artisan':150,
  'Artisan Kit':150,
  'Climber':100,
  'Climber Kit':100,
  'Disguise':150,
  'Disguise Kit':150,
  'Forgery':100,
  'Forgery Kit':100,
  'Navigator':100,
  'Navigator Kit':100,
  'Poisoner':100,
  'Poisoner Kit':100,
  'Herbalist':50,
  'Herbalist Kit':50,
  'Infusion':100,
  'Infusion Kit':100,
  'Thieves’':150,
  "Thieves'":150,
  'Thieves’ Kit':150,
  "Thieves' Kit":150,
  'Antivenin':150,
  'Aroma':50,
  'Black Water':100,
  'Blessed Water':100,
  'Liquid Fire':200,
  'Potion of Healing':250,
  'Scriptweave Book':600,
  'Totem':300,
  'Charm':350,
  'Len-stone Arcanum':300,
  'Cloak of Windweave':500,
  'Quickdraw Quiver':300,
  'Featherwind Bolt-Case':300,
  'Wristloop':200,
  'Sharpening Stone':400,
  'Journey Knot':350,
  'Shovel':60,
  'Mallet':40,
  'Hatchet':50,
  'Hand Saw':50,
  'Trowel':20,
  'Pry Bar':50,
}

export const TRADE_GOOD_PRICE_WP:Readonly<Record<string,number>>={
  'Aloe Vera Leaves':3,
  'Ancient’s Metal':500,
  "Ancient's Metal":500,
  'Aurora Stones':250,
  'Belladraconis':50,
  'Bloodthorn':50,
  'Celestial Chamomile':4,
  'Cotton Bloom':2,
  'Deadlyveil':50,
  'Dragonroot':100,
  'Dreamblossom':50,
  'Elderstar Berries':2,
  'Ethereal Lemon Balm':4,
  'Herb of Mending':5,
  'Mandrakorrupt':150,
  'Moss Pads':4,
  'Shadowcap':150,
  'Shadowshade':50,
  'Silkspindle Thread':500,
  'Silkthread':50,
  'Stormtide Powder':20,
  'Swiftmend':50,
  'Tranquil Vale':50,
  'Wildharvest':3,
  'Wolffall':50,
  'Willow Bark Extract':10,
  'Wool Fleece':2,
  'Yewheart':150,
}

export const TRANSPORT_PRICE_WP:Readonly<Record<string,number>>={
  'Cart':2000,
  'Sled':2500,
  'Wagon':3750,
  'Carriage':6250,
  'Seastrider':5000,
  'Rollodillo':7500,
  'Aeronaut':18750,
}

export const GEAR_PRICE_UNIT:Readonly<Record<string,ThreadpieceUnit>>={
  'Club':'sp','Shade Blade (Dagger)':'sp','Timber Fang (Hatchet)':'sp','Rootbreaker (Mace)':'sp','Oak Staff (Quarterstaff)':'sp','Brush Blade (Short Sword)':'sp','Field Blade (Long Sword)':'sp','Stonebreaker (Warhammer)':'sp','Thornspike (Dart)':'wp','Reedpipe (Blowpipe)':'wp','Sling':'np','Brush Bow (Short Bow)':'sp','Far Bow (Long Bow)':'sp','Quicklock (Light Crossbow)':'sp','Latchlock (Heavy Crossbow)':'sp',
  'Leafsitch':'sp','Barkskin Vest':'sp','Briarhide':'sp','Roughscale':'sp','Root Weave':'sp','Heartguard':'sp','Earthforged Plate':'sp','Toughscale':'sp','Durtlehide':'sp','Runeforged Plate':'sp','Sapguard':'sp','Vinegrip':'sp','Ironwood Bulwark':'sp',
  'Bedroll & Groundsheet':'np','Traveler’s Cloak':'sp',"Traveler's Cloak":'sp','Torch (each)':'wp','Travel Lantern':'sp','Glowfruit Cage':'np','Waterskin':'np','Reed Flask':'np','Travel Meal (2 day)':'np','Trail Rations (1 day)':'np','Traveler’s Pack':'sp',"Traveler's Pack":'sp','Forager’s Satchel':'np',"Forager's Satchel":'np','Fire-Starting Kit':'np','Traveler’s Rope (20 ft)':'sp',"Traveler's Rope (20 ft)":'sp','Glow-Moss Chalk':'wp','Rootwalker Bundle':'np','Artisan':'sp','Artisan Kit':'sp','Climber':'sp','Climber Kit':'sp','Disguise':'sp','Disguise Kit':'sp','Forgery':'sp','Forgery Kit':'sp','Navigator':'sp','Navigator Kit':'sp','Poisoner':'sp','Poisoner Kit':'sp','Herbalist':'sp','Herbalist Kit':'sp','Infusion':'sp','Infusion Kit':'sp','Thieves’':'sp',"Thieves'":'sp','Thieves’ Kit':'sp',"Thieves' Kit":'sp','Antivenin':'sp','Aroma':'sp','Black Water':'sp','Blessed Water':'sp','Liquid Fire':'sp','Potion of Healing':'sp','Scriptweave Book':'sp','Totem':'sp','Charm':'sp','Len-stone Arcanum':'sp','Cloak of Windweave':'sp','Quickdraw Quiver':'sp','Featherwind Bolt-Case':'sp','Wristloop':'sp','Sharpening Stone':'sp','Journey Knot':'sp','Shovel':'np','Mallet':'np','Hatchet':'sp','Hand Saw':'sp','Trowel':'np','Pry Bar':'np',
}

export const TRADE_GOOD_PRICE_UNIT:Readonly<Record<string,ThreadpieceUnit>>={
  'Aloe Vera Leaves':'wp','Ancient’s Metal':'bp',"Ancient's Metal":'bp','Aurora Stones':'bp','Belladraconis':'sp','Bloodthorn':'sp','Celestial Chamomile':'wp','Cotton Bloom':'wp','Deadlyveil':'sp','Dragonroot':'sp','Dreamblossom':'sp','Elderstar Berries':'wp','Ethereal Lemon Balm':'wp','Herb of Mending':'wp','Mandrakorrupt':'sp','Moss Pads':'wp','Shadowcap':'sp','Shadowshade':'sp','Silkspindle Thread':'bp','Silkthread':'sp','Stormtide Powder':'np','Swiftmend':'sp','Tranquil Vale':'sp','Wildharvest':'wp','Wolffall':'sp','Willow Bark Extract':'np','Wool Fleece':'wp','Yewheart':'sp',
}

export const TRANSPORT_PRICE_UNIT:Readonly<Record<string,ThreadpieceUnit>>={Cart:'bp',Sled:'bp',Wagon:'bp',Carriage:'bp',Seastrider:'bp',Rollodillo:'bp',Aeronaut:'bp'}

export const SHIELD_NAMES=new Set(['Sapguard','Vinegrip','Ironwood Bulwark'])

export const FIELD_BLADE_ITEM:EconomyGearItem={
  name:'Field Blade (Long Sword)',
  category:'Weapon',
  costText:'20 sp',
  costSp:20,
  costWp:1000,
  detail:'3 (5) · 3 lb. · Slashing, Adaptable',
}

function legacyGearPriceWp(item:LegacyGearPriceSource){
  if(Number.isFinite(Number(item.costNp)))return Math.max(0,Math.floor(Number(item.costNp)*WP_PER_NP))
  return Math.max(0,Math.floor(Number(item.costSp||0)*WP_PER_SP))
}

export function canonicalGearCostWp(item:LegacyGearPriceSource){
  const listed=GEAR_PRICE_WP[item.name]
  if(Number.isFinite(listed))return Math.max(0,Math.floor(Number(listed)))
  const direct=Math.floor(Number(item.costWp))
  if(Number.isFinite(direct)&&direct>=0)return direct
  return legacyGearPriceWp(item)
}

export function canonicalGearCostLabel(item:LegacyGearPriceSource){const wp=canonicalGearCostWp(item);const unit=GEAR_PRICE_UNIT[item.name];return unit?formatThreadpieceWpAs(wp,unit):formatThreadpieceWp(wp)}
export function ordinaryGearResaleWp(item:LegacyGearPriceSource){return Math.floor(canonicalGearCostWp(item)*ORDINARY_GEAR_RESALE_PERCENT/100)}
export function tradeGoodResaleWp(name:string){return Math.floor((TRADE_GOOD_PRICE_WP[name]||0)*TRADE_GOOD_RESALE_PERCENT/100)}
export function craftingMaterialFloorWp(retailWp:number){return Math.floor(Math.max(0,Number(retailWp)||0)*CRAFTING_MATERIAL_FLOOR_PERCENT/100)}
export function bardingPriceWp(armor:LegacyGearPriceSource){return canonicalGearCostWp(armor)*3}

export function protectiveGearKind(item:{name:string;category?:string}):ProtectiveGearKind|null{
  if(item.category!=='Armor & Shield')return null
  return SHIELD_NAMES.has(item.name)?'shield':'armor'
}

export function economyGearCatalog(items:GearShopItem[]):EconomyGearItem[]{
  const catalog=items.map(item=>{
    const costWp=canonicalGearCostWp(item)
    return{...item,costWp,costSp:costWp/WP_PER_SP,costText:canonicalGearCostLabel({...item,costWp})}
  })
  if(!catalog.some(item=>item.name===FIELD_BLADE_ITEM.name))catalog.splice(Math.max(0,catalog.findIndex(item=>item.name==='Stonebreaker (Warhammer)')),0,{...FIELD_BLADE_ITEM})
  return catalog
}

export function canonicalRulePriceWp(documentKey:string,itemName:string){
  if(documentKey==='trade-goods')return TRADE_GOOD_PRICE_WP[itemName]
  if(documentKey==='transportation')return TRANSPORT_PRICE_WP[itemName]
  if(documentKey==='weapons'||documentKey==='armor-shields'||documentKey==='adventuring-gear')return GEAR_PRICE_WP[itemName]
  return undefined
}

export function canonicalRulePriceLabel(documentKey:string,itemName:string){
  const wp=canonicalRulePriceWp(documentKey,itemName)
  if(!Number.isFinite(wp))return''
  const unit=documentKey==='trade-goods'?TRADE_GOOD_PRICE_UNIT[itemName]:documentKey==='transportation'?TRANSPORT_PRICE_UNIT[itemName]:GEAR_PRICE_UNIT[itemName]
  return unit?formatThreadpieceWpAs(Number(wp),unit):formatThreadpieceWp(Number(wp))
}

export function parseThreadpieceText(value:string){
  const match=String(value||'').trim().match(/^(\d+(?:\.\d+)?)\s*(wp|np|sp|bp)$/i)
  return match?Math.floor(threadpieceValueToWp(Number(match[1]),match[2])):0
}
