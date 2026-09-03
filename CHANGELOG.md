# Brambleheart Beta 0.16

- Removes the decorative site icon from the bottom-of-page utility area and tightens page/footer spacing so the divider and utility controls follow page content more closely.
- Standardizes Ability presentation across current Rules, Character Creation, and Rhythm Engine surfaces: Core-family pills display `CORE ACTION`, and Traits, Talents, Spells, and comparable Ability cards receive a consistent `ABILITY` pill where applicable.
- Gives Heritage and Cultural Trait cards distinct accent identities and moves Cultural Traits away from the purple Magic/Spell color family.
- Normalizes page-header character anchoring so decorative header artwork stays tied to the logo/header stage regardless of whether a background image is selected.
- Changes Settings → Display → Backgrounds to the same switch-style exclusive-choice controls used elsewhere and makes Logo Size dynamically reduce or expand the header space with the selected logo size.
- Adds a Fundamentals-style Character Creation rules guide to Character Creation child pages, with a section header and responsive step graphic linking the full Character Creation rules path.
- Standardizes visible update terminology to Site Updates and Game Updates and synchronizes the application release to Beta 0.16 while Game Updates advances independently to v0.06.

# Brambleheart Beta 0.15

- Reorganizes Rules → Fundamentals → Core Actions so Actions, Abilities, examples, Reactions, chaining, and the Core Action reference are taught in clearly separated sections.
- Hides category landing pages from expandable Rules menus, groups current playable Species beneath Woodlands, removes repetitive Species-list subtitles, and restyles Species lore panels to match Character Creation while retaining the quote-and-art layout.

# Brambleheart Beta 0.14

- Updates character/equipment persistence and presentation for the current passive-equipped Trinket model, removing legacy numbered-slot and Arcane Focus fields at the saved-character normalization boundary rather than carrying obsolete fields through current application logic.
- Adds Settings → Display → Logo Size with five persisted choices while retaining the previous logo size as Largest/default.
- Replaces the Character Roster and Rules header artwork, aligns/flips the requested page-header characters, and removes page-title detail text from News, Character Roster, Rules, and Rhythm Engine.

# Brambleheart Beta 0.13

- Promotes the approved Fundamentals presentation into production Core Rules, Attributes & Skills, and the shared action/ability reference while retaining explicit aliases for legacy Rules URLs and removing the obsolete layout-test route.
- Reorganizes the shared Equipment & Gear shop into clearer categories with labeled weapon/protective profiles and shared purchasing behavior.
- Rebuilds Level Up presentation around grouped rewards, advancement, Magic progression, and equipment management while keeping shared economy and advancement authorities canonical.
- Fixes Settings background controls at their active implementation and removes superseded layout-test and transitional presentation code.

# Brambleheart Beta 0.12

- Adds News to primary navigation with separate Site Update and Game Update summaries plus community/share promotion cards.
- Moves Character Sheet and equipment-shopping presentation to shared normalized equipment/profile data so purchased and equipped gear display consistently across character workflows.
- Makes retained Adventure Kit contents visible on Character Sheets and unifies Character Creation and Level Up equipment purchasing around one shared shop component.
- Adds the Encounter Builder placeholder, cleans Talent category presentation, and refines the Rules teaching UI around the shared action-family presentation.
- Reorders Settings Display, Data & Content, and Changelog & Updates controls at their active view authority.

# Brambleheart Beta 0.11

- Persists Rhythm of Body & Spirit path selections and their Skill/Attribute choices across saved, imported, reviewed, and advanced characters.
- Standardizes Heritage and Cultural Trait card presentation, semantic action-family pills, and independent card sizing.
- Centralizes Character Sheet weapon-modifier presentation through the shared equipment-effect authority and hides parenthetical weapon identifiers on Character Sheets while retaining full catalog names elsewhere.
- Replaces lossy Threadpiece display with exact BP/SP/NP/WP remainder formatting.
- Aligns Character Creation Attribute colors, Talent-card action-family accents, and weapon-property pills with the Character Sheet and Rules presentation.

# Brambleheart Beta 0.10

- Separates application releases from Brambleheart Game Updates so site and game-rule histories advance independently.
- Centralizes derived-stat, Mana, and Threadpiece calculations so Character Creation, Character Roster, Rhythm Engine, and Level Up consume shared implementations; currency persistence uses one whole-wp authority.
- Renames Character List to Character Roster and expands approved-character Level Up with persistent post-creation currency, treasure, Magic Level, and equipment management.

# Brambleheart Beta 0.09

- Adds compressed Character Share Codes and consolidates character import/export through the shared imported-character normalizer.
- Adds persistent Squares, Yards, Meters, and Feet display options for square-based rule text through one shared measurement-conversion authority.
- Adds the versioned Game Updates page and links it beneath the Brambleheart logo and from Settings without adding it to primary navigation.
- Adds character filtering, lock/unlock controls, persistent creation-completion state, and accessible transfer/share controls.
- Adds the canonical Brambleheart site/share origin, footer share control, and Settings community/share access while preserving install support.

# Brambleheart Beta 0.08

