import {Component, Input} from '@angular/core';
import {OrgEvent, Shift, ShiftType, User, UserFunctions, UserRoles} from "@frontend-lb-nx/shared/entities";
import { EventsOverviewStore } from './events-overview.store';
import {Observable, of} from "rxjs";
import {Store} from "@ngrx/store";
import {
  loadOrgEvents,
  selectOrgEvents,
  selectOrgEventsState,
  selectOutstandingShifts,
  selectOwnShifts, selectUser, selectUserRole
} from "@frontend-lb-nx/shared/services";
import {map} from "rxjs/operators";

@Component({
  selector: 'frontend-lb-nx-events-overview',
  templateUrl: './events-overview.component.html',
  styleUrls: ['./events-overview.component.scss'],
  providers: [EventsOverviewStore],
})
export class EventsOverviewComponent {

  comingOrgEvents$ = this.eventsOverviewStore.comingOrgEvents$
  yourShifts$ = this.eventsOverviewStore.yourShifts$
  previousShifts$ = this.eventsOverviewStore.previousShifts$

  $roleUser = this.store.select(selectUser).pipe(map(next=> (next??0 !== 0) ? UserFunctions.getRole(next!) : next))

  $ownShiftsObs= this.store.select(selectOwnShifts)
  //$outStandingShiftsObs = this.store.select(selectOutstandingShifts)


  $orgEventsObs= this.store.select(selectOrgEvents)

  constructor(private readonly eventsOverviewStore: EventsOverviewStore, private store: Store) {
  }

  protected readonly of = of;
    protected readonly UserRoles = UserRoles;
}
