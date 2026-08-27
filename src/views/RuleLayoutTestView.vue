<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { ruleSourceDocuments, type RuleSourceBlock } from '../data/rulesSource'
import diceStrip from '../assets/rules/brambleheart-dice-strip.webp'

const route=useRoute()
const router=useRouter()
const sourceKeys=Object.keys(ruleSourceDocuments).sort((a,b)=>a.localeCompare(b))
const requestedKey=computed(()=>String(route.params.slug||''))
const activeKey=computed(()=>sourceKeys.includes(requestedKey.value)?requestedKey.value:(sourceKeys.includes('fundamentals')?'fundamentals':sourceKeys[0]||''))
const documentSource=computed(()=>ruleSourceDocuments[activeKey.value])
const bodySections=computed(()=>documentSource.value?.sections.filter(section=>section.heading.toLowerCase()!=='overview')||[])
const title=computed(()=>activeKey.value.split('-').filter(Boolean).map(word=>word[0]?.toUpperCase()+word.slice(1)).join(' '))

const bannerModules=import.meta.glob('../assets/rule-banners/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP}',{eager:true,query:'?url',import:'default'}) as Record<string,string>
function key(value:string){return value.replace(/[^a-z0-9]+/gi,'').toLowerCase()}
function bannerStem(path:string){return(path.split('/').pop()||'').replace(/\.[^.]+$/,'').replace(/^banner[-_ ]*/i,'')}
const banner=computed(()=>{
  const wanted=key(activeKey.value)
  const entry=Object.entries(bannerModules).find(([path])=>{const stem=key(bannerStem(path));return stem===wanted||stem.endsWith(wanted)||wanted.endsWith(stem)})
  return entry?.[1]||''
})
function sectionId(value:string,index:number){return`preview-${index}-${value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'section'}`}
function selectSource(event:Event){const value=(event.target as HTMLSelectElement).value;if(value)void router.replace(`/rules/layout-preview/${value}`)}
function tableRows(block:RuleSourceBlock){return block.type==='table'?block.rows:[]}
</script>

