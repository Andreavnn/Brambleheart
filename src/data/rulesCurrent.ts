/**
 * Canonical current Brambleheart rules.
 *
 * This file is the only in-repository authority for rendered rule-source content.
 * Historical Word/PDF transcriptions and mutation layers are intentionally not
 * retained in the runtime source tree.
 */
export type RuleSourceBlock =
  | { type:'paragraph'; text:string }
  | { type:'table'; rows:string[][] }

export interface RuleSourceSection { heading:string; blocks:RuleSourceBlock[] }
export interface RuleSourceDocument { sections:RuleSourceSection[] }

export const SPELL_HEART_DAMAGE_RULE="When a Spell adds Heart to a damage value, the Heart portion of that damage is Standard unless the Spell specifically states otherwise. The Spell’s printed damage value keeps its listed category and damage type. Heart is added once to the Spell’s primary damage only; On-Going, recurring, delayed, terrain, movement-triggered, reflected, and summon damage uses the printed value unless the rule explicitly says otherwise." as const

export const ruleSourceDocuments:Record<string,RuleSourceDocument>={
  "introduction": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "THE INTRODUCTION"
              ]
            ]
          }
        ]
      },
      {
        "heading": "BRAMBLEHEART",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Brambleheart is a story-driven tabletop role-playing game of courage, kinship, and discovery, set in the myth-wild world of Anthro Mundas — a land where storms sing names, ancient oaths still echo, and the Beastfolk of fur, feather, and scale walk beneath the gaze of old gods and older memories."
          },
          {
            "type": "paragraph",
            "text": "Each player creates a hero shaped by homeland, spark, and oath — a soul striving to find their rhythm in a living world. One among you becomes the Watcher, the voice of wind and wood, who paints the world’s dangers and wonders, and breathes life into every choice."
          },
          {
            "type": "paragraph",
            "text": "Together, you’ll weave a tale that grows through laughter, peril, and consequence. A single roll may decide whether your blade finds its mark, your courage endures, or the Winds of Magic turn in your favor."
          },
          {
            "type": "paragraph",
            "text": "Yet the truest victories are not written in numbers or dice. They are the friendships forged at the table — the stories told long after the candles burn low — and the legend your heroes leave in their wake."
          },
          {
            "type": "paragraph",
            "text": "Welcome to Brambleheart"
          }
        ]
      },
      {
        "heading": "THE WATCHER",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The Watcher (WAT) is the rhythm of the world made voice. They describe the sights, sounds, and spirits of Anthro Mundas, portraying its dangers and wonders alike."
          },
          {
            "type": "paragraph",
            "text": "The Watcher interprets the rules, resolves outcomes, and reacts to the players’ decisions — sometime with them and sometimes against them, ensuring every roll and choice feels like a living moment."
          },
          {
            "type": "table",
            "rows": [
              [
                "Watcher: “The storm’s heart glows green as you crest the ridge — what do you do?” Player: “I draw my cloak and press forward, calling the wind by name.” Watcher: “Then roll to see if the wind remembers you…”"
              ]
            ]
          }
        ]
      },
      {
        "heading": "HOW THE GAME FLOWS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Every game of Brambleheart follows a simple, cyclical rhythm:"
          },
          {
            "type": "paragraph",
            "text": "The Watcher describes the world — what you see, hear, and feel."
          },
          {
            "type": "paragraph",
            "text": "You decide how your character acts — through dialogue, skill, or ability."
          },
          {
            "type": "paragraph",
            "text": "Dice are rolled to test resolve and chance."
          },
          {
            "type": "paragraph",
            "text": "The story unfolds — success, failure, and everything in between becomes part of the tale."
          },
          {
            "type": "paragraph",
            "text": "No two adventures will ever play the same — the world changes with your choices, and your choices echo in its world."
          }
        ]
      },
      {
        "heading": "CORE PRINCIPLES OF PLAY",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Defender Wins: When rolls tie, the defender prevails."
          },
          {
            "type": "paragraph",
            "text": "Specific Over General: More specific rules take precedence when conflicts arise."
          },
          {
            "type": "paragraph",
            "text": "Rounding Down: All divided results are rounded down."
          },
          {
            "type": "paragraph",
            "text": "Minimum One: Maintain a minimum of 1 for all numeric values unless a rule explicitly states otherwise, ensuring fair play."
          },
          {
            "type": "paragraph",
            "text": "Forbidden But Not Forbidden: Unless the rules forbid it, you can try it — creativity is the heartbeat of play."
          }
        ]
      },
      {
        "heading": "WHAT YOU’LL NEED",
        "blocks": [
          {
            "type": "paragraph",
            "text": "To begin your adventure, gather the following:"
          },
          {
            "type": "paragraph",
            "text": "This rulebook – It contains everything needed to build characters, learn the rules, and explore the world."
          },
          {
            "type": "paragraph",
            "text": "Character sheets – To record your hero’s species, abilities, and story."
          },
          {
            "type": "paragraph",
            "text": "Ten-sided dice (d10) – You’ll roll three at a time for most checks."
          },
          {
            "type": "paragraph",
            "text": "Friends – At least one to play the Watcher, and others to share the road."
          },
          {
            "type": "paragraph",
            "text": "With these, the world of Anthro Mundas opens before you — vast, wild, and waiting."
          }
        ]
      },
      {
        "heading": "YOUR FIRST STEP",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Character creation begins with a spark — a name whispered to the stars, a vow made beneath the old trees."
          },
          {
            "type": "paragraph",
            "text": "In Brambleheart, that spark becomes a hero — a Beastfolk bound by courage, kinship, and the rhythm of the wild world."
          },
          {
            "type": "paragraph",
            "text": "To begin, follow the path below:"
          },
          {
            "type": "paragraph",
            "text": "Gather Your Kin. One player becomes the Watcher, the storyteller and rhythm-keeper of the world. The others play the heroes who will shape it."
          },
          {
            "type": "paragraph",
            "text": "Create Your Hero. Choose your species, spark, homeland, faith and oath — each reveals a part of who you are and how you face the unknown. (See Character Creation pg. xX)"
          },
          {
            "type": "paragraph",
            "text": "Learn the Rhythm. Rolls of three ten-sided dice decide your fate. The Watcher describes what unfolds; you decide how your hero acts. Together, story and chance weave the world’s melody."
          },
          {
            "type": "paragraph",
            "text": "Step Into the Wild. Begin your first tale — a lonely village at dusk, a ruin tangled in vine and mystery, or the edge of a magical storm where something ancient stirs."
          },
          {
            "type": "paragraph",
            "text": "Every legend in Brambleheart begins not of victory or defeat, but of courage."
          }
        ]
      }
    ]
  },
  "fundamentals": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "THE FUNDATMENTALS"
              ]
            ]
          }
        ]
      },
      {
        "heading": "THE RHYTHM ENGINE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Brambleheart uses a simple dice system called The Rhythm Engine. This single roll system is used for skill checks, strike rolls, ward rolls, attribute saves, and any test of chance or resolve."
          },
          {
            "type": "paragraph",
            "text": "(3d10) + stat"
          },
          {
            "type": "paragraph",
            "text": "Players roll three ten-sided dice and total the resulting values. For example, if a roll included 4, 5 and a 6 that total result would be 15."
          }
        ]
      },
      {
        "heading": "CONDITIONS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Conditions are temporary bonuses or penalties that modify the roll. A positive condition increases your total; a negative condition reduces it."
          },
          {
            "type": "paragraph",
            "text": "Conditions apply after you total the dice."
          },
          {
            "type": "paragraph",
            "text": "Multiple conditions stack."
          },
          {
            "type": "paragraph",
            "text": "Conditions come from terrain, status effects, talents, spells, or circumstances."
          }
        ]
      },
      {
        "heading": "FORTUNE & MISFORTUNE RESULTS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A natural (unmodified) dice result of [8] or more is a fortune result. Exceptional results are a condition that adds [+1] to your total."
          },
          {
            "type": "paragraph",
            "text": "A natural (unmodified) dice result of [2] or more is a misfortune result. poor results are a condition that adds [-1] to your total."
          }
        ]
      },
      {
        "heading": "EDGED & WEIGHTED ROLLS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When a roll is designated as edged or weighted, you will roll four ten-sided dice instead of three."
          },
          {
            "type": "paragraph",
            "text": "After rolling and before totaling your results. If the roll is edged remove the lowest numerical result, if the roll is weighted remove the highest numerical result."
          },
          {
            "type": "paragraph",
            "text": "Then, total the remaining three dice and resolve the rest of the roll as normal. A roll can only be either edged or weighted, never both."
          },
          {
            "type": "paragraph",
            "text": "ACTIVE & PASSIVE TARGETS There are two types of targets you will compare your total dice roll to, active and passive."
          },
          {
            "type": "paragraph",
            "text": "An active target is an opposed roll made by either the Watcher, on behalf of a non-player character (NPC) or an opposed roll made by another Player."
          },
          {
            "type": "paragraph",
            "text": "A passive target is a stationary value that your total dice roll must equal or exceed in order to be successful. (See chart below)"
          },
          {
            "type": "table",
            "rows": [
              [
                "Difficulty",
                "Passive Target"
              ],
              [
                "Easy",
                "14"
              ],
              [
                "Medium",
                "18"
              ],
              [
                "Difficult",
                "22"
              ],
              [
                "Hard",
                "24"
              ],
              [
                "Very Hard",
                "30"
              ]
            ]
          }
        ]
      },
      {
        "heading": "HALF-STEP ROLLS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "There is also a roll referred to as half-step, these rolls are typically used as ways to control and limit specific conditions or rules."
          },
          {
            "type": "paragraph",
            "text": "Rules that apply half-step rolls will include a notation and might provide the additional information on a result."
          },
          {
            "type": "paragraph",
            "text": "When rolling half-step, you will divide the natural (unmodified) dice result by two, round up."
          },
          {
            "type": "paragraph",
            "text": "(1d10/2)"
          },
          {
            "type": "paragraph",
            "text": "The resulting value will determine your final total. If the resulting value is [1] through [5], your final is a [1]. If the resulting value is [6] through [10], your final is a [2]."
          },
          {
            "type": "paragraph",
            "text": "Additionally, some half-step rolls might also include additional conditions. If one does this value is added to your final result."
          },
          {
            "type": "paragraph",
            "text": "For example, if you’re required to roll [1d10/2+1] you would increase your final outcome by [+1]."
          }
        ]
      },
      {
        "heading": "ATTRIBUTES",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Attributes are the stat you add to your dice rolls. When you make a roll, you will always include an attribute in the roll."
          },
          {
            "type": "paragraph",
            "text": "Attributes are expressed in two ways, ranks measure the depth of an attribute and modifiers the focus of an attribute. Where ranks are referred to the attribute themselves, modifiers are secondary stats that will specify a different name or term."
          },
          {
            "type": "paragraph",
            "text": "Rolls will typically include a notation of what attribute or secondary stat to apply to your dice total, or your might be referred back to another rule that will have the specifics."
          },
          {
            "type": "paragraph",
            "text": "SECONDARY STATS: Accuracy is equal to Agility Rank and adds to ranged damage. Aim is equal to the Agility modifier and is used for ranged Strike rolls. Speed is equal to the Agility modifier +2. Fury is equal to Might Rank and adds to melee damage; Brawl is equal to the Might modifier and is used for melee Strike rolls. Guts is equal to Hide Rank and reduces damage; Ward is equal to the Hide modifier and is used to defend. Fury is equal to Lore Rank and adds to magical damage; Control is equal to the Lore modifier and is used for magical Strike rolls. Heart is equal to Bravery Rank and contributes to Magic Regen; Spirit is equal to the Bravery modifier and adds to Mana Pool."
          }
        ]
      },
      {
        "heading": "RANKS & MODIFIERS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "There are five different attributes in Brambleheart; Agility, Might, Hide, Lore and Bravery."
          },
          {
            "type": "paragraph",
            "text": "Each attribute begins at rank [1] and with experience points or role-play be increased up to rank [5]."
          },
          {
            "type": "paragraph",
            "text": "Each rank extracts a modifier; a single rank has a modifier of [2]. For example, if you have agility rank [3] you would have a modifier of [6]."
          },
          {
            "type": "paragraph",
            "text": "Both ranks and modifiers count as stats when creating rolls. The rule requiring the roll will depict on what stat is required. While attributes themselves will be depicted by their names, such as might or hide, secondary stats may derive from either an Attribute Rank or its modifier, as specified by each secondary-stat formula."
          },
          {
            "type": "table",
            "rows": [
              [
                "Attributes",
                "Description"
              ],
              [
                "Agility",
                "Motion & Balance"
              ],
              [
                "Might",
                "Strength & Resolve"
              ],
              [
                "Hide",
                "Endurance & Defense"
              ],
              [
                "Lore",
                "Insight & Awareness"
              ],
              [
                "Bravery",
                "Emotion & Will"
              ]
            ]
          }
        ]
      },
      {
        "heading": "SKILLS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Skills are natural or learned precision of practice, focus or intuition. Skills function as secondary stats that a rule or your watcher might require under certain circumstances."
          },
          {
            "type": "paragraph",
            "text": "For example, your watcher might as you or you the members of your party to make awareness roll to check rather you can locate a hidden item, or if you see a larking enemy."
          }
        ]
      },
      {
        "heading": "SKILL TREES",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Groups of skills are divided into a collection of disciplines called trees, with each tree representing a specific attribute."
          },
          {
            "type": "paragraph",
            "text": "Skill ranks inside a tree cannot exceed the rank of the related attribute. For example, if your bravery rank is [4] no skills within the bravery skill tree can exceed four."
          }
        ]
      },
      {
        "heading": "EXPANDED & RESTRICTED",
        "blocks": [
          {
            "type": "paragraph",
            "text": "There are two subcategories of skills called expanded and restricted."
          },
          {
            "type": "paragraph",
            "text": "Expanded are skills that can be taken for different types of specialized or knowledge. Such as the skill lorekeeping which can be taken as lorekeeping: nature and lorekeeping: history. Each of these skills are treated as two different skills and are recorded separately on your character record sheet."
          },
          {
            "type": "paragraph",
            "text": "Restricted skills typically require special tools, items, or even circumstances to perform. Such as the herbalry skill which requires a character to have additional tools such as bandages, cotton, or saps."
          },
          {
            "type": "table",
            "rows": [
              [
                "Skill",
                "Description",
                "Examples of Use"
              ],
              [
                "Agility Skill Tree"
              ],
              [
                "Tumblecraft",
                "The practice of balance, agility, and movement through space.",
                "Crossing a fallen log, tumbling to avoid harm."
              ],
              [
                "Shadehand",
                "Sleight of hand and the subtle art of manipulating objects unnoticed.",
                "Palming an item, swapping a token."
              ],
              [
                "Beastride (R)",
                "Mastery of controlling mounts or kin-beasts through bond or instinct.",
                "Urging a stag through dense brush, calming a panicked mount."
              ],
              [
                "Whisperster",
                "The craft of moving unseen, unheard, or unnoticed.",
                "Hiding among reeds, slipping past patrols."
              ]
            ]
          },
          {
            "type": "table",
            "rows": [
              [
                "Skill",
                "Description",
                "Examples of Use"
              ],
              [
                "Might Skill Tree"
              ],
              [
                "Stonegrasp",
                "The body’s raw power — climbing, hauling, breaking, or holding firm.",
                "Climbing a cliff, forcing open a sealed gate."
              ]
            ]
          },
          {
            "type": "table",
            "rows": [
              [
                "Skill",
                "Description",
                "Examples of Use"
              ],
              [
                "Lore Skill Tree"
              ],
              [
                "Tradeskill (R) (E)",
                "The shaping of things — forging, sewing.",
                "Mending a weapon, brewing tinctures."
              ],
              [
                "Lorekeeping (E)",
                "The collection of wisdom, history, and truths.",
                "Recalling ancient tales, identifying ruins,"
              ],
              [
                "Seeking",
                "The practice of piecing together truth.",
                "Searching for clues, discerning patterns."
              ],
              [
                "Herbalry (R)",
                "Understanding life, wounds, and the flow of health.",
                "Treating injuries, stabilizing allies."
              ],
              [
                "Awareness",
                "The senses of notice.",
                "Spotting hidden dangers"
              ],
              [
                "Wayfinding",
                "The skill of living in harmony with the wild.",
                "Tracking prey, foraging food, navigating storms."
              ],
              [
                "Runecraft (R)",
                "The focused control and understanding of the arcane.",
                "Detecting enchantments, identifying artifacts."
              ]
            ]
          },
          {
            "type": "table",
            "rows": [
              [
                "Skill",
                "Description",
                "Examples of Use"
              ],
              [
                "Bravery Skill Tree"
              ],
              [
                "Guile",
                "The shaping of perception through falsehood or misdirection.",
                "Concealing emotion, feigning innocence."
              ],
              [
                "Bondcraft",
                "Communicating with and guiding beasts.",
                "Calming an animal, taming a wild creature."
              ],
              [
                "Presence",
                "Asserting one’s power, spirit, or dominance.",
                "Demanding obedience or holding authority."
              ],
              [
                "Charm",
                "Persuasion, empathy, and heartfelt speech.",
                "Negotiating peace, swaying opinion."
              ],
              [
                "Expression (E)",
                "Inspiring others through art, song, or movement.",
                "Inspiring courage, dance, or storytelling."
              ]
            ]
          }
        ]
      }
    ]
  },
  "core-abilities": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "CORE ACTIONS"
              ]
            ]
          }
        ]
      },
      {
        "heading": "ABILITIES",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Core Actions are the shared starting actions available to every character. Abilities are the Traits, Talents, Spells, equipment effects, and other rules that can modify a Core Action or trigger from events created during its Ability Chain."
          },
          {
            "type": "paragraph",
            "text": "Every Ability Chain begins with a Core Action. An Ability may then modify that Core Action or trigger another Ability as its printed rules allow."
          },
          {
            "type": "paragraph",
            "text": "Unless otherwise stated, effects from the same named Ability or Spell do not stack. If a character would be affected by multiple instances of the same Ability or Spell at the same time, apply only one instance."
          }
        ]
      },
      {
        "heading": "KEYWORDS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "CORE: CORE identifies a Core Action. Each character may use one Core Instinct Action, one Core Move Action, one Core Combat Action, and one Core Reaction Action each round unless a more specific rule grants another use."
          },
          {
            "type": "paragraph",
            "text": "TOUCH: Close-range physical combat, normally resolved through Melee Strike."
          },
          {
            "type": "paragraph",
            "text": "SHOOT: Ranged physical combat, normally resolved through Range Strike."
          },
          {
            "type": "paragraph",
            "text": "MAGIC: Spellcasting and magical combat, normally resolved through Arcane Command."
          },
          {
            "type": "paragraph",
            "text": "INSTINCT: An Ability or Core Action used at its stated encounter timing, such as the start or end of a round or turn."
          },
          {
            "type": "paragraph",
            "text": "MOVE: Movement-related Abilities normally build from a Core Move Action."
          },
          {
            "type": "paragraph",
            "text": "COMBAT: Combat-related Abilities normally build from the character’s Core Combat Action. Melee Strike, Range Strike, and Arcane Command are the shared Core Combat Actions."
          },
          {
            "type": "paragraph",
            "text": "REACTIVE: A Reactive Ability can resolve only when its printed Trigger occurs and that character can spend their Reaction Core Action. Each character has one Reaction Core Action per round unless a specific rule grants another use."
          },
          {
            "type": "paragraph",
            "text": "PASSIVE: A rule that is always available or resolves automatically when its stated condition is met. Passive Abilities do not spend a Core Action unless a specific rule says otherwise."
          }
        ]
      },
      {
        "heading": "What Keywords Do",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Keywords tell you when an Ability can be used, which Core Action or event it relates to, and which other rules may interact with it."
          },
          {
            "type": "paragraph",
            "text": "Every Ability Chain begins with a Core Action. A specific character’s copy of an Ability can resolve only once during that Ability Chain, even if later events would make its Trigger valid again."
          },
          {
            "type": "paragraph",
            "text": "The same named Ability possessed by another character is a separate Ability instance and may resolve once in that chain. When no unresolved Ability instance has a legal Trigger, the Ability Chain ends."
          }
        ]
      },
      {
        "heading": "PASSIVE ABILITIES",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Passive Abilities do not normally spend Core Instinct, Move, Combat, or Reaction opportunities. They resolve whenever their Trigger, condition, or another rule instructs them to resolve. Renew the Heart is a shared Passive Core Action because another effect may Compel it or the character may use it when a rule permits."
          }
        ]
      },
      {
        "heading": "CORE ACTIONS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Every character has the following Core Actions: Channel the Winds and Focused Will (Instinct); Stride, Swiftstride, and Hero’s Charge (Move); Melee Strike, Range Strike, and Arcane Command (Combat); Reaction (Reaction); and Renew the Heart (Passive)."
          },
          {
            "type": "paragraph",
            "text": "During a normal round, a character may use one Core Instinct Action, one Core Move Action, one Core Combat Action, and one Core Reaction Action. Core Move is dynamic: use a Move Action whenever that Action’s own Trigger permits. Core Combat is normally used on a turn when its Trigger is legal. Reaction is spent only when an eligible Reactive Ability meets its printed Trigger."
          }
        ]
      }
    ]
  },
  "battle": {
    "sections": [
      {
        "heading": "COMBAT ENCOUNTER",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A combat encounter begins when timing, position, and danger matter enough that everyone needs a shared order of play. The Watcher establishes the scene, places or describes the participants, and makes clear what each side is trying to accomplish."
          },
          {
            "type": "paragraph",
            "text": "Before the first round, determine starting positions, confirm terrain or obstacles that matter, and roll Initiative. Once Initiative is set, the encounter moves through repeated rounds: resolve Start of Round effects, take turns in Initiative Order, resolve End of Round effects, then begin the next round until the encounter ends."
          }
        ]
      },
      {
        "heading": "DETERMINING POSITIONS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Before Initiative is rolled, the Watcher and players establish where every participating character begins. Use the scene, terrain, surprise, marching order, and the fiction immediately before combat to choose fair starting positions."
          },
          {
            "type": "paragraph",
            "text": "Place important terrain and obstacles at the same time so everyone understands what can be reached, crossed, climbed, or used for cover before the first turn begins."
          }
        ]
      },
      {
        "heading": "SQUARES & MEASUREMENTS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Brambleheart combat is designed for a square grid, but the same distances can be translated for theatre-of-the-mind or another tabletop scale. One square represents roughly one yard, three feet, or one meter of battlefield distance."
          }
        ]
      },
      {
        "heading": "INITIATIVE ORDER",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Initiative Order determines when characters act during each round. Each participant rolls once when the combat encounter begins unless a rule specifically changes Initiative later."
          },
          {
            "type": "paragraph",
            "text": "To determine Initiative, roll (3d10) + Speed + condition(s). Higher totals act earlier. Resolve ties using the normal tie rule or a Watcher ruling when multiple participants have the same result."
          },
          {
            "type": "paragraph",
            "text": "Speed equals [2] + the character’s Agility modifier."
          }
        ]
      },
      {
        "heading": "ROUNDS & TURNS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A round represents one complete cycle of the encounter. Resolve the Start of Round sequence, then each character takes a turn in Initiative Order, then resolve End of Round effects before the next round begins."
          },
          {
            "type": "paragraph",
            "text": "START OF ROUND: First, each character may choose and resolve one eligible Core Instinct Action in Initiative Order. Second, apply effects that increase or decrease Magic Regen for this round. Third, each character restores Mana equal to their current Magic Regen, without exceeding Mana Pool unless a rule explicitly allows it."
          },
          {
            "type": "paragraph",
            "text": "END OF ROUND: Resolve effects that explicitly occur at the end of the round in Initiative Order. When those effects are complete, clear round-limited timing where required and begin the next Start of Round sequence."
          }
        ]
      },
      {
        "heading": "TAKING YOUR TURN",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When your place in Initiative arrives, resolve the actions and Abilities that are legal on that turn. Your Core Combat Action is normally used on a turn; Melee Strike, Range Strike, and Arcane Command are the shared Core Combat choices."
          },
          {
            "type": "paragraph",
            "text": "Core Move is dynamic rather than locked to a single on-turn timing label. A Move Action may be used whenever its own printed Trigger permits, and a rule may split movement, add movement, replace a Core Action, or create a legal Ability Chain from what you do."
          },
          {
            "type": "paragraph",
            "text": "Every Ability Chain begins with a Core Action. Talents, Traits, Spells, equipment, and other effects may modify that Core Action or trigger later in the chain. Reactive Abilities use the reacting character’s Reaction Core Action."
          }
        ]
      },
      {
        "heading": "MANA",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Mana Pool is the maximum Mana a character can normally hold and equals Magic Level + Spirit. Spirit is the Bravery modifier."
          },
          {
            "type": "paragraph",
            "text": "Magic Regen is the amount of Mana restored during the Start of Round sequence and equals Heart. Heart is Bravery Rank."
          },
          {
            "type": "paragraph",
            "text": "Characters begin an encounter with Mana equal to their Mana Pool. Normal restoration cannot increase Mana above Mana Pool unless a rule explicitly allows it."
          },
          {
            "type": "paragraph",
            "text": "Increase Magic Regen and Decrease Magic Regen modify the round’s normal restoration. Restore Mana immediately recovers spent Mana outside that restoration step."
          }
        ]
      },
      {
        "heading": "CORE ABILITIES",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Core abilities are generic abilities that all characters, players and watcher are entitled to and can use during a combat encounter."
          },
          {
            "type": "paragraph",
            "text": "Characters will also gain other abilities from their character’s species, magical spells and other sources."
          }
        ]
      },
      {
        "heading": "TO HIT",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Attacking and defending use opposed rolls. Melee Strike rolls (3d10) + Brawl + condition(s), Range Strike rolls (3d10) + Aim + condition(s), and a Magic Strike rolls (3d10) + Control + condition(s)."
          },
          {
            "type": "paragraph",
            "text": "The defender rolls (3d10) + Ward + condition(s). Ward is the Hide modifier. Compare the totals after all applicable Conditions and effects are applied."
          },
          {
            "type": "paragraph",
            "text": "If the attacker’s total is higher, the attack succeeds. If the defender’s Ward total is equal to or higher than the attack total, the attack is defended. Ties always go to the defender unless a more specific rule states otherwise."
          },
          {
            "type": "paragraph",
            "text": "On a successful Melee Strike, add Fury to weapon damage where the action calls for it. On a successful Range Strike, add Accuracy. Damaging Spells follow their printed damage rules."
          }
        ]
      },
      {
        "heading": "TO DAMAGE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When a successful attack, Ability, or Spell deals damage, use the damage value and additions printed by that action or effect. TOUCH, SHOOT, MAGIC, and other keywords describe how rules interact; keywords do not add damage by themselves."
          },
          {
            "type": "paragraph",
            "text": "Melee Strike adds Fury to the weapon’s damage and Range Strike adds Accuracy to the weapon’s damage. A damaging Spell adds Heart once to its primary damage value unless that Spell specifically states otherwise."
          },
          {
            "type": "paragraph",
            "text": "On-Going, recurring, delayed, terrain, movement-triggered, reflected, and summon damage is exactly the printed value. Do not add Heart, Fury, Accuracy, Power, weapon damage, or another Attribute-derived damage bonus to those later damage instances unless the rule explicitly says to add it."
          },
          {
            "type": "paragraph",
            "text": "After the incoming damage value is determined, apply Resistance, Weakness, Conditions, and other modifiers as their rules state, then subtract Guts according to the incoming Damage Category. Any damage remaining reduces Health."
          }
        ]
      },
      {
        "heading": "DAMAGE CATEGORY",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Damage Category determines how incoming damage interacts with Guts. The current categories are Standard, Direct, Lethal, and On-Going. Damage Category is separate from damage type; fire, frost, nature, and similar damage types identify the source or element."
          },
          {
            "type": "paragraph",
            "text": "STANDARD: Apply the target’s full Guts. If a Damage Category is not stated, the damage is Standard."
          },
          {
            "type": "paragraph",
            "text": "DIRECT: Reduce the target’s Guts value by half, rounding up, to a minimum of [1] Guts."
          },
          {
            "type": "paragraph",
            "text": "LETHAL: The damage bypasses the target’s Guts, including Guts from equipment, unless a more specific rule states otherwise."
          },
          {
            "type": "paragraph",
            "text": "ON-GOING: Damage that resolves after the initial effect at a later stated timing is On-Going. On-Going damage uses exactly its printed value and does not add the normal Fury, Accuracy, Heart, Power, or weapon-damage additions unless the effect explicitly says otherwise. If no other Guts instruction is printed, apply full Guts when resolving the On-Going damage."
          },
          {
            "type": "paragraph",
            "text": "A damage type can appear with a category, such as Direct Fire damage. Damage type may interact with Resistance or Weakness, but it does not change the Damage Category unless a rule explicitly says it does."
          }
        ]
      },
      {
        "heading": "TO SOAK",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Guts reduces incoming damage whenever that damage category allows Guts. Guts equals Hide Rank plus applicable equipment bonuses, Conditions, Resistance, Weakness, and other modifiers."
          },
          {
            "type": "paragraph",
            "text": "Resolve the incoming damage value first, apply the Damage Category and Guts modifiers, then subtract the resulting Guts. Damage cannot be reduced below [0] by Guts."
          }
        ]
      },
      {
        "heading": "RESISTANCES & WEAKNESS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Resistance and Weakness modify Guts against specific damage types. Apply the Damage Category first, then apply the relevant Resistance or Weakness to the resulting Guts value before subtracting Guts from incoming damage."
          },
          {
            "type": "paragraph",
            "text": "RESISTANCE: If a character has Resistance [+2] against Fire, increase their applicable Guts by [+2] when resolving Fire damage. A more specific Resistance, such as magical Fire Resistance, applies only when the incoming damage matches that description."
          },
          {
            "type": "paragraph",
            "text": "WEAKNESS: Weakness works in the opposite direction. Fire Weakness [2] reduces applicable Guts by [-2] when resolving Fire damage."
          },
          {
            "type": "paragraph",
            "text": "Example: a character has Guts [6] and Fire Resistance [+3] against Direct Fire damage. Direct first reduces Guts to [3]; Resistance then raises the applicable Guts to [6]."
          }
        ]
      },
      {
        "heading": "HEALTH",
        "blocks": [
          {
            "type": "paragraph",
            "text": "All player characters have thirty health. When a character suffers damage, they will mark or fill in one of the health markers on their character sheet."
          },
          {
            "type": "paragraph",
            "text": "When a character’s health falls to five or less, they suffer a [-1] condition to all dice rolls. This penalty increases to [-2] condition when a character’s health is reduced to three or less. If a character is reduced to one health, this penalty increases further to [-3] condition."
          }
        ]
      },
      {
        "heading": "HEALING",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Characters can restore lost health using spells, talents, or skills."
          },
          {
            "type": "paragraph",
            "text": "A healing effect will always describe the amount of health restored in brackets. For example, “restore health [+2]” means the target regains two health."
          },
          {
            "type": "paragraph",
            "text": "Restoring health cannot increase a character’s total health beyond their maximum. Healing takes effect immediately unless otherwise stated."
          },
          {
            "type": "paragraph",
            "text": "Some abilities or effects may reduce the value of healing (for example, healing reduced by [-2]), or amplify it (increase healing by [+1]). Apply these modifiers before recording the final health restored."
          }
        ]
      },
      {
        "heading": "DEFEATED",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When a character is reduced to zero health, they are considered defeated and move to the end of the initiative order. The first defeated character is followed by the second and so forth."
          },
          {
            "type": "paragraph",
            "text": "Defeated characters will make a hallows save on their turn. This is a single 1d10 roll. If the result is six or higher the character passes. If the result is five or lower the character receives a fate mark."
          },
          {
            "type": "paragraph",
            "text": "If a character receives three fate marks they die and enter the howling hallows."
          },
          {
            "type": "paragraph",
            "text": "If a character restores one or more health points all fate marks are removed."
          }
        ]
      },
      {
        "heading": "ENCOUNTER ENDS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A combat encounter ends when the immediate conflict is resolved: one side is defeated, withdraws, surrenders, escapes, or the encounter objective is otherwise completed. The Watcher then resolves the consequences of the battle, including recovery, Experience, treasure, and any continuing danger."
          }
        ]
      }
    ]
  },
  "character-creation": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "CHARACTER CREATION"
              ]
            ]
          }
        ]
      },
      {
        "heading": "CHARACTER CREATION",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Every hero begins as a whisper on the wind—an untested spirit reaching toward the wide, waiting world."
          },
          {
            "type": "paragraph",
            "text": "Before a hero draws a weapon or speaks with courage, they begin here, with a name, a spark, and the rhythm of their first steps."
          },
          {
            "type": "paragraph",
            "text": "In Brambleheart, creating a character is more than selecting traits, it invites you to explore who your hero was, who they are, and who they might yet become."
          }
        ]
      },
      {
        "heading": "1. CHOOSE YOUR SPECIES",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your Species is the first broad shape of your hero: the Beastfolk lineage they come from, the traits they carry, the traditions they grew up around, and the language that feels like home."
          },
          {
            "type": "paragraph",
            "text": "Choose one playable Species that fits the character you want to bring to the table. Its Heritage Traits are part of that Species by nature, while Cultural Traits are learned traditions and may be exchanged during Character Creation when the Culture Trait rules allow. You also gain the Species’s native language, and every character knows Commonspeak."
          }
        ]
      },
      {
        "heading": "2. CHOOSE YOUR SPARK",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your Spark is the little truth at the center of your hero—the instinct, outlook, or desire that most often pulls them into the story."
          },
          {
            "type": "paragraph",
            "text": "Choose the Spark that feels closest to the character you want to play. Its two keywords connect your personality to Deeds during play. When you complete a Deed that shares a keyword with your Spark, you earn the normal reward plus the Spark-alignment bonus."
          }
        ]
      },
      {
        "heading": "3. SELECT YOUR HOMELAND",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Think about where your hero learned how to live before the adventure began. A Homeland can be a village, a city, a road, a wilderness, a community, or simply the place that taught them the habits they still carry."
          },
          {
            "type": "paragraph",
            "text": "Choose one Homeland. It grants two starting Skills at Rank [1]. Your Homeland does not have to be where you were born; it can represent upbringing, travel, apprenticeship, exile, adoption, or another place that left a lasting mark."
          }
        ]
      },
      {
        "heading": "4. CHOOSE YOUR FAITH & OATH",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Faith and Oath answer two different questions about your hero: what do they believe gives meaning to the world, and what promise or principle do they try to live by?"
          },
          {
            "type": "paragraph",
            "text": "Choose one Faith and one Oath. Faith gives you a language for belief, ritual, and belonging. Your Oath gives you a personal standard to return to when choices become difficult. Neither tells you how to roleplay; they give you and the Watcher useful anchors for character decisions, consequences, and growth."
          }
        ]
      },
      {
        "heading": "5. ATTRIBUTES DISTRIBUTION",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Attributes show the different ways your hero meets the world—through movement, strength, endurance, knowledge, and courage. You do not need a perfect spread; the goal is to make the numbers feel like the character you have in mind."
          },
          {
            "type": "paragraph",
            "text": "Every Attribute begins at Rank [1]. You have [5] points to spend, and no Attribute can begin above Rank [3]. Try the example below and move the points around until the shape of the character feels right."
          },
          {
            "type": "table",
            "rows": [
              [
                "Attribute",
                "Description"
              ],
              [
                "Agility",
                "Motion, grace, precision, and reflex."
              ],
              [
                "Might",
                "Strength, endurance, and raw resolve."
              ],
              [
                "Hide",
                "Toughness, vitality, and the will to withstand harm."
              ],
              [
                "Lore",
                "Intellect, intuition, and command of knowledge or magic."
              ],
              [
                "Bravery",
                "Spirit, courage, and the power of conviction."
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Your final ranks become the foundation for your modifiers and secondary stats, so this is a good moment to check whether the character feels quick, forceful, resilient, learned, brave—or some mix of all five."
          }
        ]
      },
      {
        "heading": "6. THE RHYTHM OF BODY & SPIRIT",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Now choose the direction your hero’s early training, talent, or awakening takes. A Path is not a permanent class; it is the strongest note in your character’s starting rhythm and a simple way to decide what they already know when the story opens."
          },
          {
            "type": "paragraph",
            "text": "Choose one of the four Paths below. Wind-Touched begins with Magic Level [1] and [1] Talent. Gifted Heart begins with [2] Talents. Practiced Hand begins with [2] new Skills and [1] Talent. Tempered Form increases one Attribute by [1] Rank and grants [1] Talent."
          },
          {
            "type": "paragraph",
            "text": "WIND-TOUCHED: Choose this Path if magic is already part of your hero’s life. Gain Magic Level [1], choose a Lore Attunement and its Signature Spell, learn the Spells allowed by Magic Level [1], then choose [1] Talent you qualify for."
          },
          {
            "type": "paragraph",
            "text": "GIFTED HEART: Choose this Path for a hero defined by training, instinct, or unusual gifts. Choose [2] Talents you qualify for."
          },
          {
            "type": "paragraph",
            "text": "PRACTICED HAND: Choose this Path for a broadly trained hero. Learn [2] Skills you do not already possess at Rank [1], then choose [1] Talent you qualify for."
          },
          {
            "type": "paragraph",
            "text": "TEMPERED FORM: Choose this Path for a hero whose defining strength is exceptional physical, mental, or spiritual development. Increase [1] Attribute by [1] Rank, respecting normal Character Creation limits, then choose [1] Talent you qualify for."
          },
          {
            "type": "paragraph",
            "text": "Talents and Magic use the same rules after Character Creation regardless of the Path you chose. Your Path sets the opening shape of the hero, not the limits of who they can become."
          }
        ]
      },
      {
        "heading": "7. EQUIPMENT & ITEMS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your first loadout should feel like what your hero would actually carry into the opening adventure. Every character begins with an Adventure Kit plus [30] sp of starting Threadpieces, equal to [1,500] wp, for weapons, armor, tools, supplies, and personal gear."
          },
          {
            "type": "paragraph",
            "text": "Use the Equipment & Gear reference as a catalogue rather than a checklist. Choose what supports the character you have built, remember that the Adventure Kit already covers its listed travel essentials, and add personal items whenever they help tell us who this hero is."
          }
        ]
      },
      {
        "heading": "8. CHARACTER DETAILS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "With the rules pieces in place, give your hero the final details that make them feel like a person rather than a collection of choices."
          },
          {
            "type": "paragraph",
            "text": "Fill in the details that matter at your table: • Name & Pronunciation • Age, Appearance, and Pronouns (optional) • Pack, Herd, or Kinship (optional) • Confirm the Homeland chosen in Step 3 • Confirm the Spark chosen in Step 2 • Confirm the Faith and Oath chosen in Step 4 • Review the character’s Secondary Stats, such as Speed, Power, Guts, and Ward"
          },
          {
            "type": "paragraph",
            "text": "Once those details feel settled, your character is ready to step into Anthro Mundas. You can always discover more about them through play; Character Creation only needs to give you a strong place to begin."
          }
        ]
      }
    ]
  },
  "sparks": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "SPARKS"
              ]
            ]
          }
        ]
      },
      {
        "heading": "SPARKS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "“The Heart That Drives You Forward”"
          }
        ]
      },
      {
        "heading": "WHAT IS A SPARK?",
        "blocks": [
          {
            "type": "paragraph",
            "text": "ROLEPLAY: A Spark is your personality archetype — the way your character tends to think, feel, and act. It is a roleplaying anchor that rewards a consistent personality without limiting what the character may attempt."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: Every Spark uses two descriptive keywords. Premade Sparks provide their pair automatically; a custom Spark chooses any two from the current Spark Keyword Library."
          },
          {
            "type": "paragraph",
            "text": "DEEDS: When you complete a Deed that aligns with one or both of your Spark keywords, gain the Deed’s normal Experience reward plus [+3] bonus Experience."
          }
        ]
      },
      {
        "heading": "KEYWORD LIBRARY",
        "blocks": [
          {
            "type": "paragraph",
            "text": "These are the descriptive traits drawn from all premade sparks."
          },
          {
            "type": "paragraph",
            "text": "Players creating custom sparks can mix and match any two to define their own archetype."
          },
          {
            "type": "paragraph",
            "text": "The watcher can use these keywords to determine if a deed aligns with a custom spark."
          },
          {
            "type": "paragraph",
            "text": "Keywords: Adaptable, Bold, Cautious, Charming, Compassionate, Creative, Curious, Defiant, Driven, Focused, Hopeful, Independent, Intuitive, Inventive, Playful, Reflective, Steadfast, Studious"
          },
          {
            "type": "paragraph",
            "text": "Creating Your Own Spark"
          },
          {
            "type": "paragraph",
            "text": "If none of the premade sparks fit, build your own."
          },
          {
            "type": "paragraph",
            "text": "Follow this quick process:"
          },
          {
            "type": "paragraph",
            "text": "Name your Spark — a short title that captures your personality (e.g. Mediator, Shadow, Seeker)."
          },
          {
            "type": "paragraph",
            "text": "Choose two keywords from the list above."
          },
          {
            "type": "paragraph",
            "text": "Write a short credo (one sentence) about how you play the game, such as:"
          },
          {
            "type": "paragraph",
            "text": "“Every mystery can be solved.”"
          },
          {
            "type": "paragraph",
            "text": "“Someone has to take the hit.”"
          },
          {
            "type": "paragraph",
            "text": "Share your spark with the watcher to ensure your chosen keywords clearly interact with deeds."
          },
          {
            "type": "paragraph",
            "text": "Deed Interaction: All sparks — premade or custom — trigger their XP bonus when a completed deed aligns with one or both of their keywords."
          }
        ]
      },
      {
        "heading": "PREMADE SPARKS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Each spark includes two keywords that represent its personality archetype. Choose a spark from the list or use them as examples when crafting your own."
          },
          {
            "type": "table",
            "rows": [
              [
                "Spark",
                "Keywords",
                "Description"
              ],
              [
                "Courageous",
                "Bold, Driven",
                "Faces danger head-on and acts before doubt can speak."
              ],
              [
                "Protector",
                "Compassionate, Steadfast",
                "Defends others with quiet resolve and heart-bound duty."
              ],
              [
                "Wanderer",
                "Adaptable, Curious",
                "Finds freedom in change and discovery in every step."
              ],
              [
                "Scholar",
                "Studious, Reflective",
                "Seeks truth before judgment, wisdom before victory."
              ],
              [
                "Healer",
                "Compassionate, Intuitive",
                "Listens deeply, mends wounds seen and unseen."
              ],
              [
                "Fighter",
                "Bold, Focused",
                "Cuts through doubt with clarity and decisive strength."
              ],
              [
                "Trickster",
                "Playful, Defiant",
                "Thrives in chaos, using wit and mischief to turn the tide."
              ],
              [
                "Tinker",
                "Inventive, Creative",
                "Solves problems through imagination and hands-on wonder."
              ],
              [
                "Idealist",
                "Hopeful, Driven",
                "Believes in what could be and fights to make it so."
              ],
              [
                "Spiritual",
                "Intuitive, Reflective",
                "Moves in rhythm with unseen truths and quiet signs."
              ],
              [
                "Artisan",
                "Creative, Focused",
                "Finds beauty in precision and meaning in craft."
              ],
              [
                "Outsider",
                "Independent, Cautious",
                "Trusts their own compass and walks paths few will follow."
              ],
              [
                "Leader",
                "Charming, Driven",
                "Inspires others through vision and fearless will."
              ],
              [
                "Defiant Heart",
                "Defiant, Steadfast",
                "Refuses surrender, even when the storm breaks."
              ],
              [
                "Dreamer",
                "Hopeful, Creative",
                "Sees the world not as it is, but as it might become."
              ],
              [
                "Seeker",
                "Curious, Studious",
                "Pursues knowledge through courage, patience, and grace."
              ],
              [
                "Mediator",
                "Charming, Compassionate",
                "Builds peace with words and empathy in equal measure."
              ],
              [
                "Pioneer",
                "Adaptable, Bold",
                "Walks first into the unknown, trusting the rhythm of change."
              ]
            ]
          }
        ]
      }
    ]
  },
  "homeland": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "HOMELAND"
              ]
            ]
          }
        ]
      },
      {
        "heading": "HOMELANDS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Every soul carries the echo of a place — the scent of its rains, the taste of its wind, the rhythm of what it taught you. A homeland is not where you were born, but what shaped you before you began to wander."
          },
          {
            "type": "paragraph",
            "text": "When you choose your homeland, you choose the lessons carved into your spirit. Each homeland grants [2] skill that reflects life from that place."
          },
          {
            "type": "paragraph",
            "text": "You may also create your own with the watcher’s help, blending ideas or crafting something entirely new."
          }
        ]
      },
      {
        "heading": "CREATING A HOMELAND",
        "blocks": [
          {
            "type": "paragraph",
            "text": "To forge your own homeland, define three parts with the Watcher:"
          },
          {
            "type": "paragraph",
            "text": "Environment: What kind of world raised you — ruin, marsh, city, desert, or something stranger?"
          },
          {
            "type": "paragraph",
            "text": "Culture: What values or instincts were born there — endurance, secrecy, generosity, defiance?"
          },
          {
            "type": "paragraph",
            "text": "Skills: Choose two that fit those lessons. One from the Lore, Might, or Agility tree, and one from Courage or Lore."
          },
          {
            "type": "paragraph",
            "text": "A homeland is not a place on a map. It’s a story the world told you before you were brave enough to tell your own."
          }
        ]
      },
      {
        "heading": "WANDERING ROAD",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Where every mile is a memory and every stranger a story waiting to be told."
          },
          {
            "type": "paragraph",
            "text": "You were raised in motion — under caravan canvas, between windships and wandering kin."
          },
          {
            "type": "paragraph",
            "text": "Every mile carried a new story; every campfire flickered with laughter, barter, and ghost-tales of the next crossing. Your home was not a place but a rhythm — the steady creak of wheels, the song of boots in dust, the smell of spice and rain. You learned that belonging is built through trust, not roots, and that a good story can open more doors than a key."
          },
          {
            "type": "paragraph",
            "text": "Skills: Guile, Charm Optional Replacements: Wayfinding, Tradeskill"
          }
        ]
      },
      {
        "heading": "TIDEWAKE HARBOR",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Where tides trade secrets and the gulls forget no name."
          },
          {
            "type": "paragraph",
            "text": "Salt and song define this restless port, where waves hammer the docks like drums and the gulls never sleep."
          },
          {
            "type": "paragraph",
            "text": "Every street is a gamble of scents — tar, citrus, rum, and the faint sting of sea iron. Sailors brawl beside merchants quoting poetry and smugglers toast beneath shrines of half-forgotten gods. You learned that fortune favors those who act before the tide turns, and that the sea never gives back what it takes willingly."
          },
          {
            "type": "paragraph",
            "text": "Skills: Seeking, Tradeskill Optional Replacements: Lorekeeping (History), Guile"
          }
        ]
      },
      {
        "heading": "ANCIENT TOWERS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Where the past still breathes, and silence hums like power half-remembered."
          },
          {
            "type": "paragraph",
            "text": "The towers rise like broken bones of a forgotten age — glass veins, forgemetal roots, and hollow halls where wind hums through dead wires."
          },
          {
            "type": "paragraph",
            "text": "You grew among them, chasing echoes through corridors of light and shadow. Some say the towers dream; others say they remember. You never decided which was worse. You learned patience in their silence and courage in their ghosts, for curiosity is both a gift and a danger when the past still breathes."
          },
          {
            "type": "paragraph",
            "text": "Skills: Lorekeeping (Ancients), Awareness Optional Replacements: Crafting (Repair), Seeking"
          }
        ]
      },
      {
        "heading": "GLOOMMERE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Where the fog listens closer than the folk who walk it."
          },
          {
            "type": "paragraph",
            "text": "In Gloommere, morning never truly comes — only paler shades of night. The air hums with unseen life, and the marsh grass sways even when the wind is still."
          },
          {
            "type": "paragraph",
            "text": "Here, superstition is survival; every traveler carries charms against reflection and silence. You learned to move like a ghost among the reeds, to listen for what others can’t hear, and to never trust still water."
          },
          {
            "type": "paragraph",
            "text": "Skills: Whisperster, Herbalry Optional Replacements: Awareness, Bondcraft"
          }
        ]
      },
      {
        "heading": "HALERUN FIELDS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Where storms are teachers, not threats, and the sky never stops breathing."
          },
          {
            "type": "paragraph",
            "text": "The world stretches endless beneath a horizon that never stops breathing. Thunder rolls across golden plains, herds rumbling across them, and the wind smells of wet stone and fire."
          },
          {
            "type": "paragraph",
            "text": "To live here is to be small before the vastness — yet you learned to find grace in the run, to measure courage in endurance, and to read the sky as a promise rather than a threat. When you close your eyes, you still see lightning through tall grass."
          },
          {
            "type": "paragraph",
            "text": "Skills: Beastride, Stonegrasp Optional Replacements: Wayfinding, Presence"
          }
        ]
      },
      {
        "heading": "DEEPMARKET",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Where sunlight is a rumor and every secret has a seller."
          },
          {
            "type": "paragraph",
            "text": "Far below the sun, beneath layers of earth and stone the echoing trade tunnels of Deepmarket breathe like a living thing."
          },
          {
            "type": "paragraph",
            "text": "Lamps flicker across winding stalls that sell everything from relics to rumors, and the hum of coin never fades. You grew up learning which smiles hide knives, and which silences hide mercy. Down there, you learned to trade secrets, not gold — and to recognize when the same face greets you twice in a crowd."
          },
          {
            "type": "paragraph",
            "text": "Skills: Shadehand, Guile Optional Replacements: Awareness, Expression"
          }
        ]
      },
      {
        "heading": "REDMIR DUNES",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Where the sand sings, and thirst teaches the price of every breath."
          },
          {
            "type": "paragraph",
            "text": "Sand dunes glow like embers beneath the sun — a vast desert sea where mirages bloom like flowers and vanish with the wind. Nomads follow the whisper of buried rivers and the shimmer of aurora borealis’ of magic."
          },
          {
            "type": "paragraph",
            "text": "You learned to find beauty in scarcity and calm in crisis, and to measure wealth not in coin but in will. Your heartbeat still keeps the rhythm of the desert wind — steady, patient, unyielding."
          },
          {
            "type": "paragraph",
            "text": "Skills: Wayfinding, Stonegrasp Optional Replacements: Crafting (Salvage), Presence"
          }
        ]
      },
      {
        "heading": "EVERSHADE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Where the trees whisper back, and dreams linger after waking."
          },
          {
            "type": "paragraph",
            "text": "Light and dark blend like breath in the endless canopy of Evershade. Lantern-fruit glows where stars cannot reach, and soft wind carries the voices of things half-remembered."
          },
          {
            "type": "paragraph",
            "text": "You grew knowing that every sound means something — the crack of bark, the hum of moss, the sigh of branches shifting in sleep. The forest teaches by reflection: what you give it, it gives back in kind. You learned reverence, patience, and the art of listening when the world goes quiet."
          },
          {
            "type": "paragraph",
            "text": "Skills: Awareness, Lorekeeping (Nature or Spirits) Optional Replacements: Guile, Bondcraft"
          }
        ]
      },
      {
        "heading": "WILLOWSTEAD",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Where every hearthfire is a promise, and every promise has a witness."
          },
          {
            "type": "paragraph",
            "text": "A village of steady hearts and simple miracles. Smoke from hearthfires paints the dusk, and the air carries the sweetness of baking bread and rain-wet soil."
          },
          {
            "type": "paragraph",
            "text": "You learned to work with your hands — to mend fences, heal bruises, and calm tempers as easily as livestock. When hardship came, it came to everyone at once — and was driven off the same way. Willowstead taught you that kindness is not weakness; it’s how the world stays standing."
          },
          {
            "type": "paragraph",
            "text": "Skills: Herbalry, Charm"
          },
          {
            "type": "paragraph",
            "text": "Optional Replacements: Expression, Lorekeeping (Folklore)"
          }
        ]
      },
      {
        "heading": "UNTAMED VERGE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Where the map ends — and the wild writes its own story."
          },
          {
            "type": "paragraph",
            "text": "Here, the map ends. Beyond it stretch wild hills, shattered gods, and storms that walk like beasts. The Verge is a frontier of forgotten magic and unclaimed courage — a place that tests not what you can survive, but what you’re willing to become."
          },
          {
            "type": "paragraph",
            "text": "You grew up where every sunrise felt like a dare, where survival meant risking the unknown to blink first. Those who come from the Verge rarely stay gone for long; the wild calls them home in every thunderclap."
          },
          {
            "type": "paragraph",
            "text": "Skills: Wayfinding, Presence Optional Replacements: Seeking, Stonegrasp"
          }
        ]
      }
    ]
  },
  "oath": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "OATHS"
              ]
            ]
          }
        ]
      },
      {
        "heading": "OATH",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Where faith is belief, oath is action. Your oath defines the moral rhythm your character follows — the vow, law, or principle they hold to even when unseen. It is a reflection of who they are when tested, not when praised."
          },
          {
            "type": "paragraph",
            "text": "An oath does not grant mechanical bonuses or penalties but is a story tool. They inform how a hero acts when torn between choices, how others see them, and how the watcher weaves consequence and growth."
          },
          {
            "type": "paragraph",
            "text": "Upholding or breaking an oath may earn narrative favor, reputation, or story-driven consequence — at the watcher’s discretion."
          }
        ]
      },
      {
        "heading": "CREATING AN OATH",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When creating an oath, define:"
          },
          {
            "type": "paragraph",
            "text": "Voice (optional) — A short phrase or vow that captures its heart."
          },
          {
            "type": "paragraph",
            "text": "Virtue — what it means to live by this Oath."
          },
          {
            "type": "paragraph",
            "text": "Strain — what tempts or tests it."
          }
        ]
      },
      {
        "heading": "ADVENTURER",
        "blocks": [
          {
            "type": "paragraph",
            "text": "“I will meet the unknown with courage, curiosity, and resolve.”"
          },
          {
            "type": "paragraph",
            "text": "Virtue: Step toward the unknown with courage, curiosity, and a willingness to help where the road leads."
          },
          {
            "type": "paragraph",
            "text": "Strain: Fear of the unfamiliar, refusing the call to act, or letting comfort silence curiosity."
          }
        ]
      },
      {
        "heading": "KINSHIP",
        "blocks": [
          {
            "type": "paragraph",
            "text": "“No heart beats alone.”"
          },
          {
            "type": "paragraph",
            "text": "Virtue: Cherish the bonds between companions. Protect the lost, stand with allies, and share burdens without hesitation."
          },
          {
            "type": "paragraph",
            "text": "Strain: Isolation, betrayal, or choosing safety over unity."
          }
        ]
      },
      {
        "heading": "MERCY",
        "blocks": [
          {
            "type": "paragraph",
            "text": "“All wounds can heal, even those unseen.”"
          },
          {
            "type": "paragraph",
            "text": "Virtue: Show compassion, restraint, and forgiveness — even when others cannot."
          },
          {
            "type": "paragraph",
            "text": "Strain: Cruelty, vengeance, or punishing where mercy could mend."
          }
        ]
      },
      {
        "heading": "TRUTH",
        "blocks": [
          {
            "type": "paragraph",
            "text": "“The world turns false only when I do.”"
          },
          {
            "type": "paragraph",
            "text": "Virtue: Seek and speak truth even when it brings pain or loss."
          },
          {
            "type": "paragraph",
            "text": "Strain: Lies, deception, or silence in the face of wrongdoing."
          }
        ]
      },
      {
        "heading": "COURAGE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "“Better to burn bright than fade cold.”"
          },
          {
            "type": "paragraph",
            "text": "Virtue: Act with passion, courage, and purpose; embrace boldness and risk for what matters."
          },
          {
            "type": "paragraph",
            "text": "Strain: Fear, hesitation, or indifference."
          }
        ]
      },
      {
        "heading": "BALANCE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "“For every step forward, one must listen to the earth.”"
          },
          {
            "type": "paragraph",
            "text": "Virtue: Preserve harmony between self, others, and the natural world."
          },
          {
            "type": "paragraph",
            "text": "Strain: Greed, excess, or obsession that upsets the rhythm of things."
          }
        ]
      },
      {
        "heading": "HONOR",
        "blocks": [
          {
            "type": "paragraph",
            "text": "“My word is the weight I carry.”"
          },
          {
            "type": "paragraph",
            "text": "Virtue: Keep promises, act with fairness, and face consequence with dignity."
          },
          {
            "type": "paragraph",
            "text": "Strain: Betrayal, cowardice, or deceit."
          }
        ]
      },
      {
        "heading": "PATIENCE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "“To know is to listen first.”"
          },
          {
            "type": "paragraph",
            "text": "Virtue: Listen first; speak and act with calm awareness."
          },
          {
            "type": "paragraph",
            "text": "Strain: Reckless words, arrogance, or thoughtless haste."
          }
        ]
      },
      {
        "heading": "RENEWAL",
        "blocks": [
          {
            "type": "paragraph",
            "text": "“What is broken can bloom again.”"
          },
          {
            "type": "paragraph",
            "text": "Virtue: Forgive, rebuild, and grow through change or loss."
          },
          {
            "type": "paragraph",
            "text": "Strain: Bitterness, despair, or revenge."
          }
        ]
      },
      {
        "heading": "WILDS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "“Freedom is the truest law.”"
          },
          {
            "type": "paragraph",
            "text": "Virtue: Live by instinct and independence; protect freedom from control or corruption."
          },
          {
            "type": "paragraph",
            "text": "Strain: Submission, tyranny, or domination of others."
          }
        ]
      },
      {
        "heading": "STEADFAST",
        "blocks": [
          {
            "type": "paragraph",
            "text": "“The unseen watches, and I will not turn my eyes.”"
          },
          {
            "type": "paragraph",
            "text": "Virtue: Act with trust in what cannot be proven — instinct, spirit, or sign."
          },
          {
            "type": "paragraph",
            "text": "Strain: Cynicism, disbelief, or mocking the sacred."
          }
        ]
      },
      {
        "heading": "JUSTICE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "“All debts must balance before the dusk.”"
          },
          {
            "type": "paragraph",
            "text": "Virtue: Seek fairness and accountability; protect the innocent, confront the cruel."
          },
          {
            "type": "paragraph",
            "text": "Strain: Vengeance disguised as virtue, or silence in the face of injustice."
          }
        ]
      },
      {
        "heading": "GUARDIAN",
        "blocks": [
          {
            "type": "paragraph",
            "text": "“Between harm and heart, I will stand.”"
          },
          {
            "type": "paragraph",
            "text": "Virtue: Defend the weak, the innocent, or the voiceless."
          },
          {
            "type": "paragraph",
            "text": "Strain: Neglecting those in need or choosing convenience over courage."
          }
        ]
      },
      {
        "heading": "WISDOM",
        "blocks": [
          {
            "type": "paragraph",
            "text": "“Wisdom speaks only when it must.”"
          },
          {
            "type": "paragraph",
            "text": "Virtue: Seek understanding before judgment. Value truth, learning, and patience."
          },
          {
            "type": "paragraph",
            "text": "Strain: Acting without thought, pride in ignorance, or rejecting counsel out of stubbornness."
          }
        ]
      },
      {
        "heading": "SELFLESSNESS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "“Good done unseen still mends the world.”"
          },
          {
            "type": "paragraph",
            "text": "Virtue: Work quietly for the good of others; protect, heal, or act in ways that may never be seen."
          },
          {
            "type": "paragraph",
            "text": "Strain: Deception for selfish gain, secrecy that breeds mistrust, or betrayal."
          }
        ]
      },
      {
        "heading": "INSPIRATION",
        "blocks": [
          {
            "type": "paragraph",
            "text": "“Hope is the flame I leave behind.”"
          },
          {
            "type": "paragraph",
            "text": "Virtue: Uplift others through word, deed, or example; even in hardship and remind the weary that the story is not yet done."
          },
          {
            "type": "paragraph",
            "text": "Strain: Cynicism, despair, or stealing joy from others to shield your own doubt."
          }
        ]
      }
    ]
  },
  "faith": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "FAITH"
              ]
            ]
          }
        ]
      },
      {
        "heading": "FAITH",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Faith is your character’s way of explaining the unseen—why winds rise, why luck turns, why the spirits still whisper. It colors choices, sets boundaries, and invites omens, but has no direct mechanical effect. It’s here to deepen story and give the watcher flavorful hooks."
          },
          {
            "type": "paragraph",
            "text": "You can create your own faith or pick from the list of premade ones. Check with your watcher if your character is using a faith – they might have restrictions."
          }
        ]
      },
      {
        "heading": "CREATING A FAITH",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Name your belief. A title or proverb works (e.g., Stone Remembers, The Skybound Chorus)."
          },
          {
            "type": "paragraph",
            "text": "State its creed in a single sentence."
          },
          {
            "type": "paragraph",
            "text": "Pick 2–3 practices and 1–2 taboos that matter."
          },
          {
            "type": "paragraph",
            "text": "Name a sign the world uses to answer (an animal, a sound, a color, a weather quirk)."
          },
          {
            "type": "paragraph",
            "text": "A conflict hook the Watcher can test."
          }
        ]
      },
      {
        "heading": "KEEPERS OF OLD",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The Keepers of Old venerate the vanished makers known as the Ancients—divine architects who shaped the bones of the world and then disappeared into their own"
          },
          {
            "type": "paragraph",
            "text": "design. To the faithful, every crafted thing is sacred: a bridge, a verse, a spell, a gear."
          },
          {
            "type": "paragraph",
            "text": "They believe that rediscovery is a form of worship, that by studying what was left behind they might rebuild the harmony that once bound magic and meaning together. Temples are part library, part workshop, filled with relic blueprints and luminous diagrams that hum when spoken to."
          },
          {
            "type": "paragraph",
            "text": "Followers of the Keepers, called Archivists, are both scholars and scavengers. They see ruin not as loss but as scripture. The faithful value patience, precision, and the pursuit of understanding over prayer or ritual. When the winds shift through old stone or the stars align over a fallen city, they say the Ancients are whispering. To build, to mend, to learn—these are acts of devotion."
          },
          {
            "type": "paragraph",
            "text": "Creed: Knowledge is sacred; to rebuild the forgotten is to speak with the gods."
          },
          {
            "type": "paragraph",
            "text": "Practices:"
          },
          {
            "type": "paragraph",
            "text": "Reconstruct lost works or relics with care and reverence."
          },
          {
            "type": "paragraph",
            "text": "Record discoveries in illuminated script or diagram."
          },
          {
            "type": "paragraph",
            "text": "Leave offerings of small crafted objects at ruins or crossroads."
          },
          {
            "type": "paragraph",
            "text": "Taboos:"
          },
          {
            "type": "paragraph",
            "text": "Destroying a relic, artifact, or written work."
          },
          {
            "type": "paragraph",
            "text": "Spreading false knowledge or willfully obscuring truth."
          },
          {
            "type": "paragraph",
            "text": "Signs: A low hum through stone, the scent of oil and copper, or a brief shimmer of dust shaped like a rune."
          },
          {
            "type": "paragraph",
            "text": "Conflict Hook: A powerful ruin hides dangerous knowledge—preserve it as holy text or seal it away to protect the living?"
          }
        ]
      },
      {
        "heading": "LAST LIGHT",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Last Light follows Nara, the Pale Shepherd, goddess of endings, mercy, and remembrance. Her faith teaches that death is not an end but a passage, a return to the quiet memory of the world. The veiled clergy walk among the dying, guiding souls and comforting the grieving. To them, the dead are not gone. They linger in the hush of places once loved, in the scent of rain or the flicker of a candle that refuses to die."
          },
          {
            "type": "paragraph",
            "text": "Followers of Nara tend to the forgotten and sanctuaries of rest."
          },
          {
            "type": "paragraph",
            "text": "Their temples are built on crossroads and riverbanks, where paths and currents carry whispers between realms. Offerings are small: a name spoken softly, a crumb of bread for a passing spirit. They say mercy is the only weapon worth wielding, and that to disturb the peace of the grave is to betray memory itself."
          },
          {
            "type": "paragraph",
            "text": "Creed: Mercy guides all endings; death is the quiet return to memory."
          },
          {
            "type": "paragraph",
            "text": "Practices:"
          },
          {
            "type": "paragraph",
            "text": "Speak the names of the departed aloud once each day."
          },
          {
            "type": "paragraph",
            "text": "Leave food or light at grave markers to honor the lost."
          },
          {
            "type": "paragraph",
            "text": "Wash hands in still water before and after tending the dead."
          },
          {
            "type": "paragraph",
            "text": "Taboos:"
          },
          {
            "type": "paragraph",
            "text": "Speaking the name of the dead in anger."
          },
          {
            "type": "paragraph",
            "text": "Desecrating or looting burial grounds."
          },
          {
            "type": "paragraph",
            "text": "Signs: Cold wind carrying the scent of rain, a candle refusing to go out, the brief sound of distant bells."
          },
          {
            "type": "paragraph",
            "text": "Conflict Hook: A restless spirit lingers—do the faithful aid its passing or listen to what unfinished truth it carries?"
          }
        ]
      },
      {
        "heading": "LIVING HARMONY",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The Living Harmony is not a single god but the joined chorus of creation itself. Pyrrh, Vael, Tharn, Loa, and Ryn are the thrones most often invoked, though countless lesser spirits echo their song. To the faithful, the world breathes in chords: flame and tide, wind and soil, each a verse within the greater melody of balance. Every motion, every birth and ruin, is part of that eternal rhythm."
          },
          {
            "type": "paragraph",
            "text": "Followers of Harmony serve as interpreters of this balance. Some live as hermits beside waterfalls or in wind-worn caves, keeping vigil where the elements meet. Others are dancers, singers, or healers who give voice to nature through rituals. When their gatherings reach harmony, it is said even the storms pause to listen. The Living Harmony calls mortals not to rule the world, but to hear it—to mend what is broken in the song and add their own note in time with the earth’s breath."
          },
          {
            "type": "paragraph",
            "text": "Creed: The world is a song; all life must keep the balance of its melody."
          },
          {
            "type": "paragraph",
            "text": "Practices:"
          },
          {
            "type": "paragraph",
            "text": "Offer a spoken thanks before harvesting or killing."
          },
          {
            "type": "paragraph",
            "text": "Sing or hum before entering wild places to announce peace."
          },
          {
            "type": "paragraph",
            "text": "Replant or mend what is taken or broken."
          },
          {
            "type": "paragraph",
            "text": "Taboos:"
          },
          {
            "type": "paragraph",
            "text": "Taking more than one needs."
          },
          {
            "type": "paragraph",
            "text": "Using iron or fire to scar sacred ground."
          },
          {
            "type": "paragraph",
            "text": "Signs: Still air in the midst of storm, animals watching silently, wind moving opposite direction."
          },
          {
            "type": "paragraph",
            "text": "Conflict Hook: A village’s fields threaten a sacred grove—protect nature’s voice or support those seeking to live from it?"
          }
        ]
      },
      {
        "heading": "DEEPFATHER’S COVENANT",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The Deepfather’s Covenant worships the many faces of water: Mareth the Depths, Kelra the Tidequeen, Loen of Wells, and hundreds more. Every stream, spring, and wave is sacred, for water is the memory of the world—it carries all it touches, whispering secrets from one shore to the next. To its followers, life and debt are the same current: what you cast in, you will meet again."
          },
          {
            "type": "paragraph",
            "text": "The Covenant’s temples stand at bridges, fords, and harbors, where the faithful gather to make offerings or cleanse themselves of old guilt. Ceremonies are quiet and fluid, marked by the rhythm of tides or the trickle of pouring cups. Its priests, called Tidemarks, keep records of vows and pacts, believing that every promise weighs upon the world’s flow. To break one is to poison the current of life itself."
          },
          {
            "type": "paragraph",
            "text": "Creed: All debts flow downstream; what you cast into the waters will find you again."
          },
          {
            "type": "paragraph",
            "text": "Practices:"
          },
          {
            "type": "paragraph",
            "text": "Cast coins, trinkets, or bread into rivers when making vows."
          },
          {
            "type": "paragraph",
            "text": "Keep small journals of promises made and fulfilled."
          },
          {
            "type": "paragraph",
            "text": "Wash hands or face before important decisions."
          },
          {
            "type": "paragraph",
            "text": "Taboos:"
          },
          {
            "type": "paragraph",
            "text": "Breaking oaths or lying near running water."
          },
          {
            "type": "paragraph",
            "text": "Polluting a natural spring or stream."
          },
          {
            "type": "paragraph",
            "text": "Signs: Eddies turning against the current, the taste of salt in fresh water, sudden rainfall under clear sky."
          },
          {
            "type": "paragraph",
            "text": "Conflict Hook: A deal sealed at a river’s edge endangers the innocent—honor the vow or break it to save lives?"
          }
        ]
      },
      {
        "heading": "DAWNBORN ORDER",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The Dawnborn Order honors Aurel, the Light That Judges—sunborn god of purity and truth, whose brilliance drives back the dark. To the faithful, every shadow hides a sickness, and every lie is a wound upon the world. Aurel’s gaze is said to pierce all falsehood, revealing what festers beneath. His temples rise where sunlight falls unbroken, their glass halls echoing with prayers for clarity and strength. To walk in his light is to stand exposed, for nothing unclean can survive its warmth."
          },
          {
            "type": "paragraph",
            "text": "Followers of the Order see themselves as stewards of illumination—seekers, healers, and wardens who turn the sun’s mercy upon corruption, curse, and Blight alike. Their rites are solemn and radiant, marked by mirrors, flame, and song. Confession is cleansing, a truth, a holy fire. The Light is law, and in its brilliance, all is laid bare. To serve Aurel is to judge without fear, to cast no shadow, and to bring dawn where darkness endures."
          },
          {
            "type": "paragraph",
            "text": "Creed: Truth is light; to serve Aurel is to banish every shadow."
          },
          {
            "type": "paragraph",
            "text": "Practices:"
          },
          {
            "type": "paragraph",
            "text": "Greet each sunrise with an oath of honesty."
          },
          {
            "type": "paragraph",
            "text": "Burn incense or polished mirrors to reflect sunlight in prayer."
          },
          {
            "type": "paragraph",
            "text": "Confess falsehoods publicly to cleanse deceit."
          },
          {
            "type": "paragraph",
            "text": "Taboos:"
          },
          {
            "type": "paragraph",
            "text": "Lying or concealing truth from another faithful."
          },
          {
            "type": "paragraph",
            "text": "Performing sacred rites after dusk."
          },
          {
            "type": "paragraph",
            "text": "Signs: Reflected sunlight striking a single face, warmth with no source, or a brief flare of gold in one’s vision."
          },
          {
            "type": "paragraph",
            "text": "Conflict Hook: Expose a beloved leader’s lie and tear apart a community—or protect it in the name of peace?"
          }
        ]
      },
      {
        "heading": "ASHEN PATH",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The Ashen Path honors Ashen, the Lost Light, once said to have turned from Aurel’s gaze to seek forgiveness of the truth. Where the Dawnborn Order demands purity before the sun, Ashen’s path teaches that even the stained may shine again. The faithful believe every soul carries its own light, dimmed not by sin but by forgetting the will to mend. To them, reflection is a form of prayer—an act of seeing one’s faults without shame and choosing to rise anew."
          },
          {
            "type": "paragraph",
            "text": "Ashen’s temples are quiet sanctuaries filled with calm light and shallow pools where water mirrors the sky. The faithful gather to speak their failings aloud and vow to amend them, trusting that redemption begins in honest intention. They do not seek to burn away darkness, but to guide it gently toward understanding. To follow Ashen is to believe that mercy kindles strength, and that light, when shared, grows ever brighter."
          },
          {
            "type": "paragraph",
            "text": "Creed: All souls carry their own light; to fall is only to rise wiser."
          },
          {
            "type": "paragraph",
            "text": "Practices:"
          },
          {
            "type": "paragraph",
            "text": "Begin each day with reflection upon one’s failures."
          },
          {
            "type": "paragraph",
            "text": "Write wrongs upon smooth stones, then cast them into water."
          },
          {
            "type": "paragraph",
            "text": "Aid others in mending what they regret."
          },
          {
            "type": "paragraph",
            "text": "Taboos:"
          },
          {
            "type": "paragraph",
            "text": "Passing judgment without first forgiving oneself."
          },
          {
            "type": "paragraph",
            "text": "Refusing a sincere request for forgiveness."
          },
          {
            "type": "paragraph",
            "text": "Signs: Soft light reflected in water, flicker of color from unseen source, warmth on the chest."
          },
          {
            "type": "paragraph",
            "text": "Conflict Hook: A penitent murderer seeks redemption—offer guidance or deny forgiveness for the sake of justice?"
          }
        ]
      },
      {
        "heading": "COURT OF ETHERIUM",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The Court venerates the Etherium—the gods of moons, stars, and wandering planets who rule from their luminous thrones. Each celestial body bears a name and purpose: the Lover’s Moon who guards affection, the Iron Dwarf of war, the Star of Secrets whose light bends truth. Priests of the Court are astronomers and prophets, reading the dance of constellations as divine discourse."
          },
          {
            "type": "paragraph",
            "text": "Worship of the Court is quiet awe beneath the night sky. Faithful pilgrims gather in high places to witness alignments or eclipses, moments when gods are said to speak. The Court offers no mercy or wrath—only knowledge of cycles and consequence. To them, fate is not fixed; it is a dialogue written in starlight, and every mortal choice shifts the pattern."
          },
          {
            "type": "paragraph",
            "text": "Creed: The heavens are many, let their patterns guide one fate."
          },
          {
            "type": "paragraph",
            "text": "Practices:"
          },
          {
            "type": "paragraph",
            "text": "Track celestial movements nightly and record alignments."
          },
          {
            "type": "paragraph",
            "text": "Carry a polished stone or bit of starlit metal as a charm."
          },
          {
            "type": "paragraph",
            "text": "Sleep beneath open sky during eclipses or meteor showers."
          },
          {
            "type": "paragraph",
            "text": "Taboos:"
          },
          {
            "type": "paragraph",
            "text": "Ignoring celestial omens."
          },
          {
            "type": "paragraph",
            "text": "Traveling at night without acknowledging the moons."
          },
          {
            "type": "paragraph",
            "text": "Signs: Stars brightening suddenly, constellations seeming to shift, soft light illuminating paths unexpectedly."
          },
          {
            "type": "paragraph",
            "text": "Conflict Hook: A prophecy reveals a friend’s ruin—warn them and risk fulfilling it, or keep silent and defy the stars?"
          }
        ]
      },
      {
        "heading": "ORIGIN PRIME",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Origin Prime is the mystery of creation given thought. This god—or perhaps the force beyond gods—is said to have designed the world, the Etherium, the Old Ones, and all that moves within. Its followers seek understanding through pattern and principle rather than prayer. Temples are sparse halls etched with geometry, where silence itself is the liturgy. The Origin Prime has no name or none that may be spoken aloud. Its truth dwells in the space between words."
          },
          {
            "type": "paragraph",
            "text": "To devotees, every invention and discovery is revelation, each theorem a hymn. The faithful are not missionaries—they teach by example, building and reasoning until others glimpse the divine structure for themselves. The Origin Prime neither forgives nor condemns; it simply endures. To know it is to see how every soul, every star, is part of a single perfect equation."
          },
          {
            "type": "paragraph",
            "text": "Creed: All creation follows a perfect pattern; to know it is to touch the divine."
          },
          {
            "type": "paragraph",
            "text": "Practices:"
          },
          {
            "type": "paragraph",
            "text": "Draw or inscribe geometric patterns before studying or work."
          },
          {
            "type": "paragraph",
            "text": "Meditate in silence at dawn, listening for the “shape” of thought."
          },
          {
            "type": "paragraph",
            "text": "Record observations of symmetry or logical coincidence."
          },
          {
            "type": "paragraph",
            "text": "Taboos:"
          },
          {
            "type": "paragraph",
            "text": "Speaking the name of the Origin Prime aloud."
          },
          {
            "type": "paragraph",
            "text": "Creating without purpose or structure."
          },
          {
            "type": "paragraph",
            "text": "Signs: Echoing sounds repeating in threes, shadows aligning unnaturally, strange harmony in chaotic noise."
          },
          {
            "type": "paragraph",
            "text": "Conflict Hook: A discovery challenges the faith’s sacred mathematics, reveal the flaw or preserving divine order?"
          }
        ]
      },
      {
        "heading": "THE DREAMTIDE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The Dreamtide is the faith of sleep and vision, the worship of Ephira, Keeper of the Dream Sea. Its followers believe that in slumber, all minds drift together across her waters, where past and future mingle. To dream is to swim in the current of creation, to glimpse what was, is, and may yet come. Temples of The Dreamtide are sanctuaries of rest, painted with constellations of the mind and filled with the hum of whispered songs meant to draw forth vision."
          },
          {
            "type": "paragraph",
            "text": "Priests of Ephira serve as interpreters of dream and omen. They do not demand belief, only openness to possibility. The Dreamtide holds that imagination is a form of truth, and that those who refuse to dream forget how to live. When they sleep, they murmur a blessing: “May you find the shore you seek, and wake with salt upon your lips.”"
          },
          {
            "type": "paragraph",
            "text": "Creed: To dream is to swim in the current of creation, to glimpse what was, is, and may yet come."
          },
          {
            "type": "paragraph",
            "text": "Practices:"
          },
          {
            "type": "paragraph",
            "text": "Record dreams upon waking and share them before dusk."
          },
          {
            "type": "paragraph",
            "text": "Burn herbs that induce restful sleep before prayer."
          },
          {
            "type": "paragraph",
            "text": "Sleep with a shell or token from the sea beneath one’s pillow."
          },
          {
            "type": "paragraph",
            "text": "Taboos:"
          },
          {
            "type": "paragraph",
            "text": "Denying the meaning of another’s dream."
          },
          {
            "type": "paragraph",
            "text": "Sleeping beneath open sky during storm or eclipse."
          },
          {
            "type": "paragraph",
            "text": "Signs: The taste of salt upon waking, whispers in still air, ripples in water without wind."
          },
          {
            "type": "paragraph",
            "text": "Conflict Hook: A dream reveals a coming disaster, speak it and risk panic, or hold it and risk being unheeded?"
          }
        ]
      },
      {
        "heading": "FEASTBOUND COVENANT",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The Feastbound Covenant is the covenant of the Seasonal Lords—Verrin of Spring’s Bloom, Roth of Summer’s Labor, Cairn of Autumn’s Reaping, and Nol of Winter’s Rest. To the faithful, the turning of the year is a sacred wheel, each quarter a chapter in the endless story of life—one that began without them and will endure long after they are gone. Their shrines stand in fields and orchards, where offerings of grain, fruit, and song mark the passing of seasons."
          },
          {
            "type": "paragraph",
            "text": "Communal by nature, the Covenant values balance, generosity, and gratitude. Feasts are holy, and famine is seen as a moral wound upon the land. Every harvest reaffirms the bond between mortal and soil, life and decay. The faithful know that all things return to the earth—and that every seed sown in kindness is a promise renewed."
          },
          {
            "type": "paragraph",
            "text": "Creed: The turning of the seasons binds all life in shared labor and reward."
          },
          {
            "type": "paragraph",
            "text": "Practices:"
          },
          {
            "type": "paragraph",
            "text": "Leave the first fruits or bread of each harvest to the soil."
          },
          {
            "type": "paragraph",
            "text": "Share meals with travelers or the hungry without price."
          },
          {
            "type": "paragraph",
            "text": "Sing seasonal hymns marking sowing, growth, and rest."
          },
          {
            "type": "paragraph",
            "text": "Taboos:"
          },
          {
            "type": "paragraph",
            "text": "Wasting food intentionally."
          },
          {
            "type": "paragraph",
            "text": "Taking a harvest without giving thanks."
          },
          {
            "type": "paragraph",
            "text": "Signs: Unseasonal blooms, a sudden gust carrying the scent of grain, or warmth returning to cold soil."
          },
          {
            "type": "paragraph",
            "text": "Conflict Hook: A drought strikes—hoard the stores to survive or share freely and trust the Covenant to provide?"
          }
        ]
      },
      {
        "heading": "THE WAYWARD PATH",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Not all who seek truth look skyward. Some find it in the dust beneath their feet, the spaces between choices, and the silence that follows them down the road. The Wayward Path belongs to those who trust their own compass over any creed. They walk without temple or tithes, guided only by what feels right when no other voice can tell them so."
          },
          {
            "type": "paragraph",
            "text": "To the Wayward, faith is not a thing of altars or laws—it is motion. It is the act of rising each day and choosing the next step, even when the world offers no map. They say every journey is a conversation with the self, and every mistake is a lesson the road demands you carry."
          },
          {
            "type": "paragraph",
            "text": "Followers of the Wayward Path rarely call themselves such. They are wanderers, hermits, free spirits, and the quietly resolute. Some drift toward kindness, others toward solitude, but all share the belief that the world speaks differently to every soul—and that no truth is false if it is honestly found."
          },
          {
            "type": "paragraph",
            "text": "Creed: The path is its own faith; walk it with intent and let it change you."
          },
          {
            "type": "paragraph",
            "text": "Practices: None prescribed. Each traveler shapes their own rites in the doing—what they build, mend, forgive, or leave behind."
          },
          {
            "type": "paragraph",
            "text": "Taboos: None universal. To walk the Wayward Path is to bear the weight of one’s own choices."
          },
          {
            "type": "paragraph",
            "text": "Signs: None known. Some say coincidence itself is the Wayward’s whisper."
          },
          {
            "type": "paragraph",
            "text": "Conflict Hook: When the road divides between duty and desire, does the Wayward follow their heart—or the echoes of those they left behind?"
          },
          {
            "type": "table",
            "rows": [
              [
                "WATCHER’S NOTE The Wayward Path serves as the default faith for characters who do not choose one or for tables that wish to omit the faith system entirely. It carries no creed, omens, or restrictions, and imposes no narrative expectations. Characters following the Wayward Path are guided solely by their own sense of right and wrong. Their faith is personal interpretation — an open space for the player’s own moral compass. Use this faith to represent self-reliant heroes, doubters, or free spirits who find meaning without divine or cultural guidance. When omens or blessings touch such a character, interpret them as echoes of the world itself — the rhythm of Brambleheart answering not belief, but intent."
              ]
            ]
          }
        ]
      }
    ]
  },
  "species": {
    "sections": [
      {
        "heading": "CHARACTER SPECIES",
        "blocks": []
      }
    ]
  },
  "deeds": {
    "sections": [
      {
        "heading": "DEEDS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Deeds are session-sized goals that reward players for putting their heroes into motion. They can be drawn from a Deeds Deck provided by the Watcher or selected by random percentile roll when a physical deck is not being used."
          },
          {
            "type": "paragraph",
            "text": "At the start of a session, the standard method is to draw [5] Deeds, keep [2], and discard the rest. Using at least [2] Deeds per player each session is recommended so players have meaningful choices without turning the session into a checklist."
          },
          {
            "type": "paragraph",
            "text": "RANDOM ROLLING: When using the table instead of a deck, roll [1d100] for each Deed. Match the result to the percentile range shown on the Deed. Reroll a duplicate if the table would give the same player the same Deed twice."
          },
          {
            "type": "paragraph",
            "text": "When a character completes a Deed, they gain Experience based on its challenge and impact. If the Deed aligns with one or both of their Spark keywords, they gain [+3] bonus Experience in addition to the Deed’s normal reward."
          },
          {
            "type": "paragraph",
            "text": "COMPLETION: Each Deed has two valid paths to completion — narrative or mechanical."
          },
          {
            "type": "paragraph",
            "text": "NARRATIVE COMPLETION: A Deed may be fulfilled through story and character choice at the Watcher’s discretion. If the character’s actions clearly embody the Deed, the Watcher may declare it complete without requiring the listed mechanical objective."
          },
          {
            "type": "paragraph",
            "text": "MECHANICAL COMPLETION: The listed objective provides a clear rules-based way to complete the same Deed through rolls, Abilities, or defined actions."
          }
        ]
      },
      {
        "heading": "DEEDS LIST",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Participation Trophy Act with purpose, even in the smallest challenge Objective (Mechanical): Win one Active Target Roll of any kind. Reward: +1 XP Keywords: Driven, Focused"
          },
          {
            "type": "paragraph",
            "text": "Skill of the Day Apply your craft or insight to change an outcome. Objective (Mechanical): Succeed at a Medium or higher Passive Skill Roll. Reward: +2 XP Keywords: Studious, Curious"
          },
          {
            "type": "paragraph",
            "text": "Voice of the Table Influence the group through story, counsel, or expression. Objective (Mechanical): Use a non-combat Skill unique to your character during a social or exploration scene. Reward: +3 XP Keywords: Charming, Creative"
          },
          {
            "type": "paragraph",
            "text": "Brush with Fate Choose the harder path to prove your resolve. Objective (Mechanical): When asked to make a Medium or Easy Passive Roll, raise the difficulty to Hard and succeed. Reward: +5 XP Keywords: Bold, Defiant"
          },
          {
            "type": "paragraph",
            "text": "Steady Hand"
          },
          {
            "type": "paragraph",
            "text": "Stay calm and deliberate in a moment of chaos. Objective (Mechanical): Roll two exceptional results (8+) on the same check. Reward: +3 XP Keywords: Focused, Steadfast"
          },
          {
            "type": "paragraph",
            "text": "Heart of the Party Inspire unity or compassion through words or kindness. Objective (Mechanical): Use a Heart-based Skill (Charm, Presence, Expression, or Guile) to shift an NPC’s or group’s attitude. Reward: +3 XP Keywords: Charming, Compassionate"
          },
          {
            "type": "paragraph",
            "text": "Calculated Edge Outsmart danger with timing or cunning. Objective (Mechanical): Succeed on an Edged Roll against an Active or Medium+ Passive Target. Reward: +3 XP Keywords: Clever, Focused"
          },
          {
            "type": "paragraph",
            "text": "Wild Wanderer Discover or interpret something hidden in the wild. Objective (Mechanical): Succeed at a Lore, Awareness, or Wayfinding roll against a Medium or higher Passive Target. Reward: +1 XP Keywords: Curious, Adaptable"
          },
          {
            "type": "paragraph",
            "text": "Spark of Insight Perceive a hidden truth that changes the course of events. Objective (Mechanical): Reveal meaningful information through a Lore or Seeking roll. Reward: +1 XP Keywords: Intuitive, Studious"
          },
          {
            "type": "paragraph",
            "text": "Brushfire Courage Confront fear for the sake of another’s safety. Objective (Mechanical): Take an action that places you in danger to protect another. Reward: +2 XP Keywords: Bold, Compassionate"
          },
          {
            "type": "paragraph",
            "text": "Steadfast Resolve Refuse to yield against hardship or fear. Objective (Mechanical): Resist or end an ongoing effect using an Attribute Save. Reward: +2 XP Keywords: Steadfast, Driven"
          },
          {
            "type": "paragraph",
            "text": "Tinker’s Triumph Build or restore something meaningful to the story. Objective (Mechanical): Craft, repair, or modify an item or structure successfully. Reward: +1 XP Keywords: Creative, Inventive"
          },
          {
            "type": "paragraph",
            "text": "Hope in the Ashes Encourage an ally to try again after failure. Objective (Mechanical): Recover from a failed roll through teamwork or inspiration. Reward: +2 XP Keywords: Hopeful, Compassionate"
          },
          {
            "type": "paragraph",
            "text": "Measured Breath Act with patience and thoughtfulness amid pressure. Objective (Mechanical): Complete two successful Weighted Rolls in one session. Reward: +3 XP Keywords: Cautious, Focused"
          },
          {
            "type": "paragraph",
            "text": "Inventor’s Spark Innovate your way past a limit or obstacle. Objective (Mechanical): Combine two items, tools, or abilities to solve a challenge. Reward: +2 XP Keywords: Inventive, Creative"
          },
          {
            "type": "paragraph",
            "text": "Gentle Guardian Place another’s well-being before your own. Objective (Mechanical): Prevent or reduce harm to an ally through a save, heal, or ability. Reward: +1 XP Keywords: Compassionate, Steadfast"
          },
          {
            "type": "paragraph",
            "text": "Quiet Observer Observe instead of acting, learning what others miss. Objective (Mechanical): Use Awareness or Lorekeeping to uncover a hidden detail that changes a scene. Reward: +1 XP Keywords: Cautious, Reflective"
          },
          {
            "type": "paragraph",
            "text": "Pathfinder’s Mark Lead others safely through uncertainty. Objective (Mechanical): Guide the party to a location or resource through skill or intuition. Reward: +2 XP Keywords: Adaptable, Independent"
          },
          {
            "type": "paragraph",
            "text": "Flicker of Faith Stay true to your ideals when others doubt. Objective (Mechanical): Persevere through a conflict involving your oath or faith. Reward: +3 XP Keywords: Hopeful, Reflective"
          },
          {
            "type": "paragraph",
            "text": "Rebel’s Smile Defy authority or expectation for freedom or truth. Objective (Mechanical): Take a creative or risky approach that changes an encounter’s flow. Reward: +1 XP Keywords: Defiant, Independent"
          },
          {
            "type": "paragraph",
            "text": "Scholar’s Patience Dedicate yourself to learning before acting. Objective (Mechanical): Gather three or more pieces of related information through research or observation. Reward: +3 XP Keywords: Studious, Cautious"
          },
          {
            "type": "paragraph",
            "text": "Trickster’s Turn Transform setback into opportunity with humor or wit. Objective (Mechanical): Turn a disadvantage (negative condition or failure) into a benefit. Reward: +2 XP Keywords: Playful, Defiant"
          },
          {
            "type": "paragraph",
            "text": "Lone Path Choose independence over comfort or safety. Objective (Mechanical): Succeed at a roll without assistance when help was available. Reward: +2 XP Keywords: Independent, Driven"
          },
          {
            "type": "paragraph",
            "text": "Silent Strength Show restraint or mercy when power was yours to take. Objective (Mechanical): End a combat encounter without any final blows. Reward: +2 XP Keywords: Compassionate, Cautious"
          },
          {
            "type": "paragraph",
            "text": "Mind Like Water Find clarity amid confusion or temptation. Objective (Mechanical): Overcome a magical or mental compulsion through a save or insight. Reward: +2 XP Keywords: Reflective, Intuitive"
          },
          {
            "type": "paragraph",
            "text": "Boundless Heart Share strength selflessly across the group. Objective (Mechanical): Heal, restore, or inspire three or more allies in a single scene. Reward: +3 XP Keywords: Compassionate, Hopeful"
          },
          {
            "type": "paragraph",
            "text": "Trailblazer Take initiative before others dare. Objective (Mechanical): Be the first to act successfully in a scene or combat round. Reward: +2 XP Keywords: Bold, Driven"
          },
          {
            "type": "paragraph",
            "text": "Wise Fool Use levity to heal or reframe conflict."
          },
          {
            "type": "paragraph",
            "text": "Objective (Mechanical): Defuse tension or danger through humor or charm. Reward: +2 XP Keywords: Playful, Charming"
          },
          {
            "type": "paragraph",
            "text": "Tether of Trust Strengthen a relationship through loyalty or Objective (Mechanical): Aid or protect an ally using a teamwork roll or shared ability. cooperation. Reward: +1 XP Keywords: Steadfast, Compassionate"
          },
          {
            "type": "paragraph",
            "text": "Vision in Shadow Use intuition to reveal meaning beyond sight. Objective (Mechanical): Spot or interpret a hidden clue before others act. Reward: +2 XP Keywords: Intuitive, Curious"
          },
          {
            "type": "paragraph",
            "text": "Master of the Moment Balance patience, precision, and action across challenges. Objective (Mechanical): Succeed on three different Passive Skill Rolls in one session. Reward: +4 XP Keywords: Focused, Driven"
          }
        ]
      }
    ]
  },
  "talents": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "TALENTS"
              ]
            ]
          }
        ]
      },
      {
        "heading": "TALENTS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Talents are practiced gifts, hard-earned techniques, and instinctive advantages that modify Core Actions or resolve from their own Triggers."
          }
        ]
      },
      {
        "heading": "ANCHOR SPIRIT",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your presence steadies those who falter."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] Mana\nTRIGGER: When an ally within [3] squares fails an Attribute Save.\nEFFECT: That ally may reroll the Attribute Save with condition [-1]. They must use the new result.\nKEYWORDS: REACTIVE | TALENT"
          }
        ]
      },
      {
        "heading": "BATTLEBANE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You trust your body’s rhythm over the mind’s delay."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] Mana\nTRIGGER: When an enemy within [3] squares uses a Combat ability with a declared target.\nEFFECT: Move up to [2] squares toward that enemy. If you end adjacent to them, gain condition [+1] to your next Strike against that enemy until the end of the round.\nKEYWORDS: REACTIVE | TALENT"
          }
        ]
      },
      {
        "heading": "BEASTGRASP",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You wield impossible weight as if born to it."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: You may wield one two-handed weapon in each hand. While doing so, suffer condition [-3] to physical Strike rolls and condition [-2] to Ward rolls.\nKEYWORDS: PASSIVE | TOUCH | TALENT"
          }
        ]
      },
      {
        "heading": "BLADE TEMPO",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your movements flow between strike and evasion, like wind through tall grass."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: While wielding a one-handed weapon in each hand and wearing light armor, gain condition [+1] to Ward rolls. During the first round of an encounter, enemies also suffer condition [-1] to Strike rolls made against you.\nREQUIRES: Bond Of Blades Talent\nKEYWORDS: PASSIVE | TALENT"
          }
        ]
      },
      {
        "heading": "BLOOD OATH",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your promise binds tighter than steel."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] Mana\nTRIGGER: When you or an ally within [3] squares would suffer [2] or more Lethal damage.\nEFFECT: Split that Lethal damage evenly between you and that ally. If the damage cannot be divided evenly, the triggering character suffers the remaining damage.\nREQUIRES: Hare’s Luck Talent\nKEYWORDS: REACTIVE | TALENT"
          }
        ]
      },
      {
        "heading": "BOND OF BLADES",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your blades weave one thought through two motions."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: While wielding a one-handed weapon in each hand, gain condition [+1] to melee Strike rolls.\nKEYWORDS: PASSIVE | TOUCH | TALENT"
          }
        ]
      },
      {
        "heading": "BREAKGRIP",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your strikes are a blur of precision and deception."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When using Melee Strike against an enemy wielding a weapon.\nEFFECT: If your TO HIT result exceeds the target’s Ward result by [5+] and the Strike successfully deals damage, knock one weapon they are wielding into a square of your choice within [2] squares.\nPICK UP: A character may retrieve the weapon by moving within, into, or through [1] square of its location.\nKEYWORDS: PASSIVE | TOUCH | TALENT"
          }
        ]
      },
      {
        "heading": "CURRENT OVERFLOW",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When power runs too shallow, the current bites back."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: After resolving an empowered single-target spell that successfully deals [2] or less total damage after reductions.\nEFFECT: The target suffers [2] Lethal damage and you restore [1] Mana.\nRESTRICTIONS: Apply this effect after all other damage and damage reductions from the spell.\nKEYWORDS: REACTIVE | MAGIC | TALENT"
          }
        ]
      },
      {
        "heading": "EVADING RETREAT",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You turn your shield as you withdraw, letting defense and motion become one."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When a Combat ability targeting you misses while you are wielding a shield.\nEFFECT: Move up to [3] squares.\nRESTRICTIONS: This movement cannot end within [2] squares of an enemy unless another rule allows it.\nKEYWORDS: REACTIVE | TALENT"
          }
        ]
      },
      {
        "heading": "CLEAVE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "One swing splits the battle wide."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] Mana\nTRIGGER: Successfully dealing damage with Melee Strike.\nEFFECT: Move up to [1] square and make an additional melee Strike against a second enemy.\nRESTRICTIONS: You cannot target the same enemy more than once with this effect.\nKEYWORDS: TOUCH | TALENT"
          }
        ]
      },
      {
        "heading": "FIELDCRAFT",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You refine one discipline until every motion in it cuts true."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Choose one roll type when you take this Talent: Strike, Ward, Skill, or Attribute Save. When making that type of roll, an Exceptional Result is achieved on [7+].\nRESTRICTIONS: You may take this Talent up to four times, choosing a different roll type each time.\nKEYWORDS: PASSIVE | TALENT"
          }
        ]
      },
      {
        "heading": "FIELD MEDIC",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You’ve learned where to press, when to bind, and how to keep hearts beating in the chaos of battle."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] Mana\nTRIGGER: When a character within [3] squares suffers damage.\nEFFECT: Restore [+1] Health to that character after the triggering damage is resolved.\nKEYWORDS: REACTIVE | TALENT"
          }
        ]
      },
      {
        "heading": "FORESIGHT",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You move as if the world itself warns you before danger strikes."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When an effect requires you to Renew the Heart.\nEFFECT: Gain condition [+1] to that Attribute Save. If you succeed, gain condition [+1] to your next Strike roll before the end of your next turn.\nKEYWORDS: PASSIVE | TALENT"
          }
        ]
      },
      {
        "heading": "GUARDBREAKER",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You’ve turned defense into offense, driving the rim of your shield into your foe with brutal precision."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: Successfully dealing damage with Melee Strike while wielding a shield.\nEFFECT: Force the target [1] square directly away from you and deal [1] Lethal damage to them.\nKEYWORDS: PASSIVE | TOUCH | TALENT"
          }
        ]
      },
      {
        "heading": "HAMMERFALL",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your strikes land with unrelenting ferocity, every swing a promise of ruin."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When using Melee Strike while wielding a single two-handed weapon.\nEFFECT: On an Exceptional Result [8+], increase the total damage dealt by [+3].\nOPEN DEFENCE: Reduce your Ward and Guts by [-3] until the start of your next turn.\nREQUIRES: Warhowl Talent\nKEYWORDS: PASSIVE | TOUCH | TALENT"
          }
        ]
      },
      {
        "heading": "HARE’S LUCK",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The world seems to pause, and you fall just outside of ruin’s reach."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] Mana\nTRIGGER: When you would suffer Lethal damage.\nEFFECT: Reduce the total Lethal damage by [-1].\nKEYWORDS: REACTIVE | TALENT"
          }
        ]
      },
      {
        "heading": "HEARTH TOUCH",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your spirit leaves traces of its light in every working."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When you cast a spell that restores Health or grants an Enhance.\nEFFECT: One character affected by that spell gains condition [+1] to their next Attribute Save.\nKEYWORDS: PASSIVE | MAGIC | TALENT"
          }
        ]
      },
      {
        "heading": "HEARTSEEKER",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your eyes find the smallest openings, and your arrows never forget them."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] Mana\nTRIGGER: When using Range Strike.\nEFFECT: Reduce the range of the weapon used for that Range Strike by [3] squares. If the Range Strike successfully deals damage, increase its total damage by [+2].\nKEYWORDS: SHOOT | TALENT"
          }
        ]
      },
      {
        "heading": "HEARTHWALL",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You fight shoulder to shoulder with your allies to form an unbroken wall."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: While you are within [1] square of an ally and both characters are wielding shields.\nEFFECT: You and that ally gain condition [+1] to Ward rolls against Shoot and Magic abilities.\nRESTRICTIONS: A character cannot be affected by multiple instances of this effect.\nKEYWORDS: PASSIVE | TALENT"
          }
        ]
      },
      {
        "heading": "HEAVY DRAW",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You steady your breath and commit every ounce of focus to a single devastating shot."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] Mana\nTRIGGER: When using Range Strike.\nEFFECT: Apply the effect of Breakgrip to that Range Strike.\nRESTRICTIONS: Long Range cannot be used with this Range Strike.\nREQUIRES: Breakgrip Talent\nKEYWORDS: SHOOT | TALENT"
          }
        ]
      },
      {
        "heading": "HEROIC SURGE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Before impact is not hesitation — it is the gathering of every heartbeat into one unstoppable step."
          },
          {
            "type": "paragraph",
            "text": "COST: [2] Mana\nTRIGGER: When using Hero’s Charge.\nEFFECT: Increase the movement granted by Hero’s Charge by [+1] square and increase its damage bonus by [+1]. If you move at least half the movement granted by Hero’s Charge and then successfully deal damage to its target this turn, force that target [1] square directly away from you and deal [1] Lethal damage. If the target cannot be moved, deal [1] additional Lethal damage instead.\nKEYWORDS: MOVE | TALENT"
          }
        ]
      },
      {
        "heading": "HOLLOWING CLAW",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You strike from silence, instinct, or distraction — the heart always finds the gap."
          },
          {
            "type": "paragraph",
            "text": "COST: [2] Mana\nTRIGGER: When using Melee Strike against an enemy that is also within [2] squares of one of your allies.\nEFFECT: If the Melee Strike successfully deals damage, increase its total damage by [+1]. Increase this bonus by another [+1] for every [2] ranks of Agility you have.\nRESTRICTIONS: You must be wielding a melee weapon.\nKEYWORDS: TOUCH | TALENT"
          }
        ]
      },
      {
        "heading": "HUNTER’S MARK",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Every shot you loose follows intent more than aim."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When a ranged Strike achieves an Exceptional Result [8+].\nEFFECT: Increase the total damage by [+1]. If the weapon deals Lethal damage, increase the total damage by [+2] instead.\nKEYWORDS: PASSIVE | SHOOT | TALENT"
          }
        ]
      },
      {
        "heading": "IRONHIDE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your body moves in concert with metal and mail."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Reduce Mana Syphon and Speed penalties applied by equipped armor by [1].\nARMOR MASTERY: You may take this Talent up to [3] times. Each time, increase the reduction by [+1].\nKEYWORDS: PASSIVE | TALENT"
          }
        ]
      },
      {
        "heading": "IRON WILL",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You refuse to fall even when your body fails you."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When you are reduced to [0] Health.\nEFFECT: After fully resolving the triggering effect, restore your Health to [1].\nCOOLDOWN: This Talent cannot be used again for [1d10/2+2] rounds.\nKEYWORDS: REACTIVE | TALENT"
          }
        ]
      },
      {
        "heading": "JUMPSTART",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your instincts fire before your mind can act — motion born of pure reflex."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Your Initiative roll is Edged.\nKEYWORDS: PASSIVE | TALENT"
          }
        ]
      },
      {
        "heading": "KEEN EDGE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You fight by instinct and trained judgment, turning precision into rhythm."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: Before making a roll.\nEFFECT: You may make that roll Edged. If you do, your next roll of any type is Weighted.\nCOOLDOWN: This Talent cannot be used again for [1d10/2+1] rounds.\nKEYWORDS: REACTIVE | TALENT"
          }
        ]
      },
      {
        "heading": "MAGEBANE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You sense the rhythm of spellcraft and close the distance before it completes."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] Mana\nTRIGGER: When an enemy within [3] squares uses a Magic ability with a declared target.\nEFFECT: Move up to [2] squares toward the caster. If you end adjacent to them, they lose [1] Mana.\nKEYWORDS: REACTIVE | TALENT"
          }
        ]
      },
      {
        "heading": "OATH GUARD",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You stand between the strike and its mark."
          },
          {
            "type": "paragraph",
            "text": "COST: [2] Mana\nTRIGGER: When an ally within [3] squares would suffer damage that reduces them to [0] Health.\nEFFECT: Reduce that damage by [-3]. You then suffer [3] Lethal damage.\nKEYWORDS: REACTIVE | TALENT"
          }
        ]
      },
      {
        "heading": "PACK TACTICS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You move where allies move — a rhythm born of shared survival."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When an ally within [3] squares moves as part of a Combat ability.\nEFFECT: Move up to [1] square. If you end within [1] square of that ally, you both gain condition [+1] to your next Strike roll against the enemy targeted by the triggering Combat ability until the end of the round.\nKEYWORDS: REACTIVE | TALENT"
          }
        ]
      },
      {
        "heading": "PAIR SHOT",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You loose arrows in seamless rhythm, each following the breath before it."
          },
          {
            "type": "paragraph",
            "text": "COST: [2] Mana\nTRIGGER: When using Range Strike.\nDECLARE: Choose a second legal enemy within the weapon’s normal range.\nEFFECT: Resolve a separate TO HIT roll against each target using the same weapon. Each successful Strike deals the Range Strike’s normal damage.\nRESTRICTIONS: Long Range cannot be used for either target.\nKEYWORDS: SHOOT | TALENT"
          }
        ]
      },
      {
        "heading": "POUNCER",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You never waste the instant between defense and attack."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When an enemy within [3] squares fails a Ward roll.\nEFFECT: Gain condition [+1] to your next Strike roll against that enemy until the end of the round.\nKEYWORDS: REACTIVE | TALENT"
          }
        ]
      },
      {
        "heading": "PULSE OF ATTUNEMENT",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You learn to quiet your body and open your spirit to the flow of Mana around you."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When the first spell you cast each round from your attuned Lore is successful.\nEFFECT: Restore [1] Mana.\nKEYWORDS: PASSIVE | MAGIC | TALENT"
          }
        ]
      },
      {
        "heading": "QUICK CAST",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You’ve learned to loose energy with a thought, not a gesture."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When using Arcane Command, before paying the chosen spell’s Mana cost.\nEFFECT: Reduce that spell’s Mana cost by [-2]. If you do, increase the Mana cost of the next spell you cast by [+3].\nRESTRICTIONS: An ordinary spell’s final Mana cost cannot be reduced below [1].\nCOOLDOWN: This Talent cannot be used again for [1d10/2+1] rounds.\nKEYWORDS: MAGIC | TALENT"
          }
        ]
      },
      {
        "heading": "RAGEBOUND",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Rage becomes rhythm; pain becomes purpose."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] Mana\nTRIGGER: When using the Focused Will Core Action at the start of the round.\nEFFECT: Gain condition [+1] to Strike rolls and [+1] to damage until the end of the round.\nDEFENSELESS: Until the end of the round, your Ward and Guts are each reduced by [-1].\nKEYWORDS: INSTINCT | TALENT"
          }
        ]
      },
      {
        "heading": "RAMHORN",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your shield drives forward like a wall in motion, scattering your foes and shielding your advance."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] Mana\nTRIGGER: When using Hero’s Charge while wielding a shield.\nEFFECT: If you successfully deal damage to the target of Hero’s Charge this turn, force them [1] square directly away from you. If they move, deal [1] Lethal damage. If they cannot be moved, deal [2] Lethal damage instead.\nREQUIRES: Guardbreaker Talent\nKEYWORDS: MOVE | TALENT"
          }
        ]
      },
      {
        "heading": "RHYTHM OF BLADES",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You fight with a rhythm few can follow — one hand finishing what the other begins."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: While wielding a one-handed weapon in each hand, increase damage successfully dealt by Melee Strike by [+1].\nREQUIRES: Bond Of Blades Talent\nKEYWORDS: PASSIVE | TOUCH | TALENT"
          }
        ]
      },
      {
        "heading": "ROOTED PAWS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You seize control of every struggle, bending your foe’s strength against them."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When you use the Grapple ability or are the target of the Grapple ability.\nEFFECT: Gain condition [+2] to Grapple rolls and apply condition [-2] to the opposing Grapple roll.\nKEYWORDS: COMBAT | PHYSICAL | TALENT"
          }
        ]
      },
      {
        "heading": "SECOND CHANCES",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You’ve learned to let thoughts move like water — nothing can hold."
          },
          {
            "type": "paragraph",
            "text": "COST: [2] Mana\nTRIGGER: When you fail an Attribute Save.\nEFFECT: Reroll the Attribute Save with condition [-1]. You must use the new result.\nKEYWORDS: REACTIVE | TALENT"
          }
        ]
      },
      {
        "heading": "SHADOW FANG",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You move through blind spots, turning every ally’s distraction into your opportunity."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When an ally within [3] squares uses a Combat ability against an enemy within [3] squares of you.\nEFFECT: Move up to [1] square toward that enemy. If your next Melee Strike before the end of your next turn successfully deals damage to that enemy, deal [1] additional Lethal damage.\nREQUIRES: Hollowing Claw Talent\nKEYWORDS: REACTIVE | TALENT"
          }
        ]
      },
      {
        "heading": "SHIELD HAND",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You train your off-hand to move the Sapguard as easily as a second blade, letting its weight turn with your strikes rather than hinder them."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: When wielding a Sapguard while holding a weapon in each hand, you no longer suffer its [-1] penalty to melee and ranged Strike rolls.\nKEYWORDS: PASSIVE | TALENT"
          }
        ]
      },
      {
        "heading": "SKILLCRAFT",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The steady hand refines what instinct begins."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Choose [1] Skill you know with at least one Rank. Gain condition [+1] to Skill rolls using that Skill.\nRESTRICTIONS: You may take this Talent up to four times, choosing a different Skill each time.\nREQUIRES: Fieldcraft Talent\nKEYWORDS: PASSIVE | TALENT"
          }
        ]
      },
      {
        "heading": "SNAPSTEP",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your hand moves before thought — a blur that catches the first beat of battle."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] Mana\nTRIGGER: When using the Focused Will or Channel the Winds Core Action at the start of the round.\nEFFECT: Move up to [2] squares.\nRESTRICTIONS: This movement cannot end within [2] squares of an enemy.\nKEYWORDS: INSTINCT | TALENT"
          }
        ]
      },
      {
        "heading": "SPELL BREAKER",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The hum of magic finds no purchase in your iron will."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Gain condition [+1] to Ward rolls against spells and Magic abilities. When you succeed on such a Ward roll, restore [1] Mana.\nKEYWORDS: PASSIVE | TALENT"
          }
        ]
      },
      {
        "heading": "SPELL CLEAVE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your strike cuts through the threads of magic still clinging to your foe."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] Mana\nTRIGGER: Successfully dealing damage with Melee Strike to an enemy that has cast an Enhance or Hex spell this round.\nEFFECT: Choose one Enhance or Hex spell cast by that enemy this round and end its effects immediately. If there is no eligible spell to end, deal [2] Lethal damage to that enemy instead.\nKEYWORDS: TOUCH | TALENT"
          }
        ]
      },
      {
        "heading": "SPELLFORGE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You read the world’s magic through patterns others overlook."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When a spell cast through Arcane Command is successful.\nEFFECT: Choose one: restore [1] Mana, or gain condition [+2] to the TO HIT roll of the next spell you cast before the end of the round.\nKEYWORDS: MAGIC | TALENT"
          }
        ]
      },
      {
        "heading": "SPELLWINDS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You’ve learned to weave motion and current into your casting."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When a spell cast through Arcane Command is successful.\nEFFECT: Move up to [2] squares.\nRESTRICTIONS: This movement cannot end within [2] squares of an enemy unless another rule allows it.\nKEYWORDS: MAGIC | TALENT"
          }
        ]
      },
      {
        "heading": "STEELWEAVER",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You channel magic through the weight of steel."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When a spell or Magic ability that costs Mana successfully deals damage or applies an effect to another character.\nEFFECT: Gain condition [+1] to your next Ward roll.\nKEYWORDS: PASSIVE | MAGIC | TALENT"
          }
        ]
      },
      {
        "heading": "STONEBLOOD",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your body is a fortress of will and endurance."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Increase your maximum Health by [+2].\nFORTIFIED: You may take this Talent a second time. If you do, increase your maximum Health by an additional [+3].\nKEYWORDS: PASSIVE | TALENT"
          }
        ]
      },
      {
        "heading": "STILLROOT",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You are the line that does not fall."
          },
          {
            "type": "paragraph",
            "text": "COST: [2] Mana\nTRIGGER: When you are targeted by a Combat ability that requires a Ward roll.\nEFFECT: Gain condition [+3] to that Ward roll. If the ability misses, move up to [2] squares after it resolves.\nRESTRICTIONS: This movement cannot end within [2] squares of an enemy.\nKEYWORDS: REACTIVE | TALENT"
          }
        ]
      },
      {
        "heading": "SURE HAND",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Weapons are extensions of your intent — no motion wasted."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Choose one weapon type when you take this Talent: blade, hammer, spear, or bow. While wielding that type, gain condition [+1] to Strike rolls.\nKEYWORDS: PASSIVE | TALENT"
          }
        ]
      },
      {
        "heading": "THREADSEER",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You link spellwork together in seamless rhythm."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: After a spell cast through Arcane Command is successful.\nEFFECT: You may cast one additional known non-Signature spell as part of the same Arcane Command. Increase that spell’s Mana cost by [+4].\nCOOLDOWN: This Talent cannot be used again for [1d10/2+1] rounds.\nKEYWORDS: MAGIC | TALENT"
          }
        ]
      },
      {
        "heading": "THUNDEROUS CHARGE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your momentum pierces armor and resolve alike."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When using Hero’s Charge while wielding a weapon with the Penetration quality.\nEFFECT: If you successfully deal damage to the target of Hero’s Charge this turn, deal [2] Lethal damage to that target. If a different enemy is adjacent to the target, deal [1] Lethal damage to that enemy.\nKEYWORDS: MOVE | TALENT"
          }
        ]
      },
      {
        "heading": "TITAN’S WAKE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Two great weapons become an avalanche of destruction in your hands."
          },
          {
            "type": "paragraph",
            "text": "COST: [2] Mana\nTRIGGER: When using Melee Strike while wielding [2] two-handed weapons.\nEFFECT: Roll [1d10/2+1] and add the result to the total damage dealt by that Melee Strike.\nREQUIRES: Beastgrasp Talent\nKEYWORDS: TOUCH | TALENT"
          }
        ]
      },
      {
        "heading": "TURNSTRIKE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Precision guides every motion — defense and strike flow in the same breath."
          },
          {
            "type": "paragraph",
            "text": "COST: [2] Mana\nTRIGGER: When you are targeted by a Combat ability while wielding only a one-handed weapon and no shield.\nEFFECT: Increase your Ward against that ability by half the damage value of the weapon you are wielding.\nKEYWORDS: REACTIVE | TALENT"
          }
        ]
      },
      {
        "heading": "TWIN LINKED",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your motion is seamless, each hand echoing the rhythm of the other."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] Mana\nTRIGGER: When using Melee Strike while wielding a one-handed weapon in each hand.\nEFFECT: For that TO HIT roll, reroll each natural die result of [2] or lower once and use the new result.\nREQUIRES: Bond Of Blades Talent\nKEYWORDS: TOUCH | TALENT"
          }
        ]
      },
      {
        "heading": "UNDYING RESOLVE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your will endures beyond flesh."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Gain condition [+1] to Attribute Saves against Compelled effects. When you succeed on an Attribute Save against a Compelled effect, restore [+1] Health.\nKEYWORDS: PASSIVE | TALENT"
          }
        ]
      },
      {
        "heading": "VICTORY ROAR",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A single success ignites the will of those nearby."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When you reduce an enemy to [0] Health.\nEFFECT: Allies within [3] squares gain condition [+1] to their next Attribute Save or Ward roll, whichever occurs first.\nKEYWORDS: PASSIVE | TALENT"
          }
        ]
      },
      {
        "heading": "WARD GUARD",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your shield shifts with the rhythm of each strike, turning force aside before it finds you."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: A shield you wield no longer grants its Guts bonus. Instead, add half of that bonus to your Ward rolls.\nKEYWORDS: PASSIVE | TALENT"
          }
        ]
      },
      {
        "heading": "WARHOWL",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You drive forward with reckless conviction, turning pain into power."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] Mana\nTRIGGER: When using Melee Strike.\nEFFECT: You may suffer [2] Lethal damage. If you do, choose either condition [+2] to that Melee Strike’s TO HIT roll or [+2] to its total damage.\nKEYWORDS: TOUCH | TALENT"
          }
        ]
      },
      {
        "heading": "WARPATH",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You move through the fray like a storm given form, each strike feeding the next."
          },
          {
            "type": "paragraph",
            "text": "COST: [2] Mana\nTRIGGER: Successfully dealing damage with the additional Strike granted by Wildchain.\nEFFECT: Move up to [1] square and make one additional melee Strike against a different enemy with condition [-4] to the TO HIT roll.\nRESTRICTIONS: The target cannot have been targeted by the triggering Melee Strike, Cleave, or Wildchain.\nREQUIRES: Wildchain Talent\nKEYWORDS: PASSIVE | TOUCH | TALENT"
          }
        ]
      },
      {
        "heading": "WILDCHAIN",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A flurry of strikes whirls around you — unstoppable and beautiful in its chaos."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] Mana\nTRIGGER: Successfully dealing damage with the additional Strike granted by Cleave.\nEFFECT: Move up to [1] square and make an additional melee Strike against a different enemy with condition [-2] to the TO HIT roll. If successful, deal an additional [2] Lethal damage.\nRESTRICTIONS: The target cannot have been targeted by the triggering Melee Strike or Cleave.\nREQUIRES: Cleave Talent\nKEYWORDS: PASSIVE | TOUCH | TALENT"
          }
        ]
      },
      {
        "heading": "WITCH HUNTER",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your instincts recoil against witchcraft — you lash out when magic turns toward you."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When an enemy within [3] squares targets you with a Magic ability.\nEFFECT: Gain condition [+1] to your Ward roll against that ability. If you succeed on the Ward roll, the caster suffers [1] Lethal damage.\nREQUIRES: Magebane Talent\nKEYWORDS: REACTIVE | TALENT"
          }
        ]
      }
    ]
  },
  "weapons": {
    "sections": [
      {
        "heading": "WEAPONS",
        "blocks": []
      },
      {
        "heading": "WEAPONS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Every weapon is a rhythm given form — a promise of motion and purpose. From humble cudgels to masterwork bows, each tells the story of the hands that forged it and the courage that wields it."
          },
          {
            "type": "paragraph",
            "text": "Weapons have a damage value and may include special qualities that shape how they strike, reach, or endure."
          }
        ]
      },
      {
        "heading": "MAKESHIFT WEAPONS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When no weapon is at hand, any sturdy object can serve as a makeshift weapon. The Watcher determines which weapon type it most resembles and uses its damage and qualities. If none fits, treat it as a club. Weapons not built to be thrown have a default range of [3] squares."
          }
        ]
      },
      {
        "heading": "BREAK VALUE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Weapons and shields each have a Break Value of [5]. When a strike roll shows a natural total result of [3] or less, the item suffers [1] Break damage. At Break [0], its effects are halved."
          },
          {
            "type": "paragraph",
            "text": "A direct attack on a weapon or shield inflicts [1] Break damage (or [2] if a melee weapon targets a ranged one)."
          }
        ]
      },
      {
        "heading": "DUAL WIELDING",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When wielding a weapon in each hand, your character suffers a [-2] condition to all melee strike rolls."
          },
          {
            "type": "paragraph",
            "text": "Dual wielding does not grant extra attacks. Instead, when you successfully hit with a melee strike, increase the attack’s total damage by the off-hand weapon’s damage value minus [2]."
          },
          {
            "type": "table",
            "rows": [
              [
                "Quality",
                "Description"
              ],
              [
                "Adaptable",
                "Can be wielded one- or two-handed. Damage in parentheses shows its two-handed value."
              ],
              [
                "Bludgeoning",
                "If this weapon deals [3+] total damage to a target’s health, reduce the target’s speed by [-1] until the end of the round."
              ],
              [
                "Deadly",
                "Deals half total damage inflicted as lethal damage."
              ],
              [
                "Penetration",
                "Deals direct damage, bypassing half of the target’s guts."
              ],
              [
                "Projectile (X)",
                "Can be fired up to [x] squares. Attacking it within [2] squares applies [-2] condition to strike rolls."
              ],
              [
                "Reach (X)",
                "Can strike targets up to [x] squares away."
              ],
              [
                "Skyfire",
                "Deals [+2] damage to flying creatures."
              ],
              [
                "Slashing",
                "When this weapon deals [3+] total damage to a target’s health, the target suffers [+1] lethal damage at the end of the turn."
              ],
              [
                "Thrown (X)",
                "Can be thrown up to [x] squares."
              ],
              [
                "Two-Handed",
                "Requires both hands to attack. Cannot be used with a shield or another weapon."
              ],
              [
                "Versatile",
                "May be dual-wielded. When wielding one in each hand, gain [+1] to strike."
              ]
            ]
          },
          {
            "type": "table",
            "rows": [
              [
                "Name",
                "Cost",
                "Damage",
                "Weight",
                "Qualities"
              ],
              [
                "Melee Weapons"
              ],
              [
                "Club",
                "1 sp",
                "3",
                "2 lb.",
                "Bludgeoning, Versatile"
              ],
              [
                "Shade Blade (Dagger)",
                "2 sp",
                "2",
                "1 lb.",
                "Deadly, Versatile, Thrown (5)"
              ],
              [
                "Timber Fang (Hatchet)",
                "3 sp",
                "3",
                "2 lb.",
                "Slashing, Thrown (5)"
              ],
              [
                "Rootbreaker (Mace)",
                "4 sp",
                "4",
                "2 lb.",
                "Bludgeoning, Thrown (4)"
              ],
              [
                "Oak Staff (Quarterstaff)",
                "1 sp",
                "2 (3)",
                "4 lb.",
                "Adaptable"
              ],
              [
                "Brush Blade (Short Sword)",
                "5 sp",
                "3",
                "2 lb.",
                "Slashing, Versatile"
              ],
              [
                "Field Blade (Long Sword)",
                "7 sp",
                "3 (5)",
                "3 lb.",
                "Slashing, Adaptable"
              ],
              [
                "Stonebreaker (Warhammer)",
                "10 sp",
                "4 (6)",
                "2 lb.",
                "Bludgeoning, Adaptable"
              ],
              [
                "Ranged Weapons"
              ],
              [
                "Thornspike (Dart)",
                "1 np",
                "3",
                "¼ lb.",
                "Penetration, Thrown (6)"
              ],
              [
                "Reedpipe (Blowpipe)",
                "1 sp",
                "2",
                "1lb.",
                "Projectile (4), Deadly"
              ],
              [
                "Sling",
                "1 sp",
                "3",
                "—",
                "Projectile (5), Skyfire"
              ],
              [
                "Brush Bow (Short Bow)",
                "8 sp",
                "3",
                "2 lb.",
                "Projectile (7), Penetration"
              ],
              [
                "Far Bow (Long Bow)",
                "14 sp",
                "4",
                "2 lb.",
                "Projectile (12), Penetration, Skyfire"
              ],
              [
                "Quicklock (Light Crossbow)",
                "10 sp",
                "3",
                "5 lb.",
                "Projectile (8), Penetration, Versatile"
              ],
              [
                "Latchlock (Heavy Crossbow)",
                "16 sp",
                "5",
                "5 lb.",
                "Projectile (10), Penetration, Skyfire"
              ]
            ]
          },
          {
            "type": "table",
            "rows": [
              [
                "As a healer who avoids harming others whenever possible, Selu’s player chooses an oak staff. The staff deals [2] damage, or [3] damage when used two-handed, thanks to its adaptable quality. When Selu performs a physical combat ability such as melee strike, they roll a strike roll using (3d10) + brawl + any conditions, compared against the target’s ward roll. In example, Selu rolls a total of [22] on their strike, while the target’s ward roll totals [18]. Because Selu’s strike exceeds the target’s ward, the attack hits and the staff deals its two-handed damage of [3] to the target."
              ]
            ]
          }
        ]
      }
    ]
  },
  "armor-shields": {
    "sections": [
      {
        "heading": "ARMOR & SHIELDS",
        "blocks": []
      },
      {
        "heading": "ARMOR & SHIELDS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The armors and shields crafted in the Brambleheart wilds are woven from living fibers, bark, and enchanted chitin — materials that hum with subtle life. These pieces do more than protect the wearer; they bond to the rhythm of the forest, feeding on energy both physical and magical."
          },
          {
            "type": "paragraph",
            "text": "Each armor type below lists its Cost, Guts Bonus, Mana Syphon, Armor Penalty, and Weight."
          },
          {
            "type": "paragraph",
            "text": "Mana Syphon increases the mana cost of magical abilities and spells by the listed amount."
          },
          {
            "type": "paragraph",
            "text": "Armor Penalty represents how much the armor interferes with moving unseen — a rating from 1 (minor noise or bulk) to 5 (heavy or clumsy)."
          },
          {
            "type": "paragraph",
            "text": "Medium Armor"
          },
          {
            "type": "table",
            "rows": [
              [
                "Name",
                "Cost",
                "MIGHT Requirement",
                "GUTS Bonus",
                "Mana Syphon",
                "Armor Penalty",
                "Weight"
              ],
              [
                "Roughscale",
                "6 sp",
                "2+",
                "+2",
                "+2",
                "-3",
                "14lb"
              ],
              [
                "Root Weave",
                "14 sp",
                "2+",
                "+3",
                "+2",
                "-4",
                "28lb"
              ],
              [
                "Heartguard",
                "15 sp",
                "3+",
                "+3",
                "+3",
                "-4",
                "22lb"
              ],
              [
                "Earthforged Plate",
                "22 sp",
                "4+",
                "+4",
                "+3",
                "-5",
                "36lb"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Heavy Armor"
          },
          {
            "type": "table",
            "rows": [
              [
                "Toughscale",
                "300sp",
                "4+",
                "+4",
                "+2",
                "-5",
                "32lb"
              ],
              [
                "Durtlehide",
                "800sp",
                "5+",
                "+5",
                "+3",
                "-5",
                "40lb"
              ],
              [
                "Runeforged Plate",
                "1,500sp",
                "5+",
                "+6",
                "+4",
                "-6",
                "65lb"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Shields"
          },
          {
            "type": "table",
            "rows": [
              [
                "Sapguard*",
                "10sp",
                "1+",
                "+1",
                "+1",
                "-1",
                "4lb"
              ],
              [
                "Vinegrip",
                "50sp",
                "2+",
                "+3",
                "+2",
                "-2",
                "10lb"
              ],
              [
                "Ironwood Bulwark",
                "300sp",
                "3+",
                "+4",
                "+3",
                "-3",
                "18lb"
              ],
              [
                "*Characters can use Sapguard while wielding a weapon in each hand, suffering a –1 penalty to all strike rolls made with melee and ranged weapons. The Sapguard continues to provide its normal guts bonus, mana syphon, and stealth effects while used this way."
              ]
            ]
          },
          {
            "type": "table",
            "rows": [
              [
                "As a gentle healer attuned to spellwork Selu’s player equips leafsitch, a light armor that grants [+1] Guts, applies [+0] mana syphon, and imposes 0 Armor Penalty. If Selu is targeted by an attack while wearing the armor, their guts used to reduce the attack’s damage is increased by [+1]. For example, if Selu suffers [5] damage from an attack and they have a guts value of [3] that damage is reduced to [2] total damage, which is applied to Selu’s health."
              ]
            ]
          }
        ]
      },
      {
        "heading": "ARMOR PENALTY",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Armor protects the body at the cost of speed and silence. EFFECT: Add together the Armor Penalty from all equipped armor and shields. Reduce your Speed by the total Armor Penalty. Speed cannot be reduced below [1]. Apply the same total as a negative condition to all Whisperster Skill Checks. RESTRICTIONS: Only equipped armor and shields contribute to Armor Penalty. Armor Penalty does not apply to other Agility Skills unless another rule specifically says so. EXAMPLE: Root Weave (-2) plus Vinegrip (-1) produces Armor Penalty [-3]. A character with Speed [6] is reduced to Speed [3] and suffers condition [-3] to Whisperster Skill Checks. KEYWORDS: EQUIPMENT"
          }
        ]
      },
      {
        "heading": "ARMOR",
        "blocks": [
          {
            "type": "paragraph",
            "text": "LEAFSITCH A garment woven from pliant forest leaves that never wilt, always cool to the touch. The leaves shift and settle like sleeping birds, offering just enough resilience to matter while staying quiet. Spellcasters favor it because it feels more like clothing than armor, and it never steals a breath of mana."
          },
          {
            "type": "paragraph",
            "text": "Crafting Components: Cotton Bloom, Wildharvest, Moss Pads, Willow Bark Extract, leafs."
          },
          {
            "type": "paragraph",
            "text": "BARKSKIN VEST Layers of supple bark grown over vine-threaded linen. Each plate flexes with the torso, creaking faintly when bent, like an ancient tree stretching after long sleep. It shields the ribs without choking movement, giving the wearer a sturdy “forest-born” feel without sacrificing stealth entirely."
          },
          {
            "type": "paragraph",
            "text": "Crafting Components: Yewheart, Willow Bark Extract, Wool Fleece, Moss Pads, Bark."
          },
          {
            "type": "paragraph",
            "text": "BRIARHIDE A tanned hide reinforced with living thorn-veins. The armor stiffens when struck, softening again moments later. Its protection is notable, but the thorns hum with energy, snagging both spells and shadows—making magic a little costlier and movement a little clumsier."
          },
          {
            "type": "paragraph",
            "text": "Crafting Components: Bloodthorn, Wolffall, Dragonroot, Wool Fleece, Beasthide, Briar"
          },
          {
            "type": "paragraph",
            "text": "ROUGHSCALE Thick, uneven chitin scales fused into a mantle that looks hewn from some prehistoric forest beast. Each scale catches the light like river stone. Its sturdiness is undeniable, though every step grinds scale against scale, betraying the wearer’s position with a rasping growl."
          },
          {
            "type": "paragraph",
            "text": "Crafting Components: Ancient’s Metal, Yewheart, Silkspindle Thread, Stormtide Powder, Chitin Plates."
          },
          {
            "type": "paragraph",
            "text": "ROOT WEAVE A harness of interlaced roots grown to match the wearer’s form, strengthened by alchemical resin. The armor tightens subtly when danger looms, reacting like a living companion. Its weight presses like the embrace of an old tree—steady, dependable, and difficult to move silently within."
          },
          {
            "type": "paragraph",
            "text": "Crafting Components: Silkspindle Thread, Yewheart, Wildharvest, Moss Pads, Root Fibers."
          },
          {
            "type": "paragraph",
            "text": "HEARTGUARD Shaped from the heartwood of trees that thrive only in magically saturated groves, the Heartguard resonates with a quiet thrum. Runes carved along its interior sync with the wearer’s pulse. It offers admirable protection, though the thick heartwood and dense magical folds both slow the body and cloud spellcasting flow."
          },
          {
            "type": "paragraph",
            "text": "Crafting Components: Crafting Components: Yewheart, Willow Bark Extract, Silkthread, Wool Fleece, Heartwood."
          },
          {
            "type": "paragraph",
            "text": "EARTHFORGED PLATE Massive slabs of enchanted soil and ironroot compressed into plate segments. Each piece feels like a chunk of ancient earth hammered flat. Wearing it is like carrying a continent on your shoulders—but in return, it grants the solid, immovable presence of living terra. Stealth with this armor is a doomed endeavor."
          },
          {
            "type": "paragraph",
            "text": "Crafting Components: Ancient’s Metal, Stormtide Powder, Moss Pads, Yewheart, Soil, ironroot."
          },
          {
            "type": "paragraph",
            "text": "TOUGHSCALE Hard, shield-like scales arranged to mimic the natural armor of hulking forest reptiles. The plates clack and grind at every movement, announcing the wearer like a living siege engine. Its protection is exceptional, turning aside blows that would crush lesser gear."
          },
          {
            "type": "paragraph",
            "text": "Crafting Components: Ancient’s Metal, Dragonroot, Silkspindle Thread, Wolffall, Stormtide Powder, Chitin Plates."
          },
          {
            "type": "paragraph",
            "text": "DURTLEHIDE A curved shell-like cuirass made from the carapace of the enigmatic Durtle—creatures known for outlasting storms, predators, and time itself. The armor exudes that same stubborn endurance. Its thickness strains the spirit, but its defense is the stuff of legend among Brambleheart warriors."
          },
          {
            "type": "paragraph",
            "text": "Crafting Components: Yewheart, Wool Fleece, Willow Bark Extract, Bloodthorn, Dragonroot , Durtle Carapace Plates."
          },
          {
            "type": "paragraph",
            "text": "RUNEFORGED PLATE Grand plate armor etched with runes that glow faintly like embers under ash. These sigils harden the plates beyond mortal craftsmanship but siphon mana hungrily, as if the armor itself constantly feeds on ambient magic. It is the pinnacle of protection among Brambleheart armorers—towering, radiant, and utterly unsubtle."
          },
          {
            "type": "paragraph",
            "text": "Crafting Components: Ancient’s Metal, Yewheart, Silkthread, Stormtide Powder, Dragonroot, Willow Bark Extract, Aurora Stones"
          }
        ]
      },
      {
        "heading": "SHIELDS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "SAPGUARD A small shield coated in enchanted resin that clings to the forearm with the soft pressure of a living creature. It sticks without hindering the grip, allowing the user to shift hands freely or even wield additional weapons. The resin flexes when struck, absorbing force like thick honey absorbing a stone, but still removable when required."
          },
          {
            "type": "paragraph",
            "text": "Crafting Components: Willow Bark Extract, Moss Pads, Cotton Bloom, Silkthread, Resin."
          },
          {
            "type": "paragraph",
            "text": "VINEGRIP Thick vines braided into a spiraling shield pattern and hardened through heartwood binding. When struck, the shield tightens like a muscle, bracing itself instinctively. The vines exude a faint herbal scent and occasionally twitch as though awakened by danger."
          },
          {
            "type": "paragraph",
            "text": "Crafting Components: Silkspindle Thread, Wildharvest, Wolffall, Yewheart, Tanglevine."
          },
          {
            "type": "paragraph",
            "text": "IRONWOOD BULWARK A towering slab of ironwood—dense enough to sink in water—carved into a defensive barrier. Each impact resounds like a drumbeat in a cavern. It is less a shield and more a portable wall, embraced by those who dare stand between danger and their allies."
          },
          {
            "type": "paragraph",
            "text": "Crafting Components: Ancient’s Metal, Yewheart, Stormtide Powder, Silkthread, Wool Fleece, Ironwood, Willow Bark Extract, Aurora Stones"
          }
        ]
      }
    ]
  },
  "adventuring-gear": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "ADVENTURING GEAR"
              ]
            ]
          }
        ]
      },
      {
        "heading": "THREADPIECES",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Trade across Anthro Mundas uses many regional customs, but nearly all realms share one common medium of exchange: threadpieces."
          },
          {
            "type": "paragraph",
            "text": "These small fasteners were created by the Ancients—a civilization whose craftwork has never been replicated. Their metal is weatherless, perfectly threaded, and astonishingly strong. Ancient fasteners played a crucial role in the rise of the Ardenn masons, who used them to construct the fortresses, watchtowers, and strongholds of the knightly orders. Their durability and uniformity made them priceless to builders, and in time they became the standard measure of value throughout the land."
          },
          {
            "type": "paragraph",
            "text": "Threadpieces are still found in ruins, sunken vaults, collapsed bridges, and anywhere the Ancients once set their hands. They are easy to carry, trusted by traders, and immediately recognized across regions—making them the closest thing Anthro Mundas has to universal coinage."
          }
        ]
      },
      {
        "heading": "TYPES OF THREADPIECES",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Types of Threadpeices: Washer, Nut, Screw, & Bolt"
          }
        ]
      },
      {
        "heading": "WASHER PIECES (wp)",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Flat alloy rings. • Common and easily carried. • Used for small purchases and everyday needs."
          }
        ]
      },
      {
        "heading": "NUT PIECES (np)",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Hexagonal fasteners. • Moderately valuable and uniform in weight. • The preferred piece for local markets."
          }
        ]
      },
      {
        "heading": "SCREW PIECES (sp)",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Spiraled fasteners with flawless threading. • The backbone of trade across the realms. • Used for gear, supplies, and expedition materials."
          }
        ]
      },
      {
        "heading": "BOLT PIECES (bp)",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Solid, heavy fasteners—rare and prized. • Used for major purchases or formal debts. • Often kept wrapped in cloth or braided cord for safekeeping."
          },
          {
            "type": "paragraph",
            "text": "A pouch of roughly 25 threadpieces weighs about a pound, though this varies by type."
          }
        ]
      },
      {
        "heading": "Standard Exchange Rate",
        "blocks": [
          {
            "type": "paragraph",
            "text": "These values emerged naturally across the kingdoms, rooted in the Ardenn masons’ original construction ledgers:"
          },
          {
            "type": "table",
            "rows": [
              [
                "Threadpiece",
                "wp",
                "np",
                "sp",
                "bp"
              ],
              [
                "Washer (wp)",
                "1",
                "1/10",
                "1/50",
                "1/100"
              ],
              [
                "Nut (np)",
                "10",
                "1",
                "1/5",
                "1/10"
              ],
              [
                "Screw (sp)",
                "50",
                "5",
                "1",
                "1/2"
              ],
              [
                "Bolt (bp)",
                "100",
                "10",
                "2",
                "1"
              ]
            ]
          }
        ]
      },
      {
        "heading": "SELLING TREASURE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Most settlements will buy goods recovered from the wilds. Standard gear and everyday items are typically purchased at half their listed value, reflecting the cost of cleaning, repairing, and reselling them."
          },
          {
            "type": "paragraph",
            "text": "Items of unusual craftsmanship—such as rare stones, finely made trinkets, or distinctive curios—are purchased at full value, as these pieces are sought after by collectors and traders."
          },
          {
            "type": "paragraph",
            "text": "Common magical mixtures, including most potions and stable alchemical brews, can be sold without difficulty so long as they remain intact."
          },
          {
            "type": "paragraph",
            "text": "More potent or unusual magical items vary in price. Their value depends on rarity, danger, and local demand, and some may require negotiation or may not find a buyer at all."
          }
        ]
      },
      {
        "heading": "RESALE & MARKET VALUE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Ordinary gear normally resells for 50% of its current retail value, rounded down to the nearest wp."
          },
          {
            "type": "paragraph",
            "text": "Trade goods normally sell for 75% of their listed base value. The Watcher may adjust availability or resale for scarcity, regional demand, damage, or other circumstances."
          }
        ]
      }
    ]
  },
  "trade-goods": {
    "sections": [
      {
        "heading": "TRADE GOODS",
        "blocks": []
      },
      {
        "heading": "TRADE GOODS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Trade goods represent the raw materials, herbs, minerals, and rare components carried between settlements, caravans, and crafters throughout Anthro Mundas. Most are gathered from the wilds, harvested with skill, or recovered from Ancient-touched places. Characters may purchase these items in markets, trade posts, guild stalls, or from traveling merchants when supply allows."
          },
          {
            "type": "paragraph",
            "text": "These items have no direct effect on their own, but they are essential for alchemy, tradeskills, Herbalry, and general trade."
          },
          {
            "type": "paragraph",
            "text": "Your watcher will typically decide availability based on region, rarity, and local demand."
          },
          {
            "type": "table",
            "rows": [
              [
                "Item",
                "Cost",
                "Appearance"
              ],
              [
                "Aloe Vera Leaves",
                "3 wp",
                "Thick, green, moist leaves with clear gel beneath the skin."
              ],
              [
                "Ancient’s Metal",
                "2 bp",
                "Weatherless alloy fragments with perfect edges and faint sheen."
              ],
              [
                "Aurora Stones",
                "1 bp",
                "Pale crystals that glow softly with shifting color bands."
              ],
              [
                "Belladraconis",
                "1 sp",
                "Curved, red-veined leaves with a glossy surface and pointed tips."
              ],
              [
                "Bloodthorn",
                "1 sp",
                "Deep red, thorny root strands that bleed sap when cut."
              ],
              [
                "Celestial Chamomile",
                "4 wp",
                "White-petaled flowers with pale golden centers that shimmer faintly."
              ],
              [
                "Cotton Bloom",
                "2 wp",
                "Fluffy white seed bundles wrapped in thin, papery husks."
              ],
              [
                "Deadlyveil",
                "1 sp",
                "Dark purple petals that curl inward like closing fingers."
              ],
              [
                "Dragonroot",
                "2 sp",
                "Thick, knotted root with streaks of fiery orange running through it."
              ],
              [
                "Dreamblossom",
                "1 sp",
                "Narrow, dark green leaves with a powdery blue underside."
              ],
              [
                "Elderstar Berries",
                "2 wp",
                "Small, pale berries speckled with tiny star-like dots."
              ],
              [
                "Ethereal Lemon Balm",
                "4 wp",
                "Bright green leaves with a faint shimmering edge."
              ],
              [
                "Herb of Mending",
                "5 wp",
                "Tall, thin-stemmed herb with pale, downy leaves."
              ],
              [
                "Mandrakorrupt",
                "3 sp",
                "Twisted, dark-veined root with jagged offshoots."
              ],
              [
                "Moss Pads",
                "4 wp",
                "Thick, spongy green moss clumps that feel cool to the touch."
              ],
              [
                "Shadowcap",
                "3 sp",
                "Small, black-capped mushrooms with matte, velvety tops."
              ],
              [
                "Shadowshade",
                "1 sp",
                "Dusky gray leaves edged in faint, shadowy streaks."
              ],
              [
                "Silkspindle Thread",
                "2 bp",
                "Threadlike roots that twist around each other naturally."
              ],
              [
                "Silkthread",
                "1 sp",
                "Soft, smooth thread with a pale cream color."
              ],
              [
                "Stormtide Powder",
                "2 np",
                "Pale blue powder sticks marbled with white striations."
              ],
              [
                "Swiftmend",
                "1 sp",
                "Short, bright-green leaves with tightly curled tips."
              ],
              [
                "Tranquil Vale",
                "1 sp",
                "Soft blue-green petals arranged in a calm, layered rosette."
              ],
              [
                "Wildharvest",
                "3 wp",
                "A small, curled fern with spiraling fronds mottled in pale green and gold."
              ],
              [
                "Wolffall",
                "1 sp",
                "Jagged, gray-green leaves with tough ribbing."
              ],
              [
                "Willow Bark Extract",
                "1 np",
                "An amber liquid stored in small glass phials."
              ],
              [
                "Wool Fleece",
                "2 wp",
                "Soft, off-white tufts of loosely bundled fleece."
              ],
              [
                "Yewheart",
                "3 sp",
                "Dense, dark-red wood fragments with tight grain patterns."
              ]
            ]
          }
        ]
      },
      {
        "heading": "CRAFTING ECONOMY",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Crafting a market-priced item consumes eligible listed materials with a combined base trade value equal to at least 50% of the item’s current retail price."
          },
          {
            "type": "paragraph",
            "text": "The crafter chooses quantities from the listed component types until the material-value floor is met. The Watcher may require a specific rare component when the fiction calls for it."
          },
          {
            "type": "paragraph",
            "text": "This value floor does not replace the required Skill, tools or kit, time, workspace, or any rule-specific crafting checks. Gathered materials may legitimately create value as a reward for time, risk, Skills, and access to rare resources."
          }
        ]
      }
    ]
  },
  "transportation": {
    "sections": [
      {
        "heading": "TRANSPORTATION",
        "blocks": []
      },
      {
        "heading": "TRANSPORTATION",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Travel across Anthro Mundas often means more than steady footing and a good map. Many adventurers ride mounts—companions born of the strange and wondrous creatures shaped by the winds of magic. A dependable mount offers speed, stability, and carrying capacity that no traveler should overlook."
          },
          {
            "type": "paragraph",
            "text": "Mounts can be used for exploration, overland travel, hauling gear, and transporting carts or wagons."
          }
        ]
      },
      {
        "heading": "MOUNTS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Every mount has its own strengths and limitations. Ground mounts provide consistent speed and sure footing. Airborne mounts offer unmatched mobility but may require care around storms or magic-heavy skies. Water mounts excel on lakes, marshes, and rivers, though they may be slower or less adapted to land travel."
          },
          {
            "type": "paragraph",
            "text": "Players may select whichever mount best suits their character’s needs. Some even maintain more than one mount for different conditions or regions."
          },
          {
            "type": "paragraph",
            "text": "For complete details, abilities and traits for each mount see the Creatures & Monsters chapter under Companions and Critters."
          }
        ]
      },
      {
        "heading": "TRAVEL & HAULING",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A mount can carry up to its listed ground capacity (or flight capacity when airborne). When pulling or transporting a cart, wagon, or carriage, a single mount can move loads up to five times its base carrying capacity—including the weight of the vehicle itself."
          },
          {
            "type": "paragraph",
            "text": "If multiple mounts are harnessed to the same object, their carrying capacities combine, allowing much heavier loads to be moved."
          },
          {
            "type": "paragraph",
            "text": "Your watcher may modify hauling difficulty in dangerous terrain."
          }
        ]
      },
      {
        "heading": "RIDING PROFICIENCY",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Mounting and dismounting normally requires no roll unless done under pressure."
          },
          {
            "type": "paragraph",
            "text": "While traveling, riders make checks only in difficult circumstances—rapid maneuvers, unstable terrain, sudden drops, or tricks."
          },
          {
            "type": "paragraph",
            "text": "When required to make a riding check, characters use their beastride skill plus any conditions against an active or passive target."
          }
        ]
      },
      {
        "heading": "BARDING",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Barding is protective armor crafted specifically for mounts. You can purchase armor for a mount from the armor & shield section at a cost of [3x] the listed valve."
          },
          {
            "type": "paragraph",
            "text": "Mounts use the same ability robe and disrobe rules as characters."
          },
          {
            "type": "paragraph",
            "text": "Your watcher might limit the ability or availability of barding."
          },
          {
            "type": "table",
            "rows": [
              [
                "MOUNTS"
              ],
              [
                "Name",
                "Cost",
                "Ground Speed",
                "Carry Capacity",
                "Flight Speed",
                "Flight Capacity"
              ],
              [
                "Rollodillo",
                "75 sp",
                "12 m",
                "480 lb.",
                "—",
                "—"
              ],
              [
                "Aeronaut",
                "4 bp",
                "9 m",
                "600 lb.",
                "60 ft",
                "300 lb"
              ],
              [
                "Seastrider",
                "25 sp",
                "12 m",
                "200 lb.",
                "—",
                "—"
              ],
              [
                "CARTS"
              ],
              [
                "Cart",
                "15 sp",
                "—",
                "300 lb.",
                "—",
                "—"
              ],
              [
                "Wagon",
                "35 sp",
                "—",
                "600 lb.",
                "—",
                "—"
              ],
              [
                "Sled",
                "20 sp",
                "—",
                "400 lb.",
                "—",
                "—"
              ],
              [
                "Carriage",
                "1 bp",
                "—",
                "800 lb.",
                "—",
                "—"
              ],
              [
                "Unlike characters and most other creatures, mounts list their movement in meters rather than squares. This reflects overland travel rather than tactical positioning. A mount’s movement in squares can be found in its companion entry in the Creatures & Monsters chapter (pg. Xx). For more information on squares and how they convert to yards, feet, and meters, see squares & measurements in The Battle chapter (pg. Xx)."
              ]
            ]
          }
        ]
      }
    ]
  },
  "beyond-creation": {
    "sections": [
      {
        "heading": "BEYOND CHARACTER CREATION",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Every character in Brambleheart continues to grow after their first adventure. As stories unfold, they gain Experience Points (XP) for completing Deeds, pursuing Sparks, and overcoming challenges."
          },
          {
            "type": "paragraph",
            "text": "XP represents lessons learned, scars earned, and the rhythm of change that shapes every hero’s path."
          },
          {
            "type": "paragraph",
            "text": "Players may spend XP during downtime, between adventures, or at watcher approved narrative pauses."
          },
          {
            "type": "paragraph",
            "text": "Characters earn XP primarily through:"
          },
          {
            "type": "paragraph",
            "text": "Deeds Completed: 3–5 XP each, depending on difficulty or moral weight."
          },
          {
            "type": "paragraph",
            "text": "Spark Expression: 1–3 XP each time a Spark meaningfully drives a scene."
          },
          {
            "type": "paragraph",
            "text": "Encounters or Milestones: 5–12 XP per critical victory or defeat."
          },
          {
            "type": "paragraph",
            "text": "Watcher Awards: For exemplary roleplay, creativity, or faith/oath resolutions."
          },
          {
            "type": "table",
            "rows": [
              [
                "Average XP per session: 10–15 XP Two sessions of active play usually equal one major upgrade."
              ]
            ]
          }
        ]
      },
      {
        "heading": "SPENDING EXPERIENCE",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "Advancement",
                "Description",
                "XP Cost"
              ],
              [
                "Attribute Rank",
                "Increases an Attribute by [+1] rank.",
                "2 + (2 × current rank)"
              ],
              [
                "Skill Rank",
                "Improves a known skill’s rank by [+1].",
                "3 + current rank"
              ],
              [
                "New Skill",
                "Learn a new skill",
                "6 (rank 1)"
              ],
              [
                "New Talent",
                "Gain a new Talent",
                "10"
              ],
              [
                "Magic Level",
                "Increases magic level [+1] rank.",
                "10 + (4 × current rank)"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Attribute Rank Increase"
          },
          {
            "type": "paragraph",
            "text": "Represents deepened natural capability or spiritual resilience."
          },
          {
            "type": "table",
            "rows": [
              [
                "From → To",
                "XP Cost",
                "Cumulative Total"
              ],
              [
                "1 → 2",
                "4 XP",
                "4 XP"
              ],
              [
                "2 → 3",
                "6 XP",
                "10 XP"
              ],
              [
                "3 → 4",
                "8 XP",
                "18 XP"
              ],
              [
                "4 → 5",
                "10 XP",
                "28 XP"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Skill Rank Increase"
          },
          {
            "type": "paragraph",
            "text": "Each skill rank reflects practice, mastery, and lived experience."
          },
          {
            "type": "table",
            "rows": [
              [
                "From → To",
                "XP Cost",
                "Cumulative Total"
              ],
              [
                "1 → 2",
                "4 XP",
                "7"
              ],
              [
                "2 → 3",
                "5 XP",
                "12"
              ],
              [
                "3 → 4",
                "6 XP",
                "18"
              ],
              [
                "4 → 5",
                "7 XP",
                "25"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Magic Level Increase"
          },
          {
            "type": "paragraph",
            "text": "A reflection of deeper connection to the Winds and the arcane self."
          },
          {
            "type": "table",
            "rows": [
              [
                "From → To",
                "XP Cost",
                "Cumulative Total"
              ],
              [
                "1 → 2",
                "14 XP",
                "14"
              ],
              [
                "2 → 3",
                "18 XP",
                "32"
              ],
              [
                "3 → 4",
                "22 XP",
                "54"
              ],
              [
                "4 → 5",
                "26 XP",
                "80"
              ],
              [
                "5 → 6",
                "30 XP",
                "110"
              ],
              [
                "6 → 7",
                "34 XP",
                "144"
              ],
              [
                "7 → 8",
                "38 XP",
                "182"
              ],
              [
                "8 → 9",
                "42 XP",
                "224"
              ],
              [
                "9 → 10",
                "46 XP",
                "270"
              ]
            ]
          }
        ]
      }
    ]
  },
  "winds-of-magic": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "WINDS OF MAGIC"
              ]
            ]
          }
        ]
      },
      {
        "heading": "MAGIC POWER",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Magic Level measures a character’s breadth and capacity as a spellcaster. It determines how many Lore Spells and Invocations the character knows and contributes directly to Mana Pool."
          },
          {
            "type": "paragraph",
            "text": "MANA POOL: Mana Pool is the maximum Mana a character can normally hold and equals Magic Level + Spirit. Spirit is the Bravery modifier."
          },
          {
            "type": "paragraph",
            "text": "MAGIC REGEN: Magic Regen is the Mana restored during the Start of Round sequence and equals Heart. Heart is Bravery Rank. Effects may increase or decrease Magic Regen for a round, but Magic Level does not add to Magic Regen."
          }
        ]
      },
      {
        "heading": "KNOWN SPELLS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A Signature Spell is gained from Lore Attunement and does not count among a character’s chosen Lore Spells."
          },
          {
            "type": "table",
            "rows": [
              [
                "Magic Level",
                "Lore Spells Known",
                "Invocations Known"
              ],
              [
                "1",
                "2",
                "2"
              ],
              [
                "2",
                "3",
                "2"
              ],
              [
                "3",
                "4",
                "3"
              ],
              [
                "4",
                "5",
                "3"
              ],
              [
                "5",
                "7",
                "4"
              ],
              [
                "6",
                "8",
                "4"
              ],
              [
                "7",
                "9",
                "5"
              ],
              [
                "8",
                "10",
                "5"
              ],
              [
                "9",
                "11",
                "6"
              ],
              [
                "10",
                "12",
                "6"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "A character gains one Lore Spell at every new Magic Level. At Magic Level 5, they gain two Lore Spells instead of one. They gain one Invocation at Magic Levels 3, 5, 7, and 9."
          },
          {
            "type": "paragraph",
            "text": "Known-spell allowances are tracked directly by Magic Level."
          }
        ]
      },
      {
        "heading": "LORE ATTUNEMENT",
        "blocks": [
          {
            "type": "paragraph",
            "text": "At Magic Level [1], choose one of the seven Magical Lores as your Lore Attunement. You automatically gain that Lore’s Signature Spell."
          },
          {
            "type": "paragraph",
            "text": "Ordinary spells from your attuned Lore reduce their Mana cost by [-2]. After all modifiers, an ordinary spell has a minimum final cost of [1] Mana."
          },
          {
            "type": "paragraph",
            "text": "Your attunement also grants Resistance [+1] against the elemental damage associated with that Lore. The Lore page identifies its elemental resistance."
          }
        ]
      },
      {
        "heading": "SIGNATURE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Signature Spells are free triggered expressions of Lore Attunement. They display SIGNATURE instead of a Mana cost, do not count among Lore Spells Known, cannot be willingly cast unless their own rule explicitly says otherwise, and ignore Mana-cost modifiers including Mana Syphon."
          }
        ]
      },
      {
        "heading": "CANTRIPS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Invocation Spells with an explicit base cost of [0] Mana are Cantrips. They display CANTRIP instead of 0 Mana and remain explicit zero-cost exceptions to the normal minimum spell cost."
          }
        ]
      },
      {
        "heading": "SPELL KEYWORDS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "MAGIC identifies a spell or spellcasting ability. Like other abilities in Brambleheart, spells use keywords to define how they function. A Lore keyword identifies the Lore of Magic from which the spell is derived, while other keywords describe the spell’s structure, effect, or method of application."
          },
          {
            "type": "paragraph",
            "text": "SIGNATURE identifies a spell that follows the Signature spell rules."
          },
          {
            "type": "paragraph",
            "text": "CANTRIP identifies a spell that follows the Cantrip rules."
          },
          {
            "type": "paragraph",
            "text": "ENHANCE identifies a beneficial magical effect, normally applied to a legal friendly subject."
          },
          {
            "type": "paragraph",
            "text": "HEX identifies a hostile magical effect. If the spell states that the subject is Compelled, the effect is normally resisted with Renew the Heart."
          },
          {
            "type": "paragraph",
            "text": "AREA OF EFFECT keywords, such as LINE, CONE, and ORB, define the shape or region affected by the spell."
          },
          {
            "type": "paragraph",
            "text": "SUMMON identifies a spell that creates or calls a summoned entity. A caster may have only one SUMMON spell active at a time. Casting another SUMMON spell ends the previous summon unless a more specific rule states otherwise."
          }
        ]
      },
      {
        "heading": "SPELL RESOLUTION",
        "blocks": [
          {
            "type": "paragraph",
            "text": "AUTOMATIC: Self-targeting, willing-ally, utility, summon, object, and other non-hostile spell effects resolve without an attack roll unless the Spell specifically says otherwise."
          },
          {
            "type": "paragraph",
            "text": "MAGIC STRIKE: A Spell that calls for a Magic Strike uses (3d10) + Control + condition(s) against the target’s (3d10) + Ward + condition(s). For an area Spell, resolve the Magic Strike against each affected enemy separately unless that Spell says otherwise."
          },
          {
            "type": "paragraph",
            "text": "HEX: A Hex uses Renew the Heart at the difficulty printed by that Spell. Easy, Medium, Difficult, Hard, and Very Hard use the normal passive target values. Free Signature Hexes are not exempt from this rule unless their own Trigger explicitly resolves without a TO HIT check."
          },
          {
            "type": "paragraph",
            "text": "HYBRID: When a Spell uses both a Magic Strike and Renew the Heart, the Magic Strike controls the primary damage or initial hit. The separately printed Renew the Heart roll controls only the listed Hex, persistent, control, or secondary rider."
          },
          {
            "type": "paragraph",
            "text": "Half damage and other divided Spell values use the global rule for division: round down unless a more specific rule states otherwise."
          }
        ]
      },
      {
        "heading": "CASTING SPELLS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "RANGE SPELL: A hostile damage Spell that calls for a Magic Strike uses (3d10) + Control + condition(s) against the target’s (3d10) + Ward + condition(s). On a successful Strike, resolve the Spell’s printed damage and effects."
          },
          {
            "type": "paragraph",
            "text": "ENHANCE: DECLARE a legal friendly target or yourself. The caster then makes a Renew the Heart save to shape the beneficial magic. Start with the Spell’s printed passive target, or Medium [18] if none is printed, and reduce that target by the caster’s Spirit modifier to a minimum target of [8]. On a successful save, apply the Spell’s EFFECT and DURATION. On a failed save, the Spell does not take effect unless its own rule states otherwise."
          },
          {
            "type": "paragraph",
            "text": "HEX: DECLARE a legal target. The target uses Renew the Heart at the Spell’s printed passive difficulty. Apply the listed ON FAILURE effect if that save fails."
          },
          {
            "type": "paragraph",
            "text": "A Spell may intentionally combine a Magic Strike with a Hex. When it does, the Spell states separately what the successful Strike does and what the Renew the Heart roll controls."
          }
        ]
      },
      {
        "heading": "SUMMON",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Expanded Summon rules will be added here."
          }
        ]
      },
      {
        "heading": "SPELL DAMAGE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Heart is added once to a Spell’s primary damage value unless the Spell specifically states otherwise. The Heart portion is Standard damage; the Spell’s printed damage value keeps its printed Damage Category and damage type."
          },
          {
            "type": "paragraph",
            "text": "On-Going damage is exactly the printed value. Later or repeated damage caused by a duration, start-of-round trigger, terrain, movement, reflection, summon, or another delayed event does not add Heart or another normal Strike-damage addition unless the Spell explicitly says it does."
          },
          {
            "type": "paragraph",
            "text": "A recurring Spell zone or movement trigger can affect the same character no more than once during a turn unless the Spell explicitly permits more. Start-of-round and start-of-turn recurring effects resolve only at their stated timing."
          }
        ]
      },
      {
        "heading": "SPELL RANGE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Each spell will state its legal target, range or area. Some spells will have both a range and an area. Range is the distance at which a spell can be cast at a target or square (point) of the battlefield and the area is the space which the spell covers from that point."
          }
        ]
      }
    ]
  },
  "species-ardenn": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "ARDENN"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "ARDENN (AHR-den)"
          },
          {
            "type": "paragraph",
            "text": "“By pact and paw, by moon and stone—we guard the realms until the last howl fades. Our strength is not tooth or blade, but the hearts that answer when we call.”"
          },
          {
            "type": "paragraph",
            "text": "ARDENN"
          },
          {
            "type": "paragraph",
            "text": "Theme: Loyalty and pack coordination."
          },
          {
            "type": "paragraph",
            "text": "Traits: Lunar Pursuit, Loyalty’s Will, Feral Resolve."
          },
          {
            "type": "paragraph",
            "text": "Culture: Hunter’s Mark, Pack Fighting. → Focus on reactionary teamwork and endurance at low health."
          },
          {
            "type": "paragraph",
            "text": "The Ardenn embody loyalty and vigor, their lives shaped by unity, instinct, and the bonds of packhood. Their culture centers on the Moon Pacts, sacred rites said to bind their spirits beneath shifting lunar light. When night falls, Ardenn voices rise in woven chorus—part prayer, part remembrance—to honor kin and the wilds that first shaped them."
          },
          {
            "type": "paragraph",
            "text": "After the Battle of Dominous, when Blight nearly drowned the world in undeath, the Ardenn answered with purpose. They formed the Moonbound Orders, a vast knightly network sworn to defend all peoples of Anthro Mundas. These orders built roads between realms, patrolled borders, and erected fortresses of stone, crafted with the renowned Ardenn masonry and architecture. Many of the realm’s great strongholds still bear their mark."
          },
          {
            "type": "paragraph",
            "text": "Leadership among the Ardenn is earned, not inherited. Alpha Knights rise through service and merit, while the High Alpha is chosen for wisdom, restraint, and devotion to the entire network of packs. Though fiercely loyal allies and formidable protectors, the Ardenn remain guided by deep intuition and a steadfast belief: every life is worth guarding, and every pack—however scattered—is family."
          },
          {
            "type": "paragraph",
            "text": "Language: Fennic, a blend of growls and tonal cadence. Spoken from the chest."
          },
          {
            "type": "paragraph",
            "text": "SPECIES TRAITS"
          },
          {
            "type": "paragraph",
            "text": "LUNAR PURSUIT"
          },
          {
            "type": "paragraph",
            "text": "When the pack is threatened, you move without thought — drawn by the pull of instinct and oath."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] mana TRIGGER: After any enemy character resolves a charge ability against an ally within [3] squares."
          },
          {
            "type": "paragraph",
            "text": "DECLEAR: Select the enemy character who performed the charge. EFFECT: Move your character up to [2] squares toward target. If your character ends this movement within [1] square of the charging enemy, gain [+1] to your next strike roll against that target. RESTRICTIONS: This movement must end closer to the charging enemy than where it began and cannot pass through impassable terrain. KEYWORDS: | REACTION | MOVE | ARDENN | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "LOYALTY’S WILL"
          },
          {
            "type": "paragraph",
            "text": "Your loyalty runs deeper than fear or pain — when others bleed, your heart answers first. TRIGGER: This ability can be used when an ally within [3] squares suffers damage. EFFECT: You may suffer up to [3] health to reduce that damage by up to [-3]. Reduce the damage by [1] for each point of health you chose to suffer. KEYWORDS: REACTION | ARDENN | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "FERAL RESOLVE"
          },
          {
            "type": "paragraph",
            "text": "Even at the edge of exhaustion, your heart burns steady beneath the frost. TRIGGER: This ability can be used when your character is reduced to [8] health or less. EFFECT: Gain [+3] to strike, ward, guts, and damage until the end of the next round. COOLDOWN: This ability cannot be used again for [1d10/2+1] rounds after it is activated. KEYWORDS: REACTION | URNATH | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "CULTURE TRAITS"
          },
          {
            "type": "paragraph",
            "text": "HUNTERS INTUITION"
          },
          {
            "type": "paragraph",
            "text": "From youth, every Ardenn learns to track the world by scent, silence, and shared rhythm."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Gain rank [+1] in the wayfinding skill and either the awareness or presence skill. KEYWORDS: PASSIVE | CULTURE |"
          },
          {
            "type": "paragraph",
            "text": "PACK FIGHTING"
          },
          {
            "type": "paragraph",
            "text": "Ardenn warriors fight as one — each motion answered by another, every strike a shared instinct."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: If there are [1] or more ally characters within [3] squares of you, gain [+1] to strike. If there are [2] or more all characters within [ 3] squares of you also gain [+1] to damage with all physical and shoot combat abilities. KEYWORDS: PASSIVE | CULTURE |"
          }
        ]
      }
    ]
  },
  "species-auravex": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "AURAVEX"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "AURAVEX (OR-uh-vek-s)"
          },
          {
            "type": "paragraph",
            "text": "“The Beast walks before us, and our shadows follow in its stride. All life is one trail; we simply walk its truth.”"
          },
          {
            "type": "paragraph",
            "text": "AURAVEX"
          },
          {
            "type": "paragraph",
            "text": "Theme: Kinship with motion and nature’s rhythm."
          },
          {
            "type": "paragraph",
            "text": "Traits: Wild Stride, Voice of the Herd, Cycle of the Beast."
          },
          {
            "type": "paragraph",
            "text": "Culture: Pathfinder’s Call, Leaf in the Wind. → Synergizes with buffs, ally support, and kinetic flow."
          },
          {
            "type": "paragraph",
            "text": "The Auravex are nomadic kin of the wild heart, their lineage echoing the grace of forest ungulates. Guided by their faith, The Way of the Beast, they believe all life flows from a single primal spirit whose rhythm shapes wind, soil, and season."
          },
          {
            "type": "paragraph",
            "text": "Auravex travel in great herds across plains, forests, and mountain paths, following these rhythms rather than claiming land as their own. Their camps are woven from branch, hide, and song—beautiful, impermanent, and leaving no trace when they depart."
          },
          {
            "type": "paragraph",
            "text": "Each herd functions as a living circle. Pathfinders read the sky and earth to choose safe routes; Guardians defend the herd and the wild places they pass through; Keepers tend to stories, rituals, and the spiritual flame that binds the Auravex to the Beast’s call. These rites attune them deeply to the world; many can sense weather shifts, wounded land, or places where magic has soured long before others notice."
          },
          {
            "type": "paragraph",
            "text": "Though gentle and patient in manner, the Auravex are fierce when balance is threatened. Outsiders often view them as wandering mystics or relics of an older age, yet their purpose remains unwavering: to walk the untamed paths, safeguard the pulse of the wild, and ensure that nature’s harmony endures no matter how the world changes around them."
          },
          {
            "type": "paragraph",
            "text": "Language: Antheric, a melodic tongue shaped by breath, grunts, movement and hoof."
          },
          {
            "type": "paragraph",
            "text": "SPECIES TRAITS"
          },
          {
            "type": "paragraph",
            "text": "WILD STRIDE"
          },
          {
            "type": "paragraph",
            "text": "Your steps echo the pulse of the forest; where you walk, the wild flows with you."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: This ability can be used at the start of the round. EFFECT: Your character may move up to double their speed. If your character passes within [1] square of an ally during this movement, that ally gains [+1] to their next roll this round. RESTRICTIONS: This ability cannot be used if your character is within [+2] squares of an enemy and cannot end within [+2] squares of an enemy. KEYWORDS: MOVE | AURAVEX | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "VOICE OF THE HERD"
          },
          {
            "type": "paragraph",
            "text": "You move in chorus with the world around you; the wild whispers its warnings through others."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When an ally within [3] squares is the target of a magical ability"
          },
          {
            "type": "paragraph",
            "text": "DECLARE: Select the targeted ally."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: The target character gains resistance[+1] against the damage type of the magical ability. If the ability cannot deal damage, the character gains [+1] to the attribute save against the spell."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: REACTIVE | AURAVEX | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "CYCLE OF THE BEAST"
          },
          {
            "type": "paragraph",
            "text": "As motion stirs life in all things, the beast’s rhythm returns to you through those you guide."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: This ability can be used at the end of the round. EFFECT: Count the total number of condition bonuses your character granted to ally characters this round. For every [2] instances of condition granted, restore either health [+1] or mana [+1] in any combination. KEYWORDS: INSTINCT | AURAVEX | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "CULTURE TRAITS"
          },
          {
            "type": "paragraph",
            "text": "PATHFINDER’S CALL"
          },
          {
            "type": "paragraph",
            "text": "Your people have walked every road beneath the sky, guided by intuition and song."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Gain rank [+1] in the wayfinding skill and either the awareness or herbalry skill. KEYWORDS: PASSIVE | CULTURE |"
          },
          {
            "type": "paragraph",
            "text": "LEAF IN THE WIND"
          },
          {
            "type": "paragraph",
            "text": "Your voice carries a whisper among leaves, steadying a heartbeat not yet gone."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] mana TRIGGER: This ability can be used when an ally within [3] squares is compelled to use the renew the heart ability. EFFECT: The target ally’s attribute save roll for renew the heart is considered edged. KEYWORDS: REACTION | CULTURE |"
          }
        ]
      }
    ]
  },
  "species-axalori": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "AXALORI"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "AXALORI (AX-uh-lohr-ee)"
          },
          {
            "type": "paragraph",
            "text": "“We do not lift our hands to harm, but we will not let life be taken. Even the smallest spark of life is worthy of protection.”"
          },
          {
            "type": "paragraph",
            "text": "AXALORI"
          },
          {
            "type": "paragraph",
            "text": "Theme: Calm renewal and healing resonance."
          },
          {
            "type": "paragraph",
            "text": "Traits: Stillwater Renewal, Heartcurrent, Harmonic Field."
          },
          {
            "type": "paragraph",
            "text": "Culture: Tranquil Discipline, Resonant Pulse. → Healing and mana interchange, ideal support species."
          },
          {
            "type": "paragraph",
            "text": "The Axalori are gentle, introspective folk whose lives flow with the quiet strength of rivers and rain. Their lineage echoes amphibians of marsh and tide, their movements fluid and their voices soft, shaped by a deep devotion to healing and renewal. Guided by a philosophy known as the Great Renewal, the Axalori believe that all wounds—of body, spirit, or land—can be mended when life is given space to breathe and grow."
          },
          {
            "type": "paragraph",
            "text": "They are credited as the first to understand the Lore of Life, perceiving the Winds of Magic as pulses of living rhythm rather than forces to be bent or commanded. Their mastery spread far beyond their wetland sanctuaries, forming the foundation of modern restorative magic across Anthro Mundas."
          },
          {
            "type": "paragraph",
            "text": "Axalori guide travelers and waterways, cultivate medicines, gardens, and practice endurance, meditation, and the discipline of quiet strength. None stand above others—balance is found only when all are in harmony."
          },
          {
            "type": "paragraph",
            "text": "To many, the Axalori seem serene wanderers, but their purpose is steady and eternal—to nurture what lives, mend what breaks, and keep the world’s heartbeat strong."
          },
          {
            "type": "paragraph",
            "text": "Language: Antheric, a melodic tongue shaped by breath, grunts, movement and hoof."
          },
          {
            "type": "paragraph",
            "text": "SPECIES TRAITS"
          },
          {
            "type": "paragraph",
            "text": "STILLWATER RENEWAL"
          },
          {
            "type": "paragraph",
            "text": "Your stillness mirrors the calm depths—where even silence heals. TRIGGER: This ability can be used at the end of the round. EFFECT: If your character did not move during the round, restore health [2] and mana [1]. KEYWORDS: INSTINCT | AXALORI | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "HEARTCURRENT"
          },
          {
            "type": "paragraph",
            "text": "Your heart flows in rhythm with the world’s pulse—what is spent in one form returns in another. TRIGGER: This ability can be used at the start of the round. EFFECT: Your character may spend [-2] health to restore [1] mana or spend [-1] mana to restore health [2]. KEYWORDS: INSTINCT | AXALORI | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "HARMONIC FIELD"
          },
          {
            "type": "paragraph",
            "text": "Healing flows outward, rippling through the bonds that connect all life."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: This ability activates when your character restores health to themselves or a target. EFFECT: One ally characters within [3] squares, may choose one of the following effects. Restore health [1], mana [1], or gain [+2] to attribute saves until the end of the next round. RESTRICTIONS: A character cannot be affected by multiple instances of soul current from different sources. KEYWORDS: REACTION | ENHANCE | AXALORI | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "CULTURE TRAITS"
          },
          {
            "type": "paragraph",
            "text": "TRANQUIL DISCIPLINE"
          },
          {
            "type": "paragraph",
            "text": "You were raised in the still halls of reflection, where patience and observation guide the mind as much as the hand."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Gain rank [+1] in the lorekeeping skill and the herbalry skill. KEYWORDS: PASSIVE | CULTURE |"
          },
          {
            "type": "paragraph",
            "text": "RESONANT PULSE"
          },
          {
            "type": "paragraph",
            "text": "To the Axalori, empathy is a current that binds all living things. When one heart trembles, another steadies it."
          },
          {
            "type": "paragraph",
            "text": "COST: [2] mana TRIGGER: This ability can be used at the start of the round. DECLARE: Choose [1] ally to bond. EFFECT: If the bonded ally is within [3] squares and suffers three or more damage reduce that damage by [-1] + Heart). KEYWORDS: INSTINCT | CULTURE"
          }
        ]
      }
    ]
  },
  "species-braelor": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "BRAELOR"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "BRAELOR (BRAY-lor)"
          },
          {
            "type": "paragraph",
            "text": "“One blade brought shame; ten thousand deeds will restore our name. Patience is our shield; resolve is our spear.”"
          },
          {
            "type": "paragraph",
            "text": "BRAELOR"
          },
          {
            "type": "paragraph",
            "text": "Theme: Storm-forged strength and defiance of corruption."
          },
          {
            "type": "paragraph",
            "text": "Traits: Thunderstep, Stoneheart, Covine Heirs."
          },
          {
            "type": "paragraph",
            "text": "Culture: Forge-Kin, Stillstorm Totem. → Heavy melee damage, anti-magic resistance, disciplined faith motifs."
          },
          {
            "type": "paragraph",
            "text": "The Braelor are steadfast folk shaped by the endurance and honor of great horned beasts. Their homes rise across open plains and high valleys where stone meets sky, surrounded by wind-carved monuments and echoing forges. Strength and craftsmanship define their way of life; every hammer strike is a prayer, every tool a testament to discipline and spirit."
          },
          {
            "type": "paragraph",
            "text": "To the Braelor, labor is sacred—will made visible, shaping both the world and the self."
          },
          {
            "type": "paragraph",
            "text": "They are guided by shamans who commune with ancestral echoes carried in dream, thunder, and ringing steel. These spiritual leaders teach that courage must be grounded, loyalty must be chosen, and truth must be spoken even when it scars."
          },
          {
            "type": "paragraph",
            "text": "Yet the Braelor carry a shadow alongside their virtues. Long ago, one of their own—Covine, the war-sorcerer, unleashed the Blight and became the Lich King, a name carved into history with grief and warning. Though the sin was his alone, the memory weighs heavily on his people. In its wake, the Braelor dedicate themselves to redemption."
          },
          {
            "type": "paragraph",
            "text": "With great horns, steady gaze, and unmatched endurance, the Braelor stand as symbols of the living earth—unyielding, honest, and unbroken."
          },
          {
            "type": "paragraph",
            "text": "Language: Snortish, a guttural, rhythmic speech tied to breath and emotion."
          },
          {
            "type": "paragraph",
            "text": "SPECIES TRAITS"
          },
          {
            "type": "paragraph",
            "text": "THUNDERSTEP"
          },
          {
            "type": "paragraph",
            "text": "Braelor hearts beat with stormlight, and the air itself trembles in their wake."
          },
          {
            "type": "paragraph",
            "text": "COST: [3] mana TRIGGER: This ability can be used during your turn. EFFECT: Your character may move a number of squares equal to their speed plus [+5] toward a visible enemy within line of sight. If your character uses a combat ability against that target and deals damage during the same turn, increase the total damage by [+2]. POWER THROUGH: At the end of your turn, if your character moved the total movement granted by this ability, deal [3] lethal damage to the target of thunderstep. The target is forced back [1] square directly away from you. If the target cannot be moved, they suffer an [2] lethal damage instead. RESTRICTIONS: This movement must end within [1] square of the target and cannot pass through impassable terrain. KEYWORDS: MOVE | BRAELOR | CHARGE | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "STONEHEART"
          },
          {
            "type": "paragraph",
            "text": "The Braelor’s will is as steady as forged iron, their bodies and spirits refusing to yield to pain or fear."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Gain [+2] to all guts rolls made to resist any non-magical damage. When your character suffers lethal damage, reduce that damage by [-1], to a minimum of [1]. KEYWORDS: PASSIVE | BRAELOR | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "COVINE HEIRS"
          },
          {
            "type": "paragraph",
            "text": "Echoes of the Lich King’s dominion linger in Braelor blood. TRIGGER: This ability can be used at the end of the round. EFFECT: When your character successfully resists a hex or compelled effect, restore health [+1] for each instance of success. KEYWORDS: INSTINCT | BRAELOR | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "CULTURE TRAITS"
          },
          {
            "type": "paragraph",
            "text": "FORGE-KIN"
          },
          {
            "type": "paragraph",
            "text": "The twin arts of body and spirit: the strength to shape stone and the presence to command respect."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Gain rank[+1] in the stonegrasp and either presence or crafting[blacksmithing] skills. KEYWORDS: PASSIVE | CULTURE |"
          },
          {
            "type": "paragraph",
            "text": "STILLSTORM TOTEM"
          },
          {
            "type": "paragraph",
            "text": "Braelor shamans bind the echoes of wind and forge into sacred totems humming with stormlight."
          },
          {
            "type": "paragraph",
            "text": "COST: [2] mana TRIGGER: This ability can be used at the start of the round. DECLARE: Summon a spiritual totem within [2] squares of your character. EFFECT: While the totem is active, your character automatically passes the first compelled effect from a spell each round. ally characters within [3] squares of the totem gain [+1] to attribute saves made when using the renew the heart ability. RESTRICTIONS: A character cannot benefit from multiple stillstorm totem from different sources. DURATION: The totem remains until it until destroyed. KEYWORDS: INSTINCT | ENHANCE | SUMMON | CULTURE"
          }
        ]
      }
    ]
  },
  "species-cethra": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "CETHRA"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "CETHRA (SETH-rah)"
          },
          {
            "type": "paragraph",
            "text": "“When the Evershade stirs, so too does destiny. What moves in shadow often carries the truest shape of fate.”"
          },
          {
            "type": "paragraph",
            "text": "CETHRA"
          },
          {
            "type": "paragraph",
            "text": "Theme: Precision, stealth, and poise."
          },
          {
            "type": "paragraph",
            "text": "Traits: Primal Grace, Shadowstep, Poised Reflex."
          },
          {
            "type": "paragraph",
            "text": "Culture: Artisan’s Focus, Viled Paw. → Agile duelist class, high-risk precision strikes."
          },
          {
            "type": "paragraph",
            "text": "The Cethra are quiet wanderers shaped by the poise and mystery of the great cats. They dwell in hidden forests, mist-veiled glades, and the crumbling bones of ancient ruins. To the Cethra, stillness is strength—every step intentional. Their presence is subtle yet unmistakable, like moonlight shifting across stone."
          },
          {
            "type": "paragraph",
            "text": "The Cethra hold a quiet but vital place in the wider world. They are known to appear in troubled regions without explanation. Some say they sense disturbances through the Evershade Tree, drawn to fractures others cannot perceive. They rarely stay long, offering guidance through silence or subtle gesture before slipping back into the wilds."
          },
          {
            "type": "paragraph",
            "text": "The Evershade Tree is said to be the oldest living thing in the world, a silent echo of Anthro Mundas itself. Its roots are whispered to drink from the realm’s lifeblood, carrying omens through soil and shadow. Only the Cethra stand as its guardians—devoted stewards of fate’s quiet weave, and the only folk who have ever looked upon its hidden boughs."
          },
          {
            "type": "paragraph",
            "text": "Though outsiders often mistake their calm for aloofness, beneath their serene exterior lies fierce compassion. The Cethra walk where shadow meets song, balancing solitude with deep reverence for the hidden threads that bind the world."
          },
          {
            "type": "paragraph",
            "text": "Language: Purrish, a melodic blend of hums, trills, and soft vocal tones."
          },
          {
            "type": "paragraph",
            "text": "SPECIES TRAITS"
          },
          {
            "type": "paragraph",
            "text": "PRIMAL GRACE"
          },
          {
            "type": "paragraph",
            "text": "You flow around danger like wind through tall grass — untouchable, deliberate, and ever-moving."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] mana TRIGGER: This ability can be used when your character is targeted by a combat ability that requires a ward roll. EFFECT: After the ability is resolved, you may move your character up to [3] squares in any direction and gain [+2] to ward until the end of the round RESTRICTIONS: This movement cannot end within [2] squares of the attacking enemy. KEYWORDS: REACTION | MOVE | CETHRA | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "SHADOWSTEP"
          },
          {
            "type": "paragraph",
            "text": "Your stillness is a weapon; the enemy never sees the motion that ends them."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] mana TRIGGER: This ability can be used at the end of the round. EFFECT: Select a point of origin within [5] squares and move your character to that point. This movement does not require line of sight and can pass through any terrain type. Afterwards, you may move up to [2] additional squares in any direction."
          },
          {
            "type": "paragraph",
            "text": "COOLDOWN: This ability cannot be used again for [1d10/2+1] rounds after it is activated. RESTRICTIONS: This movement cannot end within two [2] squares of an enemy. KEYWORDS: INSTINCT | CETHRA"
          },
          {
            "type": "paragraph",
            "text": "POISED REFLEX"
          },
          {
            "type": "paragraph",
            "text": "Even under pressure, your body acts with effortless control — instinct shaped by endless discipline."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: This ability can be used when your character fails an attribute save. EFFECT: You may reroll the failed attribute save with [+1]. KEYWORDS: INSTINCT | CETHRA | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "CULTURE TRAITS"
          },
          {
            "type": "paragraph",
            "text": "ARTISAN’S FOCUS"
          },
          {
            "type": "paragraph",
            "text": "The Cethra find balance in creation — their art a mirror of patience and will."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Gain rank [+1] in the Tumblecraft and either the Shadehand or Whisperster skill. KEYWORDS: PASSIVE | CULTURE | CETHRA"
          },
          {
            "type": "paragraph",
            "text": "VILED PAW"
          },
          {
            "type": "paragraph",
            "text": "A flash of motion — graceful, inevitable, and unseen until it’s too late."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] mana TRIGGER: When you make a successful strike roll against an enemy character that has not yet taken their turn this round. EFFECT: Increase the total damage dealt by the strike roll by [+2]. COOLDOWN: This ability cannot be used again for [1d10/2+1] rounds after it is activated."
          },
          {
            "type": "paragraph",
            "text": "RESTRICTIONS: This ability cannot be used with a magical or ranged ability. KEYWORDS: REACTIVE | CULTURE |"
          }
        ]
      }
    ]
  },
  "species-hedgkin": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "HEDGKIN"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "HEDGKIN (HEHJ-kin)"
          },
          {
            "type": "paragraph",
            "text": "“Tend a spark of hope, and you’ll soon have a hearth. For even the darkest soil can bloom again.”"
          },
          {
            "type": "paragraph",
            "text": "HEDGKIN"
          },
          {
            "type": "paragraph",
            "text": "Theme: Hearth, protection, and small miracles."
          },
          {
            "type": "paragraph",
            "text": "Traits: Hearthborn Courage, Burrowstep, Spine Guard."
          },
          {
            "type": "paragraph",
            "text": "Culture: Thicket Craft, Thriving Harmony. → Strong support / reaction traits, charm-based healing and retaliation."
          },
          {
            "type": "paragraph",
            "text": "The Hedgkin embody the warmth of hearth and garden, their lives rooted in gentle earth and peaceful companionship. They dwell in rolling meadows, riverbanks, and burrowed homes lined with moss, lantern glass, and flowering vines. Quiet by nature but rich in spirit, the Hedgkin cultivate gardens said to be touched by the Winds of Magic themselves—places where herbs grow sweeter, fruit ripens brighter, and weary travelers find unexpected rest."
          },
          {
            "type": "paragraph",
            "text": "Known as keepers of comfort, they maintain vast communal orchards and shared fields, feeding their kin and any wanderer who arrives at their door. Their deep connection to the land has made them beloved across Anthro Mundas, especially in ages when wounds—of war, Blight, or sorrow—cut through the world. In recent generations, Hedgkin growers and herbalists have become skilled at coaxing life back into blight-scarred soil, slowly cleansing corrupted ground through patient tending and ancient botanical rites."
          },
          {
            "type": "paragraph",
            "text": "Though humble in size, they are remarkably brave when peace is threatened. Hedgkin stand firm not out of fury, but out of love for the life they cultivate. To them, harmony is not a luxury—it is a garden tended daily, a living promise to future generations."
          },
          {
            "type": "paragraph",
            "text": "Language: Hedgely, Silken and whisperlike, built from trills, hums, and quiet pauses"
          },
          {
            "type": "paragraph",
            "text": "SPECIES TRAITS"
          },
          {
            "type": "paragraph",
            "text": "HEARTHBORN COURAGE"
          },
          {
            "type": "paragraph",
            "text": "The Hedgkin’s bravery burns slow but never fades — a quiet ember against fear."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: This ability can be used when an ally within [3] squares is compelled."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: The affected ally gains [+2] to the roll made to resist the effect. If that roll succeeds, the ally gains [+1] to strike or ward until the end of their next turn."
          },
          {
            "type": "paragraph",
            "text": "RESTRICTIONS: A character cannot be affected by multiple instances of hearthborn courage from different sources."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: REACTION | ENHANCE | HEDGKIN | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "BURROWSTEP"
          },
          {
            "type": "paragraph",
            "text": "The Hedgkin move where others cannot — under roots, through brush, and between the cracks of battle."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: This ability can be used when an enemy character moves during an ally’s turn."
          },
          {
            "type": "paragraph",
            "text": "DECLARE: Choose [1] ally within [3] squares of the moving character."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: The chosen ally may move [1] square at the end of the current turn."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: REACTIVE | HEDGKIN | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "SPINE GUARD"
          },
          {
            "type": "paragraph",
            "text": "The Hedgkin’s quills bristle at danger, turning defense into quiet retribution."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] mana"
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: This ability can be used when your character is the target of a combat ability, and the attacker is within [3] squares."
          },
          {
            "type": "paragraph",
            "text": "DECLARE: Target the character using the combat ability."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: The targeted character suffers [1] lethal damage. If the triggering combat ability successfully deals damage or applies an effect, the attacker suffers an additional [1] lethal damage."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: REACTIVE | HEDGKIN | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "CULTURE TRAITS"
          },
          {
            "type": "paragraph",
            "text": "THICKET CRAFT"
          },
          {
            "type": "paragraph",
            "text": "The Hedgkin’s hands are always busy — mending, stirring, or mixing some small miracle."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Gain rank [+1] in the Seeking and Herbalry skill. Additionally, gain rank [+1] in one of the following skills: Lorekeeping, Wayfinding, or Tradecraft skill."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: PASSIVE | CULTURE"
          },
          {
            "type": "paragraph",
            "text": "THRIVING HARMONY"
          },
          {
            "type": "paragraph",
            "text": "A warm word, a full belly, a safe fire — such things keep the darkness away."
          },
          {
            "type": "paragraph",
            "text": "COST: [2] mana"
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: This ability can be used at the end of the round."
          },
          {
            "type": "paragraph",
            "text": "DECLARE: Choose [1] ally within [3] squares."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Target ally restores health [+2] and gains [+1] to their next attribute save, until the end of the next round. If your character is within [1] square of another ally when targeted by this ability, you also restore health [+1]."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: INSTINCT | ENHANCE | CULTURE |"
          }
        ]
      }
    ]
  },
  "species-ravari": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "RAVARI"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "RAVARI (RIV-kan)"
          },
          {
            "type": "paragraph",
            "text": "“A good story is worth any climb. And if trouble finds you, outwit it. If that fails, outclimb it.”"
          },
          {
            "type": "paragraph",
            "text": "RAVARI"
          },
          {
            "type": "paragraph",
            "text": "Theme: Acrobatics, trickery, and instinctive teamwork."
          },
          {
            "type": "paragraph",
            "text": "Traits: Treeleaper, Haphazard Genius, Crooktail Bound."
          },
          {
            "type": "paragraph",
            "text": "Culture: Jester of Trade, Dexterous Paws. → Movement specialists with synergistic reaction play."
          },
          {
            "type": "paragraph",
            "text": "The Ravari are curious, cunning folk shaped by the quick wit and nimble grace of forest scavengers. They thrive in the high canopies of the Veilwood and other dense forests of Anthro Mundas. To the Ravari, every hollow hides a secret and every trail hints at a tale worth chasing."
          },
          {
            "type": "paragraph",
            "text": "Agile climbers and deft-handed gatherers, they collect stories as eagerly as trinkets, believing that anything—no matter how small—may carry wonder, wisdom, or opportunity. Ravari culture celebrates ingenuity and improvisation, where art, invention, and mischief often mix into creations equal parts brilliant and absurd."
          },
          {
            "type": "paragraph",
            "text": "Their greatest celebration, Treasure Day, marks the turning of the year: a festival of shared discoveries where baubles, riddles, jokes, and heartfelt gifts light their halls. It is a full day of memory and generosity, reminding every Ravari that joy is a treasure best passed on."
          },
          {
            "type": "paragraph",
            "text": "Beneath their humor lies a fierce loyalty. A Ravari may tease, trick, and tangle in mischief, but they never abandon a friend or kin in danger."
          },
          {
            "type": "paragraph",
            "text": "They move lightly through the world, but they leave behind laughter, cleverness, and the quiet certainty that curiosity is its own kind of courage."
          },
          {
            "type": "paragraph",
            "text": "Language: Ravariese, a melodic tongue of chitters and lyrical cadence."
          },
          {
            "type": "paragraph",
            "text": "SPECIES TRAITS"
          },
          {
            "type": "paragraph",
            "text": "TREELEAPER"
          },
          {
            "type": "paragraph",
            "text": "The Ravari were born for the high places, where every fall teaches a better landing. EFFECT: When your character moves, they may ignore height penalties and difficult terrain caused by natural obstacles such as vines, roots, or elevation. If your character falls or is pushed from a height of [5] squares or less, they take no damage and may move [1] square in any direction upon landing. KEYWORDS: PASSIVE | MOVE | RAVARI | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "HAPHAZARD GENIUS"
          },
          {
            "type": "paragraph",
            "text": "You might not know what you’re doing — but somehow, it works."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: This ability can be used at the start of the round."
          },
          {
            "type": "paragraph",
            "text": "DECLEAR: Select [1] enemy character within [3] squares. EFFECT: The targeted character suffers [-1] when making ward rolls against you. Additionally, each time you make a successful strike roll against the target, you may move [1] square."
          },
          {
            "type": "paragraph",
            "text": "RESTICTION: This ability cannot be used against the same target in back-to-back rounds."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: INSTINCT | RAVARI | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "CROOKTAIL BOUND"
          },
          {
            "type": "paragraph",
            "text": "When the Ravari work together, they do so by instinct — a flick, a nod, a jump."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] mana TRIGGER: This ability can be used when an ally within [3] squares performs a move or combat ability. EFFECT: Your character may move [1] square. If the move ends within an adjacent square of a different ally that didn’t trigger this ability, you and that ally gain [+1] to the next roll made this round. KEYWORDS: REACTION | RAVARI"
          },
          {
            "type": "paragraph",
            "text": "CULTURE TRAITS"
          },
          {
            "type": "paragraph",
            "text": "JESTER OF TRADE"
          },
          {
            "type": "paragraph",
            "text": "Ravari crafts are built to the sound of laughter, argument, and rhythm."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Gain rank [+1] in the Guile and Tumblecraft skill. Additionally, gain rank [+1] in one of the following skills: Shadehand, Stonegrasp, Whisperster, Seeking, or Wayfinding skill. KEYWORDS: PASSIVE | CULTURE"
          },
          {
            "type": "paragraph",
            "text": "DEXTEROUS PAWS"
          },
          {
            "type": "paragraph",
            "text": "Ravari hands are quick and clever, made for balance, mischief, and motion. EFFECT: When your character is wielding a weapon in each hand, gain [+1] to strike rolls and damage for physical combat abilities. KEYWORDS: PASSIVE | CULTURE"
          }
        ]
      }
    ]
  },
  "species-rivkan": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "RIVKAN"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "RIVKAN (RIV-kan)"
          },
          {
            "type": "paragraph",
            "text": "“Power doesn’t shout. It flows. Control the waters, and the arguments grow quieter.”"
          },
          {
            "type": "paragraph",
            "text": "RIVKAN"
          },
          {
            "type": "paragraph",
            "text": "Theme: Social fluidity and adaptability."
          },
          {
            "type": "paragraph",
            "text": "Traits: Communal Adaptation (Jippis familiar), Leapfrog, Double Lilly."
          },
          {
            "type": "paragraph",
            "text": "Culture: Social Savvy, River’s Favor. → Defensive and RNG-adaptive, strong familiar and social synergy."
          },
          {
            "type": "paragraph",
            "text": "The Rivkan are a people shaped by wetlands, marshes, and winding deltas—resilient, collaborative, and sharper than they appear. Their communal instinct runs deep; every Rivkan is raised to know that strength flows from the group, not the individual. Many foster bonds with the nimble winged Jippis, companions whose keen senses heighten awareness and intuition."
          },
          {
            "type": "paragraph",
            "text": "Yet when this ideal expanded beyond their villages and into the wider world, it placed the Rivkan in a uniquely powerful position. Controlling countless waterways, harbors, and river crossings across Anthro Mundas, the Rivkan gradually became the quiet pulse of the continent’s trade."
          },
          {
            "type": "paragraph",
            "text": "Their greatest stronghold, Vellimar, sits where three great rivers converge into the sea—a sprawling stilt-born metropolis of markets and docks. Barges from every culture crowd its piers, and deals struck there can shift the fortunes of entire regions."
          },
          {
            "type": "paragraph",
            "text": "Though humble in stature, the Rivkan understand influence better than most. They move goods, news, and people with equal ease, and their say carries weight in any negotiation. While they may seem harmless, those who mistake Rivkan for weak soon learn otherwise."
          },
          {
            "type": "paragraph",
            "text": "Language: Corakish, a croaking, percussive tongue that shifts with emotion."
          },
          {
            "type": "paragraph",
            "text": "SPECIES TRAITS"
          },
          {
            "type": "paragraph",
            "text": "COMMUNAL ADAPTATION"
          },
          {
            "type": "paragraph",
            "text": "Every Rivkan shares their path with a Jippis — a clever, mimicking creature of water and intuition."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Your character gains the critter Jippis as a familiar. The Jippis counts as a summoned character. Follow the normal rules for a summoned familiar. JIPPIS AID: When your character succeeds on a roll compelled attribute save and they control a Jippis familiar, restore mana [+1]. KEYWORDS: PASSIVE | SUMMON | RIVKAN | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "LEAPFROG"
          },
          {
            "type": "paragraph",
            "text": "Bufo’s powerful legs allow them to evade danger and mitigate damage."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When your character is the target of an area of effect spell."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] mana EFFECT: Reduce the total damage dealt by the spell by half. This effect is applied after all other damage conditions or effects. If the spell compels an attribute save, and your Jippis familiar is summoned, gain [+3] to save against the compelled effect."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: REACTION | RIVKAN | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "DOUBLE LILLY"
          },
          {
            "type": "paragraph",
            "text": "When the first jump fails, the second one lands."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: This ability can be used when your character fails a roll. EFFECT: Gain [+2] to your next roll of the same type (combat, spell, or attribute) made within the next round. If that follow-up roll succeeds, restore mana [+2]. KEYWORDS: REACTION | RIVKAN | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "CULTURE TRAITS"
          },
          {
            "type": "paragraph",
            "text": "SOCIAL SAVVY"
          },
          {
            "type": "paragraph",
            "text": "To the Rivkan, words are currency and silence is a debt unpaid."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Gain rank [+1] in the Charm and Guile skills. Additionally, gain rank [+1] in one of the following skills: Expression, Tradeskill, Seeking or Shadehand skill. KEYWORDS: PASSIVE | CULTURE"
          },
          {
            "type": "paragraph",
            "text": "RIVER’S FAVOR"
          },
          {
            "type": "paragraph",
            "text": "The Rivkan believe the river grants small mercies to those who travel with good timing."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: This ability can be used when an ally within [3] squares rolls a natural [1] or [10]. EFFECT: On a natural [1], the affected ally gains [+1] to the roll that triggered this ability. On a natural [10], the affected ally restores mana [+1]. KEYWORDS: REACTION | CULTURE | RIVKAN"
          }
        ]
      }
    ]
  },
  "species-sauren": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "SAUREN"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "SAUREN (SORE-en)"
          },
          {
            "type": "paragraph",
            "text": "“Survival is devotion made visible. Every dawn is a promise kept.”"
          },
          {
            "type": "paragraph",
            "text": "SAUREN"
          },
          {
            "type": "paragraph",
            "text": "Theme: Endurance and desert-born ferocity."
          },
          {
            "type": "paragraph",
            "text": "Traits: Bond of the Vurox, Heatbloom, Furnacehide."
          },
          {
            "type": "paragraph",
            "text": "Culture: Nomad’s Profession, Scent of Blood. → Tanky beastmasters with reactive burst potential."
          },
          {
            "type": "paragraph",
            "text": "The Sauren are the resilient children of the sun—scaled wanderers shaped by the endurance of desert reptiles and the vast, wind-scarred plains. Their nomadic tribes follow ancient migration routes alongside the great herds they tend, living by a strict code of reciprocity: take only what the land offers, and repay every gift with stewardship."
          },
          {
            "type": "paragraph",
            "text": "From birth, each Sauren forms a sacred bond with a Vurox pup, a lupine companion whose spirit is believed to intertwine with theirs across life and death. These pairings are not pets or mounts, but soul-kin—guardians, mirrors, and lifelong partners."
          },
          {
            "type": "paragraph",
            "text": "Direct, honest, and efficient in both word and deed, the Sauren often seem severe to outsiders. Yet among themselves, every gesture carries layered meaning: a flick of the tail, a brief nod, a shared silence. Respect among Sauren is quiet and constant, woven through small acts of reliability."
          },
          {
            "type": "paragraph",
            "text": "To the Sauren, survival is not merely instinct—it is devotion. Through fire, wind, and dust, they endure, believing that each day they outlast the world’s hardships is a prayer answered and a promise kept."
          },
          {
            "type": "paragraph",
            "text": "Language: Drashti, A breath-heavy, hissing tongue born of the desert winds- sharp, short, and powerful."
          },
          {
            "type": "paragraph",
            "text": "SPECIES TRAITS"
          },
          {
            "type": "paragraph",
            "text": "BOND OF THE VUROX"
          },
          {
            "type": "paragraph",
            "text": "From birth, every Sauren shares their path with a bonded Vurox."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Your character has a bonded Vurox companion. The Vurox acts as a summoned critter and during combat encounters takes a turn immediately after your character regardless of initiative order."
          },
          {
            "type": "paragraph",
            "text": "BONDED PAIR: When your character’s Vurox is within [3] squares and your character restores health, the Vurox restores [1] health."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: PASSIVE | SUMMON | SAUREN | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "HEATBLOOM"
          },
          {
            "type": "paragraph",
            "text": "Slow, heat-fueled reptilian healing that rewards good positioning and the desert identity. TRIGGER: This ability can be used at the end of the round, if your character suffer [5] or more damage during the round."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Immediately restore health [+2] and mana [+1]. If you are within [3] or at least two or more allies increase the health you restore by [+1]. If your Vurox is within [3] increase the mana you restore by [+1]."
          },
          {
            "type": "paragraph",
            "text": "COOLDOWN: This ability cannot be used again for [1d10/2+1] rounds after it is activated."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: INSTINCT | SAUREN | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "FURNACEHIDE"
          },
          {
            "type": "paragraph",
            "text": "The desert hardens both skin and spirit."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Reduce all incoming direct or standard damage by [-1]. Additionally, gain resistance [2] against fire and poison damage types."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: PASSIVE | SAUREN | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "CULTURE TRAITS"
          },
          {
            "type": "paragraph",
            "text": "NOMAD’S PROFESSION"
          },
          {
            "type": "paragraph",
            "text": "Sauren travel light and remember much."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Gain rank [+1] in the Wayfinding and Beastcraft skills."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: PASSIVE | CULTURE"
          },
          {
            "type": "paragraph",
            "text": "SCENT OF BLOOD"
          },
          {
            "type": "paragraph",
            "text": "Even the faintest scent of weakness stirs the Sauren’s instinct — a silent, inevitable pressure that crushes resolve."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] mana"
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: This ability can be used when an enemy character within [3] squares is compelled to make an attribute save."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: The target character suffers [-1] to the attribute save roll. If the save fails, the target also gains [-1] to ward until the end of their next turn."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: REACTION | HEX | CULTURE"
          }
        ]
      }
    ]
  },
  "species-urnath": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "URNATH"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "URNATH (UR-NATH)"
          },
          {
            "type": "paragraph",
            "text": "“In the cold we find our truth—fear shatters, lies freeze, but the heart that stands for others never breaks.”"
          },
          {
            "type": "paragraph",
            "text": "Theme: Winter, endurance and guardianship."
          },
          {
            "type": "paragraph",
            "text": "Traits: Frostwalker, Blood of the North, Keeper’s Roar."
          },
          {
            "type": "paragraph",
            "text": "Culture: Hearthward Oath, Rites of the Deep Winter. → Defensive tank with strong ally protection and elemental resistance."
          },
          {
            "type": "paragraph",
            "text": "The Urnath are towering guardians of the north, standing where frost and undeath meet. Clad in thick fur and unyielding resolve, they hold the line against the Blight—the cursed corruption unleashed when Covine the war-sorcerer tore open the veil during the Battle of Dominous. Since that day, the Urnath have watched the frozen horizon, sworn to prevent the undead legions from ever spilling across the world again."
          },
          {
            "type": "paragraph",
            "text": "Their clans are ruled by strength tempered with wisdom; each king chosen not by bloodline, but by deed. To the Urnath, battle is a sacred duty, never a tool of conquest. Though fearsome in war, their culture is gentle at its core—families are sacred, hospitality is a solemn responsibility, and the eternal hearthfire is revered as a living symbol of hope."
          },
          {
            "type": "paragraph",
            "text": "The Hearthfire, an immense pyre kept burning since the end of the Battle of Dominous, is housed within the citadel city Dawnmaw. It is said as long as its flames endure, so too shall the Urnath stand unbroken against the Blight."
          },
          {
            "type": "paragraph",
            "text": "Few Urnath travel beyond their frozen domain, but those who do are renowned as steadfast allies whose loyalty burns brighter than any forge."
          },
          {
            "type": "paragraph",
            "text": "Language: Ursidian, a deep, resonant language of growls and harmonic tones"
          },
          {
            "type": "paragraph",
            "text": "SPECIES TRAITS"
          },
          {
            "type": "paragraph",
            "text": "FROSTWALKER"
          },
          {
            "type": "paragraph",
            "text": "You stride through the cold as if it were air, your blood singing with winter’s stillness."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Your character gains resistance [+3] against cold damage and ignores movement penalties from icy or difficult terrain caused by weather or environment. NATURAL TERRAIN: If your character begins the round on icy terrain, they gain condition [+3] to ward until the end of their next turn. KEYWORDS: PASSIVE | URNATH | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "BLOOD OF THE NORTH"
          },
          {
            "type": "paragraph",
            "text": "Even at the edge of exhaustion, your heart burns steady beneath the frost. TRIGGER: This ability can be used when your character is reduced to [8] health or less. EFFECT: Immediately restore health [+3] and gain [+2] to guts until the end of your next turn."
          },
          {
            "type": "paragraph",
            "text": "COOLDOWN: This ability cannot be used again for [1d10/2+1] rounds after it is activated. KEYWORDS: REACTION | URNATH | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "KEEPER’S ROAR"
          },
          {
            "type": "paragraph",
            "text": "Your bellow carries the weight of ancestral duty, shaking both fear and frost from the hearts of your allies."
          },
          {
            "type": "paragraph",
            "text": "COST: [2] mana TRIGGER: This ability can be used during your turn. DECLARE: Target all ally characters within orb [4]. EFFECT: Each target gains [+1] to ward and attribute saves until the end of the next round. RESTRICTIONS: A character cannot be affected by multiple instances of keeper’s roar from different sources. KEYWORDS: INSTINCT | ENHANCE | URNATH | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "CULTURE TRAITS"
          },
          {
            "type": "paragraph",
            "text": "HEARTHWARD OATH"
          },
          {
            "type": "paragraph",
            "text": "To the Urnath, protection is sacred—every home, every life a flame worth defending."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: When an ally within [3] squares suffers damage that would reduce their health below [5], your character may redirect that damage to themselves. After resolving the damage, gain [+1] to guts until the end of the next round. KEYWORDS: REACTION | ENHANCE | CULTURE"
          },
          {
            "type": "paragraph",
            "text": "RITES OF THE DEEP WINTER"
          },
          {
            "type": "paragraph",
            "text": "You have learned to honor the cold—in silence, stillness, and endurance."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Gain rank [+1] in the wayfinding skill and either lorekeeping or presence skill. KEYWORDS: PASSIVE | CULTURE"
          }
        ]
      }
    ]
  },
  "species-tordan": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "TORDAN"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "TORDAN (TOR-dan)"
          },
          {
            "type": "paragraph",
            "text": "“The world hurries. We do not. As some burdens are chosen. Others simply call your name.”"
          },
          {
            "type": "paragraph",
            "text": "TORDAN"
          },
          {
            "type": "paragraph",
            "text": "Theme: Patience and foresight."
          },
          {
            "type": "paragraph",
            "text": "Traits: Dreamshell, Steady Pace, Echo of Tomorrow."
          },
          {
            "type": "paragraph",
            "text": "Culture: Memorybrew, Deep Trance. → Magical foresight and attrition play; defensive casters."
          },
          {
            "type": "paragraph",
            "text": "The Tordan are wise keepers of the green depths, patient as the earth they cherish. With shells etched in ancient patterns, they carry history upon their backs and peace within their hearts."
          },
          {
            "type": "paragraph",
            "text": "Practitioners of alchemy, herbalism, and dreamwalking, the Tordan move easily between the seen and unseen. To the Tordan, dreams are not illusions but memories of the world itself—messages carried on currents of thought, echoing from ages long forgotten."
          },
          {
            "type": "paragraph",
            "text": "At the heart of their culture lies the Dream Pool, a vast whirlpool hidden in a sacred glade. Said to be as old as the first rain, it spirals endlessly downward, glowing with soft, shifting light. Legends claim its depths touch the dreams of all Anthro Mundas, allowing those who enter it to glimpse the fears, hopes, and futures of the world. The Tordan guard it with solemn devotion, for its waters are both a gift and a burden—revealing truths not all are ready to bear."
          },
          {
            "type": "paragraph",
            "text": "Slow to anger and slower to forget, the Tordan act with deliberate care in all things. Many mistake them for hermits, but those who earn their trust find the most steadfast allies imaginable."
          },
          {
            "type": "paragraph",
            "text": "Language: Tordesh, A breath-heavy, hissing tongue born of the desert winds- sharp, short, and powerful."
          },
          {
            "type": "paragraph",
            "text": "SPECIES TRAITS"
          },
          {
            "type": "paragraph",
            "text": "DREAMSHELL"
          },
          {
            "type": "paragraph",
            "text": "When the world strikes, the Tordan retreat inward — wrapped in the calm of their second sight."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] mana TRIGGER: This ability can be used when your character suffers direct or standard damage. EFFECT: Reduce the total damage dealt by [-2]. Additionally, after that ability is resolved, you can select one damage type and gain resistance [1] against the selected type until the end of the round."
          },
          {
            "type": "paragraph",
            "text": "COOLDOWN: This ability cannot be used again for [1d10/2] rounds after it is activated. KEYWORDS: REACTION | ENHANCE | TORDAN | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "STEADY PACE"
          },
          {
            "type": "paragraph",
            "text": "The Tordan move with deliberate patience, unhurried and unshaken by the world’s rush. EFFECT: Whenever your character uses a move ability reduce the total number of squares they are allowed to move by [-1]. Moreover, reduce the affects of all conditions, abilities, or effects that target your character and reduce their speed by [2]. KEYWORDS: PASSIVE | TORDAN | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "ECHO OF TOMORROW"
          },
          {
            "type": "paragraph",
            "text": "You act on echoes of what has not yet come — shaping the next moment before it arrives."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: This ability can be used at the start of the round. DECLARE: Choose [1] ally within [3] squares. EFFECT: The target ally gains [+1] to the strike roll for the next magical ability they use this round. If ability is successful, restore mana [+1] to your character. If ability fails, the target ally restores [1] mana. COOLDOWN: This ability cannot be used again for [1d10/2] rounds after it is activated. KEYWORDS: | INSTINCT | TORDAN | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "CULTURE TRAITS"
          },
          {
            "type": "paragraph",
            "text": "MEMORYBREW"
          },
          {
            "type": "paragraph",
            "text": "The Tordan distill memory itself into tincture and tea — wisdom steeped in patience."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Gain rank [+1] in the herbalry skill and either the lorekeeping or runecraft skill."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: PASSIVE | CULTURE | TORDAN"
          },
          {
            "type": "paragraph",
            "text": "DEEP TRANCE"
          },
          {
            "type": "paragraph",
            "text": "The Tordan’s meditation bridges the seen and unseen, mending more than flesh."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: This ability can be used at the end of the round. EFFECT: Reduce your characters speed by [-1] until the end of the next round and increase the amount of mana they generate at the start of the next round by [+2] KEYWORDS: INSTINCT | CULTURE |"
          }
        ]
      }
    ]
  },
  "species-virelan": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "VIRELAN"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "VIRELAN (VEER-eh-lan)"
          },
          {
            "type": "paragraph",
            "text": "“Elegance is a blade. Most simply admire it. To rise to it is beauty. To rise to it with purpose is destiny.”"
          },
          {
            "type": "paragraph",
            "text": "VIRELAN"
          },
          {
            "type": "paragraph",
            "text": "Theme: Airborne mastery and creative composure."
          },
          {
            "type": "paragraph",
            "text": "Traits: Airstep, Skyborn Reflexes, Composed Mind."
          },
          {
            "type": "paragraph",
            "text": "Culture: Artisan’s Discipline, Arcane Affinity. → Terrain-ignoring movement, spell economy, and edged saves."
          },
          {
            "type": "paragraph",
            "text": "The Virelan are luminous, expressive folk shaped by the grace and bearing of countless avian lineages. Their cities glimmer with glass, gold, and polished stone, perched upon storm-cut cliffs or soaring spires where the winds sing through crystal arches."
          },
          {
            "type": "paragraph",
            "text": "Magic itself is both science and scripture to them. In their grand libraries, scholars study the behavior of winds, storms, and arcane currents, seeking patterns in the chaos of the skies."
          },
          {
            "type": "paragraph",
            "text": "The Virelan also maintain vast collections of arcane relics—shards of fallen aeroliths, stormglass fragments, and whispering charms unearthed from Ancient ruins. Officially, these archives exist for study and preservation. Unofficially, some aeries covet objects best left buried, believing power and truth lie side by side. Among the Virelan, curiosity is a virtue."
          },
          {
            "type": "paragraph",
            "text": "Yet beneath their elegance and magical prying lies a current of quiet rivalry. Ambition glides on soft feathers, and prestige is often won not through battle, but through brilliance—artistic, magical, or political subterfuge. Proud, the Virelan believe life itself is a performance worth perfecting, each moment an opportunity to rise on unseen winds."
          },
          {
            "type": "paragraph",
            "text": "Language: Skylith, A high, crystalline language shaped by clipped syllables and airy resonance,"
          },
          {
            "type": "paragraph",
            "text": "SPECIES TRAITS"
          },
          {
            "type": "paragraph",
            "text": "AIRSTEP"
          },
          {
            "type": "paragraph",
            "text": "Every motion is an act of design; even a strike is a form of art."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] mana"
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When you use any move ability."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: When your character moves, they do not count has having passed through squares along their path and are unaffected by terrain, obstacles, or effects that trigger from moving through the squares."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: REACTIVE | VIRELAN | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "SKYBORN REFLEXES"
          },
          {
            "type": "paragraph",
            "text": "The Virelan react with a dancer’s poise — their movements guided by air and instinct alike."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: When your character is required to make an attribute save with a target of easy or medium, your dice roll for that save is considered edged. KEYWORDS: INSTINCT | VIRELAN | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "COMPOSED MIND"
          },
          {
            "type": "paragraph",
            "text": "When the moment falters, you breathe, adjust, and let the flow return."
          },
          {
            "type": "paragraph",
            "text": "trigger: This ability can be used when your character casts a spell or uses a magical ability that requires mana as a cost. EFFECT: If the spell or ability fails to strike or affect its target(s), restore half of the, actually, mana cost of the ability. COOLDOWN: This ability cannot be used again for [1d10/2+1] rounds after it is activated. RESTRICTIONS: If the triggering spell or magical ability can affect more than one target, you must fail all strike rolls or all targets must successfully resist the effect."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: REACTION | CULTURE"
          },
          {
            "type": "paragraph",
            "text": "CULTURE TRAITS"
          },
          {
            "type": "paragraph",
            "text": "ARTISAN’S DISCIPLINE"
          },
          {
            "type": "paragraph",
            "text": "Every Virelan learns the sacred patience of precision — mastery through repetition, not haste."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Gain rank [+1] in the Runecraft and either the Lorekeeping or Charm skill. KEYWORDS: PASSIVE | CULTURE"
          },
          {
            "type": "paragraph",
            "text": "Arcane Affinity"
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: This ability can be used at the start of the round."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Generate [+1] additional mana. Roll [1d10] on a result of [5] or higher generate another additional [2] mana."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: INSTINCT | VIRELAN | TRAIT"
          }
        ]
      }
    ]
  },
  "lore-invocation": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "INVOCATION SPELLS"
          },
          {
            "type": "paragraph",
            "text": "Whispering Wind"
          },
          {
            "type": "paragraph",
            "text": "The wild carries your voice across distance and dusk."
          },
          {
            "type": "paragraph",
            "text": "DECLARE: Summon a critter to carry your message. EFFECT: The critter delivers a short mental message to a target you name. RESTRICTIONS: The message can travel any distance but may be delayed by your watcher. KEYWORDS: MAGIC | INVOCATION | CANTRIP"
          },
          {
            "type": "paragraph",
            "text": "Soothing Bloom"
          },
          {
            "type": "paragraph",
            "text": "Life answers when kindness is given form."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] Mana DECLARE: Target one ally within [4] squares. EFFECT: The target restores [2] health. EMPOWER: Spend [+3] additional mana to increase range to [+4] squares and the target restores [4] health. KEYWORDS: ENHANCE | MAGIC | INVOCATION"
          },
          {
            "type": "paragraph",
            "text": "Barkskin Ward"
          },
          {
            "type": "paragraph",
            "text": "The calm strength of bark shields the fragile beneath."
          },
          {
            "type": "paragraph",
            "text": "COST: [2] Mana DECLARE: Target one ally within four [4] squares. EFFECT: The target gains [+2] guts until the end of their next turn. EMPOWER: Spend [+2] additional mana to increase effect by [+2]. KEYWORDS: ENHANCE | MAGIC | INVOCATION"
          },
          {
            "type": "paragraph",
            "text": "Wyrd Bolt"
          },
          {
            "type": "paragraph",
            "text": "A crack of woven power leaps through the air like a whispered oath."
          },
          {
            "type": "paragraph",
            "text": "COST: [3] Mana DECLARE: Target one character within [4] squares. TO HIT: Make a Magic Strike using (3d10) + Control + condition(s) against the target’s (3d10) + Ward + condition(s). EFFECT: Deal Heart + [5] direct arcane damage. EMPOWER: Spend [+3] additional mana to increase range to [+6] squares and damage by [+3]. KEYWORDS: MAGIC | INVOCATION"
          },
          {
            "type": "paragraph",
            "text": "Spectral Armament"
          },
          {
            "type": "paragraph",
            "text": "The air hums as a weapon of pure will takes shape."
          },
          {
            "type": "paragraph",
            "text": "COST: [2] Mana DECLARE: Summon a weapon of shimmering energy into your grasp. EFFECT: Select one weapon from the weapon equipment list. Selected weapon materializes in your grasp and functions as the real item."
          },
          {
            "type": "paragraph",
            "text": "EMPOWER: Spend [+2] additional mana to summon another weapon in a second hand. RESTRICTIONS: The summoned weapon obeys normal Might, hand, weapon, and equipment requirements. It cannot be sold or permanently retained. DURATION: Until the end of the encounter, until dismissed, or until ended by the universal Summon rule. KEYWORDS: ENHANCE | MAGIC | INVOCATION"
          },
          {
            "type": "paragraph",
            "text": "Veil Of Glimmer"
          },
          {
            "type": "paragraph",
            "text": "A shimmer of thought weaves light, color, and sound into gentle wonder."
          },
          {
            "type": "paragraph",
            "text": "DECLARE: Create a minor illusion or sensory effect within [6] squares. EFFECT: Conjure or alter harmless visual, auditory, or sensory phenomena—shift color, dim or brighten light, soften sound, or craft an image no larger than three [3] squares. Effects are temporary and fade when concentration ends. RESTRICTIONS: Cannot move independently, deal damage, cause harm, or create permanent change. KEYWORDS: MAGIC | INVOCATION | CANTRIP"
          },
          {
            "type": "paragraph",
            "text": "Spectral Hand"
          },
          {
            "type": "paragraph",
            "text": "An unseen hand reaches where yours cannot."
          },
          {
            "type": "paragraph",
            "text": "DECLARE: Manifest a spectral hand within eight [8] squares. EFFECT: Manipulate objects weighing up to five pounds or perform delicate tasks within [24] squares away."
          },
          {
            "type": "paragraph",
            "text": "RESTRICTIONS: Spell lasts up to three minutes in-game time or [3] rounds. Lasts until your third turn or combat ends. KEYWORDS: MAGIC | INVOCATION | CANTRIP"
          },
          {
            "type": "paragraph",
            "text": "Kinbound Call"
          },
          {
            "type": "paragraph",
            "text": "A loyal echo of spirit answers your summons."
          },
          {
            "type": "paragraph",
            "text": "COST: [2] Mana DECLARE: Summon a critter into an empty adjacent square. EFFECT: The summoned critter obeys your commands. Use the critter’s monster entry for statistics. RESTRICTIONS: You may only have one summon spell active at a time. Casting another summon spell automatically ends the previous one. Lasts until combat ends. KEYWORDS: MAGIC | INVOCATION"
          },
          {
            "type": "paragraph",
            "text": "Forager’s Gift"
          },
          {
            "type": "paragraph",
            "text": "The land provides for those who ask with respect."
          },
          {
            "type": "paragraph",
            "text": "DECLARE: Conjure simple food, drink, or mundane supplies within [5] squares. EFFECT: Create enough sustenance for up to [3] characters for one day. Conjured items vanish after twenty-four hours. RESTRICTIONS: Cannot be sold, traded, or used offensively. KEYWORDS: MAGIC | INVOCATION | CANTRIP"
          },
          {
            "type": "paragraph",
            "text": "Mendcraft"
          },
          {
            "type": "paragraph",
            "text": "The weave remembers what was once whole."
          },
          {
            "type": "paragraph",
            "text": "DECLARE: Touch a damaged nonliving object. EFFECT: Restore one [1] break value to the object. The target must be made of natural materials and be no larger than three [3] squares. KEYWORDS: ENHANCE | MAGIC | INVOCATION | CANTRIP"
          },
          {
            "type": "paragraph",
            "text": "Shadeveil"
          },
          {
            "type": "paragraph",
            "text": "The unseen world folds its shadow around you."
          },
          {
            "type": "paragraph",
            "text": "COST: [2] Mana DECLARE: Cast upon an ally within [4] squares. EFFECT: The target becomes invisible, gaining [+2] to all dice rolls against any characters that cannot see them. RESTRICTIONS: Effect ends if the target performs any action or otherwise reveals themselves. Lasts until combat ends. KEYWORDS: ENHANCE | MAGIC | INVOCATION"
          },
          {
            "type": "paragraph",
            "text": "Hearth Vow"
          },
          {
            "type": "paragraph",
            "text": "The promise of flame binds blade and spirit as one."
          },
          {
            "type": "paragraph",
            "text": "COST: [2] Mana DECLARE: Target one ally within four [4] squares. EFFECT: The target gains [+1] to strike or ward rolls (their choice) until the end of their next turn. RESTRICTIONS: Cannot stack from multiple sources."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: ENHANCE | MAGIC | INVOCATION"
          },
          {
            "type": "paragraph",
            "text": "Unraveling Word"
          },
          {
            "type": "paragraph",
            "text": "You sever the threads that hold another’s power together."
          },
          {
            "type": "paragraph",
            "text": "COST: [2] Mana DECLARE: Target one ally within four [4] squares. EFFECT: The target can use the ability renew the heart immediately, without cost. KEYWORDS: ENHANCE | MAGIC | INVOCATION"
          }
        ]
      }
    ]
  },
  "lore-flames": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "LORE OF FLAMES"
          },
          {
            "type": "paragraph",
            "text": "The Lore of Flames is power given heat and hunger. Those attuned to it bring light where there’s shadow, fury where there’s resistance, and cleansing where there’s rot. Flame consumes, but it also purifies and sustains. To wield it is to decide what should burn — and what should endure."
          },
          {
            "type": "paragraph",
            "text": "Immolation"
          },
          {
            "type": "paragraph",
            "text": "The ember takes hold; pain lingers, waiting to bloom."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When you successfully resolve any Lore of Flames Spell against a target. DECLARE: Choose [1] target successfully affected by the triggering Spell. EFFECT: The target gains Immolation until the start of the next round. Each time that character is successfully affected by another Lore of Flames Spell before Immolation ends, it suffers [1] Lethal On-Going fire damage. RESTRICTIONS: A single character can trigger Immolation a maximum of [3] times per round. KEYWORDS: HEX | MAGIC | FLAMES | SIGNATURE"
          },
          {
            "type": "paragraph",
            "text": "Scorching Hand"
          },
          {
            "type": "paragraph",
            "text": "Heat leaps from your grasp, clinging like hungry cinders."
          },
          {
            "type": "paragraph",
            "text": "COST: [4] Mana DECLARE: Target [1] enemy character within [4] squares. TO HIT: Make a Magic Strike using (3d10) + Control + condition(s) against the target’s (3d10) + Ward + condition(s). EFFECT: Deal Heart + [6] Direct fire damage and the target gains Immolation."
          },
          {
            "type": "paragraph",
            "text": "EMPOWER: Spend [+2] additional mana. If you do, increase damage by [+1], and the target gains Immolation twice, instead of once."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: MAGIC | FLAMES"
          },
          {
            "type": "paragraph",
            "text": "Blazing Weapon"
          },
          {
            "type": "paragraph",
            "text": "Steel drinks fire and answers in kind."
          },
          {
            "type": "paragraph",
            "text": "COST: [5] Mana DECLARE: Target [1] ally character within [4] squares wielding a weapon. EFFECT: Increase the target weapons damage by [+1] and damage type to fire, until the end of the next round. AFTERBURN: Any character that suffers damage from the target weapon suffers [1] Lethal On-Going fire damage at the start of the following round."
          },
          {
            "type": "paragraph",
            "text": "RESTRICTION: This spell cannot trigger Immolation and the target weapon’s fire damage cannot trigger Immolation. KEYWORDS: ENHANCE | MAGIC | FLAMES"
          },
          {
            "type": "paragraph",
            "text": "Fire Bolt"
          },
          {
            "type": "paragraph",
            "text": "Purifying flame tears forward in a focused burst."
          },
          {
            "type": "paragraph",
            "text": "COST: [6] Mana DECLARE: Target [1] enemy character within [4] squares. TO HIT: Make a Magic Strike using (3d10) + Control + condition(s) against the target’s (3d10) + Ward + condition(s). EFFECT: Deal Heart + [7] Direct fire damage."
          },
          {
            "type": "paragraph",
            "text": "EMPOWER: Spend [+3] additional mana. If you do, increase damage by [+2], and the target gains Immolation."
          },
          {
            "type": "paragraph",
            "text": "PURIFY: If the target has Undeath, Flammable, Curse, Disease, Corruption, or Unclean, increase this Spell’s printed damage by [+4]."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: MAGIC | FLAMES"
          },
          {
            "type": "paragraph",
            "text": "Cascading Fire"
          },
          {
            "type": "paragraph",
            "text": "What catches, spreads."
          },
          {
            "type": "paragraph",
            "text": "COST: [7] Mana DECLARE: Select a point of origin within [4] squares. Target all characters within ORB[4] expanding from that point of origin. TO HIT: Renew the Heart (Medium) save. EFFECT: On a failed save, Deal Heart + [5] Direct fire damage."
          },
          {
            "type": "paragraph",
            "text": "ENGULF: A character that enters or moves through the Orb suffers [2] Lethal On-Going fire damage. ENGULF can damage the same character only once per turn."
          },
          {
            "type": "paragraph",
            "text": "DURATION: This effect lasts [1d10/2] rounds, effects end at the start of the round. KEYWORDS: MAGIC | FLAMES | ORB"
          },
          {
            "type": "paragraph",
            "text": "Inferno Strike"
          },
          {
            "type": "paragraph",
            "text": "A focused blast of living flame that will not let go."
          },
          {
            "type": "paragraph",
            "text": "COST: [6] Mana DECLARE: Target [1] enemy character within [4] squares. TO HIT: Make a Magic Strike using (3d10) + Control + condition(s) against the target’s (3d10) + Ward + condition(s). EFFECT: Deal Heart + [4] Direct fire damage. BURN: Any character that suffers DAMAGE from this spell suffers [1] Lethal On-Going fire damage at the start of the following round. DURATION: This effect lasts [1d10/2] rounds, ending at the start of the resulting round. KEYWORDS: MAGIC | FLAMES"
          },
          {
            "type": "paragraph",
            "text": "Infernal Rebuke"
          },
          {
            "type": "paragraph",
            "text": "Pain answers pain."
          },
          {
            "type": "paragraph",
            "text": "COST: [6] Mana DECLARE: Target [1] enemy character within [4] squares. TO HIT: Renew the Heart (Medium) save. EFFECT: On a failed save, deal Heart + [3] Lethal fire damage to the target. EMPOWER: Spend [+2] additional mana. If you do, increase damage by [+2], and the target gains Immolation."
          },
          {
            "type": "paragraph",
            "text": "REBUKE: If the target of this spell has dealt any damage to the caster, since the end of the caster’s last turn, reduce the mana cost of this spell by [-2]."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: HEX | MAGIC | FLAMES"
          },
          {
            "type": "paragraph",
            "text": "Sun Burst"
          },
          {
            "type": "paragraph",
            "text": "Light without mercy."
          },
          {
            "type": "paragraph",
            "text": "COST: [8] Mana DECLARE: Target all enemy characters within orb[5] centered on a point of origin within [4] squares. TO HIT: Renew the Heart (Medium) save. EFFECT: On a failed save, targets suffer Heart + [1] Lethal fire damage and [-2] to strike and ward rolls; and the targets gain Immolation."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: HEX | MAGIC | FLAMES | ORB"
          },
          {
            "type": "paragraph",
            "text": "Detonation"
          },
          {
            "type": "paragraph",
            "text": "Fire learns patience — then teaches regret."
          },
          {
            "type": "paragraph",
            "text": "COST: [9] Mana DECLARE: Target [1] enemy character within [4] squares. TO HIT: Renew the Heart (Medium) save. EFFECT: On the initial failed save, roll [1d10] and consult the Detonation results. The first damaging result adds Heart once; damage from later Detonation checks is On-Going and uses exactly the printed value. BURST (1–3): Deal [3] Lethal fire damage immediately. At the start of the next round, the target makes another Medium Renew the Heart save; on failure, roll on the Detonation table again. PRESSURE (4–7): Nothing happens immediately. At the start of the next round, the target makes another Medium Renew the Heart save; on failure, roll on the Detonation table again, and on success the Spell ends. CATASTROPHE (8–10): Deal [6] Lethal fire damage immediately and the Spell ends. RESTRICTIONS: Damage caused by a later Detonation check is On-Going damage and uses exactly the printed value. DURATION: This effect lasts [1d10/2+1] rounds, ending at the start of the resulting round. KEYWORDS: HEX | MAGIC | FLAMES"
          }
        ]
      }
    ]
  },
  "lore-wilds": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "LORE OF WILDS"
          },
          {
            "type": "paragraph",
            "text": "The Lore of Wilds commands the primal forces of nature — the restless spirits of root, claw, and storm. Defenders of the natural order, neither purely healer nor destroyer, but a force of balance in motion."
          },
          {
            "type": "paragraph",
            "text": "Flourishing Earth"
          },
          {
            "type": "paragraph",
            "text": "Life and death share one rhythm; the wild decides which blooms."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When you successfully cast any lore of wilds spell. DECLARE: Target [1] ally within [5] squares. EFFECT: Reduce a negative condition from the target by[-1]. This can reduce the condition to zero but does not remove the condition or ends it duration. KEYWORDS: ENHANCE | MAGIC | WILDS | SIGNATURE"
          },
          {
            "type": "paragraph",
            "text": "Elemental Armor"
          },
          {
            "type": "paragraph",
            "text": "The elements answer the call, forming a living shell of power."
          },
          {
            "type": "paragraph",
            "text": "COST: [4] Mana DECLARE: Target [1] ally within [5] squares. EFFECT: The target gains resistance [+2] against a chosen damage type until the start of their next turn. EMPOWER: Spend [+2] additional mana to grant resistance [+2] to a second damage type. KEYWORDS: ENHANCE | MAGIC | WILDS"
          },
          {
            "type": "paragraph",
            "text": "Curse Of Patronus"
          },
          {
            "type": "paragraph",
            "text": "The guardian spirits turn their wrath upon the impure."
          },
          {
            "type": "paragraph",
            "text": "COST: [5] Mana DECLARE: Target up to [3] enemy characters within [4] squares. TO HIT: Renew the Heart (Easy) save. EFFECT: Each target that fails the save suffers Heart + [3] Lethal nature damage and gains [-1] to Strike rolls made with Magic Abilities until the end of their next turn. KEYWORDS: HEX | MAGIC | WILDS | ORB"
          },
          {
            "type": "paragraph",
            "text": "Moon Bolt"
          },
          {
            "type": "paragraph",
            "text": "A shaft of cold light tears through shadow and pride alike."
          },
          {
            "type": "paragraph",
            "text": "COST: [7] Mana DECLARE: Target [1] enemy character within [5] squares. TO HIT: Renew the Heart (Easy) save. EFFECT: On a failed save, deal Heart + [8] Direct nature damage. On a successful save, suffer half that damage, rounded down. KEYWORDS: MAGIC | WILDS"
          },
          {
            "type": "paragraph",
            "text": "Hallowing Thorns"
          },
          {
            "type": "paragraph",
            "text": "The ground twists and bristles with the wild’s fury."
          },
          {
            "type": "paragraph",
            "text": "COST: [9] Mana DECLARE: Target an area within [5] squares; create an orb[4]. TO HIT: Renew the Heart (Easy) save. EFFECT: Each enemy that fails the save suffers Heart + [10] direct nature damage."
          },
          {
            "type": "paragraph",
            "text": "DIFFICULT TERRAIN: The targeted squares become difficult terrain until the end of the next round. A character moving through those squares makes an Easy Renew the Heart save. On failure, it suffers [1] Lethal On-Going nature damage. This terrain damage can affect the same character only once per turn. DURATION: [1d10/2] rounds, effects end at the start of the round. KEYWORDS: MAGIC | WILDS | ORB"
          },
          {
            "type": "paragraph",
            "text": "Blessing Of The Wilds"
          },
          {
            "type": "paragraph",
            "text": "The wind and soil conspire to lift and shelter those who walk in harmony."
          },
          {
            "type": "paragraph",
            "text": "COST: [8] Mana DECLARE: Target all ally characters within orb[6]. EFFECT: Each target chooses one: gain condition [+1] to strike or [+1] to ward and swift strider, until the end of their next turn. SWIFT STRIDER: Target(s) ignore difficult terrain. RESTRICTIONS: A character cannot be affected by multiple instances of blessing of the wilds"
          },
          {
            "type": "paragraph",
            "text": "from different sources. KEYWORDS: ENHANCE | MAGIC | WILDS | ORB"
          },
          {
            "type": "paragraph",
            "text": "Wild Shape"
          },
          {
            "type": "paragraph",
            "text": "Your body bends and shifts, becoming one with primal instinct."
          },
          {
            "type": "paragraph",
            "text": "COST: [6] Mana DECLARE: Cast on yourself. EFFECT: Gain [+2] to strike, ward, guts, and all non-magical damage until the start of your next turn. EMPOWER: Spend [+3] additional mana to cast this spell on an ally within [5] squares. KEYWORDS: ENHANCE | MAGIC | WILDS"
          },
          {
            "type": "paragraph",
            "text": "Call Of The Beast"
          },
          {
            "type": "paragraph",
            "text": "The wilds themselves answer your plea with tooth and claw."
          },
          {
            "type": "paragraph",
            "text": "COST: [11] Mana DECLARE: Choose one empty square within [4] squares. EFFECT: summon one beast monster with a threat level of [4] or lower. The beast is added to the Initiative Order immediately after your turn until defeated or dismissed. RESTRICTIONS: A caster may only have one summon Spell active at a time. Casting another summon Spell ends the previous summon unless otherwise stated. Damage dealt by the summoned beast uses its own profile and never adds the summoner’s Heart. KEYWORDS: MAGIC | WILDS"
          },
          {
            "type": "paragraph",
            "text": "Breath Of Life"
          },
          {
            "type": "paragraph",
            "text": "Even destruction becomes renewal beneath the wild’s grace."
          },
          {
            "type": "paragraph",
            "text": "COST: [10] Mana DECLARE: Target all enemy characters within CONE[6]. TO HIT: Renew the Heart (Medium) save. EFFECT: Each target that fails the save suffers Heart + [3] Lethal nature damage. For each enemy character that suffers damage from this spell, select one ally character within [6] squares and restore [2] health. KEYWORDS: MAGIC | WILDS | CONE"
          }
        ]
      }
    ]
  },
  "lore-oath": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "LORE OF OATHS"
          },
          {
            "type": "paragraph",
            "text": "The Lore of Oaths binds word to will. Those who swear upon their honor shape the unseen forces of duty, loyalty, and conviction into tangible power."
          },
          {
            "type": "paragraph",
            "text": "Oath Of Protection"
          },
          {
            "type": "paragraph",
            "text": "A vow sworn in truth hardens the heart and shields the worthy."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When you successfully cast any lore of oaths spell. DECLARE: Choose [1] ally character within [5] squares. EFFECT: The chosen character gains [+2] to guts until the start of the next round. RESTRICTIONS: A character cannot benefit from multiple instances of oath of protection. KEYWORDS: ENHANCE | MAGIC | OATHS | SIGNATURE"
          },
          {
            "type": "paragraph",
            "text": "Word Of Challenge"
          },
          {
            "type": "paragraph",
            "text": "To stand before the foe is to demand their respect—or their fear."
          },
          {
            "type": "paragraph",
            "text": "COST: [4] Mana DECLARE: Target [1] enemy character within [5] squares. TO HIT: Renew the Heart (Medium) save. EFFECT: On a failed save, their outgoing damage against targets other than the caster is reduced by [-2], to a minimum of [1], until the end of their next turn. KEYWORDS: HEX | MAGIC | OATHS | ORB"
          },
          {
            "type": "paragraph",
            "text": "Thunder’s Fury"
          },
          {
            "type": "paragraph",
            "text": "The storm answers a promise of retribution. COST: [5] Mana DECLARE: Target [1] ally character within [5] squares wielding a weapon. EFFECT: Increase the target weapon’s damage by [+1] and change the damage type to lightning, until the end of the next round. AFTERBURN: Any character that suffers damage from the target weapon suffers [1] Lethal On-Going lightning damage at the start of the following round."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: ENHANCE | MAGIC | OATHS"
          },
          {
            "type": "paragraph",
            "text": "Power Word: Reinforcement"
          },
          {
            "type": "paragraph",
            "text": "Your vow steadies the hands and hearts of those who fight beside you."
          },
          {
            "type": "paragraph",
            "text": "COST: [6] Mana DECLARE: Target [1] ally character within [5] squares. EFFECT: The target decreases all damage categories by [1]. Lethal DAMAGE changes to direct and direct damage changes to standard. DURATION: Until the target suffers its next incoming damaging attack, or until the start of its next turn, whichever comes first. KEYWORDS: ENHANCE | MAGIC | OATHS"
          },
          {
            "type": "paragraph",
            "text": "Vow Of Elements"
          },
          {
            "type": "paragraph",
            "text": "Through oath and focus, you command the world’s primal powers to defend your ally."
          },
          {
            "type": "paragraph",
            "text": "COST: [4] Mana DECLARE: Target [1] ally character within [5] squares. EFFECT: The target selects [1] DAMAGE type and gain resistance [+2] against that type until the end of their next turn. KEYWORDS: ENHANCE | MAGIC | OATHS"
          },
          {
            "type": "paragraph",
            "text": "Wind Scaring"
          },
          {
            "type": "paragraph",
            "text": "A surge of cutting energy carries your oath’s fury across the field."
          },
          {
            "type": "paragraph",
            "text": "COST: [4] Mana DECLARE: Target [1] ally character within [5] squares wielding a weapon. EFFECT: Increase the target weapon’s damage by [+1] and change the damage type to arcane, until the end of the next round."
          },
          {
            "type": "paragraph",
            "text": "THUNDERSTORM: If the target weapon is affected by both Thunder’s Fury and Wind Scaring, increase the total bonus damage from the combined effects by [+1]. Do not increase each Spell independently. The weapon retains both damage types for the duration. KEYWORDS: ENHANCE | MAGIC | OATHS"
          },
          {
            "type": "paragraph",
            "text": "Primal Surge"
          },
          {
            "type": "paragraph",
            "text": "You channel raw conviction into flesh and faith."
          },
          {
            "type": "paragraph",
            "text": "COST: [7] Mana DECLARE: Target [1] ALLY within [5] squares. EFFECT: The target restores health [+4] and gains [+2] to strike rolls until the end of their next turn. KEYWORDS: ENHANCE | MAGIC | OATHS"
          },
          {
            "type": "paragraph",
            "text": "The Immortal Warrior"
          },
          {
            "type": "paragraph",
            "text": "You become the living symbol of your vow, standing against all that would falter."
          },
          {
            "type": "paragraph",
            "text": "COST: [9] Mana DECLARE: Cast on yourself. EFFECT: Gain [+2] to ward and guts until the end of your next turn."
          },
          {
            "type": "paragraph",
            "text": "DEFECTION: Once per round, when you are the target of a damaging attack, make a Medium Renew the Heart save. On failure, resolve the attack normally. On success, suffer no damage and reflect half the intended damage back at the attacker, rounded down. Reflected damage uses exactly the reflected value and does not add Heart. KEYWORDS: ENHANCE | MAGIC | OATHS"
          },
          {
            "type": "paragraph",
            "text": "Oathkeeper"
          },
          {
            "type": "paragraph",
            "text": "Your promise shields your comrades and punishes betrayal."
          },
          {
            "type": "paragraph",
            "text": "COST: [10] Mana DECLARE: Target all enemy characters within orb[5] of the caster TO HIT: Renew the Heart (Medium) save. EFFECT: Each target that fails the save has its outgoing damage against targets other than the caster reduced by [-5], to a minimum of [1], until the end of their next turn. KEYWORDS: HEX | MAGIC | OATHS | ORB"
          }
        ]
      }
    ]
  },
  "lore-frost": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "LORE OF FROST"
          },
          {
            "type": "paragraph",
            "text": "The Lore of Frost draws power from stillness, silence, and the patience of winter. Those attuned to it bring calm where there was motion, memory where there was flame, and endurance where there was weakness."
          },
          {
            "type": "paragraph",
            "text": "Hypothermia"
          },
          {
            "type": "paragraph",
            "text": "The air stills; the warmth of life falters beneath an unseen chill."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When you successfully cast any lore of frost spell. DECLARE: Choose one enemy character within [5] squares. TO HIT: Renew the Heart (Easy) save. EFFECT: On a failed save, the target suffers [-1] to speed until the end of their next turn. RESTRICTIONS: A single character can suffer a maximum of [3] Hypothermia applications per round. KEYWORDS: HEX | MAGIC | FROST | SIGNATURE"
          },
          {
            "type": "paragraph",
            "text": "Mind Freeze"
          },
          {
            "type": "paragraph",
            "text": "Frost creeps through the mind, locking thought in brittle silence."
          },
          {
            "type": "paragraph",
            "text": "COST: [3] Mana DECLARE: Target [1] enemy character within [5] squares. TO HIT: Renew the Heart (Easy) save. EFFECT: On a failed save, they suffer [-1] to all attribute saves until the end of their next turn. KEYWORDS: HEX | MAGIC | FROST"
          },
          {
            "type": "paragraph",
            "text": "Frost Shock"
          },
          {
            "type": "paragraph",
            "text": "A pulse of frozen energy shatters the air, leaving a biting trail of rime."
          },
          {
            "type": "paragraph",
            "text": "COST: [4] Mana DECLARE: Target [1] enemy character within [5] squares. TO HIT: Make a Magic Strike using (3d10) + Control + condition(s) against the target’s (3d10) + Ward + condition(s). EFFECT: Deal Heart + [5] Direct cold damage. The target suffers [-1] to guts until the end of their next turn. KEYWORDS: MAGIC | FROST"
          },
          {
            "type": "paragraph",
            "text": "Biting Blade"
          },
          {
            "type": "paragraph",
            "text": "Steel cracks beneath the weight of winter’s edge."
          },
          {
            "type": "paragraph",
            "text": "COST: [4] Mana DECLARE: Target [1] enemy character within [5] squares wielding a weapon. TO HIT: Renew the Heart (Easy) save. EFFECT: On a failed save, reduce the target weapons damage by [-1] until the end of the next round. KEYWORDS: HEX | MAGIC | FROST"
          },
          {
            "type": "paragraph",
            "text": "Torrent Of Frost"
          },
          {
            "type": "paragraph",
            "text": "A wave of white wind bursts outward, freezing flesh and breath alike."
          },
          {
            "type": "paragraph",
            "text": "COST: [7] Mana DECLARE: Target all characters within a cone[5]. TO HIT: Renew the Heart (Medium) save. EFFECT: On a failed save, deal Heart + [2] Lethal cold damage. On a successful save, suffer [1] Lethal cold damage instead. Targets that fail also suffer [-1] to guts until the end of their next turn. KEYWORDS: MAGIC | FROST | CONE"
          },
          {
            "type": "paragraph",
            "text": "Ice Wall"
          },
          {
            "type": "paragraph",
            "text": "A wall of glittering frost rises, sealing paths and muting sound."
          },
          {
            "type": "paragraph",
            "text": "COST: [8] Mana DECLARE: Target all characters within a line[5]. TO HIT: Make a Magic Strike using (3d10) + Control + condition(s) against the target’s (3d10) + Ward + condition(s). Resolve this separately against each character initially hit by the Line. The terrain rider uses its separately printed Renew the Heart save. EFFECT: Each target successfully hit suffers Heart + [4] Direct cold damage and gains [-2] to their next roll made, until the end of the round. Additionally, the targeted squares become difficult terrain until the end of the next round. A character moving through those squares makes a Medium Renew the Heart save. On failure, it suffers [1] Lethal On-Going cold damage. This terrain damage can affect the same character only once per turn.. KEYWORDS: MAGIC | FROST"
          },
          {
            "type": "paragraph",
            "text": "Polar Vortex"
          },
          {
            "type": "paragraph",
            "text": "A spiral of biting wind draws heat and will from the air."
          },
          {
            "type": "paragraph",
            "text": "COST: [8] Mana DECLARE: Select a point of origin within [5] squares. Target all characters within orb[5] expanding from that point of origin. TO HIT: Renew the Heart (Medium) save. EFFECT: On a failed save, deal Heart + [2] Lethal cold damage and targets suffer [-1] to ward until the end of their next turn. KEYWORDS: HEX | MAGIC | FROST"
          },
          {
            "type": "paragraph",
            "text": "Frostbite"
          },
          {
            "type": "paragraph",
            "text": "The chill gnaws deep, numbing flesh and thought alike."
          },
          {
            "type": "paragraph",
            "text": "COST: [6] Mana DECLARE: Target [1] enemy character within [5] squares. TO HIT: Renew the Heart (Medium) save. EFFECT: On a failed save, deal Heart + [5] Direct cold damage and the target suffers [-1] to speed until the end of their next turn. On a successful save, resist the Speed effect and suffer half that damage, rounded down. KEYWORDS: MAGIC | FROST"
          },
          {
            "type": "paragraph",
            "text": "Icy Tomb"
          },
          {
            "type": "paragraph",
            "text": "A prison of frost closes around the living, sealing motion in silence."
          },
          {
            "type": "paragraph",
            "text": "COST: [10] Mana DECLARE: Target [1] enemy character within [5] squares. TO HIT: Renew the Heart (Difficult) save. EFFECT: On a failed save, reduce target’s speed to [1], suffer [-2] to strike and ward rolls. Additionally, reduce all healing effects that restore health by [-2] and increase all damage suffered by [+2]."
          },
          {
            "type": "paragraph",
            "text": "REPEAT SAVE: At the start of the target’s turn, make a Medium Renew the Heart save. On success, Icy Tomb ends. DURATION: This effect lasts [1d10/2] rounds, effects end at the start of the round."
          },
          {
            "type": "paragraph",
            "text": "RESTRICTION: LETHAL DAMAGE suffered is not affected by this Spell. KEYWORDS: HEX | MAGIC | FROST"
          }
        ]
      }
    ]
  },
  "lore-hallows": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "LORE OF HALLOWS"
          },
          {
            "type": "paragraph",
            "text": "The Lore of Hallows delves into the howling void between life and death — a place of whispers, echoes, and madness. Channeling fear and despair into devastating magic that tears at both body and mind."
          },
          {
            "type": "paragraph",
            "text": "Scary Face"
          },
          {
            "type": "paragraph",
            "text": "A malevolent grin embodies the sinister nature of the Hallows, leaving its victims trembling and faltering in their focus."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When you successfully cast any lore of hallows spell. DECLARE: Choose [1] enemy character within [5] squares. TO HIT: Renew the Heart (Easy) save. EFFECT: On a failed save, reduce the target’s Magic Regen at the start of the next round by [-1]. RESTRICTIONS: A character can only be affected by Scary Face once per round. KEYWORDS: HEX | MAGIC | HALLOWS | SIGNATURE"
          },
          {
            "type": "paragraph",
            "text": "Soulfire Bolt"
          },
          {
            "type": "paragraph",
            "text": "A chilling bolt of haunted energy rips through the veil, searing flesh and unraveling sanity."
          },
          {
            "type": "paragraph",
            "text": "COST: [6] Mana DECLARE: Target [1] enemy character within [5] squares. TO HIT: Make a Magic Strike using (3d10) + Control + condition(s) against the target’s (3d10) + Ward + condition(s). EFFECT: Deal Heart + [6] Standard psychic damage. SAVE: After a successful Magic Strike, the target makes a Medium Renew the Heart save. ON FAILURE: The target suffers an additional [1] Lethal psychic damage. EMPOWER: Spend [+2] additional Mana. Increase the primary damage by [+2]. KEYWORDS: MAGIC | HALLOWS"
          },
          {
            "type": "paragraph",
            "text": "Hex Of Misfortune"
          },
          {
            "type": "paragraph",
            "text": "The Hallows twist the strands of fate, cursing your foe with wretched luck."
          },
          {
            "type": "paragraph",
            "text": "COST: [4] Mana DECLARE: Target [1] enemy character within [5] squares. TO HIT: Renew the Heart (Easy) save. EFFECT: On a failed save, the target gains [-1] to using renew the heart until the end of the next round. EMPOWER: Spend [+2] additional mana. Reduce the target’s ward by [-2] and extend the duration to [2] rounds. KEYWORDS: HEX | MAGIC | HALLOWS"
          },
          {
            "type": "paragraph",
            "text": "Eerie Apparition"
          },
          {
            "type": "paragraph",
            "text": "A spectral vision of doom rises before your foe, driving terror deep into their mind."
          },
          {
            "type": "paragraph",
            "text": "COST: [5] Mana DECLARE: Target [1] enemy character within [5] squares. TO HIT: Renew the Heart (Medium) save. EFFECT: On a failed save, the target moves [3] squares in any direction away from you. If they cannot move or be moved, they suffer [2] Lethal On-Going psychic damage instead. DRIVING FEAR: At the start of the next round, the target makes an Easy Renew the Heart save. On failure, they move [2] squares in any direction away from you. If they cannot move or be moved, they suffer [2] Lethal On-Going psychic damage instead. KEYWORDS: HEX | MAGIC | HALLOWS"
          },
          {
            "type": "paragraph",
            "text": "Shroud Of Despair"
          },
          {
            "type": "paragraph",
            "text": "You cloak your ally in the wailing fog of the Hallows, turning despair into protection."
          },
          {
            "type": "paragraph",
            "text": "COST: [6] Mana DECLARE: Target [1] ally character within [5] squares. EFFECT: The target applies [-2] to all strike rolls against them, until the end of the next round. RESTRICTIONS: A character cannot be affected by multiple instances of shroud of despair from different sources. KEYWORDS: ENHANCE | MAGIC | HALLOWS"
          },
          {
            "type": "paragraph",
            "text": "Spectral Grasp"
          },
          {
            "type": "paragraph",
            "text": "Your hand becomes a conduit of nightmare energy, reaching through the veil to rend flesh and spirit alike."
          },
          {
            "type": "paragraph",
            "text": "COST: [7] Mana DECLARE: Target [1] enemy character within [5] squares. TO HIT: Renew the Heart (Easy) save. EFFECT: On a failed save, deal Heart + [7] Standard psychic damage. On a successful save, suffer half that damage, rounded down. EMPOWER: Spend [+2] additional Mana. Increase the Renew the Heart difficulty from Easy to Medium. KEYWORDS: MAGIC | HALLOWS"
          },
          {
            "type": "paragraph",
            "text": "Pierce The Veil"
          },
          {
            "type": "paragraph",
            "text": "You draw your ally into the Hallows’ ethereal threshold, where nothing solid can harm them."
          },
          {
            "type": "paragraph",
            "text": "COST: [6] Mana"
          },
          {
            "type": "paragraph",
            "text": "DECLARE: Target [1] ally character within [5] squares. EFFECT: The target becomes ethereal until the start of your next turn. ETHEREAL: Target characters cannot use any abilities, suffer any damage or otherwise interact with the tangle world."
          },
          {
            "type": "paragraph",
            "text": "RESTRICTIONS: A character cannot be affected by multiple instances of PIERCE THE VEIL. KEYWORDS: ENHANCE | MAGIC | HALLOWS"
          },
          {
            "type": "paragraph",
            "text": "Spectral Reckoning"
          },
          {
            "type": "paragraph",
            "text": "You summon vengeful spirits to lash at the soul of your enemy."
          },
          {
            "type": "paragraph",
            "text": "COST: [9] Mana DECLARE: Target [1] enemy character within [5] squares. TO HIT: Renew the Heart (Medium) save. EFFECT: On a failed save, deal Heart + [8] Standard psychic damage. On a successful save, suffer half that damage, rounded down. EMPOWER: Spend [+3] additional Mana. Increase the Renew the Heart difficulty from Medium to Difficult. KEYWORDS: MAGIC | HALLOWS"
          },
          {
            "type": "paragraph",
            "text": "Vortex Of Shadows"
          },
          {
            "type": "paragraph",
            "text": "The void awakens, howling with the cries of the lost."
          },
          {
            "type": "paragraph",
            "text": "COST: [10] Mana DECLARE: Select a point of origin within [5] squares. Target enemy characters within ORB[5] expanding from that point of origin. TO HIT: Renew the Heart (Medium) save. EFFECT: On a failed save, deal Heart + [6] Standard psychic damage and gain condition[-2] on their initiative order position. On a successful save, suffer half that damage, rounded down. EMPOWER: Spend [+3] additional mana. Increase the initiative condition to [-4]. KEYWORDS: HEX | MAGIC | HALLOWS | ORB"
          }
        ]
      }
    ]
  },
  "lore-harmony": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "LORE OF HARMONY"
          },
          {
            "type": "paragraph",
            "text": "The Lore of Harmony weaves sound, emotion, and magic into one unbroken resonance. Through voice, instrument, or will alone, they shape vibration into both solace and devastation."
          },
          {
            "type": "paragraph",
            "text": "Chorus Of Harmony"
          },
          {
            "type": "paragraph",
            "text": "The first note steadies the spirit; the second calls the world to listen."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When you successfully cast any Lore of Harmony Spell. DECLARE: Choose [1] friendly character within [6] squares. EFFECT: The chosen character reduces the Mana cost of their next Spell by [-1], to a minimum of [1]. RESTRICTIONS: A character cannot be affected by multiple instances of Chorus Of Harmony from different sources. KEYWORDS: ENHANCE | MAGIC | HARMONY | SIGNATURE"
          },
          {
            "type": "paragraph",
            "text": "Ballad Of The Courageous"
          },
          {
            "type": "paragraph",
            "text": "A brave melody lifts hearts beyond fear and doubt."
          },
          {
            "type": "paragraph",
            "text": "COST: [3] Mana DECLARE: Target all ally characters within ORB[5] of the caster. EFFECT: Each affected ally gains [+1] to their next Renew the Heart roll. DURATION: The bonus applies to the target’s next Renew the Heart roll, or until the start of their next turn, whichever comes first. KEYWORDS: ENHANCE | MAGIC | HARMONY | ORB"
          },
          {
            "type": "paragraph",
            "text": "Note Of Force"
          },
          {
            "type": "paragraph",
            "text": "A resonant tone ripples through the air, cracking armor and composure alike."
          },
          {
            "type": "paragraph",
            "text": "COST: [5] Mana DECLARE: Target [1] enemy character within [6] squares. TO HIT: Make a Magic Strike using (3d10) + Control + condition(s) against the target’s (3d10) + Ward + condition(s). EFFECT: Deal Heart + [6] Direct arcane damage. SAVE: After a successful Magic Strike, the target makes a Medium Renew the Heart save. ON FAILURE: they gain [-1] to Strike rolls until the end of their next turn. EMPOWER: Spend [+3] additional mana. If you do, increase range by [+2] squares and damage by [+2]. KEYWORDS: MAGIC | HARMONY"
          },
          {
            "type": "paragraph",
            "text": "Hymn Of Scorn"
          },
          {
            "type": "paragraph",
            "text": "Dissonance twists the heart, turning conviction to despair."
          },
          {
            "type": "paragraph",
            "text": "COST: [5] Mana DECLARE: Target [1] enemy character within [6] squares. TO HIT: Make a Magic Strike using (3d10) + Control + condition(s) against the target’s (3d10) + Ward + condition(s). EFFECT: Deal Heart + [5] Direct arcane damage. SAVE: After a successful Magic Strike, the target makes a Medium Renew the Heart save. ON FAILURE: they gain [-1] to Ward until the end of the next round. KEYWORDS: HEX | MAGIC | HARMONY"
          },
          {
            "type": "paragraph",
            "text": "Melody Of Superiority"
          },
          {
            "type": "paragraph",
            "text": "A song of triumph that sharpens the mind and steadies the hand."
          },
          {
            "type": "paragraph",
            "text": "COST: [7] Mana DECLARE: Target all ally characters within ORB[5] of the caster. EFFECT: Each affected ally selects one of the following effects until the end of the next round:"
          },
          {
            "type": "paragraph",
            "text": "Agility: [+1] to Agility rolls."
          },
          {
            "type": "paragraph",
            "text": "Might: [+1] to might rolls."
          },
          {
            "type": "paragraph",
            "text": "Hide: [+1] to guts."
          },
          {
            "type": "paragraph",
            "text": "Lore: [+1] to lore rolls."
          },
          {
            "type": "paragraph",
            "text": "Bravery: [+1] to bravery rolls."
          },
          {
            "type": "paragraph",
            "text": "Renew the Heart: [+1] to Renew the Heart rolls."
          },
          {
            "type": "paragraph",
            "text": "RESTRICTIONS: A character cannot be affected by multiple instances of melody of superiority from different sources."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: ENHANCE | MAGIC | HARMONY | ORB"
          },
          {
            "type": "paragraph",
            "text": "Drums Of War"
          },
          {
            "type": "paragraph",
            "text": "A thunderous rhythm drives the body to move before thought can follow."
          },
          {
            "type": "paragraph",
            "text": "COST: [6] Mana DECLARE: Target [1] friendly character within [6] squares. EFFECT: The target may, immediately, use the Hero’s Charge Core Action with no mana cost. RESTRICTIONS: A character cannot be affected by multiple instances of war drums more than once per round."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: ENHANCE | MAGIC | HARMONY"
          },
          {
            "type": "paragraph",
            "text": "Chant Of Resilience"
          },
          {
            "type": "paragraph",
            "text": "Steady rhythm becomes a wall no blade can breach."
          },
          {
            "type": "paragraph",
            "text": "COST: [8] Mana DECLARE: Target all ally characters within ORB[6] of the caster. EFFECT: Each affected character gains [+2] to ward until the end of the round. RESTRICTIONS: A character cannot be affected by multiple instances of chant of resilience from different sources."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: ENHANCE | MAGIC | HARMONY | ORB"
          },
          {
            "type": "paragraph",
            "text": "Song Of Storms"
          },
          {
            "type": "paragraph",
            "text": "A tempest answers the crescendo of your voice."
          },
          {
            "type": "paragraph",
            "text": "COST: [10] Mana DECLARE: Target all enemy characters within ORB[5] centered on a point of origin within [5] squares. TO HIT: Make a Magic Strike using (3d10) + Control + condition(s) against the target’s (3d10) + Ward + condition(s). Resolve this separately against each enemy in the Orb. Rolling Storm uses its separately printed Renew the Heart save. EFFECT: Each enemy successfully hit suffers Heart + [7] Direct lightning damage and [-2] Speed until the end of the turn."
          },
          {
            "type": "paragraph",
            "text": "ROLLING STORM: At the start of the following round, each enemy still within the Orb makes an Easy Renew the Heart save. On failure, suffer [4] Direct On-Going lightning damage and the Speed reduction. This recurring damage uses exactly the printed value and does not add Heart. A character resolves Rolling Storm only once per round."
          },
          {
            "type": "paragraph",
            "text": "DURATION: This effect lasts [2] rounds. KEYWORDS: MAGIC | HARMONY | ORB"
          },
          {
            "type": "paragraph",
            "text": "Symphony Of Valor"
          },
          {
            "type": "paragraph",
            "text": "Every heartbeat and breath joins in one chorus of courage."
          },
          {
            "type": "paragraph",
            "text": "COST: [11] Mana DECLARE: Target all ally characters within ORB[6] of the caster. EFFECT: Each affected ally restores HEALTH[+3] and gains [+2] to strike rolls until the end of their next turn. RESTRICTIONS: A character cannot be affected by multiple instances symphony of valor from different sources. KEYWORDS: ENHANCE | MAGIC | HARMONY | ORB"
          }
        ]
      }
    ]
  },
  "lore-life": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "paragraph",
            "text": "LORE OF LIFE"
          },
          {
            "type": "paragraph",
            "text": "The Lore of Life is the magic of renewal, protection, and growth. Practitioners channel the pulse of existence itself, restoring the fallen, shielding the living, and withering corruption wherever it takes root."
          },
          {
            "type": "paragraph",
            "text": "Regrowth"
          },
          {
            "type": "paragraph",
            "text": "The pulse of creation answers your call."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When you successfully cast any lore of life spell. DECLARE: Choose [1] ally character within [6] squares. EFFECT: The chosen character restores [+1] health. KEYWORDS: ENHANCE | MAGIC | LIFE | SIGNATURE"
          },
          {
            "type": "paragraph",
            "text": "Light Spear"
          },
          {
            "type": "paragraph",
            "text": "A radiant lance pierces shadow and mends the worthy."
          },
          {
            "type": "paragraph",
            "text": "COST: [5] Mana DECLARE: Target all characters within a LINE[5]. TO HIT: Make a Magic Strike using (3d10) + Control + condition(s) against the target’s (3d10) + Ward + condition(s). Resolve this separately against each enemy in the Line; allied healing is Automatic. EFFECT: Each enemy successfully hit suffers Heart + [3] Direct light damage. Ally characters restore [+2] health. KEYWORDS: MAGIC | LIFE | LINE"
          },
          {
            "type": "paragraph",
            "text": "Divine Grasp"
          },
          {
            "type": "paragraph",
            "text": "The living world obeys your will to save—or to punish."
          },
          {
            "type": "paragraph",
            "text": "COST: [5] Mana DECLARE: Target [1] character within [6] squares. TO HIT: Enemy target: Renew the Heart (Easy) save. Ally target resolves without a roll. EFFECT: Enemy: On a failed save, move the target up to [5] squares to an empty space of your choice; on a successful save, move the target [1] square. Ally: The target may immediately use the Stride Core Action. KEYWORDS: MAGIC | LIFE"
          },
          {
            "type": "paragraph",
            "text": "Radiant Breath"
          },
          {
            "type": "paragraph",
            "text": "A wave of warmth restores the faithful and humbles the corrupt."
          },
          {
            "type": "paragraph",
            "text": "COST: [6] Mana DECLARE: Target all characters within a CONE[5]. TO HIT: Enemy target: Renew the Heart (Easy) save. Ally target resolves without a roll. EFFECT: Enemy: On a failed save, the target suffers [-1] to Strike. Ally: The target gains [+1] to Strike."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: ENHANCE | MAGIC | LIFE | CONE"
          },
          {
            "type": "paragraph",
            "text": "Touch Of Life"
          },
          {
            "type": "paragraph",
            "text": "Your hand carries the warmth of renewal to those fading from the world."
          },
          {
            "type": "paragraph",
            "text": "COST: [8] Mana DECLARE: Target [1] ally character within [6] squares who has [5] or less health EFFECT: The target immediately restores health[10]. RESTRICTIONS: A character cannot be affected by touch of life more than once per encounter. KEYWORDS: ENHANCE | MAGIC | LIFE"
          },
          {
            "type": "paragraph",
            "text": "Shield Of Protection"
          },
          {
            "type": "paragraph",
            "text": "A luminous barrier rises between your ally and annihilation."
          },
          {
            "type": "paragraph",
            "text": "COST: [7] Mana DECLARE: Choose [1] ally character within [6] squares. EFFECT: The target gains [+5] Guts until the end of the round. RESTRICTIONS: A character cannot be affected by multiple instances of shield of protection from different sources. KEYWORDS: ENHANCE | MAGIC | LIFE"
          },
          {
            "type": "paragraph",
            "text": "Mass Restoration"
          },
          {
            "type": "paragraph",
            "text": "Your voice becomes the heartbeat of the world, restoring all who hear it."
          },
          {
            "type": "paragraph",
            "text": "COST: [9] Mana DECLARE: Target all ally characters within orb[6]. EFFECT: Each target restores [+3] health. EMPOWER: Spend [+3] additional Mana. If you do, increase restored health by [+2]. KEYWORDS: ENHANCE | MAGIC | LIFE | ORB"
          },
          {
            "type": "paragraph",
            "text": "Spare The Perishing"
          },
          {
            "type": "paragraph",
            "text": "You reach across the threshold and pull a soul back from the brink."
          },
          {
            "type": "paragraph",
            "text": "COST: [12] Mana DECLARE: Target [1] ally character within [6] squares who has [5] or less health. EFFECT: The target completely restores their health to full value. RESTRICTIONS: A character cannot be affected by spare the perishing"
          },
          {
            "type": "paragraph",
            "text": "more than once per encounter."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: ENHANCE | MAGIC | LIFE"
          },
          {
            "type": "paragraph",
            "text": "Sanctuary"
          },
          {
            "type": "paragraph",
            "text": "A radiant sphere envelops all within, sealing the wounded in peace."
          },
          {
            "type": "paragraph",
            "text": "COST: [11] Mana DECLARE: Create an orb[4] centered on the caster. EFFECT: Target(s) restore health[+2], gain [+2] to ward, and reduce all negative conditions to [0] for the duration. DURATION: This effect lasts [1d10/2] rounds, effects end at the start of the round. KEYWORDS: ENHANCE | MAGIC | LIFE | ORB"
          }
        ]
      }
    ]
  },
  "lore-anthro-mundas": {
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "LORE OF ANTHRO MUNDAS"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "BRAMBLEHEART"
          },
          {
            "type": "paragraph",
            "text": "Brambleheart is a tabletop role-playing game of courage and kinship set in the myth-wild world of Anthro Mundas, where the Beastfolk of fur, feather, and scale build hearths, forge oaths, and face the remnants of a ruined and forgotten age."
          },
          {
            "type": "paragraph",
            "text": "ANTHRO MUNDAS"
          },
          {
            "type": "paragraph",
            "text": "Anthro Mundas is a living world born from ruin and ash, its soil still warm with the echoes of creation. The realm itself aware, as though every mountain and grove holds a quiet intent."
          },
          {
            "type": "paragraph",
            "text": "Across its vast continents stretch many faces of the land. The Veilwood forests climb sky-high canopies, woven with glowmoss and ancient rope bridges where Ravari dwell among whispering leaves. The Sea of Roots, where Axalori villages cling to mangrove pillars. The sun-seared reaches of the Barrens where the Sauren shepherd herd flocks of [creature]. Where the earth cools the Urnath stand sentinel against the creeping Blight that still seeps from the cursed heart of Dominous."
          },
          {
            "type": "paragraph",
            "text": "Rivkan river-cities coil like silver serpents through marsh and delta, trading goods and tales alike. Elsewhere, the Hedgkin tend their gardens and villages—quiet, enduring hearts that keep the world’s rhythm steady. The skies are no less alive than the ground. The Virelan ride warm currents and magical winds, building crystal roosts that sing in during storms."
          },
          {
            "type": "paragraph",
            "text": "But beauty never stands alone in Anthro Mundas. For every tranquil glade, there is ruins where something old still stirs. Relics of the Ancients—machines, idols, and forges—sometimes wake without warning, belching light and sorrow into the world."
          },
          {
            "type": "paragraph",
            "text": "WINDS OF MAGIC"
          },
          {
            "type": "paragraph",
            "text": "Winds of Magic, unseen streams of primal energy that twist through air, soil, and soul. Birthing beasts of impossible form: vine-serpents, molten hounds, and whispering swarms that steal dreams."
          },
          {
            "type": "paragraph",
            "text": "Some scholars say the Winds are the lifeblood of Anthro Mundas; others believe they are the last breath of the broken gods known only as the Ancients."
          },
          {
            "type": "paragraph",
            "text": "The Winds are fickle, calm one day, furious the next. They gather in storms that flash colors unknown to mortal eyes, or fall silent for seasons, leaving spellcraft weak and sluggish."
          },
          {
            "type": "paragraph",
            "text": "To the Beastfolk, the Winds are not merely tools but living presences. Mages and shamans describe them as spirits, moods, or even songs—forces that must be coaxed, never commanded."
          },
          {
            "type": "paragraph",
            "text": "THE HOWLING HALLOWS"
          },
          {
            "type": "paragraph",
            "text": "Beyond the mortal veil lies the Howling Hallows, a realm of soft winds, silver light, and endless murmurs. The folk of Anthro Mundas say that when one dies their spirit walks among trees whose leaves sing with memory. The Hallows is neither paradise nor punishment—it is reflection, a place where the echoes of all things drift until they fade or find their way home."
          },
          {
            "type": "paragraph",
            "text": "To some, the Hallows appears as a vast forest of moonlit paths; to others, a valley of flowing stars, or a quiet ocean lit from beneath. Its form bends to the soul that sees it, shaped by memory and emotion."
          },
          {
            "type": "paragraph",
            "text": "The winds that sigh through the Hallows are said to be the same that stir the living world—the Winds of Magic in their purest state. Where they blow strongest, the veil thins. In such places, the living may glimpse their ancestors or feel unseen hands guiding them."
          },
          {
            "type": "paragraph",
            "text": "To live in Anthro Mundas is to walk with ghosts. Every whispering wind and flickering flame may carry the voice of someone who once was—and perhaps, will be again."
          },
          {
            "type": "paragraph",
            "text": "THE ANCIENTS"
          },
          {
            "type": "paragraph",
            "text": "Before the rise of the Beastfolk, the world belonged to the Ancients—a people whose names and faces have long since turned to dust. Only their ruins remain: blackened towers on the horizon, half-sunken vaults beneath the roots, and fractured monuments humming faintly with forgotten power."
          },
          {
            "type": "paragraph",
            "text": "The Ancients were not born of magic—they made it. They discovered the Winds of Magic and, through genius and arrogance, learned to shape them as easily as breath. Their cities gleamed with light that never dimmed; their skies sang with silver vessels; their seas were carved by engines that parted waves like cloth."
          },
          {
            "type": "paragraph",
            "text": "To the Ancients, the Winds were not sacred or wild, but a science of rhythm and resonance. They built colossal engines called Aeroliths, continent-spanning machines that tethered the Winds and bent them to their purpose."
          },
          {
            "type": "paragraph",
            "text": "They wove the Winds into every facet of life—architecture that healed its own cracks, fields that grew without seed, and voices that could command metal as if it were clay. Through their mastery, the Ancients lifted entire cities into the clouds, anchored by unseen chains of force."
          },
          {
            "type": "paragraph",
            "text": "Yet, in binding the Winds, they began to starve the world itself. The natural balance—the living pulse of magic that threaded soil to spirit—was bled dry to feed their engines. Where the Winds once danced freely, they were now trapped in brass hearts and crystal chambers, humming like caged storms."
          },
          {
            "type": "paragraph",
            "text": "The exact cause of the Ancients’ downfall is lost to history, but every telling agrees that their hunger exceeded their wisdom."
          },
          {
            "type": "paragraph",
            "text": "THE GREAT MORPHING"
          },
          {
            "type": "paragraph",
            "text": "When the world rose to life, the towers of the Ancients fell silent. The Winds of Magic, once bound, broke free in a single cataclysmic exhalation that rippled across land and sea. The air shimmered with wild colors, the earth shuddered, and oceans boiled with light as mountains unfolded like petals."
          },
          {
            "type": "paragraph",
            "text": "No one knows whether it was punishment, healing, or just fate. But from the ruins of the old world rose the Beastfolk. Creatures who morphed from fur and feathers, waking beneath strange starts, with the spark of recognition in their eyes."
          },
          {
            "type": "paragraph",
            "text": "THE ERA OF DISCOVERY"
          },
          {
            "type": "paragraph",
            "text": "For a time, the world itself seemed to breathe with the Beastfolk. New forests spread over the bones of old cities. The seas cooled. The great magical storms that had ravaged the land softened into mist and rain. The Winds, still wild but no longer furious, found rhythm again."
          },
          {
            "type": "paragraph",
            "text": "At first, the Beastfolk wandered. They were hunters and gatherers of wonder, seeking shelter among the shattered towers and overgrown halls of the old world. But as time creped ever forward. They learned to weave bark into cloth, to strike flint for flame, and to sing small songs that kept the restless spirits at bay. Each tribe discovered its own rhythm with the Winds, and from those rhythms, the first cultures took root."
          },
          {
            "type": "paragraph",
            "text": "As generations passed, the Beastfolk spread across Anthro Mundas, shaping the land as the land shaped them. The Rivkan followed the rivers, learning the songs of water and current. The Virelan rose to the skies, carving dwellings in storm-ridden cliffs. The Hedgkin cultivated gardens where wildflowers once ruled, coaxing peace from soil and seed. The Axalori built floating sanctuaries upon the mangrove tides, and the Urnath turned their strengths into fortress of ice and stone."
          },
          {
            "type": "paragraph",
            "text": "THE AGE OF STRIFE"
          },
          {
            "type": "paragraph",
            "text": "As generations passed, harmony faded into pride. What began as small rivalries between tribes and trades grew into deeper divides. Unity slowly unraveled beneath the weight of desire. Scholars hoarded knowledge, warlords forged spells as weapons, and the old oaths that once bound the Beastfolk began to lose their strength."
          },
          {
            "type": "paragraph",
            "text": "Magic, once wondrous and unbound, became a tool of ambition. No longer a gift, but a weapon. Spells that once healed now shattered stone. War and conquest scarred the lands where pride drowned wisdom."
          },
          {
            "type": "paragraph",
            "text": "Out of that chaos rose King Covine, a Braelor war-sorcerer whose hunger outmatched all. Charismatic and cruel, he gathered followers beneath a blackened banner, promising glory and dominion that would never fade. He envisioned himself as a deathless king, ruling Anthro Mundas for all eternity."
          },
          {
            "type": "paragraph",
            "text": "THE BLIGHT OF UNDEATH"
          },
          {
            "type": "paragraph",
            "text": "In the far, frozen north hidden deep beneath the ruined fortress of Dominous, Covine discovered the answer to the undying rule sought. The Tome of Undeath, a grimoire of the Ancients written in bone, ash, and blood."
          },
          {
            "type": "paragraph",
            "text": "During the climactic battle of Dominous, at the peak of the world, as the united tribes of Anthro Mundas marched against him. Covine unleashed a catastrophic spell that tore a hole in the veil between life and the Hallows."
          },
          {
            "type": "paragraph",
            "text": "The sky became pitch black and land itself recoiled as earth screamed. But the spell did not grant eternal life. Instead Covine and his followers began to wither as their spirits were ripped from their bodies. Their skin turned as pale as ash and rotted away, as the light left their eyes. Covine became the Lich King of the Undeath and his armies turned into a legion of undead monsters."
          },
          {
            "type": "paragraph",
            "text": "The land, too, was corrupted by the curse, a spreading infection that could not be cured, called the Blight washed over the world. Leaving death and undead monsters in its wake."
          },
          {
            "type": "paragraph",
            "text": "The war that followed is remembered as The Battle of Dominous. It lasted seven days and seven nights. At its end, Covine and his legion had been pushed back deep into the frozen north. Yet, with no end in sight the survivors built great cairns along the Blight’s border to contain the plague."
          },
          {
            "type": "paragraph",
            "text": "To this day, the Urnath stand upon a frozen horizon, guarding the world against the silence of the undead."
          },
          {
            "type": "paragraph",
            "text": "AGE OF ADVENTURE"
          },
          {
            "type": "paragraph",
            "text": "As the world healed and the fires of war dimmed, stories turned into tales and tales into legends. And as the scars of the undeath and blight faded into history, a new generation of courage and adventure bloomed."
          },
          {
            "type": "paragraph",
            "text": "Lore seekers, adventurers and treasure hunters began to trace overgrown paths rediscovering the ancient wonders of a forgotten age. This stirring of journey marked the Age of Adventure, when hope and courage became the compass."
          },
          {
            "type": "paragraph",
            "text": "From humble hearths came brave souls who sought not power, but purpose. They crossed mountains, delved the ruins of the past, and wove new stories into the world’s long memory."
          },
          {
            "type": "paragraph",
            "text": "This is the age of Brambleheart, where the light of the past guides courageous heroes toward the unknown, and every step forged into the legend of Anthro Mundas."
          }
        ]
      }
    ]
  }
}
