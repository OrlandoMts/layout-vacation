import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RequestItf, UserItf } from './info.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // Observable to userInfo
  private _userSub$: Subject<UserItf> = new Subject();
  public userObs = this._userSub$.asObservable();
  // Observable to listRequets
  private _requestSub$: Subject<Array<RequestItf>> = new Subject();
  public requestObs = this._requestSub$.asObservable();

  private _listRequest: Array<RequestItf> = [];
  private _userDummy: UserItf = {
    name: 'Orlando Daniel Montes Antonio',
    numberEmployee: 70712,
    daysAvailble: 20,
    period: '2023-2024',
    dateEnd: new Date(),
  };

  constructor() {}

  public getRequests() {
    this._requestSub$.next(this.listRequest);
  }

  public getUser() {
    this._userSub$.next(this.useDummy);
  }

  get useDummy(): UserItf {
    return this._userDummy;
  }

  get listRequest(): Array<RequestItf> {
    return this._listRequest;
  }

  set setListRequest(data: RequestItf) {
    this._listRequest.push(data);
  }

  public hasDaysAvailable(data: Array<RequestItf>): boolean {
    const totalDays = data.reduce((accumulator: number, currentValue: any) => {
      return accumulator + currentValue.days;
    }, 0);
    return totalDays <= this.useDummy?.daysAvailble ? true : false;
  }

  public addRequest(data: Array<RequestItf>): void {
    data.forEach((item: RequestItf) => {
      this.setListRequest = item;
    });
    const totalDays = data.reduce((accumulator: number, currentValue: any) => {
      return accumulator + currentValue.days;
    }, 0);
    this.useDummy.daysAvailble -= totalDays;
    this.getRequests();
  }
}
