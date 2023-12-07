import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-doctor',
  templateUrl: './card-doctor.component.html',
  styles: [],
})
export class CardDoctorComponent implements OnInit {
  public doctorForm: FormGroup = new FormGroup({});
  public hospitals: Hospital[] = [];
  public selectedHospital: Hospital = new Hospital('');
  public selectedDoctor: Doctor = new Doctor('');

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      if (id !== 'create') {
        this.getDoctorById(id);
      }
    });

    this.formInit();
    this.getHospitals();
    this.handleHospitalChange();
  }

  handleHospitalChange(): void {
    this.doctorForm.get('hospital')?.valueChanges.subscribe((res) => {
      this.selectedHospital = this.hospitals.find(
        (hospital) => hospital._id === res
      )!;
    });
  }

  formInit(): void {
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    });
  }

  handleSubmit(): void {
    if (this.selectedDoctor._id) {
      const data = {
        ...this.doctorForm.value,
        _id: this.selectedDoctor._id,
      };

      this.doctorService.updateDoctor(data).subscribe({
        next: (res: any) => {
          Swal.fire('Success', 'Doctor updated successfully', 'success');
          this.router.navigateByUrl(`/dashboard/doctors/${res.doctor._id}`);
        },
        error: (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        },
      });
    } else {
      this.doctorService.createHospital(this.doctorForm.value).subscribe({
        next: (res: any) => {
          Swal.fire('Success', 'Doctor created successfully', 'success');
          this.router.navigateByUrl(`/dashboard/doctors/${res.doctor._id}`);
        },
        error: (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        },
      });
    }
  }

  getHospitals(): void {
    this.hospitalService.getHospitals().subscribe((res) => {
      this.hospitals = res;
    });
  }

  getDoctorById(id: string): void {
    this.doctorService
      .getDoctorById(id)
      .pipe(delay(100))
      .subscribe({
        next: (res: any) => {
          this.selectedDoctor = res.doctor;
          this.doctorForm.setValue({
            name: res.doctor.name,
            hospital: res.doctor.hospital!._id,
          });
        },
        error: (err) => {
          console.log(err);
          this.router.navigateByUrl(`/dashboard/doctors`);
        },
      });
  }
}
