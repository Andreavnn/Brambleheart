export interface SparkDetail { keywords:string[]; description:string }
export interface HomelandDetail { description:string; skills:string[]; optionalReplacements:string[] }
export interface SkillDefinition { name:string; attribute:string; restricted:boolean; expanded:boolean; description:string; example:string }
export interface GearShopItem { name:string; category:string; costText:string; costSp:number; detail:string }

export const sparkDetails: Record<string,SparkDetail> = {
  "Courageous": {
    "keywords": [
      "Bold",
      "Driven"
    ],
    "description": "Faces danger head-on and acts before doubt can speak."
  },
  "Protector": {
    "keywords": [
      "Compassionate",
      "Steadfast"
    ],
    "description": "Defends others with quiet resolve and heart-bound duty."
  },
  "Wanderer": {
    "keywords": [
      "Adaptable",
      "Curious"
    ],
    "description": "Finds freedom in change and discovery in every step."
  },
  "Scholar": {
    "keywords": [
      "Studious",
      "Reflective"
    ],
    "description": "Seeks truth before judgment, wisdom before victory."
  },
  "Healer": {
    "keywords": [
      "Compassionate",
      "Intuitive"
    ],
    "description": "Listens deeply, mends wounds seen and unseen."
  },
  "Fighter": {
    "keywords": [
      "Bold",
      "Focused"
    ],
    "description": "Cuts through doubt with clarity and decisive strength."
  },
  "Trickster": {
    "keywords": [
      "Playful",
      "Defiant"
    ],
    "description": "Thrives in chaos, using wit and mischief to turn the tide."
  },
  "Tinker": {
    "keywords": [
      "Inventive",
      "Creative"
    ],
    "description": "Solves problems through imagination and hands-on wonder."
  },
  "Idealist": {
    "keywords": [
      "Hopeful",
      "Driven"
    ],
    "description": "Believes in what could be and fights to make it so."
  },
  "Spiritual": {
    "keywords": [
      "Intuitive",
      "Reflective"
    ],
    "description": "Moves in rhythm with unseen truths and quiet signs."
  },
  "Artisan": {
    "keywords": [
      "Creative",
      "Focused"
    ],
    "description": "Finds beauty in precision and meaning in craft."
  },
  "Outsider": {
    "keywords": [
      "Independent",
      "Cautious"
    ],
    "description": "Trusts their own compass and walks paths few will follow."
  },
  "Leader": {
    "keywords": [
      "Charming",
      "Driven"
    ],
    "description": "Inspires others through vision and fearless will."
  },
  "Defiant Heart": {
    "keywords": [
      "Defiant",
      "Steadfast"
    ],
    "description": "Refuses surrender, even when the storm breaks."
  },
  "Dreamer": {
    "keywords": [
      "Hopeful",
      "Creative"
    ],
    "description": "Sees the world not as it is, but as it might become."
  },
  "Seeker": {
    "keywords": [
      "Curious",
      "Studious"
    ],
    "description": "Pursues knowledge through courage, patience, and grace."
  },
  "Mediator": {
    "keywords": [
      "Charming",
      "Compassionate"
    ],
    "description": "Builds peace with words and empathy in equal measure."
  },
  "Pioneer": {
    "keywords": [
      "Adaptable",
      "Bold"
    ],
    "description": "Walks first into the unknown, trusting the rhythm of change."
  }
}

