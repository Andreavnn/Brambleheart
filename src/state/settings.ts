import { reactive, watchEffect } from 'vue'
import { species } from '../data/bramble'

export type ThemeMode = 'system'|'light'|'dark'
export type TextScale = 'small'|'medium'|'large'
export type SpeciesTheme = 'none' | (typeof species)[number]
export type BackgroundOption = 'none'

export interface AppSettings {
  theme: ThemeMode
  text: TextScale
  compact: boolean
  speciesTheme: SpeciesTheme
  background: BackgroundOption
}

const KEY = 'brambleheart-settings-v0.01'
const defaults: AppSettings = {
  theme:'system',
  text:'medium',
  compact:false,
  speciesTheme:'none',
  background:'none',
}

function read(): AppSettings {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '{}') as Partial<AppSettings>
    const speciesTheme = saved.speciesTheme === 'none' || species.includes(saved.speciesTheme as (typeof species)[number])
      ? saved.speciesTheme as SpeciesTheme
      : 'none'
    return {
      ...defaults,
      ...saved,
      speciesTheme,
      background:'none',
    }
  } catch {
    return { ...defaults }
  }
}

export const settings = reactive<AppSettings>(read())

function speciesToken(value: SpeciesTheme) {
  return value === 'none' ? 'none' : value.toLowerCase().replace(/[^a-z0-9]+/g,'-')
}

export function applySettings() {
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  const dark = settings.theme === 'dark' || (settings.theme === 'system' && prefersDark)
  document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  document.documentElement.dataset.text = settings.text
  document.documentElement.dataset.compact = String(settings.compact)
  document.documentElement.dataset.species = speciesToken(settings.speciesTheme)
  document.documentElement.dataset.background = settings.background
  localStorage.setItem(KEY, JSON.stringify(settings))
}

watchEffect(applySettings)

export function resetDisplaySettings() {
  settings.theme='system'
  settings.text='medium'
  settings.compact=false
  settings.speciesTheme='none'
  settings.background='none'
  applySettings()
}

export function resetSettings() {
  resetDisplaySettings()
  localStorage.removeItem(KEY)
  applySettings()
}
