import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  
  constructor(private loginService: LoginService, private supabaseService: SupabaseService) { }
  
  saveScore(game: string, score: number) {
    let user = this.loginService.getUserEmail();
    this.supabaseService.saveScore(game, user, score);
  }

  async getRankings(juego: string) {
    return await this.supabaseService.getRankingsForGame(juego);
  }
}
