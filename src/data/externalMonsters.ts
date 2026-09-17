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
    {name:'Gelatinous Bash',type:'Touch',text:'TRIGGER: During the Creature’s Turn. TARGET: One character within [1] square. TO HIT: Make a melee Strike using (3d10) + the Creature’s Brawl + condition(s) against the target’s (3d10) + Ward + condition(s). DAMAGE: On a successful Strike, deal [3] + Fury Standard damage, plus applicable conditions and effects.',keywords:['CORE']},
    {name:'Sticky Splash',type:'Shoot',text:'TRIGGER: During the Creature’s Turn. TARGET: One character within [3] squares. TO HIT: Make a Ranged Strike using the Creature’s Aim. DAMAGE: [2] Standard damage. ON SUCCESS: The target suffers condition [-1] to its next Agility Save before the end of its next turn.',keywords:['CORE','SHOOT']},
    {name:'Reconstitute',type:'Instinct',text:'TRIGGER: At the start of the round, if the Creature is below [5] Health. EFFECT: The Creature rolls [1d10]. On [6+], restore [1] Health to the Creature.\nCOOLDOWN: This Ability cannot be used again for [1d10/2] rounds.',keywords:['INSTINCT']},
  ],
  monstrousTraits:[
    {name:'Slick Trail',text:'TRIGGER: When the Creature ends a Move after moving at least [1] square. EFFECT: The last square the Creature passed through before ending that Move becomes Slick until the end of the round. Other characters must spend [+1] additional Speed to enter that Slick square.',keywords:['PASSIVE','MOVEMENT']},
    {name:'Gelatinous Body',text:'TRIGGER: When the Creature suffers Direct damage or an effect would forcibly move, disarm, grapple, or otherwise pin it. EFFECT: Reduce Direct damage suffered by the Creature by [-1], to a minimum of [0] damage after all other applicable reductions. FORMLESS: The Creature is immune to effects that would forcibly move, disarm, grapple, or otherwise pin it.',keywords:['PASSIVE']},
    {name:'Amorphous',text:'EFFECT: The Creature can squeeze through narrow openings that could reasonably admit part of its body. RESTRICTIONS: The Creature cannot use this rule to pass through solid barriers or occupy another Creature’s space at the end of movement.',keywords:['PASSIVE','MOVEMENT']},
  ],
}

const emberDyrtleProfile:MonsterProfile={
  threatLevel:2,threatPoints:14,health:28,
  attributes:{agility:1,might:4,hide:3,lore:2,bravery:3},
  actions:[
    {name:'Molten Trudge',type:'Move',text:'TRIGGER: During the Creature’s Turn. EFFECT: Move up to the Creature’s Speed. The Creature ignores movement penalties caused by rough stone, ash, cinders, and shallow lava channels.',keywords:['CORE']},
    {name:'Crushing Bite',type:'Touch',text:'TRIGGER: During the Creature’s Turn. TARGET: One character within [1] square. TO HIT: Make a melee Strike using (3d10) + the Creature’s Brawl + condition(s) against the target’s (3d10) + Ward + condition(s). DAMAGE: On a successful Strike, deal [4] + Fury Lethal fire damage, plus applicable conditions and effects.',keywords:['CORE']},
    {name:'Tail Sweep',type:'Touch',text:'TRIGGER: During the Creature’s Turn. TARGET: Up to [2] enemy characters within [1] square. TO HIT: Make a melee Strike using (3d10) + the Creature’s Brawl + condition(s) against each target’s (3d10) + Ward + condition(s). DAMAGE: On a successful Strike, deal [2] + Fury Standard fire damage, plus applicable conditions and effects. ON SUCCESS: The struck target suffers condition [-1] Speed until the end of its next turn.',keywords:['CORE']},
    {name:'Shell Ram',type:'Touch',text:'TRIGGER: During the Creature’s Turn. TARGET: One character within [2] squares in a straight line. TO HIT: Make a melee Strike using (3d10) + the Creature’s Brawl + condition(s) against the target’s (3d10) + Ward + condition(s). DAMAGE: On a successful Strike, deal [3] + Fury Standard fire damage, plus applicable conditions and effects. ON SUCCESS: Push the target [1] square directly away from the Creature.',keywords:['CORE']},
    {name:'Ember Breath',type:'Shoot',text:'TRIGGER: During the Creature’s Turn. TARGET: All enemy characters within CONE[4]. TO HIT: Renew the Heart (Medium) save. ON FAILURE: Deal [3] + Heart Lethal fire damage. ON SUCCESS: Suffer half that damage, rounded down. COOLDOWN: This Ability cannot be used again for [1d10/2] rounds.',keywords:['CORE','SHOOT']},
    {name:'Furnace Pulse',type:'Instinct',text:'TRIGGER: At the start of the round. TARGET: All enemy characters within ORB[4] centered on the Creature. TO HIT: Renew the Heart (Medium) save. ON FAILURE: Until the end of the round, reduce the target’s Magic Regen by [-1], increase the Mana cost of the target’s Spells by [+1], and the target gains Weakness [1] Fire.',keywords:['INSTINCT','MAGIC','HEX','ORB']},
  ],
  monstrousTraits:[
    {name:'Furnace Shell',text:'EFFECT: The Creature has Resistance [8] Fire and Weakness [4] Frost. EFFECT: When a character ends its turn within [1] square of the Creature or hits the Creature with a Touch Strike, that character suffers [1] Standard fire damage.',keywords:['PASSIVE']},
    {name:'Basalt Carapace',text:'EFFECT: Reduce magical damage suffered by the Creature by [-2], to a minimum of [1]. RESTRICTIONS: This reduction does not affect frost-based spells.',keywords:['PASSIVE']},
    {name:'Awakened Core',text:'TRIGGER: When the Creature is first reduced to half Health or lower. EFFECT: Immediately at the end of the current turn, the Creature uses Ember Breath if able.',keywords:['PASSIVE']},
  ],
}

