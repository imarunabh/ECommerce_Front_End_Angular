import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { map, Observable, tap } from 'rxjs';

const BASIC_URL = 'http://localhost:8080/';

export const AUTH_HEADER = 'authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient,
              private storage:StorageService
  ) { }

  login(email:string,password:string):Observable<any>{
    return this.http.post(BASIC_URL + 'authenticate',{
      email,password
    },{observe:'response'})
    .pipe(tap(__=>this.log("User Authentication")),
    map((res:HttpResponse<any>)=>{
      this.storage.saveUser(res.body);
      const token = res.headers.get(AUTH_HEADER) || '';  // Fallback to empty string if null
      const tokenLength = token.length;
      const bearerToken = token.substring(7, tokenLength);
      console.log(tokenLength);
      console.log(bearerToken);
      this.storage.saveToken(bearerToken);
      return res;
    })
  )
  }
  log(message:string){
    console.log(message);
  }
}
