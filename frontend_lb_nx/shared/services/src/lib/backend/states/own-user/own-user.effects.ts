import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {UserBackendService} from "../../entity-backend-services/user-backend.service";
import * as OwnUserActions from "./own-user.actions";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable()
export class OwnUserEffects {

    updateSelectedAchievement$ = createEffect(()=> {
        return this.actions$.pipe(
            ofType(OwnUserActions.updateSelectedAchievement),
            switchMap((action)=>
                this.userService.updateAchievement(action.achievement).pipe(
                    map((user)=>{
                        return OwnUserActions.updateUserSuccessful({user: user})
                    }),
                    catchError((error) => of(OwnUserActions.updateUserFailure({error})))
                )
            )
        )
    })

    updateOwnUser$ = createEffect(()=> {
        return this.actions$.pipe(
            ofType(OwnUserActions.updateUser),
            switchMap((action)=>
                this.userService.updateUser(action.user).pipe(
                    map((newUser)=>{
                        return OwnUserActions.updateUserSuccessful({user: newUser})
                    }),
                    catchError((error) => of(OwnUserActions.updateUserFailure({error})))
                )
            )
        )
    })

    constructor(private actions$: Actions, private userService: UserBackendService, private store: Store) {}

}