import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, concatMap, switchMap} from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as ShiftTypeActions from './shift-type.actions';
import {ShiftTypeBackendService} from "../../entity-backend-services/shifts-type-backend.service";


@Injectable()
export class ShiftTypeEffects {

  loadUser$ = createEffect(() => {
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


  constructor(private actions$: Actions, private shiftTypeService: ShiftTypeBackendService) {}
}
