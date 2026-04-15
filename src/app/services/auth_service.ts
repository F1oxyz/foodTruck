import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  APIKEY = environment.SupabaseKey;
  PROJECTID = environment.SupabaseURL;
  private supabase: SupabaseClient;

  constructor() {

    this.supabase = createClient(this.PROJECTID, this.APIKEY);

  }

  async signInWithEmail(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error signing in:', error);
      return null;
    }

    console.log('User signed in:', data.user);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data.user;
  }
}
