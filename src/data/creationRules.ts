export interface CultureSkillGrant {
  fixed: string[]
  choices: string[][]
  note?: string
}

// Culture-skill grants transcribed from the currently supplied Culture Trait effects.
// Character Creation still supplies the two Homeland Skills separately.
export const cultureSkillGrants: Record<string, CultureSkillGrant> = {
  'Ardenn::Hunters Intuition': { fixed:['Wayfinding'], choices:[['Awareness','Presence']] },
  'Auravex::Pathfinder’s Call': { fixed:['Wayfinding'], choices:[['Awareness','Herbalry']] },
  'Axalori::Tranquil Discipline': { fixed:['Lorekeeping','Herbalry'], choices:[] },
  'Braelor::Forge-Kin': { fixed:['Stonegrasp'], choices:[['Presence','Tradeskill (Blacksmithing)']] },
  'Cethra::Artisan’s Focus': { fixed:['Tumblecraft'], choices:[['Shadehand','Whisperster']] },
  'Hedgkin::Thicket Craft': { fixed:['Seeking','Herbalry'], choices:[['Lorekeeping','Wayfinding','Tradeskill']] },
  'Ravari::Jester Of Trade': { fixed:['Guile','Tumblecraft'], choices:[['Shadehand','Stonegrasp','Whisperster','Seeking','Wayfinding']] },
  'Rivkan::Social Savvy': { fixed:['Charm','Guile'], choices:[['Expression','Tradeskill','Seeking','Shadehand']] },
  'Sauren::Nomad’s Profession': { fixed:['Wayfinding','Bondcraft'], choices:[] },
  'Urnath::Rites Of The Deep Winter': { fixed:['Wayfinding'], choices:[['Lorekeeping','Presence']] },
  'Tordan::Memorybrew': { fixed:['Herbalry'], choices:[['Lorekeeping','Runecraft']] },
  'Virelan::Artisan’s Discipline': { fixed:['Runecraft'], choices:[['Lorekeeping','Charm']] },
}

export const speciesImagePaths: Record<string,string> = {
  Ardenn:'/assets/species/ardenn.png',
  Auravex:'/assets/species/auravex.png',
  Axalori:'/assets/species/axalori.png',
  Braelor:'/assets/species/braelor.png',
  Cethra:'/assets/species/cethra.png',
  Hedgkin:'/assets/species/hedgkin.png',
  Ravari:'/assets/species/ravari.png',
  Rivkan:'/assets/species/rivkan.png',
  Sauren:'/assets/species/sauren.png',
  Tordan:'/assets/species/tordan.png',
  Urnath:'/assets/species/urnath.png',
  Virelan:'/assets/species/virelan.png',
}

export const startingPathOptions = [
  {id:'magic',kicker:'WIND-TOUCHED',title:'Magic Level 1 + 1 Talent',description:'Attune to a Lore, gain its Signature Spell, choose starting Spells, then select one Talent.'},
  {id:'talents',kicker:'GIFTED HEART',title:'2 Talents',description:'Build around training, instinct, and practiced gifts by selecting two Talents.'},
  {id:'skills',kicker:'PRACTICED HAND',title:'2 New Skills + 1 Talent',description:'Learn two Skills you do not already know, then select one Talent.'},
  {id:'attribute',kicker:'TEMPERED FORM',title:'Attribute Point + 1 Talent',description:'Strengthen one Attribute, then select one Talent.'},
] as const

export type StartingPathId=(typeof startingPathOptions)[number]['id']
