# Brambleheart Beta 0.45

- Renames Rules → Fundamentals → Abilities to Core Actions and reorganizes the page so Core Actions, Abilities, Action/Ability examples, Reaction examples, chaining, and the Core Action reference are clearly separated.
- Makes Core Action reference-card accent bars use the same canonical action-family colors as the corresponding pill UI.
- Hides category landing/parent pages from all expandable Rules menus, matching the existing Fundamentals behavior.
- Groups the current playable Species under a Woodlands subcategory and removes the repetitive per-Species detail subtitles from the Species list.
- Restyles Species lore panels to mirror the Character Creation Step 1 presentation while retaining the existing quote-and-art side-by-side layout and the current Heritage/Cultural Trait sections.
- Removes the Beta-specific ROOT callout from the Abilities chaining presentation without changing the underlying ROOT rules.
- Renames the shared Core Ability concept to Core Action and adds Reaction as a shared once-per-round Core Action for resolving eligible Reactive Abilities.
- Establishes bounded Ability Chains: every chain begins with a Core Action, and a specific character’s copy of an Ability can resolve only once in that chain; another character’s copy is treated as a separate Ability instance.
- Rebuilds Rhythm Engine → Ability Manager around Core Action roots, Reaction gates, and per-instance chain state so recursive proc loops terminate without using ROOT as the recursion guard.
- Revises Ragebound to build from Focused Will with [+1] Strike, [+1] damage, and [-1] Ward / [-1] Guts through Defenseless; revises Snapstep to build from Focused Will or Channel the Winds and move [2] squares. ROOT remains on both Abilities.
- Keeps Drums of War and Divine Grasp as intentional rule-breaking effects that can grant or compel Core Action use, with terminology normalized to Core Action.
- Preserves existing ROOT keywords and their current round-level family restrictions while separating those restrictions from Ability Chain recursion control.
- Updates Fundamentals and Rules presentation to teach the Core Action / Ability distinction, Reaction timing, and the once-per-Ability-instance chain rule.
- Synchronizes BUILD/export 0.45, package 0.45.0, PWA cache v0.45, and Rule Updates v0.08.

# Brambleheart Beta 0.44

- Updates Axalori Heartcurrent, Stillwater Renewal, Harmonic Field, and Resonant Pulse to the supplied rules text; Resonant Pulse now costs 2 Mana, and Rule Updates advances to v0.07.
- Adds dedicated Fundamentals → Stacking and Chaining teaching, standardizes the Abilities flow-box sizing, and applies Core Ability family colors to Basic Core Ability accent bars and pills.
- Adds Settings → Display → Logo Size with five persisted sizes while preserving the previous logo size as Largest/default.
- Replaces and horizontally flips the Character Roster and Rules header characters, lowers shared header characters slightly, and removes page-title detail text from News, Character Roster, Rules, and Rhythm Engine.
- Removes numbered Trinket slots and Arcane Focus selection from active character/equipment logic; equipped Trinkets now apply passively, while legacy slot/focus fields are discarded at the saved-character normalization boundary.
- Synchronizes BUILD/export 0.44, package 0.44.0, PWA cache v0.44, README, patch notes, repository/in-app changelog, and Rule Updates v0.07.

# Brambleheart Beta 0.43

- Promotes the approved Fundamentals presentation into production Core Rules, Attributes & Skills, and Abilities pages, retaining explicit aliases for legacy Rules URLs and removing the obsolete layout-test route.
- Reorganizes the shared Equipment & Gear shop into clearer categories with labeled weapon/protective profiles, automatic two-position Trinket assignment, and Sharpening Stone under Consumables.
- Rebuilds Level Up presentation around grouped rewards, advancement, Magic progression, and equipment management while keeping shared economy and advancement authorities authoritative.
- Uses the supplied page-header character artwork across News, Character Roster, Rules, Rhythm Engine, and Settings and replaces temporary News SVG promotions with the supplied PNG artwork.
- Fixes the Settings Background radio presentation at the actual input and enlarges the existing footer Brambleheart icon at its transitional presentation authority.
- Removes superseded Settings/layout-test/News asset implementations and synchronizes BUILD/export 0.43, package 0.43.0, PWA cache v0.43, README, patch notes, and repository/in-app changelog while Rule Updates remains v0.06.

# Brambleheart Beta 0.42

- Added News community/share promotion cards and made the shared site logo return to News.
- Normalized weapon, armor, and shield profiles/prices; replaced Stealth armor fields with Armor Penalty affecting Speed and Whisperster.
- Removed Shield/Trinket slot sharing and standardized two independent Trinket positions with legacy migration at persistence load/write.
- Made retained Adventure Kit contents visible on Character Sheets and unified Character Creation / Level Up equipment shopping around one popup component.
- Repaired weapon Damage parsing, propagated equipped protective statistics, added Encounter Builder placeholder, and cleaned Talent category presentation.
- Canonicalized Augment to Enhance and rebuilt the Abilities layout preview around ordered flow, Reactive timing, and Basic Core Ability family borders.
- Reordered Settings Display, Data & Content, and Changelog & Updates controls at their active view authority.
- Synchronized package, BUILD, PWA cache markers, README, patch notes, and in-app changelog to Beta 0.42.

# Brambleheart Beta 0.41

- Adds a new `News` page to primary navigation before Character Roster, sourcing its site-release summary from `CHANGELOG.md` and its current rules summary from the shared Rule Updates data.
- Refines Rule Updates so only the current update opens by default and archived updates remain collapsed, while removing redundant page labeling.
- Enlarges and centers the footer Brambleheart icon, updates the work-in-progress banner copy, and removes underlining from the Rules Layout Test page navigation buttons.
- Changes Character Sheet Talents to a single-column layout and removes the generic `Mechanical effect listed below.` placeholder from equipment presentation.
- Groups Character Creation Species choices into Woodlands and Custom optgroups, moves Oath & Faith immediately after Homeland, removes `AGI MOD` from the creation Speed equation, and adds the Display → Tip preference for default help-panel expansion.
- Changes Journey Knot to condition `[+1]` on one TO HIT roll made with its attached weapon while equipped, removing its former once-per-round restriction.
- Adds Mana Syphon `[+1]` to Barkskin Vest and grants a finished new character 10 wp only when creation is completed with zero remaining currency.
- Prevents locked characters from entering Character Creation edit or Level Up workflows, in addition to disabling those roster actions.
- Reworks the Rules Layout Test Abilities teaching graphics: no Selu avatar/name markers, no connecting arrows, evenly sized panels, explicit start/end Instinct timing, any-order turn guidance, numbered Speed movement squares, and ability-family-colored Core reference cards.
- Replaces the Equipment & Gear category scrollbar with explicit left/right controls and changes the Character Roster Filter action to a compact filter icon.

