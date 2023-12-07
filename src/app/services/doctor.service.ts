import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Doctor } from '../models/doctor.model';
import { environment } from 'src/environments/environments';
import { GetDoctorsResponse } from '../interfaces/get-doctors.interface';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
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

  getDoctors(): Observable<Doctor[]> {
    const url = `${baseUrl}/doctor/get-doctors`;

    return this.http
      .get<GetDoctorsResponse>(url, this.headers)
      .pipe(map((res) => res.doctors));
  }

  createHospital(doctor: Doctor): Observable<Doctor> {
    const url = `${baseUrl}/doctor/create-doctor`;

    return this.http.post<Doctor>(url, { doctor }, this.headers);
  }

  updateDoctor(doctor: Doctor): Observable<Doctor> {
    const url = `${baseUrl}/doctor/update-doctor/${doctor._id}`;

    return this.http.put<Doctor>(url, { doctor }, this.headers);
  }

  deleteDoctor(id: string): Observable<void> {
    const url = `${baseUrl}/doctor/delete-doctor/${id}`;

    return this.http.delete<void>(url, this.headers);
  }
}