<template>
  <main class="page rule-layout-preview-page">
    <AppHeader compact back-to="/rules" back-label="Back to Rules" prefer-back-to />

    <div class="rule-layout-preview-notice card-surface">
      <strong>RULE PAGE LAYOUT PREVIEW — TEST PAGE</strong>
      <span>This route is isolated from the existing Rule Reader. It does not replace or modify production rule pages.</span>
    </div>

    <label class="field-label rule-layout-preview-picker">Preview Source
      <select class="field-control" :value="activeKey" @change="selectSource">
        <option v-for="source in sourceKeys" :key="source" :value="source">{{ source }}</option>
      </select>
    </label>

    <article v-if="documentSource" class="rule-layout-preview-shell">
      <header class="rule-layout-preview-hero card-surface" :class="{withBanner:banner}" :style="banner?{backgroundImage:`linear-gradient(rgba(20,17,14,.22),rgba(20,17,14,.58)),url(${banner})`}:undefined">
        <p class="eyebrow">RULES LAYOUT TEST</p>
        <h1>{{ title }}</h1>
      </header>

      <section class="rule-layout-preview-body card-surface">
        <article v-for="(section,index) in bodySections" :id="sectionId(section.heading,index)" :key="`${section.heading}-${index}`" class="rule-layout-preview-section">
          <h2>{{ section.heading }}</h2>

          <figure v-if="activeKey==='fundamentals' && section.heading==='THE CORE ROLL'" class="rule-layout-preview-dice">
            <img :src="diceStrip" alt="Illustrated d4, d6, d8, d10, percentile d10, d12, and d20 dice" />
          </figure>

          <template v-for="(block,blockIndex) in section.blocks" :key="blockIndex">
            <p v-if="block.type==='paragraph'">{{ block.text }}</p>
            <div v-else class="rule-layout-preview-table-wrap">
              <table>
                <tbody>
                  <tr v-for="(row,rowIndex) in tableRows(block)" :key="rowIndex">
                    <td v-for="(cell,cellIndex) in row" :key="cellIndex">{{ cell }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </article>
      </section>

      <nav class="rule-layout-preview-contents card-surface" aria-label="Preview page contents">
        <h2>Contents</h2>
        <div class="rule-layout-preview-links">
          <a v-for="(section,index) in bodySections" :key="`${section.heading}-${index}`" :href="`#${sectionId(section.heading,index)}`">{{ section.heading }}</a>
        </div>
      </nav>
    </article>
  </main>
</template>

<style scoped>
.rule-layout-preview-page{--preview-gap:14px}
.rule-layout-preview-notice{display:grid;gap:4px;margin-bottom:12px;padding:12px 14px;border-left:5px solid var(--accent)}
.rule-layout-preview-notice strong{font-size:12px;letter-spacing:.04em}
.rule-layout-preview-notice span{color:var(--ink-soft);line-height:1.4}
.rule-layout-preview-picker{display:grid;gap:5px;margin-bottom:var(--preview-gap)}
.rule-layout-preview-shell{display:grid;gap:var(--preview-gap)}
.rule-layout-preview-hero{min-height:0;padding:12px 16px;display:flex;flex-direction:column;justify-content:flex-start;background:var(--paper)}
.rule-layout-preview-hero.withBanner{background-position:center;background-size:cover;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.7)}
.rule-layout-preview-hero .eyebrow{margin:0 0 3px}
.rule-layout-preview-hero h1{margin:0;font-size:clamp(30px,6vw,50px);line-height:1.02}
.rule-layout-preview-body{display:grid;gap:18px;padding:16px}
.rule-layout-preview-section{--section-tone:var(--accent);scroll-margin-top:16px}
.rule-layout-preview-section:nth-child(4n+1){--section-tone:var(--detail-trait-heritage)}
.rule-layout-preview-section:nth-child(4n+2){--section-tone:var(--detail-trait-culture)}
.rule-layout-preview-section:nth-child(4n+3){--section-tone:var(--detail-equipment)}
.rule-layout-preview-section:nth-child(4n){--section-tone:var(--detail-spark)}
.rule-layout-preview-section+.rule-layout-preview-section{padding-top:18px;border-top:1px solid var(--line)}
.rule-layout-preview-section h2{margin:0 0 10px;padding:9px 12px;border:1px solid color-mix(in srgb,var(--section-tone) 58%,var(--line));border-left:6px solid var(--section-tone);border-radius:8px;background:color-mix(in srgb,var(--section-tone) 18%,var(--paper-2));font-size:clamp(22px,4vw,32px);line-height:1.15}
.rule-layout-preview-section p{line-height:1.65}
.rule-layout-preview-dice{margin:10px 0 14px;padding:10px;border:1px solid color-mix(in srgb,var(--section-tone) 55%,var(--line));border-radius:10px;background:color-mix(in srgb,var(--section-tone) 10%,var(--paper))}
.rule-layout-preview-dice img{display:block;width:100%;height:auto;max-width:784px;margin:0 auto;object-fit:contain}
.rule-layout-preview-table-wrap{max-width:100%;overflow-x:auto;margin:10px 0;border:1px solid color-mix(in srgb,var(--section-tone) 52%,var(--line));border-radius:8px;background:color-mix(in srgb,var(--section-tone) 8%,var(--paper));box-shadow:inset 0 4px 0 color-mix(in srgb,var(--section-tone) 72%,transparent)}
.rule-layout-preview-table-wrap table{width:100%;border-collapse:collapse}
.rule-layout-preview-table-wrap td{padding:8px;border:1px solid color-mix(in srgb,var(--section-tone) 30%,var(--line));vertical-align:top;background:color-mix(in srgb,var(--section-tone) 6%,var(--paper))}
.rule-layout-preview-table-wrap tr:first-child td{background:color-mix(in srgb,var(--section-tone) 20%,var(--paper-2));font-weight:850}
.rule-layout-preview-table-wrap tr:nth-child(even) td{background:color-mix(in srgb,var(--section-tone) 11%,var(--paper))}
.rule-layout-preview-contents{padding:16px}
.rule-layout-preview-contents h2{margin:0 0 9px}
.rule-layout-preview-links{display:flex;gap:7px;flex-wrap:wrap}
.rule-layout-preview-links a{padding:6px 9px;border:1px solid var(--line);border-radius:999px;background:var(--paper-2);color:var(--ink);font-weight:800;text-decoration:none}
@media(max-width:620px){
  .rule-layout-preview-hero{padding:11px 12px}
  .rule-layout-preview-body,.rule-layout-preview-contents{padding:12px}
}
</style>
