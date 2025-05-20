import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { UserData } from '../../models/user-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  user: UserData;
  juegos = [
    { nombre: 'ahorcado', titulo: 'Ahorcado', imagen: 'assets/ahorcado.png' },
    { nombre: 'mayormenor', titulo: 'Mayor o menor', imagen: 'assets/mayoromenor.png' },
    { nombre: 'preguntados', titulo: 'Preguntados', imagen: 'assets/preguntados.png' },
    { nombre: 'multiplicalo', titulo: 'Multiplícalo', imagen: 'assets/multiplicalo.png' },
  ];
  constructor(private router: Router, private loginService: LoginService) {
    this.user = {
      id: 0,
      authId: "",
      created_at: "",
      email: "",
      name: ""
    }
  }
  ngAfterViewInit(): void {
    if (this.loginService.IsLoggedIn() == false) {
      this.router.navigate(['/login'])
    }
  }

  ngOnInit(): void {
    if (this.loginService.IsLoggedIn() == false) {
      this.router.navigate(['/login'])
    }
    else {
      this.user = this.loginService.getUser();
    }
    
  }

  
onClickJuego(juego: string) {
  this.router.navigate(['juegos',juego]);
  }

}
