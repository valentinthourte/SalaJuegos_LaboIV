import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RankingService } from '../../services/ranking/ranking.service';
import { Ranking } from '../../models/ranking';

@Component({
  selector: 'app-rankings',
  imports: [CommonModule],
  templateUrl: './rankings.component.html',
  styleUrl: './rankings.component.scss'
})
export class RankingsComponent {
  juegos: string[] = ['Multiplicalo', 'Preguntados', 'Ahorcado', 'Mayor o menor'];
  juegoSeleccionado: string | null = null;
  rankingActual: Ranking[] = [];
  
  constructor(private rankingService: RankingService) {}

  async seleccionarJuego(juego: string) {
    this.juegoSeleccionado = juego;
    this.rankingActual = await this.rankingService.getRankings(juego);
  }

  obtenerRankingActual() {
    return this.rankingActual;
  }

  truncarADosDecimales(valor: number): number {
    return Math.trunc(valor * 100) / 100;
  }
}
