import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environments';
import { Observable, of } from 'rxjs';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UpdateForm } from '../interfaces/update-form.interface';

const baseUrl = environment.baseUrl;
declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: User | undefined;

  constructor(private http: HttpClient, private router: Router) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user?.uid || '';
  }

  get role(): string {
    return this.user?.role || '';
  }

  createUser(user: RegisterForm): Observable<any> {
    const url = `${baseUrl}/users/create-user`;

    return this.http.post(url, user).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp['token']);
      })
    );
  }

  updateUser(user: UpdateForm): Observable<any> {
    const url = `${baseUrl}/users/update-user/${this.uid}`;

    user = {
      ...user,
      role: this.role,
    };

    return this.http.put(url, user, {
      headers: {
        'x-token': this.token,
      },
    });
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
    const url = `${baseUrl}/auth/verify-jwt`;

    return this.http
      .get(url, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const { email, google, name, role, img, _id } = resp['user'];

          this.user = new User(name, email, '', role, google, img, _id);

          localStorage.setItem('token', resp['token']);
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
