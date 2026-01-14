import { Injectable } from '@angular/core';
import { CharacterSheet } from '../domain/character-models';
import { CharacterAttributesService } from './character-attributes.service';
import { CharacterContactsService } from './character-contacts.service';
import { CharacterItemsService } from './character-items.service';
import { CharacterMagicService } from './character-magic.service';
import { CharacterQualitiesService } from './character-qualities.service';
import { CharacterResourcesService } from './character-resources.service';
import { CharacterRuntimeService } from './character-runtime.service';
import { CharacterService } from './character.service';
import { CharacterSkillsService } from './character-skills.service';

@Injectable({ providedIn: 'root' })
export class CharacterSheetService {
  constructor(
    private readonly characters: CharacterService,
    private readonly attributes: CharacterAttributesService,
    private readonly skills: CharacterSkillsService,
    private readonly resources: CharacterResourcesService,
    private readonly qualities: CharacterQualitiesService,
    private readonly items: CharacterItemsService,
    private readonly magic: CharacterMagicService,
    private readonly contacts: CharacterContactsService,
    private readonly runtime: CharacterRuntimeService
  ) {}

  async getCharacterSheet(characterId: string): Promise<CharacterSheet> {
    const [
      character,
      attributes,
      skills,
      resources,
      qualities,
      items,
      magic,
      spells,
      contacts,
      damageState,
      defense,
    ] = await Promise.all([
      this.characters.get(characterId),
      this.attributes.list(characterId),
      this.skills.listSkills(characterId),
      this.resources.list(characterId),
      this.qualities.listQualities(characterId),
      this.items.list(characterId),
      this.magic.listMagic(characterId),
      this.magic.listSpells(characterId),
      this.contacts.list(characterId),
      this.runtime.listDamageStates(characterId),
      this.runtime.listDefenses(characterId),
    ]);

    const [specializations, modifiers] = await Promise.all([
      this.skills.listSpecializationsForSkills(skills.map((skill) => skill.id)),
      this.qualities.listModifiersForQualities(qualities.map((quality) => quality.id)),
    ]);

    return {
      character,
      attributes,
      skills,
      specializations,
      resources: resources[0] ?? null,
      qualities,
      modifiers,
      items,
      magic: magic[0] ?? null,
      spells,
      contacts,
      damageState: damageState[0] ?? null,
      defense: defense[0] ?? null,
    };
  }
}
