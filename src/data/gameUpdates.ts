export const GAME_RULES_VERSION='0.03'

export type GameUpdateEntry={version:string;date:string;title:string;summary:string;changes:string[]}

export const gameUpdates:GameUpdateEntry[]=[
  {
    version:GAME_RULES_VERSION,
    date:'2026-08-29',
    title:'Ability Economy, Talents & Magic Framework',
    summary:'Rebuilds Brambleheart’s Core action economy, Talent structure, Magic Level known-spell progression, spell-cost presentation, Arcane Focus authority, and shared rules grammar without performing the later spell-by-spell numerical rebalance.',
    changes:[
      'Each character may use one CORE Instinct, one CORE Move, and one CORE Combat ability each round. COMBAT is the umbrella for Touch, Shoot, or Magic.',
      'ROOT no longer limits Core Abilities. It limits advanced abilities by specific family: Instinct, Move, Touch, Shoot, Magic, or Reactive.',
      'Core Abilities are Channel the Winds, Focused Will, Stride, Swiftstride, Hero’s Charge, Melee Strike, Range Strike, Arcane Command, and passive Renew the Heart.',
      'Channel the Winds increases Magic Regen. Focused Will is free. Start of Round resolves Instinct choices, Magic Regen modifiers, Mana restoration, then turns.',
      'Magic Level directly determines known Lore Spells and Invocations. Magic Level 10 allows 12 Lore Spells and 6 Invocations, plus the Signature Spell.',
      'Lore Attunement remains -2 Mana. Ordinary spells have a minimum final cost of 1 Mana. Signature and Cantrip replace visible 0 Mana labels for their respective spell structures.',
      'Arcane Command delegates targeting and resolution to Spell Details. Enhance replaces Augment and TO HIT replaces Strike as the standardized rule-card field.',
      'Only one Arcane Focus is active at a time; focus Control and Mana-cost effects do not stack across multiple owned foci.',
      'Talents now primarily modify Core Abilities or resolve from their own triggers. Cleave replaces Fang Break; Beastgrasp is the canonical replacement for Primate Grip.',
      'Action-family pills use consistent colors: Touch red, Shoot teal, Magic purple, Instinct blue, Move green, Reactive orange, and Passive gray.',
      'Individual spell damage, Mana, healing, area, and Empower numerical tuning is intentionally deferred to the dedicated spell-balance pass.',
    ],
  },
  {
    version:'0.02',
    date:'2026-08-28',
    title:'Magic Regen & Threadpiece Economy Rebuild',
    summary:'Clarifies Magic Regen as the Heart statistic itself and rebuilds Brambleheart’s economy around one whole-wp runtime authority, creation-safe price tiers, and equipped protective gear.',
    changes:[
      'Magic Regen now equals Heart. The former standard +2 is removed. Effects that increase or decrease start-of-round Mana restoration modify Magic Regen directly.',
      'Threadpieces use one canonical conversion: 10 wp = 1 np, 5 np = 1 sp, and 5 sp = 1 bp. Runtime monetary values are stored and calculated as whole wp.',
      'Starting wealth remains 30 sp. The Adventure Kit remains free and may be sold during creation for 3 sp, setting maximum creation purchasing power at 33 sp.',
      'Weapons, Armor & Shields, Adventuring Gear, Trade Goods, mounts, and vehicles use the rebuilt price curve. Veteran-quality personal gear begins above the maximum creation budget.',
      'Field Blade (Long Sword) returns to the purchasable weapon catalog at 20 sp.',
      'A character may own multiple protective items, but only one armor and one shield may be equipped at a time. Only equipped protective gear contributes Guts, Mana Syphon, Stealth, and Might requirements.',
      'Ordinary gear normally resells for 50% of current retail value, rounded down to whole wp. Trade goods normally resell for 75% of listed base value.',
      'Crafting a market-priced item requires eligible listed materials worth at least 50% of current retail value in addition to normal Skill, tool, time, workspace, and rule requirements.',
      'Transportation prices are rebuilt as campaign-scale purchases. Barding remains three times the current canonical retail price of the selected armor.',
    ],
  },
  {
    version:'0.01',
    date:'2026-08-28',
    title:'Secondary Statistic & Mana System Clarification',
    summary:'Established the shared secondary-stat formulas, physical and magical damage statistics, and the Bravery-based Mana Pool and Magic Regen framework.',
    changes:[
      'Aim equals the Agility modifier and is used to hit with ranged attacks. Accuracy equals Agility Rank and adds to ranged damage. Speed equals the Agility modifier +2.',
      'Brawl equals the Might modifier and is used to hit with melee attacks. Fury equals Might Rank and adds to melee damage where a rule calls for it.',
      'Ward equals the Hide modifier and is used to defend against attacks. Guts equals Hide Rank, plus applicable equipment bonuses, and reduces incoming damage where a rule calls for it.',
      'Control equals the Lore modifier, plus applicable equipment bonuses, and is used to hit with magical attacks. Power equals Lore Rank and adds to magical damage where a rule calls for it.',
      'Heart equals Bravery Rank. Spirit equals the Bravery modifier.',
      'Mana Pool equals Magic Level + Spirit. The first Magic Regen framework used Heart with a standard +2; Rule Update 0.02 supersedes that standard modifier.',
    ],
  },
]
