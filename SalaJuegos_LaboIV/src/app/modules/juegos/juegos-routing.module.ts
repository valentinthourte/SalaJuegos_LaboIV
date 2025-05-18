import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [

    {path: "ahorcado", loadComponent: () => import('../../components/juegos/ahorcado/ahorcado.component').then(m => m.AhorcadoComponent)},
    {path: "mayormenor", loadComponent: () => import('../../components/juegos/mayormenor/mayormenor.component').then(m => m.MayorMenorComponent)},
    {path: "multiplicalo", loadComponent: () => import('../../components/juegos/multiplicalo/multiplicalo.component').then(m => m.MultiplicaloComponent)},
    {path: "preguntados", loadComponent: () => import('../../components/juegos/preguntados/preguntados/preguntados.component').then(m => m.PreguntadosComponent)}

];
// () => import('./modules/juegos/juegos.module').then(m => m.JuegosModule)
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
