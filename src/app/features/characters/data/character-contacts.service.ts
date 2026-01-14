import { Injectable } from '@angular/core';
import { SupabaseService } from '../../../core/supabase/supabase.service';
import { fetchMany, fetchOne, run } from './supabase-helpers';
import {
  CharacterContact,
  CharacterContactInsert,
  CharacterContactUpdate,
} from '../domain/character-models';

@Injectable({ providedIn: 'root' })
export class CharacterContactsService {
  constructor(private readonly supabase: SupabaseService) {}

  async list(characterId: string): Promise<CharacterContact[]> {
    const request = this.supabase.client
      .from('character_contact')
      .select('*')
      .eq('character_id', characterId);
    return fetchMany(request);
  }

  async create(payload: CharacterContactInsert): Promise<CharacterContact> {
    const request = this.supabase.client
      .from('character_contact')
      .insert(payload)
      .select('*')
      .single();
    return fetchOne(request);
  }

  async update(id: string, payload: CharacterContactUpdate): Promise<CharacterContact> {
    const request = this.supabase.client
      .from('character_contact')
      .update(payload)
      .eq('id', id)
      .select('*')
      .single();
    return fetchOne(request);
  }

  async delete(id: string): Promise<void> {
    await run(this.supabase.client.from('character_contact').delete().eq('id', id));
  }
}
