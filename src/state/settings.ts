import { reactive, toRef, watch } from 'vue'

export type FontSize = 'smaller' | 'small' | 'normal' | 'large' | 'larger'
export type RoleTheme = 'adventurer' | 'storyteller' | 'tactician' | 'mystic'
export type BackgroundChoice = 'default' | 'crossway-hearth' | 'thornwick-market' | 'leviathans-wreck' | 'deepwood-ruins' | 'mushroom-isles'

type SettingsState = {
  darkMode: boolean
  compactRows: boolean
  fontSize: FontSize
  boldText: boolean
  roleTheme: RoleTheme
  backgroundImage: BackgroundChoice
}

const storageKey = 'brambleheart-settings-v0.01'
const defaults: SettingsState = {
  darkMode: false,
  compactRows: false,
  fontSize: 'normal',
  boldText: false,
  roleTheme: 'adventurer',
  backgroundImage: 'default',
}

const backgrounds: BackgroundChoice[] = ['default','crossway-hearth','thornwick-market','leviathans-wreck','deepwood-ruins','mushroom-isles']
const roles: RoleTheme[] = ['adventurer','storyteller','tactician','mystic']

function normalizeFontSize(value: unknown): FontSize {
  if (['smaller','small','normal','large','larger'].includes(String(value))) return value as FontSize
  if (value === 'medium') return 'normal'
  return 'normal'
}
function normalizeRole(value: unknown): RoleTheme {
  if (roles.includes(value as RoleTheme)) return value as RoleTheme
  // Migrate every former species/default palette to the stable Adventurer theme.
  return 'adventurer'
}
function normalizeBackground(value: unknown): BackgroundChoice {
  if (value === 'none') return 'default'
  return backgrounds.includes(value as BackgroundChoice) ? value as BackgroundChoice : 'default'
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
      roleTheme: normalizeRole(saved.roleTheme),
      backgroundImage: normalizeBackground(saved.backgroundImage ?? saved.background),
    }
  } catch {
    return { ...defaults }
  }
}

const state = reactive<SettingsState>(loadSettings())

function applySettings() {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = state.darkMode ? 'dark' : 'light'
  document.documentElement.dataset.density = state.compactRows ? 'compact' : 'comfortable'
  document.documentElement.dataset.fontSize = state.fontSize
  document.documentElement.dataset.boldText = state.boldText ? 'true' : 'false'
  document.documentElement.dataset.roleTheme = state.roleTheme
  document.documentElement.dataset.background = state.backgroundImage
  delete document.documentElement.dataset.speciesTheme
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
    roleTheme: toRef(state,'roleTheme'),
    backgroundImage: toRef(state,'backgroundImage'),
    toggleTheme: () => { state.darkMode = !state.darkMode },
    reset: () => Object.assign(state, defaults),
  }
}

export function resetSettings() { Object.assign(state, defaults) }
