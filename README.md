# Brambleheart TTRPG — Beta 0.22

Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.22 is a presentation and theme-consistency release built from the working Beta 0.21 source. It replaces Brambleheart's previous role themes with the supplied Old.dex palettes, keeps rules/detail-card color identity independent from the site theme, normalizes background viewing, and corrects several Settings, Rules, header, and Character List presentation issues.

## Main views

- Welcome / Splash
- Character List
- Guided Character Creation
- Character Level Up
- Rules / Rule Reader
- Rhythm Engine — Character Sheet and Dice Roller
- Settings
- Site Changelog

## Beta 0.22 focus

- Uses Old.dex Default, Powers of Chaos, Forces of Fantasy, Ravening Hordes, and Legions of Undead palette values for Brambleheart's five supported themes.
- Keeps Spells, Traits, Talents, Sparks, Homelands, Oaths, Faiths, and Equipment/Gear visually color-coded independently of the site theme.
- Doubles the desktop header logo and keeps it centered on a wider header canvas.
- Normalizes background positioning, corrects View Background grayscale behavior in dark mode, and adds background cycling.
- Aligns Donation with normal Settings rows, restores theme-aware separators, enlarges Settings category labels, and centers shared button text.
- Indents Rules child pages, equalizes Recent Rules cards, and removes the duplicate native Character import control.
- Preserves the explicit Incomplete / Unapproved / Approved character status model and Approved-only Level Up behavior.

## Runtime

- Node.js 22 or newer
- Vue 3 / TypeScript / Vite
