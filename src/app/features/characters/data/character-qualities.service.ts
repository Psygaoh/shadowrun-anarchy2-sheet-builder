import { Injectable } from '@angular/core';
import { SupabaseService } from '../../../core/supabase/supabase.service';
import { fetchMany, fetchOne, run } from './supabase-helpers';
import {
  CharacterModifier,
  CharacterModifierInsert,
  CharacterModifierUpdate,
  CharacterQuality,
  CharacterQualityInsert,
  CharacterQualityUpdate,
} from '../domain/character-models';

@Injectable({ providedIn: 'root' })
export class CharacterQualitiesService {
  constructor(private readonly supabase: SupabaseService) {}

  async listQualities(characterId: string): Promise<CharacterQuality[]> {
    const request = this.supabase.client
      .from('character_quality')
      .select('*')
      .eq('character_id', characterId);
    return fetchMany(request);
  }

  async createQuality(payload: CharacterQualityInsert): Promise<CharacterQuality> {
    const request = this.supabase.client
      .from('character_quality')
      .insert(payload)
      .select('*')
      .single();
    return fetchOne(request);
  }

  async updateQuality(id: string, payload: CharacterQualityUpdate): Promise<CharacterQuality> {
    const request = this.supabase.client
      .from('character_quality')
      .update(payload)
      .eq('id', id)
      .select('*')
      .single();
    return fetchOne(request);
  }

  async deleteQuality(id: string): Promise<void> {
    await run(this.supabase.client.from('character_quality').delete().eq('id', id));
  }

  async listModifiers(qualityId: string): Promise<CharacterModifier[]> {
    const request = this.supabase.client
      .from('character_modifier')
      .select('*')
      .eq('quality_id', qualityId);
    return fetchMany(request);
  }

  async listModifiersForQualities(qualityIds: string[]): Promise<CharacterModifier[]> {
    if (qualityIds.length === 0) {
      return [];
    }

    const request = this.supabase.client
      .from('character_modifier')
      .select('*')
      .in('quality_id', qualityIds);
    return fetchMany(request);
  }

  async createModifier(payload: CharacterModifierInsert): Promise<CharacterModifier> {
    const request = this.supabase.client
      .from('character_modifier')
      .insert(payload)
      .select('*')
      .single();
    return fetchOne(request);
  }

  async updateModifier(id: string, payload: CharacterModifierUpdate): Promise<CharacterModifier> {
    const request = this.supabase.client
      .from('character_modifier')
      .update(payload)
      .eq('id', id)
      .select('*')
      .single();
    return fetchOne(request);
  }

  async deleteModifier(id: string): Promise<void> {
    await run(this.supabase.client.from('character_modifier').delete().eq('id', id));
  }
}
