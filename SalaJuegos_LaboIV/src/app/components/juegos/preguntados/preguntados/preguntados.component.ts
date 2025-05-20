import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PreguntadosService } from '../../../../services/preguntados/preguntados.service';
import { Pais } from '../../../../models/pais';
import { RankingService } from '../../../../services/ranking/ranking.service';

@Component({
  selector: 'app-preguntados',
  imports: [CommonModule],
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent implements OnInit{

  protected paises: Pais[] = [];
  protected paisActual: Pais | undefined;
  protected opciones: Pais[] = [];
  protected score: number = 0;
  protected vidas!: number;
  protected opcionSeleccionada: Pais | undefined;
  protected perdio: boolean = false;

  imagenPregunta: string = 'assets/imagen-ejemplo.jpg';

  constructor(private preguntadosService: PreguntadosService, private rankingService: RankingService) {}

  ngOnInit(): void {
    this.obtenerPaisesYComenzar(true);
  }

  obtenerPaisesYComenzar(restart: boolean = false) {
    this.preguntadosService.obtenerPaises().subscribe(paises => {
      this.paises = paises;
      console.log("Paises obtenidos - Comenzando juego");
      if (restart)
        this.comenzarJuego();
      else
      this.comenzarRonda();
    });
  }

  comenzarJuego() {
    this.vidas = 3;
    this.score = 0;
    this.perdio = false;
    this.comenzarRonda();
  }

  completarOpciones() {
    while (this.opciones.length < 4) {
      let pais = this.obtenerPaisAleatorio(true);
      if (this.opciones.includes(pais) == false){
        this.opciones.push(pais);
      }
    }  
    this.opciones = this.shuffleArray(this.opciones);
  }

  shuffleArray(array: Pais[]) {
    const result = [...array]; // Copia para no modificar el original
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  private obtenerPaisAleatorio(incluirUsados: boolean): Pais {
    let paisesPosibles = this.obtenerPaisesDisponibles(incluirUsados);
    let indice = Math.floor(Math.random() * paisesPosibles.length);
    return paisesPosibles[indice];
  }

  obtenerPaisesDisponibles(incluirUsados: boolean = false) {
    return incluirUsados ? this.paises : this.paises.filter(pais => pais.usado == false);
  }

  seleccionarOpcion(opcion: Pais) {
    if (this.opcionSeleccionada ) return

    this.opcionSeleccionada = opcion;
    if (opcion == this.paisActual)
    {
      this.score += 10;
    }
    else {
      this.vidas -= 1;
    }
    if (this.vidas > 0) {
      setTimeout(() => {
      this.siguienteRonda();
      this.opcionSeleccionada = undefined;
      }, 1500);
    }
    else {
      this.perdio = true;
    }
    
  }

  siguienteRonda() {
    this.paisActual!.usado = true;
    console.log(this.obtenerPaisesDisponibles());
    
    if (this.obtenerPaisesDisponibles().length == 0) {
      this.obtenerPaisesYComenzar();
    }
    else
      this.comenzarRonda();
  }

  comenzarRonda() {
    this.opciones = [];
    this.opcionSeleccionada = undefined;    
    this.paisActual = this.obtenerPaisAleatorio(false);
    this.opciones.push(this.paisActual);
    this.completarOpciones();
  }

  get vidasArray() {
    return Array(this.vidas);
  }

  reiniciarJuego() {
    this.rankingService.saveScore("preguntados", this.score);
    this.comenzarJuego();
  }
}
