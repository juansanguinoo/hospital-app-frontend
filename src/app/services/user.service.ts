import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap } from 'rxjs/operators';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(user: RegisterForm): Observable<any> {
    const url = `${baseUrl}/users/create-user`;

    return this.http.post(url, user).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp['token']);
      })
    );
  }

  login(user: LoginForm): Observable<any> {
    const url = `${baseUrl}/auth/login`;

    return this.http.post(url, user).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp['token']);
      })
    );
  }
}
