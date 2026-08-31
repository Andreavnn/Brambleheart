<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { attributes } from '../data/bramble'
import { gearShopItems as legacyGearShopItems, skillDefinitions } from '../data/characterOptions'
import { attunableLores, loreSpells } from '../data/magicOptions'
import { ruleSourceDocuments } from '../data/rulesSource'
import { talentRequirementFromText, talentRequirementSatisfied } from '../rules/talentRequirements'
import { MAGIC_LEVEL_MAX, isArcaneFocusName, isSignatureSpell, magicSpellAllowance } from '../rules/magicRules'
import { advancementCost, equipmentAttachmentTargets } from '../rules/rulesEngine'
import { canonicalGearCostWp, economyGearCatalog, isTrinketGear, ordinaryGearResaleWp, protectiveGearKind } from '../rules/economy'
import { formatThreadpieceBalance, formatThreadpieceWp, threadpieceValueToWp, WP_PER_NP, WP_PER_SP } from '../rules/threadpieces'
import { canonicalTalentName, talentNameMatches } from '../data/talentCategories'
import { canEquipProtectiveEquipment, canEquipSecondTrinket, characterStatus, characterWealthWp, loadCharacters, setActiveArcaneFocus, setProtectiveEquipmentEquipped, setTrinketEquipmentEquipped, writeCharacters, type CharacterRecord, type PurchasedEquipment } from '../services/characters'
import { loadCustomData, type CustomSpellItem } from '../services/customData'
import EquipmentShopModal from '../components/EquipmentShopModal.vue'

const gearShopItems=economyGearCatalog(legacyGearShopItems)

const route=useRoute(),router=useRouter()
const characters=ref<CharacterRecord[]>(loadCharacters())
const selectedCharacter=computed(()=>characters.value.find(item=>item.id===String(route.params.id||''))||null)
const character=computed(()=>selectedCharacter.value&&characterStatus(selectedCharacter.value)==='approved'&&!selectedCharacter.value.locked?selectedCharacter.value:null)
const xpAdd=ref(0),message=ref('')
const skillName=ref(''),newSkill=ref(''),newTalent=ref('')
const newLoreAttunement=ref(''),newLoreSpell=ref(''),newInvocationSpell=ref('')
const customSpells=loadCustomData().filter((item):item is CustomSpellItem=>item.type==='spell')
function levelUpIsSignature(name:string){return isSignatureSpell(name)||customSpells.some(spell=>spell.name===name&&spell.signature)}
const currencyAmount=ref(0),currencyUnit=ref<'wp'|'np'|'sp'|'bp'>('sp'),treasureText=ref('')
const selectedGearName=ref(''),selectedGearChoice=ref('')
const shopOpen=ref(false)

