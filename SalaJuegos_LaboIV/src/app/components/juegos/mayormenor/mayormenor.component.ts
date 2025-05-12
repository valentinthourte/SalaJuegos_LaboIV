import { Component, OnInit } from '@angular/core';
import { MayormenorService } from '../../../services/mayormenor/mayormenor.service';
import { PokerCard } from '../../../models/poker-card';
import { RankingService } from '../../../services/ranking/ranking.service';
import { CommonModule } from '@angular/common';

const MAX_ERRORS = 3;

@Component({
  selector: 'app-mayormenor',
  imports: [CommonModule],
  templateUrl: './mayormenor.component.html',
  styleUrl: './mayormenor.component.scss'
})
export class MayorMenorComponent implements OnInit {

 
  private cartas: PokerCard[] = [];
  cartaActual: PokerCard | undefined;
  deckId: string = "";
  cartaAnterior: PokerCard | undefined;
  score: number = 0;
  errors: number = 0;
  gameOver: boolean = false;
  resultado: 'acierto' | 'fallo' | '' = '';

  constructor(private mayorMenorService: MayormenorService, private ranking: RankingService) 
  {
    this.reestablecerMazo()
  }
  reestablecerMazo() {
     this.mayorMenorService.crearNuevoMazo().subscribe(deckId => {
          this.deckId = deckId;
          this.mayorMenorService.mezclarMazo(this.deckId).subscribe(success => {
            if (success) {
              this.mayorMenorService.getCartas(deckId).subscribe(cartas => {
                this.cartas = cartas;
                this.cartaActual = cartas[0];
              })
            }
          })
        })
  }

  ngOnInit(): void {
   console.log(this.cartas);
  }
 
  elegir(eleccion: string) {
    this.cartaAnterior = this.cartaActual;
    let indiceProximaCarta = this.cartas.indexOf(this.cartaActual!) + 1;

    if (indiceProximaCarta >= 52) {
      this.reestablecerMazo();
      this.cartaActual = this.cartas[0];
    }
    else 
      this.cartaActual = this.cartas[indiceProximaCarta];

    switch(eleccion) {
      case "mayor": {
        if (this.cartaActual.value >= this.cartaAnterior!.value)
          this.respuestaCorrecta();
        else
          this.respuestaIncorrecta();
        break;
      }
      case "menor": {
          if (this.cartaActual.value >= this.cartaAnterior!.value)
          this.respuestaIncorrecta();
        else
          this.respuestaCorrecta();
        break;
      }
    }
  }
  respuestaCorrecta() { 
    this.resultado = 'acierto';
    setTimeout(() => this.resultado = '', 1000);
    this.score += 1;
  }

  respuestaIncorrecta() {
    this.resultado = 'fallo';
    setTimeout(() => this.resultado = '', 1000);
    this.errors += 1;
    if (this.errors >= MAX_ERRORS)
      this.terminarJuego();
  }

  terminarJuego() {
    this.gameOver = true;
    this.ranking.saveScore('mayorMenor', this.score);
  }

  reiniciarJuego() {
    this.gameOver = false;
    this.errors = 0;
    this.score = 0;
    this.reestablecerMazo();
  }

  getImagenDorso() {
    return this.mayorMenorService.getImagenDorso();
  }


  
}
