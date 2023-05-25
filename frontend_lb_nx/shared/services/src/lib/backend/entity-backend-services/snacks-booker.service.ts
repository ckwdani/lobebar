import { Injectable } from '@angular/core';
import {BaseCommunicatorService} from "../common/base-communicator.service";
import {CountSnacks} from "@frontend-lb-nx/shared/entities";
import {BACKENDPATHS} from "../BACKENDPATHS";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SnacksBookerService extends BaseCommunicatorService<CountSnacks[]>{




  getCountSnacks(): Observable<CountSnacks[]>{
    return this.get(BACKENDPATHS.getCountSnacks);
  }


  setBookedDay(date: Date): Observable<any>{
    return this.post(BACKENDPATHS.setSnacksBookedDay + "/" + date.getFullYear() + "-" + (date.getMonth()) + "-" + date.getDate(), null);
  }
}
