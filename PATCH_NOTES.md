**Beta 0.45 — Core Actions & Bounded Ability Chains**

- Renamed the shared Core Ability concept to **Core Action**. Core Actions are now the explicit starting points for Ability Chains, while Ability remains the term for Traits, Talents, Spells, equipment effects, and other rules that modify or trigger from them.
- Added **Reaction** as a shared Core Action. Each character may use one Reaction Core Action per round to resolve one eligible Reactive Ability whose printed Trigger has been met, unless a more specific rule grants another use.
- Added the global Ability Chain limit: a specific character’s copy of an Ability can resolve only once during the same Ability Chain. Another character’s copy of the same named Ability is a separate instance and may resolve once. The chain ends when no unresolved Ability instance has a legal Trigger.
- Reworked Rhythm Engine → Ability Manager around the Core Action/Ability Chain model. Chains begin at Core Actions, Reactive branches pass through Reaction, and chain state prevents the same Ability instance from recursively resolving again in that chain.
- Revised **Ragebound** to trigger from Focused Will. Its bonuses are now condition [+1] to Strike rolls and [+1] to damage, while Defenseless reduces Ward and Guts by [-1] each until the end of the round. ROOT remains on the Ability.
- Revised **Snapstep** to trigger from Focused Will or Channel the Winds and reduced its movement to [2] squares. ROOT remains on the Ability.
- Preserved **Drums of War** and **Divine Grasp** as intentional rule-breaking effects that grant or compel Core Action use; their current mechanics remain intact while their Core Action terminology is normalized.
- Existing ROOT keywords remain on current Abilities and retain their current round-level family restrictions. ROOT is no longer used as the mechanism that prevents Ability Chain recursion.
- Updated Fundamentals, Rules presentation, in-app Rule Updates, and supporting rule metadata for Core Actions and Ability Chains.
- Updated BUILD/export to 0.45, package version to 0.45.0, PWA cache to v0.45, and Rule Updates to v0.08.

**Patch-note verification**

- Previous version reviewed: 0.44.11 runtime / 0.44.0 package metadata on current main
- New version: 0.45
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: TypeScript semantic checks for all changed `.ts` authorities; TypeScript syntax checks for the modified Vue scripts; 18 targeted Core Action/Ability Chain runtime assertions; synthetic A ↔ B proc-cycle termination test; repository-relative import scan. `npm install` was attempted but timed out, so the full Vue/Vite production build and responsive browser runtime tests were not run.
- Known unfinished work intentionally excluded: No existing Ability had ROOT removed. Other ROOT Abilities were not individually rebalanced; only Ragebound and Snapstep received the approved mechanical revisions. Drums of War and Divine Grasp intentionally retain their rule-breaking Core Action effects.
