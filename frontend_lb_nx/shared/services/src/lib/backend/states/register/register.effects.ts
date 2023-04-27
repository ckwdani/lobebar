import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, concatMap, switchMap} from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as RegisterActions from './register.actions';
import * as AuthActions from "../auth/auth.actions";
import {AuthService} from "../../entity-backend-services/auth.service";



@Injectable()
export class RegisterEffects {

  registerAuth$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(RegisterActions.register),
        switchMap((action)=>
            this.authService.register(action.user).pipe(
                map((user) => {
                  return RegisterActions.registerSuccessfull({user: action.user});
                }),
                catchError((error) => of(RegisterActions.registerError({error})))
            )
        )
    )
  })


  constructor(private actions$: Actions, private authService: AuthService) {}
}
