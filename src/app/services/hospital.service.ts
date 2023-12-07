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

  createHospital(name: string): Observable<Hospital> {
    const url = `${baseUrl}/hospital/create-hospital`;

    return this.http.post<Hospital>(url, { name }, this.headers);
  }

  updateHospital(name: string, id: string): Observable<Hospital> {
    const url = `${baseUrl}/hospital/update-hospital/${id}`;

    return this.http.put<Hospital>(url, { name }, this.headers);
  }

  deleteHospital(id: string): Observable<void> {
    const url = `${baseUrl}/hospital/delete-hospital/${id}`;

    return this.http.delete<void>(url, this.headers);
  }
}
