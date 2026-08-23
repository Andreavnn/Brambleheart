# Brambleheart Beta 0.11 — Character, Rhythm & Rules Patch

This full overlay starts from the working Beta 0.10 package and preserves the recovered Character Creation crash and page-boundary fixes.

## Character List and Character Creation

- Character cards show Name, Species, and Campaign with always-visible Edit, Lock/Unlock, Copy, and Delete controls.
- Complete and Incomplete states use clear green/red status treatment; locked characters cannot be edited or deleted until unlocked.
- Step 1 removes Age, Pronouns, and Kinship/Pack. Identity is now Character Name + Campaign with a larger Appearance field below.
- Character Review uses one editable Name/Campaign row, displays the actual Path name, tightens empty space, and presents secondary stats as compact stat boxes.
- Explicit permanent equipment Guts bonuses are included in Review/character-sheet Guts. Conditional Trait/Talent effects and temporary Spell effects are not folded into base stats.
- Talent selection remains open for multi-selection, uses a roomier one-column list, and all creator popups use wider independently scrolling content areas.
- Language cards are tightened to remove unnecessary vertical whitespace.

## Rhythm Engine and Combat Encounters

- Attribute Check and Combat Encounters are separate selectable sheets.
- Attribute Check uses Roll Type → Character Stat → Character Skill dependency; Skill is visibly disabled for roll types that do not use Skills.
- Dropdown labels are compact and remove decorative dashes between labels and values.
- Dedicated Combat Encounter pages are rebuilt toward a character-sheet layout. Click Attributes or applicable secondary stats to roll them; click saved Weapons to make their associated Melee/Ranged Strike against the current Target Ward.
- Weapon cards expose the saved profile and calculated damage basis while retaining the existing advanced encounter panels for later expansion.

## Rules

- The Lore of Anthro Mundas sequence begins with Anthro Mundas; the redundant Brambleheart page is removed.
- Previous/next navigation is added across References and every rules category, in addition to Fundamentals and Anthro Mundas.
- Main-page secondary eyebrow titles are removed where they duplicated the page title.
- FAQ typography is reduced. Rule-card title separators span the full card width, inner boxed fragments are flattened, and spacing is reduced.
- Rules Recent/Common access is seeded with a useful default set even before local history exists.

## Themes, Header, Welcome, and Settings

- Default returns as the first Theme, followed by Warrior, Ranger, Spellcaster, Healer, Thief, and Trickster.
- Theme palettes are darker, more distinct, and control full-site surfaces, primary controls, and Dark Mode rather than only menu accents.
- Site logo grows one step from Beta 0.10 while the gap between the logo/header and navigation is reduced by roughly half.
- Reset All Local Data clears welcome/install dismissal state and immediately returns to the Welcome page.
- Splash install handling no longer attempts a missing browser install prompt.
- All previous selectable backgrounds are removed from Settings. The only optional artwork is the supplied Ready For Adventure image, alongside Default.

## Compatibility

- Character storage remains `brambleheart-characters-v0.01`.
- Encounter storage remains `brambleheart-simulator-encounters-v0.05`.
- Rhythm history remains `brambleheart-simulator-rhythm-v0.05`.
- PWA shell cache advances to v0.11.
