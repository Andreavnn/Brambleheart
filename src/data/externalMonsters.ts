export interface MonsterAction { name:string; type:'Move'|'Touch'|'Shoot'|'Instinct'|'Magic'|'Reactive'|'Passive'; text:string; keywords:string[] }
export interface MonsterSpecialRule { name:string; text:string; keywords:string[] }
export interface MonsterProfile { threatLevel:number; threatPoints:number; health:number; attributes:{agility:number;might:number;hide:number;lore:number;bravery:number}; actions:MonsterAction[]; monstrousTraits:MonsterSpecialRule[] }
export interface ExternalMonsterEntry { name:string; category:string; group?:string; summary:string; bio?:string; placeholder?:boolean; profile?:MonsterProfile }

const categorySummary:Record<string,string>={
  'Companions':'Helpful creatures presented as adventuring companions and playful allies.',
  'Arcane Automata':'Enchanted machines and mystical constructs animated by arcane forces.',
  'Eldritch Abominations':'Nightmarish beings whose forms and instincts defy the ordinary world.',
  'Epic Legends and Tall-Tale Terrors':'Celebrated and legendary creatures whose stories echo through the ages.',
  'Insectoid Terrors':'Swarms, gigantic insects, arachnids, and other skittering horrors.',
  'Creatures of the Winds':'Creatures touched, shaped, or empowered by the Winds of Magic.',
  'Necrotic Horrors':'Undead and cursed creatures animated by dark magic or lingering malevolence.',
  'Primordial Entities':'Ancient and elemental beings tied to the forces that shape the world.',
  'Verdant Aberrations':'Twisted, mutated creatures warped by unnatural forces within the wilds.',
}
function monster(name:string,category:string,group?:string,profile?:MonsterProfile,bio?:string):ExternalMonsterEntry{return{name,category,group,summary:categorySummary[category]||'A creature in the Watcher monster catalog.',bio,profile}}
function placeholder(name:string,category:string):ExternalMonsterEntry{return{name,category,summary:categorySummary[category]||'A creature in the Watcher monster catalog.',placeholder:true}}

const mucklingProfile:MonsterProfile={
  threatLevel:1,threatPoints:8,health:19,
  attributes:{agility:1,might:2,hide:2,lore:1,bravery:1},
  actions:[
    {name:'STRIDE',type:'Move',text:'TRIGGER: During Muckling’s Turn. EFFECT: Move up to Muckling’s Speed in squares. This movement may be split before and after Muckling’s Core Combat Action. SLOSH: Increase Muckling’s Speed by [+1] for this Stride. Muckling may move through mud, shallow water, and spaces narrow enough for Muckling’s amorphous body without additional movement cost.',keywords:['CORE']},
    {name:'Gelatinous Bash',type:'Touch',text:'TRIGGER: During Muckling’s Turn. TARGET: One character within [1] square. TO HIT: Make a melee Strike using (3d10) + Muckling’s Brawl + condition(s) against the target’s (3d10) + Ward + condition(s). DAMAGE: [5] + Fury Standard damage. ON SUCCESS: Muckling may move up to [1] square.',keywords:['CORE']},
    {name:'Sticky Splash',type:'Shoot',text:'TRIGGER: During Muckling’s Turn. TARGET: One character within [5] squares. TO HIT: Make a ranged Strike using (3d10) + Muckling’s Aim + condition(s) against the target’s (3d10) + Ward + condition(s). DAMAGE: [3] + Accuracy Standard damage. ON SUCCESS: The target suffers condition [-1] to its next Agility Save before the end of its next turn.',keywords:['CORE','COMBAT','SHOOT']},
    {name:'Reconstitute',type:'Instinct',text:'TRIGGER: At the start of the round, if Muckling is below [8] Health. EFFECT: Muckling rolls [1d10]. On [5+], restore [1] Health to Muckling.\nCOOLDOWN: This Ability cannot be used again for [1d10/2] rounds.',keywords:['INSTINCT']},
  ],
  monstrousTraits:[
    {name:'Slick Trail',text:'TRIGGER: When Muckling ends a Move after moving at least [1] square. EFFECT: The last square Muckling passed through before ending that Move becomes Slick until the end of the round. Other characters must spend [+1] additional Speed to enter that Slick square.',keywords:['PASSIVE','MOVEMENT']},
    {name:'Gelatinous Body',text:'TRIGGER: When Muckling suffers Standard or Direct damage, suffers damage from a non-magical ranged attack, or an effect would forcibly move, disarm, grapple, or otherwise pin Muckling. EFFECT: Reduce Standard damage suffered by Muckling by [-1]. Reduce Direct damage suffered by Muckling by [-1]. When Muckling suffers damage from a non-magical ranged attack, reduce that damage by an additional [-1] regardless of Damage Category. Damage cannot be reduced below [1] by this effect. FORMLESS: Muckling is immune to effects that would forcibly move, disarm, grapple, or otherwise pin Muckling.',keywords:['PASSIVE']},
    {name:'Amorphous',text:'EFFECT: Muckling can squeeze through narrow openings that could reasonably admit part of Muckling’s body. RESTRICTIONS: Muckling cannot use this rule to pass through solid barriers or occupy another character’s space at the end of movement.',keywords:['PASSIVE','MOVEMENT']},
  ],
}

