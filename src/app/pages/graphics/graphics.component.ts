import { Component } from '@angular/core';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styles: [],
})
export class GraphicsComponent {
  public salesLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public salesData = {
    labels: this.salesLabels,
    datasets: [{ data: [350, 450, 100] }],
  };

  public shoppingLabels = ['Shopping', 'Eating', 'Sleeping'];
  public shoppingData = {
    labels: this.shoppingLabels,
    datasets: [{ data: [23, 456, 1] }],
  };

  public stockLabels = ['BMW', 'Audi', 'Tesla'];
  public stockData = {
    labels: this.stockLabels,
    datasets: [{ data: [5, 3, 1] }],
  };

  public retailLabels = ['BMW', 'Audi', 'Tesla'];
  public retailData = {
    labels: this.retailLabels,
    datasets: [{ data: [500, 345, 156] }],
  };
}