function commit(mutator:(draft:CharacterRecord)=>void){
  const id=String(route.params.id||'')
  const next=loadCharacters()
  const draft=next.find(item=>item.id===id)
  if(!draft||characterStatus(draft)!=='approved'){message.value='Approve this character before using Level Up.';return false}
  if(draft.locked){message.value='Unlock this character before using Level Up.';return false}
  mutator(draft)
  draft.status='approved';draft.draft=false;draft.updatedAt=new Date().toISOString()
  const saved=writeCharacters(next)
  if(!saved.ok){message.value=saved.message;return false}
  characters.value=loadCharacters()
  return true
}
function xp(){return Number(character.value?.experience||0)}
function spend(cost:number,action:(draft:CharacterRecord)=>void,label:string){
  if(!character.value)return
  if(xp()<cost){message.value=`${label} costs ${cost} XP; ${xp()} XP available.`;return}
  if(!commit(draft=>{draft.experience=Number(draft.experience||0)-cost;action(draft)}))return
  message.value=`${label} purchased for ${cost} XP.`
}
function addXp(){
  if(!character.value)return
  const amount=Math.max(0,Number(xpAdd.value||0))
  if(!commit(draft=>{draft.experience=Number(draft.experience||0)+amount}))return
  xpAdd.value=0
  message.value=`Added ${amount} XP.`
}
function attributeCost(rank:number){return advancementCost('attribute',rank)}
function raiseAttribute(id:(typeof attributes)[number]['id']){const c=character.value;if(!c)return;const rank=Number(c.attributes[id]||0);spend(attributeCost(rank),draft=>{draft.attributes[id]=rank+1},`${attributes.find(a=>a.id===id)?.name} Rank ${rank+1}`)}
const skills=computed(()=>Object.entries(character.value?.skillRanks||{}).sort(([a],[b])=>a.localeCompare(b)))
const newSkillCost=advancementCost('new-skill')
const talentCost=advancementCost('talent')
function skillCost(rank:number){return advancementCost('skill',rank)}
function raiseSkill(){const c=character.value;if(!c||!skillName.value)return;const current=Number(c.skillRanks?.[skillName.value]||0);const selected=skillName.value;spend(skillCost(current),draft=>{draft.skillRanks={...(draft.skillRanks||{}),[selected]:current+1}},`${selected} Rank ${current+1}`)}
function addSkill(){const c=character.value;if(!c||!newSkill.value)return;if(c.skillRanks?.[newSkill.value]){message.value='That Skill is already known.';return}const selected=newSkill.value;spend(newSkillCost,draft=>{draft.skillRanks={...(draft.skillRanks||{}),[selected]:1};draft.skills=Array.from(new Set([...(draft.skills||[]),selected]))},`${selected} Rank 1`);if(message.value.endsWith(`purchased for ${newSkillCost} XP.`))newSkill.value=''}

