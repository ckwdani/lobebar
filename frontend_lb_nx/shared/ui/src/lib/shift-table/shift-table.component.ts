import {Component, Input} from '@angular/core';
import {OrgEvent, Shift, ShiftType, User} from "@frontend-lb-nx/shared/entities";

const orgEvent: OrgEvent={
  id: "asdsad", name: "trollEvent", start: new Date(Date.now()), end: new Date(Date.now()), shifts: [],
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
  id: "asdassadsd", name:"Barschicht", value: 1
}

const ELEMENT_DATA: Shift[] = [
  { description: 'Hydrogen', starttime: new Date(Date.now()), endtime: new Date(Date.now()),headcount: 2, orgEvent: orgEvent, users: [], shiftType: shiftType},
  { description: 'Helium',starttime: new Date(Date.now()), endtime: new Date(Date.now()),headcount: 2, orgEvent: orgEvent, users: [user1, user2], shiftType},
];

@Component({
  selector: 'frontend-lb-nx-shift-table',
  templateUrl: './shift-table.component.html',
  styleUrls: ['./shift-table.component.scss'],
})
export class ShiftTableComponent {
  @Input() shifts: Shift[] = []
  @Input() orgEvent: OrgEvent={
    name: "",
    start: new Date(),
    end: new Date(),
    shifts: this.shifts
  }
  @Input() showEditDelete=false
  displayedColumns: string[] = ['datetime', 'description', 'num_persons', 'persons', 'assign'];
  dataSource = ELEMENT_DATA;

  //change the row color
  checkNumPersons(rowData: Shift): string {
    const lengthUser = rowData.users?.length ?? 0
    if (lengthUser<rowData.headcount) {
      return "red"
    } else {
      return "green"
    }
  }

  showCheck(rowData: Shift): boolean {
    const lengthUser = rowData.users?.length ?? 0
    return lengthUser<rowData.headcount
  }

  deleteShift(rowData: Shift){
    const index=ELEMENT_DATA.indexOf(rowData)
    ELEMENT_DATA.splice(index,1)
    const index2= this.shifts.indexOf(rowData)
    this.shifts.splice(index2, 1)
    console.log(this.shifts)
    if(this.orgEvent.shifts!=undefined){
      const index3 = this.orgEvent.shifts.indexOf(rowData)
      this.orgEvent.shifts.splice(index3, 1)
    }
  }

  mapToName(arr: User[]){
    return arr.map( (u)=> " "+u.username)
  }
}
