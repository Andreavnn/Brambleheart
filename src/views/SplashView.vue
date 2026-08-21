<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { BUILD } from '../data/bramble'
import { dismissWelcomeInstallPromptPermanently, hasDismissedWelcomeInstallPrompt, markWelcomeSeen } from '../services/welcome'
import { canInstall, isInstalled, requestInstall } from '../state/install'

const route=useRoute()
const router=useRouter()
const installModalOpen=ref(!hasDismissedWelcomeInstallPrompt())
const installHelp=ref(false)
const continuePath=computed(()=>{
  const candidate=String(route.query.continue||'')
  return candidate.startsWith('/') && !candidate.startsWith('/welcome') ? candidate : '/characters'
})
async function installNow(){
  if (!canInstall.value) installHelp.value=true
  await requestInstall()
  if (canInstall.value) installModalOpen.value=false
}
function dismissInstall(){ installModalOpen.value=false }
function dismissInstallPermanently(){ dismissWelcomeInstallPromptPermanently(); installModalOpen.value=false }
function continueToBrambleheart(){ markWelcomeSeen(); void router.replace(continuePath.value) }
</script>

<template>
  <main class="welcome-page">
    <section class="welcome-panel card-surface">
      <header class="welcome-brand-block">
        <img src="/assets/Icon.png" alt="Brambleheart icon" class="welcome-icon" />
        <div>
          <p class="eyebrow">WELCOME TO</p>
          <h1>BRAMBLEHEART</h1>
          <p class="welcome-tagline">Small heroes, big adventures. Build characters, check rules, and use tabletop tools from one companion.</p>
        </div>
      </header>

      <section class="welcome-intro-grid">
        <article><h2>Characters</h2><p>Create, import, export, and manage Brambleheart characters on the device you are using.</p></article>
        <article><h2>Rules Reference</h2><p>Search the current Brambleheart rules reference and return quickly to recently opened entries.</p></article>
        <article><h2>Tabletop Tools</h2><p>Use the Rhythm Engine, combat, damage, Health, Hallows, and advancement calculators during play.</p></article>
      </section>

      <section class="welcome-support-block">
        <div><p class="eyebrow">SUPPORT</p><h2>Support Brambleheart</h2><p>Follow development and support Andreavnn projects through Patreon.</p></div>
        <div class="welcome-support-actions"><a class="secondary-button welcome-support-button" href="https://www.patreon.com/Andreavnn" target="_blank" rel="noopener noreferrer">Patreon</a></div>
      </section>

      <aside class="welcome-disclaimer">
        <strong>Alpha work in progress</strong>
        <p>Brambleheart is actively being built. Rules, content, interface behavior, and stored alpha data may change as development continues. Current build: {{ BUILD }}.</p>
      </aside>

      <button type="button" class="primary-button welcome-enter-button" @click="continueToBrambleheart">Enter Brambleheart</button>
    </section>

    <div v-if="installModalOpen && !isInstalled" class="welcome-install-backdrop" role="presentation">
      <section class="welcome-install-dialog card-surface" role="dialog" aria-modal="true" aria-labelledby="welcome-install-title">
        <img src="/assets/Icon.png" alt="" aria-hidden="true" />
        <div>
          <p class="eyebrow">INSTALL BRAMBLEHEART</p>
          <h2 id="welcome-install-title">Use Brambleheart like an app?</h2>
          <p>Install Brambleheart on this phone, tablet, or computer for a home-screen or desktop icon and a standalone app window.</p>
          <p v-if="installHelp" class="install-help-copy">Your browser has not exposed the direct install prompt yet. Open the browser menu and choose <strong>Install app</strong> or <strong>Add to Home Screen</strong>.</p>
        </div>
        <div class="welcome-install-actions">
          <button type="button" class="primary-button" @click="installNow">{{ canInstall ? 'Install Brambleheart' : 'Install options' }}</button>
          <button type="button" class="secondary-button" @click="dismissInstall">Not now</button>
          <button type="button" class="secondary-button welcome-install-never" @click="dismissInstallPermanently">Do not show again</button>
        </div>
      </section>
    </div>
  </main>
</template>
