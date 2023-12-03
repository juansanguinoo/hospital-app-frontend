import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { UploadService } from 'src/app/services/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-images',
  templateUrl: './modal-images.component.html',
  styles: [],
})
export class ModalImagesComponent {
  public image: File | undefined;
  public tempImage: string | undefined;

  constructor(
    public modalService: ModalService,
    public uploadService: UploadService
  ) {}

  closeModal() {
    this.tempImage = undefined;
    this.modalService.closeModal();
  }

  handleImage(event: any) {
    const file: File = event.target.files[0];
    if (!file) {
      this.image = undefined;
      this.tempImage = undefined;
      return;
    }
    if (file.type.indexOf('image') < 0) {
      this.image = undefined;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.tempImage = reader.result as string;
    };
    this.image = file;
  }

  uploadImage() {
    const uid = this.modalService.id;
    const model = this.modalService.model;

    this.uploadService
      .updateImage(this.image!, model, uid)
      .then((img) => {
        Swal.fire('Success', 'Image updated successfully', 'success');
        this.modalService.imageUploaded.emit(img);
        this.closeModal();
      })
      .catch((error) => {
        Swal.fire('Error', error.error.message, 'error');
      });
  }
}
