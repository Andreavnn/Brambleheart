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

const mucklingProfile:MonsterProfile={
  threatLevel:1,threatPoints:8,health:19,
  attributes:{agility:1,might:2,hide:2,lore:1,bravery:1},
  actions:[
    {name:'STRIDE',type:'Move',text:'TRIGGER: During your turn. EFFECT: Move up to your Speed in squares. This movement may be split before and after your Core Combat Action. SLOSH: Increase the Creature’s Speed by [+1] for this Stride. The Creature may move through mud, shallow water, and spaces narrow enough for its amorphous body without additional movement cost.',keywords:['CORE']},
    {name:'Gelatinous Bash',type:'Touch',text:'TRIGGER: During the Creature’s Turn. TARGET: One character within [1] square. TO HIT: Make a melee Strike using (3d10) + the Creature’s Brawl + condition(s) against the target’s (3d10) + Ward + condition(s). DAMAGE: [5] + Fury Standard damage. ON SUCCESS: The Creature may move up to [1] square.',keywords:['CORE']},
    {name:'Sticky Splash',type:'Shoot',text:'TRIGGER: During the Creature’s Turn. TARGET: One character within [5] squares. TO HIT: Make a ranged Strike using (3d10) + the Creature’s Aim + condition(s) against the target’s (3d10) + Ward + condition(s). DAMAGE: [3] + Accuracy Standard damage. ON SUCCESS: The target suffers condition [-1] to its next Agility Save before the end of its next turn.',keywords:['CORE','COMBAT','SHOOT']},
    {name:'Reconstitute',type:'Instinct',text:'TRIGGER: At the start of the round, if the Creature is below [8] Health. EFFECT: The Creature rolls [1d10]. On [5+], restore [1] Health to the Creature.\nCOOLDOWN: This Ability cannot be used again for [1d10/2] rounds.',keywords:['INSTINCT']},
  ],
  monstrousTraits:[
    {name:'Slick Trail',text:'TRIGGER: When the Creature ends a Move after moving at least [1] square. EFFECT: The last square the Creature passed through before ending that Move becomes Slick until the end of the round. Other characters must spend [+1] additional Speed to enter that Slick square.',keywords:['PASSIVE','MOVEMENT']},
    {name:'Gelatinous Body',text:'TRIGGER: When the Creature suffers Standard or Direct damage, suffers damage from a non-magical ranged attack, or an effect would forcibly move, disarm, grapple, or otherwise pin it. EFFECT: Reduce Standard damage suffered by the Creature by [-1]. Reduce Direct damage suffered by the Creature by [-1]. When the Creature suffers damage from a non-magical ranged attack, reduce that damage by an additional [-1] regardless of Damage Category. Damage cannot be reduced below [1] by this effect. FORMLESS: The Creature is immune to effects that would forcibly move, disarm, grapple, or otherwise pin it.',keywords:['PASSIVE']},
    {name:'Amorphous',text:'EFFECT: The Creature can squeeze through narrow openings that could reasonably admit part of its body. RESTRICTIONS: The Creature cannot use this rule to pass through solid barriers or occupy another Creature’s space at the end of movement.',keywords:['PASSIVE','MOVEMENT']},
  ],
}

