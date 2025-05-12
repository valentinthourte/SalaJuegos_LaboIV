import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MayorMenorComponent } from '../../components/juegos/mayormenor/mayormenor.component';
import { AhorcadoComponent } from '../../components/juegos/ahorcado/ahorcado.component';
import { MultiplicaloComponent } from '../../components/juegos/multiplicalo/multiplicalo.component';

const routes: Routes = [

    {path: "ahorcado", component: AhorcadoComponent},
    {path: "mayormenor", component: MayorMenorComponent},
    {path: "multiplicalo", component: MultiplicaloComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
