import { APP_RELEASE } from './release'
export const BUILD=APP_RELEASE

export const attributes = [
  { id: 'agility', name: 'Agility', description: 'Motion & Balance' },
  { id: 'might', name: 'Might', description: 'Strength & Resolve' },
  { id: 'hide', name: 'Hide', description: 'Endurance & Defense' },
  { id: 'lore', name: 'Lore', description: 'Insight & Awareness' },
  { id: 'bravery', name: 'Bravery', description: 'Emotion & Will' },
] as const

export type AttributeId = (typeof attributes)[number]['id']

export const species = ['Auravex','Ardenn','Axalori','Braelor','Cethra','Hedgkin','Ravari','Rivkan','Sauren','Tordan','Urnath','Virelan'] as const

export const sparks = [
  ['Courageous','Bold, Driven'],['Protector','Compassionate, Steadfast'],['Wanderer','Adaptable, Curious'],
  ['Scholar','Studious, Reflective'],['Healer','Compassionate, Intuitive'],['Fighter','Bold, Focused'],
  ['Trickster','Playful, Defiant'],['Tinker','Inventive, Creative'],['Idealist','Hopeful, Driven'],
  ['Spiritual','Intuitive, Reflective'],['Artisan','Creative, Focused'],['Outsider','Independent, Cautious'],
  ['Leader','Charming, Driven'],['Defiant Heart','Defiant, Steadfast'],['Dreamer','Hopeful, Creative'],
  ['Seeker','Curious, Studious'],['Mediator','Charming, Compassionate'],['Pioneer','Adaptable, Bold'],
] as const

export const homelands = [
  { name:'Wandering Road', skills:['Guile','Charm'] },
  { name:'Tidewake Harbor', skills:['Seeking','Tradeskill'] },
  { name:'Ancient Towers', skills:['Lorekeeping (Ancients)','Awareness'] },
  { name:'Gloommere', skills:['Whisperster','Herbalry'] },
  { name:'Halerun Fields', skills:['Beastride','Stonegrasp'] },
  { name:'Deepmarket', skills:['Shadehand','Guile'] },
  { name:'Redmir Dunes', skills:['Wayfinding','Stonegrasp'] },
  { name:'Evershade', skills:['Awareness','Lorekeeping (Nature or Spirits)'] },
  { name:'Willowstead', skills:['Herbalry','Charm'] },
  { name:'Untamed Verge', skills:['Wayfinding','Presence'] },
] as const

export const faiths = ['Keepers of Old','Last Light','Living Harmony','Deepfather’s Covenant','Dawnborn Order','Ashen Path','Court of Etherium','Origin Prime','The Dreamtide','Feastbound Covenant','The Wayward Path'] as const

export const oaths = [
  ['Kinship','No heart beats alone.'],['Mercy','All wounds can heal, even those unseen.'],['Truth','The world turns false only when I do.'],
  ['Courage','Better to burn bright than fade cold.'],['Balance','For every step forward, one must listen to the earth.'],['Honor','My word is the weight I carry.'],
  ['Patience','To know is to listen first.'],['Renewal','What is broken can bloom again.'],['Wilds','Freedom is the truest law.'],
  ['Steadfast','The unseen watches, and I will not turn my eyes.'],['Justice','All debts must balance before the dusk.'],['Guardian','Between harm and heart, I will stand.'],
  ['Wisdom','Wisdom speaks only when it must.'],['Selflessness','Good done unseen still mends the world.'],['Inspiration','Hope is the flame I leave behind.'],
] as const

export const passiveTargets = [
  ['Easy',14],['Medium',18],['Difficult',22],['Hard',24],['Very Hard',30]
] as const