const elementalMucklingProfile:MonsterProfile={
  threatLevel:2,threatPoints:16,health:31,
  attributes:{agility:3,might:3,hide:2,lore:2,bravery:2},
  actions:[
    {name:'STRIDE',type:'Move',text:'TRIGGER: During your turn. EFFECT: Move up to your Speed in squares. This movement may be split before and after your Core Combat Action. ELEMENTAL SLOSH: Increase the Creature’s Speed by [+2] for this Stride. The Creature may move through mud, shallow water, and spaces narrow enough for its amorphous body without additional movement cost.',keywords:['CORE']},
    {name:'Infused Bash',type:'Touch',text:'TRIGGER: During the Creature’s Turn. TARGET: One character within [1] square. TO HIT: Make a melee Strike using (3d10) + the Creature’s Brawl + condition(s) against the target’s (3d10) + Ward + condition(s). DAMAGE: [5] + Fury Standard damage of the type granted by Elemental Core. ON SUCCESS: The Creature may move up to [1] square.',keywords:['CORE']},
    {name:'Elemental Splash',type:'Shoot',text:'TRIGGER: During the Creature’s Turn. TARGET: One character within [6] squares. TO HIT: Make a ranged Strike using (3d10) + the Creature’s Aim + condition(s) against the target’s (3d10) + Ward + condition(s). DAMAGE: [4] + Accuracy Standard damage of the type granted by Elemental Core. ON SUCCESS: The target suffers condition [-1] to its next Agility Save before the end of its next turn.',keywords:['CORE','COMBAT','SHOOT']},
    {name:'Elemental Reconstitution',type:'Instinct',text:'TRIGGER: At the start of the round, if the Creature is below [10] Health. EFFECT: The Creature rolls [1d10]. On [5+], restore [2] Health to the Creature.\nCOOLDOWN: This Ability cannot be used again for [1d10/2] rounds.',keywords:['INSTINCT']},
  ],
  monstrousTraits:[
    {name:'Elemental Core',text:'TRIGGER: When the encounter begins. EFFECT: Choose an elemental affinity or roll [1d10]: [1–2] Fire, [3–4] Cold, [5–6] Lightning, [7–8] Nature, [9–10] Arcane. All damage dealt by the Creature gains that damage type. The Creature gains Resistance [+2] against damage matching its elemental affinity for the encounter.',keywords:['PASSIVE','MAGIC']},
    {name:'Infused Trail',text:'TRIGGER: When the Creature ends a Move after moving at least [1] square. EFFECT: The last square the Creature passed through becomes Slick and Infused until the end of the round. Other characters must spend [+1] additional Speed to enter that square. The first time each round another character enters the Infused square, it suffers [2] Lethal damage of the type granted by Elemental Core.',keywords:['PASSIVE','MOVEMENT','MAGIC']},
    {name:'Gelatinous Body',text:'TRIGGER: When the Creature suffers Standard or Direct damage, suffers damage from a non-magical ranged attack, or an effect would forcibly move, disarm, grapple, or otherwise pin it. EFFECT: Reduce Standard damage suffered by the Creature by [-1]. Reduce Direct damage suffered by the Creature by [-1]. When the Creature suffers damage from a non-magical ranged attack, reduce that damage by an additional [-1] regardless of Damage Category. Damage cannot be reduced below [1] by this effect. FORMLESS: The Creature is immune to effects that would forcibly move, disarm, grapple, or otherwise pin it.',keywords:['PASSIVE']},
    {name:'Amorphous',text:'EFFECT: The Creature can squeeze through narrow openings that could reasonably admit part of its body. RESTRICTIONS: The Creature cannot use this rule to pass through solid barriers or occupy another Creature’s space at the end of movement.',keywords:['PASSIVE','MOVEMENT']},
  ],
}

