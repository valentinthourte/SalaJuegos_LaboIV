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
  juegos: any[] = [
    {name: 'Multiplicalo', code: "multiplicalo" },
    {name: 'Preguntados', code: 'preguntados' },
    {name: 'Ahorcado', code: "ahorcado" },
    {name: 'Mayor o menor', code: "mayorMenor" }];

  juegoSeleccionado: string | null = null;
  rankingActual: Ranking[] = [];
  
  constructor(private rankingService: RankingService) {}

  async seleccionarJuego(juego: any) {
    this.juegoSeleccionado = juego.name;
    let codigoJuego = this.obtenerJuegoPorNombre(juego.name);
    
    console.log(codigoJuego.code);
    this.rankingActual = await this.rankingService.getRankings(codigoJuego.code);
    console.log(this.rankingActual);
  }

  obtenerJuegoPorNombre(nombre: string): any | null {
    return this.juegos.find(j => j.name == nombre) || null;
  }

  obtenerRankingActual() {
    return this.rankingActual;
  }

  truncarADosDecimales(valor: number): number {
    return Math.trunc(valor * 100) / 100;
  }
}
