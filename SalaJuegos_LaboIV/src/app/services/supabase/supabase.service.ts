import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { AuthResponse, createClient } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { ChatMessage } from '../../models/chat-message';
import { Ranking } from '../../models/ranking';
import { Encuesta } from '../../models/encuesta';

const CHAT_TABLE = "chat-messages";
const SCORE_TABLE = "scores";
const SURVEY_TABLE = "surveys";


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

  async saveScore(game: string, user: string, score: number) {
    try {
      const {error} = await this.supabase.from(SCORE_TABLE)
      .insert({user: user, game: game, score: score});
      if (error) {
        console.log("Error al guardar score: " + error);
      }
    }
    catch(error) {
      console.log("Error al guardar score - en el catch. ");
      console.log(error);
    }
  }

  
async getRankingsForGame(juego: string): Promise<Ranking[]> {
  const { data, error } = await this.supabase
    .from('scores')
    .select('*')
    .eq('game', juego) 
    .order('score', { ascending: false }) 
    .limit(10); 

  if (error) {
    console.error('Error fetching rankings:', error.message);
    return [];
  }
  return data as Ranking[];
}


  async obtenerEncuestas() {
    const { data, error } = await this.supabase
    .from(SURVEY_TABLE)
    .select('*')
    .order('created_at', {ascending: false});

    if (error) {
      console.error('Error fetching rankings:', error.message);
      return [];
    }
    return data as Encuesta[];
  }

  async guardarEncuesta(encuesta: Encuesta) {
    const { error } = await this.supabase.from(SURVEY_TABLE)
    .insert(encuesta);
    if (error) {
      console.log("Error saving survey. ");
      throw new Error(error.code + error.message);
    }
  }
}
