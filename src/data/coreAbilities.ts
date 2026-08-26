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
  {
    name:'STRIDE',
    flavor:'The forest favors those who move with purpose.',
    fields:[
      {label:'TRIGGER',value:'This ability can be used during your turn.'},
      {label:'EFFECT',value:'Your character may move a number of squares equal to their speed. this movement can be split before and after other abilities used this turn.'},
    ],
    keywords:['ROOT','MOVE'],
  },
  {
    name:'SWIFT RUSH',
    flavor:'The swift knows no hesitation.',
    fields:[
      {label:'TRIGGER',value:'This ability can be used during your turn.'},
      {label:'EFFECT',value:'Your character may move up to double their speed in squares.'},
      {label:'RESTRICTIONS',value:'This ability cannot be used if your character is within [2] squares of an enemy and cannot end within [2] squares of an enemy.'},
    ],
    keywords:['ROOT','MOVE'],
  },
  {
    name:'HERO’S CHARGE',
    flavor:'Momentum is a weapon; use it.',
    cost:'1 Mana',
    fields:[
      {label:'TRIGGER',value:'This ability can be used during your turn.'},
      {label:'EFFECT',value:'Your character may move a number of squares equal to their speed plus [+3] toward a visible enemy within line of sight. if your character uses a combat ability against the target and deals damage during the same turn, increase the total damage by [+1].'},
      {label:'RESTRICTIONS',value:'This movement must end within [1] square of an enemy and cannot pass through impassable terrain.'},
    ],
    keywords:['ROOT','MOVE','CHARGE'],
  },
  {
    name:'MELEE STRIKE',
    flavor:'Steel speaks truer than words.',
    fields:[
      {label:'TRIGGER',value:'This ability can be used during your turn.'},
      {label:'DECLARE',value:'Choose [1] enemy within [2] squares.'},
      {label:'EFFECT',value:'Your character may move [1] square toward the target, then make a melee strike roll using (3d10) + mettle + condition(s) versus the target’s (3d10) + ward + condition(s).'},
      {label:'DAMAGE',value:'If successful, deal damage equal to the weapon’s damage value and power, plus any conditions.'},
      {label:'RESTRICTIONS',value:'The target must be within [2] squares when this ability is used. Your character must be wielding a melee weapon.'},
    ],
    keywords:['ROOT','COMBAT','MELEE'],
  },
  {
    name:'SURE SHOT',
    flavor:'A steady hand makes distance a formality.',
    fields:[
      {label:'TRIGGER',value:'This ability can be used during your turn.'},
      {label:'DECLARE',value:'Choose one enemy within the range of a ranged weapon your character is wielding.'},
      {label:'EFFECT',value:'Make a ranged strike roll using (3d10) + aim + condition(s) versus the target’s (3d10) + ward + condition(s).'},
      {label:'DAMAGE',value:'If successful, deal damage equal to the weapon’s damage value and accuracy, plus any conditions.'},
      {label:'LONG RANGE',value:'You may target a character up to [3] squares beyond a weapon’s range. for each additional square, the target adds [+2] condition to ward.'},
      {label:'RESTRICTIONS',value:'Target must be within line of sight.'},
    ],
    keywords:['ROOT','COMBAT','SHOOT'],
  },
  {
    name:'ARCANE COMMAND',
    flavor:'To speak the words of power is to bend the rhythm of the world.',
    cost:'See spell details',
    fields:[
      {label:'TRIGGER',value:'This ability can be used during your turn.'},
      {label:'DECLARE',value:'Choose [1] enemy within range of a spell your character is casting.'},
      {label:'EFFECT',value:'Make a strike roll using (3d10) + control + condition(s) versus the target’s (3d10) + ward + condition(s).'},
      {label:'DAMAGE',value:'If successful, deal damage equal to the spell’s damage value plus any conditions.'},
      {label:'AUGMENTS & HEXES',value:'If the spell is an augment or hex, your character may use another root magic ability this round by spending [+1] additional mana.'},
      {label:'RESTRICTIONS',value:'Target(s) or empty space must be within line of sight'},
    ],
    keywords:['ROOT','COMBAT','MAGIC'],
  },
  {
    name:'CHANNEL THE WINDS',
    flavor:'Even the wildest heart can find its center.',
    fields:[
      {label:'TRIGGER',value:'This ability can be used at the start of the round.'},
      {label:'EFFECT',value:'Generate [1] additional mana. roll (1d10) on a result of [5] or higher generate another additional [1] mana.'},
    ],
    keywords:['ROOT','INSTINCT'],
  },
  {
    name:'ROOTED RESOLVE',
    flavor:'Breathe in the calm before the storm.',
    cost:'1 Mana',
    fields:[
      {label:'TRIGGER',value:'This ability can be used at the start of the round.'},
      {label:'EFFECT',value:'Until the end of the round, your character gains [+1] to guts and resistance [+1] against a damage type of your choice.'},
    ],
    keywords:['ROOT','INSTINCT','AUGMENT'],
  },
  {
    name:'FOCUSED WILL',
    flavor:'Stillness brings clarity; clarity brings control.',
    cost:'1 Mana',
    fields:[
      {label:'TRIGGER',value:'This ability can be used at the start of the round.'},
      {label:'EFFECT',value:'Your character can make a single roll during the round edge.'},
    ],
    keywords:['ROOT','INSTINCT'],
  },
  {
    name:'VERDANT SURGE',
    flavor:'Life flows through the green, mending all things.',
    cost:'1 Mana',
    fields:[
      {label:'TRIGGER',value:'This ability can be used at the start of the round.'},
      {label:'EFFECT',value:'Choose one ability type (melee, shoot, magic) and gain [+2] to all strike rolls of that type until the end of the round.'},
    ],
    keywords:['ROOT','INSTINCT','AUGMENT'],
  },
  {
    name:'RENEW THE HEART',
    flavor:'The will to rise again is its own kind of magic.',
    fields:[
      {label:'TRIGGER',value:'this ability can be used at the start of your turn or when compelled.'},
      {label:'EFFECT',value:'choose one ongoing effect currently affecting your character or the specific effect that compelled your character to use this ability and make an attribute save.'},
      {label:'ATTRIBUTE SAVE',value:'roll (3d10) + heart + condition(s) against a passive target medium. Heart is equal to characters’ bravery rank.'},
      {label:'RESTRICTIONS',value:'Compelling effect(s) may require different passive target(s). such as compelled[easy] or compelled[hard]. Use the target stated by the effect, if none is given use the medium target.'},
    ],
    keywords:['ROOT','INSTINCT'],
  },
  {
    name:'WANDER STEP',
    flavor:'Anticipation is survival.',
    cost:'1 Mana',
    fields:[
      {label:'TRIGGER',value:'This ability can be used at the end of an enemy character’s turn.'},
      {label:'EFFECT',value:'Your character may move up to three [3] squares in any direction.'},
      {label:'RESTRICTIONS',value:'This movement cannot end within two [2] squares of an enemy.'},
    ],
    keywords:['MOVE','REACTION'],
  },
  {
    name:'STEADFAST',
    flavor:'There is strength in stillness.',
    cost:'1 Mana',
    fields:[
      {label:'TRIGGER',value:'This ability can be used when your character is targeted by a combat ability that requires a to defend roll.'},
      {label:'EFFECT',value:'Add two [+2] to your character’s ward against that ability. If the ability misses, your character may move one [1] square after resolution.'},
      {label:'RESTRICTIONS',value:'This movement cannot end within two [2] squares of an enemy.'},
    ],
    keywords:['REACTION','MOVE'],
  },
  {
    name:'SENTINEL’S CALL',
    flavor:'A well-timed shot can break a charge before it begins.',
    cost:'2 Mana',
    fields:[
      {label:'TRIGGER',value:'This ability can be used when an enemy character declares hero’s charge against you or an ally.'},
      {label:'EFFECT',value:'Your character may immediately use a shoot ability against that enemy. Resolve this effect after the enemy completes their movement, but before any other abilities are performed.'},
    ],
    keywords:['REACTION','SHOOT'],
  },
  {
    name:'SPIRIT FLARE',
    flavor:'Whispers of power unravel the enemy’s will.',
    cost:'2 Mana',
    fields:[
      {label:'TRIGGER',value:'This ability can be used at the end of the round.'},
      {label:'EFFECT',value:'Your character may immediately use a magic ability. Resolve this effect after all other abilities have been completed. If there are multiple abilities that resolve last, they are resolved in initiative order.'},
    ],
    keywords:['REACTION','MAGIC'],
  },
  {
    name:'ECHO STRIKE',
    flavor:'Instinct strikes where thought would falter.',
    cost:'2 Mana',
    fields:[
      {label:'TRIGGER',value:'This ability can be used when an enemy character uses a shoot or magic ability within two [2] squares of your character.'},
      {label:'EFFECT',value:'Your character is compelled to immediately use blade strike ability against that enemy.'},
    ],
    keywords:['COMBAT','REACTION'],
  },
]
