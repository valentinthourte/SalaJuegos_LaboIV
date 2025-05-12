import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { RankingService } from '../../../services/ranking/ranking.service';

@Component({
  selector: 'app-multiplicalo',
  imports: [CommonModule],
  templateUrl: './multiplicalo.component.html',
  styleUrl: './multiplicalo.component.scss'
})
export class MultiplicaloComponent implements OnDestroy {
  contador: number = 1;
  score: number = 8;
  intervalo: any;
  perdio: boolean = false;
  corriendo: boolean = false;

  constructor(private ranking: RankingService) {}
  iniciar() {
    this.corriendo = true;
    this.contador = 1;
    this.intervalo = setInterval(() => {
      this.contador += 0.01;
      const chance = Math.floor(Math.random() * 750) + 1;
      if (chance === 371) {
        this.perder();
      }
    }, 10);
  }
  perder() {
    clearInterval(this.intervalo);
    this.corriendo = false;
    this.perdio = true;
    this.ranking.saveScore("multiplicalo", this.score);
  }

  frenar() {
    if (!this.perdio) {
      this.corriendo = false;
      clearInterval(this.intervalo);
      this.score *= this.contador;
      this.contador = 1;
    }
  }

  reiniciar() {
    this.corriendo = false;
    this.perdio = false;
    this.score = 1;
    this.contador = 1;
    clearInterval(this.intervalo);
    this.iniciar();
  }

  ngOnDestroy() {
    clearInterval(this.intervalo);
  }

  yaComenzo() {
    return this.score != 8;
  }

}
