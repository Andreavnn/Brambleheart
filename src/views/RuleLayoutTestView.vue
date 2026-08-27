<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { ruleSourceDocuments, type RuleSourceBlock, type RuleSourceSection } from '../data/rulesSource'
import diceStrip from '../assets/rules/brambleheart-dice-strip.webp'
import { useSettings } from '../state/settings'
import { formatMeasurementText } from '../rules/measurements'

const route=useRoute()
const router=useRouter()
const {measurement}=useSettings()
const ATTRIBUTE_HEADINGS=new Set(['ATTRIBUTES','RANKS & MODIFIERS','SKILLS','SKILL TREES','EXPANDED & RESTRICTED'])
const sourceKeys=computed(()=>[...Object.keys(ruleSourceDocuments),'fundamentals-attributes'].filter((value,index,array)=>array.indexOf(value)===index).sort((a,b)=>a.localeCompare(b)))
const requestedKey=computed(()=>String(route.params.slug||''))
const activeKey=computed(()=>sourceKeys.value.includes(requestedKey.value)?requestedKey.value:(sourceKeys.value.includes('fundamentals')?'fundamentals':sourceKeys.value[0]||''))
const sourceKey=computed(()=>activeKey.value==='fundamentals-attributes'?'fundamentals':activeKey.value)
const documentSource=computed(()=>ruleSourceDocuments[sourceKey.value])
const title=computed(()=>activeKey.value==='fundamentals-attributes'?'Attributes & Skills':activeKey.value.split('-').filter(Boolean).map(word=>word[0]?.toUpperCase()+word.slice(1)).join(' '))
const isFundamentals=computed(()=>activeKey.value==='fundamentals')
const isAttributesPage=computed(()=>activeKey.value==='fundamentals-attributes')

function splitTargets(section:RuleSourceSection){
  const regular:RuleSourceBlock[]=[]
  const targets:RuleSourceBlock[]=[]
  let targetMode=false
  for(const block of section.blocks){
    if(block.type==='paragraph'&&/ACTIVE\s*&\s*PASSIVE TARGETS/i.test(block.text))targetMode=true
    ;(targetMode?targets:regular).push(block)
  }
  return{regular,targets}
}
const bodySections=computed<RuleSourceSection[]>(()=>{
  const sections=(documentSource.value?.sections||[]).filter(section=>section.heading.toLowerCase()!=='overview')
  if(isAttributesPage.value)return sections.filter(section=>ATTRIBUTE_HEADINGS.has(section.heading.toUpperCase()))
  if(!isFundamentals.value)return sections
  const out:RuleSourceSection[]=[]
  let targets:RuleSourceBlock[]=[]
  for(const section of sections){
    if(ATTRIBUTE_HEADINGS.has(section.heading.toUpperCase()))continue
    if(section.heading.toUpperCase()==='EDGED & WEIGHTED ROLLS'){
      const split=splitTargets(section);out.push({...section,blocks:split.regular});targets=split.targets;continue
    }
    out.push(section)
    if(section.heading.toUpperCase()==='HALF-STEP ROLLS'&&targets.length)out.push({heading:'ACTIVE & PASSIVE TARGETS',blocks:targets})
  }
  return out
})

