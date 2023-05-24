import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {Observable, of, switchMap, tap} from "rxjs";
import { User} from "@frontend-lb-nx/shared/entities";
import {UserBackendService} from "../../../../../shared/services/src/lib/backend/entity-backend-services/user-backend.service";
import {catchError} from "rxjs/operators";
import {createAction, props, select, Store} from '@ngrx/store';
import {changeShiftAssignmentSuccess, selectUser, updateUser} from "@frontend-lb-nx/shared/services";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

export interface UsersOverviewState {
    users: User[];
    loading: boolean
    error?: HttpErrorResponse
}

const initialState: UsersOverviewState = {users: [], loading: true, error: undefined}

@Injectable()
export class UsersOverviewStore extends ComponentStore<UsersOverviewState> {
    constructor(private userService: UserBackendService, private store: Store, private snackBar: MatSnackBar) {
        super(initialState);
    }


    readonly selectUsers$: Observable<User[]> = this.select((state)=>state.users)
    readonly selectLoading$ = this.select(state=> state.loading)

    readonly setLoading = this.updater((state, loading: boolean)=> {return {...state, loading: loading}})

    // change error
    readonly $updateError = this.updater((state, error: HttpErrorResponse) => {
        return {
            ...state,
            error
        };
    });


    readonly $updateSomeUserRole = this.updater((state, user: User) => {
        return {
            ...state,
            users: state.users.map(u => u.id !==user.id ? u: user)
        };
    });

    readonly loadUsers = this.effect<void>((trigger$: Observable<void>) =>
        trigger$.pipe(
            tap(() => {
                this.userService.getAll().subscribe((users) => {
                    this.patchState({ users , loading: false});
                });
            })
        )
    );
    // readonly loadUsers = this.effect<void>((trigger$: Observable<void>) =>
    //     trigger$.pipe(
    //         switchMap(()=> this.userService.getAll().pipe(
    //             tap(
    //                 {
    //                     next: (users) =>{
    //                         return this.patchState({ users: users , loading: false});
    //                     },
    //                     error: (err) =>{
    //                         this.$updateError(err)
    //                     }
    //                 }
    //             )
    //         )
    //     )
    //     )
    // );

    readonly deleteUser = this.effect((user$: Observable<{user: User}>) =>
        user$.pipe(
            switchMap(({user})=>
                this.userService.deleteUser(user.id??"").pipe(
                    tap(
                        {
                            next: (user) => {
                                return this.patchState((state) => ({
                                                           users: state.users.filter((u) => u.id !== user.id),
                                                         }));
                            },
                            error: (err)=>{
                                this.$updateError(err)
                            }
                        }

                    )
                )
            )

        )
    );
    //            tap((user) => {
    //                 this.userService.deleteUser(user.id??"").subscribe(() => {
    //                     this.patchState((state) => ({
    //                         users: state.users.filter((u) => u.id !== user.id),
    //                     }));
    //                 });
    //             })

    readonly updateUser = this.effect((user$: Observable<{user: User}>)=>
        user$.pipe(
            switchMap(({user})=>
                this.userService.updateUser(user).pipe(
                    tap(
                        {
                            next: (newUser)=>{
                                this.store.dispatch(updateUser({user}))
                            },
                            error: (err) =>{
                                this.$updateError(err);
                            }
                        }
                    )
                )
            )

        )
    )


    readonly updateUserRole = this.effect<User>((user$: Observable<User>)=> {
        return user$.pipe(
            switchMap((user) =>
                this.userService.updateUserRole(user).pipe(
                    tap(
                        {
                            next: (newUser) => {
                                return this.$updateSomeUserRole(newUser)
                            },
                            error: (err) => {
                                this.$updateError(err);
                            }})
                )
            )
        )
        }
    );

/*    readonly updateUserRole = this.effect<User>((user$: Observable<User>)=>
        user$.pipe(
            tap((user)=>{
                this.userService.updateUserRole(user).subscribe(()=>{
                    this.store.dispatch(updateUser({user}))
                })
            })
        )
    )*/

/*    this.patchState((state) => ({
    users: state.users.filter((u) => u.id !== user.id),
}));*/
    readonly approveUser = this.effect((user$: Observable<{user: User}>)=>
        user$.pipe(
            switchMap(({user})=>
                this.userService.approveUser(user).pipe(
                    tap(
                        {
                            next: (userApproved)=>{
                                return this.patchState((state) => ({
                                users: state.users.map(u=>u.id===userApproved.id?userApproved:u)
                                }))
                            },
                            error: (err) =>{
                                this.$updateError(err);
                            }
                        }
                    )
                )
            )
        )
    )

    selectSelectedAchievementUser(userFind? :User){
        return this.select((state)=> state.users.find(user=> user ===userFind)?.selectedAchievement);
    };

}

//tap((user) => {
//                 this.userService.approveUser(user).subscribe((userApproved) => {
//                     this.patchState((state) => ({
//                         // state.shiftTypes.map(item=>item.id===shiftType.id?shiftType:item)
//                         users: state.users.map(u=>u.id===userApproved.id?userApproved:u)
//                     }));
//                 });
//             })