const noxiousMucklingProfile:MonsterProfile={
  threatLevel:2,threatPoints:16,health:25,
  attributes:{agility:3,might:2,hide:2,lore:2,bravery:2},
  actions:[
    {name:'STRIDE',type:'Move',text:'TRIGGER: During Noxious Muckling’s Turn. EFFECT: Move up to Noxious Muckling’s Speed in squares. This movement may be split before and after Noxious Muckling’s Core Combat Action. SEEPING SLOSH: Increase Noxious Muckling’s Speed by [+1] for this Stride. Noxious Muckling may move through mud, shallow water, poisonous terrain, and spaces narrow enough for Noxious Muckling’s amorphous body without additional movement cost.',keywords:['CORE']},
    {name:'Toxic Bash',type:'Touch',text:'TRIGGER: During Noxious Muckling’s Turn. TARGET: One character within [1] square. TO HIT: Make a melee Strike using (3d10) + Noxious Muckling’s Brawl + condition(s) against the target’s (3d10) + Ward + condition(s). DAMAGE: [3] + Fury Standard nature damage. TOXIN: A character that suffers damage from this Strike gains [1] Toxin stack.',keywords:['CORE','COMBAT']},
    {name:'Toxic Spit',type:'Shoot',text:'TRIGGER: During Noxious Muckling’s Turn. TARGET: One character within [6] squares. TO HIT: Make a ranged Strike using (3d10) + Noxious Muckling’s Aim + condition(s) against the target’s (3d10) + Ward + condition(s). DAMAGE: [3] + Accuracy Standard nature damage. TOXIN: A character that suffers damage from this Strike gains [1] Toxin stack.',keywords:['CORE','COMBAT','SHOOT']},
    {name:'Toxic Reconstitution',type:'Instinct',text:'TRIGGER: At the start of the round, if Noxious Muckling is below [10] Health. EFFECT: Noxious Muckling rolls [1d10]. On [5+], restore [2] Health to Noxious Muckling.\nCOOLDOWN: This Ability cannot be used again for [1d10/2] rounds.',keywords:['INSTINCT']},
  ],
  monstrousTraits:[
    {name:'Toxin Saturation',text:'TOXIN: At the start of an affected character’s turn, that character suffers [1] Lethal On-Going nature damage for each Toxin stack it currently has. SAVE: After resolving this damage, the affected character may Renew the Heart (Medium). On a successful save, remove [1] Toxin stack. RESTRICTION: A character can have a maximum of [3] Toxin stacks total, regardless of source.',keywords:['PASSIVE','TOXIN']},
    {name:'Toxic Membrane',text:'TRIGGER: The first time each round another character within [1] square deals melee damage to Noxious Muckling. TOXIN: That character gains [1] Toxin stack.',keywords:['PASSIVE','TOXIN']},
    {name:'Poisonous Trail',text:'TRIGGER: When Noxious Muckling ends a Move after moving at least [1] square. EFFECT: The last square Noxious Muckling passed through becomes Toxic until the end of the round. The first time each round another character enters that Toxic square, it suffers [1] Lethal nature damage. TOXIN: That character gains [1] Toxin stack.',keywords:['PASSIVE','MOVEMENT','TOXIN']},
    {name:'Gelatinous Body',text:'TRIGGER: When Noxious Muckling suffers Standard or Direct damage, suffers damage from a non-magical ranged attack, or an effect would forcibly move, disarm, grapple, or otherwise pin Noxious Muckling. EFFECT: Reduce Standard damage suffered by Noxious Muckling by [-1]. Reduce Direct damage suffered by Noxious Muckling by [-1]. When Noxious Muckling suffers damage from a non-magical ranged attack, reduce that damage by an additional [-1] regardless of Damage Category. Damage cannot be reduced below [1] by this effect. FORMLESS: Noxious Muckling is immune to effects that would forcibly move, disarm, grapple, or otherwise pin Noxious Muckling.',keywords:['PASSIVE']},
    {name:'Amorphous',text:'EFFECT: Noxious Muckling can squeeze through narrow openings that could reasonably admit part of Noxious Muckling’s body. RESTRICTIONS: Noxious Muckling cannot use this rule to pass through solid barriers or occupy another character’s space at the end of movement.',keywords:['PASSIVE','MOVEMENT']},
  ],
}

