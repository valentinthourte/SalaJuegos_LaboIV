import { AfterViewInit, Component, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit {

protected email: string | undefined;
protected password: string | undefined;
protected loginFailed: boolean = false;
constructor(private router: Router, private storageService: StorageService, private loginService: LoginService ) {
  
}
  
ngAfterViewInit(): void {
    if (this.loginService.IsLoggedIn()){
      this.router.navigate(['/home']);
    }
  }

  login() {
    this.loginFailed = false;
    if (this.email != undefined && this.password != undefined) {
      this.loginService.login(this.email, this.password).then((result) => {
        if (result) {
          console.log("Login exitoso!");
          this.router.navigate(["/home"]);
        }
        else {
          this.loginFailed = true;
        }
      });
      
    }
  }

  onAutocomplete() {
    this.email = "cekegey447@hedotu.com";
    this.password = "123456";
  }
  registrarse() {  
      this.router.navigate(["/registrarse"])
  }
}
