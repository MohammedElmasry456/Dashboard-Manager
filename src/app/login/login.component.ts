import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit{
  constructor(private _AuthService:AuthService,private _Router:Router){}

  img:string='';
  errorMsg:string='';

  loginForm = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.minLength(6),Validators.maxLength(20)]),
  })
  login(loginForm:FormGroup){
    this._AuthService.login(loginForm.value).subscribe((res)=>{
      if (res.token) {
        localStorage.setItem("token", res.token);
        this._AuthService.getCurrentUser();
      }
      this._Router.navigate(['/home'])
    },(err)=>{
      this.errorMsg = err.error.message;
      console.log(this.errorMsg)
    })
  }

  ngOnInit()
  {
    this.img = this._AuthService.img;
  }
}
