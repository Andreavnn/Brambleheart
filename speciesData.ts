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
        "text": "When the pack is threatened, you move without thought — drawn by the pull of instinct and oath. COST: [1] mana TRIGGER: After any enemy character resolves a charge ability against an ally within [3] squares. DECLEAR: Select the enemy character who performed the charge. EFFECT: Move your character up to [2] squares toward target. If your character ends this movement within [1] square of the charging enemy, gain [+1] to your next strike roll against that target. RESTRICTIONS: This movement must end closer to the charging enemy than where it began and cannot pass through impassable terrain.",
        "keywords": [
          "Reaction",
          "Move",
          "Ardenn",
          "Trait"
        ]
      },
      {
        "name": "Loyalty’s Will",
        "text": "Your loyalty runs deeper than fear or pain — when others bleed, your heart answers first. TRIGGER: This ability can be used when an ally within [3] squares suffers damage. EFFECT: You may suffer up to [3] health to reduce that damage by up to [-3]. Reduce the damage by [1] for each point of health you chose to suffer.",
        "keywords": [
          "Reaction",
          "Ardenn",
          "Trait"
        ]
      },
      {
        "name": "Feral Resolve",
        "text": "Even at the edge of exhaustion, your heart burns steady beneath the frost. TRIGGER: This ability can be used when your character is reduced to [8] health or less. EFFECT: Gain [+3] to strike, ward, guts, and damage until the end of the next round. COOLDOWN: This ability cannot be used again for [1d10/2+1] rounds after it is activated.",
        "keywords": [
          "Root",
          "Reaction",
          "Urnath",
          "Trait"
        ]
      }
    ],
    "cultureTraits": [
      {
        "name": "Hunters Intuition",
        "text": "From youth, every Ardenn learns to track the world by scent, silence, and shared rhythm. EFFECT: Gain rank [+1] in the wayfinding skill and either the awareness or presence skill.",
        "keywords": [
          "Passive",
          "Culture"
        ]
      },
      {
        "name": "Pack Fighting",
        "text": "Ardenn warriors fight as one — each motion answered by another, every strike a shared instinct. EFFECT: If there are [1] or more ally characters within [3] squares of you, gain [+1] to strike. If there are [2] or more all characters within [ 3] squares of you also gain [+1] to damage with all physical and shoot combat abilities.",
        "keywords": [
          "Passive",
          "Culture"
        ]
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
        "name": "Wild Stride",
        "text": "Your steps echo the pulse of the forest; where you walk, the wild flows with you. TRIGGER: This ability can be used at the start of the round. EFFECT: Your character may move up to double their speed. If your character passes within [1] square of an ally during this movement, that ally gains [+1] to their next roll this round. RESTRICTIONS: This ability cannot be used if your character is within [+2] squares of an enemy and cannot end within [+2] squares of an enemy.",
        "keywords": [
          "Root",
          "Move",
          "Auravex",
          "Trait"
        ]
      },
      {
        "name": "Voice Of The Herd",
        "text": "You move in chorus with the world around you; the wild whispers its warnings through others. TRIGGER: When an ally within [3] squares is the target of a magical ability DECLARE: Select the targeted ally. EFFECT: The target character gains resistance[+1] against the damage type of the magical ability. If the ability cannot deal damage, the character gains [+1] to the attribute save against the spell.",
        "keywords": [
          "Reactive",
          "Auravex",
          "Trait"
        ]
      },
      {
        "name": "Cycle Of The Beast",
        "text": "As motion stirs life in all things, the beast’s rhythm returns to you through those you guide. TRIGGER: This ability can be used at the end of the round. EFFECT: Count the total number of condition bonuses your character granted to ally characters this round. For every [2] instances of condition granted, restore either health [+1] or mana [+1] in any combination.",
        "keywords": [
          "Root",
          "Instinct",
          "Auravex",
          "Trait"
        ]
      }
    ],
    "cultureTraits": [
      {
        "name": "Pathfinder’s Call",
        "text": "Your people have walked every road beneath the sky, guided by intuition and song. EFFECT: Gain rank [+1] in the wayfinding skill and either the awareness or herbalry skill.",
        "keywords": [
          "Passive",
          "Culture"
        ]
      },
      {
        "name": "Leaf In The Wind",
        "text": "Your voice carries a whisper among leaves, steadying a heartbeat not yet gone. COST: [1] mana TRIGGER: This ability can be used when an ally within [3] squares is compelled to use the renew the heart ability. EFFECT: The target ally’s attribute save roll for renew the heart is considered edged.",
        "keywords": [
          "Root",
          "Reaction",
          "Culture"
        ]
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
        "name": "Stillwater Renewal",
        "text": "Your stillness mirrors the calm depths—where even silence heals. TRIGGER: This ability can be used at the end of the round. EFFECT: If your character did not move during the round, restore health [2] and mana [1].",
        "keywords": [
          "Root",
          "Instinct",
          "Axalori",
          "Trait"
        ]
      },
      {
        "name": "Heartcurrent",
        "text": "Your heart flows in rhythm with the world’s pulse—what is spent in one form returns in another. TRIGGER: This ability can be used at the start of the round. EFFECT: Your character may spend [-2] health to restore [1] mana or spend [-1] mana to restore health [2].",
        "keywords": [
          "Root",
          "Instinct",
          "Axalori",
          "Trait"
        ]
      },
      {
        "name": "Harmonic Field",
        "text": "Healing flows outward, rippling through the bonds that connect all life. TRIGGER: This ability activates when your character restores health to themselves or a target. EFFECT: One ally characters within [3] squares, may choose one of the following effects. Restore health [1], mana [1], or gain [+2] to attribute saves until the end of the next round. RESTRICTIONS: A character cannot be affected by multiple instances of soul current from different sources.",
        "keywords": [
          "Reaction",
          "Enhance",
          "Axalori",
          "Trait"
        ]
      }
    ],
    "cultureTraits": [
      {
        "name": "Tranquil Discipline",
        "text": "You were raised in the still halls of reflection, where patience and observation guide the mind as much as the hand. EFFECT: Gain rank [+1] in the lorekeeping skill and the herbalry skill.",
        "keywords": [
          "Passive",
          "Culture"
        ]
      },
      {
        "name": "Resonant Pulse",
        "text": "To the Axalori, empathy is a current that binds all living things. When one heart trembles, another steadies it. COST: [2] mana TRIGGER: This ability can be used at the start of the round. DECLARE: Choose [1] ally to bond. EFFECT: If the bonded ally is within [3] squares and suffers three or more damage reduce that damage by [-1] + Heart).",
        "keywords": [
          "Instinct",
          "Culture"
        ]
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
        "text": "Braelor hearts beat with stormlight, and the air itself trembles in their wake. COST: [3] mana TRIGGER: This ability can be used during your turn. EFFECT: Your character may move a number of squares equal to their speed plus [+5] toward a visible enemy within line of sight. If your character uses a combat ability against that target and deals damage during the same turn, increase the total damage by [+2]. POWER THROUGH: At the end of your turn, if your character moved the total movement granted by this ability, deal [3] lethal damage to the target of thunderstep. The target is forced back [1] square directly away from you. If the target cannot be moved, they suffer an [2] lethal damage instead. RESTRICTIONS: This movement must end within [1] square of the target and cannot pass through impassable terrain.",
        "keywords": [
          "Root",
          "Move",
          "Braelor",
          "Charge",
          "Trait"
        ]
      },
      {
        "name": "Stoneheart",
        "text": "The Braelor’s will is as steady as forged iron, their bodies and spirits refusing to yield to pain or fear. EFFECT: Gain [+2] to all guts rolls made to resist any non-magical damage. When your character suffers lethal damage, reduce that damage by [-1], to a minimum of [1].",
        "keywords": [
          "Passive",
          "Braelor",
          "Trait"
        ]
      },
      {
        "name": "Covine Heirs",
        "text": "Echoes of the Lich King’s dominion linger in Braelor blood. TRIGGER: This ability can be used at the end of the round. EFFECT: When your character successfully resists a hex or compelled effect, restore health [+1] for each instance of success.",
        "keywords": [
          "Root",
          "Instinct",
          "Braelor",
          "Trait"
        ]
      }
    ],
    "cultureTraits": [
      {
        "name": "Forge-Kin",
        "text": "The twin arts of body and spirit: the strength to shape stone and the presence to command respect. EFFECT: Gain rank[+1] in the stonegrasp and either presence or crafting[blacksmithing] skills.",
        "keywords": [
          "Passive",
          "Culture"
        ]
      },
      {
        "name": "Stillstorm Totem",
        "text": "Braelor shamans bind the echoes of wind and forge into sacred totems humming with stormlight. COST: [2] mana TRIGGER: This ability can be used at the start of the round. DECLARE: Summon a spiritual totem within [2] squares of your character. EFFECT: While the totem is active, your character automatically passes the first compelled effect from a spell each round. ally characters within [3] squares of the totem gain [+1] to attribute saves made when using the renew the heart ability. RESTRICTIONS: A character cannot benefit from multiple stillstorm totem from different sources. DURATION: The totem remains until it until destroyed.",
        "keywords": [
          "Root",
          "Instinct",
          "Enhance",
          "Summon",
          "Culture"
        ]
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
        "text": "You flow around danger like wind through tall grass — untouchable, deliberate, and ever-moving. COST: [1] mana TRIGGER: This ability can be used when your character is targeted by a combat ability that requires a ward roll. EFFECT: After the ability is resolved, you may move your character up to [3] squares in any direction and gain [+2] to ward until the end of the round RESTRICTIONS: This movement cannot end within [2] squares of the attacking enemy.",
        "keywords": [
          "Reaction",
          "Move",
          "Cethra",
          "Trait"
        ]
      },
      {
        "name": "Shadowstep",
        "text": "Your stillness is a weapon; the enemy never sees the motion that ends them. COST: [1] mana TRIGGER: This ability can be used at the end of the round. EFFECT: Select a point of origin within [5] squares and move your character to that point. This movement does not require line of sight and can pass through any terrain type. Afterwards, you may move up to [2] additional squares in any direction. COOLDOWN: This ability cannot be used again for [1d10/2+1] rounds after it is activated. RESTRICTIONS: This movement cannot end within two [2] squares of an enemy.",
        "keywords": [
          "Root",
          "Instinct",
          "Cethra"
        ]
      },
      {
        "name": "Poised Reflex",
        "text": "Even under pressure, your body acts with effortless control — instinct shaped by endless discipline. TRIGGER: This ability can be used when your character fails an attribute save. EFFECT: You may reroll the failed attribute save with [+1].",
        "keywords": [
          "Root",
          "Instinct",
          "Cethra",
          "Trait"
        ]
      }
    ],
    "cultureTraits": [
      {
        "name": "Artisan’s Focus",
        "text": "The Cethra find balance in creation — their art a mirror of patience and will. EFFECT: Gain rank [+1] in the Tumblecraft and either the Shadehand or Whisperster skill.",
        "keywords": [
          "Passive",
          "Culture",
          "Cethra"
        ]
      },
      {
        "name": "Viled Paw",
        "text": "A flash of motion — graceful, inevitable, and unseen until it’s too late. COST: [1] mana TRIGGER: When you make a successful strike roll against an enemy character that has not yet taken their turn this round. EFFECT: Increase the total damage dealt by the strike roll by [+2]. COOLDOWN: This ability cannot be used again for [1d10/2+1] rounds after it is activated. RESTRICTIONS: This ability cannot be used with a magical or ranged ability.",
        "keywords": [
          "Root",
          "Reactive",
          "Culture"
        ]
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
        "text": "The Hedgkin’s bravery burns slow but never fades — a quiet ember against fear. TRIGGER: This ability can be used when an ally within [3] squares is compelled. EFFECT: The affected ally gains [+2] to the roll made to resist the effect. If that roll succeeds, the ally gains [+1] to strike or ward until the end of their next turn. RESTRICTIONS: A character cannot be affected by multiple instances of hearthborn courage from different sources.",
        "keywords": [
          "Root",
          "Reaction",
          "Enhance",
          "Hedgkin",
          "Trait"
        ]
      },
      {
        "name": "Burrowstep",
        "text": "The Hedgkin move where others cannot — under roots, through brush, and between the cracks of battle. TRIGGER: This ability can be used when an enemy character moves during an ally’s turn. DECLARE: Choose [1] ally within [3] squares of the moving character. EFFECT: The chosen ally may move [1] square at the end of the current turn.",
        "keywords": [
          "Reactive",
          "Hedgkin",
          "Trait"
        ]
      },
      {
        "name": "Spine Guard",
        "text": "The Hedgkin’s quills bristle at danger, turning defense into quiet retribution. COST: [1] mana TRIGGER: This ability can be used when your character is the target of a combat ability, and the attacker is within [3] squares. DECLARE: Target the character using the combat ability. EFFECT: The targeted character suffers [1] lethal damage. If the triggering combat ability successfully deals damage or applies an effect, the attacker suffers an additional [1] lethal damage.",
        "keywords": [
          "Reactive",
          "Hedgkin",
          "Trait"
        ]
      }
    ],
    "cultureTraits": [
      {
        "name": "Thicket Craft",
        "text": "The Hedgkin’s hands are always busy — mending, stirring, or mixing some small miracle. EFFECT: Gain rank [+1] in the Seeking and Herbalry skill. Additionally, gain rank [+1] in one of the following skills: Lorekeeping, Wayfinding, or Tradecraft skill.",
        "keywords": [
          "Passive",
          "Culture"
        ]
      },
      {
        "name": "Thriving Harmony",
        "text": "A warm word, a full belly, a safe fire — such things keep the darkness away. COST: [2] mana TRIGGER: This ability can be used at the end of the round. DECLARE: Choose [1] ally within [3] squares. EFFECT: Target ally restores health [+2] and gains [+1] to their next attribute save, until the end of the next round. If your character is within [1] square of another ally when targeted by this ability, you also restore health [+1].",
        "keywords": [
          "Root",
          "Instinct",
          "Enhance",
          "Culture"
        ]
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
        "text": "The Ravari were born for the high places, where every fall teaches a better landing. EFFECT: When your character moves, they may ignore height penalties and difficult terrain caused by natural obstacles such as vines, roots, or elevation. If your character falls or is pushed from a height of [5] squares or less, they take no damage and may move [1] square in any direction upon landing.",
        "keywords": [
          "Passive",
          "Move",
          "Ravari",
          "Trait"
        ]
      },
      {
        "name": "Haphazard Genius",
        "text": "You might not know what you’re doing — but somehow, it works. TRIGGER: This ability can be used at the start of the round. DECLEAR: Select [1] enemy character within [3] squares. EFFECT: The targeted character suffers [-1] when making ward rolls against you. Additionally, each time you make a successful strike roll against the target, you may move [1] square. RESTICTION: This ability cannot be used against the same target in back-to-back rounds.",
        "keywords": [
          "Root",
          "Instinct",
          "Ravari",
          "Trait"
        ]
      },
      {
        "name": "Crooktail Bound",
        "text": "When the Ravari work together, they do so by instinct — a flick, a nod, a jump. COST: [1] mana TRIGGER: This ability can be used when an ally within [3] squares performs a move or combat ability. EFFECT: Your character may move [1] square. If the move ends within an adjacent square of a different ally that didn’t trigger this ability, you and that ally gain [+1] to the next roll made this round.",
        "keywords": [
          "Root",
          "Reaction",
          "Ravari"
        ]
      }
    ],
    "cultureTraits": [
      {
        "name": "Jester Of Trade",
        "text": "Ravari crafts are built to the sound of laughter, argument, and rhythm. EFFECT: Gain rank [+1] in the Guile and Tumblecraft skill. Additionally, gain rank [+1] in one of the following skills: Shadehand, Stonegrasp, Whisperster, Seeking, or Wayfinding skill.",
        "keywords": [
          "Passive",
          "Culture"
        ]
      },
      {
        "name": "Dexterous Paws",
        "text": "Ravari hands are quick and clever, made for balance, mischief, and motion. EFFECT: When your character is wielding a weapon in each hand, gain [+1] to strike rolls and damage for physical combat abilities.",
        "keywords": [
          "Passive",
          "Culture"
        ]
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
        "text": "Every Rivkan shares their path with a Jippis — a clever, mimicking creature of water and intuition. EFFECT: Your character gains the critter Jippis as a familiar. The Jippis counts as a summoned character. Follow the normal rules for a summoned familiar. JIPPIS AID: When your character succeeds on a roll compelled attribute save and they control a Jippis familiar, restore mana [+1].",
        "keywords": [
          "Passive",
          "Summon",
          "Rivkan",
          "Trait"
        ]
      },
      {
        "name": "Leapfrog",
        "text": "Bufo’s powerful legs allow them to evade danger and mitigate damage. TRIGGER: When your character is the target of an area of effect spell. COST: [1] mana EFFECT: Reduce the total damage dealt by the spell by half. This effect is applied after all other damage conditions or effects. If the spell compels an attribute save, and your Jippis familiar is summoned, gain [+3] to save against the compelled effect.",
        "keywords": [
          "Reaction",
          "Rivkan",
          "Trait"
        ]
      },
      {
        "name": "Double Lilly",
        "text": "When the first jump fails, the second one lands. TRIGGER: This ability can be used when your character fails a roll. EFFECT: Gain [+2] to your next roll of the same type (combat, spell, or attribute) made within the next round. If that follow-up roll succeeds, restore mana [+2].",
        "keywords": [
          "Root",
          "Reaction",
          "Rivkan",
          "Trait"
        ]
      }
    ],
    "cultureTraits": [
      {
        "name": "Social Savvy",
        "text": "To the Rivkan, words are currency and silence is a debt unpaid. EFFECT: Gain rank [+1] in the Charm and Guile skills. Additionally, gain rank [+1] in one of the following skills: Expression, Tradeskill, Seeking or Shadehand skill.",
        "keywords": [
          "Passive",
          "Culture"
        ]
      },
      {
        "name": "River’s Favor",
        "text": "The Rivkan believe the river grants small mercies to those who travel with good timing. TRIGGER: This ability can be used when an ally within [3] squares rolls a natural [1] or [10]. EFFECT: On a natural [1], the affected ally gains [+1] to the roll that triggered this ability. On a natural [10], the affected ally restores mana [+1].",
        "keywords": [
          "Reaction",
          "Culture",
          "Rivkan"
        ]
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
        "text": "From birth, every Sauren shares their path with a bonded Vurox. EFFECT: Your character has a bonded Vurox companion. The Vurox acts as a summoned critter and during combat encounters takes a turn immediately after your character regardless of initiative order. BONDED PAIR: When your character’s Vurox is within [3] squares and your character restores health, the Vurox restores [1] health.",
        "keywords": [
          "Passive",
          "Summon",
          "Sauren",
          "Trait"
        ]
      },
      {
        "name": "Heatbloom",
        "text": "Slow, heat-fueled reptilian healing that rewards good positioning and the desert identity. TRIGGER: This ability can be used at the end of the round, if your character suffer [5] or more damage during the round. EFFECT: Immediately restore health [+2] and mana [+1]. If you are within [3] or at least two or more allies increase the health you restore by [+1]. If your Vurox is within [3] increase the mana you restore by [+1]. COOLDOWN: This ability cannot be used again for [1d10/2+1] rounds after it is activated.",
        "keywords": [
          "Root",
          "Instinct",
          "Sauren",
          "Trait"
        ]
      },
      {
        "name": "Furnacehide",
        "text": "The desert hardens both skin and spirit. EFFECT: Reduce all incoming direct or standard damage by [-1]. Additionally, gain resistance [2] against fire and poison damage types.",
        "keywords": [
          "Passive",
          "Sauren",
          "Trait"
        ]
      }
    ],
    "cultureTraits": [
      {
        "name": "Nomad’s Profession",
        "text": "Sauren travel light and remember much. EFFECT: Gain rank [+1] in the Wayfinding and Beastcraft skills.",
        "keywords": [
          "Passive",
          "Culture"
        ]
      },
      {
        "name": "Scent Of Blood",
        "text": "Even the faintest scent of weakness stirs the Sauren’s instinct — a silent, inevitable pressure that crushes resolve. COST: [1] mana TRIGGER: This ability can be used when an enemy character within [3] squares is compelled to make an attribute save. EFFECT: The target character suffers [-1] to the attribute save roll. If the save fails, the target also gains [-1] to ward until the end of their next turn.",
        "keywords": [
          "Reaction",
          "Hex",
          "Culture"
        ]
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
        "text": "You stride through the cold as if it were air, your blood singing with winter’s stillness. EFFECT: Your character gains resistance [+3] against cold damage and ignores movement penalties from icy or difficult terrain caused by weather or environment. NATURAL TERRAIN: If your character begins the round on icy terrain, they gain condition [+3] to ward until the end of their next turn.",
        "keywords": [
          "Passive",
          "Urnath",
          "Trait"
        ]
      },
      {
        "name": "Blood Of The North",
        "text": "Even at the edge of exhaustion, your heart burns steady beneath the frost. TRIGGER: This ability can be used when your character is reduced to [8] health or less. EFFECT: Immediately restore health [+3] and gain [+2] to guts until the end of your next turn. COOLDOWN: This ability cannot be used again for [1d10/2+1] rounds after it is activated.",
        "keywords": [
          "Root",
          "Reaction",
          "Urnath",
          "Trait"
        ]
      },
      {
        "name": "Keeper’s Roar",
        "text": "Your bellow carries the weight of ancestral duty, shaking both fear and frost from the hearts of your allies. COST: [2] mana TRIGGER: This ability can be used during your turn. DECLARE: Target all ally characters within orb [4]. EFFECT: Each target gains [+1] to ward and attribute saves until the end of the next round. RESTRICTIONS: A character cannot be affected by multiple instances of keeper’s roar from different sources.",
        "keywords": [
          "Root",
          "Instinct",
          "Enhance",
          "Urnath",
          "Trait"
        ]
      }
    ],
    "cultureTraits": [
      {
        "name": "Hearthward Oath",
        "text": "To the Urnath, protection is sacred—every home, every life a flame worth defending. EFFECT: When an ally within [3] squares suffers damage that would reduce their health below [5], your character may redirect that damage to themselves. After resolving the damage, gain [+1] to guts until the end of the next round.",
        "keywords": [
          "Reaction",
          "Enhance",
          "Culture"
        ]
      },
      {
        "name": "Rites Of The Deep Winter",
        "text": "You have learned to honor the cold—in silence, stillness, and endurance. EFFECT: Gain rank [+1] in the wayfinding skill and either lorekeeping or presence skill.",
        "keywords": [
          "Passive",
          "Culture"
        ]
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
        "text": "When the world strikes, the Tordan retreat inward — wrapped in the calm of their second sight. COST: [1] mana TRIGGER: This ability can be used when your character suffers direct or standard damage. EFFECT: Reduce the total damage dealt by [-2]. Additionally, after that ability is resolved, you can select one damage type and gain resistance [1] against the selected type until the end of the round. COOLDOWN: This ability cannot be used again for [1d10/2] rounds after it is activated.",
        "keywords": [
          "Root",
          "Reaction",
          "Enhance",
          "Tordan",
          "Trait"
        ]
      },
      {
        "name": "Steady Pace",
        "text": "The Tordan move with deliberate patience, unhurried and unshaken by the world’s rush. EFFECT: Whenever your character uses a move ability reduce the total number of squares they are allowed to move by [-1]. Moreover, reduce the affects of all conditions, abilities, or effects that target your character and reduce their speed by [2].",
        "keywords": [
          "Passive",
          "Tordan",
          "Trait"
        ]
      },
      {
        "name": "Echo Of Tomorrow",
        "text": "You act on echoes of what has not yet come — shaping the next moment before it arrives. TRIGGER: This ability can be used at the start of the round. DECLARE: Choose [1] ally within [3] squares. EFFECT: The target ally gains [+1] to the strike roll for the next magical ability they use this round. If ability is successful, restore mana [+1] to your character. If ability fails, the target ally restores [1] mana. COOLDOWN: This ability cannot be used again for [1d10/2] rounds after it is activated.",
        "keywords": [
          "Instinct",
          "Tordan",
          "Trait"
        ]
      }
    ],
    "cultureTraits": [
      {
        "name": "Memorybrew",
        "text": "The Tordan distill memory itself into tincture and tea — wisdom steeped in patience. EFFECT: Gain rank [+1] in the herbalry skill and either the lorekeeping or runecraft skill.",
        "keywords": [
          "Passive",
          "Culture",
          "Tordan"
        ]
      },
      {
        "name": "Deep Trance",
        "text": "The Tordan’s meditation bridges the seen and unseen, mending more than flesh. TRIGGER: This ability can be used at the end of the round. EFFECT: Reduce your characters speed by [-1] until the end of the next round and increase the amount of mana they generate at the start of the next round by [+2]",
        "keywords": [
          "Root",
          "Instinct",
          "Culture"
        ]
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
        "text": "Every motion is an act of design; even a strike is a form of art. COST: [1] mana TRIGGER: When you use any move ability. EFFECT: When your character moves, they do not count has having passed through squares along their path and are unaffected by terrain, obstacles, or effects that trigger from moving through the squares.",
        "keywords": [
          "Reactive",
          "Virelan",
          "Trait"
        ]
      },
      {
        "name": "Skyborn Reflexes",
        "text": "The Virelan react with a dancer’s poise — their movements guided by air and instinct alike. EFFECT: When your character is required to make an attribute save with a target of easy or medium, your dice roll for that save is considered edged.",
        "keywords": [
          "Root",
          "Instinct",
          "Virelan",
          "Trait"
        ]
      },
      {
        "name": "Composed Mind",
        "text": "When the moment falters, you breathe, adjust, and let the flow return. trigger: This ability can be used when your character casts a spell or uses a magical ability that requires mana as a cost. EFFECT: If the spell or ability fails to strike or affect its target(s), restore half of the, actually, mana cost of the ability. COOLDOWN: This ability cannot be used again for [1d10/2+1] rounds after it is activated. RESTRICTIONS: If the triggering spell or magical ability can affect more than one target, you must fail all strike rolls or all targets must successfully resist the effect.",
        "keywords": [
          "Root",
          "Reaction",
          "Culture"
        ]
      }
    ],
    "cultureTraits": [
      {
        "name": "Artisan’s Discipline",
        "text": "Every Virelan learns the sacred patience of precision — mastery through repetition, not haste. EFFECT: Gain rank [+1] in the Runecraft and either the Lorekeeping or Charm skill.",
        "keywords": [
          "Passive",
          "Culture"
        ]
      },
      {
        "name": "Arcane Affinity",
        "text": "TRIGGER: This ability can be used at the start of the round. EFFECT: Generate [+1] additional mana. Roll [1d10] on a result of [5] or higher generate another additional [2] mana.",
        "keywords": [
          "Root",
          "Instinct",
          "Virelan",
          "Trait"
        ]
      }
    ]
  }
]

export const speciesByName = Object.fromEntries(speciesData.map(item=>[item.name,item])) as Record<string,SpeciesDefinition>
export const allCultureTraits = speciesData.flatMap(item=>item.cultureTraits.map(trait=>({...trait,species:item.name})))
