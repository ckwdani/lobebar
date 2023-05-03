import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {OrgEvent, Shift, ShiftType} from "@frontend-lb-nx/shared/entities";
import {EMPTY, Observable, tap} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {
    selectShiftTypes,
    selectShiftTypesLoading
} from "../../../../shared/services/src/lib/backend/states/shift-types/shift-type.selectors";
import {OrgEventBackendService} from "@frontend-lb-nx/shared/services";

export interface EventAddStoreState {
  eventDefined?: boolean;
  event?: OrgEvent;
  shifts: Shift[];
  shiftTypes: ShiftType[];
}

const initialState: EventAddStoreState = {eventDefined: false, shifts: [], shiftTypes: []};

@Injectable()
export class EventAddStore extends ComponentStore<EventAddStoreState> {
  constructor(private store: Store, private orgEventService: OrgEventBackendService) {
    super(initialState);
  }

   $shiftTypes = this.store.select(selectShiftTypes);
   $shiftTypesLoading = this.store.select(selectShiftTypesLoading);

    readonly eventDefined$ = this.select(state => state.eventDefined);
    readonly event$ = this.select(state => state.event);
    readonly shifts$ = this.select(state => state.shifts);

    readonly vm$ = this.select({
        eventDefined: this.eventDefined$,
        event: this.event$,
        shifts: this.shifts$,
    });

    // add the shifts to the event and send it to the backend
    readonly sendEvent = this.effect((event$: Observable<OrgEvent>) => {
        return event$.pipe(
            switchMap((event) => {
                event.shifts = this.get().shifts;
                return this.orgEventService.add(event).pipe(
                    catchError(() => EMPTY),
                )
            }),
        );
    });


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
