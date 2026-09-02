export type RuleSourceBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'table'; rows: string[][] }

export interface RuleSourceSection { heading: string; blocks: RuleSourceBlock[] }
export interface RuleSourceDocument { sourceFile: string; sections: RuleSourceSection[] }

export const ruleSourceDocuments: Record<string, RuleSourceDocument> = {
  "introduction": {
    "sourceFile": "02_BH_INTRODUCTION(1).docx",
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
    "sourceFile": "04_BH_FUNDATMENTALS(1).docx",
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
        "heading": "THE CORE ROLL",
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
            "text": "Both ranks and modifiers count as stats when creating rolls. The rule requiring the roll will depict on what stat is required. While attributes themselves will be depicted by their names, such as might or hide, modifiers will often be referred to by a secondary stat such as mettle, power, or accuracy."
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
    "sourceFile": "05_BH_CORE_ABILITIES(1).docx",
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "CORE ABILITIES"
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
            "text": "Brambleheart uses a keyword-based action economy where characters perform actions during encounters, and sometimes role-play, using self-containing abilities."
          },
          {
            "type": "paragraph",
            "text": "There are five types of abilities: instinct, movement, combat, reaction, and passive. Each ability is accompanied by a set of keywords that define how, when and where the ability can be used during play."
          }
        ]
      },
      {
        "heading": "KEYWORDS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Keywords let you know how, when and where an ability can be used. By default, all abilities are used in encounters, but some abilities like magic cast can be used during role-play."
          }
        ]
      },
      {
        "heading": "What Keywords Do",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Keywords tell you:"
          },
          {
            "type": "paragraph",
            "text": "When you can use an ability"
          },
          {
            "type": "paragraph",
            "text": "How it interacts with other abilities"
          },
          {
            "type": "paragraph",
            "text": "Whether it follows the Root limitation system"
          },
          {
            "type": "paragraph",
            "text": "Many abilities include the root keyword. This indicates that the ability is usable only ‘once-per-type-per-round’. Characters can use [1] of each ability type with the keyword root per round."
          },
          {
            "type": "paragraph",
            "text": "[1] ROOT Instinct"
          },
          {
            "type": "paragraph",
            "text": "[1] ROOT Movement"
          },
          {
            "type": "paragraph",
            "text": "[1] ROOT Combat"
          },
          {
            "type": "paragraph",
            "text": "[1] ROOT Reaction"
          },
          {
            "type": "paragraph",
            "text": "For example, if a character uses the melee strike ability during a round they cannot use another ability that has the keywords combat and root until the next round. However, they could use an ability that has the keyword combat, but not root."
          },
          {
            "type": "paragraph",
            "text": "Notably, no character can use the same ability regardless of keywords more than once a round, unless another rule would compel them to do so. If a character is compelled to perform a specific ability that would supersede any keyword restrictions."
          }
        ]
      },
      {
        "heading": "PASSIVE ABILITIES",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Some abilities are listed simply as passive. These abilities also can only be applied once per round. They do not need to be declared; they are considered to always apply their effects if the circumstances of the ability are met and must be applied if it is possible to do so."
          }
        ]
      },
      {
        "heading": "CORE ABILITIES",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Core abilities are a standard list of abilities that every character, player, watcher, and NPC have access to. No ability, rule or otherwise can override the capacity to use a core ability."
          },
          {
            "type": "paragraph",
            "text": "You will find core abilities listed in ‘The Battle’ chapter and you will also discover other abilities throughout the character species, talents, magical spells and rest of the rulebook."
          }
        ]
      }
    ]
  },
  "battle": {
    "sourceFile": "05_BH_THE_BATTLE_RAW(1).docx",
    "sections": [
      {
        "heading": "THE BATTLES",
        "blocks": []
      },
      {
        "heading": "COMBAT ENCOUNTER",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A combat encounter is between one or more characters from a group of players against enemies, called npc. Non-Player Characters."
          },
          {
            "type": "paragraph",
            "text": "players control their characters, and the Watcher controls the npc."
          },
          {
            "type": "paragraph",
            "text": "Each making decisions on behalf of the controlled character(s). Taking turns in Initiative Order."
          }
        ]
      },
      {
        "heading": "DETERMINING POSITIONS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Encounters take place on a tabletop map using squares to measure that distance of ability, movement, and all other types of actions that take place."
          },
          {
            "type": "paragraph",
            "text": "When an encounter starts The watcher and players work together to determine the positions of each character(s) involved in the battle."
          }
        ]
      },
      {
        "heading": "SQUARES & MEASUREMENTS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Combat in Brambleheart is designed to take place on a grid battle map using squares. However, you can conduct battles without using squares. The following shows how squares translate into other measurement types."
          },
          {
            "type": "paragraph",
            "text": "1 square = 1 Yard, 3-foot, 1 meter"
          }
        ]
      },
      {
        "heading": "INITIATIVE ORDER",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Initiative order is the order of turns the characters involved in a combat encounter. players control what their character will do one their turn."
          },
          {
            "type": "paragraph",
            "text": "To determine your character’s initiative, roll (3d10) + speed + condition(s)"
          },
          {
            "type": "paragraph",
            "text": "A character’s speed equals [+2] plus their agility rank."
          }
        ]
      },
      {
        "heading": "ROUNDS & TURNS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A round is the total of the turns in a combat encounter. From the highest initiative result to the lowest initiative result. A single round is completed after every character in the order of initiative has taken a turn."
          },
          {
            "type": "paragraph",
            "text": "A turn is when a character can perform abilities and other tasks."
          },
          {
            "type": "paragraph",
            "text": "There are some abilities, effects and other actions that have triggers stating they take place at the start of a round or turn. These things take place before anything else."
          }
        ]
      },
      {
        "heading": "TAKING YOUR TURN",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When it is your character’s turn during the round you may perform abilities from the core ability list, from your character’s species or from other sources, such as spells, that your character is entitled to."
          },
          {
            "type": "paragraph",
            "text": "Before you can perform any abilities, you must resolve any ongoing or triggered effects that take place ‘at the start of your turn’."
          },
          {
            "type": "paragraph",
            "text": "Sometimes these triggers might read ‘at the start of the turn’ or ‘at the start of an enemy’s turn’"
          },
          {
            "type": "paragraph",
            "text": "All such effects and actions, if the trigger is meant, must be resolved before your character can perform other abilities."
          }
        ]
      },
      {
        "heading": "PREFORMING ABILITIES",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You can perform as many abilities as you want during your turn, in any order. However, you are still bound by keywords, the ability’s trigger and restrictions. Additionally, some abilities might require you to spend Mana in order to perform them."
          }
        ]
      },
      {
        "heading": "MANA",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Mana is a resource players can spend in order to perform abilities, attack, cast spells and other actions."
          },
          {
            "type": "paragraph",
            "text": "Every character generates two[2] mana at the start of each combat round."
          },
          {
            "type": "paragraph",
            "text": "players can gain additional MANA regeneration through magic levels, talents, abilities and condition(s)."
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
        "heading": "COMBAT ABILITIES",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Combat abilities are how characters deal damage to each other during a combat encounter."
          },
          {
            "type": "paragraph",
            "text": "Combat abilities can come in many forms from core combat abilities, that all characters can use. To specific combat abilities granted by talents, traits and magical spells."
          }
        ]
      },
      {
        "heading": "TO HIT",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When performing combat abilities, and other abilities like them, players will roll against an active target that is rolled by the enemy target of said ability."
          },
          {
            "type": "paragraph",
            "text": "Nearly every combat ability available in Brambleheart will follow the same rules when attempting to hit a target."
          },
          {
            "type": "paragraph",
            "text": "There are three basic ‘strike rolls that players will encounter with combat abilities. Melee, Range, and Magical."
          },
          {
            "type": "paragraph",
            "text": "Melee attacks, such as the ability blade strike, use (3d10) + mettle + condition(s). Mettle is equal to character’s might attribute modifier."
          },
          {
            "type": "paragraph",
            "text": "Range attacks, such as the ability sure shot use (3d10) + aim + condition(s). Aim is equal to character’s agility attribute modifier."
          },
          {
            "type": "paragraph",
            "text": "Magical attacks, such as the ability arcane command use (3d10) + control + condition(s). wits is equal to character’s lore attribute modifier."
          }
        ]
      },
      {
        "heading": "TO DEFEND",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You are a target of a combat ability or other type of ability that uses the strike mechanics or calls for a defense roll – you’ll make a ward roll."
          },
          {
            "type": "paragraph",
            "text": "Defend rolls use (3d10)+ward+condition(s). Ward is equal to a character’s hide attribute modifier."
          },
          {
            "type": "paragraph",
            "text": "Your ward result is compared to the attacker’s strike result. This is called an active target."
          },
          {
            "type": "paragraph",
            "text": "If the strike result is higher, the ability, the attack hits your character. If the ward result is equal to or higher the ability, the attack misses your character."
          }
        ]
      },
      {
        "heading": "TO DAMAGE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "If you have a successful attack or ability that applies damage to the target(s), they can apply guts to the damage."
          },
          {
            "type": "paragraph",
            "text": "Damage inflicted to target(s) will always allow the target to apply guts, unless otherwise stated."
          },
          {
            "type": "paragraph",
            "text": "Any remaining damage after guts reduces the target(s)’ health."
          },
          {
            "type": "paragraph",
            "text": "Abilities with the keyword melee apply power to damage rolls from the ability. Power is equal to characters’ might attribute rank."
          },
          {
            "type": "paragraph",
            "text": "Abilities with the keyword shoot apply accuracy to damage rolls from the ability. accuracy is equal to characters’ agility rank."
          }
        ]
      },
      {
        "heading": "DAMAGE CATEGORY",
        "blocks": [
          {
            "type": "paragraph",
            "text": "There are three different damage categories. lethal, direct, and standard."
          },
          {
            "type": "paragraph",
            "text": "If a damage type is not stated then the damage is always considered to be standard. Standard damage follows all the typical rules laid out throughout the Brambleheart rules."
          },
          {
            "type": "paragraph",
            "text": "Direct damage automatically reduces the target(s)’ guts value by half rounded up to a minimum of one."
          },
          {
            "type": "paragraph",
            "text": "Lethal damage automatically bypasses the target(s)’ guts value completely. This includes additional equipment. However, this does not include any type of condition(s) the target(s) might have."
          },
          {
            "type": "paragraph",
            "text": "Some damage category might also apply a damage type such as fire, frost, or nature. Damage types can affect a target(s)’ guts and ability to reduce the incoming damage."
          },
          {
            "type": "paragraph",
            "text": "For example, such an attack might read ‘Direct Fire Damage’."
          }
        ]
      },
      {
        "heading": "TO SOAK",
        "blocks": [
          {
            "type": "paragraph",
            "text": "If you are hit with an ability or attack that required a ‘To Defend’ and applies damage. You can apply your guts to the total damage to reduce it amount."
          },
          {
            "type": "paragraph",
            "text": "Your guts is equal to your hide attribute rank plus any additional equipment you are carrying. Moreover, you may also apply condition(s) to your guts."
          }
        ]
      },
      {
        "heading": "DAMAGE – GUTS = TOTAL DAMAGE",
        "blocks": []
      },
      {
        "heading": "RESISTANCES & WEAKNESS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Some characters will have resistance against specific damage types such as fire damage. If a target(s) is resistant against a specific damage type they will gain a condition to their guts equal to the resistance value."
          },
          {
            "type": "paragraph",
            "text": "For example, if a character has fire resistance [+2]. They will gain two [+2] condition to their guts."
          },
          {
            "type": "paragraph",
            "text": "Moreover, some resistances might be more specific such as magical fire resistance. Which condition would only apply to fire damage from magical sources."
          },
          {
            "type": "paragraph",
            "text": "Weakness function similarly to resistances by applying a negative value to the target(s)’ guts."
          },
          {
            "type": "paragraph",
            "text": "For example, if a character has fire weakness (2). They will gain gains a [-2] condition to their guts."
          },
          {
            "type": "paragraph",
            "text": "Both resistance and weakness are conditions and are applied after a damage category."
          },
          {
            "type": "paragraph",
            "text": "For example, if a character has fire resistance three and the attack is direct. Their guts would be reduced by half and then increased by the resistance of [3]."
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
            "text": "A combat encounter ends when one side or group involved is defeated or overcame. When an encounter ends the watcher will determine the results of the battle and any post combat information, such as experience points or treasures."
          },
          {
            "type": "paragraph",
            "text": "See Monsters & Characters for information about gaining experience points and treasure."
          },
          {
            "type": "paragraph",
            "text": "See beyond character creation for information about spending experience points."
          }
        ]
      }
    ]
  },
  "character-creation": {
    "sourceFile": "06_BH_CHARACTER_CREATION(2).docx",
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
            "text": "Your species defines your character’s origin — the form their spirit took when they entered the world."
          },
          {
            "type": "paragraph",
            "text": "Start by selecting which of the playable character species your hero will be."
          },
          {
            "type": "paragraph",
            "text": "Each species grants:"
          },
          {
            "type": "paragraph",
            "text": "[3] Heritage Traits — Innate gifts bound to instinct and heritage."
          },
          {
            "type": "paragraph",
            "text": "[2] Culture Traits — Learned traditions or disciplines of your people. Shared through story, not blood."
          },
          {
            "type": "paragraph",
            "text": "You may choose these from any species entry."
          },
          {
            "type": "paragraph",
            "text": "Languages — Each species provides one native tongue and commonspeak."
          },
          {
            "type": "paragraph",
            "text": "Species include the; Auravex, Ardenn, Axalori, Braelor, Cethra, Hedgkin, Ravari, Rivkan, Tordan, Urnath, and Virelan among others."
          },
          {
            "type": "table",
            "rows": [
              [
                "Selu of the Wandering Reeds “The still water remembers what the wind forgets.” For our example, we’ll follow Selu, a gentle Axalori healer who travels the Sea of Roots tending to wounded travelers and recording dreams. Selu’s player chooses Axalori as their species — drawn to their connection with balance, healing, and the calm of flowing water."
              ]
            ]
          }
        ]
      },
      {
        "heading": "2. CHOOSE YOUR SPARK",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your character’s spark defines what drives them, and how the world will remember their name."
          },
          {
            "type": "paragraph",
            "text": "Each Spark includes two keywords that describe its nature such as: Cunning, Loyal, Fearless, Devout, or Merciful."
          },
          {
            "type": "paragraph",
            "text": "When your character completes a deed that shares a keyword with their spark, they gain [+3] additional experience for that deed."
          },
          {
            "type": "table",
            "rows": [
              [
                "Selu’s player wants a character defined by empathy, intuition, and the quiet courage it takes to heal in a dangerous world, so they select the spark healer — Healer understands the wounds others hide, and they meet every challenge with empathy and insight. Their strength is not found in force, but in the courage to care when it matters most."
              ]
            ]
          }
        ]
      },
      {
        "heading": "3. SELECT YOUR HOMELAND",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your character’s homeland shapes the first lessons they learned. Its lands, peoples, and traditions etched into their memory."
          },
          {
            "type": "paragraph",
            "text": "Choosing a Homeland gives your character:"
          },
          {
            "type": "paragraph",
            "text": "[2] Skills, at rank [1], reflecting what its people value and teach."
          },
          {
            "type": "paragraph",
            "text": "A cultural description that colors their worldview"
          },
          {
            "type": "paragraph",
            "text": "A grounding in the world’s geography, traditions, and tone"
          },
          {
            "type": "paragraph",
            "text": "Homeland is not connected to species. Any character can come from any homeland as long as it fits the story you want to tell."
          },
          {
            "type": "table",
            "rows": [
              [
                "Selu’s player imagines them growing up in The Sea of Roots, a vast wetland dotted with mangrove villages, drifting reed platforms, and moss-kissed shrines to the Dreamtide faith. Life here teaches patience, observation, and the gentle skill of living with what nature offers."
              ]
            ]
          }
        ]
      },
      {
        "heading": "4. CHOOSE YOUR FAITH & OATH",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Faith and Oath bind the unseen to the will and mechanically define your character’s personality and role-playing. Both are story-driven elements that may show favor, or consequence depending on how faithfully they’re upheld."
          },
          {
            "type": "paragraph",
            "text": "Your faith describes what you revere or trust: the wilds, the flame, the self, the spirits, or the unseen. Oath defines how you act upon that belief — the law you hold to even when no one watches."
          },
          {
            "type": "table",
            "rows": [
              [
                "Selu’s player imagines a healer who sees every life as a thread in the same great current — one that must be protected, nurtured, and restored. They create their own oath called Mend the Broken Thread, believing no one deserves to fade alone and every wound must be tended too. Compassion is responsibility, not a luxury. For Selu’s faith they pick the Dreamtide. Followers believe that in sleep, all minds drift together, sharing truths that the waking world forgets. Dreams are treated as messages carried across invisible waters."
              ]
            ]
          }
        ]
      },
      {
        "heading": "5. ATTRIBUTES DISTRIBUTION",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Attributes represent the five pillars of your character’s self. Each one begins at rank [1] and you have [5] points at to spend to raise them. However, no attribute may be higher than rank [3] at creation."
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
            "text": "Your attributes define the rhythm of your rolls, your defense, and your place in battle."
          },
          {
            "type": "table",
            "rows": [
              [
                "Selu’s player wants a healer whose strength lies not in muscle, but in intuition, patience, and the courage to face suffering without turning away. They placed their attribute points accordingly. Lore 3 (1+2) Bravery 3 (1+2) Agility 2 (+1+1) Hide 1 Might 1"
              ]
            ]
          }
        ]
      },
      {
        "heading": "6. THE RHYTHM OF BODY & SPIRIT",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Every hero listens for the rhythm within them — the beat that calls their body to motion, or the hum that stirs their spirit awake. Some hear it in instinct and martial agility. Others hear it in thought, force, and the quiet whisper of the magical winds."
          },
          {
            "type": "paragraph",
            "text": "Choose [1] of the options below."
          },
          {
            "type": "paragraph",
            "text": "WIND-TOUCHED: Gain Magic Level [1] and [1] Talent."
          },
          {
            "type": "paragraph",
            "text": "GIFTED HEART: Gain [2] Talents of your choice."
          },
          {
            "type": "paragraph",
            "text": "PRACTICED HAND: Gain [2] new Skills of your choice at Rank [1] and [1] Talent. These must be Skills your character does not already know."
          },
          {
            "type": "paragraph",
            "text": "TEMPERED FORM: Increase [1] Attribute by [1] Rank, up to the normal character creation maximum of Rank [3], and gain [1] Talent."
          },
          {
            "type": "paragraph",
            "text": "Talents are the mark of practiced skill or natural brilliance — the moments where body, instinct, and will move as one."
          },
          {
            "type": "paragraph",
            "text": "They might sharpen a warrior’s stance, steady a healer’s hands, or teach a wanderer how to slip between danger and opportunity."
          },
          {
            "type": "paragraph",
            "text": "A Talent represents something your character does effortlessly, something hard-earned or gifted by fate."
          },
          {
            "type": "paragraph",
            "text": "Magic is the art of speaking to the world’s hidden rhythm — the silent pulse that threads through storm, soil, memory, and breath."
          },
          {
            "type": "paragraph",
            "text": "Where others feel only wind or warmth, a mage feels intent: the Winds of Magic waiting to be shaped."
          },
          {
            "type": "paragraph",
            "text": "Magic does not come from studying alone or simple instinct— but from attunement, a harmony between your spirit and the world’s deeper voice."
          },
          {
            "type": "table",
            "rows": [
              [
                "Selu’s player knows that their Axalori is shaped more by intuition and compassion than by force of arms. The Dreamtide faith speaks of currents beneath the waking world, and Selu has always felt those unseen waters moving around them. So, they selected to gain a magic level and attuned to the lore of harmony. For the one talent Selu gains, they picked hearth touch."
              ]
            ]
          }
        ]
      },
      {
        "heading": "7. EQUIPMENT & ITEMS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Select your character’s starting gear. Each character begins with:"
          },
          {
            "type": "paragraph",
            "text": "Adventure Kit"
          },
          {
            "type": "paragraph",
            "text": "Players can return an adventure kit for an additional [3] sp."
          },
          {
            "type": "paragraph",
            "text": "Starting wealth of [50] sp to spend on additional gear & equipment. (See Weapons & Armor pg. Xx, Adventuring Gear pg. Xx)"
          },
          {
            "type": "table",
            "rows": [
              [
                "Selu’s travels in clothes are humble and practical, so their starting gear reflects a healer who wanders more than fights. The player gets leafstitch armor, an oakstaff and a charm carved from driftwood. They also get several personal items, including healing herbs, water flask and a journal of dreams."
              ]
            ]
          }
        ]
      },
      {
        "heading": "8. CHARACTER DETAILS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Finish your character with the final brushstrokes of identity."
          },
          {
            "type": "paragraph",
            "text": "Name & Pronunciation"
          },
          {
            "type": "paragraph",
            "text": "Age, Appearance, and Pronouns"
          },
          {
            "type": "paragraph",
            "text": "Pack/Herd/Kinship (Optional)"
          },
          {
            "type": "paragraph",
            "text": "Homeland (recorded from Step 3)"
          },
          {
            "type": "paragraph",
            "text": "Spark (recorded from Step 2)"
          },
          {
            "type": "paragraph",
            "text": "Faith and Oath (recorded from Step 4)"
          },
          {
            "type": "paragraph",
            "text": "Calculate Secondary Stats (such as Speed, Power, Guts, Ward)."
          },
          {
            "type": "paragraph",
            "text": "When all is complete, your character stands ready to step into the world — a single heartbeat within the living rhythm of Brambleheart."
          },
          {
            "type": "table",
            "rows": [
              [
                "Packs, Herds, & Kinships (Optional Rule) While not required, players may choose to give their adventuring group a shared identity — a Pack, Herd, or Kinship. This name can represent a formal order, a loose band of travelers, a family by blood or choice, or a faction tied to the world their characters come from. Using a kinship is entirely optional, but it can enrich the tale your table tells — giving the group a sense of shared purpose, shared reputation, or shared legacy within the world of Anthro Mundas. Whether your heroes call themselves The Lanternwake Company, The Reedbound Circle, or The Kin of Quiet Waters, a Kinship name becomes a thread that ties their journeys into one living story."
              ]
            ]
          }
        ]
      }
    ]
  },
  "sparks": {
    "sourceFile": "07_BH_SPARKS(2).docx",
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
            "text": "A Spark is your personality archetype — the way your character thinks, feels, and acts. It shapes how you approach challenges, what excites you, and how you make your mark on the world."
          },
          {
            "type": "paragraph",
            "text": "While faith defines what you believe and oath defines what you follow, your spark defines how you play. It is the pulse of your character’s story, the lens through which you express their courage, curiosity, and flaws."
          },
          {
            "type": "paragraph",
            "text": "Mechanically, your spark connects directly to deeds, giving you an XP boost when your personality shines through in action."
          },
          {
            "type": "paragraph",
            "text": "When you complete a deed that aligns with one of your spark’s keywords, you gain a [+3] experience bonus."
          },
          {
            "type": "paragraph",
            "text": "Your spark does not alter rolls or stats — it is a narrative and progression tool that rewards you for roleplaying your hero’s personality."
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
    "sourceFile": "08_BH_HOMELAND(1).docx",
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
    "sourceFile": "09_BH_OATHS.docx",
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
            "text": "“A promise kept is a story remembered.”"
          },
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
        "heading": "CHOOSING OR CREATING AN OATH",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Players may choose one of the oaths below or create their own with the watcher’s approval."
          },
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
        "heading": "COMMON OATHS",
        "blocks": []
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
    "sourceFile": "10_BH_FAITH(1).docx",
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
            "text": "“The world listens to what you believe, even if no one else does.”"
          },
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
        "heading": "CHOOSING OR CREATING A FAITH",
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
    "sourceFile": "11_BH_CHARACTER_SPECIES(1).docx",
    "sections": [
      {
        "heading": "CHARACTER SPECIES",
        "blocks": []
      }
    ]
  },
  "deeds": {
    "sourceFile": "11_BH_DEEDS_RAW(1).docx",
    "sections": [
      {
        "heading": "DEEDS",
        "blocks": []
      },
      {
        "heading": "DEEDS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "“Every choice leaves a mark.”"
          },
          {
            "type": "paragraph",
            "text": "Deeds are the living rhythm of a hero’s story — small acts of courage, wit, or compassion that shape who they become. Each Deed is a moment where instinct meets intention, where a Spark’s nature burns bright."
          },
          {
            "type": "paragraph",
            "text": "When a character completes a Deed, they gain experience based on its challenge and impact. If the Deed aligns with one or both of their Spark keywords, they gain a +3 bonus Experience in addition to the Deed’s normal reward."
          }
        ]
      },
      {
        "heading": "DEED RESOLUTION",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Each Deed has two paths to completion — one narrative and one mechanical."
          },
          {
            "type": "paragraph",
            "text": "The narrative function allows a Deed to be fulfilled through story and character choice at the Watcher’s discretion. When a player’s actions embody the spirit of a Deed, even without a specific roll, the Watcher may declare it complete."
          },
          {
            "type": "paragraph",
            "text": "The mechanical function provides a clear, rule-based way to achieve the same Deed through skill rolls, abilities, or defined actions. This encourages players to engage in role-play and interaction they might otherwise overlook."
          },
          {
            "type": "paragraph",
            "text": "Together, these paths ensure that every Deed can be earned through heart or hand — whichever best fits the moment’s rhythm."
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
    "sourceFile": "24_BH_TALENTS.docx",
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "THE TALENTS"
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
            "text": "Talents are the mark of practiced skill or natural brilliance — the moments where body, instinct, and will move as one."
          },
          {
            "type": "paragraph",
            "text": "They might sharpen a warrior’s stance, steady a healer’s hands, or teach a wanderer how to slip between danger and opportunity."
          },
          {
            "type": "paragraph",
            "text": "A Talent represents something your character does effortlessly, something hard-earned or gifted by fate."
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
            "text": "COST: [1] mana TRIGGER: When an ally within [3] squares fails an attribute save. EFFECT: They may reroll that check with condition [-1]. KEYWORDS: ROOT |REACTIVE | TALENT"
          }
        ]
      },
      {
        "heading": "BATTLEBANE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You trust your body’s rhythm over the mind’s delay. COST: [1] mana"
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When a character within [3] squares uses a combat ability with a declared target."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: You may move up to [2] squares toward that character. If you end adjacent to that character, gain condition [+1] to your next strike roll against that character, until the end of the round."
          }
        ]
      },
      {
        "heading": "KEYWORDS: REACTION | MOVE | TALENT",
        "blocks": []
      },
      {
        "heading": "BEASTGRASP",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You wield impossible weight as if born to it. EFFECT: You may wield a two-handed weapon in each hand. While doing so, reduce your strike roll for all physical combat abilities. by [-3] and ward by [-2]. KEYWORDS: PASSIVE | TALENT"
          }
        ]
      },
      {
        "heading": "BLADE TEMPO",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your movements flow between strike and evasion, like wind through tall grass. EFFECT: When wielding a one-handed weapon in each hand and wearing light armor, gain condition [+1] to all ward rolls. Additionally, during the first round of any encounter, all characters that target you suffer condition [-1] to strike rolls. REQUIRES: Bonds of Blades Talent KEYWORDS: PASSIVE | TALENT"
          }
        ]
      },
      {
        "heading": "BLOOD OATH",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your promise binds tighter than steel. COST: [1] mana TRIGGER: When you or an ally within [3] squares suffers lethal damage. EFFECT: Split the damage evenly between you and that ally. REQUIRES: Hare’s Luck Talent"
          },
          {
            "type": "paragraph",
            "text": "RESTICTIONS: The lethal damage must be at least [2] or greater. Odd or remaining values are dealt to the triggering ally. KEYWORDS: REACTION | TALENT"
          }
        ]
      },
      {
        "heading": "BOND OF BLADES",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your blades weave one thought through two motions. EFFECT: When wielding a one-handed weapon in each hand, gain condition [+1] to strike rolls and condition [+1] to damage. KEYWORDS: PASSIVE | COMBAT | TALENT"
          }
        ]
      },
      {
        "heading": "BREAKGRIP",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your strikes are a blur of precision and deception. TRIGGER: When performing a physical combat ability that targets a character wielding a weapon. EFFECT: Perform the combat ability normal, if you exceed the target’s ward roll by [5+], the target’s weapon is knocked to a square of your choice within [2] squares."
          },
          {
            "type": "paragraph",
            "text": "PICK UP: The target character can retrieve the weapon by moving past, within or through [1] square of its location. KEYWORDS: COMBAT | TALENT"
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
            "text": "TRIGGER: If you successfully cast an empowered spell and the total damage inflicted to the target is [2] or less."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: After fully resolving the spells outcome inflict [2] lethal damage to that target and restore [1] mana."
          },
          {
            "type": "paragraph",
            "text": "RESTICTIONS: The spell cannot have targeted more than a single target. The total damage inflict must be [2] or less after all damage reductions have been applied, with this effect being applied last."
          }
        ]
      },
      {
        "heading": "KEYWORDS: REACTIVE | TALENT",
        "blocks": []
      },
      {
        "heading": "EVADING RETREAT",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You turn your shield as you withdraw, letting defense and motion become one. TRIGGER: When your character is the target of a combat ability while wielding a shield. EFFECT: If the attack misses, you may move up to [3] squares. RESTRICTIONS: This movement cannot end within [2] squares of an enemy unless another ability allows it. KEYWORDS: REACTION | MOVE | TALENT"
          }
        ]
      },
      {
        "heading": "FANG BREAK",
        "blocks": [
          {
            "type": "paragraph",
            "text": "One swing splits the battle wide. COST: [1] mana TRIGGER: When you successfully strike a character with a physical combat ability. EFFECT: You may immediately use melee strike against a different character within [2] squares. KEYWORDS: REACTIVE | TALENT"
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
            "text": "EFFECT: Choose one roll type when you take this talent: Strike, Ward, Skill, or Attribute Save. When making that type of roll, an exceptional result is achieved on a [7+]"
          },
          {
            "type": "paragraph",
            "text": "REOCCURANCE: This talent can be taken up to four times, once for each roll type."
          },
          {
            "type": "paragraph",
            "text": "REQUIRES: Fieldcraft Talent"
          }
        ]
      },
      {
        "heading": "KEYWORDS: PASSIVE | TALENT",
        "blocks": []
      },
      {
        "heading": "FIELD MEDIC",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You’ve learned where to press, when to bind, and how to keep hearts beating in the chaos of battle. COST: [1] mana"
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When a character within [3] squares suffers damage. EFFECT: You can heal that character by [+1] health. KEYWORDS: REACTIVE | TALENT"
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
            "text": "TRIGGER: When your character is the target of an ability that compels them to use the renew the heart ability. EFFECT: Gain condition [+1] to ward against that ability. If you make a successful ward roll against that ability, gain condition [+1] to strike until the end of your next turn. KEYWORDS: REACTION | TALENT"
          }
        ]
      },
      {
        "heading": "GUARDBREAKER",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You’ve turned defense into offense, driving the rim of your shield into your foe with brutal precision. TRIGGER: When you hit a character with a physical combat ability while wielding a shield. EFFECT: If successful and the ability deals damage, the target of that ability is forced back [1] square and suffers [1] lethal damage. KEYWORDS: REACTIVE | TALENT"
          }
        ]
      },
      {
        "heading": "HAMMERFALL",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your strikes land with unrelenting ferocity, every swing a promise of ruin. TRIGGER: When you use a physical combat ability while wielding a single two-handed weapon."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: When you score an exceptional result [8+] on the strike roll, increase total damage by [+3]."
          },
          {
            "type": "paragraph",
            "text": "OPEN DEFENCE: Reduce your ward and guts by [-3] until the start of your next turn. REQUIRES: Warhowl Talent KEYWORDS: PASSIVE | TALENT"
          }
        ]
      },
      {
        "heading": "HARE’S LUCK",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The world seems to pause, and you fall just outside of ruin’s reach. COST: [1] mana TRIGGER: When your character would suffer lethal damage. EFFECT: Reduce the total lethal damage by [-1]. KEYWORDS: REACTIVE | TALENT"
          }
        ]
      },
      {
        "heading": "HEARTH TOUCH",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your spirit leaves traces of its light in every working. TRIGGER: When you cast a spell that restores health or grants an augment EFFECT: The target also gains condition [+1] to their next attribute save roll. KEYWORDS: PASSIVE | TALENT"
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
            "text": "COST: [1] mana TRIGGER: This ability can be used during your turn. DECLARE: Choose [1] character within the range of a ranged weapon your character is wielding. EFFECT: Make a ranged strike roll using (3d10) + grace + condition(s) versus the target’s (3d10) + ward + condition(s)."
          },
          {
            "type": "paragraph",
            "text": "DAMAGE: If successful, deal [2] damage plus the weapon’s damage value, accuracy, and any other conditions."
          },
          {
            "type": "paragraph",
            "text": "LONG RANGE: You may target a character up to [+5] squares beyond a weapon’s range. for each additional square, the target adds [+1] condition to ward."
          },
          {
            "type": "paragraph",
            "text": "RESTRICTIONS: Target must be within line of sight. KEYWORDS: ROOT | COMBAT | SHOOT | TALENT"
          }
        ]
      },
      {
        "heading": "HEARTWALL",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You fight shoulder to shoulder with your allies to form an unbroken wall."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When your character is within [1] square of another ally and both characters are wielding shields. EFFECT: Both your character and the ally gain condition [+1] to ward rolls against shoot and magic abilities."
          },
          {
            "type": "paragraph",
            "text": "RESTICTION: A character cannot be affected by multiple instances of Hearthwall from different sources. KEYWORDS: PASSIVE | TALENT"
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
            "text": "COST: [1] mana TRIGGER: This ability can be used during your turn. DECLARE: Choose [1] character within the range of a ranged weapon your character is wielding. EFFECT: Make a ranged strike roll using (3d10) + grace + condition(s) versus the target’s (3d10) + ward + condition(s)."
          },
          {
            "type": "paragraph",
            "text": "DAMAGE: If successful, deal damage equal to the weapon’s damage value and accuracy, plus any conditions. Additionally, apply the effects of the talent breakgrip."
          },
          {
            "type": "paragraph",
            "text": "RESTRICTIONS: Cannot target characters beyond the weapon’s normal range. Targets must be within line of sight. REQUIRES: Breakgrip Talent KEYWORDS: ROOT | COMBAT | SHOOT | TALENT"
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
            "text": "COST: [2] mana TRIGGER: This ability can be used during your turn. EFFECT: Your character may move a number of squares equal to their speed plus [+4] toward a visible enemy within line of sight. If your character uses a combat ability against that target and deals damage during the same turn, increase the total damage by [+2]. POWER THROUGH: At the end of your turn, if your character moved the half movement granted by this ability, deal [1] lethal damage to the target of thunderstep. The target is forced back [1] square directly away from you. If the target cannot be moved, they suffer an additional [1] lethal damage instead. RESTRICTIONS: This movement must end within [1] square of the target and cannot pass through impassable terrain. KEYWORDS: ROOT | MOVE | CHARGE | TALENT"
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
            "text": "COST: [2] mana"
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: This ability can be used during your turn. DECLARE: Choose [1] enemy within [2] squares of your character and another ally. EFFECT: Your character may move [1] square toward the target, then make a melee strike roll using (3d10) + mettle + condition(s) versus the target’s (3d10) + ward + condition(s)."
          },
          {
            "type": "paragraph",
            "text": "DAMAGE: If successful, deal [1] damage plus the weapon’s damage value, accuracy, and any other conditions."
          },
          {
            "type": "paragraph",
            "text": "SHIV: Increase the damage deal by this ability by [+1] for every [2] ranks in agility you have."
          },
          {
            "type": "paragraph",
            "text": "RESTRICTIONS: The target must be within [2] squares when this ability is used. Your character must be wielding a melee weapon. KEYWORDS: ROOT | COMBAT | PHYSICAL | TALENT"
          }
        ]
      },
      {
        "heading": "HUNTER’S MARK",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Every shot you loose follows intent more than aim. EFFECT: When you score an exceptional result [8+] on a ranged strike roll, increase total damage by [+1]. If the weapon’s damage category is lethal, increase the total by [+2] instead. KEYWORDS: PASSIVE | SHOOT | TALENT"
          }
        ]
      },
      {
        "heading": "IRONHIDE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your body moves in concert with metal and mail. EFFECT: Reduce the effects of mana siphon and speed penalties from armor by [-1]."
          },
          {
            "type": "paragraph",
            "text": "ARMOR MASTRY: You can elect to take this talent up to [3] total times. Each time increase the effects of the talent by [+1]. KEYWORDS: PASSIVE | TALENT"
          }
        ]
      },
      {
        "heading": "IRON WILL",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You refuse to fall even when your body fails you. TRIGGER: When your character is reduced to [0] health. EFFECT: After fully resolving all affects involved, your character is restored to [1] health. COOLDOWN: This ability cannot be used again for [1d10/2+2] rounds after it is activated. KEYWORDS: ROOT |REACTIVE | TALENT"
          }
        ]
      },
      {
        "heading": "JUMPSTART",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your instincts fire before your mind can act — motion born of pure reflex. EFFECT: When rolling for initiative, treat your roll as edged. KEYWORDS: PASSIVE | TALENT"
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
            "text": "EFFECT: Before making a roll, you may declare the roll is edged. If you do, your next roll, of any type, is weighted."
          },
          {
            "type": "paragraph",
            "text": "COOLDOWN: This ability cannot be used again for [1d10/2+1] rounds after it is activated."
          }
        ]
      },
      {
        "heading": "KEYWORDS: REACTIVE | TALENT",
        "blocks": []
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
            "text": "COST: [1] mana"
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When a character within [3] squares uses a magical ability with a declared target."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: You may move up to [2] squares toward the caster. If you end adjacent to the caster, they immediately lose [1] mana."
          }
        ]
      },
      {
        "heading": "KEYWORDS: REACTION | MOVE | TALENT",
        "blocks": []
      },
      {
        "heading": "OATH GUARD",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You stand between the strike and its mark. COST: [2] mana TRIGGER: When an ally within [3] squares suffers damage that will reduce them to [0] health. EFFECT: Reduce that damage by [-3] and suffer [3] lethal damage. KEYWORDS: REACTION | TALENT"
          }
        ]
      },
      {
        "heading": "PACK TACTICS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You move where allies move — a rhythm born of shared survival. TRIGGER: When an ally within [3] squares moves as part of a combat ability. EFFECT: You may move up to [1] square. If that ally and your character end within [1] square of each other, you both gain condition [+1] to your next strike roll against that character, until the end of the round. KEYWORDS: REACTIVE | MOVE | TALENT"
          }
        ]
      },
      {
        "heading": "PAIR SHOT",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You loose arrows in seamless rhythm, each following the breath before it. COST: [2] mana TRIGGER: During your turn. DECLARE: Choose [2] characters within the range of a ranged weapon your character is wielding. EFFECT: Make a ranged strike roll using (3d10) + Grace + conditions versus each target’s (3d10) + Ward + conditions. DAMAGE: If successful, deal damage equal to the weapon’s damage value and accuracy, plus any conditions. RESTRICTIONS: Cannot target characters beyond the weapon’s normal range. Targets must be within line of sight. KEYWORDS: ROOT | COMBAT | SHOOT | TALENT"
          }
        ]
      },
      {
        "heading": "POCUNCER",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You never waste the instant between defense and attack. TRIGGER: When an enemy character within [3] squares fails a ward save. EFFECT: Gain [+1] to your next strike roll against that character, until the end of the round. KEYWORDS: ROOT | REACTIVE | TALENT"
          }
        ]
      },
      {
        "heading": "PULSE OF ATTUNEMENT",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You learn to quiet your body and open your spirit to the flow of mana around you."
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When your character casts their first spell of the round from a lore they are attuned to. EFFECT: If the spell is successful restore [1] mana. KEYWORDS: PASSIVE | TALENT"
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
            "text": "TRIGGER: When your character casts a spell. EFFECT: You may reduce the mana cost of that spell by [-2]. If you do, increase the mana cost of the next spell you cast by [+3] mana. COOLDOWN: This ability cannot be used again for [1d10/2+1] rounds after it is activated. KEYWORDS: ROOT | REACTIVE | TALENT"
          }
        ]
      },
      {
        "heading": "RAGEBOUND",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Rage becomes rhythm; pain becomes purpose. COST: [1] mana TRIGGER: This ability can be used at the start of the round. EFFECT: Gain condition [+2] to your strike rolls and condition [+2] to all damage, until the end of the round. DEFENSELESS: All characters gain condition [+1] to strike rolls made against you and your ward is reduced by [-2] KEYWORDS: INSTINCT | TALENT"
          }
        ]
      },
      {
        "heading": "RAMHORN",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your shield drives forward like a wall in motion, scattering your foes and shielding your advance. COST: [1] mana TRIGGER: When using a charge ability against a target while wielding a shield. EFFECT: If your character uses a combat ability against that target following a charge ability and deals damage, the target is forced [1] direct away from your character. If a target is moved, they suffer [1] lethal damage. If the target cannot be moved for any reason by suffer [2] lethal damage."
          },
          {
            "type": "paragraph",
            "text": "REQUIRES: Guardbreaker Talent KEYWORDS: ROOT | REACTIVE | TALENT"
          }
        ]
      },
      {
        "heading": "RHYTHM OF BLADES",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You fight with a rhythm few can follow — one hand finishing what the other begins. EFFECT: When wielding a one-handed weapon in each hand, gain condition [+1] to strike rolls and [+1] damage. REQUIRES: Bonds of Blades Talent KEYWORDS: PASSIVE | COMBAT | TALENT"
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
            "text": "TRIGGER: When you use the grapple ability or are the target of a grapple ability. EFFECT: Gain condition [+2] to grapple rolls and inflict condition [-2] to the target’s opposed grapple roll. KEYWORDS: COMBAT | PHYSICAL | TALENT"
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
            "text": "COST: [2] mana TRIGGER: When your character fails an attribute save roll. EFFECT: You may reroll the check with condition [-1]. You must take the new result. KEYWORDS: REACTIVE | TALENT"
          }
        ]
      },
      {
        "heading": "SHADOW FANG",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You move through blind spots, turning every ally’s distraction into your opportunity. TRIGGER: When an ally within [3] squares performs a combat ability against a target within [3] squares of you. EFFECT: Move [1] square toward the target and make a strike roll. If successful, deal [+1] lethal damage. REQUIRES: Hollowing Claw KEYWORDS: REACTION | MOVE | COMBAT | TALENT"
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
            "text": "EFFECT: When wielding a Sapguard while holding a weapon in each hand, you no longer suffer the [-1] penalty to melee and ranged strike rolls."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: Passive | Talent"
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
            "text": "EFFECT: Choose [1] skill you know, what at least one rank, gain condition [+1] to skill rolls with that skill."
          },
          {
            "type": "paragraph",
            "text": "REOCCURANCE: This talent can be taken up to four times, once for each roll skill."
          },
          {
            "type": "paragraph",
            "text": "REQUIRES: Fieldcraft Talent"
          }
        ]
      },
      {
        "heading": "KEYWORDS: PASSIVE | TALENT",
        "blocks": []
      },
      {
        "heading": "SNAPSTEP",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your hand moves before thought — a blur that catches the first beat of battle. COST: [1] mana TRIGGER: This ability can be used at the start of a round. EFFECT: Your character may move up to three [3] squares in any direction. RESTRICTIONS: This movement cannot end within two [2] squares of an enemy. KEYWORDS: MOVE | REACTION"
          }
        ]
      },
      {
        "heading": "SPELL BREAKER",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The hum of magic finds no purchase in your iron will. EFFECT: Gain condition [+1] to ward against spells and magical abilities. When you succeed on such a ward roll, restore mana [+1]. KEYWORDS: PASSIVE | TALENT"
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
            "text": "COST: [1] mana"
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When you successfully strike a character that has cast an Enhance or Hex spell this round."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Choose one Enhance or Hex spell that the target has cast this turn. End that spell’s effects immediately."
          },
          {
            "type": "paragraph",
            "text": "If there are no such spells to end, the target suffers [2] lethal damage instead."
          }
        ]
      },
      {
        "heading": "KEYWORDS: REACTIVE | TALENT",
        "blocks": []
      },
      {
        "heading": "SPELLFORGE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You read the world’s magic through patterns others overlook. TRIGGER: When you successfully cast a spell on your turn. EFFECT: You may restore [1] mana or gain [+2] to the next strike roll you make for a spell this round. KEYWORDS: ROOT | REACTIVE | TALENT"
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
            "text": "TRIGGER: When you successfully cast a spell on. EFFECT: You may move up to [2] squares RESTRICTIONS: This movement cannot end within [2] squares of an enemy unless another ability allows it. KEYWORDS: ROOT | REACTIVE | TALENT"
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
            "text": "TRIGGER: Using a magic ability that requires mana. EFFECT: If your magic ability is successful in either dealing damage or applying an effect on a character, increase your next ward roll by [+1] KEYWORDS: PASSIVE | TALENT"
          }
        ]
      },
      {
        "heading": "STONEBLOOD",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your body is a fortress of will and endurance. EFFECT: Increase your character’s total health by [2]."
          },
          {
            "type": "paragraph",
            "text": "FORTIFIED: You can elect to take this talent a second time, if you do, increase your health by [+3]. KEYWORDS: PASSIVE | TALENT"
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
            "text": "COST: [2] mana TRIGGER: This ability can be used when your character is targeted by a combat ability that requires a to defend roll. EFFECT: Add [+3] to your character’s ward against that ability. If the ability fails, your character may move [2] square after resolution. RESTRICTIONS: This movement cannot end within two [+2] squares of an enemy. KEYWORDS: COMBAT | REACTION"
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
            "text": "EFFECT: Choose one type of weapon (blade, hammer, spear, or bow). While wielding that type, gain condition [+1] to strike rolls."
          }
        ]
      },
      {
        "heading": "KEYWORDS: PASSIVE | TALENT",
        "blocks": []
      },
      {
        "heading": "THREADSEER",
        "blocks": [
          {
            "type": "paragraph",
            "text": "You link spellwork together in seamless rhythm. TRIGGER: When you successfully cast a spell. EFFECT: You may immediately use the arcane command ability again. Increase the mana cost of that ability by [+4] COOLDOWN: This ability cannot be used again for [1d10/2+1] rounds after it is activated. KEYWORDS: ROOT | REACTIVE | TALENT"
          }
        ]
      },
      {
        "heading": "THUNDEROUS CHARGE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your momentum pierces armor and resolve alike. TRIGGER: When you use a charge combat ability. EFFECT: If your weapon has the penetration quality, deal [2] lethal damage to the target character of the charge ability. Additionally, if there is a different enemy character in an adjustment square of the target, that character suffers [1] lethal damage. KEYWORDS: PASSIVE | TALENT"
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
            "text": "COST: [2] mana"
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When you use a physical combat ability while wielding [2] two-handed weapons. EFFECT: Roll [1d10/+1] and add the result to your total damage. REQUIRES: Primate Grip Talent KEYWORDS: REACTIVE | TALENT"
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
            "text": "COST: [2] mana"
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When wielding only a one-handed weapon and not using a shield and are the target of a combat ability. EFFECT: Increase your ward against that ability by half the damage of the weapon you are wielding. . KEYWORDS: REACTIVE | TALENT"
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
            "text": "COST: [1] mana"
          },
          {
            "type": "paragraph",
            "text": "EFFECT: When wielding a one-handed weapon in each hand, you may reroll any natural results of [2] or lower on strike rolls and keep the higher result."
          },
          {
            "type": "paragraph",
            "text": "REQUIRES: Bonds of Blades Talent"
          }
        ]
      },
      {
        "heading": "KEYWORDS: REACTIVE | TALENT",
        "blocks": []
      },
      {
        "heading": "UNDYING RESOLVE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Your will endures beyond flesh. EFFECT: Gain condition [+1] to attribute saves against compelled effects. Additionally, when you make a successful attribute save restore [+1] health. KEYWORDS: PASSIVE | TALENT"
          }
        ]
      },
      {
        "heading": "VICTORY ROAR",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A single success ignites the will of those nearby. TRIGGER: When you reduce an enemy character to zero health. EFFECT: All ally characters within [3] squares gains condition [+1] to their next attribute save roll or ward roll, whichever comes first. KEYWORDS: PASSIVE | TALENT"
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
            "text": "EFFECT: Wielding a shield no longer grants bonuses to guts. Instead, it grants half of its bonuses to ward rolls."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: Passive | Talent"
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
            "text": "COST: [1] mana"
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When you use a physical combat ability. EFFECT: You may suffer [2] lethal damage to gain condition [+2] to strike or [+2] to damage until the end of the round."
          }
        ]
      },
      {
        "heading": "KEYWORDS: ROOT | INSTINCT | TALENT",
        "blocks": []
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
            "text": "COST: [2] mana"
          },
          {
            "type": "paragraph",
            "text": "TRIGGER: When you successfully strike a character using Wildchain."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Your character can use the whirlwind talent as many times as there are different characters with [2] squares to target. Each additional use of this talent suffers an increasing condition penalty of [-2] (–2 for the first, –4 for the second, –6 for the third, and so on). RESTRICTIONS: You cannot target the same creature more than once per round with this effect. REQUIRES: Wildchain Talent"
          }
        ]
      },
      {
        "heading": "KEYWORDS: | REACTIVE | TALENT",
        "blocks": []
      },
      {
        "heading": "WILDCHAIN",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A flurry of strikes whirls around you — unstoppable and beautiful in its chaos. COST: [1] mana TRIGGER: When you successfully strike a character using Fang Break. EFFECT: You may immediately use melee strike against a different character within [2] squares with condition [-2] to the strike roll. If the second ability is successful, deal an additional [2] lethal damage to the target of that ability. REQUIRES: Fang Break talent KEYWORDS: REACTIVE | TALENT"
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
            "text": "TRIGGER: When a character within [3] squares targets you with a magical ability."
          },
          {
            "type": "paragraph",
            "text": "EFFECT: Gain condition [+1] to your ward roll against that ability. If you successfully ward the effect, the caster suffers [1] lethal damage as their magic recoils."
          },
          {
            "type": "paragraph",
            "text": "REQUIRES: Magebane Talent"
          }
        ]
      },
      {
        "heading": "KEYWORDS: REACTIVE | TALENT",
        "blocks": []
      }
    ]
  },
  "weapons": {
    "sourceFile": "25_BH_WEAPONS(1).docx",
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
                "Can be fired up to [x] squares. Attacking it within [2] square applies [-2] condition to strike rolls."
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
                "1 np",
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
                "5 sp",
                "3",
                "2 lb.",
                "Slashing, Thrown (5)"
              ],
              [
                "Rootbreaker (Mace)",
                "2 sp",
                "4",
                "2 lb.",
                "Bludgeoning, Thrown (4)"
              ],
              [
                "Oak Staff (Quarterstaff)",
                "2 np",
                "2 (3)",
                "4 lb.",
                "Adaptable"
              ],
              [
                "Brush Blade (Short Sword)",
                "10 sp",
                "3",
                "2 lb.",
                "Slashing, Versatile"
              ],
              [
                "Field Blade (Long Sword)",
                "10 p",
                "3 (5)",
                "3 lb.",
                "Slashing, Adaptable"
              ],
              [
                "Stonebreaker (Warhammer)",
                "25 sp",
                "4 (6)",
                "2 lb.",
                "Bludgeoning, Adaptable"
              ],
              [
                "Ranged Weapons"
              ],
              [
                "Thornspike (Dart)",
                "5 wp",
                "3",
                "¼ lb.",
                "Penetration, Thrown (6)"
              ],
              [
                "Reedpipe (Blowpipe)",
                "8 wp",
                "2",
                "1lb.",
                "Projectile (4), Deadly"
              ],
              [
                "Sling",
                "1 np",
                "3",
                "—",
                "Projectile (5), Skyfire"
              ],
              [
                "Brush Bow (Short Bow)",
                "20 sp",
                "3",
                "2 lb.",
                "Projectile (7), Penetration"
              ],
              [
                "Far Bow (Long Bow)",
                "50 sp",
                "4",
                "2 lb.",
                "Projectile (12), Penetration, Skyfire"
              ],
              [
                "Quicklock (Light Crossbow)",
                "25 sp",
                "3",
                "5 lb.",
                "Projectile (8), Penetration, Versatile"
              ],
              [
                "Latchlock (Heavy Crossbow)",
                "50 sp",
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
                "As a healer who avoids harming others whenever possible, Selu’s player chooses an oak staff. The staff deals [2] damage, or [3] damage when used two-handed, thanks to its adaptable quality. When Selu performs a physical combat ability such as melee strike, they roll a strike roll using (3d10) + mettle + any conditions, compared against the target’s ward roll. In example, Selu rolls a total of [22] on their strike, while the target’s ward roll totals [18]. Because Selu’s strike exceeds the target’s ward, the attack hits and the staff deals its two-handed damage of [3] to the target."
              ]
            ]
          }
        ]
      }
    ]
  },
  "armor-shields": {
    "sourceFile": "26_BH_ARMOR&SHEILDS(1).docx",
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
                "30sp",
                "2+",
                "+2",
                "+2",
                "-3",
                "14lb"
              ],
              [
                "Root Weave",
                "75sp",
                "2+",
                "+3",
                "+2",
                "-4",
                "28lb"
              ],
              [
                "Heartguard",
                "250sp",
                "3+",
                "+3",
                "+3",
                "-4",
                "22lb"
              ],
              [
                "Earthforged Plate",
                "600sp",
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
    "sourceFile": "27_BH_ADVENTURING GEAR(2).docx",
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
            "text": "Though the Ancients crafted a variety of fasteners, four types have become standardized for trade:"
          }
        ]
      },
      {
        "heading": "WASHER PIECES (WP)",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Flat alloy rings. • Common and easily carried. • Used for small purchases and everyday needs."
          }
        ]
      },
      {
        "heading": "NUT PIECES (NP)",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Hexagonal fasteners. • Moderately valuable and uniform in weight. • The preferred piece for local markets."
          }
        ]
      },
      {
        "heading": "SCREW PIECES (SP)",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Spiraled fasteners with flawless threading. • The backbone of trade across the realms. • Used for gear, supplies, and expedition materials."
          }
        ]
      },
      {
        "heading": "BOLT PIECES (BP)",
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
                "WP",
                "NP",
                "SP",
                "BP"
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
        "heading": "ADVENTURING KIT",
        "blocks": [
          {
            "type": "paragraph",
            "text": "An adventuring kit provides the basic gear most travelers carry into the wilds."
          },
          {
            "type": "paragraph",
            "text": "Adventuring Kit — Contents"
          },
          {
            "type": "paragraph",
            "text": "Bedroll & Groundsheet"
          },
          {
            "type": "paragraph",
            "text": "Traveler’s Cloak"
          },
          {
            "type": "paragraph",
            "text": "2x Torches"
          },
          {
            "type": "paragraph",
            "text": "Reed Flask & 2x Trail Rations"
          },
          {
            "type": "paragraph",
            "text": "Traveler’s Pack"
          },
          {
            "type": "paragraph",
            "text": "Fire-Starting Kit"
          },
          {
            "type": "paragraph",
            "text": "This set equips a traveler for rest, light, weather, and basic movement through the wilds."
          }
        ]
      },
      {
        "heading": "TRAVELER’S GEAR",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Bedroll & Groundsheet"
          },
          {
            "type": "paragraph",
            "text": "A compact roll of treated cloth paired with a moisture-resistant groundsheet. When used during rest, it prevents the effects of a restless night. Standard equipment for safe, reliable sleep in unpredictable conditions."
          },
          {
            "type": "paragraph",
            "text": "Traveler’s Cloak"
          },
          {
            "type": "paragraph",
            "text": "A heavy, weather-ready cloak that shields against wind and cold. While worn, it grants [+1] to whisperster skill checks, aiding characters who rely on careful movement and concealment."
          },
          {
            "type": "paragraph",
            "text": "Torch"
          },
          {
            "type": "paragraph",
            "text": "A simple wrapped-cloth torch. When lit, it provides Orb [4] illumination. A Fire-Starting Kit or another open flame is required to ignite it."
          },
          {
            "type": "paragraph",
            "text": "Travel Lantern"
          },
          {
            "type": "paragraph",
            "text": "A sturdy oil lantern with shutter controls. It provides Cone [4] illumination when fueled and lit. Requires both fuel and a Fire-Starting Kit to use."
          },
          {
            "type": "paragraph",
            "text": "Glowfruit Cage"
          },
          {
            "type": "paragraph",
            "text": "A wicker cage containing a naturally bioluminescent fruit. It emits Orb [3] light without needing ignition. Glows steadily until the fruit naturally fades (Watcher discretion)."
          },
          {
            "type": "paragraph",
            "text": "Waterskin"
          },
          {
            "type": "paragraph",
            "text": "A tightly sealed hide container capable of holding 2 days worth of water."
          },
          {
            "type": "paragraph",
            "text": "Reed Flask"
          },
          {
            "type": "paragraph",
            "text": "A lightweight reed-wrapped container holding 1 day of water. Easy to refill and carry."
          },
          {
            "type": "paragraph",
            "text": "Travel Meal"
          },
          {
            "type": "paragraph",
            "text": "A prepared bundle of preserved food, enough to sustain a traveler for 2 days."
          },
          {
            "type": "paragraph",
            "text": "Trail Rations"
          },
          {
            "type": "paragraph",
            "text": "Dry and compact preserved food suited for long journeys. One unit provides 1 day of nourishment."
          },
          {
            "type": "paragraph",
            "text": "Traveler’s Pack"
          },
          {
            "type": "paragraph",
            "text": "A durable pack designed for extended travel. It can hold up to 40 lb. of items. Larger or awkwardly shaped items may count as multiple slots (Watcher discretion)."
          },
          {
            "type": "paragraph",
            "text": "Forager’s Satchel"
          },
          {
            "type": "paragraph",
            "text": "A divided satchel intended for herbs, fungi, and small natural materials. Holds up to 10 lb. of items."
          },
          {
            "type": "paragraph",
            "text": "Fire-Starting Kit"
          },
          {
            "type": "paragraph",
            "text": "Contains flint, striker, resin tinder, and ember fungus. Required to ignite torches, lanterns, campfires, and other open flames. Effective even in poor weather with steady hands."
          },
          {
            "type": "paragraph",
            "text": "Traveler’s Rope (20 ft / 6 m)"
          },
          {
            "type": "paragraph",
            "text": "A strong, flexible rope suited for climbing, securing loads, and problem solving in hazardous terrain."
          },
          {
            "type": "paragraph",
            "text": "Glow-Moss Chalk"
          },
          {
            "type": "paragraph",
            "text": "Tools for marking walls, stones, or trail features. Useful for navigation, warnings, and keeping track of branching paths."
          },
          {
            "type": "paragraph",
            "text": "Rootwalker Bundle"
          },
          {
            "type": "paragraph",
            "text": "A compact bundle of bark strips, resin, rope, and small wooden stakes. The bundle helps travelers secure footing on shifting root-bridges, brace unstable surfaces, and mark safe crossings in tangled forest terrain."
          }
        ]
      },
      {
        "heading": "FIELD KITS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Artisan’s Kit"
          },
          {
            "type": "paragraph",
            "text": "A compact collection of tools used for crafting, repair, and camp cooking. It includes small hammers, carving tools, simple cookware, thread, resin, and other versatile materials. Supports tradeskill checks and any activity involving structural repair, shaping, or crafting everyday goods."
          },
          {
            "type": "paragraph",
            "text": "Climber’s Kit"
          },
          {
            "type": "paragraph",
            "text": "A set of hooks, pitons, straps, and line supports used to scale stone, wood, or ruin structures. Supports climbing checks made with stonegrasp, tumblecraft, or similar actions."
          },
          {
            "type": "paragraph",
            "text": "Disguise Kit"
          },
          {
            "type": "paragraph",
            "text": "Pigments, powders, cloth wraps, and shaping tools used to alter appearance. Skillful use can shift posture, modify markings, and replicate uniforms or roles. Supports guile or expression checks when creating or maintaining a disguise."
          },
          {
            "type": "paragraph",
            "text": "Forgery Kit"
          },
          {
            "type": "paragraph",
            "text": "Ink, seals, imitation stamps, paper scraps, and precision tools used to recreate documents, markings, or symbols. Supports shadehand checks related to duplicating letters, forging marks of authority, or altering written materials."
          },
          {
            "type": "table",
            "rows": [
              [
                "ITEM",
                "COST",
                "WEIGHT"
              ],
              [
                "Travel & Rest"
              ],
              [
                "Bedroll & Groundsheet",
                "8 np",
                "4 lb."
              ],
              [
                "Traveler’s Cloak",
                "1 sp",
                "3 lb."
              ],
              [
                "Light Sources"
              ],
              [
                "Torch (each)",
                "2 wp",
                "1 lb."
              ],
              [
                "Travel Lantern",
                "2 sp",
                "2 lb."
              ],
              [
                "Glowfruit Cage",
                "3 np",
                "1 lb."
              ],
              [
                "Food & Water"
              ],
              [
                "Waterskin",
                "8 np",
                "2 lb. (full)"
              ],
              [
                "Reed Flask",
                "4 np",
                "1 lb. (full)"
              ],
              [
                "Travel Meal (2 day)",
                "6 np",
                "2 lb."
              ],
              [
                "Trail Rations (1 day)",
                "3 np",
                "1 lb."
              ],
              [
                "Carrying & Storage"
              ],
              [
                "Traveler’s Pack",
                "1 sp",
                "2 lb."
              ],
              [
                "Forager’s Satchel",
                "5 np",
                "1 lb."
              ],
              [
                "Utility"
              ],
              [
                "Fire-Starting Kit",
                "6 np",
                "1 lb."
              ],
              [
                "Traveler’s Rope (20 ft)",
                "1 sp",
                "3 lb."
              ],
              [
                "Glow-Moss Chalk",
                "1 wp",
                "—"
              ],
              [
                "Rootwalker Bundle",
                "5 np",
                "1 lb."
              ],
              [
                "Field Kits"
              ],
              [
                "Artisan",
                "3 sp",
                "5 lb."
              ],
              [
                "Climber",
                "2 sp",
                "4 lb."
              ],
              [
                "Disguise",
                "3 sp",
                "3 lb."
              ],
              [
                "Forgery",
                "2 sp",
                "2 lb."
              ],
              [
                "Navigator",
                "2 sp",
                "3 lb."
              ],
              [
                "Poisoner",
                "2 sp",
                "2 lb."
              ],
              [
                "Herbalist",
                "1 sp",
                "1 lb."
              ],
              [
                "Infusion",
                "2 sp",
                "3 lb."
              ],
              [
                "Thieves’",
                "3 sp",
                "2 lb."
              ],
              [
                "Alchemical Liquids & Consumables"
              ],
              [
                "Antivenin",
                "3 sp",
                "—"
              ],
              [
                "Aroma",
                "1 sp",
                "—"
              ],
              [
                "Black Water",
                "2 sp",
                "—"
              ]
            ]
          },
          {
            "type": "table",
            "rows": [
              [
                "ITEM",
                "COST",
                "WEIGHT"
              ],
              [
                "Blessed Water",
                "2 sp",
                "1 lb."
              ],
              [
                "Liquid Fire",
                "4 sp",
                "1 lb."
              ],
              [
                "Potion of Healing",
                "5 sp",
                "—"
              ],
              [
                "Spellcasting Implements"
              ],
              [
                "Cloak of Windweave",
                "10 sp",
                "2 lb."
              ],
              [
                "Trinkets"
              ],
              [
                "Scriptweave Book",
                "12 sp",
                "1 lb."
              ],
              [
                "Caster Totem",
                "6 sp",
                "—"
              ],
              [
                "Spell Charm",
                "7 sp",
                "—"
              ],
              [
                "Lens-Stone Arcanum",
                "6 sp",
                "—"
              ],
              [
                "Shiny Bobble",
                "10 sp",
                "—"
              ],
              [
                "Votive Icon",
                "7 sp",
                "—"
              ],
              [
                "Heartward Token",
                "10 sp",
                "—"
              ],
              [
                "Quickdraw Quiver",
                "6 sp",
                "1 lb."
              ],
              [
                "Featherwind Bolt-Case",
                "6 sp",
                "1 lb."
              ],
              [
                "Wristloop",
                "4 sp",
                "—"
              ],
              [
                "Journey Knot",
                "7 sp",
                "—"
              ],
              [
                "Accessories"
              ],
              [
                "Sharpening Stone",
                "3 np",
                "1 lb."
              ],
              [
                "Tools"
              ],
              [
                "Shovel",
                "6 np",
                "3 lb."
              ],
              [
                "Mallet",
                "4 np",
                "2 lb."
              ],
              [
                "Hatchet",
                "1 sp",
                "2 lb."
              ],
              [
                "Hand Saw",
                "1 sp",
                "2 lb."
              ],
              [
                "Trowel",
                "2 np",
                "—"
              ],
              [
                "Pry Bar",
                "5 np",
                "2 lb."
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Navigator’s Kit"
          },
          {
            "type": "paragraph",
            "text": "Charcoal sticks, folded charts, treated parchment, measuring cords, and a small sighting tool. Supports wayfinding checks, mapmaking, route planning, and wilderness navigation."
          },
          {
            "type": "paragraph",
            "text": "Poisoner’s Kit"
          },
          {
            "type": "paragraph",
            "text": "Glass vials, insulated gloves, small clamps, and tools designed for safe handling of toxic substances. Supports the creation, refinement, or application of simple poisons with appropriate checks."
          },
          {
            "type": "paragraph",
            "text": "Herbalist’s Pouch"
          },
          {
            "type": "paragraph",
            "text": "A divided pouch containing bandages, dried leaves, bark strips, and binding fibers. Also includes space for stored herbs gathered in the wild. Supports performing Herbalry, preparing natural remedies, and holding ingredients."
          },
          {
            "type": "paragraph",
            "text": "Infusion Kit"
          },
          {
            "type": "paragraph",
            "text": "A small alchemical setup including a heating bowl, pipettes, metal spoons, reagents, and solvent vials. Supports chemical or alchemical mixtures, including tinctures, distillations, and other non-herbal preparations."
          },
          {
            "type": "paragraph",
            "text": "Thieves’ Kit"
          },
          {
            "type": "paragraph",
            "text": "Slim metal picks, soft pads, prying wedges, and tension tools carried in a wrap. Supports Shadehand checks for quiet entry, delicate manipulation, or bypassing mechanical obstacles."
          }
        ]
      },
      {
        "heading": "ALCHEMICAL LIQUIDS & CONSUMABLES",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Antivenin"
          },
          {
            "type": "paragraph",
            "text": "A tightly sealed vial containing a neutralizing mixture designed to counter common natural toxins. Frequently carried by scouts and caravan guards."
          },
          {
            "type": "paragraph",
            "text": "Crafting Components: Aloe Vera Leaves, Shadowcap, Wolffall, Herb of Mending."
          },
          {
            "type": "paragraph",
            "text": "Aroma"
          },
          {
            "type": "paragraph",
            "text": "A small vial of potent scent used to mask odors, soothe beasts, or confuse creatures that hunt by smell. Its uses depend on circumstance and intent."
          },
          {
            "type": "paragraph",
            "text": "Crafting Components: Cotton Bloom, Ethereal Lemon Balm, Willow Bark Extract."
          },
          {
            "type": "paragraph",
            "text": "Black Water"
          },
          {
            "type": "paragraph",
            "text": "A murky, metallic-smelling liquid collected from certain ancient sites. Stable enough to store, but unpredictable when applied. Its properties vary based on source and preparation."
          },
          {
            "type": "paragraph",
            "text": "Crafting Components: Ancient’s Metal, Shadowshade, Stormtide powder, Yewheart."
          },
          {
            "type": "paragraph",
            "text": "Blessed Water"
          },
          {
            "type": "paragraph",
            "text": "Water that has been steeped in ritual process or sanctified through community rites. Often used in cleansing, warding, or symbolic acts."
          },
          {
            "type": "paragraph",
            "text": "Crafting Components: Celestial Chamomile, Dreamblossom, Tranquil Vale."
          },
          {
            "type": "paragraph",
            "text": "Liquid Fire"
          },
          {
            "type": "paragraph",
            "text": "A thick, volatile mixture that clings to surfaces when ignited. Highly dangerous to mishandle but invaluable for clearing obstacles or dispersing threats."
          },
          {
            "type": "paragraph",
            "text": "Crafting Components: Mandrakorrupt, Deadlyveil, Shadowcap, Silkspindle Thread."
          },
          {
            "type": "paragraph",
            "text": "Potion of Healing"
          },
          {
            "type": "paragraph",
            "text": "A carefully blended restorative mixture that speeds recovery and stabilizes the wounded. Its reliability depends on proper storage and freshness."
          },
          {
            "type": "paragraph",
            "text": "Crafting Components: Herb of Mending, Elderstar Berries, Swiftmend, Aloe Vera Leaves."
          }
        ]
      },
      {
        "heading": "SPELLCASTING IMPLEMENTS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Cloak of Windweave"
          },
          {
            "type": "paragraph",
            "text": "A shimmering mantle infused with subtle harmonic currents. Grants [+1] to guts against damaging magical abilities. The wearer chooses [1] damage type and gains resistance [+1] to that type."
          },
          {
            "type": "paragraph",
            "text": "Crafting Components: Silkspindle Thread, Wildharvest, Tranquil Vale, Ethereal Lemon Balm"
          }
        ]
      },
      {
        "heading": "TRINKETS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Trinkets are equipped as passive gear and do not use numbered slots. An equipped Trinket applies its effect automatically; a Trinket that requires an attachment must also be attached to a legal weapon or armor before its attached effect applies."
          },
          {
            "type": "paragraph",
            "text": "Scriptweave Book"
          },
          {
            "type": "paragraph",
            "text": "A prepared spellbook threaded with repeating sigils that steadies a caster’s rhythm. While equipped, increase Magic Regen by [+1] and reduce the Mana cost of ordinary spells by [-1], to the normal minimum of [1] Mana."
          },
          {
            "type": "paragraph",
            "text": "Caster Totem"
          },
          {
            "type": "paragraph",
            "text": "A crafted bone, wood, metal, or woven focus carried as a personal channel for spellwork. While equipped, gain [+1] Control."
          },
          {
            "type": "paragraph",
            "text": "Spell Charm"
          },
          {
            "type": "paragraph",
            "text": "A small enchanted emblem worn or carried to reinforce a single magical working. Once per round, increase the damage of one spell by [+1]."
          },
          {
            "type": "paragraph",
            "text": "Lens-Stone Arcanum"
          },
          {
            "type": "paragraph",
            "text": "A polished crystal lens bound in cord. Once per encounter, when a spell compels Renew the Heart, adjust that passive target by one category higher or lower."
          },
          {
            "type": "paragraph",
            "text": "Shiny Bobble"
          },
          {
            "type": "paragraph",
            "text": "A bright little charm that catches stray magical currents and returns them to its bearer. While equipped, increase Magic Regen by [+1]."
          },
          {
            "type": "paragraph",
            "text": "Votive Icon"
          },
          {
            "type": "paragraph",
            "text": "A small devotional icon carried as a reminder of faith, resolve, and the promises that steady the heart. While equipped, gain condition [+1] when using Renew the Heart."
          },
          {
            "type": "paragraph",
            "text": "Heartward Token"
          },
          {
            "type": "paragraph",
            "text": "A protective token fastened to armor so its warding joins the armor’s own resilience. While equipped and attached to worn armor, increase that armor’s Guts Bonus by [+1]."
          },
          {
            "type": "paragraph",
            "text": "Quickdraw Quiver"
          },
          {
            "type": "paragraph",
            "text": "A rigid quiver designed for rapid arrow retrieval. While equipped and attached to a bow, gain condition [+1] to TO HIT rolls made with that bow."
          },
          {
            "type": "paragraph",
            "text": "Featherwind Bolt-Case"
          },
          {
            "type": "paragraph",
            "text": "A smooth-lined case that prevents bolts from snagging. While equipped and attached to a crossbow, gain [+1] Accuracy with that crossbow."
          },
          {
            "type": "paragraph",
            "text": "Wristloop"
          },
          {
            "type": "paragraph",
            "text": "A fitted wrist strap that improves the release of thrown weapons. While equipped and attached to a thrown weapon, gain condition [+1] to TO HIT rolls made with that weapon."
          },
          {
            "type": "paragraph",
            "text": "Journey Knot"
          },
          {
            "type": "paragraph",
            "text": "A braided endurance-and-fortune charm tied to a weapon grip or bow limb. While equipped and attached to a weapon, gain condition [+1] to one TO HIT roll made with that weapon."
          }
        ]
      },
      {
        "heading": "ACCESSORIES",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Sharpening Stone"
          },
          {
            "type": "paragraph",
            "text": "A small, smooth whetstone used to refine the edge of slashing or piercing weapons. When a character spends downtime or a short preparation period honing their weapon with the stone, gain [+1] damage to that weapon until the end of the character’s next combat encounter. The effect applies only to physical, non-magical damage and fades once the encounter concludes."
          }
        ]
      },
      {
        "heading": "TOOLS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Tools as Improvised Weapons"
          },
          {
            "type": "paragraph",
            "text": "All tools listed in this section are treated as makeshift weapons if used in combat. (see Weapons, pg. XX)"
          },
          {
            "type": "paragraph",
            "text": "Shovel"
          },
          {
            "type": "paragraph",
            "text": "A sturdy digging tool useful for clearing soil, exposing buried objects, shaping fire pits, or preparing camp terrain."
          },
          {
            "type": "paragraph",
            "text": "Mallet"
          },
          {
            "type": "paragraph",
            "text": "A soft-faced wooden hammer used for driving tent stakes, anchoring lines, or performing simple camp construction."
          },
          {
            "type": "paragraph",
            "text": "Hatchet"
          },
          {
            "type": "paragraph",
            "text": "A small chopping tool for gathering firewood, trimming branches, or clearing tight brush."
          },
          {
            "type": "paragraph",
            "text": "Hand Saw"
          },
          {
            "type": "paragraph",
            "text": "A narrow-toothed saw used to cut small logs, branches, or roots encountered along a trail."
          },
          {
            "type": "paragraph",
            "text": "Trowel"
          },
          {
            "type": "paragraph",
            "text": "A hand-sized digging and shaping tool ideal for clearing small sections of earth, planting herbs, or preparing a flat space for a campfire."
          },
          {
            "type": "paragraph",
            "text": "Pry Bar"
          },
          {
            "type": "paragraph",
            "text": "A simple levering tool for shifting stones, lifting stuck planks, or wedging open stubborn doors."
          }
        ]
      }
    ]
  },
  "trade-goods": {
    "sourceFile": "28_BH_TRADEGOODS(1).docx",
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
                "1 bp",
                "Weatherless alloy fragments with perfect edges and faint sheen."
              ],
              [
                "Aurora Stones",
                "2 sp",
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
                "1 sp",
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
                "2 sp",
                "Twisted, dark-veined root with jagged offshoots."
              ],
              [
                "Moss Pads",
                "4 wp",
                "Thick, spongy green moss clumps that feel cool to the touch."
              ],
              [
                "Shadowcap",
                "2 sp",
                "Small, black-capped mushrooms with matte, velvety tops."
              ],
              [
                "Shadowshade",
                "1 sp",
                "Dusky gray leaves edged in faint, shadowy streaks."
              ],
              [
                "Silkspindle Thread",
                "1 bp",
                "Threadlike roots that twist around each other naturally."
              ],
              [
                "Silkthread",
                "1 sp",
                "Soft, smooth thread with a pale cream color."
              ],
              [
                "Stormtide Powder",
                "7 wp",
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
                "6 wp",
                "An amber liquid stored in small glass phials."
              ],
              [
                "Wool Fleece",
                "2 wp",
                "Soft, off-white tufts of loosely bundled fleece."
              ],
              [
                "Yewheart",
                "2 sp",
                "Dense, dark-red wood fragments with tight grain patterns."
              ]
            ]
          }
        ]
      }
    ]
  },
  "transportation": {
    "sourceFile": "29_BH_TRANSPORTATION(2).docx",
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
    "sourceFile": "30_BH_BEYOND_CREATION(2).docx",
    "sections": [
      {
        "heading": "BEYOND CREATION",
        "blocks": []
      },
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
          }
        ]
      },
      {
        "heading": "EARNING EXPERIENCE",
        "blocks": [
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
    "sourceFile": "31_BH_WINDS_OF_MAGIC(1).docx",
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "table",
            "rows": [
              [
                "THE WINDS OF MAGIC"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "The Winds of Magic are living forces—streams of invisible rhythm that course through every stone, storm, root, and heartbeat of Anthro Mundas. They do not obey command so much as respond to intention, bending toward emotion, memory, and will. Mages describe them as currents: some gentle as snowfall, some raging like wildfire, some whispering from realms far beyond sight."
          },
          {
            "type": "paragraph",
            "text": "To wield magic is not simply to recite words or brandish force, but to listen to the shifting rhythms that drift through the world. The winds are fickle teachers, offering cooperation only to those who honor their rhythm. Magic level reflects how deep that relationship runs: the more a character listens to the winds, the more freely the winds answer."
          }
        ]
      },
      {
        "heading": "MAGIC POWER",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Magic power, also known as magic levels, ranges from [1] to [10]. Each level provides characters with additional mana regeneration and spell slots to fill with spells."
          }
        ]
      },
      {
        "heading": "SPELL SLOTS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Spell slots represent an open niche of knowledge that a character can fill with a spell."
          },
          {
            "type": "paragraph",
            "text": "At magic level [1], characters select [3] different spells from any of the seven magical lores. Characters also gain [1] invocation spell from the invocation lore."
          },
          {
            "type": "paragraph",
            "text": "Characters gain [1] additional spell slot each magic level and gain [1] invocation spell every [2] magic levels."
          },
          {
            "type": "paragraph",
            "text": "Additionally, each magic level increases a character’s mana regeneration by [+1]. See The Battles chapter for more information on mana regeneration and usage. (pg. Xx.)"
          }
        ]
      },
      {
        "heading": "LORE ATTUNEMENT",
        "blocks": [
          {
            "type": "paragraph",
            "text": "When a character gains their first magic level (level one), they select [1] lore of magic and become attuned to it. When casting spells from a lore a character is attuned to, reduce the mana cost of that spell by [-2]."
          }
        ]
      },
      {
        "heading": "SIGNATURE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Each lore of magic has a signature spell, that character gain for free when they become attuned to the lore. Signature spells do not take a spell slot and cannot be willing cast but only when the required trigger is met"
          }
        ]
      },
      {
        "heading": "SPELL KEYWORDS",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Spells include a lore keyword tied to its parent lore of magic."
          },
          {
            "type": "paragraph",
            "text": "Some spells also have the cantrip keyword. These can be cast outside of combat with the magic cast ability against a passive target[medium], unless otherwise stated."
          },
          {
            "type": "paragraph",
            "text": "The anchor keyword functions like root — a character cannot cast more than [1] anchor spell per round."
          }
        ]
      },
      {
        "heading": "ENHANCES & HEXES",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Enhances empower, heal, or protect. They are typically cast on the caster or allies. Hexes weaken, harm, or control. They target enemies."
          },
          {
            "type": "paragraph",
            "text": "A single target cannot be affected by the same augment or hex from the same caster more than once at a time."
          }
        ]
      },
      {
        "heading": "SPELL RANGE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "All spells have a defined range that limits the maximum distance at which they can be cast."
          },
          {
            "type": "paragraph",
            "text": "Some spells, particularly those with an area-of-effect, have two ranges: one determines how far the spell can be cast, and the other defines the size of the area the spell effects."
          },
          {
            "type": "paragraph",
            "text": "AREA OF EFFECT There are three area-of-effect keywords used to describe spells that target an area: line, cone, and orb."
          },
          {
            "type": "paragraph",
            "text": "Each keyword is followed by a numerical value representing the size of the effect. Any character or object within the area-of-effect of a spell is affected by the spell."
          }
        ]
      },
      {
        "heading": "LINE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A line is always straight, never bending, and affects every square it touches along the way. The caster chooses the direction of the line; it continues from the caster until it reaches its maximum listed length or strikes an obstacle the spell cannot pass through."
          },
          {
            "type": "paragraph",
            "text": "Example: If a spell has LINE[10], the caster chooses one of the four cardinal directions and traces a straight line exactly ten squares long. Every character whose square falls along that ten-square path is affected by the spell — whether ally, enemy, object, or terrain feature."
          }
        ]
      },
      {
        "heading": "LINE[10]",
        "blocks": []
      },
      {
        "heading": "CONE",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A cone always begins adjacent to the caster and extends outward in a triangular pattern on the grid. The width of the cone grows as it advances, matching the listed area size."
          },
          {
            "type": "paragraph",
            "text": "Example :If a spell has CONE[6], the caster chooses a direction. Starting from the square directly in front of them, the cone expands to fill a roughly triangular shape six squares long and six squares wide at its farthest edge. Any character standing in that shape is affected by the spell."
          }
        ]
      },
      {
        "heading": "CONE[6]",
        "blocks": []
      },
      {
        "heading": "ORB",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The caster chooses a valid point within the spell’s casting range. The orb expands from that square, forming a square-shaped area of effect whose size is determined by the orb’s number. An orb ignores the caster’s facing and affects all targets within its footprint."
          },
          {
            "type": "paragraph",
            "text": "Example: If a spell has ORB[7], the caster selects any square within the spell’s casting range. A 7×7 block of squares blossoms outward from that point. Every character whose square lies inside that 7×7 area is affected, including those on the edges."
          }
        ]
      },
      {
        "heading": "ORB[7]",
        "blocks": []
      },
      {
        "heading": "DIRECT CASTING",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Direct spells are the simplest form of magical targeting. Any spell that does not use an area-of-effect keyword is considered direct. These spells affect only the chosen target and ignore everything between caster and target."
          },
          {
            "type": "paragraph",
            "text": "A direct spell requires only that the target is within the spell’s listed range and is a valid target for that spell. Terrain, characters, or obstacles between the caster and the target are not affected unless the spell specifically states otherwise."
          },
          {
            "type": "paragraph",
            "text": "If a spell allows you to target an ally or friendly character, the caster may choose themselves as the target."
          },
          {
            "type": "paragraph",
            "text": "Example: If a spell has a range of [6], the caster may choose any valid target up to six squares away. Even if another creature is standing between them on the grid—ally or enemy—the spell affects only the chosen target and nothing else along the path."
          }
        ]
      },
      {
        "heading": "IMPASSABLE COLLISION",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Spells interact with the battlefield differently depending on their shape, but all are affected by impassable terrain. Impassable terrain includes solid walls, sealed doors, thick stone, reinforced structures, or any space the watcher determines cannot be passed through by the effect."
          },
          {
            "type": "paragraph",
            "text": "Example: A cone spreads until it touches an impassable wall (red squares). The cone does not pass through wall; instead, that portion of the cone is removed. The rest of the cone shape remains intact."
          }
        ]
      },
      {
        "heading": "CONE[6]",
        "blocks": []
      }
    ]
  },
  "species-ardenn": {
    "sourceFile": "12_BH_ARDENN.docx",
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
            "text": "Even at the edge of exhaustion, your heart burns steady beneath the frost. TRIGGER: This ability can be used when your character is reduced to [8] health or less. EFFECT: Gain [+3] to strike, ward, guts, and damage until the end of the next round. COOLDOWN: This ability cannot be used again for [1d10/2+1] rounds after it is activated. KEYWORDS: ROOT | REACTION | URNATH | TRAIT"
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
    "sourceFile": "13_BH_AURAVEX.docx",
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
            "text": "TRIGGER: This ability can be used at the start of the round. EFFECT: Your character may move up to double their speed. If your character passes within [1] square of an ally during this movement, that ally gains [+1] to their next roll this round. RESTRICTIONS: This ability cannot be used if your character is within [+2] squares of an enemy and cannot end within [+2] squares of an enemy. KEYWORDS: ROOT | MOVE | AURAVEX | TRAIT"
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
            "text": "TRIGGER: This ability can be used at the end of the round. EFFECT: Count the total number of condition bonuses your character granted to ally characters this round. For every [2] instances of condition granted, restore either health [+1] or mana [+1] in any combination. KEYWORDS: ROOT | INSTINCT | AURAVEX | TRAIT"
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
            "text": "COST: [1] mana TRIGGER: This ability can be used when an ally within [3] squares is compelled to use the renew the heart ability. EFFECT: The target ally’s attribute save roll for renew the heart is considered edged. KEYWORDS: ROOT | REACTION | CULTURE |"
          }
        ]
      }
    ]
  },
  "species-axalori": {
    "sourceFile": "14_BH_AXALORI.docx",
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
            "text": "Your stillness mirrors the calm depths—where even silence heals. TRIGGER: This ability can be used at the end of the round. EFFECT: If your character did not move during the round, restore health [2] and mana [1]. KEYWORDS: ROOT | INSTINCT | AXALORI | TRAIT"
          },
          {
            "type": "paragraph",
            "text": "HEARTCURRENT"
          },
          {
            "type": "paragraph",
            "text": "Your heart flows in rhythm with the world’s pulse—what is spent in one form returns in another. TRIGGER: This ability can be used at the start of the round. EFFECT: Your character may spend [-2] health to restore [1] mana or spend [-1] mana to restore health [2]. KEYWORDS: ROOT | INSTINCT | AXALORI | TRAIT"
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
    "sourceFile": "15_BH_BRAELOR.docx",
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
            "text": "COST: [3] mana TRIGGER: This ability can be used during your turn. EFFECT: Your character may move a number of squares equal to their speed plus [+5] toward a visible enemy within line of sight. If your character uses a combat ability against that target and deals damage during the same turn, increase the total damage by [+2]. POWER THROUGH: At the end of your turn, if your character moved the total movement granted by this ability, deal [3] lethal damage to the target of thunderstep. The target is forced back [1] square directly away from you. If the target cannot be moved, they suffer an [2] lethal damage instead. RESTRICTIONS: This movement must end within [1] square of the target and cannot pass through impassable terrain. KEYWORDS: ROOT | MOVE | BRAELOR | CHARGE | TRAIT"
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
            "text": "Echoes of the Lich King’s dominion linger in Braelor blood. TRIGGER: This ability can be used at the end of the round. EFFECT: When your character successfully resists a hex or compelled effect, restore health [+1] for each instance of success. KEYWORDS: ROOT | INSTINCT | BRAELOR | TRAIT"
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
            "text": "COST: [2] mana TRIGGER: This ability can be used at the start of the round. DECLARE: Summon a spiritual totem within [2] squares of your character. EFFECT: While the totem is active, your character automatically passes the first compelled effect from a spell each round. ally characters within [3] squares of the totem gain [+1] to attribute saves made when using the renew the heart ability. RESTRICTIONS: A character cannot benefit from multiple stillstorm totem from different sources. DURATION: The totem remains until it until destroyed. KEYWORDS: ROOT | INSTINCT | ENHANCE | SUMMON | CULTURE"
          }
        ]
      }
    ]
  },
  "species-cethra": {
    "sourceFile": "16_BH_CETHRA.docx",
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
            "text": "COOLDOWN: This ability cannot be used again for [1d10/2+1] rounds after it is activated. RESTRICTIONS: This movement cannot end within two [2] squares of an enemy. KEYWORDS: ROOT | INSTINCT | CETHRA"
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
            "text": "TRIGGER: This ability can be used when your character fails an attribute save. EFFECT: You may reroll the failed attribute save with [+1]. KEYWORDS: ROOT | INSTINCT | CETHRA | TRAIT"
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
            "text": "RESTRICTIONS: This ability cannot be used with a magical or ranged ability. KEYWORDS: ROOT | REACTIVE | CULTURE |"
          }
        ]
      }
    ]
  },
  "species-hedgkin": {
    "sourceFile": "17_BH_HEDGKID.docx",
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
            "text": "KEYWORDS: ROOT | REACTION | ENHANCE | HEDGKIN | TRAIT"
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
            "text": "KEYWORDS: ROOT | INSTINCT | ENHANCE | CULTURE |"
          }
        ]
      }
    ]
  },
  "species-ravari": {
    "sourceFile": "18_BH_RAVARI.docx",
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
            "text": "KEYWORDS: ROOT | INSTINCT | RAVARI | TRAIT"
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
            "text": "COST: [1] mana TRIGGER: This ability can be used when an ally within [3] squares performs a move or combat ability. EFFECT: Your character may move [1] square. If the move ends within an adjacent square of a different ally that didn’t trigger this ability, you and that ally gain [+1] to the next roll made this round. KEYWORDS: ROOT | REACTION | RAVARI"
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
    "sourceFile": "19_BH_RIVKAN.docx",
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
            "text": "TRIGGER: This ability can be used when your character fails a roll. EFFECT: Gain [+2] to your next roll of the same type (combat, spell, or attribute) made within the next round. If that follow-up roll succeeds, restore mana [+2]. KEYWORDS: ROOT | REACTION | RIVKAN | TRAIT"
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
    "sourceFile": "20_BH_SAUREN.docx",
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
            "text": "KEYWORDS: ROOT | INSTINCT | SAUREN | TRAIT"
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
    "sourceFile": "21_BH_URNATH.docx",
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
            "text": "COOLDOWN: This ability cannot be used again for [1d10/2+1] rounds after it is activated. KEYWORDS: ROOT | REACTION | URNATH | TRAIT"
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
            "text": "COST: [2] mana TRIGGER: This ability can be used during your turn. DECLARE: Target all ally characters within orb [4]. EFFECT: Each target gains [+1] to ward and attribute saves until the end of the next round. RESTRICTIONS: A character cannot be affected by multiple instances of keeper’s roar from different sources. KEYWORDS: ROOT | INSTINCT | ENHANCE | URNATH | TRAIT"
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
    "sourceFile": "22_BH_TORDAN.docx",
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
            "text": "COOLDOWN: This ability cannot be used again for [1d10/2] rounds after it is activated. KEYWORDS: ROOT | REACTION | ENHANCE | TORDAN | TRAIT"
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
            "text": "TRIGGER: This ability can be used at the end of the round. EFFECT: Reduce your characters speed by [-1] until the end of the next round and increase the amount of mana they generate at the start of the next round by [+2] KEYWORDS: ROOT | INSTINCT | CULTURE |"
          }
        ]
      }
    ]
  },
  "species-virelan": {
    "sourceFile": "23_BH_VIRELAN.docx",
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
            "text": "EFFECT: When your character is required to make an attribute save with a target of easy or medium, your dice roll for that save is considered edged. KEYWORDS: ROOT | INSTINCT | VIRELAN | TRAIT"
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
            "text": "KEYWORDS: ROOT | REACTION | CULTURE"
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
            "text": "KEYWORDS: ROOT | INSTINCT | VIRELAN | TRAIT"
          }
        ]
      }
    ]
  },
  "lore-invocation": {
    "sourceFile": "032_BH_INVOCATION SPELLS.docx",
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
            "text": "WHISPERING WIND"
          },
          {
            "type": "paragraph",
            "text": "The wild carries your voice across distance and dusk."
          },
          {
            "type": "paragraph",
            "text": "COST: [0] mana DECLARE: Summon a critter to carry your message. EFFECT: The critter delivers a short mental message to a target you name. RESTRICTIONS: The message can travel any distance but may be delayed by your watcher. KEYWORDS: CANTRIP | MAGIC | INVOCATION | SUMMON"
          },
          {
            "type": "paragraph",
            "text": "SOOTHING BLOOM"
          },
          {
            "type": "paragraph",
            "text": "Life answers when kindness is given form."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] mana DECLARE: Target one ally within [4] squares. EFFECT: The target restores [2] health. EMPOWER: Spend [+3] additional mana to increase range to [+4] squares and the target restores [4] health. KEYWORDS: ENHANCE | MAGIC | INVOCATION | ANCHOR"
          },
          {
            "type": "paragraph",
            "text": "BARKSKIN WARD"
          },
          {
            "type": "paragraph",
            "text": "The calm strength of bark shields the fragile beneath."
          },
          {
            "type": "paragraph",
            "text": "COST: [2] MANA DECLARE: Target one ally within four [4] squares. EFFECT: The target gains [+2] guts until the end of their next turn. EMPOWER: Spend [+2] additional mana to increase effect by [+2]. KEYWORDS: ENHANCE | MAGIC | INVOCATION | ANCHOR"
          },
          {
            "type": "paragraph",
            "text": "WYRD BOLT"
          },
          {
            "type": "paragraph",
            "text": "A crack of woven power leaps through the air like a whispered oath."
          },
          {
            "type": "paragraph",
            "text": "COST: [2] mana DECLARE: Target one character within [4] squares. EFFECT: Deal [5] direct arcane damage. EMPOWER: Spend [+3] additional mana to increase range to [+6] squares and damage by [+3]. KEYWORDS: COMBAT | MAGIC | INVOCATION | ANCHOR"
          },
          {
            "type": "paragraph",
            "text": "SPECTRAL ARMAMENT"
          },
          {
            "type": "paragraph",
            "text": "The air hums as a weapon of pure will takes shape."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] MANA DECLARE: Summon a weapon of shimmering energy into your grasp. EFFECT: Select one weapon from the weapon equipment list. Selected weapon materializes in your grasp and functions as the real item."
          },
          {
            "type": "paragraph",
            "text": "EMPOWER: Spend [+2] additional mana to summon another weapon in a second hand. KEYWORDS: ENHANCE | MAGIC | INVOCATION | ANCHOR | SUMMON"
          },
          {
            "type": "paragraph",
            "text": "VEIL OF GLIMMER"
          },
          {
            "type": "paragraph",
            "text": "A shimmer of thought weaves light, color, and sound into gentle wonder."
          },
          {
            "type": "paragraph",
            "text": "COST: [0] mana DECLARE: Create a minor illusion or sensory effect within [6] squares. EFFECT: Conjure or alter harmless visual, auditory, or sensory phenomena—shift color, dim or brighten light, soften sound, or craft an image no larger than three [3] squares. Effects are temporary and fade when concentration ends. RESTRICTIONS: Cannot move independently, deal damage, cause harm, or create permanent change. KEYWORDS: CANTRIP | MAGIC | INVOCATION"
          },
          {
            "type": "paragraph",
            "text": "SPECTRAL HAND"
          },
          {
            "type": "paragraph",
            "text": "An unseen hand reaches where yours cannot."
          },
          {
            "type": "paragraph",
            "text": "COST: [0] mana DECLARE: Manifest a spectral hand within eight [8] squares. EFFECT: Manipulate objects weighing up to five pounds or perform delicate tasks within [24] squares away."
          },
          {
            "type": "paragraph",
            "text": "RESTRICTIONS: Spell lasts up to three minutes in-game time or [3] rounds. Lasts until your third turn or combat ends. KEYWORDS: CANTRIP | MAGIC | INVOCATION |"
          },
          {
            "type": "paragraph",
            "text": "KINBOUND CALL"
          },
          {
            "type": "paragraph",
            "text": "A loyal echo of spirit answers your summons."
          },
          {
            "type": "paragraph",
            "text": "COST: [1] mana DECLARE: Summon a critter into an empty adjacent square. EFFECT: The summoned critter obeys your commands. Use the critter’s monster entry for statistics. RESTRICTIONS: You may only have one summon spell active at a time. Casting another summon spell automatically ends the previous one. Lasts until combat ends. KEYWORDS: COMBAT | SUMMON | MAGIC | INVOCATION | ANCHOR"
          },
          {
            "type": "paragraph",
            "text": "FORAGER’S GIFT"
          },
          {
            "type": "paragraph",
            "text": "The land provides for those who ask with respect."
          },
          {
            "type": "paragraph",
            "text": "COST: [0] mana DECLARE: Conjure simple food, drink, or mundane supplies within [5] squares. EFFECT: Create enough sustenance for up to [3] characters for one day. Conjured items vanish after twenty-four hours. RESTRICTIONS: Cannot be sold, traded, or used offensively. KEYWORDS: CANTRIP | MAGIC | INVOCATION"
          },
          {
            "type": "paragraph",
            "text": "MENDCRAFT"
          },
          {
            "type": "paragraph",
            "text": "The weave remembers what was once whole."
          },
          {
            "type": "paragraph",
            "text": "COST: [0] mana DECLARE: Touch a damaged nonliving object. EFFECT: Restore one [1] break value to the object. The target must be made of natural materials and be no larger than three [3] squares. KEYWORDS: ENHANCE | MAGIC | INVOCATION"
          },
          {
            "type": "paragraph",
            "text": "SHADEVEIL"
          },
          {
            "type": "paragraph",
            "text": "The unseen world folds its shadow around you."
          },
          {
            "type": "paragraph",
            "text": "COST: [2] mana DECLARE: Cast upon an ally within [4] squares. EFFECT: The target becomes invisible, gaining [+2] to all dice rolls against any characters that cannot see them. RESTRICTIONS: Effect ends if the target performs any action or otherwise reveals themselves. Lasts until combat ends. KEYWORDS: ENHANCE | COMBAT | MAGIC | INVOCATION | ANCHOR"
          },
          {
            "type": "paragraph",
            "text": "HEARTH VOW"
          },
          {
            "type": "paragraph",
            "text": "The promise of flame binds blade and spirit as one."
          },
          {
            "type": "paragraph",
            "text": "COST: [2] mana DECLARE: Target one ally within four [4] squares. EFFECT: The target gains [+1] to strike or ward rolls (their choice) until the end of their next turn. RESTRICTIONS: Cannot stack from multiple sources. Lasts until combat ends."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: ENHANCE | MAGIC | INVOCATION | ANCHOR"
          },
          {
            "type": "paragraph",
            "text": "UNRAVELING WORD"
          },
          {
            "type": "paragraph",
            "text": "You sever the threads that hold another’s power together."
          },
          {
            "type": "paragraph",
            "text": "COST: [2] mana DECLARE: Target one ally within four [4] squares. EFFECT: The target can use the ability renew the heart immediately, without cost. KEYWORDS: ENHANCE | MAGIC | INVOCATION | ANCHOR"
          }
        ]
      }
    ]
  },
  "lore-flames": {
    "sourceFile": "033_BH_LORE OF FLAMES.docx",
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
            "text": "SMOLDER"
          },
          {
            "type": "paragraph",
            "text": "The ember takes hold; pain lingers, waiting to bloom."
          },
          {
            "type": "paragraph",
            "text": "COST: [0] mana TRIGGER: When you successfully cast any lore of flames spell. DECLARE: Choose [1] target successfully affected by the triggering spell. EFFECT: The target gains smolder until the start of the next round. Characters with smolder suffer [1] lethal fire damage each time they are successfully targeted by a lore of flames spell."
          },
          {
            "type": "paragraph",
            "text": "RESTRICTIONS: A single character can be affected by smolder up a maximum of [5] times per round. KEYWORDS: HEX | MAGIC | FLAMES | SIGNATURE"
          },
          {
            "type": "paragraph",
            "text": "SCORCHING HAND"
          },
          {
            "type": "paragraph",
            "text": "Heat leaps from your grasp, clinging like hungry cinders."
          },
          {
            "type": "paragraph",
            "text": "COST: [4] mana DECLARE: Target [1] enemy character within [4] squares. EFFECT: Deal [6] direct fire damage and the target gains smolder."
          },
          {
            "type": "paragraph",
            "text": "EMPOWER: Spend [+2] additional mana. If you do, increase damage by [+1], and the target gains smolder twice, instead of once."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: COMBAT | MAGIC | FLAMES"
          },
          {
            "type": "paragraph",
            "text": "FLAMING SHROUD"
          },
          {
            "type": "paragraph",
            "text": "A crown of thin, judging flame answers violence with pain."
          },
          {
            "type": "paragraph",
            "text": "COST: [4] mana DECLARE: Cast on yourself. EFFECT: Any character that passes through, is within or ends a movement within [1] square of the caster suffers [2] lethal fire damage. Additionally, all attacks with the shoot or magic keyword suffer [-1] on all strike rolls against the caster."
          },
          {
            "type": "paragraph",
            "text": "RESTRICTION: This spell can only trigger smolder when cast. It does not trigger smolder on targets that pass through, are within or ends a movement within [1] square of the caster"
          },
          {
            "type": "paragraph",
            "text": "DURATION: This spell lasts [1d10/2] rounds, effects end at the start of the round. Or when the caster elects to end the effects. KEYWORDS: MAGIC | FLAMES | ENHANCE"
          },
          {
            "type": "paragraph",
            "text": "BLAZING WEAPON"
          },
          {
            "type": "paragraph",
            "text": "Steel drinks fire and answers in kind."
          },
          {
            "type": "paragraph",
            "text": "COST: [5] mana DECLARE: Target [1] ally character within [4] squares wielding a weapon. EFFECT: Increase the target weapons damage by [+1] and damage type to fire, until the end of the next round. AFTERBURN: Any character that suffers damage from the target weapon suffers [1] lethal fire damage at the start of the following round."
          },
          {
            "type": "paragraph",
            "text": "RESTRICTION: This spell cannot trigger smolder and the target weapon’s fire damage cannot trigger smolder. KEYWORDS: ENHANCE | MAGIC | FLAMES |"
          },
          {
            "type": "paragraph",
            "text": "FIRE BOLT"
          },
          {
            "type": "paragraph",
            "text": "Purifying flame tears forward in a focused burst."
          },
          {
            "type": "paragraph",
            "text": "COST: [6] mana DECLARE: Target [1] enemy character within [4] squares. EFFECT: Deal [7] direct fire damage."
          },
          {
            "type": "paragraph",
            "text": "EMPOWER: Spend [+3] additional mana. If you do, increase damage by [+2], and the target gains smolder."
          },
          {
            "type": "paragraph",
            "text": "PURIFY: If the target has the following keywords: undeath, flammable, curse, disease, corruption, unclean - increase the total damage deal by spell by [+4]."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: COMBAT | MAGIC | FLAMES | ANCHOR"
          },
          {
            "type": "paragraph",
            "text": "CASCADING FIRE"
          },
          {
            "type": "paragraph",
            "text": "What catches, spreads."
          },
          {
            "type": "paragraph",
            "text": "COST: [7] mana DECLARE: Select a point of origin within [5] squares. Target all characters within ORB[4] expanding from that point of origin. EFFECT: The target(s) are compelled[difficult] to make a renew the heart ability. On failure, Deal [5] direct fire damage."
          },
          {
            "type": "paragraph",
            "text": "ENGULF: Any character that passes through, is within or ends a movement within the spell’s orb suffers [2] lethal fire damage."
          },
          {
            "type": "paragraph",
            "text": "DURATION: This effect lasts [1d10/2] rounds, effects end at the start of the round. KEYWORDS: COMBAT | MAGIC | FLAMES | ORB | ANCHOR"
          },
          {
            "type": "paragraph",
            "text": "INFERNO STRIKE"
          },
          {
            "type": "paragraph",
            "text": "A focused blast of living flame that will not let go."
          },
          {
            "type": "paragraph",
            "text": "COST: [7] mana DECLARE: Target [1] enemy character within [4] squares. EFFECT: Deal [5] direct fire damage. BURNED: Any character that suffers DAMAGE from this spell suffers [2] lethal fire damage at the start of the following round. DURATION: This effect lasts [1d10/2] rounds, effects end at the start of the round. KEYWORDS: COMBAT | MAGIC | FLAMES"
          },
          {
            "type": "paragraph",
            "text": "INFERNAL REBUKE"
          },
          {
            "type": "paragraph",
            "text": "Pain answers pain."
          },
          {
            "type": "paragraph",
            "text": "COST: [6] mana DECLARE: Target [1] enemy character within [4] squares. EFFECT: Deal [3] lethal fire damage to the target. EMPOWER: Spend [+2] additional mana. If you do, increase damage by [+2], and the target gains smolder."
          },
          {
            "type": "paragraph",
            "text": "REBUKE: If the target of this spell has dealt any damage to the caster, since the end of the caster’s last turn, reduce the mana cost of this spell by [-2]."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: HEX | COMBAT | MAGIC | FLAMES"
          },
          {
            "type": "paragraph",
            "text": "SUN BURST"
          },
          {
            "type": "paragraph",
            "text": "Light without mercy."
          },
          {
            "type": "paragraph",
            "text": "COST: [7] mana DECLARE: Target all enemy characters within orb[5] centered on a point of origin within [5] squares. EFFECT: The target is compelled[medium] to use the renew the heart ability. On failure, targets suffer [2] lethal fire and [-2] to strike and ward rolls; and the targets gain smolder."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: HEX | MAGIC | FLAMES | ORB | ANCHOR"
          },
          {
            "type": "paragraph",
            "text": "DETONATION"
          },
          {
            "type": "paragraph",
            "text": "Fire learns patience — then teaches regret."
          },
          {
            "type": "paragraph",
            "text": "COST: [8] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: The target rolls [1d10] and consults that results below."
          },
          {
            "type": "paragraph",
            "text": "1–3 | SPARK: Deal [2] lethal fire DAMAGE to the target immediately and target rolls again at the start of the next round. 4–6 | PRESSURE: Target rolls again at the start of the next round. 7–9 | BURST: Deal [7] direct fire damage to the target immediately and target rolls again at the start of the next round. 10 | CATASTROPHE: Deal [6] lethal fire damage to the target immediately and the effects end."
          },
          {
            "type": "paragraph",
            "text": "DURATION: This effect lasts [1d10/2+1] rounds, effects end at the start of the round. KEYWORDS: HEX | MAGIC | FLAMES | ANCHOR"
          },
          {
            "type": "paragraph",
            "text": "IMMOLATION"
          },
          {
            "type": "paragraph",
            "text": "The flame does not ask permission."
          },
          {
            "type": "paragraph",
            "text": "COST: [12] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: Deal [8] direct fire damage to the target immediately and that target gains immolated. IMMOLATED: At the start of each round, characters with immolation suffer [3] lethal fire damage."
          },
          {
            "type": "paragraph",
            "text": "IGNITION: Any character that passes through, is within or ends a movement within [1] square of a character with immolated gains immolated."
          },
          {
            "type": "paragraph",
            "text": "DURATION: This effect lasts [1d10/2+1] rounds, effects end at the start of the round. RESTRICTIONS: A character cannot be affected by multiple instances of immolation at the same time or from different sources. immolation damage cannot trigger smolder. KEYWORDS: HEX | MAGIC | FLAMES | ANCHOR"
          }
        ]
      }
    ]
  },
  "lore-wilds": {
    "sourceFile": "034_BHG_LORE OF WILDS.docx",
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
            "text": "FLOURISHING EARTH"
          },
          {
            "type": "paragraph",
            "text": "Life and death share one rhythm; the wild decides which blooms."
          },
          {
            "type": "paragraph",
            "text": "COST: [0] mana TRIGGER: When you successfully cast any lore of wilds spell. DECLARE: Target [1] ally within [5] squares. EFFECT: Reduce a negative condition from the target by[-1]. This can reduce the condition to zero but does not remove the condition or ends it duration. KEYWORDS: ENHANCE | MAGIC | WILDS | SIGNATURE"
          },
          {
            "type": "paragraph",
            "text": "ELEMENTAL ARMOR"
          },
          {
            "type": "paragraph",
            "text": "The elements answer the call, forming a living shell of power."
          },
          {
            "type": "paragraph",
            "text": "COST: [4] mana DECLARE: Target [1] ally within [5] squares. EFFECT: The target gains resistance [+2] against a chosen damage type until the start of their next turn. EMPOWER: Spend [+2] additional mana to grant resistance [+2] to a second damage type. KEYWORDS: ENHANCE | MAGIC | WILDS"
          },
          {
            "type": "paragraph",
            "text": "CURSE OF PATRONUS"
          },
          {
            "type": "paragraph",
            "text": "The guardian spirits turn their wrath upon the impure."
          },
          {
            "type": "paragraph",
            "text": "COST: [5] mana DECLARE: Target up to [3] enemy characters within [4] squares. EFFECT: Each target is compelled[medium] to use the renew the heart ability. On failure, they suffer [3] lethal nature damage and gain [-1] when rolling strike with any magic abilities until the end of their next turn. KEYWORDS: HEX | MAGIC | WILDS | ORB"
          },
          {
            "type": "paragraph",
            "text": "MOON BOLT"
          },
          {
            "type": "paragraph",
            "text": "A shaft of cold light tears through shadow and pride alike."
          },
          {
            "type": "paragraph",
            "text": "COST: [6] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: The target is compelled[easy] to use the renew the heart ability. On failure, deal [10] direct nature damage; on success, deal half damage. KEYWORDS: COMBAT | MAGIC | WILDS"
          },
          {
            "type": "paragraph",
            "text": "NATURE’S FURY"
          },
          {
            "type": "paragraph",
            "text": "Wind, rain, and stone answer your command in one violent breath."
          },
          {
            "type": "paragraph",
            "text": "COST: [6] mana DECLARE: Target all enemy characters within line[4]. EFFECT: Each target suffers deal [3] lethal nature damage. KEYWORDS: COMBAT | MAGIC | WILDS | LINE"
          },
          {
            "type": "paragraph",
            "text": "ENTANGLING ROOTS"
          },
          {
            "type": "paragraph",
            "text": "The earth itself rises to claim those who would defy its law."
          },
          {
            "type": "paragraph",
            "text": "COST: [7] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: The target is compelled[medium] to use the renew the heart ability. On failure, reduce speed to [1], gain rooted, and apply [-2] to ward until the end of their next turn."
          },
          {
            "type": "paragraph",
            "text": "ROOTED: At the start of each round, if a target is rooted, they suffer [2] lethal nature damage. DURATION: This effect lasts [1d10] rounds, effects end at the start of the round. KEYWORDS: HEX | MAGIC | WILDS | ANCHOR"
          },
          {
            "type": "paragraph",
            "text": "HALLOWING THORNS"
          },
          {
            "type": "paragraph",
            "text": "The ground twists and bristles with the wild’s fury."
          },
          {
            "type": "paragraph",
            "text": "COST: [9] mana DECLARE: Target an area within [5] squares; create an orb[4]. EFFECT: Each enemy within the orb is compelled[easy] to use the renew the heart ability. On failure, they suffer [10] direct nature damage."
          },
          {
            "type": "paragraph",
            "text": "DIFFICULT TERRAIN: The targeted squares become difficult terrain until the end of the next round. Any characters moving through them are compelled to use the renew the heart ability. On failure they suffer [2] lethal nature damage. DURATION: [1d10/2] rounds, effects end at the start of the round. KEYWORDS: MAGIC | WILDS | ORB | ANCHOR"
          },
          {
            "type": "paragraph",
            "text": "BLESSING OF THE WILDS"
          },
          {
            "type": "paragraph",
            "text": "The wind and soil conspire to lift and shelter those who walk in harmony."
          },
          {
            "type": "paragraph",
            "text": "COST: [8] mana DECLARE: Target all ally characters within orb[6]. EFFECT: Each target chooses one: gain condition [+1] to strike or [+1] to ward and swift strider, until the end of their next turn. SWIFT STRIDER: Target(s) ignore difficult terrain. RESTRICTIONS: A character cannot be affected by multiple instances of blessing of the wilds"
          },
          {
            "type": "paragraph",
            "text": "from different sources. KEYWORDS: ENHANCE | MAGIC | WILDS | ORB"
          },
          {
            "type": "paragraph",
            "text": "WILD SHAPE"
          },
          {
            "type": "paragraph",
            "text": "Your body bends and shifts, becoming one with primal instinct."
          },
          {
            "type": "paragraph",
            "text": "COST: [9] mana DECLARE: Cast on yourself. EFFECT: Gain [+2] to strike, ward, guts, and all non-magical damage until the start of your next turn. EMPOWER: Spend [+3] additional mana to cast this spell on an ally within [5] squares. KEYWORDS: ENHANCE | MAGIC | WILDS | ANCHOR"
          },
          {
            "type": "paragraph",
            "text": "CALL OF THE BEAST"
          },
          {
            "type": "paragraph",
            "text": "The wilds themselves answer your plea with tooth and claw."
          },
          {
            "type": "paragraph",
            "text": "COST: [10] mana DECLARE: Choose one empty square within [4] squares. EFFECT: summon one beast monster with a threat level of [4] or lower. The beast is added to the initiative order immediately your turn until defeated or dismissed. KEYWORDS: MAGIC | WILDS | SUMMON | ANCHOR"
          },
          {
            "type": "paragraph",
            "text": "BREATH OF LIFE"
          },
          {
            "type": "paragraph",
            "text": "Even destruction becomes renewal beneath the wild’s grace."
          },
          {
            "type": "paragraph",
            "text": "COST: [12] mana DECLARE: Target all enemy characters within CONE[6]. EFFECT: Each target is compelled[medium] to use the renew the heart ability. On failure, suffer [4] lethal nature damage. For each enemy character that suffers damage from this spell, select one ally character within [6] squares and restore [2] health. KEYWORDS: MAGIC | WILDS | CONE | ANCHOR"
          }
        ]
      }
    ]
  },
  "lore-oath": {
    "sourceFile": "035_BH_LORE OF OATHS.docx",
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
            "text": "OATH OF PROTECTION"
          },
          {
            "type": "paragraph",
            "text": "A vow sworn in truth hardens the heart and shields the worthy."
          },
          {
            "type": "paragraph",
            "text": "COST: [0] mana TRIGGER: When you successfully cast any lore of oaths spell. DECLARE: Choose [1] ally character within [5] squares. EFFECT: The chosen character gains [+2] to guts until the start of the next round. RESTRICTIONS: A character cannot benefit from multiple instances of oath of protection. KEYWORDS: ENHANCE | MAGIC | OATHS | SIGNATURE"
          },
          {
            "type": "paragraph",
            "text": "WORD OF CHALLENGE"
          },
          {
            "type": "paragraph",
            "text": "To stand before the foe is to demand their respect—or their fear."
          },
          {
            "type": "paragraph",
            "text": "COST: [4] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: The target is compelled[medium] to use the renew the heart ability. On failure, their outgoing damage against targets other than the caster is reduced by [-2], to a minimum of [1], until the end of their next turn. KEYWORDS: HEX | MAGIC | OATHS | ORB"
          },
          {
            "type": "paragraph",
            "text": "THUNDER’S FURY"
          },
          {
            "type": "paragraph",
            "text": "The storm answers a promise of retribution. COST: [5] MANA DECLARE: Target [1] ally character within [5] squares wielding a weapon. EFFECT: Increase the target weapons Damage by [+2] and change the damage type to lighting, until the end of the next round. AFTERBURN: Any character that suffers damage from the target weapon suffers [1] lethal light damage at the start of the following round."
          },
          {
            "type": "paragraph",
            "text": "RESTRICTION: The target weapon’s lighting damage cannot trigger oath of protection. KEYWORDS: ENHANCE | MAGIC | FLAMES |"
          },
          {
            "type": "paragraph",
            "text": "POWER WORD: REINFORCEMENT"
          },
          {
            "type": "paragraph",
            "text": "Your vow steadies the hands and hearts of those who fight beside you."
          },
          {
            "type": "paragraph",
            "text": "COST: [6] MANA DECLARE: Target [1] ally character within [5] squares. EFFECT: The target decreases all damage categories by [1]. Lethal DAMAGE changes to direct and direct damage changes to standard. KEYWORDS: ENHANCE | MAGIC | OATHS"
          },
          {
            "type": "paragraph",
            "text": "VOW OF ELEMENTS"
          },
          {
            "type": "paragraph",
            "text": "Through oath and focus, you command the world’s primal powers to defend your ally."
          },
          {
            "type": "paragraph",
            "text": "COST: [4] mana DECLARE: Target [1] ally character within [5] squares. EFFECT: The target selects [1] DAMAGE type and gain resistance [+2] against that type until the end of their next turn. KEYWORDS: ENHANCE | MAGIC | OATHS"
          },
          {
            "type": "paragraph",
            "text": "WIND SCARING"
          },
          {
            "type": "paragraph",
            "text": "A surge of cutting energy carries your oath’s fury across the field."
          },
          {
            "type": "paragraph",
            "text": "COST: [5] mana DECLARE: Target [1] ally character within [5] squares wielding a weapon. EFFECT: Increase the target weapons damage by [+2] and change the damage type to arcane, until the end of the next round."
          },
          {
            "type": "paragraph",
            "text": "DUALING ELEMENTS: Targets of this spell can have"
          },
          {
            "type": "paragraph",
            "text": "THUNDERSTORM: If the target weapon it under the effects of thunder’s fury, increase the damage condition for both spells by [+1]. The weapon is granted both damage types for the duration. KEYWORDS: ENHANCE | MAGIC | OATHS"
          },
          {
            "type": "paragraph",
            "text": "EARTH GRASP"
          },
          {
            "type": "paragraph",
            "text": "Stone rises in obedience to your pledge of defense."
          },
          {
            "type": "paragraph",
            "text": "COST: [7] mana DECLARE: Target [1] empty square within [6] squares and summon a totem. EFFECT: All enemy characters within orb[5] of the totem suffer [-2] to speed until the end of their next turn. KEYWORDS: MAGIC | OATHS | SUMMON | ANCHOR"
          },
          {
            "type": "paragraph",
            "text": "PRIMAL SURGE"
          },
          {
            "type": "paragraph",
            "text": "You channel raw conviction into flesh and faith."
          },
          {
            "type": "paragraph",
            "text": "COST: [8] mana DECLARE: Target [1] ALLY within [5] squares. EFFECT: The target restores health [+4] and gains [+2] to strike rolls until the end of their next turn. KEYWORDS: ENHANCE | MAGIC | OATHS"
          },
          {
            "type": "paragraph",
            "text": "THE IMMORTAL WARRIOR"
          },
          {
            "type": "paragraph",
            "text": "You become the living symbol of your vow, standing against all that would falter."
          },
          {
            "type": "paragraph",
            "text": "COST: [10] mana DECLARE: Cast on yourself. EFFECT: Gain [+2] to ward and guts until the end of your next turn."
          },
          {
            "type": "paragraph",
            "text": "DEFECTION: When the target of an attack that deals damage, you can be compelled[medium] to use the renew the heart ability. On failure, nothing happens. If successful you suffer no damage and half the intended damage from the attack is reflected back at the attacker KEYWORDS: ENHANCE | MAGIC | OATHS | ANCHOR"
          },
          {
            "type": "paragraph",
            "text": "OATHKEEPER"
          },
          {
            "type": "paragraph",
            "text": "Your promise shields your comrades and punishes betrayal."
          },
          {
            "type": "paragraph",
            "text": "COST: [12] mana DECLARE: Target all enemy characters within orb[5] of the caster EFFECT: Each target is compelled[medium] to use the renew the heart ability. On failure, their outgoing damage against targets other than the caster is reduced by [-5], to a minimum of [1], until the end of their next turn. KEYWORDS: ENHANCE | MAGIC | OATHS | ORB | ANCHOR"
          }
        ]
      }
    ]
  },
  "lore-frost": {
    "sourceFile": "036_BH_LORE OF FROST.docx",
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
            "text": "HYPOTHERMIA"
          },
          {
            "type": "paragraph",
            "text": "The air stills; the warmth of life falters beneath an unseen chill."
          },
          {
            "type": "paragraph",
            "text": "COST: [0] mana TRIGGER: When you successfully cast any lore of frost spell. DECLARE: Choose one enemy character within [5] squares. EFFECT: The target suffers [-1] to speed until the end of their next turn. KEYWORDS: HEX | MAGIC | FROST | SIGNATURE"
          },
          {
            "type": "paragraph",
            "text": "MIND FREEZE"
          },
          {
            "type": "paragraph",
            "text": "Frost creeps through the mind, locking thought in brittle silence."
          },
          {
            "type": "paragraph",
            "text": "COST: [3] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: The target is compelled[easy] to use the renew the heart ability. On failure, they suffer [-1] to all attribute saves until the end of their next turn. KEYWORDS: HEX | MAGIC | FROST"
          },
          {
            "type": "paragraph",
            "text": "FROST SHOCK"
          },
          {
            "type": "paragraph",
            "text": "A pulse of frozen energy shatters the air, leaving a biting trail of rime."
          },
          {
            "type": "paragraph",
            "text": "COST: [4] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: Deal [5] direct cold DAMAGE. The target suffers [-1] to guts until the end of their next turn. KEYWORDS: COMBAT | MAGIC | FROST"
          },
          {
            "type": "paragraph",
            "text": "BITING BLADE"
          },
          {
            "type": "paragraph",
            "text": "Steel cracks beneath the weight of winter’s edge."
          },
          {
            "type": "paragraph",
            "text": "COST: [5] mana DECLARE: Target [1] enemy character within [5] squares wielding a weapon. EFFECT: Reduce the target weapons damage by [-1] until the end of the next round. KEYWORDS: HEX | MAGIC | FROST"
          },
          {
            "type": "paragraph",
            "text": "TORRENT OF FROST"
          },
          {
            "type": "paragraph",
            "text": "A wave of white wind bursts outward, freezing flesh and breath alike."
          },
          {
            "type": "paragraph",
            "text": "COST: [6] mana DECLARE: Target all characters within a cone[5]. EFFECT The target(s) is compelled[medium] to use the renew the heart ability. On failure, deal [3] lethal cold damage, or half as much on success. Targets that fail also suffer [-1] to guts until the end of their next turn. KEYWORDS: COMBAT | MAGIC | FROST | CONE"
          },
          {
            "type": "paragraph",
            "text": "ICE WALL"
          },
          {
            "type": "paragraph",
            "text": "A wall of glittering frost rises, sealing paths and muting sound."
          },
          {
            "type": "paragraph",
            "text": "COST: [7] mana DECLARE: Target all characters within a line[5]. EFFECT: Each target suffers [4] direct cold damage and gain [-2] to their next roll made, until the end of the round. Additionally, the targeted squares become difficult terrain until the end of the next round. Any characters moving through them are compelled[medium] to use the renew the heart ability. On failure they suffer [2] lethal cold damage. KEYWORDS: MAGIC | FROST | ANCHOR"
          },
          {
            "type": "paragraph",
            "text": "POLAR VORTEX"
          },
          {
            "type": "paragraph",
            "text": "A spiral of biting wind draws heat and will from the air."
          },
          {
            "type": "paragraph",
            "text": "COST: [8] mana DECLARE: Select a point of origin within [5] squares. Target all characters within orb[5] expanding from that point of origin. EFFECT: The target is compelled[medium] to use the renew the heart ability. On failure, deal [3] lethal cold damage and targets suffer [-1] to ward until the end of their next turn. KEYWORDS: HEX | MAGIC | FROST"
          },
          {
            "type": "paragraph",
            "text": "FROSTBITE"
          },
          {
            "type": "paragraph",
            "text": "The chill gnaws deep, numbing flesh and thought alike."
          },
          {
            "type": "paragraph",
            "text": "COST: [4] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: The target is compelled[medium] to use the renew the heart ability. On failure, deal [6] direct cold damage and the target suffers [-1] to speed until the end of their next turn, or resists effects and half damage on successes. KEYWORDS: COMBAT | MAGIC | FROST"
          },
          {
            "type": "paragraph",
            "text": "FROZEN BLOOD"
          },
          {
            "type": "paragraph",
            "text": "The heart slows, each beat thick with ice."
          },
          {
            "type": "paragraph",
            "text": "COST: [7] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: The target is compelled[hard] to make a renew the heart ability. On failure, suffer [-2] to strike rolls and speed until the end of their next turn, or resists effects. KEYWORDS: HEX | MAGIC | FROST"
          },
          {
            "type": "paragraph",
            "text": "ICY TOMB"
          },
          {
            "type": "paragraph",
            "text": "A prison of frost closes around the living, sealing motion in silence."
          },
          {
            "type": "paragraph",
            "text": "COST: [12] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: The target is compelled[difficult] to use the renew the heart ability. On failure, reduce target’s speed to [1], suffer [-2] to strike and ward rolls. Additionally, reduce all healing effects that restore health by [-2] and increase all damage suffered by [+2]."
          },
          {
            "type": "paragraph",
            "text": "DURATION: This effect lasts [1d10/2] rounds, effects end at the start of the round."
          },
          {
            "type": "paragraph",
            "text": "RESTRICTION: LETHAL DAMAGE suffered is not effected by this spell effect. KEYWORDS: HEX | MAGIC | FROST | ANCHOR"
          }
        ]
      }
    ]
  },
  "lore-hallows": {
    "sourceFile": "037_BH_LORE OF HALLOWS.docx",
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
            "text": "SCARY FACE"
          },
          {
            "type": "paragraph",
            "text": "A malevolent grin embodies the sinister nature of the Hallows, leaving its victims trembling and faltering in their focus."
          },
          {
            "type": "paragraph",
            "text": "COST: [0] mana TRIGGER: When you successfully cast any lore of hallows spell. DECLARE: Choose [1] enemy character within [5] squares. EFFECT: Reduce the target’s mana regeneration at the start of the next round by [-1] plus one-half the value of their magic level. RESTRICTIONS: A character cannot be affected by multiple instances of scary face from different sources. KEYWORDS: HEX | MAGIC | HALLOWS | SIGNATURE"
          },
          {
            "type": "paragraph",
            "text": "SOULFIRE BOLT"
          },
          {
            "type": "paragraph",
            "text": "A chilling bolt of haunted energy rips through the veil, searing flesh and unraveling sanity."
          },
          {
            "type": "paragraph",
            "text": "COST: [5] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: The target suffers [8] psychic damage and is compelled[medium] to use the renew the heart ability. On failure, they suffer an additional [2] lethal psychic damage. EMPOWER: Spend [+2] additional mana. Increase damage by [+2]. KEYWORDS: COMBAT | MAGIC | HALLOWS"
          },
          {
            "type": "paragraph",
            "text": "HEX OF MISFORTUNE"
          },
          {
            "type": "paragraph",
            "text": "The Hallows twist the strands of fate, cursing your foe with wretched luck."
          },
          {
            "type": "paragraph",
            "text": "COST: [3] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: The target gains [-1] to using renew the heart until the end of the next round. EMPOWER: Spend [+2] additional mana. Reduce the target’s ward by [-2] and extend the duration to [2] rounds. KEYWORDS: HEX | MAGIC | HALLOWS"
          },
          {
            "type": "paragraph",
            "text": "EERIE APPARITION"
          },
          {
            "type": "paragraph",
            "text": "A spectral vision of doom rises before your foe, driving terror deep into their mind."
          },
          {
            "type": "paragraph",
            "text": "COST: [5] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: The target is compelled[medium] to use the renew the heart ability. On failure, they move [3] squares in any direction away from you. If they cannot move or be moved, they suffer [2] lethal psychic damage instead. DRIVING FEAR: At the start of the next round, the target is compelled[easy] to use the renew the heart ability. On failure, they move [2] squares in any direction away from you. If they cannot move or be moved, they suffer [2] lethal psychic damage instead. KEYWORDS: HEX | MAGIC | HALLOWS"
          },
          {
            "type": "paragraph",
            "text": "SHROUD OF DESPAIR"
          },
          {
            "type": "paragraph",
            "text": "You cloak your ally in the wailing fog of the Hallows, turning despair into protection."
          },
          {
            "type": "paragraph",
            "text": "COST: [5] mana DECLARE: Target [1] ally character within [5] squares. EFFECT: The target applies [-2] to all strike rolls against them, until the end of the next round. RESTRICTIONS: A character cannot be affected by multiple instances of shroud of despair from different sources. KEYWORDS: ENHANCE | MAGIC | HALLOWS"
          },
          {
            "type": "paragraph",
            "text": "SPECTRAL GRASP"
          },
          {
            "type": "paragraph",
            "text": "Your hand becomes a conduit of nightmare energy, reaching through the veil to rend flesh and spirit alike."
          },
          {
            "type": "paragraph",
            "text": "COST: [8] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: The target is compelled[easy] to use the renew the heart ability. On failure, deal [7] psychic damage, or on success deal half damage EMPOWER: Spend [+2] additional mana. Increase the compelled target to [medium]. KEYWORDS: COMBAT | MAGIC | HALLOWS"
          },
          {
            "type": "paragraph",
            "text": "PIERCE THE VEIL"
          },
          {
            "type": "paragraph",
            "text": "You draw your ally into the Hallows’ ethereal threshold, where nothing solid can harm them."
          },
          {
            "type": "paragraph",
            "text": "COST: [6] mana"
          },
          {
            "type": "paragraph",
            "text": "DECLARE: Target [1] ally character within [5] squares. EFFECT: The target becomes ethereal until the start of your next turn. ETHEREAL: Target characters cannot use any abilities, suffer any damage or otherwise interact with the tangle world."
          },
          {
            "type": "paragraph",
            "text": "RESTRICTIONS: A character cannot be affected by multiple instances of PIERCE THE VEIL. KEYWORDS: ENHANCE | MAGIC | HALLOWS | ANCHOR"
          },
          {
            "type": "paragraph",
            "text": "DEATHLY SHADOW"
          },
          {
            "type": "paragraph",
            "text": "You command the Hallows’ gloom to devour your enemy’s courage and steady your ally’s defense."
          },
          {
            "type": "paragraph",
            "text": "COST: [8] mana DECLARE: Target [1] ally within [5] squares. EFFECT: The target gain [+3] to ward and guts until the end of the round. EMPOWER: Spend [+2] additional mana. Increase the bonus to [+1] and extend the effect until the end of the next round. KEYWORDS: ENHANCE | MAGIC | HALLOWS"
          },
          {
            "type": "paragraph",
            "text": "SPECTRAL RECKONING"
          },
          {
            "type": "paragraph",
            "text": "You summon vengeful spirits to lash at the soul of your enemy."
          },
          {
            "type": "paragraph",
            "text": "COST: [10] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: The target is compelled[medium] to use the renew the heart ability. On failure, deal [9] psychic damage, or on success deal half damage EMPOWER: Spend [+2] additional mana. Increase the compelled target to [hard]. KEYWORDS: COMBAT | MAGIC | HALLOWS"
          },
          {
            "type": "paragraph",
            "text": "ORB OF IMPURITY"
          },
          {
            "type": "paragraph",
            "text": "A seething sphere of corruption poisons the very air around it."
          },
          {
            "type": "paragraph",
            "text": "COST: [7] mana DECLARE: Select a point of origin within [5] squares. Target enemy characters within ORB[5] expanding from that point of origin. EFFECT: The target is compelled[medium] to use the renew the heart ability. On failure, the caster grants weakness[2] against a chosen damage type, until the end of the next around. Or on success, the target suffers lethal psychic damage. KEYWORDS: HEX | MAGIC | HALLOWS | ORB | ANCHOR"
          },
          {
            "type": "paragraph",
            "text": "VORTEX OF SHADOWS"
          },
          {
            "type": "paragraph",
            "text": "The void awakens, howling with the cries of the lost."
          },
          {
            "type": "paragraph",
            "text": "COST: [11] mana DECLARE: Select a point of origin within [5] squares. Target enemy characters within ORB[5] expanding from that point of origin. EFFECT: The target is compelled[difficult] to use the renew the heart ability. On failure, deal [8] psychic damage and gain condition[-2] on their initiative order position. Or on success, deal half damage. EMPOWER: Spend [+3] additional mana. Increase the initiative condition to [-4]. KEYWORDS: HEX | MAGIC | HALLOWS | ORB | ANCHOR"
          }
        ]
      }
    ]
  },
  "lore-harmony": {
    "sourceFile": "038_BH_LORE OF HARMONY.docx",
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
            "text": "CHORUS OF HARMONY"
          },
          {
            "type": "paragraph",
            "text": "The first note steadies the spirit; the second calls the world to listen."
          },
          {
            "type": "paragraph",
            "text": "COST: [0] # TRIGGER: When you successfully cast any # spell. DECLARE: Choose [1] friendly character within [6] squares. EFFECT: The chosen character reduces the # cost of their next spell by [-1], to a minimum of [1]. RESTRICTIONS: A character cannot be affected by multiple instances of chorus of harmony from different sources. KEYWORDS: ENHANCE | MAGIC | HARMONY | SIGNATURE"
          },
          {
            "type": "paragraph",
            "text": "BALLAD OF THE COURAGEOUS"
          },
          {
            "type": "paragraph",
            "text": "A brave melody lifts hearts beyond fear and doubt."
          },
          {
            "type": "paragraph",
            "text": "COST: [3] mana DECLARE: Target all ally characters within orb[6] of the caster. EFFECT: Each affected ally gains [+1] to all attribute saves until the end of the next round. KEYWORDS: ENHANCE | MAGIC | HARMONY | ORB"
          },
          {
            "type": "paragraph",
            "text": "NOTE OF FORCE"
          },
          {
            "type": "paragraph",
            "text": "A resonant tone ripples through the air, cracking armor and composure alike."
          },
          {
            "type": "paragraph",
            "text": "COST: [5] mana DECLARE: Target [1] enemy character within [6] squares. EFFECT: Deal [7] direct arcane damage. The target is compelled[medium] to use the renew the heart ability. On failure, they gain [-2] to strike rolls until the end of their next turn. EMPOWER: Spend [+3] additional mana. If you do, increase range by [+2] squares and damage by [+2]. KEYWORDS: COMBAT | MAGIC | HARMONY"
          },
          {
            "type": "paragraph",
            "text": "HYMN OF SCORN"
          },
          {
            "type": "paragraph",
            "text": "Dissonance twists the heart, turning conviction to despair."
          },
          {
            "type": "paragraph",
            "text": "COST: [5] mana DECLARE: Target [1] enemy character within [6] squares. EFFECT: Deal [5] direct arcane damage. The target is compelled[medium] to use the renew the heart ability. On failure, they gain [-2] to ward until the end of the next round. KEYWORDS: HEX | MAGIC | HARMONY"
          },
          {
            "type": "paragraph",
            "text": "MELODY OF SUPERIORITY"
          },
          {
            "type": "paragraph",
            "text": "A song of triumph that sharpens the mind and steadies the hand."
          },
          {
            "type": "paragraph",
            "text": "COST: [7] mana DECLARE: Target all ally characters within ORB[5] of the caster. EFFECT: Each affected ally selects one of the following effects until the end of the next round:"
          },
          {
            "type": "paragraph",
            "text": "Agility: [+1] to prowess rolls."
          },
          {
            "type": "paragraph",
            "text": "Strength: [+1] to might rolls."
          },
          {
            "type": "paragraph",
            "text": "Endurance: [+1] to guts."
          },
          {
            "type": "paragraph",
            "text": "Wisdom: [+1] to lore rolls."
          },
          {
            "type": "paragraph",
            "text": "Heroism: [+1] to bravery rolls."
          },
          {
            "type": "paragraph",
            "text": "Splendor: [+1] to all attribute saves."
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
            "text": "DRUMS OF WAR"
          },
          {
            "type": "paragraph",
            "text": "A thunderous rhythm drives the body to move before thought can follow."
          },
          {
            "type": "paragraph",
            "text": "COST: [5] mana DECLARE: Target [1] friendly character within [6] squares. EFFECT: The target may, immediately, use the hero’s charge core ability with no mana cost. RESTRICTIONS: A character cannot be affected by multiple instances of war drums more than once per round."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: ENHANCE | MAGIC | HARMONY"
          },
          {
            "type": "paragraph",
            "text": "ODE TO THE LORES"
          },
          {
            "type": "paragraph",
            "text": "A song that aligns every spell’s rhythm into one grand refrain."
          },
          {
            "type": "paragraph",
            "text": "COST: [7] MANA DECLARE: Target [1] friendly character within [6] squares. EFFECT: The chosen character reduces the MANA cost of their next spell by [-2], to a minimum of [1]. RESTRICTIONS: A character cannot be affected by multiple instances of ode to the lores from different sources."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: ENHANCE | MAGIC | HARMONY | ANCHOR"
          },
          {
            "type": "paragraph",
            "text": "CHANT OF RESILIENCE"
          },
          {
            "type": "paragraph",
            "text": "Steady rhythm becomes a wall no blade can breach."
          },
          {
            "type": "paragraph",
            "text": "COST: [9] mana DECLARE: Target all ally characters within ORB[6] of the caster. EFFECT: Each affected character gains [+2] to ward until the end of the round. RESTRICTIONS: A character cannot be affected by multiple instances of chant of resilience from different sources."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: ENHANCE | MAGIC | HARMONY | ORB"
          },
          {
            "type": "paragraph",
            "text": "SONG OF STORMS"
          },
          {
            "type": "paragraph",
            "text": "A tempest answers the crescendo of your voice."
          },
          {
            "type": "paragraph",
            "text": "COST: [10] mana DECLARE: Target all enemy characters within ORB[5] centered on a point of origin within [5] squares. EFFECT: Each target is compelled[difficult] to use the renew the heart ability. On failure, deal [7] direct lightning damage and apply [-2] to speed until the end of the turn."
          },
          {
            "type": "paragraph",
            "text": "ROLLING STORM: Characters still within the orb at the start of the round suffer the effects again. Reduce the compelled target difficulty by [1] each time a character is required to take it, minimum compelled[EASY]."
          },
          {
            "type": "paragraph",
            "text": "DURATION: This effect lasts [1d10/2] rounds, effects end at the start of the round. KEYWORDS: COMBAT | MAGIC | HARMONY | ORB | ANCHOR"
          },
          {
            "type": "paragraph",
            "text": "SYMPHONY OF VALOR"
          },
          {
            "type": "paragraph",
            "text": "Every heartbeat and breath joins in one chorus of courage."
          },
          {
            "type": "paragraph",
            "text": "COST: [12] mana DECLARE: Target all ally characters within ORB[6] of the caster. EFFECT: Each affected ally restores HEALTH[+3] and gains [+2] to strike rolls until the end of their next turn. RESTRICTIONS: A character cannot be affected by multiple instances symphony of valor from different sources. KEYWORDS: ENHANCE | MAGIC | HARMONY | ORB"
          }
        ]
      }
    ]
  },
  "lore-life": {
    "sourceFile": "039_BH_LORE OF LIFE.docx",
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
            "text": "REGROWTH"
          },
          {
            "type": "paragraph",
            "text": "The pulse of creation answers your call."
          },
          {
            "type": "paragraph",
            "text": "COST: [0] mana TRIGGER: When you successfully cast any lore of life spell. DECLARE: Choose [1] ally character within [6] squares. EFFECT: The chosen character restores [+1] health. KEYWORDS: ENHANCE | MAGIC | LIFE | SIGNATURE"
          },
          {
            "type": "paragraph",
            "text": "LIGHT SPEAR"
          },
          {
            "type": "paragraph",
            "text": "A radiant lance pierces shadow and mends the worthy."
          },
          {
            "type": "paragraph",
            "text": "COST: [4] mana DECLARE: Target all characters within a LINE[5]. EFFECT: Enemy target(s) suffer [6] direct light damage. Ally characters restore [+2] health. KEYWORDS: COMBAT | MAGIC | LIFE | LINE"
          },
          {
            "type": "paragraph",
            "text": "DIVINE GRASP"
          },
          {
            "type": "paragraph",
            "text": "The living world obeys your will to save—or to punish."
          },
          {
            "type": "paragraph",
            "text": "COST: [6] mana DECLARE: Target [1] character within [6] squares. EFFECT: If the target is an enemy character, they are compelled[easy] to use the renew the heart ability. On failure, move the target up to [5] squares to an empty space of your choice, or on success [1] square. If the target is an ally, they may immediately use the stride core ability. KEYWORDS: MAGIC | LIFE | CONTROL"
          },
          {
            "type": "paragraph",
            "text": "RADIANT BREATH"
          },
          {
            "type": "paragraph",
            "text": "A wave of warmth restores the faithful and humbles the corrupt."
          },
          {
            "type": "paragraph",
            "text": "COST: [6] mana DECLARE: Target all characters within a CONE[5]. EFFECT: If the target is an enemy character, they are compelled[easy] to use the renew the heart ability. On failure, enemy targets gain [-1] to strike. If the target is an ally, they gain [+1] to strike."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: ENHANCE | MAGIC | LIFE | CONE"
          },
          {
            "type": "paragraph",
            "text": "TOUCH OF LIFE"
          },
          {
            "type": "paragraph",
            "text": "Your hand carries the warmth of renewal to those fading from the world."
          },
          {
            "type": "paragraph",
            "text": "COST: [9] mana DECLARE: Target [1] ally character within [6] squares who has [5] or less health EFFECT: The target immediately restores health[10]. RESTRICTIONS: A character cannot be affected by touch of life more than once per encounter. KEYWORDS: ENHANCE | MAGIC | LIFE | ANCHOR"
          },
          {
            "type": "paragraph",
            "text": "SHIELD OF PROTECTION"
          },
          {
            "type": "paragraph",
            "text": "A luminous barrier rises between your ally and annihilation."
          },
          {
            "type": "paragraph",
            "text": "COST: [8] mana DECLARE: Choose [1] ally character within [6] squares. EFFECT: The target gains [10] to guts until the end of the round. RESTRICTIONS: A character cannot be affected by multiple instances of shield of protection from different sources. KEYWORDS: ENHANCE | MAGIC | LIFE | ANCHOR"
          },
          {
            "type": "paragraph",
            "text": "MASS RESTORATION"
          },
          {
            "type": "paragraph",
            "text": "Your voice becomes the heartbeat of the world, restoring all who hear it."
          },
          {
            "type": "paragraph",
            "text": "COST: [9] mana DECLARE: Target all ally characters within orb[6]. EFFECT: Each target restores [+3] health. EMPOWER: Spend [+2] additional mana. If you do, increase restored health by [+2]. KEYWORDS: ENHANCE | MAGIC | LIFE | ORB"
          },
          {
            "type": "paragraph",
            "text": "CHANT OF SANCTUARY"
          },
          {
            "type": "paragraph",
            "text": "Your will becomes a ward that rejects harm and impurity."
          },
          {
            "type": "paragraph",
            "text": "COST: [8] mana DECLARE: Target all ally characters within orb[6]. EFFECT: Targe(s) gain [+2] to ward and reduce all other negative conditions by [-1] until the end of the next round."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: ENHANCE | MAGIC | LIFE | ORB | ANCHOR"
          },
          {
            "type": "paragraph",
            "text": "SPARE THE PERISHING"
          },
          {
            "type": "paragraph",
            "text": "You reach across the threshold and pull a soul back from the brink."
          },
          {
            "type": "paragraph",
            "text": "COST: [12] mana DECLARE: Target [1] ally character within [6] squares who has [5] or less health. EFFECT: The target completely restores their health to full value. RESTRICTIONS: A character cannot be affected by spare the perishing"
          },
          {
            "type": "paragraph",
            "text": "more than once per encounter."
          },
          {
            "type": "paragraph",
            "text": "KEYWORDS: ENHANCE | MAGIC | LIFE | ANCHOR"
          },
          {
            "type": "paragraph",
            "text": "SANCTUARY"
          },
          {
            "type": "paragraph",
            "text": "A radiant sphere envelops all within, sealing the wounded in peace."
          },
          {
            "type": "paragraph",
            "text": "COST: [10] mana DECLARE: Create an orb[4] centered on the caster. EFFECT: Target(s) restore health[+2], gain [+2] to ward, and reduce all negative conditions to [0] for the duration. DURATION: This effect lasts [1d10/2] rounds, effects end at the start of the round. KEYWORDS: ENHANCE | MAGIC | LIFE | ORB | ANCHOR"
          }
        ]
      }
    ]
  },
  "lore-anthro-mundas": {
    "sourceFile": "03_BH_LORE.docx",
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
} as const
