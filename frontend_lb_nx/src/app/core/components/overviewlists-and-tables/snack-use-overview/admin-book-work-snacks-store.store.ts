import {OrgEvent, Shift, ShiftType, Snack, SnackType, User} from "@frontend-lb-nx/shared/entities";
import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {Store} from "@ngrx/store";
import {SnackService} from "../../../../../../shared/services/src/lib/backend/entity-backend-services/snack.service";
import {HttpErrorResponse} from "@angular/common/http";
import {filter, Observable, switchMap, tap} from "rxjs";
import {addMonthsToDate, dateToUnix} from "../../../../../../shared/services/src/lib/utils/date-functions";
import {selectSnackState} from "@frontend-lb-nx/shared/services";
import {map} from "rxjs/operators";


export interface SnacksUserStoreState {
    snacks: Snack[];
    user?: User;
    loading: boolean
    isOwn: boolean
    error?: HttpErrorResponse
}

const initialState: SnacksUserStoreState = {snacks: [], loading: true, error: undefined, isOwn: true}

@Injectable()
export class SnacksUserStore extends ComponentStore<SnacksUserStoreState>{

    constructor(private store: Store, private snacksService: SnackService) {
        super(initialState);
    }

    readonly user$ = this.select(state => state.user);
    readonly loading$ = this.select(state => state.loading);
    readonly snacks$ = this.select(state => state.snacks);


    readonly $updateOwnLoading = this.updater((state, loading: boolean) => {
        return {
            ...state,
            loading: state.isOwn ? loading : state.loading
        };
    });



    private $ownUsedSnacks = this.store.select(selectSnackState).subscribe((state) => {
        this.$updateOwnLoading(state.isLoading);
        console.log("state.isLoading", state.isLoading)
        if(!state.isLoading){
            this.$updateOwnUsedSnacks(state.usedSnacks);
        }
    });

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
            loading: false,
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
            switchMap(({user})=> {
                this.setLoading(true);
                    return this.snacksService.getUsedSnacks(dateToUnix(addMonthsToDate(new Date(), -12)), dateToUnix(new Date()), user.id).pipe(
                        tap(
                            {
                                next: (snacks) => {
                                    console.log("snacks", snacks)
                                    return this.$updateSnacks(snacks)
                                },
                                error: (err) => {
                                    this.$updateError(err)
                                }
                            }
                        )
                    );
                }
            )
    )
    )

    readonly useSnack = this.effect((snackType$: Observable<{snackType: SnackType, amount: number, userId: string}>)=>{
        return snackType$.pipe(
            switchMap(({snackType, amount, userId}) => this.snacksService.snackUsed(snackType.id ?? '', amount, userId).pipe(
                    tap(
                        {
                            next: (snack) => {
                                return this.patchState((state) => ({
                                    ...state, loading: false, snacks: snack
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
