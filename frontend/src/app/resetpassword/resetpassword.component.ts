import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [RouterLink,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {
  resetForm:FormGroup;
  isFormSubmitted:boolean=false;

  constructor(){
    this.resetForm=new FormGroup({
       email:new FormControl("",[Validators.required,Validators.email]),
       password:new FormControl("",[Validators.required,Validators.maxLength(8),Validators.pattern(
        '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*(),.?":{}|<>]{1,8}$')]),
      acceptTerms:new FormControl(false,[Validators.requiredTrue])
    })
  }
  submit(){
    this.isFormSubmitted=true;
  }
}