export const externalMonsters:ExternalMonsterEntry[]=[
  monster('Aeronaut','Companions'),monster('Familiars','Companions'),monster('Fenrir','Companions'),monster('Rollodillo','Companions'),monster('Seastrider','Companions'),placeholder('Mossling','Companions'),placeholder('Reedrunner','Companions'),placeholder('Lantern Toad','Companions'),placeholder('Bramble Hare','Companions'),placeholder('Pondskipper','Companions'),

  placeholder('Runegear Sentinel','Arcane Automata'),placeholder('Aethercoil Hound','Arcane Automata'),placeholder('Brassroot Custodian','Arcane Automata'),placeholder('Glyphwork Warden','Arcane Automata'),placeholder('Spellcoil Drone','Arcane Automata'),placeholder('Lantern Engine','Arcane Automata'),placeholder('Sigilbound Porter','Arcane Automata'),placeholder('Hexglass Observer','Arcane Automata'),placeholder('Clockvine Harrier','Arcane Automata'),placeholder('Mana-Lattice Golem','Arcane Automata'),

  placeholder('Veil-Eater','Eldritch Abominations'),placeholder('Hollow Starling','Eldritch Abominations'),placeholder('Many-Eyed Pilgrim','Eldritch Abominations'),placeholder('Whisper Maw','Eldritch Abominations'),placeholder('Folded One','Eldritch Abominations'),placeholder('Skinless Echo','Eldritch Abominations'),placeholder('Dream Leech','Eldritch Abominations'),placeholder('Unmoored Witness','Eldritch Abominations'),placeholder('Pale Geometry','Eldritch Abominations'),placeholder('Starved Oracle','Eldritch Abominations'),

  placeholder('Briar Mantis','Insectoid Terrors'),placeholder('Glasswing Swarm','Insectoid Terrors'),placeholder('Ironbark Beetle','Insectoid Terrors'),placeholder('Mire Centipede','Insectoid Terrors'),placeholder('Needle Wasp','Insectoid Terrors'),placeholder('Rootborer Grub','Insectoid Terrors'),placeholder('Lantern Moth','Insectoid Terrors'),placeholder('Webthorn Spider','Insectoid Terrors'),placeholder('Carrion Cicada','Insectoid Terrors'),placeholder('Spore Ant Colony','Insectoid Terrors'),

  monster('Glop','Generic Monsters',undefined,glopProfile),monster('Blaze Glop','Generic Monsters','Glop'),monster('Muckling','Generic Monsters','Glop'),placeholder('Bramble Boar','Generic Monsters'),placeholder('Mossback Stag','Generic Monsters'),placeholder('Mire Hound','Generic Monsters'),placeholder('Ashfang Wolf','Generic Monsters'),placeholder('Stonehide Ram','Generic Monsters'),placeholder('Reed Serpent','Generic Monsters'),placeholder('Thornback Toad','Generic Monsters'),placeholder('Hollowclaw Bear','Generic Monsters'),

  monster('Undeath Sorcerer','Necrotic Horrors'),monster('Lich Archregent','Necrotic Horrors','Undeath Sorcerer'),monster('Lich Lord','Necrotic Horrors','Undeath Sorcerer'),monster('Undeath Warrior','Necrotic Horrors'),monster('Crypt Guard','Necrotic Horrors','Undeath Warrior'),monster('Legionnaire','Necrotic Horrors','Undeath Warrior'),monster('Graveborn Horror','Necrotic Horrors'),monster('Terrorghiest','Necrotic Horrors'),monster('Necrotide','Necrotic Horrors'),monster('Ghoul Pack','Necrotic Horrors','Necrotide'),

  monster('Tempest Warden','Primordial Entities'),monster('Ember Dyrtle','Primordial Entities','Dyrtle',emberDyrtleProfile),placeholder('Ember Warden','Primordial Entities'),placeholder('Root Colossus','Primordial Entities'),placeholder('Tidal Shepherd','Primordial Entities'),placeholder('Stonewake Titan','Primordial Entities'),placeholder('Gale Herald','Primordial Entities'),placeholder('Frostroot Ancient','Primordial Entities'),placeholder('Quakeborn','Primordial Entities'),placeholder('Sunscar Elemental','Primordial Entities'),placeholder('Deepwater Oracle','Primordial Entities'),

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
