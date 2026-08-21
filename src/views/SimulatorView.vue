<script setup lang="ts">
import { computed, ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import { advancementCost, damageResult, healthPenalty, opposedResult, rhythmResult } from '../rules/rulesEngine'
import { passiveTargets } from '../data/bramble'

const tab=ref<'rhythm'|'combat'|'advancement'>('rhythm')
function die(){const a=new Uint32Array(1);crypto.getRandomValues(a);return(a[0]%10)+1}
function dice(count:number){return Array.from({length:count},die)}
const rhythmMode=ref<'normal'|'edged'|'weighted'>('normal')
const rhythmStat=ref(0),rhythmConditions=ref(0),rhythmTarget=ref(18),rhythmRoll=ref<number[]>([])
const rhythm=computed(()=>rhythmRoll.value.length?rhythmResult(rhythmRoll.value,rhythmMode.value,rhythmStat.value,rhythmConditions.value):null)
function rollRhythm(){rhythmRoll.value=dice(rhythmMode.value==='normal'?3:4)}
const strikeStat=ref(0),strikeCond=ref(0),wardStat=ref(0),wardCond=ref(0)
const combatResult=ref<ReturnType<typeof opposedResult>|null>(null)
function rollCombat(){combatResult.value=opposedResult(dice(3),strikeStat.value,strikeCond.value,dice(3),wardStat.value,wardCond.value)}
const damage=ref(8),damageType=ref<'standard'|'direct'|'lethal'>('standard'),hide=ref(1),equipment=ref(0),damageCond=ref(0)
const damageCalc=computed(()=>damageResult(damage.value,damageType.value,hide.value,equipment.value,damageCond.value))
const health=ref(30),penalty=computed(()=>healthPenalty(health.value)),hallows=ref<number|null>(null)
function rollHallows(){hallows.value=die()}
const advancementType=ref<'attribute'|'skill'|'new-skill'|'talent'|'magic'>('attribute'),currentRank=ref(1)
const xp=computed(()=>advancementCost(advancementType.value,currentRank.value))
</script>

<template>
  <main class="page simulator-page">
    <AppHeader />
    <div class="page-title-block"><p class="eyebrow">TOOLS</p><h1>Simulator</h1><p>Run Brambleheart dice, combat, damage, Health, Hallows, and advancement calculations.</p></div>

    <div class="segment-tabs simulator-tabs">
      <button class="segment-tab" :class="{active:tab==='rhythm'}" @click="tab='rhythm'">Rhythm Engine</button>
      <button class="segment-tab" :class="{active:tab==='combat'}" @click="tab='combat'">Combat</button>
      <button class="segment-tab" :class="{active:tab==='advancement'}" @click="tab='advancement'">Advancement</button>
    </div>

    <section v-if="tab==='rhythm'" class="tool-panel card-surface">
      <div class="tool-heading"><div><p class="eyebrow">3D10 CORE ROLL</p><h2>Rhythm Engine</h2></div></div>
      <div class="field-grid three"><label><span>Roll</span><select v-model="rhythmMode" class="field-control"><option value="normal">Normal — 3d10</option><option value="edged">Edged — 4d10, drop lowest</option><option value="weighted">Weighted — 4d10, drop highest</option></select></label><label><span>Stat</span><input v-model.number="rhythmStat" class="field-control" type="number" /></label><label><span>Conditions</span><input v-model.number="rhythmConditions" class="field-control" type="number" /></label><label><span>Passive Target</span><select v-model.number="rhythmTarget" class="field-control"><option v-for="target in passiveTargets" :key="target[0]" :value="target[1]">{{ target[0] }} — {{ target[1] }}</option></select></label></div>
      <button class="primary-button wide" @click="rollRhythm">Roll</button>
      <div v-if="rhythm" class="result-panel"><div class="dice-row"><span v-for="(value,index) in rhythm.rolled" :key="index" class="die">{{ value }}</span></div><strong class="result-total">{{ rhythm.total }}</strong><span :class="rhythm.total>=rhythmTarget?'good-text':'bad-text'">{{ rhythm.total>=rhythmTarget?'SUCCESS':'FAILURE' }}</span><small v-if="rhythm.dropped!==null">Dropped die: {{ rhythm.dropped }}</small></div>
    </section>

    <template v-if="tab==='combat'">
      <section class="tool-panel card-surface"><div class="tool-heading"><div><p class="eyebrow">OPPOSED ROLL</p><h2>Strike vs Ward</h2></div></div><div class="field-grid two"><label><span>Strike Stat</span><input v-model.number="strikeStat" class="field-control" type="number" /></label><label><span>Strike Conditions</span><input v-model.number="strikeCond" class="field-control" type="number" /></label><label><span>Ward Stat</span><input v-model.number="wardStat" class="field-control" type="number" /></label><label><span>Ward Conditions</span><input v-model.number="wardCond" class="field-control" type="number" /></label></div><button class="primary-button wide" @click="rollCombat">Roll Strike &amp; Ward</button><div v-if="combatResult" class="versus-grid"><div><span>STRIKE</span><strong>{{ combatResult.strike.total }}</strong><small>{{ combatResult.strike.rolled.join(' + ') }}</small></div><div class="vs">VS</div><div><span>WARD</span><strong>{{ combatResult.ward.total }}</strong><small>{{ combatResult.ward.rolled.join(' + ') }}</small></div></div><div v-if="combatResult" class="notice" :class="combatResult.hit?'good':'bad'">{{ combatResult.hit?'HIT — Strike exceeded Ward.':'MISS — Strike did not exceed Ward.' }}</div></section>
      <section class="tool-panel card-surface"><div class="tool-heading"><div><p class="eyebrow">DAMAGE</p><h2>Damage &amp; Guts</h2></div></div><div class="field-grid three"><label><span>Incoming Damage</span><input v-model.number="damage" class="field-control" type="number" min="0" /></label><label><span>Damage Type</span><select v-model="damageType" class="field-control"><option value="standard">Standard</option><option value="direct">Direct</option><option value="lethal">Lethal</option></select></label><label><span>Hide / Base Guts</span><input v-model.number="hide" class="field-control" type="number" min="0" /></label><label><span>Equipment Guts</span><input v-model.number="equipment" class="field-control" type="number" min="0" /></label><label><span>Conditions</span><input v-model.number="damageCond" class="field-control" type="number" /></label></div><div class="metric-grid"><div><span>Effective Guts</span><strong>{{ damageCalc.guts }}</strong></div><div><span>Damage Suffered</span><strong>{{ damageCalc.suffered }}</strong></div></div></section>
      <section class="tool-panel card-surface"><div class="tool-heading"><div><p class="eyebrow">HEALTH &amp; DEFEAT</p><h2>Health / Hallows</h2></div></div><label><span>Current Health</span><input v-model.number="health" class="field-control" type="number" min="0" max="30" /></label><div class="metric-grid"><div><span>Health Penalty</span><strong>{{ penalty===null?'Defeated':penalty }}</strong></div><div><span>Hallows Save</span><strong>{{ hallows===null?'—':hallows }}</strong></div></div><button class="secondary-button wide" @click="rollHallows">Roll 1d10 Hallows Save</button><div v-if="hallows!==null" class="notice" :class="hallows>=6?'good':'bad'">{{ hallows>=6?'PASS':'FAIL — Gain a Fate Mark.' }}</div></section>
    </template>

    <section v-if="tab==='advancement'" class="tool-panel card-surface"><div class="tool-heading"><div><p class="eyebrow">EXPERIENCE</p><h2>Advancement Cost</h2></div></div><div class="field-grid two"><label><span>Advancement</span><select v-model="advancementType" class="field-control"><option value="attribute">Attribute Rank</option><option value="skill">Skill Rank</option><option value="new-skill">New Skill</option><option value="talent">New Talent</option><option value="magic">Magic Level</option></select></label><label><span>Current Rank / Level</span><input v-model.number="currentRank" class="field-control" type="number" min="0" /></label></div><div class="xp-display"><strong>{{ xp }}</strong><span>XP</span></div></section>
  </main>
</template>
