# Brambleheart Beta 0.36 Patch Notes

Baseline: GitHub `main` commit `886e60f9736367e0206b688df0f923149b8feb00` (Beta 0.35.0).

## Rule Updates v0.02
- Magic Regen is now exactly Heart. The former standard `+2` is removed; effects that increase or decrease start-of-round Mana restoration modify Magic Regen itself.
- Heart remains Bravery Rank, Spirit remains Bravery modifier, and Mana Pool remains `Magic Level + Spirit`.
- Rebuilds the Threadpiece economy from one canonical integer `wp` authority: `10 wp = 1 np`, `5 np = 1 sp`, `5 sp = 1 bp`.
- Keeps starting wealth at `30 sp` (`1,500 wp`), keeps the Adventure Kit free, and changes its fixed creation sellback to `3 sp` (`150 wp`). Maximum creation purchasing power after selling the kit is therefore `33 sp`.
- Applies the Economy Rebuild price schedule across weapons, armor/shields, adventuring gear, trade goods, and transportation; restores Field Blade (Long Sword) as a purchasable 20 sp weapon.
- Ordinary gear resale is 50% of current retail, trade goods default to 75%, and crafting market-priced items requires eligible material value of at least 50% of current retail. Barding remains 3× current canonical armor retail.
- Only one owned Armor and one owned Shield may be equipped at a time. Only equipped protective gear contributes Guts, Mana Syphon, Stealth, and Might requirements.

## Character Sheet & Character Creation
- Changes the Agility shorthand from `AGL` to `AGI`.
- Keeps Attribute/secondary-stat box heights unchanged while shortening Rank and Modifier boxes so they no longer crowd the parent Attribute label.
- Secondary-stat detail is now formula-only with the parent abbreviation, such as `2 + 4 AGI MOD`, `3 MIG RNK`, or an equipment bonus plus the parent Rank/Modifier where applicable.
- Mana Pool displays its Magic Level + Spirit source; Magic Regen displays its Heart/BRY Rank source without a built-in +2.
- Rhythm Engine → Character Sheet → Magic now starts collapsed.
- Reopening an approved character in Character Creation preserves campaign-earned wallet balance, currency additions, XP, treasure, Magic Level, and pin state rather than reconstructing those values from creation purchases.

## Equipment & Economy Runtime
- Introduces one canonical current-retail price map in whole wp. Existing `costSp`/`costNp` values are compatibility fields generated from current `costWp`, not independent price authorities.
- Existing saved items retain ownership and historical paid value while current affordability/resale resolves against the canonical catalog price.
- Legacy wallet fields migrate at load to whole wp without retroactively charging a character for new prices.
- Level Up purchases subtract canonical wp, protective gear can be explicitly equipped, and ordinary owned gear can be sold at the 50% resale rule.
- Removing/selling equipped Armor or Shield promotes another owned item of the same kind when available.

## Rules Layout Test
- Replaces the confusing Half-Step graphic with a simple branch: roll 1d10, natural `1–5 → 1`, natural `6–10 → 2`; the die face is never divided.
- Keeps the Threadseer example notation but explains it as result-band conversion followed by the listed `+1` condition.
- Makes the Threadseer die/result boxes square and equal-sized.

## Release Integrity
- Advances BUILD and character export version to `0.36`, package version to `0.36.0`, and PWA cache to `v0.36`.
- Advances the independent Rule Updates stream to `v0.02`.
- Keeps Node pinned to exact `22.x`.
