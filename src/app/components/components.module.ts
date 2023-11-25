import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HandlerComponent } from './handler/handler.component';

@NgModule({
  declarations: [HandlerComponent],
  imports: [CommonModule, FormsModule],
  exports: [HandlerComponent],
})
export class ComponentsModule {}
