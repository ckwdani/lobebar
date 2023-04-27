import { Component } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {CalendarEvent, CalendarView} from "angular-calendar";
import {OrgEvent, Shift, ShiftType, User} from "@frontend-lb-nx/shared/entities";
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';

const orgEvent: OrgEvent={
  id: "asdsad", name: "Plattenbauromantik", start: new Date(Date.now()), end: new Date(Date.now()), shifts: [],
}

const shiftType:  ShiftType={
  id: "asdassadsd", name:"Barschicht", value: 1
}

const shiftType2:  ShiftType={
  id: "asdassadsdd", name:"Security", value: 1
}

const user1: User={
  id: "asd",
  username: "emil",
  roles: [],
  password: "xxxxx",
  email: "hallo@asadsa.de",
  firstname: "gunni",
  lastname: "jochen",
  titel: "Master of A",
  hygienepass: true,
  telephone: 231412124,
}

const user2: User={
  id: "2312",
  username: "goenndalf",
  roles: [],
  password: "xxxxx",
  email: "hallo@asadsa.de",
  firstname: "gunni",
  lastname: "jochen",
  titel: "Master of A",
  hygienepass: true,
  telephone: 231412124,
}

const ELEMENT_DATA: Shift[] = [
  { description: 'Hydrogen', starttime: new Date(Date.now()), endtime: new Date(Date.now()),headcount: 2, orgEvent: orgEvent, users: [user1,user2], shiftType: shiftType},
  { description: 'Helium',starttime: new Date(Date.now()), endtime: new Date(Date.now()),headcount: 2, orgEvent: orgEvent, users: [user1, user2], shiftType},
  { description: 'ASDASD', starttime: new Date(Date.now()), endtime: new Date(Date.now()),headcount: 2, orgEvent: orgEvent, users: [user1, user2], shiftType: shiftType2},
  { description: 'SDASD',starttime: new Date(Date.now()), endtime: new Date(Date.now()),headcount: 2, orgEvent: orgEvent, users: [user1, user2], shiftType: shiftType2},
];
orgEvent.shifts=ELEMENT_DATA

@Component({
  selector: 'frontend-lb-nx-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  view: CalendarView = CalendarView.Month;

  activeDayIsOpen = true;

  orgEvents=[orgEvent]

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
}