const noxiousMucklingProfile:MonsterProfile={
  threatLevel:2,threatPoints:16,health:25,
  attributes:{agility:3,might:2,hide:2,lore:2,bravery:2},
  actions:[
    {name:'STRIDE',type:'Move',text:'TRIGGER: During your turn. EFFECT: Move up to your Speed in squares. This movement may be split before and after your Core Combat Action. SEEPING SLOSH: Increase the Creature’s Speed by [+1] for this Stride. The Creature may move through mud, shallow water, poisonous terrain, and spaces narrow enough for its amorphous body without additional movement cost.',keywords:['CORE']},
    {name:'Toxic Bash',type:'Touch',text:'TRIGGER: During the Creature’s Turn. TARGET: One character within [1] square. TO HIT: Make a melee Strike using (3d10) + the Creature’s Brawl + condition(s) against the target’s (3d10) + Ward + condition(s). DAMAGE: [3] + Fury Standard nature damage. TOXIN: A character that suffers damage from this Strike gains [1] Toxin stack.',keywords:['CORE','COMBAT']},
    {name:'Toxic Spit',type:'Shoot',text:'TRIGGER: During the Creature’s Turn. TARGET: One character within [6] squares. TO HIT: Make a ranged Strike using (3d10) + the Creature’s Aim + condition(s) against the target’s (3d10) + Ward + condition(s). DAMAGE: [3] + Accuracy Standard nature damage. TOXIN: A character that suffers damage from this Strike gains [1] Toxin stack.',keywords:['CORE','COMBAT','SHOOT']},
    {name:'Toxic Reconstitution',type:'Instinct',text:'TRIGGER: At the start of the round, if the Creature is below [10] Health. EFFECT: The Creature rolls [1d10]. On [5+], restore [2] Health to the Creature.\nCOOLDOWN: This Ability cannot be used again for [1d10/2] rounds.',keywords:['INSTINCT']},
  ],
  monstrousTraits:[
    {name:'Toxin Saturation',text:'TOXIN: At the start of an affected character’s turn, that character suffers [1] Lethal On-Going nature damage for each Toxin stack it currently has. SAVE: After resolving this damage, the affected character may Renew the Heart (Medium). On a successful save, remove [1] Toxin stack. RESTRICTION: A character can have a maximum of [3] Toxin stacks total, regardless of source.',keywords:['PASSIVE','TOXIN']},
    {name:'Toxic Membrane',text:'TRIGGER: The first time each round another character within [1] square deals melee damage to the Creature. TOXIN: That character gains [1] Toxin stack.',keywords:['PASSIVE','TOXIN']},
    {name:'Poisonous Trail',text:'TRIGGER: When the Creature ends a Move after moving at least [1] square. EFFECT: The last square the Creature passed through becomes Toxic until the end of the round. The first time each round another character enters that Toxic square, it suffers [1] Lethal nature damage. TOXIN: That character gains [1] Toxin stack.',keywords:['PASSIVE','MOVEMENT','TOXIN']},
    {name:'Gelatinous Body',text:'TRIGGER: When the Creature suffers Standard or Direct damage, suffers damage from a non-magical ranged attack, or an effect would forcibly move, disarm, grapple, or otherwise pin it. EFFECT: Reduce Standard damage suffered by the Creature by [-1]. Reduce Direct damage suffered by the Creature by [-1]. When the Creature suffers damage from a non-magical ranged attack, reduce that damage by an additional [-1] regardless of Damage Category. Damage cannot be reduced below [1] by this effect. FORMLESS: The Creature is immune to effects that would forcibly move, disarm, grapple, or otherwise pin it.',keywords:['PASSIVE']},
    {name:'Amorphous',text:'EFFECT: The Creature can squeeze through narrow openings that could reasonably admit part of its body. RESTRICTIONS: The Creature cannot use this rule to pass through solid barriers or occupy another Creature’s space at the end of movement.',keywords:['PASSIVE','MOVEMENT']},
  ],
}

