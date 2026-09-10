import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..')
const read=(relative)=>fs.readFileSync(path.join(root,relative),'utf8')
const exists=(relative)=>fs.existsSync(path.join(root,relative))
const walk=(dir)=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(path.join(dir,entry.name)):[path.join(dir,entry.name)])
const sourceFiles=walk(path.join(root,'src')).filter(file=>/\.(?:ts|vue|css)$/.test(file))
const sourceText=sourceFiles.map(file=>[path.relative(root,file),fs.readFileSync(file,'utf8')])

const release=read('src/data/release.ts')
const app=release.match(/APP_RELEASE='([^']+)'/)?.[1]
const pkgRelease=release.match(/PACKAGE_RELEASE='([^']+)'/)?.[1]
const game=release.match(/GAME_UPDATES_RELEASE='([^']+)'/)?.[1]
assert.ok(app&&pkgRelease&&game,'release.ts must expose all canonical release markers')
const pkg=JSON.parse(read('package.json'))
assert.equal(pkg.version,pkgRelease,'package.json version must match PACKAGE_RELEASE')
assert.equal(pkgRelease,`${app}.0`,'package release must derive from app release')
assert.match(read('public/sw.js'),new RegExp(`brambleheart-shell-v${app.replaceAll('.','\\.')}`),'PWA cache must match app release')
assert.ok(read('CHANGELOG.md').startsWith(`# Brambleheart Beta ${app}`),'CHANGELOG current entry must match app release')
assert.match(read('README.md'),new RegExp(`Beta ${app.replaceAll('.','\\.')}`),'README current Site Update must match app release')
assert.match(read('README.md'),new RegExp(`Game Update[^\n]*v${game.replaceAll('.','\\.')}`),'README current Game Update must match game release')
assert.match(read('PATCH_NOTES.md'),new RegExp(`Beta ${app.replaceAll('.','\\.')}`),'PATCH_NOTES current Site Update must match app release')
assert.match(read('PATCH_NOTES.md'),new RegExp(`v${game.replaceAll('.','\\.')}`),'PATCH_NOTES current Game Update must match game release')

for(const obsolete of ['src/data/equipmentNormalization.ts','src/data/rulesSource.ts','src/data/beta032Content.ts','src/styles.beta032.css'])assert.equal(exists(obsolete),false,`${obsolete} must remain removed`)
for(const obsoleteAsset of ['src/assets/backgrounds/Blightbound Horror.png','src/assets/page-headers/rules.png.png'])assert.equal(exists(obsoleteAsset),false,`${obsoleteAsset} must remain removed`)

const backgroundDir=path.join(root,'src/assets/backgrounds')
const backgroundIds=fs.readdirSync(backgroundDir).filter(name=>/\.(?:png|jpe?g|webp)$/i.test(name)).map(name=>name.replace(/\.[^.]+$/,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''))
assert.equal(new Set(backgroundIds).size,backgroundIds.length,'background asset names must resolve to unique canonical ids')

for(const [file,text] of sourceText)assert.equal(text.includes('!important'),false,`${file} contains !important`)
for(const [file,text] of sourceText){if(file==='src/services/storage.ts')continue;assert.equal(/\blocalStorage\s*\./.test(text),false,`${file} bypasses the storage service`)}

