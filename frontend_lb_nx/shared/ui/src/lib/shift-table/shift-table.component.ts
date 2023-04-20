import { Component } from '@angular/core';
import {OrgEvent, Shift} from "@frontend-lb-nx/shared/entities";

const orgEvent: OrgEvent={
  id: "asdsad", name: "trollEvent", start: new Date("now"), end: new Date("now"), shifts: [],
}

const ELEMENT_DATA: Shift[] = [
  { description: 'Hydrogen', starttime: new Date("now"), endtime: new Date(Date.now()),headcount: 2, orgEvent: orgEvent, users: []},
  { description: 'Helium',starttime: new Date("now"), endtime: new Date(Date.now()),headcount: 2, orgEvent: orgEvent, users: []},
];

@Component({
  selector: 'frontend-lb-nx-shift-table',
  templateUrl: './shift-table.component.html',
  styleUrls: ['./shift-table.component.scss'],
})
export class ShiftTableComponent {
  displayedColumns: string[] = ['name', 'datetime', 'num_persons', 'persons', 'assign'];
  dataSource = ELEMENT_DATA;




}
