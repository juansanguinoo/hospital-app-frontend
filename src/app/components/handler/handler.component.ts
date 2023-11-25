import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-handler',
  templateUrl: './handler.component.html',
  styleUrls: ['./handler.component.css'],
})
export class HandlerComponent {
  @Input() progressValue: number = 0;
  @Input() btnClass: string = 'btn btn-primary';

  @Output() handleOutputValue: EventEmitter<number> =
    new EventEmitter<number>();

  handleChangeValue(value: number) {
    if (this.progressValue >= 100 && value >= 0) {
      this.handleOutputValue.emit(0);
      return (this.progressValue = 0);
    }

    if (this.progressValue <= 0 && value < 0) {
      this.handleOutputValue.emit(0);
      return (this.progressValue = 0);
    }

    this.progressValue += value;
    this.handleOutputValue.emit(this.progressValue);
    return this.progressValue;
  }

  onChangeValue(event: number) {
    switch (true) {
      case event >= 100:
        this.progressValue = 100;
        this.handleOutputValue.emit(this.progressValue);
        break;
      case event <= 0:
        this.progressValue = 0;
        this.handleOutputValue.emit(this.progressValue);
        break;
      default:
        this.progressValue = event;
        this.handleOutputValue.emit(this.progressValue);
        break;
    }
  }
}
