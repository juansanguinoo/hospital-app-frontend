import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-images',
  templateUrl: './modal-images.component.html',
  styleUrls: ['./modal-images.component.css'],
})
export class ModalImagesComponent {
  public showModal: boolean = false;

  constructor() {}

  handleModal() {
    this.showModal = true;
  }
}
