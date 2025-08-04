import { Component } from '@angular/core';
import { LoginDto } from '../../dto/login-dto';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  loginDto: LoginDto = {
    username: '',
    email: '',
    password: ''
  };



  constructor(private loginService: LoginService) { }


  formSubmit(registrationForm: NgForm): void {


    if (!this.loginDto.username || !this.loginDto.email || !this.loginDto.password) {
      Swal.fire({ icon: "warning", title: "Please fill the all fields." });
      return;
    }


    this.loginService.doRegistration(this.loginDto).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: data,
          text: 'now you are able to login using this data',
          confirmButtonText: 'OK',
        });
        console.log(this.loginDto)
        registrationForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed!',
          text: error.error,
          confirmButtonText: 'OK'
        });

        console.error('Registration error:', error);
      }
    });
  }
}

