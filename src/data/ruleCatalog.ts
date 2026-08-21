import { ruleSourceDocuments, type RuleSourceSection } from './rulesSource'

export interface RuleSourceSlice { document: string; sections?: string[] }
export interface RulePageDefinition {
  slug: string
  title: string
  summary: string
  sources?: RuleSourceSlice[]
  note?: string
}
export interface RuleCategoryDefinition {
  id: string
  title: string
  summary: string
  pages: RulePageDefinition[]
}

const page = (slug:string,title:string,summary:string,sources?:RuleSourceSlice[],note?:string):RulePageDefinition => ({slug,title,summary,sources,note})

export const ruleCategories: RuleCategoryDefinition[] = [
  {
    id:'reference', title:'Quick Reference', summary:'Fast links, frequently asked questions, and system changes.', pages:[
      page('quick-reference','Quick Reference','Links to every rules page currently organized in the Brambleheart reader.'),
      page('faq','FAQ','Common questions answered from the currently loaded rules.'),
      page('changes-updates','Changes & Updates','System errata, amendments, and rules changes. This is separate from the application changelog.'),
    ],
  },
  {
    id:'introduction', title:'Introduction', summary:'What Brambleheart is, the Watcher, the flow of play, and the core principles of the game.', pages:[
      page('introduction','Introduction','What Brambleheart is, how the game flows, and the core principles of play.',[{document:'introduction'}]),
    ],
  },
  {
    id:'lore-anthro-mundas', title:'Lore of Anthro Mundas', summary:'The myth-wild world, its peoples, places, histories, and old powers.', pages:[
      page('lore-anthro-mundas','Lore of Anthro Mundas','The world and setting of Anthro Mundas.',undefined,'The current supplied rules package lists this chapter in the table of contents, but does not include a standalone Lore of Anthro Mundas source chapter yet.'),
    ],
  },
  {
    id:'fundamentals', title:'The Fundamentals', summary:'Dice, targets, conditions, attributes, skills, keywords, and core abilities.', pages:[
      page('dice-rules','Dice Rules','The Rhythm Engine, conditions, fortune and misfortune, edged and weighted rolls, and half-step rolls.',[{document:'fundamentals',sections:['THE CORE ROLL','CONDITIONS','FORTUNE & MISFORTUNE RESULTS','EDGED & WEIGHTED ROLLS','HALF-STEP ROLLS']}]),
      page('dice-roll','Dice Roll','How to make the core 3d10 roll and add the required stat.',[{document:'fundamentals',sections:['THE CORE ROLL','CONDITIONS']}]),
      page('attributes-skills','Attributes & Skills','Attributes, ranks, modifiers, skill trees, expanded skills, and restricted skills.',[{document:'fundamentals',sections:['ATTRIBUTES','RANKS & MODIFIERS','SKILLS','SKILL TREES','EXPANDED & RESTRICTED']}]),
      page('attribute-skill-examples','Attribute & Skill Roll Examples','Examples and reference material for attribute and skill rolls.',[{document:'fundamentals'}]),
      page('keywords-ability-types','Keywords & Ability Types','How ability types and keywords determine when and how abilities can be used.',[{document:'core-abilities',sections:['ABILITIES','KEYWORDS','What Keywords Do','PASSIVE ABILITIES']}]),
      page('core-abilities','Core Abilities','The shared ability framework available during encounters.',[{document:'core-abilities',sections:['CORE ABILITIES']},{document:'core-abilities',sections:['ABILITIES']}]),
    ],
  },
  {
    id:'character-creation', title:'Character Creation', summary:'Build a hero and reference the character-facing rules used during creation and growth.', pages:[
      page('character-creation','Step-by-Step','The eight-step character creation process.',[{document:'character-creation'}]),
      page('sparks-deeds','Sparks & Deeds','Personality archetypes, deed-aligned play, and experience rewards.',[{document:'sparks'},{document:'deeds'}]),
      page('homeland','Homeland','Homelands, their skills, and guidance for creating one.',[{document:'homeland'}]),
      page('oath','Oath','Choosing, creating, and playing an Oath.',[{document:'oath'}]),
      page('faith','Faith','Choosing, creating, and playing a Faith.',[{document:'faith'}]),
      page('playable-species','Playable Species','Playable species currently named by the character creation rules.',[{document:'species'}],'The supplied Character Species document currently contains only its title page. The creation rules name Auravex, Ardenn, Axalori, Braelor, Cethra, Hedgkin, Ravari, Rivkan, Tordan, Urnath, and Virelan.'),
      page('talents','Talents','The current talents reference.',[{document:'talents'}]),
      page('adventuring-gear','Adventuring Gear','Weapons, armor, shields, threadpieces, kits, supplies, tools, accessories, and field gear.',[{document:'weapons'},{document:'armor-shields'},{document:'adventuring-gear'}]),
      page('beyond-character-creation','Beyond Character Creation','Experience, advancement, and growth after creation.',[{document:'beyond-creation'}]),
    ],
  },
  {
    id:'winds-of-magic', title:'Winds of Magic', summary:'Magic levels, spell slots, attunement, spell rules, and lore references.', pages:[
      page('magical-level','Magical Level','Magic power, spell slots, and mana regeneration.',[{document:'winds-of-magic',sections:['MAGIC POWER','SPELL SLOTS']}]),
      page('lore-attunement','Lore Attunement','Attuning to a lore and gaining its signature spell.',[{document:'winds-of-magic',sections:['LORE ATTUNEMENT','SIGNATURE']}]),
      page('spell-rules','Spell Rules','Spell keywords, augments, hexes, range, area effects, direct casting, and impassable collision.',[{document:'winds-of-magic',sections:['SPELL KEYWORDS','AUGMENTS & HEXES','SPELL RANGE','LINE','LINE[10]','CONE','CONE[6]','ORB','ORB[7]','DIRECT CASTING','IMPASSABLE COLLISION']}]),
    ],
  },
  {
    id:'lores-of-magic', title:'Lores of Magic', summary:'The eight lore entries listed in the current table of contents.', pages:[
      ...['Invocation','Flames','Frost','Hallows','Harmony','Life','Oath','Wilds'].map(name=>page(`lore-${name.toLowerCase()}`,name,`${name} lore reference.`,undefined,`The current supplied Winds of Magic source explains lore attunement and spell rules, but does not include a standalone ${name} spell list in the provided rules files.`)),
    ],
  },
  {
    id:'battles', title:'The Battles', summary:'Encounter setup, initiative, turns, mana, combat, damage, health, and defeat.', pages:[
      page('encounter-setup','Encounter & Setup','Starting a combat encounter, positions, squares, and measurements.',[{document:'battle',sections:['THE BATTLES','COMBAT ENCOUNTER','DETERMINING POSITIONS','SQUARES & MEASUREMENTS']}]),
      page('initiative-order','Initiative Order','How initiative is determined and how turn order is established.',[{document:'battle',sections:['INITIATIVE ORDER']}]),
      page('rounds-turns','Rounds & Turns','Rounds, turns, and start-of-turn timing.',[{document:'battle',sections:['ROUNDS & TURNS']}]),
      page('your-turn','Your Turn','Taking a turn and performing abilities.',[{document:'battle',sections:['TAKING YOUR TURN','PREFORMING ABILITIES']}]),
      page('mana','Mana','Combat mana generation and use.',[{document:'battle',sections:['MANA']}]),
      page('combat-abilities','Combat Abilities','Shared combat abilities and the attack framework.',[{document:'battle',sections:['CORE ABILITIES','COMBAT ABILITIES']}]),
      page('to-strike','To Strike','Melee, ranged, and magical strike rolls.',[{document:'battle',sections:['TO HIT']}]),
      page('to-ward','To Ward','Ward rolls and opposed defense.',[{document:'battle',sections:['TO DEFEND']}]),
      page('to-damage','To Damage','Applying damage after a successful attack.',[{document:'battle',sections:['TO DAMAGE','TO SOAK','DAMAGE – GUTS = TOTAL DAMAGE']}]),
      page('damage-category','Damage Category','Damage categories used by combat and abilities.',[{document:'battle',sections:['DAMAGE CATEGORY']}]),
      page('damage-type','Damage Type','Standard, direct, lethal, and related damage handling.',[{document:'battle',sections:['DAMAGE CATEGORY','TO SOAK']}]),
      page('resistance-weakness','Resistance & Weakness','Resistance and weakness interactions.',[{document:'battle',sections:['RESISTANCES & WEAKNESS']}]),
      page('health','Health','Health and health-based penalties.',[{document:'battle',sections:['HEALTH']}]),
      page('healing','Healing','Healing during and after an encounter.',[{document:'battle',sections:['HEALING']}]),
      page('defeated','Defeated','Defeat, Hallows saves, Fate Marks, and death.',[{document:'battle',sections:['DEFEATED']}]),
      page('encounter-end','Encounter End','How a combat encounter ends.',[{document:'battle',sections:['ENCOUNTER ENDS']}]),
    ],
  },
  {
    id:'role-play', title:'The Role-Play', summary:'Character portrayal, travel, survival, downtime, crafting, trade, and transportation.', pages:[
      page('portraying-character','Portraying Your Character','Role-playing your hero in Anthro Mundas.',undefined,'This section is listed in the supplied table of contents, but a standalone Role-Play chapter was not included in the supplied rules files.'),
      page('interacting-world','Interacting with the World','Social and environmental interaction during role-play.',undefined,'This section is listed in the supplied table of contents, but a standalone Role-Play chapter was not included in the supplied rules files.'),
      page('time-traveling','Time & Traveling','Time, travel, routes, and movement between adventures.',[{document:'transportation'}]),
      page('illumination-vision','Illumination and Vision','Light, darkness, and seeing through the world.',undefined,'This section is listed in the supplied table of contents, but a standalone Role-Play chapter was not included in the supplied rules files.'),
      page('hunger-thirst','Managing Hunger and Thirst','Food, water, and survival needs.',undefined,'This section is listed in the supplied table of contents, but a standalone Role-Play chapter was not included in the supplied rules files.'),
      page('life-between-adventures','Life Between Adventures','Downtime and life between major adventures.',undefined,'This section is listed in the supplied table of contents, but a standalone Role-Play chapter was not included in the supplied rules files.'),
      page('building-crafting','Building & Maintaining & Crafting','Building, upkeep, and crafting-related play.',undefined,'This section is listed in the supplied table of contents, but a standalone Role-Play chapter was not included in the supplied rules files.'),
      page('dangers-all-around','Dangers All Around','Environmental and narrative hazards.',undefined,'This section is listed in the supplied table of contents, but a standalone Role-Play chapter was not included in the supplied rules files.'),
      page('trade-goods','Trade Goods','Materials, herbs, minerals, components, and trade values.',[{document:'trade-goods'}]),
      page('transportation','Transportation','Mounts, hauling, riding proficiency, and barding.',[{document:'transportation'}]),
    ],
  },
  {
    id:'monsters-critters', title:'Monsters & Critters', summary:'Threats, critters, traps, environments, monsters, and rewards.', pages:[
      ...[
        ['encounters-threat-level','Encounters & Threat Level'],['critters','Critters'],['traps-environments','Traps & Environments'],['monsters','Monsters'],['rewards','Rewards'],
      ].map(([slug,title])=>page(slug,title,`${title} reference.`,undefined,'This section is listed in the supplied table of contents, but a standalone Monsters & Critters chapter was not included in the supplied rules files.')),
    ],
  },
]

export const allRulePages = ruleCategories.flatMap(category => category.pages)
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
  { q:'What is the core Brambleheart roll?', a:'Roll 3d10, total the dice, and add the required stat. Conditions are applied after the dice total.' },
  { q:'What happens when opposed rolls tie?', a:'The core principles state that the defender wins ties.' },
  { q:'What is the difference between active and passive targets?', a:'An active target is an opposed roll. A passive target is a fixed value that the roll must equal or exceed.' },
  { q:'How do edged and weighted rolls work?', a:'Roll 4d10. Edged removes the lowest die; weighted removes the highest die. A roll cannot be both.' },
  { q:'How does a new character start?', a:'Choose species, Spark, Homeland, Faith and Oath; distribute attributes; choose Magic Level 1 + 1 Talent or 2 Talents; then select equipment and character details.' },
  { q:'What happens at 0 Health?', a:'A character is defeated and makes Hallows saves on their turns. A failed save adds a Fate Mark; three Fate Marks means death.' },
]
