<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { WP_PER_BP, WP_PER_NP, WP_PER_SP, formatThreadpieceBalance, threadpieceBreakdownFromWp, type ThreadpieceUnit } from '../rules/threadpieces'

const props=withDefaults(defineProps<{startSp?:number}>(),{startSp:30})
const balanceWp=ref(Math.max(0,Math.round(props.startSp*WP_PER_SP)))
watch(()=>props.startSp,value=>{balanceWp.value=Math.max(0,Math.round(value*WP_PER_SP))})
const breakdown=computed(()=>threadpieceBreakdownFromWp(balanceWp.value))
const denominations:Array<{unit:ThreadpieceUnit;name:string;wp:number}>=[
  {unit:'bp',name:'Bolt',wp:WP_PER_BP},
  {unit:'sp',name:'Screw',wp:WP_PER_SP},
  {unit:'np',name:'Nut',wp:WP_PER_NP},
  {unit:'wp',name:'Washer',wp:1},
]
function change(wp:number){balanceWp.value=Math.max(0,balanceWp.value+wp)}
function count(unit:ThreadpieceUnit){return breakdown.value[unit]}
</script>

<template>
  <section class="threadpiece-exchange" aria-label="Interactive Threadpiece exchange">
    <header>
      <div><small>CURRENT VALUE</small><strong>{{ formatThreadpieceBalance(balanceWp) }}</strong></div>
      <span>{{ balanceWp.toLocaleString('en-US') }} wp total</span>
    </header>
    <div class="threadpiece-denominations">
      <article v-for="coin in denominations" :key="coin.unit" :class="`threadpiece-${coin.unit}`">
        <div><small>{{ coin.name }}</small><strong>{{ count(coin.unit) }} {{ coin.unit }}</strong><span>{{ coin.wp }} wp each</span></div>
        <div class="threadpiece-stepper">
          <button type="button" :disabled="balanceWp<coin.wp" :aria-label="`Subtract one ${coin.name} piece`" @click="change(-coin.wp)">−</button>
          <button type="button" :aria-label="`Add one ${coin.name} piece`" @click="change(coin.wp)">+</button>
        </div>
      </article>
    </div>
    <p><strong>Exchange:</strong> 10 wp = 1 np · 5 np = 1 sp · 5 sp = 1 bp.</p>
  </section>
</template>

<style scoped>
.threadpiece-exchange{display:grid;gap:10px;margin:12px 0;padding:12px;border:1px solid var(--line);border-left:5px solid var(--detail-equipment,var(--accent));border-radius:10px;background:var(--paper-2)}
.threadpiece-exchange>header{display:flex;align-items:end;justify-content:space-between;gap:12px;padding-bottom:9px;border-bottom:1px solid var(--line)}
.threadpiece-exchange>header>div{display:grid;gap:2px}.threadpiece-exchange>header small{color:var(--ink-soft);font-size:8px;font-weight:900;letter-spacing:.07em}.threadpiece-exchange>header strong{font-family:Georgia,'Times New Roman',serif;font-size:calc(18px + var(--font-offset))}.threadpiece-exchange>header>span{color:var(--ink-soft);font-weight:750}
.threadpiece-denominations{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}.threadpiece-denominations article{--piece-tone:var(--detail-equipment,var(--accent));display:grid;gap:8px;padding:9px;border:1px solid var(--line);border-top:5px solid var(--piece-tone);border-radius:8px;background:var(--paper)}.threadpiece-denominations article.threadpiece-bp{--piece-tone:#8d6d2e}.threadpiece-denominations article.threadpiece-sp{--piece-tone:#6c7480}.threadpiece-denominations article.threadpiece-np{--piece-tone:#7b5a45}.threadpiece-denominations article.threadpiece-wp{--piece-tone:#54735c}.threadpiece-denominations article>div:first-child{display:grid;gap:2px}.threadpiece-denominations article strong{font-size:calc(15px + var(--font-offset))}.threadpiece-denominations article span{color:var(--ink-soft);font-size:calc(9px + var(--font-offset))}
.threadpiece-stepper{display:grid;grid-template-columns:1fr 1fr;gap:5px}.threadpiece-stepper button{min-height:32px;border:1px solid var(--line-dark);border-radius:7px;background:var(--paper-2);color:var(--ink);font:inherit;font-weight:900;cursor:pointer}.threadpiece-stepper button:disabled{cursor:not-allowed;opacity:.38}.threadpiece-exchange>p{margin:0;color:var(--ink-soft);line-height:1.45}
@media(max-width:760px){.threadpiece-denominations{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:480px){.threadpiece-exchange>header{align-items:flex-start;flex-direction:column}.threadpiece-denominations{grid-template-columns:1fr}}
</style>
