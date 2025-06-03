import { Component, OnInit } from '@angular/core';
import { EncuestaService } from '../../services/encuesta/encuesta.service';
import { Encuesta } from '../../models/encuesta';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visual-encuestas',
  imports: [CommonModule],
  templateUrl: './visual-encuestas.component.html',
  styleUrl: './visual-encuestas.component.scss'
})
export class VisualEncuestasComponent implements OnInit {
    encuestas: Encuesta[] = [];
    encuestaExpandidaIndex: number | null = null;

    constructor(private encuestaService: EncuestaService) {}

    async ngOnInit() {
      this.encuestas = await this.encuestaService.obtenerEncuestas();
    }

    toggleExpandir(index: number): void {
      this.encuestaExpandidaIndex = this.encuestaExpandidaIndex === index ? null : index;
    }
}
