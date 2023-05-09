import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, concatMap, map, switchMap} from 'rxjs/operators';
import {Observable, EMPTY, of} from 'rxjs';
import * as ShiftActions from './shift.actions';
import {ShiftsBackendService} from "@frontend-lb-nx/shared/services";
import {addMonthsToDate, dateToUnix} from "../../../../../../../src/app/core/utils/date-functions";

@Injectable()
export class ShiftEffects {


  loadOwnShifts$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(ShiftActions.loadOwnShifts),
        switchMap(( ) =>
            this.shiftsService.getShiftsUser(dateToUnix(new Date()), dateToUnix(addMonthsToDate(new Date(), 3)), "3d66860a-76d5-4019-a258-967e64856aab").pipe(
                map((shifts) => {
                  return ShiftActions.loadOwnShiftsSuccess({ownShifts: shifts})
                }),
                catchError((error) => of(ShiftActions.loadOwnShiftsFailure({ error })))
            )));
  });

    loadOutstandingShifts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ShiftActions.loadOutstandingShifts),
            switchMap(( ) =>
                this.shiftsService.getOutstandingShifts("3d66860a-76d5-4019-a258-967e64856aab", dateToUnix(new Date()), dateToUnix(addMonthsToDate(new Date(), 3))).pipe(
                    map((shifts) => {
                        return ShiftActions.loadOutstandingShiftsSuccess({outstandingShifts: shifts})
                    }),
                    catchError((error) => of(ShiftActions.loadOutstandingShiftsFailure({ error })))
                )));
    });

    assignShift$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(ShiftActions.assignShift),
            switchMap((action)=>
            this.shiftsService.assign(action.shift).pipe(
                map(()=>{
                    return ShiftActions.assignShiftSuccess({shift: action.shift});
                }),
                catchError((error)=>of(ShiftActions.assignShiftFailure({error})))
            ))
        )
    })

  constructor(private actions$: Actions, private shiftsService: ShiftsBackendService) {}
}
