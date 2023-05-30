import {
    DoneExtraWork,
    DoneExtraWorkTypes,
    OrgEvent,
    Shift,
    ShiftType,
    Snack,
    SnackType,
    User
} from "@frontend-lb-nx/shared/entities";
import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {Store} from "@ngrx/store";
import {SnackService} from "../../../../../../shared/services/src/lib/backend/entity-backend-services/snack.service";
import {HttpErrorResponse} from "@angular/common/http";
import {filter, Observable, switchMap, tap} from "rxjs";
import {addMonthsToDate, dateToUnix} from "../../../../../../shared/services/src/lib/utils/date-functions";
import {selectEwState, selectSnackState} from "@frontend-lb-nx/shared/services";
import {map} from "rxjs/operators";
import {EWService} from "../../../../../../shared/services/src/lib/backend/entity-backend-services/ew.service";


export interface SnacksUserStoreState {
    doneEw: DoneExtraWork[];
    user?: User;
    loading: boolean
    isOwn: boolean
    error?: HttpErrorResponse
}

const initialState: SnacksUserStoreState = {doneEw: [], loading: true, error: undefined, isOwn: true}

@Injectable()
export class DoneEwOverviewStore extends ComponentStore<SnacksUserStoreState>{

    constructor(private store: Store, private ewService: EWService) {
        super(initialState);
    }

    readonly user$ = this.select(state => state.user);
    readonly loading$ = this.select(state => state.loading);
    readonly doneEw$ = this.select(state => state.doneEw);


    readonly $updateOwnLoading = this.updater((state, loading: boolean) => {
        return {
            ...state,
            loading: state.isOwn ? loading : state.loading
        };
    });



    private $ownDoneEw = this.store.select(selectEwState).subscribe((state) => {
        this.$updateOwnLoading(state.isLoading);
        if(!state.isLoading){
            this.$updateOwnEw(state.doneEW);
        }
    });

    // update snacks for own user
    readonly $updateOwnEw = this.updater((state, ownUsedSnacks: DoneExtraWork[]) => {
        return {
            ...state,
            doneEw: state.isOwn ? ownUsedSnacks : state.doneEw
        };
    });



    // update snacks
    readonly $updateEw = this.updater((state, snacks: DoneExtraWork[]) => {
        return {
            ...state,
            loading: false,
            doneEw: snacks
        };
    });




    readonly setLoading = this.updater((state, loading: boolean) => { return {...state, loading: loading}; });

    readonly $updateError = this.updater((state, error: HttpErrorResponse) => {
        return {
            ...state,
            error
        };
    });

    readonly loadEws = this.effect((user$: Observable<{user: User}>)=>
        user$.pipe(
            switchMap(({user})=> {
                this.setLoading(true);
                    return this.ewService.getUserews(dateToUnix(addMonthsToDate(new Date(), -12)), dateToUnix(new Date()), user.id).pipe(
                        tap(
                            {
                                next: (snacks) => {
                                    console.log("snacks", snacks)
                                    return this.$updateEw(snacks)
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

    readonly doWork = this.effect((workType$: Observable<{ewType: DoneExtraWorkTypes, userId: string}>)=>{
        return workType$.pipe(
            switchMap(({ewType, userId}) => this.ewService.doneEw(ewType.id ?? '', 1, userId).pipe(
                    tap(
                        {
                            next: (doneEw) => {
                                return this.patchState((state) => ({
                                    ...state, loading: false, doneEw: doneEw
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
