import { Injectable } from '@angular/core';
import { SupabaseService } from '../../../core/supabase/supabase.service';
import { fetchMany, fetchOne, run } from './supabase-helpers';
import {
  CharacterDamageState,
  CharacterDamageStateInsert,
  CharacterDamageStateUpdate,
  CharacterDefense,
  CharacterDefenseInsert,
  CharacterDefenseUpdate,
} from '../domain/character-models';

@Injectable({ providedIn: 'root' })
export class CharacterRuntimeService {
  constructor(private readonly supabase: SupabaseService) {}

  async listDamageStates(characterId: string): Promise<CharacterDamageState[]> {
    const request = this.supabase.client
      .from('character_damage_state')
      .select('*')
      .eq('character_id', characterId);
    return fetchMany(request);
  }

  async createDamageState(
    payload: CharacterDamageStateInsert
  ): Promise<CharacterDamageState> {
    const request = this.supabase.client
      .from('character_damage_state')
      .insert(payload)
      .select('*')
      .single();
    return fetchOne(request);
  }

  async updateDamageState(
    id: string,
    payload: CharacterDamageStateUpdate
  ): Promise<CharacterDamageState> {
    const request = this.supabase.client
      .from('character_damage_state')
      .update(payload)
      .eq('id', id)
      .select('*')
      .single();
    return fetchOne(request);
  }

  async deleteDamageState(id: string): Promise<void> {
    await run(this.supabase.client.from('character_damage_state').delete().eq('id', id));
  }

  async listDefenses(characterId: string): Promise<CharacterDefense[]> {
    const request = this.supabase.client
      .from('character_defense')
      .select('*')
      .eq('character_id', characterId);
    return fetchMany(request);
  }

  async createDefense(payload: CharacterDefenseInsert): Promise<CharacterDefense> {
    const request = this.supabase.client
      .from('character_defense')
      .insert(payload)
      .select('*')
      .single();
    return fetchOne(request);
  }

  async updateDefense(id: string, payload: CharacterDefenseUpdate): Promise<CharacterDefense> {
    const request = this.supabase.client
      .from('character_defense')
      .update(payload)
      .eq('id', id)
      .select('*')
      .single();
    return fetchOne(request);
  }

  async deleteDefense(id: string): Promise<void> {
    await run(this.supabase.client.from('character_defense').delete().eq('id', id));
  }
}
