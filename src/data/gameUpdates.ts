import { GAME_UPDATES_RELEASE } from './release'

export const GAME_RULES_VERSION=GAME_UPDATES_RELEASE
export type GameUpdateEntry={version:string;date:string;title:string;summary:string;changes:string[]}

export const gameUpdates:GameUpdateEntry[]=[
  {
    version:GAME_RULES_VERSION,
    date:'2026-09-11',
    title:'Bound Equipment',
    summary:'Updates two equipment rules: Scriptweave Book binds its Mana reduction and added cooldown to one selected Lore Spell, and Durtlehide binds its Resistance bonus to one selected elemental damage type.',
    changes:[
      'Scriptweave Book still grants [+1] Magic Regen while equipped, but its [-1] Mana reduction now applies only to one selected known Lore Spell. The bound Spell gains COOLDOWN: [1d10/2+1] rounds; if that Spell already uses a [1d10/2+X] cooldown, increase X by [+1].',
      'When Durtlehide is purchased, choose one elemental damage type. While that Durtlehide is equipped, it grants Resistance [+2] against the selected damage type.',
    ],
  },
  {
    version:'0.01',
    date:'2026-09-11',
    title:'Launch Patch',
    summary:'Consolidates the complete current Brambleheart ruleset into one launch-era Game Update covering core resolution, characters, combat, magic, advancement, equipment, species, Health, Threat, and the current Selu example content.',
    changes:[
      'The five Attributes and their Secondary Stats remain the foundation of characters. Core resolution uses 3d10 plus the required Stat and applicable Conditions, and Threadpieces use the current Washer, Nut, Screw, and Bolt exchange model.',
      'Character Creation supports Wind-Touched, Gifted Heart, Practiced Hand, and Tempered Form, with current Sparks, Deeds, Homelands, Faiths, Oaths, Skills, Talents, equipment, languages, and advancement rules. Sea of Roots is a current Homeland granting Herbalry and Wayfinding.',
      'Selu of the Wandering Reeds is the current complete example character: an Axalori Healer from the Sea of Roots who follows The Dreamtide and Mercy, is attuned to Harmony, and uses the current approved spell, language, Talent, and equipment choices.',
      'Core Actions and Ability Chains use the current shared roots, Reaction timing, once-per-character Ability-instance chain limit, and retired ROOT keyword behavior. Dynamic Move actions remain distinct from Core Combat Actions used on a turn.',
      'Melee Strike must be within [1] square when TO HIT resolves. Projectile weapons apply condition [-2] to Strike within [1] square; current Skyfire, Slashing, Dual Wielding, Beastgrasp, Turnstrike, Deadly, Penetration, and On-Going rules remain in effect.',
      'Standard, Direct, and Lethal remain the Damage Categories. Health states use Wounded at [8] or less, Critical at [4] or less, Last Breath at [2] or less, and Defeated at [0]; Fate Rolls pass on [5–10] and add a Fate Mark on [1–4].',
      'Magic uses the current 76-Spell roster, canonical base-Mana table, Signature Spell and Cantrip handling, Lore Attunement, Magic Strike, Renew the Heart, range/area, duration, repeat-save, stacking, summon, and primary-versus-recurring damage rules. Regrowth remains retired in favor of Renewal.',
      'Once per turn, before or after another Core Combat Action, Arcane Command may cast one Enhance or Hex Spell and increases that Spell’s Mana cost by [+1]. Mana Pool is Magic Level + Spirit and Magic Regen is Heart plus applicable equipment modifiers.',
      'Trinkets are passive equipped gear. Driftwood Charm joins the current Trinket list and, once per round, increases one healing Spell’s Health restoration by [+1] for one target.',
      'Current Species Heritage and Cultural Traits use the approved definitions and same-name effects do not stack unless a more specific rule says otherwise; current Tordan, Cethra, Rivkan, Auravex, Braelor, and Urnath trait adjustments remain in effect.',
      'Advancement uses the current 7–10 XP typical-session guidance, current upgrade costs, and once-per-session Spark-aligned kept-Deed bonus. Threat Score uses current Attribute, Skill, Talent, Magic Level, and exceptional-gear growth, and Group Threat is the sum of party Threat Levels.',
      'Weapon targeting lives with To Hit & To Ward and area targeting lives with Spell Types & Targeting. Superseded targeting routes and legacy names are retained only at explicit compatibility boundaries rather than as parallel current rules.',
    ],
  },
]
