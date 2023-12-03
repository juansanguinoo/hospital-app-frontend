import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _hideModal: boolean = true;

  get toggleModal(): boolean {
    return this._hideModal;
  }

  openModal() {
    this._hideModal = false;
  }

  closeModal() {
    this._hideModal = true;
  }

  constructor() {}
}
