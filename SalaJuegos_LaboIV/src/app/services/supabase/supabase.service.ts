import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { AuthResponse, createClient } from '@supabase/supabase-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase = createClient(environment.apiUrl, environment.publicAnonKey);
  constructor() { }

  getMessages() {
    const TABLA_MENSAJES = "chat-messages";
    return this.supabase.from(TABLA_MENSAJES).select("*");
  }

  signIn(username: string, password: string): Promise<AuthResponse> {
    return this.supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });
  }

  signUp(username: string, password: string): Promise<AuthResponse> {
    return this.supabase.auth.signUp({
        email: username,
        password: password,
      })
  }

  getSupabase() {
    return this.supabase;
  }
}
