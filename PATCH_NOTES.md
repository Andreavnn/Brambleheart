# Brambleheart Beta 0.20 — Rules Consolidation & Complete Magic Rebalance

**Site Update — Beta 0.20**

- Rules → References labels Anthro Mundas as `Lore - Anthro Mundas`. General rule pages use a more consistent Fundamentals-style section treatment, dedicated Fundamentals headers display their catalog detail text, Watcher/Selu callouts use normal body typography with only their labels emphasized, and rule-content navigation links are no longer unnecessarily bold where they function as links rather than headings.
- The Battles is consolidated into `Encounter & Rounds`, `Combat Abilities & Targeting`, `Attacking & Defending`, `To Damage`, and `Health`. Winds of Magic uses `Magical Levels` and `Spell Types & Targeting`. Existing old rule URLs resolve through explicit aliases rather than duplicate page implementations.
- To Damage uses visual Damage Category/Guts comparisons and an integrated Damage − Guts example. The Spell Heart rule is presented once in a dedicated callout and now distinguishes primary Spell damage from On-Going, recurring, delayed, terrain, movement-triggered, reflected, and summon damage.
- Playable Species pages use a stable lore/art/quote layout with quote-area pill UI removed, and internal rule links target the canonical combined-page routes.

**Game Update — v0.10**

- Completes the post-TO HIT spell balance pass across Invocation, Flames, Wilds, Oaths, Frost, Hallows, Harmony, and Life. The current built-in roster contains 76 Spells: 13 Invocations and 9 Spells in each current Lore.
- Retires `Flaming Shroud`, `Nature’s Fury`, `Entangling Roots`, `Earth Grasp`, `Frozen Blood`, `Deathly Shadow`, `Orb Of Impurity`, `Ode To The Lores`, and `Chant Of Sanctuary` from the current roster. `Smolder` is replaced by the Flames Signature Spell `Immolation`; the former ordinary `Immolation` is retired.
- Adds one canonical base-Mana table for the current built-in spell roster before Lore Attunement and equipment modifiers. Signature Spells and Invocation Cantrips remain zero-cost exceptions and ordinary Spells retain the normal minimum final Mana cost after modifiers.
- Adds Heart once to a Spell’s primary damage value unless a more specific rule states otherwise. On-Going, recurring, delayed, terrain, movement-triggered, reflected, and summoned damage uses exactly its printed value and does not add Heart or another normal Attribute-derived damage addition unless explicitly stated.
- Applies the approved individual damage, range, save, duration, stacking, summon, and source-text corrections, including explicit separation of initial Magic Strike resolution from later Renew the Heart riders on hybrid Spells.
- Normalizes legacy saved Lore selections at the character-storage boundary so retired Spells, the legacy `Smolder` Signature selection, and current Signature Spells do not persist as ordinary learned Lore Spells.
- Site Update / BUILD / character export, package, and PWA cache metadata remain Beta 0.20; Game Update metadata advances to v0.10.

**Patch-note verification**

- Previous Site Update reviewed: Beta 0.19
- New Site Update: Beta 0.20
- Previous Game Update reviewed: v0.09
- New Game Update: v0.10
- Current GitHub baseline reviewed: Yes — `9a4e3a401f0d668c6c57568436d5d9fa1c4f4103`
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: TypeScript compilation of the changed current-rules/magic/data/storage graph; complete 76-Spell roster/cost/TO HIT/Heart/On-Going and spell-specific regression audit; 76-entry `spellDetails` authority audit; retired/legacy spell reference scan; representative legacy Spell selection load → normalize/write → reload verification; changed Vue script syntax checks; changed Vue template/style structural checks; repository-relative import scan; release/version synchronization audit.
- Not run: Full Vue/Vite production build and browser-based desktop/tablet/mobile runtime verification. Dependency installation was attempted for the production build and timed out before `node_modules` was installed.
- Known unfinished work intentionally excluded: `Spectral Hand` retains its existing `[24]`-square manipulation range because no final replacement range was approved; Encounter Builder remains the existing placeholder.
