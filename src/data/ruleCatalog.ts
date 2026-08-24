import { ruleSourceDocuments, type RuleSourceSection } from './rulesSource'
import { speciesData } from './speciesData'
import { externalMonsters, monsterSlug } from './externalMonsters'

export interface RuleSourceSlice { document: string; sections?: string[] }
export interface RulePageDefinition {
  slug: string
  title: string
  summary: string
  sources?: RuleSourceSlice[]
  note?: string
  keywords?: string[]
  loreHeading?: string
}
export interface RuleCategoryDefinition {
  id: string
  title: string
  summary: string
  pages: RulePageDefinition[]
}

const page = (slug:string,title:string,summary:string,sources?:RuleSourceSlice[],note?:string,keywords?:string[],loreHeading?:string):RulePageDefinition => ({slug,title,summary,sources,note,keywords,loreHeading})

const lorePage = (slug:string,title:string,summary:string,heading:string) => page(slug,title,summary,[{document:'lore-anthro-mundas'}],undefined,['Lore','Anthro Mundas'],heading)
export const loreAnthroMundasPages: RulePageDefinition[] = [
  lorePage('lore-anthro-mundas','Anthro Mundas','The living world, its lands, peoples, ruins, and restless wonders.','ANTHRO MUNDAS'),
  lorePage('lore-anthro-mundas-winds','Winds of Magic','The unseen primal currents that move through air, soil, spirit, and spellcraft.','WINDS OF MAGIC'),
  lorePage('lore-anthro-mundas-hallows','The Howling Hallows','The realm beyond the mortal veil, shaped by memory, spirit, and the Winds.','THE HOWLING HALLOWS'),
  lorePage('lore-anthro-mundas-ancients','The Ancients','The vanished people who mastered, bound, and ultimately starved the Winds.','THE ANCIENTS'),
  lorePage('lore-anthro-mundas-morphing','The Great Morphing','The cataclysm that freed the Winds and gave rise to the Beastfolk.','THE GREAT MORPHING'),
  lorePage('lore-anthro-mundas-discovery','The Era of Discovery','The first generations of Beastfolk and the cultures that took root across the world.','THE ERA OF DISCOVERY'),
  lorePage('lore-anthro-mundas-strife','The Age of Strife','The unraveling of unity, the weaponization of magic, and the rise of King Covine.','THE AGE OF STRIFE'),
  lorePage('lore-anthro-mundas-undeath','The Blight of Undeath','Covine, Dominous, the breach into the Hallows, and the spreading Blight.','THE BLIGHT OF UNDEATH'),
  lorePage('lore-anthro-mundas-adventure','Age of Adventure','The hopeful age of rediscovery in which Brambleheart takes place.','AGE OF ADVENTURE'),
]
export const loreNavigation = loreAnthroMundasPages.map(({slug,title,loreHeading})=>({slug,title,heading:loreHeading||title.toUpperCase()}))

export const quickReferencePages: RulePageDefinition[] = [
  loreAnthroMundasPages[0],
  page('faq','FAQ','Common questions answered from the currently loaded rules.'),
  page('changes-updates','Changes & Updates','System errata, amendments, and rules changes.'),
]

const fundamentalPages: RulePageDefinition[] = [
  page('introduction','Introduction','What Brambleheart is, the Watcher, the flow of play, and the core principles of the game.',[{document:'introduction'}]),
  page('attributes-skills','Attributes & Skills','Attributes, ranks, modifiers, Skills, Skill Trees, expanded Skills, and restricted Skills.',[{document:'fundamentals',sections:['ATTRIBUTES','RANKS & MODIFIERS','SKILLS','SKILL TREES','EXPANDED & RESTRICTED']}],undefined,['Attribute','Skill']),
  page('dice-rules','Dice Rules','The Rhythm Engine, Conditions, Fortune and Misfortune, Edged and Weighted rolls, Half-Step rolls, and worked roll examples.',[{document:'fundamentals',sections:['THE CORE ROLL','CONDITIONS','FORTUNE & MISFORTUNE RESULTS','EDGED & WEIGHTED ROLLS','HALF-STEP ROLLS']}],undefined,['Rhythm Engine','3d10','Fortune','Misfortune']),
  page('keywords-ability-types','Keywords & Ability Types','How Ability types and Keywords determine when and how Abilities can be used.',[{document:'core-abilities',sections:['ABILITIES','KEYWORDS','What Keywords Do','PASSIVE ABILITIES']}],undefined,['Keyword','Ability']),
  page('core-abilities','Core Abilities','The shared Ability framework available during encounters.',[{document:'core-abilities',sections:['CORE ABILITIES','ABILITIES']}],undefined,['Ability']),
]

