<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { findRulePage, fundamentalsNavigation, loreNavigation, quickFaq, quickReferencePages, resolveSourceSections, ruleCategories } from '../data/ruleCatalog'
import { speciesData } from '../data/speciesData'
import { loreSpells } from '../data/magicOptions'
import { loreDescriptions, spellDetails } from '../data/magicDetails'
import aoeLineImage from '../assets/rules/aoe-line.png'
import aoeConeImage from '../assets/rules/aoe-cone.png'
import aoeOrbImage from '../assets/rules/aoe-orb.png'
import aoeBlockedImage from '../assets/rules/aoe-blocked.png'
import { externalMonsters, findExternalMonster, monsterCategories, monsterSlug, WOODLANDS_ENCOUNTERS_URL, WOODLANDS_MONSTERS_URL } from '../data/externalMonsters'
import { recordRecentRule } from '../services/ruleRecent'
import { ruleSourceDocuments, type RuleSourceBlock, type RuleSourceSection } from '../data/rulesSource'

const route=useRoute()
const slug=computed(()=>String(route.params.slug||''))
const page=computed(()=>findRulePage(slug.value))
const rawSourceSections=computed(()=>page.value?resolveSourceSections(page.value):[])
watch(slug,value=>{if(value)recordRecentRule(value)},{immediate:true})

const bannerModules=import.meta.glob('../assets/rule-banners/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP}',{eager:true,query:'?url',import:'default'}) as Record<string,string>
function bannerKey(value:string){const key=value.replace(/[^a-z0-9]+/gi,'').toLowerCase();return key==='athromundas'?'anthromundas':key}
function bannerStem(path:string){return (path.split('/').pop()||'').replace(/\.[^.]+$/,'').replace(/^banner[-_ ]*/i,'')}
const currentBanner=computed(()=>{
  if(!page.value)return''
  const wanted=Array.from(new Set([page.value.title,page.value.slug,page.value.title.replace(/^Lore of /i,''),page.value.slug.replace(/^lore[-_]?/i,'')].map(bannerKey).filter(Boolean)))
  const entry=Object.entries(bannerModules).find(([path])=>{
    const stem=bannerKey(bannerStem(path));return wanted.some(key=>stem===key||stem.endsWith(key)||key.endsWith(stem))
  })
  return entry?.[1]||''
})
const ruleNavRef=ref<HTMLElement|null>(null)
function scrollRuleNav(direction:number){ruleNavRef.value?.scrollBy({left:direction*320,behavior:'smooth'})}
const abilityCostKeywords=new Set(['Root','Move','Movement','Combat','Reaction','Reactive','Instinct','Passive'])
function abilityTypes(values:string[]){return traitKeywords(values).filter(value=>abilityCostKeywords.has(value))}
function remainingTraitKeywords(values:string[],kind:string,speciesName:string){const speciesNames=new Set(speciesData.map(item=>item.name.toLowerCase()));return traitKeywords(values).filter(value=>!abilityCostKeywords.has(value)&&!['Trait','Heritage','Cultural','Culture'].includes(value)&&!speciesNames.has(value.toLowerCase())).concat([kind,speciesName])}
function manaCostFromRule(text:string){const match=text.match(/\bCOST:\s*\[?([0-9]+)\]?\s*mana/i);return match?Number(match[1]):null}

function displayText(value:string){
  return value.replace(/\bProwess\b/g,'Agility').replace(/\bprowess\b/g,'agility')
}
function isDialogue(value:string){return /\b(?:Watcher|Player|Selu):/.test(value)}
function dialogueParts(value:string){
  const parts:Array<{actor:string;text:string}>=[]
  const rx=/(Watcher|Player|Selu):\s*[“"]?([^”"]+)[”"]?/g
  let match:RegExpExecArray|null
  while((match=rx.exec(value)))parts.push({actor:match[1],text:match[2].trim()})
  return parts
}
function keywordParts(value:string){
  if(!/^KEYWORDS?:/i.test(value.trim()))return[]
  return value.split(':',2)[1].split('|').map(item=>item.trim()).filter(Boolean)
}
function isKeywordBlock(block:RuleSourceBlock){return block.type==='paragraph'&&keywordParts(block.text).length>0}
function isExampleHeading(value:string){return /example/i.test(value)}

const sourceSections=computed(()=>{
  const entries=rawSourceSections.value
  if(page.value?.loreHeading){
    const entry=entries[0];if(!entry)return[]
    const headings=new Set(loreNavigation.map(item=>item.heading))
    const blocks=entry.section.blocks
    const start=blocks.findIndex(block=>block.type==='paragraph'&&block.text.trim()===page.value?.loreHeading)
    if(start<0)return[]
    let end=blocks.length
    for(let index=start+1;index<blocks.length;index++){const block=blocks[index];if(block.type==='paragraph'&&headings.has(block.text.trim())){end=index;break}}
    const section:RuleSourceSection={heading:page.value.loreHeading,blocks:blocks.slice(start+1,end)}
    return[{...entry,section}]
  }
  if(slug.value!=='introduction')return entries
  const filtered=entries.filter(entry=>entry.section.heading!=='WHAT YOU’LL NEED')
  const watcher=filtered.find(entry=>entry.section.heading==='THE WATCHER')
  const flow=filtered.find(entry=>entry.section.heading==='HOW THE GAME FLOWS')
  if(!watcher||!flow)return filtered
  const merged:RuleSourceSection={heading:'THE WATCHER',blocks:[...flow.section.blocks,...watcher.section.blocks]}
  const out=filtered.filter(entry=>entry.section.heading!=='THE WATCHER'&&entry.section.heading!=='HOW THE GAME FLOWS')
  const insertAt=Math.max(0,out.findIndex(entry=>entry.section.heading==='CORE PRINCIPLES OF PLAY'))
  out.splice(insertAt<0?out.length:insertAt,0,{...watcher,section:merged})
  return out
})

const fundamentalIndex=computed(()=>fundamentalsNavigation.findIndex(item=>item.slug===slug.value))
const previousFundamental=computed(()=>fundamentalIndex.value>0?fundamentalsNavigation[fundamentalIndex.value-1]:null)
const nextFundamental=computed(()=>fundamentalIndex.value>=0&&fundamentalIndex.value<fundamentalsNavigation.length-1?fundamentalsNavigation[fundamentalIndex.value+1]:null)
const loreIndex=computed(()=>loreNavigation.findIndex(item=>item.slug===slug.value))
const previousLore=computed(()=>loreIndex.value>0?loreNavigation[loreIndex.value-1]:null)
const nextLore=computed(()=>loreIndex.value>=0&&loreIndex.value<loreNavigation.length-1?loreNavigation[loreIndex.value+1]:null)
const sectionPages=computed(()=>{
  if(fundamentalIndex.value>=0||loreIndex.value>=0)return[]
  if(quickReferencePages.some(item=>item.slug===slug.value))return quickReferencePages
  return ruleCategories.find(category=>category.pages.some(item=>item.slug===slug.value))?.pages||[]
})
const sectionIndex=computed(()=>sectionPages.value.findIndex(item=>item.slug===slug.value))
const previousSection=computed(()=>sectionIndex.value>0?sectionPages.value[sectionIndex.value-1]:null)
const nextSection=computed(()=>sectionIndex.value>=0&&sectionIndex.value<sectionPages.value.length-1?sectionPages.value[sectionIndex.value+1]:null)