const talentSections=ruleSourceDocuments.talents.sections
function talentText(name:string){const section=talentSections.find(item=>talentNameMatches(item.heading,name));return section?.blocks.filter(block=>block.type==='paragraph').map(block=>block.type==='paragraph'?block.text:'').join(' ')||''}
function talentRequires(name:string){return talentRequirementFromText(talentText(name))}
function talentAvailable(name:string){return talentRequirementSatisfied(talentRequires(name),character.value?.talents||[],name)}
function talentKnown(name:string){return (character.value?.talents||[]).some(existing=>talentNameMatches(existing,name))}
const talentOptions=computed(()=>Array.from(new Set(talentSections.map(section=>canonicalTalentName(section.heading)).filter(name=>name&&name!=='Overview'&&name!=='TALENTS'&&!name.startsWith('KEYWORDS')))).filter(name=>!talentKnown(name)&&talentAvailable(name)).sort())
function addTalent(){
  const c=character.value
  if(!c||!newTalent.value)return
  const talent=canonicalTalentName(newTalent.value)
  const required=talentRequires(talent)
  if(!talentRequirementSatisfied(required,c.talents||[],talent)){message.value=required?`${talent} requires ${required}.`:'That Talent is not currently available.';return}
  spend(talentCost,draft=>{draft.talents=Array.from(new Set([...(draft.talents||[]),talent]))},talent)
  if(message.value.endsWith(`purchased for ${talentCost} XP.`))newTalent.value=''
}
const magicLevel=computed(()=>Number(character.value?.magicLevel??(character.value?.path==='magic'?1:0)))
const magicAllowance=computed(()=>magicSpellAllowance(magicLevel.value))
const knownLoreSpells=computed(()=>Array.from(new Set((character.value?.spells||[]).filter(Boolean).filter(name=>!levelUpIsSignature(name)))))
const knownInvocationSpells=computed(()=>Array.from(new Set([...(character.value?.invocationSpells||[]),...(character.value?.invocationSpell?[character.value.invocationSpell]:[])].filter(Boolean))))
const loreClaimsRemaining=computed(()=>Math.max(0,magicAllowance.value.lore-knownLoreSpells.value.length))
const invocationClaimsRemaining=computed(()=>Math.max(0,magicAllowance.value.invocation-knownInvocationSpells.value.length))
const levelUpCustomSpells=computed(()=>character.value?.allowCustomData?customSpells:[])
const loreSpellOptions=computed(()=>{const builtIn=Object.entries(loreSpells).filter(([lore])=>lore!=='Invocation').flatMap(([,names])=>names).filter(name=>!isSignatureSpell(name));const custom=levelUpCustomSpells.value.filter(spell=>spell.lore!=='Invocation'&&!spell.signature).map(spell=>spell.name);const known=new Set(knownLoreSpells.value);return Array.from(new Set([...builtIn,...custom])).filter(name=>!known.has(name)).sort()})
const invocationSpellOptions=computed(()=>{const builtIn=loreSpells.Invocation||[];const custom=levelUpCustomSpells.value.filter(spell=>spell.lore==='Invocation'&&!spell.signature).map(spell=>spell.name);const known=new Set(knownInvocationSpells.value);return Array.from(new Set([...builtIn,...custom])).filter(name=>!known.has(name)).sort()})
const attunementOptions=computed(()=>{const custom=levelUpCustomSpells.value.filter(spell=>spell.lore!=='Invocation').map(spell=>spell.lore);return Array.from(new Set([...attunableLores,...custom])).sort()})
function raiseMagic(){const c=character.value;if(!c)return;const current=magicLevel.value;if(current>=MAGIC_LEVEL_MAX){message.value='Magic Level is already at the maximum of 10.';return}const cost=advancementCost('magic',current);spend(cost,draft=>{draft.magicLevel=current+1},`Magic Level ${current+1}`)}
function claimLoreAttunement(){const lore=newLoreAttunement.value;if(!lore||!character.value||magicLevel.value<1||character.value.loreAttunement)return;if(!commit(draft=>{draft.loreAttunement=lore}))return;newLoreAttunement.value='';message.value=`Attuned to the Lore of ${lore}.`}
function claimLoreSpell(){const spell=newLoreSpell.value;if(!spell||loreClaimsRemaining.value<1)return;if(!commit(draft=>{draft.spells=Array.from(new Set([...(draft.spells||[]),spell]))}))return;newLoreSpell.value='';message.value=`Learned Lore Spell: ${spell}.`}
function claimInvocationSpell(){const spell=newInvocationSpell.value;if(!spell||invocationClaimsRemaining.value<1)return;if(!commit(draft=>{draft.invocationSpells=Array.from(new Set([...(draft.invocationSpells||[]),...(draft.invocationSpell?[draft.invocationSpell]:[]),spell]));draft.invocationSpell=undefined}))return;newInvocationSpell.value='';message.value=`Learned Invocation: ${spell}.`}

const wealthLabel=computed(()=>formatThreadpieceBalance(character.value?characterWealthWp(character.value):0))
function addCurrency(){
  const amount=Math.max(0,Math.floor(Number(currencyAmount.value)||0))
  if(!amount){message.value='Enter a whole Threadpiece amount to add.';return}
  const addedWp=threadpieceValueToWp(amount,currencyUnit.value)
  if(!addedWp){message.value='Enter a valid Threadpiece amount.';return}
  if(!commit(draft=>{draft.currencyAddedWp=Math.max(0,Number(draft.currencyAddedWp)||0)+addedWp;draft.wealthWp=characterWealthWp(draft)+addedWp}))return
  currencyAmount.value=0
  message.value=`Added ${amount} ${currencyUnit.value}.`
}
function addTreasure(){
  const value=treasureText.value.trim()
  if(!value){message.value='Enter a treasure name or short description.';return}
  if(!commit(draft=>{draft.treasure=[...(draft.treasure||[]),value]}))return
  treasureText.value=''
  message.value='Treasure added.'
}
function removeTreasure(index:number){
  if(!commit(draft=>{draft.treasure=(draft.treasure||[]).filter((_,itemIndex)=>itemIndex!==index)}))return
  message.value='Treasure removed.'
}

