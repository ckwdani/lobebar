import {Component, Input} from '@angular/core';
import {OrgEvent, Shift, ShiftType, User} from "@frontend-lb-nx/shared/entities";
import { EventsOverviewStore } from './events-overview.store';
import {Observable, of} from "rxjs";
import {Store} from "@ngrx/store";
import {loadOrgEvents, selectOrgEvents, selectOrgEventsState, selectOwnShifts} from "@frontend-lb-nx/shared/services";

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

const shiftType:  ShiftType={
  id: "asdassadsd", name:"Barschicht"
}

const shiftType2:  ShiftType={
  id: "asdassadsdd", name:"Security"
}

const ELEMENT_DATA: Shift[] = [
  { description: 'Hydrogen', starttime: new Date(Date.now()), endtime: new Date(Date.now()),headcount: 2, orgEvent: orgEvent, users: [], type: shiftType},
  { description: 'Helium',starttime: new Date(Date.now()), endtime: new Date(Date.now()),headcount: 2, orgEvent: orgEvent, users: [user1, user2], type: shiftType},
  { description: 'ASDASD', starttime: new Date(Date.now()), endtime: new Date(Date.now()),headcount: 2, orgEvent: orgEvent, users: [], type: shiftType2},
  { description: 'SDASD',starttime: new Date(Date.now()), endtime: new Date(Date.now()),headcount: 2, orgEvent: orgEvent, users: [user1, user2], type: shiftType2},
];

orgEvent.shifts=ELEMENT_DATA
orgEvent1.shifts=ELEMENT_DATA
orgEvent2.shifts=ELEMENT_DATA

@Component({
  selector: 'frontend-lb-nx-events-overview',
  templateUrl: './events-overview.component.html',
  styleUrls: ['./events-overview.component.scss'],
  providers: [EventsOverviewStore],
})
export class EventsOverviewComponent {

  dataSource=orgEvent.shifts
  orgEventsAss = of([orgEvent, orgEvent1, orgEvent2])
  comingOrgEvents$ = this.eventsOverviewStore.comingOrgEvents$
  yourShifts$ = this.eventsOverviewStore.yourShifts$
  previousShifts$ = this.eventsOverviewStore.previousShifts$

  ownShifts: Shift[]|undefined


  orgEvents : OrgEvent[]|undefined;

  constructor(private readonly eventsOverviewStore: EventsOverviewStore, private store: Store) {
    this.store.select(selectOrgEvents).subscribe(next =>
        {
          this.orgEvents=next
        }
    )
    this.store.select(selectOwnShifts).subscribe(next =>{
      this.ownShifts=next
      console.log(next)
    }
    )
    console.log(this.ownShifts)
  }



  protected readonly of = of;
  protected readonly Observable = Observable;
}
