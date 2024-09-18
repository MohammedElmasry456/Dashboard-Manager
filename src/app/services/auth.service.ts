import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { LoginAuth, ResetPasswordAuth, SendMailAuth, verifyCodeAuth } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  hostName:string = "";
  routeName:string = "";
  currentUser = new BehaviorSubject(null);
  img:string = 'images/shop2.webp';

  constructor(private _HttpClient:HttpClient,private _Router:Router,private _GlobalService:GlobalService) {
    this.hostName = _GlobalService.hostName;
    this.routeName = _GlobalService.authRoute;
    if(localStorage.getItem("token"))
      {
       this.getCurrentUser();
       this.checkToken();
      }
   }

   checkToken()
   {
     const token:any = localStorage.getItem('token');
     const check = jwtDecode(token).exp;
     if(check! < (Date.now()/1000))
     {
       this.logout()
       this._Router.navigate(['/login'])
     }
   }

   getCurrentUser()
  {
   const token:any = localStorage.getItem('token');
   this.currentUser.next(jwtDecode(token));

  }

   login(formData:LoginAuth):Observable<any>
   {
     return this._HttpClient.post(`${this.hostName}${this.routeName}/login`,formData)
   }

   logout()
   {
     localStorage.removeItem("token");
     this.currentUser.next(null)
   }

   sendMail(formData: SendMailAuth): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routeName}/forgetPassword`, formData)
  }

  verifyCode(formData: verifyCodeAuth): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routeName}/verifyCode`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('verify')}` } })
  }

  resetPassword(formData: ResetPasswordAuth): Observable<any> {
    return this._HttpClient.put(`${this.hostName}${this.routeName}/resetCode`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('verify')}` } })
}

}