const speciesPages = speciesData.map(item=>page(
  `species-${item.name.toLowerCase()}`,
  item.name,
  `${item.name} lore, Heritage Traits, Culture Traits, and language.`,
  [{document:`species-${item.name.toLowerCase()}`}],
  undefined,
  ['Species','Trait','Culture']
))

export const ruleCategories: RuleCategoryDefinition[] = [
  {
    id:'fundamentals', title:'The Fundamentals', summary:'Introduction, dice, targets, Conditions, Attributes, Skills, Keywords, and Core Abilities.', pages:fundamentalPages,
  },
  {
    id:'character-creation', title:'Character Creation', summary:'Build a hero and reference the character-facing rules used during creation and growth.', pages:[
      page('character-creation','Step-by-Step','The character creation process.',[{document:'character-creation'}]),
      page('sparks-deeds','Sparks & Deeds','Personality archetypes, Deed-aligned play, and Experience rewards.',[{document:'sparks'},{document:'deeds'}],undefined,['Spark','Deed']),
      page('homeland','Homeland','Homelands, their Skills, and guidance for creating one.',[{document:'homeland'}]),
      page('oath','Oath','Choosing, creating, and playing an Oath.',[{document:'oath'}]),
      page('faith','Faith','Choosing, creating, and playing a Faith.',[{document:'faith'}]),
      page('talents','Talents','The current Talents reference.',[{document:'talents'}],undefined,['Talent']),
      page('adventuring-gear','Adventuring Gear','Weapons, Armor, Shields, Threadpieces, kits, supplies, tools, accessories, and field gear.',[{document:'weapons'},{document:'armor-shields'},{document:'adventuring-gear'}]),
      page('beyond-character-creation','Beyond Character Creation','Experience, advancement, and growth after creation.',[{document:'beyond-creation'}]),
    ],
  },
  {
    id:'playable-species', title:'Playable Species', summary:'Species lore, Heritage Traits, Culture Traits, and native languages.', pages:[
      page('playable-species','Species Index','Choose a playable Species and open its dedicated rules page.'),
      ...speciesPages,
    ],
  },
  {
    id:'winds-of-magic', title:'Winds of Magic', summary:'Magic Levels, spell slots, Lore Attunement, Spell Rules, Spells, and Lores of Magic.', pages:[
      page('magical-level','Magical Level','Magic Power, spell slots, and Mana regeneration.',[{document:'winds-of-magic',sections:['MAGIC POWER','SPELL SLOTS']}],undefined,['Magic','Mana']),
      page('lore-attunement','Lore Attunement','Attuning to a Lore and gaining its Signature Spell.',[{document:'winds-of-magic',sections:['LORE ATTUNEMENT','SIGNATURE']}],undefined,['Lore','Attunement']),
      page('spell-rules','Spell Rules','Spell Keywords, Augments, Hexes, range, and a link to the battle-grid Area of Effect rules.',[{document:'winds-of-magic',sections:['SPELL KEYWORDS','AUGMENTS & HEXES','SPELL RANGE']}],undefined,['Spell']),
      page('lore-invocation','Invocation','Invocation Spells.',[{document:'lore-invocation'}],undefined,['Lore','Spell','Invocation']),
      page('lore-flames','Flames','Lore of Flames.',[{document:'lore-flames'}],undefined,['Lore','Spell','Flames']),
      page('lore-frost','Frost','Lore of Frost.',[{document:'lore-frost'}],undefined,['Lore','Spell','Frost']),
      page('lore-hallows','Hallows','Lore of Hallows.',[{document:'lore-hallows'}],undefined,['Lore','Spell','Hallows']),
      page('lore-harmony','Harmony','Lore of Harmony.',[{document:'lore-harmony'}],undefined,['Lore','Spell','Harmony']),
      page('lore-life','Life','Lore of Life.',[{document:'lore-life'}],undefined,['Lore','Spell','Life']),
      page('lore-oath','Oath','Lore of Oaths.',[{document:'lore-oath'}],undefined,['Lore','Spell','Oath']),
      page('lore-wilds','Wilds','Lore of Wilds.',[{document:'lore-wilds'}],undefined,['Lore','Spell','Wilds']),
    ],
  },
  {
    id:'battles', title:'The Battles', summary:'Encounter setup, Initiative, turns, Mana, combat, damage, Health, and defeat.', pages:[
      page('encounter-setup','Encounter & Setup','Starting a combat encounter, positions, squares, measurements, and opposed Strike/Ward context.',[{document:'battle',sections:['THE BATTLES','COMBAT ENCOUNTER','DETERMINING POSITIONS','SQUARES & MEASUREMENTS','TO HIT','TO DEFEND']}]),
      page('area-of-effect','Area of Effect','Line, Cone, Orb, Direct targeting, and impassable collision on the battle grid.',undefined,'Area-of-effect geometry is defined by the supplied Winds of Magic rules and presented here as a general battle-grid targeting reference.',['Area of Effect','Line','Cone','Orb','Targeting']),
      page('initiative-order','Initiative Order','How Initiative is determined and how turn order is established.',[{document:'battle',sections:['INITIATIVE ORDER']}]),
      page('rounds-turns','Rounds & Turns','Rounds, turns, and start-of-turn timing.',[{document:'battle',sections:['ROUNDS & TURNS']}]),
      page('your-turn','Your Turn','Taking a turn and performing Abilities.',[{document:'battle',sections:['TAKING YOUR TURN','PREFORMING ABILITIES']}]),
      page('mana','Mana','Combat Mana generation and use.',[{document:'battle',sections:['MANA']}]),
      page('combat-abilities','Combat Abilities','Shared combat Abilities and the attack framework.',[{document:'battle',sections:['CORE ABILITIES','COMBAT ABILITIES']}],undefined,['Ability','Combat']),
      page('to-strike','To Strike','Melee, ranged, and magical Strike rolls.',[{document:'battle',sections:['TO HIT']}]),
      page('to-ward','To Ward','Ward rolls and opposed defense.',[{document:'battle',sections:['TO DEFEND']}]),
      page('to-damage','To Damage','Applying damage after a successful attack.',[{document:'battle',sections:['TO DAMAGE','TO SOAK','DAMAGE – GUTS = TOTAL DAMAGE']}]),
      page('damage-category','Damage Category','Damage categories used by combat and Abilities.',[{document:'battle',sections:['DAMAGE CATEGORY']}]),
      page('damage-type','Damage Type','Standard, Direct, Lethal, and related damage handling.',[{document:'battle',sections:['DAMAGE CATEGORY','TO SOAK']}]),
      page('resistance-weakness','Resistance & Weakness','Resistance and Weakness interactions.',[{document:'battle',sections:['RESISTANCES & WEAKNESS']}]),
      page('health','Health','Health and Health-based penalties.',[{document:'battle',sections:['HEALTH']}]),
      page('healing','Healing','Healing during and after an encounter.',[{document:'battle',sections:['HEALING']}]),
      page('defeated','Defeated','Defeat, Hallows saves, Fate Marks, and death.',[{document:'battle',sections:['DEFEATED']}]),
      page('encounter-end','Encounter End','How a combat encounter ends.',[{document:'battle',sections:['ENCOUNTER ENDS']}]),
    ],
  },
  {
    id:'role-play', title:'The Role-Play', summary:'Character portrayal, travel, survival, downtime, crafting, Trade Goods, and Transportation.', pages:[
      page('portraying-character','Portraying Your Character','Role-playing your hero in Anthro Mundas.',undefined,'This section is listed in the supplied table of contents, but a standalone Role-Play chapter was not included in the supplied rules files.'),
      page('interacting-world','Interacting with the World','Social and environmental interaction during role-play.',undefined,'This section is listed in the supplied table of contents, but a standalone Role-Play chapter was not included in the supplied rules files.'),
      page('time-traveling','Time & Traveling','Time, travel, routes, and movement between adventures.',[{document:'transportation'}]),
      page('illumination-vision','Illumination and Vision','Light, darkness, and seeing through the world.',undefined,'This section is listed in the supplied table of contents, but a standalone Role-Play chapter was not included in the supplied rules files.'),
      page('hunger-thirst','Managing Hunger and Thirst','Food, water, and survival needs.',undefined,'This section is listed in the supplied table of contents, but a standalone Role-Play chapter was not included in the supplied rules files.'),
      page('life-between-adventures','Life Between Adventures','Downtime and life between major adventures.',undefined,'This section is listed in the supplied table of contents, but a standalone Role-Play chapter was not included in the supplied rules files.'),
      page('building-crafting','Building, Maintaining & Crafting','Building, upkeep, and crafting-related play.',undefined,'This section is listed in the supplied table of contents, but a standalone Role-Play chapter was not included in the supplied rules files.'),
      page('dangers-all-around','Dangers All Around','Environmental and narrative hazards.',undefined,'This section is listed in the supplied table of contents, but a standalone Role-Play chapter was not included in the supplied rules files.'),
      page('trade-goods','Trade Goods','Materials, herbs, minerals, components, and trade values.',[{document:'trade-goods'}]),
      page('transportation','Transportation','Mounts, hauling, riding proficiency, and barding.',[{document:'transportation'}]),
    ],
  },
  {
    id:'watcher', title:'The Watcher', summary:'Encounter design, Encounter Ratings, creatures, Monsters, environments, and rewards.', pages:[
      page('encounters-threat-level','Encounters & Threat Level','Encounter Rating guidance adapted from the Woodlands encounter reference.'),
      page('critters','Critters & Companions','Companions and creature references from the Woodlands monster index.'),
      page('traps-environments','Traps & Environments','Hazards and environments used when building encounters.',undefined,'Detailed standalone trap and environment source text has not yet been supplied.'),
      page('monsters','Monsters','Monster categories and individual creature pages sourced from the Woodlands monster index.'),
      page('rewards','Rewards','Rewards and post-encounter guidance.',undefined,'Detailed standalone Watcher reward source text has not yet been supplied.'),
    ],
  },
]

