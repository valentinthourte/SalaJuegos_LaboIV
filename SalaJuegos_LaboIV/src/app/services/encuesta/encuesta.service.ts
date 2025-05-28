import { Injectable } from '@angular/core';
import { Encuesta } from '../../models/encuesta';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  constructor(private supabaseService: SupabaseService) { }

  async enviarEncuesta(encuesta: Encuesta) {
    await this.supabaseService.guardarEncuesta(encuesta);
  }

}
