import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, concatMap, switchMap} from 'rxjs/operators';
import {Observable, EMPTY, of, combineLatest} from 'rxjs';
import * as ShiftTypeActions from './shift-type.actions';
import {ShiftTypeBackendService} from "../../entity-backend-services/shifts-type-backend.service";
import {ShiftType} from "@frontend-lb-nx/shared/entities";
import {EW_Types_BackendService} from "../../entity-backend-services/doneExtraWorkTypesService";
import {deleteEWT} from "./shift-type.actions";


@Injectable()
export class ShiftTypeEffects {

  loadShiftTypes$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(ShiftTypeActions.loadShiftTypes),
        switchMap(( ) =>
            combineLatest([this.shiftTypeService.getAll(), this.ew_types_service.getAll()]).pipe(
                map((types) => {
                  return ShiftTypeActions.loadShiftTypesSuccess({shiftTypes: types[0], ew_types: types[1]});
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

  addEwType$ = createEffect(()=>{
      return this.actions$.pipe(
          ofType(ShiftTypeActions.addExtraWorkType),
          switchMap((action)=>
          this.ew_types_service.add(action.ew_type).pipe(
              map(()=>{
                  return ShiftTypeActions.addExtraWorkTypeSuccess({ew_type: action.ew_type});
              }),
              catchError((error)=> of(ShiftTypeActions.addExtraWorkTypeFailure({error})))
          ))
      )
      }
  )

    deleteShiftType$ = createEffect(()=>{
            return this.actions$.pipe(
                ofType(ShiftTypeActions.deleteShiftType),
                switchMap((action)=>
                    this.shiftTypeService.delete(action.shiftType.id?.toString()??"").pipe(
                        map(()=>{
                            return ShiftTypeActions.deleteShiftTypeSuccess({shiftType: action.shiftType});
                        }),
                        catchError((error)=> of(ShiftTypeActions.deleteShiftTypeFailure({error})))
                    ))
            )
        }
    )



    deleteEWT$ = createEffect(()=>{
            return this.actions$.pipe(
                ofType(ShiftTypeActions.deleteEWT),
                switchMap((action)=>
                    this.ew_types_service.delete(action.ew_type.id?.toString()??"").pipe(
                        map(()=>{
                            return ShiftTypeActions.deleteEWTSuccess({ew_type: action.ew_type});
                        }),
                        catchError((error)=> of(ShiftTypeActions.deleteEWTFailure({error})))
                    ))
            )
        }
    )




  constructor(private actions$: Actions, private shiftTypeService: ShiftTypeBackendService, private  ew_types_service: EW_Types_BackendService) {}
}
