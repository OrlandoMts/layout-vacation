import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

import { DataService } from './utils/data.service';
import { BaseRangeDate, UserItf } from './utils/info.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'vacations';
  public frmData!: FormGroup;
  public userData!: UserItf;
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  constructor(
    private _fb: FormBuilder,
    calendar: NgbCalendar,
    private _dataSrv: DataService
  ) {
    this.userData = this._dataSrv.useDummy;
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
    this.frmData = this._fb.group({
      request: this._fb.array([]),
    });
  }

  public getRange(event: BaseRangeDate) {
    console.log(event);
  }

  // Array bidimensional
  get rowsFormArray(): FormArray {
    return this.frmData.get('request') as FormArray;
  }

  public createRequest(): FormGroup {
    return this._fb.group({
      days: [''],
      starDay: [''],
      endDay: [''],
      comment: [''],
    });
  }

  public addRow() {
    const row = this.createRequest();
    this.rowsFormArray.push(row);
  }

  public removeRow(rowIndex: number) {
    this.rowsFormArray.removeAt(rowIndex);
  }
  // End Array bidimensional

  public onSubmit() {}
}
