import { GAME_UPDATES_RELEASE } from './release'

export const GAME_RULES_VERSION=GAME_UPDATES_RELEASE
export type GameUpdateEntry={version:string;date:string;title:string;summary:string;changes:string[]}

export const gameUpdates:GameUpdateEntry[]=[
  {
    version:GAME_RULES_VERSION,
    date:'2026-09-09',
    title:'Current Rules Presentation & Combat/Magic Clarifications',
    summary:'Updates the current player-facing rules for Core Actions, Character Creation, spellcasting, combat targeting, damage, Health, and current equipment.',
    changes:[
      'Core Action timing now distinguishes Dynamic Move actions from Core Combat Actions used on a turn, and all Core Combat Actions use the same combat presentation family.',
      'Character Creation guidance now covers all four Body & Spirit Paths, current equipment and Threadpiece exchange, expanded optional character details, and the current Spark, Deed, Homeland, Faith, and Oath procedures.',
      'Deeds may be drawn from the Deeds Deck or selected with percentile rolls; the standard session method is draw five and keep two, with at least two Deeds per player recommended.',
      'Lore Attunement grants Resistance [+1] against the element associated with the chosen Lore. Mana Pool and Magic Regen are defined independently from the Power secondary stat.',
      'Range Spells use Magic Strike where specified. Casting an Enhance requires the caster to Renew the Heart; reduce the passive target by the caster’s Spirit modifier, to a minimum target of [8].',
      'Damage Categories are Standard, Direct, Lethal, and On-Going. On-Going damage uses its printed value unless a more specific rule explicitly adds another value.',
      'Combat Targeting now distinguishes Touch from Range/Thrown targeting and retains the Line, Cone, and Orb area rules. Attacking & Defending keeps Ward as the opposed defense and defender-wins-ties rule.',
      'Current equipment references now use the same equipment categories and item data as Character Creation, including Traveler’s Gear, Field Kits, Consumables, Trinkets, and Tools.',
    ],
  },
  {
    version:'0.10',
    date:'2026-09-08',
    title:'Complete Magic Rebalance',
    summary:'Establishes the current 76-Spell roster, canonical base Mana costs, Signature Spell handling, and primary-versus-On-Going Spell damage rules.',
    changes:[
      'The built-in roster contains 76 current Spells: 13 Invocations and 9 Spells in each attunable Lore.',
      'Immolation is the Flames Signature Spell; superseded Spells and legacy Signature selections are removed at character normalization boundaries.',
      'One canonical base-Mana table defines built-in Spell costs before Lore Attunement and equipment modifiers.',
      'Heart is added once to a Spell’s primary damage where specified; later On-Going, recurring, delayed, terrain, movement-triggered, reflected, and summoned damage uses the printed value unless explicitly stated otherwise.',
      'Magic Strike, Renew the Heart, area, repeat-save, duration, stacking, and summon behavior was standardized across the current spell roster.',
    ],
  },
  {
    version:'0.07',
    date:'2026-09-05',
    title:'Current Species Traits',
    summary:'Establishes the current Woodlands Heritage and Cultural Trait rules and the shared same-name effect stacking rule.',
    changes:[
      'All current Heritage and Cultural Traits across the 12 Woodlands Species use the approved current trait definitions.',
      'Unless a rule states otherwise, effects from the same named Ability or Spell do not stack; apply only one simultaneous instance.',
      'The core resolution chapter is titled The Rhythm Engine.',
    ],
  },
  {
    version:'0.06',
    date:'2026-09-03',
    title:'Ability Keywords & Chain Limits',
    summary:'Defines current Ability Chain limits, shared Core Action roots, Reaction, and retirement of ROOT as an active keyword.',
    changes:[
      'Core Actions are the starting points for Ability Chains; Abilities may modify or trigger from those Actions and later eligible resolutions.',
      'A specific character’s copy of an Ability can resolve only once during the same Ability Chain unless a more specific rule states otherwise.',
      'Reaction is a shared Core Action used to resolve eligible Reactive Abilities.',
      'ROOT is retired as an active Ability keyword and no longer creates a separate once-per-family restriction.',
    ],
  },
  {
    version:'0.04',
    date:'2026-09-02',
    title:'Character Options & Equipment',
    summary:'Establishes the current Talent/Magic advancement framework, Character Creation path choices, and the canonical equipment/economy model.',
    changes:[
      'Character Creation supports Wind-Touched, Gifted Heart, Practiced Hand, and Tempered Form as the four Body & Spirit Paths.',
      'Talents and Magic use the current qualification, Mana, keyword, and advancement framework.',
      'Equipment, weapons, armor, shields, Threadpieces, and current item categories are normalized through shared economy/equipment data.',
      'Current custom and persisted character data is normalized at storage/import boundaries rather than by maintaining parallel legacy rule representations.',
    ],
  },
  {
    version:'0.01',
    date:'2026-08-30',
    title:'Core Statistics, Mana & Threadpiece Economy',
    summary:'Defines the foundational current character statistics, Mana economy, and Threadpiece currency exchange used by later rules.',
    changes:[
      'The five Attributes and their current Secondary Stats form the base character-stat model.',
      'The core roll uses 3d10 plus the required Stat and applicable Conditions.',
      'Mana Pool, Magic Regen, and Spell costs use the current Magic framework.',
      'Threadpieces use the shared Washer, Nut, Screw, and Bolt exchange model.',
    ],
  },
]
