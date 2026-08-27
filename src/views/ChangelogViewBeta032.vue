<script setup lang="ts">
import ChangelogView from './ChangelogView.vue'
</script>

<template>
  <ChangelogView />
  <Teleport defer to=".changelog-page .changelog-stack">
    <details class="changelog-entry card-surface beta032-changelog-entry" open>
      <summary>
        <span>
          <strong>Beta Build 0.33</strong>
          <small>Share Codes, Measurements, derived-stat rules, Character Creation refinement, and Rules layout testing</small>
        </span>
        <span class="value-chip">CURRENT</span>
      </summary>
      <div class="changelog-entry-body">
        <ul>
          <li>Replaces active QR character transfer with Share Codes, consolidates Import/Export controls, adds Character filtering, and rebuilds the Share Code dialog in the supplied Old.dex style.</li>
          <li>Adds persistent Measurements display choices for Squares, Yards, Meters, and Feet using one square-based conversion authority.</li>
          <li>Adds Heart and Inspiration to Bravery, renames Might Power to Fury, adds Lore Power, and rebuilds Mana Pool/round restoration around Inspiration and Heart.</li>
          <li>Adds a versioned Game Updates page linked beneath the Brambleheart logo and from Settings, while keeping it out of the primary navigation.</li>
          <li>Reduces Equipment & Gear purchase costs by 50%, preserves Threadpiece conversion, and makes Spirit Flare require Threadseer.</li>
          <li>Refines Character Creation Attribute labels, Bonus Language layout, Review identity labels, Review Spell cards, and vertical Talent presentation.</li>
          <li>Expands the Fundamentals Rule Layout Preview with formula/Condition/Fortune graphics, Half-Step example, separated target rules, an Attributes & Skills page, and bottom page navigation.</li>
          <li>Renames Keyword Abilities to Core Abilities, moves seven former Core Abilities into Talents, and applies Swiftstride / Range Strike.</li>
          <li>Updates physical and magical damage secondary-stat wording: Melee Strike uses Fury and Arcane Command includes Power.</li>
          <li>Reduces the footer Brambleheart image to 65px and keeps the revised Settings detail text.</li>
          <li>Advances Beta/package/PWA markers to 0.33/0.33.0/v0.33 with Node exactly 22.x.</li>
        </ul>
      </div>
    </details>
  </Teleport>
</template>
