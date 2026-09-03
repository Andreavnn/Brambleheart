import { RULE_UPDATES_RELEASE } from './release'

export const GAME_RULES_VERSION=RULE_UPDATES_RELEASE

export type GameUpdateEntry={version:string;date:string;title:string;summary:string;changes:string[]}

export const gameUpdates:GameUpdateEntry[]=[
  {
    version:GAME_RULES_VERSION,
    date:'2026-09-03',
    title:'Core Actions & Ability Chain Limits',
    summary:'Establishes Core Actions as the shared starting points for Ability Chains, adds Reaction, and prevents repeated resolution of the same Ability instance within one chain.',
    changes:[
      'Core Ability is now called Core Action. Core Actions are the shared starting points for Ability Chains; Ability remains the term for Traits, Talents, Spells, equipment effects, and other rules that modify or trigger from them.',
      'Reaction is a Core Action. Each character may spend Reaction once per round to resolve one eligible Reactive Ability whose printed Trigger has been met.',
      'Every Ability Chain begins with a Core Action. A specific character’s copy of an Ability can resolve only once in the same Ability Chain, even if later effects would make its Trigger valid again.',
      'The same named Ability on a different character is a separate Ability instance and may resolve once in that chain. The chain ends when no unresolved Ability instance has a legal Trigger.',
      'Ragebound now builds from Focused Will; its bonuses are condition [+1] to Strike and [+1] damage, while Defenseless reduces Ward and Guts by [-1] each.',
      'Snapstep now builds from Focused Will or Channel the Winds and moves up to [2] squares.',
      'Drums of War and Divine Grasp retain their intentional rule-breaking effects that grant or compel additional Core Action use.',
    ],
  },
  {
    version:'0.04',
    date:'2026-09-02',
    title:'Equipment, Trinkets & Axalori Traits',
    summary:'Consolidates the current equipment/trinket rules, normalized protective gear rules, and the approved Axalori Trait revisions into one Game Update.',
    changes:[
      'Trinkets are passive equipped gear. They do not use numbered Trinket slots, do not consume Armor or Shield space, and there is no separate Arcane Focus selection.',
      'Journey Knot grants condition [+1] to TO HIT rolls made with its attached weapon while equipped, with no once-per-round restriction.',
      'Scriptweave Book grants Magic Regen [+1] and reduces ordinary spell Mana cost by [-1] while equipped; Caster Totem grants Control [+1].',
      'Shiny Bobble grants Magic Regen [+1], Votive Icon grants condition [+1] when using Renew the Heart, Spell Charm increases one spell’s damage by [+1] once per round, and Heartward Token increases the Guts Bonus of attached worn armor by [+1].',
      'Armor Penalty replaces the former armor Stealth field and reduces Speed, to a minimum of 1, while applying the same negative condition to Whisperster Skill checks.',
      'Ordinary weapon, armor, and shield profiles/prices are normalized. Only equipped armor and shield contribute their Guts, Mana Syphon, and Armor Penalty effects.',
      'Heartcurrent allows spending [-2] Health to restore [1] Mana or spending [-1] Mana to restore [2] Health; Stillwater Renewal restores [2] Health and [1] Mana when the character did not move during the round.',
      'Harmonic Field lets one ally within [3] squares choose to restore [1] Health, restore [1] Mana, or gain [+2] to Attribute Saves until the end of the next round; Resonant Pulse costs [2] Mana and uses its current damage-reduction wording.',
    ],
  },
  {
    version:'0.03',
    date:'2026-08-29',
    title:'Rhythm of Body & Spirit Paths',
    summary:'Expands character creation to four Body & Spirit paths while preserving the normal Rank 3 creation cap and giving every path at least one Talent.',
    changes:[
      'Wind-Touched grants Magic Level 1 plus 1 Talent.',
      'Gifted Heart grants 2 Talents.',
      'Practiced Hand grants 2 new Skills at Rank 1 plus 1 Talent; both Skills must be ones the character does not already know from earlier creation sources.',
      'Tempered Form grants +1 Rank to one Attribute plus 1 Talent, without exceeding the normal Rank 3 character-creation maximum.',
    ],
  },
  {
    version:'0.02',
    date:'2026-08-29',
    title:'Talents & Magic Framework',
    summary:'Establishes the current Talent structure, Magic Level progression, spell-cost grammar, and canonical spell presentation used by the later Core Action rules.',
    changes:[
      'Magic Level determines known Lore Spells and Invocations. Magic Level 10 allows 12 Lore Spells and 6 Invocations, plus the separate Signature Spell.',
      'Lore Attunement reduces ordinary spells from the attuned Lore by [-2] Mana, and ordinary spells have a minimum final cost of [1] Mana.',
      'Signature and Cantrip replace visible 0 Mana labels for their respective spell structures.',
      'Arcane Command delegates targeting and resolution to Spell Details, Enhance is the standardized beneficial-effect keyword, and TO HIT is the standardized attack field.',
      'Talents primarily modify shared actions or resolve from their own triggers; Cleave is the canonical Fang Break replacement and Beastgrasp is the canonical Primate Grip replacement.',
      'Individual spell damage, Mana, healing, area, and Empower numerical tuning remains separate from this framework update.',
    ],
  },
  {
    version:'0.01',
    date:'2026-08-28',
    title:'Core Statistics, Mana & Threadpiece Economy',
    summary:'Establishes the current secondary-stat formulas, Mana framework, and canonical Threadpiece economy used throughout character, equipment, and combat rules.',
    changes:[
      'Aim equals the Agility modifier; Accuracy equals Agility Rank; Speed equals the Agility modifier +2 before applicable penalties.',
      'Brawl equals the Might modifier; Fury equals Might Rank. Ward equals the Hide modifier; Guts equals Hide Rank plus applicable equipment bonuses.',
      'Control equals the Lore modifier plus applicable equipment bonuses; Power equals Lore Rank. Heart equals Bravery Rank and Spirit equals the Bravery modifier.',
      'Mana Pool equals Magic Level + Spirit. Magic Regen equals Heart plus applicable modifiers, with no standard +2 bonus.',
      'Threadpieces use one canonical conversion: 10 wp = 1 np, 5 np = 1 sp, and 5 sp = 1 bp.',
      'Starting wealth is 30 sp. The Adventure Kit is free and may be sold during creation for 3 sp, setting maximum creation purchasing power at 33 sp.',
      'Ordinary gear normally resells for 50% of current retail value, trade goods normally resell for 75%, and crafting a market-priced item requires eligible listed materials worth at least 50% of current retail value.',
    ],
  },
]
