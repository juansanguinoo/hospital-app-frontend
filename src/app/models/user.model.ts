import { environment } from 'src/environments/environments';

const baseUrl = environment.baseUrl;

export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public role?: string,
    public google?: boolean,
    public img?: string,
    public uid?: string
  ) {}

  get imageUrl() {
    if (this.img?.includes('https')) {
      return this.img;
    }

    if (this.img) {
      return `${baseUrl}/upload/users/${this.img}`;
    }

    return `${baseUrl}/upload/users/no-image`;
  }
}
