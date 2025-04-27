import { Injectable } from '@angular/core';
import { createClient, User } from '@supabase/supabase-js';
import { StorageService } from '../storage/storage.service';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private supabase = createClient(environment.apiUrl, environment.publicAnonKey);
  constructor(private storageService: StorageService) { }

  login(username: string, password: string) {
    console.log("comenzando login");
    return this.supabase.auth.signInWithPassword({
      email: username,
      password: password,
    }).then(({ data, error }) => {
      if (error) {
        console.log("Error al loguear: " + error);
        return this.errorIsLockProblem(error);
      } else {
        console.log("exito!");
        this.saveUserLocal(data.user!);
        return true;
      }
    });
  }

  IsLoggedIn() {
    return sessionStorage.getItem("user") != undefined;
  }

  signUp(username: string, password: string, name: string) {
    
    return this.supabase.auth.signUp({
      email: username,
      password: password,
    }).then(({ data, error }) => {
      if (error) {
        console.error('Error:', error.message);
        return this.errorIsLockProblem(error);
        
      } else {
        console.log('User registered:', data.user);
        this.saveUserLocal(data.user!);
        return true;
      }
    }
    );
  }
  
  getUser(): any {
    let user = sessionStorage.getItem("user");
    if (user != undefined) {
      user = JSON.parse(user); 
      return user;
    }
    else {
      return undefined;
    }
  }

  saveUserLocal(user: User) {
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  logout() {
    sessionStorage.removeItem("user");
  }

  async saveFile(avatarFile: File | null) {
  const { data, error } = await this.supabase
    .storage
    .from('images')
    .upload(`users/${avatarFile?.name}`, avatarFile!, {
      cacheControl: '3600',
      upsert: false
    });
  
    return data;
  }

  errorIsLockProblem(error: Error): any {
    return error.name == "NavigatorLockAcquireTimeoutError";
  }

}
