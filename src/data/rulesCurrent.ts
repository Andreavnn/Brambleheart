import './beta032Content'
import { loreSpells } from './magicOptions'
import { ruleSourceDocuments, type RuleSourceBlock, type RuleSourceSection } from './rulesSource'
import { INVOCATION_CANTRIPS, RETIRED_OFFICIAL_SPELLS, SIGNATURE_SPELLS, canonicalSpellBaseMana } from '../rules/magicRules'
import { ADVENTURE_KIT_SELL_WP, STARTING_WEALTH_WP } from '../rules/economy'
import { WP_PER_SP } from '../rules/threadpieces'

/**
 * Canonical current-rules boundary.
 *
 * rulesSource.ts remains the generated transcription of the supplied source
 * documents. This module converts that one in-memory source object to the
 * current canonical rules before runtime consumers read it. Consumers import
 * this module so the normalized current rules remain the single runtime authority.
 */
const paragraph=(text:string):RuleSourceBlock=>({type:'paragraph',text})
const table=(...rows:string[][]):RuleSourceBlock=>({type:'table',rows})
const section=(heading:string,...blocks:RuleSourceBlock[]):RuleSourceSection=>({heading,blocks})

export const SPELL_HEART_DAMAGE_RULE='When a Spell adds Heart to a damage value, the Heart portion of that damage is Standard unless the Spell specifically states otherwise. The Spell’s printed damage value keeps its listed category and damage type. Heart is added once to the Spell’s primary damage only; On-Going, recurring, delayed, terrain, movement-triggered, reflected, and summon damage uses the printed value unless the rule explicitly says otherwise.'

const CURRENT_CORE_SECTIONS:RuleSourceSection[]=[
  section('Overview',table(['CORE ACTIONS'])),
  section('ABILITIES',
    paragraph('Core Actions are the shared starting actions available to every character. Abilities are the Traits, Talents, Spells, equipment effects, and other rules that can modify a Core Action or trigger from events created during its Ability Chain.'),
    paragraph('Every Ability Chain begins with a Core Action. An Ability may then modify that Core Action or trigger another Ability as its printed rules allow.'),
    paragraph('Unless otherwise stated, effects from the same named Ability or Spell do not stack. If a character would be affected by multiple instances of the same Ability or Spell at the same time, apply only one instance.'),
  ),
  section('KEYWORDS',
    paragraph('CORE: CORE identifies a Core Action. Each character may use one Core Instinct Action, one Core Move Action, one Core Combat Action, and one Core Reaction Action each round unless a more specific rule grants another use.'),
    paragraph('TOUCH: Close-range physical combat, normally resolved through Melee Strike.'),
    paragraph('SHOOT: Ranged physical combat, normally resolved through Range Strike.'),
    paragraph('MAGIC: Spellcasting and magical combat, normally resolved through Arcane Command.'),
    paragraph('INSTINCT: An Ability or Core Action used at its stated encounter timing, such as the start or end of a round or turn.'),
    paragraph('MOVE: Movement-related Abilities normally build from a Core Move Action.'),
    paragraph('COMBAT: Combat-related Abilities normally build from the character’s Core Combat Action. Melee Strike, Range Strike, and Arcane Command are the shared Core Combat Actions.'),
    paragraph('REACTIVE: A Reactive Ability can resolve only when its printed Trigger occurs and that character can spend their Reaction Core Action. Each character has one Reaction Core Action per round unless a specific rule grants another use.'),
    paragraph('PASSIVE: A rule that is always available or resolves automatically when its stated condition is met. Passive Abilities do not spend a Core Action unless a specific rule says otherwise.'),
  ),
  section('What Keywords Do',
    paragraph('Keywords tell you when an Ability can be used, which Core Action or event it relates to, and which other rules may interact with it.'),
    paragraph('Every Ability Chain begins with a Core Action. A specific character’s copy of an Ability can resolve only once during that Ability Chain, even if later events would make its Trigger valid again.'),
    paragraph('The same named Ability possessed by another character is a separate Ability instance and may resolve once in that chain. When no unresolved Ability instance has a legal Trigger, the Ability Chain ends.'),
  ),
  section('PASSIVE ABILITIES',
    paragraph('Passive Abilities do not normally spend Core Instinct, Move, Combat, or Reaction opportunities. They resolve whenever their Trigger, condition, or another rule instructs them to resolve. Renew the Heart is a shared Passive Core Action because another effect may Compel it or the character may use it when a rule permits.'),
  ),
  section('CORE ACTIONS',
    paragraph('Every character has the following Core Actions: Channel the Winds and Focused Will (Instinct); Stride, Swiftstride, and Hero’s Charge (Move); Melee Strike, Range Strike, and Arcane Command (Combat); Reaction (Reaction); and Renew the Heart (Passive).'),
    paragraph('During a normal round, a character may choose one Core Instinct Action, one Core Move Action, one Core Combat Action, and one Core Reaction Action. Reaction is spent only when an eligible Reactive Ability meets its printed Trigger.'),
  ),
]

const BATTLE_REPLACEMENTS:Record<string,RuleSourceSection>={
  'ROUNDS & TURNS':section('ROUNDS & TURNS',
    paragraph('At the start of each round, resolve the Start of Round sequence before beginning turns in Initiative Order.'),
    paragraph('START OF ROUND: First, each character may choose and resolve one eligible Core Instinct Action in Initiative Order. Second, apply effects that increase or decrease Magic Regen for this round. Third, each character restores Mana equal to their current Magic Regen, without exceeding Mana Pool unless a rule explicitly allows it. Then begin turns in Initiative Order.'),
  ),
  'TAKING YOUR TURN':section('TAKING YOUR TURN',
    paragraph('During your turn, you may use one Core Move Action and one Core Combat Action in either legal order. A rule may allow movement to be split, add movement, or modify the chosen Core Action.'),
    paragraph('Your Core Combat Action may be Melee Strike (Touch), Range Strike (Shoot), or Arcane Command (Magic). Using one spends that Core Combat opportunity for the round unless a specific rule explicitly grants another use.'),
  ),
  'PREFORMING ABILITIES':section('PREFORMING ABILITIES',
    paragraph('Every Ability Chain begins with a Core Action. Abilities from Talents, Traits, Spells, equipment, and other effects may modify that Core Action or trigger later in the chain.'),
    paragraph('A specific character’s copy of an Ability can resolve only once during the same Ability Chain. The same named Ability on another character is a separate Ability instance.'),
    paragraph('Reactive Abilities require the character to spend their Reaction Core Action. Each character has one Reaction Core Action per round unless another rule explicitly grants an additional use.'),
  ),
  'PERFORMING ABILITIES':section('PERFORMING ABILITIES',
    paragraph('Every Ability Chain begins with a Core Action. Abilities from Talents, Traits, Spells, equipment, and other effects may modify that Core Action or trigger later in the chain.'),
    paragraph('A specific character’s copy of an Ability can resolve only once during the same Ability Chain. The same named Ability on another character is a separate Ability instance.'),
    paragraph('Reactive Abilities require the character to spend their Reaction Core Action. Each character has one Reaction Core Action per round unless another rule explicitly grants an additional use.'),
  ),
  'MANA':section('MANA',
    paragraph('Mana Pool is the maximum Mana a character can normally hold and equals Magic Level + Spirit. Spirit is the Bravery modifier.'),
    paragraph('Magic Regen is the amount of Mana restored during the Start of Round sequence and equals Heart. Heart is Bravery Rank.'),
    paragraph('Characters begin an encounter with Mana equal to their Mana Pool. Normal restoration cannot increase Mana above Mana Pool unless a rule explicitly allows it.'),
    paragraph('Increase Magic Regen and Decrease Magic Regen modify the round’s normal restoration. Restore Mana immediately recovers spent Mana outside that restoration step.'),
  ),
  'COMBAT ABILITIES':section('COMBAT ABILITIES',
    paragraph('A character has one Core Combat Action each round. Melee Strike uses it as Touch combat, Range Strike uses it as Shoot combat, and Arcane Command uses it as Magic combat.'),
    paragraph('Combat Abilities from Talents, Traits, Spells, equipment, and other rules can modify or chain from the chosen Core Combat Action when their requirements and Triggers are met.'),
  ),
  'TO HIT':section('TO HIT',
    paragraph('Melee Strike: roll (3d10) + Brawl + condition(s) against the target’s (3d10) + Ward + condition(s). Brawl is the Might modifier. On a successful Melee Strike, add Fury to weapon damage where the action calls for it. Fury is Might Rank.'),
    paragraph('Range Strike: roll (3d10) + Aim + condition(s) against the target’s (3d10) + Ward + condition(s). Aim is the Agility modifier. On a successful Range Strike, add Accuracy to weapon damage. Accuracy is Agility Rank.'),
    paragraph('Magic Strike: roll (3d10) + Control + condition(s) against the target’s (3d10) + Ward + condition(s). Control is the Lore modifier plus applicable equipment bonuses. Spells that use Renew the Heart state that save in their own TO HIT field instead.'),
    paragraph('The defender wins ties unless a more specific rule states otherwise.'),
  ),
  'TO DAMAGE':section('TO DAMAGE',
    paragraph('When a successful attack, Ability, or Spell deals damage, use the damage value and additions printed by that action or effect. TOUCH, SHOOT, MAGIC, and other keywords describe how rules interact; keywords do not add damage by themselves.'),
    paragraph('Melee Strike adds Fury to the weapon’s damage and Range Strike adds Accuracy to the weapon’s damage. A damaging Spell adds Heart once to its primary damage value unless that Spell specifically states otherwise.'),
    paragraph('On-Going, recurring, delayed, terrain, movement-triggered, reflected, and summon damage is exactly the printed value. Do not add Heart, Fury, Accuracy, Power, weapon damage, or another Attribute-derived damage bonus to those later damage instances unless the rule explicitly says to add it.'),
    paragraph('After the incoming damage value is determined, apply Resistance, Weakness, Conditions, and other modifiers as their rules state, then subtract Guts according to the incoming Damage Category. Any damage remaining reduces Health.'),
  ),
  'DAMAGE CATEGORY':section('DAMAGE CATEGORY',
    paragraph('Damage Category determines how incoming damage interacts with Guts. There are three categories: Standard, Direct, and Lethal. Damage Category is separate from damage type; fire, frost, nature, and similar damage types describe the source or element rather than how Guts is applied.'),
    paragraph('STANDARD: Apply the target’s full Guts. If a Damage Category is not stated, the damage is Standard.'),
    paragraph('DIRECT: Reduce the target’s Guts value by half, rounding up, to a minimum of [1] Guts.'),
    paragraph('LETHAL: The damage bypasses the target’s Guts, including Guts from equipment, unless a more specific rule states otherwise. Conditions that independently modify the damage resolution still apply.'),
    paragraph('A damage type can appear with any category, such as Direct Fire damage. Damage type may interact with Resistance or Weakness, but it does not change the Damage Category unless a rule explicitly says it does.'),
  ),
  'TO SOAK':section('TO SOAK',
    paragraph('Guts reduces incoming damage whenever that damage category allows Guts. Guts equals Hide Rank plus applicable equipment bonuses, Conditions, Resistance, Weakness, and other modifiers.'),
    paragraph('Resolve the incoming damage value first, apply the Damage Category and Guts modifiers, then subtract the resulting Guts. Damage cannot be reduced below [0] by Guts.'),
  ),
}

