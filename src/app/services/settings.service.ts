import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');

  constructor() {
    const url =
      localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';

    this.linkTheme?.setAttribute('href', url);
  }

  handleChangeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;

    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);

    this.handleCheckCurrentTheme();
  }

  handleCheckCurrentTheme() {
    const links = document.querySelectorAll('.selector');

    if (links) {
      links.forEach((link) => {
        link.classList.remove('working');
        const btnTheme = link.getAttribute('data-theme');
        const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
        const currentTheme = this.linkTheme?.getAttribute('href');

        if (btnThemeUrl === currentTheme) {
          link.classList.add('working');
        }
      });
    }
  }
}