const prismheartMucklingProfile:MonsterProfile={
  threatLevel:4,threatPoints:36,health:51,
  attributes:{agility:3,might:3,hide:3,lore:3,bravery:2},
  actions:[
    {name:'STRIDE',type:'Move',text:'TRIGGER: During your turn. EFFECT: Move up to your Speed in squares. This movement may be split before and after your Core Combat Action. PRISMATIC SURGE: Increase the Creature’s Speed by [+3] for this Stride. The Creature may move through mud, shallow water, narrow openings, and spaces occupied by other characters without additional movement cost. RESTRICTIONS: The Creature cannot end this Move in another character’s space.',keywords:['CORE']},
    {name:'Prism Bash',type:'Touch',text:'TRIGGER: During the Creature’s Turn. TARGET: One character within [1] square. TO HIT: Make a melee Strike using (3d10) + the Creature’s Brawl + condition(s) against the target’s (3d10) + Ward + condition(s). DAMAGE: [6] + Fury Standard damage of the type granted by Prismheart Core. ON SUCCESS: The Creature may move up to [2] squares.',keywords:['CORE']},
    {name:'Spectrum Lance',type:'Shoot',text:'TRIGGER: During the Creature’s Turn. TARGET: One character within [7] squares. TO HIT: Make a ranged Strike using (3d10) + the Creature’s Aim + condition(s) against the target’s (3d10) + Ward + condition(s). DAMAGE: [5] + Accuracy Standard damage of the type granted by Prismheart Core. ON SUCCESS: Reduce the target’s Speed by [-1] until the end of its next turn.',keywords:['CORE','COMBAT','SHOOT']},
    {name:'Core Rupture',type:'Magic',text:'TRIGGER: During the Creature’s Turn. TARGET: Every other character within [2] squares. TO HIT: Make a separate Magic Strike against each target using (3d10) + the Creature’s Control + condition(s) against that target’s (3d10) + Ward + condition(s). DAMAGE: On a successful Strike, deal [6] Direct damage of the type granted by Prismheart Core. AFTEREFFECT: After resolving Core Rupture, change the Creature’s elemental affinity to a different affinity listed by Prismheart Core.\nCOOLDOWN: This Ability cannot be used again for [1d10/2+1] rounds.',keywords:['CORE','COMBAT','MAGIC']},
    {name:'Prismatic Reconstitution',type:'Instinct',text:'TRIGGER: At the start of the round, if the Creature is below [16] Health. EFFECT: The Creature rolls [1d10]. On [4+], restore [2] Health to the Creature.\nCOOLDOWN: This Ability cannot be used again for [1d10/2] rounds.',keywords:['INSTINCT']},
  ],
  monstrousTraits:[
    {name:'Prismheart Core',text:'TRIGGER: At the start of each round. EFFECT: Choose a new elemental affinity or roll [1d10]: [1–2] Fire, [3–4] Cold, [5–6] Lightning, [7–8] Nature, [9–10] Arcane. If the result matches the Creature’s current affinity, roll again. All damage dealt by the Creature gains the current damage type. The Creature gains Resistance [+3] against damage matching its current elemental affinity until the affinity changes.',keywords:['PASSIVE','MAGIC']},
    {name:'Prismatic Wake',text:'TRIGGER: When the Creature ends a Move after moving at least [2] squares. EFFECT: The last [2] squares the Creature passed through become Charged until the end of the round. Other characters must spend [+1] additional Speed to enter a Charged square. The first time each round another character enters a Charged square, it suffers [3] Lethal damage of the type granted by Prismheart Core.',keywords:['PASSIVE','MOVEMENT','MAGIC']},
    {name:'Greater Gelatinous Body',text:'TRIGGER: When the Creature suffers Standard, Direct, or Lethal damage, or an effect would forcibly move, disarm, grapple, or otherwise pin it. EFFECT: Reduce Standard damage suffered by the Creature by [-2]. Reduce Direct damage suffered by the Creature by [-2]. Reduce Lethal damage suffered by the Creature by [-1]. When the Creature suffers damage from a non-magical ranged attack, reduce that damage by an additional [-1] regardless of Damage Category. Damage cannot be reduced below [1] by this effect. FORMLESS: The Creature is immune to effects that would forcibly move, disarm, grapple, or otherwise pin it.',keywords:['PASSIVE']},
    {name:'Amorphous',text:'EFFECT: The Creature can squeeze through narrow openings that could reasonably admit part of its body. RESTRICTIONS: The Creature cannot use this rule to pass through solid barriers or occupy another Creature’s space at the end of movement.',keywords:['PASSIVE','MOVEMENT']},
  ],
}

type DyrtleProfileOptions={
  strideLabel:string
  strideText:string
  breathName:string
  breathText:string
  pulseName:string
  pulseText:string
  shellName:string
  shellText:string
  strikeDamageType?:string
  mountainTraitName?:string
  mountainTraitText?:string
  awakenedCoreText?:string
}