- Adds Dropbox App Folder Cloud Sync using OAuth 2 PKCE with explicit user-controlled synchronization.
- Keeps local character storage authoritative during normal use and performs cloud access only through explicit Update from Cloud or Upload Local actions.
- Uses stable internal character IDs for replacement/addition, human-readable `_BH.json` filenames for portability, and guarded duplicate/invalid-data handling.
- Separates Settings → Data & Content into Character Data and Cloud Sync, with Cloud Link Code, Workspace Link, Update from Cloud, Upload Local, Disconnect, and Cloud Instructions controls.
- Keeps legacy cloud-connection cleanup isolated at the migration boundary rather than retaining parallel cloud implementations.

# Brambleheart Beta 0.07

- Consolidates Rules concepts into canonical pages with explicit aliases for superseded URLs, including combined damage/health references and the canonical Ability Targeting route.
- Reworks Character Creation Culture/Homeland Skill handling, path progression, language presentation, Attribute controls, and Review identity locking.
- Rebuilds Settings → Data & Content around backup/reset actions and removes obsolete nested data managers.
- Hardens equipment profile parsing, quantity-aware purchasing, attached-item presentation, and Armor/Shield data handling without maintaining duplicate profile implementations.
- Fixes spell-source boundary parsing and isolates Oath spell records so neighboring spell data cannot be merged by the reader/parser.

# Brambleheart Beta 0.06

- Consolidates Rules, Settings, storage, derived-stat, equipment-profile, and structured rule parsing around shared authoritative implementations instead of parallel helpers and patch-layer overrides.
- Replaces the earlier role palettes with the current Default, Warrior, Healer, Ranger, and Thief theme model while isolating legacy theme migration at Settings.
- Restores fixed content-category color identity for rules/detail cards so theme changes do not rewrite Species, Spell, Talent, Spark, Homeland, Oath, Faith, or equipment identity.
- Normalizes backgrounds, dark surfaces, separators, Rules child-row presentation, and Recent Rules cards while retaining one active responsive style authority.
- Removes obsolete Old.Dex/army-builder CSS, dead Rules metadata, stale storage-key handling, and other superseded implementation code discovered during the cleanup passes.

# Brambleheart Beta 0.05

- Adds modal focus trapping, Escape dismissal, trigger-focus restoration, and transactional persistence/error handling for Character Creation and Level Up workflows.
- Establishes the explicit Incomplete / Unapproved / Approved character-status model with migration for legacy characters and Approved-only Level Up access.
- Prevents creation-step jumps from bypassing required validation and unifies Talent prerequisite enforcement between Character Creation and Level Up.
- Adds optional installed-app launch audio, responsive Text Size fixes, Heritage Trait terminology, collapsible Character Sheet sections, and rule-banner navigation/discovery.
- Adds typed Custom Data import reporting and keeps storage failures visible rather than falsely reporting successful writes.

# Brambleheart Beta 0.04

- Rebuilds the Rhythm Engine around the saved Character Sheet instead of the earlier dedicated Combat Encounter implementation.
- Adds Approved characters and Beyond Character Creation Level Up with source-backed advancement-cost presentation.
- Adds typed downloadable JSON templates and import support for custom Species, Spells, Talents, and Traits with explicit Custom labeling and per-character custom-data permission.
- Rebuilds Background selection around automatic asset discovery and adds the supplied background artwork while retaining grayscale/display controls.
- Refines Character Creation, Character Review, spell/talent presentation, and responsive popup layouts around the shared character-sheet language.

# Brambleheart Beta 0.03

- Rebuilds the Rules landing/reader around full-width search, breadcrumbs, source-backed sections, previous/next navigation, Recent access, and dedicated Anthro Mundas section pages.
- Expands Character Creation with Campaign Name, refined identity/Skill/Lore/Language/equipment steps, readable purchase profiles, and a fuller final Review sheet.
- Adds Complete/Incomplete Character Roster presentation and saved-character support in the Rhythm Engine.
- Refines Attribute/Skill roll dependencies, targets, Fortune/Misfortune guidance, and dedicated encounter/character-sheet experimentation without retaining obsolete empty result states.
- Strengthens responsive navigation, controls, theme surfaces, and background presentation across desktop, tablet, and mobile layouts.

# Brambleheart Beta 0.02

- Expands guided Character Creation with Species lore and Traits, Culture Traits, Skills, Spark/Deed guidance, Homeland, Faith/Oath, Attributes, Body & Spirit, Lore Attunement, Spells, Talents, equipment, Languages, and final review.
- Adds source-backed Playable Species and Lore of Magic reader pages, Quick Reference, FAQ, Recent Rules, Changes & Updates, and linked Fundamentals navigation.
- Expands the Rhythm Engine with roll reason, Attribute/secondary-stat and optional Skill values, targets, Fortune/Misfortune results, and five-roll history.
- Adds connected Donation/Recurring Support links, fixed-cover backgrounds, install support, Custom Data, and the responsive Brambleheart identity presentation.
- Rebuilds from the stable early application baseline and fixes the creator crash and Species/Culture overflow discovered in the superseded intermediate implementation.

# Brambleheart Alpha 0.01

- Initial Vue 3 + TypeScript + Vite companion foundation with Character Roster, Rules, Rhythm Engine/Simulator, Settings, local persistence, and Brambleheart assets.
- Establishes the routed reader/welcome flow, shared panels and controls, text-size/bold preferences, install controls, grouped Rules references, Recent Rules, and the initial splash experience.
- Adds the first guided Character Creation flow, standalone Rules reader pages, fixed-cover backgrounds, Simulator history, and repository cleanup tooling.
