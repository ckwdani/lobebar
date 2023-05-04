import { Component } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {CalendarEvent, CalendarView} from "angular-calendar";
import {OrgEvent, Shift, ShiftType, User} from "@frontend-lb-nx/shared/entities";
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import {Store} from "@ngrx/store";
import {selectOrgEvents} from "@frontend-lb-nx/shared/services";

@Component({
  selector: 'frontend-lb-nx-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  view: CalendarView = CalendarView.Month;

  activeDayIsOpen = false;

  orgEvents: OrgEvent[]|undefined

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
        start: orgEv.start,
        actions: [],
        meta: orgEv,
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
    this.store.select(selectOrgEvents).subscribe(next=>{
      this.orgEvents=next
      this.genCalenderEvents(this.orgEvents)
    })
  }
}
