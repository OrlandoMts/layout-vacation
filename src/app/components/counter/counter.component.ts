import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styles: [],
})
export class CounterComponent {
  public counter: number = 0;

  constructor() {}

  increaseBy(value: number) {
    this.counter += value;
  }

  increaseButton() {
    this.counter++;
  }

  decreaseButton() {
    this.counter--;
  }
}
