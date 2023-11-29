import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styles: [],
})
export class AccountComponent implements OnInit {
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.handleCheckCurrentTheme();
  }

  handleChangeTheme(theme: string) {
    this.settingsService.handleChangeTheme(theme);
  }
}
