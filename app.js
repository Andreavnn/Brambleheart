import { BUILD, attributes, species, sparks, homelands, faiths, oaths, passiveTargets, ruleChapters } from './data.js'
import { rhythmResult, opposedResult, damageResult, healthPenalty, advancementCost } from './rules-engine.js'

const $app = document.querySelector('#app')
const STORE = { characters:'bh-v01-characters', settings:'bh-v01-settings' }

function readJson(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback } }
function writeJson(key, value) { localStorage.setItem(key, JSON.stringify(value)) }
function esc(value='') { return String(value).replace(/[&<>'"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m])) }
function id() { return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}` }
function die() { const buf = new Uint32Array(1); crypto.getRandomValues(buf); return (buf[0] % 10) + 1 }
function roll(count) { return Array.from({length:count}, die) }

let settings = readJson(STORE.settings, { theme:'system', text:'medium', compact:false })
function applySettings() {
  const dark = settings.theme === 'dark' || (settings.theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  document.documentElement.dataset.text = settings.text
  document.documentElement.dataset.compact = settings.compact ? 'true' : 'false'
}
applySettings()

const fileMode = location.protocol === 'file:'
function currentPath() { return fileMode ? (location.hash.slice(1) || '/characters') : location.pathname }
function navigate(path) { if (fileMode) { location.hash = path; return } history.pushState({}, '', path); render() }
window.addEventListener(fileMode ? 'hashchange' : 'popstate', render)
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[data-route]')
  if (!link) return
  event.preventDefault(); navigate(link.getAttribute('href'))
})

function header() {
  const path = currentPath()
  const nav = [['/characters','Character List'],['/rules','Rules'],['/simulator','Simulator'],['/settings','Settings']]
  return `<header class="app-header-wrap">
    <div class="wip-banner">Bramble Heart is a work in progress. v0.1 reflects the current uploaded rules and preserves unresolved source terminology.</div>
    <div class="app-header">
      <span class="header-spacer"></span>
      <a data-route href="/characters" class="brand-stack brand" aria-label="Bramble Heart Character List">
        <span class="brand-wordmark"><span>BRAMBLE</span><span class="brand-heart"> HEART</span></span>
        <small>ALPHA BUILD ${BUILD}</small>
      </a>
      <button class="icon-button" type="button" id="quick-theme" aria-label="Toggle theme" title="Toggle theme">◐</button>
    </div>
    <nav class="primary-nav" aria-label="Primary navigation">
      ${nav.map(([href,label]) => `<a data-route href="${href}" class="${path.startsWith(href)?'active':''}">${label}</a>`).join('')}
    </nav>
  </header>`
}

function shell(content) {
  $app.innerHTML = `<div class="app-shell"><main class="page">${header()}${content}</main><footer class="app-footer">Bramble Heart · Alpha Build ${BUILD} · Local-first prototype</footer></div>`
  document.querySelector('#quick-theme')?.addEventListener('click', () => {
    const currentDark = document.documentElement.dataset.theme === 'dark'
    settings.theme = currentDark ? 'light' : 'dark'; writeJson(STORE.settings, settings); applySettings()
  })
}

function titleBlock(eyebrow, title, copy) { return `<div class="page-title-block"><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p>${copy}</p></div>` }
function emptyState(icon, title, copy, action='') { return `<section class="empty-state card-surface"><div class="empty-icon">${icon}</div><h2>${title}</h2><p>${copy}</p>${action}</section>` }

function characterSummary(character) {
  const spark = sparks.find(s => s[0] === character.spark)
  const home = homelands.find(h => h.name === character.homeland)
  return `<article class="saved-card card-surface" data-character="${character.id}">
    <button class="card-main" data-toggle-character="${character.id}">
      <div><strong>${esc(character.name)}</strong><div class="chip-row"><span class="chip">${esc(character.species)}</span><span class="chip">${esc(character.spark)}</span><span class="chip">${esc(character.homeland)}</span></div></div>
      <div class="card-meta"><strong>${character.magicPath === 'magic' ? 'Magic 1 · 1 Talent' : '2 Talents'}</strong><small>${esc(spark?.[1] || '')}</small></div>
    </button>
    <div class="character-detail" hidden id="detail-${character.id}">
      <div class="stat-grid five">${attributes.map(a => `<div class="stat-circle"><span class="stat-value">${character.attributes[a.id]}</span><span class="stat-label">${a.name.slice(0,3).toUpperCase()}</span></div>`).join('')}</div>
      <div class="detail-grid"><div><span>Faith</span><strong>${esc(character.faith)}</strong></div><div><span>Oath</span><strong>${esc(character.oath)}</strong></div><div><span>Starting Skills</span><strong>${esc(home?.skills.join(' · ') || '—')}</strong></div><div><span>Starting Wealth</span><strong>50 sp + Adventure Kit</strong></div></div>
      <div class="derived-note"><strong>Reliable v0.1 derived values:</strong> Mettle ${character.attributes.might*2}, Ward ${character.attributes.hide*2}, Control ${character.attributes.lore*2}, Power ${character.attributes.might}, Guts ${character.attributes.hide}. <span>Speed is not auto-derived because current source chapters use both Agility and Prowess terminology.</span></div>
      <div class="row-actions"><button class="secondary-button" data-export-character="${character.id}">Export JSON</button><button class="danger-button" data-delete-character="${character.id}">Delete</button></div>
    </div>
  </article>`
}

function renderCharacters() {
  const characters = readJson(STORE.characters, [])
  shell(`${titleBlock('CHARACTERS','Character List','Create and manage Bramble Heart characters on this device. v0.1 stores characters locally and can export them as JSON.')}
    <section class="launch-card card-surface"><div><strong>My Characters</strong><p>${characters.length ? `${characters.length} saved character${characters.length===1?'':'s'}.` : 'No saved characters yet.'}</p></div><div class="launch-actions"><button class="primary-button" id="create-character">Create a character</button><button class="secondary-button" id="import-character">Import JSON</button><input id="character-file" type="file" accept="application/json,.json" hidden></div></section>
    <div id="character-form"></div>
    ${characters.length ? `<section class="saved-stack">${characters.map(characterSummary).join('')}</section>` : emptyState('✦','Your characters will appear here','Use the character creator to establish species, Spark, Homeland, Faith, Oath, attributes, and the Body & Spirit choice.')}`)

  document.querySelector('#create-character')?.addEventListener('click', renderCharacterForm)
  document.querySelectorAll('[data-toggle-character]').forEach(btn => btn.addEventListener('click', () => { const d=document.querySelector(`#detail-${btn.dataset.toggleCharacter}`); d.hidden=!d.hidden }))
  document.querySelectorAll('[data-delete-character]').forEach(btn => btn.addEventListener('click', () => { if (!confirm('Delete this character from this device?')) return; writeJson(STORE.characters, characters.filter(c => c.id !== btn.dataset.deleteCharacter)); renderCharacters() }))
  document.querySelectorAll('[data-export-character]').forEach(btn => btn.addEventListener('click', () => { const c=characters.find(x=>x.id===btn.dataset.exportCharacter); downloadJson(`${c.name.replace(/[^a-z0-9]+/gi,'-').toLowerCase() || 'character'}.bramble.json`, { format:'bramble-heart-character', version:BUILD, character:c }) }))
  document.querySelector('#import-character')?.addEventListener('click', () => document.querySelector('#character-file').click())
  document.querySelector('#character-file')?.addEventListener('change', importCharacter)
}

function renderCharacterForm() {
  const host = document.querySelector('#character-form')
  const attr = Object.fromEntries(attributes.map(a => [a.id,1]))
  host.innerHTML = `<section class="form-card character-form"><div class="form-heading"><div><p class="eyebrow">NEW CHARACTER</p><h2>Create Character</h2></div><button class="icon-button" id="close-character" aria-label="Close">×</button></div>
    <div class="field-grid two"><label class="field-label">Name<input class="field-control" id="c-name" placeholder="Character name" /></label><label class="field-label">Species<select class="field-control" id="c-species">${species.map(s=>`<option>${s}</option>`).join('')}</select></label></div>
    <div class="field-grid two"><label class="field-label">Spark<select class="field-control" id="c-spark">${sparks.map(s=>`<option value="${s[0]}">${s[0]} — ${s[1]}</option>`).join('')}</select></label><label class="field-label">Homeland<select class="field-control" id="c-homeland">${homelands.map(h=>`<option>${h.name}</option>`).join('')}</select></label></div>
    <div class="field-grid two"><label class="field-label">Faith<select class="field-control" id="c-faith">${faiths.map(x=>`<option>${x}</option>`).join('')}</select></label><label class="field-label">Oath<select class="field-control" id="c-oath">${oaths.map(x=>`<option value="${x[0]}">${x[0]} — ${x[1]}</option>`).join('')}</select></label></div>
    <div><div class="section-label-row"><strong>Attributes</strong><span id="attr-points">5 points remaining</span></div><p class="form-note left">Each starts at rank 1. Spend 5 points; no attribute may exceed rank 3 at creation.</p><div class="attribute-editor">${attributes.map(a=>`<div class="attribute-row"><div><strong>${a.name}</strong><small>${a.description}</small></div><div class="stepper"><button data-attr="${a.id}" data-delta="-1">−</button><span id="attr-${a.id}">1</span><button data-attr="${a.id}" data-delta="1">+</button></div></div>`).join('')}</div></div>
    <fieldset class="choice-field"><legend>Rhythm of Body & Spirit</legend><label><input type="radio" name="path" value="magic" checked /> Magic Level 1 + 1 Talent</label><label><input type="radio" name="path" value="talents" /> 2 Talents</label></fieldset>
    <div class="source-note">Species trait details and Talent selection are intentionally deferred in v0.1 because their full structured data has not yet been normalized from the uploaded layouts.</div>
    <div class="form-actions"><button class="secondary-button" id="cancel-character">Cancel</button><button class="primary-button" id="save-character">Save Character</button></div><p class="error-text" id="character-error"></p>
  </section>`
  let ranks = {...attr}
  const update = () => { const spent=Object.values(ranks).reduce((s,v)=>s+(v-1),0); document.querySelector('#attr-points').textContent=`${5-spent} points remaining`; attributes.forEach(a=>document.querySelector(`#attr-${a.id}`).textContent=ranks[a.id]) }
  host.querySelectorAll('[data-attr]').forEach(btn => btn.addEventListener('click', () => { const k=btn.dataset.attr, delta=Number(btn.dataset.delta), spent=Object.values(ranks).reduce((s,v)=>s+(v-1),0); if(delta>0 && (ranks[k]>=3 || spent>=5)) return; if(delta<0 && ranks[k]<=1) return; ranks[k]+=delta; update() }))
  const close=()=>{host.innerHTML=''}; document.querySelector('#close-character').onclick=close; document.querySelector('#cancel-character').onclick=close
  document.querySelector('#save-character').onclick=()=>{
    const name=document.querySelector('#c-name').value.trim(), spent=Object.values(ranks).reduce((s,v)=>s+(v-1),0)
    if(!name){document.querySelector('#character-error').textContent='Enter a character name.'; return}
    if(spent!==5){document.querySelector('#character-error').textContent='Spend all 5 attribute points before saving.'; return}
    const list=readJson(STORE.characters,[])
    list.unshift({id:id(),name,species:document.querySelector('#c-species').value,spark:document.querySelector('#c-spark').value,homeland:document.querySelector('#c-homeland').value,faith:document.querySelector('#c-faith').value,oath:document.querySelector('#c-oath').value,magicPath:document.querySelector('input[name="path"]:checked').value,attributes:ranks,createdAt:new Date().toISOString()})
    writeJson(STORE.characters,list); renderCharacters()
  }
  document.querySelector('#c-name').focus()
}

async function importCharacter(event) {
  const file=event.target.files?.[0]; if(!file)return
  try {
    const data=JSON.parse(await file.text()); const c=data.character ?? data
    if(!c?.name || !c?.attributes) throw new Error('Invalid Bramble Heart character JSON.')
    const list=readJson(STORE.characters,[]); list.unshift({...c,id:id(),createdAt:new Date().toISOString()}); writeJson(STORE.characters,list); renderCharacters()
  } catch(error) { alert(error.message || 'Could not import this character.') }
}
function downloadJson(filename, value) { const blob=new Blob([JSON.stringify(value,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=filename; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),500) }

function renderRules() {
  shell(`${titleBlock('REFERENCE','Rules','Browse the current Bramble Heart rule structure. Search works across chapter titles, summaries, and loaded v0.1 rule text.')}
    <label class="search-bar"><span>⌕</span><input id="rule-search" placeholder="Search rules…" autocomplete="off" /></label>
    <div class="status-key"><span class="chip interactive">Interactive text</span><span class="chip">Indexed</span><span class="chip toc">TOC only</span></div>
    <section class="section-stack" id="rules-list">${renderRuleCards(ruleChapters)}</section>`)
  const input=document.querySelector('#rule-search'); input.addEventListener('input',()=>{const q=input.value.trim().toLowerCase(); const filtered=ruleChapters.filter(c=>JSON.stringify(c).toLowerCase().includes(q)); document.querySelector('#rules-list').innerHTML=filtered.length?renderRuleCards(filtered):emptyState('⌕','No matching rules','Try a different word or chapter title.'); bindRuleCards()}); bindRuleCards()
}
function renderRuleCards(chapters) { return chapters.map(c=>`<article class="section-card" id="rule-${c.id}"><button class="section-heading" data-rule-toggle="${c.id}"><div><span class="eyebrow">${c.eyebrow}</span><strong>${c.title}</strong><small>${c.summary}</small></div><span class="rule-status ${c.status}">${c.status==='toc'?'TOC':c.status==='interactive'?'LOADED':'INDEXED'}</span></button><div class="section-content" hidden>${c.sections.map(([t,b])=>`<div class="rule-row"><strong>${esc(t)}</strong><p>${esc(b)}</p></div>`).join('')}</div></article>`).join('') }
function bindRuleCards(){document.querySelectorAll('[data-rule-toggle]').forEach(btn=>btn.addEventListener('click',()=>{const card=btn.closest('.section-card'),content=card.querySelector('.section-content'); content.hidden=!content.hidden; card.classList.toggle('open',!content.hidden)}))}

function renderSimulator() {
  shell(`${titleBlock('TOOLS','Simulator','Run common Bramble Heart calculations without changing any character data. Dice are generated locally with the browser cryptographic random source.')}
    <div class="segment-tabs" role="tablist"><button class="segment-tab active" data-sim-tab="rhythm">Rhythm</button><button class="segment-tab" data-sim-tab="opposed">Strike / Ward</button><button class="segment-tab" data-sim-tab="damage">Damage</button><button class="segment-tab" data-sim-tab="health">Health / XP</button></div>
    <div id="sim-panel"></div>`)
  document.querySelectorAll('[data-sim-tab]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-sim-tab]').forEach(x=>x.classList.toggle('active',x===btn)); renderSimPanel(btn.dataset.simTab)})); renderSimPanel('rhythm')
}
function renderSimPanel(tab) {
  const host=document.querySelector('#sim-panel')
  if(tab==='rhythm') {
    host.innerHTML=`<section class="sim-card card-surface"><div class="sim-heading"><div><p class="eyebrow">THE RHYTHM ENGINE</p><h2>3d10 + Stat</h2></div></div><div class="field-grid three"><label class="field-label">Roll Type<select id="rhythm-mode" class="field-control"><option value="normal">Normal — 3d10</option><option value="edged">Edged — 4d10, drop lowest</option><option value="weighted">Weighted — 4d10, drop highest</option></select></label><label class="field-label">Stat<input id="rhythm-stat" class="field-control" type="number" value="0" /></label><label class="field-label">Conditions<input id="rhythm-cond" class="field-control" type="number" value="0" /></label></div><label class="field-label">Passive Target<select id="rhythm-target" class="field-control"><option value="">No target</option>${passiveTargets.map(([n,v])=>`<option value="${v}">${n} — ${v}</option>`).join('')}</select></label><button class="primary-button wide" id="roll-rhythm">Roll Rhythm</button><div id="rhythm-result" class="result-panel muted-result">Ready.</div></section>`
    document.querySelector('#roll-rhythm').onclick=()=>{const mode=document.querySelector('#rhythm-mode').value, count=mode==='normal'?3:4, r=rhythmResult(roll(count),mode,document.querySelector('#rhythm-stat').value,document.querySelector('#rhythm-cond').value), target=Number(document.querySelector('#rhythm-target').value)||null; document.querySelector('#rhythm-result').classList.remove('muted-result'); document.querySelector('#rhythm-result').innerHTML=`<div class="dice-row">${r.rolled.map(v=>`<span class="die ${r.dropped===v && r.rolled.filter(x=>x===v).length===1?'dropped':''}">${v}</span>`).join('')}</div><strong>Total ${r.total}</strong><small>${r.natural} dice + ${r.stat} stat ${r.conditions>=0?'+':'−'} ${Math.abs(r.conditions)} conditions${r.dropped!==null?` · dropped ${r.dropped}`:''}</small>${target?`<div class="outcome ${r.total>=target?'pass':'fail'}">${r.total>=target?'SUCCESS':'FAILURE'} vs ${target}</div>`:''}`}
  } else if(tab==='opposed') {
    host.innerHTML=`<section class="sim-card card-surface"><p class="eyebrow">ACTIVE TARGET</p><h2>Strike vs Ward</h2><p class="sim-copy">The strike hits only when the Strike total is higher than the Ward total. Equal results are defended.</p><div class="field-grid two"><div class="sub-card"><strong>Strike</strong><label class="field-label">Strike Stat<input id="strike-stat" type="number" value="0" class="field-control" /></label><label class="field-label">Conditions<input id="strike-cond" type="number" value="0" class="field-control" /></label></div><div class="sub-card"><strong>Ward</strong><label class="field-label">Ward Stat<input id="ward-stat" type="number" value="0" class="field-control" /></label><label class="field-label">Conditions<input id="ward-cond" type="number" value="0" class="field-control" /></label></div></div><button class="primary-button wide" id="roll-opposed">Roll Opposed Test</button><div id="opposed-result" class="result-panel muted-result">Ready.</div></section>`
    document.querySelector('#roll-opposed').onclick=()=>{const r=opposedResult(roll(3),document.querySelector('#strike-stat').value,document.querySelector('#strike-cond').value,roll(3),document.querySelector('#ward-stat').value,document.querySelector('#ward-cond').value); const e=document.querySelector('#opposed-result'); e.classList.remove('muted-result'); e.innerHTML=`<div class="opposed-results"><div><span>STRIKE</span><strong>${r.strike.total}</strong><small>${r.strike.rolled.join(' + ')}</small></div><div><span>WARD</span><strong>${r.ward.total}</strong><small>${r.ward.rolled.join(' + ')}</small></div></div><div class="outcome ${r.hit?'pass':'fail'}">${r.hit?'HIT':'DEFENDED'}</div>`}
  } else if(tab==='damage') {
    host.innerHTML=`<section class="sim-card card-surface"><p class="eyebrow">DAMAGE & GUTS</p><h2>Damage Soak</h2><p class="sim-copy">Hide/Guts, equipment, and conditions are kept separate so Direct and Lethal damage can follow the current source order.</p><div class="field-grid two"><label class="field-label">Incoming Damage<input id="damage" type="number" min="0" value="8" class="field-control" /></label><label class="field-label">Category<select id="damage-category" class="field-control"><option value="standard">Standard</option><option value="direct">Direct</option><option value="lethal">Lethal</option></select></label><label class="field-label">Hide / Base Guts<input id="guts-base" type="number" min="0" value="2" class="field-control" /></label><label class="field-label">Equipment Guts<input id="guts-gear" type="number" min="0" value="1" class="field-control" /></label><label class="field-label">Guts Conditions<input id="guts-cond" type="number" value="0" class="field-control" /></label></div><button class="primary-button wide" id="calc-damage">Calculate Damage</button><div id="damage-result" class="result-panel muted-result">Ready.</div></section>`
    document.querySelector('#calc-damage').onclick=()=>{const r=damageResult(document.querySelector('#damage').value,document.querySelector('#damage-category').value,document.querySelector('#guts-base').value,document.querySelector('#guts-gear').value,document.querySelector('#guts-cond').value); const e=document.querySelector('#damage-result'); e.classList.remove('muted-result'); e.innerHTML=`<div class="math-result"><strong>${r.incoming}</strong><span>damage</span><b>−</b><strong>${r.guts}</strong><span>effective Guts</span><b>=</b><strong>${r.suffered}</strong><span>Health lost</span></div>`}
  } else {
    host.innerHTML=`<div class="tool-stack"><section class="sim-card card-surface"><p class="eyebrow">HEALTH</p><h2>Health Threshold</h2><div class="field-grid two"><label class="field-label">Current Health<input id="health" type="number" min="0" max="30" value="30" class="field-control" /></label><div id="health-result" class="inline-result">No roll penalty.</div></div><button class="secondary-button wide" id="hallows-roll">Roll Hallows Save (1d10)</button><div id="hallows-result" class="mini-result">Used when a defeated character is at 0 Health.</div></section><section class="sim-card card-surface"><p class="eyebrow">ADVANCEMENT</p><h2>XP Cost</h2><div class="field-grid two"><label class="field-label">Advancement<select id="xp-type" class="field-control"><option value="attribute">Attribute Rank</option><option value="skill">Skill Rank</option><option value="new-skill">New Skill</option><option value="talent">New Talent</option><option value="magic">Magic Level</option></select></label><label class="field-label">Current Rank / Level<input id="xp-rank" type="number" min="0" value="1" class="field-control" /></label></div><div id="xp-result" class="result-panel"><strong>${advancementCost('attribute',1)} XP</strong></div></section></div>`
    const updateHealth=()=>{const h=Number(document.querySelector('#health').value),p=healthPenalty(h),e=document.querySelector('#health-result'); e.textContent=h<=0?'Defeated — Hallows saves begin.':p?`${p} condition to all dice rolls.`:'No roll penalty.'; e.className=`inline-result ${h<=0||p?'danger-text':'good-text'}`}; document.querySelector('#health').oninput=updateHealth; document.querySelector('#hallows-roll').onclick=()=>{const v=die(); document.querySelector('#hallows-result').innerHTML=`Rolled <strong>${v}</strong> — ${v>=6?'PASS':'FATE MARK'}`}; const updateXp=()=>document.querySelector('#xp-result').innerHTML=`<strong>${advancementCost(document.querySelector('#xp-type').value,document.querySelector('#xp-rank').value)} XP</strong>`; document.querySelector('#xp-type').onchange=updateXp; document.querySelector('#xp-rank').oninput=updateXp
  }
}

