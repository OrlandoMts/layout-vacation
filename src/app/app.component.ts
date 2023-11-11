import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { Subscription, switchMap } from 'rxjs';
import { DataService } from './utils/data.service';
import { BaseRangeDate, RequestItf, UserItf } from './utils/info.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private _dataSub$!: Subscription;
  title = 'Vacaciones Indelpro';
  public frmData!: FormGroup;
  public userData!: UserItf;
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  datesSelected:NgbDateStruct[]=[];

  constructor(
    private _fb: FormBuilder,
    calendar: NgbCalendar,
    private _dataSrv: DataService
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this._dataSub$ = this._dataSrv.userObs
      .pipe(
        switchMap((res: UserItf) => {
          res && (this.userData = res);
          return this._dataSrv.requestObs;
        })
      )
      .subscribe((res: Array<RequestItf>) => {
        // NOTE: Servirá para realizar la tabla
      });
  }

  ngOnInit(): void {
    this._dataSrv.getUser(); // execute user next
    this._dataSrv.getRequests(); // execute request next
    this.frmData = this._fb.group({
      request: this._fb.array([]),
    });
  }

  ngOnDestroy(): void {
    if (this._dataSub$ && !this._dataSub$.closed) this._dataSub$.unsubscribe();
  }

  public change(value:NgbDateStruct[])
  {
    this.datesSelected=value;
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
      type: [''],
      days: [''],
      midday: [false],
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
    const form: Array<RequestItf> = this.rowsFormArray.value.map(
      (response: any) => response
    );
    if (this._dataSrv.hasDaysAvailable(form)) {
      this._dataSrv.addRequest(form);
    } else {
      alert('Ajusta los días de vacaciones, solicitaste días de más');
    }
  }
}