const breadcrumbSection=computed(()=>{
  if(loreIndex.value>=0||quickReferencePages.some(item=>item.slug===slug.value))return'References'
  if(findExternalMonster(slug.value))return'The Watcher'
  return ruleCategories.find(category=>category.pages.some(item=>item.slug===slug.value))?.title||'Rules'
})
function labeledParagraph(value:string){
  const text=displayText(value).trim()
  const match=text.match(/^([^:]{2,45}):\s+(.+)$/)
  return match?{label:match[1],body:match[2]}:{label:'',body:text}
}
function bulletParts(value:string){
  const parts=displayText(value).split(/\s*•\s*/).map(part=>part.trim()).filter(Boolean)
  return parts.length>1?parts:[]
}
function singleCellText(block:RuleSourceBlock){return block.type==='table'&&block.rows.length===1&&block.rows[0].length===1?displayText(block.rows[0][0]).trim():''}

type StructuredField={label:string;value:string}
function structuredRule(text:string):{intro:string;fields:StructuredField[]}{
  const labels=['COST','TRIGGER','DECLARE','DECLEAR','TARGET','EFFECT','RESTRICTION','RESTRICTIONS','DURATION','EMPOWER','COOLDOWN','AFTERBURN','PURIFY','REQUIRES','KEYWORDS']
  const rx=new RegExp(`\\b(${labels.join('|')}):\\s*`,'gi');const matches=Array.from(text.matchAll(rx));if(!matches.length)return{intro:text.trim(),fields:[]}
  const intro=text.slice(0,matches[0].index).trim();const fields=matches.map((match,index)=>({label:match[1].toUpperCase().replace('DECLEAR','DECLARE'),value:text.slice((match.index||0)+match[0].length,index+1<matches.length?matches[index+1].index:text.length).trim()}))
  return{intro,fields}
}
function visibleRuleFields(text:string){return structuredRule(text).fields.filter(field=>field.label!=='COST'&&field.label!=='KEYWORDS')}

const currentSpecies=computed(()=>slug.value.startsWith('species-')?speciesData.find(item=>`species-${item.name.toLowerCase()}`===slug.value)||null:null)
const currentMonster=computed(()=>findExternalMonster(slug.value)||null)
const monsterGroups=computed(()=>monsterCategories.map(category=>{
  const monsters=externalMonsters.filter(monster=>monster.category===category.name)
  const parents=monsters.filter(monster=>!monster.group)
  const families=parents.map(parent=>({parent,children:monsters.filter(monster=>monster.group===parent.name)}))
  const groupedNames=new Set(families.flatMap(family=>[family.parent.name,...family.children.map(child=>child.name)]))
  for(const orphan of monsters.filter(monster=>!groupedNames.has(monster.name)))families.push({parent:orphan,children:[]})
  return{category,monsters,families}
}))
const talentSections=ruleSourceDocuments.talents.sections.filter(section=>section.heading!=='Overview'&&section.heading!=='TALENTS'&&!section.heading.startsWith('KEYWORDS'))
function talentRuleText(name:string){const section=talentSections.find(item=>item.heading===name);return section?.blocks.filter(block=>block.type==='paragraph').map(block=>block.type==='paragraph'?block.text:'').join(' ')||''}
function talentRuleKeywords(name:string){const match=talentRuleText(name).match(/\bKEYWORDS?:\s*(.+)$/i);return match?match[1].split('|').map(item=>item.trim()).filter(Boolean):[]}
function talentCategory(name:string){const hay=`${name} ${talentRuleText(name)} ${talentRuleKeywords(name).join(' ')}`.toLowerCase();if(/spell|mana|magic|lore|invocation/.test(hay))return'Magic';if(/ward|defen|guard|block|resist|armor|shield|protect/.test(hay))return'Defensive Combat';if(/strike|weapon|combat|attack|damage|shoot|melee/.test(hay))return'Offensive Combat';if(/move|movement|speed|travel|climb|jump/.test(hay))return'Movement';if(/health|guts|resist|defen|surviv|rest|heal/.test(hay))return'Survival';if(/charm|presence|social|speech|ally|friend|kin/.test(hay))return'Social';return'Utility'}
const talentCategories=['Offensive Combat','Defensive Combat','Magic','Movement','Survival','Social','Utility'] as const
const talentRuleGroups=computed(()=>talentCategories.map(category=>({category,talents:talentSections.map(section=>section.heading).filter(name=>talentCategory(name)===category)})).filter(group=>group.talents.length))
const spellLoreBySlug:Record<string,string>={'lore-invocation':'Invocation','lore-flames':'Flames','lore-frost':'Frost','lore-hallows':'Hallows','lore-harmony':'Harmony','lore-life':'Life','lore-oath':'Oath','lore-wilds':'Wilds'}
const currentSpellLore=computed(()=>spellLoreBySlug[slug.value]||'')
const currentLoreSpells=computed(()=>currentSpellLore.value?(loreSpells[currentSpellLore.value]||[]):[])
function spellRuleDetail(name:string){return spellDetails[name]}
function spellLoreClass(name:string){return `spell-lore-${String(spellDetails[name]?.lore||'invocation').toLowerCase()}`}
const aoeRules=[
  {title:'Line',keyword:'LINE[n]',image:aoeLineImage,text:'A line is always straight, never bending, and affects every square it touches along the way. The caster chooses the direction; it continues from the caster until it reaches its listed maximum length or an obstacle the spell cannot pass through.',example:'LINE[10] traces a straight line exactly ten squares long in a chosen cardinal direction. Every character, object, or terrain feature whose square falls along that path is affected.'},
  {title:'Cone',keyword:'CONE[n]',image:aoeConeImage,text:'A cone begins adjacent to the caster and extends outward in a triangular pattern on the grid. Its width grows as it advances, matching the listed area size.',example:'CONE[6] starts in the square directly in front of the caster and expands to a roughly triangular shape six squares long and six squares wide at its farthest edge.'},
  {title:'Orb',keyword:'ORB[n]',image:aoeOrbImage,text:'The caster chooses a valid point within the spell’s casting range. The orb expands from that square as a square-shaped area whose size is determined by the orb number. It ignores the caster’s facing.',example:'ORB[7] creates a 7×7 block of squares from the chosen point. Every character whose square lies inside that area, including the edges, is affected.'},
]

function traitKeywords(values:string[]){return Array.from(new Set(values.flatMap(value=>String(value).split(/[|,;]+/).map(item=>item.trim()).filter(Boolean))))}
function skillTreeName(block:RuleSourceBlock){if(block.type!=='table'||block.rows.length<2)return'';const row=block.rows[1];return row.length===1&&/Skill Tree$/i.test(row[0])?displayText(row[0]):''}
function skillTreeTone(name:string){return name.toLowerCase().split(' ')[0]||'skill'}
function isBuildingSeluTable(block:RuleSourceBlock){const text=singleCellText(block);return /^Selu(?:’s| of )/i.test(text)}

