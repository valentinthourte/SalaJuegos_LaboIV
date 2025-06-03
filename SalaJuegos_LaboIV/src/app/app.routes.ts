import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { RegisterComponent } from './components/register/register.component';
import { ChatComponent } from './components/chat/chat/chat.component';
import { RankingsComponent } from './components/rankings/rankings.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { VisualEncuestasComponent } from './components/visual-encuestas/visual-encuestas.component';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
    {path: "", redirectTo: "/login", pathMatch:"full"},
    {path: "login", component: LoginComponent},
    {path: "registrarse", component: RegisterComponent, canActivate: [authGuard]},
    {path: "home", component: HomeComponent, canActivate: [authGuard]},
    {path: "quien-soy", component: QuienSoyComponent, canActivate: [authGuard]},
    {path: "chat", component: ChatComponent, canActivate: [authGuard]},
    {path: "rankings", component: RankingsComponent, canActivate: [authGuard]},
    {path: "encuesta", component: EncuestaComponent, canActivate: [authGuard]},
    {path: "historialEncuestas", component: VisualEncuestasComponent, canActivate: [authGuard]},
    {path: 'juegos',loadChildren: () => import('./modules/juegos/juegos.module').then(m => m.JuegosModule), canActivate: [authGuard]},
    {path: "**", component: NotFoundComponent}
];
