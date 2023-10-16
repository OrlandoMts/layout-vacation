import { Injectable } from '@angular/core';
import { RequestItf, UserItf } from './info.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _userSub$: Subject<UserItf> = new Subject();
  public userObs = this._userSub$.asObservable();
  private _userDummy: UserItf = {
    name: 'Orlando Daniel Montes Antonio',
    numberEmployee: 70712,
    daysAvailble: 19,
    period: '2023-2024',
    dateEnd: new Date(),
  };
  private _listRequest: Array<RequestItf> = [];

  constructor() {}

  public getUser() {
    this._userSub$.next(this.useDummy)
  }

  get useDummy(): UserItf {
    return this._userDummy;
  }

  get listRequest(): Array<RequestItf> {
    return this._listRequest;
  }

  public addRequest(): void {
    // TODO: Agregar la respuesta al arreglo de _listRequest
    // TODO: Dependiendo de cuantos dias vengas en la solicitud debo restarle los dias al userDummy (ref: reduce)
  }
}
