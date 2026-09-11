export const loreSpells: Record<string,string[]> = {
  "Invocation": [
    "Forager’s Gift",
    "Mendcraft",
    "Spectral Hand",
    "Veil Of Glimmer",
    "Whispering Wind",
    "Soothing Bloom",
    "Barkskin Ward",
    "Hearth Vow",
    "Kinbound Call",
    "Shadeveil",
    "Spectral Armament",
    "Unraveling Word",
    "Wyrd Bolt"
  ],
  "Flames": [
    "Immolation",
    "Scorching Hand",
    "Blazing Weapon",
    "Fire Bolt",
    "Infernal Rebuke",
    "Inferno Strike",
    "Cascading Fire",
    "Sun Burst",
    "Detonation"
  ],
  "Wilds": [
    "Flourishing Earth",
    "Elemental Armor",
    "Curse Of Patronus",
    "Wild Shape",
    "Moon Bolt",
    "Blessing Of The Wilds",
    "Hallowing Thorns",
    "Breath Of Life",
    "Call Of The Beast"
  ],
  "Oath": [
    "Oath Of Protection",
    "Vow Of Elements",
    "Wind Scaring",
    "Word Of Challenge",
    "Thunder’s Fury",
    "Power Word: Reinforcement",
    "Primal Surge",
    "The Immortal Warrior",
    "Oathkeeper"
  ],
  "Frost": [
    "Hypothermia",
    "Mind Freeze",
    "Biting Blade",
    "Frost Shock",
    "Frostbite",
    "Torrent Of Frost",
    "Ice Wall",
    "Polar Vortex",
    "Icy Tomb"
  ],
  "Hallows": [
    "Scary Face",
    "Hex Of Misfortune",
    "Eerie Apparition",
    "Pierce The Veil",
    "Shroud Of Despair",
    "Soulfire Bolt",
    "Spectral Grasp",
    "Spectral Reckoning",
    "Vortex Of Shadows"
  ],
  "Harmony": [
    "Chorus Of Harmony",
    "Ballad Of The Courageous",
    "Hymn Of Scorn",
    "Note Of Force",
    "Drums Of War",
    "Melody Of Superiority",
    "Chant Of Resilience",
    "Song Of Storms",
    "Symphony Of Valor"
  ],
  "Life": [
    "Renewal",
    "Divine Grasp",
    "Light Spear",
    "Radiant Breath",
    "Shield Of Protection",
    "Touch Of Life",
    "Mass Restoration",
    "Sanctuary",
    "Spare The Perishing"
  ]
}
export const attunableLores = ['Flames','Frost','Hallows','Harmony','Life','Oath','Wilds'] as const
export type AttunableLore=typeof attunableLores[number]
export const loreElementalResistance:Record<AttunableLore,string>={Flames:'Fire',Frost:'Cold',Hallows:'Psychic',Harmony:'Arcane',Life:'Light',Oath:'Lightning',Wilds:'Nature'}