const emberDyrtleProfile:MonsterProfile={
  threatLevel:5,threatPoints:48,health:55,
  attributes:{agility:2,might:5,hide:4,lore:4,bravery:5},
  actions:[
    {name:'STRIDE',type:'Move',text:'TRIGGER: During Ember Dyrtle’s Turn. EFFECT: Move up to Ember Dyrtle’s Speed in squares. This movement may be split before and after Ember Dyrtle’s Core Combat Action. CINDERSTEP: Ember Dyrtle ignores additional movement costs caused by rubble, mud, shallow water, and natural difficult terrain while using Stride.',keywords:['CORE']},
    {name:'Crushing Bite',type:'Touch',text:'TRIGGER: During Ember Dyrtle’s Turn. TARGET: Choose [1] enemy character within [3] squares. EFFECT: Ember Dyrtle may move up to [2] squares toward the target before resolving TO HIT. TO HIT: Make a melee Strike using (3d10) + Ember Dyrtle’s Brawl + condition(s) against the target’s (3d10) + Ward + condition(s). DAMAGE: On a successful Strike, deal [7] + Fury Standard fire damage and [1] Lethal fire damage. RESTRICTIONS: The target must be within [1] square when TO HIT is resolved.',keywords:['CORE']},
    {name:'Shell Ram',type:'Touch',text:'TRIGGER: After resolving Crushing Bite, if Ember Dyrtle moved at least [1] square toward the target as part of that Crushing Bite. TARGET: The target of that Crushing Bite. TO HIT: Make a melee Strike using (3d10) + Ember Dyrtle’s Brawl + condition(s) against the target’s (3d10) + Ward + condition(s). DAMAGE: [5] + Fury Direct fire damage. ON SUCCESS: Move the target up to [2] squares directly away from Ember Dyrtle. After resolving that forced movement, the target suffers [1] Lethal fire damage.',keywords:['ABILITY']},
    {name:'Ember Breath',type:'Shoot',text:'TRIGGER: During Ember Dyrtle’s Turn. TARGET: All enemy characters within CONE[6]. TO HIT: Each target makes a Renew the Heart (Hard) save. EFFECT: On a failed save, the target suffers [8] Direct fire damage. On a successful save, the target suffers [4] Direct fire damage instead. CINDER: A target that fails the save also suffers [1] Lethal On-Going fire damage at the start of its next turn. The effect then ends. COOLDOWN: This Ability cannot be used again for [1d10/2+1] rounds.',keywords:['CORE','COMBAT','SHOOT']},
    {name:'Furnace Pulse',type:'Instinct',text:'TRIGGER: At the start of the round. TARGET: Every other character within ORB[10] centered on Ember Dyrtle. TO HIT: Each target makes a Renew the Heart (Hard) save. EFFECT: A target that fails the save has its Magic Regen reduced by [-1], increases the Mana cost of its Spells by [+1], and gains Weakness [1] Fire until the end of the round.',keywords:['CORE','MAGIC']},
    {name:'Tail Sweep',type:'Reactive',text:'TRIGGER: When an enemy character finishes a Move within [2] squares of Ember Dyrtle. TARGET: The enemy character whose Move triggered this Ability. TO HIT: Make a melee Strike using (3d10) + Ember Dyrtle’s Brawl + condition(s) against the target’s (3d10) + Ward + condition(s). DAMAGE: [3] + Fury Standard damage. ON SUCCESS: Move the target up to [1] square directly away from Ember Dyrtle.',keywords:['TOUCH','COMBAT']},
  ],
  monstrousTraits:[
    {name:'Furnace Shell',text:'EFFECT: Ember Dyrtle has Resistance [8] Fire and Weakness [4] Frost. EFFECT: The first time each round another character within [1] square deals melee damage to Ember Dyrtle, that character suffers [1] Lethal fire damage.',keywords:['PASSIVE']},
    {name:'Basalt Carapace',text:'EFFECT: Ember Dyrtle is immune to effects that would forcibly move, disarm, grapple, or otherwise pin Ember Dyrtle. EFFECT: Reduce damage Ember Dyrtle suffers from magical sources by [-2], to a minimum of [1]. RESTRICTIONS: This damage reduction does not apply to frost-based spells.',keywords:['PASSIVE']},
    {name:'Awakened Core',text:'TRIGGER: The first time Ember Dyrtle is reduced to [27] Health or less. EFFECT: Immediately at the end of the current turn, Ember Dyrtle may use Furnace Pulse without spending Ember Dyrtle’s normal Core Instinct Action. RESTRICTIONS: Awakened Core can trigger only once per encounter.',keywords:['PASSIVE','MAGIC']},
  ],
}

