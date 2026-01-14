import { Injectable } from '@angular/core';
import { SupabaseService } from '../../../core/supabase/supabase.service';
import { fetchMany, fetchOne, run } from './supabase-helpers';
import {
  CharacterMagic,
  CharacterMagicInsert,
  CharacterMagicUpdate,
  CharacterSpell,
  CharacterSpellInsert,
  CharacterSpellUpdate,
} from '../domain/character-models';

@Injectable({ providedIn: 'root' })
export class CharacterMagicService {
  constructor(private readonly supabase: SupabaseService) {}

  async listMagic(characterId: string): Promise<CharacterMagic[]> {
    const request = this.supabase.client
      .from('character_magic')
      .select('*')
      .eq('character_id', characterId);
    return fetchMany(request);
  }

  async createMagic(payload: CharacterMagicInsert): Promise<CharacterMagic> {
    const request = this.supabase.client
      .from('character_magic')
      .insert(payload)
      .select('*')
      .single();
    return fetchOne(request);
  }

  async updateMagic(id: string, payload: CharacterMagicUpdate): Promise<CharacterMagic> {
    const request = this.supabase.client
      .from('character_magic')
      .update(payload)
      .eq('id', id)
      .select('*')
      .single();
    return fetchOne(request);
  }

  async deleteMagic(id: string): Promise<void> {
    await run(this.supabase.client.from('character_magic').delete().eq('id', id));
  }

  async listSpells(characterId: string): Promise<CharacterSpell[]> {
    const request = this.supabase.client
      .from('character_spell')
      .select('*')
      .eq('character_id', characterId);
    return fetchMany(request);
  }

  async createSpell(payload: CharacterSpellInsert): Promise<CharacterSpell> {
    const request = this.supabase.client.from('character_spell').insert(payload).select('*').single();
    return fetchOne(request);
  }

  async updateSpell(id: string, payload: CharacterSpellUpdate): Promise<CharacterSpell> {
    const request = this.supabase.client
      .from('character_spell')
      .update(payload)
      .eq('id', id)
      .select('*')
      .single();
    return fetchOne(request);
  }

  async deleteSpell(id: string): Promise<void> {
    await run(this.supabase.client.from('character_spell').delete().eq('id', id));
  }
}
