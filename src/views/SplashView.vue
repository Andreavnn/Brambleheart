<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { dismissWelcomeInstallPromptPermanently, hasDismissedWelcomeInstallPrompt, markWelcomeSeen } from '../services/welcome'
import { canInstall, isInstalled, requestInstall } from '../state/install'

const router=useRouter()
const installModalOpen=ref(!hasDismissedWelcomeInstallPrompt())
const installHelp=ref(false)
async function installNow(){if(!canInstall.value)installHelp.value=true;await requestInstall();if(canInstall.value)installModalOpen.value=false}
function dismissInstall(){installModalOpen.value=false}
function dismissInstallPermanently(){dismissWelcomeInstallPromptPermanently();installModalOpen.value=false}
function continueToBrambleheart(){markWelcomeSeen();void router.replace('/rules')}
</script>

<template>
  <main class="welcome-page bramble-welcome-page">
    <section class="welcome-panel card-surface">
      <header class="welcome-brand-block bramble-welcome-brand">
        <img src="/assets/Logo.png" alt="Brambleheart — Small Heroes, Big Adventures" class="welcome-logo" />
      </header>

      <section class="welcome-story-block">
        <h2>Welcome to Brambleheart</h2>
        <p>Brambleheart is a story-driven tabletop role-playing game of courage, kinship, and discovery, set in the myth-wild world of Anthro Mundas — a land where storms sing names, ancient oaths still echo, and the Beastfolk of fur, feather, and scale walk beneath the gaze of old gods and older memories.</p>
      </section>

      <section class="welcome-intro-grid">
        <article><h2>Character Creation</h2><p>Shape a Beastfolk hero from the first story details onward: choose Species and Culture, define the Spark that drives them, remember the Homeland that taught them, then build Attributes, Skills, Talents or Magic, gear, and the promises they carry into the world.</p></article>
        <article><h2>Rhythm Engine</h2><p>The Rhythm Engine is the pulse beneath Brambleheart. It turns Attributes, Skills, Conditions, Edged or Weighted rolls, and opposed Targets into a consistent language for uncertain moments — from quiet discoveries to desperate choices.</p></article>
        <article><h2>Tabletop Tools</h2><p>Keep the practical parts of play close at hand: make Attribute Checks, manage Combat Encounters, track rounds and Fate Marks, resolve opposed rolls and damage, and keep recent results available while the story moves forward.</p></article>
      </section>

      <section class="welcome-support-block">
        <div><p class="eyebrow">COMMUNITY &amp; SUPPORT</p><h2>Stay Connected</h2><p>Join the community or support continued development of the Brambleheart companion.</p></div>
        <div class="welcome-support-actions" aria-label="Brambleheart community and donation options">
          <a class="secondary-button welcome-support-button" href="https://discord.gg/NHf3YdueHE" target="_blank" rel="noopener noreferrer">Join Discord</a>
          <a class="secondary-button welcome-support-button donation-offset" href="https://donate.stripe.com/eVq28r5fM5PI1bKdzz3Nm04" target="_blank" rel="noopener noreferrer">Donation</a>
          <a class="secondary-button welcome-support-button donation-offset" href="https://donate.stripe.com/cNifZh4bIce6bQo5333Nm05" target="_blank" rel="noopener noreferrer">Recurring Support</a>
        </div>
      </section>

      <button type="button" class="primary-button welcome-enter-button" @click="continueToBrambleheart">Enter Brambleheart</button>
    </section>

    <div v-if="installModalOpen&&!isInstalled" class="welcome-install-backdrop" role="presentation">
      <section class="welcome-install-dialog card-surface" role="dialog" aria-modal="true" aria-labelledby="welcome-install-title">
        <img src="/icons/favicon-64.png" alt="" aria-hidden="true" class="welcome-install-icon" />
        <div><p class="eyebrow">INSTALL BRAMBLEHEART</p><h2 id="welcome-install-title">Use Brambleheart like an app?</h2><p>Install Brambleheart on this phone, tablet, or computer for a home-screen or desktop icon and a standalone app window.</p><p v-if="installHelp" class="install-help-copy">Your browser has not exposed the direct install prompt yet. Open the browser menu and choose <strong>Install app</strong> or <strong>Add to Home Screen</strong>.</p></div>
        <div class="welcome-install-actions"><button type="button" class="primary-button" @click="installNow">{{ canInstall?'Install Brambleheart':'Install Options' }}</button><button type="button" class="secondary-button" @click="dismissInstall">Not Now</button><button type="button" class="secondary-button welcome-install-never" @click="dismissInstallPermanently">Do Not Show Again</button></div>
      </section>
    </div>
  </main>
</template>
