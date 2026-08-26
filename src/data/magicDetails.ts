import { loreSpells } from './magicOptions'
import { ruleSourceDocuments } from './rulesSource'

export interface SpellDetail {
  name:string
  lore:string
  flavor:string
  rules:string
  manaCost:number|null
  keywords:string[]
}

const loreDocs:Record<string,string> = {
  Invocation:'lore-invocation',
  Flames:'lore-flames',
  Frost:'lore-frost',
  Hallows:'lore-hallows',
  Harmony:'lore-harmony',
  Life:'lore-life',
  Oath:'lore-oath',
  Wilds:'lore-wilds',
}

function normalize(value:string){
  return value.toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9]+/g,' ').trim()
}
function paragraphText(documentKey:string){
  return (ruleSourceDocuments[documentKey]?.sections||[])
    .flatMap(section=>section.blocks)
    .filter((block):block is {type:'paragraph';text:string}=>block.type==='paragraph')
    .map(block=>block.text.trim())
    .filter(Boolean)
}
function looksStructured(value:string){
  return /\b(?:COST|TRIGGER|DECLARE|DECLEAR|TARGET|EFFECT|RESTRICTIONS?|DURATION|EMPOWER|COOLDOWN|AFTERBURN|PURIFY|REQUIRES|KEYWORDS):/i.test(value)
}
function looksLikeStandaloneHeading(value:string){
  const text=value.trim()
  if(!text||text.length>80||looksStructured(text))return false
  const letters=text.replace(/[^A-Za-z]+/g,'')
  return letters.length>=3&&text===text.toUpperCase()
}
function parseKeywords(value:string){
  const matches=Array.from(value.matchAll(/\bKEYWORDS?:\s*([^]*?)(?=\b(?:COST|TRIGGER|DECLARE|DECLEAR|TARGET|EFFECT|RESTRICTIONS?|DURATION|EMPOWER|COOLDOWN|AFTERBURN|PURIFY|REQUIRES|KEYWORDS):|$)/gi))
  const match=matches.at(-1)
  return match ? match[1].split('|').map(item=>item.trim()).filter(Boolean) : []
}
function parseMana(value:string){
  const match=value.match(/\bCOST:\s*\[(\d+)\]\s*mana\b/i)
  return match ? Number(match[1]) : null
}

export const spellDetails:Record<string,SpellDetail> = {}
export const loreDescriptions:Record<string,string> = {}

for(const [lore,spellNames] of Object.entries(loreSpells)){
  const texts=paragraphText(loreDocs[lore])
  const spellTokens=new Map(spellNames.map(name=>[normalize(name),name]))
  const firstSpellIndex=texts.findIndex(text=>spellTokens.has(normalize(text)))

  if(lore==='Invocation'){
    loreDescriptions[lore]='Invocation Spells are practical magical workings available alongside a character’s chosen Lore.'
  }else{
    const candidates=(firstSpellIndex>0?texts.slice(0,firstSpellIndex):texts).filter(text=>!/^LORE OF /i.test(text))
    loreDescriptions[lore]=candidates.find(text=>text.length>45)||`The Lore of ${lore}.`
  }

  for(const name of spellNames){
    const index=texts.findIndex(text=>normalize(text)===normalize(name))
    if(index<0){
      spellDetails[name]={name,lore,flavor:'',rules:'',manaCost:null,keywords:[]}
      continue
    }
    const collected:string[]=[]
    for(let i=index+1;i<texts.length;i++){
      const text=texts[i]
      if(spellTokens.has(normalize(text))||looksLikeStandaloneHeading(text))break
      collected.push(text)
    }
    const flavor=collected.length&&!looksStructured(collected[0])?collected.shift()||'':''
    const rules=collected.join(' ').trim()
    spellDetails[name]={
      name,
      lore,
      flavor,
      rules,
      manaCost:parseMana(rules),
      keywords:parseKeywords(rules),
    }
  }
}
