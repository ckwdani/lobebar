import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {Observable, of, switchMap, tap} from "rxjs";
import {User} from "@frontend-lb-nx/shared/entities";
import {
    UserBackendService
} from "../../../../../shared/services/src/lib/backend/entity-backend-services/user-backend.service";
import {catchError} from "rxjs/operators";
import {createAction, props} from '@ngrx/store';

export interface UsersOverviewState {
    users: User[];
    loading: boolean
}

const initialState: UsersOverviewState = {users: [], loading: true}

@Injectable()
export class UsersOverviewStore extends ComponentStore<UsersOverviewState> {
    constructor(private userService: UserBackendService) {
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
}
