export const GAME_RULES_VERSION='0.01'

export type GameUpdateEntry={version:string;date:string;title:string;summary:string;changes:string[]}

export const gameUpdates:GameUpdateEntry[]=[
  {
    version:GAME_RULES_VERSION,
    date:'2026-08-28',
    title:'Secondary Statistic & Mana System Clarification',
    summary:'Clarifies the shared secondary-stat formulas, physical and magical damage statistics, and the Bravery-based Mana Pool and Magic Regen rules used throughout Brambleheart.',
    changes:[
      'Aim equals the Agility modifier and is used to hit with ranged attacks. Speed equals the Agility modifier +2.',
      'Brawl equals the Might modifier and is used to hit with melee attacks. Fury equals Might Rank and adds to melee damage where a rule calls for it.',
      'Ward equals the Hide modifier and is used to defend against attacks. Guts equals Hide Rank, plus applicable equipment bonuses, and reduces incoming damage where a rule calls for it.',
      'Control equals the Lore modifier, plus applicable equipment bonuses, and is used to hit with magical attacks. Power equals Lore Rank and adds to magical damage where a rule calls for it.',
      'Heart equals Bravery Rank. Spirit equals the Bravery modifier.',
      'Mana Pool equals Magic Level + Spirit. Magic Regen equals Heart +2 and is the amount of Mana restored at the start of each round.',
      'Any effect that increases or decreases Mana restored at the start of a round modifies Magic Regen; Talents, Abilities, equipment, and conditions may change that value.',
      'Equipment and gear purchase costs are reduced by 50 percent. When a reduced price would create a fractional Threadpiece, the price rounds down to the nearest whole Threadpiece.',
    ],
  },
]