const bannerModules=import.meta.glob('../assets/rule-banners/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP}',{eager:true,query:'?url',import:'default'}) as Record<string,string>
function key(value:string){return value.replace(/[^a-z0-9]+/gi,'').toLowerCase()}
function bannerStem(path:string){return(path.split('/').pop()||'').replace(/\.[^.]+$/,'').replace(/^banner[-_ ]*/i,'')}
const banner=computed(()=>{const wanted=key(sourceKey.value);return Object.entries(bannerModules).find(([path])=>{const stem=key(bannerStem(path));return stem===wanted||stem.endsWith(wanted)||wanted.endsWith(stem)})?.[1]||''})
function sectionId(value:string,index:number){return`preview-${index}-${value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'section'}`}
function selectSource(event:Event){const value=(event.target as HTMLSelectElement).value;if(value)void router.replace(`/rules/layout-preview/${value}`)}
function tableRows(block:RuleSourceBlock){return block.type==='table'?block.rows:[]}
function displayText(text:string){return formatMeasurementText(text,measurement.value)}
function displayHeading(value:string){return value.toUpperCase()==='FORTUNE & MISFORTUNE RESULTS'?'FORTUNE & MISFORTUNE':value}
function isFormulaParagraph(section:RuleSourceSection,block:RuleSourceBlock){return section.heading==='THE CORE ROLL'&&block.type==='paragraph'&&/\(3d10\)\s*\+\s*stat/i.test(block.text)}
function isHalfStepFormula(block:RuleSourceBlock){return block.type==='paragraph'&&/^\(1d10\/2\)$/i.test(block.text.trim())}
function showConditionsGraphic(section:RuleSourceSection,blockIndex:number){return section.heading==='CONDITIONS'&&blockIndex===0}
function showFortuneGraphic(section:RuleSourceSection){return section.heading==='FORTUNE & MISFORTUNE RESULTS'}
function showHalfStepExample(section:RuleSourceSection){return section.heading==='HALF-STEP ROLLS'}
const previousPage=computed(()=>isAttributesPage.value?{label:'Fundamentals',path:'/rules/layout-preview/fundamentals'}:null)
const nextPage=computed(()=>isFundamentals.value?{label:'Attributes & Skills',path:'/rules/layout-preview/fundamentals-attributes'}:null)
</script>

<template>
  <main class="page rule-layout-preview-page">
    <AppHeader compact back-to="/rules" back-label="Back to Rules" prefer-back-to />

    <div class="rule-layout-preview-notice card-surface"><strong>RULE PAGE LAYOUT PREVIEW — TEST PAGE</strong><span>This route is isolated from the existing Rule Reader. It does not replace production rule pages.</span></div>

    <label class="field-label rule-layout-preview-picker">Preview Source<select class="field-control" :value="activeKey" @change="selectSource"><option v-for="source in sourceKeys" :key="source" :value="source">{{ source }}</option></select></label>

    <article v-if="documentSource" class="rule-layout-preview-shell">
      <header class="rule-layout-preview-hero card-surface" :class="{withBanner:banner}" :style="banner?{backgroundImage:`linear-gradient(rgba(20,17,14,.22),rgba(20,17,14,.58)),url(${banner})`}:undefined"><p class="eyebrow">RULES LAYOUT TEST</p><h1>{{ title }}</h1></header>

      <section class="rule-layout-preview-body card-surface">
        <article v-for="(section,index) in bodySections" :id="sectionId(section.heading,index)" :key="`${section.heading}-${index}`" class="rule-layout-preview-section">
          <h2>{{ displayHeading(section.heading) }}</h2>
          <figure v-if="isFundamentals && section.heading==='THE CORE ROLL'" class="rule-layout-preview-dice"><img :src="diceStrip" alt="Illustrated polyhedral dice" /></figure>

          <template v-for="(block,blockIndex) in section.blocks" :key="blockIndex">
            <div v-if="isFormulaParagraph(section,block)" class="core-roll-formula">3d10 + Stat + Conditions</div>
            <p v-else-if="block.type==='paragraph' && !isHalfStepFormula(block)">{{ displayText(block.text) }}</p>
            <div v-else-if="block.type==='paragraph'" class="half-step-formula">1d10 ÷ 2</div>
            <div v-else class="rule-layout-preview-table-wrap"><table><tbody><tr v-for="(row,rowIndex) in tableRows(block)" :key="rowIndex"><td v-for="(cell,cellIndex) in row" :key="cellIndex">{{ displayText(cell) }}</td></tr></tbody></table></div>

            <div v-if="showConditionsGraphic(section,blockIndex)" class="condition-process" aria-label="Conditions example"><div class="condition-node bonus"><small>Condition</small><strong>High Ground</strong><b>+1</b></div><span>+</span><div class="condition-node bonus"><small>Condition</small><strong>Inspired</strong><b>+1</b></div><span>+</span><div class="condition-node penalty"><small>Condition</small><strong>Obscured</strong><b>−1</b></div><span>=</span><div class="condition-node total"><small>Total Modifier</small><strong>Conditions</strong><b>+1</b></div></div>
          </template>

          <div v-if="showFortuneGraphic(section)" class="fortune-example-grid"><article><h3>Fortune Example</h3><div class="example-dice"><span class="fortune">9</span><span class="fortune">8</span><span>5</span></div><strong>2 Fortune → +2 Conditions</strong></article><article><h3>Misfortune Example</h3><div class="example-dice"><span class="misfortune">1</span><span class="misfortune">2</span><span>6</span></div><strong>2 Misfortune → −2 Conditions</strong></article></div>
          <article v-if="showHalfStepExample(section)" class="talent-half-step-example"><span class="eyebrow">CURRENT TALENT EXAMPLE</span><h3>Threadseer</h3><p><strong>Cooldown:</strong> [1d10/2+1]. Resolve the half-step die, round up, then add the listed +1 condition to the final result.</p></article>
        </article>
      </section>

      <nav v-if="previousPage||nextPage" class="rule-preview-page-nav card-surface" aria-label="Fundamentals preview pages"><RouterLink v-if="previousPage" class="secondary-button" :to="previousPage.path">← {{ previousPage.label }}</RouterLink><span></span><RouterLink v-if="nextPage" class="secondary-button" :to="nextPage.path">{{ nextPage.label }} →</RouterLink></nav>

      <nav class="rule-layout-preview-contents card-surface" aria-label="Preview page contents"><h2>Contents</h2><div class="rule-layout-preview-links"><a v-for="(section,index) in bodySections" :key="`${section.heading}-${index}`" :href="`#${sectionId(section.heading,index)}`">{{ displayHeading(section.heading) }}</a></div></nav>
    </article>
  </main>
