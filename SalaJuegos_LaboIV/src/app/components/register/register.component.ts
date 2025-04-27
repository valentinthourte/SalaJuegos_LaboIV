import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
username: string;
password: string;
name: string = '';
age: number = 0;
avatarFile: File | null = null;

protected huboError: boolean = false;

constructor(private loginService: LoginService, private router: Router) {
  this.username = '';
  this.password = '';
}

register() {
  this.huboError = false ;
  this.loginService.signUp(this.username, this.password, this.name, this.age, this.avatarFile).then((success) => {
    if (success) {
      console.log("registro exitoso, redireccionando a home");
      this.router.navigate(['home']);
    }
    else {
      this.huboError = true;
    }
  });
}

onFileSelected(event: any) {
  const originalFile = event.target.files[0];
  const newFileName = this.username + "-" + this.avatarFile?.name; // cambiá esto como quieras

  if (originalFile) {
    this.avatarFile = new File(
      [originalFile],
      newFileName,
      {
        type: originalFile.type,
        lastModified: originalFile.lastModified
      }
    );
  }
}


}
