import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {OrgEvent, Shift, ShiftType} from "@frontend-lb-nx/shared/entities";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";

export interface EventAddStoreState {
  eventDefined?: boolean;
  event?: OrgEvent;
  shifts: Shift[];
  shiftTypes: ShiftType[];
}

const initialState: EventAddStoreState = {eventDefined: false, shifts: [], shiftTypes: []};

@Injectable()
export class EventAddStoreStore extends ComponentStore<EventAddStoreState> {
  constructor() {
    super(initialState);
  }

    readonly eventDefined$ = this.select(state => state.eventDefined);
    readonly event$ = this.select(state => state.event);
    readonly shifts$ = this.select(state => state.shifts);

    readonly vm$ = this.select({
        eventDefined: this.eventDefined$,
        event: this.event$,
        shifts: this.shifts$,
    });

  // // Each new call of getMovie(id) pushed that id into movieId$ stream.
  // readonly getMovie = this.effect((movieId$: Observable<string>) => {
  //   return movieId$.pipe(
  //       // 👇 Handle race condition with the proper choice of the flattening operator.
  //       switchMap((id) => this.moviesService.fetchMovie(id).pipe(
  //           //👇 Act on the result within inner pipe.
  //           tap({
  //             next: (movie) => this.addMovie(movie),
  //             error: (e) => this.logError(e),
  //           }),
  //           // 👇 Handle potential error within inner pipe.
  //           catchError(() => EMPTY),
  //       )),
  //   );
  // });


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
