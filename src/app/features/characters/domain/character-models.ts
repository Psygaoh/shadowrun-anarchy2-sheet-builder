export type Metatype = 'HUMAN' | 'ELF' | 'DWARF' | 'ORK' | 'TROLL';

export type AttributeName =
  | 'FORCE'
  | 'AGILITY'
  | 'VOLONTE'
  | 'LOGIQUE'
  | 'CHARISME'
  | 'ANARCHY_MAX';

export type SkillName =
  | 'ATHLETISME'
  | 'FURTIVITE'
  | 'PERCEPTION'
  | 'PILOTAGE'
  | 'ARMES_A_DISTANCE'
  | 'COMBAT_RAPPROCHE'
  | 'ELECTRONIQUE'
  | 'PIRATAGE'
  | 'INGENIERIE'
  | 'INFLUENCE'
  | 'RESEAU'
  | 'SURVIE'
  | 'SORCELLERIE'
  | 'CONJURATION';

export type EdgeType = 'RISK_REDUCTION' | 'MECHANICAL' | 'NARRATIVE';

export type ItemCategory =
  | 'GENERAL'
  | 'COMMLINK'
  | 'SIN'
  | 'ARMOR'
  | 'WEAPON'
  | 'CYBERDECK'
  | 'VEHICLE'
  | 'DRONE'
  | 'TOOLKIT';

export type SpellCategory = 'COMBAT' | 'DETECTION' | 'SANTE' | 'ILLUSION' | 'MANIPULATION';

export type WoundLevel = 'OK' | 'LEGERE' | 'GRAVE' | 'INCAPACITE';

export type Insertable<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>;
export type Updatable<T> = Partial<Omit<T, 'id' | 'created_at' | 'updated_at'>>;

export interface Character {
  id: string;
  user_id: string;
  street_name: string;
  legal_name: string | null;
  metatype: Metatype | null;
  archetype: string | null;
  keywords: string[] | null;
  behaviors: string[] | null;
  catchphrases: string[] | null;
  created_at: string;
  updated_at: string;
}

export type CharacterInsert = Omit<Character, 'id' | 'created_at' | 'updated_at' | 'user_id'> & {
  user_id?: string;
};
export type CharacterUpdate = Updatable<Character>;

export interface CharacterAttribute {
  id: string;
  character_id: string;
  name: AttributeName;
  value: number;
  created_at: string;
  updated_at: string;
}

export type CharacterAttributeInsert = Insertable<CharacterAttribute>;
export type CharacterAttributeUpdate = Updatable<CharacterAttribute>;

export interface CharacterSkill {
  id: string;
  character_id: string;
  skill_name: SkillName;
  rating: number;
  linked_attribute_default: AttributeName | null;
  created_at: string;
  updated_at: string;
}

export type CharacterSkillInsert = Insertable<CharacterSkill>;
export type CharacterSkillUpdate = Updatable<CharacterSkill>;

export interface CharacterSkillSpecialization {
  id: string;
  skill_id: string;
  name: string;
  bonus: number;
  linked_attribute_override: AttributeName | null;
  created_at: string;
  updated_at: string;
}

export type CharacterSkillSpecializationInsert = Insertable<CharacterSkillSpecialization>;
export type CharacterSkillSpecializationUpdate = Updatable<CharacterSkillSpecialization>;

export interface CharacterResource {
  id: string;
  character_id: string;
  cash: number | null;
  anarchy_current: number | null;
  essence_current: number | null;
  essence_max: number | null;
  created_at: string;
  updated_at: string;
}

export type CharacterResourceInsert = Insertable<CharacterResource>;
export type CharacterResourceUpdate = Updatable<CharacterResource>;

export interface CharacterQuality {
  id: string;
  character_id: string;
  name: string;
  source: string | null;
  level: number | null;
  essence_cost: number | null;
  notes: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export type CharacterQualityInsert = Insertable<CharacterQuality>;
export type CharacterQualityUpdate = Updatable<CharacterQuality>;

export interface CharacterModifier {
  id: string;
  quality_id: string;
  type: EdgeType;
  value: number;
  applies_to: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export type CharacterModifierInsert = Insertable<CharacterModifier>;
export type CharacterModifierUpdate = Updatable<CharacterModifier>;

export interface CharacterItem {
  id: string;
  character_id: string;
  name: string;
  category: ItemCategory | null;
  tags: string[] | null;
  value: number | null;
  created_at: string;
  updated_at: string;
}

export type CharacterItemInsert = Insertable<CharacterItem>;
export type CharacterItemUpdate = Updatable<CharacterItem>;

export interface CharacterMagic {
  id: string;
  character_id: string;
  awakened: boolean;
  spirits: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export type CharacterMagicInsert = Insertable<CharacterMagic>;
export type CharacterMagicUpdate = Updatable<CharacterMagic>;

export interface CharacterSpell {
  id: string;
  character_id: string;
  name: string;
  category: SpellCategory | null;
  rules: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export type CharacterSpellInsert = Insertable<CharacterSpell>;
export type CharacterSpellUpdate = Updatable<CharacterSpell>;

export interface CharacterContact {
  id: string;
  character_id: string;
  name: string;
  role: string | null;
  loyalty: number | null;
  connection: number | null;
  notes: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export type CharacterContactInsert = Insertable<CharacterContact>;
export type CharacterContactUpdate = Updatable<CharacterContact>;

export interface CharacterDamageState {
  id: string;
  character_id: string;
  physical: WoundLevel | null;
  mental: WoundLevel | null;
  matrix: WoundLevel | null;
  vehicle: WoundLevel | null;
  stabilized: boolean;
  created_at: string;
  updated_at: string;
}

export type CharacterDamageStateInsert = Insertable<CharacterDamageState>;
export type CharacterDamageStateUpdate = Updatable<CharacterDamageState>;

export interface CharacterDefense {
  id: string;
  character_id: string;
  armor_primary: number | null;
  threshold_notes: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export type CharacterDefenseInsert = Insertable<CharacterDefense>;
export type CharacterDefenseUpdate = Updatable<CharacterDefense>;

export interface CharacterSheet {
  character: Character;
  attributes: CharacterAttribute[];
  skills: CharacterSkill[];
  specializations: CharacterSkillSpecialization[];
  resources: CharacterResource | null;
  qualities: CharacterQuality[];
  modifiers: CharacterModifier[];
  items: CharacterItem[];
  magic: CharacterMagic | null;
  spells: CharacterSpell[];
  contacts: CharacterContact[];
  damageState: CharacterDamageState | null;
  defense: CharacterDefense | null;
}
