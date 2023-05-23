import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {Shift} from "@frontend-lb-nx/shared/entities";
import {changeShiftAssignmentSuccess, EditDescSuccess, ShiftsBackendService} from "@frontend-lb-nx/shared/services";
import {Observable, of, switchMap, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorBarData, ErrorSnackBarComponent} from "../error-snack-bar/error-snack-bar.component";
import {createEffect, ofType} from "@ngrx/effects";

import {catchError, map} from "rxjs/operators";

export interface ShiftTableState {
  shifts: Shift[];
  error?: HttpErrorResponse;
}

const initialState: ShiftTableState = {
  shifts: [],
  error: undefined
};

@Injectable()
export class ShiftTableStore extends ComponentStore<ShiftTableState> {
  constructor(protected backend: ShiftsBackendService, private store: Store, private snackBar: MatSnackBar) {
    super(initialState);
  }


  readonly $updateShifts = this.updater((state, shifts: Shift[]) => {
    return {
      ...state,
      shifts
    };
  });

  // change one shift
    readonly $updateShift = this.updater((state, shift: Shift) => {
      return {
        ...state,
        shifts: state.shifts.map(s => s.id !==shift.id ? s: shift)
      };
    });


    // change error
    readonly $updateError = this.updater((state, error: HttpErrorResponse) => {
        return {
            ...state,
            error
        };
    });







    selectShifts = this.select(state => state.shifts);

    readonly $changeAssignment = this.effect((data$: Observable<{shift: Shift, deassign: boolean }>) => {
      return data$.pipe(
          switchMap(({shift, deassign}) => this.backend.assign(shift, deassign).pipe(
            tap(
                {
                  next: (newShift) => {
                    this.store.dispatch(changeShiftAssignmentSuccess({shift: newShift, deassign}));
                    return this.$updateShift(newShift);
                  },
                  error: (err) => {
                      if(err.status === 423){
                          this.showPastError();
                      }
                    this.$updateError(err);
                  }})
              )
          )
      )
    });

    readonly $editName= this.effect((data$: Observable<{shift: Shift}>)=>{
        return data$.pipe(
            switchMap(({shift})=>
                this.backend.update(shift).pipe(
                    tap(
                        {
                            next: (newShift) => {
                                this.store.dispatch(EditDescSuccess({shift: newShift}));
                                return this.$updateShift(newShift);
                            },
                            error: (err) => {
                                if(err.status === 423){
                                    this.showPastError();
                                }
                                this.$updateError(err);
                            }})
                )
            )
        )
    })


    // readonly $changeDescription = this.effect((data$: Observable<{shift: Shift, description: string }>) => {
    //    return data$.pipe(
    //           switchMap(({shift, description}) => this.backend.changeDescription(shift, description).pipe(
    //                 tap(
    //                     {
    //                         next: (newShift) => {
    //                             this.store.dispatch(changeShiftAssignmentSuccess({shift: newShift, deassign: false}));
    //                             return this.$updateShift(newShift);
    //                         }
    //                     }
    // });

    showPastError(){
        this.snackBar.openFromComponent(ErrorSnackBarComponent, {data:  new ErrorBarData('' +
                '<h3>Die Schicht liegt in der Vergangenheit, eine Änderung ist nicht möglich</h3>', 'Ok'), duration: 3000})
    }



}
