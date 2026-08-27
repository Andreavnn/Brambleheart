import { allRulePages, fundamentalsNavigation } from './ruleCatalog'
import { coreAbilities } from './coreAbilities'
import { ruleSourceDocuments, type RuleSourceSection } from './rulesSource'

const movedCoreAbilityNames=new Set([
  'ROOTED RESOLVE',
  'VERDANT SURGE',
  'WANDER STEP',
  'STEADFAST',
  'SENTINEL’S CALL',
  "SENTINEL'S CALL",
  'SPIRIT FLARE',
  'ECHO STRIKE',
])

for(let index=coreAbilities.length-1;index>=0;index--){
  if(movedCoreAbilityNames.has(coreAbilities[index].name.toUpperCase()))coreAbilities.splice(index,1)
}
for(const ability of coreAbilities){
  if(ability.name.toUpperCase()==='SWIFT RUSH')ability.name='SWIFTSTRIDE'
  if(ability.name.toUpperCase()==='SURE SHOT')ability.name='RANGE STRIKE'
}

function replacement(match:string,title:string,upper:string){
  if(match===match.toUpperCase())return upper
  if(match===match.toLowerCase())return title.toLowerCase()
  return title
}
function renameAbilityReferences(value:string){
  return String(value||'')
    .replace(/\bSwift Rush\b/gi,match=>replacement(match,'Swiftstride','SWIFTSTRIDE'))
    .replace(/\bSure Shot\b/gi,match=>replacement(match,'Range Strike','RANGE STRIKE'))
}

for(const source of Object.values(ruleSourceDocuments)){
  for(const section of source.sections){
    section.heading=renameAbilityReferences(section.heading)
    for(const block of section.blocks){
      if(block.type==='paragraph')block.text=renameAbilityReferences(block.text)
      else block.rows=block.rows.map(row=>row.map(renameAbilityReferences))
    }
  }
}

const coreAbilityPage=allRulePages.find(page=>page.slug==='keyword-abilities')
if(coreAbilityPage){
  coreAbilityPage.title='Core Abilities'
  coreAbilityPage.summary='How Ability types and Keywords determine when and how Abilities can be used, including the shared Core Abilities available during encounters.'
}
const fundamentalCoreAbilityLink=fundamentalsNavigation.find(page=>page.slug==='keyword-abilities')
if(fundamentalCoreAbilityLink)fundamentalCoreAbilityLink.title='Core Abilities'

const movedTalentSections:RuleSourceSection[]=[
  {
    heading:'Spirit Flare',
    blocks:[
      {type:'paragraph',text:'Whispers of power unravel the enemy’s will. COST: [2] Mana TRIGGER: This ability can be used at the end of the round. EFFECT: Your character may immediately use a magic ability. Resolve this effect after all other abilities have been completed. If there are multiple abilities that resolve last, they are resolved in initiative order. KEYWORDS: Reaction | Magic'},
    ],
  },
  {
    heading:'Echo Strike',
    blocks:[
      {type:'paragraph',text:'Instinct strikes where thought would falter. COST: [2] Mana TRIGGER: This ability can be used when an enemy character uses a shoot or magic ability within two [2] squares of your character. EFFECT: Your character is compelled to immediately use blade strike ability against that enemy. KEYWORDS: Combat | Reaction'},
    ],
  },
  {
    heading:'Steadfast',
    blocks:[
      {type:'paragraph',text:'There is strength in stillness. COST: [1] Mana TRIGGER: This ability can be used when your character is targeted by a combat ability that requires a to defend roll. EFFECT: Add two [+2] to your character’s ward against that ability. If the ability misses, your character may move one [1] square after resolution. RESTRICTIONS: This movement cannot end within two [2] squares of an enemy. KEYWORDS: Reaction | Move'},
    ],
  },
  {
    heading:'Sentinel’s Call',
    blocks:[
      {type:'paragraph',text:'A well-timed shot can break a charge before it begins. COST: [2] Mana TRIGGER: This ability can be used when an enemy character declares hero’s charge against you or an ally. EFFECT: Your character may immediately use a shoot ability against that enemy. Resolve this effect after the enemy completes their movement, but before any other abilities are performed. KEYWORDS: Reaction | Shoot'},
    ],
  },
  {
    heading:'Wander Step',
    blocks:[
      {type:'paragraph',text:'Anticipation is survival. COST: [1] Mana TRIGGER: This ability can be used at the end of an enemy character’s turn. EFFECT: Your character may move up to three [3] squares in any direction. RESTRICTIONS: This movement cannot end within two [2] squares of an enemy. KEYWORDS: Move | Reaction'},
    ],
  },
  {
    heading:'Verdant Surge',
    blocks:[
      {type:'paragraph',text:'Life flows through the green, mending all things. COST: [1] Mana TRIGGER: This ability can be used at the start of the round. EFFECT: Choose one ability type (melee, shoot, magic) and gain [+2] to all strike rolls of that type until the end of the round. KEYWORDS: Root | Instinct | Augment'},
    ],
  },
  {
    heading:'Rooted Resolve',
    blocks:[
      {type:'paragraph',text:'Breathe in the calm before the storm. COST: [1] Mana TRIGGER: This ability can be used at the start of the round. EFFECT: Until the end of the round, your character gains [+1] to guts and resistance [+1] against a damage type of your choice. KEYWORDS: Root | Instinct | Augment'},
    ],
  },
]

const talentDocument=ruleSourceDocuments.talents
if(talentDocument){
  const existing=new Set(talentDocument.sections.map(section=>section.heading.toLowerCase().replace(/[^a-z0-9]+/g,'')))
  for(const section of movedTalentSections){
    const sectionKey=section.heading.toLowerCase().replace(/[^a-z0-9]+/g,'')
    if(!existing.has(sectionKey)){
      talentDocument.sections.push(section)
      existing.add(sectionKey)
    }
  }
}
