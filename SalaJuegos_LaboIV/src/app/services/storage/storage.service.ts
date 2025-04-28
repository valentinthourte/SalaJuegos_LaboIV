import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private USER_KEY = "user";
  saveUser(user: { email: string | undefined; password: string | undefined; }) {
    if (user != undefined) {
      this.writeKey(this.USER_KEY, JSON.stringify(user))
    }
  }
  
  constructor() { }
  
  
  private readKey(key: string)
  {
    return(key != null && key != undefined && key != "") ? sessionStorage.getItem(key) : "";
  }
  
  private writeKey(key: string, value: string) {
    sessionStorage.setItem(key, value);    
  }
  
  private removeItem(key: string) {
    sessionStorage.removeItem(key);
  }
  
  public getUser() {
    return this.readKey(this.USER_KEY);
  }
  public removeUser() {
    this.removeItem(this.USER_KEY);
  }
}
