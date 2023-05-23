import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {OrgEvent, OrgEventClass, Shift, ShiftType} from "@frontend-lb-nx/shared/entities";
import {EMPTY, Observable, tap} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {
    selectShiftTypes,
    selectShiftTypesLoading
} from "../../../../shared/services/src/lib/backend/states/shift-types/shift-type.selectors";
import {addOrgEventSuccess, OrgEventBackendService} from "@frontend-lb-nx/shared/services";
import {Router} from "@angular/router";
import { Location } from '@angular/common';

export interface EventAddStoreState {
  eventDefined?: boolean;
  event?: OrgEvent;
  shifts: Shift[];
  shiftTypes: ShiftType[];
  loading: boolean
}

const initialState: EventAddStoreState = {eventDefined: false, shifts: [], shiftTypes: [], loading: false};

@Injectable()
export class EventAddStore extends ComponentStore<EventAddStoreState> {
  constructor(private store: Store, private orgEventService: OrgEventBackendService, private router: Router,private location: Location) {
    super(initialState);
  }

   $shiftTypes = this.store.select(selectShiftTypes);
   $shiftTypesLoading = this.store.select(selectShiftTypesLoading);

    readonly eventDefined$ = this.select(state => state.eventDefined);
    readonly event$ = this.select(state => state.event);
    readonly loading$ = this.select(state => state.loading);
    readonly shifts$ = this.select(state => state.shifts);

    readonly vm$ = this.select({
        eventDefined: this.eventDefined$,
        event: this.event$,
        shifts: this.shifts$,
    });

    readonly setLoading = this.updater((state, loading: boolean) => { return {...state, loading: loading}; });

    // add the shifts to the event and send it to the backend
    readonly sendEvent = this.effect((event$: Observable<OrgEvent>) => {
        return event$.pipe(
            switchMap((event) => {
                this.setLoading(true);
                event.shifts = this.get().shifts;
                return this.orgEventService.add(event).pipe(
                    tap({
                        next: (next) => {
                            // TODO: routing
                            this.store.dispatch(addOrgEventSuccess({orgEvent: next}));
                            setTimeout(() => {
                                this.setLoading(false);
                                this.location.back();
                            }, 1000);

                        },
                    }),
                    // TODO : error handling
                    catchError(() => EMPTY),
                )
            }),
        );
    });


    // set loading

  readonly setEvent = this.updater((state, event: OrgEvent) => {
        return {...state, eventDefined: true, event: event};
    });


    // add one shift to the shifts array
    readonly addShift = this.updater((state, shift: Shift) => {
        return {...state, shifts: [...state.shifts, shift]};
    });

    readonly setShiftTypes = this.updater((state, shiftTypes: ShiftType[]) => {
        return {...state, shiftTypes: shiftTypes};
    });
}