export const homelandDetails: Record<string,HomelandDetail> = {
  "Wandering Road": {
    "description": "Where every mile is a memory and every stranger a story waiting to be told. You were raised in motion — under caravan canvas, between windships and wandering kin. Every mile carried a new story; every campfire flickered with laughter, barter, and ghost-tales of the next crossing. Your home was not a place but a rhythm — the steady creak of wheels, the song of boots in dust, the smell of spice and rain. You learned that belonging is built through trust, not roots, and that a good story can open more doors than a key.",
    "skills": [
      "Guile",
      "Charm"
    ],
    "optionalReplacements": [
      "Wayfinding",
      "Tradeskill"
    ]
  },
  "Tidewake Harbor": {
    "description": "Where tides trade secrets and the gulls forget no name. Salt and song define this restless port, where waves hammer the docks like drums and the gulls never sleep. Every street is a gamble of scents — tar, citrus, rum, and the faint sting of sea iron. Sailors brawl beside merchants quoting poetry and smugglers toast beneath shrines of half-forgotten gods. You learned that fortune favors those who act before the tide turns, and that the sea never gives back what it takes willingly.",
    "skills": [
      "Seeking",
      "Tradeskill"
    ],
    "optionalReplacements": [
      "Lorekeeping (History)",
      "Guile"
    ]
  },
  "Ancient Towers": {
    "description": "Where the past still breathes, and silence hums like power half-remembered. The towers rise like broken bones of a forgotten age — glass veins, forgemetal roots, and hollow halls where wind hums through dead wires. You grew among them, chasing echoes through corridors of light and shadow. Some say the towers dream; others say they remember. You never decided which was worse. You learned patience in their silence and courage in their ghosts, for curiosity is both a gift and a danger when the past still breathes.",
    "skills": [
      "Lorekeeping (Ancients)",
      "Awareness"
    ],
    "optionalReplacements": [
      "Crafting (Repair)",
      "Seeking"
    ]
  },
  "Gloommere": {
    "description": "Where the fog listens closer than the folk who walk it. In Gloommere, morning never truly comes — only paler shades of night. The air hums with unseen life, and the marsh grass sways even when the wind is still. Here, superstition is survival; every traveler carries charms against reflection and silence. You learned to move like a ghost among the reeds, to listen for what others can’t hear, and to never trust still water.",
    "skills": [
      "Whisperster",
      "Herbalry"
    ],
    "optionalReplacements": [
      "Awareness",
      "Bondcraft"
    ]
  },
  "Halerun Fields": {
    "description": "Where storms are teachers, not threats, and the sky never stops breathing. The world stretches endless beneath a horizon that never stops breathing. Thunder rolls across golden plains, herds rumbling across them, and the wind smells of wet stone and fire. To live here is to be small before the vastness — yet you learned to find grace in the run, to measure courage in endurance, and to read the sky as a promise rather than a threat. When you close your eyes, you still see lightning through tall grass.",
    "skills": [
      "Beastride",
      "Stonegrasp"
    ],
    "optionalReplacements": [
      "Wayfinding",
      "Presence"
    ]
  },
  "Deepmarket": {
    "description": "Where sunlight is a rumor and every secret has a seller. Far below the sun, beneath layers of earth and stone the echoing trade tunnels of Deepmarket breathe like a living thing. Lamps flicker across winding stalls that sell everything from relics to rumors, and the hum of coin never fades. You grew up learning which smiles hide knives, and which silences hide mercy. Down there, you learned to trade secrets, not gold — and to recognize when the same face greets you twice in a crowd.",
    "skills": [
      "Shadehand",
      "Guile"
    ],
    "optionalReplacements": [
      "Awareness",
      "Expression"
    ]
  },
  "Redmir Dunes": {
    "description": "Where the sand sings, and thirst teaches the price of every breath. Sand dunes glow like embers beneath the sun — a vast desert sea where mirages bloom like flowers and vanish with the wind. Nomads follow the whisper of buried rivers and the shimmer of aurora borealis’ of magic. You learned to find beauty in scarcity and calm in crisis, and to measure wealth not in coin but in will. Your heartbeat still keeps the rhythm of the desert wind — steady, patient, unyielding.",
    "skills": [
      "Wayfinding",
      "Stonegrasp"
    ],
    "optionalReplacements": [
      "Crafting (Salvage)",
      "Presence"
    ]
  },
  "Evershade": {
    "description": "Where the trees whisper back, and dreams linger after waking. Light and dark blend like breath in the endless canopy of Evershade. Lantern-fruit glows where stars cannot reach, and soft wind carries the voices of things half-remembered. You grew knowing that every sound means something — the crack of bark, the hum of moss, the sigh of branches shifting in sleep. The forest teaches by reflection: what you give it, it gives back in kind. You learned reverence, patience, and the art of listening when the world goes quiet.",
    "skills": [
      "Awareness",
      "Lorekeeping (Nature or Spirits)"
    ],
    "optionalReplacements": [
      "Guile",
      "Bondcraft"
    ]
  },
  "Willowstead": {
    "description": "Where every hearthfire is a promise, and every promise has a witness. A village of steady hearts and simple miracles. Smoke from hearthfires paints the dusk, and the air carries the sweetness of baking bread and rain-wet soil. You learned to work with your hands — to mend fences, heal bruises, and calm tempers as easily as livestock. When hardship came, it came to everyone at once — and was driven off the same way. Willowstead taught you that kindness is not weakness; it’s how the world stays standing.",
    "skills": [
      "Herbalry",
      "Charm"
    ],
    "optionalReplacements": [
      "Expression",
      "Lorekeeping (Folklore)"
    ]
  },
  "Untamed Verge": {
    "description": "Where the map ends — and the wild writes its own story. Here, the map ends. Beyond it stretch wild hills, shattered gods, and storms that walk like beasts. The Verge is a frontier of forgotten magic and unclaimed courage — a place that tests not what you can survive, but what you’re willing to become. You grew up where every sunrise felt like a dare, where survival meant risking the unknown to blink first. Those who come from the Verge rarely stay gone for long; the wild calls them home in every thunderclap.",
    "skills": [
      "Wayfinding",
      "Presence"
    ],
    "optionalReplacements": [
      "Seeking",
      "Stonegrasp"
    ]
  }
}

