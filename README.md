# Brambleheart TTRPG — Beta 0.16

Brambleheart is a Vue 3 + TypeScript + Vite + Vue Router tabletop companion application.

Beta 0.16 is a reliability and accessibility pass built from the Beta 0.14 source snapshot. It concentrates on safe persistence, service-worker behavior, modal keyboard support, Character Creation validation, Talent prerequisites, Custom Data feedback, and repository cleanup.

## Main views

- Welcome / Splash
- Character List
- Guided Character Creation
- Character Level Up
- Rules / Rule Reader
- Rhythm Engine — Attribute Check and Character Sheet
- Settings
- Site Changelog

## Beta 0.16 focus

- Keeps Node 22 as the minimum runtime without capping future Node releases.
- Prevents the service worker from caching bad responses or intercepting cross-origin traffic and uses the shell only as a true offline navigation fallback.
- Adds reusable keyboard focus management to all current modal dialogs.
- Makes character saves and Level Up transactions fail safely when local browser storage is unavailable or full.
- Prevents Character Creation progress dots from bypassing required steps.
- Applies Talent prerequisites consistently in Character Creation and Level Up.
- Reports skipped/malformed Custom Data records during import instead of silently dropping them.
- Corrects the Gloommere Whisperster Skill and prevents unknown Skills from matching every Attribute.
- Excludes retired background assets before bundling and removes unrelated Old.Dex payload/migration material from the source package.
