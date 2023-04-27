import {Component, Input} from '@angular/core';
import {OrgEvent, Shift, ShiftType} from "@frontend-lb-nx/shared/entities";

@Component({
  selector: 'frontend-lb-nx-event-overview',
  templateUrl: './event-overview.component.html',
  styleUrls: ['./event-overview.component.scss'],
})
export class EventOverviewComponent {
  @Input() orgEvent: OrgEvent={
    id:"asdasd",
    name:"test",
    start: new Date(),
    end: new Date(),
    shifts: undefined,
  }

  shiftType: ShiftType={
  id: "assad",
  name: "test",
    value: 0
  }

  selectedShiftType= this.shiftType

  shiftTypes: ShiftType[]=[
      {  id: "asad",
          name: "Bar", value: 0},
      {  id: "asdsad",
          name: "Security", value: 1},
      {  id: "asdsda",
          name: "Awareness", value: 1}
  ]

  model : Shift={
    id:"dasasd",
    description:"asdsad",
    headcount: 0,
    starttime: new Date(),
    endtime: new Date(),
    orgEvent: this.orgEvent,
    users: undefined,
    shiftType: this.shiftType
  }

  @Input() showAddShift=false

  splitShiftsByType(shifts?: Shift[]): Shift[][] {
    if(shifts==undefined){
      return []
    }
    const shiftsByType: {[key: string]: Shift[]} = {};

    for (const shift of shifts) {
      if (!shiftsByType[shift.shiftType.name]) {
        shiftsByType[shift.shiftType.name] = [];
      }
      shiftsByType[shift.shiftType.name].push(shift);
    }
    return Object.values(shiftsByType);
  }

  addShift(shift: Shift){
    const newShift: Shift={
      id: this.model.id,
      description: this.model.description,
      headcount: this.model.headcount,
      starttime: this.model.starttime,
      endtime: this.model.endtime,
      orgEvent: this.model.orgEvent,
      users: this.model.users,
      shiftType: this.selectedShiftType
    }
    if(this.orgEvent.shifts!=undefined){
      this.orgEvent.shifts.push(newShift)
    }else{
      this.orgEvent.shifts=[newShift]
    }
  }
}
