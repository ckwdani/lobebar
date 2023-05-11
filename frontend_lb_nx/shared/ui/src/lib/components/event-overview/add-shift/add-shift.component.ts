import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrgEvent, Shift, ShiftType} from "@frontend-lb-nx/shared/entities";
import {filter, Observable, of} from "rxjs";

@Component({
  selector: 'frontend-lb-nx-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.scss']
})
export class AddShiftComponent implements OnInit{


  @Output() addShiftEvent = new EventEmitter<Shift>();
  @Input() orgEvent?: OrgEvent;
  @Input() shiftTypes?: Observable<ShiftType[]>;
  @Input() startDate?: Date;
  model: Shift = this.startModel()

  @Input() expanded: Observable<boolean> = of(true);


    ngOnInit(): void {
      this.shiftTypes?.pipe(filter(shifts => shifts.length > 0)).subscribe(next=> {
        this.model.type = next[0];
      });
      this.model = this.startModel();
    }

  startModel(): Shift{
    return {
      id: '',
      description: '',
      headcount: 0,
      starttime: this.startDate ?? new Date(),
      // add two hours to the start date
      endtime: this.startDate !== undefined ? new Date(Math.min(this.startDate?.getTime() + 1000 * 60 *60 *2, this.orgEvent?.end.getTime()??1000000000000)) : new Date(),
      type: this.model?.type ?? {id: '', name: '', value: 0},
    };
  }

  addShift(){
    this.addShiftEvent.emit(Object.assign({}, this.model));
    this.model = this.startModel();
  }


  getValidSplitted(): {headcountSTZ: boolean, startEndInco: boolean, eventBoudries: boolean}{
    const headcountSTZ = this.model.headcount > 0;
      // intrinsic validation
    const intrinsic = this.model.starttime < this.model.endtime;
    // check wheter the shift is in the eventtimespan
    const extrinsic = this.orgEvent !== undefined && this.orgEvent.start.getTime() <= this.model.starttime.getTime() && this.orgEvent.end.getTime() >= this.model.endtime.getTime();

    return {headcountSTZ: !headcountSTZ, startEndInco: !intrinsic, eventBoudries: !extrinsic};
  }

  validate(): boolean{
    const valid = this.getValidSplitted();
    return valid.headcountSTZ && valid.startEndInco && valid.eventBoudries;
  }

}
