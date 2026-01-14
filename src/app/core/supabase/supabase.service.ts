import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { supabaseClient } from './supabase-client';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  readonly client: SupabaseClient = supabaseClient;
}
