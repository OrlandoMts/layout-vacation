import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar2',
  templateUrl: './calendar2.component.html',
  styleUrls: ['./calendar2.component.css']
})
export class Calendar2Component {
  hoveredDate: NgbDateStruct | null = null;
  fromDate: NgbDateStruct | null = null;
  toDate: NgbDateStruct | null = null;

  private _datesSelected: NgbDateStruct[] = [];

  @Input() set datesSelected(value: NgbDateStruct[]) {
    this._datesSelected = value;
  }

  get datesSelected(): NgbDateStruct[] {
    return this._datesSelected || [];
  }

  @Output() datesSelectedChange = new EventEmitter<NgbDateStruct[]>();

  constructor(calendar: NgbCalendar) {
  }

  areDatesEqual(date1: NgbDateStruct | null, date2: NgbDateStruct | null): boolean {
    return date1 !== null && date2 !== null &&
      date1.year === date2.year && date1.month === date2.month && date1.day === date2.day;
  }

  isDateBefore(date1: NgbDateStruct | null, date2: NgbDateStruct | null): boolean {
    return !date1 || !date2 ? false : date1.year === date2.year ? date1.month === date2.month ? date1.day === date2.day
      ? false : date1.day < date2.day : date1.month < date2.month : date1.year < date2.year;
  }

  isDateAfter(date1: NgbDateStruct | null, date2: NgbDateStruct | null): boolean {
    return !date1 || !date2 ? false : date1.year === date2.year ? date1.month === date2.month ? date1.day === date2.day
      ? false : date1.day > date2.day : date1.month > date2.month : date1.year > date2.year;
  }

  onDateSelection(event: any, date: NgbDateStruct) {
    event.target.parentElement.blur();
    if (!this.fromDate && !this.toDate) {
      if (event.ctrlKey) {
        this.fromDate = date;
      } else {
        this.addDate(date);
      }
      this.datesSelectedChange.emit(this.datesSelected);
    } else if (this.fromDate && !this.toDate && this.isDateAfter(date, this.fromDate)) {
      this.toDate = date;
      this.addRangeDate(this.fromDate, this.toDate);
      this.fromDate = null;
      this.toDate = null;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  addDate(date: NgbDateStruct) {
    const index = this.datesSelected.findIndex(selectedDate => this.areDatesEqual(selectedDate, date));
    if (index >= 0) {
      this.datesSelected.splice(index, 1);
    } else {
      this.datesSelected.push(date);
    }
  }

  addRangeDate(fromDate: NgbDateStruct, toDate: NgbDateStruct) {
    const fromTime = new Date(`${fromDate.year}-${fromDate.month}-${fromDate.day}`).getTime();
    const toTime = new Date(`${toDate.year}-${toDate.month}-${toDate.day}`).getTime();
    for (let time = fromTime; time <= toTime; time += (24 * 60 * 60 * 1000)) {
      const date = new Date(time);
      this.addDate({ year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() });
    }
    this.datesSelectedChange.emit(this.datesSelected);
  }

  isDateSelected(date: NgbDateStruct) {
    return this.datesSelected.some(selectedDate => this.areDatesEqual(selectedDate, date));
  }

  isHovered = (date: any) =>
    this.fromDate && !this.toDate && this.hoveredDate &&
    this.isDateAfter(date, this.fromDate) && this.isDateBefore(date, this.hoveredDate);

  isInside = (date: any) =>
    this.isDateAfter(date, this.fromDate) && this.isDateBefore(date, this.toDate);

  isFrom = (date: any) => this.areDatesEqual(date, this.fromDate);
  isTo = (date: any) => this.areDatesEqual(date, this.toDate);
}
