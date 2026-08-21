<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { dismissWelcomeInstallPromptPermanently, hasDismissedWelcomeInstallPrompt, markWelcomeSeen } from '../services/welcome'
import { canInstall, isInstalled, requestInstall } from '../state/install'

const route=useRoute();const router=useRouter();const installModalOpen=ref(!hasDismissedWelcomeInstallPrompt());const installHelp=ref(false)
const continuePath=computed(()=>{const candidate=String(route.query.continue||'');return candidate.startsWith('/')&&!candidate.startsWith('/welcome')?candidate:'/characters'})
async function installNow(){if(!canInstall.value)installHelp.value=true;await requestInstall();if(canInstall.value)installModalOpen.value=false}
function dismissInstall(){installModalOpen.value=false}
function dismissInstallPermanently(){dismissWelcomeInstallPromptPermanently();installModalOpen.value=false}
function continueToBrambleheart(){markWelcomeSeen();void router.replace(continuePath.value)}
</script>

<template>
  <main class="welcome-page bramble-welcome-page">
    <section class="welcome-panel card-surface">
      <header class="welcome-brand-block bramble-welcome-brand">
        <img src="/assets/Logo.png" alt="Brambleheart — Small Heroes, Big Adventures" class="welcome-logo" />
        <p class="welcome-tagline">Build characters, check rules, and use tabletop tools from one companion.</p>
      </header>

      <section class="welcome-story-block">
        <h2>Welcome to Brambleheart</h2>
        <p>Brambleheart is a story-driven tabletop role-playing game of courage, kinship, and discovery, set in the myth-wild world of Anthro Mundas — a land where storms sing names, ancient oaths still echo, and the Beastfolk of fur, feather, and scale walk beneath the gaze of old gods and older memories.</p>
      </section>

      <section class="welcome-intro-grid">
        <article><h2>Character Creation</h2><p>Build a hero step by step, then keep saved characters organized on this device with import, export, and pinning tools.</p></article>
        <article><h2>Rules Reference</h2><p>Browse the Brambleheart rules as individual reader pages, search the table of contents, jump through Quick Reference links, and return to recently opened rules.</p></article>
        <article><h2>Tabletop Tools</h2><p>Use the Rhythm Engine, track encounters, resolve combat, and keep recent dice results available while play continues.</p></article>
      </section>

      <section class="welcome-support-block">
        <div><p class="eyebrow">DONATION</p><h2>Support Brambleheart</h2><p>Donation links will be added when they are ready.</p></div>
        <div class="welcome-support-actions" aria-label="Brambleheart donation options">
          <button class="secondary-button welcome-support-button" type="button" disabled title="Link coming later">Single Support</button>
          <button class="secondary-button welcome-support-button" type="button" disabled title="Link coming later">Recurring Support</button>
        </div>
      </section>

      <button type="button" class="primary-button welcome-enter-button" @click="continueToBrambleheart">Enter Brambleheart</button>
    </section>

    <div v-if="installModalOpen&&!isInstalled" class="welcome-install-backdrop" role="presentation">
      <section class="welcome-install-dialog card-surface" role="dialog" aria-modal="true" aria-labelledby="welcome-install-title">
        <img src="/icons/favicon-64.png" alt="" aria-hidden="true" class="welcome-install-icon" />
        <div><p class="eyebrow">INSTALL BRAMBLEHEART</p><h2 id="welcome-install-title">Use Brambleheart like an app?</h2><p>Install Brambleheart on this phone, tablet, or computer for a home-screen or desktop icon and a standalone app window.</p><p v-if="installHelp" class="install-help-copy">Your browser has not exposed the direct install prompt yet. Open the browser menu and choose <strong>Install app</strong> or <strong>Add to Home Screen</strong>.</p></div>
        <div class="welcome-install-actions"><button type="button" class="primary-button" @click="installNow">{{ canInstall?'Install Brambleheart':'Install options' }}</button><button type="button" class="secondary-button" @click="dismissInstall">Not now</button><button type="button" class="secondary-button welcome-install-never" @click="dismissInstallPermanently">Do not show again</button></div>
      </section>
    </div>
  </main>
</template>
