import {Component, OnInit} from '@angular/core';
import {ShiftType} from "@frontend-lb-nx/shared/entities";
import {
  ShiftTypeBackendService
} from "../../../../shared/services/src/lib/backend/entity-backend-services/shifts-type-backend.service";
import {Store} from "@ngrx/store";
import {ShiftTypeAddStore} from './shift-type-add.store';
import {selectShiftTypes} from "../../../../shared/services/src/lib/backend/states/shift-types/shift-type.selectors";
import {find} from "rxjs";
import {addShiftType} from "../../../../shared/services/src/lib/backend/states/shift-types/shift-type.actions";

@Component({
  selector: 'frontend-lb-nx-shift-type-add',
  templateUrl: './shift-type-add.component.html',
  styleUrls: ['./shift-type-add.component.scss'],
  providers: [ShiftTypeAddStore],
})
export class ShiftTypeAddComponent{
  constructor(private  shiftTypeService: ShiftTypeBackendService, private store: Store) {
    this.store.select(selectShiftTypes).subscribe(next =>
    {
      this.shiftTypes= next
    })
  }
  shiftTypes : ShiftType[]|undefined;

  model: ShiftType={
    id: "asasd",
    name: "test",
    value: 0,
  }

  sendShiftType(){
    this.store.dispatch(addShiftType({shiftType: this.model}))
  }
}
