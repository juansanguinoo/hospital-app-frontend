import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  public linkTheme = document.querySelector('#theme');
  public links: NodeListOf<Element> | undefined;

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.handleCheckCurrentTheme();
  }

  handleChangeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;

    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);

    this.handleCheckCurrentTheme();
  }

  handleCheckCurrentTheme() {
    if (this.links) {
      this.links.forEach((link) => {
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
