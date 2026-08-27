export const GAME_RULES_VERSION='0.33'

export type GameUpdateEntry={version:string;date:string;title:string;summary:string;changes:string[]}

export const gameUpdates:GameUpdateEntry[]=[
  {
    version:GAME_RULES_VERSION,
    date:'2026-08-27',
    title:'Bravery, Mana, and Damage Statistics',
    summary:'Adds Heart and Inspiration, rebuilds Mana around Bravery, and separates physical Fury from magical Power.',
    changes:[
      'Bravery now provides Heart equal to Bravery Rank and Inspiration equal to the Bravery modifier.',
      'Mana Pool equals Magic Level + Inspiration.',
      'At the start of each round, a character restores Mana equal to Heart. Other rules may restore additional Mana during a turn or round.',
      'The former Might-based Power statistic is renamed Fury. Fury equals Might Rank and adds to physical damage where the damage rule calls for it.',
      'Power is now a Lore secondary statistic. Power equals Lore Rank and adds to spell damage where the damage rule calls for it.',
      'Measurement display can be changed between Squares, Yards, Meters, and Feet without changing the underlying square-based rules.',
      'Equipment and gear purchase costs are reduced by 50%, using the existing Threadpiece exchange rates for display and accounting.',
    ],
  },
]
