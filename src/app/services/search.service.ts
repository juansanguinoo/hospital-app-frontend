import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Hospital } from '../models/hospital.model';
import { Doctor } from '../models/doctor.model';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  private mapperUsers(users: any[]): User[] {
    return users.map(
      (user) =>
        new User(
          user.name,
          user.email,
          '',
          user.role,
          user.google,
          user.img,
          user.uid
        )
    );
  }

  private mapperHospitals(hospitals: any[]): Hospital[] {
    return hospitals;
  }

  private mapperDoctors(doctors: any[]): Doctor[] {
    return doctors;
  }

  filter(
    query: string,
    model: 'users' | 'hospitals' | 'doctors'
  ): Observable<any> {
    const url = `${baseUrl}/search/${model}/${query}`;

    return this.http.get(url, this.headers).pipe(
      map((resp: any) => {
        switch (model) {
          case 'users':
            return this.mapperUsers(resp.results);
          case 'hospitals':
            return this.mapperHospitals(resp.results);
          case 'doctors':
            return this.mapperDoctors(resp.results);
          default:
            return [];
        }
      })
    );
  }

  search(query: string): Observable<any> {
    const url = `${baseUrl}/search/${query}`;

    return this.http.get(url, this.headers);
  }
}
