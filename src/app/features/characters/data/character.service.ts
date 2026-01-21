import { Injectable } from '@angular/core';
import { SupabaseService } from '../../../core/supabase/supabase.service';
import { fetchMany, fetchOne, run } from './supabase-helpers';
import { Character, CharacterInsert, CharacterUpdate } from '../domain/character-models';

@Injectable({ providedIn: 'root' })
export class CharacterService {
  constructor(private readonly supabase: SupabaseService) {}

  async list(): Promise<Character[]> {
    const request = this.supabase.client.from('character').select('*').order('created_at');
    return fetchMany(request);
  }

  async search({
    name,
    playerId,
    characterId,
  }: {
    name?: string;
    playerId?: string;
    characterId?: string;
  }): Promise<Character[]> {
    let request = this.supabase.client.from('character').select('*').order('created_at');
    const trimmedName = name?.trim();
    const trimmedPlayerId = playerId?.trim();
    const trimmedCharacterId = characterId?.trim();

    if (trimmedName) {
      request = request.or(
        `street_name.ilike.%${trimmedName}%,legal_name.ilike.%${trimmedName}%`
      );
    }

    if (trimmedPlayerId) {
      request = request.eq('user_id', trimmedPlayerId);
    }

    if (trimmedCharacterId) {
      request = request.eq('id', trimmedCharacterId);
    }

    return fetchMany(request);
  }

  async get(id: string): Promise<Character> {
    const request = this.supabase.client.from('character').select('*').eq('id', id).single();
    return fetchOne(request);
  }

  async create(payload: CharacterInsert): Promise<Character> {
    const request = this.supabase.client.from('character').insert(payload).select('*').single();
    return fetchOne(request);
  }

  async update(id: string, payload: CharacterUpdate): Promise<Character> {
    const request = this.supabase.client
      .from('character')
      .update(payload)
      .eq('id', id)
      .select('*')
      .single();
    return fetchOne(request);
  }

  async delete(id: string): Promise<void> {
    await run(this.supabase.client.from('character').delete().eq('id', id));
  }
}