# Brambleheart Beta 0.40

- Converts Journey Knot, Caster Totem, Lens-Stone Arcanum, Scriptweave Book, Quickdraw Quiver, Featherwind Bolt-Case, Wristloop, and Spell Charm to Trinkets, with legacy saved names normalized at load/import boundaries.
- Changes Journey Knot from +1 damage to condition [+1] on one TO HIT roll per round with its attached weapon.
- Reworks Scriptweave Book to Magic Regen [+1] and ordinary spell Mana cost [-1] while it is the equipped active arcane focus.
- Adds Shiny Bobble, Votive Icon, Spell Charm, and Heartward Token Trinket effects and applies equipped Trinket bonuses to Character Sheet and Rhythm Engine calculations.
- Changes the Character Sheet heading to Armor & Shield and displays the dedicated/overflow Trinket slots beneath protective equipment.
- Keeps Practiced Hand from selecting Skills already gained from Homeland or Culture Traits and aligns the Tempered Form path card with its neighboring path cards.
- Rebuilds the Rules Layout Test Abilities page around the encounter economy, distributed Selu examples without character artwork, and an expandable shared Core Ability reference.
- Standardizes displayed rule measurements to `[X] square(s)` spacing while preserving the existing Squares/Yards/Meters/Feet setting conversion.
- Advances BUILD/export to 0.40, package version to 0.40.0, PWA cache to v0.40, and Rule Updates to v0.05.

# Brambleheart Beta 0.39

- Brings Character Creation Attribute presentation in line with the Character Sheet by applying the same Agility, Might, Hide, Lore, and Bravery color identities to Rank, Modifier, and secondary-stat boxes.
- Tightens the creation Speed formula to `2 + AGI MOD = total`, reduces that formula one text step, and keeps it on one line.
- Refines Tempered Form presentation to `Attribute Point + 1 Talent`, shortens its supporting copy, and gives all four Rhythm of Body & Spirit path cards distinct top-border colors.
- Colors Talent card top borders from their semantic ability families across Character Creation, the Talent picker, Character Creation Review, Rules, and the Rhythm Engine Character Sheet. Reactive takes precedence visually when combined with another family.
- Restores pill UI presentation for weapon Properties / Notes on the Rhythm Engine Character Sheet using the same shared property-pill presentation already used by Character Creation Review.
- Expands the Rules Layout Test Abilities page with a responsive Selu encounter graphic showing Arcane Command casting Ballad of the Courageous and the Passive Magic Talent Hearth Touch triggering from that spell.
- Keeps Rule Updates at v0.04 because this release changes presentation and explanatory material without altering the underlying game rules.
- Advances BUILD/export to 0.39, package version to 0.39.0, and the PWA shell cache to v0.39.

# Brambleheart Beta 0.38

- Expands Rhythm of Body & Spirit to four starting paths: Wind-Touched (Magic Level 1 + 1 Talent), Gifted Heart (2 Talents), Practiced Hand (2 new Skills + 1 Talent), and Tempered Form (+1 Attribute Rank + 1 Talent, capped at Rank 3 during creation).
- Persists the two new path types and their Skill/Attribute selections so saved and imported characters retain the correct creation result.
- Standardizes Heritage and Cultural Trait cards so action/type pills sit in the footer while only applicable Mana cost remains in the upper-right.
- Makes Touch, Shoot, Magic, Instinct, Move, Reactive, and Passive pill colors semantic and independent of themes or dark mode.
- Makes neighboring Core Ability boxes size independently rather than stretching to the tallest card in the row.
- Hides parenthetical weapon identifiers on character-sheet weapon profiles while keeping full catalog names in purchase and equipment-management surfaces.
- Centralizes character-sheet weapon damage modifiers from external gear effects such as Journey Knot and Sharpening Stone without adding Attribute or secondary-stat damage.
- Replaces lossy Threadpiece display with exact normalized BP/SP/NP/WP remainder formatting across character and Level Up balances.
- Adds an Abilities page to the Rules Layout Test immediately after Attributes & Skills, using the shared Core Ability authority rather than a duplicate list.
- Adds restrained Attribute-family color to character-sheet left borders and keeps the same hierarchy for Mana resource boxes.

# Brambleheart Beta 0.37

- Rebuilds the encounter action economy around one CORE Instinct, one CORE Move, and one CORE Combat opportunity per round; ROOT now limits advanced Talent stacking by specific family rather than Core actions.
- Rebuilds the shared Core Abilities as Channel the Winds, Focused Will, Stride, Swiftstride, Hero’s Charge, Melee Strike, Range Strike, Arcane Command, and passive Renew the Heart.
- Reconstructs the Talent catalog around Core-ability modifiers and triggered effects, renames Fang Break to Cleave, treats Beastgrasp as the Primate Grip replacement, and rebuilds Cleave → Wildchain → Warpath as a fixed chain.
- Establishes Magic Level known-spell progression through 12 Lore Spells and 6 Invocations at Magic Level 10, plus the separate Signature Spell, with Level Up exposing any unclaimed legacy choices.
- Standardizes spell presentation around Signature, Cantrip, Enhance, Hex, TO HIT, Lore Attunement -2, and a minimum final ordinary spell cost of 1 Mana without performing the later spell-by-spell numerical rebalance.
- Standardizes Start of Round as CORE Instinct choices → Magic Regen modifiers → Mana restoration → turns in Initiative Order; Channel the Winds increases Magic Regen instead of generating Mana directly.
- Makes Arcane Focus effects non-stacking: one owned focus is active at a time, with Level Up controls to switch the active focus.
- Adds action-family UI colors: Touch red, Shoot teal, Magic purple, Instinct blue, Move green, Reactive orange, Passive gray; CORE/ROOT/COMBAT remain structural neutrals.
- Synchronizes BUILD/export 0.37, package 0.37.0, PWA cache v0.37, Rule Updates v0.03, README, patch notes, and repository/in-app changelog.

