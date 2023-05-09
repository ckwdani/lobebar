import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Shift, ShiftType} from "@frontend-lb-nx/shared/entities";
import {filter, Observable} from "rxjs";

@Component({
  selector: 'frontend-lb-nx-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.scss']
})
export class AddShiftComponent implements OnInit{


  @Output() addShiftEvent = new EventEmitter<Shift>();
  @Input() shiftTypes?: Observable<ShiftType[]>;
  model: Shift = this.startModel()

    ngOnInit(): void {
      this.shiftTypes?.pipe(filter(shifts => shifts.length > 0)).subscribe(next=> {
        this.model.type = next[0];
      })
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

  addShift(){
    this.addShiftEvent.emit(Object.assign({}, this.model));
    this.model = this.startModel();
  }

}
