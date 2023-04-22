import { Component } from '@angular/core';
import {OrgEvent, Shift, ShiftType, User} from "@frontend-lb-nx/shared/entities";

const orgEvent: OrgEvent={
  id: "asdsad", name: "Plattenbauromantik", start: new Date(Date.now()), end: new Date(Date.now()), shifts: [],
}
const orgEvent1: OrgEvent={
  id: "asdsad", name: "Dartabend", start: new Date(Date.now()), end: new Date(Date.now()), shifts: [],
}
const orgEvent2: OrgEvent={
  id: "asdsad", name: "Solitresen", start: new Date(Date.now()), end: new Date(Date.now()), shifts: [],
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

const shiftType:  ShiftType={
  id: "asdassadsd", name:"Barschicht"
}

const shiftType2:  ShiftType={
  id: "asdassadsdd", name:"Security"
}

const ELEMENT_DATA: Shift[] = [
  { description: 'Hydrogen', starttime: new Date(Date.now()), endtime: new Date(Date.now()),headcount: 2, orgEvent: orgEvent, users: [], shiftType: shiftType},
  { description: 'Helium',starttime: new Date(Date.now()), endtime: new Date(Date.now()),headcount: 2, orgEvent: orgEvent, users: [user1, user2], shiftType},
  { description: 'ASDASD', starttime: new Date(Date.now()), endtime: new Date(Date.now()),headcount: 2, orgEvent: orgEvent, users: [], shiftType: shiftType2},
  { description: 'SDASD',starttime: new Date(Date.now()), endtime: new Date(Date.now()),headcount: 2, orgEvent: orgEvent, users: [user1, user2], shiftType: shiftType2},
];

orgEvent.shifts=ELEMENT_DATA
orgEvent1.shifts=ELEMENT_DATA
orgEvent2.shifts=ELEMENT_DATA

@Component({
  selector: 'frontend-lb-nx-event-overview',
  templateUrl: './event-overview.component.html',
  styleUrls: ['./event-overview.component.scss'],
})
export class EventOverviewComponent {
  dataSource=orgEvent.shifts
  orgEvent=orgEvent
  orgEvents = [orgEvent, orgEvent1, orgEvent2]

  splitShiftsByType(shifts: Shift[]): Shift[][] {
    const shiftsByType: {[key: string]: Shift[]} = {};

    for (const shift of shifts) {
      if (!shiftsByType[shift.shiftType.name]) {
        shiftsByType[shift.shiftType.name] = [];
      }
      shiftsByType[shift.shiftType.name].push(shift);
    }
    console.log(Object.values(shiftsByType))
    return Object.values(shiftsByType);
  }


}
