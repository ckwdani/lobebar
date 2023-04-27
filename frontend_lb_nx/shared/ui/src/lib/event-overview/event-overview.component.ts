import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrgEvent, Shift, ShiftType} from "@frontend-lb-nx/shared/entities";
import {filter, Observable} from "rxjs";

@Component({
  selector: 'frontend-lb-nx-event-overview',
  templateUrl: './event-overview.component.html',
  styleUrls: ['./event-overview.component.scss'],
})
export class EventOverviewComponent implements OnInit{
  @Input() orgEvent?: Observable<OrgEvent>;
  @Input() shifts?: Observable<Shift[]>;
  @Input() shiftTypes?: Observable<ShiftType[]>;
  @Output() addShiftEvent = new EventEmitter<Shift>();




  @Input() showAddShift=false


  model: Shift = this.startModel()

  splittedShifts: Shift[][] = [];

  ngOnInit(): void {
    this.shifts?.subscribe(next=>this.splitShiftsByType(next))
    this.shiftTypes?.pipe(filter(shifts => shifts.length > 0)).subscribe(next=> {
      this.model.shiftType = next[0];
    })
  }
  splitShiftsByType(shifts: Shift[]): void {
    const shiftsByType: {[key: string]: Shift[]} = {};

    for (const shift of shifts) {
      if (!shiftsByType[shift.shiftType.name]) {
        shiftsByType[shift.shiftType.name] = [];
      }
      shiftsByType[shift.shiftType.name].push(shift);
    }
    this.splittedShifts = Object.values(shiftsByType);
  }

  addShift(){
    this.addShiftEvent.emit(Object.assign({}, this.model));
    this.model = this.startModel();
  }


  startModel(): Shift{
    return {
      id: '',
      description: '',
      headcount: 0,
      starttime: new Date(),
      endtime: new Date(),
      shiftType: this.model?.shiftType ?? {id: '', name: '', value: 0},
    };
  }


}
