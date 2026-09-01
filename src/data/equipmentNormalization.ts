/** Canonical Beta 0.43 equipment profile normalization. Prices remain authoritative in rules/economy.ts. */
export type EquipmentNormalization={detail?:string;shopGroup?:string}
export type AdventureKitItem={name:string;category:'Adventure Kit';detail:string;costWp:number;costSp:number;costNp?:number;effect?:string;choice?:string;attachedTo?:string;quantity?:number}
export const ADVENTURE_KIT_ITEMS:ReadonlyArray<AdventureKitItem>=[
{name:'Bedroll & Groundsheet',category:'Adventure Kit',detail:'Starting Adventure Kit',costWp:0,costSp:0},
{name:'Traveler’s Cloak',category:'Adventure Kit',detail:'Starting Adventure Kit',costWp:0,costSp:0},
{name:'Torch',category:'Adventure Kit',detail:'Starting Adventure Kit',costWp:0,costSp:0,quantity:2},
{name:'Reed Flask',category:'Adventure Kit',detail:'Starting Adventure Kit',costWp:0,costSp:0},
{name:'Trail Rations',category:'Adventure Kit',detail:'Starting Adventure Kit',costWp:0,costSp:0,quantity:2},
{name:'Traveler’s Pack',category:'Adventure Kit',detail:'Starting Adventure Kit',costWp:0,costSp:0},
{name:'Fire-Starting Kit',category:'Adventure Kit',detail:'Starting Adventure Kit',costWp:0,costSp:0},
]
const entries:Record<string,EquipmentNormalization>={
'Club':{detail:'2 · 2 lb. · Bludgeoning, Versatile'},
'Shade Blade (Dagger)':{detail:'2 · 1 lb. · Deadly, Versatile, Thrown (5)'},'Shade Blade(Dagger)':{detail:'2 · 1 lb. · Deadly, Versatile, Thrown (5)'},'Shade Blade':{detail:'2 · 1 lb. · Deadly, Versatile, Thrown (5)'},
'Timber Fang (Hatchet)':{detail:'3 · 2 lb. · Slashing, Thrown (5)'},'Timber Fang(Hatchet)':{detail:'3 · 2 lb. · Slashing, Thrown (5)'},'Timber Fang':{detail:'3 · 2 lb. · Slashing, Thrown (5)'},
'Rootbreaker (Mace)':{detail:'3 · 3 lb. · Bludgeoning, Thrown (4)'},'Rootbreaker(Mace)':{detail:'3 · 3 lb. · Bludgeoning, Thrown (4)'},'Rootbreaker':{detail:'3 · 3 lb. · Bludgeoning, Thrown (4)'},
'Oak Staff (Quarterstaff)':{detail:'2 (3) · 4 lb. · Adaptable'},'Oak Staff(Quarterstaff)':{detail:'2 (3) · 4 lb. · Adaptable'},'Oak Staff':{detail:'2 (3) · 4 lb. · Adaptable'},
'Brush Blade (Short Sword)':{detail:'3 · 2 lb. · Slashing, Versatile'},'Brush Blade(Short Sword)':{detail:'3 · 2 lb. · Slashing, Versatile'},'Brush Blade':{detail:'3 · 2 lb. · Slashing, Versatile'},
'Field Blade (Long Sword)':{detail:'3 (5) · 3 lb. · Slashing, Adaptable'},'Field Blade(Long Sword)':{detail:'3 (5) · 3 lb. · Slashing, Adaptable'},'Field Blade':{detail:'3 (5) · 3 lb. · Slashing, Adaptable'},
'Stonebreaker (Warhammer)':{detail:'4 (6) · 4 lb. · Bludgeoning, Adaptable'},'Stonebreaker(Warhammer)':{detail:'4 (6) · 4 lb. · Bludgeoning, Adaptable'},'Stonebreaker':{detail:'4 (6) · 4 lb. · Bludgeoning, Adaptable'},
'Thornspike (Dart)':{detail:'2 · ¼ lb. · Penetration, Thrown (6)'},'Thornspike(Dart)':{detail:'2 · ¼ lb. · Penetration, Thrown (6)'},'Thornspike':{detail:'2 · ¼ lb. · Penetration, Thrown (6)'},
'Reedpipe (Blowpipe)':{detail:'2 · 1 lb. · Projectile (4), Deadly'},'Reedpipe(Blowpipe)':{detail:'2 · 1 lb. · Projectile (4), Deadly'},'Reedpipe':{detail:'2 · 1 lb. · Projectile (4), Deadly'},
'Sling':{detail:'2 · — · Projectile (5), Skyfire'},
'Brush Bow (Short Bow)':{detail:'3 · 2 lb. · Projectile (7), Penetration, Two-Handed'},'Brush Bow(Short Bow)':{detail:'3 · 2 lb. · Projectile (7), Penetration, Two-Handed'},'Brush Bow':{detail:'3 · 2 lb. · Projectile (7), Penetration, Two-Handed'},
'Far Bow (Long Bow)':{detail:'4 · 3 lb. · Projectile (12), Penetration, Skyfire, Two-Handed'},'Far Bow(Long Bow)':{detail:'4 · 3 lb. · Projectile (12), Penetration, Skyfire, Two-Handed'},'Far Bow':{detail:'4 · 3 lb. · Projectile (12), Penetration, Skyfire, Two-Handed'},
'Quicklock (Light Crossbow)':{detail:'4 · 5 lb. · Projectile (8), Penetration, Two-Handed'},'Quicklock(Light Crossbow)':{detail:'4 · 5 lb. · Projectile (8), Penetration, Two-Handed'},'Quicklock':{detail:'4 · 5 lb. · Projectile (8), Penetration, Two-Handed'},
'Latchlock (Heavy Crossbow)':{detail:'5 · 8 lb. · Projectile (10), Penetration, Skyfire, Two-Handed'},'Latchlock(Heavy Crossbow)':{detail:'5 · 8 lb. · Projectile (10), Penetration, Skyfire, Two-Handed'},'Latchlock':{detail:'5 · 8 lb. · Projectile (10), Penetration, Skyfire, Two-Handed'},
'Leafsitch':{detail:'0 · +1 · 0 · 0 · 4 lb.'},'Barkskin Vest':{detail:'0 · +1 · +1 · -1 · 6 lb.'},'Briarhide':{detail:'1+ · +2 · +1 · -1 · 9 lb.'},'Roughscale':{detail:'2+ · +2 · +1 · -2 · 14 lb.'},'Root Weave':{detail:'2+ · +3 · +2 · -2 · 28 lb.'},'Heartguard':{detail:'3+ · +3 · +1 · -3 · 22 lb.'},'Earthforged Plate':{detail:'4+ · +4 · +2 · -3 · 36 lb.'},'Toughscale':{detail:'4+ · +4 · +1 · -4 · 32 lb.'},'Durtlehide':{detail:'5+ · +5 · +2 · -4 · 40 lb.'},'Runeforged Plate':{detail:'5+ · +6 · +3 · -5 · 65 lb.'},
'Sapguard':{detail:'1+ · +1 · 0 · 0 · 4 lb.'},'Sapguard*':{detail:'1+ · +1 · 0 · 0 · 4 lb.'},'Vinegrip':{detail:'2+ · +2 · +1 · -1 · 10 lb.'},'Ironwood Bulwark':{detail:'3+ · +3 · +2 · -2 · 18 lb.'},'IronwoodBulwark':{detail:'3+ · +3 · +2 · -2 · 18 lb.'},
'Cloak of Windweave':{shopGroup:'Traveler’s Gear'},
'Sharpening Stone':{shopGroup:'Consumables'},
}
export function equipmentNormalizationFor(name:string|undefined){return entries[String(name||'').trim()]}
export function normalizeEquipmentCatalogItem<T extends{name:string;detail?:string;shopGroup?:string}>(item:T):T{const patch=equipmentNormalizationFor(item.name);return patch?({...item,...patch} as T):item}
export function adventureKitEquipment(enabled:boolean|undefined){return enabled===false?[]:ADVENTURE_KIT_ITEMS.map(item=>({...item}))}
