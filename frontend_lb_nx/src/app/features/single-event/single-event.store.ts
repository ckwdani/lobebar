import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {OrgEvent, Shift} from "@frontend-lb-nx/shared/entities";
import {combineLatest, Observable, of, tap} from "rxjs";
import {
    addShiftToEvent,
    addShiftToEventSuccess, deleteShiftFromEventSuccess, editOrgEventSuccess,
    OrgEventBackendService,
    ShiftsBackendService
} from "@frontend-lb-nx/shared/services";
import {catchError, switchMap, withLatestFrom} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {selectShiftTypes} from "../../../../shared/services/src/lib/backend/states/shift-types/shift-type.selectors";

export interface SingleEventState {
  event?: OrgEvent,
  isLoading: boolean,
  error?: string,
  updating?: boolean,
  showAddShift: boolean,
};

const initialState: SingleEventState = {isLoading: true, showAddShift: false};

@Injectable()
export class SingleEventStore extends ComponentStore<SingleEventState> {
  constructor(protected eventService: OrgEventBackendService, private store: Store, protected shiftService: ShiftsBackendService,) {
    super(initialState);
  }

  $shiftTypes = this.store.select(selectShiftTypes);

  // viewModel
    readonly vm$ = this.select(({ event, isLoading, error , showAddShift, updating}) => ({
        event,
        isLoading,
        error,
        showAddShift,
        updating
    }));

  // updater to set event
    readonly setEvent = this.updater((state, event: OrgEvent) => ({
        ...state,
        event,
        isLoading: false,
    }));

    // updater to set event
    readonly setUpdating = this.updater((state, updating: boolean) => ({
        ...state,
        updating,
    }));

    readonly addShiftToEvent = this.updater((state, shift: Shift) => ({
        ...state,
        event: {...state.event!, shifts: [...state.event?.shifts ?? [], shift]},
        isLoading: false,
    }));

    readonly deleteShiftFromEvent = this.updater((state, shift: Shift) => ({
        ...state,
        event: {...state.event!, shifts: state.event?.shifts?.filter((s) => s.id !== shift.id)},
        isLoading: false,
    }));


    // toggle showAddShift
    readonly toggleShowAddShift = this.updater((state) => ({
        ...state,
        showAddShift: !state.showAddShift,
    }));





    // select missing persons to fill up shifts from event.shifts using shift person count and persons assigned to shift
    readonly selectMissingPersons$ = this.select((state: SingleEventState) => {
        if ((state.event??0) !== 0) {
            return state.event?.shifts?.map((shift) => {
                const persons = shift.users?.length ?? 0;
                return  shift.headcount - persons;
            }).reduce((acc, missing) => acc + missing, 0) ?? 0;
        } else {
            return 0;
        }
    });



  // updater to set error
    readonly setError = this.updater((state, error: string) => ({
        ...state,
        error,
        isLoading: false,
    }));


    readonly updateName = this.effect((name$: Observable<string>) =>
        name$.pipe(
            withLatestFrom(this.select((state) => state.event)),
            switchMap(([name, event]) => {
                return this.updateEvent({...event!, name});
            })));

    readonly updateEnd = this.effect((end$: Observable<Date>) =>
        end$.pipe(
            withLatestFrom(this.select((state) => state.event)),
            switchMap(([end, event]) => {
                return this.updateEvent({...event!, end});
            })));


    readonly addShift = this.effect((shift$: Observable<Shift>) =>
        shift$.pipe(
            withLatestFrom(this.select((state) => state.event)),
            switchMap(([shift, event]) => {
                                return this.shiftService.addShiftToEvent(shift, event!).pipe(tap(
                                        {
                                            next: shiftIn => {
                                                this.store.dispatch(addShiftToEventSuccess({shift: shiftIn}))
                                                this.addShiftToEvent(shiftIn);
                                            },
                                            error: (error) => {
                                                this.setError(error);
                                            }
                                        }
                                    )
                                );
                            })));

    readonly deleteShift = this.effect((shift$: Observable<Shift>) =>
        shift$.pipe(
              switchMap((shift) => {
                    return this.shiftService.deleteShift(shift).pipe(tap(
                        {
                            next: shiftIn => {
                                this.store.dispatch(deleteShiftFromEventSuccess({shift: shiftIn}))
                                this.deleteShiftFromEvent(shiftIn);
                            },
                            error: (error) => {
                                this.setError(error);
                            }
                        }
                    )
                    );
              }
              )
        )
    );




  // effect to fetch event by id
    readonly fetchEvent = this.effect((id$: Observable<string>) =>
        id$.pipe(
            switchMap((id) =>
                this.eventService.getById(id).pipe(
                    tap((event) => this.setEvent(event)),
                    catchError((error) => of(this.setError(error))),
                ),
            ),
        ),
    );

    updateEvent(event: OrgEvent): Observable<OrgEvent> {
        return this.eventService.update({...event, shifts: undefined}).pipe(tap({
            next: (oEvent: OrgEvent) => {
                this.setEvent({...event, name: oEvent.name, end: oEvent.end});
                this.store.dispatch(editOrgEventSuccess({orgEvent: oEvent}));
            },
            error: (error) => {
                this.setError(error);
            }
        }));
    }

}