const gearOptions=computed(()=>[...gearShopItems].sort((a,b)=>a.category.localeCompare(b.category)||a.name.localeCompare(b.name)))
const selectedGear=computed(()=>gearOptions.value.find(item=>item.name===selectedGearName.value)||null)
watch(selectedGearName,()=>{selectedGearChoice.value=''})
function gearMightRequirement(item:typeof gearShopItems[number]){
  if(item.category!=='Armor & Shield')return 0
  const first=item.detail.split('·')[0]?.trim()||'0'
  return Number(first.replace(/[^0-9]/g,''))||0
}
function gearPrice(item:typeof gearShopItems[number]){return canonicalGearCostWp(item)}
function gearPriceLabel(item:typeof gearShopItems[number]){return formatThreadpieceWp(gearPrice(item))}
function gearDisplayDetail(item:typeof gearShopItems[number]){
  if(item.category==='Armor & Shield'){
    const parts=item.detail.split('·').map(part=>part.trim())
    if(parts.length>=5)return`Might Requirement ${parts[0]} · Guts Bonus ${parts[1]} · Mana Syphon ${parts[2]} · Armor Penalty ${parts[3]} · Weight ${parts[4]}`
  }
  if(item.category==='Weapon'){
    const parts=item.detail.split('·').map(part=>part.trim())
    if(parts.length>=2){const properties=parts.slice(2).join(' · ');return`Damage ${parts[0]} · Weight ${parts[1]}${properties?` · ${properties}`:''}`}
  }
  return item.detail
}
function purchaseFromSharedShop(payload:{item:typeof gearShopItems[number];choice:string}){selectedGearName.value=payload.item.name;selectedGearChoice.value=payload.choice;purchaseGear()}
function purchaseGear(){
  const c=character.value,item=selectedGear.value
  if(!c||!item)return
  const choice=selectedGearChoice.value.trim()
  if(item.choices?.length&&!choice){message.value=`Choose an option for ${item.name}.`;return}
  const required=gearMightRequirement(item)
  if(Number(c.attributes.might||0)<required){message.value=`${item.name} requires Might Rank ${required}.`;return}
  const costWp=gearPrice(item)
  if(characterWealthWp(c)<costWp){message.value=`${item.name} costs ${gearPriceLabel(item)}; ${wealthLabel.value} available.`;return}
  const kind=protectiveGearKind(item)
  const trinket=isTrinketGear(item)
  const occupied=new Set((c.equipment||[]).filter(existing=>isTrinketGear(existing)&&existing.equipped===true).map(existing=>existing.trinketSlot))
  const trinketSlot=trinket?(!occupied.has('primary')?'primary':!occupied.has('secondary')?'secondary':undefined):undefined
  const equipped=kind?!((c.equipment||[]).some(existing=>protectiveGearKind(existing)===kind&&existing.equipped===true)):trinket?Boolean(trinketSlot):undefined
  const purchased:PurchasedEquipment={name:item.name,costWp,costPaidWp:costWp,costSp:costWp/WP_PER_SP,costNp:costWp/WP_PER_NP,category:item.category,detail:gearDisplayDetail(item),effect:item.effect,choice:choice||undefined,quantity:1,statBonuses:item.statBonuses,equipped,trinketSlot}
  if(!commit(draft=>{draft.wealthWp=Math.max(0,characterWealthWp(draft)-costWp);draft.equipment=[...(draft.equipment||[]),purchased]}))return
  selectedGearName.value='';selectedGearChoice.value=''
  message.value=`Purchased ${item.name} for ${gearPriceLabel(item)}.`
}

function equipProtective(index:number){
  if(!commit(draft=>{draft.equipment=setProtectiveEquipmentEquipped(draft.equipment,index,true)}))return
  const item=character.value?.equipment?.[index]
  message.value=item?`${item.name} equipped.`:'Protective equipment updated.'
}


