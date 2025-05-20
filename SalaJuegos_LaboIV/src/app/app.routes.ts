import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { RegisterComponent } from './components/register/register.component';
import { ChatComponent } from './components/chat/chat/chat.component';
import { RankingsComponent } from './components/rankings/rankings.component';


export const routes: Routes = [
    {path: "", redirectTo: "/login", pathMatch:"full"},
    {path: "login", component: LoginComponent},
    {path: "registrarse", component: RegisterComponent},
    {path: "home", component: HomeComponent},
    {path: "quien-soy", component: QuienSoyComponent},
    {path: "chat", component: ChatComponent},
    {path: "rankings", component: RankingsComponent},
    {path: 'juegos',loadChildren: () => import('./modules/juegos/juegos.module').then(m => m.JuegosModule)},
    {path: "**", component: NotFoundComponent}
];
