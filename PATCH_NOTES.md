# Brambleheart Beta 0.15 — Reliability & Accessibility

## Runtime & Deployment
- Relaxed the Node.js engine declaration from `>=22 <23` to `>=22`, keeping Node 22 as the supported minimum without blocking future Node releases.
- Rebuilt the service worker cache policy around same-origin app requests only.
- Navigation is network-first and falls back to the cached app shell only when the network genuinely fails.
- Cross-origin requests are no longer intercepted by the service worker.
- Runtime caching now stores only successful (`response.ok`) static app responses and never caches transient 4xx/5xx responses.
- Advanced the PWA shell cache to `brambleheart-shell-v0.15`, clearing earlier shell caches during activation.

## Accessible Modals
- Added a shared focus-trap composable for Brambleheart modal dialogs.
- Culture Trait, Talent, Equipment & Gear, and Welcome/Install dialogs now move focus inside when opened, keep Tab/Shift+Tab within the modal, close on Escape, and return focus to the control that opened them.
- Existing creator popup scroll-lock behavior remains intact.

## Character Data Reliability
- Character persistence now catches browser/local-storage write failures and returns an explicit success/failure result instead of allowing storage exceptions to escape through Vue actions.
- Character Creation Save, Save & Close, and Finish only report success or navigate away after the character has actually been persisted.
- Character List mutations now restore the previous in-memory state when persistence fails.
- Level Up changes are committed transactionally: XP and advancement changes are only kept after storage succeeds.
- Removed the inactive legacy Encounter view/service from the v0.15 source package instead of maintaining a second unused persistence path.

## Character Creation Validation
- Forward navigation through clickable Character Creation progress steps now validates every step being skipped.
- A forward jump stops at the first invalid step and surfaces that step's existing validation message.
- Backward progress navigation remains unrestricted.

## Level Up Talent Rules
- Added shared Talent prerequisite parsing/matching logic so Character Creation and Level Up use the same `REQUIRES` behavior.
- Level Up hides Talents whose prerequisites are not met.
- Talent purchase is guarded again at the action layer so an invalid Talent cannot be added by bypassing the selector state.

## Custom Data Import Feedback
- Custom Data parsing now reports the total recognized entries and how many malformed/unrecognized entries were skipped.
- Settings shows an import result message instead of silently dropping bad entries from a partially valid file.
- An import still fails completely when no recognized Brambleheart custom entries are present.
- Custom Data is only replaced in memory after the merged data has been successfully persisted.

## Skill Data Integrity
- Corrected Gloommere's Homeland Skill from `Whisperstep` to the canonical `Whisperster` spelling across live character data and the generated rule source.
- Attribute Check Skill filtering now fails closed: an unknown Skill definition no longer appears beneath every Attribute.

## Background & Repository Cleanup
- Legacy hidden backgrounds are excluded at the `import.meta.glob` stage so they cannot be emitted into production bundles even if an older checkout still contains them.
- Removed the four retired legacy background images from the v0.15 package: The Crossway Hearth, Deepwood Ruins, Mushroom Isles, and Leviathan's Wreck.
- Removed unrelated Old.Dex profile payload files, `MANIFEST.json`, and `scripts/apply-v0032.py` from the v0.15 package.
- Removed the now-unused legacy Encounter source files from the v0.15 package.

## Build
- Advanced the visible Brambleheart build to Beta 0.15.
- Character JSON exports now identify version 0.15.
