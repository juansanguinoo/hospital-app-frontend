import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor() {}

  async updateImage(
    file: File,
    model: 'users' | 'doctors' | 'hospitals',
    id: string
  ) {
    try {
      const url = `${baseUrl}/upload/${model}/${id}`;

      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: formData,
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