const monsterRulePages=externalMonsters.map(monster=>page(monsterSlug(monster.name),monster.name,`${monster.category}${monster.group?` · ${monster.group}`:''}. ${monster.summary}`))
export const allRulePages = [...quickReferencePages, ...loreAnthroMundasPages.slice(1), ...ruleCategories.flatMap(category => category.pages), ...monsterRulePages]
export const fundamentalsNavigation = fundamentalPages.map(({slug,title})=>({slug,title}))
export function findRulePage(slug:string) { return allRulePages.find(item => item.slug === slug) }

export function resolveSourceSections(page:RulePageDefinition): Array<{ document:string; sourceFile:string; section:RuleSourceSection }> {
  const out:Array<{ document:string; sourceFile:string; section:RuleSourceSection }>=[]
  for (const slice of page.sources || []) {
    const source=ruleSourceDocuments[slice.document]
    if (!source) continue
    const selected=slice.sections?.length ? source.sections.filter(section=>slice.sections?.includes(section.heading)) : source.sections
    for (const section of selected) out.push({document:slice.document,sourceFile:source.sourceFile,section})
  }
  return out
}

export const quickFaq = [
  { q:'What is the core Brambleheart roll?', a:'Roll 3d10, total the dice, and add the required stat. When a Skill applies, add the Skill modifier as part of that stat before Conditions.' },
  { q:'What happens when opposed rolls tie?', a:'The core principles state that the defender wins ties.' },
  { q:'What is the difference between Active and Passive Targets?', a:'An Active Target is an opposed roll. A Passive Target is a fixed value that the roll must equal or exceed.' },
  { q:'How do Edged and Weighted rolls work?', a:'Roll 4d10. Edged removes the lowest die; Weighted removes the highest die. A roll cannot be both.' },
  { q:'How does a new character start?', a:'Choose Species and Culture Traits, Spark, Homeland and Skills, Faith and Oath, distribute Attributes, choose a Body & Spirit path, select equipment and languages, then finish character details.' },
  { q:'What happens at 0 Health?', a:'A character is Defeated and makes Hallows saves on their turns. A failed save adds a Fate Mark; three Fate Marks means death.' },
]
