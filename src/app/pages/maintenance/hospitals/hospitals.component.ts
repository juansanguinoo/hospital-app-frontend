import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [],
})
export class HospitalsComponent implements OnInit, OnDestroy {
  public hospitals: Hospital[] = [];
  public loading: boolean = true;
  public $img: Subscription = new Subscription();

  constructor(
    private hospitalService: HospitalService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getHospitals();

    this.$img = this.modalService.imageUploaded
      .pipe(delay(200))

      .subscribe((img) => {
        this.getHospitals();
      });
  }

  ngOnDestroy(): void {
    this.$img.unsubscribe();
  }

  getHospitals() {
    this.loading = true;

    this.hospitalService.getHospitals().subscribe((resp) => {
      this.hospitals = resp;
      this.loading = false;
    });
  }

  updateHospital(hospital: Hospital) {
    this.hospitalService
      .updateHospital(hospital.name, hospital._id!)
      .subscribe((res) => {
        Swal.fire('Hospital updated', hospital.name, 'success');
      });
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalService.deleteHospital(hospital._id!).subscribe((res) => {
      Swal.fire('Hospital deleted', hospital.name, 'success');
      this.getHospitals();
    });
  }

  async handleModal() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Create hospital',
      text: 'Hospital name:',
      input: 'text',
      inputPlaceholder: 'Hospital name',
      showCancelButton: true,
    });

    if (value.trim().length > 0) {
      this.hospitalService.createHospital(value).subscribe((res) => {
        Swal.fire('Hospital created', value, 'success');
        this.getHospitals();
      });
    }
  }

  openModal(hospital: Hospital) {
    this.modalService.openModal(
      'hospitals',
      hospital._id!,
      hospital.img ? hospital.img : 'no-image'
    );
  }
}
