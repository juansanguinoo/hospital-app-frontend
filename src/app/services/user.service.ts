import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environments';
import { Observable, of } from 'rxjs';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

const baseUrl = environment.baseUrl;
declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

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

  loginWithGoogle(token: string): Observable<any> {
    const url = `${baseUrl}/auth/login/google`;

    return this.http.post(url, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp['token']);
      })
    );
  }

  verifyJWT(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    const url = `${baseUrl}/auth/verify-jwt`;

    return this.http
      .get(url, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp['token']);
        }),
        map((resp) => {
          return true;
        }),
        catchError((error: any) => of(false))
      );
  }

  logout(): void {
    localStorage.removeItem('token');

    google.accounts.id.revoke('juandavidsanol@gmail.com', () => {
      this.router.navigateByUrl('/auth/login');
    });
  }
}