function equipTrinket(index:number,slot:'primary'|'secondary'){
  const current=character.value?.equipment?.[index];if(!current)return
  if(!commit(draft=>{draft.equipment=setTrinketEquipmentEquipped(draft.equipment,index,current.equipped===true&&current.trinketSlot===slot?null:slot)}))return
  const item=character.value?.equipment?.[index]
  message.value=item?.equipped?`${item.name} equipped as ${item.trinketSlot==='secondary'?'Trinket 2':'Trinket 1'}.`:`${current.name} unequipped.`
}
function setOwnedAttachment(index:number,event:Event){
  const value=(event.target as HTMLSelectElement|null)?.value||undefined
  if(!commit(draft=>{const item=draft.equipment?.[index];if(item)item.attachedTo=value}))return
  message.value=value?`Attachment updated.`:'Attachment cleared.'
}
function ownedAttachmentTargets(item:PurchasedEquipment){return equipmentAttachmentTargets(item,character.value?.equipment)}

function activateArcaneFocus(index:number){
  if(!commit(draft=>{draft.equipment=setActiveArcaneFocus(draft.equipment,index,true)}))return
  const item=character.value?.equipment?.[index]
  message.value=item?`${item.name} is now the active Arcane Focus.`:'Arcane Focus updated.'
}
function sellOwnedGear(index:number){
  const owned=character.value?.equipment?.[index]
  if(!owned)return
  const quantity=Math.max(1,Math.floor(Number(owned.quantity)||1))
  const resaleWp=ordinaryGearResaleWp(owned)*quantity
  const kind=protectiveGearKind(owned)
  const wasEquipped=Boolean(kind&&owned.equipped)
  if(!commit(draft=>{
    const equipment=[...(draft.equipment||[])]
    equipment.splice(index,1)
    if(wasEquipped&&kind){
      const replacementIndex=equipment.findIndex(item=>protectiveGearKind(item)===kind)
      draft.equipment=replacementIndex>=0?setProtectiveEquipmentEquipped(equipment,replacementIndex,true):equipment
    }else draft.equipment=equipment
    draft.wealthWp=characterWealthWp(draft)+resaleWp
  }))return
  message.value=`Sold ${owned.name} for ${formatThreadpieceWp(resaleWp)}.`
}
function finish(){void router.push('/characters')}
</script>