const rules=read('src/data/rulesCurrent.ts')
const catalog=read('src/data/ruleCatalog.ts')
assert.equal(/['"]species-[a-z]+['"]\s*:/.test(rules),false,'rulesCurrent must not duplicate Species documents')
assert.equal(/document\s*:\s*['"]species-/.test(catalog),false,'Species catalog pages must not point at duplicate source documents')
assert.match(rules,/current categories are Standard, Direct, and Lethal/i)
assert.match(rules,/On-Going is a recurring-damage qualifier/i)
assert.doesNotMatch(rules,/current categories are Standard, Direct, Lethal, and On-Going/i)
assert.match(rules,/A Deadly weapon lists damage as X \[Y\]/)
assert.match(rules,/reducing the Dual Wielding penalty to \[-1\]/)
assert.doesNotMatch(rules,/\"heading\": \"WARD GUARD\"/,'Ward Guard must be retired from current Talent rules')
assert.match(rules,/BEASTGRASP[\s\S]{0,700}total condition \[-4\]/)
assert.match(rules,/TURNSTRIKE[\s\S]{0,700}rounded up, to a minimum of \[\+1\]/)
assert.match(rules,/Cumulative from Rank 1/)
assert.match(rules,/Average XP per session:/)
assert.match(rules,/one smaller upgrade/i)
assert.match(rules,/two smaller upgrades or one larger upgrade/i)
assert.doesNotMatch(rules,/divide[^\n.]{0,80}by \[?6\]?/i,'obsolete six-Attribute Encounter Rating math remains in current rules')


const advancement=read('src/rules/advancementRules.ts')
assert.match(advancement,/averagePerSession:\[7,10\]/)
assert.match(advancement,/sparkAlignmentBonus:1/)
assert.match(rules,/Spark Alignment: Gain \[\+\$\{XP_GUIDANCE\.sparkAlignmentBonus\}\] bonus XP/)
assert.match(rules,/This bonus can be gained only once per session/)
assert.match(advancement,/if\(type==='attribute'\)return 4\+\(2\*rank\)/)
assert.match(advancement,/if\(type==='skill'\)return 4\+rank/)
assert.match(advancement,/if\(type==='new-skill'\)return 8/)
assert.match(advancement,/if\(type==='talent'\)return 12/)
assert.match(advancement,/if\(type==='magic'\)return 12\+\(4\*rank\)/)

const speciesSource=read('src/data/speciesData.ts')
assert.match(speciesSource,/STEADY_PACE_RULE=\{moveMaximumReduction:1,speedPenaltyReduction:2,minimumSpeed:2\}/)
assert.match(speciesSource,/Poised Reflex can be used only once per round/)
assert.match(speciesSource,/Double Lilly can be used only once per round/)
assert.match(speciesSource,/Cycle Of The Beast[\s\S]{0,700}health \[1\] or mana \[1\]/)
assert.match(speciesSource,/Thunderstep[\s\S]{0,700}maximum movement of Hero’s Charge by \[\+2\] squares/)
assert.match(speciesSource,/Thunderstep[\s\S]{0,900}suffers \[2\] lethal damage/)
assert.match(speciesSource,/Frostwalker[\s\S]{0,700}resistance \[\+2\] to Cold damage/)
assert.match(speciesSource,/Frostwalker[\s\S]{0,800}gain \[\+2\] Ward/)


const talentCategories=read('src/data/talentCategories.ts')
assert.match(talentCategories,/RETIRED_TALENTS=new Set\(\['Ward Guard'\]\)/)
assert.doesNotMatch(talentCategories,/assign\('Defensive',[^\n]*'Ward Guard'/)

const charOptions=read('src/data/characterOptions.ts')
const deadlyNames=['Shade Blade (Dagger)','Reedpipe (Blowpipe)']
for(const name of deadlyNames){
  const escaped=name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')
  const block=charOptions.match(new RegExp(`"name": "${escaped}"[\\s\\S]{0,500}?"detail": "([^"]+)"`))
  assert.ok(block,`missing ${name}`)
  assert.match(block[1],/^\d+ \[\d+\].*Deadly/,`${name} must use bracketed Deadly damage`)
}
assert.match(charOptions,/"name": "Club"[\s\S]{0,300}?"detail": "3 ·/)
assert.match(charOptions,/"name": "Brush Blade \(Short Sword\)"[\s\S]{0,300}?"detail": "4 ·/)
assert.match(charOptions,/"name": "Stonebreaker \(Warhammer\)"[\s\S]{0,300}?"detail": "5 \(7\) ·/)
assert.match(charOptions,/"name": "Thornspike \(Dart\)"[\s\S]{0,300}?"detail": "2 ·[\s\S]{0,120}?Penetration/)


const links=read('src/data/links.ts')
assert.match(links,/creator:'https:\/\/linktr\.ee\/AndreavnnTheOmniKing'/,'Creator Link must use the approved Linktree URL')
assert.match(links,/discordWidget:'https:\/\/discord\.com\/api\/guilds\/960273711372566589\/widget\.json'/,'Discord widget must use the approved server id')
const discordCommunity=read('src/services/discordCommunity.ts')
assert.match(discordCommunity,/presence_count/,'Discord community service must read the public widget presence count')
assert.match(discordCommunity,/approximate_member_count/,'Discord community service must resolve the total member count from public invite counts')
const news=read('src/views/NewsView.vue')
assert.equal((news.match(/class="news-promo-card card-surface"/g)||[]).length,3,'News must present exactly three social promo buttons')
for(const label of ['Discord','Share','Creator Link'])assert.match(news,new RegExp(`<strong>${label}</strong>`),`News promo title missing: ${label}`)
assert.match(news,/discordCountLabel/,'Discord count must render on the News Discord button')

const attrPanel=read('src/components/CharacterAttributePanel.vue')
assert.match(attrPanel,/minimumSpeed\?:number/,'CharacterAttributePanel must declare minimumSpeed')
assert.match(attrPanel,/minimumSpeed:1/,'CharacterAttributePanel must default minimumSpeed to 1')

console.log(`Brambleheart integrity checks passed for Site ${app} / Game Update ${game}.`)
