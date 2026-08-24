# Brambleheart TTRPG — Beta 0.21

Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.21 is a cumulative source-normalization and reliability release built from the actual GitHub Beta 0.19 application baseline. It rolls forward the intended Beta 0.20 cleanup, fixes the mobile Text Size layout defect at its source, and tightens routing, persistence, character-status, and repository integrity without adding another override layer.

## Main views

- Welcome / Splash
- Character List
- Guided Character Creation
- Character Level Up
- Rules / Rule Reader
- Rhythm Engine — Character Sheet and Dice Roller
- Settings
- Site Changelog

## Beta 0.21 focus

- Fixes the mobile Text Size control by removing the desktop flex basis that became vertical height in stacked Settings rows.
- Uses the cleaned Brambleheart-only stylesheet as the authoritative implementation instead of appending CSS patches over obsolete rules.
- Keeps obsolete Old.Dex/game/builder CSS, oversized Welcome tests, dead theme code, and stale background references removed.
- Keeps browser persistence centralized behind guarded storage helpers.
- Preserves explicit character approval status and Approved-only Level Up behavior across Character List and Rhythm Engine.
- Uses `ability-targeting` as the canonical Rules route while retaining the former URL as a compatibility alias.
- Removes the unused parallel `ruleChapters` metadata block so Rules organization has a single authoritative catalog.
- Removes unused encounter-era helpers and centralizes Level Up XP prices through the shared advancement-cost calculator.
- Centralizes shared rank/derived-stat/equipment parsing, storage keys, and external support links instead of maintaining parallel view-specific implementations.
- Synchronizes build/export/PWA/package release markers.
- Flags the invalid two-byte `Banner_AnthroMundas.png` for replacement from the genuine historical artwork stored in commit `0a5ddb56e9e3eaa5b4fe6301b150c59351ee547b` as `Banner_AthroMundas.png`; restore instructions are kept under `DO NOT UPLOAD`.

## Runtime

- Node.js 22 or newer
- Vue 3 / TypeScript / Vite