<template>
  <main class="page level-up-page">
    <AppHeader compact back-to="/characters" back-label="Back to Character Roster" prefer-back-to />
    <template v-if="character">
      <div class="page-title-block level-up-title"><h1>Level Up {{ character.name }}</h1><p>Spend Experience, manage earned Threadpieces and treasure, and purchase equipment between adventures.</p></div>
      <section class="level-up-xp card-surface"><div><span>Available Experience</span><strong>{{ character.experience||0 }} XP</strong></div><label>Add Earned XP<input v-model.number="xpAdd" class="field-control" type="number" min="0" /></label><button class="secondary-button" @click="addXp">Add XP</button></section>
      <section class="level-up-grid">
        <article class="level-up-card card-surface"><h2>Attributes</h2><p>Cost: 2 + (2 × current Rank) XP.</p><div class="level-up-list"><div v-for="attribute in attributes" :key="attribute.id"><span><strong>{{ attribute.name }}</strong><small>Rank {{ character.attributes[attribute.id] }} · Mod +{{ character.attributes[attribute.id]*2 }}</small></span><button class="secondary-button compact-action" @click="raiseAttribute(attribute.id)">Raise · {{ attributeCost(character.attributes[attribute.id]) }} XP</button></div></div></article>
        <article class="level-up-card card-surface"><h2>Skills</h2><p>Raise Skill: 3 + current Rank XP. New Skill: 6 XP at Rank 1.</p><label>Known Skill<select v-model="skillName" class="field-control"><option value="">Select Skill</option><option v-for="([name,rank]) in skills" :key="name" :value="name">{{ name }} · Rank {{ rank }}</option></select></label><button class="secondary-button wide" :disabled="!skillName" @click="raiseSkill">Raise Selected Skill</button><label>New Skill<select v-model="newSkill" class="field-control"><option value="">Select New Skill</option><option v-for="skill in skillDefinitions.filter(item=>!character?.skillRanks?.[item.name])" :key="skill.name" :value="skill.name">{{ skill.name }}</option></select></label><button class="secondary-button wide" :disabled="!newSkill" @click="addSkill">Learn New Skill · {{ newSkillCost }} XP</button></article>
        <article class="level-up-card card-surface"><h2>Magic Level</h2><p>Cost: 10 + (4 × current Magic Level) XP. Known spells are granted by Magic Level and may be claimed here without additional XP.</p><div class="level-up-metric"><span>Current</span><strong>{{ magicLevel }}</strong></div><button class="secondary-button wide" :disabled="magicLevel>=MAGIC_LEVEL_MAX" @click="raiseMagic">{{ magicLevel>=MAGIC_LEVEL_MAX?'Magic Level Maximum':`Raise Magic Level · ${advancementCost('magic',magicLevel)} XP` }}</button><div v-if="magicLevel>0" class="level-up-known-list"><small>Lore Spells {{ knownLoreSpells.length }} / {{ magicAllowance.lore }}</small><small>Invocations {{ knownInvocationSpells.length }} / {{ magicAllowance.invocation }}</small><small>Signature {{ character.loreAttunement?'Known':'Unclaimed' }}</small></div><template v-if="magicLevel>0&&!character.loreAttunement"><label>Lore Attunement<select v-model="newLoreAttunement" class="field-control"><option value="">Select Lore</option><option v-for="lore in attunementOptions" :key="lore" :value="lore">{{ lore }}</option></select></label><button class="secondary-button wide" :disabled="!newLoreAttunement" @click="claimLoreAttunement">Claim Lore Attunement</button></template><template v-if="loreClaimsRemaining>0"><label>Unclaimed Lore Spell ({{ loreClaimsRemaining }} remaining)<select v-model="newLoreSpell" class="field-control"><option value="">Select Lore Spell</option><option v-for="spell in loreSpellOptions" :key="spell" :value="spell">{{ spell }}</option></select></label><button class="secondary-button wide" :disabled="!newLoreSpell" @click="claimLoreSpell">Learn Lore Spell</button></template><template v-if="invocationClaimsRemaining>0"><label>Unclaimed Invocation ({{ invocationClaimsRemaining }} remaining)<select v-model="newInvocationSpell" class="field-control"><option value="">Select Invocation</option><option v-for="spell in invocationSpellOptions" :key="spell" :value="spell">{{ spell }}</option></select></label><button class="secondary-button wide" :disabled="!newInvocationSpell" @click="claimInvocationSpell">Learn Invocation</button></template><small v-if="magicLevel>0&&loreClaimsRemaining===0&&invocationClaimsRemaining===0&&character.loreAttunement">Known-spell progression is current for Magic Level {{ magicLevel }}.</small></article>
        <article class="level-up-card card-surface"><h2>Talents</h2><p>New Talent: 10 XP.</p><label>New Talent<select v-model="newTalent" class="field-control"><option value="">Select Talent</option><option v-for="talent in talentOptions" :key="talent" :value="talent">{{ talent }}</option></select></label><button class="secondary-button wide" :disabled="!newTalent" @click="addTalent">Learn New Talent · {{ talentCost }} XP</button><div v-if="character.talents?.length" class="level-up-known-list"><small v-for="talent in character.talents" :key="talent">{{ canonicalTalentName(talent) }}</small></div></article>
        <article class="level-up-card card-surface currency-treasure-card"><h2>Currency &amp; Treasure</h2><p>Record rewards gained after character creation. Treasure is a simple placeholder list for now.</p><div class="level-up-metric compact-metric"><span>Current Threadpieces</span><strong>{{ wealthLabel }}</strong></div><div class="level-up-inline-fields"><label>Amount<input v-model.number="currencyAmount" class="field-control" type="number" min="0" step="1" /></label><label>Piece<select v-model="currencyUnit" class="field-control"><option value="wp">wp</option><option value="np">np</option><option value="sp">sp</option><option value="bp">bp</option></select></label></div><button class="secondary-button wide" @click="addCurrency">Add Currency</button><label>Treasure<input v-model="treasureText" class="field-control" type="text" placeholder="Treasure name or short description" /></label><button class="secondary-button wide" @click="addTreasure">Add Treasure</button><div v-if="character.treasure?.length" class="treasure-list"><div v-for="(treasure,index) in character.treasure" :key="`${treasure}-${index}`"><span>{{ treasure }}</span><button type="button" class="secondary-button compact-action" @click="removeTreasure(index)">Remove</button></div></div></article>
        <article class="level-up-card card-surface gear-purchase-card"><h2>Equipment &amp; Gear</h2><p>Purchase equipment with the character’s current Threadpieces. Current catalog prices and requirements apply.</p><button type="button" class="secondary-button wide" @click="shopOpen=true">Equipment &amp; Gear</button><div v-if="character.equipment?.length" class="owned-gear-list"><div v-for="(item,index) in character.equipment" :key="`${item.name}-${index}`" class="owned-gear-entry"><div class="owned-gear-copy"><small>{{ item.name }}<template v-if="item.choice"> · {{ item.choice }}</template></small><label v-if="ownedAttachmentTargets(item).length" class="owned-gear-attachment">Attach / Apply<select class="field-control" :value="item.attachedTo||''" @change="setOwnedAttachment(index,$event)"><option value="">Not attached</option><option v-for="target in ownedAttachmentTargets(item)" :key="target" :value="target">{{ target }}</option></select></label></div><div class="owned-gear-actions"><button v-if="isArcaneFocusName(item.name)" type="button" class="secondary-button compact-action" :class="{active:item.activeArcaneFocus}" :disabled="item.equipped!==true" @click="activateArcaneFocus(index)">{{ item.activeArcaneFocus?'Active Focus':'Use Focus' }}</button><button v-if="protectiveGearKind(item)" type="button" class="secondary-button compact-action" :class="{active:item.equipped}" :disabled="item.equipped!==true&&!canEquipProtectiveEquipment(character.equipment,index)" @click="equipProtective(index)">{{ item.equipped?'Equipped':'Equip' }}</button><template v-if="isTrinketGear(item)"><button type="button" class="secondary-button compact-action" :class="{active:item.equipped&&item.trinketSlot==='primary'}" @click="equipTrinket(index,'primary')">{{ item.equipped&&item.trinketSlot==='primary'?'Trinket 1':'Equip Trinket 1' }}</button><button type="button" class="secondary-button compact-action" :class="{active:item.equipped&&item.trinketSlot==='secondary'}" :disabled="!(item.equipped&&item.trinketSlot==='secondary')&&!canEquipSecondTrinket(character.equipment,index)" @click="equipTrinket(index,'secondary')">{{ item.equipped&&item.trinketSlot==='secondary'?'Trinket 2':'Equip Trinket 2' }}</button></template><button type="button" class="secondary-button compact-action" @click="sellOwnedGear(index)">Sell · {{ formatThreadpieceWp(ordinaryGearResaleWp(item)*Math.max(1,Number(item.quantity)||1)) }}</button></div></div></div></article>
      </section>
      <p v-if="message" class="creation-status-message">{{ message }}</p><div class="button-row end"><RouterLink class="secondary-button" to="/rules/read/beyond-character-creation">Read Beyond Character Creation</RouterLink><button class="primary-button" @click="finish">Done</button></div>
    </template>
    <section v-else-if="selectedCharacter?.locked" class="empty-state card-surface"><h2>Character Locked</h2><p>Unlock this character before using Level Up.</p><RouterLink class="primary-button" to="/characters">Back to Character Roster</RouterLink></section><section v-else-if="selectedCharacter" class="empty-state card-surface"><h2>Approval Required</h2><p>Move this completed character to Approved Characters before using Level Up.</p><RouterLink class="primary-button" to="/characters">Back to Character Roster</RouterLink></section><section v-else class="empty-state card-surface"><h2>Character Not Found</h2><p>This saved character is not available on this device.</p><RouterLink class="primary-button" to="/characters">Back to Character Roster</RouterLink></section>
  
    <EquipmentShopModal v-if="character" :open="shopOpen" :items="gearOptions" :balance-wp="characterWealthWp(character)" :might="Number(character.attributes.might||0)" @close="shopOpen=false" @purchase="purchaseFromSharedShop" />