export const skillDefinitions: SkillDefinition[] = [
  {
    "name": "Tumblecraft",
    "attribute": "Agility",
    "restricted": false,
    "expanded": false,
    "description": "The practice of balance, agility, and movement through space.",
    "example": "Crossing a fallen log, tumbling to avoid harm."
  },
  {
    "name": "Shadehand",
    "attribute": "Agility",
    "restricted": false,
    "expanded": false,
    "description": "Sleight of hand and the subtle art of manipulating objects unnoticed.",
    "example": "Palming an item, swapping a token."
  },
  {
    "name": "Beastride",
    "attribute": "Agility",
    "restricted": true,
    "expanded": false,
    "description": "Mastery of controlling mounts or kin-beasts through bond or instinct.",
    "example": "Urging a stag through dense brush, calming a panicked mount."
  },
  {
    "name": "Whisperster",
    "attribute": "Agility",
    "restricted": false,
    "expanded": false,
    "description": "The craft of moving unseen, unheard, or unnoticed.",
    "example": "Hiding among reeds, slipping past patrols."
  },
  {
    "name": "Stonegrasp",
    "attribute": "Might",
    "restricted": false,
    "expanded": false,
    "description": "The body’s raw power — climbing, hauling, breaking, or holding firm.",
    "example": "Climbing a cliff, forcing open a sealed gate."
  },
  {
    "name": "Tradeskill",
    "attribute": "Lore",
    "restricted": true,
    "expanded": true,
    "description": "The shaping of things — forging, sewing.",
    "example": "Mending a weapon, brewing tinctures."
  },
  {
    "name": "Lorekeeping",
    "attribute": "Lore",
    "restricted": false,
    "expanded": true,
    "description": "The collection of wisdom, history, and truths.",
    "example": "Recalling ancient tales, identifying ruins,"
  },
  {
    "name": "Seeking",
    "attribute": "Lore",
    "restricted": false,
    "expanded": false,
    "description": "The practice of piecing together truth.",
    "example": "Searching for clues, discerning patterns."
  },
  {
    "name": "Herbalry",
    "attribute": "Lore",
    "restricted": true,
    "expanded": false,
    "description": "Understanding life, wounds, and the flow of health.",
    "example": "Treating injuries, stabilizing allies."
  },
  {
    "name": "Awareness",
    "attribute": "Lore",
    "restricted": false,
    "expanded": false,
    "description": "The senses of notice.",
    "example": "Spotting hidden dangers"
  },
  {
    "name": "Wayfinding",
    "attribute": "Lore",
    "restricted": false,
    "expanded": false,
    "description": "The skill of living in harmony with the wild.",
    "example": "Tracking prey, foraging food, navigating storms."
  },
  {
    "name": "Runecraft",
    "attribute": "Lore",
    "restricted": true,
    "expanded": false,
    "description": "The focused control and understanding of the arcane.",
    "example": "Detecting enchantments, identifying artifacts."
  },
  {
    "name": "Guile",
    "attribute": "Bravery",
    "restricted": false,
    "expanded": false,
    "description": "The shaping of  perception through falsehood or misdirection.",
    "example": "Concealing emotion, feigning innocence."
  },
  {
    "name": "Bondcraft",
    "attribute": "Bravery",
    "restricted": false,
    "expanded": false,
    "description": "Communicating with and guiding beasts.",
    "example": "Calming an animal, taming a wild creature."
  },
  {
    "name": "Presence",
    "attribute": "Bravery",
    "restricted": false,
    "expanded": false,
    "description": "Asserting one’s power, spirit, or dominance.",
    "example": "Demanding obedience or holding authority."
  },
  {
    "name": "Charm",
    "attribute": "Bravery",
    "restricted": false,
    "expanded": false,
    "description": "Persuasion, empathy, and heartfelt speech.",
    "example": "Negotiating peace, swaying opinion."
  },
  {
    "name": "Expression",
    "attribute": "Bravery",
    "restricted": false,
    "expanded": true,
    "description": "Inspiring others through art, song, or movement.",
    "example": "Inspiring courage, dance, or storytelling."
  }
]