function bracketParts(value:string){
  const text=displayText(value);const parts:Array<{text:string;bold:boolean}>=[];const rx=/(\[[+-]?\d+(?:\.\d+)?\])/g;let last=0,match:RegExpExecArray|null
  while((match=rx.exec(text))){if(match.index>last)parts.push({text:text.slice(last,match.index),bold:false});parts.push({text:match[0],bold:true});last=match.index+match[0].length}
  if(last<text.length)parts.push({text:text.slice(last),bold:false});return parts.length?parts:[{text,bold:false}]
}
function isLongNarrativeHeading(value:string){const t=displayText(value).trim();return t.startsWith('Packs, Herds, & Kinships (Optional Rule)')||t.startsWith('WATCHER’S NOTE')}
function narrativeParts(value:string){const t=displayText(value).trim();if(t.startsWith('WATCHER’S NOTE'))return{title:'WATCHER’S NOTE',body:t.replace(/^WATCHER’S NOTE\s*/,'')};const title='Packs, Herds, & Kinships (Optional Rule)';return{title,body:t.replace(title,'').trim()}}
const boxedRuleSlugs=new Set(['homeland','oath','faith','talents','adventuring-gear','lore-invocation','lore-flames','lore-frost','lore-hallows','lore-harmony','lore-life','lore-oath','lore-wilds'])
function boxedRulePage(){return boxedRuleSlugs.has(slug.value)}
function abilityBoxPage(){return slug.value==='talents'||Boolean(currentSpellLore.value)}
function entryRuleText(entry:{section:RuleSourceSection}){return entry.section.blocks.filter(block=>block.type==='paragraph').map(block=>block.type==='paragraph'?block.text:'').join(' ')}
function entryKeywords(entry:{section:RuleSourceSection}){return Array.from(new Set<string>(entry.section.blocks.filter(block=>block.type==='paragraph').flatMap(block=>block.type==='paragraph'?keywordParts(block.text):[])))}
function entryAbilityTypes(entry:{section:RuleSourceSection}){return entryKeywords(entry).filter(value=>abilityCostKeywords.has(value))}
function entryDisplayKeywords(entry:{section:RuleSourceSection}){return entryKeywords(entry).filter(value=>!abilityCostKeywords.has(value))}
function entryMana(entry:{section:RuleSourceSection}){return manaCostFromRule(entryRuleText(entry))}
function equipmentTableRows(block:RuleSourceBlock){
  if(slug.value!=='adventuring-gear'||block.type!=='table'||block.rows.length<2||block.rows[0].length<2)return[]
  const headers=block.rows[0].map(displayText);return block.rows.slice(1).filter(row=>row.some(cell=>String(cell).trim())).map(row=>({name:displayText(row[0]||'Item'),fields:row.slice(1).map((cell,index)=>({label:headers[index+1]||`Value ${index+1}`,value:displayText(cell||'—')}))}))
}
type DeedEntry={name:string;flavor:string;objective:string;reward:string;keywords:string[]}
const sparkRuleSections=computed(()=>ruleSourceDocuments.sparks.sections.filter(section=>section.heading!=='Overview'&&section.blocks.length))
const deedIntro=computed(()=>ruleSourceDocuments.deeds.sections.filter(section=>section.heading==='DEEDS'&&section.blocks.length).flatMap(section=>section.blocks.filter(block=>block.type==='paragraph').map(block=>block.type==='paragraph'?block.text:'')))
const deedResolution=computed(()=>ruleSourceDocuments.deeds.sections.find(section=>section.heading==='DEED RESOLUTION')?.blocks.filter(block=>block.type==='paragraph').map(block=>block.type==='paragraph'?block.text:'')||[])
const deedEntries=computed<DeedEntry[]>(()=>{
  const blocks=ruleSourceDocuments.deeds.sections.find(section=>section.heading==='DEEDS LIST')?.blocks.filter(block=>block.type==='paragraph').map(block=>block.type==='paragraph'?block.text.trim():'').filter(Boolean)||[]
  const lines:string[]=[]
  for(let i=0;i<blocks.length;i++){const current=blocks[i];if(!/Objective \(Mechanical\):/.test(current)&&i+1<blocks.length&&/Objective \(Mechanical\):/.test(blocks[i+1])){lines.push(`${current} ${blocks[++i]}`)}else lines.push(current)}
  const knownNames=['Participation Trophy','Skill of the Day','Voice of the Table','Brush with Fate','Steady Hand','Heart of the Party','Calculated Edge','Wild Wanderer','Spark of Insight','Brushfire Courage','Steadfast Resolve','Tinker’s Triumph','Hope in the Ashes','Measured Breath','Inventor’s Spark','Gentle Guardian','Quiet Observer','Pathfinder’s Mark','Flicker of Faith','Rebel’s Smile','Scholar’s Patience','Trickster’s Turn','Lone Path','Silent Strength','Mind Like Water','Boundless Heart','Trailblazer','Wise Fool','Tether of Trust','Vision in Shadow','Master of the Moment']
  return lines.map(text=>{const name=knownNames.find(candidate=>text.startsWith(candidate))||text.split(' Objective (Mechanical):')[0];const rest=text.slice(name.length).trim();const match=rest.match(/^([^]*?)\s*Objective \(Mechanical\):\s*([^]*?)\s*Reward:\s*([^]*?)\s*Keywords:\s*([^]*)$/);if(!match)return null;return{name,flavor:match[1].trim(),objective:match[2].trim(),reward:match[3].trim(),keywords:match[4].split(',').map(x=>x.trim()).filter(Boolean)}}).filter((item):item is DeedEntry=>Boolean(item))
})
</script>

