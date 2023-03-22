import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder ,FormGroup ,FormControl , Validators} from '@angular/forms';
import { JwtService } from 'src/app/services/jwt.service';
import {UserD} from 'src/app/interface/user-d';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  userd: UserD| null = {
    user_id: 0,
    firstname: '',
    lastname: '',
    user_type: 0,
    email: '',
    picture: '',
    contactno: 0,
  };

  loginForm: FormGroup = new FormGroup(
    {
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    }
  )

  submitted = false;
  role: number = 0;

  public isVisible: boolean = false;
  public error: boolean = false;


  constructor(private jwt:JwtService ,private auth:AuthService ,private http:HttpClient ,private router:Router ,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.loginForm
  }



  onSubmit(form:FormGroup) {
    //console.log(form.value)


    this.auth.login(form.value).subscribe(
      (results:any)=>{ 
        this.auth.saveToken(results.token);
        this.userd = this.jwt.getData(results.token);
        // console.log(this.user)

        if(this.userd!=null) {
          localStorage.setItem('role', JSON.stringify (this.userd.user_type));
          this.role = this.userd.user_type;
          
       }


        if (this.role == 1) {

          this.isVisible = true;
          setTimeout(()=>  this.router.navigateByUrl('/sellerhome'),1100)
          setTimeout(()=> this.isVisible = false,1000)
        
          

        } else if (this.role == 2) {
          this.isVisible = true;
          setTimeout(()=>  this.router.navigateByUrl('/clienthome'),1100)
          setTimeout(()=> this.isVisible = false,1000)
        } 
    
      },
      (error: HttpErrorResponse) => {
        this.error = true;
        console.log(error);
        setTimeout(()=> this.error = false,1000)
        return;
      }
    )

  }

}
