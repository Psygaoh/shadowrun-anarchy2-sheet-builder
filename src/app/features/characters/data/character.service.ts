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
