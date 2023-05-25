import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {catchError, concatMap, map, switchMap} from 'rxjs/operators';
import {Observable, EMPTY, of} from 'rxjs';
import * as SnackActions from './snack.actions';
import {SnackService} from "../../entity-backend-services/snack.service";
import {addMonthsToDate, dateToUnix} from "../../../../../../../src/app/core/utils/date-functions";

@Injectable()
export class SnackEffects {


  loadOwnUsedSnacks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SnackActions.loadOwnUsedSnacks),
        switchMap(()=>
            //TODO: use real id
        this.snackService.getUsedSnacks(dateToUnix(addMonthsToDate(new Date(), -12)), dateToUnix(new Date())).pipe(
            map((snacks)=>{
                return SnackActions.loadOwnUsedSnacksSuccesfully({ownUsedSnacks: snacks})
            }),
            catchError((error)=> of(SnackActions.loadOwnUsedSnacksFailure({error})))
        )
        )
    );
  });

  useSnack$ = createEffect(()=>{
    return this.actions$.pipe(
        ofType(SnackActions.useSnack),
        switchMap((action) =>
            this.snackService.snackUsed(action.snackType.id??"",action.amount??1, action.userId).pipe(
                map((snackType)=>{
                  return SnackActions.useSnackSuccesfully({snackType})
                }),
                catchError((error)=> of(SnackActions.useSnackFailure({error})))
            )
    ))
  })

  constructor(private actions$: Actions, private snackService: SnackService) {}
}
