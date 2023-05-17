import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {catchError, concatMap, map, switchMap} from 'rxjs/operators';
import {Observable, EMPTY, of} from 'rxjs';
import * as SnackActions from './snack.actions';
import {SnackService} from "../../entity-backend-services/snack.service";

@Injectable()
export class SnackEffects {


  loadOwnUsedSnacks$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(SnackActions.loadOwnUsedSnacks),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY as Observable<{ type: string }>)
    );
  });

  useSnack$ = createEffect(()=>{
    return this.actions$.pipe(
        ofType(SnackActions.useSnack),
        switchMap((action) =>
            this.snackService.snackUsed(action.snack.id??"", action.userId).pipe(
                map((snackType)=>{
                  return SnackActions.useSnackSuccesfully({snackType})
                }),
                catchError((error)=> of(SnackActions.useSnackFailure({error})))
            )
    ))
  })

  constructor(private actions$: Actions, private snackService: SnackService) {}
}
