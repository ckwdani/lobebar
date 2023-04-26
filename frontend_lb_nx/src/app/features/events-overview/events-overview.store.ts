import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {OrgEvent, Shift} from "@frontend-lb-nx/shared/entities";
import {Observable} from "rxjs";

export interface EventsOverviewState {
  comingOrgEvents: OrgEvent[];
  yourShifts: Shift[];
  previousShifts: Shift[];
}

const initialState: EventsOverviewState = {comingOrgEvents: [], yourShifts: [], previousShifts: []};

@Injectable()
export class EventsOverviewStore extends ComponentStore<EventsOverviewState> {
  constructor() {
    super(initialState);
  }

  readonly comingOrgEvents$: Observable<OrgEvent[]> = this.select(state=>state.comingOrgEvents)
  readonly yourShifts$: Observable<Shift[]> = this.select(state=>state.yourShifts)
  readonly previousShifts$: Observable<Shift[]> = this.select(state=>state.previousShifts)

  private readonly vm$ = this.select({
    comingOrgEvents: this.comingOrgEvents$,
    yourShifts: this.yourShifts$,
    previousShifts: this.previousShifts$,
  })
}