# Brambleheart Beta 0.36

- Rebuilds Threadpiece economy around one integer `wp` authority: 10 wp = 1 np, 5 np = 1 sp, and 5 sp = 1 bp; starting wealth remains 30 sp and the Adventure Kit creation sellback becomes 3 sp.
- Reprices Weapons, Armor & Shields, Adventuring Gear, Trade Goods, and Transportation from the Economy Rebuild specification; restores Field Blade (Long Sword) at 20 sp and positions veteran-tier equipment beyond the 33 sp maximum creation budget.
- Adds canonical 50% ordinary-gear resale, 75% trade-good resale, a 50% crafting-material value floor, and 3× canonical armor pricing for barding.
- Separates owned protective gear from equipped protective gear so only one Armor and one Shield contribute Guts, Mana Syphon, Armor Penalty, and Might requirements; equip state is persisted and Level Up can buy, equip, and sell gear.
- Corrects Magic Regen to equal Heart with no standard +2 modifier; Mana Pool remains Magic Level + Spirit, and Rule Updates advances independently to v0.02.
- Compacts Character Sheet Rank/Modifier boxes, changes Agility shorthand to AGI, and reduces secondary-stat detail to the numerical parent formula (for example `2 + 4 AGI MOD` and `3 MIG RNK`).
- Keeps Rhythm Engine Magic collapsed by default and preserves post-creation wallet, XP, treasure, Magic Level, and pin state when an approved character is reopened in Character Creation.
- Replaces the Half-Step layout-test diagram with a direct result-band flow: natural d10 1–5 → 1 and 6–10 → 2, with a matching square Threadseer example and no numerical division of the die result.
- Synchronizes BUILD/export 0.36, package 0.36.0, PWA cache v0.36, and Node 22.x.

# Brambleheart Beta 0.35

- Swaps the Bravery secondary-stat authority so Heart = Bravery Rank and Spirit = Bravery modifier; Mana Pool = Magic Level + Spirit and Magic Regen = Heart +2.
- Treats Magic Regen as the canonical start-of-round Mana-restoration value so effects that increase or decrease that restoration modify Magic Regen.
- Rebuilds the shared Character Sheet Attribute presentation as reusable Attribute cards with AGL/MIG/HID/LOR/BRY shorthand, parented secondary stats, and adjacent Mana Pool / Magic Regen cards; Character Creation Review and Rhythm Engine now use the same component.
- Highlights only the Agility modifier and its Speed contribution in red during Attribute distribution, while preserving the visible `2 + modifier = Speed` calculation.
- Repairs the expanded Character Roster Filter panel so Search, Status, and Clear stay contained below the action row at desktop, tablet, and mobile widths.
- Moves Reset Local Settings to the bottom of Settings → Display while retaining Measurements directly below Bold Text and the repaired switch-style radio controls.
- Adds spacing between Character Sheet section titles and the first content card for Skills, Magic, Talents, and Equipment & Gear.
- Corrects the Fundamentals Half-Step preview to use d10 result bands (1–5 → 1; 6–10 → 2), removes the strike-through from dropped Edged/Weighted dice, and updates the Threadseer example without mathematically dividing the die.
- Reworks the Attributes & Skills layout-test page with a concise secondary-stat explanation and Attribute→secondary-stat graphic, combines Skills with Skill Trees, moves Expanded & Restricted to the bottom, and renders skill trees in production-style cards.
- Synchronizes BUILD/export 0.35, package 0.35.0, PWA cache v0.35, and Node 22.x while keeping Rule Updates at v0.01.

# Brambleheart Beta 0.34

- Separates the application release (`Beta 0.34`) from Brambleheart Rule Updates and starts the rules-update stream at `v0.01`, linked beneath the site logo rather than added to primary navigation.
- Corrects the shared secondary-stat model to Aim/Accuracy/Speed, Brawl/Fury, Ward/Guts, Control/Power, and Spirit/Heart; Mana Pool now uses Magic Level + Heart and start-of-round restoration uses Spirit.
- Renames Character List to Character Roster, keeps Create/Import/Export at the left of the action bar, and moves Filter to the right.
- Expands approved-character Level Up with post-creation Threadpiece rewards, a persistent Treasure placeholder list, and Equipment & Gear purchasing using the existing catalog and wealth authority.
- Raises new-character starting currency to 30 sp and the Adventure Kit sale value to 2 sp; visible currency initials are lowercase and discounted fractional Threadpieces round down.
- Reorganizes Character Creation secondary stats with Rank-based values first, modifier-based values second, and Speed third under Agility with its 2 + modifier calculation.
- Rebuilds Rhythm Engine Character Sheet derived statistics beneath their parent Attributes and places Mana Pool and Speed below the Attribute groups with formula detail.
- Moves Measurements below Bold Text and Reset Local Settings below Measurements, and repairs Theme/Background/Measurement flip-switch presentation.
- Expands the isolated Fundamentals layout test with revised Conditions, centered Fortune/Misfortune cards, Edged/Weighted roll examples, Active/Passive target guidance, and Half-Step die/math presentation.
- Makes repository CHANGELOG.md the authority used by the in-app Site Changelog and synchronizes BUILD/export 0.34, package 0.34.0, PWA cache v0.34, and Node 22.x.

# Brambleheart Beta 0.33

