import { Injectable } from '@angular/core';
import { SupabaseService } from '../../../core/supabase/supabase.service';
import { fetchMany, fetchOne, run } from './supabase-helpers';
import {
  CharacterSkill,
  CharacterSkillInsert,
  CharacterSkillUpdate,
  CharacterSkillSpecialization,
  CharacterSkillSpecializationInsert,
  CharacterSkillSpecializationUpdate,
} from '../domain/character-models';

@Injectable({ providedIn: 'root' })
export class CharacterSkillsService {
  constructor(private readonly supabase: SupabaseService) {}

  async listSkills(characterId: string): Promise<CharacterSkill[]> {
    const request = this.supabase.client
      .from('character_skill')
      .select('*')
      .eq('character_id', characterId);
    return fetchMany(request);
  }

  async createSkill(payload: CharacterSkillInsert): Promise<CharacterSkill> {
    const request = this.supabase.client
      .from('character_skill')
      .insert(payload)
      .select('*')
      .single();
    return fetchOne(request);
  }

  async updateSkill(id: string, payload: CharacterSkillUpdate): Promise<CharacterSkill> {
    const request = this.supabase.client
      .from('character_skill')
      .update(payload)
      .eq('id', id)
      .select('*')
      .single();
    return fetchOne(request);
  }

  async deleteSkill(id: string): Promise<void> {
    await run(this.supabase.client.from('character_skill').delete().eq('id', id));
  }

  async listSpecializations(skillId: string): Promise<CharacterSkillSpecialization[]> {
    const request = this.supabase.client
      .from('character_skill_specialization')
      .select('*')
      .eq('skill_id', skillId);
    return fetchMany(request);
  }

  async listSpecializationsForSkills(skillIds: string[]): Promise<CharacterSkillSpecialization[]> {
    if (skillIds.length === 0) {
      return [];
    }

    const request = this.supabase.client
      .from('character_skill_specialization')
      .select('*')
      .in('skill_id', skillIds);
    return fetchMany(request);
  }

  async createSpecialization(
    payload: CharacterSkillSpecializationInsert
  ): Promise<CharacterSkillSpecialization> {
    const request = this.supabase.client
      .from('character_skill_specialization')
      .insert(payload)
      .select('*')
      .single();
    return fetchOne(request);
  }

  async updateSpecialization(
    id: string,
    payload: CharacterSkillSpecializationUpdate
  ): Promise<CharacterSkillSpecialization> {
    const request = this.supabase.client
      .from('character_skill_specialization')
      .update(payload)
      .eq('id', id)
      .select('*')
      .single();
    return fetchOne(request);
  }

  async deleteSpecialization(id: string): Promise<void> {
    await run(
      this.supabase.client.from('character_skill_specialization').delete().eq('id', id)
    );
  }
}
