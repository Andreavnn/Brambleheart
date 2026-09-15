<script setup lang="ts">
import { attributes, type AttributeId } from '../data/bramble'
import { rankModifier } from '../rules/rulesEngine'

type AttributeRanks=Record<AttributeId,number>

const props=withDefaults(defineProps<{
  ranks:AttributeRanks
  mode?:'creation'|'level-up'
  pointsRemaining?:number
  maxRank?:number
  increaseCosts?:Partial<Record<AttributeId,number>>
  note?:string
}>(),{
  mode:'creation',
  pointsRemaining:0,
  maxRank:3,
  increaseCosts:()=>({}),
  note:'',
})

const emit=defineEmits<{
  adjust:[id:AttributeId,amount:number]
}>()

function rank(id:AttributeId){return Number(props.ranks[id]||0)}
function modifier(id:AttributeId){return rankModifier(rank(id))}
function secondary(id:AttributeId){
  const value=rank(id),mod=modifier(id)
  if(id==='agility')return[{label:'Accuracy',value:String(value)},{label:'Aim',value:String(mod)},{label:'Speed',value:`2 + ${mod} = ${mod+2}`}]
  if(id==='might')return[{label:'Fury',value:String(value)},{label:'Brawl',value:String(mod)}]
  if(id==='hide')return[{label:'Guts',value:String(value)},{label:'Ward',value:String(mod)}]
  if(id==='lore')return[{label:'Power',value:String(value)},{label:'Control',value:String(mod)}]
  return[{label:'Heart',value:String(value)},{label:'Spirit',value:String(mod)}]
}
function canIncrease(id:AttributeId){return rank(id)<props.maxRank&&(props.mode!=='creation'||props.pointsRemaining>0)}
function cost(id:AttributeId){return Number(props.increaseCosts[id]||0)}
</script>

<template>
  <section class="attribute-rank-control" :class="`mode-${mode}`">
    <header v-if="mode==='creation'">
      <strong>Spend 5 Points</strong>
      <span>{{ pointsRemaining }} points remaining</span>
    </header>
    <div class="attribute-rank-list">
      <article v-for="attribute in attributes" :key="attribute.id" class="attribute-rank-row" :class="`attribute-${attribute.id}`">
        <div class="attribute-rank-copy">
          <h3>{{ attribute.name }}</h3>
          <p>{{ attribute.description }}</p>
          <div class="attribute-secondary-stats">
            <span v-for="item in secondary(attribute.id)" :key="item.label"><small>{{ item.label }}</small><strong>{{ item.value }}</strong></span>
          </div>
        </div>
        <div class="attribute-rank-controls">
          <div class="attribute-rank-summary">
            <span><small>Rank</small><strong>{{ rank(attribute.id) }}</strong></span>
            <span><small>Modifier</small><strong>+{{ modifier(attribute.id) }}</strong></span>
          </div>
          <div v-if="mode==='creation'" class="attribute-rank-stepper">
            <button type="button" :disabled="rank(attribute.id)<=1" :aria-label="`Decrease ${attribute.name}`" @click="emit('adjust',attribute.id,-1)">−</button>
            <strong>{{ rank(attribute.id) }}</strong>
            <button type="button" :disabled="!canIncrease(attribute.id)" :aria-label="`Increase ${attribute.name}`" @click="emit('adjust',attribute.id,1)">+</button>
          </div>
          <button v-else type="button" class="secondary-button attribute-raise-button" :disabled="!canIncrease(attribute.id)" @click="emit('adjust',attribute.id,1)">
            {{ canIncrease(attribute.id)?`Raise · ${cost(attribute.id)} XP`:'Maximum Rank' }}
          </button>
        </div>
      </article>
    </div>
    <small v-if="note" class="attribute-rank-note">{{ note }}</small>
  </section>
</template>

<style scoped>
.attribute-rank-control{margin:10px 0 14px}.attribute-rank-control>header{display:flex;justify-content:space-between;gap:10px;margin-bottom:8px;font-weight:900}.attribute-rank-control>header span{color:var(--accent-dark)}.attribute-rank-list{display:grid;gap:8px}.attribute-rank-row{--attribute-tone:#a06b2c;display:grid;grid-template-columns:minmax(0,1fr) minmax(230px,.72fr);gap:12px;padding:10px 11px;border:1px solid var(--line);border-radius:9px;background:var(--paper)}.attribute-rank-row.attribute-agility{--attribute-tone:#46779a}.attribute-rank-row.attribute-might{--attribute-tone:#9b543e}.attribute-rank-row.attribute-hide{--attribute-tone:#527934}.attribute-rank-row.attribute-lore{--attribute-tone:#6d5293}.attribute-rank-row.attribute-bravery{--attribute-tone:#a06b2c}.attribute-rank-copy h3{margin:0;font-family:Georgia,"Times New Roman",serif;font-size:calc(16px + var(--font-offset))}.attribute-rank-copy>p{margin:3px 0 8px;color:var(--ink-soft)}.attribute-secondary-stats{display:flex;gap:6px;flex-wrap:wrap}.attribute-secondary-stats>span,.attribute-rank-summary>span{display:grid;gap:2px;min-width:92px;padding:7px 9px;border:1px solid var(--line);border-left:4px solid var(--attribute-tone);border-radius:7px;background:var(--paper-2)}.attribute-secondary-stats small,.attribute-rank-summary small{font-size:8px;font-weight:850}.attribute-secondary-stats strong{justify-self:end}.attribute-rank-controls{display:grid;align-content:center;gap:8px}.attribute-rank-summary{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.attribute-rank-summary>span{justify-items:center}.attribute-rank-summary strong{font-size:calc(13px + var(--font-offset))}.attribute-rank-stepper{display:grid;grid-template-columns:38px 44px 38px;align-items:center;justify-content:center}.attribute-rank-stepper button,.attribute-rank-stepper>strong{display:grid;place-items:center;height:38px;border:1px solid var(--line-dark);background:var(--paper);font:inherit;font-weight:900}.attribute-rank-stepper button{cursor:pointer}.attribute-rank-stepper button:first-child{border-radius:8px 0 0 8px}.attribute-rank-stepper button:last-child{border-radius:0 8px 8px 0}.attribute-rank-stepper>strong{border-left:0;border-right:0}.attribute-rank-stepper button:disabled,.attribute-raise-button:disabled{cursor:not-allowed;opacity:.38}.attribute-rank-stepper button:not(:disabled):hover{background:var(--accent-wash)}.attribute-raise-button{width:100%}.attribute-rank-note{display:block;margin-top:8px;color:var(--ink-soft);line-height:1.4}
@media(max-width:760px){.attribute-rank-row{grid-template-columns:1fr}.attribute-rank-controls{grid-template-columns:minmax(0,1fr) auto;align-items:center}.mode-level-up .attribute-rank-controls{grid-template-columns:1fr}.attribute-rank-stepper{justify-content:end}}
@media(max-width:520px){.attribute-rank-control>header{align-items:flex-start;flex-direction:column}.attribute-rank-controls{grid-template-columns:1fr}.attribute-rank-stepper{justify-content:center}.attribute-secondary-stats>span{flex:1 1 90px}}
</style>
