<script setup lang="ts">
import ChangelogView from './ChangelogView.vue'
</script>

<template>
  <ChangelogView />
  <Teleport defer to=".changelog-page .changelog-stack">
    <details class="changelog-entry card-surface beta032-changelog-entry" open>
      <summary>
        <span>
          <strong>Beta Build 0.32</strong>
          <small>Share Codes, Rules layout-test refinement, Core Ability cleanup, transfer text, and footer scale correction</small>
        </span>
        <span class="value-chip">CURRENT</span>
      </summary>
      <div class="changelog-entry-body">
        <ul>
          <li>Removes active QR generation, camera/image QR import, and QR decoding; character transfer now uses compressed Share Codes.</li>
          <li>Removes qrcode, jsqr, and QR type dependencies while keeping the QR-shaped character-entry icon as the Share Code action.</li>
          <li>Adds Import Share Code and sends a normal Brambleheart Character List URL alongside the code when using the device share sheet.</li>
          <li>Keeps legacy long #bhc= links readable but immediately removes their payload fragment from the visible URL after capture.</li>
          <li>Reduces the bottom-of-page Brambleheart image from the Beta 0.31 maximum of 260px to 65px.</li>
          <li>Shortens the Settings detail text to the requested site-control summary.</li>
          <li>Moves Rule Page Layout Test out of The Watcher children and into its own parent directly below The Watcher.</li>
          <li>Reworks the isolated Fundamentals layout test with the supplied dice artwork, a compact title block, no Overview panel, Contents at the bottom, colored section headers, and colored tables/charts.</li>
          <li>Renames Keyword Abilities to Core Abilities and moves Spirit Flare, Echo Strike, Steadfast, Sentinel’s Call, Wander Step, Verdant Surge, and Rooted Resolve into Talents with their requested categories.</li>
          <li>Renames Swift Rush to Swiftstride and Sure Shot to Range Strike across the loaded rules sources and Core Ability cards.</li>
          <li>Synchronizes Beta 0.32 release markers while preserving the Node runtime pin at 22.x.</li>
        </ul>
      </div>
    </details>
  </Teleport>
</template>
