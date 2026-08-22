export interface CultureSkillGrant {
  fixed: string[]
  choices: string[][]
  note?: string
}

// These grants are transcribed from the current Culture Trait effects. Character Creation itself
// provides two Homeland Skills at Rank 1; there is no separate creation Skill-point pool in the supplied rules.
export const cultureSkillGrants: Record<string, CultureSkillGrant> = {
  'Ardenn::Hunters Intuition': { fixed:['Wayfinding'], choices:[['Awareness','Presence']] },
  'Auravex::Pathfinder’s Call': { fixed:['Wayfinding'], choices:[['Awareness','Herbalry']] },
  'Axalori::Tranquil Discipline': { fixed:['Lorekeeping','Herbalry'], choices:[] },
  'Braelor::Forge-Kin': { fixed:['Stonegrasp'], choices:[['Presence','Crafting (Blacksmithing)']] },
  'Cethra::Artisan’s Focus': { fixed:['Tumblecraft'], choices:[['Shadehand','Whisperster']] },
  'Hedgkin::Thicket Craft': { fixed:['Seeking','Herbalry'], choices:[['Lorekeeping','Wayfinding','Tradeskill']], note:'The Culture Trait source uses “Tradecraft”; the current Skills list names the skill “Tradeskill”.' },
  'Ravari::Jester Of Trade': { fixed:['Guile','Tumblecraft'], choices:[['Shadehand','Stonegrasp','Whisperster','Seeking','Wayfinding']] },
  'Rivkan::Social Savvy': { fixed:['Charm','Guile'], choices:[['Expression','Tradeskill','Seeking','Shadehand']] },
  'Sauren::Nomad’s Profession': { fixed:['Wayfinding','Beastcraft'], choices:[] },
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
