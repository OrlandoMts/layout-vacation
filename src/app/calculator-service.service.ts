import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorServiceService {
  constructor() {}

  public add(num1: number, num2: number): number {
    return num1 + num2;
  }
}
