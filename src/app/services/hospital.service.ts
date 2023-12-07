import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environments';
import { GetHospitalsResponse } from '../interfaces/get-hospitals.interface';
import { Hospital } from '../models/hospital.model';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(private http: HttpClient) {}

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  getHospitals(): Observable<Hospital[]> {
    const url = `${baseUrl}/hospital/get-hospitals`;

    return this.http
      .get<GetHospitalsResponse>(url, this.headers)
      .pipe(map((res) => res.hospitals));
  }
}