const CURRENT_MAGIC_SECTIONS:RuleSourceSection[]=[
  section('Overview',table(['WINDS OF MAGIC'])),
  section('MAGIC POWER',
    paragraph('Magic Level measures a character’s breadth and capacity as a spellcaster. It increases Mana Pool because Mana Pool equals Magic Level + Spirit, and it determines how many Lore Spells and Invocation Spells the character knows. Magic Level does not add to Magic Regen.'),
    paragraph('Power equals Lore Rank. Power affects a spell only when that spell’s Damage or Effect explicitly says to add Power.'),
  ),
  section('KNOWN SPELLS',
    paragraph('A Signature Spell is gained from Lore Attunement and does not count among a character’s chosen Lore Spells.'),
    table(
      ['Magic Level','Lore Spells Known','Invocations Known'],
      ['1','2','2'],['2','3','2'],['3','4','3'],['4','5','3'],['5','7','4'],
      ['6','8','4'],['7','9','5'],['8','10','5'],['9','11','6'],['10','12','6'],
    ),
    paragraph('A character gains one Lore Spell at every new Magic Level. At Magic Level 5, they gain two Lore Spells instead of one. They gain one Invocation at Magic Levels 3, 5, 7, and 9.'),
    paragraph('Known-spell allowances are tracked directly by Magic Level.'),
  ),
  section('LORE ATTUNEMENT',
    paragraph('At Magic Level 1, choose one of the seven Magical Lores as your Lore Attunement. You automatically gain that Lore’s Signature Spell.'),
    paragraph('Ordinary spells from your attuned Lore reduce their Mana cost by [-2]. After all modifiers, an ordinary spell has a minimum final cost of [1] Mana.'),
  ),
  section('SIGNATURE',
    paragraph('Signature Spells are free triggered expressions of Lore Attunement. They display SIGNATURE instead of a Mana cost, do not count among Lore Spells Known, cannot be willingly cast unless their own rule explicitly says otherwise, and ignore Mana-cost modifiers including Mana Syphon.'),
  ),
  section('CANTRIPS',
    paragraph('Invocation Spells with an explicit base cost of [0] Mana are Cantrips. They display CANTRIP instead of 0 Mana and remain explicit zero-cost exceptions to the normal minimum spell cost.'),
  ),
  section('SPELL KEYWORDS',
    paragraph('MAGIC identifies a spell or spellcasting ability. Like other abilities in Brambleheart, spells use keywords to define how they function. A Lore keyword identifies the Lore of Magic from which the spell is derived, while other keywords describe the spell’s structure, effect, or method of application.'),
    paragraph('SIGNATURE identifies a spell that follows the Signature spell rules.'),
    paragraph('CANTRIP identifies a spell that follows the Cantrip rules.'),
    paragraph('ENHANCE identifies a beneficial magical effect, normally applied to a legal friendly subject.'),
    paragraph('HEX identifies a hostile magical effect. If the spell states that the subject is Compelled, the effect is normally resisted with Renew the Heart.'),
    paragraph('AREA OF EFFECT keywords, such as LINE, CONE, and ORB, define the shape or region affected by the spell.'),
    paragraph('SUMMON identifies a spell that creates or calls a summoned entity. A caster may have only one SUMMON spell active at a time. Casting another SUMMON spell ends the previous summon unless a more specific rule states otherwise.'),
  ),
  section('SPELL RESOLUTION',
    paragraph('AUTOMATIC: Self-targeting, willing-ally, utility, summon, object, and other non-hostile spell effects resolve without an attack roll unless the Spell specifically says otherwise.'),
    paragraph('MAGIC STRIKE: A Spell that calls for a Magic Strike uses (3d10) + Control + condition(s) against the target’s (3d10) + Ward + condition(s). For an area Spell, resolve the Magic Strike against each affected enemy separately unless that Spell says otherwise.'),
    paragraph('HEX: A Hex uses Renew the Heart at the difficulty printed by that Spell. Easy, Medium, Difficult, Hard, and Very Hard use the normal passive target values. Free Signature Hexes are not exempt from this rule unless their own Trigger explicitly resolves without a TO HIT check.'),
    paragraph('HYBRID: When a Spell uses both a Magic Strike and Renew the Heart, the Magic Strike controls the primary damage or initial hit. The separately printed Renew the Heart roll controls only the listed Hex, persistent, control, or secondary rider.'),
    paragraph('Half damage and other divided Spell values use the global rule for division: round down unless a more specific rule states otherwise.'),
  ),
  section('ENHANCES & HEXES',
    paragraph('ENHANCE: DECLARE a legal friendly or self target, then apply the Spell’s EFFECT and DURATION. An Enhance does not require a hostile TO HIT roll unless the Spell specifically says otherwise.'),
    paragraph('HEX: DECLARE a legal target. The target uses Renew the Heart at the Spell’s printed passive difficulty. Apply the listed ON FAILURE effect if that save fails.'),
    paragraph('A Spell may intentionally combine a Magic Strike with a Hex. When it does, the Spell states separately what the successful Strike does and what the Renew the Heart roll controls.'),
  ),
  section('SPELL DAMAGE',
    paragraph('Heart is added once to a Spell’s primary damage value unless the Spell specifically states otherwise. The Heart portion is Standard damage; the Spell’s printed damage value keeps its printed Damage Category and damage type.'),
    paragraph('On-Going damage is exactly the printed value. Later or repeated damage caused by a duration, start-of-round trigger, terrain, movement, reflection, summon, or another delayed event does not add Heart or another normal Strike-damage addition unless the Spell explicitly says it does.'),
    paragraph('A recurring Spell zone or movement trigger can affect the same character no more than once during a turn unless the Spell explicitly permits more. Start-of-round and start-of-turn recurring effects resolve only at their stated timing.'),
  ),
  section('SPELL RANGE',
    paragraph('Each spell states its legal target, range, and area. TOUCH originates at close range. DIRECT affects the declared target or point. LINE, CONE, and ORB use the shared Ability Targeting rules.'),
    paragraph('Arcane Command does not impose a universal enemy target or universal TO HIT roll; resolve targeting, TO HIT, saves, damage, effects, and duration from the chosen Spell Details.'),
  ),
]

