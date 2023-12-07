import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-card-doctor',
  templateUrl: './card-doctor.component.html',
  styles: [],
})
export class CardDoctorComponent implements OnInit {
  public doctorForm: FormGroup = new FormGroup({});
  public hospitals: Hospital[] = [];

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService
  ) {}

  ngOnInit(): void {
    this.formInit();
    this.getHospitals();
  }

  formInit(): void {
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    });
  }

  handleSubmit(): void {
    console.log(this.doctorForm.value);
  }

  getHospitals(): void {
    this.hospitalService.getHospitals().subscribe((res) => {
      this.hospitals = res;
    });
  }
}
