import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EncuestaService } from '../services/encuesta/encuesta.service';
import { Encuesta } from '../models/encuesta';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-encuesta',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.scss'
})
export class EncuestaComponent {
  formulario: FormGroup;
  juegos = ['Ahorcado', 'Preguntados', 'Mayor o menor', 'Multiplícalo'];
  errorMsg: string = "";
  aspectosJuego = ['Visual', 'Diversión', 'Desafío', 'Interfaz'];
  selectedAspectos: string[] = [];
  juegoFavorito: any;

  constructor(private fb: FormBuilder, private encuestaService: EncuestaService) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      sexo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      juegoFavorito: ['', Validators.required],
      aspectos: this.fb.array([], Validators.required),
      opiniones: ['']
    });
  }

  onCheckboxChange(event: any) {
    const formArray: FormArray = this.formulario.get('aspectos') as FormArray;
    const value = event.target.value;

    if (event.target.checked) {
      formArray.push(this.fb.control(value));
    } else {
      const index = formArray.controls.findIndex(ctrl => ctrl.value === value);
      if (index >= 0) {
        formArray.removeAt(index);
      }
    }
  }

  onJuegoFavoritoChange(event: any) {
    const value = event.target.value;
    if (event.target.checked)
      this.juegoFavorito = value;
  }

  async onSubmit() {
    try {
      console.log("Comenzando envio de formulario");
      this.errorMsg = "";
      if (this.formulario.valid) {
        let encuesta: Encuesta = this.formulario.value as Encuesta;
        debugger
        encuesta = this.completarModeloEncuesta(encuesta);
        console.log("Encuesta a enviar: " + JSON.stringify(encuesta));
        await this.encuestaService.enviarEncuesta(encuesta);
        this.reiniciarFormulario();
        console.log("Envio de formulario finalizado");
      } else {
        this.formulario.markAllAsTouched();
      }
    }
    catch(error) {
      this.errorMsg = (error as Error).message;
    }
  }

  completarModeloEncuesta(encuesta: Encuesta): Encuesta {
    const formArray: FormArray = this.formulario.get('aspectos') as FormArray;
    encuesta.aspectos = formArray.value.join(", ");
    return encuesta;
  }

reiniciarFormulario() {
  const formArray: FormArray = this.formulario.get('aspectos') as FormArray;

  while (formArray.length !== 0) {
    formArray.removeAt(0);
  }

  this.formulario.reset();

  this.juegoFavorito = null;
  this.selectedAspectos = [];
}
}


