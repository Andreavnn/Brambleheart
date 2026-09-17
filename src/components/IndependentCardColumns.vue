<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props=withDefaults(defineProps<{
  items:any[]
  columns?:number
  itemKey?:string
}>(),{
  columns:2,
  itemKey:'',
})

defineSlots<{
  default(props:{item:any;index:number}):any
}>()

const mobile=ref(false)
let mobileQuery:MediaQueryList|null=null
function syncViewport(){mobile.value=Boolean(mobileQuery?.matches)}
onMounted(()=>{
  mobileQuery=window.matchMedia('(max-width:760px)')
  syncViewport()
  mobileQuery.addEventListener('change',syncViewport)
})
onBeforeUnmount(()=>mobileQuery?.removeEventListener('change',syncViewport))

const indexedItems=computed(()=>props.items.map((item,index)=>({item,index,key:resolveKey(item,index)})))
const desktopColumns=computed(()=>Array.from({length:Math.max(1,props.columns)},(_,columnIndex)=>indexedItems.value.filter(entry=>entry.index%Math.max(1,props.columns)===columnIndex)))
function resolveKey(item:any,index:number){
  if(props.itemKey&&item&&typeof item==='object'&&props.itemKey in item)return`${String(item[props.itemKey])}-${index}`
  if(typeof item==='string'||typeof item==='number')return`${String(item)}-${index}`
  return String(index)
}
</script>

<template>
  <div class="independent-card-columns">
    <div v-if="!mobile" class="independent-card-columns-desktop" :style="{gridTemplateColumns:`repeat(${Math.max(1,columns)},minmax(0,1fr))`}">
      <div v-for="(column,columnIndex) in desktopColumns" :key="columnIndex" class="independent-card-column">
        <template v-for="entry in column" :key="entry.key"><slot :item="entry.item" :index="entry.index" /></template>
      </div>
    </div>
    <div v-else class="independent-card-columns-mobile">
      <template v-for="entry in indexedItems" :key="entry.key"><slot :item="entry.item" :index="entry.index" /></template>
    </div>
  </div>
</template>

<style scoped>
.independent-card-columns{min-width:0}
.independent-card-columns-desktop{display:grid;align-items:start;gap:9px;min-width:0}
.independent-card-column,.independent-card-columns-mobile{display:grid;align-content:start;gap:9px;min-width:0}
.independent-card-column>:deep(*){min-width:0}
</style>
