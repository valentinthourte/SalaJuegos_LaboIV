import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EncuestaService } from '../services/encuesta/encuesta.service';
import { Encuesta } from '../models/encuesta';

@Component({
  selector: 'app-encuesta',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.scss'
})
export class EncuestaComponent {
  formulario: FormGroup;
  juegos = ['Ahorcado', 'Preguntados', 'Mayor o menor', 'Multiplícalo'];
  errorMsg: string = "";
  aspectosJuego = ['Visual', 'Diversión', 'Desafío', 'Interfaz'];
  selectedAspectos: string[] = [];

  constructor(private fb: FormBuilder, private encuestaService: EncuestaService) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      sexo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      juegoFavorito: ['', Validators.required],
      terminos: [false, Validators.requiredTrue],
      aspectos: this.fb.array([], Validators.required),
      opiniones: ['']
    });
  }

  onCheckboxChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedAspectos.push(value);
    } else {
      this.selectedAspectos = this.selectedAspectos.filter(a => a !== value);
    }
  }

  async onSubmit() {
    try {
      this.errorMsg = "";
      if (this.formulario.valid) {
        const encuesta: Encuesta = this.formulario.value as Encuesta;
        await this.encuestaService.enviarEncuesta(encuesta);
        this.formulario.reset();
      } else {
        this.formulario.markAllAsTouched();
      }
    }
    catch(error) {
      this.errorMsg = (error as Error).message;
    }
  }
}
