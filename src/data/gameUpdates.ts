import { GAME_UPDATES_RELEASE } from './release'

export const GAME_RULES_VERSION=GAME_UPDATES_RELEASE
export type GameUpdateEntry={version:string;date:string;title:string;summary:string;changes:string[]}

export const gameUpdates:GameUpdateEntry[]=[
  {
    version:GAME_RULES_VERSION,
    date:'2026-09-10',
    title:'Arcane Command, Threat & Combat Reference Update',
    summary:'Expands Arcane Command casting flexibility, establishes the first Brambleheart Threat Level calculation, updates several weapon qualities, and clarifies Health and Fate rules.',
    changes:[
      'Arcane Command may be resolved a second time once per turn without another Core Combat opportunity; the additional cast must be an Enhance or Hex Spell and costs [+1] Mana.',
      'Projectile weapons apply condition [-2] to Strike when attacking a target within [1] square. Skyfire deals an additional [2] Lethal damage to its target, and Slashing deals [1] Lethal damage when its trigger is met.',
      'Health states now use the current thresholds: Wounded at [8] or less Health, Critical at [4] or less, Last Breath at [2] or less, and Defeated at [0]. Only the most severe applicable state is used.',
      'Defeated characters use a Fate Roll on their next turn in the following round: [6+] passes, [5] or less adds a Fate Mark, and restoring at least [1] Health removes all Fate Marks.',
      'Threat Level now measures individual character power from advancement beyond the baseline hero and combines party Threat by adding each character’s Threat Level. Monster and encounter calibration remains reserved for the later Watcher rules pass.',
    ],
  },
  {
    version:'0.13',
    date:'2026-09-09',
    title:'Weapon, Advancement & Trait Balance Update',
    summary:'Updates current weapon damage and Deadly handling, slows XP progression, clarifies Dual Wielding and defensive Talents, and tunes several Heritage Traits.',
    changes:[
      'Standard-damage Melee and Ranged weapon profiles gain [+1] base damage; Penetration weapons retain their current Direct-damage values.',
      'Deadly weapons list their normal damage followed by a bracketed Lethal value. On a successful Strike, the bracketed value is dealt as Lethal damage and is not recalculated from later damage additions.',
      'Dual Wielding applies [-2] to Strike rolls made with the wielded weapons. Shared weapon qualities resolve only once, and Versatile contributes one [+1] total, reducing the normal Dual Wielding penalty to [-1]. Beastgrasp increases that base Dual Wielding Strike penalty to [-4] while wielding two two-handed weapons.',
      'Ward Guard is retired. Turnstrike uses half the wielded weapon’s normal damage value, rounded up, with a minimum Ward bonus of [+1].',
      'On-Going is a recurring-damage qualifier rather than a Damage Category. Standard, Direct, and Lethal remain the Damage Categories, and On-Going damage keeps its stated category while preventing normal damage additions from being applied again.',
      'Advancement pacing is slowed to a typical 7–10 XP per session, with modestly higher Attribute, Skill, new Skill, Talent, and Magic Level costs. A Spark-aligned kept Deed grants [+1] bonus XP only once per session.',
      'Tordan Steady Pace uses the current movement and minimum-Speed rules. Cethra Poised Reflex and Rivkan Double Lilly are limited to once per round.',
      'Auravex Cycle Of The Beast restores only [1] Health or [1] Mana to its host rider. Braelor Thunderstep grants [+2] bonus charge movement and deals [2] Lethal damage on Power Through. Urnath Frostwalker grants Resistance [+2] to Cold and [+2] Ward from Natural Terrain.',
      'The obsolete six-Attribute Encounter Rating calculation is retired. Threat Level remains the current comparative encounter framework pending the dedicated Watcher rules pass.',
    ],
  },
  {
    version:'0.12',
    date:'2026-09-09',
    title:'Combat, Magic & Character Procedure Clarifications',
    summary:'Clarifies current Core Action timing, Deed selection, Lore elemental resistance, Enhance casting, and combat targeting.',
    changes:[
      'Core Action timing distinguishes Dynamic Move actions from Core Combat Actions used on a turn.',
      'Deeds may be drawn from the Deeds Deck or selected with percentile rolls; the standard session method is draw five and keep two, with at least two Deeds per player recommended.',
      'Lore Attunement grants Resistance [+1] against the element associated with the chosen Lore.',
      'Range Spells use Magic Strike where specified. Casting an Enhance requires the caster to Renew the Heart; reduce the passive target by the caster’s Spirit modifier, to a minimum target of [8].',
      'Combat Targeting distinguishes Touch from Range/Thrown targeting and retains the Line, Cone, and Orb area rules. Attacking & Defending keeps Ward as the opposed defense and defender-wins-ties rule.',
    ],
  },
  {
    version:'0.10',
    date:'2026-09-08',
    title:'Complete Magic Rebalance',
    summary:'Establishes the current 76-Spell roster, canonical base Mana costs, Signature Spell handling, and primary-versus-recurring Spell damage rules.',
    changes:[
      'The built-in roster contains 76 current Spells: 13 Invocations and 9 Spells in each attunable Lore.',
      'Immolation is the Flames Signature Spell; superseded Spells and legacy Signature selections are retired from the current spell model.',
      'One canonical base-Mana table defines built-in Spell costs before Lore Attunement and equipment modifiers.',
      'Heart is added once to a Spell’s primary damage where specified; later recurring, delayed, terrain, movement-triggered, reflected, and summoned damage uses the printed value unless explicitly stated otherwise.',
      'Magic Strike, Renew the Heart, area, repeat-save, duration, stacking, and summon behavior is standardized across the current Spell roster.',
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
    summary:'Establishes the current Talent/Magic advancement framework, Character Creation path choices, and equipment/economy model.',
    changes:[
      'Character Creation supports Wind-Touched, Gifted Heart, Practiced Hand, and Tempered Form as the four Body & Spirit Paths.',
      'Talents and Magic use the current qualification, Mana, keyword, and advancement framework.',
      'Equipment, weapons, armor, shields, Threadpieces, and current item categories use the current shared economy model.',
    ],
  },
  {
    version:'0.01',
    date:'2026-08-30',
    title:'Core Statistics & Threadpiece Economy',
    summary:'Defines the foundational character statistics, core roll, and Threadpiece currency exchange used by later rules.',
    changes:[
      'The five Attributes and their current Secondary Stats form the base character-stat model.',
      'The core roll uses 3d10 plus the required Stat and applicable Conditions.',
      'Threadpieces use the shared Washer, Nut, Screw, and Bolt exchange model.',
    ],
  },
]