export const gearShopItems: GearShopItem[] = [
  {
    "name": "Club",
    "category": "Weapon",
    "costText": "1 np",
    "costSp": 0.2,
    "detail": "3 · 2 lb. · Bludgeoning, Versatile"
  },
  {
    "name": "Shade Blade (Dagger)",
    "category": "Weapon",
    "costText": "2 sp",
    "costSp": 2.0,
    "detail": "2 · 1 lb. · Deadly, Versatile, Thrown (5)"
  },
  {
    "name": "Timber Fang (Hatchet)",
    "category": "Weapon",
    "costText": "5 sp",
    "costSp": 5.0,
    "detail": "3 · 2 lb. · Slashing, Thrown (5)"
  },
  {
    "name": "Rootbreaker (Mace)",
    "category": "Weapon",
    "costText": "2 sp",
    "costSp": 2.0,
    "detail": "4 · 2 lb. · Bludgeoning, Thrown (4)"
  },
  {
    "name": "Oak Staff (Quarterstaff)",
    "category": "Weapon",
    "costText": "2 np",
    "costSp": 0.4,
    "detail": "2 (3) · 4 lb. · Adaptable"
  },
  {
    "name": "Brush Blade (Short Sword)",
    "category": "Weapon",
    "costText": "10 sp",
    "costSp": 10.0,
    "detail": "3 · 2 lb. · Slashing, Versatile"
  },
  {
    "name": "Stonebreaker (Warhammer)",
    "category": "Weapon",
    "costText": "25 sp",
    "costSp": 25.0,
    "detail": "4 (6) · 2 lb. · Bludgeoning, Adaptable"
  },
  {
    "name": "Thornspike (Dart)",
    "category": "Weapon",
    "costText": "5 wp",
    "costSp": 0.1,
    "detail": "3 · ¼ lb. · Penetration, Thrown (6)"
  },
  {
    "name": "Reedpipe (Blowpipe)",
    "category": "Weapon",
    "costText": "8 wp",
    "costSp": 0.16,
    "detail": "2 · 1lb. · Projectile (4), Deadly"
  },
  {
    "name": "Sling",
    "category": "Weapon",
    "costText": "1 np",
    "costSp": 0.2,
    "detail": "3 · — · Projectile (5), Skyfire"
  },
  {
    "name": "Brush Bow (Short Bow)",
    "category": "Weapon",
    "costText": "20 sp",
    "costSp": 20.0,
    "detail": "3 · 2 lb. · Projectile (7), Penetration"
  },
  {
    "name": "Far Bow (Long Bow)",
    "category": "Weapon",
    "costText": "50 sp",
    "costSp": 50.0,
    "detail": "4 · 2 lb. · Projectile (12), Penetration, Skyfire"
  },
  {
    "name": "Quicklock (Light Crossbow)",
    "category": "Weapon",
    "costText": "25 sp",
    "costSp": 25.0,
    "detail": "3 · 5 lb. · Projectile (8), Penetration, Versatile"
  },
  {
    "name": "Latchlock (Heavy Crossbow)",
    "category": "Weapon",
    "costText": "50 sp",
    "costSp": 50.0,
    "detail": "5 · 5 lb. · Projectile (10), Penetration, Skyfire"
  },
  {
    "name": "Roughscale",
    "category": "Armor & Shield",
    "costText": "30sp",
    "costSp": 30.0,
    "detail": "2+ · +2 · +2 · -3 · 14lb"
  },
  {
    "name": "Root Weave",
    "category": "Armor & Shield",
    "costText": "75sp",
    "costSp": 75.0,
    "detail": "2+ · +3 · +2 · -4 · 28lb"
  },
  {
    "name": "Heartguard",
    "category": "Armor & Shield",
    "costText": "250sp",
    "costSp": 250.0,
    "detail": "3+ · +3 · +3 · -4 · 22lb"
  },
  {
    "name": "Earthforged Plate",
    "category": "Armor & Shield",
    "costText": "600sp",
    "costSp": 600.0,
    "detail": "4+ · +4 · +3 · -5 · 36lb"
  },
  {
    "name": "Bedroll & Groundsheet",
    "category": "Adventuring Gear",
    "costText": "8 np",
    "costSp": 1.6,
    "detail": "4 lb."
  },
  {
    "name": "Traveler’s Cloak",
    "category": "Adventuring Gear",
    "costText": "1 sp",
    "costSp": 1.0,
    "detail": "3 lb."
  },
  {
    "name": "Torch (each)",
    "category": "Adventuring Gear",
    "costText": "2 wp",
    "costSp": 0.04,
    "detail": "1 lb."
  },
  {
    "name": "Travel Lantern",
    "category": "Adventuring Gear",
    "costText": "2 sp",
    "costSp": 2.0,
    "detail": "2 lb."
  },
  {
    "name": "Glowfruit Cage",
    "category": "Adventuring Gear",
    "costText": "3 np",
    "costSp": 0.6,
    "detail": "1 lb."
  },
  {
    "name": "Waterskin",
    "category": "Adventuring Gear",
    "costText": "8 np",
    "costSp": 1.6,
    "detail": "2 lb. (full)"
  },
  {
    "name": "Reed Flask",
    "category": "Adventuring Gear",
    "costText": "4 np",
    "costSp": 0.8,
    "detail": "1 lb. (full)"
  },
  {
    "name": "Travel Meal (2 day)",
    "category": "Adventuring Gear",
    "costText": "6 np",
    "costSp": 1.2,
    "detail": "2 lb."
  },
  {
    "name": "Trail Rations (1 day)",
    "category": "Adventuring Gear",
    "costText": "3 np",
    "costSp": 0.6,
    "detail": "1 lb."
  },
  {
    "name": "Traveler’s Pack",
    "category": "Adventuring Gear",
    "costText": "1 sp",
    "costSp": 1.0,
    "detail": "2 lb."
  },
  {
    "name": "Forager’s Satchel",
    "category": "Adventuring Gear",
    "costText": "5 np",
    "costSp": 1.0,
    "detail": "1 lb."
  },
  {
    "name": "Fire-Starting Kit",
    "category": "Adventuring Gear",
    "costText": "6 np",
    "costSp": 1.2,
    "detail": "1 lb."
  },
  {
    "name": "Traveler’s Rope (20 ft)",
    "category": "Adventuring Gear",
    "costText": "1 sp",
    "costSp": 1.0,
    "detail": "3 lb."
  },
  {
    "name": "Glow-Moss Chalk",
    "category": "Adventuring Gear",
    "costText": "1 wp",
    "costSp": 0.02,
    "detail": "—"
  },
  {
    "name": "Rootwalker Bundle",
    "category": "Adventuring Gear",
    "costText": "5 np",
    "costSp": 1.0,
    "detail": "1 lb."
  },
  {
    "name": "Artisan",
    "category": "Adventuring Gear",
    "costText": "3 sp",
    "costSp": 3.0,
    "detail": "5 lb."
  },
  {
    "name": "Climber",
    "category": "Adventuring Gear",
    "costText": "2 sp",
    "costSp": 2.0,
    "detail": "4 lb."
  },
  {
    "name": "Disguise",
    "category": "Adventuring Gear",
    "costText": "3 sp",
    "costSp": 3.0,
    "detail": "3 lb."
  },
  {
    "name": "Forgery",
    "category": "Adventuring Gear",
    "costText": "2 sp",
    "costSp": 2.0,
    "detail": "2 lb."
  },
  {
    "name": "Navigator",
    "category": "Adventuring Gear",
    "costText": "2 sp",
    "costSp": 2.0,
    "detail": "3 lb."
  },
  {
    "name": "Poisoner",
    "category": "Adventuring Gear",
    "costText": "2 sp",
    "costSp": 2.0,
    "detail": "2 lb."
  },
  {
    "name": "Herbalist",
    "category": "Adventuring Gear",
    "costText": "1 sp",
    "costSp": 1.0,
    "detail": "1 lb."
  },
  {
    "name": "Infusion",
    "category": "Adventuring Gear",
    "costText": "2 sp",
    "costSp": 2.0,
    "detail": "3 lb."
  },
  {
    "name": "Thieves’",
    "category": "Adventuring Gear",
    "costText": "3 sp",
    "costSp": 3.0,
    "detail": "2 lb."
  },
  {
    "name": "Antivenin",
    "category": "Adventuring Gear",
    "costText": "3 sp",
    "costSp": 3.0,
    "detail": "—"
  },
  {
    "name": "Aroma",
    "category": "Adventuring Gear",
    "costText": "1 sp",
    "costSp": 1.0,
    "detail": "—"
  },
  {
    "name": "Black Water",
    "category": "Adventuring Gear",
    "costText": "2 sp",
    "costSp": 2.0,
    "detail": "—"
  },
  {
    "name": "Blessed Water",
    "category": "Adventuring Gear",
    "costText": "2 sp",
    "costSp": 2.0,
    "detail": "1 lb."
  },
  {
    "name": "Liquid Fire",
    "category": "Adventuring Gear",
    "costText": "4 sp",
    "costSp": 4.0,
    "detail": "1 lb."
  },
  {
    "name": "Potion of Healing",
    "category": "Adventuring Gear",
    "costText": "5 sp",
    "costSp": 5.0,
    "detail": "—"
  },
  {
    "name": "Scriptweave Book",
    "category": "Adventuring Gear",
    "costText": "5 np",
    "costSp": 1.0,
    "detail": "1 lb."
  },
  {
    "name": "Totem",
    "category": "Adventuring Gear",
    "costText": "1 sp",
    "costSp": 1.0,
    "detail": "—"
  },
  {
    "name": "Charm",
    "category": "Adventuring Gear",
    "costText": "2 sp",
    "costSp": 2.0,
    "detail": "—"
  },
  {
    "name": "Len-stone Arcanum",
    "category": "Adventuring Gear",
    "costText": "3 sp",
    "costSp": 3.0,
    "detail": "—"
  },
  {
    "name": "Cloak of Windweave",
    "category": "Adventuring Gear",
    "costText": "6 sp",
    "costSp": 6.0,
    "detail": "2 lb."
  },
  {
    "name": "Quickdraw Quiver",
    "category": "Adventuring Gear",
    "costText": "2 sp",
    "costSp": 2.0,
    "detail": "1 lb."
  },
  {
    "name": "Featherwind Bolt-Case",
    "category": "Adventuring Gear",
    "costText": "2 sp",
    "costSp": 2.0,
    "detail": "1 lb."
  },
  {
    "name": "Wristloop",
    "category": "Adventuring Gear",
    "costText": "1 sp",
    "costSp": 1.0,
    "detail": "—"
  },
  {
    "name": "Sharpening Stone",
    "category": "Adventuring Gear",
    "costText": "3 np",
    "costSp": 0.6,
    "detail": "1 lb."
  },
  {
    "name": "Journey Knot",
    "category": "Adventuring Gear",
    "costText": "1 sp",
    "costSp": 1.0,
    "detail": "—"
  },
  {
    "name": "Shovel",
    "category": "Adventuring Gear",
    "costText": "6 np",
    "costSp": 1.2,
    "detail": "3 lb."
  },
  {
    "name": "Mallet",
    "category": "Adventuring Gear",
    "costText": "4 np",
    "costSp": 0.8,
    "detail": "2 lb."
  },
  {
    "name": "Hatchet",
    "category": "Adventuring Gear",
    "costText": "1 sp",
    "costSp": 1.0,
    "detail": "2 lb."
  },
  {
    "name": "Hand Saw",
    "category": "Adventuring Gear",
    "costText": "1 sp",
    "costSp": 1.0,
    "detail": "2 lb."
  },
  {
    "name": "Trowel",
    "category": "Adventuring Gear",
    "costText": "2 np",
    "costSp": 0.4,
    "detail": "—"
  },
  {
    "name": "Pry Bar",
    "category": "Adventuring Gear",
    "costText": "5 np",
    "costSp": 1.0,
    "detail": "2 lb."
  }
]