<template>
  <main class="page rule-reader-page">
    <AppHeader compact back-to="/rules" back-label="Back to Rules" prefer-back-to skip-back-prefix="/rules/read/" />

    <template v-if="page">
      <nav class="rule-breadcrumb" aria-label="Breadcrumb"><RouterLink to="/rules">Rules</RouterLink><span>›</span><span>{{ breadcrumbSection }}</span><span>›</span><strong>{{ page.title }}</strong></nav>
      <div class="page-title-block rule-reader-title">
        <h1>{{ page.title }}</h1>
        <p>{{ page.summary }}</p>
      </div>
      <div class="rule-page-banner-placeholder" :class="{empty:!currentBanner}" :style="currentBanner?{backgroundImage:`url(${currentBanner})`}:undefined" aria-hidden="true"></div>

      <div v-if="fundamentalIndex>=0||loreIndex>=0" class="rule-nav-scroll-shell"><button type="button" class="rule-nav-scroll-button left" aria-label="Scroll rule navigation left" @click="scrollRuleNav(-1)">‹</button><nav ref="ruleNavRef" v-if="fundamentalIndex>=0" class="fundamental-inner-links card-surface" aria-label="The Fundamentals pages"><RouterLink v-for="item in fundamentalsNavigation" :key="item.slug" :to="`/rules/read/${item.slug}`" :class="{active:item.slug===slug}">{{ item.title }}</RouterLink></nav>
      <nav ref="ruleNavRef" v-else class="fundamental-inner-links lore-inner-links card-surface" aria-label="Lore of Anthro Mundas pages"><RouterLink v-for="item in loreNavigation" :key="item.slug" :to="`/rules/read/${item.slug}`" :class="{active:item.slug===slug}">{{ item.title }}</RouterLink></nav><button type="button" class="rule-nav-scroll-button right" aria-label="Scroll rule navigation right" @click="scrollRuleNav(1)">›</button></div>

      <template v-if="page.slug==='playable-species'">
        <section class="rule-content-card card-surface playable-species-reader">
          <article class="rule-copy-card"><h2>Playable Species</h2><p>Choose a Species to read its lore, Heritage Traits, Culture Traits, and native language.</p></article>
          <RouterLink v-for="species in speciesData" :key="species.name" class="list-row" :to="`/rules/read/species-${species.name.toLowerCase()}`">
            <span class="list-row-copy"><span class="list-row-title">{{ species.name }}</span><span class="list-row-subtitle">{{ species.theme }}</span></span><svg class="row-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>
          </RouterLink>
        </section>
      </template>

      <template v-else-if="currentSpecies">
        <section class="species-rule-sheet">
          <article class="species-rule-lore card-surface"><header><h2>{{ currentSpecies.name }}</h2><small>{{ currentSpecies.pronunciation }}</small></header><p class="species-rule-quote">“{{ currentSpecies.quote }}”</p><p>{{ currentSpecies.lore }}</p><p><strong>Language:</strong> {{ currentSpecies.language }}</p></article>
          <details class="organized-rule-category species-rule-trait-section card-surface" open><summary><span><h2>Heritage Traits</h2><small>{{ currentSpecies.speciesTraits.length }} traits</small></span><span aria-hidden="true">⌄</span></summary><div class="organized-rule-category-body rule-box-grid"><article v-for="trait in currentSpecies.speciesTraits" :key="trait.name" class="rule-feature-box species-trait-rule"><header><h3>{{ trait.name }}</h3><div class="rule-title-costs"><span v-for="type in abilityTypes(trait.keywords)" :key="type" class="ability-cost-pill">{{ type }}</span><span v-if="manaCostFromRule(trait.text)!==null" class="mana-badge">{{ manaCostFromRule(trait.text) }} Mana</span></div></header><p v-if="structuredRule(trait.text).intro" class="rule-flavor">{{ structuredRule(trait.text).intro }}</p><div v-if="visibleRuleFields(trait.text).length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(trait.text)" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div class="keyword-pill-row"><span v-for="keyword in remainingTraitKeywords(trait.keywords,'Heritage',currentSpecies.name)" :key="keyword" class="keyword-pill">{{ keyword }}</span></div></article></div></details>
          <details class="organized-rule-category species-rule-trait-section card-surface" open><summary><span><h2>Cultural Traits</h2><small>{{ currentSpecies.cultureTraits.length }} traits</small></span><span aria-hidden="true">⌄</span></summary><div class="organized-rule-category-body rule-box-grid"><article v-for="trait in currentSpecies.cultureTraits" :key="trait.name" class="rule-feature-box culture-trait-rule"><header><h3>{{ trait.name }}</h3><div class="rule-title-costs"><span v-for="type in abilityTypes(trait.keywords)" :key="type" class="ability-cost-pill">{{ type }}</span><span v-if="manaCostFromRule(trait.text)!==null" class="mana-badge">{{ manaCostFromRule(trait.text) }} Mana</span></div></header><p v-if="structuredRule(trait.text).intro" class="rule-flavor">{{ structuredRule(trait.text).intro }}</p><div v-if="visibleRuleFields(trait.text).length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(trait.text)" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div class="keyword-pill-row"><span v-for="keyword in remainingTraitKeywords(trait.keywords,'Cultural',currentSpecies.name)" :key="keyword" class="keyword-pill">{{ keyword }}</span></div></article></div></details>
        </section>
      </template>

      <template v-else-if="page.slug==='talents'">
        <section class="organized-rule-stack">
          <details v-for="group in talentRuleGroups" :key="group.category" class="organized-rule-category card-surface" open><summary><span><h2>{{ group.category }}</h2><small>{{ group.talents.length }} {{ group.talents.length===1?'Talent':'Talents' }}</small></span><span aria-hidden="true">⌄</span></summary><div class="organized-rule-category-body review-box-list"><article v-for="talent in group.talents" :key="talent" class="review-feature-box talent full-rule-entry talent-detail-card"><header><strong>{{ talent }}</strong><div class="rule-title-costs"><span v-for="type in abilityTypes(talentRuleKeywords(talent))" :key="type" class="ability-cost-pill">{{ type }}</span><span v-if="manaCostFromRule(talentRuleText(talent))!==null" class="mana-badge">{{ manaCostFromRule(talentRuleText(talent)) }} Mana</span></div></header><p v-if="structuredRule(talentRuleText(talent)).intro" class="rule-flavor"><em>{{ structuredRule(talentRuleText(talent)).intro }}</em></p><div v-if="visibleRuleFields(talentRuleText(talent)).length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(talentRuleText(talent))" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div v-if="talentRuleKeywords(talent).length" class="keyword-pill-row"><span v-for="keyword in talentRuleKeywords(talent).filter(value=>!abilityCostKeywords.has(value))" :key="keyword" class="keyword-pill">{{ keyword }}</span></div></article></div></details>
        </section>
      </template>

      <template v-else-if="currentSpellLore">
        <section class="organized-rule-stack">
          <details class="organized-rule-category card-surface" open><summary><span><h2>{{ currentSpellLore==='Invocation'?'Invocation Spells':`Lore of ${currentSpellLore}` }}</h2><small>{{ currentLoreSpells.length }} spells</small></span><span aria-hidden="true">⌄</span></summary><div class="organized-rule-category-body review-spell-column"><article v-for="spell in currentLoreSpells" :key="spell" class="review-feature-box spell full-rule-entry spell-detail-card" :class="spellLoreClass(spell)"><header><strong>{{ spell }}</strong><span v-if="spellRuleDetail(spell)?.manaCost!=null" class="mana-badge">{{ spellRuleDetail(spell)?.manaCost }} Mana</span></header><span>{{ spellRuleDetail(spell)?.lore }}</span><p v-if="spellRuleDetail(spell)?.flavor" class="rule-flavor"><em>{{ spellRuleDetail(spell)?.flavor }}</em></p><div v-if="visibleRuleFields(spellRuleDetail(spell)?.rules||'').length" class="rule-breakdown-grid"><div v-for="field in visibleRuleFields(spellRuleDetail(spell)?.rules||'')" :key="field.label"><small>{{ field.label }}</small><span>{{ field.value }}</span></div></div><div v-if="spellRuleDetail(spell)?.keywords?.length" class="keyword-pill-row"><span v-for="keyword in spellRuleDetail(spell)?.keywords" :key="keyword" class="keyword-pill">{{ keyword }}</span></div></article></div><div v-if="loreDescriptions[currentSpellLore]" class="organized-category-note">{{ loreDescriptions[currentSpellLore] }}</div></details>
        </section>
      </template>

      <template v-else-if="page.slug==='area-of-effect'">
        <section class="aoe-rule-page organized-rule-stack"><article class="rule-feature-box aoe-intro-card"><header><h2>Area of Effect</h2></header><p>There are three area-of-effect keywords used by spells that target an area: <strong>Line</strong>, <strong>Cone</strong>, and <strong>Orb</strong>. Each keyword is followed by a number representing the size of the effect. Any character or object within the area is affected.</p></article><article v-for="rule in aoeRules" :key="rule.title" class="rule-feature-box aoe-rule-card"><header><div><h2>{{ rule.title }}</h2><span class="keyword-pill">{{ rule.keyword }}</span></div></header><div class="aoe-rule-layout"><div><p>{{ rule.text }}</p><p class="rule-example-copy"><strong>Example:</strong> {{ rule.example }}</p></div><img :src="rule.image" :alt="`${rule.title} area-of-effect grid example`" /></div></article><article class="rule-feature-box aoe-rule-card"><header><h2>Direct Casting</h2></header><p>Any spell without an area-of-effect keyword is considered Direct. It affects only the chosen target and ignores everything between caster and target. The target must be within the spell’s listed range and valid for that spell. If a spell may target an ally or friendly character, the caster may choose themselves.</p></article><article class="rule-feature-box aoe-rule-card"><header><h2>Impassable Collision</h2></header><div class="aoe-rule-layout compact"><div><p>All area effects are stopped by impassable terrain such as solid walls, sealed doors, thick stone, reinforced structures, or another space the Watcher determines the effect cannot pass through.</p><p class="rule-example-copy"><strong>Example:</strong> When a cone touches an impassable wall, the blocked portion of the cone is removed while the rest of its shape remains intact.</p></div><img :src="aoeBlockedImage" alt="Cone area blocked by impassable terrain" /></div></article></section>
      </template>

      <template v-else-if="page.slug==='encounters-threat-level'">
        <section class="rule-content-card card-surface external-rule-page"><article class="rule-feature-box encounter-rating-box"><header><h2>Encounter Rating (ER)</h2></header><p>Encounter difficulty is measured with Encounter Rating rather than character level. For an individual character or creature, add its Attribute ranks together and divide the total by 6. The referenced example rounds 16 ÷ 6 down from 2.67 to ER 2.</p></article><article class="rule-feature-box"><header><h2>Group Encounter Rating</h2></header><p>Add the individual ER values of the characters in the group. That total represents the group’s overall encounter strength.</p></article><article class="rule-feature-box"><header><h2>Encounter Difficulty</h2></header><p>The source recommends using creatures roughly two ER above or below the character or group ER as the normal encounter range.</p></article><a class="secondary-button external-source-link" :href="WOODLANDS_ENCOUNTERS_URL" target="_blank" rel="noopener noreferrer">Open Source Encounter Reference</a></section>
      </template>

      <template v-else-if="page.slug==='monsters' || page.slug==='critters'">
        <section class="monster-index-stack"><article class="rule-feature-box monster-source-intro"><header><h2>{{ page.slug==='critters'?'Critters & Companions':'Monsters of Anthro Mundas' }}</h2></header><p>The creature reference is organized first by parent category and then, for monsters with variants, by their monster type.</p></article><template v-for="group in monsterGroups" :key="group.category.name"><details v-if="group.monsters.length && (page.slug==='monsters'?group.category.name!=='Companions':group.category.name==='Companions')" class="monster-category-box organized-rule-category card-surface" open><summary><span><h2>{{ group.category.name }}</h2><small>{{ group.category.summary }}</small></span><span aria-hidden="true">⌄</span></summary><div class="organized-rule-category-body monster-family-stack"><template v-for="family in group.families" :key="family.parent.name"><details v-if="page.slug==='monsters'&&family.children.length" class="monster-family-box"><summary><span><strong>{{ family.parent.name }}</strong><small>{{ family.children.length }} variants</small></span><span aria-hidden="true">⌄</span></summary><div class="monster-link-grid"><RouterLink :to="`/rules/read/${monsterSlug(family.parent.name)}`"><strong>{{ family.parent.name }}</strong><small>Base type</small></RouterLink><RouterLink v-for="monster in family.children" :key="monster.name" :to="`/rules/read/${monsterSlug(monster.name)}`"><strong>{{ monster.name }}</strong><small>{{ family.parent.name }}</small></RouterLink></div></details><div v-else class="monster-link-grid"><RouterLink :to="`/rules/read/${monsterSlug(family.parent.name)}`"><strong>{{ family.parent.name }}</strong><small v-if="family.parent.group">{{ family.parent.group }}</small></RouterLink></div></template></div></details></template><a class="secondary-button external-source-link" :href="WOODLANDS_MONSTERS_URL" target="_blank" rel="noopener noreferrer">Open Source Monster Reference</a></section>
      </template>

      <template v-else-if="currentMonster">
        <section class="rule-content-card card-surface external-monster-page"><article class="rule-feature-box monster-profile-box"><header><div><small>{{ currentMonster.category }}</small><h2>{{ currentMonster.name }}</h2></div></header><p>{{ currentMonster.summary }}</p><p v-if="currentMonster.group"><strong>Family:</strong> {{ currentMonster.group }}</p><p class="source-status-note">This creature is listed as an individual entry in the external Woodlands monster reference. The current crawl exposes its index placement but not a reliable complete stat block, so Brambleheart does not invent missing statistics.</p></article><a class="secondary-button external-source-link" :href="WOODLANDS_MONSTERS_URL" target="_blank" rel="noopener noreferrer">Open Source Monster Reference</a></section>
      </template>

      <template v-else-if="page.slug==='sparks-deeds'">
        <section class="deeds-rule-page">
          <section class="spark-rule-stack"><article v-for="section in sparkRuleSections" :key="section.heading" class="rule-feature-box spark-rule-card"><header><h2>{{ displayText(section.heading) }}</h2></header><template v-for="(block,index) in section.blocks" :key="index"><p v-if="block.type==='paragraph'">{{ displayText(block.text) }}</p><div v-else class="rule-table-wrap"><table class="rule-source-table"><tbody><tr v-for="(row,rowIndex) in block.rows" :key="rowIndex"><td v-for="(cell,cellIndex) in row" :key="cellIndex">{{ displayText(cell) }}</td></tr></tbody></table></div></template></article></section>
          <article class="rule-feature-box deed-intro-box"><header><h2>Deeds</h2></header><p v-for="line in deedIntro" :key="line">{{ displayText(line) }}</p></article>
          <article class="rule-feature-box deed-resolution-box"><header><h2>Deed Resolution</h2></header><p v-for="line in deedResolution" :key="line">{{ displayText(line) }}</p></article>
          <section class="deed-rule-list"><article v-for="deed in deedEntries" :key="deed.name" class="rule-feature-box deed-rule-card"><header><h3>{{ deed.name }}</h3><strong>{{ deed.reward }}</strong></header><p v-if="deed.flavor">{{ deed.flavor }}</p><div class="deed-objective"><small>OBJECTIVE</small><span>{{ deed.objective }}</span></div><div class="deed-keyword-row"><small>KEYWORDS</small><span v-for="keyword in deed.keywords" :key="keyword">{{ keyword }}</span></div></article></section>
        </section>
      </template>

      <template v-else-if="page.slug==='faq'">
        <section class="rule-content-card card-surface faq-reader"><article v-for="item in quickFaq" :key="item.q" class="rule-copy-card faq-row"><h2>{{ item.q }}</h2><p>{{ item.a }}</p></article></section>
      </template>

      <template v-else-if="page.slug==='changes-updates'">
        <section class="rule-content-card card-surface changes-reader"><article class="rule-copy-card"><h2>Changes &amp; Updates</h2><p>This page is reserved for Brambleheart rules errata, amendments, and system changes. No separate system amendment has been supplied for this build.</p></article></section>
      </template>

      <template v-else>
        <section v-if="page.note" class="info-card rule-source-note"><strong>Source Note</strong><p>{{ displayText(page.note) }}</p></section>
        <section v-if="page.slug==='spell-rules'" class="rule-cross-reference card-surface"><strong>Area of Effect</strong><p>Line, Cone, Orb, Direct targeting, and impassable collision are organized under The Battles as general battle-grid targeting rules.</p><RouterLink class="secondary-button compact-action" to="/rules/read/area-of-effect">Open Area of Effect</RouterLink></section>
        <section v-if="sourceSections.length" class="rule-content-card card-surface">
          <article v-for="(entry,index) in sourceSections" :key="`${entry.document}-${entry.section.heading}-${index}`" class="rule-copy-card source-section-card old-dex-rule-section" :class="{'example-source-card':isExampleHeading(entry.section.heading),'boxed-rule-entry':boxedRulePage()}">
            <header v-if="entry.section.heading!=='Overview'&&abilityBoxPage()" class="boxed-rule-titlebar"><h2>{{ displayText(entry.section.heading) }}</h2><div class="rule-title-costs"><span v-for="type in entryAbilityTypes(entry)" :key="type" class="ability-cost-pill">{{ type }}</span><span v-if="entryMana(entry)!==null" class="mana-badge">{{ entryMana(entry) }} Mana</span></div></header><h2 v-else-if="entry.section.heading!=='Overview'">{{ displayText(entry.section.heading) }}</h2>
            <template v-for="(block,blockIndex) in entry.section.blocks" :key="blockIndex">
              <div v-if="isKeywordBlock(block)&&abilityBoxPage()" class="keyword-pill-row"><span v-for="keyword in entryDisplayKeywords(entry)" :key="keyword" class="keyword-pill">{{ displayText(keyword) }}</span></div><p v-else-if="isKeywordBlock(block)" class="rule-keyword-line"><strong>Keywords:</strong> {{ keywordParts(block.type==='paragraph'?block.text:'').map(displayText).join(' · ') }}</p>
              <template v-else-if="block.type==='paragraph'">
                <div v-if="isDialogue(block.text)" class="dialogue-example-box">
                  <p v-for="part in dialogueParts(block.text)" :key="`${part.actor}-${part.text}`"><strong>{{ part.actor }}:</strong> <em>{{ displayText(part.text) }}</em></p>
                </div>
                <div v-else-if="bulletParts(block.text).length" class="rule-bullet-block"><p>{{ bulletParts(block.text)[0] }}</p><ul><li v-for="part in bulletParts(block.text).slice(1)" :key="part">{{ part }}</li></ul></div>
                <p v-else :class="{'example-copy':isExampleHeading(entry.section.heading)}"><strong v-if="labeledParagraph(block.text).label" class="rule-inline-label">{{ labeledParagraph(block.text).label }}:</strong><template v-for="(part,partIndex) in bracketParts(labeledParagraph(block.text).body)" :key="partIndex"><strong v-if="part.bold" class="bracket-number">{{ part.text }}</strong><span v-else>{{ part.text }}</span></template></p>
              </template>
              <div v-else-if="block.rows.length===1&&block.rows[0].length===1&&isDialogue(block.rows[0][0])" class="dialogue-example-box">
                <p v-for="part in dialogueParts(block.rows[0][0])" :key="`${part.actor}-${part.text}`"><strong>{{ part.actor }}:</strong> <em>{{ displayText(part.text) }}</em></p>
              </div>
              <article v-else-if="isBuildingSeluTable(block)" class="creation-example rule-selu-example"><strong>Building Selu:</strong> <em>{{ singleCellText(block).replace(/^Selu(?:’s| of the Wandering Reeds)?\s*/i,'Selu ') }}</em></article>
              <article v-else-if="skillTreeName(block)" class="skill-tree-card" :class="`skill-tree-${skillTreeTone(skillTreeName(block))}`"><header><h3>{{ skillTreeName(block) }}</h3></header><div class="skill-tree-list"><div v-for="(row,rowIndex) in block.rows.slice(2)" :key="rowIndex"><strong>{{ displayText(row[0]||'') }}</strong><span>{{ displayText(row[1]||'') }}</span><small>{{ displayText(row[2]||'') }}</small></div></div></article>
              <article v-else-if="singleCellText(block)&&isLongNarrativeHeading(singleCellText(block))" class="rule-narrative-note"><strong>{{ narrativeParts(singleCellText(block)).title }}</strong><p>{{ narrativeParts(singleCellText(block)).body }}</p></article><h3 v-else-if="singleCellText(block)" class="source-table-title">{{ singleCellText(block) }}</h3>
              <div v-else-if="equipmentTableRows(block).length" class="equipment-rule-card-grid"><article v-for="item in equipmentTableRows(block)" :key="`${item.name}-${blockIndex}`" class="equipment-rule-card"><header><strong>{{ item.name }}</strong></header><div><span v-for="field in item.fields" :key="field.label"><small>{{ field.label }}</small><template v-for="(part,partIndex) in bracketParts(field.value)" :key="partIndex"><strong v-if="part.bold" class="bracket-number">{{ part.text }}</strong><b v-else>{{ part.text }}</b></template></span></div></article></div>
              <div v-else class="rule-table-wrap"><table class="rule-source-table"><tbody><tr v-for="(row,rowIndex) in block.rows" :key="rowIndex"><td v-for="(cell,cellIndex) in row" :key="cellIndex"><template v-for="(part,partIndex) in bracketParts(cell)" :key="partIndex"><strong v-if="part.bold" class="bracket-number">{{ part.text }}</strong><span v-else>{{ part.text }}</span></template></td></tr></tbody></table></div>
            </template>
          </article>
        </section>
        <section v-else-if="!page.note" class="empty-state card-surface compact-empty"><h2>Rule Text Unavailable</h2><p>This page is organized in the reader but has no supplied source text in the current rules package.</p></section>
      </template>

      <nav v-if="fundamentalIndex>=0" class="fundamental-bottom-nav card-surface" aria-label="Fundamental rules navigation">
        <RouterLink v-if="previousFundamental" class="fundamental-nav-button prev" :to="`/rules/read/${previousFundamental.slug}`"><span>‹</span><small>BACK</small><strong>{{ previousFundamental.title }}</strong></RouterLink><span v-else class="fundamental-nav-spacer"></span>
        <div class="fundamental-nav-position"><small>THE FUNDAMENTALS</small><strong>{{ fundamentalIndex+1 }} / {{ fundamentalsNavigation.length }}</strong></div>
        <RouterLink v-if="nextFundamental" class="fundamental-nav-button next" :to="`/rules/read/${nextFundamental.slug}`"><small>NEXT</small><strong>{{ nextFundamental.title }}</strong><span>›</span></RouterLink><span v-else class="fundamental-nav-spacer"></span>
      </nav>
      <nav v-if="loreIndex>=0" class="fundamental-bottom-nav lore-bottom-nav card-surface" aria-label="Lore of Anthro Mundas navigation">
        <RouterLink v-if="previousLore" class="fundamental-nav-button prev" :to="`/rules/read/${previousLore.slug}`"><span>‹</span><small>BACK</small><strong>{{ previousLore.title }}</strong></RouterLink><span v-else class="fundamental-nav-spacer"></span>
        <div class="fundamental-nav-position"><small>ANTHRO MUNDAS</small><strong>{{ loreIndex+1 }} / {{ loreNavigation.length }}</strong></div>
        <RouterLink v-if="nextLore" class="fundamental-nav-button next" :to="`/rules/read/${nextLore.slug}`"><small>NEXT</small><strong>{{ nextLore.title }}</strong><span>›</span></RouterLink><span v-else class="fundamental-nav-spacer"></span>
      </nav>
      <nav v-if="sectionIndex>=0" class="fundamental-bottom-nav section-bottom-nav card-surface" aria-label="Rule section navigation">
        <RouterLink v-if="previousSection" class="fundamental-nav-button prev" :to="`/rules/read/${previousSection.slug}`"><span>‹</span><small>BACK</small><strong>{{ previousSection.title }}</strong></RouterLink><span v-else class="fundamental-nav-spacer"></span>
        <div class="fundamental-nav-position"><small>{{ breadcrumbSection.toUpperCase() }}</small><strong>{{ sectionIndex+1 }} / {{ sectionPages.length }}</strong></div>
        <RouterLink v-if="nextSection" class="fundamental-nav-button next" :to="`/rules/read/${nextSection.slug}`"><small>NEXT</small><strong>{{ nextSection.title }}</strong><span>›</span></RouterLink><span v-else class="fundamental-nav-spacer"></span>
      </nav>
    </template>

    <section v-else class="empty-state card-surface compact-empty"><h2>Rule Not Found</h2><p>The requested rule page is not available.</p><RouterLink class="primary-button" to="/rules">Back to Rules</RouterLink></section>
  </main>
