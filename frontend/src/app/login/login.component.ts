import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm:FormGroup;
  isFormSubmitted:boolean=false;

  constructor(){
    this.loginForm=new FormGroup({
       userName:new FormControl("",[Validators.required]),
       email:new FormControl("",[Validators.required,Validators.email]),
       password:new FormControl("",[Validators.required,Validators.maxLength(8),Validators.pattern(
        '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*(),.?":{}|<>]{1,8}$')])
    })
  }
  submit(){
    this.isFormSubmitted=true;
  }
}
