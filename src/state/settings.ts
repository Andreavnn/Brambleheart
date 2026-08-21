import { reactive, toRef, watch } from 'vue'
import { species } from '../data/bramble'

export type FontSize = 'smaller' | 'small' | 'normal' | 'large' | 'larger'
export type SpeciesTheme = 'default' | (typeof species)[number]
export type BackgroundChoice = 'none' | 'crossway-hearth' | 'thornwick-market' | 'leviathans-wreck' | 'deepwood-ruins' | 'mushroom-isles'

type SettingsState = {
  darkMode: boolean
  compactRows: boolean
  fontSize: FontSize
  boldText: boolean
  speciesTheme: SpeciesTheme
  backgroundImage: BackgroundChoice
}

const storageKey = 'brambleheart-settings-v0.01'
const defaults: SettingsState = {
  darkMode: false,
  compactRows: false,
  fontSize: 'normal',
  boldText: false,
  speciesTheme: 'default',
  backgroundImage: 'none',
}

const backgrounds: BackgroundChoice[] = ['none','crossway-hearth','thornwick-market','leviathans-wreck','deepwood-ruins','mushroom-isles']

function normalizeFontSize(value: unknown): FontSize {
  if (['smaller','small','normal','large','larger'].includes(String(value))) return value as FontSize
  if (value === 'medium') return 'normal'
  return 'normal'
}
function normalizeSpecies(value: unknown): SpeciesTheme {
  if (value === 'default' || value === 'none') return 'default'
  return species.includes(value as (typeof species)[number]) ? value as SpeciesTheme : 'default'
}
function normalizeBackground(value: unknown): BackgroundChoice {
  return backgrounds.includes(value as BackgroundChoice) ? value as BackgroundChoice : 'none'
}
function loadSettings(): SettingsState {
  if (typeof window === 'undefined') return { ...defaults }
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}')
    const legacyTheme = saved.theme
    const inferredDark = typeof saved.darkMode === 'boolean'
      ? saved.darkMode
      : legacyTheme === 'dark'
        ? true
        : false
    return {
      darkMode: inferredDark,
      compactRows: Boolean(saved.compactRows ?? saved.compact),
      fontSize: normalizeFontSize(saved.fontSize ?? saved.text),
      boldText: Boolean(saved.boldText),
      speciesTheme: normalizeSpecies(saved.speciesTheme),
      backgroundImage: normalizeBackground(saved.backgroundImage ?? saved.background),
    }
  } catch {
    return { ...defaults }
  }
}

const state = reactive<SettingsState>(loadSettings())

function speciesToken(value: SpeciesTheme) {
  return value === 'default' ? 'default' : value.toLowerCase().replace(/[^a-z0-9]+/g,'-')
}
function applySettings() {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = state.darkMode ? 'dark' : 'light'
  document.documentElement.dataset.density = state.compactRows ? 'compact' : 'comfortable'
  document.documentElement.dataset.fontSize = state.fontSize
  document.documentElement.dataset.boldText = state.boldText ? 'true' : 'false'
  document.documentElement.dataset.speciesTheme = speciesToken(state.speciesTheme)
  document.documentElement.dataset.background = state.backgroundImage
}

watch(state, () => {
  applySettings()
  if (typeof window !== 'undefined') localStorage.setItem(storageKey, JSON.stringify(state))
}, { deep:true, immediate:true })

export function useSettings() {
  return {
    darkMode: toRef(state,'darkMode'),
    compactRows: toRef(state,'compactRows'),
    fontSize: toRef(state,'fontSize'),
    boldText: toRef(state,'boldText'),
    speciesTheme: toRef(state,'speciesTheme'),
    backgroundImage: toRef(state,'backgroundImage'),
    toggleTheme: () => { state.darkMode = !state.darkMode },
    reset: () => Object.assign(state, defaults),
  }
}

export function resetSettings() { Object.assign(state, defaults) }
