import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { AuthResponse, createClient } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { ChatMessage } from '../../models/chat-message';
const CHAT_TABLE = "chat-messages";
@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  
  private supabase = createClient(environment.apiUrl, environment.publicAnonKey);
  constructor() { }
  
  async getMessages() {
    const { data, error } = await this.supabase
    .from('chat-messages')
    .select('*')
    .order('created_at', { ascending: true });
    
    return data as ChatMessage[];
  }
  
  signIn(username: string, password: string): Promise<AuthResponse> {
    return this.supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });
  }

  channel(channelName: string) {
    return this.supabase.channel(channelName);
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

  getChatChannel() {
    return this.supabase.channel('chat-channel');
  }

  
  async sendMessage(message: string, sender: string) {
    try {
      const { error } = await this.supabase.from(CHAT_TABLE)
      .insert({sender: sender, message: message});
      if (error){
        console.log("Error al guardar mensaje. ");
        
        console.log(error.message);
      }
    }
    catch(error) {
      console.log("Error al guardar mensaje - en el catch. ");
      console.log(error);
    }
  }

  
  chatTableName(): string | undefined {
    return CHAT_TABLE;
  }
}
