import { ruleSourceDocuments } from '../data/rulesCurrent'

export interface NarrativeDetail {
  intro:string
  creed:string
  practices:string[]
  taboos:string[]
  signs:string
  conflictHook:string
  voice:string
  virtue:string
  strain:string
}

export function sourceNarrativeParagraphs(documentKey:string,heading:string){
  const doc=ruleSourceDocuments[documentKey]
  const section=doc?.sections.find(item=>item.heading.toLowerCase()===heading.toLowerCase())
  return section?.blocks.filter(block=>block.type==='paragraph').map(block=>block.type==='paragraph'?block.text.trim():'').filter(Boolean)||[]
}

export function sourceNarrativeDescription(documentKey:string,heading:string){
  return sourceNarrativeParagraphs(documentKey,heading)
    .filter(text=>!/^(Creed|Practices|Taboos|Signs|Conflict Hook|Voice|Virtue|Strain):?/i.test(text))
    .slice(0,3)
    .join(' ')
}

export function narrativeRuleDetail(documentKey:string,heading:string):NarrativeDetail{
  const detail:NarrativeDetail={intro:'',creed:'',practices:[],taboos:[],signs:'',conflictHook:'',voice:'',virtue:'',strain:''}
  const intro:string[]=[]
  let mode:'intro'|'practices'|'taboos'='intro'
  for(const raw of sourceNarrativeParagraphs(documentKey,heading)){
    const text=raw.trim()
    let match=text.match(/^Creed:\s*(.*)$/i);if(match){detail.creed=match[1].trim();mode='intro';continue}
    if(/^Practices:\s*$/i.test(text)){mode='practices';continue}
    if(/^Taboos:\s*$/i.test(text)){mode='taboos';continue}
    match=text.match(/^Signs:\s*(.*)$/i);if(match){detail.signs=match[1].trim();mode='intro';continue}
    match=text.match(/^Conflict Hook:\s*(.*)$/i);if(match){detail.conflictHook=match[1].trim();mode='intro';continue}
    match=text.match(/^Voice:\s*(.*)$/i);if(match){detail.voice=match[1].trim();mode='intro';continue}
    match=text.match(/^Virtue:\s*(.*)$/i);if(match){detail.virtue=match[1].trim();mode='intro';continue}
    match=text.match(/^Strain:\s*(.*)$/i);if(match){detail.strain=match[1].trim();mode='intro';continue}
    if(mode==='practices')detail.practices.push(text)
    else if(mode==='taboos')detail.taboos.push(text)
    else intro.push(text)
  }
  detail.intro=intro.join(' ')
  return detail
}
