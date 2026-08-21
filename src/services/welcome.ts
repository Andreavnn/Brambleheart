const welcomeKey = 'brambleheart.welcome.v0.05'
const installDismissKey = 'brambleheart.install-welcome-dismissed.v0.04'

export function hasSeenWelcome() {
  return typeof window !== 'undefined' && localStorage.getItem(welcomeKey) === 'true'
}
export function markWelcomeSeen() {
  if (typeof window !== 'undefined') localStorage.setItem(welcomeKey, 'true')
}
export function hasDismissedWelcomeInstallPrompt() {
  return typeof window !== 'undefined' && localStorage.getItem(installDismissKey) === 'true'
}
export function dismissWelcomeInstallPromptPermanently() {
  if (typeof window !== 'undefined') localStorage.setItem(installDismissKey, 'true')
}
