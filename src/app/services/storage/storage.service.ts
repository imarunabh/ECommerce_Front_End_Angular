import { Injectable } from '@angular/core';
const USER = 'c_user';
const TOKEN = 'c_token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public saveUser(user:any){
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER,JSON.stringify(user));
    
  }

  public saveToken(token:string){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);
  }

  static getToken():string{
    return window.localStorage.getItem(TOKEN);
  }

  static getUser():any{
    return JSON.parse(localStorage.getItem(USER));
  }

  static getUserId(){
    const user = this.getUser();
    if(user==null) return '';
    return user.userId;
  }

  static getUserRole():string{
    const user = this.getUser();
    if(user==null)
      return '';

    return user.role;
  }

  static isAdminLoggedIn():boolean{
    if(this.getToken()==null)
      return false;

    const role:string = this.getUserRole();
    return role=="ADMIN";
  }

  static isStudentLoggedIn():boolean{
    if(this.getToken()==null)
      return false;

    const role:string = this.getUserRole();
    return role=="STUDENT";
  }

  static isTeacherLoggedIn():boolean{
    if(this.getToken()==null)
      return false;

    const role:string = this.getUserRole();
    return role=="TEACHER";
  }

  static logout(){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }

  static hasToken():boolean{
    if(this.getToken()==null){
      return false;
    }
    return true;
  }
}