- Replaces active QR character transfer with compressed Share Codes, consolidates import/export workflows, adds Character filtering, and rebuilds the Share Code popup around the supplied Old.dex presentation.
- Adds persistent measurement display choices for Squares, Yards, Meters, and Feet while keeping square-based rules canonical at 1 square = 1 yard = 1 meter = 3 feet.
- Adds Bravery secondary stats Heart and Inspiration; changes Mana Pool to Magic Level + Inspiration and start-of-round Mana restoration to Heart.
- Renames the former Might-based Power secondary stat to Fury and adds Lore-based Power for spell damage.
- Adds a versioned Game Updates page linked beneath the Brambleheart logo and from Settings → Changelog & Updates, without adding it to primary navigation.
- Reduces all Equipment & Gear purchase costs by 50%, applies Threadpiece conversion to displayed prices, and makes Spirit Flare require Threadseer.
- Refines Character Creation Attribute labels, Bonus Language presentation, Review identity spacing, Review Spell cards, and one-column Review Talents.
- Expands the Fundamentals Rule Layout Preview with Core Roll, Conditions, Fortune/Misfortune, Half-Step, target, and page-navigation examples while moving Attributes & Skills to its own preview page.
- Retains the Core Abilities/Talent move and Swiftstride / Range Strike renames, updates Melee Strike damage to Fury, and adds Lore Power to Arcane Command damage.
- Reduces the bottom page icon to 65px, keeps the revised Settings detail text, and synchronizes the cumulative Beta 0.33 documentation with package 0.33.0, PWA cache v0.33, and Node 22.x.

# Brambleheart Beta 0.31

- Hides destructive Reset Local Data actions inside an expandable MANAGE parent while retaining double confirmation.
- Moves Site Changelog to a dedicated Changelog & Updates Settings section and removes underlines from the Cloud Instructions and template download buttons.
- Presents Themes and Background selections as switch controls while keeping their canonical one-choice radio behavior.
- Adds an expandable isolated Rule Page Layout Test parent under The Watcher without changing production Rule Reader pages.
- Enlarges the bottom-of-page Brambleheart icon from 26px to a responsive maximum of 260px.
- Replaces the in-page QR camera stream with device-camera image capture and keeps QR decoding on the captured image.
- Replaces Character List Import, Scan QR, and Export text controls with accessible transfer icons.
- Synchronizes package/build/export/PWA/release documentation to Beta 0.31 while preserving the exact Node `22.x` requirement.

# Brambleheart Beta 0.30

- Doubled the desktop site-logo visual scale while keeping Back/Dark Mode controls on their independent centered header-control row; tablet/mobile scales are capped responsively.
- Added the existing Brambleheart app icon above the footer separator and added Share between Discord and Install.
- Added Settings -> Access & Community -> Share Brambleheart and established `https://www.brambleheartrpg.com` as the canonical site/share origin.
- Added character QR sharing, camera/image QR scanning, phone-camera share links, gzip payload compression where supported, and a 2,800-byte reliability ceiling with JSON-export fallback.
- Centralized JSON and QR imports through one imported-character normalizer.
- Added persistent `creationComplete` state so only characters that have never finished creation are Incomplete; later partial edits preserve Unapproved/Approved completion status.
- Consolidated Settings disclosure arrows into one authority and changed Custom Data empty state to `NONE LOADED`.
- Added an isolated `/rules/layout-preview/:slug?` test route for the proposed Banner/Header -> Contents -> Overview -> Rule Text design. Production `/rules/read/:slug` pages remain unchanged.
- Synchronized package/build/export/PWA/release documentation to Beta 0.30 while preserving the exact Node `22.x` requirement.

# Brambleheart Beta 0.29

- Centered Character Creation Attribute Rank/Modifier panels and reduced unused Secondary Stat panel width while preserving responsive wrapping.
- Renamed the Starting Languages choice from Additional Language to Bonus Language.
- Converted all Equipment & Gear catalog prices displayed in SP to equivalent NP values and kept purchased-item presentation in NP/WP.
- Changed Totem and Scriptweave Book to grant structured +1 Control bonuses; existing saved copies are normalized to the canonical equipment definitions, and the bonus feeds Character Review, Character List, and Rhythm Engine derived stats.
- Set Skills, Magic, Talents, and Equipment & Gear to start collapsed in Review Character.
- Replaced Character List text actions with accessible icons, added independent Lock/Unlock controls to every character status, and removed duplicated campaign/species text beside the actions.
- Fixed next-background wraparound by deduplicating background option IDs at the background catalog authority.
- Simplified Dropbox Cloud Link Code presentation, removed unnecessary New Code/Copy Code controls, compacted Workspace Link, centered the Cloud Instructions button, and rebuilt the downloadable instructions as a user-only guide.

# Brambleheart Beta 0.28

- Replaced the Beta 0.27 Google Workspace/service-account Character Sync implementation with Dropbox App Folder Cloud Sync using OAuth 2 PKCE.
- Split Settings → Data & Content into separate Character Data and Cloud Sync parents; Character Data now shows LOCAL plus CONNECTED/DISCONNECTED status.
- Removed the active Service Account UI and Google Shared Drive folder-link workflow. Cloud Sync now exposes Cloud Link Code, Workspace Link, Update from Cloud, Upload Local, Disconnect, and the renamed Cloud Instructions (.txt) download.
- Kept local character storage authoritative during normal use and retained explicit-only cloud access with no background polling.
- Restricted Dropbox access to the app's isolated App Folder and `_BH.json` files, while keeping internal character IDs authoritative for replacement/addition and human-readable filenames for export portability.
- Added PKCE refresh-token handling through the guarded local-storage service and isolated cleanup of the obsolete Beta 0.27 Google connection key at the migration boundary.
- Changed Rules → Recent cards from a shared left accent to individual top-border colors using established Brambleheart detail tones.
- Synchronized package/export version, PWA cache, README, patch notes, repository/in-app changelog to Beta 0.28 while preserving the exact Node `22.x` requirement.

# Brambleheart Beta 0.27

