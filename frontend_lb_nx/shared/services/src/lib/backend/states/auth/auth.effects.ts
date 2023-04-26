import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, concatMap, switchMap} from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as AuthActions from './auth.actions';
import {AuthService} from "../../entity-backend-services/auth.service";
import {Router} from "@angular/router";
import {createAction} from "@ngrx/store";

const localStorageTokenString = 'lobebar-token';

@Injectable()
export class AuthEffects {


  loadAuths$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(AuthActions.login),
      switchMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.authService.login(action.username, action.password).pipe(
            map((token) => {
              localStorage.setItem(localStorageTokenString, token);
              return AuthActions.loginSuccessfull({token: token});
            }),
            catchError((error) => of(AuthActions.loadAuthsFailure({ error })))
        )));
  });

  // load the token from local storage
    loadToken$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActions.loadTokenFromLocal),
        map(() => {
          const token = localStorage.getItem(localStorageTokenString);
          if (token) {
            return AuthActions.loginSuccessfull({token: token});
          } else {
            return AuthActions.logout();
          }
        })
      );
    });

    loadUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.loadUser, AuthActions.loginSuccessfull),
            switchMap((action ) =>

                this.authService.getUser(localStorage.getItem(localStorageTokenString)??"").pipe(
                    map((token) => {
                        return AuthActions.allLoaded({user: token});
                    }),
                    catchError((error) => of(AuthActions.loadUserError({ error })))
                )));
    });

  // if login is required, redirect to login page
    loginRequired$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        map(() => {
            localStorage.removeItem(localStorageTokenString);
            this.router.navigate(['/login']);
            return AuthActions.loginRequired();
        }));
    });


  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}
}