const TALENTS:ReadonlyArray<{name:string;flavor:string;rules:string}>=[
  {name:`ANCHOR SPIRIT`,flavor:`Your presence steadies those who falter.`,rules:`COST: [1] Mana
TRIGGER: When an ally within [3] squares fails an Attribute Save.
EFFECT: That ally may reroll the Attribute Save with condition [-1]. They must use the new result.
KEYWORDS: REACTIVE | TALENT`},
  {name:`BATTLEBANE`,flavor:`You trust your body’s rhythm over the mind’s delay.`,rules:`COST: [1] Mana
TRIGGER: When an enemy within [3] squares uses a Combat ability with a declared target.
EFFECT: Move up to [2] squares toward that enemy. If you end adjacent to them, gain condition [+1] to your next Strike against that enemy until the end of the round.
KEYWORDS: REACTIVE | TALENT`},
  {name:`BEASTGRASP`,flavor:`You wield impossible weight as if born to it.`,rules:`EFFECT: You may wield one two-handed weapon in each hand. While doing so, suffer condition [-3] to physical Strike rolls and condition [-2] to Ward rolls.
KEYWORDS: PASSIVE | TOUCH | TALENT`},
  {name:`BLADE TEMPO`,flavor:`Your movements flow between strike and evasion, like wind through tall grass.`,rules:`EFFECT: While wielding a one-handed weapon in each hand and wearing light armor, gain condition [+1] to Ward rolls. During the first round of an encounter, enemies also suffer condition [-1] to Strike rolls made against you.
REQUIRES: Bond Of Blades Talent
KEYWORDS: PASSIVE | TALENT`},
  {name:`BLOOD OATH`,flavor:`Your promise binds tighter than steel.`,rules:`COST: [1] Mana
TRIGGER: When you or an ally within [3] squares would suffer [2] or more Lethal damage.
EFFECT: Split that Lethal damage evenly between you and that ally. If the damage cannot be divided evenly, the triggering character suffers the remaining damage.
REQUIRES: Hare’s Luck Talent
KEYWORDS: REACTIVE | TALENT`},
  {name:`BOND OF BLADES`,flavor:`Your blades weave one thought through two motions.`,rules:`EFFECT: While wielding a one-handed weapon in each hand, gain condition [+1] to melee Strike rolls.
KEYWORDS: PASSIVE | TOUCH | TALENT`},
  {name:`BREAKGRIP`,flavor:`Your strikes are a blur of precision and deception.`,rules:`TRIGGER: When using Melee Strike against an enemy wielding a weapon.
EFFECT: If your TO HIT result exceeds the target’s Ward result by [5+] and the Strike successfully deals damage, knock one weapon they are wielding into a square of your choice within [2] squares.
PICK UP: A character may retrieve the weapon by moving within, into, or through [1] square of its location.
KEYWORDS: PASSIVE | TOUCH | TALENT`},
  {name:`CURRENT OVERFLOW`,flavor:`When power runs too shallow, the current bites back.`,rules:`TRIGGER: After resolving an empowered single-target spell that successfully deals [2] or less total damage after reductions.
EFFECT: The target suffers [2] Lethal damage and you restore [1] Mana.
RESTRICTIONS: Apply this effect after all other damage and damage reductions from the spell.
KEYWORDS: REACTIVE | MAGIC | TALENT`},
  {name:`EVADING RETREAT`,flavor:`You turn your shield as you withdraw, letting defense and motion become one.`,rules:`TRIGGER: When a Combat ability targeting you misses while you are wielding a shield.
EFFECT: Move up to [3] squares.
RESTRICTIONS: This movement cannot end within [2] squares of an enemy unless another rule allows it.
KEYWORDS: REACTIVE | TALENT`},
  {name:`CLEAVE`,flavor:`One swing splits the battle wide.`,rules:`COST: [1] Mana
TRIGGER: Successfully dealing damage with Melee Strike.
EFFECT: Move up to [1] square and make an additional melee Strike against a second enemy.
RESTRICTIONS: You cannot target the same enemy more than once with this effect.
KEYWORDS: TOUCH | TALENT`},
  {name:`FIELDCRAFT`,flavor:`You refine one discipline until every motion in it cuts true.`,rules:`EFFECT: Choose one roll type when you take this Talent: Strike, Ward, Skill, or Attribute Save. When making that type of roll, an Exceptional Result is achieved on [7+].
RESTRICTIONS: You may take this Talent up to four times, choosing a different roll type each time.
KEYWORDS: PASSIVE | TALENT`},
  {name:`FIELD MEDIC`,flavor:`You’ve learned where to press, when to bind, and how to keep hearts beating in the chaos of battle.`,rules:`COST: [1] Mana
TRIGGER: When a character within [3] squares suffers damage.
EFFECT: Restore [+1] Health to that character after the triggering damage is resolved.
KEYWORDS: REACTIVE | TALENT`},
  {name:`FORESIGHT`,flavor:`You move as if the world itself warns you before danger strikes.`,rules:`TRIGGER: When an effect requires you to Renew the Heart.
EFFECT: Gain condition [+1] to that Attribute Save. If you succeed, gain condition [+1] to your next Strike roll before the end of your next turn.
KEYWORDS: PASSIVE | TALENT`},
  {name:`GUARDBREAKER`,flavor:`You’ve turned defense into offense, driving the rim of your shield into your foe with brutal precision.`,rules:`TRIGGER: Successfully dealing damage with Melee Strike while wielding a shield.
EFFECT: Force the target [1] square directly away from you and deal [1] Lethal damage to them.
KEYWORDS: PASSIVE | TOUCH | TALENT`},
  {name:`HAMMERFALL`,flavor:`Your strikes land with unrelenting ferocity, every swing a promise of ruin.`,rules:`TRIGGER: When using Melee Strike while wielding a single two-handed weapon.
EFFECT: On an Exceptional Result [8+], increase the total damage dealt by [+3].
OPEN DEFENCE: Reduce your Ward and Guts by [-3] until the start of your next turn.
REQUIRES: Warhowl Talent
KEYWORDS: PASSIVE | TOUCH | TALENT`},
  {name:`HARE’S LUCK`,flavor:`The world seems to pause, and you fall just outside of ruin’s reach.`,rules:`COST: [1] Mana
TRIGGER: When you would suffer Lethal damage.
EFFECT: Reduce the total Lethal damage by [-1].
KEYWORDS: REACTIVE | TALENT`},
  {name:`HEARTH TOUCH`,flavor:`Your spirit leaves traces of its light in every working.`,rules:`TRIGGER: When you cast a spell that restores Health or grants an Enhance.
EFFECT: One character affected by that spell gains condition [+1] to their next Attribute Save.
KEYWORDS: PASSIVE | MAGIC | TALENT`},
  {name:`HEARTSEEKER`,flavor:`Your eyes find the smallest openings, and your arrows never forget them.`,rules:`COST: [1] Mana
TRIGGER: When using Range Strike.
EFFECT: Reduce the range of the weapon used for that Range Strike by [3] squares. If the Range Strike successfully deals damage, increase its total damage by [+2].
KEYWORDS: SHOOT | TALENT`},
  {name:`HEARTHWALL`,flavor:`You fight shoulder to shoulder with your allies to form an unbroken wall.`,rules:`TRIGGER: While you are within [1] square of an ally and both characters are wielding shields.
EFFECT: You and that ally gain condition [+1] to Ward rolls against Shoot and Magic abilities.
RESTRICTIONS: A character cannot be affected by multiple instances of this effect.
KEYWORDS: PASSIVE | TALENT`},
  {name:`HEAVY DRAW`,flavor:`You steady your breath and commit every ounce of focus to a single devastating shot.`,rules:`COST: [1] Mana
TRIGGER: When using Range Strike.
EFFECT: Apply the effect of Breakgrip to that Range Strike.
RESTRICTIONS: Long Range cannot be used with this Range Strike.
REQUIRES: Breakgrip Talent
KEYWORDS: SHOOT | TALENT`},
  {name:`HEROIC SURGE`,flavor:`Before impact is not hesitation — it is the gathering of every heartbeat into one unstoppable step.`,rules:`COST: [2] Mana
TRIGGER: When using Hero’s Charge.
EFFECT: Increase the movement granted by Hero’s Charge by [+1] square and increase its damage bonus by [+1]. If you move at least half the movement granted by Hero’s Charge and then successfully deal damage to its target this turn, force that target [1] square directly away from you and deal [1] Lethal damage. If the target cannot be moved, deal [1] additional Lethal damage instead.
KEYWORDS: MOVE | TALENT`},
  {name:`HOLLOWING CLAW`,flavor:`You strike from silence, instinct, or distraction — the heart always finds the gap.`,rules:`COST: [2] Mana
TRIGGER: When using Melee Strike against an enemy that is also within [2] squares of one of your allies.
EFFECT: If the Melee Strike successfully deals damage, increase its total damage by [+1]. Increase this bonus by another [+1] for every [2] ranks of Agility you have.
RESTRICTIONS: You must be wielding a melee weapon.
KEYWORDS: TOUCH | TALENT`},
  {name:`HUNTER’S MARK`,flavor:`Every shot you loose follows intent more than aim.`,rules:`TRIGGER: When a ranged Strike achieves an Exceptional Result [8+].
EFFECT: Increase the total damage by [+1]. If the weapon deals Lethal damage, increase the total damage by [+2] instead.
KEYWORDS: PASSIVE | SHOOT | TALENT`},
  {name:`IRONHIDE`,flavor:`Your body moves in concert with metal and mail.`,rules:`EFFECT: Reduce Mana Syphon and Speed penalties applied by equipped armor by [1].
ARMOR MASTERY: You may take this Talent up to [3] times. Each time, increase the reduction by [+1].
KEYWORDS: PASSIVE | TALENT`},
  {name:`IRON WILL`,flavor:`You refuse to fall even when your body fails you.`,rules:`TRIGGER: When you are reduced to [0] Health.
EFFECT: After fully resolving the triggering effect, restore your Health to [1].
COOLDOWN: This Talent cannot be used again for [1d10/2+2] rounds.
KEYWORDS: REACTIVE | TALENT`},
  {name:`JUMPSTART`,flavor:`Your instincts fire before your mind can act — motion born of pure reflex.`,rules:`EFFECT: Your Initiative roll is Edged.
KEYWORDS: PASSIVE | TALENT`},
  {name:`KEEN EDGE`,flavor:`You fight by instinct and trained judgment, turning precision into rhythm.`,rules:`TRIGGER: Before making a roll.
EFFECT: You may make that roll Edged. If you do, your next roll of any type is Weighted.
COOLDOWN: This Talent cannot be used again for [1d10/2+1] rounds.
KEYWORDS: REACTIVE | TALENT`},
  {name:`MAGEBANE`,flavor:`You sense the rhythm of spellcraft and close the distance before it completes.`,rules:`COST: [1] Mana
TRIGGER: When an enemy within [3] squares uses a Magic ability with a declared target.
EFFECT: Move up to [2] squares toward the caster. If you end adjacent to them, they lose [1] Mana.
KEYWORDS: REACTIVE | TALENT`},
  {name:`OATH GUARD`,flavor:`You stand between the strike and its mark.`,rules:`COST: [2] Mana
TRIGGER: When an ally within [3] squares would suffer damage that reduces them to [0] Health.
EFFECT: Reduce that damage by [-3]. You then suffer [3] Lethal damage.
KEYWORDS: REACTIVE | TALENT`},
  {name:`PACK TACTICS`,flavor:`You move where allies move — a rhythm born of shared survival.`,rules:`TRIGGER: When an ally within [3] squares moves as part of a Combat ability.
EFFECT: Move up to [1] square. If you end within [1] square of that ally, you both gain condition [+1] to your next Strike roll against the enemy targeted by the triggering Combat ability until the end of the round.
KEYWORDS: REACTIVE | TALENT`},
  {name:`PAIR SHOT`,flavor:`You loose arrows in seamless rhythm, each following the breath before it.`,rules:`COST: [2] Mana
TRIGGER: When using Range Strike.
DECLARE: Choose a second legal enemy within the weapon’s normal range.
EFFECT: Resolve a separate TO HIT roll against each target using the same weapon. Each successful Strike deals the Range Strike’s normal damage.
RESTRICTIONS: Long Range cannot be used for either target.
KEYWORDS: SHOOT | TALENT`},
  {name:`POUNCER`,flavor:`You never waste the instant between defense and attack.`,rules:`TRIGGER: When an enemy within [3] squares fails a Ward roll.
EFFECT: Gain condition [+1] to your next Strike roll against that enemy until the end of the round.
KEYWORDS: REACTIVE | TALENT`},
  {name:`PULSE OF ATTUNEMENT`,flavor:`You learn to quiet your body and open your spirit to the flow of Mana around you.`,rules:`TRIGGER: When the first spell you cast each round from your attuned Lore is successful.
EFFECT: Restore [1] Mana.
KEYWORDS: PASSIVE | MAGIC | TALENT`},
  {name:`QUICK CAST`,flavor:`You’ve learned to loose energy with a thought, not a gesture.`,rules:`TRIGGER: When using Arcane Command, before paying the chosen spell’s Mana cost.
EFFECT: Reduce that spell’s Mana cost by [-2]. If you do, increase the Mana cost of the next spell you cast by [+3].
RESTRICTIONS: An ordinary spell’s final Mana cost cannot be reduced below [1].
COOLDOWN: This Talent cannot be used again for [1d10/2+1] rounds.
KEYWORDS: MAGIC | TALENT`},
  {name:`RAGEBOUND`,flavor:`Rage becomes rhythm; pain becomes purpose.`,rules:`COST: [1] Mana
TRIGGER: When using the Focused Will Core Action at the start of the round.
EFFECT: Gain condition [+1] to Strike rolls and [+1] to damage until the end of the round.
DEFENSELESS: Until the end of the round, your Ward and Guts are each reduced by [-1].
KEYWORDS: INSTINCT | TALENT`},
  {name:`RAMHORN`,flavor:`Your shield drives forward like a wall in motion, scattering your foes and shielding your advance.`,rules:`COST: [1] Mana
TRIGGER: When using Hero’s Charge while wielding a shield.
EFFECT: If you successfully deal damage to the target of Hero’s Charge this turn, force them [1] square directly away from you. If they move, deal [1] Lethal damage. If they cannot be moved, deal [2] Lethal damage instead.
REQUIRES: Guardbreaker Talent
KEYWORDS: MOVE | TALENT`},
  {name:`RHYTHM OF BLADES`,flavor:`You fight with a rhythm few can follow — one hand finishing what the other begins.`,rules:`EFFECT: While wielding a one-handed weapon in each hand, increase damage successfully dealt by Melee Strike by [+1].
REQUIRES: Bond Of Blades Talent
KEYWORDS: PASSIVE | TOUCH | TALENT`},
  {name:`ROOTED PAWS`,flavor:`You seize control of every struggle, bending your foe’s strength against them.`,rules:`TRIGGER: When you use the Grapple ability or are the target of the Grapple ability.
EFFECT: Gain condition [+2] to Grapple rolls and apply condition [-2] to the opposing Grapple roll.
KEYWORDS: COMBAT | PHYSICAL | TALENT`},
  {name:`SECOND CHANCES`,flavor:`You’ve learned to let thoughts move like water — nothing can hold.`,rules:`COST: [2] Mana
TRIGGER: When you fail an Attribute Save.
EFFECT: Reroll the Attribute Save with condition [-1]. You must use the new result.
KEYWORDS: REACTIVE | TALENT`},
  {name:`SHADOW FANG`,flavor:`You move through blind spots, turning every ally’s distraction into your opportunity.`,rules:`TRIGGER: When an ally within [3] squares uses a Combat ability against an enemy within [3] squares of you.
EFFECT: Move up to [1] square toward that enemy. If your next Melee Strike before the end of your next turn successfully deals damage to that enemy, deal [1] additional Lethal damage.
REQUIRES: Hollowing Claw Talent
KEYWORDS: REACTIVE | TALENT`},
  {name:`SHIELD HAND`,flavor:`You train your off-hand to move the Sapguard as easily as a second blade, letting its weight turn with your strikes rather than hinder them.`,rules:`EFFECT: When wielding a Sapguard while holding a weapon in each hand, you no longer suffer its [-1] penalty to melee and ranged Strike rolls.
KEYWORDS: PASSIVE | TALENT`},
  {name:`SKILLCRAFT`,flavor:`The steady hand refines what instinct begins.`,rules:`EFFECT: Choose [1] Skill you know with at least one Rank. Gain condition [+1] to Skill rolls using that Skill.
RESTRICTIONS: You may take this Talent up to four times, choosing a different Skill each time.
REQUIRES: Fieldcraft Talent
KEYWORDS: PASSIVE | TALENT`},
  {name:`SNAPSTEP`,flavor:`Your hand moves before thought — a blur that catches the first beat of battle.`,rules:`COST: [1] Mana
TRIGGER: When using the Focused Will or Channel the Winds Core Action at the start of the round.
EFFECT: Move up to [2] squares.
RESTRICTIONS: This movement cannot end within [2] squares of an enemy.
KEYWORDS: INSTINCT | TALENT`},
  {name:`SPELL BREAKER`,flavor:`The hum of magic finds no purchase in your iron will.`,rules:`EFFECT: Gain condition [+1] to Ward rolls against spells and Magic abilities. When you succeed on such a Ward roll, restore [1] Mana.
KEYWORDS: PASSIVE | TALENT`},
  {name:`SPELL CLEAVE`,flavor:`Your strike cuts through the threads of magic still clinging to your foe.`,rules:`COST: [1] Mana
TRIGGER: Successfully dealing damage with Melee Strike to an enemy that has cast an Enhance or Hex spell this round.
EFFECT: Choose one Enhance or Hex spell cast by that enemy this round and end its effects immediately. If there is no eligible spell to end, deal [2] Lethal damage to that enemy instead.
KEYWORDS: TOUCH | TALENT`},
  {name:`SPELLFORGE`,flavor:`You read the world’s magic through patterns others overlook.`,rules:`TRIGGER: When a spell cast through Arcane Command is successful.
EFFECT: Choose one: restore [1] Mana, or gain condition [+2] to the TO HIT roll of the next spell you cast before the end of the round.
KEYWORDS: MAGIC | TALENT`},
  {name:`SPELLWINDS`,flavor:`You’ve learned to weave motion and current into your casting.`,rules:`TRIGGER: When a spell cast through Arcane Command is successful.
EFFECT: Move up to [2] squares.
RESTRICTIONS: This movement cannot end within [2] squares of an enemy unless another rule allows it.
KEYWORDS: MAGIC | TALENT`},
  {name:`STEELWEAVER`,flavor:`You channel magic through the weight of steel.`,rules:`TRIGGER: When a spell or Magic ability that costs Mana successfully deals damage or applies an effect to another character.
EFFECT: Gain condition [+1] to your next Ward roll.
KEYWORDS: PASSIVE | MAGIC | TALENT`},
  {name:`STONEBLOOD`,flavor:`Your body is a fortress of will and endurance.`,rules:`EFFECT: Increase your maximum Health by [+2].
FORTIFIED: You may take this Talent a second time. If you do, increase your maximum Health by an additional [+3].
KEYWORDS: PASSIVE | TALENT`},
  {name:`STILLROOT`,flavor:`You are the line that does not fall.`,rules:`COST: [2] Mana
TRIGGER: When you are targeted by a Combat ability that requires a Ward roll.
EFFECT: Gain condition [+3] to that Ward roll. If the ability misses, move up to [2] squares after it resolves.
RESTRICTIONS: This movement cannot end within [2] squares of an enemy.
KEYWORDS: REACTIVE | TALENT`},
  {name:`SURE HAND`,flavor:`Weapons are extensions of your intent — no motion wasted.`,rules:`EFFECT: Choose one weapon type when you take this Talent: blade, hammer, spear, or bow. While wielding that type, gain condition [+1] to Strike rolls.
KEYWORDS: PASSIVE | TALENT`},
  {name:`THREADSEER`,flavor:`You link spellwork together in seamless rhythm.`,rules:`TRIGGER: After a spell cast through Arcane Command is successful.
EFFECT: You may cast one additional known non-Signature spell as part of the same Arcane Command. Increase that spell’s Mana cost by [+4].
COOLDOWN: This Talent cannot be used again for [1d10/2+1] rounds.
KEYWORDS: MAGIC | TALENT`},
  {name:`THUNDEROUS CHARGE`,flavor:`Your momentum pierces armor and resolve alike.`,rules:`TRIGGER: When using Hero’s Charge while wielding a weapon with the Penetration quality.
EFFECT: If you successfully deal damage to the target of Hero’s Charge this turn, deal [2] Lethal damage to that target. If a different enemy is adjacent to the target, deal [1] Lethal damage to that enemy.
KEYWORDS: MOVE | TALENT`},
  {name:`TITAN’S WAKE`,flavor:`Two great weapons become an avalanche of destruction in your hands.`,rules:`COST: [2] Mana
TRIGGER: When using Melee Strike while wielding [2] two-handed weapons.
EFFECT: Roll [1d10/2+1] and add the result to the total damage dealt by that Melee Strike.
REQUIRES: Beastgrasp Talent
KEYWORDS: TOUCH | TALENT`},
  {name:`TURNSTRIKE`,flavor:`Precision guides every motion — defense and strike flow in the same breath.`,rules:`COST: [2] Mana
TRIGGER: When you are targeted by a Combat ability while wielding only a one-handed weapon and no shield.
EFFECT: Increase your Ward against that ability by half the damage value of the weapon you are wielding.
KEYWORDS: REACTIVE | TALENT`},
  {name:`TWIN LINKED`,flavor:`Your motion is seamless, each hand echoing the rhythm of the other.`,rules:`COST: [1] Mana
TRIGGER: When using Melee Strike while wielding a one-handed weapon in each hand.
EFFECT: For that TO HIT roll, reroll each natural die result of [2] or lower once and use the new result.
REQUIRES: Bond Of Blades Talent
KEYWORDS: TOUCH | TALENT`},
  {name:`UNDYING RESOLVE`,flavor:`Your will endures beyond flesh.`,rules:`EFFECT: Gain condition [+1] to Attribute Saves against Compelled effects. When you succeed on an Attribute Save against a Compelled effect, restore [+1] Health.
KEYWORDS: PASSIVE | TALENT`},
  {name:`VICTORY ROAR`,flavor:`A single success ignites the will of those nearby.`,rules:`TRIGGER: When you reduce an enemy to [0] Health.
EFFECT: Allies within [3] squares gain condition [+1] to their next Attribute Save or Ward roll, whichever occurs first.
KEYWORDS: PASSIVE | TALENT`},
  {name:`WARD GUARD`,flavor:`Your shield shifts with the rhythm of each strike, turning force aside before it finds you.`,rules:`EFFECT: A shield you wield no longer grants its Guts bonus. Instead, add half of that bonus to your Ward rolls.
KEYWORDS: PASSIVE | TALENT`},
  {name:`WARHOWL`,flavor:`You drive forward with reckless conviction, turning pain into power.`,rules:`COST: [1] Mana
TRIGGER: When using Melee Strike.
EFFECT: You may suffer [2] Lethal damage. If you do, choose either condition [+2] to that Melee Strike’s TO HIT roll or [+2] to its total damage.
KEYWORDS: TOUCH | TALENT`},
  {name:`WARPATH`,flavor:`You move through the fray like a storm given form, each strike feeding the next.`,rules:`COST: [2] Mana
TRIGGER: Successfully dealing damage with the additional Strike granted by Wildchain.
EFFECT: Move up to [1] square and make one additional melee Strike against a different enemy with condition [-4] to the TO HIT roll.
RESTRICTIONS: The target cannot have been targeted by the triggering Melee Strike, Cleave, or Wildchain.
REQUIRES: Wildchain Talent
KEYWORDS: PASSIVE | TOUCH | TALENT`},
  {name:`WILDCHAIN`,flavor:`A flurry of strikes whirls around you — unstoppable and beautiful in its chaos.`,rules:`COST: [1] Mana
TRIGGER: Successfully dealing damage with the additional Strike granted by Cleave.
EFFECT: Move up to [1] square and make an additional melee Strike against a different enemy with condition [-2] to the TO HIT roll. If successful, deal an additional [2] Lethal damage.
RESTRICTIONS: The target cannot have been targeted by the triggering Melee Strike or Cleave.
REQUIRES: Cleave Talent
KEYWORDS: PASSIVE | TOUCH | TALENT`},
  {name:`WITCH HUNTER`,flavor:`Your instincts recoil against witchcraft — you lash out when magic turns toward you.`,rules:`TRIGGER: When an enemy within [3] squares targets you with a Magic ability.
EFFECT: Gain condition [+1] to your Ward roll against that ability. If you succeed on the Ward roll, the caster suffers [1] Lethal damage.
REQUIRES: Magebane Talent
KEYWORDS: REACTIVE | TALENT`},
]