</template>

<style scoped>
.rule-breadcrumb{display:flex;align-items:center;gap:7px;min-width:0;margin:2px 2px 10px;color:var(--ink-soft);font-size:calc(10px + var(--font-offset));overflow:hidden;white-space:nowrap}.rule-breadcrumb a{color:var(--accent-dark);font-weight:800;text-decoration:none}.rule-breadcrumb strong{min-width:0;overflow:hidden;text-overflow:ellipsis;color:var(--ink)}
.rule-reader-title{margin-top:8px}.rule-reader-title h1{font-weight:900}.rule-reader-title p{max-width:690px}
.fundamental-inner-links{display:flex;gap:6px;padding:7px;margin:0 0 13px;overflow-x:auto}.fundamental-inner-links a{flex:1 0 auto;min-height:34px;display:flex;align-items:center;justify-content:center;padding:5px 9px;border:1px solid var(--line);border-radius:7px;background:var(--paper-2);color:var(--ink-soft);text-decoration:none;font-size:calc(9px + var(--font-offset));font-weight:750;white-space:nowrap}.fundamental-inner-links a.active{border-color:var(--accent);background:var(--accent-wash);color:var(--ink)}
.old-dex-rule-section{position:relative;padding:0!important;background:var(--paper)!important}.old-dex-rule-section>h2{box-sizing:border-box;width:100%;margin:0!important;padding:11px 15px;border-bottom:1px solid var(--line);border-left:5px solid var(--accent);border-right:5px solid var(--accent);background:color-mix(in srgb,var(--accent-wash) 32%,var(--paper-2));font-family:Georgia,'Times New Roman',serif;font-size:calc(19px + var(--font-offset));font-weight:900;line-height:1.15}.old-dex-rule-section>p,.old-dex-rule-section>.dialogue-example-box,.old-dex-rule-section>.rule-table-wrap,.old-dex-rule-section>.rule-keyword-line,.old-dex-rule-section>.rule-bullet-block,.old-dex-rule-section>.source-table-title{margin-left:15px!important;margin-right:15px!important}.old-dex-rule-section>p{margin-top:8px;margin-bottom:8px;line-height:1.54}.old-dex-rule-section>p:last-child{margin-bottom:10px}.rule-inline-label{margin-right:.35em;color:var(--ink);font-weight:900}.rule-keyword-line{padding:8px 0 12px;border-top:1px solid var(--line);color:var(--ink-soft)}.rule-bullet-block{margin-top:11px;margin-bottom:12px;line-height:1.55}.rule-bullet-block>p{margin:0 0 6px}.rule-bullet-block ul{margin:0;padding-left:20px}.rule-bullet-block li+li{margin-top:4px}.source-table-title{margin-top:13px!important;margin-bottom:7px!important;font-family:Georgia,'Times New Roman',serif;font-size:calc(14px + var(--font-offset));font-weight:900;color:var(--ink)}
.fundamental-bottom-nav{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:stretch;gap:8px;margin-top:14px;padding:8px}.fundamental-nav-button{display:grid;grid-template-columns:auto minmax(0,1fr);grid-template-rows:auto auto;align-items:center;column-gap:8px;min-width:0;padding:9px 11px;border:1px solid var(--line);border-radius:9px;background:var(--paper-2);color:var(--ink);text-decoration:none}.fundamental-nav-button.next{grid-template-columns:minmax(0,1fr) auto;text-align:right}.fundamental-nav-button>span{grid-row:1/3;font-size:28px;color:var(--accent-dark)}.fundamental-nav-button.next>span{grid-column:2}.fundamental-nav-button small{color:var(--ink-soft);font-size:8px;font-weight:900;letter-spacing:.1em}.fundamental-nav-button strong{min-width:0;font-family:Georgia,'Times New Roman',serif;font-size:calc(11px + var(--font-offset));overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.fundamental-nav-position{display:grid;place-items:center;align-content:center;min-width:86px;color:var(--ink-soft);text-align:center}.fundamental-nav-position small{font-size:8px;font-weight:900;letter-spacing:.08em}.fundamental-nav-position strong{color:var(--ink);font-size:12px}.fundamental-nav-spacer{min-width:0}
.faq-reader .faq-row h2{font-size:calc(15px + var(--font-offset))!important;line-height:1.25}.faq-reader .faq-row p{font-size:calc(10.5px + var(--font-offset));line-height:1.5}.old-dex-rule-section>.rule-table-wrap{margin-left:0!important;margin-right:0!important}.old-dex-rule-section .rule-source-table td{border-left:0!important;border-right:0!important;border-top:0!important;border-bottom:1px solid var(--line)!important;padding:7px 10px!important}

.equipment-rule-card-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin:9px 15px 13px}.equipment-rule-card{overflow:hidden;border:1px solid var(--line);border-top:5px solid var(--accent);border-radius:8px;background:var(--paper)}.equipment-rule-card header{padding:7px 9px;border-bottom:1px solid var(--line);background:var(--paper-2)}.equipment-rule-card>div{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px;padding:8px}.equipment-rule-card span{display:grid;gap:1px;min-width:0}.equipment-rule-card small{color:var(--ink-soft);font-size:8px;font-weight:850}.equipment-rule-card b{font-weight:650;overflow-wrap:anywhere}.equipment-rule-card .bracket-number{font-weight:900}
.deeds-rule-page{display:grid;gap:11px}.spark-rule-stack{display:grid;gap:9px}.spark-rule-card>p{margin:8px 11px;line-height:1.5}.spark-rule-card>.rule-table-wrap{margin:0!important}.spark-rule-card .rule-source-table{margin:0}.deeds-rule-page{display:grid;gap:11px}.deed-intro-box,.deed-resolution-box{padding:0}.deed-intro-box header,.deed-resolution-box header,.deed-rule-card header{display:flex;justify-content:space-between;align-items:baseline;gap:10px;padding:9px 12px;border-bottom:1px solid var(--line);border-left:5px solid var(--accent);border-right:5px solid var(--accent);background:color-mix(in srgb,var(--accent-wash) 34%,var(--paper-2))}.deed-intro-box h2,.deed-resolution-box h2,.deed-rule-card h3{margin:0}.deed-intro-box p,.deed-resolution-box p{margin:8px 12px;line-height:1.5}.deed-rule-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.deed-rule-card{padding:0;overflow:hidden}.deed-rule-card>p{margin:8px 11px}.deed-objective{display:grid;gap:2px;padding:8px 11px;border-top:1px solid var(--line)}.deed-objective small,.deed-keyword-row>small{font-weight:900;letter-spacing:.08em;color:var(--ink-soft)}.deed-keyword-row{display:flex;align-items:center;gap:5px;flex-wrap:wrap;padding:8px 11px;border-top:1px solid var(--line)}.deed-keyword-row span{padding:3px 7px;border:1px solid var(--line);border-radius:999px;background:var(--paper-2);font-size:9px;font-weight:800}.boxed-rule-entry{margin:9px!important;border:1px solid var(--line-dark)!important;border-radius:9px!important;overflow:hidden}.boxed-rule-entry>h2{border-left-width:5px!important;border-right-width:5px!important}.rule-narrative-note{margin:10px 15px!important;padding:10px 12px;border:1px solid var(--line);border-left:5px solid var(--accent);border-radius:7px;background:var(--paper-2)}.rule-narrative-note>strong{display:block;margin-bottom:5px;font-family:Georgia,'Times New Roman',serif;font-size:calc(13px + var(--font-offset))}.rule-narrative-note p{margin:0;line-height:1.55;font-size:inherit;font-weight:400}.bracket-number{font-weight:900;color:var(--ink)}
@media(max-width:620px){.equipment-rule-card-grid,.deed-rule-list{grid-template-columns:1fr}.fundamental-bottom-nav{grid-template-columns:1fr 1fr}.fundamental-nav-position{grid-column:1/-1;grid-row:1}.fundamental-nav-button.prev{grid-column:1}.fundamental-nav-button.next{grid-column:2}.fundamental-nav-spacer{display:none}.old-dex-rule-section>p,.old-dex-rule-section>.dialogue-example-box,.old-dex-rule-section>.rule-table-wrap,.old-dex-rule-section>.rule-keyword-line,.old-dex-rule-section>.rule-bullet-block,.old-dex-rule-section>.source-table-title{margin-left:11px!important;margin-right:11px!important}}

