import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataformService {
  private _prodObj: any
  observeProduct:Subject<any> = new Subject<any>();
  set prodObj(value:any){
    this._prodObj = value;
    this.observeProduct.next(this._prodObj);
  }
 get prodObj()
 {
  return this._prodObj;

 }
  viewData()
  {
    console.log(this.prodObj);
    
  }
  getValue(): any
  {
    return this.prodObj;

  }
  constructor() { }
}
