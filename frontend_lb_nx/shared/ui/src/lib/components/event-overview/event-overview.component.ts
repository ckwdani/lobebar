import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrgEvent, Shift, ShiftType} from "@frontend-lb-nx/shared/entities";
import {filter, Observable, of} from "rxjs";
import {Store} from "@ngrx/store";
import {selectOwnShifts} from "@frontend-lb-nx/shared/services";

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
      this.model.type = next[0];
    })
  }

  splitShiftsByType(shifts: Shift[]): void {
    const shiftsByType: {[key: string]: Shift[]} = {};

    for (const shift of shifts) {
      if (!shiftsByType[shift.type.name]) {
        shiftsByType[shift.type.name] = [];
      }
      shiftsByType[shift.type.name].push(shift);
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
      type: this.model?.type ?? {id: '', name: '', value: 0},
    };
  }

  constructor(private store: Store) {
  }
}
