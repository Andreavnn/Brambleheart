# Brambleheart Beta 0.23 — Unified Rules Presentation Architecture

**Site Update — Beta 0.23**

- Replaces the split Rules presentation system with a shared `RulePageLayout` used by both `FundamentalsRuleView.vue` and `RuleReaderView.vue`. Breadcrumbs, rule-section eyebrow, page title/detail text, content shell, and previous/next navigation now have one page-level authority.
- Moves the Fundamentals section visual language into the shared `rule-page-*` styles used across Rules. The obsolete parallel Fundamentals shell/hero/body/section classes and stale Rule Reader container classes were removed instead of overridden.
- Adds `CoreActionCard.vue` as the single renderer for canonical Core Action data. Fundamentals, Combat Abilities & Targeting, Attacking & Defending, and Renew the Heart references now render from the same `coreActions` structures rather than duplicating card markup.
- Adds `RuleFeatureCard.vue` as the shared renderer for the existing `rule-feature-box` presentation. Character Creation examples, Spark/Deed examples, common Homeland/Oath/Faith entries, and comparable rule examples use this shared card instead of independent box markup.
- Removes superseded rule-box CSS overrides and duplicate selectors discovered during the refactor. Species pages retain their intentional lore/art/quote composition and collapsible Traits but now live inside the same shared Rules page shell.
- Game Update remains v0.11; this patch changes presentation architecture rather than game rules.

**Patch-note verification**

- Previous Site Update reviewed: Beta 0.22
- New Site Update: Beta 0.23
- Game Update: v0.11 (unchanged)
- Current GitHub baseline reviewed: Yes — `f99a93d43696cce645ad94a0c33b8b0285f4f81e`
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: strict TypeScript checking of the five changed/new Vue script graphs using local module shims; PostCSS parsing of changed global/scoped CSS; Vue template structural tag-balance checks; 215 repository-relative import checks with zero missing targets; Rules-route renderer audit confirming Fundamentals and generic Rules routes both use the shared page layout; stale Rules/Fundamentals class/reference scans; shared-card ownership scans confirming `RuleFeatureCard` is the only `rule-feature-box` markup owner and `CoreActionCard` is the only Core Action card markup owner; `git diff --check`; patch ZIP integrity check.
- Not run: full `vue-tsc && vite build` or browser-based desktop/tablet/mobile runtime verification. Repository dependencies are not installed in this environment; a dependency installation attempt during this Rules refactor timed out before `node_modules` was available.
- Known unfinished work intentionally excluded: the existing SUMMON and Species Lore placeholders and Encounter Builder placeholder remain unchanged.
