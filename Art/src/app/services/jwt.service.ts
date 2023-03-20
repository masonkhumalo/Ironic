import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../app/interface/user';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private helper = new JwtHelperService();
  user !: User

  constructor() { }

  getData(token:string):any|null{

    if(this.helper.isTokenExpired(token)){
      return null
    }else{
      this.user = JSON.parse(JSON.stringify(this.helper.decodeToken(token)))
    return this.user;
    }
  }
}