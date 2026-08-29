export interface CoreAbilityField {
  label:string
  value:string
}

export interface CoreAbilityDefinition {
  name:string
  flavor:string
  cost?:string
  fields:CoreAbilityField[]
  keywords:string[]
}

export const coreAbilities:CoreAbilityDefinition[]=[
  {name:'CHANNEL THE WINDS',flavor:'Even the wildest heart can find its center.',fields:[{label:'TRIGGER',value:'At the start of the round, before Magic Regen is resolved.'},{label:'EFFECT',value:'Increase your Magic Regen by [+1] for this round. Roll [1d10]; on a result of [5+] increase your Magic Regen by an additional [+1] for this round.'}],keywords:['CORE','INSTINCT']},
  {name:'FOCUSED WILL',flavor:'Stillness brings clarity; clarity brings control.',fields:[{label:'TRIGGER',value:'At the start of the round.'},{label:'EFFECT',value:'Choose [1] roll you make before the end of the round. That roll is Edged.'}],keywords:['CORE','INSTINCT']},
  {name:'STRIDE',flavor:'The forest favors those who move with purpose.',fields:[{label:'TRIGGER',value:'During your turn.'},{label:'EFFECT',value:'Move up to your Speed in squares. This movement may be split before and after your CORE Combat ability.'}],keywords:['CORE','MOVE']},
  {name:'SWIFTSTRIDE',flavor:'The swift knows no hesitation.',fields:[{label:'TRIGGER',value:'During your turn.'},{label:'EFFECT',value:'Move up to double your Speed in squares.'},{label:'RESTRICTIONS',value:'You cannot use Swiftstride while within [2] squares of an enemy, and this movement cannot end within [2] squares of an enemy.'}],keywords:['CORE','MOVE']},
  {name:'HERO’S CHARGE',flavor:'Momentum is a weapon; use it.',cost:'1 Mana',fields:[{label:'TRIGGER',value:'During your turn.'},{label:'DECLARE',value:'Choose [1] visible enemy within line of sight.'},{label:'EFFECT',value:'Move up to your Speed + [3] squares toward the target. If you use a CORE Combat ability against that target this turn and successfully deal damage, increase the total damage by [+1].'},{label:'RESTRICTIONS',value:'This movement must end within [1] square of the target and cannot pass through impassable terrain.'}],keywords:['CORE','MOVE','CHARGE']},
  {name:'MELEE STRIKE',flavor:'Steel speaks truer than words.',fields:[{label:'TRIGGER',value:'During your turn.'},{label:'DECLARE',value:'Choose [1] enemy within [2] squares.'},{label:'EFFECT',value:'You may move up to [1] square toward the target before resolving TO HIT.'},{label:'TO HIT',value:'Make a melee Strike using (3d10) + Brawl + condition(s) against the target’s (3d10) + Ward + condition(s).'},{label:'DAMAGE',value:'On a successful Strike, deal the weapon’s damage + Fury, plus applicable conditions and effects.'},{label:'RESTRICTIONS',value:'The target must be within [2] squares when TO HIT is resolved. You must be wielding a melee weapon.'}],keywords:['CORE','COMBAT','TOUCH']},
  {name:'RANGE STRIKE',flavor:'A steady hand makes distance a formality.',fields:[{label:'TRIGGER',value:'During your turn.'},{label:'DECLARE',value:'Choose [1] enemy within the range of a ranged weapon you are wielding.'},{label:'TO HIT',value:'Make a ranged Strike using (3d10) + Aim + condition(s) against the target’s (3d10) + Ward + condition(s).'},{label:'DAMAGE',value:'On a successful Strike, deal the weapon’s damage + Accuracy, plus applicable conditions and effects.'},{label:'LONG RANGE',value:'You may target an enemy up to [3] squares beyond the weapon’s range. For each additional square, the target gains condition [+2] to Ward against this Strike.'},{label:'RESTRICTIONS',value:'The target must be within line of sight.'}],keywords:['CORE','COMBAT','SHOOT']},
  {name:'ARCANE COMMAND',flavor:'To speak the words of power is to bend the rhythm of the world.',cost:'See Spell Details',fields:[{label:'TRIGGER',value:'During your turn.'},{label:'DECLARE',value:'Choose [1] non-Signature spell you know.'},{label:'EFFECT',value:'Pay the spell’s Mana cost and resolve its Spell Details.'},{label:'RESTRICTIONS',value:'You must meet all requirements stated by the chosen spell.'}],keywords:['CORE','COMBAT','MAGIC']},
  {name:'RENEW THE HEART',flavor:'The will to rise again is its own kind of magic.',fields:[{label:'TRIGGER',value:'At the start of your turn, or when an effect Compels you to Renew the Heart.'},{label:'EFFECT',value:'Choose one ongoing effect currently affecting you, or the specific effect that Compelled this ability, and make the required Attribute Save.'},{label:'SAVE',value:'Roll (3d10) + Heart + condition(s). Use the passive target stated by the effect; if none is stated, use Medium.'}],keywords:['PASSIVE']},
]
