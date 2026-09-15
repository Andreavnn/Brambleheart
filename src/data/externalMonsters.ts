export interface MonsterAction { name:string; type:'Move'|'Touch'|'Shoot'|'Instinct'|'Magic'|'Reactive'|'Passive'; text:string; keywords:string[] }
export interface MonsterSpecialRule { name:string; text:string; keywords:string[] }
export interface MonsterProfile { threatLevel:number; threatPoints:number; health:number; attributes:{agility:number;might:number;hide:number;lore:number;bravery:number}; actions:MonsterAction[]; monstrousTraits:MonsterSpecialRule[] }
export interface ExternalMonsterEntry { name:string; category:string; group?:string; summary:string; placeholder?:boolean; profile?:MonsterProfile }

const categorySummary:Record<string,string>={
  'Companions':'Helpful creatures presented as adventuring companions and playful allies.',
  'Arcane Automata':'Enchanted machines and mystical constructs animated by arcane forces.',
  'Eldritch Abominations':'Nightmarish beings whose forms and instincts defy the ordinary world.',
  'Epic Legends and Tall-Tale Terrors':'Celebrated and legendary creatures whose stories echo through the ages.',
  'Insectoid Terrors':'Swarms, gigantic insects, arachnids, and other skittering horrors.',
  'Generic Monsters':'Common creatures that form the backbone of many encounters.',
  'Necrotic Horrors':'Undead and cursed creatures animated by dark magic or lingering malevolence.',
  'Primordial Entities':'Ancient and elemental beings tied to the forces that shape the world.',
  'Verdant Aberrations':'Twisted, mutated creatures warped by unnatural forces within the wilds.',
}
function monster(name:string,category:string,group?:string,profile?:MonsterProfile):ExternalMonsterEntry{return{name,category,group,summary:categorySummary[category]||'A creature in the Watcher monster catalog.',profile}}
function placeholder(name:string,category:string):ExternalMonsterEntry{return{name,category,summary:categorySummary[category]||'A creature in the Watcher monster catalog.',placeholder:true}}

const glopProfile:MonsterProfile={
  threatLevel:1,threatPoints:8,health:18,
  attributes:{agility:1,might:2,hide:2,lore:1,bravery:1},
  actions:[
    {name:'Slosh',type:'Move',text:'TRIGGER: During the Creature’s Turn. EFFECT: Move up to the Creature’s Speed. The Creature may move through mud, shallow water, and spaces narrow enough for its amorphous body without additional movement cost.',keywords:['CORE']},
    {name:'Gelatinous Bash',type:'Touch',text:'TRIGGER: During the Creature’s Turn. DECLARE: Choose [1] enemy within [2] squares. EFFECT: The Creature may move up to [1] square toward the target before resolving TO HIT. TO HIT: Make a melee Strike using (3d10) + the Creature’s Brawl + condition(s) against the target’s (3d10) + Ward + condition(s). DAMAGE: On a successful Strike, deal [3] + Fury Standard damage, plus applicable conditions and effects. RESTRICTIONS: The target must be within [1] square when TO HIT is resolved.',keywords:['CORE']},
    {name:'Sticky Splash',type:'Shoot',text:'TRIGGER: During the Creature’s Turn. TARGET: One character within [3] squares. TO HIT: Make a Ranged Strike using the Creature’s Aim. DAMAGE: [2] Standard damage. ON SUCCESS: The target suffers condition [-1] to its next Agility Save before the end of its next turn.',keywords:['CORE','SHOOT']},
    {name:'Reconstitute',type:'Instinct',text:'TRIGGER: At the start of the round, if the Creature is below [5] Health. EFFECT: The Creature rolls [1d10]. On [6+], restore [1] Health to the Creature.\nCOOLDOWN: This Ability cannot be used again for [1d10/2] rounds.',keywords:['INSTINCT']},
  ],
  monstrousTraits:[
    {name:'Slick Trail',text:'TRIGGER: When the Creature ends a Move after moving at least [1] square. EFFECT: The last square the Creature passed through before ending that Move becomes Slick until the end of the round. Other characters must spend [+1] additional Speed to enter that Slick square.',keywords:['PASSIVE','MOVEMENT']},
    {name:'Gelatinous Body',text:'TRIGGER: When the Creature suffers Direct damage or an effect would forcibly move, disarm, grapple, or otherwise pin it. EFFECT: Reduce Direct damage suffered by the Creature by [-1], to a minimum of [0] damage after all other applicable reductions. The Creature is immune to effects that would forcibly move, disarm, grapple, or otherwise pin it.',keywords:['PASSIVE']},
    {name:'Amorphous',text:'EFFECT: The Creature can squeeze through narrow openings that could reasonably admit part of its body. RESTRICTIONS: The Creature cannot use this rule to pass through solid barriers or occupy another Creature’s space at the end of movement.',keywords:['PASSIVE','MOVEMENT']},
  ],
}

