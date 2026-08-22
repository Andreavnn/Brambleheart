export interface SpellDetail { name:string; lore:string; flavor:string; rules:string; manaCost:number|null; keywords:string[] }

export const loreDescriptions: Record<string,string> = {
  "Flames": "The Lore of Flames is power given heat and hunger. Those attuned to it bring light where there’s shadow, fury where there’s resistance, and cleansing where there’s rot. Flame consumes, but it also purifies and sustains. To wield it is to decide what should burn — and what should endure.",
  "Wilds": "The Lore of Wilds commands the primal forces of nature — the restless spirits of root, claw, and storm. Defenders of the natural order, neither purely healer nor destroyer, but a force of balance in motion.",
  "Oath": "The Lore of Oaths binds word to will. Those who swear upon their honor shape the unseen forces of duty, loyalty, and conviction into tangible power.",
  "Frost": "The Lore of Frost draws power from stillness, silence, and the patience of winter. Those attuned to it bring calm where there was motion, memory where there was flame, and endurance where there was weakness.",
  "Hallows": "The Lore of Hallows delves into the howling void between life and death — a place of whispers, echoes, and madness. Channeling fear and despair into devastating magic that tears at both body and mind.",
  "Harmony": "The Lore of Harmony weaves sound, emotion, and magic into one unbroken resonance. Through voice, instrument, or will alone, they shape vibration into both solace and devastation.",
  "Life": "The Lore of Life is the magic of renewal, protection, and growth. Practitioners channel the pulse of existence itself, restoring the fallen, shielding the living, and withering corruption wherever it takes root."
} as const

