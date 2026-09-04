import { computed, ref } from 'vue'

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome:'accepted'|'dismissed'; platform:string }>
}

const promptEvent = ref<InstallPromptEvent | null>(null)
export const isInstalled = ref(false)
export const installMessage = ref('')
export const canInstall = computed(() => Boolean(promptEvent.value) && !isInstalled.value)
let initialized = false

function detectStandalone() {
  const iosStandalone = Boolean((navigator as Navigator & { standalone?: boolean }).standalone)
  return window.matchMedia?.('(display-mode: standalone)').matches || iosStandalone
}

export function setupInstallSupport() {
  if (initialized || typeof window === 'undefined') return
  initialized = true
  isInstalled.value = detectStandalone()

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault()
    promptEvent.value = event as InstallPromptEvent
    installMessage.value = 'Installation is available on this device.'
  })

  window.addEventListener('appinstalled', () => {
    isInstalled.value = true
    promptEvent.value = null
    installMessage.value = 'Brambleheart is installed.'
  })

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js', { updateViaCache:'none' }).then(registration => registration.update()).catch(() => undefined)
    }, { once:true })
  }
}

export async function requestInstall() {
  if (isInstalled.value) {
    installMessage.value = 'Brambleheart is already running as an installed app.'
    return
  }
  if (!promptEvent.value) {
    installMessage.value = 'Use your browser menu and choose Install App or Add to Home Screen.'
    return
  }
  const current = promptEvent.value
  await current.prompt()
  const choice = await current.userChoice
  installMessage.value = choice.outcome === 'accepted'
    ? 'Install accepted. Your browser will finish adding Brambleheart.'
    : 'Installation was dismissed.'
  if (choice.outcome === 'accepted') promptEvent.value = null
}
