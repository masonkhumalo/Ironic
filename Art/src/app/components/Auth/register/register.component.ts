import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  
})
export class RegisterComponent implements OnInit {
  response: string | undefined;


  public isVisible: boolean = false;
  public error: boolean = false;

  


  regForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      contactno: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      user_type: new FormControl('', [Validators.required]),
    }
  )

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private AuthService: AuthService) { }

  ngOnInit(): void {
    this.regForm
  }


  onSubmit() {

    let UserObject = {
      lastname: this.regForm.value.lastname,
      email: this.regForm.value.email,
      firstname: this.regForm.value.firstname,
      user_type: Number(this.regForm.value.user_type),
      contactno: this.regForm.value.contactno,
      password: this.regForm.value.password,
      picture: this.regForm.value.picture
    }

    console.log(UserObject)

    this.AuthService.register(UserObject).subscribe((next:any) => {
      console.log('Successfully Registered!!!')
     
      this.isVisible = true;
      setTimeout(()=> this.router.navigateByUrl('/login'),1100),
      setTimeout(()=> this.isVisible = false,1000)
      return;

    },(err) => {
   
      console.log("Not Registered!!!");
      this.error = true;
      setTimeout(()=> this.error = false,1000)
      return;
    }
    )

  }


}