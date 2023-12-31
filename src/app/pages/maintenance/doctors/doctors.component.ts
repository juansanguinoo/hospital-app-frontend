import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalService } from 'src/app/services/modal.service';
import { SearchService } from 'src/app/services/search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [],
})
export class DoctorsComponent implements OnInit, OnDestroy {
  public doctors: Doctor[] = [];
  public loading: boolean = true;
  public $img: Subscription = new Subscription();

  constructor(
    private doctorService: DoctorService,
    private modalService: ModalService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.getDoctors();

    this.$img = this.modalService.imageUploaded
      .pipe(delay(200))

      .subscribe((img) => {
        this.getDoctors();
      });
  }

  ngOnDestroy(): void {
    this.$img.unsubscribe();
  }

  getDoctors() {
    this.loading = true;

    this.doctorService.getDoctors().subscribe((doctors) => {
      this.loading = false;
      this.doctors = doctors;
    });
  }

  openModal(doctor: Doctor) {
    this.modalService.openModal(
      'doctors',
      doctor._id!,
      doctor.img ? doctor.img : 'no-image'
    );
  }

  handleSearch(value: string) {
    if (value.length === 0) {
      return this.getDoctors();
    }

    this.searchService.filter(value, 'doctors').subscribe((doctors) => {
      this.doctors = doctors;
    });
  }

  deleteDoctor(doctor: Doctor) {
    return Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás a punto de borrar a ${doctor.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.value) {
        this.doctorService.deleteDoctor(doctor._id!).subscribe(() => {
          this.getDoctors();
          Swal.fire(
            'Usuario borrado',
            `El usuario ${doctor.name} ha sido borrado`,
            'success'
          );
        });
      }
    });
  }
}