function renderSettings() {
  shell(`${titleBlock('PREFERENCES','Settings','Display preferences are stored on this device. Character data remains local unless you export it.')}
    <section class="settings-card"><div class="setting-row"><div><strong>Appearance</strong><small>Follow the system theme or choose a fixed mode.</small></div><select id="setting-theme" class="small-control"><option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option></select></div><div class="setting-row"><div><strong>Text Size</strong><small>Adjust interface text without changing rules data.</small></div><select id="setting-text" class="small-control"><option value="small">Small</option><option value="medium">Medium</option><option value="large">Large</option></select></div><div class="setting-row"><div><strong>Compact Cards</strong><small>Reduce card spacing on smaller displays.</small></div><label class="switch"><input id="setting-compact" type="checkbox"/><span></span></label></div></section>
    <section class="settings-card"><div class="setting-row"><div><strong>Local Character Data</strong><small>Delete all characters stored by this v0.1 build.</small></div><button class="danger-button" id="reset-characters">Reset Characters</button></div><div class="setting-row"><div><strong>Reset App</strong><small>Restore settings and clear all locally stored Bramble Heart v0.1 data.</small></div><button class="danger-button" id="reset-all">Reset All</button></div></section>
    <section class="info-card"><p class="eyebrow">BUILD</p><h2>Alpha ${BUILD}</h2><p>Initial Bramble Heart companion build: Character List, searchable Rules, Rhythm/Combat Simulator, and persistent Settings. Source data is based only on the current project uploads and unresolved naming conflicts remain marked rather than silently reconciled.</p></section>`)
  document.querySelector('#setting-theme').value=settings.theme; document.querySelector('#setting-text').value=settings.text; document.querySelector('#setting-compact').checked=settings.compact
  const save=()=>{settings={theme:document.querySelector('#setting-theme').value,text:document.querySelector('#setting-text').value,compact:document.querySelector('#setting-compact').checked}; writeJson(STORE.settings,settings); applySettings()}; document.querySelector('#setting-theme').onchange=save; document.querySelector('#setting-text').onchange=save; document.querySelector('#setting-compact').onchange=save
  document.querySelector('#reset-characters').onclick=()=>{if(confirm('Delete every Bramble Heart character stored on this device?')){localStorage.removeItem(STORE.characters); alert('Character data cleared.')}}
  document.querySelector('#reset-all').onclick=()=>{if(confirm('Reset all Bramble Heart v0.1 local data?')){localStorage.removeItem(STORE.characters);localStorage.removeItem(STORE.settings);settings={theme:'system',text:'medium',compact:false};applySettings();renderSettings()}}
}

function render() {
  let path=currentPath()
  if(!fileMode && (path==='/'||path==='/index.html')) { history.replaceState({},'', '/characters'); path='/characters' }
  if(path.startsWith('/rules')) renderRules(); else if(path.startsWith('/simulator')) renderSimulator(); else if(path.startsWith('/settings')) renderSettings(); else renderCharacters()
}

render()