function dyrtleProfile(options:DyrtleProfileOptions):MonsterProfile{
  const strikeDamageType=options.strikeDamageType?` ${options.strikeDamageType}`:''
  return{
    threatLevel:5,threatPoints:48,health:55,
    attributes:{agility:2,might:5,hide:4,lore:4,bravery:5},
    actions:[
      {name:'STRIDE',type:'Move',text:`TRIGGER: During your turn. EFFECT: Move up to your Speed in squares. This movement may be split before and after your Core Combat Action. ${options.strideLabel}: ${options.strideText}`,keywords:['CORE']},
      {name:'Crushing Bite',type:'Touch',text:`TRIGGER: During the Creature’s Turn. TARGET: Choose [1] enemy character within [3] squares. EFFECT: The Creature may move up to [2] squares toward the target before resolving TO HIT. TO HIT: Make a melee Strike using (3d10) + the Creature’s Brawl + condition(s) against the target’s (3d10) + Ward + condition(s). DAMAGE: On a successful Strike, deal [7] + Fury Standard${strikeDamageType} damage and [1] Lethal${strikeDamageType} damage. RESTRICTIONS: The target must be within [1] square when TO HIT is resolved.`,keywords:['CORE']},
      {name:'Shell Ram',type:'Touch',text:`TRIGGER: After resolving Crushing Bite, if the Creature moved at least [1] square toward the target as part of that Crushing Bite. TARGET: The target of that Crushing Bite. TO HIT: Make a melee Strike using (3d10) + the Creature’s Brawl + condition(s) against the target’s (3d10) + Ward + condition(s). DAMAGE: [5] + Fury Direct${strikeDamageType} damage. ON SUCCESS: Move the target up to [2] squares directly away from the Creature. After resolving that forced movement, the target suffers [1] Lethal${strikeDamageType} damage.`,keywords:['ABILITY']},
      {name:options.breathName,type:'Shoot',text:options.breathText,keywords:['CORE','COMBAT','SHOOT']},
      {name:options.pulseName,type:'Instinct',text:options.pulseText,keywords:['CORE','MAGIC']},
      {name:'Tail Sweep',type:'Reactive',text:'TRIGGER: When an enemy character finishes a Move within [2] squares of the Creature. TARGET: The enemy character whose Move triggered this Ability. TO HIT: Make a melee Strike using (3d10) + the Creature’s Brawl + condition(s) against the target’s (3d10) + Ward + condition(s). DAMAGE: [3] + Fury Standard damage. ON SUCCESS: Move the target up to [1] square directly away from the Creature.',keywords:['TOUCH','COMBAT']},
    ],
    monstrousTraits:[
      {name:options.shellName,text:options.shellText,keywords:['PASSIVE']},
      {name:options.mountainTraitName||'Mountainous Shell',text:options.mountainTraitText||'EFFECT: The Creature is immune to effects that would forcibly move, disarm, grapple, or otherwise pin it.',keywords:['PASSIVE']},
      {name:'Awakened Core',text:options.awakenedCoreText||`TRIGGER: The first time the Creature is reduced to [27] Health or less. EFFECT: End the current cooldown on ${options.breathName}. At the end of the current turn, the Creature may immediately use ${options.pulseName} without spending its normal Core Instinct Action. This additional use does not prevent the Creature from using ${options.pulseName} normally at the end of the round; if the current turn is also the final turn of the round, ${options.pulseName} may therefore resolve twice. RESTRICTIONS: Awakened Core can trigger only once per encounter.`,keywords:['PASSIVE','MAGIC']},
    ],
  }
}

const emberDyrtleProfile=dyrtleProfile({
  strideLabel:'CINDERSTEP',
  strideText:'The Creature ignores additional movement costs caused by rubble, mud, shallow water, and natural difficult terrain while using Stride.',
  breathName:'Ember Breath',
  breathText:'TRIGGER: During the Creature’s Turn. TARGET: All enemy characters within CONE[6]. TO HIT: Each target makes a Renew the Heart (Hard) save. EFFECT: On a failed save, the target suffers [8] Direct fire damage. On a successful save, the target suffers [4] Direct fire damage instead. CINDER: A target that fails the save also suffers [1] Lethal On-Going fire damage at the start of its next turn. The effect then ends. COOLDOWN: This Ability cannot be used again for [1d10/2+1] rounds.',
  pulseName:'Furnace Pulse',
  pulseText:'TRIGGER: At the start of the round. TARGET: Every other character within ORB[10] centered on the Creature. TO HIT: Each target makes a Renew the Heart (Hard) save. EFFECT: A target that fails the save has its Magic Regen reduced by [-1], increases the Mana cost of its Spells by [+1], and gains Weakness [1] Fire until the end of the round.',
  shellName:'Furnace Shell',
  shellText:'EFFECT: The Creature has Resistance [8] Fire and Weakness [4] Frost. EFFECT: The first time each round another character within [1] square deals melee damage to the Creature, that character suffers [1] Lethal fire damage.',
  strikeDamageType:'fire',
  mountainTraitName:'Basalt Carapace',
  mountainTraitText:'EFFECT: The Creature is immune to effects that would forcibly move, disarm, grapple, or otherwise pin it. EFFECT: Reduce damage the Creature suffers from magical sources by [-2], to a minimum of [1]. RESTRICTIONS: This damage reduction does not apply to frost-based spells.',
  awakenedCoreText:'TRIGGER: The first time the Creature is reduced to [27] Health or less. EFFECT: Immediately at the end of the current turn, the Creature may use Furnace Pulse without spending its normal Core Instinct Action. RESTRICTIONS: Awakened Core can trigger only once per encounter.',
})

