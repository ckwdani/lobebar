import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, concatMap, switchMap} from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as OrgEventActions from './orgEvent.actions';
import {ShiftTypeBackendService} from "../../entity-backend-services/shifts-type-backend.service";
import {ShiftType} from "@frontend-lb-nx/shared/entities";
import {addOrgEvent} from "./orgEvent.actions";
import {OrgEventBackendService} from "@frontend-lb-nx/shared/services";


@Injectable()
export class OrgEventEffects {

    /*
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

     */

  addOrgEvent$ = createEffect(()=>{
      return this.actions$.pipe(
          ofType(OrgEventActions.addOrgEvent),
          switchMap((action)=>
          this.orgEventService.add(action.orgEvent).pipe(
              map(()=>{
                  return OrgEventActions.addOrgEventSuccess({orgEvent: action.orgEvent});
              }),
              catchError((error)=> of(OrgEventActions.addOrgEventFailure({error})))
          ))
      )
      }
  )
    /*
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

     */




  constructor(private actions$: Actions, private orgEventService: OrgEventBackendService) {}
}