export const externalMonsters:ExternalMonsterEntry[]=[
  monster('Aeronaut','Companions'),monster('Familiars','Companions'),monster('Fenrir','Companions'),monster('Rollodillo','Companions'),monster('Seastrider','Companions'),placeholder('Mossling','Companions'),placeholder('Reedrunner','Companions'),placeholder('Lantern Toad','Companions'),placeholder('Bramble Hare','Companions'),placeholder('Pondskipper','Companions'),

  placeholder('Runegear Sentinel','Arcane Automata'),placeholder('Aethercoil Hound','Arcane Automata'),placeholder('Brassroot Custodian','Arcane Automata'),placeholder('Glyphwork Warden','Arcane Automata'),placeholder('Spellcoil Drone','Arcane Automata'),placeholder('Lantern Engine','Arcane Automata'),placeholder('Sigilbound Porter','Arcane Automata'),placeholder('Hexglass Observer','Arcane Automata'),placeholder('Clockvine Harrier','Arcane Automata'),placeholder('Mana-Lattice Golem','Arcane Automata'),

  placeholder('Veil-Eater','Eldritch Abominations'),placeholder('Hollow Starling','Eldritch Abominations'),placeholder('Many-Eyed Pilgrim','Eldritch Abominations'),placeholder('Whisper Maw','Eldritch Abominations'),placeholder('Folded One','Eldritch Abominations'),placeholder('Skinless Echo','Eldritch Abominations'),placeholder('Dream Leech','Eldritch Abominations'),placeholder('Unmoored Witness','Eldritch Abominations'),placeholder('Pale Geometry','Eldritch Abominations'),placeholder('Starved Oracle','Eldritch Abominations'),

  placeholder('Briar Mantis','Insectoid Terrors'),placeholder('Glasswing Swarm','Insectoid Terrors'),placeholder('Ironbark Beetle','Insectoid Terrors'),placeholder('Mire Centipede','Insectoid Terrors'),placeholder('Needle Wasp','Insectoid Terrors'),placeholder('Rootborer Grub','Insectoid Terrors'),placeholder('Lantern Moth','Insectoid Terrors'),placeholder('Webthorn Spider','Insectoid Terrors'),placeholder('Carrion Cicada','Insectoid Terrors'),placeholder('Spore Ant Colony','Insectoid Terrors'),

  monster('Muckling','Creatures of the Winds',undefined,mucklingProfile,'Mucklings are low, gelatinous creatures formed where the Winds of Magic mingle with wet soil and stagnant water. They drift through marshes and muddy hollows with deceptive persistence, leaving slick ground behind them and knitting their soft bodies back together when wounded.'),monster('Noxious Muckling','Creatures of the Winds','Muckling',noxiousMucklingProfile,'Noxious Mucklings are toxic cousins of the common Muckling, saturated with poisonous Wind-born residue. Their bodies seep corrosive filth as they move, spreading toxins through their strikes, trails, and membrane to wear down anything that stays close.'),monster('Ember Dyrtle','Creatures of the Winds',undefined,emberDyrtleProfile,'Ember Dyrtles are immense, furnace-hearted beasts whose stone-like shells glow with trapped heat. Slow and deliberate until provoked, they advance like moving volcanic ridges, breathing fire and radiating waves of magical heat that disrupt spellcraft around them.'),placeholder('Bramble Boar','Creatures of the Winds'),placeholder('Mossback Stag','Creatures of the Winds'),placeholder('Mire Hound','Creatures of the Winds'),placeholder('Ashfang Wolf','Creatures of the Winds'),placeholder('Stonehide Ram','Creatures of the Winds'),placeholder('Reed Serpent','Creatures of the Winds'),placeholder('Thornback Toad','Creatures of the Winds'),placeholder('Hollowclaw Bear','Creatures of the Winds'),

  monster('Undeath Sorcerer','Necrotic Horrors'),monster('Lich Archregent','Necrotic Horrors','Undeath Sorcerer'),monster('Lich Lord','Necrotic Horrors','Undeath Sorcerer'),monster('Undeath Warrior','Necrotic Horrors'),monster('Crypt Guard','Necrotic Horrors','Undeath Warrior'),monster('Legionnaire','Necrotic Horrors','Undeath Warrior'),monster('Graveborn Horror','Necrotic Horrors'),monster('Terrorghiest','Necrotic Horrors'),monster('Necrotide','Necrotic Horrors'),monster('Ghoul Pack','Necrotic Horrors','Necrotide'),

  monster('Tempest Warden','Primordial Entities'),placeholder('Ember Warden','Primordial Entities'),placeholder('Root Colossus','Primordial Entities'),placeholder('Tidal Shepherd','Primordial Entities'),placeholder('Stonewake Titan','Primordial Entities'),placeholder('Gale Herald','Primordial Entities'),placeholder('Frostroot Ancient','Primordial Entities'),placeholder('Quakeborn','Primordial Entities'),placeholder('Sunscar Elemental','Primordial Entities'),placeholder('Deepwater Oracle','Primordial Entities'),

  monster('Blightroot Treant','Verdant Aberrations'),monster('Fungal Behemoth','Verdant Aberrations'),monster('Leafshroud Guardian','Verdant Aberrations'),monster('Mossclad Stalker','Verdant Aberrations'),monster('Thorned Bramblefiend','Verdant Aberrations'),monster('Thornblade Nymphs','Verdant Aberrations'),monster('Verdant Lurker','Verdant Aberrations'),monster('Vinecrawler','Verdant Aberrations'),monster('Voracious Bramblebeast','Verdant Aberrations'),placeholder('Rotbloom Devourer','Verdant Aberrations'),
]

export function monsterSlug(name:string){return `monster-${name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}`}
export function findExternalMonster(slug:string){return externalMonsters.find(monster=>monsterSlug(monster.name)===slug)}
export const monsterCategories=[
  {name:'Companions',summary:categorySummary['Companions']},
  {name:'Creatures of the Winds',summary:categorySummary['Creatures of the Winds']},
  {name:'Arcane Automata',summary:categorySummary['Arcane Automata']},
  {name:'Eldritch Abominations',summary:categorySummary['Eldritch Abominations']},
  {name:'Epic Legends and Tall-Tale Terrors',summary:categorySummary['Epic Legends and Tall-Tale Terrors']},
  {name:'Insectoid Terrors',summary:categorySummary['Insectoid Terrors']},
  {name:'Necrotic Horrors',summary:categorySummary['Necrotic Horrors']},
  {name:'Primordial Entities',summary:categorySummary['Primordial Entities']},
  {name:'Verdant Aberrations',summary:categorySummary['Verdant Aberrations']},
]
