# Brambleheart Beta 0.08 — Emergency Patch Packet

Baseline: Brambleheart Beta 0.07 / `main`
Target repository: `Andreavnn/Brambleheart`

This packet is the self-contained patch-delivery format.

## What this packet fixes

- Step 10 → Talents crash caused by Talent validation mutating reactive state during render.
- Species/Culture information panels escaping the left creator column and covering the Species portrait.
- Black border around Species portraits.
- Appearance changed to a vertically resizable textarea.
- Oath & Faith page over-stretching contained without redesigning the page.
- Start Over text changed to black.
- Close text changed to red.
- Spell information cards colored by Lore.

## Apply

### Windows / PowerShell
Run `apply.ps1` from the repository root, or pass the repository path:

```powershell
powershell -ExecutionPolicy Bypass -File .\BH_BETA_0.08_EMERGENCY_PACKET\apply.ps1
```

### macOS / Linux
Run:

```bash
bash BH_BETA_0.08_EMERGENCY_PACKET/apply.sh
```

The scripts first run `git apply --check`. They stop without modifying files if the packet does not match the current source.

## Files changed by the packet

- `src/views/CreateCharacterView.vue`
- `src/styles.css`

No test workflow, temporary GitHub verification marker, or other support artifact is added to the repository.