- Added local-first, manually triggered Google Drive Character Sync under Settings → Data & Content → Character Data with Link Folder, Update from Drive, Upload Local, and Disconnect controls.
- Added a server-side service-account Drive endpoint; Google credentials remain in private Vercel environment variables and are never stored in browser state or repository source.
- Added an explicit `BH-LINK` folder-description proof and signed linked-folder token that are revalidated before each synchronization operation.
- Restricted two-way sync to one explicitly linked Google Workspace Shared Drive folder; ordinary My Drive folders are rejected, folder searches are non-recursive, and only direct `_BH.json` files are considered.
- Made stable internal character IDs authoritative for synchronization: Drive exact-ID matches replace local records during Update, new Drive IDs are added, and unmatched local characters are retained.
- Added Upload Local behavior that updates same-ID remote files or creates sanitized `CharacterName_BH.json` files, including filename updates after a character rename.
- Added explicit handling for invalid remote JSON and duplicate same-ID Drive files so malformed or ambiguous data cannot silently replace local character data.
- Added a downloadable plain-text Google Drive setup guide covering site-owner Vercel configuration, Shared Drive folder setup, manual sync behavior, revocation, and troubleshooting.
- Added the canonical Character Drive local-storage key and the serverless endpoint without adding a second storage implementation or npm dependency; the existing SPA rewrite remains unchanged.

# Brambleheart Beta 0.26

- Corrected shared Trait/Talent/Spell title-bar geometry so eligible colored title bands reach both card edges; removed conflicting width/margin rules and excluded title bars from the generic content-width clamp.
- Matched Attribute Rank and Modifier labels to the Secondary Stat label treatment in Character Creation.
- Applied the Homeland source pill to every Homeland-granted Starting Skill, including newly gained Rank 1 Skills.
- Corrected Character Creation starting wealth to 2 SP and reduced the Adventure Kit return to 1 SP.
- Split Shields into their own Equipment & Gear purchase tab while preserving Armor & Shield as the saved equipment/rules category used by existing characters.
- Added two spaces before both Review Character `(Change)` controls.
- Changed Review weapon range parsing so Thrown(x) remains a property and a weapon with no Projectile/Reach range displays Touch.
- Consolidated Armor/Shield profile parsing for labeled and legacy positional data, totals Mana Syphon across equipped armor/shields, and adds the total to every known spell Mana cost.
- Removed the fixed Adventure Kit weight from Review totals so Equipment & Gear weight is calculated only from purchased Weapons, Armor/Shields, and other listed equipment.
- Removed the Reset Data display-settings sentence from Settings and kept Reset Custom, Reset Characters, and Reset Data in one action row, including narrow layouts.
- Synchronized visible build, package version, character export version source, PWA cache, README, patch notes, repository changelog, and in-app changelog to Beta 0.26 while preserving the Node runtime pin at `22.x`.

# Brambleheart Beta 0.25

- Rebuilt Settings → Data & Content around Data Backup, Reset Custom, Reset Characters, and Reset Data; removed the obsolete nested character/reset managers and Clear Dice Rolls action.
- Reworked Character Creation Attribute rows so Secondary Stats sit beneath each Attribute description while Rank/Modifier use matching stat boxes at right with centered +/- controls.
- Added Homeland source pills when a Homeland choice raises an already-granted Skill rank, preserving Cultural source pills alongside it.
- Fixed spell-source boundary parsing sitewide and registered Power Word: Reinforcement in the Oath spell catalog so Thunder’s Fury can no longer absorb a following spell into its rules or keyword pills.
- Corrected Threadpiece scaling to 10 WP = 1 NP, 5 NP = 1 SP, and 5 SP = 1 BP; restored all four denominations and reorganized starting currency/Adventure Kit guidance around 50 SP plus the kit, which may be sold for 3 SP.
- Added quantity-aware purchased gear for repeatable items, consolidating duplicate purchases into one row with +/- controls and quantity-aware cost/weight totals.
- Updated Additional Language pills to identify the Species that speaks the selected language and removed native-language subtext from the Review Species field.
- Updated weapon Review profiles so unspecified range displays Touch, all weapon qualities remain in Properties / Notes, and attached Journey Knots are listed and contribute +1 displayed weapon damage.
- Simplified Review expandable-menu summaries; Equipment & Gear now shows current Threadpieces and total carried weight instead of an item count.
- Added a temporary Attuned switch to each non-Invocation Lore reader page; it previews the Lore’s -2 Mana cost and resets whenever navigation leaves the page.
- Synchronized visible build, package version, character export source, PWA cache, README, patch notes, and in-app changelog to Beta 0.25.

# Brambleheart Beta 0.24

- Realigned the header Back and Dark Mode controls to the normal content width while preserving the enlarged centered logo.
- Restored content-driven Recent Rules card height so titles and summaries no longer clip.
- Removed the active References parent page and linked Anthro Mundas, FAQ, and Changes & Updates directly from Rules; retained the former References URL only as a compatibility alias.
- Renamed Keywords & Ability Types to Keyword Abilities and combined the source-backed Core Abilities into that page as individual rule boxes; retained the former keyword/core page URLs as aliases.
- Repaired the Fundamental/Lore arrow controls so they navigate to previous/next pages and added a bottom-right Back to Rules action on ending pages.
- Boxed Melee, Ranged, and Magical To Strike rules separately; moved the Touch pill directly beneath Combat Range; added a black outline around playable Species artwork.
- Consolidated Damage Category, Damage Type, and Resistance & Weakness into To Damage, and Healing, Defeated, and Encounter End into Health; isolated the former URLs as aliases.
- Removed duplicated To Hit/To Defend and Core Ability source ownership from Encounter & Setup / Combat Abilities so each rule concept has one canonical page.
- Added a dedicated Rules surface token scope so role themes no longer recolor rule-panel backgrounds while Dark Mode still supplies the corresponding dark surfaces.
- Verified Brambleheart's five Text Size offsets already match Old.dex exactly, so no duplicate font-size implementation was added.

# Brambleheart Beta 0.23

