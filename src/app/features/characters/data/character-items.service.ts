import { Injectable } from '@angular/core';
import { SupabaseService } from '../../../core/supabase/supabase.service';
import { fetchMany, fetchOne, run } from './supabase-helpers';
import { CharacterItem, CharacterItemInsert, CharacterItemUpdate } from '../domain/character-models';

@Injectable({ providedIn: 'root' })
export class CharacterItemsService {
  constructor(private readonly supabase: SupabaseService) {}

  async list(characterId: string): Promise<CharacterItem[]> {
    const request = this.supabase.client
      .from('character_item')
      .select('*')
      .eq('character_id', characterId);
    return fetchMany(request);
  }

  async create(payload: CharacterItemInsert): Promise<CharacterItem> {
    const request = this.supabase.client.from('character_item').insert(payload).select('*').single();
    return fetchOne(request);
  }

  async update(id: string, payload: CharacterItemUpdate): Promise<CharacterItem> {
    const request = this.supabase.client
      .from('character_item')
      .update(payload)
      .eq('id', id)
      .select('*')
      .single();
    return fetchOne(request);
  }

  async delete(id: string): Promise<void> {
    await run(this.supabase.client.from('character_item').delete().eq('id', id));
  }
}
