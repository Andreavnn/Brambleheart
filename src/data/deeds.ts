export interface DeedDefinition {
  name:string
  flavor:string
  objective:string
  rewardXp:number
  keywords:readonly [string,string]
}

/** Canonical Deed deck. Rules and Character Creation derive Deed names, rewards, objectives, and Spark keywords from this list. */
export const deeds:ReadonlyArray<DeedDefinition>=[
  {name:'Participation Trophy',flavor:'Act with purpose, even in the smallest challenge.',objective:'Win one Active Target Roll of any kind.',rewardXp:1,keywords:['Driven','Focused']},
  {name:'Skill of the Day',flavor:'Apply your craft or insight to change an outcome.',objective:'Succeed at a Medium or higher Passive Skill Roll.',rewardXp:2,keywords:['Studious','Curious']},
  {name:'Voice of the Table',flavor:'Influence the group through story, counsel, or expression.',objective:'Use a non-combat Skill unique to your character during a social or exploration scene.',rewardXp:3,keywords:['Charming','Creative']},
  {name:'Brush with Fate',flavor:'Choose the harder path to prove your resolve.',objective:'When asked to make a Medium or Easy Passive Roll, raise the difficulty to Hard and succeed.',rewardXp:5,keywords:['Bold','Defiant']},
  {name:'Steady Hand',flavor:'Stay calm and deliberate in a moment of chaos.',objective:'Roll two Exceptional Results (8+) on the same check.',rewardXp:3,keywords:['Focused','Steadfast']},
  {name:'Heart of the Party',flavor:'Inspire unity or compassion through words or kindness.',objective:'Use a Heart-based Skill (Charm, Presence, Expression, or Guile) to shift an NPC’s or group’s attitude.',rewardXp:3,keywords:['Charming','Compassionate']},
  {name:'Calculated Edge',flavor:'Outsmart danger with timing or cunning.',objective:'Succeed on an Edged Roll against an Active or Medium+ Passive Target.',rewardXp:3,keywords:['Clever','Focused']},
  {name:'Wild Wanderer',flavor:'Discover or interpret something hidden in the wild.',objective:'Succeed at a Lore, Awareness, or Wayfinding roll against a Medium or higher Passive Target.',rewardXp:1,keywords:['Curious','Adaptable']},
  {name:'Spark of Insight',flavor:'Perceive a hidden truth that changes the course of events.',objective:'Reveal meaningful information through a Lore or Seeking roll.',rewardXp:1,keywords:['Intuitive','Studious']},
  {name:'Brushfire Courage',flavor:'Confront fear for the sake of another’s safety.',objective:'Take an action that places you in danger to protect another.',rewardXp:2,keywords:['Bold','Compassionate']},
  {name:'Steadfast Resolve',flavor:'Refuse to yield against hardship or fear.',objective:'Resist or end an ongoing effect using an Attribute Save.',rewardXp:2,keywords:['Steadfast','Driven']},
  {name:'Tinker’s Triumph',flavor:'Build or restore something meaningful to the story.',objective:'Craft, repair, or modify an item or structure successfully.',rewardXp:1,keywords:['Creative','Inventive']},
  {name:'Hope in the Ashes',flavor:'Encourage an ally to try again after failure.',objective:'Recover from a failed roll through teamwork or inspiration.',rewardXp:2,keywords:['Hopeful','Compassionate']},
  {name:'Measured Breath',flavor:'Act with patience and thoughtfulness amid pressure.',objective:'Complete two successful Weighted Rolls in one session.',rewardXp:3,keywords:['Cautious','Focused']},
  {name:'Inventor’s Spark',flavor:'Innovate your way past a limit or obstacle.',objective:'Combine two items, tools, or Abilities to solve a challenge.',rewardXp:2,keywords:['Inventive','Creative']},
  {name:'Gentle Guardian',flavor:'Place another’s well-being before your own.',objective:'Prevent or reduce harm to an ally through a save, heal, or Ability.',rewardXp:1,keywords:['Compassionate','Steadfast']},
  {name:'Quiet Observer',flavor:'Observe instead of acting, learning what others miss.',objective:'Use Awareness or Lorekeeping to uncover a hidden detail that changes a scene.',rewardXp:1,keywords:['Cautious','Reflective']},
  {name:'Pathfinder’s Mark',flavor:'Lead others safely through uncertainty.',objective:'Guide the party to a location or resource through Skill or intuition.',rewardXp:2,keywords:['Adaptable','Independent']},
  {name:'Flicker of Faith',flavor:'Stay true to your ideals when others doubt.',objective:'Persevere through a conflict involving your Oath or Faith.',rewardXp:3,keywords:['Hopeful','Reflective']},
  {name:'Rebel’s Smile',flavor:'Defy authority or expectation for freedom or truth.',objective:'Take a creative or risky approach that changes an encounter’s flow.',rewardXp:1,keywords:['Defiant','Independent']},
  {name:'Scholar’s Patience',flavor:'Dedicate yourself to learning before acting.',objective:'Gather three or more pieces of related information through research or observation.',rewardXp:3,keywords:['Studious','Cautious']},
  {name:'Trickster’s Turn',flavor:'Transform setback into opportunity with humor or wit.',objective:'Turn a disadvantage (negative condition or failure) into a benefit.',rewardXp:2,keywords:['Playful','Defiant']},
  {name:'Lone Path',flavor:'Choose independence over comfort or safety.',objective:'Succeed at a roll without assistance when help was available.',rewardXp:2,keywords:['Independent','Driven']},
  {name:'Silent Strength',flavor:'Show restraint or mercy when power was yours to take.',objective:'End a combat encounter without any final blows.',rewardXp:2,keywords:['Compassionate','Cautious']},
  {name:'Mind Like Water',flavor:'Find clarity amid confusion or temptation.',objective:'Overcome a magical or mental compulsion through a save or insight.',rewardXp:2,keywords:['Reflective','Intuitive']},
  {name:'Boundless Heart',flavor:'Share strength selflessly across the group.',objective:'Heal, restore, or inspire three or more allies in a single scene.',rewardXp:3,keywords:['Compassionate','Hopeful']},
  {name:'Trailblazer',flavor:'Take initiative before others dare.',objective:'Be the first to act successfully in a scene or combat round.',rewardXp:2,keywords:['Bold','Driven']},
  {name:'Wise Fool',flavor:'Use levity to heal or reframe conflict.',objective:'Defuse tension or danger through humor or charm.',rewardXp:2,keywords:['Playful','Charming']},
  {name:'Tether of Trust',flavor:'Strengthen a relationship through loyalty or cooperation.',objective:'Aid or protect an ally using a teamwork roll or shared Ability.',rewardXp:1,keywords:['Steadfast','Compassionate']},
  {name:'Vision in Shadow',flavor:'Use intuition to reveal meaning beyond sight.',objective:'Spot or interpret a hidden clue before others act.',rewardXp:2,keywords:['Intuitive','Curious']},
  {name:'Master of the Moment',flavor:'Balance patience, precision, and action across challenges.',objective:'Succeed on three different Passive Skill Rolls in one session.',rewardXp:4,keywords:['Focused','Driven']},
]

export function deedRewardLabel(deed:DeedDefinition){return`+${deed.rewardXp} XP`}
export function deedRuleText(deed:DeedDefinition){return`${deed.name} ${deed.flavor} Objective (Mechanical): ${deed.objective} Reward: ${deedRewardLabel(deed)} Keywords: ${deed.keywords.join(', ')}`}
