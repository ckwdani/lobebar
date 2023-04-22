import { Component } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {CalendarEvent, CalendarView} from "angular-calendar";
import {OrgEvent, Shift, ShiftType, User} from "@frontend-lb-nx/shared/entities";

const orgEvent: OrgEvent={
  id: "asdsad", name: "Plattenbauromantik", start: new Date(Date.now()), end: new Date(Date.now()), shifts: [],
}

const shiftType:  ShiftType={
  id: "asdassadsd", name:"Barschicht"
}

const shiftType2:  ShiftType={
  id: "asdassadsdd", name:"Security"
}

const user1: User={
  id: "2312",
  name: "emil",
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
  name: "goenndalf",
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
  { description: 'Hydrogen', starttime: new Date(Date.now()), endtime: new Date(Date.now()),headcount: 2, orgEvent: orgEvent, users: [], shiftType: shiftType},
  { description: 'Helium',starttime: new Date(Date.now()), endtime: new Date(Date.now()),headcount: 2, orgEvent: orgEvent, users: [ user2], shiftType},
  { description: 'ASDASD', starttime: new Date(Date.now()), endtime: new Date(Date.now()),headcount: 2, orgEvent: orgEvent, users: [], shiftType: shiftType2},
  { description: 'SDASD',starttime: new Date(Date.now()), endtime: new Date(Date.now()),headcount: 2, orgEvent: orgEvent, users: [user1, user2], shiftType: shiftType2},
];

@Component({
  selector: 'frontend-lb-nx-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  view: CalendarView = CalendarView.Month;

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
        color: {
        primary: '#ad2121',
            secondary: '#FAE3E3',
      },
      }
      arr.push(calEv)
    }
    this.events=arr
    return this.events
  }
}
