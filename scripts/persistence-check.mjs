import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..')
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'brambleheart-persistence-'))
const compiled=path.join(temp,'compiled')
const store=path.join(temp,'local-storage.json')
fs.mkdirSync(compiled,{recursive:true})

function command(bin,args,options={}){
  const result=spawnSync(bin,args,{cwd:root,encoding:'utf8',...options})
  if(result.status!==0){
    process.stderr.write(result.stdout||'')
    process.stderr.write(result.stderr||'')
    throw new Error(`${bin} ${args.join(' ')} failed with ${result.status}`)
  }
  return result.stdout.trim()
}

// Compile only the dependency-independent persistence/rules graph. The full Vue build
// remains the responsibility of npm run check when project dependencies are available.
command('tsc',['--module','commonjs','--target','es2022','--moduleResolution','node','--esModuleInterop','--lib','es2022,dom','--skipLibCheck','--outDir',compiled,'src/services/characters.ts','src/services/encounters.ts','src/rules/rulesEngine.ts'])
fs.writeFileSync(path.join(compiled,'package.json'),'{"type":"commonjs"}\n')

const worker=path.join(temp,'worker.cjs')
fs.writeFileSync(worker,String.raw`
const fs=require('node:fs')
const path=require('node:path')
const storePath=process.env.BH_STORE
function readStore(){try{return JSON.parse(fs.readFileSync(storePath,'utf8'))}catch{return{}}}
function writeStore(value){fs.writeFileSync(storePath,JSON.stringify(value))}
global.localStorage={
  get length(){return Object.keys(readStore()).length},
  key(index){return Object.keys(readStore())[index]??null},
  getItem(key){const data=readStore();return Object.prototype.hasOwnProperty.call(data,key)?data[key]:null},
  setItem(key,value){const data=readStore();data[key]=String(value);writeStore(data)},
  removeItem(key){const data=readStore();delete data[key];writeStore(data)},
  clear(){writeStore({})},
}
const chars=require(path.join(process.env.BH_COMPILED,'services/characters.js'))
const engine=require(path.join(process.env.BH_COMPILED,'rules/rulesEngine.js'))
const storage=require(path.join(process.env.BH_COMPILED,'services/storage.js'))
const encounters=require(path.join(process.env.BH_COMPILED,'services/encounters.js'))
const phase=process.argv[2]
const record={
 id:'persist-tordan',name:'Persistence Tordan',species:'Tordan',spark:'Courageous',homeland:'Test',faith:'Test',oath:'Test',path:'talents',
 attributes:{agility:1,might:2,hide:2,lore:2,bravery:3},skills:[],talents:['Ward Guard'],spells:[],equipment:[
   {name:'Root Weave',category:'Armor & Shield',costSp:999,detail:'2+ · +99 · +99 · -99 · 999 lb.',equipped:true},
   {name:'Totem',category:'Trinket',costSp:999,detail:'Stealth Penalty -99',equipped:true}
 ],creationComplete:true,status:'unapproved',draft:false,locked:false,createdAt:'2026-09-09T00:00:00.000Z'
}
if(phase==='write'){
  const result=chars.writeCharacters([record]);if(!result.ok)throw new Error(result.message)
  global.localStorage.setItem(storage.STORAGE_KEYS.premadeCharactersSeeded,'1')
  console.log('WRITE_OK')
}else if(phase==='read'){
  const list=chars.loadCharacters();if(list.length!==1)throw new Error('character count changed')
  const c=list[0];if(c.species!=='Tordan'||c.status!=='unapproved')throw new Error('core character state did not persist')
  if(c.talents.includes('Ward Guard'))throw new Error('retired Ward Guard survived normalization')
  const armor=c.equipment.find(x=>x.name==='Root Weave');if(!armor||armor.costWp!==700||!armor.detail.includes('+3')||!armor.detail.includes('-2'))throw new Error('current armor authority was not restored on reload')
  const trinket=c.equipment.find(x=>x.name==='Caster Totem');if(!trinket||trinket.costWp!==300)throw new Error('legacy equipment alias did not normalize on reload')
  const penalty=engine.equipmentSpeedPenalty(c.equipment,true)
  const speed=engine.derivedStats(c.attributes,0,0,penalty,engine.speciesMinimumSpeed(c.species)).speed
  if(penalty!==0||speed!==4)throw new Error('Tordan Speed persistence mismatch: penalty='+penalty+', speed='+speed)
  console.log('READ_OK')
}else if(phase==='approve'){
  const result=chars.setCharacterApproval('persist-tordan',true);if(!result.ok)throw new Error(result.message);console.log('APPROVE_OK')
}else if(phase==='verify-approval'){
  const c=chars.loadCharacters()[0];if(!c||c.status!=='approved'||chars.characterStatus(c)!=='approved')throw new Error('approval did not survive reload');console.log('APPROVAL_OK')
}else if(phase==='premade-seed'){
  global.localStorage.clear()
  const list=chars.loadCharacters();if(list.length!==1)throw new Error('premade seed count mismatch')
  const selu=list[0];if(selu.id!=='premade-selu'||selu.name!=='Selu of the Wandering Reeds'||selu.status!=='approved'||selu.creationComplete!==true||selu.exampleCharacter!==true)throw new Error('Selu premade seed is incomplete')
  if(global.localStorage.getItem(storage.STORAGE_KEYS.premadeCharactersSeeded)!=='1')throw new Error('premade seed marker missing')
  const result=chars.writeCharacters([]);if(!result.ok)throw new Error(result.message)
  console.log('PREMADE_SEEDED_AND_DELETED')
}else if(phase==='premade-delete-reload'){
  const list=chars.loadCharacters();if(list.length!==0)throw new Error('deleted premade character returned after reload')
  console.log('PREMADE_DELETE_PERSISTED')
}else if(phase==='encounter-write'){
  const saved=encounters.upsertEncounter(encounters.loadEncounters(),{id:'persist-encounter',name:'Persistence Encounter',objective:'Hold the bridge',partyCharacterIds:['legacy-character'],opponents:[{name:'Ghoul Pack',quantity:2}],environment:'Mire crossing',notes:'Regression check',createdAt:'2026-09-11T00:00:00.000Z',updatedAt:'2026-09-11T00:00:00.000Z'});if(!saved.result.ok)throw new Error(saved.result.message)
  console.log('ENCOUNTER_WRITE_OK')
}else if(phase==='encounter-read'){
  const list=encounters.loadEncounters();if(list.length!==1)throw new Error('encounter count changed')
  const encounter=list[0];if(encounter.id!=='persist-encounter'||encounter.opponents[0]?.quantity!==2||encounter.environment!=='Mire crossing')throw new Error('encounter state did not persist')
  console.log('ENCOUNTER_READ_OK')
}else if(phase==='legacy-seed'){
  const legacy={...record,id:'legacy-character',name:'Legacy Character',skills:['Whisperstep'],skillRanks:{Whisperstep:2},spells:['Smolder','Fire Bolt'],equipment:[{name:'Caster’s Totem',category:'Trinket',costSp:99,detail:'Stealth Condition -2'}],wealthRemaining:30,wealthCurrency:'SP',startingWealth:30,status:undefined,locked:true,creationComplete:undefined,draft:false}
  global.localStorage.setItem(storage.STORAGE_KEYS.characters,JSON.stringify([legacy]));console.log('LEGACY_SEEDED')
}else if(phase==='legacy-read'){
  const c=chars.loadCharacters()[0];if(!c||c.id!=='legacy-character')throw new Error('legacy character missing')
  if(!c.skills.includes('Whisperster')||c.skillRanks.Whisperster!==2)throw new Error('legacy Skill did not migrate')
  if(c.spells.includes('Smolder'))throw new Error('retired Spell survived migration')
  if(!c.spells.includes('Fire Bolt'))throw new Error('current Spell lost during migration')
  if(c.equipment[0]?.name!=='Caster Totem')throw new Error('legacy equipment name did not migrate')
  if(c.status!=='approved'||c.creationComplete!==true||c.draft!==false)throw new Error('legacy status did not normalize')
  console.log('LEGACY_OK')
}else throw new Error('unknown phase')
`)

const env={...process.env,BH_STORE:store,BH_COMPILED:compiled}
for(const phase of ['write','read','approve','verify-approval','premade-seed','premade-delete-reload','legacy-seed','legacy-read','encounter-write','encounter-read'])command(process.execPath,[worker,phase],{env})

// Directly exercise the minimum-Speed boundary with a penalty that would otherwise reduce Speed below 2.
const speedScript=`const e=require(${JSON.stringify(path.join(compiled,'rules/rulesEngine.js'))}); const a={agility:1,might:1,hide:1,lore:1,bravery:1}; const p=e.equipmentSpeedPenalty([{name:'x',category:'Armor & Shield',detail:'0 · 0 · 0 · -5 · 0 lb.',equipped:true}],true); const s=e.derivedStats(a,0,0,p,e.speciesMinimumSpeed('Tordan')).speed; if(p!==-3||s!==2)process.exit(2); console.log('STEADY_PACE_MIN_OK')`
command(process.execPath,['-e',speedScript])

fs.rmSync(temp,{recursive:true,force:true})
console.log('Brambleheart persistence regression checks passed.')
