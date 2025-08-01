import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LoginDto } from '../dto/login-dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }


  doRegistration(loginDto: LoginDto): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/registration`, loginDto, { responseType: 'text' as 'json' });
  }

  doLogin(login: LoginDto): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/login/${login.username}/${login.email}/${login.password}`, { responseType: 'text' as 'json' });
  }
}