- Required Character Name before leaving Species; streamlined Culture Trait exchange and moved Passive into the Culture Trait keyword row.
- Moved custom-Homeland Skill selection into Homeland using the supplied skill-tree constraints, and removed premade-Homeland selection behavior from Starting Skills for custom Homelands.
- Reworked Attribute rows so Rank/Modifier controls are larger and right-aligned while Secondary Stats use the smaller panel.
- Made Wind-Touched and Gifted Heart path cards advance directly into their respective creation path.
- Classified Anchor Spirit and Battlebane as Utility.
- Corrected Threadpiece presentation, removed Weapon Qualities from purchasable categories, converted weapon properties to pill UI, restored the complete Armor & Shields catalog, and surfaced source-backed equipment effects/options.
- Applied Armor/Shield Guts bonuses cumulatively and Mana Syphon to spell costs, with Might requirements enforced on newly purchased armor.
- Equalized Starting Language cards, added the selected-language pill, locked Review identity fields by default with Change/Lock controls, and replaced narrow-screen equipment scrollbars with arrow controls.
- Restored category/lore color identity and standard rule-box title treatment to Review rule boxes across site themes.

# Brambleheart Beta 0.22

- Replaced the previous Brambleheart role palettes with the supplied Old.dex palettes: Default → Default, Powers of Chaos → The Warrior, Forces of Fantasy → The Healer, Ravening Hordes → The Ranger, and Legions of Undead → The Thief. Removed Spellcaster and Trickster from the active theme model while isolating legacy saved-value migration at the Settings boundary.
- Restored fixed content-category color identity for spell lore, Heritage/Cultural Traits, Talents, Sparks, Homelands, Oaths, Faiths, and Equipment/Gear so these detail cards do not inherit a different identity when the site theme changes.
- Doubled the desktop header logo scale and expanded the header canvas so the larger logo remains centered without altering normal content width.
- Normalized all backgrounds to the same centered cover positioning, removed the Skullfen Ruins special offset, made View Background always show the full-color artwork regardless of grayscale/dark-mode display settings, and added a right-arrow background cycler.
- Rebuilt Donation as a standard Settings row, replaced repository-oriented Backgrounds help copy with user-facing text, restored theme-aware separator lines around expandable Settings controls, and increased Settings category labels by two pixels.
- Centered shared button labels, indented Rules category child rows, made Recent Rules cards equal height, and hid the native file input so Character List exposes only the intended Import Character action.
- Synchronized package, visible build, exports, PWA cache, README, patch notes, and in-app changelog to Beta 0.22.

# Brambleheart Beta 0.21

- Fixed the mobile Settings Text Size control at its canonical definition: removed the fixed flex basis that became vertical height when Settings rows stack on narrow screens, so the five size buttons remain a compact single control.
- Rolled the Beta 0.20 source-normalization work forward cumulatively because the current GitHub application source was still on the Beta 0.19 implementation baseline.
- Kept the cleaned Brambleheart-only stylesheet as the authoritative source instead of adding another override layer; obsolete Old.Dex/builder/game selectors, oversized Welcome tests, dead theme rules, and superseded implementation blocks remain removed.
- Canonicalized the Ability Targeting route slug to `ability-targeting` while retaining `area-of-effect` only as a backward-compatible URL alias.
- Removed the unused legacy `ruleChapters` catalog from `bramble.ts` so Rules metadata has one authoritative catalog instead of a stale parallel definition.
- Removed unused encounter-era rules helpers and unused service exports, and routed Level Up advancement prices through the shared `advancementCost` function so XP costs are not implemented twice.
- Centralized rank modifiers, derived character statistics, equipment profile parsing, equipment Guts bonuses, and structured Ability-field parsing in the shared rules engine so Character Creation and Rhythm Engine do not maintain parallel implementations.
- Unified Rhythm Engine completed-character filtering with the explicit Incomplete / Unapproved / Approved status model and preserved Approved-only Level Up behavior.
- Centralized storage keys and external support/donation links, made Rhythm roll-history write failures visible, and corrected Custom Data clearing so the UI is updated only after browser storage confirms the deletion succeeded.
- Applied the intended Approved visual state class to approved Character List cards.
- Synchronized package, visible build, character export, character-list export, PWA cache, README, patch notes, and in-app changelog versions to Beta 0.21.
- Identified the current GitHub `Banner_AnthroMundas.png` as a two-byte CRLF placeholder rather than a valid image; repository history confirms the genuine 2,696,927-byte artwork remains available in commit `0a5ddb56e9e3eaa5b4fe6301b150c59351ee547b` under the original typo filename `Banner_AthroMundas.png`, with restoration instructions isolated from uploadable patch files.

# Brambleheart Beta 0.20

- Removed the obsolete Beta 0.09 oversized Welcome-logo scale test that was overriding current responsive sizing and clipping the splash identity.
- Purged unrelated Old.Dex/army-builder CSS and retired Brambleheart patch-layer selectors from the global stylesheet, then consolidated active text-size, theme, surface, header, and Welcome definitions.
- Reduced the global stylesheet from roughly 3,900 lines to about 1,400 active Brambleheart lines while retaining currently used component selectors and responsive behavior.
- Removed dead Species-theme CSS and obsolete background-asset exclusions/references, leaving one active role-theme and background contract.
- Centralized browser-storage reads, writes, removals, and key enumeration behind the safe storage service; simplified Reset Local Data so it clears Brambleheart data without a hard-coded historical-key list while preserving Display settings.
- Renamed the residual Old.Dex-derived Rule Reader CSS hook to a Brambleheart-neutral source rule section name.
- Preserved the explicit Incomplete / Unapproved / Approved character status model and Approved-only Level Up behavior from the Beta 0.18 reliability hotfix.
- Advanced the visible build, character export markers, and PWA shell cache to Beta 0.20.

# Brambleheart Beta 0.19

