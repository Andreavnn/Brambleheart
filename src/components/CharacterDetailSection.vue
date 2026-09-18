<script setup lang="ts">
import { computed } from 'vue'
import { attributes } from '../data/bramble'
import { CHARACTER_MAX_HEALTH, healthCondition } from '../rules/rulesEngine'
import { characterThreatBreakdown } from '../rules/threatLevel'
import { loadCustomData } from '../services/customData'
import type { CharacterRecord } from '../services/characters'
import levelUpIcon from '../assets/ui/level-up.png'

const props=withDefaults(defineProps<{
  character:CharacterRecord
  showLevelUp?:boolean
}>(),{
  showLevelUp:true,
})

const emit=defineEmits<{
  (event:'update-health',value:number):void
  (event:'update-accent',value:string):void
}>()

const customSpeciesNames=new Set(loadCustomData().filter(item=>item.type==='species').map(item=>item.name))
const pathName=computed(()=>({magic:'Wind-Touched',talents:'Gifted Heart',skills:'Practiced Hand',attribute:'Tempered Form'} as const)[props.character.path||'magic']||'Gifted Heart')
const threat=computed(()=>characterThreatBreakdown({
  attributeRanks:attributes.map(attribute=>Number(props.character.attributes?.[attribute.id]||1)),
  skillRanks:Object.values(props.character.skillRanks||{}).map(Number),
  talentCount:(props.character.talents||[]).filter(Boolean).length,
  magicLevel:Number(props.character.magicLevel||0),
}))
const healthState=computed(()=>healthCondition(props.character.currentHealth??CHARACTER_MAX_HEALTH))
function setAccent(event:Event){const value=(event.target as HTMLInputElement).value;if(/^#[0-9a-f]{6}$/i.test(value))emit('update-accent',value)}
function setHealth(value:number){emit('update-health',Math.max(0,Math.min(CHARACTER_MAX_HEALTH,Math.round(Number(value)||0))))}
</script>

<template>
  <details class="review-section review-collapsible character-detail-section" :style="{'--character-accent':character.sheetAccent||'#6b7f55'}" open>
    <summary><h2>Character Detail</h2><span>Identity &amp; origin</span></summary>
    <div class="review-collapsible-body character-detail-body">
      <div class="field-grid two review-identity-edit">
        <label class="field-label review-name-field">
          <span class="character-name-label-row"><span>Character Name</span><label class="character-accent-picker" title="Character sheet accent"><input type="color" aria-label="Character accent color" :value="character.sheetAccent||'#6b7f55'" @input="setAccent" /></label></span>
          <div class="field-control disabled-readout">{{ character.name }}</div>
        </label>
        <label class="field-label review-name-field">
          <span class="campaign-level-row"><span>Campaign</span><RouterLink v-if="showLevelUp" class="character-level-up-link" :to="`/characters/${character.id}/level-up`" title="Level Up"><img :src="levelUpIcon" alt="" /><span>Level Up</span></RouterLink></span>
          <div class="field-control disabled-readout">{{ character.campaignName||'No Campaign' }}</div>
        </label>
      </div>
      <div class="review-grid review-summary-grid character-detail-summary-grid">
        <article><span>Species</span><strong>{{ character.species||'Not selected' }} <small v-if="customSpeciesNames.has(character.species)" class="custom-content-badge">CUSTOM</small></strong><small>{{ character.languages?.[0]||'—' }}</small></article>
        <article><span>Spark</span><strong>{{ character.spark||'—' }}</strong></article>
        <article><span>Homeland</span><strong>{{ character.homeland||'—' }}</strong></article>
        <article><span>Oath</span><strong>{{ character.oath||'—' }}</strong></article>
        <article><span>Faith</span><strong>{{ character.faith||'—' }}</strong></article>
        <article><span>Path</span><strong>{{ pathName }}</strong></article>
        <article class="character-language-card"><span>Languages</span><strong>{{ character.languages?.join(' · ')||'—' }}</strong></article>
        <article class="character-threat-card"><span>Threat Level · Point</span><strong>TL {{ threat.level }} · {{ threat.total }} {{ threat.total===1?'Point':'Points' }}</strong></article>
      </div>
      <section class="character-health-panel">
        <header><div><span>Health</span><strong>{{ character.currentHealth??CHARACTER_MAX_HEALTH }} / {{ CHARACTER_MAX_HEALTH }}</strong></div><span class="health-status-label" :class="`health-${healthState.label.toLowerCase().replace(/\s+/g,'-')}`">{{ healthState.label }}<template v-if="healthState.condition"> · {{ healthState.condition }}</template></span></header>
        <div class="character-health-grid"><button v-for="cell in CHARACTER_MAX_HEALTH" :key="cell" type="button" :class="{filled:cell<=(character.currentHealth??CHARACTER_MAX_HEALTH),'health-last-breath':cell<=2,'health-critical':cell>2&&cell<=4,'health-wounded':cell>4&&cell<=7}" :aria-label="`Set Health to ${cell}`" @click="setHealth(cell)"></button></div>
        <div class="health-controls"><button type="button" class="secondary-button compact-action" @click="setHealth((character.currentHealth??CHARACTER_MAX_HEALTH)-1)">−1</button><span>Low Health automatically applies its Condition to Dice Roller rolls for this selected character.</span><button type="button" class="secondary-button compact-action" @click="setHealth((character.currentHealth??CHARACTER_MAX_HEALTH)+1)">+1</button></div>
      </section>
    </div>
  </details>
</template>

<style scoped>
.custom-content-badge{display:inline-flex;align-items:center;margin-left:5px;padding:2px 5px;border:1px solid #7b4f8d;border-radius:999px;background:#efe5f4;color:#60336f;font-size:8px;font-weight:900;letter-spacing:.06em;vertical-align:middle}.disabled-readout{display:flex;align-items:center;background:var(--paper-2);color:var(--ink-soft);cursor:not-allowed}.character-detail-body{display:grid;gap:10px}.character-detail-body .review-summary-grid{margin-top:0}.character-name-label-row{display:flex;align-items:center;gap:7px}.campaign-level-row{display:flex;align-items:center;justify-content:space-between;gap:8px;min-width:0}.character-level-up-link{display:inline-flex;align-items:center;gap:5px;min-height:26px;padding:2px 8px 2px 4px;border:1px solid color-mix(in srgb,var(--character-accent,#6b7f55) 65%,var(--line));border-radius:999px;background:color-mix(in srgb,var(--character-accent,#6b7f55) 10%,var(--paper));color:var(--ink);font-size:calc(8px + var(--font-offset));font-weight:900;line-height:1;text-decoration:none;text-transform:uppercase;white-space:nowrap}.character-level-up-link img{display:block;width:26px;height:22px;object-fit:contain}.character-level-up-link:hover{background:color-mix(in srgb,var(--character-accent,#6b7f55) 18%,var(--paper))}.character-accent-picker{position:relative;display:inline-block;width:18px;height:18px;flex:0 0 18px;border:1px solid color-mix(in srgb,var(--ink) 35%,var(--line));border-radius:50%;background:conic-gradient(#e54b4b,#e7b84b,#62a45d,#4b9ca8,#536ec4,#9257ae,#d5538a,#e54b4b);box-shadow:inset 0 0 0 2px var(--paper);cursor:pointer}.character-accent-picker input{position:absolute;inset:0;width:100%;height:100%;padding:0;border:0;opacity:0;cursor:pointer}.character-detail-section .review-summary-grid article,.character-detail-section .character-health-panel,.character-detail-section .review-identity-edit .field-control{border-left:5px solid var(--character-accent)}.character-detail-summary-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.character-language-card{grid-column:span 2}.character-threat-card{grid-column:3}.character-health-panel{display:grid;gap:9px;margin-top:2px;padding:11px;border:1px solid var(--line);border-radius:10px;background:var(--paper-2)}.character-health-panel>header{display:flex;align-items:center;justify-content:space-between;gap:10px}.character-health-panel>header>div{display:flex;align-items:baseline;gap:9px}.character-health-panel>header span{font-weight:900;color:var(--ink-soft)}.character-health-panel>header strong{font-family:Georgia,'Times New Roman',serif;font-size:calc(18px + var(--font-offset))}.character-health-grid{display:grid;grid-template-columns:repeat(15,1fr);gap:4px}.character-health-grid button{height:15px;padding:0;border:1px solid var(--line);border-radius:4px;background:var(--paper);cursor:pointer}.character-health-grid button.filled{border-color:color-mix(in srgb,var(--detail-trait-heritage) 62%,var(--line));background:color-mix(in srgb,var(--detail-trait-heritage) 28%,var(--paper))}.character-health-grid button.health-wounded.filled{border-color:#b99b32;background:color-mix(in srgb,#d2b342 42%,var(--paper))}.character-health-grid button.health-critical.filled{border-color:#b9682d;background:color-mix(in srgb,#d97834 42%,var(--paper))}.character-health-grid button.health-last-breath.filled{border-color:var(--detail-deed);background:color-mix(in srgb,var(--detail-deed) 40%,var(--paper))}.health-controls{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:8px}.health-controls>span{text-align:center;color:var(--ink-soft);font-size:calc(9px + var(--font-offset));font-weight:650}.health-status-label.health-wounded{color:#8c741f}.health-status-label.health-critical{color:#a45120}.health-status-label.health-last-breath,.health-status-label.health-defeated{color:var(--detail-deed)}
@media(max-width:720px){.character-detail-summary-grid{grid-template-columns:1fr}.character-language-card,.character-threat-card{grid-column:auto}.health-controls{grid-template-columns:auto 1fr auto}}
</style>
