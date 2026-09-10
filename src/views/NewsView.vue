<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import { GAME_RULES_VERSION, gameUpdates } from '../data/gameUpdates'
import changelogRaw from '../../CHANGELOG.md?raw'
import discordCommunityGraphic from '../assets/news/discord-community.png'
import shareBrambleheartGraphic from '../assets/news/share-brambleheart.png'
import { externalLinks } from '../data/links'
import { loadDiscordCommunityCounts } from '../services/discordCommunity'
import { shareBrambleheart } from '../services/siteShare'

type SiteRelease={label:string;items:string[]}
function latestRelease(markdown:string):SiteRelease{let label='Current Build';const items:string[]=[];let found=false;for(const rawLine of markdown.split(/\r?\n/)){const line=rawLine.trim();const heading=line.match(/^#{1,2}\s+(?:Brambleheart\s+)?((?:Beta|Alpha)\s+[0-9.]+)/i);if(heading){if(found)break;label=heading[1];found=true;continue}if(found&&line.startsWith('- '))items.push(line.slice(2).trim())}return{label,items}}
const siteRelease=latestRelease(changelogRaw)
const currentRules=gameUpdates.find(update=>update.version===GAME_RULES_VERSION)||gameUpdates[0]
const discordMemberCount=ref<number|null>(null)
const discordOnlineCount=ref<number|null>(null)
const discordCountLoaded=ref(false)
const discordCountLabel=computed(()=>{
  if(!discordCountLoaded.value)return'Loading member count…'
  const members=discordMemberCount.value
  const online=discordOnlineCount.value
  if(members!==null&&online!==null)return`${members.toLocaleString()} members · ${online.toLocaleString()} online`
  if(members!==null)return`${members.toLocaleString()} members`
  if(online!==null)return`${online.toLocaleString()} online`
  return'Member count unavailable'
})

onMounted(async()=>{
  const counts=await loadDiscordCommunityCounts()
  discordMemberCount.value=counts.members
  discordOnlineCount.value=counts.online
  discordCountLoaded.value=true
})

async function shareNewsSite(){const result=await shareBrambleheart();if(!result.ok&&result.message!=='Share cancelled.')alert(result.message)}
</script>

<template>
  <main class="page news-page"><AppHeader compact /><div class="page-title-block"><h1>News</h1></div>
    <section class="news-promo-grid" aria-label="Brambleheart community and sharing">
      <a class="news-promo-card card-surface" :href="externalLinks.discord" target="_blank" rel="noopener noreferrer">
        <strong>Discord</strong>
        <span class="news-promo-visual"><img :src="discordCommunityGraphic" alt="" aria-hidden="true" /><small class="news-promo-count">{{ discordCountLabel }}</small></span>
        <small>Community discussion, play, feedback, and development updates.</small>
      </a>
      <button type="button" class="news-promo-card card-surface" @click="shareNewsSite">
        <strong>Share</strong>
        <span class="news-promo-visual"><img :src="shareBrambleheartGraphic" alt="" aria-hidden="true" /></span>
        <small>Send Brambleheart to another player or copy the site link.</small>
      </button>
      <a class="news-promo-card card-surface" :href="externalLinks.creator" target="_blank" rel="noopener noreferrer">
        <strong>Creator Link</strong>
        <span class="news-promo-visual"><img src="/assets/Icon.png" alt="" aria-hidden="true" /></span>
        <small>Find AndreavnnTheOmniKing and related creator links.</small>
      </a>
    </section>
    <section class="news-grid"><article v-if="currentRules" class="news-card card-surface"><header><div><span class="eyebrow">CURRENT GAME UPDATE</span><h2>Game Update {{ currentRules.version }} · {{ currentRules.title }}</h2></div><RouterLink class="secondary-button news-action" to="/game-updates">Game Updates</RouterLink></header><p>{{ currentRules.summary }}</p><ul><li v-for="item in currentRules.changes.slice(0,4)" :key="item">{{ item }}</li></ul></article><article class="news-card card-surface"><header><div><span class="eyebrow">LATEST SITE UPDATE</span><h2>{{ siteRelease.label }}</h2></div><RouterLink class="secondary-button news-action" to="/changelog">Site Changelog</RouterLink></header><ul><li v-for="item in siteRelease.items.slice(0,6)" :key="item">{{ item }}</li></ul></article></section>
  </main>
</template>

<style scoped>
.news-grid{display:grid;gap:12px}.news-card{padding:0;overflow:hidden}.news-card>header{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:13px 15px;border-bottom:1px solid var(--line);background:var(--paper-2)}.news-card h2{margin:2px 0 0}.news-card>p{margin:14px 16px 6px;color:var(--ink-soft);line-height:1.55}.news-card ul{margin:10px 16px 16px;padding-left:20px}.news-card li{margin:7px 0;line-height:1.5}.news-action{flex:0 0 auto;text-decoration:none}@media(max-width:620px){.news-card>header{flex-direction:column}.news-action{width:100%}}
.news-promo-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin:10px 0 14px}.news-promo-card{display:grid;grid-template-rows:auto minmax(112px,1fr) auto;align-items:start;gap:8px;width:100%;min-width:0;min-height:210px;padding:12px 14px;border:1px solid var(--line-dark);background:var(--paper);color:var(--ink);text-align:center;text-decoration:none;cursor:pointer}.news-promo-card>strong{display:block;font-family:Georgia,'Times New Roman',serif;font-size:calc(20px + var(--font-offset));line-height:1.1}.news-promo-visual{display:flex;flex-direction:column;align-items:center;justify-content:center;min-width:0;min-height:112px}.news-promo-visual img{display:block;width:100%;height:108px;object-fit:contain}.news-promo-card>small{color:var(--ink-soft);line-height:1.35}.news-promo-count{display:block;min-height:1.35em;margin-top:2px;color:var(--ink-soft);font-weight:800;line-height:1.2}.news-promo-card:hover,.news-promo-card:focus-visible{border-color:var(--ui-active);background:var(--paper-2)}@media(max-width:720px){.news-promo-grid{grid-template-columns:1fr}.news-promo-card{min-height:180px}.news-promo-visual{min-height:96px}.news-promo-visual img{height:88px}}
</style>