export const spellDetails: Record<string,SpellDetail> = {
  "Whispering Wind": {
    "name": "Whispering Wind",
    "lore": "Invocation",
    "flavor": "The wild carries your voice across distance and dusk.",
    "rules": "COST: [0] mana DECLARE: Summon a critter to carry your message. EFFECT: The critter delivers a short mental message to a target you name. RESTRICTIONS: The message can travel any distance but may be delayed by your watcher. KEYWORDS: CANTRIP | MAGIC | INVOCATION | SUMMON",
    "manaCost": 0,
    "keywords": [
      "CANTRIP",
      "MAGIC",
      "INVOCATION",
      "SUMMON"
    ]
  },
  "Soothing Bloom": {
    "name": "Soothing Bloom",
    "lore": "Invocation",
    "flavor": "Life answers when kindness is given form.",
    "rules": "COST: [1] mana DECLARE: Target one ally within [4] squares. EFFECT: The target restores [2] health. EMPOWER: Spend [+3] additional mana to increase range to [+4] squares and the target restores [4] health. KEYWORDS: AUGMENT | MAGIC | INVOCATION | ANCHOR",
    "manaCost": 1,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "INVOCATION",
      "ANCHOR"
    ]
  },
  "Barkskin Ward": {
    "name": "Barkskin Ward",
    "lore": "Invocation",
    "flavor": "The calm strength of bark shields the fragile beneath.",
    "rules": "COST: [2] MANA DECLARE: Target one ally within four [4] squares. EFFECT: The target gains [+2] guts until the end of their next turn. EMPOWER: Spend [+2] additional mana to increase effect by [+2]. KEYWORDS: AUGMENT | MAGIC | INVOCATION | ANCHOR",
    "manaCost": 2,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "INVOCATION",
      "ANCHOR"
    ]
  },
  "Wyrd Bolt": {
    "name": "Wyrd Bolt",
    "lore": "Invocation",
    "flavor": "A crack of woven power leaps through the air like a whispered oath.",
    "rules": "COST: [2] mana DECLARE: Target one character within [4] squares. EFFECT: Deal [5] direct arcane damage. EMPOWER: Spend [+3] additional mana to increase range to [+6] squares and damage by [+3]. KEYWORDS: COMBAT | MAGIC | INVOCATION | ANCHOR",
    "manaCost": 2,
    "keywords": [
      "COMBAT",
      "MAGIC",
      "INVOCATION",
      "ANCHOR"
    ]
  },
  "Spectral Armament": {
    "name": "Spectral Armament",
    "lore": "Invocation",
    "flavor": "The air hums as a weapon of pure will takes shape.",
    "rules": "COST: [1] MANA DECLARE: Summon a weapon of shimmering energy into your grasp. EFFECT: Select one weapon from the weapon equipment list. Selected weapon materializes in your grasp and functions as the real item. EMPOWER: Spend [+2] additional mana to summon another weapon in a second hand. KEYWORDS: AUGMENT | MAGIC | INVOCATION | ANCHOR | SUMMON",
    "manaCost": 1,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "INVOCATION",
      "ANCHOR",
      "SUMMON"
    ]
  },
  "Veil Of Glimmer": {
    "name": "Veil Of Glimmer",
    "lore": "Invocation",
    "flavor": "A shimmer of thought weaves light, color, and sound into gentle wonder.",
    "rules": "COST: [0] mana DECLARE: Create a minor illusion or sensory effect within [6] squares. EFFECT: Conjure or alter harmless visual, auditory, or sensory phenomena—shift color, dim or brighten light, soften sound, or craft an image no larger than three [3] squares. Effects are temporary and fade when concentration ends. RESTRICTIONS: Cannot move independently, deal damage, cause harm, or create permanent change. KEYWORDS: CANTRIP | MAGIC | INVOCATION",
    "manaCost": 0,
    "keywords": [
      "CANTRIP",
      "MAGIC",
      "INVOCATION"
    ]
  },
  "Spectral Hand": {
    "name": "Spectral Hand",
    "lore": "Invocation",
    "flavor": "An unseen hand reaches where yours cannot.",
    "rules": "COST: [0] mana DECLARE: Manifest a spectral hand within eight [8] squares. EFFECT: Manipulate objects weighing up to five pounds or perform delicate tasks within [24] squares away. RESTRICTIONS: Spell lasts up to three minutes in-game time or [3] rounds. Lasts until your third turn or combat ends. KEYWORDS: CANTRIP | MAGIC | INVOCATION |",
    "manaCost": 0,
    "keywords": [
      "CANTRIP",
      "MAGIC",
      "INVOCATION"
    ]
  },
  "Kinbound Call": {
    "name": "Kinbound Call",
    "lore": "Invocation",
    "flavor": "A loyal echo of spirit answers your summons.",
    "rules": "COST: [1] mana DECLARE: Summon a critter into an empty adjacent square. EFFECT: The summoned critter obeys your commands. Use the critter’s monster entry for statistics. RESTRICTIONS: You may only have one summon spell active at a time. Casting another summon spell automatically ends the previous one. Lasts until combat ends. KEYWORDS: COMBAT | SUMMON | MAGIC | INVOCATION | ANCHOR",
    "manaCost": 1,
    "keywords": [
      "COMBAT",
      "SUMMON",
      "MAGIC",
      "INVOCATION",
      "ANCHOR"
    ]
  },
  "Forager’S Gift": {
    "name": "Forager’S Gift",
    "lore": "Invocation",
    "flavor": "The land provides for those who ask with respect.",
    "rules": "COST: [0] mana DECLARE: Conjure simple food, drink, or mundane supplies within [5] squares. EFFECT: Create enough sustenance for up to [3] characters for one day. Conjured items vanish after twenty-four hours. RESTRICTIONS: Cannot be sold, traded, or used offensively. KEYWORDS: CANTRIP | MAGIC | INVOCATION",
    "manaCost": 0,
    "keywords": [
      "CANTRIP",
      "MAGIC",
      "INVOCATION"
    ]
  },
  "Mendcraft": {
    "name": "Mendcraft",
    "lore": "Invocation",
    "flavor": "The weave remembers what was once whole.",
    "rules": "COST: [0] mana DECLARE: Touch a damaged nonliving object. EFFECT: Restore one [1] break value to the object. The target must be made of natural materials and be no larger than three [3] squares. KEYWORDS: AUGMENT | MAGIC | INVOCATION",
    "manaCost": 0,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "INVOCATION"
    ]
  },
  "Shadeveil": {
    "name": "Shadeveil",
    "lore": "Invocation",
    "flavor": "The unseen world folds its shadow around you.",
    "rules": "COST: [2] mana DECLARE: Cast upon an ally within [4] squares. EFFECT: The target becomes invisible, gaining [+2] to all dice rolls against any characters that cannot see them. RESTRICTIONS: Effect ends if the target performs any action or otherwise reveals themselves. Lasts until combat ends. KEYWORDS: AUGMENT | COMBAT | MAGIC | INVOCATION | ANCHOR",
    "manaCost": 2,
    "keywords": [
      "AUGMENT",
      "COMBAT",
      "MAGIC",
      "INVOCATION",
      "ANCHOR"
    ]
  },
  "Hearth Vow": {
    "name": "Hearth Vow",
    "lore": "Invocation",
    "flavor": "The promise of flame binds blade and spirit as one.",
    "rules": "COST: [2] mana DECLARE: Target one ally within four [4] squares. EFFECT: The target gains [+1] to strike or ward rolls (their choice) until the end of their next turn. RESTRICTIONS: Cannot stack from multiple sources. Lasts until combat ends. KEYWORDS: AUGMENT | MAGIC | INVOCATION | ANCHOR",
    "manaCost": 2,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "INVOCATION",
      "ANCHOR"
    ]
  },
  "Unraveling Word": {
    "name": "Unraveling Word",
    "lore": "Invocation",
    "flavor": "You sever the threads that hold another’s power together.",
    "rules": "COST: [2] mana DECLARE: Target one ally within four [4] squares. EFFECT: The target can use the ability renew the heart immediately, without cost. KEYWORDS: AUGMENT | MAGIC | INVOCATION | ANCHOR",
    "manaCost": 2,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "INVOCATION",
      "ANCHOR"
    ]
  },
  "Smolder": {
    "name": "Smolder",
    "lore": "Flames",
    "flavor": "The ember takes hold; pain lingers, waiting to bloom.",
    "rules": "COST: [0] mana TRIGGER: When you successfully cast any lore of flames spell. DECLARE: Choose [1] target successfully affected by the triggering spell. EFFECT: The target gains smolder until the start of the next round. Characters with smolder suffer [1] lethal fire damage each time they are successfully targeted by a lore of flames spell. RESTRICTIONS: A single character can be affected by smolder up a maximum of [5] times per round. KEYWORDS: HEX | MAGIC | FLAMES | SIGNATURE",
    "manaCost": 0,
    "keywords": [
      "HEX",
      "MAGIC",
      "FLAMES",
      "SIGNATURE"
    ]
  },
  "Scorching Hand": {
    "name": "Scorching Hand",
    "lore": "Flames",
    "flavor": "Heat leaps from your grasp, clinging like hungry cinders.",
    "rules": "COST: [4] mana DECLARE: Target [1] enemy character within [4] squares. EFFECT: Deal [6] direct fire damage and the target gains smolder. EMPOWER: Spend [+2] additional mana. If you do, increase damage by [+1], and the target gains smolder twice, instead of once. KEYWORDS: COMBAT | MAGIC | FLAMES",
    "manaCost": 4,
    "keywords": [
      "COMBAT",
      "MAGIC",
      "FLAMES"
    ]
  },
  "Flaming Shroud": {
    "name": "Flaming Shroud",
    "lore": "Flames",
    "flavor": "A crown of thin, judging flame answers violence with pain.",
    "rules": "COST: [4] mana DECLARE: Cast on yourself. EFFECT: Any character that passes through, is within or ends a movement within [1] square of the caster suffers [2] lethal fire damage. Additionally, all attacks with the shoot or magic keyword suffer [-1] on all strike rolls against the caster. RESTRICTION: This spell can only trigger smolder when cast. It does not trigger smolder on targets that pass through, are within or ends a movement within [1] square of the caster DURATION: This spell lasts [1d10/2] rounds, effects end at the start of the round. Or when the caster elects to end the effects. KEYWORDS: MAGIC | FLAMES | AUGMENT",
    "manaCost": 4,
    "keywords": [
      "MAGIC",
      "FLAMES",
      "AUGMENT"
    ]
  },
  "Blazing Weapon": {
    "name": "Blazing Weapon",
    "lore": "Flames",
    "flavor": "Steel drinks fire and answers in kind.",
    "rules": "COST: [5] mana DECLARE: Target [1] ally character within [4] squares wielding a weapon. EFFECT: Increase the target weapons damage by [+1] and damage type to fire, until the end of the next round. AFTERBURN: Any character that suffers damage from the target weapon suffers [1] lethal fire damage at the start of the following round. RESTRICTION: This spell cannot trigger smolder and the target weapon’s fire damage cannot trigger smolder. KEYWORDS: AUGMENT | MAGIC | FLAMES |",
    "manaCost": 5,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "FLAMES"
    ]
  },
  "Fire Bolt": {
    "name": "Fire Bolt",
    "lore": "Flames",
    "flavor": "Purifying flame tears forward in a focused burst.",
    "rules": "COST: [6] mana DECLARE: Target [1] enemy character within [4] squares. EFFECT: Deal [7] direct fire damage. EMPOWER: Spend [+3] additional mana. If you do, increase damage by [+2], and the target gains smolder. PURIFY: If the target has the following keywords: undeath, flammable, curse, disease, corruption, unclean - increase the total damage deal by spell by [+4]. KEYWORDS: COMBAT | MAGIC | FLAMES | ANCHOR",
    "manaCost": 6,
    "keywords": [
      "undeath, flammable, curse, disease, corruption, unclean - increase the total damage deal by spell by [+4]. KEYWORDS: COMBAT",
      "MAGIC",
      "FLAMES",
      "ANCHOR"
    ]
  },
  "Cascading Fire": {
    "name": "Cascading Fire",
    "lore": "Flames",
    "flavor": "What catches, spreads.",
    "rules": "COST: [7] mana DECLARE: Select a point of origin within [5] squares. Target all characters within ORB[4] expanding from that point of origin. EFFECT: The target(s) are compelled[difficult] to make a renew the heart ability. On failure, Deal [5] direct fire damage. ENGULF: Any character that passes through, is within or ends a movement within the spell’s orb suffers [2] lethal fire damage. DURATION: This effect lasts [1d10/2] rounds, effects end at the start of the round. KEYWORDS: COMBAT | MAGIC | FLAMES | ORB | ANCHOR",
    "manaCost": 7,
    "keywords": [
      "COMBAT",
      "MAGIC",
      "FLAMES",
      "ORB",
      "ANCHOR"
    ]
  },
  "Inferno Strike": {
    "name": "Inferno Strike",
    "lore": "Flames",
    "flavor": "A focused blast of living flame that will not let go.",
    "rules": "COST: [7] mana DECLARE: Target [1] enemy character within [4] squares. EFFECT: Deal [5] direct fire damage. BURNED: Any character that suffers DAMAGE from this spell suffers [2] lethal fire damage at the start of the following round. DURATION: This effect lasts [1d10/2] rounds, effects end at the start of the round. KEYWORDS: COMBAT | MAGIC | FLAMES",
    "manaCost": 7,
    "keywords": [
      "COMBAT",
      "MAGIC",
      "FLAMES"
    ]
  },
  "Infernal Rebuke": {
    "name": "Infernal Rebuke",
    "lore": "Flames",
    "flavor": "Pain answers pain.",
    "rules": "COST: [6] mana DECLARE: Target [1] enemy character within [4] squares. EFFECT: Deal [3] lethal fire damage to the target. EMPOWER: Spend [+2] additional mana. If you do, increase damage by [+2], and the target gains smolder. REBUKE: If the target of this spell has dealt any damage to the caster, since the end of the caster’s last turn, reduce the mana cost of this spell by [-2]. KEYWORDS: HEX | COMBAT | MAGIC | FLAMES",
    "manaCost": 6,
    "keywords": [
      "HEX",
      "COMBAT",
      "MAGIC",
      "FLAMES"
    ]
  },
  "Sun Burst": {
    "name": "Sun Burst",
    "lore": "Flames",
    "flavor": "Light without mercy.",
    "rules": "COST: [7] mana DECLARE: Target all enemy characters within orb[5] centered on a point of origin within [5] squares. EFFECT: The target is compelled[medium] to use the renew the heart ability. On failure, targets suffer [2] lethal fire and [-2] to strike and ward rolls; and the targets gain smolder. KEYWORDS: HEX | MAGIC | FLAMES | ORB | ANCHOR",
    "manaCost": 7,
    "keywords": [
      "HEX",
      "MAGIC",
      "FLAMES",
      "ORB",
      "ANCHOR"
    ]
  },
  "Detonation": {
    "name": "Detonation",
    "lore": "Flames",
    "flavor": "Fire learns patience — then teaches regret.",
    "rules": "COST: [8] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: The target rolls [1d10] and consults that results below. 1–3 | SPARK: Deal [2] lethal fire DAMAGE to the target immediately and target rolls again at the start of the next round. 4–6 | PRESSURE: Target rolls again at the start of the next round. 7–9 | BURST: Deal [7] direct fire damage to the target immediately and target rolls again at the start of the next round. 10 | CATASTROPHE: Deal [6] lethal fire damage to the target immediately and the effects end. DURATION: This effect lasts [1d10/2+1] rounds, effects end at the start of the round. KEYWORDS: HEX | MAGIC | FLAMES | ANCHOR",
    "manaCost": 8,
    "keywords": [
      "HEX",
      "MAGIC",
      "FLAMES",
      "ANCHOR"
    ]
  },
  "Immolation": {
    "name": "Immolation",
    "lore": "Flames",
    "flavor": "The flame does not ask permission.",
    "rules": "COST: [12] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: Deal [8] direct fire damage to the target immediately and that target gains immolated. IMMOLATED: At the start of each round, characters with immolation suffer [3] lethal fire damage. IGNITION: Any character that passes through, is within or ends a movement within [1] square of a character with immolated gains immolated. DURATION: This effect lasts [1d10/2+1] rounds, effects end at the start of the round. RESTRICTIONS: A character cannot be affected by multiple instances of immolation at the same time or from different sources. immolation damage cannot trigger smolder. KEYWORDS: HEX | MAGIC | FLAMES | ANCHOR",
    "manaCost": 12,
    "keywords": [
      "HEX",
      "MAGIC",
      "FLAMES",
      "ANCHOR"
    ]
  },
  "Flourishing Earth": {
    "name": "Flourishing Earth",
    "lore": "Wilds",
    "flavor": "Life and death share one rhythm; the wild decides which blooms.",
    "rules": "COST: [0] mana TRIGGER: When you successfully cast any lore of wilds spell. DECLARE: Target [1] ally within [5] squares. EFFECT: Reduce a negative condition from the target by[-1]. This can reduce the condition to zero but does not remove the condition or ends it duration. KEYWORDS: AUGMENT | MAGIC | WILDS | SIGNATURE",
    "manaCost": 0,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "WILDS",
      "SIGNATURE"
    ]
  },
  "Elemental Armor": {
    "name": "Elemental Armor",
    "lore": "Wilds",
    "flavor": "The elements answer the call, forming a living shell of power.",
    "rules": "COST: [4] mana DECLARE: Target [1] ally within [5] squares. EFFECT: The target gains resistance [+2] against a chosen damage type until the start of their next turn. EMPOWER: Spend [+2] additional mana to grant resistance [+2] to a second damage type. KEYWORDS: AUGMENT | MAGIC | WILDS",
    "manaCost": 4,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "WILDS"
    ]
  },
  "Curse Of Patronus": {
    "name": "Curse Of Patronus",
    "lore": "Wilds",
    "flavor": "The guardian spirits turn their wrath upon the impure.",
    "rules": "COST: [5] mana DECLARE: Target up to [3] enemy characters within [4] squares. EFFECT: Each target is compelled[medium] to use the renew the heart ability. On failure, they suffer [3] lethal nature damage and gain [-1] when rolling strike with any magic abilities until the end of their next turn. KEYWORDS: HEX | MAGIC | WILDS | ORB",
    "manaCost": 5,
    "keywords": [
      "HEX",
      "MAGIC",
      "WILDS",
      "ORB"
    ]
  },
  "Moon Bolt": {
    "name": "Moon Bolt",
    "lore": "Wilds",
    "flavor": "A shaft of cold light tears through shadow and pride alike.",
    "rules": "COST: [6] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: The target is compelled[easy] to use the renew the heart ability. On failure, deal [10] direct nature damage; on success, deal half damage. KEYWORDS: COMBAT | MAGIC | WILDS",
    "manaCost": 6,
    "keywords": [
      "COMBAT",
      "MAGIC",
      "WILDS"
    ]
  },
  "Nature’S Fury": {
    "name": "Nature’S Fury",
    "lore": "Wilds",
    "flavor": "Wind, rain, and stone answer your command in one violent breath.",
    "rules": "COST: [6] mana DECLARE: Target all enemy characters within line[4]. EFFECT: Each target suffers deal [3] lethal nature damage. KEYWORDS: COMBAT | MAGIC | WILDS | LINE",
    "manaCost": 6,
    "keywords": [
      "COMBAT",
      "MAGIC",
      "WILDS",
      "LINE"
    ]
  },
  "Entangling Roots": {
    "name": "Entangling Roots",
    "lore": "Wilds",
    "flavor": "The earth itself rises to claim those who would defy its law.",
    "rules": "COST: [7] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: The target is compelled[medium] to use the renew the heart ability. On failure, reduce speed to [1], gain rooted, and apply [-2] to ward until the end of their next turn. ROOTED: At the start of each round, if a target is rooted, they suffer [2] lethal nature damage. DURATION: This effect lasts [1d10] rounds, effects end at the start of the round. KEYWORDS: HEX | MAGIC | WILDS | ANCHOR",
    "manaCost": 7,
    "keywords": [
      "HEX",
      "MAGIC",
      "WILDS",
      "ANCHOR"
    ]
  },
  "Hallowing Thorns": {
    "name": "Hallowing Thorns",
    "lore": "Wilds",
    "flavor": "The ground twists and bristles with the wild’s fury.",
    "rules": "COST: [9] mana DECLARE: Target an area within [5] squares; create an orb[4]. EFFECT: Each enemy within the orb is compelled[easy] to use the renew the heart ability. On failure, they suffer [10] direct nature damage. DIFFICULT TERRAIN: The targeted squares become difficult terrain until the end of the next round. Any characters moving through them are compelled to use the renew the heart ability. On failure they suffer [2] lethal nature damage. DURATION: [1d10/2] rounds, effects end at the start of the round. KEYWORDS: MAGIC | WILDS | ORB | ANCHOR",
    "manaCost": 9,
    "keywords": [
      "MAGIC",
      "WILDS",
      "ORB",
      "ANCHOR"
    ]
  },
  "Blessing Of The Wilds": {
    "name": "Blessing Of The Wilds",
    "lore": "Wilds",
    "flavor": "The wind and soil conspire to lift and shelter those who walk in harmony.",
    "rules": "COST: [8] mana DECLARE: Target all ally characters within orb[6]. EFFECT: Each target chooses one: gain condition [+1] to strike or [+1] to ward and swift strider, until the end of their next turn. SWIFT STRIDER: Target(s) ignore difficult terrain. RESTRICTIONS: A character cannot be affected by multiple instances of blessing of the wilds from different sources. KEYWORDS: AUGMENT | MAGIC | WILDS | ORB",
    "manaCost": 8,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "WILDS",
      "ORB"
    ]
  },
  "Wild Shape": {
    "name": "Wild Shape",
    "lore": "Wilds",
    "flavor": "Your body bends and shifts, becoming one with primal instinct.",
    "rules": "COST: [9] mana DECLARE: Cast on yourself. EFFECT: Gain [+2] to strike, ward, guts, and all non-magical damage until the start of your next turn. EMPOWER: Spend [+3] additional mana to cast this spell on an ally within [5] squares. KEYWORDS: AUGMENT | MAGIC | WILDS | ANCHOR",
    "manaCost": 9,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "WILDS",
      "ANCHOR"
    ]
  },
  "Call Of The Beast": {
    "name": "Call Of The Beast",
    "lore": "Wilds",
    "flavor": "The wilds themselves answer your plea with tooth and claw.",
    "rules": "COST: [10] mana DECLARE: Choose one empty square within [4] squares. EFFECT: summon one beast monster with a threat level of [4] or lower. The beast is added to the initiative order immediately your turn until defeated or dismissed. KEYWORDS: MAGIC | WILDS | SUMMON | ANCHOR",
    "manaCost": 10,
    "keywords": [
      "MAGIC",
      "WILDS",
      "SUMMON",
      "ANCHOR"
    ]
  },
  "Breath Of Life": {
    "name": "Breath Of Life",
    "lore": "Wilds",
    "flavor": "Even destruction becomes renewal beneath the wild’s grace.",
    "rules": "COST: [12] mana DECLARE: Target all enemy characters within CONE[6]. EFFECT: Each target is compelled[medium] to use the renew the heart ability. On failure, suffer [4] lethal nature damage. For each enemy character that suffers damage from this spell, select one ally character within [6] squares and restore [2] health. KEYWORDS: MAGIC | WILDS | CONE | ANCHOR",
    "manaCost": 12,
    "keywords": [
      "MAGIC",
      "WILDS",
      "CONE",
      "ANCHOR"
    ]
  },
  "Oath Of Protection": {
    "name": "Oath Of Protection",
    "lore": "Oath",
    "flavor": "A vow sworn in truth hardens the heart and shields the worthy.",
    "rules": "COST: [0] mana TRIGGER: When you successfully cast any lore of oaths spell. DECLARE: Choose [1] ally character within [5] squares. EFFECT: The chosen character gains [+2] to guts until the start of the next round. RESTRICTIONS: A character cannot benefit from multiple instances of oath of protection. KEYWORDS: AUGMENT | MAGIC | OATHS | SIGNATURE",
    "manaCost": 0,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "OATHS",
      "SIGNATURE"
    ]
  },
  "Word Of Challenge": {
    "name": "Word Of Challenge",
    "lore": "Oath",
    "flavor": "To stand before the foe is to demand their respect—or their fear.",
    "rules": "COST: [4] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: The target is compelled[medium] to use the renew the heart ability. On failure, their outgoing damage against targets other than the caster is reduced by [-2], to a minimum of [1], until the end of their next turn. KEYWORDS: HEX | MAGIC | OATHS | ORB",
    "manaCost": 4,
    "keywords": [
      "HEX",
      "MAGIC",
      "OATHS",
      "ORB"
    ]
  },
  "Thunder’S Fury": {
    "name": "Thunder’S Fury",
    "lore": "Oath",
    "flavor": "The storm answers a promise of retribution. COST: [5] MANA DECLARE: Target [1] ally character within [5] squares wielding a weapon. EFFECT: Increase the target weapons Damage by [+2] and change the damage type to lighting, until the end of the next round. AFTERBURN: Any character that suffers damage from the target weapon suffers [1] lethal light damage at the start of the following round.",
    "rules": "RESTRICTION: The target weapon’s lighting damage cannot trigger oath of protection. KEYWORDS: AUGMENT | MAGIC | FLAMES | POWER WORD: REINFORCEMENT Your vow steadies the hands and hearts of those who fight beside you. COST: [6] MANA DECLARE: Target [1] ally character within [5] squares. EFFECT: The target decreases all damage categories by [1]. Lethal DAMAGE changes to direct and direct damage changes to standard. KEYWORDS: AUGMENT | MAGIC | OATHS",
    "manaCost": 6,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "FLAMES",
      "POWER WORD: REINFORCEMENT Your vow steadies the hands and hearts of those who fight beside you. COST: [6] MANA DECLARE: Target [1] ally character within [5] squares. EFFECT: The target decreases all damage categories by [1]. Lethal DAMAGE changes to direct and direct damage changes to standard. KEYWORDS: AUGMENT",
      "MAGIC",
      "OATHS"
    ]
  },
  "Vow Of Elements": {
    "name": "Vow Of Elements",
    "lore": "Oath",
    "flavor": "Through oath and focus, you command the world’s primal powers to defend your ally.",
    "rules": "COST: [4] mana DECLARE: Target [1] ally character within [5] squares. EFFECT: The target selects [1] DAMAGE type and gain resistance [+2] against that type until the end of their next turn. KEYWORDS: AUGMENT | MAGIC | OATHS",
    "manaCost": 4,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "OATHS"
    ]
  },
  "Wind Scaring": {
    "name": "Wind Scaring",
    "lore": "Oath",
    "flavor": "A surge of cutting energy carries your oath’s fury across the field.",
    "rules": "COST: [5] mana DECLARE: Target [1] ally character within [5] squares wielding a weapon. EFFECT: Increase the target weapons damage by [+2] and change the damage type to arcane, until the end of the next round. DUALING ELEMENTS: Targets of this spell can have THUNDERSTORM: If the target weapon it under the effects of thunder’s fury, increase the damage condition for both spells by [+1]. The weapon is granted both damage types for the duration. KEYWORDS: AUGMENT | MAGIC | OATHS",
    "manaCost": 5,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "OATHS"
    ]
  },
  "Earth Grasp": {
    "name": "Earth Grasp",
    "lore": "Oath",
    "flavor": "Stone rises in obedience to your pledge of defense.",
    "rules": "COST: [7] mana DECLARE: Target [1] empty square within [6] squares and summon a totem. EFFECT: All enemy characters within orb[5] of the totem suffer [-2] to speed until the end of their next turn. KEYWORDS: MAGIC | OATHS | SUMMON | ANCHOR",
    "manaCost": 7,
    "keywords": [
      "MAGIC",
      "OATHS",
      "SUMMON",
      "ANCHOR"
    ]
  },
  "Primal Surge": {
    "name": "Primal Surge",
    "lore": "Oath",
    "flavor": "You channel raw conviction into flesh and faith.",
    "rules": "COST: [8] mana DECLARE: Target [1] ALLY within [5] squares. EFFECT: The target restores health [+4] and gains [+2] to strike rolls until the end of their next turn. KEYWORDS: AUGMENT | MAGIC | OATHS",
    "manaCost": 8,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "OATHS"
    ]
  },
  "The Immortal Warrior": {
    "name": "The Immortal Warrior",
    "lore": "Oath",
    "flavor": "You become the living symbol of your vow, standing against all that would falter.",
    "rules": "COST: [10] mana DECLARE: Cast on yourself. EFFECT: Gain [+2] to ward and guts until the end of your next turn. DEFECTION: When the target of an attack that deals damage, you can be compelled[medium] to use the renew the heart ability. On failure, nothing happens. If successful you suffer no damage and half the intended damage from the attack is reflected back at the attacker KEYWORDS: AUGMENT | MAGIC | OATHS | ANCHOR",
    "manaCost": 10,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "OATHS",
      "ANCHOR"
    ]
  },
  "Oathkeeper": {
    "name": "Oathkeeper",
    "lore": "Oath",
    "flavor": "Your promise shields your comrades and punishes betrayal.",
    "rules": "COST: [12] mana DECLARE: Target all enemy characters within orb[5] of the caster EFFECT: Each target is compelled[medium] to use the renew the heart ability. On failure, their outgoing damage against targets other than the caster is reduced by [-5], to a minimum of [1], until the end of their next turn. KEYWORDS: AUGMENT | MAGIC | OATHS | ORB | ANCHOR",
    "manaCost": 12,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "OATHS",
      "ORB",
      "ANCHOR"
    ]
  },
  "Hypothermia": {
    "name": "Hypothermia",
    "lore": "Frost",
    "flavor": "The air stills; the warmth of life falters beneath an unseen chill.",
    "rules": "COST: [0] mana TRIGGER: When you successfully cast any lore of frost spell. DECLARE: Choose one enemy character within [5] squares. EFFECT: The target suffers [-1] to speed until the end of their next turn. KEYWORDS: HEX | MAGIC | FROST | SIGNATURE",
    "manaCost": 0,
    "keywords": [
      "HEX",
      "MAGIC",
      "FROST",
      "SIGNATURE"
    ]
  },
  "Mind Freeze": {
    "name": "Mind Freeze",
    "lore": "Frost",
    "flavor": "Frost creeps through the mind, locking thought in brittle silence.",
    "rules": "COST: [3] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: The target is compelled[easy] to use the renew the heart ability. On failure, they suffer [-1] to all attribute saves until the end of their next turn. KEYWORDS: HEX | MAGIC | FROST",
    "manaCost": 3,
    "keywords": [
      "HEX",
      "MAGIC",
      "FROST"
    ]
  },
  "Frost Shock": {
    "name": "Frost Shock",
    "lore": "Frost",
    "flavor": "A pulse of frozen energy shatters the air, leaving a biting trail of rime.",
    "rules": "COST: [4] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: Deal [5] direct cold DAMAGE. The target suffers [-1] to guts until the end of their next turn. KEYWORDS: COMBAT | MAGIC | FROST",
    "manaCost": 4,
    "keywords": [
      "COMBAT",
      "MAGIC",
      "FROST"
    ]
  },
  "Biting Blade": {
    "name": "Biting Blade",
    "lore": "Frost",
    "flavor": "Steel cracks beneath the weight of winter’s edge.",
    "rules": "COST: [5] mana DECLARE: Target [1] enemy character within [5] squares wielding a weapon. EFFECT: Reduce the target weapons damage by [-1] until the end of the next round. KEYWORDS: HEX | MAGIC | FROST",
    "manaCost": 5,
    "keywords": [
      "HEX",
      "MAGIC",
      "FROST"
    ]
  },
  "Torrent Of Frost": {
    "name": "Torrent Of Frost",
    "lore": "Frost",
    "flavor": "A wave of white wind bursts outward, freezing flesh and breath alike.",
    "rules": "COST: [6] mana DECLARE: Target all characters within a cone[5]. EFFECT The target(s) is compelled[medium] to use the renew the heart ability. On failure, deal [3] lethal cold damage, or half as much on success. Targets that fail also suffer [-1] to guts until the end of their next turn. KEYWORDS: COMBAT | MAGIC | FROST | CONE",
    "manaCost": 6,
    "keywords": [
      "COMBAT",
      "MAGIC",
      "FROST",
      "CONE"
    ]
  },
  "Ice Wall": {
    "name": "Ice Wall",
    "lore": "Frost",
    "flavor": "A wall of glittering frost rises, sealing paths and muting sound.",
    "rules": "COST: [7] mana DECLARE: Target all characters within a line[5]. EFFECT: Each target suffers [4] direct cold damage and gain [-2] to their next roll made, until the end of the round. Additionally, the targeted squares become difficult terrain until the end of the next round. Any characters moving through them are compelled[medium] to use the renew the heart ability. On failure they suffer [2] lethal cold damage. KEYWORDS: MAGIC | FROST | ANCHOR",
    "manaCost": 7,
    "keywords": [
      "MAGIC",
      "FROST",
      "ANCHOR"
    ]
  },
  "Polar Vortex": {
    "name": "Polar Vortex",
    "lore": "Frost",
    "flavor": "A spiral of biting wind draws heat and will from the air.",
    "rules": "COST: [8] mana DECLARE: Select a point of origin within [5] squares. Target all characters within orb[5] expanding from that point of origin. EFFECT: The target is compelled[medium] to use the renew the heart ability. On failure, deal [3] lethal cold damage and targets suffer [-1] to ward until the end of their next turn. KEYWORDS: HEX | MAGIC | FROST",
    "manaCost": 8,
    "keywords": [
      "HEX",
      "MAGIC",
      "FROST"
    ]
  },
  "Frostbite": {
    "name": "Frostbite",
    "lore": "Frost",
    "flavor": "The chill gnaws deep, numbing flesh and thought alike.",
    "rules": "COST: [4] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: The target is compelled[medium] to use the renew the heart ability. On failure, deal [6] direct cold damage and the target suffers [-1] to speed until the end of their next turn, or resists effects and half damage on successes. KEYWORDS: COMBAT | MAGIC | FROST",
    "manaCost": 4,
    "keywords": [
      "COMBAT",
      "MAGIC",
      "FROST"
    ]
  },
  "Frozen Blood": {
    "name": "Frozen Blood",
    "lore": "Frost",
    "flavor": "The heart slows, each beat thick with ice.",
    "rules": "COST: [7] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: The target is compelled[hard] to make a renew the heart ability. On failure, suffer [-2] to strike rolls and speed until the end of their next turn, or resists effects. KEYWORDS: HEX | MAGIC | FROST",
    "manaCost": 7,
    "keywords": [
      "HEX",
      "MAGIC",
      "FROST"
    ]
  },
  "Icy Tomb": {
    "name": "Icy Tomb",
    "lore": "Frost",
    "flavor": "A prison of frost closes around the living, sealing motion in silence.",
    "rules": "COST: [12] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: The target is compelled[difficult] to use the renew the heart ability. On failure, reduce target’s speed to [1], suffer [-2] to strike and ward rolls. Additionally, reduce all healing effects that restore health by [-2] and increase all damage suffered by [+2]. DURATION: This effect lasts [1d10/2] rounds, effects end at the start of the round. RESTRICTION: LETHAL DAMAGE suffered is not effected by this spell effect. KEYWORDS: HEX | MAGIC | FROST | ANCHOR",
    "manaCost": 12,
    "keywords": [
      "HEX",
      "MAGIC",
      "FROST",
      "ANCHOR"
    ]
  },
  "Scary Face": {
    "name": "Scary Face",
    "lore": "Hallows",
    "flavor": "A malevolent grin embodies the sinister nature of the Hallows, leaving its victims trembling and faltering in their focus.",
    "rules": "COST: [0] mana TRIGGER: When you successfully cast any lore of hallows spell. DECLARE: Choose [1] enemy character within [5] squares. EFFECT: Reduce the target’s mana regeneration at the start of the next round by [-1] plus one-half the value of their magic level. RESTRICTIONS: A character cannot be affected by multiple instances of scary face from different sources. KEYWORDS: HEX | MAGIC | HALLOWS | SIGNATURE",
    "manaCost": 0,
    "keywords": [
      "HEX",
      "MAGIC",
      "HALLOWS",
      "SIGNATURE"
    ]
  },
  "Soulfire Bolt": {
    "name": "Soulfire Bolt",
    "lore": "Hallows",
    "flavor": "A chilling bolt of haunted energy rips through the veil, searing flesh and unraveling sanity.",
    "rules": "COST: [5] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: The target suffers [8] psychic damage and is compelled[medium] to use the renew the heart ability. On failure, they suffer an additional [2] lethal psychic damage. EMPOWER: Spend [+2] additional mana. Increase damage by [+2]. KEYWORDS: COMBAT | MAGIC | HALLOWS",
    "manaCost": 5,
    "keywords": [
      "COMBAT",
      "MAGIC",
      "HALLOWS"
    ]
  },
  "Hex Of Misfortune": {
    "name": "Hex Of Misfortune",
    "lore": "Hallows",
    "flavor": "The Hallows twist the strands of fate, cursing your foe with wretched luck.",
    "rules": "COST: [3] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: The target gains [-1] to using renew the heart until the end of the next round. EMPOWER: Spend [+2] additional mana. Reduce the target’s ward by [-2] and extend the duration to [2] rounds. KEYWORDS: HEX | MAGIC | HALLOWS",
    "manaCost": 3,
    "keywords": [
      "HEX",
      "MAGIC",
      "HALLOWS"
    ]
  },
  "Eerie Apparition": {
    "name": "Eerie Apparition",
    "lore": "Hallows",
    "flavor": "A spectral vision of doom rises before your foe, driving terror deep into their mind.",
    "rules": "COST: [5] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: The target is compelled[medium] to use the renew the heart ability. On failure, they move [3] squares in any direction away from you. If they cannot move or be moved, they suffer [2] lethal psychic damage instead. DRIVING FEAR: At the start of the next round, the target is compelled[easy] to use the renew the heart ability. On failure, they move [2] squares in any direction away from you. If they cannot move or be moved, they suffer [2] lethal psychic damage instead. KEYWORDS: HEX | MAGIC | HALLOWS",
    "manaCost": 5,
    "keywords": [
      "HEX",
      "MAGIC",
      "HALLOWS"
    ]
  },
  "Shroud Of Despair": {
    "name": "Shroud Of Despair",
    "lore": "Hallows",
    "flavor": "You cloak your ally in the wailing fog of the Hallows, turning despair into protection.",
    "rules": "COST: [5] mana DECLARE: Target [1] ally character within [5] squares. EFFECT: The target applies [-2] to all strike rolls against them, until the end of the next round. RESTRICTIONS: A character cannot be affected by multiple instances of shroud of despair from different sources. KEYWORDS: AUGMENT | MAGIC | HALLOWS",
    "manaCost": 5,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "HALLOWS"
    ]
  },
  "Spectral Grasp": {
    "name": "Spectral Grasp",
    "lore": "Hallows",
    "flavor": "Your hand becomes a conduit of nightmare energy, reaching through the veil to rend flesh and spirit alike.",
    "rules": "COST: [8] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: The target is compelled[easy] to use the renew the heart ability. On failure, deal [7] psychic damage, or on success deal half damage EMPOWER: Spend [+2] additional mana. Increase the compelled target to [medium]. KEYWORDS: COMBAT | MAGIC | HALLOWS",
    "manaCost": 8,
    "keywords": [
      "COMBAT",
      "MAGIC",
      "HALLOWS"
    ]
  },
  "Pierce The Veil": {
    "name": "Pierce The Veil",
    "lore": "Hallows",
    "flavor": "You draw your ally into the Hallows’ ethereal threshold, where nothing solid can harm them.",
    "rules": "COST: [6] mana DECLARE: Target [1] ally character within [5] squares. EFFECT: The target becomes ethereal until the start of your next turn. ETHEREAL: Target characters cannot use any abilities, suffer any damage or otherwise interact with the tangle world. RESTRICTIONS: A character cannot be affected by multiple instances of PIERCE THE VEIL. KEYWORDS: AUGMENT | MAGIC | HALLOWS | ANCHOR",
    "manaCost": 6,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "HALLOWS",
      "ANCHOR"
    ]
  },
  "Deathly Shadow": {
    "name": "Deathly Shadow",
    "lore": "Hallows",
    "flavor": "You command the Hallows’ gloom to devour your enemy’s courage and steady your ally’s defense.",
    "rules": "COST: [8] mana DECLARE: Target [1] ally within [5] squares. EFFECT: The target gain [+3] to ward and guts until the end of the round. EMPOWER: Spend [+2] additional mana. Increase the bonus to [+1] and extend the effect until the end of the next round. KEYWORDS: AUGMENT | MAGIC | HALLOWS",
    "manaCost": 8,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "HALLOWS"
    ]
  },
  "Spectral Reckoning": {
    "name": "Spectral Reckoning",
    "lore": "Hallows",
    "flavor": "You summon vengeful spirits to lash at the soul of your enemy.",
    "rules": "COST: [10] mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: The target is compelled[medium] to use the renew the heart ability. On failure, deal [9] psychic damage, or on success deal half damage EMPOWER: Spend [+2] additional mana. Increase the compelled target to [hard]. KEYWORDS: COMBAT | MAGIC | HALLOWS",
    "manaCost": 10,
    "keywords": [
      "COMBAT",
      "MAGIC",
      "HALLOWS"
    ]
  },
  "Orb Of Impurity": {
    "name": "Orb Of Impurity",
    "lore": "Hallows",
    "flavor": "A seething sphere of corruption poisons the very air around it.",
    "rules": "COST: [7] mana DECLARE: Select a point of origin within [5] squares. Target enemy characters within ORB[5] expanding from that point of origin. EFFECT: The target is compelled[medium] to use the renew the heart ability. On failure, the caster grants weakness[2] against a chosen damage type, until the end of the next around. Or on success, the target suffers lethal psychic damage. KEYWORDS: HEX | MAGIC | HALLOWS | ORB | ANCHOR",
    "manaCost": 7,
    "keywords": [
      "HEX",
      "MAGIC",
      "HALLOWS",
      "ORB",
      "ANCHOR"
    ]
  },
  "Vortex Of Shadows": {
    "name": "Vortex Of Shadows",
    "lore": "Hallows",
    "flavor": "The void awakens, howling with the cries of the lost.",
    "rules": "COST: [11] mana DECLARE: Select a point of origin within [5] squares. Target enemy characters within ORB[5] expanding from that point of origin. EFFECT: The target is compelled[difficult] to use the renew the heart ability. On failure, deal [8] psychic damage and gain condition[-2] on their initiative order position. Or on success, deal half damage. EMPOWER: Spend [+3] additional mana. Increase the initiative condition to [-4]. KEYWORDS: HEX | MAGIC | HALLOWS | ORB | ANCHOR",
    "manaCost": 11,
    "keywords": [
      "HEX",
      "MAGIC",
      "HALLOWS",
      "ORB",
      "ANCHOR"
    ]
  },
  "Chorus Of Harmony": {
    "name": "Chorus Of Harmony",
    "lore": "Harmony",
    "flavor": "The first note steadies the spirit; the second calls the world to listen.",
    "rules": "COST: [0] # TRIGGER: When you successfully cast any # spell. DECLARE: Choose [1] friendly character within [6] squares. EFFECT: The chosen character reduces the # cost of their next spell by [-1], to a minimum of [1]. RESTRICTIONS: A character cannot be affected by multiple instances of chorus of harmony from different sources. KEYWORDS: AUGMENT | MAGIC | HARMONY | SIGNATURE",
    "manaCost": null,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "HARMONY",
      "SIGNATURE"
    ]
  },
  "Ballad Of The Courageous": {
    "name": "Ballad Of The Courageous",
    "lore": "Harmony",
    "flavor": "A brave melody lifts hearts beyond fear and doubt.",
    "rules": "COST: [3] mana DECLARE: Target all ally characters within orb[6] of the caster. EFFECT: Each affected ally gains [+1] to all attribute saves until the end of the next round. KEYWORDS: AUGMENT | MAGIC | HARMONY | ORB",
    "manaCost": 3,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "HARMONY",
      "ORB"
    ]
  },
  "Note Of Force": {
    "name": "Note Of Force",
    "lore": "Harmony",
    "flavor": "A resonant tone ripples through the air, cracking armor and composure alike.",
    "rules": "COST: [5] mana DECLARE: Target [1] enemy character within [6] squares. EFFECT: Deal [7] direct arcane damage. The target is compelled[medium] to use the renew the heart ability. On failure, they gain [-2] to strike rolls until the end of their next turn. EMPOWER: Spend [+3] additional mana. If you do, increase range by [+2] squares and damage by [+2]. KEYWORDS: COMBAT | MAGIC | HARMONY",
    "manaCost": 5,
    "keywords": [
      "COMBAT",
      "MAGIC",
      "HARMONY"
    ]
  },
  "Hymn Of Scorn": {
    "name": "Hymn Of Scorn",
    "lore": "Harmony",
    "flavor": "Dissonance twists the heart, turning conviction to despair.",
    "rules": "COST: [5] mana DECLARE: Target [1] enemy character within [6] squares. EFFECT: Deal [5] direct arcane damage. The target is compelled[medium] to use the renew the heart ability. On failure, they gain [-2] to ward until the end of the next round. KEYWORDS: HEX | MAGIC | HARMONY",
    "manaCost": 5,
    "keywords": [
      "HEX",
      "MAGIC",
      "HARMONY"
    ]
  },
  "Melody Of Superiority": {
    "name": "Melody Of Superiority",
    "lore": "Harmony",
    "flavor": "A song of triumph that sharpens the mind and steadies the hand.",
    "rules": "COST: [7] mana DECLARE: Target all ally characters within ORB[5] of the caster. EFFECT: Each affected ally selects one of the following effects until the end of the next round: Agility: [+1] to prowess rolls. Strength: [+1] to might rolls. Endurance: [+1] to guts. Wisdom: [+1] to lore rolls. Heroism: [+1] to bravery rolls. Splendor: [+1] to all attribute saves. RESTRICTIONS: A character cannot be affected by multiple instances of melody of superiority from different sources. KEYWORDS: AUGMENT | MAGIC | HARMONY | ORB",
    "manaCost": 7,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "HARMONY",
      "ORB"
    ]
  },
  "Drums Of War": {
    "name": "Drums Of War",
    "lore": "Harmony",
    "flavor": "A thunderous rhythm drives the body to move before thought can follow.",
    "rules": "COST: [5] mana DECLARE: Target [1] friendly character within [6] squares. EFFECT: The target may, immediately, use the hero’s charge core ability with no mana cost. RESTRICTIONS: A character cannot be affected by multiple instances of war drums more than once per round. KEYWORDS: AUGMENT | MAGIC | HARMONY",
    "manaCost": 5,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "HARMONY"
    ]
  },
  "Ode To The Lores": {
    "name": "Ode To The Lores",
    "lore": "Harmony",
    "flavor": "A song that aligns every spell’s rhythm into one grand refrain.",
    "rules": "COST: [7] MANA DECLARE: Target [1] friendly character within [6] squares. EFFECT: The chosen character reduces the MANA cost of their next spell by [-2], to a minimum of [1]. RESTRICTIONS: A character cannot be affected by multiple instances of ode to the lores from different sources. KEYWORDS: AUGMENT | MAGIC | HARMONY | ANCHOR",
    "manaCost": 7,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "HARMONY",
      "ANCHOR"
    ]
  },
  "Chant Of Resilience": {
    "name": "Chant Of Resilience",
    "lore": "Harmony",
    "flavor": "Steady rhythm becomes a wall no blade can breach.",
    "rules": "COST: [9] mana DECLARE: Target all ally characters within ORB[6] of the caster. EFFECT: Each affected character gains [+2] to ward until the end of the round. RESTRICTIONS: A character cannot be affected by multiple instances of chant of resilience from different sources. KEYWORDS: AUGMENT | MAGIC | HARMONY | ORB",
    "manaCost": 9,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "HARMONY",
      "ORB"
    ]
  },
  "Song Of Storms": {
    "name": "Song Of Storms",
    "lore": "Harmony",
    "flavor": "A tempest answers the crescendo of your voice.",
    "rules": "COST: [10] mana DECLARE: Target all enemy characters within ORB[5] centered on a point of origin within [5] squares. EFFECT: Each target is compelled[difficult] to use the renew the heart ability. On failure, deal [7] direct lightning damage and apply [-2] to speed until the end of the turn. ROLLING STORM: Characters still within the orb at the start of the round suffer the effects again. Reduce the compelled target difficulty by [1] each time a character is required to take it, minimum compelled[EASY]. DURATION: This effect lasts [1d10/2] rounds, effects end at the start of the round. KEYWORDS: COMBAT | MAGIC | HARMONY | ORB | ANCHOR",
    "manaCost": 10,
    "keywords": [
      "COMBAT",
      "MAGIC",
      "HARMONY",
      "ORB",
      "ANCHOR"
    ]
  },
  "Symphony Of Valor": {
    "name": "Symphony Of Valor",
    "lore": "Harmony",
    "flavor": "Every heartbeat and breath joins in one chorus of courage.",
    "rules": "COST: [12] mana DECLARE: Target all ally characters within ORB[6] of the caster. EFFECT: Each affected ally restores HEALTH[+3] and gains [+2] to strike rolls until the end of their next turn. RESTRICTIONS: A character cannot be affected by multiple instances symphony of valor from different sources. KEYWORDS: AUGMENT | MAGIC | HARMONY | ORB",
    "manaCost": 12,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "HARMONY",
      "ORB"
    ]
  },
  "Regrowth": {
    "name": "Regrowth",
    "lore": "Life",
    "flavor": "The pulse of creation answers your call.",
    "rules": "COST: [0] mana TRIGGER: When you successfully cast any lore of life spell. DECLARE: Choose [1] ally character within [6] squares. EFFECT: The chosen character restores [+1] health. KEYWORDS: AUGMENT | MAGIC | LIFE | SIGNATURE",
    "manaCost": 0,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "LIFE",
      "SIGNATURE"
    ]
  },
  "Light Spear": {
    "name": "Light Spear",
    "lore": "Life",
    "flavor": "A radiant lance pierces shadow and mends the worthy.",
    "rules": "COST: [4] mana DECLARE: Target all characters within a LINE[5]. EFFECT: Enemy target(s) suffer [6] direct light damage. Ally characters restore [+2] health. KEYWORDS: COMBAT | MAGIC | LIFE | LINE",
    "manaCost": 4,
    "keywords": [
      "COMBAT",
      "MAGIC",
      "LIFE",
      "LINE"
    ]
  },
  "Divine Grasp": {
    "name": "Divine Grasp",
    "lore": "Life",
    "flavor": "The living world obeys your will to save—or to punish.",
    "rules": "COST: [6] mana DECLARE: Target [1] character within [6] squares. EFFECT: If the target is an enemy character, they are compelled[easy] to use the renew the heart ability. On failure, move the target up to [5] squares to an empty space of your choice, or on success [1] square. If the target is an ally, they may immediately use the stride core ability. KEYWORDS: MAGIC | LIFE | CONTROL",
    "manaCost": 6,
    "keywords": [
      "MAGIC",
      "LIFE",
      "CONTROL"
    ]
  },
  "Radiant Breath": {
    "name": "Radiant Breath",
    "lore": "Life",
    "flavor": "A wave of warmth restores the faithful and humbles the corrupt.",
    "rules": "COST: [6] mana DECLARE: Target all characters within a CONE[5]. EFFECT: If the target is an enemy character, they are compelled[easy] to use the renew the heart ability. On failure, enemy targets gain [-1] to strike. If the target is an ally, they gain [+1] to strike. KEYWORDS: AUGMENT | MAGIC | LIFE | CONE",
    "manaCost": 6,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "LIFE",
      "CONE"
    ]
  },
  "Touch Of Life": {
    "name": "Touch Of Life",
    "lore": "Life",
    "flavor": "Your hand carries the warmth of renewal to those fading from the world.",
    "rules": "COST: [9] mana DECLARE: Target [1] ally character within [6] squares who has [5] or less health EFFECT: The target immediately restores health[10]. RESTRICTIONS: A character cannot be affected by touch of life more than once per encounter. KEYWORDS: AUGMENT | MAGIC | LIFE | ANCHOR",
    "manaCost": 9,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "LIFE",
      "ANCHOR"
    ]
  },
  "Shield Of Protection": {
    "name": "Shield Of Protection",
    "lore": "Life",
    "flavor": "A luminous barrier rises between your ally and annihilation.",
    "rules": "COST: [8] mana DECLARE: Choose [1] ally character within [6] squares. EFFECT: The target gains [10] to guts until the end of the round. RESTRICTIONS: A character cannot be affected by multiple instances of shield of protection from different sources. KEYWORDS: AUGMENT | MAGIC | LIFE | ANCHOR",
    "manaCost": 8,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "LIFE",
      "ANCHOR"
    ]
  },
  "Mass Restoration": {
    "name": "Mass Restoration",
    "lore": "Life",
    "flavor": "Your voice becomes the heartbeat of the world, restoring all who hear it.",
    "rules": "COST: [9] mana DECLARE: Target all ally characters within orb[6]. EFFECT: Each target restores [+3] health. EMPOWER: Spend [+2] additional mana. If you do, increase restored health by [+2]. KEYWORDS: AUGMENT | MAGIC | LIFE | ORB",
    "manaCost": 9,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "LIFE",
      "ORB"
    ]
  },
  "Chant Of Sanctuary": {
    "name": "Chant Of Sanctuary",
    "lore": "Life",
    "flavor": "Your will becomes a ward that rejects harm and impurity.",
    "rules": "COST: [8] mana DECLARE: Target all ally characters within orb[6]. EFFECT: Targe(s) gain [+2] to ward and reduce all other negative conditions by [-1] until the end of the next round. KEYWORDS: AUGMENT | MAGIC | LIFE | ORB | ANCHOR",
    "manaCost": 8,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "LIFE",
      "ORB",
      "ANCHOR"
    ]
  },
  "Spare The Perishing": {
    "name": "Spare The Perishing",
    "lore": "Life",
    "flavor": "You reach across the threshold and pull a soul back from the brink.",
    "rules": "COST: [12] mana DECLARE: Target [1] ally character within [6] squares who has [5] or less health. EFFECT: The target completely restores their health to full value. RESTRICTIONS: A character cannot be affected by spare the perishing more than once per encounter. KEYWORDS: AUGMENT | MAGIC | LIFE | ANCHOR",
    "manaCost": 12,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "LIFE",
      "ANCHOR"
    ]
  },
  "Sanctuary": {
    "name": "Sanctuary",
    "lore": "Life",
    "flavor": "A radiant sphere envelops all within, sealing the wounded in peace.",
    "rules": "COST: [10] mana DECLARE: Create an orb[4] centered on the caster. EFFECT: Target(s) restore health[+2], gain [+2] to ward, and reduce all negative conditions to [0] for the duration. DURATION: This effect lasts [1d10/2] rounds, effects end at the start of the round. KEYWORDS: AUGMENT | MAGIC | LIFE | ORB | ANCHOR",
    "manaCost": 10,
    "keywords": [
      "AUGMENT",
      "MAGIC",
      "LIFE",
      "ORB",
      "ANCHOR"
    ]
  }
} as const