const rimeDyrtleProfile=dyrtleProfile({
  strideLabel:'ICEFALL',
  strideText:'The Creature ignores additional movement costs caused by rubble, mud, shallow water, ice, snow, and natural difficult terrain while using Stride.',
  breathName:'Rime Breath',
  breathText:'TRIGGER: During the Creature’s Turn. DECLARE: Target all enemy characters within CONE[6]. TO HIT: Each target makes a Renew the Heart (Hard) save. EFFECT: On a failed save, the target suffers [8] Direct cold damage. On a successful save, the target suffers [4] Direct cold damage instead. CHILL: A target that fails the save reduces its Speed by [-2] until the end of its next turn. COOLDOWN: This Ability cannot be used again for [1d10/2+1] rounds.',
  pulseName:'Rime Pulse',
  pulseText:'TRIGGER: At the end of the round. TARGET: Every other character within ORB[10] centered on the Creature. EFFECT: Each target suffers [1] Lethal cold damage and reduces its Speed by [-1] until the end of its next turn.',
  shellName:'Glacial Shell',
  shellText:'EFFECT: The Creature gains Resistance [+4] against cold damage. The first time each round the Creature suffers Standard damage, reduce that damage by [-2], to a minimum of [1].',
})

const stormDyrtleProfile=dyrtleProfile({
  strideLabel:'THUNDERSTEP',
  strideText:'The Creature ignores additional movement costs caused by rubble, mud, shallow water, and natural difficult terrain while using Stride. If the Creature moves at least [3] squares during this Stride, gain condition [+1] to the next Crushing Bite Strike made before the end of the turn.',
  breathName:'Storm Breath',
  breathText:'TRIGGER: During the Creature’s Turn. DECLARE: Target all enemy characters within CONE[6]. TO HIT: Each target makes a Renew the Heart (Hard) save. EFFECT: On a failed save, the target suffers [8] Direct lightning damage. On a successful save, the target suffers [4] Direct lightning damage instead. ARC: After resolving the saves, choose up to [1] other enemy character within [2] squares of a character that failed the save. The chosen character suffers [2] Lethal lightning damage. A character can suffer this ARC damage only once from each use of Storm Breath. COOLDOWN: This Ability cannot be used again for [1d10/2+1] rounds.',
  pulseName:'Thunder Pulse',
  pulseText:'TRIGGER: At the end of the round. TARGET: Every other character within ORB[10] centered on the Creature. EFFECT: Each target suffers [1] Lethal lightning damage. STATIC: A character damaged by Thunder Pulse suffers condition [-1] to its next Ward roll before the end of its next turn.',
  shellName:'Charged Shell',
  shellText:'EFFECT: The Creature gains Resistance [+4] against lightning damage. The first time each round another character within [1] square deals melee damage to the Creature, that character suffers [1] Lethal lightning damage.',
})

const verdantDyrtleProfile=dyrtleProfile({
  strideLabel:'ROOTWALK',
  strideText:'The Creature ignores additional movement costs caused by rubble, mud, shallow water, vegetation, roots, and natural difficult terrain while using Stride.',
  breathName:'Verdant Breath',
  breathText:'TRIGGER: During the Creature’s Turn. DECLARE: Target all enemy characters within CONE[6]. TO HIT: Each target makes a Renew the Heart (Hard) save. EFFECT: On a failed save, the target suffers [8] Direct nature damage. On a successful save, the target suffers [4] Direct nature damage instead. OVERGROWTH: After resolving this Ability, the affected squares become Overgrown until the end of the next round. Other characters must spend [+1] additional Speed to enter an Overgrown square. COOLDOWN: This Ability cannot be used again for [1d10/2+1] rounds.',
  pulseName:'Verdant Pulse',
  pulseText:'TRIGGER: At the end of the round. TARGET: Every other character within ORB[10] centered on the Creature. EFFECT: Each target suffers [1] Lethal nature damage. RENEWAL: Restore [1] Health to the Creature for each character damaged by Verdant Pulse, to a maximum of [3] Health.',
  shellName:'Living Shell',
  shellText:'EFFECT: The Creature gains Resistance [+4] against nature damage.',
})

const arcaneDyrtleProfile=dyrtleProfile({
  strideLabel:'WYRDFOLD',
  strideText:'The Creature ignores additional movement costs caused by rubble, mud, shallow water, and natural difficult terrain while using Stride. During this Stride, the Creature may move through spaces occupied by other characters but cannot end its movement in another character’s space.',
  breathName:'Arcane Breath',
  breathText:'TRIGGER: During the Creature’s Turn. DECLARE: Target all enemy characters within CONE[6]. TO HIT: Each target makes a Renew the Heart (Hard) save. EFFECT: On a failed save, the target suffers [8] Direct arcane damage. On a successful save, the target suffers [4] Direct arcane damage instead. DISRUPTION: A character that fails the save makes its next Strike roll before the end of its next turn Weighted. COOLDOWN: This Ability cannot be used again for [1d10/2+1] rounds.',
  pulseName:'Wyrd Pulse',
  pulseText:'TRIGGER: At the end of the round. TARGET: Every other character within ORB[10] centered on the Creature. EFFECT: Each target suffers [1] Lethal arcane damage. DISRUPTION: A character damaged by Wyrd Pulse makes its next Attribute Save before the end of its next turn Weighted.',
  shellName:'Wyrd Shell',
  shellText:'EFFECT: The Creature gains Resistance [+4] against arcane damage. The first time each round the Creature is targeted by a Magic Strike, that Strike is Weighted.',
})

