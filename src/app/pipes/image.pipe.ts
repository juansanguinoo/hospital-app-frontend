import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environments';

const baseUrl = environment.baseUrl;

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(
    img: string | undefined,
    model: 'users' | 'doctors' | 'hospitals'
  ): string {
    if (img?.includes('https')) {
      return img;
    }

    if (img) {
      return `${baseUrl}/upload/${model}/${img}`;
    }

    return `${baseUrl}/upload/users/no-image`;
  }
}
