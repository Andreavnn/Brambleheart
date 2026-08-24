import { readLocalStorage, STORAGE_KEYS, writeLocalStorage } from './storage'

const welcomeKey=STORAGE_KEYS.welcomeSeen
const installDismissKey=STORAGE_KEYS.installWelcomeDismissed

export function hasSeenWelcome(){return readLocalStorage(welcomeKey)==='true'}
export function markWelcomeSeen(){writeLocalStorage(welcomeKey,'true')}
export function hasDismissedWelcomeInstallPrompt(){return readLocalStorage(installDismissKey)==='true'}
export function dismissWelcomeInstallPromptPermanently(){writeLocalStorage(installDismissKey,'true')}
