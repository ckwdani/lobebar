import {Component, Input} from '@angular/core';
import {OrgEvent, Shift, ShiftType, User, UserFunctions, UserRoles} from "@frontend-lb-nx/shared/entities";
import { EventsOverviewStore } from './events-overview.store';
import {Observable, of, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {
  loadMoreFromFuture,
  loadMoreFromPast,
  loadOrgEvents, selectCommingOrgEvents,
  selectOrgEvents, selectOrgEventsLoading,
  selectOrgEventsState,
  selectOutstandingShifts,
  selectOwnShifts, selectPreviousOrgEvents, selectUser, selectUserRole
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

  $orgEventsPrevious = this.store.select(selectPreviousOrgEvents)
  $orgEventsObs= this.store.select(selectCommingOrgEvents).pipe(tap(next => {
    if(next.length < this.currentUpComingIndex){
      this.currentUpComingIndex = next.length
    }
  }))
  $orgEventsLoading = this.store.select(selectOrgEventsLoading)

  currentPreviousIndex = 7;
  currentUpComingIndex = 7;

  showPrevoius = false;
  constructor(private readonly eventsOverviewStore: EventsOverviewStore, private store: Store) {
  }

  protected readonly of = of;
    protected readonly UserRoles = UserRoles;


  protected loadOrgEvents(previous = false): void {
    if(previous) {
      this.store.dispatch(loadMoreFromPast({months: 3}))
    }else {
      this.store.dispatch(loadMoreFromFuture({months: 3}))
    }
  }


  /**
   * generates observable for the old events
   * takes current index into account, so even if the events are already loaded, not all events are shown
   */
  getOldOrgEventsWithIndex(): Observable<OrgEvent[]>{
    return this.$orgEventsPrevious.pipe(map((events: OrgEvent[])=> {
      if(events.length < this.currentPreviousIndex) {
        this.currentPreviousIndex = events.length
        // this is done, so the store update is done asyncronously and the value does not change during the execution
        // of this funciton
        setTimeout(()=>this.loadOrgEvents(true), 1)
      }
      const eventsMut = [...events]
      return eventsMut.reverse().slice(0, this.currentPreviousIndex).reverse()
    }))
  }



  /**
   * generates observable for the old events
   * takes current index into account, so even if the events are already loaded, not all events are shown
   */
  getNewWithIndex(): Observable<OrgEvent[]>{
    return this.$orgEventsObs.pipe(map((events: OrgEvent[])=> {
      if(events.length < this.currentUpComingIndex) {
        this.currentUpComingIndex = events.length
        // this is done, so the store update is done asyncronously and the value does not change during the execution
        // of this funciton
        setTimeout(()=>this.loadOrgEvents(false), 1)
      }
      const eventsMut = [...events]
      return eventsMut.reverse().slice(0, this.currentUpComingIndex).reverse()
    }))
  }
}
