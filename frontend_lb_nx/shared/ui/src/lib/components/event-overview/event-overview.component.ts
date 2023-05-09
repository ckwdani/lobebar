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
  @Input() withHeadingLink = true;
  @Input() shifts?: Observable<Shift[]>;
  @Input() shiftTypes?: Observable<ShiftType[]>;
  @Input() showAddShift: Observable<boolean> = of(false);
  @Output() addShiftEvent = new EventEmitter<Shift>();

  @Input() showName = true;


  splittedShifts: Shift[][] = [];

  ngOnInit(): void {
    this.shifts?.subscribe(next=>this.splitShiftsByType(next))
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



  constructor(private store: Store) {
  }
}
