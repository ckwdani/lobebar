import {OrgEvent, Shift, ShiftType, Snack, SnackType, User} from "@frontend-lb-nx/shared/entities";
import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {Store} from "@ngrx/store";
import {SnackService} from "../../../../shared/services/src/lib/backend/entity-backend-services/snack.service";
import {HttpErrorResponse} from "@angular/common/http";
import {filter, Observable, switchMap, tap} from "rxjs";
import {addMonthsToDate, dateToUnix} from "../../core/utils/date-functions";
import {selectSnacksLoading, selectSnackState, useSnack} from "@frontend-lb-nx/shared/services";
import {map} from "rxjs/operators";


export interface SnacksUserStoreState {
    snacks: Snack[];
    user?: User;
    loading: boolean
    isOwn: boolean
    error?: HttpErrorResponse
}

const initialState: SnacksUserStoreState = {snacks: [], loading: false, error: undefined, isOwn: true}

@Injectable()
export class SnacksUserStore extends ComponentStore<SnacksUserStoreState>{

    constructor(private store: Store, private snacksService: SnackService) {
        super(initialState);
    }

    readonly user$ = this.select(state => state.user);
    readonly loading$ =  this.select(state => state.isOwn ? this.store.select(selectSnackState).pipe(map(state => state.isLoading)): state.loading);
    readonly snacks$ = this.select(state => state.snacks);

    $ownUsedSnacks = this.store.select(selectSnackState).pipe(filter(state => !state.isLoading), tap((state) => {
        this.$updateOwnUsedSnacks(state.usedSnacks);
    }));

    //selectLoading

    // update snacks for own user
    readonly $updateOwnUsedSnacks = this.updater((state, ownUsedSnacks: Snack[]) => {
        return {
            ...state,
            snacks: state.isOwn ? ownUsedSnacks : state.snacks
        };
    });

    // update snacks
    readonly $updateSnacks = this.updater((state, snacks: Snack[]) => {
        return {
            ...state,
            snacks
        };
    });

    readonly setLoading = this.updater((state, loading: boolean) => { return {...state, loading: loading}; });

    readonly $updateError = this.updater((state, error: HttpErrorResponse) => {
        return {
            ...state,
            error
        };
    });

    readonly loadUsedUserSnacks = this.effect((user$: Observable<{user: User}>)=>
        user$.pipe(
            switchMap(({user})=>
                this.snacksService.getUsedSnacks(dateToUnix(addMonthsToDate(new Date(), -12)), dateToUnix(new Date()), user.id).pipe(
                    tap(
                        {
                            next: (snacks)=>{
                                return this.patchState((state)=>({
                                    snacks, loading: false
                                }))
                            },
                            error: (err)=>{
                                this.$updateError(err)
                            }
                        }
                    )
                )
        )
    )
    )

    readonly useSnack = this.effect((snackType$: Observable<{snackType: SnackType, amount: number, userId: string}>)=>{
        return snackType$.pipe(
            switchMap(({
                           snackType,
                           amount,
                           userId
                       }) => this.snacksService.snackUsed(snackType.id ?? '', amount, userId).pipe(
                    tap(
                        {
                            next: (snack) => {
                                return this.patchState((state) => ({
                                    ...state, loading: false
                                }));
                            },
                            error: (err)=>{
                                this.$updateError(err)
                            }
                        }
                    )
                )
            )
        );
    })
}
