import { GAME_UPDATES_RELEASE } from './release'

export const GAME_RULES_VERSION=GAME_UPDATES_RELEASE
export type GameUpdateEntry={version:string;date:string;title:string;summary:string;changes:string[]}

export const gameUpdates:GameUpdateEntry[]=[
  {
    version:GAME_RULES_VERSION,
    date:'2026-09-15',
    title:'Dual Wielding & Sapguard',
    summary:'Clarifies dual-wielding equipment interactions and the Sapguard exception for characters fighting with a weapon in each hand.',
    changes:[
      'Dual wielding now applies Mana Syphon [+1] while a character is wielding a weapon in each hand, in addition to the existing Strike condition and off-hand damage rules.',
      'Sapguard may be used while wielding a weapon in each hand. While doing so, the character suffers condition [-1] to melee and ranged weapon TO HIT rolls; Shield Hand continues to remove that Sapguard penalty.',
    ],
  },
  {
    version:'0.01',
    date:'2026-09-13',
    title:'Launch Patch',
    summary:'Consolidates the complete current Brambleheart ruleset into one launch-era Game Update covering core resolution, characters, combat, magic, advancement, equipment, species, Health, Threat, and current equipment bindings.',
    changes:[
      'The five Attributes and their Secondary Stats remain the foundation of characters. Core resolution uses 3d10 plus the required Stat and applicable Conditions, and Threadpieces use the current Washer, Nut, Screw, and Bolt exchange model.',
      'Character Creation supports Wind-Touched, Gifted Heart, Practiced Hand, and Tempered Form, with current Sparks, Deeds, Homelands, Faiths, Oaths, Skills, Talents, equipment, languages, and advancement rules. Sea of Roots is a current Homeland granting Herbalry and Wayfinding.',
      'Selu of the Wandering Reeds is the current complete example character: an Axalori Healer from the Sea of Roots who follows The Dreamtide and Mercy, is attuned to Harmony, and uses the current approved spell, language, Talent, and equipment choices.',
      'Core Actions and Ability Chains use the current shared roots, Reaction timing, once-per-character Ability-instance chain limit, and retired ROOT keyword behavior. Dynamic Move actions remain distinct from Core Combat Actions used on a turn.',
      'Melee Strike must be within [1] square when TO HIT resolves. Projectile weapons apply condition [-2] to Strike within [1] square; current Skyfire, Slashing, Dual Wielding, Beastgrasp, Turnstrike, Deadly, Penetration, and On-Going rules remain in effect.',
      'Standard, Direct, and Lethal remain the Damage Categories. Wounded covers [5–7] Health and [8+] Health is Healthy; Critical covers [3–4], Last Breath covers [1–2], and Defeated begins at [0]. Fate Rolls pass on [5–10] and add a Fate Mark on [1–4].',
      'Magic uses the current Spell roster, canonical base-Mana table, Signature Spell and Cantrip handling, Lore Attunement, Magic Strike, Renew the Heart, range/area, duration, repeat-save, stacking, summon, and primary-versus-recurring damage rules. Regrowth remains retired in favor of Renewal.',
      'Once per turn, before or after another Core Combat Action, Arcane Command may cast one Enhance or Hex Spell and increases that Spell’s Mana cost by [+1]. Mana Pool is Magic Level + Spirit and Magic Regen is Heart plus applicable equipment modifiers.',
      'Trinkets are passive equipped gear. Driftwood Charm increases one healing Spell’s Health restoration by [+1] for one target once per round. Scriptweave Book grants [+1] Magic Regen and binds its [-1] Mana reduction to one known Lore Spell; that bound Spell gains COOLDOWN: [1d10/2+1] rounds, or increases the +X value of an existing [1d10/2+X] cooldown by [+1].',
      'When Durtlehide is purchased, choose one elemental damage type. While equipped, Durtlehide grants Resistance [+2] against the selected damage type.',
      'Sapguard, Vinegrip, and Ironwood Bulwark provide increasing Mana Syphon values of [+1], [+2], and [+3] respectively.',
      'Current Species Heritage and Cultural Traits use the approved definitions and same-name effects do not stack unless a more specific rule says otherwise. Current tuning includes Tordan Steady Pace, Cethra Poised Reflex, Rivkan Double Lilly, Auravex Cycle Of The Beast, Braelor Thunderstep, and Urnath Frostwalker.',
      'Advancement uses the current 7–10 XP typical-session guidance, current upgrade costs, and once-per-session Spark-aligned kept-Deed bonus. Threat Score uses current Attribute, Skill, Talent, Magic Level, and exceptional-gear growth, and Group Threat is the sum of party Threat Levels.',
      'Talent roles use the current Offensive, Defensive, Magic, and Utility groupings. Bond Of Blades, Rhythm Of Blades, Sure Paw, Twin-Linked, and Witch Hunter are Utility; Spell Breaker is Defensive; Spell Cleave and Shadow Fang are Offensive; Rooted Paws is retired and Sure Hand is retained only as a legacy name for Sure Paw.',
      'Current Talent tuning removes obsolete Ability/Passive/Touch/Magic presentation where specified, sets Threadseer’s second-Spell surcharge to [+3] Mana, requires Jumpstart for Keen Edge, adds a [1] Mana cost to Pack Tactics, gives Second Chances a [1d10/2] round cooldown instead of a Mana cost, and prevents multiple Victory Roar instances from affecting the same character.',
      'Hearth Touch grants one character affected by the Spell condition [+1] to their next Attribute Save until the end of the round. Spellwinds is a Move Talent, and current Talent keyword presentation follows each Talent’s active action family rather than adding redundant Ability pills.',
      'The starter Glop profile uses Slosh, Gelatinous Bash, and Sticky Splash as Core Actions, gains the Reconstitute Instinct to restore [1] Health on [6+] while below half Health with a [1d10/2] round cooldown, leaves Slick terrain behind its movement, and reduces Direct damage suffered by [-1].',
      'Weapon targeting lives with To Hit & To Ward and area targeting lives with Spell Types & Targeting. Superseded targeting routes and legacy names are retained only at explicit compatibility boundaries rather than as parallel current rules.',
    ],
  },
]
