import { reactive, watchEffect } from 'vue'

export type ThemeMode = 'system'|'light'|'dark'
export type TextScale = 'small'|'medium'|'large'
export interface AppSettings { theme: ThemeMode; text: TextScale; compact: boolean }
const KEY = 'brambleheart-settings-v0.01'

function read(): AppSettings {
  try { return { theme:'system', text:'medium', compact:false, ...JSON.parse(localStorage.getItem(KEY) || '{}') } }
  catch { return { theme:'system', text:'medium', compact:false } }
}

export const settings = reactive<AppSettings>(read())

export function applySettings() {
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  const dark = settings.theme === 'dark' || (settings.theme === 'system' && prefersDark)
  document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  document.documentElement.dataset.text = settings.text
  document.documentElement.dataset.compact = String(settings.compact)
  localStorage.setItem(KEY, JSON.stringify(settings))
}

watchEffect(applySettings)

export function resetSettings() {
  settings.theme='system'; settings.text='medium'; settings.compact=false
  localStorage.removeItem(KEY); applySettings()
}
