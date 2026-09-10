import { gearShopItems, type GearShopItem } from '../data/characterOptions'
import { formatThreadpieceWp, formatThreadpieceWpAs, threadpieceValueToWp, WP_PER_NP, WP_PER_SP, type ThreadpieceUnit } from './threadpieces'

export const STARTING_WEALTH_WP=1500
export const ADVENTURE_KIT_SELL_WP=150
export const ORDINARY_GEAR_RESALE_PERCENT=50
export const TRADE_GOOD_RESALE_PERCENT=75
export const CRAFTING_MATERIAL_FLOOR_PERCENT=50

export type LegacyGearPriceSource={name:string;costWp?:number;costSp?:number;costNp?:number}
export type ProtectiveGearKind='armor'|'shield'

/** Legacy names are accepted only at the persistence/import boundary. Current code uses catalog names. */
export const LEGACY_GEAR_NAME_ALIASES:Readonly<Record<string,string>>={'Totem':'Caster Totem','Caster’s Totem':'Caster Totem',"Caster's Totem":'Caster Totem','Charm':'Spell Charm','Len-stone Arcanum':'Lens-Stone Arcanum'}
export function canonicalGearName(name:string){return LEGACY_GEAR_NAME_ALIASES[String(name||'')]||String(name||'')}

const gearByName=new Map(gearShopItems.map(item=>[item.name,item] as const))
function currentGear(name:string){return gearByName.get(canonicalGearName(name))}

export const TRINKET_NAMES=new Set(['Journey Knot','Caster Totem','Lens-Stone Arcanum','Scriptweave Book','Quickdraw Quiver','Featherwind Bolt-Case','Wristloop','Shiny Bobble','Votive Icon','Spell Charm','Heartward Token'])
export function isTrinketGear(item:{name:string;category?:string}){return item.category==='Trinket'||TRINKET_NAMES.has(canonicalGearName(item.name))}

/** Non-character shop economies remain independent because they are not purchasable character equipment. */
export const TRADE_GOOD_PRICE_WP:Readonly<Record<string,number>>={'Aloe Vera Leaves':3,'Ancient’s Metal':500,"Ancient's Metal":500,'Aurora Stones':250,'Belladraconis':50,'Bloodthorn':50,'Celestial Chamomile':4,'Cotton Bloom':2,'Deadlyveil':50,'Dragonroot':100,'Dreamblossom':50,'Elderstar Berries':2,'Ethereal Lemon Balm':4,'Herb of Mending':5,'Mandrakorrupt':150,'Moss Pads':4,'Shadowcap':150,'Shadowshade':50,'Silkspindle Thread':500,'Silkthread':50,'Stormtide Powder':20,'Swiftmend':50,'Tranquil Vale':50,'Wildharvest':3,'Wolffall':50,'Willow Bark Extract':10,'Wool Fleece':2,'Yewheart':150}
export const TRANSPORT_PRICE_WP:Readonly<Record<string,number>>={Cart:2000,Sled:2500,Wagon:3750,Carriage:6250,Seastrider:5000,Rollodillo:7500,Aeronaut:18750}
export const TRADE_GOOD_PRICE_UNIT:Readonly<Record<string,ThreadpieceUnit>>={'Aloe Vera Leaves':'wp','Ancient’s Metal':'bp',"Ancient's Metal":'bp','Aurora Stones':'bp','Belladraconis':'sp','Bloodthorn':'sp','Celestial Chamomile':'wp','Cotton Bloom':'wp','Deadlyveil':'sp','Dragonroot':'sp','Dreamblossom':'sp','Elderstar Berries':'wp','Ethereal Lemon Balm':'wp','Herb of Mending':'wp','Mandrakorrupt':'sp','Moss Pads':'wp','Shadowcap':'sp','Shadowshade':'sp','Silkspindle Thread':'bp','Silkthread':'sp','Stormtide Powder':'np','Swiftmend':'sp','Tranquil Vale':'sp','Wildharvest':'wp','Wolffall':'sp','Willow Bark Extract':'np','Wool Fleece':'wp','Yewheart':'sp'}
export const TRANSPORT_PRICE_UNIT:Readonly<Record<string,ThreadpieceUnit>>={Cart:'bp',Sled:'bp',Wagon:'bp',Carriage:'bp',Seastrider:'bp',Rollodillo:'bp',Aeronaut:'bp'}

export const SHIELD_NAMES=new Set(['Sapguard','Vinegrip','Ironwood Bulwark'])

function legacyGearPriceWp(item:LegacyGearPriceSource){if(Number.isFinite(Number(item.costNp)))return Math.max(0,Math.floor(Number(item.costNp)*WP_PER_NP));return Math.max(0,Math.floor(Number(item.costSp||0)*WP_PER_SP))}
/** Character Creation's gear catalog is the single current price/profile authority. */
export function canonicalGearCostWp(item:LegacyGearPriceSource){const current=currentGear(item.name);if(current)return current.costWp;const direct=Math.floor(Number(item.costWp));if(Number.isFinite(direct)&&direct>=0)return direct;return legacyGearPriceWp(item)}
export function canonicalGearCostLabel(item:LegacyGearPriceSource){return currentGear(item.name)?.costText||formatThreadpieceWp(canonicalGearCostWp(item))}
export function ordinaryGearResaleWp(item:LegacyGearPriceSource){return Math.floor(canonicalGearCostWp(item)*ORDINARY_GEAR_RESALE_PERCENT/100)}
export function tradeGoodResaleWp(name:string){return Math.floor((TRADE_GOOD_PRICE_WP[name]||0)*TRADE_GOOD_RESALE_PERCENT/100)}
export function craftingMaterialFloorWp(retailWp:number){return Math.floor(Math.max(0,Number(retailWp)||0)*CRAFTING_MATERIAL_FLOOR_PERCENT/100)}
export function bardingPriceWp(armor:LegacyGearPriceSource){return canonicalGearCostWp(armor)*3}
export function protectiveGearKind(item:{name:string;category?:string}):ProtectiveGearKind|null{if(item.category!=='Armor & Shield')return null;return SHIELD_NAMES.has(item.name)?'shield':'armor'}

export function canonicalRulePriceWp(documentKey:string,itemName:string){if(documentKey==='trade-goods')return TRADE_GOOD_PRICE_WP[itemName];if(documentKey==='transportation')return TRANSPORT_PRICE_WP[itemName];if(documentKey==='weapons'||documentKey==='armor-shields'||documentKey==='adventuring-gear')return currentGear(itemName)?.costWp;return undefined}
export function canonicalRulePriceLabel(documentKey:string,itemName:string){if(documentKey==='weapons'||documentKey==='armor-shields'||documentKey==='adventuring-gear')return currentGear(itemName)?.costText||'';const wp=canonicalRulePriceWp(documentKey,itemName);if(!Number.isFinite(wp))return'';const unit=documentKey==='trade-goods'?TRADE_GOOD_PRICE_UNIT[itemName]:TRANSPORT_PRICE_UNIT[itemName];return unit?formatThreadpieceWpAs(Number(wp),unit):formatThreadpieceWp(Number(wp))}
export function parseThreadpieceText(value:string){const match=String(value||'').trim().match(/^(\d+(?:\.\d+)?)\s*(wp|np|sp|bp)$/i);return match?Math.floor(threadpieceValueToWp(Number(match[1]),match[2])):0}

/** Read-only access for consumers that need to resolve a saved item back to its current catalog record. */
export function currentGearCatalogItem(name:string):GearShopItem|undefined{return currentGear(name)}
