import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent {
  public progressValue1: number = 0;
  public progressValue2: number = 0;

  get getProgressValue1(): string {
    return `${this.progressValue1}%`;
  }

  get getProgressValue2(): string {
    return `${this.progressValue2}%`;
  }

  handleChangeValue(value: number): void {
    if (
      this.progressValue1 + value >= 0 &&
      this.progressValue1 + value <= 100
    ) {
      this.progressValue1 += value;
    }
  }
}
