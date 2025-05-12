import { Injectable } from '@angular/core';
import { PokerCard } from '../../models/poker-card';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

const IMAGEN_DORSO = "https://www.deckofcardsapi.com/static/img/back.png";
@Injectable({
  providedIn: 'root'
})
export class MayormenorService {

  private baseUrl = 'https://deckofcardsapi.com/api/deck';
  constructor(private http: HttpClient) {}


  crearNuevoMazo(): Observable<string> {
    return this.http
      .get<any>(`${this.baseUrl}/new/shuffle/?deck_count=1`)
      .pipe(map(res => res.deck_id));
  }

   getCartas(deckId: string): Observable<PokerCard[]> {
    return this.http
      .get<any>(`${this.baseUrl}/${deckId}/draw/?count=52`)
      .pipe(map(res => res.cards as PokerCard[]));
  }
  mezclarMazo(deckId: string): Observable<boolean> {
    return this.http
      .get<any>(`${this.baseUrl}/${deckId}/shuffle/`)
      .pipe(map(res => res.success));
  }

  getImagenDorso() {
    return IMAGEN_DORSO;
  }
 
}
