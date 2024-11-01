import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  isFormSubmitted: boolean = false;

  constructor(private router: Router, private http: HttpClient) {
    this.loginForm = new FormGroup({
      role: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.maxLength(8),
        Validators.pattern(
          '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*(),.?":{}|<>]{1,8}$'
        )
      ])
    });
  }

  submit() {
    this.isFormSubmitted = true;

    // Get values from form controls
    const role = this.loginForm.get('role')?.value;
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    console.log('Role:', role);
    console.log('Email:', email);
    console.log('Password:', password);

    let bodyData = {
      role: role,
      email: email,
      password: password,
    };

    this.http.post("http://localhost:8085/api/v1/employee/login", bodyData).subscribe((resultData: any) => {
      console.log('Result Data:', resultData);

      if (resultData.message === "Email not exists") {
        alert("Email does not exist");
      } else if (resultData.message === "Login Success") {
        this.router.navigateByUrl('/home');
      } else if (resultData.message === "Access Denied - Role mismatch") {
        alert("Access Denied - Role mismatch");
      } else {
        alert("Incorrect Email or Password do not match");
      }
    }, error => {
      console.error('Login error:', error);
      alert("An error occurred while trying to log in.");
    });
  }
}