const spellLoreByName=new Map(Object.entries(loreSpells).flatMap(([lore,names])=>names.map(name=>[name,lore] as const)))

const normalizeKeywordList=(value:string,currentSpell='')=>{
  const source=value.split('|').map(item=>item.trim().toUpperCase()).filter(Boolean)
    .map(item=>item==='AUGMENT'?'ENHANCE':item==='REACTION'?'REACTIVE':item)
  const role=['HEX','ENHANCE'].filter(item=>source.includes(item))
  const geometry=['TOUCH','DIRECT','LINE','CONE','ORB'].filter(item=>source.includes(item))
  const spellLore=spellLoreByName.get(currentSpell)
  const lore=spellLore==='Oath'?'OATHS':spellLore?.toUpperCase()
  const items=[...role,'MAGIC',...(lore?[lore]:[]),...geometry]
  if(SIGNATURE_SPELLS.has(currentSpell))items.push('SIGNATURE')
  if(INVOCATION_CANTRIPS.has(currentSpell))items.push('CANTRIP')
  return Array.from(new Set(items)).join(' | ')
}


const MAGIC_STRIKE_TEXT='Make a Magic Strike using (3d10) + Control + condition(s) against the target’s (3d10) + Ward + condition(s).'

const HEX_DIFFICULTY:Readonly<Record<string,string>>={
  'Infernal Rebuke':'Medium', 'Cascading Fire':'Medium', 'Sun Burst':'Medium', Detonation:'Medium',
  'Curse Of Patronus':'Easy', 'Moon Bolt':'Easy', 'Hallowing Thorns':'Easy', 'Breath Of Life':'Medium',
  'Word Of Challenge':'Medium', Oathkeeper:'Medium',
  Hypothermia:'Easy', 'Mind Freeze':'Easy', 'Biting Blade':'Easy', Frostbite:'Medium', 'Torrent Of Frost':'Medium', 'Polar Vortex':'Medium', 'Icy Tomb':'Difficult',
  'Scary Face':'Easy', 'Hex Of Misfortune':'Easy', 'Eerie Apparition':'Medium', 'Spectral Grasp':'Easy', 'Spectral Reckoning':'Medium', 'Vortex Of Shadows':'Medium',
  'Hymn Of Scorn':'Medium', 'Note Of Force':'Medium',
  'Divine Grasp':'Easy', 'Radiant Breath':'Easy',
}

const HYBRID_SPELLS=new Set(['Soulfire Bolt','Note Of Force','Hymn Of Scorn'])
const MAGIC_STRIKE_SPELLS=new Set(['Wyrd Bolt','Scorching Hand','Fire Bolt','Inferno Strike','Frost Shock','Ice Wall','Light Spear','Song Of Storms'])
const NO_TO_HIT_SPELLS=new Set(['Immolation'])
const PRIMARY_DAMAGE_SPELLS=new Set([
  'Wyrd Bolt','Scorching Hand','Fire Bolt','Infernal Rebuke','Inferno Strike','Cascading Fire','Sun Burst',
  'Curse Of Patronus','Moon Bolt','Hallowing Thorns','Breath Of Life',
  'Frost Shock','Frostbite','Torrent Of Frost','Ice Wall','Polar Vortex',
  'Soulfire Bolt','Spectral Grasp','Spectral Reckoning','Vortex Of Shadows',
  'Hymn Of Scorn','Note Of Force','Song Of Storms','Light Spear',
])

function renewTheHeartText(currentSpell:string,difficulty=HEX_DIFFICULTY[currentSpell]||'Medium'){
  return `Renew the Heart (${difficulty}) save.`
}