</template>

<style scoped>
.rule-layout-preview-page{--preview-gap:14px}.rule-layout-preview-notice{display:grid;gap:4px;margin-bottom:12px;padding:12px 14px;border-left:5px solid var(--accent)}.rule-layout-preview-notice strong{font-size:12px;letter-spacing:.04em}.rule-layout-preview-notice span{color:var(--ink-soft);line-height:1.4}.rule-layout-preview-picker{display:grid;gap:5px;margin-bottom:var(--preview-gap)}.rule-layout-preview-shell{display:grid;gap:var(--preview-gap)}.rule-layout-preview-hero{min-height:0;padding:12px 16px;display:flex;flex-direction:column;justify-content:flex-start;background:var(--paper)}.rule-layout-preview-hero.withBanner{background-position:center;background-size:cover;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.7)}.rule-layout-preview-hero .eyebrow{margin:0 0 3px}.rule-layout-preview-hero h1{margin:0;font-size:clamp(30px,6vw,50px);line-height:1.02}.rule-layout-preview-body{display:grid;gap:18px;padding:16px}.rule-layout-preview-section{--section-tone:var(--accent);scroll-margin-top:16px}.rule-layout-preview-section:nth-child(4n+1){--section-tone:var(--detail-trait-heritage)}.rule-layout-preview-section:nth-child(4n+2){--section-tone:var(--detail-trait-culture)}.rule-layout-preview-section:nth-child(4n+3){--section-tone:var(--detail-equipment)}.rule-layout-preview-section:nth-child(4n){--section-tone:var(--detail-spark)}.rule-layout-preview-section+.rule-layout-preview-section{padding-top:18px;border-top:1px solid var(--line)}.rule-layout-preview-section h2{margin:0 0 10px;padding:9px 12px;border:1px solid color-mix(in srgb,var(--section-tone) 58%,var(--line));border-left:6px solid var(--section-tone);border-radius:8px;background:color-mix(in srgb,var(--section-tone) 18%,var(--paper-2));font-size:clamp(22px,4vw,32px);line-height:1.15}.rule-layout-preview-section p{line-height:1.65}.rule-layout-preview-dice{margin:10px 0 14px;padding:10px;border:1px solid color-mix(in srgb,var(--section-tone) 55%,var(--line));border-radius:10px;background:color-mix(in srgb,var(--section-tone) 10%,var(--paper))}.rule-layout-preview-dice img{display:block;width:100%;height:auto;max-width:784px;margin:0 auto;object-fit:contain}.core-roll-formula,.half-step-formula{width:min(420px,90%);margin:14px auto;padding:13px 18px;border:1px solid color-mix(in srgb,var(--section-tone) 65%,var(--line));border-radius:10px;background:color-mix(in srgb,var(--section-tone) 22%,var(--paper-2));font-family:Georgia,'Times New Roman',serif;font-size:clamp(20px,4vw,28px);font-weight:900;text-align:center}.rule-layout-preview-table-wrap{max-width:100%;overflow-x:auto;margin:10px 0;border:1px solid color-mix(in srgb,var(--section-tone) 52%,var(--line));border-radius:8px;background:color-mix(in srgb,var(--section-tone) 8%,var(--paper));box-shadow:inset 0 4px 0 color-mix(in srgb,var(--section-tone) 72%,transparent)}.rule-layout-preview-table-wrap table{width:100%;border-collapse:collapse}.rule-layout-preview-table-wrap td{padding:8px;border:1px solid color-mix(in srgb,var(--section-tone) 30%,var(--line));vertical-align:top;background:color-mix(in srgb,var(--section-tone) 6%,var(--paper))}.rule-layout-preview-table-wrap tr:first-child td{background:color-mix(in srgb,var(--section-tone) 20%,var(--paper-2));font-weight:850}.rule-layout-preview-table-wrap tr:nth-child(even) td{background:color-mix(in srgb,var(--section-tone) 11%,var(--paper))}.condition-process{display:grid;grid-template-columns:1fr auto 1fr auto 1fr auto 1fr;gap:7px;align-items:center;margin:14px 0}.condition-process>span{font-size:22px;font-weight:900;text-align:center}.condition-node{display:grid;gap:2px;min-height:88px;padding:10px;border:1px solid var(--line);border-radius:10px;text-align:center;background:var(--paper-2)}.condition-node small{color:var(--ink-soft)}.condition-node b{font-size:22px}.condition-node.bonus{border-top:5px solid #5b8a52}.condition-node.penalty{border-top:5px solid #a9534e}.condition-node.total{border-top:5px solid var(--accent)}.fortune-example-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}.fortune-example-grid article{padding:12px;border:1px solid var(--line);border-radius:10px;background:var(--paper-2)}.fortune-example-grid h3{margin:0 0 9px}.example-dice{display:flex;gap:7px;margin-bottom:8px}.example-dice span{display:grid;place-items:center;width:42px;height:42px;border:2px solid var(--line-dark);border-radius:8px;background:var(--paper);font-weight:900}.example-dice .fortune{border-color:#5b8a52;background:color-mix(in srgb,#5b8a52 18%,var(--paper))}.example-dice .misfortune{border-color:#a9534e;background:color-mix(in srgb,#a9534e 18%,var(--paper))}.talent-half-step-example{margin-top:14px;padding:12px;border:1px solid var(--line);border-left:5px solid var(--detail-talent,var(--accent));border-radius:9px;background:var(--paper-2)}.talent-half-step-example h3{margin:3px 0}.talent-half-step-example p{margin-bottom:0}.rule-preview-page-nav{display:grid;grid-template-columns:auto 1fr auto;align-items:center;padding:10px}.rule-layout-preview-contents{padding:16px}.rule-layout-preview-contents h2{margin:0 0 9px}.rule-layout-preview-links{display:flex;gap:7px;flex-wrap:wrap}.rule-layout-preview-links a{padding:6px 9px;border:1px solid var(--line);border-radius:999px;background:var(--paper-2);color:var(--ink);font-weight:800;text-decoration:none}
@media(max-width:760px){.condition-process{grid-template-columns:1fr}.condition-process>span{transform:rotate(90deg)}.fortune-example-grid{grid-template-columns:1fr}}
@media(max-width:620px){.rule-layout-preview-hero{padding:11px 12px}.rule-layout-preview-body,.rule-layout-preview-contents{padding:12px}.rule-preview-page-nav{grid-template-columns:1fr;gap:8px}.rule-preview-page-nav span{display:none}.rule-preview-page-nav a{width:100%}}
</style>
