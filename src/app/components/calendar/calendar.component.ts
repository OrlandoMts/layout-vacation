import { Component, EventEmitter, Output } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

import { BaseRangeDate } from 'src/app/utils/info.interface';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  @Output('rangedate') rangedate = new EventEmitter<any>();
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  constructor(calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = this.fromDate;
  }
  // Start Functions to map Date
  public convertToTwoDigits(number: any) {
    return number.toString().padStart(2, '0');
  }

  public mapDate(date: NgbDate): string {
    return `${date.year}-${this.convertToTwoDigits(
      date.month
    )}-${this.convertToTwoDigits(date.day)}`;
  }
  // End   Functions to map Date

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      const range: BaseRangeDate = {
        from: this.mapDate(this.fromDate),
        to: this.mapDate(this.toDate),
      };
      this.rangedate.emit(range);
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }
}
