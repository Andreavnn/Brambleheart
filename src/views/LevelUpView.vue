<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { attributes } from '../data/bramble'
import { skillDefinitions } from '../data/characterOptions'
import { ruleSourceDocuments } from '../data/rulesSource'
import { loadCharacters, writeCharacters, type CharacterRecord } from '../services/characters'

const route=useRoute(),router=useRouter()
const characters=ref<CharacterRecord[]>(loadCharacters())
const character=computed(()=>characters.value.find(item=>item.id===String(route.params.id||''))||null)
const xpAdd=ref(0),message=ref('')
const skillName=ref(''),newSkill=ref(''),newTalent=ref('')
function persist(){writeCharacters(characters.value)}
function xp(){return Number(character.value?.experience||0)}
function spend(cost:number,action:()=>void,label:string){const c=character.value;if(!c)return;if(xp()<cost){message.value=`${label} costs ${cost} XP; ${xp()} XP available.`;return}c.experience=xp()-cost;action();c.updatedAt=new Date().toISOString();persist();message.value=`${label} purchased for ${cost} XP.`}
function addXp(){const c=character.value;if(!c)return;const amount=Math.max(0,Number(xpAdd.value||0));c.experience=xp()+amount;c.updatedAt=new Date().toISOString();persist();xpAdd.value=0;message.value=`Added ${amount} XP.`}
function attributeCost(rank:number){return 2+(2*rank)}
function raiseAttribute(id:(typeof attributes)[number]['id']){const c=character.value;if(!c)return;const rank=Number(c.attributes[id]||0);spend(attributeCost(rank),()=>{c.attributes[id]=rank+1},`${attributes.find(a=>a.id===id)?.name} Rank ${rank+1}`)}
const skills=computed(()=>Object.entries(character.value?.skillRanks||{}).sort(([a],[b])=>a.localeCompare(b)))
function skillCost(rank:number){return 3+rank}
function raiseSkill(){const c=character.value;if(!c||!skillName.value)return;const current=Number(c.skillRanks?.[skillName.value]||0);spend(skillCost(current),()=>{c.skillRanks={...(c.skillRanks||{}),[skillName.value]:current+1}},`${skillName.value} Rank ${current+1}`)}
function addSkill(){const c=character.value;if(!c||!newSkill.value)return;if(c.skillRanks?.[newSkill.value]){message.value='That Skill is already known.';return}spend(6,()=>{c.skillRanks={...(c.skillRanks||{}),[newSkill.value]:1};c.skills=Array.from(new Set([...(c.skills||[]),newSkill.value]))},`${newSkill.value} Rank 1`);newSkill.value=''}
const talentSections=ruleSourceDocuments.talents.sections.filter(section=>section.heading&&section.heading!=='Overview'&&section.heading!=='TALENTS'&&!section.heading.startsWith('KEYWORDS'))
function talentText(name:string){const section=talentSections.find(item=>item.heading===name);return section?.blocks.filter(block=>block.type==='paragraph').map(block=>block.type==='paragraph'?block.text:'').join(' ')||''}
function talentRequires(name:string){const match=talentText(name).match(/\bREQUIRES:\s*([^|]+?)(?=\s+KEYWORDS?:|$)/i);return match?.[1]?.trim().replace(/\s+Talent$/i,'')||''}
function normalizeTalent(name:string){return name.toLowerCase().replace(/[’']/g,"'").replace(/\s+talent$/,'').trim()}
function talentRequirementMet(name:string){const required=talentRequires(name);if(!required)return true;return (character.value?.talents||[]).some(owned=>normalizeTalent(owned)===normalizeTalent(required))}
const talentOptions=computed(()=>talentSections.map(section=>section.heading).filter(name=>!character.value?.talents?.includes(name)&&talentRequirementMet(name)).sort())
function addTalent(){const c=character.value;if(!c||!newTalent.value)return;const talent=newTalent.value;if(!talentRequirementMet(talent)){message.value=`${talent} requires ${talentRequires(talent)}.`;return}spend(10,()=>{c.talents=Array.from(new Set([...(c.talents||[]),talent]))},talent);newTalent.value=''}
const magicLevel=computed(()=>Number(character.value?.magicLevel??(character.value?.path==='magic'?1:0)))
function raiseMagic(){const c=character.value;if(!c)return;const current=magicLevel.value;const cost=10+(4*current);spend(cost,()=>{c.magicLevel=current+1},`Magic Level ${current+1}`)}
function finish(){void router.push('/characters')}
</script>
<template>
  <main class="page level-up-page">
    <AppHeader compact back-to="/characters" back-label="Back to Character List" prefer-back-to />
    <template v-if="character">
      <div class="page-title-block level-up-title"><h1>Level Up {{ character.name }}</h1><p>Spend Experience using the advancement costs in Beyond Character Creation.</p></div>
      <section class="level-up-xp card-surface"><div><span>Available Experience</span><strong>{{ character.experience||0 }} XP</strong></div><label>Add Earned XP<input v-model.number="xpAdd" class="field-control" type="number" min="0" /></label><button class="secondary-button" @click="addXp">Add XP</button></section>
      <section class="level-up-grid">
        <article class="level-up-card card-surface"><h2>Attributes</h2><p>Cost: 2 + (2 × current Rank) XP.</p><div class="level-up-list"><div v-for="attribute in attributes" :key="attribute.id"><span><strong>{{ attribute.name }}</strong><small>Rank {{ character.attributes[attribute.id] }} · Mod +{{ character.attributes[attribute.id]*2 }}</small></span><button class="secondary-button compact-action" @click="raiseAttribute(attribute.id)">Raise · {{ attributeCost(character.attributes[attribute.id]) }} XP</button></div></div></article>
        <article class="level-up-card card-surface"><h2>Skills</h2><p>Raise Skill: 3 + current Rank XP. New Skill: 6 XP at Rank 1.</p><label>Known Skill<select v-model="skillName" class="field-control"><option value="">Select Skill</option><option v-for="([name,rank]) in skills" :key="name" :value="name">{{ name }} · Rank {{ rank }}</option></select></label><button class="secondary-button wide" :disabled="!skillName" @click="raiseSkill">Raise Selected Skill</button><label>New Skill<select v-model="newSkill" class="field-control"><option value="">Select New Skill</option><option v-for="skill in skillDefinitions.filter(item=>!character?.skillRanks?.[item.name])" :key="skill.name" :value="skill.name">{{ skill.name }}</option></select></label><button class="secondary-button wide" :disabled="!newSkill" @click="addSkill">Learn New Skill · 6 XP</button></article>
        <article class="level-up-card card-surface"><h2>Magic Level</h2><p>Cost: 10 + (4 × current Magic Level) XP.</p><div class="level-up-metric"><span>Current</span><strong>{{ magicLevel }}</strong></div><button class="secondary-button wide" @click="raiseMagic">Raise Magic Level · {{ 10+(4*magicLevel) }} XP</button><small>This advancement changes Magic Level only. New spell choices from gained slots can be handled in a later spell-management pass.</small></article>
        <article class="level-up-card card-surface"><h2>Talents</h2><p>New Talent: 10 XP.</p><label>New Talent<select v-model="newTalent" class="field-control"><option value="">Select Talent</option><option v-for="talent in talentOptions" :key="talent" :value="talent">{{ talent }}</option></select></label><button class="secondary-button wide" :disabled="!newTalent" @click="addTalent">Learn New Talent · 10 XP</button><div v-if="character.talents?.length" class="level-up-known-list"><small v-for="talent in character.talents" :key="talent">{{ talent }}</small></div></article>
      </section>
      <p v-if="message" class="creation-status-message">{{ message }}</p><div class="button-row end"><RouterLink class="secondary-button" to="/rules/read/beyond-character-creation">Read Beyond Character Creation</RouterLink><button class="primary-button" @click="finish">Done</button></div>
    </template>
    <section v-else class="empty-state card-surface"><h2>Character Not Found</h2><p>This saved character is not available on this device.</p><RouterLink class="primary-button" to="/characters">Back to Character List</RouterLink></section>
  </main>
</template>
<style scoped>
.level-up-xp{display:grid;grid-template-columns:minmax(0,1fr) minmax(180px,.5fr) auto;gap:10px;align-items:end;margin-bottom:12px;padding:14px}.level-up-xp>div{display:grid;gap:2px}.level-up-xp>div span{color:var(--ink-soft);font-weight:800}.level-up-xp>div strong{font-family:Georgia,'Times New Roman',serif;font-size:28px}.level-up-xp label{display:grid;gap:4px;font-weight:800}.level-up-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.level-up-card{padding:15px}.level-up-card h2{margin:0 0 4px}.level-up-card>p{color:var(--ink-soft)}.level-up-list{display:grid;gap:6px}.level-up-list>div{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px;border:1px solid var(--line);border-radius:8px}.level-up-list span{display:grid}.level-up-list small{color:var(--ink-soft)}.level-up-card label{display:grid;gap:4px;margin-top:9px;font-weight:800}.level-up-metric{display:grid;place-items:center;min-height:84px;margin:10px 0;border:1px solid var(--line);border-radius:9px}.level-up-metric strong{font-size:32px;color:var(--accent-dark)}.level-up-known-list{display:flex;flex-wrap:wrap;gap:5px;margin-top:9px}.level-up-known-list small{padding:4px 7px;border:1px solid var(--line);border-radius:999px;background:var(--paper-2);font-weight:750}@media(max-width:720px){.level-up-xp,.level-up-grid{grid-template-columns:1fr}}
</style>
