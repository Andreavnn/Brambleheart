<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useFocusTrap } from '../composables/useFocusTrap'
import { useRoute, useRouter } from 'vue-router'
import { dismissWelcomeInstallPromptPermanently, hasDismissedWelcomeInstallPrompt, markWelcomeSeen } from '../services/welcome'
import { canInstall, isInstalled, requestInstall } from '../state/install'
import { BUILD } from '../data/bramble'
import { useSettings } from '../state/settings'

const route=useRoute();const router=useRouter();const installModalOpen=ref(!hasDismissedWelcomeInstallPrompt());const installHelp=ref(false)
const { bootAudio }=useSettings()
function installedMode(){return typeof window!=='undefined'&&(window.matchMedia?.('(display-mode: standalone)').matches||Boolean((navigator as Navigator&{standalone?:boolean}).standalone))}
function playLaunchAudio(){if(!bootAudio.value||!installedMode())return;const audio=new Audio('/audio/brambleheart-launch.wav');audio.volume=.55;void audio.play().catch(()=>{const retry=()=>{void audio.play().catch(()=>undefined);window.removeEventListener('pointerdown',retry)};window.addEventListener('pointerdown',retry,{once:true})})}
onMounted(playLaunchAudio)
const installDialog=ref<HTMLElement|null>(null)
useFocusTrap(installModalOpen,installDialog,()=>{installModalOpen.value=false})
const continuePath=computed(()=>{const candidate=String(route.query.continue||'');return candidate.startsWith('/')&&!candidate.startsWith('/welcome')?candidate:'/characters'})
async function installNow(){if(!canInstall.value){installHelp.value=true;return}await requestInstall();if(isInstalled.value||!canInstall.value)installModalOpen.value=false}
function dismissInstall(){installModalOpen.value=false}
function dismissInstallPermanently(){dismissWelcomeInstallPromptPermanently();installModalOpen.value=false}
function continueToBrambleheart(){markWelcomeSeen();void router.replace(continuePath.value)}
</script>

<template>
  <main class="welcome-page bramble-welcome-page ready-adventure-splash">
    <section class="welcome-panel card-surface">
      <div class="wip-banner welcome-wip-banner">Brambleheart is a work in progress. Beta Build {{ BUILD }} may contain unfinished rules, presentation, and tools.</div>
      <header class="welcome-brand-block bramble-welcome-brand">
        <img src="/assets/Logo.png" alt="Brambleheart — Small Heroes, Big Adventures" class="welcome-logo" />
      </header>

      <section class="welcome-story-block">
        <h2>Welcome to Brambleheart</h2>
        <p>Brambleheart is a story-driven tabletop role-playing game of courage, kinship, and discovery, set in the myth-wild world of Anthro Mundas — a land where storms sing names, ancient oaths still echo, and the Beastfolk of fur, feather, and scale walk beneath the gaze of old gods and older memories.</p>
      </section>

      <section class="welcome-intro-grid">
        <article><h2>Character Creation</h2><p>Create a hero step by step through Species, Culture Traits, Spark, Homeland, Skills, Faith, Oath, Attributes, Talents or Magic, equipment, languages, and final character details.</p></article>
        <article><h2>Rules Reference</h2><p>Browse Brambleheart rules without leaving the companion. Related Fundamental rules link together, while References, Recent rules, FAQ, and Changes &amp; Updates keep common information close at hand.</p></article>
        <article><h2>Tabletop Tools</h2><p>Use the Rhythm Engine to make and review rolls, then open a saved character as a digital character sheet while play continues.</p></article>
      </section>

      <section class="welcome-support-block">
        <div><p class="eyebrow">DONATION</p><h2>Support Brambleheart</h2><p>Voluntary support helps cover development, hosting, and the services used to keep Brambleheart available.</p></div>
        <div class="welcome-support-actions" aria-label="Brambleheart donation options">
          <a class="secondary-button welcome-support-button" href="https://donate.stripe.com/eVq28r5fM5PI1bKdzz3Nm04" target="_blank" rel="noopener noreferrer">Donation</a>
          <a class="secondary-button welcome-support-button" href="https://donate.stripe.com/cNifZh4bIce6bQo5333Nm05" target="_blank" rel="noopener noreferrer">Recurring Support</a>
        </div>
      </section>

      <button type="button" class="primary-button welcome-enter-button" @click="continueToBrambleheart">Enter Brambleheart</button>
    </section>

    <div v-if="installModalOpen&&!isInstalled" class="welcome-install-backdrop" role="presentation">
      <section ref="installDialog" class="welcome-install-dialog card-surface" role="dialog" aria-modal="true" aria-labelledby="welcome-install-title">
        <img src="/icons/favicon-64.png" alt="" aria-hidden="true" class="welcome-install-icon" />
        <div><p class="eyebrow">INSTALL BRAMBLEHEART</p><h2 id="welcome-install-title">Use Brambleheart like an app?</h2><p>Install Brambleheart on this phone, tablet, or computer for a home-screen or desktop icon and a standalone app window.</p><p v-if="installHelp" class="install-help-copy">Your browser has not exposed the direct install prompt yet. Open the browser menu and choose <strong>Install app</strong> or <strong>Add to Home Screen</strong>.</p></div>
        <div class="welcome-install-actions"><button type="button" class="primary-button" @click="installNow">{{ canInstall?'Install Brambleheart':'Install Options' }}</button><button type="button" class="secondary-button" @click="dismissInstall">Not Now</button><button type="button" class="secondary-button welcome-install-never" @click="dismissInstallPermanently">Do Not Show Again</button></div>
      </section>
    </div>
  </main>
</template>
