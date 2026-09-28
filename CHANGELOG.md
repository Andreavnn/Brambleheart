# Brambleheart Beta 0.19 — Species Asset Authority Fix

## Species Artwork

- Corrects the species-art asset authority so Character Creation and Rules pages now resolve species images through the same explicit filename mapping instead of independently forcing every species filename to lowercase.
- Uses the newly uploaded case-sensitive species files for Ardenn, Auravex, Axalori, Cethra, Ravari, Sauren, Tordan, Urnath, and Virelan rather than the older lowercase image copies that remained from the previous artwork pass.
- Keeps Braelor, Hedgkin, and Rivkan on their existing lowercase assets until replacement files with their species-name filenames are supplied, avoiding broken images while removing the automatic lowercase behavior from the application.
- Retires the superseded lowercase duplicates for the nine species that already have replacement uploads.

## Release Integrity

- Synchronizes Site Update, package, runtime/export, downloadable instructions, install-asset versioning, and PWA cache metadata at Beta 0.19 while Game Update remains v0.01.

# Brambleheart Beta 0.18 — Species Artwork Presentation Cleanup

## Species Artwork

- Removes the decorative gradient, black border, rounded clipping, and overflow treatment from the Character Creation species image shell so uploaded species artwork is displayed without site-applied background or clipping effects.
- Removes the tinted artwork-side background from playable-species Rules pages so transparent species images render against the normal page surface rather than a species-specific color treatment.
- Removes the duplicate Character Creation species border override and stale Rules-reader species frame styling, leaving the shared stylesheet as the single authority for species artwork layout.

## Release Integrity

- Synchronizes Site Update, package, runtime/export, downloadable instructions, install-asset versioning, and PWA cache metadata at Beta 0.18 while Game Update remains v0.01.

# Brambleheart Beta 0.17 — Character Art Refresh

## Artwork & Presentation

- Replaces the News, Character Roster, Rhythm Engine, Rules, and Settings header characters with the newly supplied artwork while preserving the shared page-header layout and removing the uploaded black backgrounds.
- Updates the Share Brambleheart promo art with the supplied replacement image and removes its uploaded black background so it continues to display cleanly inside the News card.
- Replaces the Muckling, Noxious Muckling, and Ember Dyrtle monster art with the supplied updated artwork, including adding a dedicated Noxious Muckling image so all currently unlocked monster profiles now have matching art.
- Refreshes all 12 playable-species art assets with the supplied updated artwork and removes uploaded black backgrounds before applying them to the site.

## Release Integrity

- Synchronizes Site Update, package, runtime/export, downloadable instructions, install-asset versioning, and PWA cache metadata at Beta 0.17 while Game Update remains v0.01.
