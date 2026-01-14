import { Injectable } from '@angular/core';
import { SupabaseService } from '../../../core/supabase/supabase.service';
import { fetchMany, fetchOne, run } from './supabase-helpers';
import {
  CharacterResource,
  CharacterResourceInsert,
  CharacterResourceUpdate,
} from '../domain/character-models';

@Injectable({ providedIn: 'root' })
export class CharacterResourcesService {
  constructor(private readonly supabase: SupabaseService) {}

  async list(characterId: string): Promise<CharacterResource[]> {
    const request = this.supabase.client
      .from('character_resource')
      .select('*')
      .eq('character_id', characterId);
    return fetchMany(request);
  }

  async create(payload: CharacterResourceInsert): Promise<CharacterResource> {
    const request = this.supabase.client
      .from('character_resource')
      .insert(payload)
      .select('*')
      .single();
    return fetchOne(request);
  }

  async update(id: string, payload: CharacterResourceUpdate): Promise<CharacterResource> {
    const request = this.supabase.client
      .from('character_resource')
      .update(payload)
      .eq('id', id)
      .select('*')
      .single();
    return fetchOne(request);
  }

  async delete(id: string): Promise<void> {
    await run(this.supabase.client.from('character_resource').delete().eq('id', id));
  }
}
