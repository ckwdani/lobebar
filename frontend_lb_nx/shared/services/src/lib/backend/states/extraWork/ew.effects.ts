import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {catchError, concatMap, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as EWActions from './ew.actions';
import {addMonthsToDate, dateToUnix} from "../../../utils/date-functions";
import {EWService} from "../../entity-backend-services/ew.service";

@Injectable()
export class EwEffects {


  loadOwnEW = createEffect(() => {
    return this.actions$.pipe(
      ofType(EWActions.loadOwnEW),
        switchMap(()=>
            //TODO: use real id
        this.snackService.getOwnews(dateToUnix(addMonthsToDate(new Date(), -12)), dateToUnix(new Date())).pipe(
            map((snacks)=>{
                return EWActions.loadOwnEWSuccess({doneEW: snacks})
            }),
            catchError((error)=> of(EWActions.loadOwnEWFailure({error})))
        )
        )
    );
  });

  doEW$ = createEffect(()=>{
    return this.actions$.pipe(
        ofType(EWActions.doEW),
        switchMap((action) =>
            this.snackService.doneEw(action.ewType.id??"",action.amount??1, action.userId).pipe(
                map((snackType)=>{
                  return EWActions.doEWSuccesfully({ewType: snackType})
                }),
                catchError((error)=> of(EWActions.doEWFailure({error})))
            )
    ))
  })

  constructor(private actions$: Actions, private snackService: EWService) {}
}
