import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, concatMap, switchMap} from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as ShiftTypeActions from './shift-type.actions';
import {ShiftTypeBackendService} from "../../entity-backend-services/shifts-type-backend.service";
import {ShiftType} from "@frontend-lb-nx/shared/entities";


@Injectable()
export class ShiftTypeEffects {

  loadShiftTypes$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(ShiftTypeActions.loadShiftTypes),
        switchMap(( ) =>
            this.shiftTypeService.getAll().pipe(
                map((types) => {
                  return ShiftTypeActions.loadShiftTypesSuccess({shiftTypes: types})
                }),
                catchError((error) => of(ShiftTypeActions.loadShiftTypesFailure({ error })))
            )));
  });

  addShiftType$ = createEffect(()=>{
      return this.actions$.pipe(
          ofType(ShiftTypeActions.addShiftType),
          switchMap((action)=>
          this.shiftTypeService.add(action.shiftType).pipe(
              map(()=>{
                  return ShiftTypeActions.addShiftTypeSuccess({shiftType: action.shiftType});
              }),
              catchError((error)=> of(ShiftTypeActions.addShiftTypeFailure({error})))
          ))
      )
      }
  )




  constructor(private actions$: Actions, private shiftTypeService: ShiftTypeBackendService) {}
}
