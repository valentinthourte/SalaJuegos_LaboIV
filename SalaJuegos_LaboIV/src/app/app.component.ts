import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Sala de Juegos Valentin Thourte - Laboratorio IV';
  constructor(private router: Router, private loginService: LoginService) {
    
  }

  onClickMenuOption(event: Event) {
    if (this.loginService.IsLoggedIn())
      {
        let route = "/" + (event.target as HTMLButtonElement).name;
        this.router.navigate([route])
      }
      else
      this.router.navigate(["/login"])
  }
  
  isLoggedIn() {
    return this.loginService.IsLoggedIn();
  }

  onLogout() {
    this.loginService.logout();
  }
}
