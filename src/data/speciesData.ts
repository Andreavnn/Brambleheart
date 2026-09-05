export interface TraitDefinition { name:string; text:string; keywords:string[] }
export interface SpeciesDefinition { name:string; pronunciation:string; quote:string; theme:string; lore:string; language:string; speciesTraits:TraitDefinition[]; cultureTraits:TraitDefinition[] }

export const speciesData: SpeciesDefinition[] = [
  {
    "name": "Ardenn",
    "pronunciation": "AHR-den",
    "quote": "By pact and paw, by moon and stone—we guard the realms until the last howl fades. Our strength is not tooth or blade, but the hearts that answer when we call.",
    "theme": "Loyalty and pack coordination.",
    "lore": "The Ardenn embody loyalty and vigor, their lives shaped by unity, instinct, and the bonds of packhood. Their culture centers on the Moon Pacts, sacred rites said to bind their spirits beneath shifting lunar light. When night falls, Ardenn voices rise in woven chorus—part prayer, part remembrance—to honor kin and the wilds that first shaped them. After the Battle of Dominous, when Blight nearly drowned the world in undeath, the Ardenn answered with purpose. They formed the Moonbound Orders, a vast knightly network sworn to defend all peoples of Anthro Mundas. These orders built roads between realms, patrolled borders, and erected fortresses of stone, crafted with the renowned Ardenn masonry and architecture. Many of the realm’s great strongholds still bear their mark. Leadership among the Ardenn is earned, not inherited. Alpha Knights rise through service and merit, while the High Alpha is chosen for wisdom, restraint, and devotion to the entire network of packs. Though fiercely loyal allies and formidable protectors, the Ardenn remain guided by deep intuition and a steadfast belief: every life is worth guarding, and every pack—however scattered—is family.",
    "language": "Fennic, a blend of growls and tonal cadence. Spoken from the chest.",
    "speciesTraits": [
      {
        "name": "Lunar Pursuit",
        "keywords": [
          "Reaction",
          "Ability",
          "Ardenn",
          "Heritage Trait"
        ],
        "text": "When the pack is threatened, you move without thought — drawn by the pull of instinct and oath. COST: [1] mana TRIGGER: When an enemy character completes a Charge action against an ally within [4] squares. EFFECT: Move your character up to [2] squares toward the charging enemy. If your character ends this movement within [1] square of that enemy, gain [+2] to your next strike roll against that enemy. RESTRICTIONS: Your character must end this movement closer to the charging enemy than where they began and cannot move through impassable terrain."
      },
      {
        "name": "Loyalty’s Will",
        "keywords": [
          "Reaction",
          "Ability",
          "Ardenn",
          "Heritage Trait"
        ],
        "text": "Your loyalty runs deeper than fear or pain — when others bleed, your heart answers first. TRIGGER: Once per round, when an ally within [4] squares suffers [3] or more damage from a single action. EFFECT: You may suffer up to [3] health to reduce the triggering damage by an equal amount, to a maximum of [-3]."
      },
      {
        "name": "Feral Resolve",
        "keywords": [
          "Passive",
          "Ardenn",
          "Heritage Trait"
        ],
        "text": "Even at the edge of exhaustion, your heart burns steady beneath the frost. TRIGGER: When your character is reduced to [7] health or less. EFFECT: Gain [+3] to strike, ward, guts, and damage until the end of your next turn. COOLDOWN: This ability cannot activate again for [1d10/2+1] rounds."
      }
    ],
    "cultureTraits": [
      {
        "name": "Hunters Intuition",
        "keywords": [
          "Skill",
          "Culture Trait"
        ],
        "text": "From youth, every Ardenn learns to track the world by scent, silence, and shared rhythm. EFFECT: Gain rank [+1] in the wayfinding skill and either the awareness or presence skill."
      },
      {
        "name": "Pack Fighting",
        "keywords": [
          "Passive",
          "Culture Trait"
        ],
        "text": "Ardenn warriors fight as one — each motion answered by another, every strike a shared instinct. EFFECT: If there are [2] or more ally characters within [4] squares of your character, gain [+1] to strike. If there are [3] or more ally characters within [4] squares of your character, also gain [+1] to damage with all non-magical combat actions."
      }
    ]
  },
  {
    "name": "Auravex",
    "pronunciation": "OR-uh-vek-s",
    "quote": "The Beast walks before us, and our shadows follow in its stride. All life is one trail; we simply walk its truth.",
    "theme": "Kinship with motion and nature’s rhythm.",
    "lore": "The Auravex are nomadic kin of the wild heart, their lineage echoing the grace of forest ungulates. Guided by their faith, The Way of the Beast, they believe all life flows from a single primal spirit whose rhythm shapes wind, soil, and season. Auravex travel in great herds across plains, forests, and mountain paths, following these rhythms rather than claiming land as their own. Their camps are woven from branch, hide, and song—beautiful, impermanent, and leaving no trace when they depart. Each herd functions as a living circle. Pathfinders read the sky and earth to choose safe routes; Guardians defend the herd and the wild places they pass through; Keepers tend to stories, rituals, and the spiritual flame that binds the Auravex to the Beast’s call. These rites attune them deeply to the world; many can sense weather shifts, wounded land, or places where magic has soured long before others notice. Though gentle and patient in manner, the Auravex are fierce when balance is threatened. Outsiders often view them as wandering mystics or relics of an older age, yet their purpose remains unwavering: to walk the untamed paths, safeguard the pulse of the wild, and ensure that nature’s harmony endures no matter how the world changes around them.",
    "language": "Antheric, a melodic tongue shaped by breath, grunts, movement and hoof.",
    "speciesTraits": [
      {
        "name": "Wildstride",
        "keywords": [
          "Move",
          "Ability",
          "Auravex",
          "Heritage Trait"
        ],
        "text": "Your steps echo the pulse of the forest; where you walk, the wild flows with you. TRIGGER: When your character uses the Swiftstride action. EFFECT: During this movement, each ally your character passes within [1] square of gains [+1] to their next ward roll before the end of the round."
      },
      {
        "name": "Voice Of The Herd",
        "keywords": [
          "Reactive",
          "Ability",
          "Auravex",
          "Heritage Trait"
        ],
        "text": "You move in chorus with the world around you; the wild whispers its warnings through others. TRIGGER: When an ally within [4] squares is the target of a magical spell EFFECT: The targeted ally gains resistance [+1] against the spell’s damage type until the end of the round. If the spell does not deal damage, they instead gain [+1] to Renew the Heart attribute saves until the end of the round."
      },
      {
        "name": "Cycle Of The Beast",
        "keywords": [
          "Core Action",
          "Instinct",
          "Auravex",
          "Heritage Trait"
        ],
        "text": "As motion stirs life in all things, the beast’s rhythm returns to you through those you guide. TRIGGER: At the end of the round. DECLARE: Choose up to [3] ally characters within [4] squares that have received a condition bonus from your character this round. EFFECT: Each chosen ally may restore either health [1] or mana [1]. If [2] or more characters are affected by this action, your character also restores either health [2] or mana [2]."
      }
    ],
    "cultureTraits": [
      {
        "name": "Pathfinder’s Call",
        "keywords": [
          "Skill",
          "Culture Trait"
        ],
        "text": "Your people have walked every road beneath the sky, guided by intuition and song. EFFECT: Gain rank [+1] in the wayfinding skill and either the awareness or herbalry skill."
      },
      {
        "name": "Leaf In The Wind",
        "keywords": [
          "Reaction",
          "Ability",
          "Culture Trait"
        ],
        "text": "Your voice carries a whisper among leaves, steadying a heartbeat not yet gone. COST: [1] mana TRIGGER: When an ally within [4] squares is compelled to use the Renew the Heart action. EFFECT: The target ally’s attribute save for Renew the Heart is considered edged. If the attribute save succeeds, the target may immediately move up to [2] squares and restores mana [1]."
      }
    ]
  },
  {
    "name": "Axalori",
    "pronunciation": "AX-uh-lohr-ee",
    "quote": "We do not lift our hands to harm, but we will not let life be taken. Even the smallest spark of life is worthy of protection.",
    "theme": "Calm renewal and healing resonance.",
    "lore": "The Axalori are gentle, introspective folk whose lives flow with the quiet strength of rivers and rain. Their lineage echoes amphibians of marsh and tide, their movements fluid and their voices soft, shaped by a deep devotion to healing and renewal. Guided by a philosophy known as the Great Renewal, the Axalori believe that all wounds—of body, spirit, or land—can be mended when life is given space to breathe and grow. They are credited as the first to understand the Lore of Life, perceiving the Winds of Magic as pulses of living rhythm rather than forces to be bent or commanded. Their mastery spread far beyond their wetland sanctuaries, forming the foundation of modern restorative magic across Anthro Mundas. Axalori guide travelers and waterways, cultivate medicines, gardens, and practice endurance, meditation, and the discipline of quiet strength. None stand above others—balance is found only when all are in harmony. To many, the Axalori seem serene wanderers, but their purpose is steady and eternal—to nurture what lives, mend what breaks, and keep the world’s heartbeat strong.",
    "language": "Antheric, a melodic tongue shaped by breath, grunts, movement and hoof.",
    "speciesTraits": [
      {
        "name": "Heartcurrent",
        "keywords": [
          "Core Action",
          "Instinct",
          "Axalori",
          "Heritage Trait"
        ],
        "text": "Your heart flows in rhythm with the world’s pulse—what is spent in one form returns in another. TRIGGER: At the start of the round. EFFECT: Your character may spend [-2] health to restore [1] mana or spend [-1] mana to restore health [2]."
      },
      {
        "name": "Stillwater Renewal",
        "keywords": [
          "Core Action",
          "Instinct",
          "Axalori",
          "Heritage Trait"
        ],
        "text": "Your stillness mirrors the calm depths—where even silence heals. TRIGGER: At the end of the round. EFFECT: If your character did not move during the round, restore health [2] and mana [1]."
      },
      {
        "name": "Harmonic Field",
        "keywords": [
          "Reaction",
          "Ability",
          "Axalori",
          "Heritage Trait"
        ],
        "text": "Healing flows outward, rippling through the bonds that connect all life. TRIGGER: When your character restores [3] or more health to themselves or another character. EFFECT: Choose an ally within [4] squares. That ally chooses one of the following effects: restore health [1], restore mana [1], or gain [+2] to the attribute save made for the Renew the Heart action until the end round."
      }
    ],
    "cultureTraits": [
      {
        "name": "Tranquil Discipline",
        "keywords": [
          "Skill",
          "Culture Trait"
        ],
        "text": "You were raised in the still halls of reflection, where patience and observation guide the mind as much as the hand. EFFECT: Gain rank [+1] in the lorekeeping skill and the herbalry skill."
      },
      {
        "name": "Resonant Pulse",
        "keywords": [
          "Reaction",
          "Ability",
          "Culture Trait"
        ],
        "text": "To the Axalori, empathy is a current that binds all living things. When one heart trembles, another steadies it. COST: [1] mana TRIGGER: When a character that your character restored [3] or more health to this round suffers [3] or more damage. EFFECT: After the damage is resolved, that character restores health [1 + Heart]. RESTRICTIONS: This effect cannot restore health to a character that was reduced to [0] health by the triggering damage."
      }
    ]
  },
  {
    "name": "Braelor",
    "pronunciation": "BRAY-lor",
    "quote": "One blade brought shame; ten thousand deeds will restore our name. Patience is our shield; resolve is our spear.",
    "theme": "Storm-forged strength and defiance of corruption.",
    "lore": "The Braelor are steadfast folk shaped by the endurance and honor of great horned beasts. Their homes rise across open plains and high valleys where stone meets sky, surrounded by wind-carved monuments and echoing forges. Strength and craftsmanship define their way of life; every hammer strike is a prayer, every tool a testament to discipline and spirit. To the Braelor, labor is sacred—will made visible, shaping both the world and the self. They are guided by shamans who commune with ancestral echoes carried in dream, thunder, and ringing steel. These spiritual leaders teach that courage must be grounded, loyalty must be chosen, and truth must be spoken even when it scars. Yet the Braelor carry a shadow alongside their virtues. Long ago, one of their own—Covine, the war-sorcerer, unleashed the Blight and became the Lich King, a name carved into history with grief and warning. Though the sin was his alone, the memory weighs heavily on his people. In its wake, the Braelor dedicate themselves to redemption. With great horns, steady gaze, and unmatched endurance, the Braelor stand as symbols of the living earth—unyielding, honest, and unbroken.",
    "language": "Snortish, a guttural, rhythmic speech tied to breath and emotion.",
    "speciesTraits": [
      {
        "name": "Thunderstep",
        "keywords": [
          "Move",
          "Ability",
          "Braelor",
          "Heritage Trait"
        ],
        "text": "Braelor hearts beat with stormlight, and the air itself trembles in their wake. COST: [2] mana TRIGGER: When your character uses the Hero’s Charge action. EFFECT: Increase the maximum movement of Hero’s Charge by [+3] squares. If your character deals damage to the target of Hero’s Charge with a combat action during the same turn, increase that damage by [+2]. POWER THROUGH: If your character moves the maximum number of squares allowed by Hero’s Charge, after the charge is resolved the target suffers [3] lethal damage and is forced back [1] square directly away from your character. If the target cannot be moved, it suffers [1] additional lethal damage instead."
      },
      {
        "name": "Stoneheart",
        "keywords": [
          "Passive",
          "Braelor",
          "Heritage Trait"
        ],
        "text": "The Braelor’s will is as steady as forged iron, their bodies and spirits refusing to yield to pain or fear. EFFECT: Gain [+2] Guts against [7] or more damage from a single source. Additionally, when your character suffers [3] or more lethal damage from a single source, reduce that damage by [1]."
      },
      {
        "name": "Stillstorm Totem",
        "keywords": [
          "Core Action",
          "Instinct",
          "Summon",
          "Braelor",
          "Heritage Trait"
        ],
        "text": "Braelor shamans bind the echoes of wind and forge into sacred totems humming with stormlight. COST: [2] mana TRIGGER: At the start of the round. SUMMON: Summon a Stillstorm Totem in an adjacent square. EFFECT: While the totem is active, your character automatically resists the first Compelled effect caused by a spell each round. Allies within [4] squares of the totem gain [+1] to attribute saves made for the Renew the Heart action. DURATION: The totem remains for [1d10/2+1] rounds or until destroyed."
      }
    ],
    "cultureTraits": [
      {
        "name": "Forge-Kin",
        "keywords": [
          "Skill",
          "Culture Trait"
        ],
        "text": "The twin arts of body and spirit: the strength to shape stone and the presence to command respect. EFFECT: Gain rank[+1] in the stonegrasp and either presence or crafting[blacksmithing] skills."
      },
      {
        "name": "Covine Heirs",
        "keywords": [
          "Core Action",
          "Instinct",
          "Braelor",
          "Culture Trait"
        ],
        "text": "Echoes of the Lich King’s dominion linger in your blood. TRIGGER: At the end of the round. EFFECT: Restore health [1] for each Hex or Compelled effect your character successfully resisted this round."
      }
    ]
  },
  {
    "name": "Cethra",
    "pronunciation": "SETH-rah",
    "quote": "When the Evershade stirs, so too does destiny. What moves in shadow often carries the truest shape of fate.",
    "theme": "Precision, stealth, and poise.",
    "lore": "The Cethra are quiet wanderers shaped by the poise and mystery of the great cats. They dwell in hidden forests, mist-veiled glades, and the crumbling bones of ancient ruins. To the Cethra, stillness is strength—every step intentional. Their presence is subtle yet unmistakable, like moonlight shifting across stone. The Cethra hold a quiet but vital place in the wider world. They are known to appear in troubled regions without explanation. Some say they sense disturbances through the Evershade Tree, drawn to fractures others cannot perceive. They rarely stay long, offering guidance through silence or subtle gesture before slipping back into the wilds. The Evershade Tree is said to be the oldest living thing in the world, a silent echo of Anthro Mundas itself. Its roots are whispered to drink from the realm’s lifeblood, carrying omens through soil and shadow. Only the Cethra stand as its guardians—devoted stewards of fate’s quiet weave, and the only folk who have ever looked upon its hidden boughs. Though outsiders often mistake their calm for aloofness, beneath their serene exterior lies fierce compassion. The Cethra walk where shadow meets song, balancing solitude with deep reverence for the hidden threads that bind the world.",
    "language": "Purrish, a melodic blend of hums, trills, and soft vocal tones.",
    "speciesTraits": [
      {
        "name": "Primal Grace",
        "keywords": [
          "Reaction",
          "Cethra",
          "Heritage Trait"
        ],
        "text": "You flow around danger like wind through tall grass — untouchable, deliberate, and ever-moving. COST: [1] mana TRIGGER: When your character is targeted by a combat ability that requires Ward roll. EFFECT: After the ability is resolved, move your character up to [3] squares in any direction and gain [+1] Ward until the end of the round. RESTRICTIONS: This movement cannot end within [2] squares of an enemy."
      },
      {
        "name": "Shadowstep",
        "keywords": [
          "Core Action",
          "Instinct",
          "Cethra",
          "Heritage Trait"
        ],
        "text": "Your stillness is a weapon; the enemy never sees the motion that ends them. COST: [2] mana TRIGGER: At the end of the round. EFFECT: Choose a point within [5] squares and move your character to that point. This movement requires line of sight and may pass through any terrain. Afterward, your character may move up to [1] additional square in any direction. COOLDOWN: This ability cannot be used again for [1d10/2+1] rounds after activation. RESTRICTIONS: This movement cannot end within [2] squares of an enemy."
      },
      {
        "name": "Poised Reflex",
        "keywords": [
          "Passive",
          "Cethra",
          "Heritage Trait"
        ],
        "text": "Even under pressure, your body acts with effortless control — instinct shaped by endless discipline. TRIGGER: When your character fails the attribute save for the Renew the Heart action. EFFECT: Reroll the failed attribute save with [+1]."
      }
    ],
    "cultureTraits": [
      {
        "name": "Artisan’s Focus",
        "keywords": [
          "Skill",
          "Culture Trait"
        ],
        "text": "The Cethra find balance in creation — their art a mirror of patience and will. EFFECT: Gain rank [+1] in the Tumblecraft and either the Shadehand or Whisperster skill."
      },
      {
        "name": "Viled Paw",
        "keywords": [
          "Reactive",
          "Ability",
          "Culture Trait"
        ],
        "text": "A flash of motion — graceful, inevitable, and unseen until it’s too late. TRIGGER: When your character succeeds on a strike roll with a non-magical combat action against an enemy that has not yet taken its turn this round. EFFECT: Increase the damage dealt by that combat action by [+2]. COOLDOWN: This ability cannot be used again for [1d10/2+1] rounds after activation."
      }
    ]
  },
  {
    "name": "Hedgkin",
    "pronunciation": "HEHJ-kin",
    "quote": "Tend a spark of hope, and you’ll soon have a hearth. For even the darkest soil can bloom again.",
    "theme": "Hearth, protection, and small miracles.",
    "lore": "The Hedgkin embody the warmth of hearth and garden, their lives rooted in gentle earth and peaceful companionship. They dwell in rolling meadows, riverbanks, and burrowed homes lined with moss, lantern glass, and flowering vines. Quiet by nature but rich in spirit, the Hedgkin cultivate gardens said to be touched by the Winds of Magic themselves—places where herbs grow sweeter, fruit ripens brighter, and weary travelers find unexpected rest. Known as keepers of comfort, they maintain vast communal orchards and shared fields, feeding their kin and any wanderer who arrives at their door. Their deep connection to the land has made them beloved across Anthro Mundas, especially in ages when wounds—of war, Blight, or sorrow—cut through the world. In recent generations, Hedgkin growers and herbalists have become skilled at coaxing life back into blight-scarred soil, slowly cleansing corrupted ground through patient tending and ancient botanical rites. Though humble in size, they are remarkably brave when peace is threatened. Hedgkin stand firm not out of fury, but out of love for the life they cultivate. To them, harmony is not a luxury—it is a garden tended daily, a living promise to future generations.",
    "language": "Hedgely, Silken and whisperlike, built from trills, hums, and quiet pauses",
    "speciesTraits": [
      {
        "name": "Hearthborn Courage",
        "keywords": [
          "Reactive",
          "Ability",
          "Hedgkin",
          "Heritage Trait"
        ],
        "text": "The Hedgkin’s bravery burns slow but never fades — a quiet ember against fear. TRIGGER: When an ally within [4] squares is compelled to make an attribute save. EFFECT: The affected ally gains [+2] to that attribute save. If the save succeeds, they gain either [+1] Strike or [+1] Ward until the end of their next turn."
      },
      {
        "name": "Rootway",
        "keywords": [
          "Reactive",
          "Ability",
          "Hedgkin",
          "Heritage Trait"
        ],
        "text": "Hedgkin know the hidden paths through root and stone, and show others where to step. COST: [1] mana TRIGGER: When an enemy character moves. DECLARE: Choose an ally within [3] squares of the moving enemy. EFFECT: After the enemy finishes its movement, the chosen ally may move up to [2] squares in any direction."
      },
      {
        "name": "Spine Guard",
        "keywords": [
          "Reactive",
          "Ability",
          "Hedgkin",
          "Heritage Trait"
        ],
        "text": "The Hedgkin’s quills bristle at danger, turning defense into quiet retribution. COST: [1] mana TRIGGER: When your character is targeted by a combat ability from an enemy within [4] squares. EFFECT: The attacking enemy suffers [1] lethal damage. If the triggering combat action successfully deals damage or applies an effect, the attacking enemy suffers an additional [1] lethal damage."
      }
    ],
    "cultureTraits": [
      {
        "name": "Thicket Craft",
        "keywords": [
          "Skill",
          "Culture Trait"
        ],
        "text": "The Hedgkin’s hands are always busy — mending, stirring, or mixing some small miracle. EFFECT: Gain rank [+1] in the Seeking and Herbalry skill. Additionally, gain rank [+1] in one of the following skills: Lorekeeping, Wayfinding, or Tradecraft skill."
      },
      {
        "name": "Thriving Harmony",
        "keywords": [
          "Core Action",
          "Instinct",
          "Culture Trait"
        ],
        "text": "A warm word, a full belly, a safe fire — such things keep the darkness away. COST: [2] mana TRIGGER: At the end of the round. DECLARE: Choose an ally within [4] squares. EFFECT: The target ally restores health [2] and gains [+1] Magic Regen until the end of the next round. If your character is within [1] square of the target ally when this ability is used, your character restores [1] health."
      }
    ]
  },
  {
    "name": "Ravari",
    "pronunciation": "RIV-kan",
    "quote": "A good story is worth any climb. And if trouble finds you, outwit it. If that fails, outclimb it.",
    "theme": "Acrobatics, trickery, and instinctive teamwork.",
    "lore": "The Ravari are curious, cunning folk shaped by the quick wit and nimble grace of forest scavengers. They thrive in the high canopies of the Veilwood and other dense forests of Anthro Mundas. To the Ravari, every hollow hides a secret and every trail hints at a tale worth chasing. Agile climbers and deft-handed gatherers, they collect stories as eagerly as trinkets, believing that anything—no matter how small—may carry wonder, wisdom, or opportunity. Ravari culture celebrates ingenuity and improvisation, where art, invention, and mischief often mix into creations equal parts brilliant and absurd. Their greatest celebration, Treasure Day, marks the turning of the year: a festival of shared discoveries where baubles, riddles, jokes, and heartfelt gifts light their halls. It is a full day of memory and generosity, reminding every Ravari that joy is a treasure best passed on. Beneath their humor lies a fierce loyalty. A Ravari may tease, trick, and tangle in mischief, but they never abandon a friend or kin in danger. They move lightly through the world, but they leave behind laughter, cleverness, and the quiet certainty that curiosity is its own kind of courage.",
    "language": "Ravariese, a melodic tongue of chitters and lyrical cadence.",
    "speciesTraits": [
      {
        "name": "Treeleaper",
        "keywords": [
          "Passive",
          "Ravari",
          "Heritage Trait"
        ],
        "text": "The Ravari were born for the high places, where every fall teaches a better landing. EFFECT: When your character moves, ignore height penalties and difficult terrain caused by natural obstacles or environmental conditions. If your character falls or is pushed from a height of [7] squares or less, they suffer no damage and may move [1] square in any direction after landing. Additionally, when your character uses a combat action against an enemy at least [3] squares below them, increase the damage dealt by [+2]."
      },
      {
        "name": "Haphazard Genius",
        "keywords": [
          "Core Action",
          "Instinct",
          "Ravari",
          "Heritage Trait"
        ],
        "text": "You might not know what you’re doing — but somehow, it works. TRIGGER: At the start of the round. DECLARE: Choose an enemy within [4] squares. EFFECT: Until the end of the round, the target suffers [-1] Ward against your character, and your character gains [+1] Ward against the target. Each time your character succeeds on a strike roll against the target, your character may move [1] square. RESTRICTIONS: This ability cannot target the same enemy in consecutive rounds."
      },
      {
        "name": "Crooktail Bound",
        "keywords": [
          "Reaction",
          "Ability",
          "Ravari",
          "Heritage Trait"
        ],
        "text": "When the Ravari work together, they do so by instinct — a flick, a nod, a jump. COST: [1] mana TRIGGER: When an ally within [4] squares performs a Move Action. EFFECT: Your character may move up to [3] squares and gains [+1] to their next roll made before the end of the round. If this movement ends adjacent to an ally, your character and that ally instead each gain [+2] to their next roll made before the end of the round."
      }
    ],
    "cultureTraits": [
      {
        "name": "Jester Of Trade",
        "keywords": [
          "Skill",
          "Culture Trait"
        ],
        "text": "Ravari crafts are built to the sound of laughter, argument, and rhythm. EFFECT: Gain rank [+1] in the Guile and Tumblecraft skill. Additionally, gain rank [+1] in one of the following skills: Shadehand, Stonegrasp, Whisperster, Seeking, or Wayfinding skill."
      },
      {
        "name": "Dexterous Paws",
        "keywords": [
          "Passive",
          "Culture Trait"
        ],
        "text": "Ravari hands are quick and clever, made for balance, mischief, and motion. EFFECT: While your character is dual wielding, a weapon in each hand, gain [+1] to Melee Strike and damage with physical combat actions."
      }
    ]
  },
  {
    "name": "Rivkan",
    "pronunciation": "RIV-kan",
    "quote": "Power doesn’t shout. It flows. Control the waters, and the arguments grow quieter.",
    "theme": "Social fluidity and adaptability.",
    "lore": "The Rivkan are a people shaped by wetlands, marshes, and winding deltas—resilient, collaborative, and sharper than they appear. Their communal instinct runs deep; every Rivkan is raised to know that strength flows from the group, not the individual. Many foster bonds with the nimble winged Jippis, companions whose keen senses heighten awareness and intuition. Yet when this ideal expanded beyond their villages and into the wider world, it placed the Rivkan in a uniquely powerful position. Controlling countless waterways, harbors, and river crossings across Anthro Mundas, the Rivkan gradually became the quiet pulse of the continent’s trade. Their greatest stronghold, Vellimar, sits where three great rivers converge into the sea—a sprawling stilt-born metropolis of markets and docks. Barges from every culture crowd its piers, and deals struck there can shift the fortunes of entire regions. Though humble in stature, the Rivkan understand influence better than most. They move goods, news, and people with equal ease, and their say carries weight in any negotiation. While they may seem harmless, those who mistake Rivkan for weak soon learn otherwise.",
    "language": "Corakish, a croaking, percussive tongue that shifts with emotion.",
    "speciesTraits": [
      {
        "name": "Communal Adaptation",
        "keywords": [
          "Passive",
          "Familiar",
          "Rivkan",
          "Heritage Trait"
        ],
        "text": "Every Rivkan shares their path with a Jippis — a clever, mimicking creature of water and intuition. EFFECT: Your character gains a Jippis as a familiar. JIPPIS Familiar: Once per round, when your character is targeted by an attack, gain [+1] Ward against that attack. Additionally, When your character is compelled to use the Renew the Heart action, gain [+1] to the attribute save. If the save succeeds, gain [+1] Magic Regen until the end of the next round."
      },
      {
        "name": "Leapfrog",
        "keywords": [
          "Reaction",
          "Ability",
          "Rivkan",
          "Heritage Trait"
        ],
        "text": "Bufo’s powerful legs allow them to evade danger and mitigate damage. COST: [1] mana TRIGGER: When your character is targeted by an area-of-effect spell. EFFECT: Reduce the damage dealt by the spell by half, after all other damage modifiers are applied. If the spell allows or compels your character to use the Renew the Heart action, increase both the attribute save bonus and Magic Regen granted by Communal Adaptation by [+1]."
      },
      {
        "name": "Double Lilly",
        "keywords": [
          "Reaction",
          "Ability",
          "Rivkan",
          "Heritage Trait"
        ],
        "text": "When the first jump fails, the second one lands. TRIGGER: When your character fails any roll. EFFECT: Gain [+2] to the next roll of the same type - Combat, Spell, Attribute, or otherwise - before the end of the round. If that roll succeeds, restore mana [2]."
      }
    ],
    "cultureTraits": [
      {
        "name": "Social Savvy",
        "keywords": [
          "Skill",
          "Culture Trait"
        ],
        "text": "To the Rivkan, words are currency and silence is a debt unpaid. EFFECT: Gain rank [+1] in the Charm and Guile skills. Additionally, gain rank [+1] in one of the following skills: Expression, Tradeskill, Seeking or Shadehand skill."
      },
      {
        "name": "River’s Favor",
        "keywords": [
          "Reaction",
          "Ability",
          "Culture Trait"
        ],
        "text": "The Rivkan believe the river grants small mercies to those who travel with good timing. TRIGGER: When an ally within [4] squares gains one or more Misfortune or Fortune results in a single dice roll. EFFECT: On Misfortune, the affected ally restores health [1]. On Fortune, the affected ally restores mana [1]."
      }
    ]
  },
  {
    "name": "Sauren",
    "pronunciation": "SORE-en",
    "quote": "Survival is devotion made visible. Every dawn is a promise kept.",
    "theme": "Endurance and desert-born ferocity.",
    "lore": "The Sauren are the resilient children of the sun—scaled wanderers shaped by the endurance of desert reptiles and the vast, wind-scarred plains. Their nomadic tribes follow ancient migration routes alongside the great herds they tend, living by a strict code of reciprocity: take only what the land offers, and repay every gift with stewardship. From birth, each Sauren forms a sacred bond with a Vurox pup, a lupine companion whose spirit is believed to intertwine with theirs across life and death. These pairings are not pets or mounts, but soul-kin—guardians, mirrors, and lifelong partners. Direct, honest, and efficient in both word and deed, the Sauren often seem severe to outsiders. Yet among themselves, every gesture carries layered meaning: a flick of the tail, a brief nod, a shared silence. Respect among Sauren is quiet and constant, woven through small acts of reliability. To the Sauren, survival is not merely instinct—it is devotion. Through fire, wind, and dust, they endure, believing that each day they outlast the world’s hardships is a prayer answered and a promise kept.",
    "language": "Drashti, A breath-heavy, hissing tongue born of the desert winds- sharp, short, and powerful.",
    "speciesTraits": [
      {
        "name": "Bond Of The Vurox",
        "keywords": [
          "Passive",
          "Summon",
          "Sauren",
          "Heritage Trait"
        ],
        "text": "From birth, every Sauren shares their path with a bonded Vurox. EFFECT: Your character gains a bonded Vurox companion. The Vurox acts as a second character and takes its turn immediately after your character during combat encounters, regardless of initiative order. BONDED PAIR: While the Vurox is within [3] squares of your character, whenever your character restores health, the Vurox also restores health [1]."
      },
      {
        "name": "Heatbloom",
        "keywords": [
          "Core Action",
          "Instinct",
          "Sauren",
          "Heritage Trait"
        ],
        "text": "Slow, heat-fueled reptilian healing that rewards good positioning and the desert identity. TRIGGER: At the end of the round, if your character suffered [7] or more damage during that round. EFFECT: Restore health [2] and mana [1]. If your Vurox is within [3] squares, increase both amounts restored by [1]. COOLDOWN: This ability cannot be used again for [1d10/2+1] rounds after activation."
      },
      {
        "name": "Furnacehide",
        "keywords": [
          "Passive",
          "Sauren",
          "Heritage Trait"
        ],
        "text": "The desert hardens both skin and spirit. EFFECT: Reduce all Direct and Lethal damage suffered by [1]. Additionally, gain resistance [2] to Fire and Poison damage."
      }
    ],
    "cultureTraits": [
      {
        "name": "Nomad’s Profession",
        "keywords": [
          "Skill",
          "Culture Trait"
        ],
        "text": "Sauren travel light and remember much. EFFECT: Gain rank [+1] in the Wayfinding and Beastcraft skills."
      },
      {
        "name": "Scent Of Blood",
        "keywords": [
          "Reaction",
          "Ability",
          "Culture Trait"
        ],
        "text": "Even the faintest scent of weakness stirs the Sauren’s instinct — a silent, inevitable pressure that crushes resolve. COST: [1] mana TRIGGER: When an enemy within [4] squares is compelled to use the Renew the Heart action. EFFECT: The target suffers [-1] to the attribute save for Renew the Heart. If the save fails, the target also suffers [-1] Ward against your character until the end of your next turn."
      }
    ]
  },
  {
    "name": "Urnath",
    "pronunciation": "UR-NATH",
    "quote": "In the cold we find our truth—fear shatters, lies freeze, but the heart that stands for others never breaks.",
    "theme": "Winter, endurance and guardianship.",
    "lore": "The Urnath are towering guardians of the north, standing where frost and undeath meet. Clad in thick fur and unyielding resolve, they hold the line against the Blight—the cursed corruption unleashed when Covine the war-sorcerer tore open the veil during the Battle of Dominous. Since that day, the Urnath have watched the frozen horizon, sworn to prevent the undead legions from ever spilling across the world again. Their clans are ruled by strength tempered with wisdom; each king chosen not by bloodline, but by deed. To the Urnath, battle is a sacred duty, never a tool of conquest. Though fearsome in war, their culture is gentle at its core—families are sacred, hospitality is a solemn responsibility, and the eternal hearthfire is revered as a living symbol of hope. The Hearthfire, an immense pyre kept burning since the end of the Battle of Dominous, is housed within the citadel city Dawnmaw. It is said as long as its flames endure, so too shall the Urnath stand unbroken against the Blight. Few Urnath travel beyond their frozen domain, but those who do are renowned as steadfast allies whose loyalty burns brighter than any forge.",
    "language": "Ursidian, a deep, resonant language of growls and harmonic tones",
    "speciesTraits": [
      {
        "name": "Frostwalker",
        "keywords": [
          "Passive",
          "Urnath",
          "Heritage Trait"
        ],
        "text": "You stride through the cold as if it were air, your blood singing with winter’s stillness. EFFECT: Gain resistance [+3] to Cold damage and ignore movement penalties caused by icy terrain or environmental conditions. Additionally, successful Melee Strike and Ranged Strike rolls deal [+1] Frost damage. NATURAL TERRAIN: If your character begins the round on icy terrain, gain [+3] Ward until the end of your next turn."
      },
      {
        "name": "Blood Of The North",
        "keywords": [
          "Reaction",
          "Ability",
          "Urnath",
          "Heritage Trait"
        ],
        "text": "Even at the edge of exhaustion, your heart burns steady beneath the frost. TRIGGER: When your character suffers [7] or more damage from a single source. EFFECT: After the damage is resolved, restore health [2] and mana [1]. Gain [+2] Guts until the end of your next turn. COOLDOWN: This ability cannot be used again for [1d10/2+1] rounds after activation."
      },
      {
        "name": "Keeper’s Roar",
        "keywords": [
          "Core Action",
          "Instinct",
          "Urnath",
          "Heritage Trait"
        ],
        "text": "Your bellow carries the weight of ancestral duty, shaking both fear and frost from the hearts of your allies. COST: [1] mana TRIGGER: At the start of the round. DECLARE: Target all allies within Orb [4]. EFFECT: Each target gains [+1] Ward and [+1] to attribute saves made for the Renew the Heart action until the end of the round."
      }
    ],
    "cultureTraits": [
      {
        "name": "Rites Of The Deep Winter",
        "keywords": [
          "Skill",
          "Culture Trait"
        ],
        "text": "You have learned to honor the cold—in silence, stillness, and endurance. EFFECT: Gain rank [+1] in the wayfinding skill and either lorekeeping or presence skill."
      },
      {
        "name": "Hearthward Oath",
        "keywords": [
          "Reaction",
          "Ability",
          "Culture Trait"
        ],
        "text": "To the Urnath, protection is sacred—every home, every life a flame worth defending. TRIGGER: When an ally within [4] squares suffers damage that would reduce them below [7] health. EFFECT: Your character may suffer that damage instead. After the damage is resolved, gain [+1] Guts until the end of the next round."
      }
    ]
  },
  {
    "name": "Tordan",
    "pronunciation": "TOR-dan",
    "quote": "The world hurries. We do not. As some burdens are chosen. Others simply call your name.",
    "theme": "Patience and foresight.",
    "lore": "The Tordan are wise keepers of the green depths, patient as the earth they cherish. With shells etched in ancient patterns, they carry history upon their backs and peace within their hearts. Practitioners of alchemy, herbalism, and dreamwalking, the Tordan move easily between the seen and unseen. To the Tordan, dreams are not illusions but memories of the world itself—messages carried on currents of thought, echoing from ages long forgotten. At the heart of their culture lies the Dream Pool, a vast whirlpool hidden in a sacred glade. Said to be as old as the first rain, it spirals endlessly downward, glowing with soft, shifting light. Legends claim its depths touch the dreams of all Anthro Mundas, allowing those who enter it to glimpse the fears, hopes, and futures of the world. The Tordan guard it with solemn devotion, for its waters are both a gift and a burden—revealing truths not all are ready to bear. Slow to anger and slower to forget, the Tordan act with deliberate care in all things. Many mistake them for hermits, but those who earn their trust find the most steadfast allies imaginable.",
    "language": "Tordesh, A breath-heavy, hissing tongue born of the desert winds- sharp, short, and powerful.",
    "speciesTraits": [
      {
        "name": "Dreamshell",
        "keywords": [
          "Reaction",
          "Ability",
          "Tordan",
          "Heritage Trait"
        ],
        "text": "When the world strikes, the Tordan retreat inward — wrapped in the calm of their second sight. COST: [1] mana TRIGGER: When your character suffers Direct or Standard damage. EFFECT: Reduce the triggering damage by [2]. After the ability is resolved, choose [1] damage type. Your character gains resistance [1] to that damage type until the end of the round. COOLDOWN: This ability cannot be used again for [1d10/2] rounds after activation."
      },
      {
        "name": "Steady Pace",
        "keywords": [
          "Passive",
          "Tordan",
          "Heritage Trait"
        ],
        "text": "The Tordan move with deliberate patience, unhurried and unshaken by the world’s rush. EFFECT: Whenever your character uses a Move ability, reduce its maximum movement by [1] square. Additionally, reduce all penalties to your character’s Speed by [2]. Your character’s Speed cannot be reduced below [2] by penalties or effects."
      },
      {
        "name": "Echo Of Tomorrow",
        "keywords": [
          "Core Action",
          "Instinct",
          "Tordan",
          "Heritage Trait"
        ],
        "text": "You act on echoes of what has not yet come — shaping the next moment before it arrives. TRIGGER: At the start of the round. DECLARE: Choose an ally within [3] squares. EFFECT: The target ally gains [+1] to the strike roll for the next magical action they use this round. If that action successfully deals damage or applies an effect, your character restores mana [1]. If the action fails, the target ally restores mana [1]. COOLDOWN: This ability cannot be used again for [1d10/2] rounds after activation."
      }
    ],
    "cultureTraits": [
      {
        "name": "Memorybrew",
        "keywords": [
          "Skill",
          "Culture Trait"
        ],
        "text": "The Tordan distill memory itself into tincture and tea — wisdom steeped in patience. EFFECT: Gain rank [+1] in the herbalry skill and either the lorekeeping or runecraft skill."
      },
      {
        "name": "Deep Trance",
        "keywords": [
          "Core Action",
          "Instinct",
          "Culture Trait"
        ],
        "text": "The Tordan’s meditation bridges the seen and unseen, mending more than flesh. TRIGGER: At the start of the round. EFFECT: Reduce your character’s Speed by [1] until the end of the next round. At the start of the next round, your character generates [+2] additional mana."
      }
    ]
  },
  {
    "name": "Virelan",
    "pronunciation": "VEER-eh-lan",
    "quote": "Elegance is a blade. Most simply admire it. To rise to it is beauty. To rise to it with purpose is destiny.",
    "theme": "Airborne mastery and creative composure.",
    "lore": "The Virelan are luminous, expressive folk shaped by the grace and bearing of countless avian lineages. Their cities glimmer with glass, gold, and polished stone, perched upon storm-cut cliffs or soaring spires where the winds sing through crystal arches. Magic itself is both science and scripture to them. In their grand libraries, scholars study the behavior of winds, storms, and arcane currents, seeking patterns in the chaos of the skies. The Virelan also maintain vast collections of arcane relics—shards of fallen aeroliths, stormglass fragments, and whispering charms unearthed from Ancient ruins. Officially, these archives exist for study and preservation. Unofficially, some aeries covet objects best left buried, believing power and truth lie side by side. Among the Virelan, curiosity is a virtue. Yet beneath their elegance and magical prying lies a current of quiet rivalry. Ambition glides on soft feathers, and prestige is often won not through battle, but through brilliance—artistic, magical, or political subterfuge. Proud, the Virelan believe life itself is a performance worth perfecting, each moment an opportunity to rise on unseen winds.",
    "language": "Skylith, A high, crystalline language shaped by clipped syllables and airy resonance,",
    "speciesTraits": [
      {
        "name": "Airstep",
        "keywords": [
          "Move",
          "Ability",
          "Virelan",
          "Heritage Trait"
        ],
        "text": "Every motion is an act of design; even a strike is a form of art. COST: [1] mana TRIGGER: When your character uses a Move Action. EFFECT: During that movement, your character ignores terrain, obstacles, and effects triggered by entering or passing through squares. Your character is not considered to have passed through any squares along the movement path."
      },
      {
        "name": "Skyborn Reflexes",
        "keywords": [
          "Passive",
          "Virelan",
          "Heritage Trait"
        ],
        "text": "The Virelan react with a dancer’s poise — their movements guided by air and instinct alike. EFFECT: When your character makes an easy attribute save made for Renew the Heart, the roll is considered edged. Additionally, once per round when your character succeeds on an attribute save, they may move [1] square."
      },
      {
        "name": "Composed Mind",
        "keywords": [
          "Reaction",
          "Ability",
          "Virelan",
          "Heritage Trait"
        ],
        "text": "When the moment falters, you breathe, adjust, and let the flow return. TRIGGER: When your character uses a magical action that costs mana. EFFECT: If the triggering magic action fails to strike or affect its target, restore half of the paid mana cost. COOLDOWN: This ability cannot be used again for [1d10/2+1] rounds after activation. RESTRICTIONS: If the triggering magic action can affect multiple targets, it must fail against all targets."
      }
    ],
    "cultureTraits": [
      {
        "name": "Artisan’s Discipline",
        "keywords": [
          "Skill",
          "Culture Trait"
        ],
        "text": "Every Virelan learns the sacred patience of precision — mastery through repetition, not haste. EFFECT: Gain rank [+1] in the Runecraft and either the Lorekeeping or Charm skill."
      },
      {
        "name": "Arcane Affinity",
        "keywords": [
          "Instinct",
          "Ability",
          "Culture Trait"
        ],
        "text": "Magic moves easily through you, gathering with each breath like wind beneath a rising wing. TRIGGER: When your character uses the Channel the Winds Core Action. EFFECT: Gain [+1] Magic Regen until the end of the next round. Roll [1d10]. On a result of [7] or higher, generate an additional mana [1]."
      }
    ]
  }
]

export const speciesByName = Object.fromEntries(speciesData.map(item=>[item.name,item])) as Record<string,SpeciesDefinition>
export const allCultureTraits = speciesData.flatMap(item=>item.cultureTraits.map(trait=>({...trait,species:item.name})))
