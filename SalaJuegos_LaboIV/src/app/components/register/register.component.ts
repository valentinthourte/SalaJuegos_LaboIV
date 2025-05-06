import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  protected email: string | undefined;
  protected name: string | undefined;
  protected password: string | undefined;
  protected errorMsg: string = "";
  protected loginFailed: boolean = false;
  constructor(private router: Router, private loginService: LoginService ) {
    
  }

  signUp() {
    if (this.validateFields()) {
      this.loginFailed = false;
      this.loginService.signUp(this.email!, this.password!, this.name!).then((result) => {
        if (result) {
          console.log("Login exitoso!");
          this.router.navigate(["/home"]);
        }
      })
      .catch(error => {
        console.error("Error en login:", error.message);
        this.errorMsg = "Login fallido: " + error.message;
        this.loginFailed = true;
      });;
    }
  }
  validateFields() {
    return this.email != undefined && this.email != "" && this.password != undefined && this.password != "" && this.name != undefined && this.name != "";
  }
}

