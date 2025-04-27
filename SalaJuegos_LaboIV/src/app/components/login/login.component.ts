import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { createClient } from '@supabase/supabase-js'
import { environment } from '../../../environments/environment';
import { LoginService } from '../../services/login/login.service';

const supabase = createClient(environment.apiUrl, environment.publicAnonKey)

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  username: string = "";
  password: string = "";
  failedLogin: boolean = false;
  
  constructor(private loginService: LoginService, private router: Router) {
    
  }
  
  
  login() {
    this.failedLogin = false;

    this.loginService.login(this.username, this.password).then(success => {
      if (success) {
        console.log("login exitoso, redireccionando a home");
        this.router.navigate(['home']);
      } else {
        this.failedLogin = true;
      }
    });
  }

  onAutocompletar() {
    this.username = "cekegey447@hedotu.com";
    this.password = "123456";
  }

}
