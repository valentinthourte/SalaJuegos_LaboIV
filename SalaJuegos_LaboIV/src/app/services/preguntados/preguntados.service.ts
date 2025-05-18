import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pais } from '../../models/pais';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {

  constructor(private httpClient: HttpClient) { }
  
  obtenerPaises(): Observable<Pais[]> {
    const URL = "https://restcountries.com/v3.1/lang/spanish?fields=name,flags";
    return this.httpClient.get<Pais[]>(URL).pipe(map(paises => paises.map(p => ({ ...p, usado: false})))); 
  }
}
