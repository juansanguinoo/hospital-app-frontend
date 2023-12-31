import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environments';
import { Observable, of } from 'rxjs';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UpdateForm } from '../interfaces/update-form.interface';
import { GetUsersResponse } from '../interfaces/get-users.interface';

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
    return this.user?._id || '';
  }

  get role(): string {
    return this.user?.role || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  saveLocalStorage(token: string, menu: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
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

    return this.http.put(url, user, this.headers);
  }

  login(user: LoginForm): Observable<any> {
    const url = `${baseUrl}/auth/login`;

    return this.http.post(url, user).pipe(
      tap((resp: any) => {
        this.saveLocalStorage(resp['token'], resp['menu']);
      })
    );
  }

  loginWithGoogle(token: string): Observable<any> {
    const url = `${baseUrl}/auth/login/google`;

    return this.http.post(url, { token }).pipe(
      tap((resp: any) => {
        this.saveLocalStorage(resp['token'], resp['menu']);
      })
    );
  }

  verifyJWT(): Observable<boolean> {
    const url = `${baseUrl}/auth/verify-jwt`;

    return this.http.get(url, this.headers).pipe(
      map((resp: any) => {
        const { email, google, name, role, img, _id } = resp['user'];

        this.user = new User(name, email, '', role, google, img, _id);

        this.saveLocalStorage(resp['token'], resp['menu']);
        return true;
      }),
      catchError((error: any) => of(false))
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    google.accounts.id.revoke('juandavidsanol@gmail.com', () => {
      this.router.navigateByUrl('/auth/login');
    });
  }

  getUsers(from: number = 0): Observable<any> {
    const url = `${baseUrl}/users/get-users?from=${from}`;

    return this.http.get<GetUsersResponse>(url, this.headers).pipe(
      delay(500),
      map((resp) => {
        const users = resp.users.map(
          (user) =>
            new User(
              user.name,
              user.email,
              '',
              user.role,
              user.google,
              user.img,
              user._id
            )
        );
        return {
          total: resp.total,
          users,
        };
      })
    );
  }

  deleteUser(uid: string): Observable<any> {
    const url = `${baseUrl}/users/delete-user/${uid}`;

    return this.http.delete(url, this.headers);
  }

  updateRole(user: User): Observable<any> {
    const url = `${baseUrl}/users/update-user/${user._id}`;

    return this.http.put(url, user, this.headers);
  }
}
