export interface ExternalMonsterEntry { name:string; category:string; group?:string; summary:string }
export const WOODLANDS_MONSTERS_URL='https://thewoodlandsrpg.wordpress.com/monsters/'
export const WOODLANDS_ENCOUNTERS_URL='https://thewoodlandsrpg.wordpress.com/encounters/'

const categorySummary:Record<string,string>={
  'Companions':'Helpful creatures presented as adventuring companions and playful allies.',
  'Generic Monsters':'Common creatures that form the backbone of many encounters.',
  'Necrotic Horrors':'Undead and cursed creatures animated by dark magic or lingering malevolence.',
  'Primordial Entities':'Ancient and elemental beings tied to the forces that shape the world.',
  'Verdant Aberrations':'Twisted, mutated creatures warped by unnatural forces within the wilds.',
}
function monster(name:string,category:string,group?:string):ExternalMonsterEntry{return{name,category,group,summary:categorySummary[category]||'A creature listed in the Woodlands monster reference.'}}
export const externalMonsters:ExternalMonsterEntry[]=[
  monster('Aeronaut','Companions'),monster('Familiars','Companions'),monster('Fenrir','Companions'),monster('Rollodillo','Companions'),monster('Seastrider','Companions'),
  monster('Glop','Generic Monsters'),monster('Blaze Glop','Generic Monsters','Glop'),
  monster('Undeath Sorcerer','Necrotic Horrors'),monster('Lich Archregent','Necrotic Horrors','Undeath Sorcerer'),monster('Lich Lord','Necrotic Horrors','Undeath Sorcerer'),
  monster('Undeath Warrior','Necrotic Horrors'),monster('Crypt Guard','Necrotic Horrors','Undeath Warrior'),monster('Legionnaire','Necrotic Horrors','Undeath Warrior'),
  monster('Graveborn Horror','Necrotic Horrors'),monster('Terrorghiest','Necrotic Horrors'),monster('Necrotide','Necrotic Horrors'),monster('Ghoul Pack','Necrotic Horrors','Necrotide'),
  monster('Tempest Warden','Primordial Entities'),
  monster('Blightroot Treant','Verdant Aberrations'),monster('Fungal Behemoth','Verdant Aberrations'),monster('Leafshroud Guardian','Verdant Aberrations'),monster('Mossclad Stalker','Verdant Aberrations'),monster('Thorned Bramblefiend','Verdant Aberrations'),monster('Thornblade Nymphs','Verdant Aberrations'),monster('Verdant Lurker','Verdant Aberrations'),monster('Vinecrawler','Verdant Aberrations'),monster('Voracious Bramblebeast','Verdant Aberrations'),
]
export function monsterSlug(name:string){return `monster-${name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}`}
export function findExternalMonster(slug:string){return externalMonsters.find(monster=>monsterSlug(monster.name)===slug)}
export const monsterCategories=[
  {name:'Companions',summary:categorySummary['Companions']},
  {name:'Arcane Automata',summary:'Enchanted machines and mystical constructs brought to life by ancient forces.'},
  {name:'Eldritch Abominations',summary:'Nightmarish beings from beyond the veil of ordinary reality.'},
  {name:'Epic Legends and Tall-Tale Terrors',summary:'Celebrated and legendary creatures whose stories echo through the ages.'},
  {name:'Insectoid Terrors',summary:'Swarms, gigantic insects, arachnids, and other skittering horrors.'},
  {name:'Generic Monsters',summary:categorySummary['Generic Monsters']},
  {name:'Necrotic Horrors',summary:categorySummary['Necrotic Horrors']},
  {name:'Primordial Entities',summary:categorySummary['Primordial Entities']},
  {name:'Verdant Aberrations',summary:categorySummary['Verdant Aberrations']},
]
