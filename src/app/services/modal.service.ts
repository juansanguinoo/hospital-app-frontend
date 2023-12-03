import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

const baseUrl: string = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public image: string = '';
  public model: 'users' | 'hospitals' | 'doctors' = 'users';
  public id: string = '';
  private _hideModal: boolean = true;

  public imageUploaded: EventEmitter<string> = new EventEmitter<string>();

  get toggleModal(): boolean {
    return this._hideModal;
  }

  openModal(
    model: 'users' | 'hospitals' | 'doctors',
    id: string,
    image: string = 'no-image'
  ) {
    this._hideModal = false;
    this.model = model;
    this.id = id;
    if (image.includes('https')) {
      this.image = image;
    } else {
      this.image = `${baseUrl}/upload/${model}/${image}`;
    }
  }

  closeModal() {
    this._hideModal = true;
  }
}
