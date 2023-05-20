import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, concatMap, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Observable, EMPTY, of} from 'rxjs';
import * as ShiftActions from './shift.actions';
import {selectOrgEventsState, selectOwnUser, selectUser, ShiftsBackendService} from "@frontend-lb-nx/shared/services";
import {addMonthsToDate, dateToUnix} from "../../../../../../../src/app/core/utils/date-functions";
import {Store} from "@ngrx/store";

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
            withLatestFrom(this.store.select(selectUser)),
            switchMap(([action, user]) =>
                this.shiftsService.getOutstandingShifts(user?.id?? "", dateToUnix(new Date()), dateToUnix(addMonthsToDate(new Date(), 3))).pipe(
                    map((shifts) => {
                        return ShiftActions.loadOutstandingShiftsSuccess({outstandingShifts: shifts})
                    }),
                    catchError((error) => of(ShiftActions.loadOutstandingShiftsFailure({ error })))
                )));
    });


    addShiftToEvent$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(ShiftActions.addShiftToEvent),
            switchMap((action)=>
                this.shiftsService.addShiftToEvent(action.shift, action.event).pipe(
                    map((returnedShift)=>{
                        return ShiftActions.addShiftToEventSuccess({shift: returnedShift});
                    }),
                    catchError((error)=> of(ShiftActions.addShiftToEventFailure({error})))
                ))
        );
    })

    // assignShift$ = createEffect(()=>{
    //     return this.actions$.pipe(
    //         ofType(ShiftActions.changeShiftAssignment),
    //         switchMap((action)=>
    //         this.shiftsService.assign(action.shift).pipe(
    //             map(()=>{
    //                 return ShiftActions.changeShiftAssignmentSuccess({shift: action.shift});
    //             }),
    //             catchError((error)=>of(ShiftActions.changeShiftAssignmentFailure({error})))
    //         ))
    //     )
    // })
    //
    // deassignShift$ = createEffect(()=>{
    //     return this.actions$.pipe(
    //         ofType(ShiftActions.deassignShift),
    //         switchMap((action)=>
    //             this.shiftsService.assign(action.shift, true).pipe(
    //                 map(()=>{
    //                     return ShiftActions.deassignShiftSuccess({shift: action.shift});
    //                 }),
    //                 catchError((error)=>of(ShiftActions.deassignShiftFailure({error})))
    //             ))
    //     )
    // })
    //
    changeShiftAssignment$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(ShiftActions.changeShiftAssignment),
            switchMap((action)=>
                this.shiftsService.assign(action.shift, action.deassign).pipe(
                    map(()=>{
                        return ShiftActions.changeShiftAssignmentSuccess({shift: action.shift, deassign: action.deassign});
                    }),
                    catchError((error)=>of(ShiftActions.changeShiftAssignmentFailure({error, deassign: action.deassign})))
                ))
        )
    });

  constructor(private actions$: Actions, private shiftsService: ShiftsBackendService, private store: Store) {}
}
