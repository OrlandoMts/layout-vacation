import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

import { DataService } from './utils/data.service';
import { BaseRangeDate, UserItf } from './utils/info.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private _userSub$!: Subscription;
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
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this._userSub$ = this._dataSrv.userObs.subscribe((res: UserItf) => {
      res && (this.userData = res);
    });
  }

  ngOnInit(): void {
    this._dataSrv.getUser(); // execute next
    this.frmData = this._fb.group({
      request: this._fb.array([]),
    });
  }

  ngOnDestroy(): void {
    if (this._userSub$ && !this._userSub$.closed) this._userSub$.unsubscribe();
  }

  public getRange(event: BaseRangeDate, rowIndex: number) {
    const profileArray = this.frmData.controls['request'] as FormArray;
    const row = profileArray.at(rowIndex) as FormGroup;
    row.get('starDay')?.setValue(event.from);
    row.get('endDay')?.setValue(event.to);
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

  public onSubmit() {
    this.rowsFormArray.value.forEach((response: any) => {
      console.log(response);
    });
  }
}
