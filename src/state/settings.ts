import { reactive, toRef, watch } from 'vue'
import { backgroundIds, backgroundUrl } from '../data/backgroundCatalog'
import { normalizeMeasurement, type MeasurementUnit } from '../rules/measurements'
import { readLocalStorage, SETTINGS_STORE, writeLocalStorage } from '../services/storage'

export type FontSize='smallest'|'small'|'normal'|'large'|'largest'
export type LogoSize='smallest'|'small'|'normal'|'large'|'largest'
export type RoleTheme='default'|'warrior'|'healer'|'ranger'|'thief'
export type BackgroundChoice=string

type SettingsState={
  darkMode:boolean
  compactRows:boolean
  fontSize:FontSize
  logoSize:LogoSize
  boldText:boolean
  roleTheme:RoleTheme
  backgroundImage:BackgroundChoice
  backgroundGrayscale:boolean
  bootAudio:boolean
  measurement:MeasurementUnit
  creationTips:boolean
}

const defaults:SettingsState={
  darkMode:false,
  compactRows:false,
  fontSize:'normal',
  logoSize:'largest',
  boldText:false,
  roleTheme:'default',
  backgroundImage:'none',
  backgroundGrayscale:false,
  bootAudio:true,
  measurement:'squares',
  creationTips:true,
}
const roles:RoleTheme[]=['default','warrior','healer','ranger','thief']

function normalizeFontSize(value:unknown):FontSize{
  if(['smallest','small','normal','large','largest'].includes(String(value)))return value as FontSize
  if(value==='smaller')return'smallest'
  if(value==='larger')return'largest'
  if(value==='medium')return'normal'
  return'normal'
}
function normalizeLogoSize(value:unknown):LogoSize{
  if(['smallest','small','normal','large','largest'].includes(String(value)))return value as LogoSize
  if(value==='smaller')return'small'
  if(value==='medium')return'normal'
  if(value==='larger')return'large'
  return'largest'
}
function normalizeRole(value:unknown):RoleTheme{
  if(roles.includes(value as RoleTheme))return value as RoleTheme
  const legacy:Record<string,RoleTheme>={adventurer:'ranger',tactician:'warrior',storyteller:'default',mystic:'default',spellcaster:'default',trickster:'default'}
  return legacy[String(value)]||'default'
}
function normalizeBackground(value:unknown):BackgroundChoice{
  if(value==='default')return'none'
  const id=String(value||'none')
  return backgroundIds.includes(id)?id:'none'
}
function loadSettings():SettingsState{
  if(typeof window==='undefined')return{...defaults}
  try{
    const saved=JSON.parse(readLocalStorage(SETTINGS_STORE)||'{}')
    const legacyTheme=saved.theme
    const inferredDark=typeof saved.darkMode==='boolean'?saved.darkMode:legacyTheme==='dark'
    return{
      darkMode:Boolean(inferredDark),
      compactRows:Boolean(saved.compactRows??saved.compact),
      fontSize:normalizeFontSize(saved.fontSize??saved.text),
      logoSize:normalizeLogoSize(saved.logoSize),
      boldText:Boolean(saved.boldText),
      roleTheme:normalizeRole(saved.roleTheme),
      backgroundImage:normalizeBackground(saved.backgroundImage??saved.background),
      backgroundGrayscale:Boolean(saved.backgroundGrayscale),
      bootAudio:saved.bootAudio!==false,
      measurement:normalizeMeasurement(saved.measurement),
      creationTips:saved.creationTips!==false,
    }
  }catch{return{...defaults}}
}

const state=reactive<SettingsState>(loadSettings())
function applySettings(){
  if(typeof document==='undefined')return
  const root=document.documentElement
  root.dataset.theme=state.darkMode?'dark':'light'
  root.dataset.density=state.compactRows?'compact':'comfortable'
  root.dataset.fontSize=state.fontSize
  root.dataset.logoSize=state.logoSize
  root.dataset.boldText=state.boldText?'true':'false'
  root.dataset.roleTheme=state.roleTheme
  root.dataset.background=state.backgroundImage
  root.dataset.backgroundGrayscale=state.backgroundGrayscale?'true':'false'
  root.dataset.bootAudio=state.bootAudio?'true':'false'
  root.dataset.measurement=state.measurement
  root.dataset.creationTips=state.creationTips?'true':'false'
  const url=backgroundUrl(state.backgroundImage)
  root.style.setProperty('--bh-selected-background',url?`url(${JSON.stringify(url)})`:'none')
}
watch(state,()=>{
  state.backgroundImage=normalizeBackground(state.backgroundImage)
  state.measurement=normalizeMeasurement(state.measurement)
  state.logoSize=normalizeLogoSize(state.logoSize)
  applySettings()
  if(typeof window!=='undefined')writeLocalStorage(SETTINGS_STORE,JSON.stringify(state))
},{deep:true,immediate:true})
watch(()=>state.measurement,(next,previous)=>{
  if(typeof window!=='undefined'&&previous!==undefined&&next!==previous)window.dispatchEvent(new CustomEvent('brambleheart:measurement-change',{detail:next}))
})

export function useSettings(){
  return{
    darkMode:toRef(state,'darkMode'),
    compactRows:toRef(state,'compactRows'),
    fontSize:toRef(state,'fontSize'),
    logoSize:toRef(state,'logoSize'),
    boldText:toRef(state,'boldText'),
    roleTheme:toRef(state,'roleTheme'),
    backgroundImage:toRef(state,'backgroundImage'),
    backgroundGrayscale:toRef(state,'backgroundGrayscale'),
    bootAudio:toRef(state,'bootAudio'),
    measurement:toRef(state,'measurement'),
    creationTips:toRef(state,'creationTips'),
    toggleTheme:()=>{state.darkMode=!state.darkMode},
    reset:()=>Object.assign(state,defaults),
  }
}
