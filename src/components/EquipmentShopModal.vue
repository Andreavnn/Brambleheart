<script setup lang="ts">
import { computed, ref } from 'vue'

const props=defineProps<{
  open:boolean
  items:any[]
  balanceWp:number
  might:number
}>()
const emit=defineEmits<{
  (event:'close'):void
  (event:'purchase',payload:{item:any;choice:string}):void
}>()

const search=ref('')
const tab=ref('All')
const choices=ref<Record<string,string>>({})
const tabs=['All','Weapons','Armor','Shields','Trinkets','Traveler’s Gear','Field Kits','Consumables','Spellcasting Implements','Accessories','Tools']

function shieldName(name:string){return ['Sapguard','Sapguard*','Vinegrip','Ironwood Bulwark','IronwoodBulwark'].includes(name)}
function itemTab(item:any){
  if(item.shopGroup)return item.shopGroup
  if(item.category==='Weapon')return'Weapons'
  if(item.category==='Armor & Shield')return shieldName(item.name)?'Shields':'Armor'
  if(item.category==='Trinket')return'Trinkets'
  return item.category||'Traveler’s Gear'
}
function mightRequirement(item:any){
  if(item.category!=='Armor & Shield')return 0
  const first=String(item.detail||'').split('·')[0]||''
  return Number(first.replace(/[^0-9]/g,''))||0
}
function quantityCost(item:any){return Math.max(0,Number(item.costWp)||0)}
function choiceFor(item:any){return choices.value[item.name]||''}
function canBuy(item:any){
  return quantityCost(item)<=props.balanceWp
    && props.might>=mightRequirement(item)
    && (!(item.choices?.length)||Boolean(choiceFor(item)))
}
const filtered=computed(()=>{
  const q=search.value.trim().toLowerCase()
  return props.items.filter(item=>(tab.value==='All'||itemTab(item)===tab.value)&&(!q||`${item.name} ${item.category||''} ${item.description||''} ${item.detail||''} ${item.effect||''}`.toLowerCase().includes(q)))
})
function buy(item:any){if(canBuy(item))emit('purchase',{item,choice:choiceFor(item)})}
</script>

<template>
  <div v-if="open" class="modal-backdrop gear-picker-backdrop" @click.self="emit('close')">
    <section class="modal-card gear-shop-modal" role="dialog" aria-modal="true" aria-label="Equipment and Gear">
      <div class="modal-head">
        <div><span class="eyebrow">EQUIPMENT &amp; GEAR</span><h2>Equipment &amp; Gear</h2></div>
        <button type="button" class="icon-button" aria-label="Close Equipment and Gear" @click="emit('close')">×</button>
      </div>
      <div class="gear-tabs" role="tablist">
        <button v-for="name in tabs" :key="name" type="button" :class="{active:tab===name}" @click="tab=name">{{ name }}</button>
      </div>
      <label class="rules-search gear-search"><span aria-hidden="true">⌕</span><input v-model="search" type="search" placeholder="Search equipment…" /></label>
      <div class="gear-shop-list">
        <article v-for="item in filtered" :key="`${item.category}-${item.name}`" class="gear-shop-row">
          <div class="gear-shop-copy">
            <div class="gear-shop-title"><strong>{{ item.name }}</strong><small>{{ item.costText }}</small></div>
            <p v-if="item.description" class="gear-description">{{ item.description }}</p>
            <p v-if="item.detail&&item.detail!=='—'" class="gear-profile">{{ item.detail }}</p>
            <p v-if="item.effect" class="gear-effect"><strong>Effect:</strong> {{ item.effect }}</p>
            <p v-if="mightRequirement(item)>might" class="gear-requirement-warning">Requires Might {{ mightRequirement(item) }}+</p>
            <label v-if="item.choices?.length" class="field-label gear-choice-field">Choose {{ item.name }} option
              <select v-model="choices[item.name]" class="field-control"><option value="">Select Option</option><option v-for="choice in item.choices" :key="choice" :value="choice">{{ choice }}</option></select>
            </label>
          </div>
          <button type="button" class="secondary-button compact-action" :disabled="!canBuy(item)" @click="buy(item)">Add</button>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.gear-tabs{display:flex;gap:5px;overflow-x:auto;padding:1px 0 9px}
.gear-tabs button{flex:0 0 auto;min-height:32px;padding:0 10px;border:1px solid var(--line);border-radius:999px;background:var(--paper);color:var(--ink-soft);font-weight:800}
.gear-tabs button.active{border-color:var(--accent);background:var(--accent-wash);color:var(--ink)}
.gear-shop-modal{width:min(820px,calc(100% - 24px));max-height:86vh;display:grid;grid-template-rows:auto auto auto minmax(0,1fr);overflow:hidden}
.gear-shop-list{display:grid;gap:8px;min-height:0;overflow:auto;padding:1px 2px 6px}
.gear-shop-row{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:start;gap:12px;padding:11px 12px;border:1px solid var(--line);border-radius:10px;background:var(--paper-2)}
.gear-shop-copy{min-width:0}.gear-shop-title{display:flex;justify-content:space-between;gap:8px}.gear-shop-title small{color:var(--ink-soft)}
.gear-description,.gear-profile,.gear-effect{margin:5px 0;line-height:1.45}.gear-profile{color:var(--ink-soft)}.gear-requirement-warning{color:var(--danger);font-weight:850}
@media(max-width:680px){.gear-shop-modal{width:100%;max-height:92vh;border-radius:14px 14px 0 0}.gear-picker-backdrop{align-items:flex-end}.gear-shop-row{grid-template-columns:1fr}.gear-shop-row>.secondary-button{width:100%}}
</style>
