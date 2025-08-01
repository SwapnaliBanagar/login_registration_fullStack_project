import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { NgForm } from '@angular/forms';
import { LoginDto } from '../../dto/login-dto';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login: LoginDto = {
    username: '',
    email: '',
    password: ''
  };



  constructor(private loginService: LoginService) { }

  submitLoginForm(loginForm: NgForm): void {


    // all fields compulsory
    if (!this.login.username || !this.login.email || !this.login.password) {
      Swal.fire({ icon: "warning", title: "Please fill the all fields." });
      return;
    }


    this.loginService.doLogin(this.login).subscribe({
      next: (data) => {
        Swal.fire({ icon: "success", title: data, text: "Welcome...." })

        loginForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        console.log(this.login);
        console.log(error)
        Swal.fire({ icon: "error", title: "Try again", text: error.error })
      }

    });
  }
}
