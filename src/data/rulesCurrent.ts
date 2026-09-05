import { loreSpells } from './magicOptions'
import { ruleSourceDocuments, type RuleSourceBlock, type RuleSourceSection } from './rulesSource'
import { INVOCATION_CANTRIPS, SIGNATURE_SPELLS } from '../rules/magicRules'

/**
 * Beta 0.37 canonical rules boundary.
 *
 * rulesSource.ts remains the generated transcription of the supplied source
 * documents. This module converts that one in-memory source object to the
 * current canonical rules before Vue mounts. Consumers continue to read the
 * same ruleSourceDocuments authority.
 */
const paragraph=(text:string):RuleSourceBlock=>({type:'paragraph',text})
const table=(...rows:string[][]):RuleSourceBlock=>({type:'table',rows})
const section=(heading:string,...blocks:RuleSourceBlock[]):RuleSourceSection=>({heading,blocks})

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
    paragraph('Magic: a spell that includes TO HIT makes the roll stated in that spell’s details. A Magic Strike normally uses (3d10) + Control + condition(s) against (3d10) + Ward + condition(s). Control is the Lore modifier plus applicable equipment bonuses.'),
    paragraph('The defender wins ties unless a more specific rule states otherwise.'),
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
    paragraph('MAGIC identifies spellcasting. A Lore keyword identifies the spell’s Lore. TOUCH, DIRECT, LINE, CONE, and ORB describe targeting or area geometry where applicable.'),
    paragraph('HEX identifies a hostile magical effect normally resisted by Renew the Heart when the spell says the target is Compelled. ENHANCE identifies a beneficial magical effect, usually applied to a legal friendly target without a hostile TO HIT roll.'),
    paragraph('SIGNATURE and CANTRIP identify the two explicit zero-Mana spell structures. Arcane Command already spends the character’s CORE Combat opportunity, so spells do not require a second action-limiting keyword.'),
    paragraph('SUMMON: A caster may only have one summon spell active at a time. Casting another summon spell ends the previous summon unless a more specific rule states otherwise.'),
  ),
  section('ENHANCES & HEXES',
    paragraph('ENHANCE: DECLARE a legal friendly or self target, then apply the spell’s EFFECT and DURATION. An Enhance does not require a hostile TO HIT roll unless the spell specifically says otherwise.'),
    paragraph('HEX: DECLARE a legal target. When the spell calls for resistance, the target is Compelled to Renew the Heart at the listed difficulty. Apply the listed ON FAILURE effect if that save fails.'),
    paragraph('A spell may intentionally combine a Magic Strike with a Hex. When it does, the spell states separately what a successful TO HIT roll does and what the compelled Renew the Heart roll controls.'),
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


function currentSpellToHit(currentSpell:string,text:string){
  const upper=text.toUpperCase()
  const hasHex=/\bHEX\b/.test(upper)
  const hasEnhance=/\bENHANCE\b/.test(upper)
  const hasDamage=/\b(?:DEAL|SUFFER|SUFFERS|DAMAGE:)\b[^.]*\bDAMAGE\b|\b(?:DIRECT|STANDARD|LETHAL|FIRE|COLD|LIGHTNING|LIGHT|PSYCHIC|NATURE|ARCANE)\s+DAMAGE\b/i.test(text)
  const hasCompelled=/\bCOMPELLED?\b/i.test(text)
  const hostile=/\bTARGET(?:S|ED)?\s+(?:\[[^\]]+\]\s+)?(?:ENEMY|ALL ENEMY)|\bENEMY CHARACTERS?\b/i.test(text)
  const friendlyOrUtility=/\bDECLARE:[^.]*(?:ally|friendly|cast on yourself|empty square|point of origin|summon|object|nonliving)/i.test(text)
  const area=/\b(?:LINE|CONE|ORB)\s*\[/i.test(text)
  if(['Smolder','Hypothermia','Scary Face'].includes(currentSpell))return'Renew the Heart. On a failed save, apply the Signature Hex.'
  if(['Infernal Rebuke','Immolation'].includes(currentSpell))return'Magical Strike against the target’s Ward for the initial damage. Renew the Heart resolves the Hex effect.'
  if(friendlyOrUtility&&!/\btarget all characters\b/i.test(text))return'Automatic. No roll required.'
  if(hasEnhance&&!hostile)return'Automatic. No roll required.'
  if(hasHex&&hasDamage)return area?'Magical Strike: make one spell Strike roll and compare it separately against each affected enemy’s Ward for the initial damage. Renew the Heart resolves the Hex effect.':'Magical Strike against the target’s Ward for the initial damage. Renew the Heart resolves the Hex effect.'
  if(hasDamage&&hasCompelled)return area?'Magical Strike: make one spell Strike roll and compare it separately against each affected enemy’s Ward for the initial damage. Renew the Heart resolves the printed compelled or Hex effect.':'Magical Strike against the target’s Ward for the initial damage. Renew the Heart resolves the printed compelled or Hex effect.'
  if(hasDamage)return area?'Magical Strike: make one spell Strike roll and compare it separately against each affected enemy’s Ward.':'Magical Strike against the target’s Ward.'
  if(hasHex||hasCompelled)return'Renew the Heart. On a failed printed save, apply the Hex or compelled effect.'
  if(hostile)return'Magical Strike against the target’s Ward.'
  return'Automatic. No roll required.'
}

function patchCurrentSpellRules(currentSpell:string,value:string){
  let text=value
  const replace=(from:RegExp,to:string)=>{text=text.replace(from,to)}
  if(spellLoreByName.get(currentSpell)==='Flames'){
    text=text.replace(/(DECLARE:[^.!?]*?within\s*)\[(?:5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20)\](\s+squares)/gi,'$1[4]$2')
    text=text.replace(/(point of origin within\s*)\[(?:5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20)\](\s+squares)/gi,'$1[4]$2')
  }
  switch(currentSpell){
    case 'Smolder':
      replace(/maximum of \[5\] times per round/i,'maximum of [3] times per round')
      break
    case 'Flaming Shroud':
      replace(/Any character that passes through, is within or ends a movement within \[1\] square of the caster suffers \[2\] lethal fire damage\. Additionally, all attacks with the shoot or magic keyword suffer \[-1\] on all strike rolls against the caster\./i,'Any enemy that passes through or moves through a square within [1] square of the caster suffers [1] lethal fire damage. Shooting attacks against the caster reduce Standard and Direct damage by [-1]. This does not reduce Lethal damage.')
      if(/^RESTRICTION: This spell can only trigger smolder when cast/i.test(text.trim()))text='RESTRICTION: This spell can only trigger Smolder when cast.'
      break
    case 'Inferno Strike':
      replace(/Deal \[5\] direct fire damage/i,'Deal [4] direct fire damage')
      replace(/BURNED:/i,'BURN:')
      replace(/\[2\] lethal fire damage at the start of the following round/i,'[1] lethal fire damage at the start of the following round')
      replace(/DURATION: This effect lasts \[1d10\/2\] rounds, effects end at the start of the round\./i,'DURATION: This effect lasts [1d10/2] rounds, ending at the start of the resulting round.')
      break
    case 'Detonation':
      if(/\bCOST:/i.test(text))text='COST: [8] mana DECLARE: Target [1] enemy character within [4] squares. TO HIT: Renew the Heart. EFFECT: On a failed Renew the Heart roll, roll [1d10] and consult the Detonation results. BURST (1–3): Deal [3] lethal fire damage immediately. At the start of the next round, the target must make another Renew the Heart roll; on failure, roll on the Detonation table again. PRESSURE (4–7): Nothing happens immediately. At the start of the next round, the target makes another Renew the Heart roll; on failure, roll on the Detonation table again, and on success the spell ends. CATASTROPHE (8–10): Deal [6] lethal fire damage immediately and the spell ends. DURATION: This effect lasts [1d10/2+1] rounds. Effects end at the start of the resulting round. KEYWORDS: HEX | MAGIC | FLAMES';
      else if(/^(?:1[–-]3|4[–-]6|7[–-]9|10|DURATION:)/i.test(text.trim()))text=''
      break
    case 'Immolation':
      replace(/\[3\] lethal fire damage/g,'[1] lethal fire damage')
      replace(/A character cannot be affected by multiple instances of immolation at the same time or from different sources\./i,'A character cannot be affected by multiple instances of Immolation at the same time or from different sources. Immolation cannot affect more than [3] characters per caster at the same time.')
      break
    case 'Curse Of Patronus': replace(/compelled\[medium\]/i,'compelled[easy]'); break
    case 'Entangling Roots':
      replace(/\[-2\] to ward/i,'[-1] to Ward')
      replace(/\[2\] lethal nature damage/i,'[1] lethal nature damage')
      replace(/DURATION: This effect lasts \[1d10\] rounds, effects end at the start of the round\./i,'REPEAT SAVE: At the start of each round, a Rooted target uses Renew the Heart at Medium difficulty. On success, Rooted ends. DURATION: This effect lasts [1d10/2] rounds, ending at the start of the resulting round.')
      break
    case "Thunder’s Fury":
      replace(/Increase the target weapons Damage by \[\+2\]/i,'Increase the target weapon’s damage by [+1]')
      replace(/RESTRICTION:[^K]*?(?=KEYWORDS:)/i,'')
      text=text.replace(/\bFLAMES\b/gi,'OATHS')
      break
    case 'Wind Scaring':
      replace(/Increase the target weapons damage by \[\+2\]/i,'Increase the target weapon’s damage by [+1]')
      if(/^DUALING ELEMENTS:/i.test(text.trim()))text=''
      if(/^THUNDERSTORM:/i.test(text.trim()))text='THUNDERSTORM: If the target weapon is affected by both Thunder’s Fury and Wind Scaring, increase the total bonus damage from the combined effects by [+1]. The weapon has both damage types for the duration. KEYWORDS: ENHANCE | MAGIC | OATHS'
      break
    case 'Power Word: Reinforcement':
      text=text.replace(/(EFFECT:[^K]*?)(?=KEYWORDS:)/i,'$1 DURATION: Until the target suffers its next incoming damaging attack, or until the start of its next turn, whichever comes first. ')
      break
    case 'Earth Grasp':
      text=text.replace(/(EFFECT:[^K]*?)(?=KEYWORDS:)/i,'$1 DURATION: The totem remains active for [1d10/2+1] rounds, until destroyed, dismissed, or ended by the universal Summon rule. ')
      break
    case 'The Immortal Warrior':
      if(/^DEFECTION:/i.test(text.trim())&&!/Defection can only be used once per round/i.test(text))text=text.replace(/KEYWORDS:/i,'RESTRICTIONS: Defection can only be used once per round. KEYWORDS:')
      break
    case 'Hypothermia':
      text=text.replace(/(?=KEYWORDS:)/i,'RESTRICTIONS: A single character can suffer a maximum of [3] Hypothermia applications per round. ')
      break
    case 'Scary Face':
      replace(/\[-1\] plus one-half the value of their magic level/i,'[-1]')
      text=text.replace(/RESTRICTIONS:[^K]*?(?=KEYWORDS:)/i,'RESTRICTIONS: A character can only be affected by Scary Face once per round. ')
      break
    case 'Soulfire Bolt':
      replace(/\[8\] psychic damage/i,'[6] psychic damage')
      replace(/additional \[2\] lethal psychic damage/i,'additional [1] lethal psychic damage')
      break
    case 'Ballad Of The Courageous':
      replace(/orb\[6\]/ig,'ORB[5]')
      replace(/all attribute saves/ig,'Renew the Heart rolls')
      text=text.replace(/(?=KEYWORDS:)/i,"DURATION: The bonus applies to the target’s next Renew the Heart roll, or until the start of their next turn, whichever comes first. ")
      break
    case 'Note Of Force':
      replace(/\[7\] direct/i,'[6] direct')
      replace(/\[-2\] to strike/ig,'[-1] to Strike')
      break
    case 'Ode To The Lores': replace(/\[-2\]/g,'[-4]'); break
    case 'Song Of Storms':
      replace(/DURATION: This effect lasts \[1d10\/2\] rounds, effects end at the start of the round\./i,'DURATION: This effect lasts [2] rounds.')
      if(/^ROLLING STORM:/i.test(text.trim()))text='ROLLING STORM: Characters still within the Orb at the start of the following round use Renew the Heart at Difficult difficulty. On failure, suffer [4] direct lightning damage and the Speed reduction. Reduce the Renew the Heart difficulty by one step for each repeat, to a minimum of Easy.'
      break
    case 'Light Spear': replace(/\[6\] direct light damage/i,'[3] direct light damage'); break
    case 'Shield Of Protection': replace(/\[10\] to guts/i,'[5] to Guts'); break
    case 'Spectral Armament':
      text=text.replace(/(?=KEYWORDS:)/i,'RESTRICTIONS: The summoned weapon obeys normal Might, hand, weapon, and equipment requirements. It cannot be sold or permanently retained. DURATION: Until the end of the encounter, until dismissed, or until ended by the universal Summon rule. ')
      break
    case 'Hearth Vow':
      text=text.replace(/\s*Lasts until combat ends\.?/i,'')
      break
    case 'Chorus Of Harmony':
      if(/\bCOST:|\bTRIGGER:/i.test(text))text='TRIGGER: When you successfully cast any Lore of Harmony spell. DECLARE: Choose [1] friendly character within [6] squares. EFFECT: The chosen character reduces the Mana cost of their next spell by [-1], to a minimum of [1]. RESTRICTIONS: A character cannot be affected by multiple instances of Chorus of Harmony from different sources. KEYWORDS: ENHANCE | MAGIC | HARMONY | SIGNATURE'
      break
    case 'Melody Of Superiority':
      text=text.replace(/Prowess rolls/gi,'Agility rolls').replace(/Strength:/gi,'Might:').replace(/Endurance:/gi,'Hide:').replace(/Wisdom:/gi,'Lore:').replace(/Heroism:/gi,'Bravery:').replace(/Splendor:/gi,'Renew the Heart:').replace(/Renew the Heart: \[\+1\] to all attribute saves/gi,'Renew the Heart: [+1] to Renew the Heart rolls')
      break
  }
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
    .replace(/\bhero(?:’|')s charge core ability\b/gi,'Hero’s Charge Core Action')
    .replace(/\bstride core ability\b/gi,'Stride Core Action')
    .replace(/\brenew the heart ability\b/gi,'Renew the Heart Core Action')
  if(SIGNATURE_SPELLS.has(currentSpell))text=text.replace(/\bCOST:\s*\[?0\]?\s*mana\b\s*/gi,'')
  if(INVOCATION_CANTRIPS.has(currentSpell))text=text.replace(/\bCOST:\s*\[?0\]?\s*mana\b\s*/gi,'')
  text=patchCurrentSpellRules(currentSpell,text)
  if(addToHit&&currentSpell&&!/\bTO HIT:/i.test(text)){
    const toHit=currentSpellToHit(currentSpell,text)
    const declare=text.match(/\bDECLARE:[^]*?(?=\b(?:EFFECT|TRIGGER|SUMMON|RESTRICTIONS?|DURATION|EMPOWER|KEYWORDS):|$)/i)
    if(declare)text=text.replace(declare[0],`${declare[0].trim()} TO HIT: ${toHit} `)
    else text=`TO HIT: ${toHit} ${text}`
  }
  text=text.replace(/\bKEYWORDS?:\s*([^\n]+)/gi,(_match,keywords:string)=>`KEYWORDS: ${normalizeKeywordList(keywords,currentSpell)}`)
  return text.replace(/\s{2,}/g,' ').trim()
}

function canonicalizeSpellDocument(documentKey:string){
  const doc=ruleSourceDocuments[documentKey]
  if(!doc)return
  const known=new Map(Object.values(loreSpells).flat().map(name=>[name.toLowerCase(),name] as const))
  let currentSpell=''
  let toHitAdded=false
  doc.sections=doc.sections.map(sourceSection=>({
    ...sourceSection,
    blocks:sourceSection.blocks.map(block=>{
      if(block.type!=='paragraph')return block
      const trimmed=block.text.trim()
      const canonicalSpell=known.get(trimmed.toLowerCase())
      if(canonicalSpell){currentSpell=canonicalSpell;toHitAdded=false;return{...block,text:canonicalSpell}}
      const addToHit=Boolean(currentSpell&&!toHitAdded&&/\b(?:DECLARE|TRIGGER|EFFECT|SUMMON):/i.test(block.text))
      if(addToHit)toHitAdded=true
      return{...block,text:safeSpellText(block.text,currentSpell,addToHit)}
    }).filter(block=>block.type!=='paragraph'||block.text.trim().length>0),
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

function installCurrentRules(){
  if(ruleSourceDocuments['core-abilities'])ruleSourceDocuments['core-abilities'].sections=CURRENT_CORE_SECTIONS
  replaceBattleSections()
  if(ruleSourceDocuments['winds-of-magic'])ruleSourceDocuments['winds-of-magic'].sections=CURRENT_MAGIC_SECTIONS

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
