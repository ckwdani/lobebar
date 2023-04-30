import {Component, OnInit} from '@angular/core';
import {ShiftType} from "@frontend-lb-nx/shared/entities";
import {
  ShiftTypeBackendService
} from "../../../../shared/services/src/lib/backend/entity-backend-services/shifts-type-backend.service";
import {Store} from "@ngrx/store";
import {ShiftTypeAddStore} from './shift-type-add.store';
import {selectShiftTypes} from "../../../../shared/services/src/lib/backend/states/shift-types/shift-type.selectors";
import {find} from "rxjs";
import {
  addShiftType,
  deleteShiftType
} from "../../../../shared/services/src/lib/backend/states/shift-types/shift-type.actions";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'frontend-lb-nx-shift-type-add',
  templateUrl: './shift-type-add.component.html',
  styleUrls: ['./shift-type-add.component.scss'],
  providers: [ShiftTypeAddStore],
})
export class ShiftTypeAddComponent{

  model: ShiftType={
    id: "",
    name: "",
    value: 0,
  }

  fcname = new FormControl(this.model.name, [Validators.required, Validators.minLength(3)])


  constructor(private  shiftTypeService: ShiftTypeBackendService, private store: Store) {
    this.store.select(selectShiftTypes).subscribe(next =>
    {
      this.shiftTypes= next
    })
  }
  shiftTypes : ShiftType[]|undefined;

  sendShiftType(){
    const copyModel= Object.assign({},this.model)
    this.store.dispatch(addShiftType({shiftType: copyModel}))
    this.model.name=""
  }

  editShiftType(shiftType: ShiftType){
    this.model.name=shiftType.name

  }

  deleteShiftType(shiftType: ShiftType){
    this.store.dispatch(deleteShiftType({shiftType: shiftType}))
  }
}
