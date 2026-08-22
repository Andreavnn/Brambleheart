export const BUILD = '0.07'

export const attributes = [
  { id: 'agility', name: 'Agility', description: 'Motion & Balance' },
  { id: 'might', name: 'Might', description: 'Strength & Resolve' },
  { id: 'hide', name: 'Hide', description: 'Endurance & Defense' },
  { id: 'lore', name: 'Lore', description: 'Insight & Awareness' },
  { id: 'bravery', name: 'Bravery', description: 'Emotion & Will' },
] as const

export type AttributeId = (typeof attributes)[number]['id']

export const species = ['Auravex','Ardenn','Axalori','Braelor','Cethra','Hedgkin','Ravari','Rivkan','Sauren','Tordan','Urnath','Virelan'] as const

export const sparks = [
  ['Courageous','Bold, Driven'],['Protector','Compassionate, Steadfast'],['Wanderer','Adaptable, Curious'],
  ['Scholar','Studious, Reflective'],['Healer','Compassionate, Intuitive'],['Fighter','Bold, Focused'],
  ['Trickster','Playful, Defiant'],['Tinker','Inventive, Creative'],['Idealist','Hopeful, Driven'],
  ['Spiritual','Intuitive, Reflective'],['Artisan','Creative, Focused'],['Outsider','Independent, Cautious'],
  ['Leader','Charming, Driven'],['Defiant Heart','Defiant, Steadfast'],['Dreamer','Hopeful, Creative'],
  ['Seeker','Curious, Studious'],['Mediator','Charming, Compassionate'],['Pioneer','Adaptable, Bold'],
] as const

export const homelands = [
  { name:'Wandering Road', skills:['Guile','Charm'] },
  { name:'Tidewake Harbor', skills:['Seeking','Tradeskill'] },
  { name:'Ancient Towers', skills:['Lorekeeping (Ancients)','Awareness'] },
  { name:'Gloommere', skills:['Whisperstep','Herbalry'] },
  { name:'Halerun Fields', skills:['Beastride','Stonegrasp'] },
  { name:'Deepmarket', skills:['Shadehand','Guile'] },
  { name:'Redmir Dunes', skills:['Wayfinding','Stonegrasp'] },
  { name:'Evershade', skills:['Awareness','Lorekeeping (Nature or Spirits)'] },
  { name:'Willowstead', skills:['Herbalry','Charm'] },
  { name:'Untamed Verge', skills:['Wayfinding','Presence'] },
] as const

export const faiths = ['Keepers of Old','Last Light','Living Harmony','Deepfather’s Covenant','Dawnborn Order','Ashen Path','Court of Etherium','Origin Prime','The Dreamtide','Feastbound Covenant','The Wayward Path'] as const

export const oaths = [
  ['Kinship','No heart beats alone.'],['Mercy','All wounds can heal, even those unseen.'],['Truth','The world turns false only when I do.'],
  ['Courage','Better to burn bright than fade cold.'],['Balance','For every step forward, one must listen to the earth.'],['Honor','My word is the weight I carry.'],
  ['Patience','To know is to listen first.'],['Renewal','What is broken can bloom again.'],['Wilds','Freedom is the truest law.'],
  ['Steadfast','The unseen watches, and I will not turn my eyes.'],['Justice','All debts must balance before the dusk.'],['Guardian','Between harm and heart, I will stand.'],
  ['Wisdom','Wisdom speaks only when it must.'],['Selflessness','Good done unseen still mends the world.'],['Inspiration','Hope is the flame I leave behind.'],
] as const

export const passiveTargets = [
  ['Easy',14],['Medium',18],['Difficult',22],['Hard',24],['Very Hard',30]
] as const

export type RuleStatus = 'interactive' | 'indexed' | 'toc'
export interface RuleChapter {
  id: string
  title: string
  eyebrow: string
  status: RuleStatus
  summary: string
  sections: readonly (readonly [string, string])[]
}

const indexed = 'Indexed from the current Bramble Heart source files. Full interactive transcription is scheduled for a later data pass.'

