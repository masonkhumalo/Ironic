import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../app/interface/user';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl = "http://localhost:3300"
  isLoggedIn$: any;
  EditUserForm(): any {
    throw new Error('Method not implemented.');
  }

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }
  
  register(value:User){
    return this.httpClient.post(`${this.baseUrl}/register`,value)
  }

  login(loginDetails:any){
    return this.httpClient.post(`${this.baseUrl}/login`,loginDetails)
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

}