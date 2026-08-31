import { allRulePages, fundamentalsNavigation } from './ruleCatalog'
import { coreAbilities } from './coreAbilities'
import { ruleSourceDocuments, type RuleSourceBlock, type RuleSourceSection } from './rulesSource'
import { currentMeasurement, formatMeasurementText } from '../rules/measurements'
import { gearShopItems } from './characterOptions'
import { ADVENTURE_KIT_SELL_WP, CRAFTING_MATERIAL_FLOOR_PERCENT, STARTING_WEALTH_WP, canonicalRulePriceLabel, economyGearCatalog } from '../rules/economy'
import { formatThreadpieceWp, formatThreadpieceWpAs } from '../rules/threadpieces'

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
      {type:'paragraph',text:'Whispers of power unravel the enemy’s will. COST: [2] Mana REQUIRES: Threadseer TRIGGER: This ability can be used at the end of the round. EFFECT: Your character may immediately use a magic ability. Resolve this effect after all other abilities have been completed. If there are multiple abilities that resolve last, they are resolved in initiative order. KEYWORDS: Reaction | Magic'},
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
      {type:'paragraph',text:'Life flows through the green, mending all things. COST: [1] Mana TRIGGER: This ability can be used at the start of the round. EFFECT: Choose one ability type (melee, shoot, magic) and gain [+2] to all strike rolls of that type until the end of the round. KEYWORDS: Root | Instinct | Enhance'},
    ],
  },
  {
    heading:'Rooted Resolve',
    blocks:[
      {type:'paragraph',text:'Breathe in the calm before the storm. COST: [1] Mana TRIGGER: This ability can be used at the start of the round. EFFECT: Until the end of the round, your character gains [+1] to guts and resistance [+1] against a damage type of your choice. KEYWORDS: Root | Instinct | Enhance'},
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


/* Normalize current rules at the source-ingestion boundary so generated/raw rule documents do not spread retired derived-stat formulas through UI logic. */
function applyGameRuleAmendments(value:string){
  let text=String(value||'')
  text=text.replace(/\bStarting Mana\b/gi,'Mana Pool')
  text=text.replace(/\bMana Regeneration\b/gi,'Magic Regen')
  text=text.replace(/\bMagic Regen\s*2\s*\+\s*Magic Level(?:\s*\+\s*bonuses)?\b/gi,'Magic Regen = Heart')
  text=text.replace(/\bMagic Level\s*\+\s*Inspiration\b/gi,'Magic Level + Spirit')
  text=text.replace(/\bMana Pool\s*(?:is equal to|=)?\s*2\s*\+\s*Magic Level(?:\s*\+\s*bonuses)?\b/gi,'Mana Pool = Magic Level + Spirit')
  text=text.replace(/\bMagic Regen\s*=\s*Heart\s*\+\s*2\b/gi,'Magic Regen = Heart')
  text=text.replace(/\bHeart\s*\+\s*2\b/gi,'Heart')
  text=text.replace(/Every character generates two\s*\[?2\]?\s*mana at the start of each combat round\.?/gi,'At the start of each combat round, each character restores Mana equal to their Magic Regen.')
  text=text.replace(/At the start of each combat round, each character restores Mana equal to (?:Heart|Spirit)\.?/gi,'At the start of each combat round, each character restores Mana equal to their Magic Regen.')
  text=text.replace(/At the start of each round, restore Mana equal to (?:Heart|Spirit)\.?/gi,'At the start of each round, restore Mana equal to Magic Regen.')
  text=text.replace(/players can gain additional MANA regeneration through magic levels, talents, abilities and condition\(s\)\.?/gi,'Effects that increase or decrease Mana restored at the start of a round modify Magic Regen; Talents, Abilities, equipment, and conditions may change it.')
  text=text.replace(/Each Magic Level increases mana regeneration by \+1\.?/gi,'Each Magic Level increases Mana Pool by +1.')
  text=text.replace(/Each level adds mana regeneration and spell capacity\.?/gi,'Each level increases Mana Pool and spell capacity.')
  text=text.replace(/modifiers will often be referred to by a secondary stat such as mettle, power, or accuracy\.?/gi,'secondary stats may derive from either an Attribute Rank or its modifier, as specified by each secondary-stat formula.')
  text=text.replace(/\bMettle\b/g,'Brawl').replace(/\bmettle\b/g,'brawl')
  text=text.replace(/\b2\s*\+\s*Agility Rank\b/gi,'Agility Modifier +2')
  text=text.replace(/Spirit is equal to (?:the )?characters?[’']?\s*Bravery Rank\.?/gi,'Heart is equal to the character’s Bravery Rank.')
  text=text.replace(/\bSpirit is equal to Bravery Rank\b/gi,'Heart is equal to Bravery Rank')
  text=text.replace(/Heart is equal to (?:the )?characters?[’']?\s*Bravery Rank\.?/gi,'Heart is equal to the character’s Bravery Rank.')
  text=text.replace(/\bHeart is equal to Bravery Rank\b/gi,'Heart is equal to Bravery Rank')
  text=text.replace(/\bHeart is equal to (?:the )?Bravery modifier\b/gi,'Spirit is equal to the Bravery modifier')
  text=text.replace(/\bInspiration is equal to (?:the )?Bravery modifier\b/gi,'Spirit is equal to the Bravery modifier')
  text=text.replace(/weapon[’']s damage value and power/gi,match=>match.replace(/power/i,'Fury'))
  text=text.replace(/(begin(?:s)?|start(?:s)?)([^.]{0,100})\b50\s*sp\b/gi,(_match,verb,between)=>`${verb}${between}${formatThreadpieceWpAs(STARTING_WEALTH_WP,'sp')}`)
  text=text.replace(/(Adventure Kit[^.]{0,100}(?:sell|sold|return|returned)[^.]{0,80})\b2\s*sp\b/gi,(_match,prefix)=>`${prefix}${formatThreadpieceWpAs(ADVENTURE_KIT_SELL_WP,'sp')}`)
  text=text.replace(/\b1\s*bp\s*=\s*2\s*sp\b/gi,'1 bp = 5 sp')
  text=text.replace(/\b1\s*Bolt Piece\s*=\s*2\s*Screw Pieces?\b/gi,'1 Bolt Piece = 5 Screw Pieces')
  if(/\bMight\b/i.test(text)&&/\bPower\b/i.test(text))text=text.replace(/\bPower\b/g,'Fury').replace(/\bpower\b/g,'fury')
  text=text.replace(/\b(WP|NP|SP|BP)\b/g,match=>match.toLowerCase())
  return text
}

const economyPatchKey=Symbol.for('brambleheart.canonical-economy-v1')
const runtimeState=globalThis as unknown as Record<PropertyKey,unknown>
if(!runtimeState[economyPatchKey]){
  // characterOptions retains legacy imported price fields; replace the active catalog in place from one integer-wp authority.
  const canonicalCatalog=economyGearCatalog(gearShopItems)
  gearShopItems.splice(0,gearShopItems.length,...canonicalCatalog)

  const characterCreation=ruleSourceDocuments['character-creation']
  if(characterCreation){
    for(const section of characterCreation.sections){
      for(const block of section.blocks){
        if(block.type==='paragraph'){
          block.text=block.text.replace(/\b50\s*sp\b/gi,formatThreadpieceWpAs(STARTING_WEALTH_WP,'sp'))
            .replace(/(Adventure Kit[^.]{0,120}(?:sell|sold|return|returned)[^.]{0,100})\b2\s*sp\b/gi,(_match,prefix)=>`${prefix}${formatThreadpieceWpAs(ADVENTURE_KIT_SELL_WP,'sp')}`)
        }else block.rows=block.rows.map(row=>row.map(cell=>String(cell).replace(/\b50\s*sp\b/gi,formatThreadpieceWpAs(STARTING_WEALTH_WP,'sp'))))
      }
    }
  }

  for(const documentKey of ['weapons','armor-shields','adventuring-gear','trade-goods','transportation']){
    const document=ruleSourceDocuments[documentKey]
    if(!document)continue
    for(const section of document.sections){
      for(const block of section.blocks){
        if(block.type!=='table'||block.rows.length<2)continue
        if(documentKey==='adventuring-gear'){
          block.rows=block.rows.map(row=>{
            const rowText=row.join(' ')
            if(!/Bolt Piece|\b1\s*bp\b/i.test(rowText))return row
            return row.map(cell=>String(cell).replace(/\b2\s*sp\b/gi,'5 sp').replace(/2\s*Screw Pieces?/gi,'5 Screw Pieces'))
          })
        }
        const headers=block.rows[0].map(cell=>String(cell))
        const costIndexes=headers.map((cell,index)=>/\b(cost|price|value)\b/i.test(cell)?index:-1).filter(index=>index>=0)
        if(!costIndexes.length)continue
        block.rows=block.rows.map((row,rowIndex)=>{
          if(rowIndex===0)return row
          const itemName=String(row[0]||'').trim()
          const price=canonicalRulePriceLabel(documentKey,itemName)
          if(!price)return row
          return row.map((cell,index)=>costIndexes.includes(index)?price:cell)
        })
      }
    }
  }

  const tradeGoods=ruleSourceDocuments['trade-goods']
  if(tradeGoods&&!tradeGoods.sections.some(section=>section.heading==='CRAFTING ECONOMY'))tradeGoods.sections.push({
    heading:'CRAFTING ECONOMY',
    blocks:[
      {type:'paragraph',text:`Crafting a market-priced item consumes eligible listed materials with a combined base trade value equal to at least ${CRAFTING_MATERIAL_FLOOR_PERCENT}% of the item’s current retail price.`},
      {type:'paragraph',text:'The crafter chooses quantities from the listed component types until the material-value floor is met. The Watcher may require a specific rare component when the fiction calls for it.'},
      {type:'paragraph',text:'This value floor does not replace the required Skill, tools or kit, time, workspace, or any rule-specific crafting checks. Gathered materials may legitimately create value as a reward for time, risk, Skills, and access to rare resources.'},
    ],
  })
  const adventuringGear=ruleSourceDocuments['adventuring-gear']
  if(adventuringGear&&!adventuringGear.sections.some(section=>section.heading==='RESALE & MARKET VALUE'))adventuringGear.sections.push({
    heading:'RESALE & MARKET VALUE',
    blocks:[
      {type:'paragraph',text:'Ordinary gear normally resells for 50% of its current retail value, rounded down to the nearest wp. The Adventure Kit has a fixed creation sellback of 3 sp rather than a component-based resale value.'},
      {type:'paragraph',text:'Trade goods normally sell for 75% of their listed base value. The Watcher may adjust availability or resale for scarcity, regional demand, damage, or other circumstances.'},
    ],
  })
  runtimeState[economyPatchKey]=true
}

const fundamentals=ruleSourceDocuments.fundamentals
if(fundamentals){
  const secondary=fundamentals.sections.find(section=>/secondary/i.test(section.heading))||fundamentals.sections.find(section=>/attribute/i.test(section.heading))
  if(secondary&&!secondary.blocks.some(block=>block.type==='paragraph'&&/Accuracy is equal to Agility Rank/i.test(block.text))){
    secondary.blocks.push({type:'paragraph',text:'SECONDARY STATS: Accuracy is equal to Agility Rank and adds to ranged damage. Aim is equal to the Agility modifier and is used for ranged Strike rolls. Speed is equal to the Agility modifier +2. Fury is equal to Might Rank and adds to melee damage; Brawl is equal to the Might modifier and is used for melee Strike rolls. Guts is equal to Hide Rank and reduces damage; Ward is equal to the Hide modifier and is used to defend. Power is equal to Lore Rank and adds to magical damage; Control is equal to the Lore modifier and is used for magical Strike rolls. Heart is equal to Bravery Rank and contributes to Magic Regen; Spirit is equal to the Bravery modifier and adds to Mana Pool.'})
  }
  const rounds=fundamentals.sections.find(section=>/round|mana/i.test(section.heading))
  if(rounds&&!rounds.blocks.some(block=>block.type==='paragraph'&&/Mana Pool is equal to Magic Level/i.test(block.text))){
    rounds.blocks.push({type:'paragraph',text:'MANA UPDATE: Mana Pool is equal to Magic Level + Spirit. Magic Regen is equal to Heart and is the amount of Mana restored at the start of each round. Effects that increase or decrease start-of-round Mana modify Magic Regen.'})
  }
}


function amendCoreAbilityRules(){
  for(const ability of coreAbilities){
    for(const field of ability.fields){
      if(ability.name.toUpperCase()==='MELEE STRIKE'&&field.label.toUpperCase()==='EFFECT')field.value=field.value.replace(/\bmettle\b/gi,'Brawl')
      if(ability.name.toUpperCase()==='MELEE STRIKE'&&field.label.toUpperCase()==='DAMAGE')field.value=field.value.replace(/\bpower\b/gi,'Fury')
      if(ability.name.toUpperCase()==='ARCANE COMMAND'&&field.label.toUpperCase()==='DAMAGE'&&!/\bPower\b/.test(field.value))field.value=field.value.replace(/plus any conditions\.?$/i,'plus Power and any conditions.')
    }
  }
}
amendCoreAbilityRules()
for(const source of Object.values(ruleSourceDocuments)){
  for(const section of source.sections){
    section.heading=applyGameRuleAmendments(section.heading)
    for(const block of section.blocks){
      if(block.type==='paragraph')block.text=applyGameRuleAmendments(block.text)
      else block.rows=block.rows.map(row=>row.map(cell=>applyGameRuleAmendments(cell)))
    }
  }
}

const coreFieldOriginals=new Map<object,string>()
for(const ability of coreAbilities)for(const field of ability.fields)coreFieldOriginals.set(field,field.value)
const paragraphOriginals=new WeakMap<object,string>()
const tableOriginals=new WeakMap<object,string[][]>()
for(const source of Object.values(ruleSourceDocuments)){
  for(const section of source.sections){
    for(const block of section.blocks){
      if(block.type==='paragraph')paragraphOriginals.set(block,block.text)
      else tableOriginals.set(block,block.rows.map(row=>[...row]))
    }
  }
}
function applyMeasurementDisplay(){
  const unit=currentMeasurement()
  for(const ability of coreAbilities)for(const field of ability.fields)field.value=formatMeasurementText(coreFieldOriginals.get(field)||field.value,unit)
  for(const source of Object.values(ruleSourceDocuments)){
    for(const section of source.sections){
      for(const block of section.blocks){
        if(block.type==='paragraph')block.text=formatMeasurementText(paragraphOriginals.get(block)||block.text,unit)
        else{
          const original=tableOriginals.get(block)||block.rows
          block.rows=original.map(row=>row.map(cell=>formatMeasurementText(cell,unit)))
        }
      }
    }
  }
}
applyMeasurementDisplay()
if(typeof window!=='undefined')window.addEventListener('brambleheart:measurement-change',applyMeasurementDisplay)
