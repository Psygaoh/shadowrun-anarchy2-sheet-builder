import { Injectable, signal } from '@angular/core';
import { User } from '@supabase/supabase-js';

import { SupabaseService } from '../supabase/supabase.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _user = signal<User | null>(null);
  readonly user = this._user.asReadonly();

  constructor(private readonly supabase: SupabaseService) {
    this.supabase.client.auth.getSession().then(({ data }) => {
      this._user.set(data.session?.user ?? null);
    });

    this.supabase.client.auth.onAuthStateChange((_event, session) => {
      this._user.set(session?.user ?? null);
    });
  }

  async signIn(email: string, password: string) {
    return this.supabase.client.auth.signInWithPassword({ email, password });
  }

  async signUp(email: string, password: string, username: string) {
    return this.supabase.client.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });
  }

  async signOut() {
    return this.supabase.client.auth.signOut();
  }
}
