import { Injectable } from '@angular/core';
import {BaseCommunicatorService} from "../common/base-communicator.service";
import {OrgEvent, Shift} from "@frontend-lb-nx/shared/entities";
import {Observable} from "rxjs";
import {BACKENDPATHS} from "../BACKENDPATHS";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ShiftsBackendService extends BaseCommunicatorService<Shift>{
  public getShiftsUser(unixstart: number, unixend: number, userId?: string, ): Observable<Shift[]>{
    return super.getList(BACKENDPATHS.shift_user_shifts+ '/' +unixstart + '/' +unixend + '/'+userId ).pipe(map(shifts => shifts.map(shifts=>this.mapShift(shifts))))
  }

  public getOutstandingShifts(userId?: string, unixstart?: number, unixend?: number): Observable<Shift[]>{
    return super.getList(BACKENDPATHS.shift_outstanding_shifts+ '/' +unixstart + '/' +unixend + '/' +userId ).pipe(map(shifts => shifts.map(shifts=>this.mapShift(shifts))))
  }

  public assign(shift: Shift, deassign: boolean = false,  userId?: string): Observable<Shift> {
    return super.post(BACKENDPATHS.shift_assign + '/' + shift.id +'/' + (deassign? 1 : 0) , shift)
  }

  public addShiftToEvent(shift: Shift, orgEvent: OrgEvent): Observable<Shift> {
    return super.post(BACKENDPATHS.shift_event_add + '/' + orgEvent.id, shift)
  }
  public deleteShift(shift: Shift): Observable<Shift> {
    return super.delete(BACKENDPATHS.shift_event_delete + '/' + shift.id)
  }

  public update(shift: Shift): Observable<Shift>{
    return super.put(BACKENDPATHS.shift_edit_desc + '/' + shift.id +'/' + shift.description, shift)
  }

  private mapShift(shift: Shift): Shift {
    return { ...shift};
  }
}
