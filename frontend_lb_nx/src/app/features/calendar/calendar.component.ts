import {Component, LOCALE_ID} from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {CalendarEvent, CalendarView} from "angular-calendar";
import {OrgEvent, OrgEventClass, Shift, ShiftType, User} from "@frontend-lb-nx/shared/entities";
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import {Store} from "@ngrx/store";
import {
  loadMoreFromFuture,
  loadMoreFromPast,
  selectOrgEvents,
  selectOrgEventsState,
  selectUser
} from "@frontend-lb-nx/shared/services";
import {map} from "rxjs/operators";
import {take} from "rxjs";

@Component({
  selector: 'frontend-lb-nx-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: []
})
export class CalendarComponent {
  view: CalendarView = CalendarView.Month;

  activeDayIsOpen = true;

  $orgEvents = this.store.select(selectOrgEvents)
  $eventState = this.store.select(selectOrgEventsState)
  $user = this.store.select(selectUser)

  viewDate: Date = new Date()

  events:
      CalendarEvent[]=[
    {
      title: 'Has custom class',
      start: new Date(),
      cssClass: 'my-custom-class'
    }
  ]

  genCalenderEvents(orgEvents: OrgEvent[]){
    const arr=[]
    for(const orgEv of orgEvents){
      const calEv: CalendarEvent={
        title: orgEv.name,
        start: new Date(orgEv.start),
        actions: [],
        meta: orgEv as OrgEventClass,
        color: {
        primary: '#FAE3E3',
            secondary: '#FAE3E3',
      },
      }
      arr.push(calEv)
    }
    this.events=arr
    return this.events
  }

  checker($event :any){
    console.log($event)
  }

  dateChanged($event: Date){
    // reset date to the first of the month
    const testDate = new Date($event.getFullYear(), $event.getMonth()-1, 1)
    // get timestamp from date
    const timestamp = Math.floor(testDate.getTime() / 1000)
    this.$eventState.pipe(map((state) => [state.lowerTimestamp, state.higherTimestamp]), take(1)).subscribe((timestamps) => {
      // check if timestamp is smaller than the lower timestamp minus two months
        if(timestamp < timestamps[0] + 60*60*24*30*2){
          // dispatch action to load past events
            this.store.dispatch(loadMoreFromPast({months: 6}))
        }
        // check if timestamp is bigger than the higher timestamp plus three months
        if(timestamp > timestamps[1] - 60*60*24*30*3){
          // dispatch action to load past events
          this.store.dispatch(loadMoreFromFuture({months: 9}))
        }
    })

  }


  checkEventStatus(orgEvent: OrgEvent|undefined): string {
    if(orgEvent == undefined||orgEvent?.shifts==undefined){
      return ""
    }
    else {
      //check if own user has a shift
      const shiftUsers = orgEvent.shifts.map((s) => s.users)
      const ownId = "asd"
      let shiftsFull = true
      let ownHasShift = false
      for (const shift of orgEvent.shifts) {
        if ((shift.users?.length ?? 0) < shift.headcount) {
          shiftsFull = false;
        }
        if (shift.users?.map((s) => s.id).includes(ownId)) {
          ownHasShift = true
        }
      }
      if (ownHasShift) {
        return "blue"
      }
      if (shiftsFull) {
        return "green"
      }
      return "red"
    }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(events)
    if (isSameMonth(date, this.viewDate)) {
      if (
          (isSameDay(this.viewDate, date) && this.activeDayIsOpen) ||
          events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }
  constructor(private store: Store) {
  }

  protected readonly OrgEventClass = OrgEventClass;
}