function currentSpellToHit(currentSpell:string,text:string){
  if(NO_TO_HIT_SPELLS.has(currentSpell))return''
  if(HYBRID_SPELLS.has(currentSpell))return MAGIC_STRIKE_TEXT
  if(MAGIC_STRIKE_SPELLS.has(currentSpell)){
    if(currentSpell==='Light Spear')return`${MAGIC_STRIKE_TEXT} Resolve this separately against each enemy in the Line; allied healing is Automatic.`
    if(currentSpell==='Ice Wall')return`${MAGIC_STRIKE_TEXT} Resolve this separately against each character initially hit by the Line. The terrain rider uses its separately printed Renew the Heart save.`
    if(currentSpell==='Song Of Storms')return`${MAGIC_STRIKE_TEXT} Resolve this separately against each enemy in the Orb. Rolling Storm uses its separately printed Renew the Heart save.`
    return MAGIC_STRIKE_TEXT
  }
  if(currentSpell==='Divine Grasp')return`Enemy target: ${renewTheHeartText(currentSpell)} Ally target: Automatic. No roll required.`
  if(currentSpell==='Radiant Breath')return`Enemy target: ${renewTheHeartText(currentSpell)} Ally target: Automatic. No roll required.`
  if(HEX_DIFFICULTY[currentSpell])return renewTheHeartText(currentSpell)
  return'Automatic. No roll required.'
}