export const externalMonsters:ExternalMonsterEntry[]=[
  monster('Aeronaut','Companions'),monster('Familiars','Companions'),monster('Fenrir','Companions'),monster('Rollodillo','Companions'),monster('Seastrider','Companions'),placeholder('Mossling','Companions'),placeholder('Reedrunner','Companions'),placeholder('Lantern Toad','Companions'),placeholder('Bramble Hare','Companions'),placeholder('Pondskipper','Companions'),

  placeholder('Runegear Sentinel','Arcane Automata'),placeholder('Aethercoil Hound','Arcane Automata'),placeholder('Brassroot Custodian','Arcane Automata'),placeholder('Glyphwork Warden','Arcane Automata'),placeholder('Spellcoil Drone','Arcane Automata'),placeholder('Lantern Engine','Arcane Automata'),placeholder('Sigilbound Porter','Arcane Automata'),placeholder('Hexglass Observer','Arcane Automata'),placeholder('Clockvine Harrier','Arcane Automata'),placeholder('Mana-Lattice Golem','Arcane Automata'),

  placeholder('Veil-Eater','Eldritch Abominations'),placeholder('Hollow Starling','Eldritch Abominations'),placeholder('Many-Eyed Pilgrim','Eldritch Abominations'),placeholder('Whisper Maw','Eldritch Abominations'),placeholder('Folded One','Eldritch Abominations'),placeholder('Skinless Echo','Eldritch Abominations'),placeholder('Dream Leech','Eldritch Abominations'),placeholder('Unmoored Witness','Eldritch Abominations'),placeholder('Pale Geometry','Eldritch Abominations'),placeholder('Starved Oracle','Eldritch Abominations'),

  placeholder('Briar Mantis','Insectoid Terrors'),placeholder('Glasswing Swarm','Insectoid Terrors'),placeholder('Ironbark Beetle','Insectoid Terrors'),placeholder('Mire Centipede','Insectoid Terrors'),placeholder('Needle Wasp','Insectoid Terrors'),placeholder('Rootborer Grub','Insectoid Terrors'),placeholder('Lantern Moth','Insectoid Terrors'),placeholder('Webthorn Spider','Insectoid Terrors'),placeholder('Carrion Cicada','Insectoid Terrors'),placeholder('Spore Ant Colony','Insectoid Terrors'),

  monster('Glop','Generic Monsters',undefined,glopProfile),monster('Blaze Glop','Generic Monsters','Glop'),placeholder('Bramble Boar','Generic Monsters'),placeholder('Mossback Stag','Generic Monsters'),placeholder('Mire Hound','Generic Monsters'),placeholder('Ashfang Wolf','Generic Monsters'),placeholder('Stonehide Ram','Generic Monsters'),placeholder('Reed Serpent','Generic Monsters'),placeholder('Thornback Toad','Generic Monsters'),placeholder('Hollowclaw Bear','Generic Monsters'),

  monster('Undeath Sorcerer','Necrotic Horrors'),monster('Lich Archregent','Necrotic Horrors','Undeath Sorcerer'),monster('Lich Lord','Necrotic Horrors','Undeath Sorcerer'),monster('Undeath Warrior','Necrotic Horrors'),monster('Crypt Guard','Necrotic Horrors','Undeath Warrior'),monster('Legionnaire','Necrotic Horrors','Undeath Warrior'),monster('Graveborn Horror','Necrotic Horrors'),monster('Terrorghiest','Necrotic Horrors'),monster('Necrotide','Necrotic Horrors'),monster('Ghoul Pack','Necrotic Horrors','Necrotide'),

  monster('Tempest Warden','Primordial Entities'),placeholder('Ember Warden','Primordial Entities'),placeholder('Root Colossus','Primordial Entities'),placeholder('Tidal Shepherd','Primordial Entities'),placeholder('Stonewake Titan','Primordial Entities'),placeholder('Gale Herald','Primordial Entities'),placeholder('Frostroot Ancient','Primordial Entities'),placeholder('Quakeborn','Primordial Entities'),placeholder('Sunscar Elemental','Primordial Entities'),placeholder('Deepwater Oracle','Primordial Entities'),

  monster('Blightroot Treant','Verdant Aberrations'),monster('Fungal Behemoth','Verdant Aberrations'),monster('Leafshroud Guardian','Verdant Aberrations'),monster('Mossclad Stalker','Verdant Aberrations'),monster('Thorned Bramblefiend','Verdant Aberrations'),monster('Thornblade Nymphs','Verdant Aberrations'),monster('Verdant Lurker','Verdant Aberrations'),monster('Vinecrawler','Verdant Aberrations'),monster('Voracious Bramblebeast','Verdant Aberrations'),placeholder('Rotbloom Devourer','Verdant Aberrations'),
]

export function monsterSlug(name:string){return `monster-${name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}`}
export function findExternalMonster(slug:string){return externalMonsters.find(monster=>monsterSlug(monster.name)===slug)}
export const monsterCategories=[
  {name:'Companions',summary:categorySummary['Companions']},
  {name:'Generic Monsters',summary:categorySummary['Generic Monsters']},
  {name:'Arcane Automata',summary:categorySummary['Arcane Automata']},
  {name:'Eldritch Abominations',summary:categorySummary['Eldritch Abominations']},
  {name:'Epic Legends and Tall-Tale Terrors',summary:categorySummary['Epic Legends and Tall-Tale Terrors']},
  {name:'Insectoid Terrors',summary:categorySummary['Insectoid Terrors']},
  {name:'Necrotic Horrors',summary:categorySummary['Necrotic Horrors']},
  {name:'Primordial Entities',summary:categorySummary['Primordial Entities']},
  {name:'Verdant Aberrations',summary:categorySummary['Verdant Aberrations']},
]
