import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

const supabaseUrl = environment.supabaseUrl;
const supabaseAnonKey = environment.supabaseKey;

export const supabaseClient: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
);
