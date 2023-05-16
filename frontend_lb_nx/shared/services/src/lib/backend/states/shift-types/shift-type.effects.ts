import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, concatMap, switchMap} from 'rxjs/operators';
import {Observable, EMPTY, of, combineLatest} from 'rxjs';
import * as ShiftTypeActions from './shift-type.actions';
import {ShiftTypeBackendService} from "../../entity-backend-services/shifts-type-backend.service";
import {ShiftType} from "@frontend-lb-nx/shared/entities";
import {EW_Types_BackendService} from "../../entity-backend-services/doneExtraWorkTypesService";
import {deleteEWT, EditNameFailure} from "./shift-type.actions";
import {HttpErrorResponse} from "@angular/common/http";
import {SnackTypeService} from "../../entity-backend-services/snack-type.service";


@Injectable()
export class ShiftTypeEffects {

  loadShiftTypes$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(ShiftTypeActions.loadShiftTypes),
        switchMap(( ) =>
            combineLatest([this.shiftTypeService.getAll(), this.ew_types_service.getAll(), this.snackTypeService.getAll()]).pipe(
                map((types) => {
                  return ShiftTypeActions.loadShiftTypesSuccess({shiftTypes: types[0], ew_types: types[1], snackTypes: types[2]});
                }),
                catchError((error) => of(ShiftTypeActions.loadShiftTypesFailure({ error: error.status })))
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
              catchError((error)=> of(ShiftTypeActions.addShiftTypeFailure({error: error.status})))
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
              catchError((error)=> of(ShiftTypeActions.addExtraWorkTypeFailure({error: error.status})))
          ))
      )
      }
  )

    addSnackType$ = createEffect(()=>{
            return this.actions$.pipe(
                ofType(ShiftTypeActions.addSnackType),
                switchMap((action)=>
                    this.snackTypeService.add(action.snackType).pipe(
                        map(()=>{
                            return ShiftTypeActions.addSnackTypeSuccess({snackType: action.snackType});
                        }),
                        catchError((error)=> of(ShiftTypeActions.addSnackTypeFailure({error: error.status})))
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
                        catchError((error)=> of(ShiftTypeActions.deleteShiftTypeFailure({error: error.status})))
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
                        catchError((error)=> of(ShiftTypeActions.deleteEWTFailure({error: error.status})))
                    ))
            )
        }
    )

    deleteSnT$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(ShiftTypeActions.deleteSnT),
            switchMap((action)=>
                this.snackTypeService.delete(action.snackTypes.id?.toString() ?? "").pipe(
                    map(()=>{
                        return ShiftTypeActions.deleteSnTSuccess({snackTypes: action.snackTypes});
                    }),
                    catchError((error)=> of(ShiftTypeActions.deleteSnTFailure({error: error.status})))
                ))
        )
    })

    // eddit name of shift type or ew_type (extra work type) or snack type on the action EditName
    editName$ = createEffect(()=>{
            return this.actions$.pipe(
                ofType(ShiftTypeActions.EditName),
                switchMap((action)=> {
                    if (action.snackType) {
                        return this.snackTypeService.update(action.snackType).pipe(
                            map(() => {
                                return ShiftTypeActions.EditNameSuccess({snackType: action.snackType});
                            }),
                            catchError((error: HttpErrorResponse) => of(ShiftTypeActions.EditNameFailure({error: error.status})))
                        )
                    }
                        if (action.ew_type) {
                            return this.ew_types_service.update(action.ew_type).pipe(
                                map(() => {
                                    return ShiftTypeActions.EditNameSuccess({ew_type: action.ew_type});
                                }),
                                catchError((error: HttpErrorResponse) => of(ShiftTypeActions.EditNameFailure({error: error.status})))
                            )
                        }
                        if (action.shiftType){
                            return this.shiftTypeService.update(action.shiftType).pipe(
                                map(() => {
                                    return ShiftTypeActions.EditNameSuccess({shiftType: action.shiftType});
                                }),
                                catchError((error) => of(ShiftTypeActions.EditNameFailure({error: error.status})))
                            )
                        }
                        return of(EditNameFailure({error: -20}))
                    }
                )
            )
        });




  constructor(private actions$: Actions, private shiftTypeService: ShiftTypeBackendService, private  ew_types_service: EW_Types_BackendService, private snackTypeService: SnackTypeService) {}
}
