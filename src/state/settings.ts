import { reactive, toRef, watch } from 'vue'
import { backgroundIds, backgroundUrl } from '../data/backgroundCatalog'

export type FontSize = 'smaller' | 'small' | 'normal' | 'large' | 'larger'
export type RoleTheme = 'default' | 'warrior' | 'ranger' | 'spellcaster' | 'healer' | 'thief' | 'trickster'
export type BackgroundChoice = string

type SettingsState = {
  darkMode:boolean
  compactRows:boolean
  fontSize:FontSize
  boldText:boolean
  roleTheme:RoleTheme
  backgroundImage:BackgroundChoice
  backgroundGrayscale:boolean
}

const storageKey='brambleheart-settings-v0.01'
const defaults:SettingsState={
  darkMode:false,
  compactRows:false,
  fontSize:'normal',
  boldText:false,
  roleTheme:'default',
  backgroundImage:'none',
  backgroundGrayscale:false,
}
const roles:RoleTheme[]=['default','warrior','ranger','spellcaster','healer','thief','trickster']

function normalizeFontSize(value:unknown):FontSize{
  if(['smaller','small','normal','large','larger'].includes(String(value)))return value as FontSize
  if(value==='medium')return'normal'
  return'normal'
}
function normalizeRole(value:unknown):RoleTheme{
  if(roles.includes(value as RoleTheme))return value as RoleTheme
  const legacy:Record<string,RoleTheme>={adventurer:'ranger',storyteller:'trickster',tactician:'warrior',mystic:'spellcaster'}
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
    const saved=JSON.parse(localStorage.getItem(storageKey)||'{}')
    const legacyTheme=saved.theme
    const inferredDark=typeof saved.darkMode==='boolean'?saved.darkMode:legacyTheme==='dark'
    return{
      darkMode:Boolean(inferredDark),
      compactRows:Boolean(saved.compactRows??saved.compact),
      fontSize:normalizeFontSize(saved.fontSize??saved.text),
      boldText:Boolean(saved.boldText),
      roleTheme:normalizeRole(saved.roleTheme),
      backgroundImage:normalizeBackground(saved.backgroundImage??saved.background),
      backgroundGrayscale:Boolean(saved.backgroundGrayscale),
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
  root.dataset.boldText=state.boldText?'true':'false'
  root.dataset.roleTheme=state.roleTheme
  root.dataset.background=state.backgroundImage
  root.dataset.backgroundGrayscale=state.backgroundGrayscale?'true':'false'
  const url=backgroundUrl(state.backgroundImage)
  root.style.setProperty('--bh-selected-background',url?`url(${JSON.stringify(url)})`:'none')
  delete root.dataset.speciesTheme
}
watch(state,()=>{
  state.backgroundImage=normalizeBackground(state.backgroundImage)
  applySettings()
  if(typeof window!=='undefined')localStorage.setItem(storageKey,JSON.stringify(state))
},{deep:true,immediate:true})

export function useSettings(){
  return{
    darkMode:toRef(state,'darkMode'),
    compactRows:toRef(state,'compactRows'),
    fontSize:toRef(state,'fontSize'),
    boldText:toRef(state,'boldText'),
    roleTheme:toRef(state,'roleTheme'),
    backgroundImage:toRef(state,'backgroundImage'),
    backgroundGrayscale:toRef(state,'backgroundGrayscale'),
    toggleTheme:()=>{state.darkMode=!state.darkMode},
    reset:()=>Object.assign(state,defaults),
  }
}
export function resetSettings(){Object.assign(state,defaults)}
