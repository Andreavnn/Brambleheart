# Brambleheart Beta 0.22 — Spell Targeting & Character Creation Clarity

**Site Update — Beta 0.22**

- Winds of Magic → Spell Types & Targeting now keeps the shared `Targeting` reference inside the `SPELL RANGE` section. Spell Range uses the approved target/range/area wording, and this page no longer repeats `TOUCH` or `DIRECT` terminology.
- `ENHANCES & HEXES` now includes the canonical `RENEW THE HEART` Core Action as a rules card. A visible `SUMMON` placeholder section is reserved immediately after Enhances & Hexes for later expanded Summon rules.
- Automatically resolving Spells no longer receive or retain the redundant `TO HIT: Automatic. No roll required.` field. Magic Strike, Renew the Heart, and hybrid resolution text remains authoritative where a roll is actually required.
- Character Creation → Step-by-Step has been rewritten in a friendlier player-facing voice while preserving the existing rules, interactive Attribute example, Path choices, and starting-equipment economy.
- Step-by-Step example cards were simplified: Heritage/Cultural Trait cards no longer repeat those labels in the card body; Spark and Deed use matching card treatment without “example” labels; Homeland is compact and centered; and Faith/Oath use the same cleaner presentation.
- Character Details now presents its final record/review items as a short bullet list, including the optional Pack/Herd/Kinship entry.
- Site Update / BUILD / character export, package, README, changelog, patch-note, and PWA cache metadata advance to Beta 0.22.

**Game Update — v0.11**

- Spell Range now explicitly distinguishes a Spell’s legal target, casting range, and affected area.
- Automatically resolving Spells no longer display a redundant TO HIT field. Spells that require Magic Strike or Renew the Heart continue to show those resolution rules.
- Spell Types & Targeting now presents the canonical Renew the Heart Core Action alongside Enhance/Hex guidance and reserves a Summon section for the expanded Summon rules.
- Character Creation rules text is clarified for readability without changing the established Character Creation choices or numerical values.

**Patch-note verification**

- Previous Site Update reviewed: Beta 0.21
- New Site Update: Beta 0.22
- Previous Game Update reviewed: v0.10
- New Game Update: v0.11
- Current GitHub baseline reviewed: Yes — `995cabe1f27bcab38fdac78c612ff3d3b4acf205`
- Source/diff reviewed: Yes
- Changelog synchronized: Yes
- Version metadata synchronized: Yes
- Tests actually run: strict TypeScript compilation of the changed current-rules/rule-catalog/Game Update data graph; compiled runtime audit of all 76 current Spells confirming no `TO HIT: Automatic. No roll required.` or blank TO HIT fields; exact Spell Range copy check; Spell Types & Targeting `TOUCH`/`DIRECT` exclusion check; Summon/current Game Update/Character Details structure checks; RuleReader script TypeScript check with local Vue/module shims; RuleReader template tag-balance and scoped-CSS brace-balance checks; 204 repository-relative import checks; release/version synchronization audit; `git diff --check`.
- Not run: Full `vue-tsc && vite build` and browser-based desktop/tablet/mobile runtime verification; this environment does not have the repository dependencies installed.
- Known unfinished work intentionally excluded: The new `SUMMON` section is intentionally a placeholder for later expanded Summon rules; Species Lore panels and Encounter Builder remain their existing placeholders.