export const externalMonsters:ExternalMonsterEntry[]=[
  monster('Aeronaut','Companions'),monster('Familiars','Companions'),monster('Fenrir','Companions'),monster('Rollodillo','Companions'),monster('Seastrider','Companions'),placeholder('Mossling','Companions'),placeholder('Reedrunner','Companions'),placeholder('Lantern Toad','Companions'),placeholder('Bramble Hare','Companions'),placeholder('Pondskipper','Companions'),

  placeholder('Runegear Sentinel','Arcane Automata'),placeholder('Aethercoil Hound','Arcane Automata'),placeholder('Brassroot Custodian','Arcane Automata'),placeholder('Glyphwork Warden','Arcane Automata'),placeholder('Spellcoil Drone','Arcane Automata'),placeholder('Lantern Engine','Arcane Automata'),placeholder('Sigilbound Porter','Arcane Automata'),placeholder('Hexglass Observer','Arcane Automata'),placeholder('Clockvine Harrier','Arcane Automata'),placeholder('Mana-Lattice Golem','Arcane Automata'),

  placeholder('Veil-Eater','Eldritch Abominations'),placeholder('Hollow Starling','Eldritch Abominations'),placeholder('Many-Eyed Pilgrim','Eldritch Abominations'),placeholder('Whisper Maw','Eldritch Abominations'),placeholder('Folded One','Eldritch Abominations'),placeholder('Skinless Echo','Eldritch Abominations'),placeholder('Dream Leech','Eldritch Abominations'),placeholder('Unmoored Witness','Eldritch Abominations'),placeholder('Pale Geometry','Eldritch Abominations'),placeholder('Starved Oracle','Eldritch Abominations'),

  monster('Ember Dyrtle','Epic Legends and Tall-Tale Terrors',undefined,emberDyrtleProfile),monster('Rime Dyrtle','Epic Legends and Tall-Tale Terrors',undefined,rimeDyrtleProfile),monster('Storm Dyrtle','Epic Legends and Tall-Tale Terrors',undefined,stormDyrtleProfile),monster('Verdant Dyrtle','Epic Legends and Tall-Tale Terrors',undefined,verdantDyrtleProfile),monster('Arcane Dyrtle','Epic Legends and Tall-Tale Terrors',undefined,arcaneDyrtleProfile),

  placeholder('Briar Mantis','Insectoid Terrors'),placeholder('Glasswing Swarm','Insectoid Terrors'),placeholder('Ironbark Beetle','Insectoid Terrors'),placeholder('Mire Centipede','Insectoid Terrors'),placeholder('Needle Wasp','Insectoid Terrors'),placeholder('Rootborer Grub','Insectoid Terrors'),placeholder('Lantern Moth','Insectoid Terrors'),placeholder('Webthorn Spider','Insectoid Terrors'),placeholder('Carrion Cicada','Insectoid Terrors'),placeholder('Spore Ant Colony','Insectoid Terrors'),

  monster('Muckling','Generic Monsters',undefined,mucklingProfile),monster('Elemental Muckling','Generic Monsters','Muckling',elementalMucklingProfile),monster('Noxious Muckling','Generic Monsters','Muckling',noxiousMucklingProfile),monster('Prismheart Muckling','Generic Monsters','Muckling',prismheartMucklingProfile),placeholder('Bramble Boar','Generic Monsters'),placeholder('Mossback Stag','Generic Monsters'),placeholder('Mire Hound','Generic Monsters'),placeholder('Ashfang Wolf','Generic Monsters'),placeholder('Stonehide Ram','Generic Monsters'),placeholder('Reed Serpent','Generic Monsters'),placeholder('Thornback Toad','Generic Monsters'),placeholder('Hollowclaw Bear','Generic Monsters'),

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