</main>
</template>
<style scoped>
.level-up-xp{display:grid;grid-template-columns:minmax(0,1fr) minmax(180px,.5fr) auto;gap:10px;align-items:end;margin-bottom:12px;padding:14px}.level-up-xp>div{display:grid;gap:2px}.level-up-xp>div span{color:var(--ink-soft);font-weight:800}.level-up-xp>div strong{font-family:Georgia,'Times New Roman',serif;font-size:28px}.level-up-xp label{display:grid;gap:4px;font-weight:800}.level-up-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.level-up-card{padding:15px}.level-up-card h2{margin:0 0 4px}.level-up-card>p{color:var(--ink-soft)}.level-up-list{display:grid;gap:6px}.level-up-list>div{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px;border:1px solid var(--line);border-radius:8px}.level-up-list span{display:grid}.level-up-list small{color:var(--ink-soft)}.level-up-card label{display:grid;gap:4px;margin-top:9px;font-weight:800}.level-up-metric{display:grid;place-items:center;min-height:84px;margin:10px 0;border:1px solid var(--line);border-radius:9px}.level-up-metric strong{font-size:32px;color:var(--accent-dark)}.compact-metric{min-height:68px}.compact-metric strong{font-size:25px}.level-up-known-list{display:flex;flex-wrap:wrap;gap:5px;margin-top:9px}.level-up-known-list small{padding:4px 7px;border:1px solid var(--line);border-radius:999px;background:var(--paper-2);font-weight:750}.owned-gear-list{display:grid;gap:5px;margin-top:9px}.owned-gear-entry{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 7px;border:1px solid var(--line);border-radius:8px;background:var(--paper-2)}.owned-gear-copy{display:grid;gap:5px;min-width:0;flex:1}.owned-gear-entry small{font-weight:750}.owned-gear-attachment{display:grid;grid-template-columns:auto minmax(140px,1fr);gap:6px;align-items:center;margin:0!important;font-size:calc(10px + var(--font-offset))}.owned-gear-attachment .field-control{min-width:0}.owned-gear-actions{display:flex;align-items:center;justify-content:flex-end;gap:5px;flex-wrap:wrap}.owned-gear-entry .active{border-color:var(--accent);background:var(--accent-wash)}.level-up-inline-fields{display:grid;grid-template-columns:minmax(0,1fr) minmax(90px,.35fr);gap:8px}.treasure-list{display:grid;gap:6px;margin-top:10px}.treasure-list>div{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:7px 8px;border:1px solid var(--line);border-radius:8px}.gear-level-detail{margin:9px 0 2px!important}.gear-level-warning{display:block;margin-top:6px;color:var(--danger)!important;font-weight:850}@media(max-width:720px){.level-up-xp,.level-up-grid{grid-template-columns:1fr}.owned-gear-entry{align-items:stretch;flex-direction:column}.owned-gear-actions{justify-content:flex-start}}@media(max-width:480px){.level-up-inline-fields,.owned-gear-attachment{grid-template-columns:1fr}}
</style>