.organized-rule-stack{display:grid;gap:10px}.organized-rule-category{overflow:hidden}.organized-rule-category>summary{display:flex;align-items:center;justify-content:space-between;gap:12px;list-style:none;cursor:pointer;padding:10px 12px;border-bottom:1px solid transparent;background:var(--paper-2)}.organized-rule-category>summary::-webkit-details-marker{display:none}.organized-rule-category>summary>span:first-child{display:grid;gap:2px}.organized-rule-category>summary h2{margin:0;font-family:Georgia,'Times New Roman',serif;font-size:calc(17px + var(--font-offset))}.organized-rule-category>summary small{color:var(--ink-soft);font-weight:650;line-height:1.35}.organized-rule-category>summary>span:last-child{font-size:20px;color:var(--ink-soft);transition:transform .15s ease}.organized-rule-category[open]>summary{border-bottom-color:var(--line)}.organized-rule-category[open]>summary>span:last-child{transform:rotate(180deg)}.organized-rule-category-body{padding:10px}.organized-rule-category-body.rule-box-grid{margin:0}.organized-rule-category-body.review-box-list,.organized-rule-category-body.review-spell-column{display:grid;gap:8px}.organized-category-note{padding:9px 12px;border-top:1px solid var(--line);color:var(--ink-soft);line-height:1.45}.organized-rule-category .review-feature-box{margin:0}.organized-rule-category .review-feature-box>header{display:flex;align-items:center;justify-content:space-between;gap:10px}.rule-cross-reference{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:10px;padding:10px 12px}.rule-cross-reference>p{flex:1 1 360px;margin:0;color:var(--ink-soft);line-height:1.45}.aoe-rule-page{gap:11px}.aoe-rule-card,.aoe-intro-card{overflow:hidden}.aoe-rule-card>header,.aoe-intro-card>header{padding:9px 11px;border-bottom:1px solid var(--line);background:var(--paper-2)}.aoe-rule-card h2,.aoe-intro-card h2{margin:0}.aoe-intro-card>p{margin:10px 12px;line-height:1.55}.aoe-rule-layout{display:grid;grid-template-columns:minmax(0,1fr) minmax(210px,38%);align-items:center;gap:14px;padding:12px}.aoe-rule-layout.compact{grid-template-columns:minmax(0,1fr) 150px}.aoe-rule-layout p{margin:0 0 9px;line-height:1.55}.aoe-rule-layout img{display:block;width:100%;max-height:360px;object-fit:contain;border:1px solid var(--line);border-radius:8px;background:#fff}.aoe-rule-layout.compact img{max-height:220px}.rule-example-copy{color:var(--ink-soft)}.monster-family-stack{display:grid;gap:8px}.monster-family-box{overflow:hidden;border:1px solid var(--line);border-radius:8px}.monster-family-box>summary{display:flex;justify-content:space-between;align-items:center;gap:10px;list-style:none;cursor:pointer;padding:8px 10px;background:var(--paper-2)}.monster-family-box>summary::-webkit-details-marker{display:none}.monster-family-box>summary>span:first-child{display:grid;gap:2px}.monster-family-box>summary small{color:var(--ink-soft)}.monster-family-box .monster-link-grid{padding:8px}.monster-category-box>.organized-rule-category-body>.monster-link-grid{padding:0}@media(max-width:680px){.aoe-rule-layout,.aoe-rule-layout.compact{grid-template-columns:1fr}.aoe-rule-layout img,.aoe-rule-layout.compact img{max-height:320px}.organized-rule-category>summary{align-items:flex-start}}
</style>