export const ruleChapters: RuleChapter[] = [
  {
    id:'fundamentals', title:'The Fundamentals', eyebrow:'CORE SYSTEM', status:'interactive',
    summary:'The Rhythm Engine, conditions, edged and weighted rolls, targets, attributes, and skills.',
    sections:[
      ['The Core Roll','Bramble Heart uses the Rhythm Engine: roll 3d10, total the dice, then add the required stat. Conditions are applied after the dice total and multiple conditions stack.'],
      ['Edged & Weighted','For an edged or weighted roll, roll 4d10. Edged removes the lowest die; weighted removes the highest die. A roll can never be both.'],
      ['Targets','Active targets are opposed rolls. Passive targets are fixed values that the total must equal or exceed: Easy 14, Medium 18, Difficult 22, Hard 24, Very Hard 30.'],
      ['Attributes','The Fundamentals chapter currently names five attributes: Agility, Might, Hide, Lore, and Bravery. Each rank extracts a modifier of 2 per rank.'],
          ]
  },
  {
    id:'core-abilities', title:'Core Abilities', eyebrow:'ABILITY SYSTEM', status:'interactive',
    summary:'Keyword-based encounter actions shared by characters and NPCs.',
    sections:[
      ['Ability Types','There are five ability types: instinct, movement, combat, reaction, and passive. Keywords define when and how an ability can be used.'],
      ['Root Limitation','Root means once-per-type-per-round: up to one Root Instinct, one Root Movement, one Root Combat, and one Root Reaction each round.'],
      ['Repeat Limit','A character cannot use the same ability more than once in a round unless another rule compels it.'],
    ]
  },
  {
    id:'character-creation', title:'Character Creation', eyebrow:'CHARACTERS', status:'interactive',
    summary:'Eight steps from species and Spark through attributes, talents or magic, equipment, and details.',
    sections:[
      ['1. Choose Your Species','Choose a playable species. The current creation chapter grants 3 Species Traits, 2 Culture Traits, a native language, and Commonspeak.'],
      ['2. Choose Your Spark','A Spark defines the hero’s personality archetype. Completing a deed that shares a Spark keyword grants +3 additional XP for that deed.'],
      ['3. Select Your Homeland','A Homeland grants 2 skills at rank 1 and is not restricted by species.'],
      ['4. Choose Faith & Oath','Faith describes what the hero reveres or trusts; Oath describes the principle they act upon.'],
      ['5. Attribute Distribution','Each attribute starts at rank 1. Spend 5 points to raise them; no attribute may exceed rank 3 during character creation.'],
      ['6. Rhythm of Body & Spirit','Choose either Magic Level 1 plus 1 Talent, or 2 Talents.'],
      ['7. Equipment & Items','Begin with an Adventure Kit and 50 sp. The Adventure Kit can be returned for an additional 3 sp.'],
      ['8. Character Details','Record identity details and calculate secondary stats such as Speed, Power, Guts, and Ward.'],
    ]
  },
  {
    id:'sparks', title:'Sparks & Deeds', eyebrow:'CHARACTERS', status:'interactive',
    summary:'Narrative personality archetypes connected to deeds and experience.',
    sections:[
      ['What Is a Spark?','A Spark is a personality archetype. It does not alter rolls or stats; it rewards roleplay through deed-aligned XP.'],
      ['Spark Bonus','When a completed deed aligns with one of the Spark’s two keywords, gain +3 experience for that deed.'],
      ['Custom Sparks','Name the Spark, choose two keywords from the source keyword library, write a short credo, and review it with the Watcher.'],
    ]
  },
  {
    id:'homeland', title:'Homeland', eyebrow:'CHARACTERS', status:'interactive',
    summary:'The lessons, skills, and worldview of the place that shaped a hero.',
    sections: homelands.map(h => [h.name, `Starting skills: ${h.skills.join(' and ')}.`] as const)
  },
  {
    id:'faith-oath', title:'Faith & Oaths', eyebrow:'CHARACTERS', status:'interactive',
    summary:'Story-facing belief and moral vows, including narrative favor and consequences.',
    sections:[
      ['Oaths','An Oath grants no mechanical bonuses or penalties. Upholding or breaking one may create narrative favor, reputation, or story-driven consequence at the Watcher’s discretion.'],
      ['Creating an Oath','Define an optional Voice, the Virtue the oath demands, and the Strain that tempts or tests it.'],
      ['Faith','The uploaded faith chapter includes Keepers of Old, Last Light, Living Harmony, Deepfather’s Covenant, Dawnborn Order, Ashen Path, Court of Etherium, Origin Prime, The Dreamtide, Feastbound Covenant, and The Wayward Path.'],
    ]
  },
  { id:'species', title:'Playable Species', eyebrow:'CHARACTERS', status:'indexed', summary:'Species and culture trait reference.', sections:[[ 'Current Data Pass', 'The current Character Creation chapter names Auravex, Ardenn, Axalori, Braelor, Cethra, Hedgkin, Ravari, Rivkan, Sauren, Tordan, Urnath, and Virelan among the playable species. Detailed trait blocks remain to be extracted from the source layout.' ]] },
  { id:'talents', title:'Talents', eyebrow:'CHARACTERS', status:'indexed', summary:'Learned and natural capabilities that expand a character’s ability set.', sections:[[ 'Current Data Pass', indexed ]] },
  { id:'weapons', title:'Weapons', eyebrow:'EQUIPMENT', status:'indexed', summary:'Weapon profiles, costs, and equipment rules.', sections:[[ 'Current Data Pass', indexed ]] },
  { id:'armor', title:'Armor & Shields', eyebrow:'EQUIPMENT', status:'indexed', summary:'Protective gear and shield rules.', sections:[[ 'Current Data Pass', indexed ]] },
  { id:'adventuring-gear', title:'Adventuring Gear', eyebrow:'EQUIPMENT', status:'indexed', summary:'General equipment used during travel and adventures.', sections:[[ 'Current Data Pass', indexed ]] },
  { id:'trade-goods', title:'Trade Goods', eyebrow:'EQUIPMENT', status:'indexed', summary:'Goods, values, and trade references.', sections:[[ 'Current Data Pass', indexed ]] },
  { id:'transportation', title:'Transportation', eyebrow:'EQUIPMENT', status:'indexed', summary:'Mounts and overland transportation.', sections:[[ 'Current Data Pass', indexed ]] },
  {
    id:'beyond-creation', title:'Beyond Character Creation', eyebrow:'ADVANCEMENT', status:'interactive',
    summary:'Experience, advancement, and post-creation growth.',
    sections:[
      ['Earning Experience','The source lists Deeds Completed (3–5 XP), Spark Expression (1–3 XP), Encounters or Milestones (5–12 XP), and Watcher Awards as major XP sources.'],
      ['Attribute Rank','Cost: 2 + (2 × current rank) XP.'],
      ['Skill Rank','Cost: 3 + current rank XP.'],
      ['New Skill','Cost: 6 XP at rank 1.'],
      ['New Talent','Cost: 10 XP.'],
      ['Magic Level','Cost: 10 + (4 × current magic level) XP.'],
    ]
  },
  {
    id:'winds-of-magic', title:'Winds of Magic', eyebrow:'MAGIC', status:'interactive',
    summary:'Magic levels, spell slots, lore attunement, mana regeneration, and spell targeting.',
    sections:[
      ['Magic Power','Magic levels range from 1 to 10. Each level adds mana regeneration and spell capacity.'],
      ['Spell Slots','At Magic Level 1, select 3 spells from any of the seven magical lores and gain 1 Invocation spell. Gain 1 additional spell slot each magic level and 1 Invocation spell every 2 magic levels.'],
      ['Mana Regeneration','Each Magic Level increases mana regeneration by +1.'],
      ['Lore Attunement','At Magic Level 1 choose one lore attunement. Spells from an attuned lore reduce their mana cost by 2.'],
      ['Signature Spells','Each lore has a signature spell gained for free when attuned; it does not consume a spell slot.'],
      ['Area of Effect','The current magic chapter defines Line, Cone, and Orb area-of-effect keywords in squares.'],
    ]
  },
  {
    id:'battles', title:'The Battles', eyebrow:'COMBAT', status:'interactive',
    summary:'Encounter setup, initiative, mana, opposed combat rolls, damage, health, and defeat.',
    sections:[
      ['Squares & Measurements','Combat is designed for a grid. 1 square equals 1 yard, 3 feet, or 1 meter.'],
      ['Initiative','Roll 3d10 + Speed + conditions. The current Battle chapter states Speed = +2 plus Agility rank.'],
      ['Mana','Every character generates 2 mana at the start of each combat round, with possible additional regeneration from magic levels, talents, abilities, and conditions.'],
      ['Strike & Ward','Melee strike uses 3d10 + Mettle + conditions. Range uses 3d10 + Aim + conditions. Magical uses 3d10 + Control + conditions. Defense uses 3d10 + Ward + conditions. A strike hits only when it exceeds the Ward result.'],
      ['Damage & Guts','Standard damage applies Guts normally. Direct damage halves Guts, rounded up to a minimum of 1, before applicable conditions. Lethal damage bypasses Guts and equipment but not applicable conditions.'],
      ['Health','Player characters have 30 Health. At 5 or less, rolls suffer -1; at 3 or less, -2; at 1 Health, -3.'],
      ['Defeated','At 0 Health a character is defeated. On their turn they make a 1d10 Hallows save: 6+ passes; 5 or less gives a Fate Mark. Three Fate Marks means death. Restoring at least 1 Health removes all Fate Marks.'],
    ]
  },
  { id:'role-play', title:'The Role-Play', eyebrow:'ROLE-PLAY', status:'toc', summary:'Portraying characters, world interaction, time, travel, illumination, hunger, downtime, building, and crafting.', sections:[[ 'Table of Contents', 'This chapter is present in the current master table of contents but its detailed source chapter was not included in the v0.01 upload set.' ]] },
  { id:'monsters', title:'Monsters & Critters', eyebrow:'WATCHER', status:'toc', summary:'Threat levels, critters, traps, environments, monsters, and rewards.', sections:[[ 'Table of Contents', 'This chapter is present in the current master table of contents but its detailed source chapter was not included in the v0.01 upload set.' ]] },
]