- Swapped the Healer and Trickster theme palettes, corrected foreground/background surface hierarchy across themes, and refined dark-theme separators.
- Adjusted Skullfen Ruins background positioning and tightened Settings Donation, Reset Local Data, and Clear Dice Rolls presentation.
- Reversed the Rhythm Engine tabs so Character Sheet appears before Dice Roller, corrected the tab treatment, added Character Detail, removed Path subtext, improved Dice Roller spacing, and contained narrow Character Sheet sections.
- Standardized content boxes around the Species Trait card language across Rules, Character Creation, character sheets, and comparable panels.
- Added functional parent Rules overview pages for breadcrumb navigation and moved Anthro Mundas banner placeholders beneath each lore body title only.
- Moved Lore fluff above spell lists, removed Lore names from spell title bars, and consolidated Movement, Survival, and Social Talents into Utility.
- Normalized Watcher monster entry bars so variant families expand consistently and single entries are direct links.
- Renamed Area of Effect to Ability Targeting, added Combat Range and Touch, generalized Direct/Line/Cone/Orb rules to Abilities, and placed targeting under Combat Abilities.
- Combined Initiative Order, Rounds & Turns, Your Turn, and Mana into a single structured Rounds & Turns page.
- Rebuilt Species Rules introductions with a two-column identity/art hero and lore beneath, and preserved explicit approval/Level Up status behavior from the 0.18 hotfix.

# Brambleheart Beta 0.18

- Renamed Settings Text Size endpoints to Smallest and Largest and added double-confirmed character clearing for All, Incomplete, Unapproved, and Approved characters.
- Reorganized Sparks & Deeds, Homelands, Oaths, Faiths, Talents, and Adventuring Gear into expandable rule groups using the same card language as Character Creation.
- Expanded Faith detail in Character Creation, removed implicit dropdown choices, and standardized default Select placeholders.
- Corrected requested Talent names and category assignments, including Pouncer and Hearthwall.
- Reworked Weapons and Armor into structured character-sheet slots and added collapsible Character Sheet sections.
- Cleaned Threadpiece presentation and preserved grayscale while using View Background.
- Hotfix: replaced lock-based approval with explicit Incomplete/Unapproved/Approved status, migrated legacy characters, removed reactive Proxy cloning from approval and Level Up transactions, and gated Level Up to Approved characters.

# Brambleheart Beta 0.17

- Renamed Rhythm Engine Attribute Check to Dice Roller and matched the saved Character Sheet to the Character Creation Review layout.
- Reorganized Traits, Talents, Spells, and Watcher creature references into expandable parent categories matching Character Creation conventions.
- Added The Battles → Area of Effect with the supplied Line, Cone, Orb, and collision diagrams; Winds of Magic now cross-references it.
- Fixed character approval movement and rebuilt Approved, Unapproved, and Incomplete lists as connected expandable panels.
- Removed false Mana pills, corrected Mana COST parsing, and hardened rule-banner matching for uploaded banner files.
- Added Donation detail text, consolidated the page-tool/build footer, corrected Dark Mode background treatment, and added a background-only viewing control.
- Updated repository documentation/changelog state, removed inactive Encounter source files, and advanced the app/PWA/export markers to Beta 0.17.

# Brambleheart Beta 0.16

- Added optional installed-app launch fanfare and a Launch Audio setting.
- Corrected splash-page width containment and responsive Text Size controls.
- Renamed visible Species Trait terminology to Heritage Trait throughout the companion.
- Tightened Character Creation spacing, defaults, Attribute controls, Threadpiece display, Languages, and Review layout.
- Moved ability-cost/type pills to card title bars and standardized Heritage/Cultural trait identity pills, Talent cards, and Spell cards.
- Added Offensive Combat and Defensive Combat Talent categories.
- Split completed characters into Approved and Unapproved lists.
- Added auto-discovered rule banner placeholders and clickable left/right rule-navigation controls.
- Aligned the Rhythm Engine Character Sheet more closely with the creation Review sheet.
- Added Discord to the global page tools.
- Fixed Settings Background disclosure styling and removed the stray separator.

# Site Changelog

## Beta 0.15

- Relaxed the Node engine ceiling while retaining Node 22 as the minimum supported runtime.
- Hardened the service worker so it ignores cross-origin requests, never caches failed responses, and uses the cached shell only as an offline navigation fallback.
- Added reusable focus trapping, Escape dismissal, and trigger-focus restoration to all current modal dialogs.
- Added explicit character-storage failure handling and transactional Level Up persistence so failed local writes do not discard or falsely report saved work.
- Prevented Character Creation progress-step jumps from bypassing required validation.
- Unified Talent prerequisite enforcement between Character Creation and Level Up.
- Added Custom Data import counts for recognized and skipped entries.
- Corrected Gloommere's Whisperster Skill and made Attribute Check Skill filtering fail closed for unknown Skills.
- Excluded retired background files before bundling and removed obsolete Old.Dex payload/migration files plus inactive Encounter source files from the v0.15 package.

## Beta 0.14

- Added typed downloadable JSON templates and import support for custom Species, Spells, Talents, and Traits, with explicit Custom labeling and a per-character Allow Custom Data switch.
- Rebuilt Background selection around automatic image discovery from `src/assets/backgrounds`, removed option detail text, and added the supplied Skullfen Ruins and Blightbound Horror artwork.
- Updated Attribute Check Strike stats to identify Shooting, Melee, and Magic.
- Replaced the Rhythm Engine Combat Encounter section with a saved-character Character Sheet and moved character selection into a shared panel beneath the tool tabs.
- Removed the legacy Encounter route from active routing and cleaned obsolete Simulator encounter dependencies.
- Advanced the visible build and PWA shell cache to Beta 0.14.

## Beta 0.13

- Rebuilt Combat Encounters as a non-collapsible pen-and-paper character sheet with permanent Core Abilities, clickable combat/character fields, one event record, and corrected ongoing/history controls.
- Added Approved characters and a Beyond Character Creation Level Up page with source-backed XP costs.
- Refined Cultural Skills, Spark Deed examples, Homeland/Starting Skills, Attributes, Oath/Faith, Lore, Languages, Equipment wealth, Talent popups, and Review Character.
- Removed duplicate Attribute Check roll type, alphabetized Rhythm roll types, and simplified Fortune/Misfortune guidance.
- Added Thornwick Market and Skullfen Ruins backgrounds and pinned the splash page to Ready For Adventure.
- Added build number to Settings → Site Changelog and tightened header/navigation spacing and responsive popup layouts.

## Beta 0.12

