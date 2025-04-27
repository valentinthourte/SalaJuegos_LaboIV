import { Injectable } from '@angular/core';
import { AuthError, createClient, User } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';


const supabase = createClient(environment.apiUrl, environment.publicAnonKey)

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  
  constructor() { }
  
  login(username: string, password: string) {
    console.log("comenzando login");
    return supabase.auth.signInWithPassword({
      email: username,
      password: password,
    }).then(({ data, error }) => {
      if (error) {
        console.log("Error al loguear: " + error);
        return this.errorIsLockProblem(error);
      } else {
        console.log("exito!");
        return true;
      }
    });
  }

  IsLoggedIn() {
    return sessionStorage.getItem("user") != undefined;
  }

  signUp(username: string, password: string, name: string, age: number, avatarFile: File | null) {
    
    return supabase.auth.signUp({
      email: username,
      password: password,
    }).then(({ data, error }) => {
      if (error) {
        console.error('Error:', error.message);
        return this.errorIsLockProblem(error);
        
      } else {
        console.log('User registered:', data.user);
        return this.saveUserData(data.user!, name, age, avatarFile);
      }
    }
    );
  }
  
  saveUserData(user: User, name: string, age: number, avatarFile: File | null)
  {
    let result;
    const avatarUrl = this.saveFile(avatarFile).then((data) => {
      if (data) { 
    supabase.from('users-data').insert([
      { authId: user.id, name: name, age: age, avatarUrl: data.path  }
    ]).then(({ data, error }) => {
      if (error) {
        console.error('Error:', error.message);
        result = this.errorIsLockProblem(error);
      } else {

        result = true;
      }
    });
  }
  });
  return result
  
  }


  saveUserLocal(user: User) {
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  logout() {
    sessionStorage.removeItem("user");
  }

  
  
  async saveFile(avatarFile: File | null) {
  const { data, error } = await supabase
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