function addHeartToPrimarySpellDamage(value:string,currentSpell:string){
  if(!PRIMARY_DAMAGE_SPELLS.has(currentSpell)||/\bHeart\s*\+/i.test(value))return value
  const pattern=/\b(Deal|Deals|Suffer|Suffers)\s+((?:an\s+)?additional\s+)?(\[[^\]]+\])\s+((?:(?:standard|direct|lethal)\s+)?(?:[A-Za-z][A-Za-z’'’-]*\s+)?damage)\b/i
  const match=pattern.exec(value)
  if(!match)return value
  const prefix=value.slice(0,match.index).toUpperCase()
  // Delayed/secondary damage is never promoted to primary damage merely because it is the first damage phrase in a paragraph.
  if(/\b(?:AFTERBURN|BURN|ROLLING STORM|DRIVING FEAR|DIFFICULT TERRAIN|ENGULF|DEFECTION|AT THE START|IF THEY CANNOT|REFLECT)\b/.test(prefix))return value
  const [whole,verb,additional,amount,damage]=match
  if(additional)return value
  const replacement=`${verb} Heart + ${amount} ${damage}`
  return value.slice(0,match.index)+replacement+value.slice(match.index+whole.length)
}

function setSpellToHitField(value:string,currentSpell:string){
  const toHit=currentSpellToHit(currentSpell,value)
  if(!toHit)return value.replace(/\s*\bTO HIT:\s*[^]*?(?=\b(?:COST|TRIGGER|DECLARE|TARGET|AREA|SAVE|HEX|ON FAILURE|EFFECT|DAMAGE|RESTRICTIONS?|DURATION|EMPOWER|COOLDOWN|AFTERBURN|PURIFY|REQUIRES|KEYWORDS):|$)/i,' ')
  const field=/\bTO HIT:\s*[^]*?(?=\b(?:COST|TRIGGER|DECLARE|TARGET|AREA|SAVE|HEX|ON FAILURE|EFFECT|DAMAGE|RESTRICTIONS?|DURATION|EMPOWER|COOLDOWN|AFTERBURN|PURIFY|REQUIRES|KEYWORDS):|$)/i
  return field.test(value)?value.replace(field,`TO HIT: ${toHit} `):value
}

function setBaseManaCost(value:string,currentSpell:string){
  if(!currentSpell||SIGNATURE_SPELLS.has(currentSpell)||INVOCATION_CANTRIPS.has(currentSpell))return value
  const cost=canonicalSpellBaseMana(currentSpell,null)
  if(cost===null)return value
  const field=/\bCOST:\s*\[?\d+\]?\s*(?:mana|MANA)\b/i
  return field.test(value)?value.replace(field,`COST: [${cost}] Mana`):value
}

function patchCurrentSpellRules(currentSpell:string,value:string){
  let text=value
  const replace=(from:RegExp,to:string)=>{text=text.replace(from,to)}
  if(spellLoreByName.get(currentSpell)==='Flames'){
    text=text.replace(/(DECLARE:[^.!?]*?within\s*)\[(?:5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20)\](\s+squares)/gi,'$1[4]$2')
    text=text.replace(/(point of origin within\s*)\[(?:5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20)\](\s+squares)/gi,'$1[4]$2')
    text=text.replace(/\bsmolder\b/gi,'Immolation')
  }
  switch(currentSpell){
    case 'Immolation':
      // Final Signature replaces Smolder. It has no second TO HIT because it triggers from a successfully resolved Flames spell.
      if(/\bTRIGGER:/i.test(text))text='TRIGGER: When you successfully resolve any Lore of Flames Spell against a target. DECLARE: Choose [1] target successfully affected by the triggering Spell. EFFECT: The target gains Immolation until the start of the next round. Each time that character is successfully affected by another Lore of Flames Spell before Immolation ends, it suffers [1] Lethal On-Going fire damage. RESTRICTIONS: A single character can trigger Immolation a maximum of [3] times per round. KEYWORDS: HEX | MAGIC | FLAMES | SIGNATURE'
      else if(/^RESTRICTIONS:/i.test(text.trim()))text=''
      break
    case 'Scorching Hand':
      replace(/Deal \[6\] direct fire damage/i,'Deal [6] Direct fire damage')
      break
    case 'Blazing Weapon':
      replace(/\[1\] lethal fire damage at the start of the following round/gi,'[1] Lethal On-Going fire damage at the start of the following round')
      break
    case 'Fire Bolt':
      replace(/Deal \[7\] direct fire damage/i,'Deal [7] Direct fire damage')
      if(/^PURIFY:/i.test(text.trim()))text='PURIFY: If the target has Undeath, Flammable, Curse, Disease, Corruption, or Unclean, increase this Spell’s printed damage by [+4].'
      break
    case 'Infernal Rebuke':
      replace(/Deal \[3\] lethal fire damage/i,'Deal [3] Lethal fire damage')
      text=text.replace(/EFFECT:\s*Deal /i,'EFFECT: On a failed save, deal ')
      text=text.replace(/KEYWORDS:\s*HEX\s*\|\s*COMBAT/i,'KEYWORDS: HEX')
      break
    case 'Inferno Strike':
      replace(/COST:\s*\[7\]\s*mana/i,'COST: [6] Mana')
      replace(/Deal \[5\] direct fire damage/i,'Deal [4] Direct fire damage')
      replace(/BURNED:/i,'BURN:')
      replace(/\[2\] lethal fire damage at the start of the following round/i,'[1] Lethal On-Going fire damage at the start of the following round')
      replace(/DURATION: This effect lasts \[1d10\/2\] rounds, effects end at the start of the round\./i,'DURATION: This effect lasts [1d10/2] rounds, ending at the start of the resulting round.')
      break
    case 'Cascading Fire':
      replace(/compelled\[difficult\]/i,'compelled[medium]')
      replace(/\[5\] direct fire damage/i,'[5] Direct fire damage')
      replace(/\[2\] lethal fire damage/i,'[2] Lethal On-Going fire damage')
      text=text.replace(/EFFECT:\s*The target\(s\) are compelled\[medium\] to make a Renew the Heart Core Action\.\s*On failure,\s*/i,'EFFECT: On a failed save, ')
      if(/^ENGULF:/i.test(text.trim()))text='ENGULF: A character that enters or moves through the Orb suffers [2] Lethal On-Going fire damage. ENGULF can damage the same character only once per turn.'
      break
    case 'Sun Burst':
      replace(/\[2\] lethal fire/i,'[1] Lethal fire')
      text=text.replace(/EFFECT:\s*The target is compelled\[medium\] to use the Renew the Heart Core Action\.\s*On failure,\s*/i,'EFFECT: On a failed save, ')
      text=text.replace(/targets suffer \[1\] Lethal fire and/i,'targets suffer [1] Lethal fire damage and')
      break
    case 'Detonation':
      if(/\bCOST:/i.test(text))text='COST: [9] Mana DECLARE: Target [1] enemy character within [4] squares. TO HIT: Renew the Heart (Medium) save. EFFECT: On the initial failed save, roll [1d10] and consult the Detonation results. The first damaging result adds Heart once; damage from later Detonation checks is On-Going and uses exactly the printed value. BURST (1–3): Deal [3] Lethal fire damage immediately. At the start of the next round, the target makes another Medium Renew the Heart save; on failure, roll on the Detonation table again. PRESSURE (4–7): Nothing happens immediately. At the start of the next round, the target makes another Medium Renew the Heart save; on failure, roll on the Detonation table again, and on success the Spell ends. CATASTROPHE (8–10): Deal [6] Lethal fire damage immediately and the Spell ends. RESTRICTIONS: Damage caused by a later Detonation check is On-Going damage and uses exactly the printed value. DURATION: This effect lasts [1d10/2+1] rounds, ending at the start of the resulting round. KEYWORDS: HEX | MAGIC | FLAMES'
      else if(/^(?:1[–-]3|4[–-]6|7[–-]9|10|DURATION:)/i.test(text.trim()))text=''
      break

    case 'Curse Of Patronus':
      replace(/compelled\[medium\]/i,'compelled[easy]')
      replace(/\[3\] lethal nature damage/i,'[3] Lethal nature damage')
      text=text.replace(/EFFECT:\s*Each target is compelled\[easy\] to use the Renew the Heart Core Action\.\s*On failure,\s*/i,'EFFECT: Each target that fails the save ')
      text=text.replace(/Each target that fails the save (?:they )?suffers? \[3\] Lethal nature damage and gain \[-1\] when rolling strike with any magic abilities/i,'Each target that fails the save suffers [3] Lethal nature damage and gains [-1] to Strike rolls made with Magic Abilities')
      break
    case 'Moon Bolt':
      replace(/COST:\s*\[6\]\s*mana/i,'COST: [7] Mana')
      replace(/\[10\] direct nature damage/i,'[8] Direct nature damage')
      text=text.replace(/EFFECT:\s*The target is compelled\[easy\] to use the Renew the Heart Core Action\.\s*On failure,\s*deal /i,'EFFECT: On a failed save, deal ')
      text=text.replace(/;\s*on success,\s*deal half damage/i,'. On a successful save, suffer half that damage, rounded down')
      break
    case 'Hallowing Thorns':
      text=text.replace(/EFFECT:\s*Each enemy within the orb is compelled\[easy\] to use the Renew the Heart Core Action\.\s*On failure,\s*/i,'EFFECT: Each enemy that fails the save ')
      text=text.replace(/Any characters moving through them are compelled(?:\[easy\])? to use the Renew the Heart Core Action\. On failure they suffer \[2\] lethal nature damage\./i,'A character moving through those squares makes an Easy Renew the Heart save. On failure, it suffers [1] Lethal On-Going nature damage. This terrain damage can affect the same character only once per turn.')
      break
    case 'Wild Shape':
      replace(/COST:\s*\[9\]\s*mana/i,'COST: [6] Mana')
      break
    case 'Breath Of Life':
      replace(/COST:\s*\[12\]\s*mana/i,'COST: [10] Mana')
      replace(/\[4\] lethal nature damage/i,'[3] Lethal nature damage')
      text=text.replace(/EFFECT:\s*Each target is compelled\[medium\] to use the Renew the Heart Core Action\.\s*On failure,\s*/i,'EFFECT: Each target that fails the save ')
      break
    case 'Call Of The Beast':
      replace(/COST:\s*\[10\]\s*mana/i,'COST: [11] Mana')
      text=text.replace(/The beast is added to the initiative order immediately your turn/i,'The beast is added to the Initiative Order immediately after your turn')
      if(/one summon spell active/i.test(text))text=text.replace(/RESTRICTIONS:[^K]*?(?=KEYWORDS:)/i,'RESTRICTIONS: A caster may only have one summon Spell active at a time. Casting another summon Spell ends the previous summon unless otherwise stated. Damage dealt by the summoned beast uses its own profile and never adds the summoner’s Heart. ')
      else text=text.replace(/KEYWORDS:/i,'RESTRICTIONS: A caster may only have one summon Spell active at a time. Casting another summon Spell ends the previous summon unless otherwise stated. Damage dealt by the summoned beast uses its own profile and never adds the summoner’s Heart. KEYWORDS:')
      break

    case 'Thunder’s Fury':
      replace(/Increase the target weapons Damage by \[\+2\]/i,'Increase the target weapon’s damage by [+1]')
      replace(/RESTRICTION:[^K]*?(?=KEYWORDS:)/i,'')
      text=text.replace(/\bFLAMES\b/gi,'OATHS')
      text=text.replace(/damage type to lighting/gi,'damage type to lightning')
      text=text.replace(/\[1\] lethal light damage at the start of the following round/gi,'[1] Lethal On-Going lightning damage at the start of the following round')
      break
    case 'Wind Scaring':
      replace(/COST:\s*\[5\]\s*mana/i,'COST: [4] Mana')
      replace(/Increase the target weapons damage by \[\+2\]/i,'Increase the target weapon’s damage by [+1]')
      if(/^DUALING ELEMENTS:/i.test(text.trim()))text=''
      if(/^THUNDERSTORM:/i.test(text.trim()))text='THUNDERSTORM: If the target weapon is affected by both Thunder’s Fury and Wind Scaring, increase the total bonus damage from the combined effects by [+1]. Do not increase each Spell independently. The weapon retains both damage types for the duration. KEYWORDS: ENHANCE | MAGIC | OATHS'
      break
    case 'Word Of Challenge':
      text=text.replace(/EFFECT:\s*The target is compelled\[medium\] to use the Renew the Heart Core Action\.\s*On failure,\s*/i,'EFFECT: On a failed save, ')
      break
    case 'Power Word: Reinforcement':
      text=text.replace(/(EFFECT:[^K]*?)(?=KEYWORDS:)/i,'$1 DURATION: Until the target suffers its next incoming damaging attack, or until the start of its next turn, whichever comes first. ')
      break
    case 'Primal Surge': replace(/COST:\s*\[8\]\s*mana/i,'COST: [7] Mana'); break
    case 'The Immortal Warrior':
      replace(/COST:\s*\[10\]\s*mana/i,'COST: [9] Mana')
      if(/^DEFECTION:/i.test(text.trim()))text='DEFECTION: Once per round, when you are the target of a damaging attack, make a Medium Renew the Heart save. On failure, resolve the attack normally. On success, suffer no damage and reflect half the intended damage back at the attacker, rounded down. Reflected damage uses exactly the reflected value and does not add Heart. KEYWORDS: ENHANCE | MAGIC | OATHS'
      break
    case 'Oathkeeper':
      replace(/COST:\s*\[12\]\s*mana/i,'COST: [10] Mana')
      text=text.replace(/EFFECT:\s*Each target is compelled\[medium\] to use the Renew the Heart Core Action\.\s*On failure,\s*/i,'EFFECT: Each target that fails the save ')
      text=text.replace(/Each target that fails the save (?:has )?their outgoing damage against targets other than the caster is reduced by/i,'Each target that fails the save has its outgoing damage against targets other than the caster reduced by')
      text=text.replace(/KEYWORDS:\s*ENHANCE/i,'KEYWORDS: HEX')
      break

    case 'Hypothermia':
      text=text.replace(/EFFECT:\s*/i,'EFFECT: On a failed save, ')
      text=text.replace(/(?=KEYWORDS:)/i,'RESTRICTIONS: A single character can suffer a maximum of [3] Hypothermia applications per round. ')
      break
    case 'Mind Freeze':
      text=text.replace(/EFFECT:\s*The target is compelled\[easy\] to use the Renew the Heart Core Action\.\s*On failure,\s*/i,'EFFECT: On a failed save, ')
      break
    case 'Biting Blade':
      replace(/COST:\s*\[5\]\s*mana/i,'COST: [4] Mana')
      text=text.replace(/EFFECT:\s*/i,'EFFECT: On a failed save, ')
      break
    case 'Frost Shock': replace(/\[5\] direct cold DAMAGE/i,'[5] Direct cold damage'); break
    case 'Frostbite':
      replace(/COST:\s*\[4\]\s*mana/i,'COST: [6] Mana')
      replace(/\[6\] direct cold damage/i,'[5] Direct cold damage')
      text=text.replace(/EFFECT:\s*The target is compelled\[medium\] to use the Renew the Heart Core Action\.\s*On failure,\s*/i,'EFFECT: On a failed save, ')
      text=text.replace(/, or on success, resist the Speed effect and suffer half damage, rounded down/i,'. On a successful save, resist the Speed effect and suffer half damage, rounded down')
      break
    case 'Torrent Of Frost':
      replace(/COST:\s*\[6\]\s*mana/i,'COST: [7] Mana')
      replace(/\[3\] lethal cold damage, or half as much on success/i,'[2] Lethal cold damage; on success suffer [1] Lethal cold damage instead')
      text=text.replace(/EFFECT:\s*The target\(s\) is compelled\[medium\] to use the Renew the Heart Core Action\.\s*On failure,\s*/i,'EFFECT: On a failed save, ')
      text=text.replace(/;\s*on success suffer \[1\] Lethal cold damage instead/i,'. On a successful save, suffer [1] Lethal cold damage instead')
      break
    case 'Ice Wall':
      replace(/COST:\s*\[7\]\s*mana/i,'COST: [8] Mana')
      replace(/\[4\] direct cold damage/i,'[4] Direct cold damage')
      text=text.replace(/EFFECT: Each target suffers \[4\] Direct cold damage and gain \[-2\] to their next roll made/i,'EFFECT: Each target successfully hit suffers [4] Direct cold damage and gains [-2] to their next roll made')
      text=text.replace(/Any characters moving through them are compelled\[medium\] to use the Renew the Heart Core Action\.\s*On failure they suffer \[2\] lethal cold damage/i,'A character moving through those squares makes a Medium Renew the Heart save. On failure, it suffers [1] Lethal On-Going cold damage. This terrain damage can affect the same character only once per turn.')
      break
    case 'Polar Vortex':
      replace(/\[3\] lethal cold damage/i,'[2] Lethal cold damage')
      text=text.replace(/EFFECT:\s*The target is compelled\[medium\] to use the Renew the Heart Core Action\.\s*On failure,\s*/i,'EFFECT: On a failed save, ')
      break
    case 'Icy Tomb':
      replace(/COST:\s*\[12\]\s*mana/i,'COST: [10] Mana')
      text=text.replace(/EFFECT:\s*The target is compelled\[difficult\] to use the Renew the Heart Core Action\.\s*On failure,\s*/i,'EFFECT: On a failed save, ')
      if(/DURATION:/i.test(text)&&!/REPEAT SAVE:/i.test(text))text=text.replace(/DURATION:/i,'REPEAT SAVE: At the start of the target’s turn, make a Medium Renew the Heart save. On success, Icy Tomb ends. DURATION:'); text=text.replace(/not effected by this spell effect/i,'not affected by this Spell')
      break

    case 'Scary Face':
      replace(/\[-1\] plus one-half the value of their magic level/i,'[-1]')
      text=text.replace(/EFFECT:\s*/i,'EFFECT: On a failed save, ')
      text=text.replace(/RESTRICTIONS:[^K]*?(?=KEYWORDS:)/i,'RESTRICTIONS: A character can only be affected by Scary Face once per round. ')
      break
    case 'Hex Of Misfortune':
      replace(/COST:\s*\[3\]\s*mana/i,'COST: [4] Mana')
      text=text.replace(/EFFECT:\s*/i,'EFFECT: On a failed save, ')
      break
    case 'Eerie Apparition':
      text=text.replace(/EFFECT:\s*The target is compelled\[medium\] to use the Renew the Heart Core Action\.\s*On failure,\s*/i,'EFFECT: On a failed save, ')
      text=text.replace(/DRIVING FEAR:\s*At the start of the next round, the target is compelled\[easy\] to use the Renew the Heart Core Action\.\s*On failure,\s*/i,'DRIVING FEAR: At the start of the next round, the target makes an Easy Renew the Heart save. On failure, ')
      text=text.replace(/\[2\] lethal psychic damage instead/gi,'[2] Lethal On-Going psychic damage instead')
      break
    case 'Shroud Of Despair': replace(/COST:\s*\[5\]\s*mana/i,'COST: [6] Mana'); break
    case 'Soulfire Bolt':
      if(/\bCOST:/i.test(text))text='COST: [6] Mana DECLARE: Target [1] enemy character within [5] squares. EFFECT: Deal [6] Standard psychic damage. SAVE: After a successful Magic Strike, the target makes a Medium Renew the Heart save. ON FAILURE: The target suffers an additional [1] Lethal psychic damage. EMPOWER: Spend [+2] additional Mana. Increase the primary damage by [+2]. KEYWORDS: COMBAT | MAGIC | HALLOWS'
      break
    case 'Spectral Grasp':
      replace(/COST:\s*\[8\]\s*mana/i,'COST: [7] Mana')
      replace(/deal \[7\] psychic damage, or on success deal half damage/i,'deal [7] Standard psychic damage, or on success suffer half that damage, rounded down')
      text=text.replace(/EFFECT:\s*The target is compelled\[easy\] to use the Renew the Heart Core Action\.\s*On failure,\s*/i,'EFFECT: On a failed save, ')
      text=text.replace(/, or on success suffer half that damage, rounded down/i,'. On a successful save, suffer half that damage, rounded down.')
      text=text.replace(/EMPOWER:\s*Spend \[\+2\] additional mana\.\s*Increase the compelled target to \[medium\]/i,'EMPOWER: Spend [+2] additional Mana. Increase the Renew the Heart difficulty from Easy to Medium')
      break
    case 'Spectral Reckoning':
      replace(/COST:\s*\[10\]\s*mana/i,'COST: [9] Mana')
      replace(/deal \[9\] psychic damage, or on success deal half damage/i,'deal [8] Standard psychic damage, or on success suffer half that damage, rounded down')
      text=text.replace(/EFFECT:\s*The target is compelled\[medium\] to use the Renew the Heart Core Action\.\s*On failure,\s*/i,'EFFECT: On a failed save, ')
      text=text.replace(/, or on success suffer half that damage, rounded down/i,'. On a successful save, suffer half that damage, rounded down.')
      replace(/Spend \[\+2\] additional mana\. Increase the compelled target to \[hard\]/i,'Spend [+3] additional Mana. Increase the Renew the Heart difficulty from Medium to Difficult')
      break
    case 'Vortex Of Shadows':
      replace(/COST:\s*\[11\]\s*mana/i,'COST: [10] Mana')
      replace(/compelled\[difficult\]/i,'compelled[medium]')
      replace(/deal \[8\] psychic damage/i,'deal [6] Standard psychic damage')
      text=text.replace(/EFFECT:\s*The target is compelled\[medium\] to use the Renew the Heart Core Action\.\s*On failure,\s*/i,'EFFECT: On a failed save, ')
      text=text.replace(/Or on success, deal half damage/i,'On a successful save, suffer half that damage, rounded down')
      text=text.replace(/On a successful save, suffer half damage, rounded down/i,'On a successful save, suffer half that damage, rounded down')
      break

    case 'Ballad Of The Courageous':
      replace(/orb\[6\]/ig,'ORB[5]')
      replace(/all attribute saves/ig,'Renew the Heart rolls')
      text=text.replace(/EFFECT:\s*Each affected ally gains \[\+1\] to Renew the Heart rolls until the end of the next round\./i,'EFFECT: Each affected ally gains [+1] to their next Renew the Heart roll.')
      text=text.replace(/(?=KEYWORDS:)/i,"DURATION: The bonus applies to the target’s next Renew the Heart roll, or until the start of their next turn, whichever comes first. ")
      break
    case 'Hymn Of Scorn':
      replace(/\[-2\] to ward/ig,'[-1] to Ward'); replace(/\[5\] direct arcane damage/i,'[5] Direct arcane damage')
      text=text.replace(/EFFECT:\s*Deal \[5\] Direct arcane damage\.\s*The target is compelled\[medium\] to use the Renew the Heart Core Action\.\s*On failure,\s*/i,'EFFECT: Deal [5] Direct arcane damage. SAVE: After a successful Magic Strike, the target makes a Medium Renew the Heart save. ON FAILURE: ')
      break
    case 'Note Of Force':
      replace(/\[7\] direct/i,'[6] Direct')
      replace(/\[-2\] to strike/ig,'[-1] to Strike')
      text=text.replace(/EFFECT:\s*Deal \[6\] Direct arcane damage\.\s*The target is compelled\[medium\] to use the Renew the Heart Core Action\.\s*On failure,\s*/i,'EFFECT: Deal [6] Direct arcane damage. SAVE: After a successful Magic Strike, the target makes a Medium Renew the Heart save. ON FAILURE: ')
      break
    case 'Drums Of War': replace(/COST:\s*\[5\]\s*mana/i,'COST: [6] Mana'); break
    case 'Chant Of Resilience': replace(/COST:\s*\[9\]\s*mana/i,'COST: [8] Mana'); break
    case 'Song Of Storms':
      replace(/DURATION: This effect lasts \[1d10\/2\] rounds, effects end at the start of the round\./i,'DURATION: This effect lasts [2] rounds.')
      text=text.replace(/EFFECT: Each target is compelled\[difficult\] to use the Renew the Heart Core Action\. On failure, deal \[7\] direct lightning damage and apply \[-2\] to speed until the end of the turn\./i,'EFFECT: Each enemy successfully hit suffers Heart + [7] Direct lightning damage and [-2] Speed until the end of the turn.')
      if(/^ROLLING STORM:/i.test(text.trim()))text='ROLLING STORM: At the start of the following round, each enemy still within the Orb makes an Easy Renew the Heart save. On failure, suffer [4] Direct On-Going lightning damage and the Speed reduction. This recurring damage uses exactly the printed value and does not add Heart. A character resolves Rolling Storm only once per round.'
      break
    case 'Symphony Of Valor': replace(/COST:\s*\[12\]\s*mana/i,'COST: [11] Mana'); break
    case 'Chorus Of Harmony':
      if(/\bCOST:|\bTRIGGER:/i.test(text))text='TRIGGER: When you successfully cast any Lore of Harmony Spell. DECLARE: Choose [1] friendly character within [6] squares. EFFECT: The chosen character reduces the Mana cost of their next Spell by [-1], to a minimum of [1]. RESTRICTIONS: A character cannot be affected by multiple instances of Chorus Of Harmony from different sources. KEYWORDS: ENHANCE | MAGIC | HARMONY | SIGNATURE'
      break
    case 'Melody Of Superiority':
      text=text.replace(/Prowess rolls/gi,'Agility rolls').replace(/Strength:/gi,'Might:').replace(/Endurance:/gi,'Hide:').replace(/Wisdom:/gi,'Lore:').replace(/Heroism:/gi,'Bravery:').replace(/Splendor:/gi,'Renew the Heart:').replace(/Renew the Heart: \[\+1\] to all attribute saves/gi,'Renew the Heart: [+1] to Renew the Heart rolls')
      break

    case 'Divine Grasp':
      replace(/COST:\s*\[6\]\s*mana/i,'COST: [5] Mana')
      text=text.replace(/EFFECT:\s*If the target is an enemy character, they are compelled\[easy\] to use the Renew the Heart Core Action\.\s*On failure, move the target up to \[5\] squares to an empty space of your choice, or on success \[1\] square\.\s*If the target is an ally, they may immediately use the Stride Core Action\./i,'EFFECT: Enemy: On a failed save, move the target up to [5] squares to an empty space of your choice; on a successful save, move the target [1] square. Ally: The target may immediately use the Stride Core Action.')
      break
    case 'Light Spear':
      replace(/COST:\s*\[4\]\s*mana/i,'COST: [5] Mana')
      replace(/\[6\] direct light damage/i,'[3] Direct light damage')
      text=text.replace(/EFFECT: Enemy target\(s\) suffer \[3\] Direct light damage\./i,'EFFECT: Each enemy successfully hit suffers [3] Direct light damage.')
      break
    case 'Radiant Breath':
      text=text.replace(/EFFECT:\s*If the target is an enemy character, they are compelled\[easy\] to use the Renew the Heart Core Action\.\s*On failure, enemy targets gain \[-1\] to strike\.\s*If the target is an ally, they gain \[\+1\] to strike\./i,'EFFECT: Enemy: On a failed save, the target suffers [-1] to Strike. Ally: The target gains [+1] to Strike.')
      break
    case 'Shield Of Protection':
      replace(/COST:\s*\[8\]\s*mana/i,'COST: [7] Mana')
      replace(/\[10\] to guts/i,'[+5] Guts')
      break
    case 'Touch Of Life': replace(/COST:\s*\[9\]\s*mana/i,'COST: [8] Mana'); break
    case 'Mass Restoration':
      replace(/Spend \[\+2\] additional mana/i,'Spend [+3] additional Mana')
      break
    case 'Sanctuary': replace(/COST:\s*\[10\]\s*mana/i,'COST: [11] Mana'); break

    case 'Spectral Armament':
      text=text.replace(/(?=KEYWORDS:)/i,'RESTRICTIONS: The summoned weapon obeys normal Might, hand, weapon, and equipment requirements. It cannot be sold or permanently retained. DURATION: Until the end of the encounter, until dismissed, or until ended by the universal Summon rule. ')
      break
    case 'Kinbound Call':
      replace(/COST:\s*\[1\]\s*mana/i,'COST: [2] Mana')
      break
    case 'Wyrd Bolt':
      replace(/COST:\s*\[2\]\s*mana/i,'COST: [3] Mana')
      break
    case 'Hearth Vow': text=text.replace(/\s*Lasts until combat ends\.?/i,''); break
  }


  text=text
    .replace(/Each target that fails the save they suffer/gi,'Each target that fails the save suffers')
    .replace(/Each enemy that fails the save they suffer/gi,'Each enemy that fails the save suffers')
    .replace(/Each target that fails the save sufferss/gi,'Each target that fails the save suffers')
    .replace(/Each target that fails the save suffer/gi,'Each target that fails the save suffers')
    .replace(/Each target that fails the save their outgoing damage/gi,'Each target that fails the save has their outgoing damage')
    .replace(/On a failed save, The target/gi,'On a failed save, the target')
    .replace(/On a failed save, Reduce/gi,'On a failed save, reduce')
    .replace(/On a failed save, they move/gi,'On a failed save, the target moves')
    .replace(/, or resists effects and half damage on successes\./gi,'. On a successful save, resist the Speed effect and suffer half that damage, rounded down.')
  return text
}

function safeSpellText(value:string,currentSpell='',addToHit=false){
  let text=String(value||'')
    .replace(/\bDECLEAR:/gi,'DECLARE:')
    .replace(/\bRESTICTIONS?:/gi,'RESTRICTIONS:')
    .replace(/\bREACTION\b/gi,'REACTIVE')
    .replace(/\bAUGMENTS\b/gi,'ENHANCES')
    .replace(/\bAUGMENT\b/gi,'ENHANCE')
    .replace(/\bSTRIKE:\s*/gi,'TO HIT: ')
    .replace(/\bEFFECT\s+(?=[A-Z])/g,'EFFECT: ')
    .replace(/\bhero(?:’|')s charge core ability\b/gi,'Hero’s Charge Core Action')
    .replace(/\bstride core ability\b/gi,'Stride Core Action')
    .replace(/\brenew the heart ability\b/gi,'Renew the Heart Core Action')
  text=setBaseManaCost(text,currentSpell)
  if(SIGNATURE_SPELLS.has(currentSpell))text=text.replace(/\bCOST:\s*\[?0\]?\s*mana\b\s*/gi,'')
  if(INVOCATION_CANTRIPS.has(currentSpell))text=text.replace(/\bCOST:\s*\[?0\]?\s*mana\b\s*/gi,'')
  text=patchCurrentSpellRules(currentSpell,text)
  // Generic spelling cleanup after spell-specific conversions and before primary Heart insertion.
  text=text.replace(/\bsufferss\b/gi,'suffers')
  if(currentSpell&&/\bTO HIT:/i.test(text))text=setSpellToHitField(text,currentSpell)
  if(addToHit&&currentSpell&&!NO_TO_HIT_SPELLS.has(currentSpell)&&!/\bTO HIT:/i.test(text)){
    const toHit=currentSpellToHit(currentSpell,text)
    const declare=text.match(/\bDECLARE:[^]*?(?=\b(?:EFFECT|TRIGGER|SUMMON|RESTRICTIONS?|DURATION|EMPOWER|KEYWORDS):|$)/i)
    if(declare)text=text.replace(declare[0],`${declare[0].trim()} TO HIT: ${toHit} `)
    else text=`TO HIT: ${toHit} ${text}`
  }
  if(currentSpell)text=addHeartToPrimarySpellDamage(text,currentSpell)
  text=text.replace(/\bKEYWORDS?:\s*([^\n]+)/gi,(_match,keywords:string)=>`KEYWORDS: ${normalizeKeywordList(keywords,currentSpell)}`)
  return text.replace(/\s{2,}/g,' ').trim()
}

function canonicalizeSpellDocument(documentKey:string){
  const doc=ruleSourceDocuments[documentKey]
  if(!doc)return
  const currentNames=new Map(Object.values(loreSpells).flat().map(name=>[name.toLowerCase(),name] as const))
  const retiredNames=new Set(Array.from(RETIRED_OFFICIAL_SPELLS).map(name=>name.toLowerCase()))
  let currentSpell=''
  let toHitAdded=false
  let skippingRetired=false
  doc.sections=doc.sections.map(sourceSection=>({
    ...sourceSection,
    blocks:sourceSection.blocks.map(block=>{
      if(block.type!=='paragraph')return skippingRetired?null:block
      const trimmed=block.text.trim()
      const lower=trimmed.toLowerCase()
      if(documentKey==='lore-flames'&&lower==='smolder'){
        currentSpell='Immolation';toHitAdded=false;skippingRetired=false
        return{...block,text:'Immolation'}
      }
      // The old ordinary Immolation is retired; the only current Immolation is the renamed Signature above.
      if((documentKey==='lore-flames'&&lower==='immolation')||retiredNames.has(lower)){
        currentSpell='';toHitAdded=false;skippingRetired=true;return null
      }
      const canonicalSpell=currentNames.get(lower)
      if(canonicalSpell){currentSpell=canonicalSpell;toHitAdded=false;skippingRetired=false;return{...block,text:canonicalSpell}}
      if(skippingRetired)return null
      const addToHit=Boolean(currentSpell&&!toHitAdded&&!NO_TO_HIT_SPELLS.has(currentSpell)&&/\b(?:DECLARE|TRIGGER|EFFECT|SUMMON):/i.test(block.text))
      if(addToHit)toHitAdded=true
      return{...block,text:safeSpellText(block.text,currentSpell,addToHit)}
    }).filter((block):block is RuleSourceBlock=>block!==null&&!(block.type==='paragraph'&&block.text.trim().length===0)),
  }))
}

function replaceBattleSections(){
  const doc=ruleSourceDocuments.battle
  if(!doc)return
  const seen=new Set<string>()
  doc.sections=doc.sections.map(sourceSection=>{
    const replacement=BATTLE_REPLACEMENTS[sourceSection.heading]
    if(replacement){seen.add(sourceSection.heading);return replacement}
    return sourceSection
  })
  for(const [heading,replacement] of Object.entries(BATTLE_REPLACEMENTS)){
    if(!seen.has(heading)&&heading!=='PERFORMING ABILITIES')doc.sections.push(replacement)
  }
}


function canonicalizeCurrentTerminology(){
  const currentText=(value:string)=>String(value||'')
    .replace(/\bAUGMENTS\b/g,'ENHANCES')
    .replace(/\bAugments\b/g,'Enhances')
    .replace(/\bAUGMENT\b/g,'ENHANCE')
    .replace(/\bAugment\b/g,'Enhance')
    .replace(/\bWhisperstep\b/g,'Whisperster')
    .replace(/\bTHE CORE ROLL\b/g,'THE RHYTHM ENGINE')
    .replace(/\bStealth (?:Condition|Penalty)\b/gi,'Armor Penalty')
    .replace(/(KEYWORDS?:\s*)ROOT\s*\|\s*/g,'$1')
    .replace(/\s*\|\s*ROOT(?=\s*(?:\||$))/g,'')
  for(const document of Object.values(ruleSourceDocuments)){
    document.sections=document.sections.map(sourceSection=>({
      ...sourceSection,
      heading:currentText(sourceSection.heading),
      blocks:sourceSection.blocks.map(block=>block.type==='paragraph'?{...block,text:currentText(block.text)}:{...block,rows:block.rows.map(row=>row.map(cell=>currentText(cell)))})
    }))
    if(/ARMOR&SHEILDS|ARMOR.*SHIELD/i.test(document.sourceFile)){
      document.sections=document.sections.map(sourceSection=>({
        ...sourceSection,
        blocks:sourceSection.blocks.map(block=>block.type==='paragraph'
          ? {...block,text:block.text.replace(/\bStealth Condition\b/gi,'Armor Penalty')}
          : {...block,rows:block.rows.map((row,rowIndex)=>row.map(cell=>rowIndex===0&&/^Stealth$/i.test(cell.trim())?'Armor Penalty':cell.replace(/\bStealth Condition\b/gi,'Armor Penalty')))}
        )
      }))
      if(!document.sections.some(sourceSection=>sourceSection.heading==='ARMOR PENALTY')){
        document.sections.splice(Math.min(2,document.sections.length),0,section('ARMOR PENALTY',paragraph('Armor protects the body at the cost of speed and silence. EFFECT: Add together the Armor Penalty from all equipped armor and shields. Reduce your Speed by the total Armor Penalty. Speed cannot be reduced below [1]. Apply the same total as a negative condition to all Whisperster Skill Checks. RESTRICTIONS: Only equipped armor and shields contribute to Armor Penalty. Armor Penalty does not apply to other Agility Skills unless another rule specifically says so. EXAMPLE: Root Weave (-2) plus Vinegrip (-1) produces Armor Penalty [-3]. A character with Speed [6] is reduced to Speed [3] and suffers condition [-3] to Whisperster Skill Checks. KEYWORDS: EQUIPMENT')))
      }
    }
  }
}


const STARTING_WEALTH_SP=STARTING_WEALTH_WP/WP_PER_SP
const ADVENTURE_KIT_SELL_SP=ADVENTURE_KIT_SELL_WP/WP_PER_SP
const MAX_STARTING_WEALTH_SP=STARTING_WEALTH_SP+ADVENTURE_KIT_SELL_SP

const CURRENT_SPARK_OVERVIEW=section('WHAT IS A SPARK?',
  paragraph('ROLEPLAY: A Spark is your personality archetype — the way your character tends to think, feel, and act. It is a roleplaying anchor that rewards a consistent personality without limiting what the character may attempt.'),
  paragraph('KEYWORDS: Every Spark uses two descriptive keywords. Premade Sparks provide their pair automatically; a custom Spark chooses any two from the current Spark Keyword Library.'),
  paragraph('DEEDS: When you complete a Deed that aligns with one or both of your Spark keywords, gain the Deed’s normal Experience reward plus [+3] bonus Experience.'),
)

function installCurrentSparkAndDeedRules(){
  const sparks=ruleSourceDocuments.sparks
  if(sparks)sparks.sections=sparks.sections.map(sourceSection=>sourceSection.heading==='WHAT IS A SPARK?'?CURRENT_SPARK_OVERVIEW:sourceSection)

  const deeds=ruleSourceDocuments.deeds
  if(!deeds)return
  const firstIndex=deeds.sections.findIndex(sourceSection=>sourceSection.heading==='DEEDS')
  const deedBlocks=deeds.sections.filter(sourceSection=>sourceSection.heading==='DEEDS').flatMap(sourceSection=>sourceSection.blocks)
  const resolutionBlocks=deeds.sections.find(sourceSection=>sourceSection.heading==='DEED RESOLUTION')?.blocks||[]
  const structuredResolution=resolutionBlocks.flatMap(block=>{
    if(block.type!=='paragraph')return[block]
    if(/^Each Deed has two paths/i.test(block.text))return[paragraph('COMPLETION: Each Deed has two valid paths to completion — narrative or mechanical.')]
    if(/^The narrative function/i.test(block.text))return[paragraph('NARRATIVE COMPLETION: A Deed may be fulfilled through story and character choice at the Watcher’s discretion. If the character’s actions clearly embody the Deed, the Watcher may declare it complete without requiring the listed mechanical objective.')]
    if(/^The mechanical function/i.test(block.text))return[paragraph('MECHANICAL COMPLETION: The listed objective provides a clear rules-based way to complete the same Deed through rolls, Abilities, or defined actions.')]
    if(/^Together, these paths/i.test(block.text))return[]
    return[block]
  })
  const merged=section('DEEDS',...deedBlocks,...structuredResolution)
  const remaining=deeds.sections.filter(sourceSection=>sourceSection.heading!=='DEEDS'&&sourceSection.heading!=='DEED RESOLUTION')
  remaining.splice(Math.max(0,firstIndex),0,merged)
  deeds.sections=remaining
}

const CURRENT_CHARACTER_CREATION_SECTIONS:Record<string,RuleSourceSection>={
  '1. CHOOSE YOUR SPECIES':section('1. CHOOSE YOUR SPECIES',
    paragraph('Your Species describes the Beastfolk lineage your hero belongs to and establishes the inherited features, learned traditions, and native language that shape the beginning of play.'),
    paragraph('Choose one playable Species. Heritage Traits are inherent features of that Species. Cultural Traits represent learned traditions and may be exchanged during Character Creation according to the Culture Trait rules. Your Species also provides its native language, and every character knows Commonspeak.'),
  ),
  '2. CHOOSE YOUR SPARK':section('2. CHOOSE YOUR SPARK',
    paragraph('Your Spark is the personality archetype that describes what most often moves your hero into action. Each Spark carries two keywords that describe its nature.'),
    paragraph('Deeds reward meaningful actions during play. When a completed Deed shares a keyword with your Spark, it grants the normal reward plus the Spark-alignment bonus.'),
  ),
  '3. SELECT YOUR HOMELAND':section('3. SELECT YOUR HOMELAND',
    paragraph('Your Homeland is the place, road, settlement, or community that shaped your hero before the adventure began. It provides context for the habits, knowledge, and practical experience your character carries into the wider world.'),
    paragraph('Choose one Homeland. It grants two starting Skills at Rank [1]. A Homeland is not tied to Species and may represent birth, upbringing, travel, apprenticeship, exile, or another formative home.'),
  ),
  '4. CHOOSE YOUR FAITH & OATH':section('4. CHOOSE YOUR FAITH & OATH',
    paragraph('Choose a Faith and an Oath to describe what your hero believes gives meaning to the world and the principle they have chosen to live by.'),
    paragraph('Faith frames belief, ritual, and belonging. An Oath frames personal conviction and the standard your hero tries to uphold. Neither replaces roleplay; both give the Watcher and player clear anchors for choices, consequences, and character growth.'),
  ),
  '6. THE RHYTHM OF BODY & SPIRIT':section('6. THE RHYTHM OF BODY & SPIRIT',
    paragraph('Choose one Path to decide how your hero first expresses exceptional ability. Each Path grants a different starting package, but all four lead into the same advancement system after Character Creation.'),
    paragraph('Talents represent trained techniques, instincts, and specialized gifts. If your Path grants Talents, choose them from the Talent rules and meet any listed requirements.'),
    paragraph('Magic begins with the Wind-Touched Path. Gain Magic Level [1], choose a Lore Attunement, gain that Lore’s Signature Spell, choose the starting Spells allowed by Magic Level, and then choose the Talent granted by the Path.'),
  ),
  '7. EQUIPMENT & ITEMS':section('7. EQUIPMENT & ITEMS',
    paragraph(`Every character begins with an Adventure Kit and [${STARTING_WEALTH_SP}] sp of starting Threadpieces, equal to [${STARTING_WEALTH_WP.toLocaleString('en-US')}] wp, to spend on additional equipment.`),
    paragraph(`You may return the Adventure Kit during Character Creation for an additional [${ADVENTURE_KIT_SELL_SP}] sp, equal to [${ADVENTURE_KIT_SELL_WP}] wp. Returning it increases the available starting budget to [${MAX_STARTING_WEALTH_SP}] sp before other purchases.`),
    paragraph('Use the Weapons, Armor & Shields, and Adventuring Gear references when choosing equipment. Starting purchases use their normal listed prices and are recorded as owned equipment. The Adventure Kit already supplies its listed travel essentials, so purchase duplicates only when you want extra copies.'),
  ),
}

function installCurrentCharacterCreationRules(){
  const doc=ruleSourceDocuments['character-creation']
  if(!doc)return
  doc.sections=doc.sections.map(sourceSection=>CURRENT_CHARACTER_CREATION_SECTIONS[sourceSection.heading]||sourceSection)
}

function installCurrentRules(){
  if(ruleSourceDocuments['core-abilities'])ruleSourceDocuments['core-abilities'].sections=CURRENT_CORE_SECTIONS
  replaceBattleSections()
  if(ruleSourceDocuments['winds-of-magic'])ruleSourceDocuments['winds-of-magic'].sections=CURRENT_MAGIC_SECTIONS
  installCurrentCharacterCreationRules()
  installCurrentSparkAndDeedRules()

  if(ruleSourceDocuments.talents){
    ruleSourceDocuments.talents.sections=[
      section('Overview',table(['TALENTS'])),
      section('TALENTS',
        paragraph('Talents are practiced gifts, hard-earned techniques, and instinctive advantages that modify Core Actions or resolve from their own Triggers.'),
      ),
      ...TALENTS.map(talent=>section(talent.name,paragraph(talent.flavor),paragraph(talent.rules))),
    ]
  }

  for(const key of ['lore-invocation','lore-flames','lore-frost','lore-hallows','lore-harmony','lore-life','lore-oath','lore-wilds'])canonicalizeSpellDocument(key)
}

installCurrentRules()
canonicalizeCurrentTerminology()

export { ruleSourceDocuments }
export type { RuleSourceBlock, RuleSourceSection }
