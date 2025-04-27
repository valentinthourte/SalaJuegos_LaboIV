import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { UserData } from '../../models/user-data';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  user: UserData;
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

}