- Refined Character Creation Culture Skill selection, Deed guidance, Attributes, Faith/Oath spacing, spell ordering/capitalization, NP wealth, Languages, and Review character-sheet layout.
- Added Background grayscale control, removed image-background backing behind the site logo, preserved Complete/Incomplete Character List groups, and limited Rules recent access to 2 × 2.
- Reordered The Fundamentals, boxed Skill Trees/Species Traits and comparable Rules content, synchronized Building Selu examples, and added source-backed Encounter Rating/monster index pages.
- Tightened Attribute Check target controls and added a descriptive dynamic roll formula.
- Refined dedicated Combat Encounter pages further toward a clickable pen-and-paper character sheet.

## Beta 0.11

- Added always-visible Character List actions and Complete/Incomplete status treatment; simplified creator identity to Name, Campaign, and Appearance.
- Split Rhythm Engine interaction into Attribute Check and Combat Encounter sheets, disabled Skills for non-Skill roll types, and rebuilt dedicated encounters around a clickable character sheet and weapon attacks.
- Restored Default and strengthened Warrior, Ranger, Spellcaster, Healer, Thief, and Trickster themes across full light/dark surfaces and controls.
- Removed the redundant Brambleheart lore page, expanded previous/next navigation across rule categories, reduced FAQ typography, and flattened rule-card internals.
- Seeded Rules with default Recent/Common access, tightened creator modals/languages/review, and applied explicit permanent equipment Guts to character-sheet stats.
- Reduced header-to-navigation spacing, increased the logo one step, made Reset Data return to Welcome, hardened the splash install flow, and replaced selectable backgrounds with Ready For Adventure.

## Beta 0.10

- Added Campaign Name to characters and the Character List.
- Split Lore of Anthro Mundas into section pages with previous/next navigation and removed Rule Reader keyword pills.
- Replaced role themes with Warrior, Ranger, Spellcaster, Healer, Thief, and Trickster; reduced the previous oversized logo test by half.
- Reworked Attribute Check dependencies and moved Combat Encounters to dedicated pages.
- Refined Culture/Talent selection, Skill normalization, Winds of Magic Mana guidance, Threadpiece wealth, Equipment attachments, Languages, and Character Review.
- Normalized mobile/tablet select controls and card dividers.

## Beta 0.09

- Rebuilt the Rules landing page around the supplied reference layout, removed the redundant Table of Content page, made Rules search full width, and added breadcrumbs.
- Reworked source-backed rule sections and Fundamental previous/next controls toward the Old.Dex Core Rules presentation.
- Added a WIP banner and the requested large-logo scale test.
- Fixed Dark Mode so non-default role themes apply dark surfaces across the full site instead of changing only accent/menu colors.
- Removed the empty No Target result placeholder, expanded Fortune & Misfortune guidance, added saved-character Attribute Checks, and require a character before starting a Combat Encounter.
- Refined Character Creation identity fields, Selu callouts, help panels, Attribute controls, cultural Skills, Homeland Skill labels, Mana guidance, Lore Spells, attuned Lore labels, and Talent grouping.
- Rebuilt Equipment & Gear purchasing with category tabs, readable profiles/descriptions/effects, required purchase choices where applicable, currency guidance, and a Purchased Equipment & Gear list.
- Added an additional selectable Language with language guidance and rebuilt Review to show editable name, Attributes/Modifiers, secondary stats, Skills, and Equipment.
- Locked page scrolling behind creator popup panels while preserving touch/mouse scrolling inside the popup itself.
- Preserved the Beta 0.08 creator crash fix and corrected Character Creation page boundary.

## Beta 0.08

- Rebuilt from the stable Beta 0.06 package rather than the broken Beta 0.07 implementation baseline.
- Fixed the Spells / Invocations → Talents creator crash and Species/Culture layout overflow.
- Added requested creator presentation fixes, Culture Trait popup, Skill Rank + Modifier, and Lore-colored Spell cards.
- Reorganized Rules into References, Table of Content, The Fundamentals, and a standalone Playable Species section; added recent Rules boxes.
- Added Default as the first Theme option.
- Expanded Combat Encounters with saved-character data, Abilities/Root tracking, Melee/Ranged/Magical Attacking & Defending, Spells & Mana, and Resistance/Weakness.
- Advanced the PWA shell cache and visible build label to 0.08.

## Beta 0.06

- Expanded guided Character Creation with Species lore and Traits, Culture Traits, Skills, Spark/Deed guidance, Homeland, Faith & Oath guidance, detailed Attribute allocation, Body & Spirit paths, Lore Attunement, Spells, Talents, equipment purchasing, Languages, and final character review.
- Added source-backed individual Playable Species and Lore of Magic reader pages, Quick Reference, FAQ, Recent Rules, Changes & Updates, and linked Fundamental-rule navigation.
- Refined the Rules menu hierarchy, parent/child tones, keyword pills, capitalization, and example-dialogue presentation.
- Expanded the Rhythm Engine with Reason for the Roll, separate Attribute/Secondary Stat and optional Skill values, targets, Fortune/Misfortune results, and five-roll history.
- Moved Strike vs Ward into the Encounter tracker and retained ongoing/completed encounter history with pinning.
- Updated the Brambleheart identity presentation, responsive logo sizing, Beta labeling, browser/app naming, and text consistency.
- Connected Donation and Recurring Support to the supplied support links.
- Retained Custom Data, fixed-cover backgrounds, install support, Simulator reset controls, and the protected repository cleanup workflow.

## Alpha 0.05

- Added fixed-cover Brambleheart backgrounds, standalone Rules reader pages, the initial guided Character Creation flow, expanded Simulator history, and repository cleanup tooling.

## Alpha 0.04

- Established the compact routed reader layout, Settings presentation, welcome flow, and shared interface components.

## Alpha 0.03

- Added five text sizes, bold text, species palettes, install controls, grouped Rules reference, Recent Rules, and the initial splash page.

## Alpha 0.02

- Standardized the first generation of application panels, controls, spacing, and Settings.

## Alpha 0.01

- Initial Vue 3 + TypeScript + Vite companion build with Character List, Rules, Simulator, Settings, local persistence, and Brambleheart assets.
