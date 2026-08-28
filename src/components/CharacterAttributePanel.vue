<script setup lang="ts">
import { computed } from 'vue'
import { derivedStats, magicResources, rankModifier, type CoreAttributeRanks } from '../rules/rulesEngine'

const props=withDefaults(defineProps<{
  attributes:CoreAttributeRanks
  magicLevel?:number
  gutsBonus?:number
  controlBonus?:number
}>(),{magicLevel:0,gutsBonus:0,controlBonus:0})

const stats=computed(()=>derivedStats(props.attributes,props.gutsBonus,props.controlBonus))
const resources=computed(()=>magicResources(props.attributes,props.magicLevel))
const groups=computed(()=>[
  {id:'agility',name:'Agility',short:'AGI',rank:props.attributes.agility,modifier:rankModifier(props.attributes.agility),secondary:[
    {name:'Accuracy',value:stats.value.accuracy,detail:`${stats.value.accuracy} AGI RNK`},
    {name:'Aim',value:stats.value.aim,detail:`${stats.value.aim} AGI MOD`},
    {name:'Speed',value:stats.value.speed,detail:`2 + ${rankModifier(props.attributes.agility)} AGI MOD`},
  ]},
  {id:'might',name:'Might',short:'MIG',rank:props.attributes.might,modifier:rankModifier(props.attributes.might),secondary:[
    {name:'Fury',value:stats.value.fury,detail:`${stats.value.fury} MIG RNK`},
    {name:'Brawl',value:stats.value.brawl,detail:`${stats.value.brawl} MIG MOD`},
  ]},
  {id:'hide',name:'Hide',short:'HID',rank:props.attributes.hide,modifier:rankModifier(props.attributes.hide),secondary:[
    {name:'Guts',value:stats.value.guts,detail:props.gutsBonus?`${props.gutsBonus} + ${props.attributes.hide} HID RNK`:`${props.attributes.hide} HID RNK`},
    {name:'Ward',value:stats.value.ward,detail:`${stats.value.ward} HID MOD`},
  ]},
  {id:'lore',name:'Lore',short:'LOR',rank:props.attributes.lore,modifier:rankModifier(props.attributes.lore),secondary:[
    {name:'Power',value:stats.value.power,detail:`${stats.value.power} LOR RNK`},
    {name:'Control',value:stats.value.control,detail:props.controlBonus?`${props.controlBonus} + ${rankModifier(props.attributes.lore)} LOR MOD`:`${rankModifier(props.attributes.lore)} LOR MOD`},
  ]},
  {id:'bravery',name:'Bravery',short:'BRY',rank:props.attributes.bravery,modifier:rankModifier(props.attributes.bravery),secondary:[
    {name:'Heart',value:stats.value.heart,detail:`${stats.value.heart} BRY RNK`},
    {name:'Spirit',value:stats.value.spirit,detail:`${stats.value.spirit} BRY MOD`},
  ]},
])
</script>

<template>
  <div class="character-attribute-panel">
    <div class="character-attribute-stack">
      <article v-for="group in groups" :key="group.id" class="character-attribute-card">
        <header class="character-attribute-card-heading">
          <div class="character-attribute-name"><strong>{{ group.name }} <small>({{ group.short }})</small></strong></div>
          <div class="character-attribute-core-values">
            <span><small>Rank</small><b>{{ group.rank }}</b></span>
            <span><small>Modifier</small><b>+{{ group.modifier }}</b></span>
          </div>
        </header>
        <div class="character-secondary-stat-grid" :class="`secondary-count-${group.secondary.length}`">
          <article v-for="secondary in group.secondary" :key="secondary.name" class="character-secondary-stat-card">
            <span>{{ secondary.name }}</span><strong>{{ secondary.value }}</strong><small>{{ secondary.detail }}</small>
          </article>
        </div>
      </article>
    </div>
    <div class="character-magic-resource-grid">
      <article><span>Mana Pool</span><strong>{{ resources.manaPool }}</strong><small>{{ props.magicLevel }} MAG LVL + {{ stats.spirit }} BRY MOD</small></article>
      <article><span>Magic Regen</span><strong>{{ resources.magicRegen }}</strong><small>{{ stats.heart }} BRY RNK</small></article>
    </div>
  </div>
</template>

<style scoped>
.character-attribute-panel{display:grid;gap:9px}.character-attribute-stack{display:grid;gap:8px}.character-attribute-card{display:grid;grid-template-columns:minmax(190px,.72fr) minmax(0,1.55fr);gap:10px;align-items:stretch;padding:10px;border:1px solid var(--surface-line,var(--line));border-radius:9px;background:var(--surface-front,var(--paper));box-shadow:0 2px 7px rgba(0,0,0,.04)}.character-attribute-card-heading{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:9px;align-items:center;padding-right:10px;border-right:1px solid var(--surface-line,var(--line))}.character-attribute-name strong{font-family:Georgia,'Times New Roman',serif;font-size:calc(19px + var(--font-offset));line-height:1.1}.character-attribute-name small{font:inherit;font-size:.66em;color:var(--ink-soft)}.character-attribute-core-values{display:grid;grid-template-columns:repeat(2,50px);gap:6px}.character-attribute-core-values>span{display:grid;justify-items:center;gap:2px;min-width:0;width:50px;padding:6px 3px;border:1px solid var(--line);border-left:4px solid var(--accent);border-radius:7px;background:var(--paper-2)}.character-attribute-core-values small{color:var(--ink-soft);font-size:calc(8px + var(--font-offset));font-weight:800}.character-attribute-core-values b{font-size:calc(14px + var(--font-offset))}.character-secondary-stat-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;align-content:stretch}.character-secondary-stat-grid.secondary-count-3{grid-template-columns:repeat(3,minmax(0,1fr))}.character-secondary-stat-card{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 7px;align-items:baseline;padding:8px 9px;border:1px solid var(--line);border-left:4px solid var(--accent);border-radius:7px;background:var(--paper-2)}.character-secondary-stat-card>span{font-weight:850}.character-secondary-stat-card>strong{font-size:calc(17px + var(--font-offset));color:var(--accent-dark)}.character-secondary-stat-card>small{grid-column:1/-1;color:var(--ink-soft);font-size:calc(8.5px + var(--font-offset));line-height:1.3}.character-magic-resource-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.character-magic-resource-grid article{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 8px;align-items:baseline;padding:10px 11px;border:1px solid var(--line);border-left:5px solid var(--accent);border-radius:9px;background:var(--paper-2)}.character-magic-resource-grid span{font-weight:850}.character-magic-resource-grid strong{font-size:calc(20px + var(--font-offset));color:var(--accent-dark)}.character-magic-resource-grid small{grid-column:1/-1;color:var(--ink-soft)}
@media(max-width:820px){.character-attribute-card{grid-template-columns:1fr}.character-attribute-card-heading{border-right:0;border-bottom:1px solid var(--surface-line,var(--line));padding:0 0 9px}.character-secondary-stat-grid.secondary-count-3{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media(max-width:600px){.character-attribute-card-heading{grid-template-columns:1fr}.character-attribute-core-values{grid-template-columns:1fr 1fr}.character-secondary-stat-grid,.character-secondary-stat-grid.secondary-count-3,.character-magic-resource-grid{grid-template-columns:1fr}}
</style>
