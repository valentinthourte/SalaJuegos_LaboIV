import { Component, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { StorageService } from './services/storage/storage.service';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SalaJuegos_LaboIV';
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

  getUsuario() {
    return this.loginService.getUser().email;
  }

  onLogout() {
    this.loginService.logout();
    this.router.navigate(["login"])
  }
}
