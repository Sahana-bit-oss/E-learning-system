import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-register',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    // Initialize form group with form controls
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: new FormControl("", [
        Validators.required,
        Validators.maxLength(8),
        Validators.pattern(
          '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*(),.?":{}|<>]{1,8}$'
        )
      ]),
      acceptTerms:[false,Validators.requiredTrue]
    });
  }

  save(): void {
    if (this.registerForm.invalid) {
      alert("Please fill out all fields correctly.");
      return;
    }

    const role = "Admin";

    const bodyData = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      role: role
    };

    console.log('username:', bodyData.username);
    console.log('Email:', bodyData.email);
    console.log('Password:', bodyData.password);

    this.http.post("http://localhost:8085/api/v1/user/save", bodyData, { responseType: 'text' }).subscribe(
      (resultData: any) => {
        alert("Admin Registered Successfully");
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error("Registration error:", error);
        alert("An error occurred during registration.");
      }
    );
  }
}
