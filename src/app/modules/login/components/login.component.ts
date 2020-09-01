import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Login } from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  errorMessage: string;
  pageTitle = 'Log In';

  constructor(private authService: AuthService,
    private router: Router) { }

  login(loginForm: NgForm) {
    if (loginForm && loginForm.valid) {
      const login: Login = {
        password: loginForm.form.value.password,
        username: loginForm.form.value.userName
      }
      this.authService.login(login).subscribe({
        next: () => {
          this.router.navigate(['/employees'])
        },
        error: err => this.errorMessage = "Invalid username/password"
      });

    }
  }
}
