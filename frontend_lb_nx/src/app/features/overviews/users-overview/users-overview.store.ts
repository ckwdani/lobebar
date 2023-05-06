import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {Observable, of, switchMap, tap} from "rxjs";
import {User} from "@frontend-lb-nx/shared/entities";
import {
    UserBackendService
} from "../../../../../shared/services/src/lib/backend/entity-backend-services/user-backend.service";
import {catchError} from "rxjs/operators";
import {createAction, props, select, Store} from '@ngrx/store';
import {selectUser, updateUser} from "@frontend-lb-nx/shared/services";

export interface UsersOverviewState {
    users: User[];
    loading: boolean
}

const initialState: UsersOverviewState = {users: [], loading: true}

@Injectable()
export class UsersOverviewStore extends ComponentStore<UsersOverviewState> {
    constructor(private userService: UserBackendService, private store: Store) {
        super(initialState);
    }


    readonly selectUsers$: Observable<User[]> = this.select((state)=>state.users)
    readonly selectLoading$ = this.select(state=> state.loading)

    readonly setLoading = this.updater((state, loading: boolean)=> {return {...state, loading: loading}})

    readonly loadUsers = this.effect<void>((trigger$: Observable<void>) =>
        trigger$.pipe(
            tap(() => {
                this.userService.getAll().subscribe((users) => {
                    this.patchState({ users , loading: false});
                });
            })
        )
    );

    readonly deleteUser = this.effect<User>((user$: Observable<User>) =>
        user$.pipe(
            tap((user) => {
                this.userService.deleteUser(user.id??"").subscribe(() => {
                    this.patchState((state) => ({
                        users: state.users.filter((u) => u.id !== user.id),
                    }));
                });
            })
        )
    );

    readonly updateUser = this.effect<User>((user$: Observable<User>)=>
        user$.pipe(
            tap((user)=>{
                this.userService.updateUser(user).subscribe(()=>{
                    this.store.dispatch(updateUser({user}))
                })
            })
        )
    )

/*    this.patchState((state) => ({
    users: state.users.filter((u) => u.id !== user.id),
}));*/
    readonly approveUser = this.effect<User>((user$: Observable<User>)=>
        user$.pipe(
            tap((user) => {
                this.userService.approveUser(user).subscribe(() => {
                    this.patchState((state) => ({
                        // state.shiftTypes.map(item=>item.id===shiftType.id?shiftType:item)
                        users: state.users.map(u=>u.id===user.id?user:u)
                    }));
                });
            })
        )
    )
}
