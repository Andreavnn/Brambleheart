# Brambleheart Beta 0.24

- Rebuilds the current Rules source boundary so the application consumes one materialized current ruleset instead of retaining the original generated raw-rules file and later mutation layer.
- Refines Fundamentals graphics for Attributes, Ranks & Modifiers, Skills, Core Action timing, and Ability chaining; shared Core Action cards now use the same field treatment as other current rule cards.
- Expands Character Creation reference presentation for Sparks, Deeds, Homelands, Faiths, Oaths, Talents, Equipment & Gear, Threadpiece exchange, advancement, and optional character details while keeping those pages on the shared Rules layout.
- Updates Winds of Magic reference presentation for Mana Pool, Magic Regen, Lore Attunement, Signature Spells, Spell Keywords, casting, range/area interpretation, collapsible spell references, and Lore elemental resistance.
- Reworks Battle reference presentation for encounter flow, Initiative, turns, Instinct timing, Combat Targeting, Attacking & Defending, Damage Categories, Resistances, Health, Healing, defeat, and encounter-end references.
- Synchronizes Site Update Beta 0.24, package/export/build metadata, PWA cache metadata, and Game Update v0.12.

# Brambleheart Beta 0.23

- Unified the Rules presentation around one shared page shell for breadcrumbs, title/detail text, section styling, and previous/next navigation.
- Reused shared Core Action and rule-feature card renderers across Fundamentals, Character Creation, Winds of Magic, and Battles instead of maintaining page-specific copies.
- Removed obsolete Rules presentation selectors and duplicate Core Action/example markup exposed by the layout consolidation.

# Brambleheart Beta 0.20

- Consolidated Battle and Winds of Magic navigation into the current merged pages, including Encounter & Rounds, Combat Targeting, Attacking & Defending, Magical Levels, and Spell Types & Targeting.
- Added current damage-category/Heart guidance, damage/soak graphics, Species layout changes, and broader Fundamentals-style rule presentation.
- Preserved prior route slugs only through explicit compatibility aliases while current navigation uses canonical page slugs.

# Brambleheart Beta 0.16

- Established the current visual identity for Traits, Talents, Spells, Skills, and rule pills, including shared accent/tone handling and readable rule-card formatting.
- Standardized current Rules page titles, summaries, Watcher/Selu callouts, content panels, and rule-detail typography.
- Expanded Species and rules reference presentation while retaining specialized Species art/lore layouts where appropriate.

# Brambleheart Beta 0.12

- Expanded Character Creation, equipment shopping, character review, News, and Rules reference workflows.
- Added current equipment normalization and shared item/economy data used by Character Creation and character sheets.
- Improved rule navigation, linked rule pills, Settings/Data presentation, and current character-facing status behavior.

# Brambleheart Beta 0.08

- Added cloud/share/import foundations for character data and expanded data/settings tooling.
- Improved current data normalization, import/export handling, and cross-device character workflows.

# Brambleheart Beta 0.05

- Established the shared storage service, persisted character/settings state, accessibility improvements, and the early Rules/Character Creation application structure.
- Consolidated browser-storage access through the application storage boundary and improved persisted-state reliability.

# Brambleheart Alpha 0.01

- Initial Brambleheart Vue 3 / TypeScript application foundation with Character Creation, character storage, Rules, Settings, and early game-data structures.
