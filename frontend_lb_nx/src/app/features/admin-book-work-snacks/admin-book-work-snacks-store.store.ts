import {OrgEvent, Shift, ShiftType, Snack, User} from "@frontend-lb-nx/shared/entities";
import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {Store} from "@ngrx/store";
import {SnackService} from "../../../../shared/services/src/lib/backend/entity-backend-services/snack.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable, switchMap, tap} from "rxjs";
import {addMonthsToDate, dateToUnix} from "../../core/utils/date-functions";


export interface SnacksUserStoreState {
    snacks: Snack[];
    user?: User;
    loading: boolean
    error?: HttpErrorResponse
}

const initialState: SnacksUserStoreState = {snacks: [], loading: false, error: undefined}

@Injectable()
export class SnacksUserStore extends ComponentStore<SnacksUserStoreState>{

    constructor(private store: Store, private snacksService: SnackService) {
        super(initialState);
    }

    readonly user$ = this.select(state => state.user);
    readonly loading$ = this.select(state => state.loading);
    readonly snacks$ = this.select(state => state.snacks);

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
}