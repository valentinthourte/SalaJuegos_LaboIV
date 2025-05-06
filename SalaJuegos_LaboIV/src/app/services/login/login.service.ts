import { Injectable } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { StorageService } from '../storage/storage.service';
import { environment } from '../../../environments/environment.prod';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private storageService: StorageService, private supabaseService: SupabaseService) { }

  async login(username: string, password: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabaseService.signIn(username, password);
      if (error && !this.errorIsLockProblem(error)) {
        console.log("Error al loguear:", error.message);
        throw error;
      }
      console.log("Login exitoso!");
      this.saveUserLocal(data.user!);
      return true;
    } catch (err) {
      console.error("Excepción en login:", err);
      throw err;
    }
  }
  
  async signUp(username: string, password: string, name: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabaseService.signUp(username, password);
      if (error && !this.errorIsLockProblem(error)) {
        console.log("Error en signUp:", error.message);
        throw error;
      }
      console.log("Registro exitoso!");
      this.saveUserLocal(data.user!);
      return true;
    } catch (err) {
      console.error("Excepción en signUp:", err);
      throw err;
    }
  }

  IsLoggedIn() {
    return sessionStorage.getItem("user") != undefined;
  }
  getUserEmail() {
    return this.getUser().email;
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

  errorIsLockProblem(error: Error): any {
    return error.name == "NavigatorLockAcquireTimeoutError";
  }

}
