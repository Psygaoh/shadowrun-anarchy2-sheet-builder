import { Injectable } from '@angular/core';
import { SupabaseService } from '../../../core/supabase/supabase.service';
import { fetchMany, fetchOne, run } from './supabase-helpers';
import {
  CharacterAttribute,
  CharacterAttributeInsert,
  CharacterAttributeUpdate,
} from '../domain/character-models';

@Injectable({ providedIn: 'root' })
export class CharacterAttributesService {
  constructor(private readonly supabase: SupabaseService) {}

  async list(characterId: string): Promise<CharacterAttribute[]> {
    const request = this.supabase.client
      .from('character_attribute')
      .select('*')
      .eq('character_id', characterId);
    return fetchMany(request);
  }

  async create(payload: CharacterAttributeInsert): Promise<CharacterAttribute> {
    const request = this.supabase.client
      .from('character_attribute')
      .insert(payload)
      .select('*')
      .single();
    return fetchOne(request);
  }

  async update(id: string, payload: CharacterAttributeUpdate): Promise<CharacterAttribute> {
    const request = this.supabase.client
      .from('character_attribute')
      .update(payload)
      .eq('id', id)
      .select('*')
      .single();
    return fetchOne(request);
  }

  async delete(id: string): Promise<void> {
    await run(this.supabase.client.from('character_attribute').delete().eq('id', id));
  }
}
